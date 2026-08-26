# Reference

Third-party code, kept for reference. **None of this is original work**, and
nothing in the portfolio counts it as such. It sits in its own directory so the
distinction is structural rather than a caveat someone has to read to notice.

## options-volatility-trading

MIT-licensed. **Copyright (c) 2021 MCF Long Short**, from
[`mcf-long-short/ibkr-options-volatility-trading`](https://github.com/mcf-long-short/ibkr-options-volatility-trading)
— a group project for a Financial Derivatives course in the Masters in
Computational Finance at Union University.

A long/short straddle volatility strategy against Interactive Brokers, with a
MarketWatcher bot that alerts on daily P&L thresholds and a Flask dashboard.
Its `src/market_watcher/ib_client/` directory is Interactive Brokers' own
official Python TWS API, vendored by the original authors.

Retained because the straddle construction and the alerting workflow are a
useful reference alongside `project-1/volatility-forecasting/`, which is
original work: LSTM and Transformer volatility forecasters with an Optuna
tuning pipeline.

The upstream LICENSE is unmodified at
[`options-volatility-trading/LICENSE`](options-volatility-trading/LICENSE).
