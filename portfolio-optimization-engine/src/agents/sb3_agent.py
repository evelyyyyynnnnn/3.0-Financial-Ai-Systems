from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Optional

from stable_baselines3 import DQN, SAC, PPO
from stable_baselines3.common.base_class import BaseAlgorithm
from stable_baselines3.common.callbacks import BaseCallback


ALGORITHM_REGISTRY = {
    "dqn": DQN,
    "sac": SAC,
    "ppo": PPO,
}


@dataclass
class SB3AgentConfig:
    algorithm: str
    policy: str
    params: Dict


class SB3Agent:
    """Wrapper around Stable Baselines3 algorithms to provide a unified interface."""

    def __init__(self, env, eval_env, config: SB3AgentConfig):
        algorithm = config.algorithm.lower()
        if algorithm not in ALGORITHM_REGISTRY:
            raise ValueError(f"Unsupported algorithm '{config.algorithm}' for SB3Agent.")

        self.algorithm_name = algorithm
        self.policy = config.policy
        self.params = config.params or {}
        self.env = env
        self.eval_env = eval_env
        algo_cls = ALGORITHM_REGISTRY[algorithm]

        self.model: BaseAlgorithm = algo_cls(
            self.policy,
            self.env,
            **self.params,
        )

    def train(self, total_timesteps: int, callback: Optional[BaseCallback] = None):
        self.model.learn(total_timesteps=total_timesteps, callback=callback)

    def save(self, path: str):
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        self.model.save(path)

    def load(self, path: str):
        algo_cls = ALGORITHM_REGISTRY[self.algorithm_name]
        self.model = algo_cls.load(path, env=self.env)

    def predict(self, observation, deterministic: bool = True):
        return self.model.predict(observation, deterministic=deterministic)

    def set_env(self, env, eval_env=None):
        self.env = env
        self.eval_env = eval_env or self.eval_env
        self.model.set_env(env)

