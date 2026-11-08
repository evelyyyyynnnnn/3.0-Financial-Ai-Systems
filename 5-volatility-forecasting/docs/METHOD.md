# Method — Volatility Forecasting

## Problem

Predict close-to-close realised volatility for the S&P 500 from its own price
history, one day ahead.

## Why the approach is non-obvious

Not the model — an LSTM over a rolling window is the ordinary choice. The
non-obvious part is that the usual preprocessing step silently destroys the
experiment. Scaling features before a chronological split is the single most
common way a time-series result becomes unquotable, and it leaves no trace:
training converges, the loss curve looks healthy, and the reported R² is simply
wrong. Nothing errors.

## Method

A `lstm` trained for 20 epochs on daily `^GSPC` closes, predicting
realised volatility computed close-to-close. The split is chronological: the
model never sees a later day while training on an earlier one.

## The leak, and how it was found

The feature scaler was fitted with `fit_transform` over the **whole**
2010–2023 series, before the chronological split. A MinMax scaler fitted that
way places the minimum and maximum of the test period inside every training
feature.

The check needs no model at all:

> multiply the last 10% of the price series — test data — by ten, rebuild the
> training tensor, and measure how far it moved.

It moved by **0.99** on a [0, 1] scale. A training tensor that responds that
strongly to data it is not supposed to have seen is not a training tensor.

The scaler is now fitted only on rows the training split can reach, and that
property is asserted in `tests/test_no_lookahead.py` rather than left to
discipline.

## Why no metric is reported

`metrics_reported` is `false` in the results file. The reason is recorded there
in full:

> this run predates the lookahead fix in LSTM-Volatility-Prediction/data/data_loader.py. The feature scaler was fitted with fit_transform over the whole 2010-2023 series, so the test period's minimum and maximum were inside every training feature; shifting only the last 10% of the series moved the tra…

## The superseded run, kept for the shape of it

Produced 2026-09-09 by the leaky pipeline. It is published not as a result but
because the shape of it is instructive:

| Split | MSE | RMSE | MAE | R² |
|---|---|---|---|---|
| Train | 0.000586 | 0.0242 | 0.0165 | 0.8777 |
| Validation | 0.002091 | 0.0457 | 0.0301 | **0.9312** |
| Test | 0.001704 | 0.0413 | 0.0309 | 0.6115 |

**Validation R² (0.931) exceeded training R² (0.878).** A model
should not fit data it was not trained on better than data it was. That single
inversion is the tell, and it is the question the run should have prompted
before any number was quoted.

## Limitations

- **No reportable metric exists.** The model must be retrained under the fixed
  scaler before any figure from this project is cited.
- **One index, one target.** `^GSPC`, close-to-close realised volatility.
- **No baseline yet.** A retrained result will need to be compared against at
  least a naive persistence forecast to mean anything.

## Reproduction

```bash
python -m src.demo   # needs TensorFlow and network access to Yahoo Finance
```
