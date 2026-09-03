"""Extraction where every value carries the span it came from.

The provenance requirement drives the design. An extractor that returns
{"spread_bps": 575} is unauditable: a reviewer cannot tell whether it read the
right sentence, and a wrong-but-plausible number is indistinguishable from a
right one. Every extractor here returns the value AND the character range that
produced it, so a disagreement resolves by looking at the document.

Abstention is a first-class outcome. Two of the corpus documents genuinely lack
a field, and a system that invents values for them is worse than one that says
it did not find them.
"""

from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass
class Extraction:
    field: str
    value: object
    span: tuple | None
    evidence: str
    confidence: float
    rule: str

    def as_dict(self) -> dict:
        return {"field": self.field, "value": self.value,
                "span": list(self.span) if self.span else None,
                "evidence": self.evidence, "confidence": round(self.confidence, 3),
                "rule": self.rule}


def _num(s: str) -> float:
    return float(s.replace(",", "").replace(" ", ""))


def _find(text, pattern, flags=re.I):
    return list(re.finditer(pattern, text, flags))


# --- individual field extractors -----------------------------------------

def extract_commitment(text: str):
    """Total facility size.

    Ordered rules: an explicit "Total Commitment" beats a bare amount, which is
    what stops TS-003's original and incremental tranches being returned
    instead of their sum.
    """
    rules = [
        (r"Total\s+Commitment[:\s]*\$?\s*([\d,]+(?:\.\d+)?)\s*(million|m\b)?",
         "total-commitment", 0.95),
        (r"(?:aggregate principal amount of|Facility Size|Commitment|Amount)"
         r"[:\s]*(?:USD|EUR|\$|€)?\s*([\d,]+(?:\.\d+)?)\s*(million|m\b)?",
         "labelled-amount", 0.85),
        (r"(?:USD|EUR|\$|€)\s*([\d,]+(?:\.\d+)?)\s*(million|m\b)?",
         "currency-amount", 0.60),
    ]
    for pat, rule, conf in rules:
        for m in _find(text, pat):
            # Skip amounts that are explicitly not the facility.
            #
            # This check has to be local. An earlier version scanned 90
            # characters back, which meant "Total Commitment: $175,000,000" was
            # rejected because the word "Incremental" appeared two lines above
            # it -- the guard threw away the one correct answer and returned a
            # tranche instead. Only the word immediately preceding the label can
            # disqualify it.
            head = text[max(0, m.start() - 40):m.start()]
            prev_word = (re.findall(r"([A-Za-z]+)\W*$", head) or [""])[0].lower()
            if prev_word in ("original", "incremental", "equity", "sponsor"):
                continue
            line_start = text.rfind("\n", 0, m.start()) + 1
            line = text[line_start:text.find("\n", m.start())].lower()
            if "equity" in line or "separately committed" in line:
                continue
            val = _num(m.group(1))
            if m.lastindex and m.lastindex >= 2 and m.group(2):
                val *= 1_000_000
            return Extraction("commitment_usd", val, (m.start(), m.end()),
                              m.group(0).strip(), conf, rule)
    return Extraction("commitment_usd", None, None, "", 0.0, "not-found")


def extract_spread(text: str):
    """Margin over the benchmark, in basis points.

    Supersession matters: TS-002 mentions a prior S+700 that must not win. The
    rule is that a spread inside a sentence marked superseded is skipped.
    """
    pats = [
        (r"(?:SOFR|EURIBOR|S|E)\s*(?:\+|plus)\s*(\d+(?:\.\d+)?)\s*(?:%|per cent)",
         "benchmark-plus-pct", 0.92),
        (r"(?:SOFR|EURIBOR|S|E)\s*\+\s*(\d{2,4})\b", "benchmark-plus-bps", 0.90),
    ]
    # Split on lines, not on ".". Splitting on the period cuts "5.75" in half
    # and the spread pattern then matches nothing -- the first version of this
    # silently returned None for the most canonical document in the corpus.
    # Term sheets are line-oriented anyway, and supersession is stated per line.
    best = None
    offset = 0
    for sent in text.splitlines(keepends=True):
        low = sent.lower()
        skip = "superseded" in low or "prior indicative" in low
        for pat, rule, conf in pats:
            for m in re.finditer(pat, sent, re.I):
                if skip:
                    continue
                raw = float(m.group(1))
                bps = raw * 100 if raw < 30 else raw
                cand = Extraction("spread_bps", bps,
                                  (offset + m.start(), offset + m.end()),
                                  m.group(0).strip(), conf, rule)
                if best is None or cand.confidence > best.confidence:
                    best = cand
        offset += len(sent)
    return best or Extraction("spread_bps", None, None, "", 0.0, "not-found")


def extract_floor(text: str):
    pats = [
        (r"(?:SOFR|EURIBOR)\s*[Ff]loor\s*(?:of)?[:\s]*(\d+(?:\.\d+)?)\s*%",
         "named-floor", 0.93),
        (r"(\d+(?:\.\d+)?)\s*%\s*floor", "pct-floor", 0.90),
        (r"[Ff]loor\s*[:\s]*(\d+(?:\.\d+)?)\s*%", "bare-floor", 0.80),
    ]
    for pat, rule, conf in pats:
        m = re.search(pat, text)
        if m:
            return Extraction("floor_bps", float(m.group(1)) * 100,
                              (m.start(), m.end()), m.group(0).strip(), conf, rule)
    return Extraction("floor_bps", None, None, "", 0.0, "not-found")


_WORD_YEARS = {"three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
               "eight": 8, "nine": 9, "ten": 10,
               "third": 3, "fourth": 4, "fifth": 5, "sixth": 6, "seventh": 7,
               "eighth": 8}


def extract_maturity(text: str):
    m = re.search(r"(?:seven|eight|nine|ten|three|four|five|six)\s*\(\s*(\d+)\s*\)\s*years",
                  text, re.I)
    if m:
        return Extraction("maturity_years", float(m.group(1)),
                          (m.start(), m.end()), m.group(0).strip(), 0.95,
                          "word-and-digit")
    m = re.search(r"(?:Tenor|Maturity|Final Maturity)[:\s]*(\d+(?:\.\d+)?)\s*years?",
                  text, re.I)
    if m:
        return Extraction("maturity_years", float(m.group(1)),
                          (m.start(), m.end()), m.group(0).strip(), 0.92, "labelled")
    m = re.search(r"(\w+)\s+anniversary", text, re.I)
    if m and m.group(1).lower() in _WORD_YEARS:
        return Extraction("maturity_years", float(_WORD_YEARS[m.group(1).lower()]),
                          (m.start(), m.end()), m.group(0).strip(), 0.85,
                          "anniversary-word")
    m = re.search(r"(\d+(?:\.\d+)?)\s*years?", text, re.I)
    if m:
        return Extraction("maturity_years", float(m.group(1)),
                          (m.start(), m.end()), m.group(0).strip(), 0.70, "bare-years")
    return Extraction("maturity_years", None, None, "", 0.0, "not-found")


def extract_oid(text: str):
    m = re.search(r"(?:OID|Original Issue Discount|Issue Price)[:\s]*"
                  r"(par|\d+(?:\.\d+)?)", text, re.I)
    if m:
        raw = m.group(1)
        val = 100.0 if raw.lower() == "par" else float(raw)
        return Extraction("oid", val, (m.start(), m.end()), m.group(0).strip(),
                          0.93, "labelled-oid")
    m = re.search(r"(\d+(?:\.\d+)?)\s*OID", text, re.I)
    if m:
        return Extraction("oid", float(m.group(1)), (m.start(), m.end()),
                          m.group(0).strip(), 0.88, "trailing-oid")
    return Extraction("oid", None, None, "", 0.0, "not-found")


def extract_leverage(text: str):
    if re.search(r"covenant[- ]lite|no financial maintenance covenant", text, re.I):
        return Extraction("leverage_covenant", None, None,
                          "covenant-lite", 0.90, "explicit-absence")
    m = re.search(r"(\d+(?:\.\d+)?)\s*x", text)
    if m:
        return Extraction("leverage_covenant", float(m.group(1)),
                          (m.start(), m.end()), m.group(0).strip(), 0.90,
                          "leverage-multiple")
    return Extraction("leverage_covenant", None, None, "", 0.0, "not-found")


EXTRACTORS = {
    "commitment_usd": extract_commitment,
    "spread_bps": extract_spread,
    "floor_bps": extract_floor,
    "maturity_years": extract_maturity,
    "oid": extract_oid,
    "leverage_covenant": extract_leverage,
}


def extract_all(text: str) -> dict:
    return {f: fn(text) for f, fn in EXTRACTORS.items()}
