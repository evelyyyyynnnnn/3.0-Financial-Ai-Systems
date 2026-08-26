#!/usr/bin/env python3
"""Generate a labelled sample dataset so the site renders before any live pull.

The issuers here are fictional on purpose. Attaching invented risk-factor
language to a real ticker would produce a document that reads like a real SEC
disclosure and is not one, so the sample uses companies that plainly do not
exist, and the payload carries is_sample=true for the site to surface.

    python pipeline/make_sample.py

Replace it with real data at any time:

    export SEC_USER_AGENT="Your Name you@example.com"
    python pipeline/build_dataset.py --tickers AAPL MSFT NVDA
"""
from __future__ import annotations

import json
import pathlib
import sys
from datetime import datetime, timezone

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))
from pipeline.analyze import compare_sections, rank   # noqa: E402

OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "data.json"

COMPANIES = [
    {
        "ticker": "NRTH", "company": "Northwind Instruments Inc. (fictional)", "cik": 9900001,
        "risk_prior": """We face substantial competition across each of our markets.
Our manufacturing depends on a limited number of contract suppliers located in a single region.
We are subject to periodic examination by regulatory authorities in the ordinary course of business.
Our results may fluctuate as a result of changes in customer demand.
We rely on a single logistics provider for the majority of North American distribution.""",
        "risk_current": """We face substantial competition across each of our markets.
Our manufacturing depends on a limited number of contract suppliers located in a single region, and during the period we experienced supply chain disruption that had a material adverse impact on shipment volumes.
We are subject to periodic examination by regulatory authorities in the ordinary course of business, and in the fourth quarter we received a subpoena from a state authority relating to our distributor agreements.
Our results may fluctuate as a result of changes in customer demand.
We rely on a single logistics provider for the majority of North American distribution.
We identified a cybersecurity incident affecting a subset of customer records maintained by a third-party vendor.""",
        "mda_prior": """Revenue increased 8% year over year, driven by instrument sales.
Gross margin was consistent with the prior year at 41%.
We expect capital expenditures to remain broadly flat.""",
        "mda_current": """Revenue increased 3% year over year, driven by service contracts rather than instrument sales.
Gross margin declined to 36%, and we recorded an impairment of certain manufacturing assets.
We expect capital expenditures to remain broadly flat.""",
    },
    {
        "ticker": "CDLT", "company": "Cedar Lattice Holdings Corp. (fictional)", "cik": 9900002,
        "risk_prior": """Our credit facility contains financial covenants that we must satisfy quarterly.
We depend on three customers for a significant portion of consolidated revenue.
Changes in commodity input prices may affect our cost of goods sold.
Our international operations expose us to currency fluctuations.""",
        "risk_current": """Our credit facility contains financial covenants that we must satisfy quarterly, and we were not in compliance with the fixed charge coverage covenant as of the period end, resulting in a covenant breach for which we obtained a waiver.
We depend on three customers for a significant portion of consolidated revenue, and during the period we experienced the loss of a major customer representing approximately 14% of revenue.
Changes in commodity input prices may affect our cost of goods sold.
Our international operations expose us to currency fluctuations.""",
        "mda_prior": """Operating cash flow was positive for the fourth consecutive year.
Segment margins were stable across both reporting units.""",
        "mda_current": """Operating cash flow was negative for the first time since 2019.
Segment margins compressed in the industrial unit, and management concluded there is substantial doubt about our ability to continue as a going concern absent refinancing.""",
    },
    {
        "ticker": "MRDN", "company": "Meridian Grid Systems Ltd. (fictional)", "cik": 9900003,
        "risk_prior": """We operate in a heavily regulated industry and require permits in each jurisdiction.
Our backlog may not convert to revenue on the timeline we anticipate.
We are exposed to interest rate risk on our variable rate borrowings.""",
        "risk_current": """We operate in a heavily regulated industry and require permits in each jurisdiction.
Our backlog may not convert to revenue on the timeline we anticipate.
We are exposed to interest rate risk on our variable rate borrowings.
Our common stock may be subject to delisting if we do not regain compliance with the minimum bid price requirement.""",
        "mda_prior": """Backlog grew to $1.2 billion at period end.
We continue to invest in grid automation capability.""",
        "mda_current": """Backlog grew to $1.3 billion at period end.
We continue to invest in grid automation capability.""",
    },
]

ITEMS = [("1A", "Risk Factors", "risk"), ("7", "Management's Discussion and Analysis", "mda")]
MAX_TEXT = 1200


def build():
    companies = []
    for c in COMPANIES:
        findings, coverage = [], []
        for item, title, key in ITEMS:
            cur, pri = c[f"{key}_current"], c[f"{key}_prior"]
            coverage.append({"item": item, "title": title,
                             "current_chars": len(cur), "prior_chars": len(pri),
                             "compared": True})
            for f in rank(compare_sections(cur, pri, item=item, item_title=title)):
                d = f.to_dict()
                d["text"] = d["text"][:MAX_TEXT]
                if d.get("prior_text"):
                    d["prior_text"] = d["prior_text"][:MAX_TEXT]
                findings.append(d)
        counts = {k: sum(1 for f in findings if f["kind"] == k)
                  for k in ("escalated", "added", "removed")}
        companies.append({
            "ticker": c["ticker"], "company": c["company"], "cik": c["cik"],
            "current": {"form": "10-K", "filed": "2025-02-18", "period": "2024-12-31", "url": None},
            "prior": {"form": "10-K", "filed": "2024-02-20", "period": "2023-12-31", "url": None},
            "coverage": coverage, "counts": counts, "findings": findings,
        })

    return {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "Synthetic sample",
        "source_note": "Sample data with fictional issuers, produced by "
                       "pipeline/make_sample.py so the site renders before a live "
                       "pull. Not SEC data. Run pipeline/build_dataset.py to replace "
                       "it with real filings.",
        "is_sample": True,
        "diff_items": [{"item": i, "title": t} for i, t, _ in ITEMS],
        "failed": [],
        "companies": companies,
    }


if __name__ == "__main__":
    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = build()
    OUT.write_text(json.dumps(payload, indent=1), encoding="utf8")
    n = sum(len(c["findings"]) for c in payload["companies"])
    print(f"Wrote {OUT} — {len(payload['companies'])} fictional issuers, {n} findings.")
