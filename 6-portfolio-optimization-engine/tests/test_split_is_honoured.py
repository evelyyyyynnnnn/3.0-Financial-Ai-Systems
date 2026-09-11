"""The split has to be real, and the baseline has to be computed.

Two findings, both of which make a reported figure mean something other than
what it appears to mean:

  * `train_test_split: 0.8` was declared in all three YAML configs and read by
    nothing. The environment loaded the whole 2010-2023 series and evaluate()
    built the same environment, so the committed Sharpe ratios are in-sample.

  * results/latest-real.json asserted that both agents "underperform a
    buy-and-hold baseline". No buy-and-hold figure existed anywhere in the
    repository, so nothing had been compared.

These run on the project's own cached real prices and need neither a network
nor a deep-learning framework.
"""
import json
import pathlib
import sys

import numpy as np
import pytest
import yaml

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "src"))

CACHE = ROOT / "data" / "market_data.pkl"
CONFIGS = sorted((ROOT / "src" / "config").glob("*.yaml"))

needs_cache = pytest.mark.skipif(
    not CACHE.exists(), reason="the cached real download is not present")


# --- the config key that was declared and never read -------------------------

def test_every_config_declaring_a_split_is_read_by_the_code():
    """A declared knob that nothing reads is worse than no knob: it reads as a
    guarantee the code does not give."""
    declaring = [c for c in CONFIGS
                 if "train_test_split" in yaml.safe_load(c.read_text())["data"]]
    assert declaring, "no config declares train_test_split"

    env_src = (ROOT / "src" / "environments" / "portfolio_env.py").read_text()
    assert "train_test_split" in env_src, (
        "train_test_split is declared in "
        f"{[c.name for c in declaring]} but the environment never reads it")


@needs_cache
def test_the_environment_actually_narrows_to_the_requested_split():
    from src.baselines import load_close
    from environments.portfolio_env import PortfolioEnv

    cfg = yaml.safe_load((ROOT / "src" / "config" / "default.yaml").read_text())
    cfg["data"]["use_cache"] = True
    cfg["data"]["cache_path"] = str(CACHE)

    full = PortfolioEnv(cfg, split="all")
    train = PortfolioEnv(cfg, split="train")
    test = PortfolioEnv(cfg, split="test")

    assert len(train.returns) + len(test.returns) == len(full.returns)
    assert train.returns.index.max() < test.returns.index.min(), (
        "the training window must end before the test window begins")
    assert len(test.returns) < len(full.returns)
    assert test.split_window["first_date"] > train.split_window["first_date"]


def test_an_unknown_split_is_refused_rather_than_silently_ignored():
    from environments.portfolio_env import PortfolioEnv

    with pytest.raises(ValueError):
        PortfolioEnv({"data": {}}, split="validation")


# --- the baseline the result claimed to beat ---------------------------------

@needs_cache
def test_the_passive_baselines_are_computed_not_asserted():
    from src.baselines import run

    r = run()

    for window in ("train", "test", "full"):
        assert window in r["windows"]
        for label in ("buy-and-hold SPY", "equal-weight, rebalanced daily"):
            m = r["windows"][window]["baselines"][label]
            assert set(m) == {"sharpe_ratio", "sortino_ratio", "calmar_ratio",
                              "max_drawdown", "total_return"}
            assert np.isfinite(list(m.values())).all()
            assert m["max_drawdown"] <= 0


@needs_cache
def test_the_baselines_are_scored_by_the_same_functions_as_the_agents():
    """A baseline scored with a different Sharpe formula is not a comparison."""
    import inspect

    from src import baselines
    from src import metrics

    assert inspect.getmodule(baselines.calculate_sharpe_ratio) is metrics
    main_src = (ROOT / "src" / "main.py").read_text()
    assert "from .metrics import" in main_src or "from metrics import" in main_src


@needs_cache
def test_the_agents_are_compared_against_a_baseline_in_the_committed_result():
    """The claim 'both underperform buy-and-hold' must point at a number."""
    result = json.loads((ROOT / "results" / "latest-real.json").read_text())

    assert "baselines" in result, "no baseline in the result the roll-up reads"
    spy = result["baselines"]["full"]["buy-and-hold SPY"]["sharpe_ratio"]
    for name, m in result["agents"].items():
        assert m["sharpe_ratio"] < spy, f"{name} no longer underperforms SPY"
