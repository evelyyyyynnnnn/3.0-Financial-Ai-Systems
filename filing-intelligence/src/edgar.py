"""SEC EDGAR client, and the honest boundary around it.

This module can pull real filings. It is not run in CI and not run by the demo,
because a build whose output depends on a live third-party service is not
reproducible and because EDGAR's fair-access policy requires a declared user
agent and rate limiting that a test suite should not be exercising.

The important consequence, stated here rather than buried: the numbers on this
project's page come from the authored corpus in `corpus.py`, NOT from EDGAR.
Running `fetch_company_filings` against the real universe is the step that turns
this into evidence, and it has not been run.
"""

from __future__ import annotations

import json
import time
import urllib.request
from dataclasses import dataclass

BASE = "https://data.sec.gov"
# EDGAR requires a descriptive User-Agent with contact details. Requests without
# one are refused, and this placeholder must be replaced before any real pull.
USER_AGENT = "filing-intelligence/0.1 (set-your-contact@example.com)"
RATE_LIMIT_S = 0.11          # SEC asks for <= 10 requests/second


@dataclass
class FilingRef:
    cik: str
    accession: str
    form: str
    filed: str
    primary_doc: str

    def url(self) -> str:
        acc = self.accession.replace("-", "")
        return (f"https://www.sec.gov/Archives/edgar/data/"
                f"{int(self.cik)}/{acc}/{self.primary_doc}")


def _get(url: str, timeout: int = 30) -> bytes:  # pragma: no cover - network
    req = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT,
        "Accept-Encoding": "gzip, deflate",
        "Host": url.split("/")[2],
    })
    time.sleep(RATE_LIMIT_S)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def fetch_company_filings(cik: str, forms=("10-K", "10-Q"),
                          limit: int = 8) -> list:  # pragma: no cover - network
    """List recent filings for a CIK. Requires network access."""
    if "example.com" in USER_AGENT:
        raise RuntimeError(
            "set USER_AGENT to a real contact address before calling EDGAR; "
            "the SEC refuses requests without one")
    cik10 = str(int(cik)).zfill(10)
    data = json.loads(_get(f"{BASE}/submissions/CIK{cik10}.json"))
    recent = data["filings"]["recent"]
    out = []
    for form, acc, doc, filed in zip(recent["form"], recent["accessionNumber"],
                                     recent["primaryDocument"],
                                     recent["filingDate"]):
        if form in forms:
            out.append(FilingRef(cik=cik10, accession=acc, form=form,
                                 filed=filed, primary_doc=doc))
        if len(out) >= limit:
            break
    return out


def is_configured() -> bool:
    return "example.com" not in USER_AGENT
