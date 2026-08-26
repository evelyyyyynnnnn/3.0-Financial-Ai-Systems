import csv
import json
import logging
import os
from typing import Tuple, Optional, Dict, Any, List

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import wandb
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from torch.utils.data import DataLoader, TensorDataset
from tqdm import tqdm

from config.config import Config
from models.lstm_model import LSTMModel
from models.transformer_model import TransformerModel

logger = logging.getLogger(__name__)

class VolatilityTrainer:
    def __init__(self, config: Config):
        self.config = config
        self.device = torch.device(config.model.device)
        self.train_loss_history: List[float] = []
        self.val_loss_history: List[float] = []
        
        # Initialize model
        if config.model.model_type == "lstm":
            self.model = LSTMModel(config.model).to(self.device)
        elif config.model.model_type == "transformer":
            self.model = TransformerModel(config.model).to(self.device)
        else:
            raise ValueError(f"Unknown model type: {config.model.model_type}")
        
        # Initialize optimizer
        self.optimizer = self._get_optimizer()
        
        # Initialize scheduler
        self.scheduler = self._get_scheduler()
        
        # Initialize loss function
        self.criterion = self._get_loss_function()
        
        # Initialize early stopping
        self.best_val_loss = float('inf')
        self.early_stopping_counter = 0
        
        # Initialize wandb if enabled
        if config.use_wandb:
            wandb.init(
                project=config.wandb_project,
                entity=config.wandb_entity,
                config=self._get_wandb_config()
            )
            wandb.watch(self.model)
    
    def _get_optimizer(self) -> optim.Optimizer:
        """Get optimizer based on configuration"""
        if self.config.training.optimizer == "adam":
            return optim.Adam(
                self.model.parameters(),
                lr=self.config.training.learning_rate,
                weight_decay=self.config.training.weight_decay
            )
        elif self.config.training.optimizer == "adamw":
            return optim.AdamW(
                self.model.parameters(),
                lr=self.config.training.learning_rate,
                weight_decay=self.config.training.weight_decay
            )
        elif self.config.training.optimizer == "sgd":
            return optim.SGD(
                self.model.parameters(),
                lr=self.config.training.learning_rate,
                momentum=0.9,
                weight_decay=self.config.training.weight_decay
            )
        else:
            raise ValueError(f"Unknown optimizer: {self.config.training.optimizer}")
    
    def _get_scheduler(self) -> Optional[optim.lr_scheduler._LRScheduler]:
        """Get learning rate scheduler based on configuration"""
        if self.config.training.scheduler == "cosine":
            return optim.lr_scheduler.CosineAnnealingLR(
                self.optimizer,
                T_max=self.config.training.num_epochs
            )
        elif self.config.training.scheduler == "step":
            return optim.lr_scheduler.StepLR(
                self.optimizer,
                step_size=10,
                gamma=0.1
            )
        elif self.config.training.scheduler == "plateau":
            return optim.lr_scheduler.ReduceLROnPlateau(
                self.optimizer,
                mode='min',
                factor=0.1,
                patience=5,
                verbose=True
            )
        else:
            return None
    
    def _get_loss_function(self) -> nn.Module:
        """Get loss function based on configuration"""
        if self.config.training.loss_function == "mse":
            return nn.MSELoss()
        elif self.config.training.loss_function == "huber":
            return nn.HuberLoss()
        elif self.config.training.loss_function == "mae":
            return nn.L1Loss()
        else:
            raise ValueError(f"Unknown loss function: {self.config.training.loss_function}")
    
    def _get_wandb_config(self) -> Dict[str, Any]:
        """Get configuration for wandb logging"""
        return {
            "model_type": self.config.model.model_type,
            "input_size": self.config.model.input_size,
            "output_size": self.config.model.output_size,
            "batch_size": self.config.training.batch_size,
            "learning_rate": self.config.training.learning_rate,
            "optimizer": self.config.training.optimizer,
            "scheduler": self.config.training.scheduler,
            "loss_function": self.config.training.loss_function
        }
    
    def _create_data_loaders(
        self,
        X_train: np.ndarray,
        X_val: np.ndarray,
        X_test: np.ndarray,
        y_train: np.ndarray,
        y_val: np.ndarray,
        y_test: np.ndarray
    ) -> Tuple[DataLoader, DataLoader, DataLoader]:
        """Create PyTorch data loaders"""
        # Convert numpy arrays to PyTorch tensors
        X_train_tensor = torch.FloatTensor(X_train)
        X_val_tensor = torch.FloatTensor(X_val)
        X_test_tensor = torch.FloatTensor(X_test)
        y_train_tensor = torch.FloatTensor(y_train).unsqueeze(-1)
        y_val_tensor = torch.FloatTensor(y_val).unsqueeze(-1)
        y_test_tensor = torch.FloatTensor(y_test).unsqueeze(-1)
        
        # Create datasets
        train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
        val_dataset = TensorDataset(X_val_tensor, y_val_tensor)
        test_dataset = TensorDataset(X_test_tensor, y_test_tensor)
        
        # Create data loaders
        train_loader = DataLoader(
            train_dataset,
            batch_size=self.config.training.batch_size,
            shuffle=True
        )
        val_loader = DataLoader(
            val_dataset,
            batch_size=self.config.training.batch_size,
            shuffle=False
        )
        test_loader = DataLoader(
            test_dataset,
            batch_size=self.config.training.batch_size,
            shuffle=False
        )
        
        return train_loader, val_loader, test_loader
    
    def train_epoch(self, train_loader: DataLoader) -> float:
        """Train for one epoch"""
        self.model.train()
        total_loss = 0
        
        for batch_X, batch_y in tqdm(train_loader, desc="Training"):
            batch_X = batch_X.to(self.device)
            batch_y = batch_y.to(self.device)
            
            # Forward pass
            self.optimizer.zero_grad()
            outputs = self.model(batch_X)
            loss = self.criterion(outputs, batch_y)
            
            # Backward pass
            loss.backward()
            self.optimizer.step()
            
            total_loss += loss.item()
        
        return total_loss / len(train_loader)
    
    def validate(self, val_loader: DataLoader) -> float:
        """Validate the model"""
        self.model.eval()
        total_loss = 0
        
        with torch.no_grad():
            for batch_X, batch_y in val_loader:
                batch_X = batch_X.to(self.device)
                batch_y = batch_y.to(self.device)
                
                outputs = self.model(batch_X)
                loss = self.criterion(outputs, batch_y)
                total_loss += loss.item()
        
        return total_loss / len(val_loader)
    
    def train(
        self,
        X_train: np.ndarray,
        X_val: np.ndarray,
        X_test: np.ndarray,
        y_train: np.ndarray,
        y_val: np.ndarray,
        y_test: np.ndarray
    ) -> Dict[str, Any]:
        """Train the model"""
        # Create data loaders
        train_loader, val_loader, test_loader = self._create_data_loaders(
            X_train, X_val, X_test, y_train, y_val, y_test
        )
        
        # Training loop
        for epoch in range(self.config.training.num_epochs):
            # Train for one epoch
            train_loss = self.train_epoch(train_loader)
            self.train_loss_history.append(train_loss)
            
            # Validate
            val_loss = self.validate(val_loader)
            self.val_loss_history.append(val_loss)
            
            # Update learning rate
            if self.scheduler is not None:
                if isinstance(self.scheduler, optim.lr_scheduler.ReduceLROnPlateau):
                    self.scheduler.step(val_loss)
                else:
                    self.scheduler.step()
            
            # Log metrics
            if self.config.use_wandb:
                wandb.log({
                    "train_loss": train_loss,
                    "val_loss": val_loss,
                    "learning_rate": self.optimizer.param_groups[0]['lr']
                })
            
            # Early stopping
            if val_loss < self.best_val_loss - self.config.training.early_stopping_min_delta:
                self.best_val_loss = val_loss
                self.early_stopping_counter = 0
                
                # Save best model
                if self.config.training.save_best_model:
                    self.save_model()
            else:
                self.early_stopping_counter += 1
                if self.early_stopping_counter >= self.config.training.early_stopping_patience:
                    logger.info("Early stopping triggered")
                    break
            
            # Log progress
            if (epoch + 1) % self.config.training.log_interval == 0:
                logger.info(
                    f"Epoch [{epoch+1}/{self.config.training.num_epochs}], "
                    f"Train Loss: {train_loss:.4f}, Val Loss: {val_loss:.4f}"
                )
        
        # Load best model
        if self.config.training.save_best_model:
            self.load_model()
        
        # Final evaluation
        test_loss = self.validate(test_loader)
        logger.info(f"Final Test Loss: {test_loss:.4f}")
        
        if self.config.use_wandb:
            wandb.log({
                "test_loss": test_loss,
                "best_val_loss": self.best_val_loss
            })
            wandb.finish()
        
        # Compute evaluation metrics
        y_train_pred = self.predict(X_train)
        y_val_pred = self.predict(X_val)
        y_test_pred = self.predict(X_test)
        
        metrics = {
            "train": self._compute_metrics(y_train, y_train_pred),
            "val": self._compute_metrics(y_val, y_val_pred),
            "test": self._compute_metrics(y_test, y_test_pred)
        }
        
        self._save_training_history()
        self._save_metrics(metrics)
        
        return {
            "train_loss": train_loss,
            "val_loss": val_loss,
            "test_loss": test_loss,
            "best_val_loss": self.best_val_loss,
            "metrics": metrics,
            "train_loss_history": self.train_loss_history,
            "val_loss_history": self.val_loss_history,
            "predictions": {
                "train": y_train_pred,
                "val": y_val_pred,
                "test": y_test_pred
            }
        }
    
    def save_model(self):
        """Save the model"""
        os.makedirs(self.config.training.checkpoint_dir, exist_ok=True)
        torch.save({
            'model_state_dict': self.model.state_dict(),
            'optimizer_state_dict': self.optimizer.state_dict(),
            'scheduler_state_dict': self.scheduler.state_dict() if self.scheduler else None,
            'config': self.config
        }, os.path.join(self.config.training.checkpoint_dir, 'best_model.pth'))
    
    def load_model(self):
        """Load the model"""
        checkpoint = torch.load(os.path.join(self.config.training.checkpoint_dir, 'best_model.pth'))
        self.model.load_state_dict(checkpoint['model_state_dict'])
        self.optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        if self.scheduler and checkpoint['scheduler_state_dict']:
            self.scheduler.load_state_dict(checkpoint['scheduler_state_dict'])
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        """Make predictions"""
        self.model.eval()
        X_tensor = torch.FloatTensor(X).to(self.device)
        
        with torch.no_grad():
            predictions = self.model(X_tensor).squeeze(-1)
        
        return predictions.cpu().numpy()

    def _compute_metrics(self, y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
        """Compute regression metrics."""
        y_true = np.asarray(y_true).reshape(-1)
        y_pred = np.asarray(y_pred).reshape(-1)
        
        mse = mean_squared_error(y_true, y_pred)
        rmse = float(np.sqrt(mse))
        mae = mean_absolute_error(y_true, y_pred)
        r2 = r2_score(y_true, y_pred)
        
        return {
            "mse": float(mse),
            "rmse": rmse,
            "mae": float(mae),
            "r2": float(r2)
        }

    def _save_training_history(self):
        """Persist training and validation loss history."""
        if not self.train_loss_history:
            return
        
        os.makedirs(self.config.training.checkpoint_dir, exist_ok=True)
        history_path = os.path.join(self.config.training.checkpoint_dir, "loss_history.csv")
        
        with open(history_path, mode="w", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["epoch", "train_loss", "val_loss"])
            for epoch_idx, (train_loss, val_loss) in enumerate(
                zip(self.train_loss_history, self.val_loss_history), start=1
            ):
                writer.writerow([epoch_idx, train_loss, val_loss])

    def _save_metrics(self, metrics: Dict[str, Dict[str, float]]):
        """Persist evaluation metrics to disk."""
        os.makedirs(self.config.training.checkpoint_dir, exist_ok=True)
        metrics_path = os.path.join(self.config.training.checkpoint_dir, "metrics.json")
        
        with open(metrics_path, mode="w") as jsonfile:
            json.dump(metrics, jsonfile, indent=4, default=float)