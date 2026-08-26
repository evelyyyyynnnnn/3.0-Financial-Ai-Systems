import argparse
import json
import yaml
import os
import numpy as np
from datetime import datetime, timezone
from typing import Dict, Optional

from environments.portfolio_env import PortfolioEnv
from environments.wrappers import DiscreteActionWrapper
from agents.ppo_agent import PPOAgent
from agents.sb3_agent import SB3Agent, SB3AgentConfig
from visualization.visualizer import PortfolioVisualizer

def load_config(config_path: str) -> Dict:
    """Load configuration from YAML file."""
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config

def create_directories(config: Dict):
    """Create necessary directories for saving results."""
    os.makedirs('models', exist_ok=True)
    os.makedirs('results', exist_ok=True)
    os.makedirs('results/tensorboard', exist_ok=True)
    os.makedirs('visualizations', exist_ok=True)

def log_training_snapshot(algorithm: str, timestep: int, metrics: Dict):
    record = {
        'algorithm': algorithm,
        'timestep': timestep,
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'portfolio_value': float(metrics.get('portfolio_value', 0.0)),
        'sharpe_ratio': float(metrics.get('sharpe_ratio', 0.0)),
        'sortino_ratio': float(metrics.get('sortino_ratio', 0.0)),
        'calmar_ratio': float(metrics.get('calmar_ratio', 0.0)),
        'var': float(metrics.get('var', 0.0))
    }
    log_path = 'results/training_log.jsonl'
    with open(log_path, 'a') as f:
        f.write(json.dumps(record) + '\n')

def make_env(config: Dict, algorithm: str):
    """Instantiate the portfolio environment with optional wrappers."""
    env = PortfolioEnv(config)
    if algorithm.lower() == 'dqn':
        env = DiscreteActionWrapper.from_config(env, config['agent'])
    return env

def train(config: Dict):
    """Train the portfolio optimization agent."""
    algorithm = config['agent']['algorithm']
    library = config['agent'].get('library', 'custom').lower()
    total_timesteps = config['training']['total_timesteps']
    model_prefix = f"models/{algorithm.lower()}"
    
    if library == 'custom' and algorithm.upper() == 'PPO':
        env = make_env(config, algorithm)
        state_dim = env.observation_space.shape
        action_dim = env.action_space.shape[0]
        agent = PPOAgent(state_dim, action_dim, config)
        visualizer = PortfolioVisualizer(config)
        metrics = {
            'actor_loss': [],
            'critic_loss': [],
            'portfolio_value': [],
            'sharpe_ratio': [],
            'sortino_ratio': [],
            'calmar_ratio': [],
            'var': [],
            'weights': [],
            'returns': []
        }
        eval_interval = config['training']['validation_interval']
        save_interval = config['training']['save_interval']
        state, _ = env.reset()
        for timestep in range(1, total_timesteps + 1):
            action, log_prob, value = agent.get_action(state)
            next_state, reward, terminated, truncated, info = env.step(action)
            done = terminated or truncated
            agent.store_transition(state, action, reward, value, log_prob)
            state = next_state
            metrics['portfolio_value'].append(info['portfolio_value'])
            metrics['weights'].append(info['weights'])
            metrics['returns'].append(info['portfolio_return'])

            if done:
                next_value = agent.get_action(next_state, training=False)[2]
                agent.compute_advantages(next_value, done)
                train_metrics = agent.train()
                metrics['actor_loss'].append(train_metrics['actor_loss'])
                metrics['critic_loss'].append(train_metrics['critic_loss'])
                state, _ = env.reset()

                returns = np.array(metrics['returns'])
                metrics['sharpe_ratio'].append(calculate_sharpe_ratio(returns))
                metrics['sortino_ratio'].append(calculate_sortino_ratio(returns))
                metrics['calmar_ratio'].append(calculate_calmar_ratio(returns))
                metrics['var'].append(calculate_var(returns))

                if timestep % eval_interval == 0:
                    print(f"Timestep {timestep}/{total_timesteps}")
                    print(f"Portfolio Value: {metrics['portfolio_value'][-1]:.2f}")
                    print(f"Sharpe Ratio: {metrics['sharpe_ratio'][-1]:.2f}")
                    snapshot = {
                        'portfolio_value': metrics['portfolio_value'][-1],
                        'sharpe_ratio': metrics['sharpe_ratio'][-1],
                        'sortino_ratio': metrics['sortino_ratio'][-1],
                        'calmar_ratio': metrics['calmar_ratio'][-1],
                        'var': metrics['var'][-1]
                    }
                    log_training_snapshot(algorithm, timestep, snapshot)
                    visualizer.plot_training_progress(
                        metrics,
                        save_path=f'visualizations/training_progress_{timestep}.html'
                    )

                    dashboard_metrics = metrics.copy()
                    dashboard_metrics['weights'] = np.array(metrics['weights'])
                    dashboard_metrics['returns'] = np.array(metrics['returns'])
                    dashboard_metrics['var'] = np.array(metrics['var'])

                    visualizer.create_dashboard(
                        dashboard_metrics,
                        save_path=f'visualizations/dashboard_{timestep}.html'
                    )

                if timestep % save_interval == 0:
                    agent.save_weights(f'{model_prefix}_{timestep}')

        if metrics['portfolio_value']:
            snapshot = {
                'portfolio_value': metrics['portfolio_value'][-1],
                'sharpe_ratio': metrics['sharpe_ratio'][-1] if metrics['sharpe_ratio'] else 0.0,
                'sortino_ratio': metrics['sortino_ratio'][-1] if metrics['sortino_ratio'] else 0.0,
                'calmar_ratio': metrics['calmar_ratio'][-1] if metrics['calmar_ratio'] else 0.0,
                'var': metrics['var'][-1] if metrics['var'] else 0.0
            }
            log_training_snapshot(algorithm, total_timesteps, snapshot)
        agent.save_weights(f'{model_prefix}_final')
    else:
        env = make_env(config, algorithm)
        eval_env = make_env(config, algorithm)
        sb3_config = SB3AgentConfig(
            algorithm=algorithm,
            policy=config['agent'].get('policy', 'MlpPolicy'),
            params=config['agent'].get('sb3_params', {})
        )
        agent = SB3Agent(env, eval_env, sb3_config)
        agent.train(total_timesteps=total_timesteps)
        eval_rollout_env = make_env(config, algorithm)
        observation, _ = eval_rollout_env.reset()
        done = False
        portfolio_values = []
        returns = []
        while not done:
            action, _ = agent.predict(observation, deterministic=True)
            observation, _, terminated, truncated, info = eval_rollout_env.step(action)
            portfolio_values.append(info['portfolio_value'])
            returns.append(info['portfolio_return'])
            done = terminated or truncated

        if portfolio_values:
            returns_array = np.array(returns)
            snapshot = {
                'portfolio_value': portfolio_values[-1],
                'sharpe_ratio': calculate_sharpe_ratio(returns_array),
                'sortino_ratio': calculate_sortino_ratio(returns_array),
                'calmar_ratio': calculate_calmar_ratio(returns_array),
                'var': calculate_var(returns_array)
            }
            log_training_snapshot(algorithm, total_timesteps, snapshot)
        agent.save(f'{model_prefix}_sb3')

def evaluate(config: Dict, model_path: str):
    """Evaluate a trained agent."""
    algorithm = config['agent']['algorithm']
    library = config['agent'].get('library', 'custom').lower()
    visualizer = PortfolioVisualizer(config)

    env = make_env(config, algorithm)

    if library == 'custom' and algorithm.upper() == 'PPO':
        state_dim = env.observation_space.shape
        action_dim = env.action_space.shape[0]
        agent = PPOAgent(state_dim, action_dim, config)
        agent.load_weights(model_path)

        state, _ = env.reset()
        done = False
        portfolio_values = []
        weights = []
        returns = []
        dates = []

        while not done:
            action, _, _ = agent.get_action(state, training=False)
            next_state, _, terminated, truncated, info = env.step(action)
            done = terminated or truncated
            portfolio_values.append(info['portfolio_value'])
            weights.append(info['weights'])
            returns.append(info['portfolio_return'])
            dates.append(info.get('date', datetime.now()))
            state = next_state
    else:
        eval_env = make_env(config, algorithm)
        sb3_config = SB3AgentConfig(
            algorithm=algorithm,
            policy=config['agent'].get('policy', 'MlpPolicy'),
            params=config['agent'].get('sb3_params', {})
        )
        agent = SB3Agent(eval_env, eval_env, sb3_config)
        agent.load(model_path)

        observation, _ = eval_env.reset()
        done = False
        portfolio_values = []
        weights = []
        returns = []
        dates = []

        while not done:
            action, _ = agent.predict(observation, deterministic=True)
            observation, _, terminated, truncated, info = eval_env.step(action)
            done = terminated or truncated
            portfolio_values.append(info['portfolio_value'])
            weights.append(info['weights'])
            returns.append(info['portfolio_return'])
            dates.append(info.get('date', datetime.now()))

    portfolio_values = np.array(portfolio_values)
    weights = np.array(weights)
    returns = np.array(returns)

    metrics = {
        'sharpe_ratio': calculate_sharpe_ratio(returns),
        'sortino_ratio': calculate_sortino_ratio(returns),
        'calmar_ratio': calculate_calmar_ratio(returns),
        'max_drawdown': calculate_max_drawdown(portfolio_values),
        'total_return': (portfolio_values[-1] / portfolio_values[0]) - 1
    }

    visualizer.plot_portfolio_weights(
        weights,
        dates,
        config['market_environment']['assets'],
        save_path='visualizations/portfolio_weights_eval.html'
    )

    visualizer.plot_drawdown(
        portfolio_values,
        dates,
        save_path='visualizations/drawdown_eval.html'
    )

    visualizer.plot_risk_metrics(
        returns,
        calculate_rolling_var(returns),
        dates,
        save_path='visualizations/risk_metrics_eval.html'
    )

    print("\nEvaluation Results:")
    for metric, value in metrics.items():
        print(f"{metric}: {value:.4f}")

    results_path = f"results/{algorithm.lower()}_evaluation.json"
    with open(results_path, 'w') as f:
        json.dump(
            {
                'metrics': {k: float(v) for k, v in metrics.items()},
                'timestamp': datetime.now(timezone.utc).isoformat()
            },
            f,
            indent=2
        )
    print(f"Saved evaluation metrics to {results_path}")

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

def calculate_max_drawdown(values: np.ndarray) -> float:
    """Calculate the maximum drawdown."""
    if values.size == 0:
        return 0.0
    peak = np.maximum.accumulate(values)
    drawdown = (values - peak) / peak
    return np.min(drawdown)

def calculate_var(returns: np.ndarray, confidence: float = 0.95) -> float:
    """Calculate Value at Risk."""
    if returns.size == 0:
        return 0.0
    return np.percentile(returns, (1 - confidence) * 100)

def calculate_rolling_var(returns: np.ndarray, window: int = 63,
                         confidence: float = 0.95) -> np.ndarray:
    """Calculate rolling Value at Risk."""
    var = np.zeros(len(returns))
    for i in range(window, len(returns)):
        var[i] = calculate_var(returns[i-window:i], confidence)
    return var

def main():
    """Main function."""
    parser = argparse.ArgumentParser(description='Portfolio Optimization with RL')
    parser.add_argument('--mode', type=str, choices=['train', 'eval'],
                       required=True, help='Mode: train or eval')
    parser.add_argument('--config', type=str, default='src/config/default.yaml',
                       help='Path to config file')
    parser.add_argument('--model_path', type=str,
                       help='Path to model weights (required for eval mode)')
    
    args = parser.parse_args()
    
    # Load configuration
    config = load_config(args.config)
    
    # Create directories
    create_directories(config)
    
    # Run selected mode
    if args.mode == 'train':
        train(config)
    else:
        if args.model_path is None:
            raise ValueError("Model path must be provided for eval mode")
        evaluate(config, args.model_path)

if __name__ == '__main__':
    main() 