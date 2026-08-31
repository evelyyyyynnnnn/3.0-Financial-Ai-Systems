"""Matching risks across two filings and classifying what changed.

The report a reader wants is not a text diff. It is: which risks are new, which
are gone, and which are still there but say something different. That requires
matching risks across the two documents first, because risks are reordered
between filings and a positional diff reports the whole section as changed.

Matching is by token overlap with a stated threshold. Everything is lexical and
inspectable; no model is involved and none is needed for this step.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

_WORD = re.compile(r"[a-z0-9]+")
_NUM = re.compile(r"\d[\d,]*(?:\.\d+)?")
_STOP = frozenset("""
a an the of to in on at for and or but is are was were be been being with as by from
that this these those it its their there our we us may can could would will shall
""".split())


def tokens(text: str) -> list:
    return [w for w in _WORD.findall(text.lower()) if w not in _STOP]


def jaccard(a: str, b: str) -> float:
    sa, sb = set(tokens(a)), set(tokens(b))
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def numbers(text: str) -> set:
    return {m.group(0).replace(",", "") for m in _NUM.finditer(text)}


@dataclass
class RiskChange:
    kind: str                    # added | removed | reworded | unchanged
    current: str = ""
    prior: str = ""
    similarity: float = 0.0
    numbers_changed: tuple = ()
    summary: str = ""

    def as_dict(self) -> dict:
        return {"kind": self.kind, "similarity": round(self.similarity, 4),
                "numbers_changed": list(self.numbers_changed),
                "summary": self.summary,
                "current": self.current[:400], "prior": self.prior[:400]}


def _headline(text: str, n: int = 14) -> str:
    words = text.split()
    return " ".join(words[:n]) + ("…" if len(words) > n else "")


def diff_risks(prior_risks: list, current_risks: list,
               match_threshold: float = 0.42,
               reword_threshold: float = 0.97) -> list:
    """Greedy best-match pairing, then classify each pair.

    Greedy rather than optimal assignment: with a few dozen risks the difference
    is negligible, and greedy keeps the output explainable -- each pairing is the
    best remaining match for that risk, which is a sentence a reader can check.
    """
    used = set()
    changes: list = []

    for cur in current_risks:
        best_i, best_s = -1, 0.0
        for i, pri in enumerate(prior_risks):
            if i in used:
                continue
            s = jaccard(cur, pri)
            if s > best_s:
                best_i, best_s = i, s

        if best_i < 0 or best_s < match_threshold:
            changes.append(RiskChange(kind="added", current=cur, similarity=best_s,
                                      summary=f"NEW: {_headline(cur)}"))
            continue

        used.add(best_i)
        pri = prior_risks[best_i]
        num_delta = tuple(sorted(numbers(cur) ^ numbers(pri)))
        if best_s >= reword_threshold and not num_delta:
            changes.append(RiskChange(kind="unchanged", current=cur, prior=pri,
                                      similarity=best_s,
                                      summary=f"unchanged: {_headline(cur)}"))
        else:
            bits = []
            if num_delta:
                bits.append("figures changed: " + ", ".join(num_delta[:6]))
            bits.append(f"{best_s:.0%} similar")
            changes.append(RiskChange(
                kind="reworded", current=cur, prior=pri, similarity=best_s,
                numbers_changed=num_delta,
                summary=f"REWORDED: {_headline(cur)} ({'; '.join(bits)})"))

    for i, pri in enumerate(prior_risks):
        if i not in used:
            changes.append(RiskChange(kind="removed", prior=pri,
                                      summary=f"REMOVED: {_headline(pri)}"))
    return changes


def summarise(changes: list) -> dict:
    counts = {"added": 0, "removed": 0, "reworded": 0, "unchanged": 0}
    for c in changes:
        counts[c.kind] += 1
    return {**counts, "total": len(changes),
            "material": counts["added"] + counts["removed"] + counts["reworded"]}
