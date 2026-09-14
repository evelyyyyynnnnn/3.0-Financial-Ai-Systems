# Financial Knowledge Graph with Graph Neural Networks

This project implements a sophisticated financial knowledge graph using Graph Neural Networks (GNN). It provides a comprehensive framework for analyzing financial relationships and patterns through graph-based machine learning.

## Features

- Complex GNN architectures for financial data analysis
- Configurable parameters for model tuning
- Interactive visualization of financial knowledge graphs
- Support for various financial data sources
- Model evaluation and comparison tools

## Project Structure

```
financial_gnn/
├── config/                 # Configuration files
├── data/                   # Data processing and storage
├── models/                 # GNN model implementations
├── visualization/          # Visualization tools
├── utils/                  # Utility functions
├── utils/                  # Utility helpers (logging, etc.)
└── notebooks/              # Example notebooks and demos
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Configure your settings in `config/config.yaml`
2. Ensure your data file exists at the path defined in `data.source` (default: `data/financial_data.csv`)
3. Run the main pipeline:
```bash
python main.py
```

## Configuration

The project includes numerous configurable parameters:

- GNN architecture parameters
- Training hyperparameters
- Data preprocessing options
- Visualization settings

## Visualization

Interactive visualizations are available through:
- Network graph visualization
- Model performance metrics
- Financial relationship analysis

## License

MIT License 