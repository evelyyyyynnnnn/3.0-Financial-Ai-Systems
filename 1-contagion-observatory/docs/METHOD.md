# Method — Contagion Observatory

> **Not yet written.** This file must state the method before the project can
> be cited as evidence.

## Problem

Measure which links between assets actually TRANSMIT stress — separated from the much larger set that merely move together — and simulate what a shock to one asset does to the rest.

## Why the approach is non-obvious

Correlation is everywhere in market data and almost none of it is transmission, so the synthetic demo tests the method where the true edges are known. The `--real` path applies the same ranking to the Fama-French 10-industry daily portfolios (10 series, ~756 trading days) to surface cross-industry transmission candidates. The résumé-scale asset counts (7,500+ crypto / 6,000+ equities) are a separate claim and are not demonstrable from the repo as it stands.

## Method

_State the approach, the modelling choices, and the assumptions. A reviewer with
domain knowledge but no context should be able to follow it end to end._

## Baseline

_Name the baseline this is measured against. Without one, the result is a number
with nothing to compare it to._

Suggested baseline sources: previous/project-2/contagion

## Evaluation protocol

_State the split, the held-out set, and how out-of-sample performance is
measured. Report calibration and uncertainty where the domain calls for it._

Precision/recall and shock-recovery are scored ONLY on the synthetic demo, where
the true transmitting edges are known. On the `--real` Fama-French run the true
transmission graph is unknown, so `recovery_reported` is `false`, `true_edges` is
empty, and the shock-propagation section is zero by design; the real run reports
only a ranked list of candidate transmission links (lagged-correlation edge score
plus stress-day tail lift), not accuracy against a ground truth.

## Reproduction

```
python -m src.demo          # synthetic demo -> results/latest.json (scores precision/recall)
python -m src.demo --real    # Fama-French 10-industry real run -> results/latest-real.json
```
