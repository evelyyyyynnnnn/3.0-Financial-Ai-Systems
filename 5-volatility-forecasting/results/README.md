# Results — Volatility Forecasting

This file is the only source for the numbers quoted elsewhere in this
repository; if a figure is not here with a run date, it is not cited.

## Current state: **no reportable metric**

`metrics_reported` is `false` in [`latest-real.json`](latest-real.json).

> this run predates the lookahead fix in LSTM-Volatility-Prediction/data/data_loader.py. The feature scaler was fitted with fit_transform over the whole 2010-2023 series, so the test period's minimum and maximum were inside every training feature; shifting only the last 10% of the series moved the training tensor by 0.99 on a [0, 1] scale. …

The model must be retrained under the corrected scaler before any figure from
this project is quoted anywhere.

## Superseded run — published for the shape, not the score

Produced 2026-09-09 by the leaky pipeline. **Not quotable.**

| Split | MSE | RMSE | MAE | R² |
|---|---|---|---|---|
| Train | 0.000586 | 0.0242 | 0.0165 | 0.8777 |
| Validation | 0.002091 | 0.0457 | 0.0301 | **0.9312** |
| Test | 0.001704 | 0.0413 | 0.0309 | 0.6115 |

> produced 2026-09-09 by the leaky pipeline. Note the shape that should have prompted the question: validation R2 (0.931) exceeded training R2 (0.878) and both far exceeded test R2 (0.611).

## Run log

| Run | Date | Data | Status |
|---|---|---|---|
| superseded | 2026-09-09 | `^GSPC` 2010–2023, LSTM, 20 epochs | **withheld — lookahead** |

## What this does *not* establish

- Any forecasting performance, held-out or otherwise.
- Anything about volatility models in general. One index, one target, one leak.

## Reproduction

```bash
python -m src.demo   # needs TensorFlow and network access to Yahoo Finance
```
