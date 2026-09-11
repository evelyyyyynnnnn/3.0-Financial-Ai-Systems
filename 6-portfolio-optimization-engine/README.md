# Portfolio Optimization Engine

> Deep-RL portfolio agents on fourteen years of real ETF prices. They lose money, and they lose it on the data they trained on.

**Repository:** `3.0-Financial-Ai-Systems` &middot; **Pillar:** Financial Stability

## The result

| Strategy | Sharpe | Total return | Max drawdown |
|---|---:|---:|---:|
| DQN *(in-sample)* | −0.353 | −13.7% | −27.5% |
| SAC *(in-sample)* | −0.471 | −18.5% | −40.2% |
| Buy-and-hold SPY | **+0.673** | **+446%** | −33.7% |
| Equal-weight, rebalanced daily | **+0.754** | **+312%** | −25.5% |

Real daily OHLCV for GLD, IWM, QQQ, SPY and TLT from Yahoo Finance, 2010-01-04 to
2023-12-29 (3,522 trading days), cached in `data/market_data.pkl`.

Both agents lose money. Rebalancing daily to equal weights — a strategy with no
model in it at all — beats both by a wide margin. This is reported because it is
what the run produced. A portfolio of projects in which every method works is not
a portfolio anyone should believe.

## Two things that made those numbers mean something other than they appeared to

**The agent figures are in-sample.** Every config declared

```yaml
data:
  train_test_split: 0.8
```

and no code anywhere read it. `PortfolioEnv` loaded the entire series, and
`evaluate()` built the same environment from the same config — so the agents were
scored on the data they trained on. Losing money on your own training data is a
*stronger* negative result than losing it out of sample, but it is a different
claim, and the result file now says which one it is.

`PortfolioEnv` now takes `split="train"` / `"test"` / `"all"`, `evaluate()` defaults
to the held-out slice, and `tests/test_split_is_honoured.py` fails if a config
declares a split the code does not read. **The agents have not been retrained under
the fix**, so no out-of-sample agent figure exists yet.

**The baseline was prose.** The committed result asserted that both agents
"underperform a buy-and-hold baseline". No buy-and-hold number existed anywhere in
the repository. `src/baselines.py` now computes two passive strategies over the
train, test and full windows, importing the *same* metric functions `main.py` scores
the agents with — a baseline measured with a different Sharpe formula would not be a
comparison. Those functions moved to `src/metrics.py` so that scoring a series no
longer requires importing the whole RL stack, which is why nothing had done it.

## Quick start

```bash
pip install -r requirements.txt
python -m pytest tests/ -q        # 9 tests; the split and baseline tests need no GPU
python -m src.baselines           # passive baselines from the cached real prices
python -m src.emit_result         # rewrite results/latest-real.json and website/
python src/main.py --config src/config/sb3_dqn.yaml   # retrain (needs SB3 + PyTorch)
```

## What the tests guard

| Test | The property |
|---|---|
| `test_every_config_declaring_a_split_is_read_by_the_code` | A declared knob no code reads is a guarantee the code does not give |
| `test_the_environment_actually_narrows_to_the_requested_split` | Train ends before test begins, and the two partition the series |
| `test_an_unknown_split_is_refused_rather_than_silently_ignored` | A typo'd split raises instead of quietly meaning "all" |
| `test_the_passive_baselines_are_computed_not_asserted` | Every window and strategy yields five finite metrics |
| `test_the_baselines_are_scored_by_the_same_functions_as_the_agents` | Comparison, not coincidence |
| `test_the_agents_are_compared_against_a_baseline_in_the_committed_result` | The claim in the result points at a number in the result |

## What this project does *not* establish

- It does not establish that deep RL cannot allocate a portfolio. Two architectures,
  one asset universe, one period, one hyperparameter setting.
- It does not establish an out-of-sample result of any kind. The agents have never
  been evaluated on held-out data.
- The passive baselines are not a strategy recommendation. They are the floor a
  method has to clear before it is worth discussing.
