"""Cross-period comparison of filing sections.

The point of the pipeline is not to summarise a filing — it is to say what
*changed* since the last one, and to make every claim traceable back to the
sentence that produced it. So each finding carries the filing it came from,
the item it sits in, and the verbatim text, which is what the site links to.
"""
from __future__ import annotations

import difflib
import hashlib
import re
from dataclasses import dataclass, field, asdict

# Language that signals a materially different disclosure rather than an edit.
ESCALATION = [
    (r"\bmaterial(ly)? (adverse|weakness|decline|impact)", "material adverse language"),
    (r"\bgoing concern\b", "going-concern reference"),
    (r"\brestat(e|ed|ement)\b", "restatement reference"),
    (r"\bimpairment\b", "impairment reference"),
    (r"\bsubpoena|investigation by|regulatory inquiry", "regulatory action"),
    (r"\bcyber ?(security|attack|incident)|data breach", "cybersecurity incident"),
    (r"\bsupply chain (disruption|constraint|shortage)", "supply-chain disruption"),
    (r"\bcovenant (breach|violation|default)", "covenant breach"),
    (r"\bdelist(ing|ed)?\b", "delisting reference"),
    (r"\bloss of (a )?(major|significant|key) customer", "customer concentration loss"),
]
_ESCALATION = [(re.compile(p, re.I), label) for p, label in ESCALATION]

_SENT = re.compile(r"(?<=[.!?])\s+(?=[A-Z(])")


def sentences(text: str) -> list[str]:
    """Split into sentences, dropping fragments too short to be claims."""
    out = []
    for chunk in text.split("\n"):
        for s in _SENT.split(chunk):
            s = s.strip()
            if len(s) >= 40:
                out.append(s)
    return out


def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip().lower()


def _fingerprint(s: str) -> str:
    return hashlib.sha1(_norm(s).encode()).hexdigest()[:12]


def _containment(new: str, old: str) -> float:
    """How much of `old` survives inside `new`, 0..1.

    Deliberately not difflib.ratio(): that is symmetric, so a disclosure kept
    word-for-word and then *extended* with new risk language scores low purely
    because the new sentence is longer. Containment asks the question that
    actually matters here — is the old sentence still in there? — so the
    extended version is recognised as the same disclosure, escalated.
    """
    if not old:
        return 0.0
    matched = sum(b.size for b in
                  difflib.SequenceMatcher(a=new, b=old, autojunk=False)
                  .get_matching_blocks())
    return matched / len(old)


@dataclass
class Finding:
    kind: str            # added | removed | escalated
    item: str
    item_title: str
    text: str
    signals: list[str] = field(default_factory=list)
    similarity: float | None = None   # for escalated: closest prior sentence
    prior_text: str | None = None
    fingerprint: str = ""

    def __post_init__(self):
        if not self.fingerprint:
            self.fingerprint = _fingerprint(self.text)

    def to_dict(self):
        return asdict(self)


def escalation_signals(sentence: str) -> list[str]:
    return sorted({label for pat, label in _ESCALATION if pat.search(sentence)})


def compare_sections(current, prior, *, item: str, item_title: str,
                     near_match: float = 0.82) -> list[Finding]:
    """Findings for one Item, comparing the current filing against the prior one.

    A sentence is *added* if no prior sentence survives inside it, *removed* if
    it existed before and nothing retains it, and *escalated* if a prior
    sentence is still largely contained in it but the new wording introduces
    risk language the old one did not carry. The last case is the interesting one — that is a disclosure
    that got worse without being rewritten.
    """
    cur = sentences(current)
    old = sentences(prior)
    old_norm = [_norm(s) for s in old]
    old_set = set(old_norm)

    findings: list[Finding] = []
    matched_old: set[int] = set()

    for s in cur:
        n = _norm(s)
        if n in old_set:
            matched_old.add(old_norm.index(n))
            continue

        best_i, best_r = -1, 0.0
        for i, o in enumerate(old_norm):
            r = _containment(n, o)
            if r >= near_match and r > best_r:
                best_i, best_r = i, r

        sig = escalation_signals(s)
        if best_i >= 0:
            matched_old.add(best_i)
            prior_sig = escalation_signals(old[best_i])
            new_sig = [x for x in sig if x not in prior_sig]
            if new_sig:
                findings.append(Finding(
                    kind="escalated", item=item, item_title=item_title, text=s,
                    signals=new_sig, similarity=round(best_r, 3),
                    prior_text=old[best_i]))
        else:
            findings.append(Finding(kind="added", item=item, item_title=item_title,
                                    text=s, signals=sig))

    for i, s in enumerate(old):
        if i not in matched_old and escalation_signals(s):
            findings.append(Finding(kind="removed", item=item, item_title=item_title,
                                    text=s, signals=escalation_signals(s)))

    return findings


def rank(findings: list[Finding]) -> list[Finding]:
    """Escalations first, then added-with-signal, then the rest."""
    order = {"escalated": 0, "added": 1, "removed": 2}
    return sorted(findings, key=lambda f: (order.get(f.kind, 9), -len(f.signals),
                                           -len(f.text)))
