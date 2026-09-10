#!/usr/bin/env python3
"""
Stamp the `Date` column on every row of both Notion databases.

Both databases keep one row per observation, so `Date` is what makes history
possible: each future 13F round appends rows with a new date instead of
overwriting the old ones, and the site publishes only the newest date per fund.

The existing rows are the Q1 2026 round, whose filing deadline was 2026-05-15
(holdings as of 2026-03-31), so that is the default.

Safe to re-run: rows that already carry a Date are skipped, so a run that dies
partway through can simply be run again. Nothing else on a row is touched.

    python set_date.py --dry-run
    python set_date.py
    python set_date.py --only holdings --date 2026-08-14
"""

from __future__ import annotations

import argparse
import os
import sys
import time

import requests

NOTION_VERSION = "2025-09-03"
NOTION_API = "https://api.notion.com/v1"
NOTION_DELAY_SECONDS = 0.34
PAGE_SIZE = 100

DEFAULT_DATE = "2026-05-15"

DATA_SOURCES = {
    "holdings": ("Investor Portfolio Holdings", "d4057fe8-abca-447f-adc8-b1013d014c52"),
    "investors": ("Investor/Institution List", "22fa9897-a214-44b7-8e2b-189e3e438580"),
}


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


def query_all(h: dict, data_source_id: str) -> list[dict]:
    url = f"{NOTION_API}/data_sources/{data_source_id}/query"
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


def has_date(page: dict, column: str) -> bool:
    prop = (page.get("properties", {}).get(column) or {}).get("date") or {}
    return bool(prop.get("start"))


def stamp(h: dict, label: str, data_source_id: str, column: str,
          date: str, dry_run: bool) -> int:
    rows = query_all(h, data_source_id)
    todo = [p for p in rows if not has_date(p, column)]
    print(f"\n{label}: {len(rows)} rows, {len(todo)} without a {column}.")

    if not todo:
        print("  nothing to do.")
        return 0
    if dry_run:
        print(f"  would stamp {len(todo)} rows as {date}.")
        return 0

    for n, page in enumerate(todo, 1):
        time.sleep(NOTION_DELAY_SECONDS)
        resp = requests.patch(
            f"{NOTION_API}/pages/{page['id']}",
            headers=h,
            json={"properties": {column: {"date": {"start": date}}}},
            timeout=30,
        )
        if resp.status_code != 200:
            raise RuntimeError(f"Notion {resp.status_code} on {page['id']}: {resp.text}")
        if n % 100 == 0 or n == len(todo):
            print(f"  {n}/{len(todo)}")
    return len(todo)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dry-run", action="store_true", help="report only, write nothing")
    ap.add_argument("--date", default=DEFAULT_DATE,
                    help=f"date to stamp, YYYY-MM-DD (default {DEFAULT_DATE})")
    ap.add_argument("--column", default="Date", help="date property name (default Date)")
    ap.add_argument("--only", choices=sorted(DATA_SOURCES),
                    help="limit to one database (default: both)")
    args = ap.parse_args()

    # Fail before touching anything rather than halfway through 1,000 writes.
    try:
        time.strptime(args.date, "%Y-%m-%d")
    except ValueError:
        print(f"ERROR: --date must be YYYY-MM-DD, got {args.date!r}", file=sys.stderr)
        return 1

    h = headers()
    targets = [args.only] if args.only else sorted(DATA_SOURCES)

    written = 0
    for key in targets:
        label, ds_id = DATA_SOURCES[key]
        written += stamp(h, label, ds_id, args.column, args.date, args.dry_run)

    print(f"\n{written} row(s) stamped as {args.date}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
