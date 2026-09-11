"""The baselines the RL result claims to beat, actually computed.

results/latest-real.json said both agents "underperform a buy-and-hold
baseline". No buy-and-hold number was anywhere in the repository, so that was an
assertion, not a measurement. These are the same metrics main.py uses, applied
to two passive strategies on the same cached real prices, over a stated window.

    python -m src.baselines
"""
from __future__ import annotations

import json
import pathlib
import pickle

import numpy as np
import pandas as pd

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / "data" / "market_data.pkl"

# Imported rather than re-derived: a baseline scored with a different Sharpe
# formula than the agents would not be a comparison.
from .metrics import (calculate_calmar_ratio, calculate_max_drawdown,
                      calculate_sharpe_ratio, calculate_sortino_ratio)


def load_close(cache: pathlib.Path = CACHE) -> pd.DataFrame:
    """Daily closes per ticker from the cached real download."""
    df = pickle.load(open(cache, "rb"))
    close = df.xs("Close", axis=1, level=1)
    if isinstance(close.columns, pd.MultiIndex):
        close.columns = close.columns.get_level_values(-1)
    return close.loc[:, ~close.columns.duplicated()].sort_index()


def score(values: np.ndarray, returns: np.ndarray) -> dict:
    """The five figures the agents are reported with, computed identically."""
    return {
        "sharpe_ratio": float(calculate_sharpe_ratio(returns)),
        "sortino_ratio": float(calculate_sortino_ratio(returns)),
        "calmar_ratio": float(calculate_calmar_ratio(returns)),
        "max_drawdown": float(calculate_max_drawdown(values)),
        "total_return": float(values[-1] / values[0] - 1),
    }


def buy_and_hold(close: pd.DataFrame, ticker: str) -> dict:
    px = close[ticker].to_numpy(dtype=float)
    return score(px, np.diff(px) / px[:-1])


def equal_weight_rebalanced(close: pd.DataFrame) -> dict:
    """Rebalanced daily to equal weights -- the neutral allocation an agent that
    has learned nothing useful should be measured against."""
    rets = close.pct_change().dropna().to_numpy(dtype=float)
    port = rets.mean(axis=1)
    values = np.concatenate([[1.0], np.cumprod(1.0 + port)])
    return score(values, port)


def windows(close: pd.DataFrame, split: float = 0.8) -> dict:
    n = len(close)
    cut = int(n * split)
    return {
        "train": close.iloc[:cut],
        "test": close.iloc[cut:],
        "full": close,
    }


def run(split: float = 0.8) -> dict:
    close = load_close()
    out = {
        "data_source": "the project's own cached real download, data/market_data.pkl",
        "tickers": sorted(close.columns),
        "train_test_split": split,
        "metric_definitions": "imported from src/metrics.py, the same functions "
                              "main.py scores the agents with",
        "windows": {},
    }
    for name, frame in windows(close, split).items():
        out["windows"][name] = {
            "first_date": str(frame.index[0])[:10],
            "last_date": str(frame.index[-1])[:10],
            "n_days": int(len(frame)),
            "baselines": {
                "buy-and-hold SPY": buy_and_hold(frame, "SPY"),
                "equal-weight, rebalanced daily": equal_weight_rebalanced(frame),
            },
        }
    return out


def main() -> int:
    r = run()
    print(f"baselines on {', '.join(r['tickers'])}  "
          f"({r['metric_definitions']})\n")
    for name, w in r["windows"].items():
        print(f"[{name}]  {w['first_date']} -> {w['last_date']}  "
              f"({w['n_days']} days)")
        for label, m in w["baselines"].items():
            print(f"    {label:<32} Sharpe {m['sharpe_ratio']:+.3f}  "
                  f"total return {m['total_return']:+.3f}  "
                  f"max drawdown {m['max_drawdown']:+.3f}")
        print()
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results" / "baselines.json").write_text(
        json.dumps(r, indent=2) + "\n", encoding="utf8")
    print("wrote results/baselines.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
