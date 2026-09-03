"""Pull the real crypto and equity series this project tests for transmission.

    python -m data.fetch --list
    python -m data.fetch
    python -m data.fetch --verify

The universe is chosen so that the question the project asks is answerable.
Testing whether crypto stress transmits to equities needs three kinds of name:
assets with a mechanical link to crypto (a bitcoin ETF, a crypto exchange, a
treasury-holding company), assets with no such link (broad equity, energy), and
crypto itself. A universe of only correlated names would make every pair look
like transmission.

Crypto trades 366 days a year and equities do not, so the series are aligned on
common dates rather than by position -- see marketdata.align.
"""
from __future__ import annotations

import pathlib
import sys
from datetime import date, timedelta

from .datakit import Fetcher, FetchError, NetworkBlocked
from .marketdata import coingecko_source, stooq_source

ROOT = pathlib.Path(__file__).resolve().parent

END = date.today()
START = END - timedelta(days=3 * 365)

# (stooq symbol, why it is in the universe)
UNIVERSE = [
    ("btcusd",  "crypto: the shock origin in most specifications"),
    ("ethusd",  "crypto: second asset, to separate market-wide from BTC-specific"),
    ("coin.us", "mechanical link: exchange revenue moves with crypto volume"),
    ("mstr.us", "mechanical link: balance sheet holds bitcoin directly"),
    ("gbtc.us", "mechanical link: a bitcoin trust, the cleanest equity proxy"),
    ("xlf.us",  "financials: where a crypto-to-banking channel would show"),
    ("spy.us",  "broad equity: the control -- a link here means market beta"),
    ("xle.us",  "energy: a near-placebo, included so the method can be wrong"),
    ("tlt.us",  "long treasuries: flight-to-quality leg of a risk-off move"),
]

SOURCES = [stooq_source(sym, START.isoformat(), END.isoformat(), note)
           for sym, note in UNIVERSE] + [
    coingecko_source("bitcoin", days=365),
    coingecko_source("ethereum", days=365),
]


def main(argv=None) -> int:
    import argparse
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--refresh", action="store_true")
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--list", action="store_true")
    args = ap.parse_args(argv)
    f = Fetcher(ROOT)

    if args.list:
        for s in SOURCES:
            print(f"{s.name}\n  {s.url}\n  -> raw/{s.dest}\n  {s.note}")
        print(f"\n{len(SOURCES)} files, {START} .. {END}")
        return 0
    if args.verify:
        problems = f.verify()
        for p in problems:
            print("  " + p)
        print("VERIFICATION FAILED" if problems else
              f"all {len(f.load_manifest()['files'])} cached file(s) verified")
        return 1 if problems else 0

    print(f"fetching {len(SOURCES)} series, {START} .. {END}")
    try:
        f.get_all(SOURCES, refresh=args.refresh)
    except NetworkBlocked as e:
        print(f"\nBLOCKED: {e}", file=sys.stderr)
        return 2
    except FetchError as e:
        print(f"\nFAILED: {e}", file=sys.stderr)
        return 1
    print(f"\nwrote {f.manifest_path}")
    print("run `python -m src.demo --real` to test transmission on the real tape")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
