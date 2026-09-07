"""EDGAR resolution: turn a ticker into the two 10-K documents worth diffing.

Kept separate from fetch.py because three other projects in this portfolio need
the same resolution step, and because the part that can be tested without a
network — parsing EDGAR's JSON into filing references — should not be tangled
with the part that cannot.
"""
from __future__ import annotations

import json
from dataclasses import dataclass

from .datakit import Source

SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik10}.json"
TICKERS = "https://www.sec.gov/files/company_tickers.json"
ARCHIVE = "https://www.sec.gov/Archives/edgar/data/{cik}/{acc_nodash}/{doc}"


@dataclass(frozen=True)
class Filing:
    cik: str
    ticker: str
    form: str
    filed: str            # YYYY-MM-DD
    accession: str        # 0000320193-23-000106
    primary_doc: str

    @property
    def url(self) -> str:
        return ARCHIVE.format(cik=int(self.cik),
                              acc_nodash=self.accession.replace("-", ""),
                              doc=self.primary_doc)

    @property
    def dest(self) -> str:
        return f"{self.ticker.lower()}/{self.form.replace('/', '-')}-{self.filed}.htm"

    def source(self) -> Source:
        return Source(
            name=f"{self.ticker} {self.form} {self.filed}",
            url=self.url, dest=self.dest, publisher="U.S. SEC (EDGAR)",
            terms="U.S. government work, public domain",
            note=f"accession {self.accession}",
        )


def cik_for_ticker(tickers_json: bytes, ticker: str) -> str:
    """Map a ticker to its zero-padded 10-digit CIK.

    company_tickers.json is a dict keyed by row number, not a list, which is
    the kind of shape that only shows up once you have looked at the real file.
    """
    data = json.loads(tickers_json)
    rows = data.values() if isinstance(data, dict) else data
    want = ticker.upper()
    for row in rows:
        if str(row["ticker"]).upper() == want:
            return str(int(row["cik_str"])).zfill(10)
    raise KeyError(f"ticker {ticker!r} not present in EDGAR's company_tickers.json")


def recent_filings(submissions_json: bytes, ticker: str, form: str = "10-K",
                   limit: int = 2) -> list:
    """Extract the most recent `form` filings from a submissions document.

    EDGAR stores recent filings column-wise — parallel arrays under
    filings.recent — rather than as a list of records, so the fields have to be
    zipped back together by index.
    """
    d = json.loads(submissions_json)
    cik = str(int(d["cik"])).zfill(10)
    rec = d["filings"]["recent"]
    cols = ("form", "filingDate", "accessionNumber", "primaryDocument")
    missing = [c for c in cols if c not in rec]
    if missing:
        raise ValueError(f"submissions JSON missing columns: {missing}")

    out = []
    for f, filed, acc, doc in zip(*(rec[c] for c in cols)):
        # "10-K" must not match "10-K/A" (an amendment) or "10-KT".
        if f != form or not doc:
            continue
        out.append(Filing(cik=cik, ticker=ticker.upper(), form=f, filed=filed,
                          accession=acc, primary_doc=doc))
        if len(out) >= limit:
            break
    if len(out) < limit:
        raise ValueError(
            f"{ticker}: found {len(out)} {form} filings in the recent index, "
            f"needed {limit}. Older filings live in filings.files[] and require "
            f"an extra fetch.")
    return out
