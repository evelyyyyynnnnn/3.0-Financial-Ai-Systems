import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from sklearn.metrics import confusion_matrix, roc_curve, auc
from typing import Dict, List, Tuple, Union
import torch
import wandb
from pathlib import Path

class ModelVisualizer:
    def __init__(self, config: Dict):
        self.config = config
        self.save_dir = Path("visualization_results")
        self.save_dir.mkdir(exist_ok=True)
        
        # Set style
        plt.style.use('seaborn')
        sns.set_palette("husl")
        
    def plot_learning_curves(self, 
                           train_losses: List[float], 
                           val_losses: List[float],
                           metrics: Dict[str, List[float]]) -> None:
        """Plot training and validation learning curves"""
        
        # Create figure with secondary y-axis
        fig, ax1 = plt.subplots(figsize=(12, 6))
        ax2 = ax1.twinx()
        
        # Plot losses
        epochs = range(1, len(train_losses) + 1)
        ax1.plot(epochs, train_losses, 'b-', label='Training Loss')
        ax1.plot(epochs, val_losses, 'r-', label='Validation Loss')
        ax1.set_xlabel('Epochs')
        ax1.set_ylabel('Loss')
        
        # Plot metrics
        colors = ['g', 'c', 'm', 'y']
        for (metric_name, metric_values), color in zip(metrics.items(), colors):
            ax2.plot(epochs, metric_values, f'{color}-', label=metric_name)
        
        ax2.set_ylabel('Metric Value')
        
        # Add legends
        lines1, labels1 = ax1.get_legend_handles_labels()
        lines2, labels2 = ax2.get_legend_handles_labels()
        ax1.legend(lines1 + lines2, labels1 + labels2, loc='center right')
        
        plt.title('Training Progress')
        plt.tight_layout()
        plt.savefig(self.save_dir / 'learning_curves.png', dpi=self.config["visualization"]["dpi"])
        plt.close()
        
        if self.config["logging"]["wandb"]["enabled"]:
            wandb.log({"learning_curves": wandb.Image(str(self.save_dir / 'learning_curves.png'))})
            
    def plot_confusion_matrix(self, y_true: np.ndarray, y_pred: np.ndarray) -> None:
        """Plot confusion matrix"""
        cm = confusion_matrix(y_true, y_pred)
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
        plt.title('Confusion Matrix')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        plt.tight_layout()
        plt.savefig(self.save_dir / 'confusion_matrix.png', dpi=self.config["visualization"]["dpi"])
        plt.close()
        
        if self.config["logging"]["wandb"]["enabled"]:
            wandb.log({"confusion_matrix": wandb.Image(str(self.save_dir / 'confusion_matrix.png'))})
            
    def plot_roc_curve(self, y_true: np.ndarray, y_prob: np.ndarray) -> None:
        """Plot ROC curve"""
        fpr, tpr, _ = roc_curve(y_true, y_prob)
        roc_auc = auc(fpr, tpr)
        
        plt.figure(figsize=(8, 6))
        plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
        plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('Receiver Operating Characteristic (ROC) Curve')
        plt.legend(loc="lower right")
        plt.tight_layout()
        plt.savefig(self.save_dir / 'roc_curve.png', dpi=self.config["visualization"]["dpi"])
        plt.close()
        
        if self.config["logging"]["wandb"]["enabled"]:
            wandb.log({"roc_curve": wandb.Image(str(self.save_dir / 'roc_curve.png'))})
            
    def plot_feature_importance(self, 
                              importance_scores: Dict[str, float],
                              feature_type: str) -> None:
        """Plot feature importance scores"""
        features = list(importance_scores.keys())
        scores = list(importance_scores.values())
        
        plt.figure(figsize=(12, 6))
        bars = plt.barh(features, scores)
        plt.xlabel('Importance Score')
        plt.title(f'{feature_type} Feature Importance')
        
        # Add value labels on the bars
        for bar in bars:
            width = bar.get_width()
            plt.text(width, bar.get_y() + bar.get_height()/2,
                    f'{width:.3f}', ha='left', va='center')
            
        plt.tight_layout()
        plt.savefig(self.save_dir / f'{feature_type.lower()}_importance.png', 
                   dpi=self.config["visualization"]["dpi"])
        plt.close()
        
        if self.config["logging"]["wandb"]["enabled"]:
            wandb.log({f"{feature_type}_importance": 
                      wandb.Image(str(self.save_dir / f'{feature_type.lower()}_importance.png'))})
            
    def plot_attention_maps(self, 
                          attention_weights: torch.Tensor,
                          text_tokens: List[str],
                          modality_names: List[str]) -> None:
        """Plot attention maps between different modalities"""
        attention_weights = attention_weights.cpu().numpy()
        
        # Create heatmap using plotly for interactivity
        fig = go.Figure(data=go.Heatmap(
            z=attention_weights,
            x=modality_names,
            y=text_tokens if len(text_tokens) > 0 else modality_names,
            colorscale='Viridis'
        ))
        
        fig.update_layout(
            title='Cross-Modal Attention Map',
            xaxis_title='Target Modality',
            yaxis_title='Source Tokens/Modalities',
            width=800,
            height=600
        )
        
        if self.config["visualization"]["interactive"]:
            fig.write_html(str(self.save_dir / 'attention_map.html'))
        fig.write_image(str(self.save_dir / 'attention_map.png'), 
                       scale=2)
        
        if self.config["logging"]["wandb"]["enabled"]:
            wandb.log({"attention_map": wandb.Image(str(self.save_dir / 'attention_map.png'))})
            
    def plot_prediction_distribution(self, predictions: np.ndarray, actual: np.ndarray) -> None:
        """Plot distribution of model predictions vs actual values"""
        plt.figure(figsize=(10, 6))
        
        sns.kdeplot(predictions, label='Predictions', shade=True)
        sns.kdeplot(actual, label='Actual', shade=True)
        
        plt.xlabel('Credit Risk Score')
        plt.ylabel('Density')
        plt.title('Distribution of Predicted vs Actual Credit Risk Scores')
        plt.legend()
        plt.tight_layout()
        plt.savefig(self.save_dir / 'prediction_distribution.png', 
                   dpi=self.config["visualization"]["dpi"])
        plt.close()
        
        if self.config["logging"]["wandb"]["enabled"]:
            wandb.log({"prediction_distribution": 
                      wandb.Image(str(self.save_dir / 'prediction_distribution.png'))})
            
    def plot_temporal_analysis(self, 
                             timestamps: List[str],
                             predictions: np.ndarray,
                             market_data: np.ndarray,
                             feature_names: List[str]) -> None:
        """Plot temporal analysis of predictions and market data"""
        fig = go.Figure()
        
        # Add predictions
        fig.add_trace(go.Scatter(
            x=timestamps,
            y=predictions,
            name='Risk Score',
            line=dict(color='red', width=2)
        ))
        
        # Add market features
        for i, feature_name in enumerate(feature_names):
            fig.add_trace(go.Scatter(
                x=timestamps,
                y=market_data[:, i],
                name=feature_name,
                visible='legendonly'  # Hide by default
            ))
            
        fig.update_layout(
            title='Temporal Analysis of Credit Risk and Market Features',
            xaxis_title='Time',
            yaxis_title='Value',
            hovermode='x unified',
            width=1000,
            height=600
        )
        
        if self.config["visualization"]["interactive"]:
            fig.write_html(str(self.save_dir / 'temporal_analysis.html'))
        fig.write_image(str(self.save_dir / 'temporal_analysis.png'), 
                       scale=2)
        
        if self.config["logging"]["wandb"]["enabled"]:
            wandb.log({"temporal_analysis": 
                      wandb.Image(str(self.save_dir / 'temporal_analysis.png'))}) 