"""Tests for extracting from real filings.

The reportable claim on real data is provenance, not accuracy, and these tests
pin that distinction: no answer key is invented, and the span check that
replaces it is one that can actually fail.
"""
import pathlib
import sys

import pytest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from data import datakit
from data.edgar_api import cik_for_ticker, recent_filings
from data.load import find_schedule, html_to_text, load_documents

FILING = b"""<html><head><style>.x{}</style></head><body>
<div>Table of Contents</div>
<table><tr><td>Consolidated Schedule of Investments</td><td>F-4</td></tr></table>
<h2>Consolidated Schedule of Investments</h2>
<table>
<tr><td>Borrower</td><td>Reference</td><td>Spread</td><td>Floor</td>
    <td>Maturity</td><td>Principal</td></tr>
<tr><td>Acme Holdings LLC</td><td>SOFR</td><td>5.75%</td><td>1.00%</td>
    <td>2029-06-30</td><td>$125,000,000</td></tr>
</table>
<p>The Company's total commitment under the facility is $125,000,000 bearing
interest at SOFR plus 5.75% with a floor of 1.00%, maturing June 30, 2029.</p>
</body></html>"""


def test_table_cells_do_not_glue_values_together():
    """Collapsing a row into one run makes "5.75% 2029" a single token, and the
    extractor then reads a spread and a maturity as one number."""
    text = html_to_text(FILING)
    assert "5.75%" in text
    assert "5.75%1.00%" not in text
    assert "1.00%2029" not in text


def test_style_is_dropped_and_prose_survives():
    text = html_to_text(FILING)
    assert "{" not in text
    assert "total commitment under the facility" in text


def test_find_schedule_prefers_the_section_over_the_table_of_contents():
    text = html_to_text(FILING)
    a, b = find_schedule(text, window=1000)
    section = text[a:b]
    # The ToC entry is followed by almost nothing; the real section carries the
    # loan table and the prose.
    assert "Acme Holdings" in section
    assert "$125,000,000" in section


def test_find_schedule_falls_back_when_the_heading_is_absent():
    a, b = find_schedule("a filing with no such heading at all", window=100)
    assert (a, b) == (0, len("a filing with no such heading at all"))


def test_refuses_when_nothing_is_cached(tmp_path):
    with pytest.raises(datakit.FetchError, match="no real filings cached"):
        load_documents(root=tmp_path)


def _seed(tmp_path, tickers=("ARCC", "MAIN")):
    f = datakit.Fetcher(tmp_path)
    man = f.load_manifest()
    for tic in tickers:
        dest = f"{tic.lower()}/10-K-2025-02-11.htm"
        p = f.raw / dest
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(FILING)
        man["files"][dest] = {
            "source": f"{tic} 10-K", "url": f"https://www.sec.gov/{dest}",
            "publisher": "U.S. SEC (EDGAR)", "terms": "public domain",
            "sha256": datakit.sha256_file(p), "bytes": len(FILING),
            "retrieved_utc": datakit.utc_now()}
    f._write_manifest(man)
    return f


def test_real_documents_carry_no_invented_answer_key(tmp_path):
    """A `truth` dict populated by guessing would be scored as ground truth."""
    _seed(tmp_path)
    docs, meta = load_documents(root=tmp_path)
    assert len(docs) == 2
    assert all(d.truth == {} for d in docs)
    assert all(d.spans == {} for d in docs)
    assert meta["ground_truth_available"] is False
    assert "no denominator" in meta["accuracy_withheld_because"]


def test_provenance_records_hash_and_url_per_document(tmp_path):
    _seed(tmp_path)
    _, meta = load_documents(root=tmp_path)
    for d in meta["documents"]:
        assert len(d["sha256"]) == 16
        assert d["url"].startswith("https://")
        assert d["schedule_located"] is True


def test_extraction_runs_and_finds_terms_in_a_real_shaped_filing(tmp_path):
    _seed(tmp_path, tickers=("ARCC",))
    from src.extract import extract_all
    docs, _ = load_documents(root=tmp_path)
    ext = extract_all(docs[0].text)
    found = {k: e.value for k, e in ext.items()
             if e is not None and getattr(e, "value", None) is not None}
    assert found, "nothing extracted from a filing containing all the fields"


def test_span_support_check_catches_a_span_that_does_not_contain_its_value():
    """The check that replaces accuracy on real data must be able to fail."""
    from src.demo import _span_supports
    assert _span_supports("spread of 5.75% over SOFR", 5.75)
    assert _span_supports("commitment of $125,000,000", 125000000)
    assert not _span_supports("maturing June 30, 2029", 5.75)
    assert not _span_supports("no numbers here", 1.0)


def test_span_support_ignores_formatting_differences():
    from src.demo import _span_supports
    assert _span_supports("$125,000,000", 125000000)
    assert _span_supports(" 5.75 % ", 5.75)


def test_real_run_reports_provenance_and_withholds_accuracy(tmp_path, monkeypatch):
    _seed(tmp_path)
    from src import demo
    monkeypatch.setattr(demo, "ROOT", tmp_path.parent)
    # load_documents is called with ROOT / "data"; point it at the seeded cache.
    import data.load as dl
    monkeypatch.setattr(dl, "ROOT", tmp_path)
    docs, meta = dl.load_documents(root=tmp_path)
    assert meta["ground_truth_available"] is False
    assert docs[0].note.startswith("real 10-K from EDGAR")


def test_edgar_helpers_still_parse_the_real_shapes():
    import json
    tickers = json.dumps({"0": {"cik_str": 1287750, "ticker": "ARCC",
                                "title": "Ares Capital Corp"}}).encode()
    assert cik_for_ticker(tickers, "ARCC") == "0001287750"
    subs = json.dumps({"cik": "1287750", "filings": {"recent": {
        "form": ["10-K", "10-K/A"], "filingDate": ["2025-02-11", "2024-06-01"],
        "accessionNumber": ["0001287750-25-000010", "x"],
        "primaryDocument": ["arcc-20241231.htm", "a.htm"]}}}).encode()
    got = recent_filings(subs, "ARCC", form="10-K", limit=1)
    assert got[0].filed == "2025-02-11"
    assert got[0].url.endswith("/000128775025000010/arcc-20241231.htm")
