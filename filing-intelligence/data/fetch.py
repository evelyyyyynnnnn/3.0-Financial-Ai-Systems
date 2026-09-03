"""Pull the real 10-K filings this project diffs.

    python -m data.fetch --list          # show what would be downloaded
    DATAKIT_UA="Your Name you@email" python -m data.fetch
    python -m data.fetch --verify        # re-hash the cache against MANIFEST

For each company this fetches the two most recent 10-Ks, which is exactly the
input the risk-factor diff needs: the same registrant, one year apart, so a
change in Item 1A is a real change in disclosed risk rather than a difference
between two companies' drafting styles.

SEC's fair-access policy requires a User-Agent that names a real contact.
Set DATAKIT_UA or the fetch will be refused with a 403.
"""
from __future__ import annotations

import pathlib
import sys

from .datakit import Fetcher, FetchError, NetworkBlocked, Source
from .edgar_api import SUBMISSIONS, TICKERS, cik_for_ticker, recent_filings

ROOT = pathlib.Path(__file__).resolve().parent

# Large registrants with long, heavily-revised Item 1A sections. Diversified
# across sectors because risk-factor drafting conventions differ by industry,
# and a differ tuned on one sector's boilerplate will flatter itself.
COMPANIES = ["AAPL", "JPM", "PFE", "XOM", "BA"]

INDEX = Source(
    name="EDGAR ticker-to-CIK map", url=TICKERS, dest="company_tickers.json",
    publisher="U.S. SEC (EDGAR)", terms="U.S. government work, public domain",
    note="maps the tickers in COMPANIES to the CIKs the submissions API needs",
)


def resolve(f: Fetcher) -> list:
    """Two-stage resolution: ticker -> CIK -> the two most recent 10-K URLs."""
    tickers_json = f.get(INDEX).read_bytes()
    filings = []
    for tic in COMPANIES:
        cik10 = cik_for_ticker(tickers_json, tic)
        sub = f.get(Source(
            name=f"{tic} submissions index",
            url=SUBMISSIONS.format(cik10=cik10),
            dest=f"{tic.lower()}/submissions.json",
            publisher="U.S. SEC (EDGAR)",
            terms="U.S. government work, public domain",
        ))
        filings += recent_filings(sub.read_bytes(), tic, form="10-K", limit=2)
    return filings


def main(argv=None) -> int:
    import argparse
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--refresh", action="store_true")
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--list", action="store_true")
    args = ap.parse_args(argv)

    f = Fetcher(ROOT)

    if args.verify:
        problems = f.verify()
        for p in problems:
            print("  " + p)
        print("MANIFEST VERIFICATION FAILED" if problems
              else f"all {len(f.load_manifest()['files'])} cached file(s) verified")
        return 1 if problems else 0

    if args.list:
        print(f"{INDEX.name}\n  {INDEX.url}")
        print(f"\nthen, for each of {', '.join(COMPANIES)}:")
        print(f"  {SUBMISSIONS.format(cik10='<CIK>')}")
        print("  -> the two most recent 10-K documents under "
              "https://www.sec.gov/Archives/edgar/data/<cik>/<accession>/")
        print(f"\n{2 * len(COMPANIES)} filings, "
              f"{1 + 3 * len(COMPANIES)} requests in total")
        return 0

    try:
        print("resolving filings through EDGAR's submissions API ...")
        filings = resolve(f)
        print(f"resolved {len(filings)} filings; downloading documents ...")
        f.get_all([x.source() for x in filings], refresh=args.refresh)
    except NetworkBlocked as e:
        print(f"\nBLOCKED: {e}", file=sys.stderr)
        return 2
    except FetchError as e:
        print(f"\nFAILED: {e}", file=sys.stderr)
        return 1

    print(f"\nwrote {f.manifest_path}")
    print("run `python -m src.demo --real` to diff the real filings")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
