# Tokenized Fixed-Income Analytics

> **Status: scaffold.** Structure only — no method, data or result is claimed
> yet. Every "not yet measured" below is a real gap, not a placeholder to be
> filled in with an estimate.

**Repository:** `3.0-Financial-Ai-Systems`
**NIW pillar (Dhanasar prong 1):** Financial Stability
**Evidence value:** Planned — build this next

## Core idea

Measure liquidity, holder concentration, and redemption latency for tokenized debt from on-chain trade data.

## Why it earns its place

Notion structural opportunity #2. Bridges the financial-stability and secure-digital-infrastructure pillars, which the petition currently treats as separate. Building it makes the "three pillars, one framework" story true rather than asserted.

## The petition claim it supports

> Fixed-income electronification and tokenization of real-world assets.

**What the portfolio shows today:** A scoping document only, in the archived roadmap/ folder.

**Action required:** Build it, and use it to join the financial-stability and secure-digital-infrastructure pillars explicitly.

Prior work to build on: `previous/roadmap/tokenized-fixed-income-analytics`.

## Petition-grade checklist

A project counts as petition-grade only when all five are true. None are yet.

- [ ] Original work, authored here
- [ ] A stated method (`docs/METHOD.md`)
- [ ] Real data at a stated scale (`docs/DATA.md` — target: On-chain tokenized-debt trade data (universe to be stated))
- [ ] A measured result (`results/README.md`)
- [ ] A README a reviewer can follow, start to finish

## Measured results

Target scale: **On-chain tokenized-debt trade data (universe to be stated)**

| Metric | Baseline | Result | Out-of-sample |
|---|---|---|---|
| Liquidity measures vs. off-chain comparables | _not yet measured_ | _not yet measured_ | _pending_ |
| Holder-concentration (HHI) | _not yet measured_ | _not yet measured_ | _pending_ |
| Redemption latency distribution | _not yet measured_ | _not yet measured_ | _pending_ |

Populate this from `results/`. Do not cite any number in the petition that does
not appear here with a run date behind it.

## Layout

```
tokenized-fixed-income-analytics/
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
