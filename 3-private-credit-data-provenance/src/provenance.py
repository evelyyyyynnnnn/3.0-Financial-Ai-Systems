"""The provenance record and how it is scored.

An extracted value without its source span is unauditable. The record below is
what makes a disagreement resolvable: value, the exact character range, the
quoted evidence, the rule that fired, and a hash of the source document so a
later reader can tell whether the document has changed underneath the record.
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass, field


def doc_hash(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()[:16]


@dataclass
class ProvenanceRecord:
    doc_id: str
    doc_sha: str
    field_name: str
    value: object
    span: tuple | None
    evidence: str
    rule: str
    confidence: float
    extracted_at: str = ""

    def as_dict(self) -> dict:
        return {"doc_id": self.doc_id, "doc_sha": self.doc_sha,
                "field": self.field_name, "value": self.value,
                "span": list(self.span) if self.span else None,
                "evidence": self.evidence, "rule": self.rule,
                "confidence": round(self.confidence, 3)}

    def verify_against(self, text: str) -> tuple:
        """Does this record still describe the document it claims to?"""
        if doc_hash(text) != self.doc_sha:
            return False, "document has changed since extraction"
        if self.span is None:
            return self.value is None, ("abstention record" if self.value is None
                                        else "value with no span")
        a, b = self.span
        if not (0 <= a < b <= len(text)):
            return False, "span out of bounds"
        if text[a:b].strip() != self.evidence.strip():
            return False, "span no longer matches the quoted evidence"
        return True, "ok"


@dataclass
class ExtractionReport:
    doc_id: str
    records: list = field(default_factory=list)

    def to_json(self) -> str:
        return json.dumps({"doc_id": self.doc_id,
                           "records": [r.as_dict() for r in self.records]},
                          indent=2)


def build_report(doc_id: str, text: str, extractions: dict) -> ExtractionReport:
    sha = doc_hash(text)
    recs = [ProvenanceRecord(doc_id=doc_id, doc_sha=sha, field_name=f,
                             value=e.value, span=e.span, evidence=e.evidence,
                             rule=e.rule, confidence=e.confidence)
            for f, e in extractions.items()]
    return ExtractionReport(doc_id=doc_id, records=recs)


# --- scoring --------------------------------------------------------------

def score_values(corpus, extract_all) -> dict:
    """Value accuracy, counting abstention as correct when the field is absent."""
    tp = fp = fn = tn = 0
    per_field: dict = {}
    for d in corpus:
        got = extract_all(d.text)
        for f, e in got.items():
            exp = d.truth.get(f)
            b = per_field.setdefault(f, {"correct": 0, "wrong": 0, "n": 0})
            b["n"] += 1
            if exp is None and e.value is None:
                tn += 1
                b["correct"] += 1
            elif exp is None and e.value is not None:
                fp += 1                       # invented a value
                b["wrong"] += 1
            elif exp is not None and e.value is None:
                fn += 1                       # missed a present field
                b["wrong"] += 1
            elif abs(float(e.value) - float(exp)) < 1e-6:
                tp += 1
                b["correct"] += 1
            else:
                fp += 1                       # wrong value
                b["wrong"] += 1
    total = tp + fp + fn + tn
    return {
        "n": total, "correct": tp + tn, "accuracy": round((tp + tn) / total, 4),
        "extracted_correct": tp, "wrong_or_invented": fp, "missed": fn,
        "correct_abstentions": tn,
        "per_field": {k: {**v, "accuracy": round(v["correct"] / v["n"], 4)}
                      for k, v in per_field.items()},
    }


def score_spans(corpus, extract_all, require_exact: bool = False) -> dict:
    """Span accuracy: did the value come from the right place?

    Reported separately from value accuracy because they fail differently. An
    extractor can return the right number from the wrong sentence -- correct
    today, wrong the moment the document changes, and undetectable without this.
    """
    hit = miss = no_span = 0
    details = []
    for d in corpus:
        got = extract_all(d.text)
        for f, true_span in d.spans.items():
            e = got.get(f)
            if e is None or e.span is None:
                no_span += 1
                details.append({"doc": d.doc_id, "field": f, "result": "no span"})
                continue
            a, b = e.span
            ta, tb = true_span
            overlap = not (b <= ta or a >= tb)
            exact = (a, b) == (ta, tb)
            ok = exact if require_exact else overlap
            hit += ok
            miss += not ok
            details.append({"doc": d.doc_id, "field": f,
                            "result": "hit" if ok else "miss",
                            "predicted_span": [a, b], "true_span": [ta, tb],
                            "quoted": e.evidence})
    total = hit + miss + no_span
    return {"n": total, "hit": hit, "miss": miss, "no_span": no_span,
            "span_accuracy": round(hit / total, 4) if total else 0.0,
            "mode": "exact" if require_exact else "overlap",
            "details": details}
