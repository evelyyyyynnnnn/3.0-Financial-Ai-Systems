"""Build Documents from real BDC filings.

The critical difference from the authored corpus, and the reason the results
are reported differently: the authored documents carry `truth` -- the value
each field really has, recorded when the document was written. A real 10-K
carries no such thing. Nobody annotated Ares Capital's schedule of investments
with the answer key an extractor should produce.

So on real filings the project reports what it extracted and WHERE each value
came from -- which is the whole point of span-level provenance, and is fully
checkable, because the span either contains the value or it does not. It does
not report extraction accuracy, because that would need a denominator nobody
has produced.

Provenance is verifiable without an answer key, and that is worth stating: for
every extracted value the character span is re-read from the document hash
recorded at fetch time, so a wrong number can be traced to the text that
produced it even when nobody knows in advance what the right number was.
"""
from __future__ import annotations

import html
import pathlib
import re
from html.parser import HTMLParser

from .datakit import Fetcher, FetchError

ROOT = pathlib.Path(__file__).resolve().parent

_DROP = {"script", "style", "head", "title", "meta", "link"}
_BREAK = {"p", "div", "br", "tr", "li", "h1", "h2", "h3", "table"}
_CELL = {"td", "th"}


class _Text(HTMLParser):
    """Flatten a filing, keeping table cells separated.

    Schedules of investments are tables. Collapsing a row into one run of text
    without separators glues a spread onto a maturity date, and the extractor
    then reads "S + 5.75 2029" as a single number.
    """

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts, self._skip = [], 0

    def handle_starttag(self, tag, attrs):
        if tag in _DROP:
            self._skip += 1
        elif tag in _BREAK:
            self.parts.append("\n")
        elif tag in _CELL:
            self.parts.append("  ")

    def handle_endtag(self, tag):
        if tag in _DROP:
            self._skip = max(0, self._skip - 1)
        elif tag in _BREAK:
            self.parts.append("\n")
        elif tag in _CELL:
            self.parts.append("  ")

    def handle_data(self, data):
        if not self._skip:
            # Line wrapping inside a tag is not a break between values.
            self.parts.append(data.replace("\n", " ").replace("\r", " "))


def html_to_text(raw) -> str:
    if isinstance(raw, bytes):
        raw = raw.decode("utf-8", errors="replace")
    p = _Text()
    p.feed(raw)
    t = html.unescape("".join(p.parts))
    t = (t.replace("\xa0", " ").replace("’", "'").replace("“", '"')
          .replace("”", '"').replace("—", "--").replace("–", "-"))
    t = re.sub(r"[ \t]{3,}", "  ", t)
    t = re.sub(r" ?\n ?", "\n", t)
    return re.sub(r"\n{3,}", "\n\n", t).strip()


SCHEDULE = re.compile(r"consolidated schedule of investments", re.I)


def find_schedule(text: str, window: int = 400_000) -> tuple:
    """Locate the schedule of investments, or fall back to the whole document.

    The heading appears in the table of contents as well as at the section, so
    the occurrence followed by the most text is taken -- the same rule this
    portfolio uses for 10-K items, and for the same reason.
    """
    hits = [m.start() for m in SCHEDULE.finditer(text)]
    if not hits:
        return 0, min(len(text), window)
    best = max(hits, key=lambda i: min(len(text), i + window) - i)
    return best, min(len(text), best + window)


def load_documents(root=ROOT, window: int = 400_000):
    """Return (documents, provenance). Refuses when nothing real is cached."""
    from src.documents import Document

    f = Fetcher(root)
    man = f.load_manifest()
    docs = {k: v for k, v in man["files"].items() if k.endswith(".htm")}
    if not docs:
        raise FetchError(
            "no real filings cached. Run `python -m data.fetch` in a networked "
            "environment first; this project will not present authored loan "
            "documents as filed disclosures.")

    out, prov = [], []
    for dest, rec in sorted(docs.items()):
        ticker = dest.split("/")[0].upper()
        body = html_to_text((f.raw / dest).read_bytes())
        a, b = find_schedule(body, window)
        section = body[a:b]
        out.append(Document(
            doc_id=ticker, text=section,
            truth={},          # no answer key exists for a real filing
            spans={},
            note=f"real 10-K from EDGAR ({rec['url']}); no annotated ground "
                 f"truth exists, so extraction accuracy is not reported",
        ))
        prov.append({
            "doc_id": ticker, "url": rec["url"],
            "sha256": rec["sha256"][:16],
            "retrieved_utc": rec.get("retrieved_utc"),
            "document_chars": len(body),
            "section_chars": len(section),
            "schedule_located": bool(SCHEDULE.search(body)),
            "section_offset": a,
        })

    return out, {"n_documents": len(out), "ground_truth_available": False,
                 "accuracy_withheld_because":
                     "nobody has annotated a real BDC schedule of investments "
                     "with the values an extractor should return, so precision "
                     "and recall have no denominator",
                 "documents": prov}
