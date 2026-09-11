# Volatility Forecasting

> A sequence model for realised volatility on real S&P 500 prices — and the lookahead leak that made its first result unusable.

**Repository:** `3.0-Financial-Ai-Systems` &middot; **Pillar:** Financial Stability

## Status

Real data, real training run, **result withheld**.

The model trains on real daily `^GSPC` prices from Yahoo Finance (2010–2023) and
predicts close-to-close realised volatility. The run committed on 2026-09-09
reported test R² 0.611. That number is not quotable, and `results/latest-real.json`
says so in the file itself.

The feature scaler was fitted with `fit_transform` over the **whole** series,
before the chronological split. A MinMax scaler fitted that way puts the minimum
and maximum of the test period into every training feature. The check needs no
model: multiply the last 10% of the price series — test data — by ten, rebuild the
training tensor, and see whether it moved.

It moved by **0.99** on a [0, 1] scale.

The scaler is now fitted only on the rows the training split can reach, and that
assertion is `tests/test_no_lookahead.py`. The model has to be retrained before any
figure here is cited.

## Quick start

```bash
pip install -r LSTM-Volatility-Prediction/requirements.txt
python -m pytest tests/ -q     # 5 tests, offline, no TensorFlow needed
python -m src.demo             # retrain on real data, rewrite results/ and website/
python -m src.site             # rebuild the page from the recorded run alone
```

The test suite deliberately needs neither a network nor a deep-learning framework.
What is worth guarding here is the handling of time — the split, the sequence
alignment, what the scaler is allowed to see — and none of that needs a GPU.

## What the tests guard

| Test | The property |
|---|---|
| `test_changing_only_the_future_leaves_the_training_data_untouched` | Shift the test tail 10×; the training tensor must not move |
| `test_the_scaler_is_fitted_only_on_rows_the_training_split_reaches` | The fit window ends at `train_size + window_size` |
| `test_the_split_is_chronological_and_never_shuffled` | Each split begins where the previous ended, in order |
| `test_every_target_comes_from_after_its_own_feature_window` | Sequence *i* predicts the step beyond the rows it saw |
| `test_backfilling_the_target_never_reaches_a_target_that_is_used` | The volatility warm-up ends before the first label |

The first two fail against the version committed before this one. That is the
point of writing them.

## Layout

```
README.md
LSTM-Volatility-Prediction/   the model, config, training loop and data loader
results/
  |-- latest-real.json        the recorded run; metrics currently withheld
src/
  |-- demo.py                 entry point the portfolio roll-up calls
  |-- site.py                 builds website/ from the recorded run
  |-- sitekit.py              shared page builder
tests/                        offline guards on the handling of time
website/                      self-contained static site
```

## What this project does *not* establish

- It does not establish that the model forecasts volatility. No metric from the
  fixed pipeline exists yet.
- Realised volatility is strongly autocorrelated, so a high R² against it is weak
  evidence on its own. The comparison that matters is against a
  previous-value baseline, and that has not been run.
- One index, one period, one architecture. Nothing here generalises.
