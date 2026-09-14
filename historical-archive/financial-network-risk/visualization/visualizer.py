import networkx as nx
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import numpy as np
from typing import Dict, List, Optional
import yaml
from dash import Dash, html, dcc
import dash_bootstrap_components as dbc

class FinancialGraphVisualizer:
    def __init__(self, config_path: str = "config/config.yaml"):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)
        
        self.node_size = self.config['visualization']['node_size']
        self.edge_width = self.config['visualization']['edge_width']
        self.color_map = self.config['visualization']['color_map']
        self.layout = self.config['visualization']['layout']
    
    def plot_network(self, G: nx.Graph, title: str = "Financial Knowledge Graph"):
        """Plot the financial knowledge graph"""
        plt.figure(figsize=(12, 8))
        
        # Choose layout
        sample_node = next(iter(G.nodes(data=True)), None)
        if sample_node and 'pos' in sample_node[1]:
            pos = {node: data['pos'] for node, data in G.nodes(data=True)}
        else:
            if self.layout == "force-directed":
                pos = nx.spring_layout(G, weight='weight', seed=42)
            elif self.layout == "circular":
                pos = nx.circular_layout(G)
            elif self.layout == "spectral":
                pos = nx.spectral_layout(G)
            else:
                pos = nx.spring_layout(G, seed=42)
        
        # Draw nodes
        node_prices = list(nx.get_node_attributes(G, 'price').values())
        if not node_prices:
            node_prices = [len(list(G.neighbors(node))) for node in G.nodes()]

        nx.draw_networkx_nodes(
            G, pos,
            node_size=self.node_size,
            node_color=node_prices,
            cmap=plt.cm.get_cmap(self.color_map)
        )
        
        # Draw edges
        nx.draw_networkx_edges(
            G, pos,
            width=self.edge_width,
            edge_color=[G[u][v]['weight'] for u, v in G.edges()],
            edge_cmap=plt.cm.get_cmap('coolwarm')
        )
        
        plt.title(title)
        scalar_mappable = plt.cm.ScalarMappable(cmap=plt.cm.get_cmap(self.color_map))
        scalar_mappable.set_array(node_prices)
        plt.colorbar(scalar_mappable)
        plt.axis('off')
        
        if self.config['visualization']['save_plots']:
            plt.savefig(f"visualization/{title.lower().replace(' ', '_')}.{self.config['visualization']['plot_format']}")
        
        plt.show()
    
    def plot_attention_weights(self, attention_weights: List[np.ndarray], layer: int = 0):
        """Plot attention weights for GAT model"""
        if not attention_weights:
            raise ValueError("No attention weights provided.")

        att = attention_weights[layer]
        if isinstance(att, tuple):
            att = att[1]

        if hasattr(att, "detach"):
            att = att.detach().cpu().numpy()

        att_matrix = np.atleast_2d(att)

        plt.figure(figsize=(10, 6))
        sns.heatmap(att_matrix, cmap='viridis')
        plt.title(f'Attention Weights - Layer {layer}')
        plt.xlabel('Target Nodes')
        plt.ylabel('Source Nodes')
        
        if self.config['visualization']['save_plots']:
            plt.savefig(f"visualization/attention_weights_layer_{layer}.{self.config['visualization']['plot_format']}")
        
        plt.show()
    
    def create_interactive_dashboard(self, G: nx.Graph, embeddings: np.ndarray):
        """Create interactive dashboard using Dash"""
        app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
        
        sample_node = next(iter(G.nodes(data=True)), None)
        if sample_node and 'pos' in sample_node[1]:
            positions = {node: data['pos'] for node, data in G.nodes(data=True)}
        else:
            positions = nx.spring_layout(G, weight='weight', seed=42)

        # Create network graph
        edge_trace = go.Scatter(
            x=[], y=[],
            line=dict(width=0.5, color='#888'),
            hoverinfo='none',
            mode='lines'
        )
        
        node_trace = go.Scatter(
            x=[], y=[],
            mode='markers',
            hoverinfo='text',
            marker=dict(
                showscale=True,
                colorscale='Viridis',
                size=10,
                color=[],
                colorbar=dict(
                    thickness=15,
                    title='Node Connections',
                    xanchor='left',
                    titleside='right'
                )
            )
        )
        
        # Add edges to edge_trace
        for edge in G.edges():
            x0, y0 = positions[edge[0]]
            x1, y1 = positions[edge[1]]
            edge_trace['x'] += tuple([x0, x1, None])
            edge_trace['y'] += tuple([y0, y1, None])
        
        # Add nodes to node_trace
        for node in G.nodes():
            x, y = positions[node]
            node_trace['x'] += tuple([x])
            node_trace['y'] += tuple([y])
            node_trace['marker']['color'] += tuple([len(G.edges(node))])
            node_info = f'Node {node}<br># of connections: {len(G.edges(node))}'
            node_trace['text'] += tuple([node_info])
        
        # Create figure
        fig = go.Figure(data=[edge_trace, node_trace],
                       layout=go.Layout(
                           title='Interactive Financial Knowledge Graph',
                           showlegend=False,
                           hovermode='closest',
                           margin=dict(b=20, l=5, r=5, t=40),
                           xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                           yaxis=dict(showgrid=False, zeroline=False, showticklabels=False)
                       ))
        
        # Create embedding visualization
        embedding_dim = embeddings.shape[1]
        if embedding_dim < 3:
            padded_embeddings = np.pad(
                embeddings,
                ((0, 0), (0, 3 - embedding_dim)),
                mode='constant'
            )
        else:
            padded_embeddings = embeddings[:, :3]

        embedding_fig = go.Figure(data=[go.Scatter3d(
            x=padded_embeddings[:, 0],
            y=padded_embeddings[:, 1],
            z=padded_embeddings[:, 2],
            mode='markers',
            marker=dict(
                size=6,
                color=padded_embeddings[:, 0],
                colorscale='Viridis',
                opacity=0.8
            )
        )])
        
        embedding_fig.update_layout(
            title='Node Embeddings in 3D Space',
            scene=dict(
                xaxis_title='Dimension 1',
                yaxis_title='Dimension 2',
                zaxis_title='Dimension 3'
            )
        )
        
        # Create dashboard layout
        app.layout = html.Div([
            html.H1("Financial Knowledge Graph Analysis"),
            dbc.Row([
                dbc.Col(dcc.Graph(figure=fig), width=6),
                dbc.Col(dcc.Graph(figure=embedding_fig), width=6)
            ])
        ])
        
        return app 