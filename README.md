# 3.0 — Financial AI Systems

The repository carrying the petition. Eleven projects with no baselines read as volume; four with measured results read as contribution.

Part of a five-repository portfolio supporting the endeavor described in the
EB2-NIW petition: **optimization-driven, system-level decision frameworks** —
integrating operations research, mathematical optimization and applied AI — for
domains where a wrong decision carries systemic consequences. The three pillars
are financial stability, healthcare safety and secure digital infrastructure.

| | |
|---|---|
| Petition-grade projects today | 11 built (3 core) |
| Verdict | **Count is fine — depth is the problem** |

> "Petition-grade" means: original work, a stated method, real data at a stated
> scale, a measured result, and a README a reviewer can follow. Counts exclude
> duplicates, forks of third-party work, retired projects, and asset-only
> folders.

## Projects

| Folder | Project | Pillar | Evidence value |
|---|---|---|---|
| [`private-credit-data-provenance/`](private-credit-data-provenance/) | Private Credit Data Provenance | Financial Stability | Planned — build this next; strongest single alignment in the workspace |
| [`tokenized-fixed-income-analytics/`](tokenized-fixed-income-analytics/) | Tokenized Fixed-Income Analytics | Financial Stability | Planned — build this next |
| [`filing-intelligence/`](filing-intelligence/) | Filing Intelligence | Financial Stability | CORE — carries a scale claim that is currently unevidenced |
| [`contagion-observatory/`](contagion-observatory/) | Contagion Observatory | Financial Stability | CORE — carries a scale claim that is currently unevidenced |
| [`measured-results/`](measured-results/) | Measured Results | Financial Stability | Supporting — converts volume into contribution |

## What each one is

### 1. Private Credit Data Provenance — [`private-credit-data-provenance/`](private-credit-data-provenance/)

Extract terms from private credit documents where every extracted value carries a citation back to the source span.

*Why it earns its place:* Notion structural opportunity #1. Private-credit and alternative-asset data are opaque and non-standardised; valuation is subjective; regulators (Form PF, AIFMD) demand more transparency; AUM is projected toward USD 5tn by 2029. Simultaneously a national-interest argument that writes itself and a commercial thesis.

*Target scale:* Private credit term sheets (universe to be stated)

### 2. Tokenized Fixed-Income Analytics — [`tokenized-fixed-income-analytics/`](tokenized-fixed-income-analytics/)

Measure liquidity, holder concentration, and redemption latency for tokenized debt from on-chain trade data.

*Why it earns its place:* Notion structural opportunity #2. Bridges the financial-stability and secure-digital-infrastructure pillars, which the petition currently treats as separate. Building it makes the "three pillars, one framework" story true rather than asserted.

*Target scale:* On-chain tokenized-debt trade data (universe to be stated)

### 3. Filing Intelligence — [`filing-intelligence/`](filing-intelligence/)

Report what CHANGED in a company's SEC risk disclosures since its prior filing, rather than summarising the filing.

*Why it earns its place:* Carries two of the petition's scale claims. Simulated data underneath a real number is the sharpest RFE risk in the portfolio.

*Target scale:* 600+ U.S. corporate filings (10-K / 10-Q)

### 4. Contagion Observatory — [`contagion-observatory/`](contagion-observatory/)

Measure which crypto-equity links actually TRANSMIT stress, and simulate what a shock to one asset does to the rest.

*Why it earns its place:* Carries the asset-count claims. The asset counts are not demonstrable from the repo as it stands.

*Target scale:* 7,500+ crypto assets and 6,000+ U.S. equities/ETFs

### 5. Measured Results — [`measured-results/`](measured-results/)

One measured-results table per built project: baseline, metric, and out-of-sample performance.

*Why it earns its place:* Eleven projects with no baselines read as volume. Four with measured results read as contribution.

*Target scale:* All built projects in this repository

## Repository layout

```
3.0-Financial-Ai-Systems/
├── private-credit-data-provenance/
├── tokenized-fixed-income-analytics/
├── filing-intelligence/
├── contagion-observatory/
├── measured-results/
└── previous/        everything that was here before this restructure
```

Each project folder carries the same skeleton: `README.md`, `docs/`
(METHOD, DATA, EVIDENCE), `src/`, `data/`, `results/`, `tests/`.

## Ground rules

1. **No number without a run log.** Anything cited in the petition must appear
   in that project's `results/README.md` with a run date behind it.
2. **No simulated data under a real claim.** Sample data lives in
   `data/sample/`, labelled, and is never the source of a cited figure.
3. **Adoption must be documentable** — named institutions, dated
   correspondence, registry statistics. Never an inflated count.
4. **Third-party and forked code stays labelled** and is never counted.

## previous/

Everything that lived at the top level before this restructure is preserved
under [`previous/`](previous/) with nothing deleted. See
[`previous/README.md`](previous/README.md) for the inventory and the disposition
of each item.

---
Scaffold generated from `NIW_Project_Portfolio_and_Gap_Plan.xlsx` (sheets: Repo Build-Out Plan, Core Ideas at a Glance, NIW Claim vs Repo Evidence, Notion 创业 Alignment). Structure only — no results are claimed here yet.
