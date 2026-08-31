import torch
import torch.nn.functional as F
from models.gnn_model import FinancialGNN
from data.data_processor import FinancialDataProcessor
from visualization.visualizer import FinancialGraphVisualizer
import yaml
import os
from tqdm import tqdm
from utils.logger import configure_logger


def train_model(model, data, config, logger):
    """Train the GNN model"""
    optimizer = torch.optim.Adam(
        model.parameters(),
        lr=config['training']['learning_rate'],
        weight_decay=config['training']['weight_decay']
    )
    
    model.train()
    best_val_loss = float('inf')
    patience_counter = 0
    train_mask = data.train_mask
    val_mask = data.val_mask
    
    for epoch in tqdm(range(config['training']['epochs']), desc="Training epochs"):
        optimizer.zero_grad()
        out = model(data.x, data.edge_index, data.edge_attr)
        loss = F.mse_loss(out[train_mask], data.y[train_mask])
        loss.backward()
        optimizer.step()
        
        # Validation
        model.eval()
        with torch.no_grad():
            val_out = model(data.x, data.edge_index, data.edge_attr)
            val_loss = F.mse_loss(val_out[val_mask], data.y[val_mask])
        
        # Early stopping
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            patience_counter = 0
            torch.save(model.state_dict(), 'best_model.pth')
        else:
            patience_counter += 1
            if patience_counter >= config['training']['early_stopping_patience']:
                logger.info("Early stopping triggered at epoch %d", epoch)
                break
        
        model.train()
        
        if epoch % 10 == 0:
            logger.info(
                "Epoch %d | Train Loss: %.4f | Val Loss: %.4f",
                epoch,
                loss.item(),
                val_loss.item()
            )

def main():
    # Load configuration
    with open('config/config.yaml', 'r') as f:
        config = yaml.safe_load(f)

    logger = configure_logger()
    
    # Create necessary directories
    os.makedirs('visualization', exist_ok=True)
    
    # Initialize components
    data_processor = FinancialDataProcessor()
    visualizer = FinancialGraphVisualizer()
    
    # Load and preprocess data
    logger.info("Loading and preprocessing data...")
    df = data_processor.load_data(config['data']['source'])
    df = data_processor.preprocess_data(df)
    
    # Construct graph
    logger.info("Constructing financial knowledge graph...")
    data, G = data_processor.construct_graph(df)
    
    # Initialize model
    logger.info("Initializing GNN model...")
    model = FinancialGNN()
    
    # Train model
    logger.info("Training model...")
    train_model(model, data, config, logger)
    
    # Load best model
    model.load_state_dict(torch.load('best_model.pth'))
    model.eval()
    
    # Evaluate on test set
    with torch.no_grad():
        predictions = model(data.x, data.edge_index, data.edge_attr)
        test_loss = F.mse_loss(predictions[data.test_mask], data.y[data.test_mask]).item()
    logger.info("Test MSE: %.4f", test_loss)
    
    # Get node embeddings
    logger.info("Generating node embeddings...")
    embeddings = data_processor.get_node_embeddings(model, data)
    
    # Visualize results
    logger.info("Creating visualizations...")
    visualizer.plot_network(G)
    
    if config['model']['type'] == 'GAT':
        logger.info("Visualizing attention weights...")
        attention_weights = model.get_attention_weights(data.x, data.edge_index, data.edge_attr)
        visualizer.plot_attention_weights(attention_weights)
    
    # Create interactive dashboard
    logger.info("Launching interactive dashboard...")
    app = visualizer.create_interactive_dashboard(G, embeddings)
    app.run_server(debug=True)

if __name__ == "__main__":
    main() 