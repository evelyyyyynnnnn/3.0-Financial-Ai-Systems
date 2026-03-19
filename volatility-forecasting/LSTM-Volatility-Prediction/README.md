# Market Volatility Prediction using LSTM and Transformer

This project implements deep learning models (LSTM and Transformer) for predicting market volatility. The framework is designed to be highly configurable and extensible.

## Project Structure

```
LSTM-Volatility-Prediction/
├── config/
│   ├── __init__.py
│   └── config.py                # Centralised configuration dataclasses
├── data/
│   ├── __init__.py
│   └── data_loader.py           # Data ingestion, indicators, splits
├── models/
│   ├── __init__.py
│   ├── lstm_model.py            # LSTM regression model
│   └── transformer_model.py     # Transformer-based regression model
├── training/
│   ├── __init__.py
│   ├── trainer.py               # Training loop, metrics, persistence
│   └── hyperparameter_tuning.py # Optuna-based hyperparameter search
├── utils/
│   ├── __init__.py
│   └── visualization.py         # Plotting utilities
├── main.py
├── requirements.txt
└── README.md
```

## Features

- Data ingestion from Yahoo Finance or local CSV files with validation
- Built-in technical indicator engineering and volatility targets
- Two forecasters: LSTM and Transformer architectures
- Training pipeline with early stopping, learning rate scheduling, and evaluation metrics
- Optional Optuna hyperparameter tuning with per-trial isolation
- Visualization helpers for predictions, losses, residuals, and more
- Optional Weights & Biases integration (CLI and env toggles)
- Automatic persistence of checkpoints, metrics, and training history

## Quickstart

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run a minimal experiment (LSTM, 1 epoch, W&B disabled)**
   ```bash
   python main.py --model_type lstm --num_epochs 1 --no-wandb --plot_results
   ```

3. **Use a local CSV instead of Yahoo Finance**
   ```bash
   python main.py \
       --model_type transformer \
       --data_source local \
       --local_data_path /path/to/data.csv \
       --num_epochs 5 \
       --no-wandb
   ```
   The CSV should contain `Open`, `High`, `Low`, `Close`, `Volume` columns with a datetime index.

4. **Enable hyperparameter tuning**
   ```bash
   python main.py --tune_hyperparameters --n_trials 20 --no-wandb
   ```

Key outputs such as `checkpoints/best_model.pth`, `checkpoints/metrics.json`, `checkpoints/loss_history.csv`, and optional plots are created automatically.

### Reproducible Environments

- **Pinned requirements**: `pip install -r requirements-lock.txt`
- **Conda**: `conda env create -f environment.yml` then `conda activate lstm-volatility`
- **Docker**:
  ```bash
  docker build -t lstm-volatility .
  docker run --rm lstm-volatility
  ```
  Override the default command as needed (e.g., add plotting flags or tuning options).

## Usage

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure default parameters in `config/config.py` or override them using CLI flags (see `python main.py --help`).

3. Control Weights & Biases logging via CLI (`--wandb/--no-wandb`) or environment variable (`WANDB_ENABLED=0/1`).

4. Detailed logs are written to `training.log` (path configurable via `Config.log_file`).

## Configuration Options

The framework supports extensive configuration through the config files:

- Data parameters (window size, train/test split, etc.)
- Model architecture parameters
- Training parameters (learning rate, batch size, etc.)
- Hyperparameter tuning settings
- Weights & Biases toggles and credentials
- Output directories for checkpoints and plots

## Model Architecture

### LSTM Model
- Multiple LSTM layers
- Dropout for regularization
- Dense layers for final prediction
- Customizable hidden dimensions

### Transformer Model
- Multi-head attention mechanism
- Positional encoding
- Feed-forward networks
- Layer normalization

## Data Processing

- Yahoo Finance download with error handling and empty-data safeguards
- Local CSV ingestion with column validation
- Rolling technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands, ATR, OBV, ADX, CCI, Stochastic)
- Volatility targets (close-to-close, Parkinson, Garman-Klass)
- Windowed sequence creation with configurable horizons
- Missing value diagnostics and forward/backward filling

## Evaluation & Artifacts

- Metrics: Mean Squared Error (MSE), Root MSE (RMSE), Mean Absolute Error (MAE), R² (per split)
- Metrics persisted to `checkpoints/metrics.json` for downstream analysis
- Loss history saved to CSV/PNG for reproducibility
- Optional plots: predictions vs. truth, error distribution, residuals, loss curves