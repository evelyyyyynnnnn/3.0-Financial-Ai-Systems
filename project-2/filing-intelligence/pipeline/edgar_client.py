"""Minimal SEC EDGAR client.

EDGAR is free and needs no key, but it does have two hard rules: every
request must carry a User-Agent naming a real contact, and clients must stay
under 10 requests/second. Both are enforced here rather than left to callers.

Docs: https://www.sec.gov/search-filings/edgar-application-programming-interfaces
"""
from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
from dataclasses import dataclass

SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik:010d}.json"
ARCHIVE = "https://www.sec.gov/Archives/edgar/data/{cik}/{accession}/{document}"
TICKERS = "https://www.sec.gov/files/company_tickers.json"

# SEC asks for 10 req/s; leave headroom so a retry never crosses the line.
MIN_INTERVAL = 0.15


class EdgarError(RuntimeError):
    pass


@dataclass(frozen=True)
class Filing:
    cik: int
    ticker: str
    company: str
    form: str          # "10-K" or "10-Q"
    filed: str         # ISO date
    period: str        # ISO date of the reporting period end
    accession: str     # no dashes
    document: str      # primary document filename

    @property
    def url(self) -> str:
        return ARCHIVE.format(cik=self.cik, accession=self.accession, document=self.document)

    @property
    def index_url(self) -> str:
        return (f"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany"
                f"&CIK={self.cik:010d}&type={self.form}")


class EdgarClient:
    def __init__(self, user_agent: str | None = None):
        ua = user_agent or os.environ.get("SEC_USER_AGENT", "").strip()
        if not ua or "@" not in ua:
            raise EdgarError(
                "SEC requires a User-Agent naming a real contact, e.g.\n"
                '  export SEC_USER_AGENT="Jane Doe jane@example.com"'
            )
        self.user_agent = ua
        self._last_request = 0.0

    def _get(self, url: str, *, as_json: bool) -> str | dict:
        wait = MIN_INTERVAL - (time.monotonic() - self._last_request)
        if wait > 0:
            time.sleep(wait)
        req = urllib.request.Request(url, headers={
            "User-Agent": self.user_agent,
            "Accept-Encoding": "gzip",
        })
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                raw = resp.read()
                if resp.headers.get("Content-Encoding") == "gzip":
                    import gzip
                    raw = gzip.decompress(raw)
                text = raw.decode("utf-8", errors="replace")
        except urllib.error.HTTPError as e:
            raise EdgarError(f"{e.code} from {url}") from e
        except urllib.error.URLError as e:
            raise EdgarError(f"cannot reach {url}: {e.reason}") from e
        finally:
            self._last_request = time.monotonic()
        return json.loads(text) if as_json else text

    def resolve_ticker(self, ticker: str) -> tuple[int, str]:
        """Map a ticker to (CIK, company name)."""
        data = self._get(TICKERS, as_json=True)
        want = ticker.upper()
        for row in data.values():
            if row["ticker"].upper() == want:
                return int(row["cik_str"]), row["title"]
        raise EdgarError(f"ticker not found in EDGAR: {ticker}")

    def filings(self, ticker: str, forms=("10-K", "10-Q"), limit: int = 8) -> list[Filing]:
        """Most recent filings of the given forms, newest first."""
        cik, company = self.resolve_ticker(ticker)
        data = self._get(SUBMISSIONS.format(cik=cik), as_json=True)
        recent = data["filings"]["recent"]
        out: list[Filing] = []
        for form, filed, period, acc, doc in zip(
            recent["form"], recent["filingDate"], recent["reportDate"],
            recent["accessionNumber"], recent["primaryDocument"],
        ):
            if form not in forms:
                continue
            out.append(Filing(
                cik=cik, ticker=ticker.upper(), company=company, form=form,
                filed=filed, period=period,
                accession=acc.replace("-", ""), document=doc,
            ))
            if len(out) >= limit:
                break
        return out

    def document(self, filing: Filing) -> str:
        """Raw HTML of a filing's primary document."""
        return self._get(filing.url, as_json=False)
