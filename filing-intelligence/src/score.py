"""Scoring the change report against the labelled pairs.

A change detector is judged on two things a reader cares about: does it find the
material changes, and does it stay quiet when nothing happened. The second is
what decides whether the tool gets used -- a report that flags every risk every
quarter is indistinguishable from not running it.
"""

from __future__ import annotations

from .diff import diff_risks, summarise, tokens
from .sections import extract_risk_factors, split_risk_factors


def _mentions(text: str, phrase: str) -> bool:
    """Is this labelled risk the one this passage is about?"""
    pt = set(tokens(phrase))
    return bool(pt) and len(pt & set(tokens(text))) / len(pt) >= 0.7


def score_pair(pair) -> dict:
    prior = split_risk_factors(extract_risk_factors(pair.prior))
    current = split_risk_factors(extract_risk_factors(pair.current))
    changes = diff_risks(prior, current)

    found = {"added": [], "removed": [], "reworded": [], "unchanged": []}
    for c in changes:
        found[c.kind].append(c.current or c.prior)

    def check(kind, labels):
        hits = []
        for lab in labels:
            hits.append(any(_mentions(t, lab) for t in found[kind]))
        return hits

    res = {}
    for kind, labels in (("added", pair.added), ("removed", pair.removed),
                         ("reworded", pair.reworded),
                         ("unchanged", pair.unchanged)):
        hits = check(kind, labels)
        res[kind] = {"expected": len(labels), "found": int(sum(hits)),
                     "missed": [l for l, h in zip(labels, hits) if not h]}

    expected_material = len(pair.added) + len(pair.removed) + len(pair.reworded)
    got = summarise(changes)
    return {
        "company": pair.company,
        "periods": f"{pair.prior_period} → {pair.current_period}",
        "n_prior_risks": len(prior), "n_current_risks": len(current),
        "counts": got,
        "expected_material": expected_material,
        "per_kind": res,
        "changes": [c.as_dict() for c in changes],
        "note": pair.note,
    }


def score_corpus(corpus) -> dict:
    rows = [score_pair(p) for p in corpus]
    tot_exp = sum(r["expected_material"] for r in rows)
    tot_found = sum(sum(r["per_kind"][k]["found"]
                        for k in ("added", "removed", "reworded")) for r in rows)
    # Noise: material changes reported on the pair where nothing changed.
    quiet = [r for r in rows if r["expected_material"] == 0]
    noise = sum(r["counts"]["material"] for r in quiet)
    return {
        "pairs": rows,
        "material_expected": tot_exp,
        "material_found": tot_found,
        "recall": round(tot_found / tot_exp, 4) if tot_exp else 0.0,
        "false_alarms_on_unchanged_pairs": noise,
        "n_quiet_pairs": len(quiet),
    }
