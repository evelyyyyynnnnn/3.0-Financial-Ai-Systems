# Measured Results

> **Status: scaffold.** Structure only — no method, data or result is claimed
> yet. Every "not yet measured" below is a real gap, not a placeholder to be
> filled in with an estimate.

**Repository:** `3.0-Financial-Ai-Systems`
**NIW pillar (Dhanasar prong 1):** Financial Stability
**Evidence value:** Supporting — converts volume into contribution

## Core idea

One measured-results table per built project: baseline, metric, and out-of-sample performance.

## Why it earns its place

Eleven projects with no baselines read as volume. Four with measured results read as contribution.

## The petition claim it supports

> Applies to every built project in this repository.

**What the portfolio shows today:** No built project records a baseline or an out-of-sample number.

**Action required:** Add a measured-results table to each built project and roll them up here.

Prior work to build on: `previous/project-1, previous/project-2`.

## Petition-grade checklist

A project counts as petition-grade only when all five are true. None are yet.

- [ ] Original work, authored here
- [ ] A stated method (`docs/METHOD.md`)
- [ ] Real data at a stated scale (`docs/DATA.md` — target: All built projects in this repository)
- [ ] A measured result (`results/README.md`)
- [ ] A README a reviewer can follow, start to finish

## Measured results

Target scale: **All built projects in this repository**

| Metric | Baseline | Result | Out-of-sample |
|---|---|---|---|
| Baseline | _not yet measured_ | _not yet measured_ | _pending_ |
| Metric | _not yet measured_ | _not yet measured_ | _pending_ |
| Out-of-sample result | _not yet measured_ | _not yet measured_ | _pending_ |
| Run date and data vintage | _not yet measured_ | _not yet measured_ | _pending_ |

Populate this from `results/`. Do not cite any number in the petition that does
not appear here with a run date behind it.

## Layout

```
measured-results/
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
