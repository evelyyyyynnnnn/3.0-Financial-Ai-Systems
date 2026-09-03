import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from src.corpus import CORPUS, corpus_stats
from src.diff import diff_risks, jaccard, numbers, summarise, tokens
from src.edgar import FilingRef, is_configured
from src.score import score_corpus, score_pair
from src.sections import extract_risk_factors, find_item, split_risk_factors


# --- section location ----------------------------------------------------

def test_picks_the_body_not_the_table_of_contents():
    doc = ("TABLE OF CONTENTS\nItem 1A. Risk Factors ... 12\nItem 2. Properties ... 40\n"
           + "filler. " * 30
           + "\n\nItem 1A. Risk Factors\n\n" + "The real body. " * 80
           + "\n\nItem 1B. Unresolved Staff Comments\n")
    a, b = find_item(doc, "1A")
    assert "The real body" in doc[a:b]


def test_missing_item_returns_sentinel():
    assert find_item("no items at all here", "1A") == (-1, -1)


def test_unknown_item_raises():
    import pytest
    with pytest.raises(KeyError):
        find_item("text", "99Z")


def test_section_stops_at_the_next_item():
    doc = "Item 1A. Risk Factors\n\nRisk body here.\n\nItem 1B. Unresolved\nOther."
    assert "Other" not in extract_risk_factors(doc)


def test_heading_is_stripped_from_the_body():
    """Left in, it rides along on the first risk and appears in every summary."""
    for p in CORPUS:
        body = extract_risk_factors(p.current)
        assert not body.lower().startswith("item 1a")


def test_every_corpus_filing_yields_risks():
    for p in CORPUS:
        assert split_risk_factors(extract_risk_factors(p.prior))
        assert split_risk_factors(extract_risk_factors(p.current))


# --- matching primitives -------------------------------------------------

def test_jaccard_bounds():
    assert jaccard("alpha beta", "alpha beta") == 1.0
    assert jaccard("alpha beta", "gamma delta") == 0.0


def test_stopwords_are_ignored():
    assert "the" not in tokens("the risk of the market")


def test_numbers_extracted_without_separators():
    assert "1200" in numbers("about 1,200 filings")
    assert "42" in numbers("42 percent")


# --- change classification -----------------------------------------------

def test_identical_risks_are_unchanged():
    r = ["We depend on a limited number of suppliers for critical components today."]
    out = diff_risks(r, list(r))
    assert [c.kind for c in out] == ["unchanged"]


def test_a_changed_figure_makes_it_reworded():
    """Same wording, moved percentage. This is the case that matters most."""
    prior = ["A single supplier accounted for 31 percent of component purchases."]
    cur = ["A single supplier accounted for 42 percent of component purchases."]
    out = diff_risks(prior, cur)
    assert out[0].kind == "reworded"
    assert "42" in out[0].numbers_changed or "31" in out[0].numbers_changed


def test_new_risk_is_added_not_reworded():
    prior = ["We depend on a limited number of suppliers for critical components."]
    cur = prior + ["We are subject to evolving artificial intelligence regulation "
                   "in the jurisdictions in which we operate today."]
    kinds = sorted(c.kind for c in diff_risks(prior, cur))
    assert kinds == ["added", "unchanged"]


def test_dropped_risk_is_removed():
    prior = ["We face intense competition in all of our markets from larger firms.",
             "Our results depend on general economic conditions in our markets."]
    cur = [prior[1]]
    kinds = sorted(c.kind for c in diff_risks(prior, cur))
    assert kinds == ["removed", "unchanged"]


def test_reordering_is_not_reported_as_change():
    """A positional diff fails this. It is the reason matching exists."""
    risks = ["We depend on a limited number of suppliers for critical components.",
             "Our operating results may fluctuate significantly from quarter to quarter.",
             "We face intense competition in all of the markets that we serve."]
    out = diff_risks(risks, list(reversed(risks)))
    assert summarise(out)["material"] == 0


# --- corpus scoring ------------------------------------------------------

def test_all_labelled_material_changes_are_recovered():
    s = score_corpus(CORPUS)
    assert s["recall"] == 1.0, [p["per_kind"] for p in s["pairs"]]


def test_identical_filings_produce_no_material_changes():
    """The property that decides whether anyone keeps using the tool."""
    s = score_corpus(CORPUS)
    assert s["false_alarms_on_unchanged_pairs"] == 0
    assert s["n_quiet_pairs"] >= 1


def test_corpus_covers_every_change_kind():
    c = corpus_stats()
    assert c["n_added"] and c["n_removed"] and c["n_reworded"] and c["n_unchanged"]


def test_scoring_reports_missed_labels_explicitly():
    p = score_pair(CORPUS[0])
    assert set(p["per_kind"]) == {"added", "removed", "reworded", "unchanged"}
    assert all("missed" in v for v in p["per_kind"].values())


# --- edgar boundary ------------------------------------------------------

def test_edgar_is_not_configured_by_default():
    """Guards the site's claim that no live pull happened."""
    assert is_configured() is False


def test_filing_ref_builds_an_archive_url():
    ref = FilingRef(cik="0000320193", accession="0000320193-24-000123",
                    form="10-K", filed="2024-11-01", primary_doc="aapl-20240928.htm")
    u = ref.url()
    assert u.startswith("https://www.sec.gov/Archives/edgar/data/320193/")
    assert u.endswith("aapl-20240928.htm")
    assert "-" not in u.split("/")[-2]
