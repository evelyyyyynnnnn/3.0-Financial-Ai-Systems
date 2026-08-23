import argparse
import logging
import os
from config.config import Config
from data.data_loader import MarketDataLoader
from training.trainer import VolatilityTrainer
from training.hyperparameter_tuning import HyperparameterTuner
from utils.visualization import VolatilityVisualizer
import wandb

def setup_logging(config: Config):
    """Setup logging configuration"""
    logging.basicConfig(
        level=getattr(logging, config.log_level),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(config.log_file),
            logging.StreamHandler()
        ]
    )

def parse_args():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(description='Market Volatility Prediction')
    
    parser.add_argument('--wandb', dest='use_wandb', action='store_true',
                       help='Enable Weights & Biases logging')
    parser.add_argument('--no-wandb', dest='use_wandb', action='store_false',
                       help='Disable Weights & Biases logging')
    parser.set_defaults(use_wandb=None)
    
    # Model type
    parser.add_argument('--model_type', type=str, default='lstm',
                       choices=['lstm', 'transformer'],
                       help='Type of model to use')
    
    # Data parameters
    parser.add_argument('--ticker', type=str, default='^GSPC',
                       help='Stock ticker symbol')
    parser.add_argument('--start_date', type=str, default='2010-01-01',
                       help='Start date for data')
    parser.add_argument('--end_date', type=str, default='2023-12-31',
                       help='End date for data')
    
    # Training parameters
    parser.add_argument('--batch_size', type=int, default=32,
                       help='Batch size for training')
    parser.add_argument('--learning_rate', type=float, default=0.001,
                       help='Learning rate')
    parser.add_argument('--num_epochs', type=int, default=100,
                       help='Number of training epochs')
    
    # Hyperparameter tuning
    parser.add_argument('--tune_hyperparameters', action='store_true',
                       help='Whether to perform hyperparameter tuning')
    parser.add_argument('--n_trials', type=int, default=50,
                       help='Number of trials for hyperparameter tuning')
    
    # Visualization
    parser.add_argument('--plot_results', action='store_true',
                       help='Whether to plot results')
    
    return parser.parse_args()

def main():
    # Parse command line arguments
    args = parse_args()
    
    # Initialize configuration
    config = Config()
    
    # Update config with command line arguments
    config.model.model_type = args.model_type
    config.data.ticker = args.ticker
    config.data.start_date = args.start_date
    config.data.end_date = args.end_date
    config.training.batch_size = args.batch_size
    config.training.learning_rate = args.learning_rate
    config.training.num_epochs = args.num_epochs
    config.hyperparameter_tuning.n_trials = args.n_trials
    if args.use_wandb is not None:
        config.use_wandb = args.use_wandb
    
    # Setup logging
    setup_logging(config)
    logger = logging.getLogger(__name__)
    logger.info("Weights & Biases logging is %s", "enabled" if config.use_wandb else "disabled")
    
    try:
        # Initialize data loader
        data_loader = MarketDataLoader(config.data)
        
        # Load and prepare data
        logger.info("Loading and preparing data...")
        X_train, X_val, X_test, y_train, y_val, y_test = data_loader.get_train_val_test_split()
        
        if args.tune_hyperparameters:
            # Perform hyperparameter tuning
            logger.info("Starting hyperparameter tuning...")
            tuner = HyperparameterTuner(config)
            tuning_results = tuner.optimize(X_train, X_val, X_test, y_train, y_val, y_test)
            
            # Plot tuning results
            if args.plot_results:
                visualizer = VolatilityVisualizer(config.visualization)
                visualizer.plot_optimization_history()
                visualizer.plot_parameter_importance()
                visualizer.plot_parallel_coordinate()
        
        # Train model
        logger.info("Training model...")
        trainer = VolatilityTrainer(config)
        training_results = trainer.train(X_train, X_val, X_test, y_train, y_val, y_test)
        
        metrics = training_results["metrics"]
        for split_name, split_metrics in metrics.items():
            logger.info(
                "%s metrics - MSE: %.6f, RMSE: %.6f, MAE: %.6f, R2: %.6f",
                split_name.capitalize(),
                split_metrics["mse"],
                split_metrics["rmse"],
                split_metrics["mae"],
                split_metrics["r2"]
            )
        
        # Make predictions
        logger.info("Making predictions...")
        y_pred = training_results["predictions"]["test"]
        
        if args.plot_results:
            # Plot results
            logger.info("Plotting results...")
            visualizer = VolatilityVisualizer(config.visualization)
            
            visualizer.plot_loss_history(
                training_results["train_loss_history"],
                training_results["val_loss_history"],
                save_path=os.path.join(config.training.checkpoint_dir, "loss_history.png")
            )
            
            # Plot predictions
            visualizer.plot_predictions(
                y_test,
                y_pred,
                title=f"{config.model.model_type.upper()} Volatility Predictions"
            )
            
            # Plot error distribution
            errors = y_test - y_pred
            visualizer.plot_error_distribution(errors)
            
            # Plot residuals
            visualizer.plot_residuals(y_test, y_pred)
        
        # Log final results
        logger.info("Training completed successfully!")
        logger.info(f"Final Test Loss: {training_results['test_loss']:.4f}")
        
        if config.use_wandb:
            wandb.finish()
    
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise

if __name__ == "__main__":
    main() 