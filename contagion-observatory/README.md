# Contagion Observatory

> **Status: scaffold.** Structure only — no method, data or result is claimed
> yet. Every "not yet measured" below is a real gap, not a placeholder to be
> filled in with an estimate.

**Repository:** `3.0-Financial-Ai-Systems`
**NIW pillar (Dhanasar prong 1):** Financial Stability
**Evidence value:** CORE — carries a scale claim that is currently unevidenced

## Core idea

Measure which crypto-equity links actually TRANSMIT stress, and simulate what a shock to one asset does to the rest.

## Why it earns its place

Carries the asset-count claims. The asset counts are not demonstrable from the repo as it stands.

## The petition claim it supports

> Datasets spanning 7,500+ cryptocurrency assets and 6,000+ U.S. equities/ETFs; crypto-equity contagion modelling with a Columbia co-author.

**What the portfolio shows today:** Tail-dependence weighting at 0.65 and real data sources named (Stooq, CoinGecko) — but it currently ships simulated series.

**Action required:** Run the stated universe, publish the edge dataset, and link the co-authored paper from the README.

Prior work to build on: `previous/project-2/contagion`.

## Petition-grade checklist

A project counts as petition-grade only when all five are true. None are yet.

- [ ] Original work, authored here
- [ ] A stated method (`docs/METHOD.md`)
- [ ] Real data at a stated scale (`docs/DATA.md` — target: 7,500+ crypto assets and 6,000+ U.S. equities/ETFs)
- [ ] A measured result (`results/README.md`)
- [ ] A README a reviewer can follow, start to finish

## Measured results

Target scale: **7,500+ crypto assets and 6,000+ U.S. equities/ETFs**

| Metric | Baseline | Result | Out-of-sample |
|---|---|---|---|
| Assets in the run universe (real, not simulated) | _not yet measured_ | _not yet measured_ | _pending_ |
| Transmitting-edge count and stability | _not yet measured_ | _not yet measured_ | _pending_ |
| Shock-propagation simulation vs. realised episodes | _not yet measured_ | _not yet measured_ | _pending_ |
| Published edge dataset | _not yet measured_ | _not yet measured_ | _pending_ |

Populate this from `results/`. Do not cite any number in the petition that does
not appear here with a run date behind it.

## Layout

```
contagion-observatory/
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
