# Filing Intelligence

> **Status: scaffold.** Structure only — no method, data or result is claimed
> yet. Every "not yet measured" below is a real gap, not a placeholder to be
> filled in with an estimate.

**Repository:** `3.0-Financial-Ai-Systems`
**NIW pillar (Dhanasar prong 1):** Financial Stability
**Evidence value:** CORE — carries a scale claim that is currently unevidenced

## Core idea

Report what CHANGED in a company's SEC risk disclosures since its prior filing, rather than summarising the filing.

## Why it earns its place

Carries two of the petition's scale claims. Simulated data underneath a real number is the sharpest RFE risk in the portfolio.

## The petition claim it supports

> Automated analysis of 600+ U.S. corporate filings (10-K/10-Q); ~70% reduction in manual report-processing time.

**What the portfolio shows today:** A real SEC EDGAR pipeline across 6 source files — but sample data ships with fictional issuers so the page renders before a live pull, and no timing measurement is recorded anywhere. Scale and measurement are both unevidenced.

**Action required:** Run the real 600+ filings, quarantine the fictional sample, instrument a measured before/after on processing time, and publish the run log.

Prior work to build on: `previous/project-2/filing-intelligence`.

## Petition-grade checklist

A project counts as petition-grade only when all five are true. None are yet.

- [ ] Original work, authored here
- [ ] A stated method (`docs/METHOD.md`)
- [ ] Real data at a stated scale (`docs/DATA.md` — target: 600+ U.S. corporate filings (10-K / 10-Q))
- [ ] A measured result (`results/README.md`)
- [ ] A README a reviewer can follow, start to finish

## Measured results

Target scale: **600+ U.S. corporate filings (10-K / 10-Q)**

| Metric | Baseline | Result | Out-of-sample |
|---|---|---|---|
| Filings processed (real, not sample) | _not yet measured_ | _not yet measured_ | _pending_ |
| Manual report-processing time: before vs. after, measured | _not yet measured_ | _not yet measured_ | _pending_ |
| Change-detection precision / recall | _not yet measured_ | _not yet measured_ | _pending_ |
| Published run log | _not yet measured_ | _not yet measured_ | _pending_ |

Populate this from `results/`. Do not cite any number in the petition that does
not appear here with a run date behind it.

## Layout

```
filing-intelligence/
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
