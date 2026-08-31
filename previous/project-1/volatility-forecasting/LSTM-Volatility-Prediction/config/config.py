import logging
import os
from dataclasses import dataclass
from typing import List, Optional

from dotenv import load_dotenv
logger = logging.getLogger(__name__)


load_dotenv()

@dataclass
class DataConfig:
    # Data source configuration
    data_source: str = "yfinance"  # or "local"
    ticker: str = "^GSPC"  # S&P 500
    start_date: str = "2010-01-01"
    end_date: str = "2023-12-31"
    local_data_path: Optional[str] = None
    
    # Data preprocessing
    window_size: int = 20
    train_ratio: float = 0.7
    val_ratio: float = 0.15
    test_ratio: float = 0.15
    
    # Feature engineering
    use_technical_indicators: bool = True
    technical_indicators: List[str] = [
        "SMA", "EMA", "RSI", "MACD", "BBANDS",
        "ATR", "OBV", "ADX", "CCI", "STOCH"
    ]
    
    # Volatility calculation
    volatility_window: int = 20
    volatility_type: str = "close_to_close"  # or "parkinson", "garman_klass"
    
    # Data normalization
    normalization_method: str = "minmax"  # or "standard", "robust"
    scale_features: bool = True

@dataclass
class ModelConfig:
    # General model parameters
    model_type: str = "lstm"  # or "transformer"
    input_size: int = 10  # Number of features
    output_size: int = 1  # Volatility prediction
    device: str = "cuda" if os.getenv("CUDA_VISIBLE_DEVICES") else "cpu"
    
    # LSTM specific parameters
    lstm_hidden_size: int = 64
    lstm_num_layers: int = 2
    lstm_dropout: float = 0.2
    lstm_bidirectional: bool = True
    
    # Transformer specific parameters
    transformer_d_model: int = 64
    transformer_nhead: int = 4
    transformer_num_layers: int = 2
    transformer_dim_feedforward: int = 256
    transformer_dropout: float = 0.1
    
    # Common parameters
    activation: str = "relu"
    batch_first: bool = True

@dataclass
class TrainingConfig:
    # Training parameters
    batch_size: int = 32
    num_epochs: int = 100
    learning_rate: float = 0.001
    weight_decay: float = 0.0001
    
    # Optimization
    optimizer: str = "adam"  # or "adamw", "sgd"
    scheduler: str = "cosine"  # or "step", "plateau"
    warmup_epochs: int = 5
    
    # Loss function
    loss_function: str = "mse"  # or "huber", "mae"
    
    # Early stopping
    early_stopping_patience: int = 10
    early_stopping_min_delta: float = 0.0001
    
    # Checkpointing
    save_best_model: bool = True
    checkpoint_dir: str = "checkpoints"
    log_interval: int = 10

@dataclass
class HyperparameterTuningConfig:
    # Tuning parameters
    n_trials: int = 50
    study_name: str = "volatility_prediction"
    storage: str = "sqlite:///optuna.db"
    
    # Parameter ranges
    learning_rate_range: List[float] = [1e-4, 1e-2]
    hidden_size_range: List[int] = [32, 256]
    num_layers_range: List[int] = [1, 4]
    dropout_range: List[float] = [0.0, 0.5]
    batch_size_range: List[int] = [16, 128]

@dataclass
class VisualizationConfig:
    # Plotting parameters
    plot_predictions: bool = True
    plot_loss: bool = True
    plot_attention: bool = True
    save_plots: bool = True
    plot_dir: str = "plots"
    
    # Style parameters
    style: str = "seaborn"
    figsize: tuple = (12, 6)
    dpi: int = 300

@dataclass
class Config:
    data: DataConfig = DataConfig()
    model: ModelConfig = ModelConfig()
    training: TrainingConfig = TrainingConfig()
    hyperparameter_tuning: HyperparameterTuningConfig = HyperparameterTuningConfig()
    visualization: VisualizationConfig = VisualizationConfig()
    
    # Experiment tracking
    use_wandb: bool = True
    wandb_project: str = "market_volatility"
    wandb_entity: Optional[str] = None
    
    # Logging
    log_level: str = "INFO"
    log_file: str = "training.log"
    
    def __post_init__(self):
        # Create necessary directories
        os.makedirs(self.training.checkpoint_dir, exist_ok=True)
        os.makedirs(self.visualization.plot_dir, exist_ok=True)
        
        # Environment overrides
        env_use_wandb = os.getenv("WANDB_ENABLED")
        parsed_wandb_flag = self._parse_bool_env(env_use_wandb)
        if parsed_wandb_flag is not None:
            self.use_wandb = parsed_wandb_flag
            logger.info("WANDB_ENABLED override detected. use_wandb set to %s", self.use_wandb)

        # Set wandb entity from environment if not specified
        if self.use_wandb and not self.wandb_entity:
            self.wandb_entity = os.getenv("WANDB_ENTITY") 

    @staticmethod
    def _parse_bool_env(value: Optional[str]) -> Optional[bool]:
        """Parse boolean environment override values."""
        if value is None:
            return None
        
        normalized = value.strip().lower()
        if normalized in {"1", "true", "yes", "on"}:
            return True
        if normalized in {"0", "false", "no", "off"}:
            return False
        
        logger.warning(
            "Invalid boolean value '%s' provided for environment override; ignoring.",
            value
        )
        return None