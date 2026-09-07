# NIW evidence — Contagion Observatory

**Repository:** `3.0-Financial-Ai-Systems`
**Pillar (Dhanasar prong 1):** Financial Stability
**Evidence value:** CORE — carries a scale claim that is currently unevidenced

## The claim in the petition

> Datasets spanning 7,500+ cryptocurrency assets and 6,000+ U.S. equities/ETFs; crypto-equity contagion modelling with a Columbia co-author.

## What the repositories currently show

A synthetic demo with a KNOWN set of transmitting edges, on which precision/recall and shock-recovery are scored, plus a `--real` path that runs the same pipeline on real data: the daily value-weighted returns of the Fama-French 10-industry portfolios (Kenneth R. French Data Library — 10 series, ~756 trading days), ranking cross-industry transmission candidate links. The real run does NOT use the crypto/equity universe named in the petition, and honestly reports no precision/recall or recovery there because the true transmission graph is unknown (`recovery_reported:false`).

## The gap

Carries the asset-count claims. The `--real` run demonstrates a working, fully-sourced pipeline on 10 industry portfolios — not the 7,500+ crypto / 6,000+ equity universe in the petition, which is not demonstrable from the repo as it stands.

## Action

Run the stated universe, publish the edge dataset, and link the co-authored paper from the README.

## Exhibit readiness

- [ ] The claim in the petition matches what this folder can demonstrate
- [ ] Scale is stated and backed by a dated run log
- [ ] The result is measured against a named baseline, out-of-sample
- [ ] Any adoption cited is documented by name and date — never an inflated
      download or star count
- [ ] Third-party or forked code is labelled and excluded from the count

> Adoption evidence must be documentable. Inflated download counts or stars
> presented as adoption on a federal petition is misrepresentation and puts the
> whole filing at risk — far beyond the value of the metric.
