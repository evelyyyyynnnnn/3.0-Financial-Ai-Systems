# 3.0 — Financial AI Systems

The repository carrying the petition. Seven projects with no baselines read as volume; four with measured results read as contribution.

Part of a five-repository portfolio supporting the endeavor described in the
EB2-NIW petition: **optimization-driven, system-level decision frameworks** —
integrating operations research, mathematical optimization and applied AI — for
domains where a wrong decision carries systemic consequences. The three pillars
are financial stability, healthcare safety and secure digital infrastructure.

| | |
|---|---|
| Petition-grade projects today | 7 built (3 core) |
| Verdict | **Count is fine — depth is the problem** |

> "Petition-grade" means: original work, a stated method, real data at a stated
> scale, a measured result, and a README a reviewer can follow. Counts exclude
> duplicates, forks of third-party work, retired projects, and asset-only
> folders.

## Projects

| Folder | Project | Pillar | Evidence value |
|---|---|---|---|
| [`3-private-credit-data-provenance/`](3-private-credit-data-provenance/) | Private Credit Data Provenance | Financial Stability | Planned — build this next; strongest single alignment in the workspace |
| [`4-tokenized-fixed-income-analytics/`](4-tokenized-fixed-income-analytics/) | Tokenized Fixed-Income Analytics | Financial Stability | Planned — build this next |
| [`2-filing-intelligence/`](2-filing-intelligence/) | Filing Intelligence | Financial Stability | CORE — carries a scale claim that is currently unevidenced |
| [`1-contagion-observatory/`](1-contagion-observatory/) | Contagion Observatory | Financial Stability | CORE — carries a scale claim that is currently unevidenced |
| [`7-portfolio-results-rollup/`](7-portfolio-results-rollup/) | Measured Results | Financial Stability | Supporting — converts volume into contribution |

## What each one is

### 1. Private Credit Data Provenance — [`3-private-credit-data-provenance/`](3-private-credit-data-provenance/)

Extract terms from private credit documents where every extracted value carries a citation back to the source span.

*Why it earns its place:* Notion structural opportunity #1. Private-credit and alternative-asset data are opaque and non-standardised; valuation is subjective; regulators (Form PF, AIFMD) demand more transparency; AUM is projected toward USD 5tn by 2029. Simultaneously a national-interest argument that writes itself and a commercial thesis.

*Target scale:* Private credit term sheets (universe to be stated)

### 2. Tokenized Fixed-Income Analytics — [`4-tokenized-fixed-income-analytics/`](4-tokenized-fixed-income-analytics/)

Measure liquidity, holder concentration, and redemption latency for tokenized debt from on-chain trade data.

*Why it earns its place:* Notion structural opportunity #2. Bridges the financial-stability and secure-digital-infrastructure pillars, which the petition currently treats as separate. Building it makes the "three pillars, one framework" story true rather than asserted.

*Target scale:* On-chain tokenized-debt trade data (universe to be stated)

### 3. Filing Intelligence — [`2-filing-intelligence/`](2-filing-intelligence/)

Report what CHANGED in a company's SEC risk disclosures since its prior filing, rather than summarising the filing.

*Why it earns its place:* Carries two of the petition's scale claims. Simulated data underneath a real number is the sharpest RFE risk in the portfolio.

*Target scale:* 600+ U.S. corporate filings (10-K / 10-Q)

### 4. Contagion Observatory — [`1-contagion-observatory/`](1-contagion-observatory/)

Measure which crypto-equity links actually TRANSMIT stress, and simulate what a shock to one asset does to the rest.

*Why it earns its place:* Carries the asset-count claims. The asset counts are not demonstrable from the repo as it stands.

*Target scale:* 7,500+ crypto assets and 6,000+ U.S. equities/ETFs

### 5. Measured Results — [`7-portfolio-results-rollup/`](7-portfolio-results-rollup/)

One 7-portfolio-results-rollup table per built project: baseline, metric, and out-of-sample performance.

*Why it earns its place:* Seven projects with no baselines read as volume. Four with measured results read as contribution.

*Target scale:* All built projects in this repository

## Repository layout

```
3.0-Financial-Ai-Systems/
├── 2-filing-intelligence/
├── 1-contagion-observatory/
├── 3-private-credit-data-provenance/
├── 4-tokenized-fixed-income-analytics/
├── 7-portfolio-results-rollup/
│
│   ── earlier work, promoted out of previous/ ──
├── 6-portfolio-optimization-engine/
└── 5-volatility-forecasting/
```

Every rebuilt project carries the same skeleton: `README.md`, `src/`, `data/`, `results/`, `tests/`, `website/`.

> Earlier and off-theme prior work (dashboards, consumer apps, templates, and other non-endeavor folders) has been moved to a separate `archive-prior-work` repository to keep this repository focused on the endeavor. It remains recoverable from this repository's git history.

## Ground rules

1. **No number without a run log.** Anything cited in the petition must appear
   in that project's `results/README.md` with a run date behind it.
2. **No simulated data under a real claim.** Sample data lives in
   `data/sample/`, labelled, and is never the source of a cited figure.
3. **Adoption must be documentable** — named institutions, dated
   correspondence, registry statistics. Never an inflated count.
4. **Third-party and forked code stays labelled** and is never counted.

## Earlier work

There is no `previous/` folder any more. Everything that was in it has been promoted to the top level, so every piece of work in this repository is a first-class folder that can be opened, read and continued.

Nothing was deleted except items the rebuild genuinely supersedes; those remain in git history.

| Folder | What it is | How it may be used |
|---|---|---|
| [`6-portfolio-optimization-engine/`](6-portfolio-optimization-engine/) | Multi-agent portfolio allocation policy. | Prior original work. |
| [`5-volatility-forecasting/`](5-volatility-forecasting/) | LSTM volatility forecasting. | Prior original work. |

**Read the third column before citing anything here.** Forks of third-party work, duplicates, retired projects and asset-only folders are labelled as such and are not part of the petition's evidence.


---
Scaffold generated from `NIW_Project_Portfolio_and_Gap_Plan.xlsx` (sheets: Repo Build-Out Plan, Core Ideas at a Glance, NIW Claim vs Repo Evidence, Notion 创业 Alignment). Structure only — no results are claimed here yet.
