import os
import yaml
import torch
import pytorch_lightning as pl
from pytorch_lightning.callbacks import ModelCheckpoint, EarlyStopping
from pytorch_lightning.loggers import WandbLogger
import argparse
from pathlib import Path
from typing import Dict, List, Tuple
import wandb
import numpy as np

from models.multimodal_model import MultimodalCreditRiskModel
from preprocessing.data_processor import create_data_loaders
from visualization.visualizer import ModelVisualizer

def load_config(config_path: str) -> Dict:
    """Load configuration from YAML file"""
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config

def setup_wandb(config: Dict) -> WandbLogger:
    """Setup Weights & Biases logging"""
    wandb_config = config["logging"]["wandb"]
    wandb_logger = WandbLogger(
        project=wandb_config["project"],
        name=f"multimodal_credit_risk_{wandb.util.generate_id()}",
        config=config,
        tags=wandb_config["tags"]
    )
    return wandb_logger

def setup_callbacks(config: Dict) -> List[pl.Callback]:
    """Setup training callbacks"""
    callbacks = []
    
    # Model checkpoint callback
    checkpoint_callback = ModelCheckpoint(
        dirpath='checkpoints',
        filename='model-{epoch:02d}-{val_loss:.2f}',
        save_top_k=3,
        verbose=True,
        monitor='val_loss',
        mode='min'
    )
    callbacks.append(checkpoint_callback)
    
    # Early stopping callback
    early_stop_callback = EarlyStopping(
        monitor='val_loss',
        min_delta=config["training"]["early_stopping"]["min_delta"],
        patience=config["training"]["early_stopping"]["patience"],
        verbose=True,
        mode='min'
    )
    callbacks.append(early_stop_callback)
    
    return callbacks

def train(config: Dict, 
         train_loader: torch.utils.data.DataLoader,
         val_loader: torch.utils.data.DataLoader) -> pl.LightningModule:
    """Main training function"""
    
    # Initialize model
    model = MultimodalCreditRiskModel(config)
    
    # Setup logging
    if config["logging"]["wandb"]["enabled"]:
        logger = setup_wandb(config)
    else:
        logger = True  # Use default logger
        
    # Setup callbacks
    callbacks = setup_callbacks(config)
    
    # Initialize trainer
    trainer = pl.Trainer(
        max_epochs=config["training"]["epochs"],
        callbacks=callbacks,
        logger=logger,
        gradient_clip_val=config["training"]["gradient_clipping"],
        precision=16 if config["training"]["mixed_precision"] else 32,
        accelerator='auto',
        devices='auto'
    )
    
    # Train model
    trainer.fit(model, train_loader, val_loader)
    
    return model

def evaluate(model: pl.LightningModule,
            val_loader: torch.utils.data.DataLoader,
            config: Dict) -> None:
    """Evaluate model and generate visualizations"""
    
    # Initialize visualizer
    visualizer = ModelVisualizer(config)
    
    # Get predictions
    model.eval()
    all_preds = []
    all_labels = []
    all_attention_weights = []
    
    with torch.no_grad():
        for batch in val_loader:
            # Forward pass
            outputs = model(batch)
            preds = torch.sigmoid(outputs)
            
            # Store predictions and labels
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(batch["labels"].cpu().numpy())
            
            # Store attention weights if available
            if hasattr(model, "fusion_layer") and hasattr(model.fusion_layer, "attention"):
                attention_weights = model.fusion_layer.attention.get_attention_weights()
                all_attention_weights.append(attention_weights)
    
    # Convert to numpy arrays
    all_preds = np.array(all_preds)
    all_labels = np.array(all_labels)
    
    # Generate visualizations
    visualizer.plot_confusion_matrix(all_labels, (all_preds > 0.5).astype(int))
    visualizer.plot_roc_curve(all_labels, all_preds)
    visualizer.plot_prediction_distribution(all_preds, all_labels)
    
    # Plot attention maps if available
    if all_attention_weights:
        avg_attention = torch.mean(torch.stack(all_attention_weights), dim=0)
        modality_names = ["Text", "Market", "Image"]
        visualizer.plot_attention_maps(
            avg_attention,
            [],  # No text tokens for this visualization
            modality_names
        )

def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Train multimodal credit risk model')
    parser.add_argument('--config', type=str, default='config/config.yaml',
                      help='Path to configuration file')
    parser.add_argument('--data_dir', type=str, required=True,
                      help='Directory containing the dataset')
    args = parser.parse_args()
    
    # Load configuration
    config = load_config(args.config)
    
    # Create data directory if it doesn't exist
    data_dir = Path(args.data_dir)
    data_dir.mkdir(exist_ok=True)
    
    # Prepare data
    # Note: You would need to implement the data collection/preparation steps
    # or use your existing dataset here
    text_data = []  # List of text documents
    market_symbols = []  # List of stock symbols
    image_paths = []  # List of image file paths
    labels = []  # List of labels (0 or 1)
    
    # Create data loaders
    train_loader, val_loader = create_data_loaders(
        config=config,
        text_data=text_data,
        market_symbols=market_symbols,
        image_paths=image_paths,
        labels=labels,
        start_date="2020-01-01",  # Adjust these dates based on your data
        end_date="2023-12-31"
    )
    
    # Train model
    model = train(config, train_loader, val_loader)
    
    # Evaluate and visualize results
    evaluate(model, val_loader, config)
    
    print("Training completed successfully!")

if __name__ == "__main__":
    main() 