#!/usr/bin/env python3
"""
One-time: stamp the existing holdings rows with the quarter they came from.

The rows that were in the database before Report Date existed are the Q1 2026
filing round (both databases were last edited 2026-07-02, and the Q2 filings
were not published until 2026-08-14), so they are dated 2026-03-31 - the quarter
end a 13F reports on, not the date it was filed.

Safe to re-run: rows that already carry a Report Date are left alone, so a run
that dies partway through can simply be run again.

    python backfill_report_date.py --dry-run
    python backfill_report_date.py
"""

from __future__ import annotations

import argparse
import os
import sys
import time

import requests

HOLDINGS_DATA_SOURCE_ID = "d4057fe8-abca-447f-adc8-b1013d014c52"
NOTION_VERSION = "2025-09-03"
NOTION_API = "https://api.notion.com/v1"
NOTION_DELAY_SECONDS = 0.34
PAGE_SIZE = 100

BASELINE_QUARTER_END = "2026-03-31"


def headers() -> dict:
    token = os.environ.get("NOTION_TOKEN")
    if not token:
        print("ERROR: NOTION_TOKEN environment variable is not set.", file=sys.stderr)
        sys.exit(1)
    return {
        "Authorization": f"Bearer {token}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }


def query_all(h: dict) -> list[dict]:
    url = f"{NOTION_API}/data_sources/{HOLDINGS_DATA_SOURCE_ID}/query"
    results, cursor = [], None
    while True:
        payload = {"page_size": PAGE_SIZE}
        if cursor:
            payload["start_cursor"] = cursor
        time.sleep(NOTION_DELAY_SECONDS)
        resp = requests.post(url, headers=h, json=payload, timeout=30)
        if resp.status_code != 200:
            raise RuntimeError(f"Notion {resp.status_code}: {resp.text}")
        data = resp.json()
        results.extend(data.get("results", []))
        if not data.get("has_more"):
            return results
        cursor = data.get("next_cursor")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dry-run", action="store_true", help="report only, write nothing")
    ap.add_argument("--date", default=BASELINE_QUARTER_END,
                    help=f"quarter end to stamp (default {BASELINE_QUARTER_END})")
    args = ap.parse_args()

    h = headers()
    rows = query_all(h)
    todo = [
        p for p in rows
        if not ((p.get("properties", {}).get("Report Date") or {}).get("date") or {}).get("start")
    ]

    print(f"{len(rows)} holding rows, {len(todo)} without a Report Date.")
    if not todo:
        print("Nothing to do.")
        return 0
    if args.dry_run:
        print(f"Would stamp {len(todo)} rows as {args.date}.")
        return 0

    for n, page in enumerate(todo, 1):
        time.sleep(NOTION_DELAY_SECONDS)
        resp = requests.patch(
            f"{NOTION_API}/pages/{page['id']}",
            headers=h,
            json={"properties": {"Report Date": {"date": {"start": args.date}}}},
            timeout=30,
        )
        if resp.status_code != 200:
            raise RuntimeError(f"Notion {resp.status_code} on page {page['id']}: {resp.text}")
        if n % 100 == 0 or n == len(todo):
            print(f"  {n}/{len(todo)}")

    print(f"Stamped {len(todo)} rows as {args.date}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
