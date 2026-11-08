# Data — Portfolio Optimization Engine

| Field | Value |
|---|---|
| Source | Yahoo Finance via `yfinance` |
| Universe | GLD, IWM, QQQ, SPY, TLT |
| Period | 2010-01-04 to 2023-12-29 |
| Trading days | 3,522 |
| Fields | Daily OHLCV |
| Cache | `data/market_data.pkl` |
| Licence | Yahoo Finance terms; redistribution of raw prices is not assumed |
| Run recorded | 2026-09-11T22:41:21+00:00 |

Full source string as written by the run:

> real daily OHLCV for GLD, IWM, QQQ, SPY, TLT via Yahoo Finance (yfinance), 2010-01-04 to 2023-12-29 (3522 trading days); cached in data/market_data.pkl

## The three windows

| Window | From | To | Days |
|---|---|---|---|
| Train | 2010-01-04 | 2021-03-12 | 2,817 |
| Test | 2021-03-15 | 2023-12-29 | 705 |
| Full | 2010-01-04 | 2023-12-29 | 3,522 |

The committed agent run used the **full** window for both training and
evaluation — see [`METHOD.md`](METHOD.md). The train and test windows exist in
the code and are the ones a retrained agent must use.

## Why these five

GLD, IWM, QQQ, SPY, TLT span equities, small caps, technology, long bonds and
gold: five liquid instruments with low enough correlation that allocation is a
real decision rather than a leveraged bet on one factor. A universe where the
right answer is always "hold the index" would not test an allocator.

## What is not in this data

- **No transaction costs, spreads or slippage.** Every return above is gross.
- **No dividends** beyond whatever the adjusted series already reflects.
- **No survivorship question** — all five tickers exist across the whole period —
  which is a property of choosing a fixed, liquid universe, not an achievement.

## Rules for this folder

1. **Never commit raw price files** beyond the cached pickle the demo needs.
2. **Any agent figure must state its window.** In-sample and out-of-sample are
   not interchangeable and the difference is the whole point of this project.
3. **Record the run.** Every reported figure needs a dated entry in
   [`results/README.md`](../results/README.md).
