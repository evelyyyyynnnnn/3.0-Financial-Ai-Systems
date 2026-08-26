import pandas as pd
import numpy as np
from typing import Tuple, Dict, List
import networkx as nx
import torch
from torch_geometric.data import Data
import yaml
from sklearn.preprocessing import StandardScaler, MinMaxScaler

class FinancialDataProcessor:
    def __init__(self, config_path: str = "config/config.yaml"):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)
        
        self.node_features = self.config['data']['node_features']
        self.min_correlation = self.config['data']['min_correlation']
        self.max_edges_per_node = self.config['data']['max_edges_per_node']
        self.target_feature = self.config['data']['target']
        
    def load_data(self, file_path: str) -> pd.DataFrame:
        """Load financial data from CSV file"""
        df = pd.read_csv(file_path)
        return df
    
    def preprocess_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Preprocess financial data"""
        # Handle missing values
        df = df.fillna(method='ffill').fillna(method='bfill')
        
        # Calculate technical indicators if enabled
        if self.config['features']['use_technical_indicators']:
            df = self._calculate_technical_indicators(df)
        
        # Normalize features
        if self.config['features']['normalize']:
            scaler = StandardScaler() if self.config['features']['scale_method'] == 'standard' else MinMaxScaler()
            df[self.node_features] = scaler.fit_transform(df[self.node_features])
        
        return df
    
    def _calculate_technical_indicators(self, df: pd.DataFrame) -> pd.DataFrame:
        """Calculate technical indicators"""
        window = self.config['features']['window_size']
        
        if 'RSI' in self.config['features']['technical_indicators']:
            delta = df['price'].diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
            rs = gain / loss
            df['RSI'] = 100 - (100 / (1 + rs))
        
        if 'MACD' in self.config['features']['technical_indicators']:
            exp1 = df['price'].ewm(span=12, adjust=False).mean()
            exp2 = df['price'].ewm(span=26, adjust=False).mean()
            df['MACD'] = exp1 - exp2
            df['Signal'] = df['MACD'].ewm(span=9, adjust=False).mean()
        
        if 'Bollinger_Bands' in self.config['features']['technical_indicators']:
            df['BB_middle'] = df['price'].rolling(window=window).mean()
            df['BB_std'] = df['price'].rolling(window=window).std()
            df['BB_upper'] = df['BB_middle'] + 2 * df['BB_std']
            df['BB_lower'] = df['BB_middle'] - 2 * df['BB_std']
        
        return df
    
    def construct_graph(self, df: pd.DataFrame) -> Tuple[Data, nx.Graph]:
        """Construct financial knowledge graph"""
        node_features = df[self.node_features].values
        num_nodes = node_features.shape[0]

        if num_nodes < 2:
            raise ValueError("At least two samples are required to construct the graph.")

        corr_matrix = np.corrcoef(node_features)
        np.fill_diagonal(corr_matrix, 0.0)

        edges: List[Tuple[int, int]] = []
        edge_weights: List[float] = []

        for i in range(num_nodes):
            correlations = corr_matrix[i]
            sorted_indices = np.argsort(np.abs(correlations))[::-1]
            edges_added = 0

            for j in sorted_indices:
                if i >= j:
                    continue
                corr_value = correlations[j]
                if abs(corr_value) < self.min_correlation:
                    continue

                edges.append((i, j))
                edge_weights.append(float(corr_value))
                edges_added += 1

                if edges_added >= self.max_edges_per_node:
                    break

        if not edges:
            raise ValueError(
                "No edges were created. Try lowering min_correlation or review your data preprocessing."
            )

        edge_index = torch.tensor(edges, dtype=torch.long).t().contiguous()
        edge_attr = torch.tensor(edge_weights, dtype=torch.float).view(-1, 1)
        x = torch.tensor(node_features, dtype=torch.float)
        y = torch.tensor(df[self.target_feature].values, dtype=torch.float).view(-1, 1)

        data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr, y=y)

        train_mask, val_mask, test_mask = self._create_data_masks(num_nodes)

        data.train_mask = train_mask
        data.val_mask = val_mask
        data.test_mask = test_mask

        G = nx.Graph()
        for i, row in df.iterrows():
            G.add_node(i, **{feat: row[feat] for feat in self.node_features})

        for (i, j), weight in zip(edges, edge_weights):
            G.add_edge(i, j, weight=weight)

        positions = nx.spring_layout(G, weight='weight', seed=42)
        nx.set_node_attributes(G, positions, name='pos')
        
        return data, G

    def _create_data_masks(self, num_nodes: int) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """Create boolean masks for train/validation/test splits"""
        val_size = self.config['training']['validation_split']
        test_size = self.config['training']['test_split']

        if val_size + test_size >= 1.0:
            raise ValueError("The sum of validation_split and test_split must be less than 1.")

        indices = np.random.permutation(num_nodes)
        test_count = max(1, int(num_nodes * test_size))
        val_count = max(1, int(num_nodes * val_size))
        train_count = max(1, num_nodes - val_count - test_count)

        train_indices = indices[:train_count]
        val_indices = indices[train_count:train_count + val_count]
        test_indices = indices[train_count + val_count:]

        train_mask = torch.zeros(num_nodes, dtype=torch.bool)
        val_mask = torch.zeros(num_nodes, dtype=torch.bool)
        test_mask = torch.zeros(num_nodes, dtype=torch.bool)

        train_mask[train_indices] = True
        val_mask[val_indices] = True
        test_mask[test_indices] = True

        return train_mask, val_mask, test_mask

    def get_node_embeddings(self, model, data: Data) -> np.ndarray:
        """Get node embeddings from the trained model"""
        model.eval()
        with torch.no_grad():
            embeddings = model.get_node_embeddings(data.x, data.edge_index, data.edge_attr)
        return embeddings.cpu().numpy()