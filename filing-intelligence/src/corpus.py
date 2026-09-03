"""Paired filings with a known set of changes between them.

Authored, and labelled as such everywhere. Real 10-K pairs are freely available
from EDGAR, but a diff has no ground truth unless someone has said what changed
-- so a pair written with known edits is what makes the change detector
measurable at all. `edgar.py` is the path to the real universe.

Each pair carries: risks added, risks removed, risks materially reworded, and
risks left alone. The reworded ones are the interesting case, because that is
where a naive diff either misses the change or reports every risk as changed.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class FilingPair:
    company: str
    prior_period: str
    current_period: str
    prior: str
    current: str
    added: list = field(default_factory=list)
    removed: list = field(default_factory=list)
    reworded: list = field(default_factory=list)
    unchanged: list = field(default_factory=list)
    note: str = ""


_SUPPLY_PRIOR = """
Item 1A. Risk Factors

We depend on a limited number of suppliers for critical components. A single supplier
accounted for 31 percent of component purchases during fiscal 2023. Any interruption in
supply could materially affect our ability to meet customer demand.

Our operating results may fluctuate significantly from quarter to quarter due to the
timing of large orders, changes in customer mix, and the seasonality of demand in our
principal end markets.

We face intense competition in all of our markets. Some of our competitors have greater
financial and technical resources than we do, and may be able to respond more quickly to
new technologies or customer requirements.

Item 1B. Unresolved Staff Comments
None.
"""

_SUPPLY_CURRENT = """
Item 1A. Risk Factors

We depend on a limited number of suppliers for critical components. A single supplier
accounted for 42 percent of component purchases during fiscal 2024, compared with 31
percent in fiscal 2023. This concentration has increased, and any interruption in supply
could materially affect our ability to meet customer demand and could require us to
qualify alternative sources on an accelerated timeline.

Our operating results may fluctuate significantly from quarter to quarter due to the
timing of large orders, changes in customer mix, and the seasonality of demand in our
principal end markets.

We are subject to evolving data protection and artificial intelligence regulation in the
jurisdictions in which we operate. Compliance with new requirements may increase our
costs, and failure to comply could result in penalties or restrictions on our products.

Item 1B. Unresolved Staff Comments
None.
"""

_BANK_PRIOR = """
Item 1A. Risk Factors

Changes in interest rates may adversely affect our net interest margin. A sustained
period of elevated rates could reduce loan demand and increase funding costs.

We are exposed to credit risk in our commercial real estate portfolio, which represented
18 percent of total loans at year end.

Our business depends on the continued availability of deposits. A significant withdrawal
of deposits over a short period could require us to obtain funding on less favourable
terms.

Item 2. Properties
"""

_BANK_CURRENT = """
Item 1A. Risk Factors

Changes in interest rates may adversely affect our net interest margin. A sustained
period of elevated rates could reduce loan demand and increase funding costs.

We are exposed to credit risk in our commercial real estate portfolio, which represented
24 percent of total loans at year end. Office exposure within that portfolio has
experienced valuation declines, and we increased our allowance for credit losses
accordingly during the period.

Our business depends on the continued availability of deposits. A significant withdrawal
of deposits over a short period could require us to obtain funding on less favourable
terms, and recent industry events have increased the speed at which deposits may move.

We rely on third-party cloud infrastructure for core banking functions. A prolonged
outage at a major provider could interrupt customer access to accounts.

Item 2. Properties
"""

_QUIET_PRIOR = """
Item 1A. Risk Factors

Our results depend on general economic conditions in the markets we serve. A downturn
could reduce demand for our services and affect our results of operations.

We may not realise the anticipated benefits of our acquisitions. Integration may take
longer or cost more than expected.

Item 7. Management's Discussion and Analysis
"""

_QUIET_CURRENT = """
Item 1A. Risk Factors

Our results depend on general economic conditions in the markets we serve. A downturn
could reduce demand for our services and affect our results of operations.

We may not realise the anticipated benefits of our acquisitions. Integration may take
longer or cost more than expected.

Item 7. Management's Discussion and Analysis
"""

CORPUS = (
    FilingPair(
        company="Meridian Components", prior_period="FY2023", current_period="FY2024",
        prior=_SUPPLY_PRIOR, current=_SUPPLY_CURRENT,
        added=["evolving data protection and artificial intelligence regulation"],
        removed=["intense competition"],
        reworded=["limited number of suppliers"],
        unchanged=["operating results may fluctuate"],
        note="One added, one removed, one materially reworded with a changed "
             "concentration figure, one untouched."),
    FilingPair(
        company="Harborline Bancorp", prior_period="FY2023", current_period="FY2024",
        prior=_BANK_PRIOR, current=_BANK_CURRENT,
        added=["third-party cloud infrastructure"],
        removed=[],
        reworded=["commercial real estate portfolio", "availability of deposits"],
        unchanged=["Changes in interest rates"],
        note="Two rewordings, one addition, nothing removed. The interest-rate risk "
             "is byte-identical and must not be reported as changed."),
    FilingPair(
        company="Steadfast Services", prior_period="FY2023", current_period="FY2024",
        prior=_QUIET_PRIOR, current=_QUIET_CURRENT,
        added=[], removed=[], reworded=[],
        unchanged=["general economic conditions", "anticipated benefits"],
        note="Identical filings. A change detector that reports anything here is "
             "producing noise, which is the failure mode that makes these tools "
             "ignored in practice."),
)


def corpus_stats() -> dict:
    return {
        "n_pairs": len(CORPUS),
        "n_added": sum(len(p.added) for p in CORPUS),
        "n_removed": sum(len(p.removed) for p in CORPUS),
        "n_reworded": sum(len(p.reworded) for p in CORPUS),
        "n_unchanged": sum(len(p.unchanged) for p in CORPUS),
    }
