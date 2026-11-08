# Results — Portfolio Optimization Engine

This file is the only source for the numbers quoted elsewhere in this
repository; if a figure is not here with a run date, it is not cited.

## Measured result

Run `2026-09-11T22:41:21+00:00` · GLD, IWM, QQQ, SPY, TLT · 2010-01-04 to
2023-12-29 · 3,522 trading days

| Strategy | Sharpe | Sortino | Calmar | Max drawdown | Total return |
|---|---:|---:|---:|---:|---:|
| DQN *(in-sample)* | -0.3525 | -0.4542 | -0.0387 | -27.47% | -13.71% |
| SAC *(in-sample)* | -0.4715 | -0.6021 | -0.0367 | -40.18% | -18.51% |
| Buy-and-hold SPY | +0.6725 | +0.8256 | +0.3823 | -33.72% | +445.52% |
| Equal-weight, rebalanced daily | +0.7536 | +0.9775 | +0.4172 | -25.55% | +312.08% |

⚠️ **The two agent rows are in-sample.** `agents_are_in_sample` is `true`:

> config['data']['train_test_split'] was declared in every YAML config and read by no code, so PortfolioEnv loaded the whole 2010-2023 series and evaluate() built the same environment. These figures are therefore training-set scores, not held-out evaluation. The environment now takes split='train'/'test' and evaluate() defaults to…

## Baselines by window

**Train — 2010-01-04 to 2021-03-12 (2,817 days)**

| Strategy | Sharpe | Sortino | Calmar | Max drawdown | Total return |
|---|---:|---:|---:|---:|---:|
| Buy-and-hold SPY | +0.7311 | +0.8655 | +0.4146 | -33.72% | +332.62% |
| Equal-weight, rebalanced daily | +0.9451 | +1.1813 | +0.5972 | -21.07% | +276.36% |

**Test — 2021-03-15 to 2023-12-29 (705 days)**

| Strategy | Sharpe | Sortino | Calmar | Max drawdown | Total return |
|---|---:|---:|---:|---:|---:|
| Buy-and-hold SPY | +0.4329 | +0.6269 | +0.3459 | -24.50% | +25.35% |
| Equal-weight, rebalanced daily | +0.1435 | +0.2172 | +0.1249 | -25.55% | +8.83% |

## Run log

| Run | Date | Scale | Status |
|---|---|---|---|
| real | 2026-09-11 | 3,522 days, 5 tickers | agents in-sample; baselines computed per window |

## What this does *not* establish

- **Out-of-sample agent performance.** No such figure exists yet.
- **That deep RL cannot allocate.** It establishes that these two agents, at
  these settings, lost money on their own training data.
- **Net returns.** No transaction costs, spreads or slippage are modelled.
