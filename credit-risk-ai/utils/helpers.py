import torch
import numpy as np
from typing import Dict, List, Tuple, Union
from pathlib import Path
import json
import yaml
import logging
from datetime import datetime, timedelta
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import optuna

def setup_logging(log_dir: str = "logs") -> None:
    """Setup logging configuration"""
    log_dir = Path(log_dir)
    log_dir.mkdir(exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = log_dir / f"training_{timestamp}.log"
    
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )

def save_metrics(metrics: Dict[str, float], save_path: str) -> None:
    """Save evaluation metrics to a JSON file"""
    save_path = Path(save_path)
    save_path.parent.mkdir(exist_ok=True)
    
    with open(save_path, 'w') as f:
        json.dump(metrics, f, indent=4)

def calculate_metrics(y_true: np.ndarray, y_pred: np.ndarray, y_prob: np.ndarray) -> Dict[str, float]:
    """Calculate various evaluation metrics"""
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred),
        'recall': recall_score(y_true, y_pred),
        'f1': f1_score(y_true, y_pred),
        'auc_roc': roc_auc_score(y_true, y_prob)
    }
    return metrics

def optimize_hyperparameters(config: Dict, 
                           train_fn: callable,
                           n_trials: int = None,
                           timeout: int = None) -> Dict:
    """Optimize hyperparameters using Optuna"""
    def objective(trial: optuna.Trial) -> float:
        # Define hyperparameter search space
        param_config = {
            "model": {
                "architecture": {
                    "text_encoder": {
                        "hidden_size": trial.suggest_int("text_hidden_size", 128, 1024, step=128),
                        "num_layers": trial.suggest_int("text_num_layers", 2, 12),
                        "dropout": trial.suggest_float("text_dropout", 0.1, 0.5)
                    },
                    "market_encoder": {
                        "hidden_size": trial.suggest_int("market_hidden_size", 64, 512, step=64),
                        "num_layers": trial.suggest_int("market_num_layers", 1, 4),
                        "dropout": trial.suggest_float("market_dropout", 0.1, 0.5)
                    },
                    "fusion": {
                        "hidden_size": trial.suggest_int("fusion_hidden_size", 128, 768, step=128),
                        "num_heads": trial.suggest_int("fusion_num_heads", 4, 12),
                        "dropout": trial.suggest_float("fusion_dropout", 0.1, 0.5)
                    }
                }
            },
            "training": {
                "learning_rate": trial.suggest_float("learning_rate", 1e-5, 1e-3, log=True),
                "batch_size": trial.suggest_int("batch_size", 16, 128, step=16)
            }
        }
        
        # Update config with trial parameters
        trial_config = config.copy()
        trial_config.update(param_config)
        
        # Train model with trial parameters
        val_metrics = train_fn(trial_config)
        
        return val_metrics[config["optimization"]["hyperparameter_search"]["metric"]]
    
    # Create study
    study = optuna.create_study(
        direction=config["optimization"]["hyperparameter_search"]["direction"]
    )
    
    # Optimize
    study.optimize(
        objective,
        n_trials=n_trials or config["optimization"]["hyperparameter_search"]["n_trials"],
        timeout=timeout or config["optimization"]["hyperparameter_search"]["timeout"]
    )
    
    return study.best_params

def load_market_data(symbol: str,
                    start_date: str,
                    end_date: str,
                    cache_dir: str = "data/market_cache") -> pd.DataFrame:
    """Load and cache market data"""
    cache_dir = Path(cache_dir)
    cache_dir.mkdir(exist_ok=True)
    
    cache_file = cache_dir / f"{symbol}_{start_date}_{end_date}.parquet"
    
    if cache_file.exists():
        return pd.read_parquet(cache_file)
    
    # Download data using yfinance
    import yfinance as yf
    data = yf.download(symbol, start=start_date, end=end_date)
    
    # Cache the data
    data.to_parquet(cache_file)
    
    return data

def preprocess_text(text: str) -> str:
    """Preprocess text data"""
    import re
    from nltk.tokenize import word_tokenize
    from nltk.corpus import stopwords
    from nltk.stem import WordNetLemmatizer
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    # Lemmatize
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    
    return ' '.join(tokens)

def calculate_technical_indicators(data: pd.DataFrame) -> pd.DataFrame:
    """Calculate technical indicators for market data"""
    df = data.copy()
    
    # RSI
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))
    
    # MACD
    exp1 = df['Close'].ewm(span=12, adjust=False).mean()
    exp2 = df['Close'].ewm(span=26, adjust=False).mean()
    df['MACD'] = exp1 - exp2
    df['Signal_Line'] = df['MACD'].ewm(span=9, adjust=False).mean()
    
    # Bollinger Bands
    df['MA20'] = df['Close'].rolling(window=20).mean()
    df['BB_upper'] = df['MA20'] + 2 * df['Close'].rolling(window=20).std()
    df['BB_lower'] = df['MA20'] - 2 * df['Close'].rolling(window=20).std()
    
    # Moving Averages
    df['MA50'] = df['Close'].rolling(window=50).mean()
    df['MA200'] = df['Close'].rolling(window=200).mean()
    
    return df

def save_model_artifacts(model: torch.nn.Module,
                        config: Dict,
                        metrics: Dict,
                        save_dir: str) -> None:
    """Save model artifacts"""
    save_dir = Path(save_dir)
    save_dir.mkdir(exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Save model
    torch.save(model.state_dict(), save_dir / f"model_{timestamp}.pt")
    
    # Save config
    with open(save_dir / f"config_{timestamp}.yaml", 'w') as f:
        yaml.dump(config, f)
    
    # Save metrics
    with open(save_dir / f"metrics_{timestamp}.json", 'w') as f:
        json.dump(metrics, f, indent=4)

def load_model_artifacts(artifact_dir: str,
                        timestamp: str) -> Tuple[Dict, torch.nn.Module, Dict]:
    """Load model artifacts"""
    artifact_dir = Path(artifact_dir)
    
    # Load config
    with open(artifact_dir / f"config_{timestamp}.yaml", 'r') as f:
        config = yaml.safe_load(f)
    
    # Load model
    model = torch.load(artifact_dir / f"model_{timestamp}.pt")
    
    # Load metrics
    with open(artifact_dir / f"metrics_{timestamp}.json", 'r') as f:
        metrics = json.load(f)
    
    return config, model, metrics 