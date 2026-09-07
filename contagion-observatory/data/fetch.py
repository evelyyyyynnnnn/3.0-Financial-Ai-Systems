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
from .marketdata import coingecko_source, french_industries_source

ROOT = pathlib.Path(__file__).resolve().parent

END = date.today()
START = END - timedelta(days=3 * 365)

# The transmission analysis needs at least three return series that share one
# trading calendar. The original per-ticker Stooq universe (btcusd, spy.us,
# coin.us, ...) is now behind a JavaScript bot-wall: every request returns a
# 796-byte proof-of-work challenge page with HTTP 200, not a CSV, so all nine
# series parse as unusable and --real cannot run. The Fama-French 10 industry
# portfolios are the reachable substitute -- ten daily value-weighted return
# series, one calendar, no login, a stable URL -- and they turn the question
# into cross-industry transmission rather than crypto->equity contagion.
SOURCES = [
    french_industries_source(),
    # Kept because they are reachable and already cached; not required by the
    # real analysis, which now runs on the French industry portfolios.
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
