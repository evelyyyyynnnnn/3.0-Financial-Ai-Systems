"""Authored private-credit term sheets with known ground truth.

Real term sheets are confidential, so these are written for this project. Each
carries the correct value for every field AND the character span where it
appears, which is what makes span-level citation measurable rather than
asserted: extracting the right number from the wrong place is a failure this
corpus can detect.

The documents deliberately vary in the ways that break naive extraction --
different orderings, different phrasings for the same field, distractor numbers,
amendments that supersede earlier terms, and one document where a field is
genuinely absent.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Document:
    doc_id: str
    text: str
    truth: dict = field(default_factory=dict)      # field -> value
    spans: dict = field(default_factory=dict)      # field -> (start, end)
    note: str = ""

    def span_text(self, fld: str) -> str:
        if fld not in self.spans:
            return ""
        a, b = self.spans[fld]
        return self.text[a:b]


def _mk(doc_id, text, truth, cues, note=""):
    """Locate each field's span by finding its cue string in the text."""
    spans = {}
    for fld, cue in cues.items():
        i = text.find(cue)
        if i < 0:
            raise ValueError(f"{doc_id}: cue {cue!r} for {fld} not in text")
        spans[fld] = (i, i + len(cue))
    return Document(doc_id=doc_id, text=text, truth=truth, spans=spans, note=note)


D1 = _mk("TS-001", """
SUMMARY OF INDICATIVE TERMS

Borrower: Meridian Packaging Holdings, LLC
Facility: Senior Secured Term Loan B
Commitment: $185,000,000
Maturity: seven (7) years from the Closing Date
Interest Rate: SOFR + 5.75%, subject to a SOFR floor of 1.00%
Original Issue Discount: 98.5
Financial Covenant: Total Net Leverage Ratio not to exceed 5.25x, tested quarterly
Call Protection: 102 / 101 / par
Sponsor: Ashford Partners
""", {
    "commitment_usd": 185_000_000, "spread_bps": 575, "floor_bps": 100,
    "maturity_years": 7.0, "oid": 98.5, "leverage_covenant": 5.25,
}, {
    "commitment_usd": "$185,000,000", "spread_bps": "SOFR + 5.75%",
    "floor_bps": "SOFR floor of 1.00%", "maturity_years": "seven (7) years",
    "oid": "98.5", "leverage_covenant": "5.25x",
}, "Canonical layout. Every field present and stated once.")

D2 = _mk("TS-002", """
TERM SHEET -- PROJECT HARBOUR

The Lenders shall provide a unitranche facility in an aggregate principal amount
of USD 92.5 million to Harbour Diagnostics Inc.

Pricing shall be S+650 with a 0.75% floor. The facility shall mature on the
fifth anniversary of closing. Issued at 99.0 OID.

Maintenance covenant: net leverage shall not exceed 4.75x.
Prior indicative pricing of S+700 discussed on 14 March is superseded.
""", {
    "commitment_usd": 92_500_000, "spread_bps": 650, "floor_bps": 75,
    "maturity_years": 5.0, "oid": 99.0, "leverage_covenant": 4.75,
}, {
    "commitment_usd": "USD 92.5 million", "spread_bps": "S+650",
    "floor_bps": "0.75% floor", "maturity_years": "fifth anniversary",
    "oid": "99.0 OID", "leverage_covenant": "4.75x",
}, "Prose form, abbreviations, and a superseded spread that must not be picked.")

D3 = _mk("TS-003", """
AMENDED AND RESTATED SUMMARY OF TERMS

Borrower: Calder Industrial Services
Original Commitment: $140,000,000
Incremental Commitment: $35,000,000
Total Commitment: $175,000,000

Margin: SOFR plus 5.25 per cent. per annum
SOFR Floor: 1.25%
Tenor: 6 years
OID: 99.25
Springing Covenant: First Lien Net Leverage of 6.00x, tested when revolver
utilisation exceeds 35%.
""", {
    "commitment_usd": 175_000_000, "spread_bps": 525, "floor_bps": 125,
    "maturity_years": 6.0, "oid": 99.25, "leverage_covenant": 6.00,
}, {
    "commitment_usd": "Total Commitment: $175,000,000",
    "spread_bps": "SOFR plus 5.25 per cent",
    "floor_bps": "SOFR Floor: 1.25%", "maturity_years": "Tenor: 6 years",
    "oid": "OID: 99.25", "leverage_covenant": "6.00x",
}, "Three commitment figures. Only the total is correct; the others are distractors.")

D4 = _mk("TS-004", """
INDICATIVE TERMS

Issuer: Northgate Renewables Holdco
Amount: EUR 210,000,000 (equivalent)
Coupon: EURIBOR + 4.90%, EURIBOR floor 0.00%
Final Maturity: 8 years
Issue Price: par
Leverage Test: Consolidated Net Leverage 5.75x
Note: the Sponsor has separately committed EUR 60,000,000 of equity.
""", {
    "commitment_usd": 210_000_000, "spread_bps": 490, "floor_bps": 0,
    "maturity_years": 8.0, "oid": 100.0, "leverage_covenant": 5.75,
}, {
    "commitment_usd": "EUR 210,000,000", "spread_bps": "EURIBOR + 4.90%",
    "floor_bps": "EURIBOR floor 0.00%", "maturity_years": "8 years",
    "oid": "par", "leverage_covenant": "5.75x",
}, "Non-USD, zero floor, 'par' rather than a number, and an equity distractor.")

D5 = _mk("TS-005", """
SUMMARY OF PROPOSED TERMS

Borrower: Vantage Logistics Group
Facility Size: $65,000,000
Rate: SOFR + 6.25%
Maturity: 5 years
OID: 98.0

No financial maintenance covenant. The facility is covenant-lite.
""", {
    "commitment_usd": 65_000_000, "spread_bps": 625, "floor_bps": None,
    "maturity_years": 5.0, "oid": 98.0, "leverage_covenant": None,
}, {
    "commitment_usd": "$65,000,000", "spread_bps": "SOFR + 6.25%",
    "maturity_years": "5 years", "oid": "98.0",
}, "Covenant-lite with no floor. Two fields are genuinely absent, and a system "
   "that invents values for them is worse than one that abstains.")

CORPUS = (D1, D2, D3, D4, D5)

FIELDS = ("commitment_usd", "spread_bps", "floor_bps", "maturity_years",
          "oid", "leverage_covenant")


def corpus_stats() -> dict:
    present = {f: sum(1 for d in CORPUS if d.truth.get(f) is not None)
               for f in FIELDS}
    return {
        "n_documents": len(CORPUS),
        "n_fields": len(FIELDS),
        "field_instances": sum(present.values()),
        "absent_instances": len(CORPUS) * len(FIELDS) - sum(present.values()),
        "present_per_field": present,
    }
