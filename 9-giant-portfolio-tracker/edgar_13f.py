#!/usr/bin/env python3
"""
Pull 13F-HR holdings from SEC EDGAR and write them into the Notion
"Investor Portfolio Holdings" database, tagged with the quarter they report on.

Why EDGAR and not Dataroma: Dataroma publishes only a manager's *top* holdings,
so 16 of the 50 funds in this database currently sum to well under 100% of
portfolio (Greenlight 68%, Bill Miller 78%). EDGAR's information table is the
complete filing, is structured XML rather than rendered HTML, and is the source
every aggregator republishes.

The two columns Dataroma gave us that the raw filing does not are both one
division away:

    % of Portfolio = value / (sum of the fund's values)
    Reported Price = value / shares

Requires:
    pip install requests
    env NOTION_TOKEN   - integration token, shared with both databases
    env SEC_USER_AGENT - EDGAR requires a contact string, e.g.
                         "Evelyn Du evelyn@example.com". EDGAR blocks requests
                         without one.

Usage:
    python edgar_13f.py --dry-run              # fetch + report, write nothing
    python edgar_13f.py --investor "Berkshire" # one fund, for a first run
    python edgar_13f.py                        # all funds that have a CIK
"""

from __future__ import annotations

import argparse
import json
import os
import re
import statistics
import sys
import time
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field

import requests

# ---- Configuration ---------------------------------------------------------

HOLDINGS_DATA_SOURCE_ID = "d4057fe8-abca-447f-adc8-b1013d014c52"
DIRECTORY_DATA_SOURCE_ID = "22fa9897-a214-44b7-8e2b-189e3e438580"
NOTION_VERSION = "2025-09-03"
NOTION_API = "https://api.notion.com/v1"

SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik10}.json"
FILING_INDEX = "https://www.sec.gov/Archives/edgar/data/{cik}/{acc_nodash}/index.json"
ARCHIVE_FILE = "https://www.sec.gov/Archives/edgar/data/{cik}/{acc_nodash}/{name}"

# EDGAR asks for <=10 requests/second. We are far below that, but be explicit.
SEC_DELAY_SECONDS = 0.15
# Notion's API is rate limited to roughly 3 requests/second.
NOTION_DELAY_SECONDS = 0.34

PAGE_SIZE = 100

# Form 13F reported values in *thousands* until the SEC's amendments took
# effect in January 2023; whole dollars from then on. Filings for older periods
# still exist in EDGAR, so the unit cannot be assumed.
WHOLE_DOLLARS_FROM = "2023-01-01"


# ---- Small helpers ---------------------------------------------------------


def sec_headers() -> dict:
    ua = os.environ.get("SEC_USER_AGENT", "").strip()
    if not ua:
        print(
            "ERROR: SEC_USER_AGENT is not set. EDGAR requires a contact string,\n"
            '       e.g. SEC_USER_AGENT="Your Name you@example.com".',
            file=sys.stderr,
        )
        sys.exit(1)
    return {"User-Agent": ua, "Accept-Encoding": "gzip, deflate"}


def notion_headers() -> dict:
    token = os.environ.get("NOTION_TOKEN")
    if not token:
        print("ERROR: NOTION_TOKEN environment variable is not set.", file=sys.stderr)
        sys.exit(1)
    return {
        "Authorization": f"Bearer {token}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }


def strip_ns(tag: str) -> str:
    """`{http://www.sec.gov/edgar/document/thirteenf/informationtable}value` -> `value`."""
    return tag.rsplit("}", 1)[-1]


def quarter_label(period: str) -> str:
    """2026-03-31 -> Q1 2026. Used only for log output."""
    y, m, _ = period.split("-")
    return f"Q{(int(m) - 1) // 3 + 1} {y}"


# ---- EDGAR ------------------------------------------------------------------


@dataclass
class Position:
    issuer: str
    cusip: str
    value: float
    shares: float


@dataclass
class Filing:
    cik: str
    accession: str
    period: str  # YYYY-MM-DD, the quarter end the filing reports on
    positions: list[Position] = field(default_factory=list)


def _get(url: str, headers: dict) -> requests.Response:
    time.sleep(SEC_DELAY_SECONDS)
    resp = requests.get(url, headers=headers, timeout=30)
    if resp.status_code != 200:
        raise RuntimeError(f"EDGAR {resp.status_code} for {url}")
    return resp


def latest_13f(cik10: str, headers: dict) -> tuple[str, str]:
    """Most recent 13F-HR for this filer, as (accession, period_of_report).

    EDGAR's submissions feed keeps the newest filings in `filings.recent`; that
    covers well over a year of quarterly filings, so the older paginated files
    are not worth fetching for a job that runs every quarter.
    """
    data = _get(SUBMISSIONS.format(cik10=cik10), headers).json()
    recent = data.get("filings", {}).get("recent", {})
    forms = recent.get("form", [])
    accessions = recent.get("accessionNumber", [])
    periods = recent.get("reportDate", [])

    for form, acc, period in zip(forms, accessions, periods):
        # 13F-HR/A are amendments; they can restate or only add. Prefer the
        # plain 13F-HR so a partial amendment never silently replaces a full one.
        if form == "13F-HR" and period:
            return acc, period
    raise RuntimeError(f"no 13F-HR found for CIK {cik10}")


def information_table_xml(cik10: str, accession: str, headers: dict) -> bytes:
    """Locate and download the information table inside a 13F filing.

    A 13F submission carries two XML documents: `primary_doc.xml` (the cover
    page) and the information table, whose filename is not standardised —
    infotable.xml, form13fInfoTable.xml, and bare accession names all occur. So
    the candidates are filtered by name and then confirmed by content.
    """
    cik = str(int(cik10))
    acc_nodash = accession.replace("-", "")
    listing = _get(FILING_INDEX.format(cik=cik, acc_nodash=acc_nodash), headers).json()
    names = [i["name"] for i in listing.get("directory", {}).get("item", [])]

    candidates = [n for n in names if n.lower().endswith(".xml")]
    # Cover page first out, then try the most likely names first.
    candidates = [n for n in candidates if n.lower() != "primary_doc.xml"]
    candidates.sort(key=lambda n: 0 if "infotable" in n.lower().replace("_", "") else 1)

    for name in candidates:
        body = _get(
            ARCHIVE_FILE.format(cik=cik, acc_nodash=acc_nodash, name=name), headers
        ).content
        if b"infoTable" in body or b"informationTable" in body:
            return body
    raise RuntimeError(f"no information table in {accession} (saw {names})")


def parse_information_table(xml_bytes: bytes, period: str) -> list[Position]:
    """Parse a 13F information table into one Position per issuer.

    Three things this has to get right, each of which silently corrupts the
    numbers otherwise:

    * Options. Rows carrying <putCall> are option positions on the issuer, not
      shares of it, and folding them in overstates both share count and value.
    * Non-share units. sshPrnamtType 'PRN' is a principal amount of debt; only
      'SH' rows are share counts.
    * Lots. A fund holding one issuer across several managers files several
      rows for it, so rows must be summed per issuer rather than taken as-is.
    """
    root = ET.fromstring(xml_bytes)

    by_issuer: dict[str, Position] = {}
    for node in root.iter():
        if strip_ns(node.tag) != "infoTable":
            continue

        fields: dict[str, str] = {}
        shares = 0.0
        share_type = ""
        put_call = ""
        for child in node.iter():
            tag = strip_ns(child.tag)
            text = (child.text or "").strip()
            if tag in ("nameOfIssuer", "cusip", "value", "putCall"):
                fields[tag] = text
            elif tag == "sshPrnamt" and text:
                shares = float(text.replace(",", ""))
            elif tag == "sshPrnamtType":
                share_type = text
        put_call = fields.get("putCall", "")

        if put_call:
            continue
        if share_type and share_type.upper() != "SH":
            continue

        issuer = fields.get("nameOfIssuer", "").strip()
        raw_value = fields.get("value", "").replace(",", "")
        if not issuer or not raw_value:
            continue
        value = float(raw_value)

        existing = by_issuer.get(issuer)
        if existing:
            existing.value += value
            existing.shares += shares
        else:
            by_issuer[issuer] = Position(
                issuer=issuer,
                cusip=fields.get("cusip", ""),
                value=value,
                shares=shares,
            )

    positions = list(by_issuer.values())
    scale = value_scale(positions, period)
    if scale != 1.0:
        for p in positions:
            p.value *= scale
    return positions


def value_scale(positions: list[Position], period: str) -> float:
    """Return 1.0 if values are already dollars, 1000.0 if they are thousands.

    The filing does not state its unit, so the period is the primary signal.
    Implied share price is the cross-check: a genuine equity portfolio has a
    median price in the tens of dollars, so a median under $1 means the values
    are thousands regardless of what the period suggested.
    """
    priced = [p.value / p.shares for p in positions if p.shares > 0]
    if not priced:
        return 1.0 if period >= WHOLE_DOLLARS_FROM else 1000.0

    median_price = statistics.median(priced)
    if median_price < 1.0:
        return 1000.0
    if median_price > 100_000:
        # Values already in dollars but shares misparsed; refuse rather than guess.
        raise RuntimeError(
            f"implausible median implied price ${median_price:,.0f}; refusing to scale"
        )
    return 1.0


def fetch_filing(cik10: str, headers: dict) -> Filing:
    accession, period = latest_13f(cik10, headers)
    xml_bytes = information_table_xml(cik10, accession, headers)
    positions = parse_information_table(xml_bytes, period)
    if not positions:
        raise RuntimeError(f"{cik10} {accession}: information table parsed to 0 rows")
    return Filing(cik=cik10, accession=accession, period=period, positions=positions)


# ---- Derived columns --------------------------------------------------------


def derive_rows(filing: Filing, prior: dict[str, float] | None) -> list[dict]:
    """Turn positions into the shape the Notion holdings database stores.

    `prior` maps issuer -> share count from the previous quarter, which is what
    makes Change % and Reduce/Add computable. Without it those stay blank rather
    than being guessed at.
    """
    total = sum(p.value for p in filing.positions)
    if total <= 0:
        raise RuntimeError(f"{filing.cik}: total portfolio value is {total}")

    rows = []
    for p in sorted(filing.positions, key=lambda p: -p.value):
        change_pct = None
        activity = "Buy" if prior is not None else None
        if prior is not None:
            was = prior.get(p.issuer)
            if was is None:
                activity = "Buy"
            elif was == 0:
                activity = "Buy"
            else:
                delta = (p.shares - was) / was * 100.0
                change_pct = round(delta, 2)
                if delta > 0.5:
                    activity = "Add"
                elif delta < -0.5:
                    activity = "Reduce"
                else:
                    activity = "Unchanged"

        rows.append(
            {
                "company": p.issuer,
                "cusip": p.cusip,
                "pct": round(p.value / total * 100.0, 2),
                "shares": p.shares,
                "value": p.value,
                "price": round(p.value / p.shares, 2) if p.shares else 0.0,
                "change_pct": change_pct,
                "activity": activity,
                "report_date": filing.period,
            }
        )
    return rows


# ---- Notion -----------------------------------------------------------------


def notion_query_all(data_source_id: str, headers: dict, body: dict | None = None):
    url = f"{NOTION_API}/data_sources/{data_source_id}/query"
    results, cursor = [], None
    while True:
        payload = dict(body or {})
        payload["page_size"] = PAGE_SIZE
        if cursor:
            payload["start_cursor"] = cursor
        time.sleep(NOTION_DELAY_SECONDS)
        resp = requests.post(url, headers=headers, json=payload, timeout=30)
        if resp.status_code != 200:
            raise RuntimeError(f"Notion {resp.status_code}: {resp.text}")
        data = resp.json()
        results.extend(data.get("results", []))
        if not data.get("has_more"):
            return results
        cursor = data.get("next_cursor")


def prop_text(props: dict, name: str) -> str:
    p = props.get(name) or {}
    kind = p.get("type")
    if kind == "select":
        sel = p.get("select")
        return sel["name"] if sel else ""
    if kind in ("rich_text", "title"):
        return "".join(part.get("plain_text", "") for part in (p.get(kind) or []))
    if kind == "url":
        return p.get("url") or ""
    return ""


def prop_number(props: dict, name: str) -> float:
    p = props.get(name) or {}
    val = p.get("number")
    return float(val) if val is not None else 0.0


def load_directory(headers: dict) -> list[dict]:
    """Investors that carry a CIK, with the select-option name used in holdings.

    The holdings database stores the investor as a *select*, and Notion truncates
    select option names at 31 characters, so the full name here cannot be used
    as a key directly. The truncated prefix is what actually matches.
    """
    out = []
    for page in notion_query_all(DIRECTORY_DATA_SOURCE_ID, headers):
        props = page.get("properties", {})
        cik = prop_text(props, "CIK").strip()
        name = prop_text(props, "Investor/Institution Name").strip()
        if cik and name:
            out.append(
                {
                    "name": name,
                    "cik": cik.zfill(10),
                    "select_key": name[:31],
                    "page_id": page["id"],
                }
            )
    return out


def existing_rows(headers: dict) -> list[dict]:
    return notion_query_all(HOLDINGS_DATA_SOURCE_ID, headers)


def prior_shares(rows: list[dict], select_key: str, before: str) -> dict[str, float]:
    """Share counts from the most recent quarter strictly before `before`."""
    dated: dict[str, list[dict]] = {}
    for page in rows:
        props = page.get("properties", {})
        if prop_text(props, "Investor/Institution") != select_key:
            continue
        date_prop = (props.get("Date") or {}).get("date") or {}
        start = date_prop.get("start")
        if start and start < before:
            dated.setdefault(start, []).append(props)
    if not dated:
        return {}
    latest = max(dated)
    return {
        prop_text(p, "Company"): prop_number(p, "Shares")
        for p in dated[latest]
        if prop_text(p, "Company")
    }


def create_holding(row: dict, select_key: str, headers: dict) -> None:
    props = {
        "Company": {"rich_text": [{"text": {"content": row["company"][:2000]}}]},
        "Investor/Institution": {"select": {"name": select_key}},
        "% of Portfolio": {"number": row["pct"]},
        "Shares": {"number": row["shares"]},
        "Value": {"number": row["value"]},
        "Reported Price": {"number": row["price"]},
        "Date": {"date": {"start": row["report_date"]}},
    }
    if row["change_pct"] is not None:
        props["Change %"] = {
            "rich_text": [{"text": {"content": f"{row['change_pct']:+.2f}%"}}]
        }
    if row["activity"]:
        props["Reduce/Add"] = {"select": {"name": row["activity"]}}

    time.sleep(NOTION_DELAY_SECONDS)
    resp = requests.post(
        f"{NOTION_API}/pages",
        headers=headers,
        json={
            "parent": {"type": "data_source_id", "data_source_id": HOLDINGS_DATA_SOURCE_ID},
            "properties": props,
        },
        timeout=30,
    )
    if resp.status_code not in (200, 201):
        raise RuntimeError(f"Notion create failed {resp.status_code}: {resp.text}")


# ---- Main -------------------------------------------------------------------


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dry-run", action="store_true",
                    help="fetch and report, write nothing to Notion")
    ap.add_argument("--investor", default=None,
                    help="only funds whose name contains this (case-insensitive)")
    ap.add_argument("--limit", type=int, default=None,
                    help="stop after this many funds")
    args = ap.parse_args()

    sec_h = sec_headers()
    notion_h = notion_headers()

    directory = load_directory(notion_h)
    if args.investor:
        needle = args.investor.lower()
        directory = [d for d in directory if needle in d["name"].lower()]
    if args.limit:
        directory = directory[: args.limit]

    if not directory:
        print(
            "No investors to process. Every row needs a CIK in the\n"
            '"Investor/Institution List" database before this job can run.',
            file=sys.stderr,
        )
        return 1

    print(f"{len(directory)} fund(s) with a CIK.\n")

    holdings = [] if args.dry_run else existing_rows(notion_h)
    written = skipped = 0
    failures: list[str] = []

    for entry in directory:
        label = entry["name"][:44]
        try:
            filing = fetch_filing(entry["cik"], sec_h)
        except Exception as exc:  # noqa: BLE001 - one bad filer must not stop the run
            print(f"  ! {label:44} FAILED  {exc}")
            failures.append(f"{entry['name']}: {exc}")
            continue

        already = [
            p
            for p in holdings
            if prop_text(p.get("properties", {}), "Investor/Institution") == entry["select_key"]
            and ((p.get("properties", {}).get("Date") or {}).get("date") or {}).get("start")
            == filing.period
        ]
        if already:
            print(f"  = {label:44} {quarter_label(filing.period)} already present "
                  f"({len(already)} rows) - skipped")
            skipped += 1
            continue

        prior = prior_shares(holdings, entry["select_key"], filing.period) if holdings else None
        rows = derive_rows(filing, prior or None)
        total = sum(r["value"] for r in rows)
        pct_sum = sum(r["pct"] for r in rows)

        print(f"  + {label:44} {quarter_label(filing.period)}  "
              f"{len(rows):3} positions  ${total/1e9:8.2f}B  sum%={pct_sum:6.2f}")

        if args.dry_run:
            continue

        for row in rows:
            create_holding(row, entry["select_key"], notion_h)
        written += len(rows)

    print(f"\n{written} rows written, {skipped} fund(s) already current, "
          f"{len(failures)} failed.")
    if failures:
        print("\nFailures:", file=sys.stderr)
        for f in failures:
            print(f"  {f}", file=sys.stderr)
        # A partial run is still useful, but the job should go red so the
        # failure is visible rather than buried in a green log.
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
