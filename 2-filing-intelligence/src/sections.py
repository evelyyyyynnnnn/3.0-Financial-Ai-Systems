"""Splitting a filing into the sections a reader compares.

Item 1A (Risk Factors) is the target. The hard part is not finding the heading
but finding the right one: a 10-K names Item 1A in its table of contents, in
cross-references, and at the section itself, and the naive first match lands in
the table of contents every time.

The rule used here is that the real section heading is the occurrence followed
by the most text before the next item heading. That is simple, checkable, and
stated so a reader can judge it.
"""

from __future__ import annotations

import re

ITEM_PATTERNS = {
    "1": r"item\s*1\b(?!\s*a)",
    "1A": r"item\s*1a\b",
    "1B": r"item\s*1b\b",
    "2": r"item\s*2\b",
    "3": r"item\s*3\b",
    "7": r"item\s*7\b(?!\s*a)",
    "7A": r"item\s*7a\b",
    "8": r"item\s*8\b",
}


def _normalise(text: str) -> str:
    text = text.replace(" ", " ")
    return re.sub(r"[ \t]+", " ", text)


def find_item(text: str, item: str = "1A") -> tuple:
    """Return (start, end) of the item's body, or (-1, -1)."""
    text = _normalise(text)
    pat = ITEM_PATTERNS.get(item.upper())
    if not pat:
        raise KeyError(f"unknown item {item}")

    starts = [m.start() for m in re.finditer(pat, text, re.I)]
    if not starts:
        return (-1, -1)

    # Any later item heading terminates the section.
    others = sorted(
        m.start()
        for key, p in ITEM_PATTERNS.items() if key.upper() != item.upper()
        for m in re.finditer(p, text, re.I))

    best, best_len = (-1, -1), -1
    for s in starts:
        following = [o for o in others if o > s]
        e = following[0] if following else len(text)
        if e - s > best_len:
            best_len, best = e - s, (s, e)
    return best


def extract_risk_factors(text: str) -> str:
    a, b = find_item(text, "1A")
    if a < 0:
        return ""
    body = _normalise(text)[a:b]
    # Drop the heading line itself. Left in, it rides along on the first risk
    # and shows up quoted in every diff summary.
    body = re.sub(r"^\s*item\s*1a\.?\s*(risk\s+factors)?\.?\s*", "",
                  body, flags=re.I)
    return body.strip()


def split_risk_factors(section: str) -> list:
    """Split a risk-factors section into individual risks.

    Risks are conventionally introduced by a bolded sentence-like heading. In
    plain text that convention is gone, so paragraphs are used, with very short
    fragments merged into the following paragraph.
    """
    paras = [p.strip() for p in re.split(r"\n\s*\n", section) if p.strip()]
    out: list = []
    buf = ""
    for p in paras:
        if len(p.split()) < 12:
            buf = (buf + " " + p).strip()
            continue
        out.append((buf + " " + p).strip() if buf else p)
        buf = ""
    if buf:
        out.append(buf)
    return out
