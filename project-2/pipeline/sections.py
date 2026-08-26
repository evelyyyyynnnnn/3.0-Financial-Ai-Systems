"""Extract named Items from a 10-K / 10-Q document.

Filings are HTML, but not consistently structured HTML — the same Item can be
a heading, a table cell, or a bare bold run depending on who prepared it. So
this works on the flattened text and anchors on the Item headings themselves,
which are mandated by Regulation S-K and therefore reliable in a way the
markup is not.
"""
from __future__ import annotations

import re
from dataclasses import dataclass

# Items worth pulling out. Order matters: an Item's body runs until the next
# Item heading, so the sequence defines the boundaries.
ITEMS_10K = [
    ("1",  "Business"),
    ("1A", "Risk Factors"),
    ("1B", "Unresolved Staff Comments"),
    ("2",  "Properties"),
    ("3",  "Legal Proceedings"),
    ("5",  "Market for Registrant's Common Equity"),
    ("7",  "Management's Discussion and Analysis"),
    ("7A", "Quantitative and Qualitative Disclosures About Market Risk"),
    ("8",  "Financial Statements and Supplementary Data"),
    ("9A", "Controls and Procedures"),
]
ITEMS_10Q = [
    ("1",  "Financial Statements"),
    ("2",  "Management's Discussion and Analysis"),
    ("3",  "Quantitative and Qualitative Disclosures About Market Risk"),
    ("4",  "Controls and Procedures"),
    ("1A", "Risk Factors"),
]

_TAG = re.compile(r"<[^>]+>")
_SCRIPT = re.compile(r"<(script|style)\b.*?</\1>", re.S | re.I)
_WS = re.compile(r"[ \t   ]+")
_BLANKS = re.compile(r"\n{3,}")


@dataclass
class Section:
    item: str
    title: str
    text: str
    char_count: int

    def to_dict(self):
        return {"item": self.item, "title": self.title,
                "chars": self.char_count, "text": self.text}


def html_to_text(html: str) -> str:
    """Flatten filing HTML to text, preserving block boundaries."""
    s = _SCRIPT.sub(" ", html)
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"</(p|div|tr|h[1-6]|li)>", "\n", s, flags=re.I)
    s = _TAG.sub(" ", s)
    # Entities that actually show up in filings.
    for ent, ch in (("&nbsp;", " "), ("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
                    ("&#8217;", "'"), ("&#8220;", '"'), ("&#8221;", '"'),
                    ("&#151;", "—"), ("&#8212;", "—"), ("&quot;", '"')):
        s = s.replace(ent, ch)
    s = re.sub(r"&#\d+;", " ", s)
    s = _WS.sub(" ", s)
    s = "\n".join(line.strip() for line in s.split("\n"))
    return _BLANKS.sub("\n\n", s).strip()


def _heading_pattern(item: str) -> re.Pattern:
    # "Item 1A." / "ITEM 1A" / "Item 1A -" — the separator varies.
    return re.compile(rf"^\s*item\s*{re.escape(item)}\s*[\.\:\-–—]?\s",
                      re.I | re.M)


def split_items(text: str, form: str) -> list[Section]:
    """Cut the document into Item sections."""
    spec = ITEMS_10K if form.upper().startswith("10-K") else ITEMS_10Q

    # Find every occurrence of every heading, then keep the last one per item:
    # filings repeat Item headings in the table of contents, and the real
    # section is always the later appearance.
    hits: list[tuple[int, str, str]] = []
    for item, title in spec:
        found = list(_heading_pattern(item).finditer(text))
        if not found:
            continue
        hits.append((found[-1].start(), item, title))

    hits.sort()
    sections: list[Section] = []
    for i, (start, item, title) in enumerate(hits):
        end = hits[i + 1][0] if i + 1 < len(hits) else len(text)
        body = text[start:end].strip()
        # Drop the heading line itself from the body.
        body = re.sub(r"^\s*item\s*[0-9A-Z]+\s*[\.\:\-–—]?\s*", "", body, flags=re.I)
        if len(body) < 200:      # a TOC remnant, not a real section
            continue
        sections.append(Section(item=item, title=title, text=body,
                                char_count=len(body)))
    return sections


def find_section(sections: list[Section], item: str) -> Section | None:
    for s in sections:
        if s.item.upper() == item.upper():
            return s
    return None
