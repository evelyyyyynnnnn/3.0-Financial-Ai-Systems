#!/usr/bin/env python3
"""
Refresh data.json for the Giant Portfolio Tracker from Notion.

Pulls every row of the "Investor Portfolio Holdings" data source (inside the
"Big Giant Portfolio" page), groups it by Investor/Institution, and writes
out data.json next to this script, in the shape the site's index.html
expects.

Requires:
    pip install requests
    env var NOTION_TOKEN  - a Notion internal integration token that has
                             been shared with the "Investor Portfolio
                             Holdings" database.

Usage:
    python refresh_data.py
"""

import os
import sys
import json
import datetime
import requests

# ---- Configuration -------------------------------------------------------

HOLDINGS_DATA_SOURCE_ID = "d4057fe8-abca-447f-adc8-b1013d014c52"
DIRECTORY_DATA_SOURCE_ID = "22fa9897-a214-44b7-8e2b-189e3e438580"
NOTION_VERSION = "2025-09-03"
# data.json sits beside this script, at the folder Vercel serves as the site
# root, so index.html can load it with a relative fetch('data.json').
OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json")
PAGE_SIZE = 100

# ---- Notion property extraction helpers -----------------------------------

def prop_number(props, name):
    p = props.get(name) or {}
    val = p.get("number")
    return float(val) if val is not None else 0.0

def prop_date(props, name):
    """Start date of a date property, or "" when it is empty."""
    p = props.get(name) or {}
    d = p.get("date") or {}
    return d.get("start") or ""

def prop_text(props, name):
    """Handles rich_text, title, and select property types."""
    p = props.get(name) or {}
    ptype = p.get("type")
    if ptype == "select":
        sel = p.get("select")
        return sel["name"] if sel else ""
    if ptype in ("rich_text", "title"):
        parts = p.get(ptype) or []
        return "".join(part.get("plain_text", "") for part in parts)
    return ""

# ---- Fetch all rows from Notion -------------------------------------------

def _query_all_pages(token, data_source_id):
    url = f"https://api.notion.com/v1/data_sources/{data_source_id}/query"
    headers = {
        "Authorization": f"Bearer {token}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }

    pages = []
    cursor = None
    while True:
        body = {"page_size": PAGE_SIZE}
        if cursor:
            body["start_cursor"] = cursor

        resp = requests.post(url, headers=headers, json=body, timeout=30)
        if resp.status_code != 200:
            print(f"Notion API error {resp.status_code}: {resp.text}", file=sys.stderr)
            resp.raise_for_status()

        payload = resp.json()
        pages.extend(payload.get("results", []))

        if payload.get("has_more"):
            cursor = payload.get("next_cursor")
        else:
            break

    return pages


def latest_quarter_only(rows):
    """Keep each investor's most recent Date and drop older quarters.

    The database keeps history - every quarter appends a fresh set of rows - but
    the site shows one snapshot. Without this filter a fund that has filed twice
    would have both quarters summed into its total, roughly doubling it and
    corrupting the cross-fund company aggregate as well.

    Filtering per investor rather than globally matters because funds file at
    different times within the 45-day window: a global cutoff would make every
    fund that has not filed yet disappear from the site until it does.
    """
    newest = {}
    for r in rows:
        d = r.get("report_date", "")
        inv = r["investor"]
        # `not in` rather than a default of "": rows predating the Date
        # column have d == "", and comparing "" > "" would leave the investor
        # out of the map entirely and blow up the lookup below. Every row in the
        # database is in exactly that state until the backfill has run.
        if inv not in newest or d > newest[inv]:
            newest[inv] = d
    return [r for r in rows if r.get("report_date", "") == newest[r["investor"]]]


def fetch_all_rows(token):
    """Rows from the 'Investor Portfolio Holdings' data source."""
    rows = []
    for page in _query_all_pages(token, HOLDINGS_DATA_SOURCE_ID):
        props = page.get("properties", {})
        row = {
            "investor": prop_text(props, "Investor/Institution"),
            "company": prop_text(props, "Company"),
            "pct": prop_number(props, "% of Portfolio"),
            "shares": prop_number(props, "Shares"),
            "value": prop_number(props, "Value"),
            "price": prop_number(props, "Reported Price"),
            "chg": prop_text(props, "Change %"),
            "report_date": prop_date(props, "Date"),
        }
        if row["investor"] and row["company"]:
            rows.append(row)
    return latest_quarter_only(rows)


def fetch_directory(token):
    """Rows from the 'Investor/Institution List' data source: full (untruncated)
    names, representative/manager, and fund type — used to enrich search."""
    directory = []
    for page in _query_all_pages(token, DIRECTORY_DATA_SOURCE_ID):
        props = page.get("properties", {})
        entry = {
            "name": prop_text(props, "Investor/Institution Name"),
            "rep": prop_text(props, "Representative") or None,
            "kind": prop_text(props, "Investor/Institution Characteristic") or None,
        }
        if entry["name"]:
            directory.append(entry)
    return directory


def match_directory_entry(short_name, directory):
    """The holdings data source truncates long names (Notion select option
    limit); the directory has the full names. Match by prefix."""
    candidates = [d for d in directory if d["name"].startswith(short_name)]
    if candidates:
        return candidates[0]
    return {"name": short_name, "rep": None, "kind": None}

# ---- Build the site's data.json shape --------------------------------------

def build_site_data(rows, directory):
    by_investor = {}
    for r in rows:
        by_investor.setdefault(r["investor"], []).append(
            {
                "company": r["company"],
                "pct": round(r["pct"] * 100, 2),
                "shares": r["shares"],
                "value": r["value"],
                "price": r["price"],
                "chg": r["chg"] or None,
            }
        )

    investors = []
    for short_name, holdings in by_investor.items():
        holdings.sort(key=lambda h: -h["pct"])
        info = match_directory_entry(short_name, directory)

        keywords = {info["name"], short_name}
        if info["rep"]:
            keywords.add(info["rep"])
        if info["kind"]:
            keywords.add(info["kind"])

        investors.append(
            {
                "name": info["name"],          # full, untruncated name
                "short_name": short_name,       # as stored in the holdings table
                "representative": info["rep"],
                "fund_type": info["kind"],
                "search_keywords": sorted(keywords),
                "holdings_count": len(holdings),
                "total_value": sum(h["value"] for h in holdings),
                "holdings": holdings,
            }
        )
    investors.sort(key=lambda i: -i["total_value"])

    agg = {}
    for inv in investors:
        seen = set()
        for h in inv["holdings"]:
            c = h["company"]
            if c in seen:
                continue
            seen.add(c)
            entry = agg.setdefault(
                c, {"company": c, "investor_count": 0, "total_value": 0.0, "investors": []}
            )
            entry["investor_count"] += 1
            entry["total_value"] += h["value"]
            entry["investors"].append(inv["name"])

    top_companies = sorted(
        agg.values(), key=lambda c: (-c["investor_count"], -c["total_value"])
    )

    return {
        "generated_at": datetime.datetime.now(datetime.timezone.utc)
        .isoformat()
        .replace("+00:00", "Z"),
        "source_note": (
            'Investor/Institution 13F holdings, sourced from Notion '
            '"Big Giant Portfolio" database'
        ),
        "report_dates": sorted(
            {r["report_date"] for r in rows if r.get("report_date")}
        ),
        "investors": investors,
        "top_companies": top_companies,
    }

# ---- Main -------------------------------------------------------------------

def main():
    token = os.environ.get("NOTION_TOKEN")
    if not token:
        print("ERROR: NOTION_TOKEN environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    print("Fetching holding rows from Notion...")
    rows = fetch_all_rows(token)
    print(f"Fetched {len(rows)} holding rows.")

    if not rows:
        print("ERROR: fetched zero rows, refusing to overwrite data.json.", file=sys.stderr)
        sys.exit(1)

    print("Fetching investor/institution directory from Notion...")
    directory = fetch_directory(token)
    print(f"Fetched {len(directory)} directory entries.")

    data = build_site_data(rows, directory)
    print(f"Built data for {len(data['investors'])} investors, "
          f"{len(data['top_companies'])} distinct companies.")

    out_path = os.path.abspath(OUTPUT_PATH)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(data, f, separators=(",", ":"))

    print(f"Wrote {out_path}")

if __name__ == "__main__":
    main()
