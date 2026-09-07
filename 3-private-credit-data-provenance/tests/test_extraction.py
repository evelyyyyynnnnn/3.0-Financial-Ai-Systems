import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from src.documents import CORPUS, FIELDS, corpus_stats
from src.extract import (extract_all, extract_commitment, extract_floor,
                         extract_leverage, extract_maturity, extract_oid,
                         extract_spread)
from src.provenance import (build_report, doc_hash, score_spans, score_values)


def test_every_document_span_is_valid():
    """Ground truth must point at real text or the whole metric is fiction."""
    for d in CORPUS:
        for f, (a, b) in d.spans.items():
            assert 0 <= a < b <= len(d.text), f"{d.doc_id}/{f}"
            assert d.text[a:b].strip(), f"{d.doc_id}/{f} is blank"


def test_all_values_extracted_correctly():
    s = score_values(CORPUS, extract_all)
    assert s["accuracy"] == 1.0, s["per_field"]


def test_nothing_is_invented_on_absent_fields():
    """Covenant-lite means absent. Inventing a number there is the worst failure."""
    s = score_values(CORPUS, extract_all)
    assert s["wrong_or_invented"] == 0
    assert s["correct_abstentions"] == corpus_stats()["absent_instances"]


def test_every_value_carries_a_span():
    for d in CORPUS:
        for f, e in extract_all(d.text).items():
            if e.value is not None:
                assert e.span is not None, f"{d.doc_id}/{f} has a value but no span"
                a, b = e.span
                assert d.text[a:b].strip() == e.evidence.strip()


def test_spans_overlap_ground_truth():
    s = score_spans(CORPUS, extract_all)
    assert s["span_accuracy"] == 1.0, s["details"]


def test_superseded_spread_is_not_used():
    """TS-002 mentions a prior S+700 that must lose to the live S+650."""
    d = next(x for x in CORPUS if x.doc_id == "TS-002")
    assert extract_spread(d.text).value == 650


def test_total_commitment_beats_its_tranches():
    """TS-003 lists original, incremental and total. Only the total is right."""
    d = next(x for x in CORPUS if x.doc_id == "TS-003")
    assert extract_commitment(d.text).value == 175_000_000


def test_equity_amount_is_not_mistaken_for_the_facility():
    d = next(x for x in CORPUS if x.doc_id == "TS-004")
    assert extract_commitment(d.text).value == 210_000_000


def test_par_is_one_hundred_not_missing():
    d = next(x for x in CORPUS if x.doc_id == "TS-004")
    assert extract_oid(d.text).value == 100.0


def test_zero_floor_is_a_value_not_an_absence():
    d = next(x for x in CORPUS if x.doc_id == "TS-004")
    e = extract_floor(d.text)
    assert e.value == 0.0 and e.span is not None


def test_covenant_lite_abstains_explicitly():
    d = next(x for x in CORPUS if x.doc_id == "TS-005")
    e = extract_leverage(d.text)
    assert e.value is None
    assert e.rule == "explicit-absence"


def test_word_and_digit_maturity():
    d = next(x for x in CORPUS if x.doc_id == "TS-001")
    assert extract_maturity(d.text).value == 7.0


def test_anniversary_phrasing_maturity():
    d = next(x for x in CORPUS if x.doc_id == "TS-002")
    assert extract_maturity(d.text).value == 5.0


def test_decimal_spread_is_not_split_by_sentence_splitting():
    """Regression: splitting on '.' cut '5.75' in half and found no spread."""
    text = "Interest Rate: SOFR + 5.75%, subject to a SOFR floor of 1.00%\n"
    assert extract_spread(text).value == 575


def test_record_verifies_against_its_own_document():
    d = CORPUS[0]
    rep = build_report(d.doc_id, d.text, extract_all(d.text))
    for r in rep.records:
        ok, why = r.verify_against(d.text)
        assert ok, f"{r.field_name}: {why}"


def test_record_rejects_an_edited_document():
    d = CORPUS[0]
    rep = build_report(d.doc_id, d.text, extract_all(d.text))
    edited = d.text.replace("5.75%", "6.75%")
    rec = next(r for r in rep.records if r.value is not None)
    ok, why = rec.verify_against(edited)
    assert not ok and "changed" in why


def test_doc_hash_is_stable_and_sensitive():
    a = doc_hash("hello world")
    assert a == doc_hash("hello world")
    assert a != doc_hash("hello world.")


def test_confidence_is_in_range():
    for d in CORPUS:
        for e in extract_all(d.text).values():
            assert 0.0 <= e.confidence <= 1.0
