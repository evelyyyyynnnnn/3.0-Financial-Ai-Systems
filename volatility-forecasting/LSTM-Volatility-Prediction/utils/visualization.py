import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from typing import Optional, List, Dict, Any
import pandas as pd
from config.config import VisualizationConfig
import logging

logger = logging.getLogger(__name__)

class VolatilityVisualizer:
    def __init__(self, config: VisualizationConfig):
        self.config = config
        self._set_style()
    
    def _set_style(self):
        """Set the plotting style"""
        plt.style.use(self.config.style)
        sns.set_palette("husl")
    
    def plot_predictions(
        self,
        y_true: np.ndarray,
        y_pred: np.ndarray,
        dates: Optional[np.ndarray] = None,
        title: str = "Volatility Predictions",
        save_path: Optional[str] = None
    ) -> plt.Figure:
        """Plot true vs predicted volatility"""
        fig, ax = plt.subplots(figsize=self.config.figsize, dpi=self.config.dpi)
        
        if dates is not None:
            x = dates
        else:
            x = range(len(y_true))
        
        ax.plot(x, y_true, label="True Volatility", alpha=0.7)
        ax.plot(x, y_pred, label="Predicted Volatility", alpha=0.7)
        
        ax.set_title(title)
        ax.set_xlabel("Time")
        ax.set_ylabel("Volatility")
        ax.legend()
        ax.grid(True)
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=self.config.dpi)
        
        return fig
    
    def plot_loss_history(
        self,
        train_loss: List[float],
        val_loss: List[float],
        title: str = "Training History",
        save_path: Optional[str] = None
    ) -> plt.Figure:
        """Plot training and validation loss history"""
        fig, ax = plt.subplots(figsize=self.config.figsize, dpi=self.config.dpi)
        
        epochs = range(1, len(train_loss) + 1)
        ax.plot(epochs, train_loss, label="Training Loss")
        ax.plot(epochs, val_loss, label="Validation Loss")
        
        ax.set_title(title)
        ax.set_xlabel("Epoch")
        ax.set_ylabel("Loss")
        ax.legend()
        ax.grid(True)
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=self.config.dpi)
        
        return fig
    
    def plot_attention_weights(
        self,
        attention_weights: np.ndarray,
        feature_names: List[str],
        title: str = "Attention Weights",
        save_path: Optional[str] = None
    ) -> plt.Figure:
        """Plot attention weights for transformer model"""
        fig, ax = plt.subplots(figsize=self.config.figsize, dpi=self.config.dpi)
        
        sns.heatmap(
            attention_weights,
            xticklabels=feature_names,
            yticklabels=feature_names,
            cmap="YlOrRd",
            ax=ax
        )
        
        ax.set_title(title)
        ax.set_xlabel("Features")
        ax.set_ylabel("Features")
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=self.config.dpi)
        
        return fig
    
    def plot_error_distribution(
        self,
        errors: np.ndarray,
        title: str = "Prediction Error Distribution",
        save_path: Optional[str] = None
    ) -> plt.Figure:
        """Plot distribution of prediction errors"""
        fig, ax = plt.subplots(figsize=self.config.figsize, dpi=self.config.dpi)
        
        sns.histplot(errors, kde=True, ax=ax)
        
        ax.set_title(title)
        ax.set_xlabel("Prediction Error")
        ax.set_ylabel("Frequency")
        ax.grid(True)
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=self.config.dpi)
        
        return fig
    
    def plot_feature_importance(
        self,
        feature_importance: Dict[str, float],
        title: str = "Feature Importance",
        save_path: Optional[str] = None
    ) -> plt.Figure:
        """Plot feature importance"""
        fig, ax = plt.subplots(figsize=self.config.figsize, dpi=self.config.dpi)
        
        features = list(feature_importance.keys())
        importance = list(feature_importance.values())
        
        sns.barplot(x=importance, y=features, ax=ax)
        
        ax.set_title(title)
        ax.set_xlabel("Importance")
        ax.set_ylabel("Features")
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=self.config.dpi)
        
        return fig
    
    def plot_correlation_matrix(
        self,
        data: pd.DataFrame,
        title: str = "Feature Correlation Matrix",
        save_path: Optional[str] = None
    ) -> plt.Figure:
        """Plot correlation matrix of features"""
        fig, ax = plt.subplots(figsize=self.config.figsize, dpi=self.config.dpi)
        
        corr = data.corr()
        sns.heatmap(
            corr,
            annot=True,
            fmt=".2f",
            cmap="coolwarm",
            center=0,
            ax=ax
        )
        
        ax.set_title(title)
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=self.config.dpi)
        
        return fig
    
    def plot_volatility_components(
        self,
        data: pd.DataFrame,
        components: List[str],
        title: str = "Volatility Components",
        save_path: Optional[str] = None
    ) -> plt.Figure:
        """Plot different components of volatility"""
        fig, ax = plt.subplots(figsize=self.config.figsize, dpi=self.config.dpi)
        
        for component in components:
            ax.plot(data.index, data[component], label=component, alpha=0.7)
        
        ax.set_title(title)
        ax.set_xlabel("Time")
        ax.set_ylabel("Value")
        ax.legend()
        ax.grid(True)
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=self.config.dpi)
        
        return fig
    
    def plot_residuals(
        self,
        y_true: np.ndarray,
        y_pred: np.ndarray,
        title: str = "Residuals Plot",
        save_path: Optional[str] = None
    ) -> plt.Figure:
        """Plot residuals vs predicted values"""
        fig, ax = plt.subplots(figsize=self.config.figsize, dpi=self.config.dpi)
        
        residuals = y_true - y_pred
        ax.scatter(y_pred, residuals, alpha=0.5)
        ax.axhline(y=0, color='r', linestyle='--')
        
        ax.set_title(title)
        ax.set_xlabel("Predicted Values")
        ax.set_ylabel("Residuals")
        ax.grid(True)
        
        if save_path:
            plt.savefig(save_path, bbox_inches='tight', dpi=self.config.dpi)
        
        return fig 