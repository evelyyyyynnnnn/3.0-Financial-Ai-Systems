"""Read tokenised treasury funds' transfer tape from a public Ethereum node.

    python -m data.fetch --list
    python -m data.fetch
    python -m data.fetch --verify

Public RPC nodes cap how many blocks one eth_getLogs call may span, so the
window is walked in chunks. The default window is roughly the last 90 days;
widen it with --days if your endpoint tolerates it.

A transfer is not a trade and carries no price, so this produces an exact
holder register and an exact activity record, and no price series at all. What
that costs is stated in the results rather than papered over with a $1.00
placeholder.
"""
from __future__ import annotations

import json
import pathlib
import re
import sys

from .datakit import Fetcher, FetchError, NetworkBlocked, utc_now
from .onchain import (RPC, TOKENS, block_number_source, block_source,
                      logs_source, parse_block_number)

ROOT = pathlib.Path(__file__).resolve().parent

BLOCKS_PER_DAY = 7200          # 12-second slots

# A starting guess, not a constant. Public endpoints cap how many blocks one
# eth_getLogs may span and they do not agree on the cap or on how they report
# hitting it: one answers 403, one answers 400 Bad Request, one says plainly
# "eth_getLogs is limited to 0 - 50 blocks range". 5,000 was chosen from a
# comment in somebody's docs and is far above what several public nodes allow,
# which is why a walk could lose nine ranges in ten. The walk now discovers the
# real cap by halving a refused range instead of assuming one.
CHUNK_BLOCKS = 5_000
MIN_CHUNK_BLOCKS = 1          # an endpoint is allowed to cap at anything; the
                              # free tier of one major provider caps at 10, and
                              # a floor above the cap made every request fail
                              # while the walk blamed the range for being wide


# Providers state their cap in the rejection, in prose, and each says it
# differently. Reading it beats halving blind: the walk adopts the number the
# server gave instead of spending eight failed requests discovering it.
_CAP_PATTERNS = (
    re.compile(r"up to (?:a )?([\d,]+\s*[KkMm]?)\s*block range", re.I),
    re.compile(r"limited to \d+\s*-\s*([\d,]+\s*[KkMm]?)\s*blocks?", re.I),
    re.compile(r"(?:max(?:imum)?|exceeds?)\D{0,20}?([\d,]+\s*[KkMm]?)\s*blocks?", re.I),
)

_MULT = {"k": 1_000, "m": 1_000_000}


def cap_from(message: str):
    """The block-range cap the server named, or None if it named none."""
    for pat in _CAP_PATTERNS:
        m = pat.search(message or "")
        if m:
            raw = m.group(1).strip().replace(",", "").replace(" ", "")
            mult = _MULT.get(raw[-1:].lower(), 1)
            if mult > 1:
                raw = raw[:-1]
            try:
                n = int(raw) * mult
            except ValueError:
                continue
            if 0 < n <= 1_000_000:
                return n
    return None


def walk_token(f, sym, address, start, head, chunk, refresh, verbose=True):
    """Fetch [start, head] for one token, halving any range the node refuses.

    Returns (blocks_retrieved, missing_ranges, smallest_chunk_used).

    A refused range is split and retried rather than abandoned, because the
    refusal is usually about the SPAN, not the blocks: the same blocks come
    back fine in two halves. A range still refused at MIN_CHUNK_BLOCKS is
    recorded in missing_ranges -- never dropped, because the loader has to be
    able to tell a hole from a quiet market.
    """
    pending = [(start, head)]
    missing, got_blocks, smallest = [], 0, chunk
    while pending:
        lo, hi = pending.pop(0)
        width = hi - lo + 1
        if width > chunk:                      # first pass: cut to chunk size
            pending = [(a, min(a + chunk - 1, hi))
                       for a in range(lo, hi + 1, chunk)] + pending
            continue
        try:
            f.get(logs_source(sym, address, lo, hi), refresh=refresh)
            got_blocks += width
            smallest = min(smallest, width)
        except FetchError as exc:
            stated = cap_from(str(exc))
            if stated and stated < width:
                # The server named its cap. Take it rather than halving toward
                # it -- and re-plan the whole remaining range at that size.
                chunk = max(1, stated)
                pending.insert(0, (lo, hi))
                if verbose:
                    print(f"  endpoint caps eth_getLogs at {chunk} blocks; "
                          f"re-planning at that size", file=sys.stderr)
                continue
            if width > MIN_CHUNK_BLOCKS:
                mid = lo + width // 2
                pending.insert(0, (mid, hi))
                pending.insert(0, (lo, mid - 1))
                chunk = max(MIN_CHUNK_BLOCKS, width // 2)
                if verbose:
                    print(f"  blocks {lo}-{hi} refused; retrying in halves "
                          f"(chunk now {chunk})", file=sys.stderr)
                continue
            missing.append((lo, hi))
            if verbose:
                print(f"  blocks {lo}-{hi}: gave up at {width} blocks ({exc})",
                      file=sys.stderr)
    return got_blocks, missing, smallest


def main(argv=None) -> int:
    import argparse
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--refresh", action="store_true")
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--days", type=int, default=90,
                    help="how far back to walk the chain (default 90)")
    ap.add_argument("--tokens", default=",".join(TOKENS),
                    help="comma-separated symbols to fetch")
    ap.add_argument("--chunk", type=int, default=CHUNK_BLOCKS,
                    help=f"blocks per eth_getLogs call (default {CHUNK_BLOCKS}). "
                         f"A refused range is halved automatically, so this is "
                         f"a starting guess; lower it to skip the discovery.")
    ap.add_argument("--pace", type=float, default=0.6,
                    help="seconds between requests (default 0.6). A public node "
                         "throttles eth_getLogs well before it throttles a "
                         "document fetch; raise this if chunks come back 403.")
    args = ap.parse_args(argv)
    # The shared default (0.15s) is tuned for SEC's document API. A public RPC
    # node rate-limits log queries far sooner, and a walk that fires chunks back
    # to back loses most of them to 403.
    f = Fetcher(ROOT, min_interval=args.pace)

    if args.list:
        for sym, meta in TOKENS.items():
            print(f"{sym:<7} {meta['address']}  {meta['note']}")
        print(f"\neth_getLogs over the last {args.days} days "
              f"(~{args.days * BLOCKS_PER_DAY:,} blocks) in "
              f"{args.chunk:,}-block chunks (halved on refusal), per token")
        print("no price is available from a Transfer event; the run reports "
              "concentration and activity only")
        return 0
    if args.verify:
        problems = f.verify()
        for p in problems:
            print("  " + p)
        print("VERIFICATION FAILED" if problems else
              f"all {len(f.load_manifest()['files'])} cached file(s) verified")
        return 1 if problems else 0

    want = [s.strip().upper() for s in args.tokens.split(",") if s.strip()]
    unknown = [s for s in want if s not in TOKENS]
    if unknown:
        print(f"unknown token(s): {unknown}; known: {list(TOKENS)}", file=sys.stderr)
        return 1

    try:
        head = parse_block_number(
            f.get(block_number_source(), refresh=args.refresh).read_bytes())
        span = args.days * BLOCKS_PER_DAY
        start = max(0, head - span)
        print(f"chain head {head:,}; walking blocks {start:,}..{head:,} "
              f"at {args.pace}s between requests")
        total_missing: list = []
        coverage: dict = {}

        f.get(block_source(start, "lo"), refresh=args.refresh)
        f.get(block_source(head, "hi"), refresh=args.refresh)

        want_blocks = head - start + 1

        def report_cost(cap, note=""):
            per = -(-want_blocks // cap)
            total = per * len(want)
            secs = total * args.pace
            unit = (f"{secs/3600:.1f} h" if secs >= 3600 else
                    f"{secs/60:.0f} min" if secs >= 60 else f"{secs:.0f} s")
            print(f"  at {cap:,} blocks per call this window needs "
                  f"{per:,} calls per token ({total:,} total, about {unit})"
                  + (f" — {note}" if note else ""))
            return secs

        for sym in want:
            meta = TOKENS[sym]
            print(f"\n{sym} ({meta['address']})")
            got_blocks, skipped, smallest = walk_token(
                f, sym, meta["address"], start, head, args.chunk, args.refresh)
            missing_blocks = sum(b - a + 1 for a, b in skipped)
            frac = (got_blocks / want_blocks) if want_blocks else 0.0
            print(f"  {got_blocks:,} of {want_blocks:,} blocks retrieved "
                  f"({frac:.1%}); smallest accepted range {smallest:,} blocks"
                  + (f"; {missing_blocks:,} blocks still missing" if skipped else ""))
            # Coverage is counted in BLOCKS, not chunks. Chunk sizes vary now,
            # so "9 of 11 chunks" no longer describes how much of the window
            # actually arrived -- and how much arrived is the only thing that
            # decides whether these numbers may be quoted.
            coverage[sym] = {
                "requested_blocks": [start, head],
                "blocks_requested": want_blocks,
                "blocks_retrieved": got_blocks,
                "fraction_retrieved": round(frac, 4),
                "smallest_accepted_chunk": smallest,
                "missing_ranges": [[a, b] for a, b in skipped],
            }
            if skipped:
                total_missing.append((sym, missing_blocks, want_blocks))
            if smallest < 100 and want_blocks // max(smallest, 1) > 5_000:
                secs = report_cost(smallest, "too many for one sitting")
                if secs > 3600:
                    print(f"  this endpoint's cap makes --days {args.days} "
                          f"impractical. Either shrink the window "
                          f"(--days {max(1, args.days // 30)}) or use an "
                          f"endpoint with a wider eth_getLogs range.",
                          file=sys.stderr)
    except NetworkBlocked as e:
        print(f"\nBLOCKED: {e}", file=sys.stderr)
        return 2
    except (FetchError, ValueError) as e:
        print(f"\nFAILED: {e}", file=sys.stderr)
        return 1

    # What the walk was ASKED for, beside what it got. Without this the loader
    # sees only the chunks that arrived and cannot tell a quiet window from a
    # window with holes in it -- and a hole in an activity tape looks exactly
    # like an absence of activity.
    cov_path = f.raw / "chain" / "coverage.json"
    cov_path.parent.mkdir(parents=True, exist_ok=True)
    cov_path.write_text(json.dumps(
        {"generated_utc": utc_now(), "rpc": RPC, "pace_seconds": args.pace,
         "days_requested": args.days, "by_symbol": coverage},
        indent=2, sort_keys=True) + "\n", encoding="utf8")
    print(f"wrote {cov_path}")

    print(f"\nwrote {f.manifest_path}")
    if total_missing:
        worst = ", ".join(f"{s} {n:,}/{t:,} blocks" for s, n, t in total_missing)
        print(f"\nINCOMPLETE: chunks still missing ({worst}).")
        print("  Cached chunks are kept, so simply running this again fetches "
              "only what is missing.")
        print("  Ranges refused down to the floor are a hard cap on this "
              "endpoint, not throttling -- slowing down will not help.")
        print("  Point ETH_RPC_URL at an endpoint you hold a key for; a keyed "
              "endpoint accepts wide ranges and covers the window in one pass.")
        print("  The measurement below will run on what WAS retrieved and will "
              "say so; it will not present a partial window as a full one.")
    print("run `python -m src.demo --real` to measure concentration on the tape")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
