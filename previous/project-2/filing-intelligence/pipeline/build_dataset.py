#!/usr/bin/env python3
"""Build data.json for the Regulatory Filing Intelligence site.

    export SEC_USER_AGENT="Your Name you@example.com"
    python pipeline/build_dataset.py --tickers AAPL MSFT NVDA

Pulls each company's two most recent 10-K filings (and the latest 10-Q),
extracts the Items, compares each Item against the prior period, and writes
findings that link back to the filing they came from.

Without --tickers it rebuilds whatever is already in data/data.json, so a
scheduled run refreshes the same universe.
"""
from __future__ import annotations

import argparse
import json
import os
import pathlib
import sys
from datetime import datetime, timezone

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from pipeline.analyze import compare_sections, rank          # noqa: E402
from pipeline.edgar_client import EdgarClient, EdgarError    # noqa: E402
from pipeline.sections import html_to_text, split_items, find_section  # noqa: E402

OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "data.json"

# Items worth diffing. Risk Factors and MD&A are where disclosure actually
# moves; the rest change for boilerplate reasons and would bury the signal.
DIFF_ITEMS = [("1A", "Risk Factors"), ("7", "Management's Discussion and Analysis")]

MAX_TEXT = 1200   # trim stored quotes; the site links out for full context


def analyse_company(client: EdgarClient, ticker: str, *, verbose=True) -> dict | None:
    if verbose:
        print(f"  {ticker}: listing filings…", flush=True)
    filings = client.filings(ticker, forms=("10-K",), limit=2)
    if len(filings) < 2:
        print(f"  {ticker}: needs two 10-K filings, found {len(filings)} — skipped")
        return None

    current, prior = filings[0], filings[1]
    if verbose:
        print(f"  {ticker}: {current.form} {current.period} vs {prior.period}", flush=True)

    cur_secs = split_items(html_to_text(client.document(current)), current.form)
    pri_secs = split_items(html_to_text(client.document(prior)), prior.form)

    findings, coverage = [], []
    for item, title in DIFF_ITEMS:
        a, b = find_section(cur_secs, item), find_section(pri_secs, item)
        coverage.append({
            "item": item, "title": title,
            "current_chars": a.char_count if a else 0,
            "prior_chars": b.char_count if b else 0,
            "compared": bool(a and b),
        })
        if not (a and b):
            continue
        for f in rank(compare_sections(a.text, b.text, item=item, item_title=title)):
            d = f.to_dict()
            d["text"] = d["text"][:MAX_TEXT]
            if d.get("prior_text"):
                d["prior_text"] = d["prior_text"][:MAX_TEXT]
            findings.append(d)

    counts = {k: sum(1 for f in findings if f["kind"] == k)
              for k in ("escalated", "added", "removed")}
    return {
        "ticker": ticker.upper(),
        "company": current.company,
        "cik": current.cik,
        "current": {"form": current.form, "filed": current.filed,
                    "period": current.period, "url": current.url},
        "prior": {"form": prior.form, "filed": prior.filed,
                  "period": prior.period, "url": prior.url},
        "coverage": coverage,
        "counts": counts,
        "findings": findings,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--tickers", nargs="+", help="e.g. --tickers AAPL MSFT")
    ap.add_argument("--out", type=pathlib.Path, default=OUT)
    args = ap.parse_args()

    tickers = args.tickers
    if not tickers:
        if args.out.exists():
            existing = json.loads(args.out.read_text())
            tickers = [c["ticker"] for c in existing.get("companies", [])]
            print(f"No --tickers given; refreshing existing universe: {', '.join(tickers)}")
        if not tickers:
            ap.error("no --tickers given and no existing dataset to refresh")

    try:
        client = EdgarClient()
    except EdgarError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    companies, failed = [], []
    for t in tickers:
        try:
            row = analyse_company(client, t)
            if row:
                companies.append(row)
        except EdgarError as e:
            print(f"  {t}: {e} — skipped", file=sys.stderr)
            failed.append(t)

    if not companies:
        print("ERROR: no companies analysed; nothing written.", file=sys.stderr)
        return 1

    payload = {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "SEC EDGAR",
        "source_note": "Live filings pulled from SEC EDGAR. Every finding quotes "
                       "the filing it came from and links to that document.",
        "is_sample": False,
        "diff_items": [{"item": i, "title": t} for i, t in DIFF_ITEMS],
        "failed": failed,
        "companies": companies,
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(payload, indent=1), encoding="utf8")

    total = sum(len(c["findings"]) for c in companies)
    print(f"\nWrote {args.out} — {len(companies)} companies, {total} findings.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
