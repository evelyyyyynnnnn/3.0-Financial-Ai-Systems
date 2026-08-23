import copy
import logging
from typing import Dict, Any

import numpy as np
import optuna

from config.config import Config
from training.trainer import VolatilityTrainer

logger = logging.getLogger(__name__)

class HyperparameterTuner:
    def __init__(self, config: Config):
        self.original_config = config
        self.template_config = copy.deepcopy(config)
        self.tuning_config = config.hyperparameter_tuning
        
        # Create study
        self.study = optuna.create_study(
            study_name=self.tuning_config.study_name,
            storage=self.tuning_config.storage,
            direction="minimize",
            load_if_exists=True
        )
    
    def objective(self, trial: optuna.Trial, X_train: np.ndarray, X_val: np.ndarray, X_test: np.ndarray,
                 y_train: np.ndarray, y_val: np.ndarray, y_test: np.ndarray) -> float:
        """Objective function for hyperparameter optimization"""
        # Suggest hyperparameters
        params = {
            "learning_rate": trial.suggest_float(
                "learning_rate",
                self.tuning_config.learning_rate_range[0],
                self.tuning_config.learning_rate_range[1],
                log=True
            ),
            "hidden_size": trial.suggest_int(
                "hidden_size",
                self.tuning_config.hidden_size_range[0],
                self.tuning_config.hidden_size_range[1]
            ),
            "num_layers": trial.suggest_int(
                "num_layers",
                self.tuning_config.num_layers_range[0],
                self.tuning_config.num_layers_range[1]
            ),
            "dropout": trial.suggest_float(
                "dropout",
                self.tuning_config.dropout_range[0],
                self.tuning_config.dropout_range[1]
            ),
            "batch_size": trial.suggest_int(
                "batch_size",
                self.tuning_config.batch_size_range[0],
                self.tuning_config.batch_size_range[1]
            )
        }
        
        # Create trial-specific configuration
        trial_config = self._create_trial_config(params)
        
        # Initialize trainer
        trainer = VolatilityTrainer(trial_config)
        
        # Train model
        results = trainer.train(X_train, X_val, X_test, y_train, y_val, y_test)
        
        return results["val_loss"]
    
    def _create_trial_config(self, params: Dict[str, Any], disable_wandb: bool = True) -> Config:
        """Create a deep-copied config with trial parameters applied."""
        trial_config: Config = copy.deepcopy(self.template_config)

        if disable_wandb:
            trial_config.use_wandb = False

        if trial_config.model.model_type == "lstm":
            trial_config.model.lstm_hidden_size = params["hidden_size"]
            trial_config.model.lstm_num_layers = params["num_layers"]
            trial_config.model.lstm_dropout = params["dropout"]
        else:
            trial_config.model.transformer_d_model = params["hidden_size"]
            trial_config.model.transformer_num_layers = params["num_layers"]
            trial_config.model.transformer_dropout = params["dropout"]

        trial_config.training.learning_rate = params["learning_rate"]
        trial_config.training.batch_size = params["batch_size"]

        return trial_config

    def _apply_best_params(self, params: Dict[str, Any]):
        """Persist best parameters back to the base configuration."""
        best_config = self._create_trial_config(params, disable_wandb=False)
        self._copy_config(best_config, self.original_config)
        self.template_config = copy.deepcopy(best_config)
        self.tuning_config = self.original_config.hyperparameter_tuning

    def _copy_config(self, source: Config, target: Config):
        """Copy relevant configuration sections from source to target."""
        target.data = copy.deepcopy(source.data)
        target.model = copy.deepcopy(source.model)
        target.training = copy.deepcopy(source.training)
        target.hyperparameter_tuning = copy.deepcopy(source.hyperparameter_tuning)
        target.visualization = copy.deepcopy(source.visualization)
        target.use_wandb = source.use_wandb
        target.wandb_project = source.wandb_project
        target.wandb_entity = source.wandb_entity
        target.log_level = source.log_level
        target.log_file = source.log_file
    
    def optimize(self, X_train: np.ndarray, X_val: np.ndarray, X_test: np.ndarray,
                y_train: np.ndarray, y_val: np.ndarray, y_test: np.ndarray) -> Dict[str, Any]:
        """Run hyperparameter optimization"""
        logger.info("Starting hyperparameter optimization...")
        
        # Run optimization
        self.study.optimize(
            lambda trial: self.objective(trial, X_train, X_val, X_test, y_train, y_val, y_test),
            n_trials=self.tuning_config.n_trials
        )
        
        # Get best parameters
        best_params = self.study.best_params
        best_value = self.study.best_value
        
        logger.info(f"Best parameters: {best_params}")
        logger.info(f"Best validation loss: {best_value}")
        
        # Update base config with best parameters
        self._apply_best_params(best_params)
        
        return {
            "best_params": best_params,
            "best_value": best_value,
            "study": self.study
        }
    
    def get_trial_summary(self) -> str:
        """Get summary of all trials"""
        trials_df = self.study.trials_dataframe()
        return trials_df.to_string()
    
    def plot_optimization_history(self):
        """Plot optimization history"""
        fig = optuna.visualization.plot_optimization_history(self.study)
        return fig
    
    def plot_parameter_importance(self):
        """Plot parameter importance"""
        fig = optuna.visualization.plot_param_importances(self.study)
        return fig
    
    def plot_parallel_coordinate(self):
        """Plot parallel coordinate visualization"""
        fig = optuna.visualization.plot_parallel_coordinate(self.study)
        return fig 