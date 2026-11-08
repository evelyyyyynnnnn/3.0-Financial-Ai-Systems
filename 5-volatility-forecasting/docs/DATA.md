# Data — Volatility Forecasting

| Field | Value |
|---|---|
| Source | Yahoo Finance via `yfinance` |
| Instrument | `^GSPC` (S&P 500 index) |
| Period | 2010-01-01 to 2023-12-31 |
| Field used | Daily close |
| Target | Realised volatility, close-to-close |
| Licence | Yahoo Finance terms; redistribution of raw prices is not assumed |
| Run recorded | 2026-09-09T19:30:14+00:00 |

Full source string as written by the run:

> real daily prices for ^GSPC via Yahoo Finance (yfinance), 2010-01-01 to 2023-12-31; target is realised volatility (close_to_close)

## Why this series

A long, liquid, freely available index series with no survivorship question and
no vendor licence to negotiate. The point of this project is the preprocessing
failure, not the asset, so the data should be the least interesting thing about it.

## The split

Chronological, not random. A random split on a price series lets the model
interpolate between days it has already seen, which is a different and easier
problem than forecasting.

## What went wrong here, stated in the data terms

Scaling is a data step, not a model step, and it was applied to the whole series
before the split. See [`METHOD.md`](METHOD.md) for the measurement that exposed
it. The lesson belongs in this file as much as that one: **a transform fitted
across the split boundary is a data leak, whatever the model does afterwards.**

## Rules for this folder

1. **Never commit raw price files.** `data/raw/` is git-ignored.
2. **Fit every transform inside the training split**, asserted by
   `tests/test_no_lookahead.py`.
3. **Record the run.** Every reported figure needs a dated entry in
   [`results/README.md`](../results/README.md).

## Reproduction

```bash
python -m src.demo   # needs TensorFlow and network access to Yahoo Finance
```
