import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional
import yfinance as yf
from scipy import stats

class DataProcessor:
    """Data processing and risk management utilities."""
    
    def __init__(self, config: Dict):
        """
        Initialize the data processor.
        
        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.risk_limits = config['risk_management']
    
    def fetch_data(self, start_date: str, end_date: str) -> pd.DataFrame:
        """
        Fetch market data for the specified assets.
        
        Args:
            start_date: Start date for data fetching
            end_date: End date for data fetching
            
        Returns:
            pd.DataFrame: Market data
        """
        data_dict = {}
        for asset in self.config['market_environment']['assets']:
            data = yf.download(asset, start=start_date, end=end_date)
            data_dict[asset] = data
        
        return pd.concat(data_dict, axis=1)
    
    def calculate_returns(self, prices: pd.DataFrame) -> pd.DataFrame:
        """
        Calculate asset returns.
        
        Args:
            prices: Asset prices
            
        Returns:
            pd.DataFrame: Asset returns
        """
        return prices.pct_change()
    
    def calculate_covariance(self, returns: pd.DataFrame,
                           window: int = 63) -> pd.DataFrame:
        """
        Calculate rolling covariance matrix.
        
        Args:
            returns: Asset returns
            window: Rolling window size
            
        Returns:
            pd.DataFrame: Covariance matrix
        """
        return returns.rolling(window=window).cov()
    
    def calculate_correlation(self, returns: pd.DataFrame,
                            window: int = 63) -> pd.DataFrame:
        """
        Calculate rolling correlation matrix.
        
        Args:
            returns: Asset returns
            window: Rolling window size
            
        Returns:
            pd.DataFrame: Correlation matrix
        """
        return returns.rolling(window=window).corr()
    
    def calculate_volatility(self, returns: pd.DataFrame,
                           window: int = 21) -> pd.Series:
        """
        Calculate rolling volatility.
        
        Args:
            returns: Asset returns
            window: Rolling window size
            
        Returns:
            pd.Series: Volatility
        """
        return returns.rolling(window=window).std() * np.sqrt(252)
    
    def calculate_var(self, returns: pd.DataFrame,
                     confidence: float = 0.95) -> pd.Series:
        """
        Calculate Value at Risk.
        
        Args:
            returns: Asset returns
            confidence: Confidence level
            
        Returns:
            pd.Series: VaR values
        """
        return returns.quantile(1 - confidence)
    
    def calculate_cvar(self, returns: pd.DataFrame,
                      confidence: float = 0.95) -> pd.Series:
        """
        Calculate Conditional Value at Risk (Expected Shortfall).
        
        Args:
            returns: Asset returns
            confidence: Confidence level
            
        Returns:
            pd.Series: CVaR values
        """
        var = self.calculate_var(returns, confidence)
        return returns[returns <= var].mean()
    
    def calculate_beta(self, returns: pd.DataFrame,
                      market_returns: pd.Series) -> pd.Series:
        """
        Calculate asset betas relative to market.
        
        Args:
            returns: Asset returns
            market_returns: Market index returns
            
        Returns:
            pd.Series: Beta values
        """
        covariance = returns.cov()
        market_var = market_returns.var()
        return covariance[market_returns.name] / market_var
    
    def calculate_sharpe_ratio(self, returns: pd.DataFrame,
                             risk_free_rate: float) -> pd.Series:
        """
        Calculate Sharpe ratio for each asset.
        
        Args:
            returns: Asset returns
            risk_free_rate: Risk-free rate
            
        Returns:
            pd.Series: Sharpe ratios
        """
        excess_returns = returns - risk_free_rate / 252
        return np.sqrt(252) * excess_returns.mean() / returns.std()
    
    def calculate_sortino_ratio(self, returns: pd.DataFrame,
                              risk_free_rate: float) -> pd.Series:
        """
        Calculate Sortino ratio for each asset.
        
        Args:
            returns: Asset returns
            risk_free_rate: Risk-free rate
            
        Returns:
            pd.Series: Sortino ratios
        """
        excess_returns = returns - risk_free_rate / 252
        downside_returns = returns[returns < 0]
        return np.sqrt(252) * excess_returns.mean() / downside_returns.std()
    
    def check_risk_limits(self, weights: np.ndarray,
                         returns: pd.DataFrame) -> Tuple[bool, Dict]:
        """
        Check if portfolio satisfies risk limits.
        
        Args:
            weights: Portfolio weights
            returns: Asset returns
            
        Returns:
            tuple: (bool indicating if limits are satisfied, dict with risk metrics)
        """
        portfolio_return = (weights * returns).sum(axis=1)
        
        # Calculate risk metrics
        volatility = portfolio_return.std() * np.sqrt(252)
        var = self.calculate_var(portfolio_return)
        max_position = np.max(np.abs(weights))
        leverage = np.sum(np.abs(weights))
        
        # Check limits
        limits_satisfied = True
        violations = {}
        
        if var < self.risk_limits['var_limit']:
            limits_satisfied = False
            violations['var'] = (var, self.risk_limits['var_limit'])
            
        if max_position > self.risk_limits['max_position_size']:
            limits_satisfied = False
            violations['position'] = (max_position,
                                   self.risk_limits['max_position_size'])
            
        if leverage > self.risk_limits['max_leverage']:
            limits_satisfied = False
            violations['leverage'] = (leverage, self.risk_limits['max_leverage'])
        
        risk_metrics = {
            'volatility': volatility,
            'var': var,
            'max_position': max_position,
            'leverage': leverage,
            'violations': violations
        }
        
        return limits_satisfied, risk_metrics
    
    def calculate_optimal_hedge_ratio(self, asset_returns: pd.Series,
                                    hedge_returns: pd.Series) -> float:
        """
        Calculate optimal hedge ratio using regression.
        
        Args:
            asset_returns: Returns of asset to hedge
            hedge_returns: Returns of hedging instrument
            
        Returns:
            float: Optimal hedge ratio
        """
        model = stats.linregress(hedge_returns, asset_returns)
        return model.slope
    
    def calculate_tracking_error(self, portfolio_returns: pd.Series,
                               benchmark_returns: pd.Series) -> float:
        """
        Calculate tracking error relative to benchmark.
        
        Args:
            portfolio_returns: Portfolio returns
            benchmark_returns: Benchmark returns
            
        Returns:
            float: Tracking error
        """
        return np.std(portfolio_returns - benchmark_returns) * np.sqrt(252)
    
    def calculate_information_ratio(self, portfolio_returns: pd.Series,
                                  benchmark_returns: pd.Series) -> float:
        """
        Calculate information ratio.
        
        Args:
            portfolio_returns: Portfolio returns
            benchmark_returns: Benchmark returns
            
        Returns:
            float: Information ratio
        """
        active_returns = portfolio_returns - benchmark_returns
        return np.sqrt(252) * active_returns.mean() / active_returns.std()
    
    def calculate_maximum_drawdown(self, returns: pd.Series) -> Tuple[float, pd.Timestamp, pd.Timestamp]:
        """
        Calculate maximum drawdown and its time period.
        
        Args:
            returns: Return series
            
        Returns:
            tuple: (maximum drawdown, start date, end date)
        """
        cumulative = (1 + returns).cumprod()
        rolling_max = cumulative.expanding().max()
        drawdowns = cumulative / rolling_max - 1
        
        max_drawdown = drawdowns.min()
        end_idx = drawdowns.idxmin()
        peak_idx = rolling_max.loc[:end_idx].idxmax()
        
        return max_drawdown, peak_idx, end_idx
    
    def calculate_risk_contribution(self, weights: np.ndarray,
                                  covariance: pd.DataFrame) -> np.ndarray:
        """
        Calculate risk contribution of each asset.
        
        Args:
            weights: Portfolio weights
            covariance: Covariance matrix
            
        Returns:
            np.ndarray: Risk contributions
        """
        portfolio_vol = np.sqrt(weights.T @ covariance @ weights)
        marginal_risk = covariance @ weights
        risk_contribution = weights * marginal_risk / portfolio_vol
        
        return risk_contribution
    
    def calculate_diversification_ratio(self, weights: np.ndarray,
                                      covariance: pd.DataFrame) -> float:
        """
        Calculate portfolio diversification ratio.
        
        Args:
            weights: Portfolio weights
            covariance: Covariance matrix
            
        Returns:
            float: Diversification ratio
        """
        weighted_vol = np.sqrt(np.diag(covariance)) * weights
        portfolio_vol = np.sqrt(weights.T @ covariance @ weights)
        
        return np.sum(weighted_vol) / portfolio_vol 