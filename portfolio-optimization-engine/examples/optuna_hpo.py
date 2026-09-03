import argparse
from copy import deepcopy
from pathlib import Path

import numpy as np
import optuna
import yaml

import sys
ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "src"))

from agents.sb3_agent import SB3Agent, SB3AgentConfig  # noqa: E402
from environments.portfolio_env import PortfolioEnv  # noqa: E402
from environments.wrappers import DiscreteActionWrapper  # noqa: E402


def load_config(config_path: Path) -> dict:
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


def make_env(config: dict, algorithm: str):
    env = PortfolioEnv(config)
    if algorithm.lower() == "dqn":
        env = DiscreteActionWrapper.from_config(env, config["agent"])
    return env


def calculate_sharpe_ratio(returns: np.ndarray, risk_free_rate: float = 0.02) -> float:
    if returns.size == 0:
        return 0.0
    excess_returns = returns - risk_free_rate / 252
    std = np.std(excess_returns)
    if std < 1e-8:
        return 0.0
    return np.sqrt(252) * np.mean(excess_returns) / std


def objective(trial: optuna.Trial, base_config: dict) -> float:
    cfg = deepcopy(base_config)
    agent_cfg = cfg["agent"]
    sb3_params = agent_cfg.setdefault("sb3_params", {})

    agent_cfg["algorithm"] = trial.suggest_categorical("algorithm", ["SAC", "DQN"])
    cfg["training"]["total_timesteps"] = trial.suggest_int("total_timesteps", 1500, 4000)

    if agent_cfg["algorithm"] == "SAC":
        sb3_params["learning_rate"] = trial.suggest_float(
            "learning_rate", 1e-5, 5e-4, log=True
        )
        sb3_params["batch_size"] = trial.suggest_categorical(
            "batch_size", [64, 128, 256]
        )
    else:
        sb3_params["learning_rate"] = trial.suggest_float(
            "learning_rate", 1e-5, 1e-3, log=True
        )
        sb3_params["exploration_fraction"] = trial.suggest_float(
            "exploration_fraction", 0.05, 0.3
        )

    env = make_env(cfg, agent_cfg["algorithm"])
    eval_env = make_env(cfg, agent_cfg["algorithm"])
    agent = SB3Agent(
        env,
        eval_env,
        SB3AgentConfig(
            algorithm=agent_cfg["algorithm"],
            policy=agent_cfg.get("policy", "MlpPolicy"),
            params=sb3_params,
        ),
    )

    agent.train(total_timesteps=cfg["training"]["total_timesteps"])

    observation, _ = eval_env.reset()
    done = False
    returns = []
    while not done:
        action, _ = agent.predict(observation, deterministic=True)
        observation, _, terminated, truncated, info = eval_env.step(action)
        returns.append(info["portfolio_return"])
        done = terminated or truncated

    return calculate_sharpe_ratio(np.array(returns))


def main():
    parser = argparse.ArgumentParser(description="Optuna HPO example for SB3 agents.")
    parser.add_argument(
        "--config",
        type=Path,
        default=ROOT / "src" / "config" / "sb3_sac.yaml",
        help="Base configuration file.",
    )
    parser.add_argument(
        "--trials",
        type=int,
        default=5,
        help="Number of Optuna trials to run.",
    )
    args = parser.parse_args()

    base_config = load_config(args.config)
    study = optuna.create_study(direction="maximize")
    study.optimize(lambda trial: objective(trial, base_config), n_trials=args.trials)

    print("Best trial:")
    best = study.best_trial
    print(f"  Sharpe Ratio: {best.value:.4f}")
    print("  Params:")
    for key, value in best.params.items():
        print(f"    {key}: {value}")


if __name__ == "__main__":
    main()

