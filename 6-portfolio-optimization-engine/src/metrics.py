"""Performance metrics, kept apart from the training stack.

These were defined inside main.py, which imports the environment, the agents and
stable-baselines3. Anything wanting to score a series -- a passive baseline, a
test -- had to import the whole RL stack to do it, so in practice nothing did,
and the claim that the agents "underperform a buy-and-hold baseline" was never
computed against one. Here they need only numpy.

Definitions are unchanged, so an agent and a baseline are comparable.
"""
from __future__ import annotations

import numpy as np


def calculate_max_drawdown(values: np.ndarray) -> float:
    """Calculate the maximum drawdown."""
    if values.size == 0:
        return 0.0
    peak = np.maximum.accumulate(values)
    drawdown = (values - peak) / peak
    return np.min(drawdown)


def calculate_sharpe_ratio(returns: np.ndarray, risk_free_rate: float = 0.02) -> float:
    """Calculate the Sharpe ratio."""
    if returns.size == 0:
        return 0.0
    excess_returns = returns - risk_free_rate / 252
    std = np.std(excess_returns)
    if std < 1e-8:
        return 0.0
    return np.sqrt(252) * np.mean(excess_returns) / std


def calculate_sortino_ratio(returns: np.ndarray, risk_free_rate: float = 0.02) -> float:
    """Calculate the Sortino ratio."""
    if returns.size == 0:
        return 0.0
    excess_returns = returns - risk_free_rate / 252
    downside_returns = excess_returns[excess_returns < 0]
    if downside_returns.size == 0:
        return 0.0
    std = np.std(downside_returns)
    if std < 1e-8:
        return 0.0
    return np.sqrt(252) * np.mean(excess_returns) / std


def calculate_calmar_ratio(returns: np.ndarray) -> float:
    """Calculate the Calmar ratio."""
    if returns.size == 0:
        return 0.0
    cumulative_returns = np.cumprod(1 + returns)
    max_drawdown = calculate_max_drawdown(cumulative_returns)
    if len(cumulative_returns) < 2:
        return 0.0
    annual_return = (cumulative_returns[-1] / cumulative_returns[0]) ** (252 / len(returns)) - 1
    if np.isclose(max_drawdown, 0.0):
        return 0.0
    return annual_return / abs(max_drawdown)
