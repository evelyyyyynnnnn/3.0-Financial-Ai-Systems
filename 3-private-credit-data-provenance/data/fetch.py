"""Pull real private-credit disclosures from SEC EDGAR.

    python -m data.fetch --list
    DATAKIT_UA="Your Name you@email" python -m data.fetch
    python -m data.fetch --verify

Business development companies are the public window onto private credit. A
BDC's 10-K carries a Consolidated Schedule of Investments listing, loan by
loan, the borrower, the reference rate and spread, the floor, the maturity and
the principal -- the exact fields this project extracts, written by people who
were not thinking about an extractor.

That is what makes them a harder test than the authored corpus. Real schedules
use inconsistent abbreviations (S+, SOFR+, L+ on older loans), split a single
loan across table rows, and put the same number in a footnote in different
words. An extractor tuned on tidy prose will find some of it and miss the rest,
and the point of running here is to find out which.

The BDCs below are among the largest by assets, chosen so their schedules are
long and their drafting conventions differ.
"""
from __future__ import annotations

import pathlib
import sys

from .datakit import Fetcher, FetchError, NetworkBlocked
from .edgar_api import SUBMISSIONS, TICKERS, cik_for_ticker, recent_filings

ROOT = pathlib.Path(__file__).resolve().parent

# ticker -> why it is in the sample
BDCS = {
    "ARCC": "Ares Capital -- the largest BDC, longest schedule",
    "OBDC": "Blue Owl Capital Corporation",
    "FSK":  "FS KKR Capital",
    "PSEC": "Prospect Capital -- different drafting conventions",
    "MAIN": "Main Street Capital -- lower middle market, smaller loans",
}

INDEX_NAME = "EDGAR ticker-to-CIK map"


def resolve(f: Fetcher, refresh: bool = False) -> list:
    from .datakit import Source
    tickers_json = f.get(Source(
        name=INDEX_NAME, url=TICKERS, dest="company_tickers.json",
        publisher="U.S. SEC (EDGAR)",
        terms="U.S. government work, public domain"), refresh=refresh).read_bytes()

    filings = []
    for tic in BDCS:
        cik10 = cik_for_ticker(tickers_json, tic)
        sub = f.get(Source(
            name=f"{tic} submissions index",
            url=SUBMISSIONS.format(cik10=cik10),
            dest=f"{tic.lower()}/submissions.json",
            publisher="U.S. SEC (EDGAR)",
            terms="U.S. government work, public domain"), refresh=refresh)
        filings += recent_filings(sub.read_bytes(), tic, form="10-K", limit=1)
    return filings


def main(argv=None) -> int:
    import argparse
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--refresh", action="store_true")
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--list", action="store_true")
    args = ap.parse_args(argv)
    f = Fetcher(ROOT)

    if args.list:
        print(f"{INDEX_NAME}\n  {TICKERS}\n")
        for tic, why in BDCS.items():
            print(f"{tic:<6} {why}")
        print(f"\nthe most recent 10-K for each, "
              f"{1 + 2 * len(BDCS)} requests in total")
        return 0
    if args.verify:
        problems = f.verify()
        for p in problems:
            print("  " + p)
        print("VERIFICATION FAILED" if problems else
              f"all {len(f.load_manifest()['files'])} cached file(s) verified")
        return 1 if problems else 0

    try:
        print("resolving BDC filings through EDGAR ...")
        filings = resolve(f, args.refresh)
        print(f"resolved {len(filings)} filings; downloading ...")
        f.get_all([x.source() for x in filings], refresh=args.refresh)
    except NetworkBlocked as e:
        print(f"\nBLOCKED: {e}", file=sys.stderr)
        return 2
    except FetchError as e:
        print(f"\nFAILED: {e}", file=sys.stderr)
        return 1
    print(f"\nwrote {f.manifest_path}")
    print("run `python -m src.demo --real` to extract terms with provenance")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
