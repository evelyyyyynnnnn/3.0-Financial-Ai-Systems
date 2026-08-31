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


def main() -> int:
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
