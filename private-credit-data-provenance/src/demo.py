"""Extract, build provenance records, score, and rebuild the site."""

from __future__ import annotations

import json
import pathlib
import sys
from datetime import datetime, timezone

from .documents import CORPUS, FIELDS, corpus_stats
from .extract import extract_all
from .provenance import (build_report, doc_hash, score_spans, score_values)

ROOT = pathlib.Path(__file__).resolve().parent.parent


def tamper_check() -> dict:
    """A provenance record must notice when its document changes."""
    d = CORPUS[0]
    rep = build_report(d.doc_id, d.text, extract_all(d.text))
    rec = next(r for r in rep.records if r.value is not None)
    ok_before, _ = rec.verify_against(d.text)
    edited = d.text.replace("5.75%", "6.75%")
    ok_after, reason = rec.verify_against(edited)
    return {"verified_on_original": ok_before,
            "rejected_on_edited": not ok_after, "reason": reason}


def run() -> dict:
    vals = score_values(CORPUS, extract_all)
    spans_overlap = score_spans(CORPUS, extract_all, require_exact=False)
    spans_exact = score_spans(CORPUS, extract_all, require_exact=True)

    reports = {}
    for d in CORPUS:
        rep = build_report(d.doc_id, d.text, extract_all(d.text))
        reports[d.doc_id] = json.loads(rep.to_json())

    out_dir = ROOT / "data" / "extractions"
    out_dir.mkdir(parents=True, exist_ok=True)
    for did, rep in reports.items():
        (out_dir / f"{did}.json").write_text(json.dumps(rep, indent=2) + "\n",
                                             encoding="utf8")

    results = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "is_synthetic": True,
        "data_source": "5 authored private-credit term sheets (src/documents.py)",
        "corpus": corpus_stats(),
        "fields": list(FIELDS),
        "values": vals,
        "spans_overlap": {k: v for k, v in spans_overlap.items() if k != "details"},
        "spans_exact": {k: v for k, v in spans_exact.items() if k != "details"},
        "span_details": spans_overlap["details"],
        "tamper": tamper_check(),
        "example_report": reports[CORPUS[2].doc_id],
        "documents": [{"doc_id": d.doc_id, "sha": doc_hash(d.text),
                       "note": d.note, "chars": len(d.text)} for d in CORPUS],
    }
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results" / "latest.json").write_text(
        json.dumps(results, indent=2) + "\n", encoding="utf8")
    return results


def run_real() -> dict:
    """Extract terms from real BDC filings, with provenance that is checkable.

    Accuracy is not reported: nobody has annotated a real schedule of
    investments with the values an extractor should return. Provenance IS
    reported and IS verified, because it needs no answer key -- for every
    extracted value the recorded character span is re-read from the document
    and must contain the value it claims to support. A span that does not is a
    defect regardless of whether the value was right.
    """
    import sys as _sys
    _sys.path.insert(0, str(ROOT))
    from data.load import load_documents

    documents, meta = load_documents(root=ROOT / "data")

    reports, per_doc = {}, []
    span_ok = span_bad = extracted = abstained = 0
    for d in documents:
        ext = extract_all(d.text)
        rep = build_report(d.doc_id, d.text, ext)
        reports[d.doc_id] = json.loads(rep.to_json())

        found = {}
        for fld, e in ext.items():
            if e is None or getattr(e, "value", None) is None:
                abstained += 1
                continue
            extracted += 1
            found[fld] = e.value
            # The check that needs no ground truth: does the cited span
            # actually contain what it is cited for?
            a, b = e.span
            evidence = d.text[a:b]
            if _span_supports(evidence, e.value):
                span_ok += 1
            else:
                span_bad += 1
        per_doc.append({"doc_id": d.doc_id, "extracted": found,
                        "n_extracted": len(found),
                        "n_abstained": len(ext) - len(found)})

    out_dir = ROOT / "data" / "extractions-real"
    out_dir.mkdir(parents=True, exist_ok=True)
    for did, rep in reports.items():
        (out_dir / f"{did}.json").write_text(json.dumps(rep, indent=2) + "\n",
                                             encoding="utf8")

    results = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "is_synthetic": False,
        "data_source": "real BDC 10-K filings from SEC EDGAR; see "
                       "data/MANIFEST.json for URLs, hashes and retrieval times",
        "accuracy_reported": False,
        "accuracy_withheld_because": meta["accuracy_withheld_because"],
        "fields": list(FIELDS),
        "provenance_check": {
            "extracted_values": extracted,
            "abstentions": abstained,
            "spans_supporting_their_value": span_ok,
            "spans_not_supporting_their_value": span_bad,
            "span_support_rate": round(span_ok / extracted, 4) if extracted else None,
            "what_this_measures":
                "whether each cited character span actually contains the value "
                "it is cited for. This needs no answer key, so it is reportable "
                "on real filings; it says nothing about whether the value is "
                "the right one.",
        },
        "per_document": per_doc,
        "documents": meta["documents"],
        "example_report": reports[documents[0].doc_id] if documents else {},
    }
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results" / "latest-real.json").write_text(
        json.dumps(results, indent=2) + "\n", encoding="utf8")
    return results


def _span_supports(evidence: str, value) -> bool:
    """Does this evidence span contain the value extracted from it?

    Compared on digits so that 5.75, "5.75%" and " 5.75 " all match, and so a
    commitment of 125000000 matches "$125,000,000".
    """
    import re as _re
    digits = _re.sub(r"[^0-9]", "", str(value))
    if not digits:
        return bool(str(value).strip() and str(value).strip().lower()
                    in evidence.lower())
    ev = _re.sub(r"[^0-9]", "", evidence)
    return digits in ev or digits.rstrip("0") in ev


def main_real() -> int:
    from data.datakit import FetchError
    try:
        r = run_real()
    except FetchError as exc:
        print(f"cannot run on real data: {exc}", file=sys.stderr)
        return 2
    print(f"source: {r['data_source']}")
    for d in r["documents"]:
        print(f"  {d['doc_id']:<6} {d['document_chars']:>9,} chars, schedule "
              f"{'located' if d['schedule_located'] else 'NOT located'} "
              f"({d['section_chars']:,} chars scanned) [{d['sha256']}]")
    print(f"\n{'document':<10}{'extracted':>10}{'abstained':>11}   fields")
    for x in r["per_document"]:
        fields = ", ".join(sorted(x["extracted"]))
        print(f"{x['doc_id']:<10}{x['n_extracted']:>10}{x['n_abstained']:>11}   "
              f"{fields[:60]}")
    pc = r["provenance_check"]
    print(f"\nprovenance check ({pc['extracted_values']} values, "
          f"{pc['abstentions']} abstentions):")
    print(f"  spans that contain the value they support: "
          f"{pc['spans_supporting_their_value']}")
    print(f"  spans that do not:                         "
          f"{pc['spans_not_supporting_their_value']}")
    if pc["span_support_rate"] is not None:
        print(f"  support rate: {pc['span_support_rate']:.1%}")
    print(f"\n{pc['what_this_measures']}")
    print("\nEXTRACTION ACCURACY IS NOT REPORTED: " +
          r["accuracy_withheld_because"])
    print("wrote results/latest-real.json")
    return 0


def main() -> int:
    if "--real" in sys.argv[1:]:
        return main_real()
    r = run()
    c, v = r["corpus"], r["values"]
    print(f"corpus: {c['n_documents']} term sheets x {c['n_fields']} fields "
          f"= {c['n_documents'] * c['n_fields']} cells "
          f"({c['absent_instances']} genuinely absent)")
    print(f"\nvalue accuracy: {v['correct']}/{v['n']} ({v['accuracy']:.1%})")
    print(f"  extracted correctly {v['extracted_correct']}, "
          f"correct abstentions {v['correct_abstentions']}, "
          f"wrong/invented {v['wrong_or_invented']}, missed {v['missed']}")
    print(f"\nspan accuracy (overlap): {r['spans_overlap']['span_accuracy']:.1%} "
          f"({r['spans_overlap']['hit']}/{r['spans_overlap']['n']})")
    print(f"span accuracy (exact):   {r['spans_exact']['span_accuracy']:.1%}")
    t = r["tamper"]
    print(f"\ntamper check: verified on original {t['verified_on_original']}, "
          f"rejected on edited {t['rejected_on_edited']} ({t['reason']})")
    print("\nper field:")
    for f, b in v["per_field"].items():
        print(f"  {f:<22}{b['correct']}/{b['n']}  {b['accuracy']:.0%}")
    try:
        from .site import build_site
        build_site(r)
        print("\nwebsite/ rebuilt from this run")
    except Exception as exc:
        print(f"\n(site not rebuilt: {exc})", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
