"""Turn downloaded 10-K documents into the FilingPair objects the diff consumes.

Two things about real filings that the authored corpus does not prepare you for:

  * They are inline-XBRL HTML. The text is buried under `<ix:nonNumeric>` and
    hundreds of `<span>`s carrying styling, and naive tag-stripping runs words
    together because the tag boundary is the only thing separating them.
  * They have no ground-truth labels. The authored corpus knows which risks were
    added, removed and reworded, so precision and recall can be reported. On a
    real pair nobody has annotated the answer, so the diff can be produced but
    NOT scored. `--real` therefore reports counts and omits accuracy rather
    than inventing a denominator.
"""
from __future__ import annotations

import html
import pathlib
import re
from html.parser import HTMLParser

from .datakit import Fetcher

ROOT = pathlib.Path(__file__).resolve().parent

# Tags whose contents are markup, not prose.
_DROP = {"script", "style", "head", "title", "meta", "link"}
# Tags that end a line of text; without these, "Risk FactorsWe depend" happens.
_BREAK = {"p", "div", "br", "tr", "td", "th", "li", "table", "h1", "h2",
          "h3", "h4", "h5", "h6", "section"}


class _Text(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in _DROP:
            self._skip += 1
        elif tag in _BREAK:
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag in _DROP:
            self._skip = max(0, self._skip - 1)
        elif tag in _BREAK:
            self.parts.append("\n")

    def handle_data(self, data):
        if not self._skip:
            self.parts.append(data)


def html_to_text(raw: bytes | str) -> str:
    """Flatten filing HTML to prose, preserving paragraph boundaries."""
    if isinstance(raw, bytes):
        raw = raw.decode("utf-8", errors="replace")
    p = _Text()
    p.feed(raw)
    text = html.unescape("".join(p.parts))
    text = text.replace("\xa0", " ").replace("’", "'").replace("“", '"') \
               .replace("”", '"').replace("—", "--").replace("–", "-")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r" ?\n ?", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _period(filed: str) -> str:
    """A 10-K filed in year N covers fiscal year N-1 for most registrants."""
    return f"FY{int(filed[:4]) - 1}"


def load_pairs(root=ROOT, fetcher=None):
    """Build one FilingPair per company from the cached real filings.

    Returns (pairs, provenance). Raises FetchError if the cache is empty, so a
    caller can never silently get authored data when it asked for real data.
    """
    from src.corpus import FilingPair
    from src.sections import find_item

    f = fetcher or Fetcher(root)
    man = f.load_manifest()
    docs = {k: v for k, v in man["files"].items() if k.endswith(".htm")}
    if not docs:
        from .datakit import FetchError
        raise FetchError(
            "no real filings cached. Run `python -m data.fetch` in a networked "
            "environment first; this project will not substitute authored text "
            "for real text without saying so.")

    by_company: dict = {}
    for dest, rec in docs.items():
        ticker = dest.split("/")[0].upper()
        filed = re.search(r"(\d{4}-\d{2}-\d{2})", dest).group(1)
        by_company.setdefault(ticker, []).append((filed, dest, rec))

    pairs, prov = [], []
    for ticker, items in sorted(by_company.items()):
        items.sort()                       # oldest first
        if len(items) < 2:
            continue
        (p_filed, p_dest, p_rec), (c_filed, c_dest, c_rec) = items[-2], items[-1]
        texts = {}
        for tag, dest in (("prior", p_dest), ("current", c_dest)):
            body = html_to_text((f.raw / dest).read_bytes())
            s, e = find_item(body, "1A")
            if s < 0:
                break
            texts[tag] = body[s:e].strip()
        if len(texts) != 2:
            prov.append({"ticker": ticker, "status": "Item 1A not located"})
            continue

        pairs.append(FilingPair(
            company=ticker,
            prior_period=_period(p_filed), current_period=_period(c_filed),
            prior=texts["prior"], current=texts["current"],
            note=f"real 10-K filings from EDGAR, filed {p_filed} and {c_filed}; "
                 f"no human-annotated diff exists for this pair, so the result "
                 f"is reported without accuracy",
        ))
        prov.append({
            "ticker": ticker, "status": "ok",
            "prior": {"filed": p_filed, "sha256": p_rec["sha256"][:16],
                      "url": p_rec["url"], "item_1a_chars": len(texts["prior"])},
            "current": {"filed": c_filed, "sha256": c_rec["sha256"][:16],
                        "url": c_rec["url"], "item_1a_chars": len(texts["current"])},
        })
    return pairs, prov
