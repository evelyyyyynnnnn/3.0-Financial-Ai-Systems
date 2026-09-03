import sys
from pathlib import Path

import numpy as np
import pytest
import yaml

ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "src"))

from environments.portfolio_env import PortfolioEnv  # noqa: E402
from environments.wrappers import DiscreteActionWrapper, generate_weight_grid  # noqa: E402


@pytest.fixture(scope="session")
def config():
    config_path = ROOT / "src" / "config" / "default.yaml"
    with open(config_path, "r") as f:
        cfg = yaml.safe_load(f)
    cfg["training"]["total_timesteps"] = 10
    cfg["data"]["start_date"] = "2020-01-01"
    cfg["data"]["end_date"] = "2020-03-01"
    cfg["data"]["use_cache"] = True
    cfg["data"]["cache_path"] = str(ROOT / "data" / "market_data.pkl")
    return cfg


def test_environment_shapes(config):
    env = PortfolioEnv(config)
    obs, info = env.reset()
    assert obs.shape == env.observation_space.shape
    assert "date" in info

    action = env.action_space.sample()
    next_obs, reward, terminated, truncated, info = env.step(action)

    assert next_obs.shape == env.observation_space.shape
    assert isinstance(reward, (float, int, np.floating))
    assert isinstance(terminated, bool)
    assert isinstance(truncated, bool)
    assert "portfolio_value" in info
    assert "date" in info


def test_discrete_wrapper(config):
    env = PortfolioEnv(config)
    wrapped = DiscreteActionWrapper.from_config(env, config["agent"])
    assert wrapped.action_space.n > 0
    obs, info = wrapped.reset()
    assert "date" in info
    action = wrapped.action_space.sample()
    next_obs, reward, terminated, truncated, info = wrapped.step(action)
    assert next_obs.shape == wrapped.observation_space.shape
    assert isinstance(reward, (float, int, np.floating))
    assert isinstance(terminated, bool)
    assert isinstance(truncated, bool)
    assert "weights" in info


def test_generate_weight_grid_sum_to_one():
    grid = generate_weight_grid(3, [0.0, 0.5, 1.0])
    assert len(grid) > 0
    for weights in grid:
        np.testing.assert_allclose(weights.sum(), 1.0, atol=1e-6)

