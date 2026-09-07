"""Tests for the real-data layer.

The download itself cannot be tested without a network, so what is tested here
is everything around it: that EDGAR's actual response shapes are parsed
correctly, that filing HTML flattens to readable prose, and — most importantly
— that asking for real data when none is cached raises rather than quietly
falling back to the authored corpus.
"""
import json
import pathlib
import sys

import pytest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from data import datakit
from data.edgar_api import Filing, cik_for_ticker, recent_filings
from data.load import html_to_text

# company_tickers.json is a dict keyed by row number, not a list.
TICKERS = json.dumps({
    "0": {"cik_str": 320193, "ticker": "AAPL", "title": "Apple Inc."},
    "1": {"cik_str": 19617, "ticker": "JPM", "title": "JPMorgan Chase & Co."},
}).encode()

# filings.recent is column-wise: parallel arrays, not a list of records.
SUBMISSIONS = json.dumps({
    "cik": "320193",
    "filings": {"recent": {
        "form":            ["8-K",  "10-K",       "10-K/A",     "10-Q", "10-K"],
        "filingDate":      ["2024-11-01", "2024-11-01", "2024-06-01",
                            "2024-08-01", "2023-11-03"],
        "accessionNumber": ["0-1", "0000320193-24-000123", "0-2", "0-3",
                            "0000320193-23-000106"],
        "primaryDocument": ["a.htm", "aapl-20240928.htm", "amend.htm",
                            "q.htm", "aapl-20230930.htm"],
    }},
}).encode()


def test_cik_lookup_zero_pads_to_ten_digits():
    # The submissions API 404s on a CIK that is not zero-padded.
    assert cik_for_ticker(TICKERS, "AAPL") == "0000320193"
    assert cik_for_ticker(TICKERS, "jpm") == "0000019617"


def test_unknown_ticker_raises():
    with pytest.raises(KeyError):
        cik_for_ticker(TICKERS, "NOTATICKER")


def test_recent_filings_zips_parallel_arrays_and_skips_amendments():
    got = recent_filings(SUBMISSIONS, "AAPL", form="10-K", limit=2)
    assert [f.filed for f in got] == ["2024-11-01", "2023-11-03"]
    # 10-K/A is an amendment to a prior year and would corrupt a year-over-year
    # diff; exact string equality is what keeps it out.
    assert all(f.form == "10-K" for f in got)


def test_filing_url_matches_edgar_archive_layout():
    f = recent_filings(SUBMISSIONS, "AAPL", form="10-K", limit=1)[0]
    # The archive path uses an unpadded CIK and a dash-stripped accession.
    assert f.url == ("https://www.sec.gov/Archives/edgar/data/320193/"
                     "000032019324000123/aapl-20240928.htm")


def test_insufficient_filings_raises_rather_than_returning_one():
    thin = json.dumps({"cik": "1", "filings": {"recent": {
        "form": ["10-K"], "filingDate": ["2024-01-01"],
        "accessionNumber": ["0-1"], "primaryDocument": ["a.htm"]}}}).encode()
    with pytest.raises(ValueError, match="needed 2"):
        recent_filings(thin, "X", limit=2)


# --- HTML flattening -------------------------------------------------------

INLINE_XBRL = b"""<html><head><style>.x{font-size:9pt}</style></head><body>
<div><span class="x">Item 1A.</span><span class="x">&#160;Risk Factors</span></div>
<p>We depend on a <ix:nonNumeric name="x">limited</ix:nonNumeric> number of suppliers.</p>
<table><tr><td>Concentration</td><td>31%</td></tr></table>
<div>Item 1B. Unresolved Staff Comments</div>
</body></html>"""


def test_html_to_text_does_not_run_words_together_across_tags():
    text = html_to_text(INLINE_XBRL)
    # The failure this guards against is "Item 1A.Risk Factors" and
    # "suppliers.Concentration", which break heading detection downstream.
    assert "Item 1A." in text
    assert "Risk Factors" in text
    assert "suppliers.Concentration" not in text
    assert "1A.Risk" not in text


def test_html_to_text_drops_style_but_keeps_xbrl_wrapped_prose():
    text = html_to_text(INLINE_XBRL)
    assert "font-size" not in text
    # Text inside inline-XBRL tags is the filing's actual prose and must survive.
    assert "limited" in text and "number of suppliers" in text


def test_html_to_text_survives_unclosed_tags():
    # Real filings are not well-formed; the parser must not raise.
    assert "Risk Factors" in html_to_text(b"<div><p>Risk Factors<div>more")


# --- the fallback guard ----------------------------------------------------

def test_load_pairs_raises_when_no_real_data_is_cached(tmp_path):
    """The single most important test in this file.

    A --real flag that silently falls back to authored data would put invented
    numbers under a heading that says they were measured.
    """
    from data.load import load_pairs
    with pytest.raises(datakit.FetchError, match="no real filings cached"):
        load_pairs(root=tmp_path)


def test_fetcher_reports_blocked_network_distinctly(tmp_path):
    # A blocked sandbox and a wrong URL need different responses from the user,
    # so they must not collapse into one generic error.
    assert issubclass(datakit.NetworkBlocked, datakit.FetchError)
    e = datakit.NetworkBlocked("data.sec.gov", "403 Forbidden")
    assert "data.sec.gov" in str(e)
    assert "network policy" in str(e)


def test_manifest_records_hash_and_url_for_every_file(tmp_path):
    f = datakit.Fetcher(tmp_path)
    f.raw.mkdir(parents=True)
    (f.raw / "x.json").write_bytes(b"{}")
    man = f.load_manifest()
    man["files"]["x.json"] = {"sha256": datakit.sha256_file(f.raw / "x.json"),
                              "url": "https://example/x", "bytes": 2}
    f._write_manifest(man)
    assert f.verify() == []
    (f.raw / "x.json").write_bytes(b"{ }")
    assert "do not match recorded sha256" in f.verify()[0]


# --- the real path, end to end on a filing-shaped fixture -------------------

def _filing_html(risks):
    """A document with EDGAR's real trap: Item 1A appears in the ToC first."""
    body = "".join(f"<p>{r}</p>" for r in risks)
    return (b"<html><body>"
            b"<table><tr><td>Item 1A.</td><td>Risk Factors</td><td>12</td></tr>"
            b"<tr><td>Item 1B.</td><td>Unresolved Staff Comments</td><td>30</td></tr>"
            b"</table>"
            b"<div>Item 1A. Risk Factors</div>"
            + body.encode()
            + b"<div>Item 1B. Unresolved Staff Comments</div><p>None.</p>"
            b"</body></html>")


PRIOR_RISKS = [
    "We depend on a limited number of suppliers for critical components. A single "
    "supplier accounted for 31 percent of component purchases during fiscal 2023.",
    "We face intense competition in all of our markets. Some competitors have "
    "greater financial and technical resources than we do.",
    "Our business is subject to a wide range of laws and regulations in the many "
    "jurisdictions in which we operate, and compliance costs are significant.",
]
CURRENT_RISKS = [
    "We depend on a limited number of suppliers for critical components. A single "
    "supplier accounted for 42 percent of component purchases during fiscal 2024, "
    "compared with 31 percent in fiscal 2023, and this concentration has increased.",
    "We face intense competition in all of our markets. Some competitors have "
    "greater financial and technical resources than we do.",
    "Our business is subject to a wide range of laws and regulations in the many "
    "jurisdictions in which we operate, and compliance costs are significant.",
    "Artificial intelligence features introduced in fiscal 2024 expose us to new "
    "regulatory, reputational and product-liability risks that we have not "
    "previously faced.",
]


def _seed_cache(root, ticker="TEST"):
    """Write a filing-shaped pair into a fetcher cache the way fetch.py would."""
    f = datakit.Fetcher(root)
    man = f.load_manifest()
    for filed, risks in (("2023-11-03", PRIOR_RISKS), ("2024-11-01", CURRENT_RISKS)):
        dest = f"{ticker.lower()}/10-K-{filed}.htm"
        p = f.raw / dest
        p.parent.mkdir(parents=True, exist_ok=True)
        raw = _filing_html(risks)
        p.write_bytes(raw)
        man["files"][dest] = {
            "source": f"{ticker} 10-K {filed}", "url": f"https://sec.gov/{dest}",
            "publisher": "U.S. SEC (EDGAR)", "terms": "public domain",
            "sha256": datakit.sha256_file(p), "bytes": len(raw),
            "retrieved_utc": datakit.utc_now(),
        }
    f._write_manifest(man)
    return f


def test_real_pipeline_produces_a_diff_and_carries_provenance(tmp_path):
    _seed_cache(tmp_path)
    from data.load import load_pairs
    pairs, prov = load_pairs(root=tmp_path)

    assert len(pairs) == 1
    pair = pairs[0]
    assert pair.company == "TEST"
    # A 10-K filed in Nov 2024 reports fiscal 2023 for most registrants.
    assert (pair.prior_period, pair.current_period) == ("FY2022", "FY2023")

    # The ToC trap: Item 1A appears twice, and the body must be the one picked.
    assert "31 percent" in pair.prior
    assert "Unresolved Staff Comments" not in pair.prior.split("Item 1B")[0]

    # Provenance travels with the text: hash and URL for both documents.
    assert prov[0]["status"] == "ok"
    assert len(prov[0]["current"]["sha256"]) == 16
    assert prov[0]["current"]["url"].startswith("https://")

    # And the diff itself runs on the real text.
    from src.diff import diff_risks
    from src.sections import extract_risk_factors, split_risk_factors
    changes = diff_risks(split_risk_factors(extract_risk_factors(pair.prior)),
                         split_risk_factors(extract_risk_factors(pair.current)))
    kinds = [c.kind for c in changes]
    assert "added" in kinds, "the new AI risk factor should be reported as added"
    assert "reworded" in kinds, "31% -> 42% supplier concentration is a rewording"
    assert kinds.count("unchanged") >= 2


def test_real_results_never_claim_accuracy(tmp_path):
    """Guards the honesty property that motivated the whole --real path."""
    _seed_cache(tmp_path)
    from data.load import load_pairs
    pairs, _ = load_pairs(root=tmp_path)
    assert pairs[0].note.startswith("real 10-K filings")
    assert "no human-annotated diff exists" in pairs[0].note
