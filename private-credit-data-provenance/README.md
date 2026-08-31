# Private Credit Data Provenance

> **Status: scaffold.** Structure only — no method, data or result is claimed
> yet. Every "not yet measured" below is a real gap, not a placeholder to be
> filled in with an estimate.

**Repository:** `3.0-Financial-Ai-Systems`
**NIW pillar (Dhanasar prong 1):** Financial Stability
**Evidence value:** Planned — build this next; strongest single alignment in the workspace

## Core idea

Extract terms from private credit documents where every extracted value carries a citation back to the source span.

## Why it earns its place

Notion structural opportunity #1. Private-credit and alternative-asset data are opaque and non-standardised; valuation is subjective; regulators (Form PF, AIFMD) demand more transparency; AUM is projected toward USD 5tn by 2029. Simultaneously a national-interest argument that writes itself and a commercial thesis.

## The petition claim it supports

> Market transparency, regulatory reporting and systemic risk in private credit.

**What the portfolio shows today:** A scoping document only, in the archived roadmap/ folder.

**Action required:** Build the term-sheet parser as the MVP. Shares its provenance layer with the data-provenance-library in repo 5.0.

Prior work to build on: `previous/roadmap/private-credit-data-provenance`.

## Petition-grade checklist

A project counts as petition-grade only when all five are true. None are yet.

- [ ] Original work, authored here
- [ ] A stated method (`docs/METHOD.md`)
- [ ] Real data at a stated scale (`docs/DATA.md` — target: Private credit term sheets (universe to be stated))
- [ ] A measured result (`results/README.md`)
- [ ] A README a reviewer can follow, start to finish

## Measured results

Target scale: **Private credit term sheets (universe to be stated)**

| Metric | Baseline | Result | Out-of-sample |
|---|---|---|---|
| Term-extraction accuracy (held-out) | _not yet measured_ | _not yet measured_ | _pending_ |
| Span-citation precision — every value traceable to source | _not yet measured_ | _not yet measured_ | _pending_ |
| Coverage across document formats | _not yet measured_ | _not yet measured_ | _pending_ |
| Human-review time saved | _not yet measured_ | _not yet measured_ | _pending_ |

Populate this from `results/`. Do not cite any number in the petition that does
not appear here with a run date behind it.

## Layout

```
private-credit-data-provenance/
├── README.md        this file
├── docs/
│   ├── METHOD.md    what the method is and why it is non-obvious
│   ├── DATA.md      source, scale, licence, and how to reproduce the pull
│   └── EVIDENCE.md  the petition claim, the gap, and the exhibit it becomes
├── src/             implementation
├── data/            pointers and manifests — never raw licensed data
├── results/         measured results, run logs, and the baseline comparison
└── tests/           tests that establish the result is reproducible
```

---
Scaffold generated from `NIW_Project_Portfolio_and_Gap_Plan.xlsx` (sheets: Repo Build-Out Plan, Core Ideas at a Glance, NIW Claim vs Repo Evidence, Notion 创业 Alignment). Structure only — no results are claimed here yet.
