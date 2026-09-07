import itertools
from typing import Iterable, List, Sequence

import numpy as np
import gymnasium as gym
from gymnasium import spaces


def generate_weight_grid(n_assets: int,
                         granularity: Sequence[float],
                         include_equal_weight: bool = True) -> List[np.ndarray]:
    """
    Generate a discrete set of portfolio weight vectors.

    Args:
        n_assets: Number of assets in the environment.
        granularity: Sequence of allowable weight values per asset.
        include_equal_weight: Whether to include equal weight portfolio.

    Returns:
        List of weight vectors (np.ndarray) that sum to 1.
    """
    candidates = []
    granularity = list(granularity)
    for combo in itertools.product(granularity, repeat=n_assets):
        weights = np.array(combo, dtype=np.float32)
        if np.allclose(weights.sum(), 1.0, atol=1e-6):
            candidates.append(weights)

    if include_equal_weight:
        weights = np.ones(n_assets, dtype=np.float32) / n_assets
        if not any(np.allclose(weights, c) for c in candidates):
            candidates.append(weights)

    return candidates


class DiscreteActionWrapper(gym.ActionWrapper):
    """
    Wrap a continuous-action environment with a discrete action space comprised of
    pre-defined portfolio weight vectors.
    """

    def __init__(self, env: gym.Env, action_grid: Iterable[Iterable[float]]):
        super().__init__(env)
        self.action_grid = [
            np.array(action, dtype=np.float32) for action in action_grid
        ]
        if len(self.action_grid) == 0:
            raise ValueError("Action grid must contain at least one action vector.")

        self.action_space = spaces.Discrete(len(self.action_grid))

    def action(self, action: int) -> np.ndarray:
        return self.action_grid[action]

    @classmethod
    def from_config(cls, env: gym.Env, config: dict) -> 'DiscreteActionWrapper':
        discrete_cfg = config.get('discrete_actions', {})
        granularity = discrete_cfg.get('granularity', [0.0, 0.5, 1.0])
        include_equal = discrete_cfg.get('include_equal_weight', True)
        custom_actions = discrete_cfg.get('custom', None)

        if custom_actions:
            action_grid = [np.array(a, dtype=np.float32) for a in custom_actions]
        else:
            action_grid = generate_weight_grid(
                env.action_space.shape[0], granularity, include_equal_weight=include_equal
            )

        return cls(env, action_grid)

