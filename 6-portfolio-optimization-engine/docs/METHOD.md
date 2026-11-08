# Method — Portfolio Optimization Engine

## Problem

Allocate across five liquid ETFs with a deep reinforcement-learning agent, and
compare it honestly against strategies that contain no model at all.

## Why the approach is non-obvious

Not the agents — DQN and SAC on a portfolio environment is a standard setup.
The non-obvious part is the comparison. A deep-RL portfolio result is only
meaningful against a baseline computed on the same window by the same code, and
the literature is full of agents compared against a buy-and-hold figure quoted
from elsewhere. Here the baselines are computed in `src/baselines.py` on the
same price series, so the comparison is a measurement rather than an assertion.

## Method

Agents: DQN and SAC. Universe: GLD, IWM, QQQ, SPY, TLT. Daily OHLCV,
2010-01-04 to 2023-12-29 (3,522 trading days).

Baselines, computed rather than quoted:

- **Buy-and-hold SPY** — a single position, held.
- **Equal-weight, rebalanced daily** — the whole universe at equal weight.

## The flaw that governs how these numbers may be read

`agents_are_in_sample` is `true`. The reason, recorded in the results file:

> config['data']['train_test_split'] was declared in every YAML config and read by no code, so PortfolioEnv loaded the whole 2010-2023 series and evaluate() built the same environment. These figures are therefore training-set scores, not held-out evaluation. The environment now takes split='train'/'test' and evaluate() defaults to 'test'; the agents must be retrained and re-evaluated before any number here is described as out-of-sample.

So the agent figures below are **training-set scores**. They are published
because they are what the run produced, and because an agent that loses money
on the data it trained on has told you something regardless of the split.

## What the run found

Over the full 3,522-day window — the window the agents actually saw:

| Strategy | Sharpe | Sortino | Calmar | Max drawdown | Total return |
|---|---:|---:|---:|---:|---:|
| DQN *(in-sample)* | -0.3525 | -0.4542 | -0.0387 | -27.47% | -13.71% |
| SAC *(in-sample)* | -0.4715 | -0.6021 | -0.0367 | -40.18% | -18.51% |
| Buy-and-hold SPY | +0.6725 | +0.8256 | +0.3823 | -33.72% | +445.52% |
| Equal-weight, rebalanced daily | +0.7536 | +0.9775 | +0.4172 | -25.55% | +312.08% |

**Both agents lose money in-sample.** Rebalancing daily to equal weights — a
rule with no model, no training and no parameters — returns
+312% at a Sharpe of
0.754. Buy-and-hold SPY returns
+446%.

This is reported as measured. A portfolio of projects in which every method
works is not a portfolio anyone should believe.

## The baselines on each window

The environment now takes `split='train'`/`'test'` and `evaluate()` defaults to
`'test'`, so a retrained agent can be compared on the window below rather than
on the one it learned.

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

Worth noting before any retrained agent is judged against it: the test window is
much harder for both baselines. Equal-weight drops from a Sharpe of
0.945 to
0.143, and SPY from
0.731 to 0.433.
An agent that merely beats those numbers has cleared a lower bar than the same
margin on the training window would suggest.

## Limitations

- **The agent figures are in-sample and must not be described otherwise.** They
  are superseded the moment the agents are retrained under the corrected split.
- **Five ETFs, one period, no transaction costs or slippage** stated.
- **No hyperparameter search** is reported; these are single runs.

## Reproduction

```bash
pip install -r requirements.txt    # needs gymnasium
python -m src.demo
```
