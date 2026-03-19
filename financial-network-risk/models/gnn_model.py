import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GCNConv, GATConv, SAGEConv
from typing import Optional, List, Union
import yaml

class FinancialGNN(nn.Module):
    def __init__(self, config_path: str = "config/config.yaml"):
        super(FinancialGNN, self).__init__()
        
        # Load configuration
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)
        
        # Model parameters
        self.model_type = self.config['model']['type']
        self.hidden_channels = self.config['model']['hidden_channels']
        self.num_layers = self.config['model']['num_layers']
        self.dropout = self.config['model']['dropout']
        self.num_node_features = len(self.config['data']['node_features'])
        
        # Initialize layers based on model type
        self.convs = nn.ModuleList()
        self.batch_norms = nn.ModuleList()
        
        # Input layer
        if self.model_type == 'GCN':
            self.convs.append(GCNConv(self.num_node_features, self.hidden_channels))
        elif self.model_type == 'GAT':
            self.convs.append(GATConv(
                self.num_node_features,
                self.hidden_channels,
                heads=self.config['model']['heads'],
                negative_slope=self.config['model']['negative_slope']
            ))
        elif self.model_type == 'GraphSAGE':
            self.convs.append(SAGEConv(
                self.num_node_features,
                self.hidden_channels,
                aggr=self.config['model']['aggr']
            ))
        
        self.batch_norms.append(nn.BatchNorm1d(self.hidden_channels))
        
        # Hidden layers
        for _ in range(self.num_layers - 1):
            if self.model_type == 'GCN':
                self.convs.append(GCNConv(self.hidden_channels, self.hidden_channels))
            elif self.model_type == 'GAT':
                self.convs.append(GATConv(
                    self.hidden_channels,
                    self.hidden_channels,
                    heads=self.config['model']['heads'],
                    negative_slope=self.config['model']['negative_slope']
                ))
            elif self.model_type == 'GraphSAGE':
                self.convs.append(SAGEConv(
                    self.hidden_channels,
                    self.hidden_channels,
                    aggr=self.config['model']['aggr']
                ))
            self.batch_norms.append(nn.BatchNorm1d(self.hidden_channels))
        
        # Output layer
        self.output_layer = nn.Linear(self.hidden_channels, 1)
        
    def forward(self, x, edge_index, edge_attr: Optional[torch.Tensor] = None):
        # Forward pass through the network
        edge_weight = self._prepare_edge_weight(edge_attr)
        for i in range(self.num_layers):
            if self.model_type == 'GCN':
                x = self.convs[i](x, edge_index, edge_weight=edge_weight)
            else:
                x = self.convs[i](x, edge_index)

            x = self.batch_norms[i](x)
            x = F.relu(x)
            x = F.dropout(x, p=self.dropout, training=self.training)

        return self.output_layer(x)
    
    def get_attention_weights(self, x, edge_index, edge_attr: Optional[torch.Tensor] = None):
        """Get attention weights for visualization (GAT only)"""
        if self.model_type != 'GAT':
            raise ValueError("Attention weights are only available for GAT model")
        
        attention_weights = []
        for i, conv in enumerate(self.convs):
            x, att = conv(
                x,
                edge_index,
                return_attention_weights=True
            )
            attention_weights.append(att)
            x = self.batch_norms[i](x)
            x = F.relu(x)
        
        return attention_weights
    
    def get_node_embeddings(self, x, edge_index, edge_attr: Optional[torch.Tensor] = None):
        """Get node embeddings for visualization"""
        edge_weight = self._prepare_edge_weight(edge_attr)
        embeddings = []
        for i in range(self.num_layers):
            if self.model_type == 'GCN':
                x = self.convs[i](x, edge_index, edge_weight=edge_weight)
            else:
                x = self.convs[i](x, edge_index)
            x = self.batch_norms[i](x)
            x = F.relu(x)
            embeddings.append(x)
        
        return embeddings[-1]

    @staticmethod
    def _prepare_edge_weight(edge_attr: Optional[torch.Tensor]) -> Optional[torch.Tensor]:
        if edge_attr is None:
            return None
        if edge_attr.dim() == 1:
            return edge_attr
        if edge_attr.size(1) == 1:
            return edge_attr.view(-1)
        return None