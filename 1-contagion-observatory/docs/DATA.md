# Data — Contagion Observatory

> Scale is the single most-tested claim in this portfolio. State it here, and
> only state what the run log supports. The `--real` run below uses a small,
> fully-sourced universe; the résumé-scale figure is a separate claim this repo
> does not yet demonstrate.

| Field | Value |
|---|---|
| Résumé-claim scale (NOT measured here) | 7,500+ crypto assets and 6,000+ U.S. equities/ETFs |
| Actual `--real` universe | 10 series — the Fama-French 10-industry daily portfolios |
| Actual scale achieved | 10 daily return series over ~756 recent trading days |
| Source | Daily value-weighted returns of the Fama-French 10 industry portfolios (Kenneth R. French Data Library) |
| Licence / terms of use | Free for research use, attribution requested |
| Vintage / as-of date | ~2023-07 through 2026-07; retrieval time recorded in `data/MANIFEST.json` |
| Access requirements | Public HTTP download; URL, sha256 and retrieval time in `data/MANIFEST.json` |

## Rules for this folder

1. **Never commit raw licensed or patient data.** Commit manifests, checksums,
   and the code that reproduces the pull.
2. **Never ship simulated or sample data under a real number.** If a sample set
   exists so a page renders before a live pull, quarantine it in
   `data/sample/` and label it in the README. Simulated data underneath a real
   number is the sharpest RFE risk in this portfolio.
3. **Record the run.** Every reported scale figure needs a dated run log in
   `results/`.

## Reproduction

```
# pulls the Fama-French 10-industry daily portfolios and runs the real pipeline
python -m src.demo --real
# writes results/latest-real.json; provenance (URL, sha256, retrieval time) in data/MANIFEST.json
```

Note: the real path previously used Stooq crypto/equity tickers; Stooq is now
bot-walled, so `--real` uses the Fama-French 10-industry daily portfolios instead.
