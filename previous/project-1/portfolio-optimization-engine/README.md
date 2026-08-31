# Reinforcement Learning for Portfolio Optimization and Dynamic Hedging

This project implements a sophisticated reinforcement learning framework for portfolio optimization and dynamic hedging. It combines modern deep reinforcement learning techniques with traditional financial theories to create an adaptive investment strategy.

## Project Structure

```
├── data/                 # Cached market data
├── models/               # Saved checkpoints (PPO, SAC, DQN)
├── results/              # Evaluation summaries & tensorboard logs
├── src/
│   ├── agents/           # PPO (custom) & Stable-Baselines3 wrappers
│   ├── config/           # YAML configuration files
│   ├── environments/     # Portfolio environment + wrappers
│   ├── utils/            # Data utilities
│   └── visualization/    # Plotly-based reporting tools
├── tests/                # Pytest smoke tests
└── requirements.txt      # Project dependencies
```

## Features

- Multiple RL agents:
  - Custom TensorFlow PPO implementation
  - Stable-Baselines3 integrations for SAC (continuous) and DQN (discretised allocations)
- Custom portfolio management environment with technical indicators
- Risk-adjusted reward shaping (Sharpe, drawdown penalties)
- Evaluation workflow that exports HTML dashboards and JSON metrics
- Training snapshots logged to `results/training_log.jsonl`
- TensorBoard logging for SB3 runs
- Configurable discrete action grids for value-based methods

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-optimization-dynamic-hedging
```

2. Create a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
.venv/bin/pip install -r requirements.txt
```

## Usage

Choose a configuration file under `src/config/` that matches the agent you want to train.

- **Custom PPO (TensorFlow)**
  ```bash
  .venv/bin/python src/main.py --mode train --config src/config/default.yaml
  .venv/bin/python src/main.py --mode eval --config src/config/default.yaml \
      --model_path models/ppo_final
  ```

- **SAC (Stable-Baselines3)**
  ```bash
  .venv/bin/python src/main.py --mode train --config src/config/sb3_sac.yaml
  .venv/bin/python src/main.py --mode eval --config src/config/sb3_sac.yaml \
      --model_path models/sac_sb3.zip
  ```

- **DQN with discretised weights**
  ```bash
  .venv/bin/python src/main.py --mode train --config src/config/sb3_dqn.yaml
  .venv/bin/python src/main.py --mode eval --config src/config/sb3_dqn.yaml \
      --model_path models/dqn_sb3.zip
  ```

Evaluation creates Plotly dashboards in `visualizations/` and dumps metrics to
`results/<algorithm>_evaluation.json`.

### Hyperparameter search

An Optuna example is provided in `examples/optuna_hpo.py`:

```bash
.venv/bin/python examples/optuna_hpo.py --trials 10
```

The script samples SAC/DQN hyperparameters and reports the Sharpe ratio from a validation rollout.

### Training logs and longer runs

- Training/evaluation snapshots (portfolio value, risk metrics) are appended to `results/training_log.jsonl`.
- For long runs, increase `training.total_timesteps` and adjust `save_interval` so checkpoints land at the desired cadence (e.g. every 50k or 100k steps).
- Monitor disk usage in `models/` and use the TensorBoard traces saved under `results/tensorboard/`.

## Configuration Parameters

The system supports extensive configuration through YAML files, including:

- Market Environment
  - Trading frequency
  - Transaction costs
  - Risk-free rate
  - Market impact model

- RL Agent
  - Learning rate
  - Discount factor
  - Network architecture
  - Exploration parameters
  - Batch size
  - Memory size

- Training
  - Episode length
  - Number of episodes
  - Validation frequency
  - Checkpoint frequency

- Risk Management
  - Value at Risk (VaR) limits
  - Position limits
  - Portfolio constraints
  - Stop-loss thresholds

## Testing

Run the lightweight smoke tests to verify the environment and wrappers:

```bash
.venv/bin/pytest
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 