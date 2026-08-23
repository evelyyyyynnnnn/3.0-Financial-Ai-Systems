import numpy as np
import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from typing import Dict, List, Optional
import plotly.express as px
from datetime import datetime

class PortfolioVisualizer:
    """Visualization tools for portfolio optimization."""
    
    def __init__(self, config: Dict):
        """
        Initialize the visualizer.
        
        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.style = config['visualization']['plot_style']
        self.template = 'plotly_dark' if self.style == 'dark' else 'plotly_white'
        
    def plot_training_progress(self, metrics: Dict[str, List[float]], 
                             save_path: Optional[str] = None):
        """
        Plot training metrics over time.
        
        Args:
            metrics: Dictionary of training metrics
            save_path: Path to save the plot (optional)
        """
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('Actor Loss', 'Critic Loss', 'Portfolio Value', 'Sharpe Ratio')
        )
        
        # Actor loss
        fig.add_trace(
            go.Scatter(y=metrics['actor_loss'], name='Actor Loss',
                      line=dict(color='#2ecc71')),
            row=1, col=1
        )
        
        # Critic loss
        fig.add_trace(
            go.Scatter(y=metrics['critic_loss'], name='Critic Loss',
                      line=dict(color='#e74c3c')),
            row=1, col=2
        )
        
        # Portfolio value
        fig.add_trace(
            go.Scatter(y=metrics['portfolio_value'], name='Portfolio Value',
                      line=dict(color='#3498db')),
            row=2, col=1
        )
        
        # Sharpe ratio
        fig.add_trace(
            go.Scatter(y=metrics['sharpe_ratio'], name='Sharpe Ratio',
                      line=dict(color='#f1c40f')),
            row=2, col=2
        )
        
        fig.update_layout(
            height=800,
            showlegend=True,
            template=self.template,
            title_text='Training Progress'
        )
        
        if save_path:
            fig.write_html(save_path)
        
        return fig
    
    def plot_portfolio_weights(self, weights: np.ndarray, dates: List[datetime],
                             assets: List[str], save_path: Optional[str] = None):
        """
        Plot portfolio weights over time.
        
        Args:
            weights: Array of portfolio weights over time
            dates: List of dates
            assets: List of asset names
            save_path: Path to save the plot (optional)
        """
        df = pd.DataFrame(weights, columns=assets, index=dates)
        
        fig = go.Figure()
        
        for asset in assets:
            fig.add_trace(
                go.Scatter(
                    x=dates,
                    y=df[asset],
                    name=asset,
                    stackgroup='one'
                )
            )
        
        fig.update_layout(
            title='Portfolio Weights Over Time',
            yaxis_title='Weight',
            template=self.template,
            showlegend=True,
            height=600
        )
        
        if save_path:
            fig.write_html(save_path)
        
        return fig
    
    def plot_performance_metrics(self, metrics: Dict[str, float],
                               benchmark_metrics: Optional[Dict[str, float]] = None,
                               save_path: Optional[str] = None):
        """
        Plot performance metrics comparison.
        
        Args:
            metrics: Dictionary of strategy performance metrics
            benchmark_metrics: Dictionary of benchmark performance metrics (optional)
            save_path: Path to save the plot (optional)
        """
        metrics_list = list(metrics.keys())
        strategy_values = list(metrics.values())
        
        fig = go.Figure()
        
        # Strategy metrics
        fig.add_trace(
            go.Bar(
                name='Strategy',
                x=metrics_list,
                y=strategy_values,
                marker_color='#2ecc71'
            )
        )
        
        # Benchmark metrics if provided
        if benchmark_metrics:
            benchmark_values = [benchmark_metrics[m] for m in metrics_list]
            fig.add_trace(
                go.Bar(
                    name='Benchmark',
                    x=metrics_list,
                    y=benchmark_values,
                    marker_color='#3498db'
                )
            )
        
        fig.update_layout(
            title='Performance Metrics Comparison',
            barmode='group',
            template=self.template,
            height=500
        )
        
        if save_path:
            fig.write_html(save_path)
        
        return fig
    
    def plot_drawdown(self, portfolio_values: np.ndarray, dates: List[datetime],
                     save_path: Optional[str] = None):
        """
        Plot drawdown analysis.
        
        Args:
            portfolio_values: Array of portfolio values
            dates: List of dates
            save_path: Path to save the plot (optional)
        """
        # Calculate drawdown
        peak = np.maximum.accumulate(portfolio_values)
        drawdown = (portfolio_values - peak) / peak
        
        fig = make_subplots(
            rows=2, cols=1,
            subplot_titles=('Portfolio Value', 'Drawdown'),
            vertical_spacing=0.12
        )
        
        # Portfolio value
        fig.add_trace(
            go.Scatter(
                x=dates,
                y=portfolio_values,
                name='Portfolio Value',
                line=dict(color='#2ecc71')
            ),
            row=1, col=1
        )
        
        # Drawdown
        fig.add_trace(
            go.Scatter(
                x=dates,
                y=drawdown,
                name='Drawdown',
                fill='tozeroy',
                line=dict(color='#e74c3c')
            ),
            row=2, col=1
        )
        
        fig.update_layout(
            height=800,
            template=self.template,
            title_text='Portfolio Value and Drawdown Analysis'
        )
        
        if save_path:
            fig.write_html(save_path)
        
        return fig
    
    def plot_risk_metrics(self, returns: np.ndarray, var: np.ndarray,
                         dates: List[datetime], save_path: Optional[str] = None):
        """
        Plot risk metrics over time.
        
        Args:
            returns: Array of portfolio returns
            var: Array of Value at Risk values
            dates: List of dates
            save_path: Path to save the plot (optional)
        """
        fig = make_subplots(
            rows=2, cols=1,
            subplot_titles=('Portfolio Returns', 'Value at Risk'),
            vertical_spacing=0.12
        )
        
        # Returns
        fig.add_trace(
            go.Scatter(
                x=dates,
                y=returns,
                name='Returns',
                line=dict(color='#3498db')
            ),
            row=1, col=1
        )
        
        # VaR
        fig.add_trace(
            go.Scatter(
                x=dates,
                y=var,
                name='VaR (95%)',
                line=dict(color='#e74c3c')
            ),
            row=2, col=1
        )
        
        fig.update_layout(
            height=800,
            template=self.template,
            title_text='Portfolio Risk Metrics'
        )
        
        if save_path:
            fig.write_html(save_path)
        
        return fig
    
    def create_dashboard(self, metrics: Dict[str, np.ndarray],
                        save_path: Optional[str] = None):
        """
        Create an interactive dashboard with all metrics.
        
        Args:
            metrics: Dictionary containing all metrics
            save_path: Path to save the dashboard (optional)
        """
        fig = make_subplots(
            rows=3, cols=2,
            subplot_titles=(
                'Portfolio Value',
                'Asset Weights',
                'Returns Distribution',
                'Risk Metrics',
                'Training Progress',
                'Performance vs Benchmark'
            ),
            vertical_spacing=0.12,
            horizontal_spacing=0.1
        )
        
        # Portfolio value
        fig.add_trace(
            go.Scatter(
                y=metrics['portfolio_value'],
                name='Portfolio Value',
                line=dict(color='#2ecc71')
            ),
            row=1, col=1
        )
        
        # Asset weights
        for i, asset in enumerate(self.config['market_environment']['assets']):
            fig.add_trace(
                go.Scatter(
                    y=metrics['weights'][:, i],
                    name=asset,
                    stackgroup='one'
                ),
                row=1, col=2
            )
        
        # Returns distribution
        fig.add_trace(
            go.Histogram(
                x=metrics['returns'],
                name='Returns',
                nbinsx=50,
                marker_color='#3498db'
            ),
            row=2, col=1
        )
        
        # Risk metrics
        fig.add_trace(
            go.Scatter(
                y=metrics['var'],
                name='VaR',
                line=dict(color='#e74c3c')
            ),
            row=2, col=2
        )
        
        # Training progress
        fig.add_trace(
            go.Scatter(
                y=metrics['actor_loss'],
                name='Actor Loss',
                line=dict(color='#f1c40f')
            ),
            row=3, col=1
        )
        
        # Performance comparison
        fig.add_trace(
            go.Bar(
                x=['Sharpe', 'Sortino', 'Calmar'],
                y=[
                    metrics['sharpe_ratio'][-1],
                    metrics['sortino_ratio'][-1],
                    metrics['calmar_ratio'][-1]
                ],
                name='Strategy',
                marker_color='#2ecc71'
            ),
            row=3, col=2
        )
        
        fig.update_layout(
            height=1200,
            template=self.template,
            title_text='Portfolio Optimization Dashboard',
            showlegend=True
        )
        
        if save_path:
            fig.write_html(save_path)
        
        return fig 