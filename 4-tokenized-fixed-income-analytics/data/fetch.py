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

import pathlib
import sys

from .datakit import Fetcher, FetchError, NetworkBlocked
from .onchain import (TOKENS, block_number_source, block_source, logs_source,
                      parse_block_number)

ROOT = pathlib.Path(__file__).resolve().parent

BLOCKS_PER_DAY = 7200          # 12-second slots
CHUNK_BLOCKS = 5_000           # under the usual public-node limit


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
    args = ap.parse_args(argv)
    f = Fetcher(ROOT)

    if args.list:
        for sym, meta in TOKENS.items():
            print(f"{sym:<7} {meta['address']}  {meta['note']}")
        print(f"\neth_getLogs over the last {args.days} days "
              f"(~{args.days * BLOCKS_PER_DAY:,} blocks) in "
              f"{CHUNK_BLOCKS:,}-block chunks, per token")
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
        print(f"chain head {head:,}; walking blocks {start:,}..{head:,}")

        f.get(block_source(start, "lo"), refresh=args.refresh)
        f.get(block_source(head, "hi"), refresh=args.refresh)

        for sym in want:
            meta = TOKENS[sym]
            print(f"\n{sym} ({meta['address']})")
            chunk = 0
            lo = start
            while lo <= head:
                hi = min(lo + CHUNK_BLOCKS - 1, head)
                src = logs_source(sym, meta["address"], lo, hi, chunk)
                try:
                    f.get(src, refresh=args.refresh)
                except FetchError as exc:
                    # A node that refuses one range should not end the walk.
                    print(f"  blocks {lo}-{hi}: skipped ({exc})", file=sys.stderr)
                chunk += 1
                lo = hi + 1
                if chunk % 20 == 0:
                    print(f"  {chunk} chunks, at block {lo:,}")
            print(f"  {chunk} chunks fetched")
    except NetworkBlocked as e:
        print(f"\nBLOCKED: {e}", file=sys.stderr)
        return 2
    except (FetchError, ValueError) as e:
        print(f"\nFAILED: {e}", file=sys.stderr)
        return 1

    print(f"\nwrote {f.manifest_path}")
    print("run `python -m src.demo --real` to measure concentration on the tape")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
