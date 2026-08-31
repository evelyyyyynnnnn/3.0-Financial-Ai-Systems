#!/usr/bin/env python3
"""Build data.json for the Contagion Observatory.

    python pipeline/build_dataset.py                 # default universe
    python pipeline/build_dataset.py --equities SPY QQQ XLF --crypto bitcoin ethereum

Pulls daily closes, aligns them onto shared trading days, estimates pairwise
transmission, and precomputes a shock scenario for every node so the site can
show propagation without running the model in the browser.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import sys
from datetime import datetime, timezone

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from pipeline.contagion import build_edges, propagate, returns   # noqa: E402
from pipeline.market_data import (equity_prices, crypto_prices,  # noqa: E402
                                  align, MarketDataError)

OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "data.json"

DEFAULT_EQUITIES = ["spy", "qqq", "xlf", "xlk", "iwm", "gld", "tlt"]
DEFAULT_CRYPTO = {"bitcoin": "BTC", "ethereum": "ETH", "solana": "SOL",
                  "ripple": "XRP", "cardano": "ADA"}


def assemble(equities, crypto, days=400):
    raw, meta, failed = {}, {}, []

    for sym in equities:
        try:
            raw[sym.upper()] = equity_prices(sym, limit=days)
            meta[sym.upper()] = {"market": "equity", "source": "Stooq"}
            print(f"  equity {sym.upper()}: {len(raw[sym.upper()])} days")
        except MarketDataError as e:
            print(f"  equity {sym.upper()}: {e} — skipped", file=sys.stderr)
            failed.append(sym.upper())

    for coin_id, ticker in crypto.items():
        try:
            raw[ticker] = crypto_prices(coin_id, days=days)
            meta[ticker] = {"market": "crypto", "source": "CoinGecko", "coin_id": coin_id}
            print(f"  crypto {ticker}: {len(raw[ticker])} days")
        except MarketDataError as e:
            print(f"  crypto {ticker}: {e} — skipped", file=sys.stderr)
            failed.append(ticker)

    if len(raw) < 2:
        raise MarketDataError("need at least two usable series")
    return raw, meta, failed


def build_payload(raw, meta, failed, *, is_sample=False, note=None, dates=None):
    if dates is None:
        aligned, dates = align(raw)
    else:
        aligned = raw
    rets = {k: returns(v) for k, v in aligned.items()}
    edges = build_edges(rets)

    nodes = []
    for name, series in aligned.items():
        r = rets[name]
        nodes.append({
            "id": name,
            "market": meta[name]["market"],
            "source": meta[name].get("source"),
            "observations": len(r),
            "degree": sum(1 for e in edges if name in (e.source, e.target)),
        })
    nodes.sort(key=lambda n: (n["market"], n["id"]))

    scenarios = {n["id"]: {k: round(v, 4) for k, v in
                           sorted(propagate(edges, n["id"]).items(),
                                  key=lambda kv: -kv[1])}
                 for n in nodes}

    cross = [e for e in edges if meta[e.source]["market"] != meta[e.target]["market"]]

    return {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "is_sample": is_sample,
        "source_note": note or "Daily closes from Stooq (equities) and CoinGecko (crypto), "
                               "aligned to shared trading days.",
        "window": {"start": dates[0], "end": dates[-1], "observations": len(dates)},
        "failed": failed,
        "method": {
            "corr": "Pearson correlation of daily log returns.",
            "lead_lag": "Cross-correlation over ±3 days; the leader is the edge source.",
            "tail_dep": "P(target in its own worst 10% | source in its worst 10%).",
            "strength": "0.35·|corr| + 0.65·tail_dep — weighted toward joint failure, "
                        "because a pair that only co-moves in calm markets is not a "
                        "contagion channel.",
        },
        "nodes": nodes,
        "edges": [e.to_dict() for e in edges],
        "cross_market_edges": len(cross),
        "scenarios": scenarios,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--equities", nargs="+", default=DEFAULT_EQUITIES)
    ap.add_argument("--crypto", nargs="+", default=list(DEFAULT_CRYPTO))
    ap.add_argument("--days", type=int, default=400)
    ap.add_argument("--out", type=pathlib.Path, default=OUT)
    args = ap.parse_args()

    crypto = {c: DEFAULT_CRYPTO.get(c, c[:4].upper()) for c in args.crypto}
    print("Pulling price history…")
    try:
        raw, meta, failed = assemble(args.equities, crypto, args.days)
        payload = build_payload(raw, meta, failed)
    except MarketDataError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(payload, indent=1), encoding="utf8")
    print(f"\nWrote {args.out} — {len(payload['nodes'])} nodes, "
          f"{len(payload['edges'])} edges "
          f"({payload['cross_market_edges']} cross-market).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
