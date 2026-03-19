import os
from typing import Dict, Optional, Tuple

import gymnasium as gym
import numpy as np
import pandas as pd
from gymnasium import spaces
import yfinance as yf


class PortfolioEnv(gym.Env):
    """
    A custom OpenAI Gym environment for portfolio optimization using reinforcement learning.
    """
    
    def __init__(self, config: Dict):
        super().__init__()
        
        self.config = config
        self.window_size = config['market_environment']['window_size']
        self.assets = config['market_environment']['assets']
        self.n_assets = len(self.assets)
        self.transaction_cost = config['market_environment']['transaction_cost']
        self.risk_free_rate = config['market_environment']['risk_free_rate']
        self.min_position_size = config['risk_management']['min_position_size']
        self.max_position_size = config['risk_management']['max_position_size']
        self.max_leverage = config['risk_management']['max_leverage']
        self.price_features = config['data']['features']
        self.indicators = config['data']['technical_indicators']
        self.features_per_asset = len(self.price_features) + sum(
            self._indicator_feature_size(ind) for ind in self.indicators
        )
        
        # Load and prepare data
        self._prepare_data()
        
        # Define action and observation spaces
        self.action_space = spaces.Box(
            low=-1,  # Allow short selling up to 100%
            high=1,  # Allow leverage up to 100%
            shape=(self.n_assets,),
            dtype=np.float32
        )
        
        # Observation space includes price data, technical indicators, and current positions
        self.observation_space = spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(self.window_size, self.n_assets * self.features_per_asset + self.n_assets),
            dtype=np.float32
        )
        
        # Initialize state variables
        self.reset()

    def _prepare_data(self):
        """Prepare market data and calculate technical indicators."""
        data_cfg = self.config['data']
        use_cache = data_cfg.get('use_cache', False)
        cache_path = data_cfg.get('cache_path')
        
        data = None
        if use_cache and cache_path and os.path.exists(cache_path):
            data = pd.read_pickle(cache_path)
        
        if data is None:
            data_dict = {}
            for asset in self.assets:
                downloaded = yf.download(
                    asset,
                    start=data_cfg['start_date'],
                    end=data_cfg['end_date'],
                    auto_adjust=False
                )
                data_dict[asset] = downloaded
            data = pd.concat(data_dict, axis=1)
            data = data.sort_index()
            data = data.ffill().dropna()
            if isinstance(data.columns, pd.MultiIndex) and data.columns.nlevels > 2:
                while data.columns.nlevels > 2:
                    data.columns = data.columns.droplevel(-1)
            if cache_path:
                os.makedirs(os.path.dirname(cache_path), exist_ok=True)
                data.to_pickle(cache_path)
        if isinstance(data.columns, pd.MultiIndex) and data.columns.nlevels > 2:
            while data.columns.nlevels > 2:
                data.columns = data.columns.droplevel(-1)
        
        self.data = data
        self._calculate_technical_indicators()
        
        # Remove rows with missing values introduced by indicators
        self.data = self.data.dropna()
        
        # Calculate returns
        self.returns = (
            self.data.xs('Close', axis=1, level=1)
            .pct_change()
            .dropna()
        )
        self.data = self.data.loc[self.returns.index]
        
        # Set the current step to the beginning of the data
        self.current_step = self.window_size
        
    def _calculate_technical_indicators(self):
        """Calculate technical indicators for each asset."""
        for indicator in self.config['data']['technical_indicators']:
            if indicator['name'] == 'RSI':
                self._calculate_rsi(indicator['params']['window'])
            elif indicator['name'] == 'MACD':
                self._calculate_macd(
                    indicator['params']['fast'],
                    indicator['params']['slow'],
                    indicator['params']['signal']
                )
            elif indicator['name'] == 'BB':
                self._calculate_bollinger_bands(
                    indicator['params']['window'],
                    indicator['params']['num_std']
                )

    def _calculate_rsi(self, window: int):
        """Calculate RSI for each asset."""
        for asset in self.assets:
            close_prices = self.data[asset]['Close']
            delta = close_prices.diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
            rs = gain / loss
            rsi = 100 - (100 / (1 + rs))
            self.data.loc[:, (asset, 'RSI')] = rsi.values

    def _calculate_macd(self, fast: int, slow: int, signal: int):
        """Calculate MACD for each asset."""
        for asset in self.assets:
            close_prices = self.data[asset]['Close']
            exp1 = close_prices.ewm(span=fast, adjust=False).mean()
            exp2 = close_prices.ewm(span=slow, adjust=False).mean()
            macd = exp1 - exp2
            signal_line = macd.ewm(span=signal, adjust=False).mean()
            self.data.loc[:, (asset, 'MACD')] = macd.values
            self.data.loc[:, (asset, 'Signal')] = signal_line.values

    def _calculate_bollinger_bands(self, window: int, num_std: int):
        """Calculate Bollinger Bands for each asset."""
        for asset in self.assets:
            close_prices = self.data[asset]['Close']
            rolling_mean = close_prices.rolling(window=window).mean()
            rolling_std = close_prices.rolling(window=window).std()
            self.data.loc[:, (asset, 'BB_upper')] = (rolling_mean + (rolling_std * num_std)).values
            self.data.loc[:, (asset, 'BB_lower')] = (rolling_mean - (rolling_std * num_std)).values
            self.data.loc[:, (asset, 'BB_middle')] = rolling_mean.values

    def _get_observation(self) -> np.ndarray:
        """
        Construct the observation state.
        Returns:
            np.ndarray: The observation state including price data, technical indicators,
                       and current positions.
        """
        # Get the historical window of data
        obs_slice = self.data.iloc[self.current_step - self.window_size:self.current_step]
        
        # Normalize the data
        obs = []
        for asset in self.assets:
            asset_data = []
            # Add price features
            for feature in self.price_features:
                normalized_feature = obs_slice[asset][feature] / obs_slice[asset][feature].iloc[0] - 1
                asset_data.append(normalized_feature.values)
            
            # Add technical indicators
            for indicator in self.indicators:
                if indicator['name'] == 'RSI':
                    asset_data.append(obs_slice[asset]['RSI'].values / 100)
                elif indicator['name'] == 'MACD':
                    asset_data.append(obs_slice[asset]['MACD'].values)
                    asset_data.append(obs_slice[asset]['Signal'].values)
                elif indicator['name'] == 'BB':
                    asset_data.append((obs_slice[asset]['Close'] - obs_slice[asset]['BB_middle']) / 
                                    (obs_slice[asset]['BB_upper'] - obs_slice[asset]['BB_middle']))
            
            obs.append(np.vstack(asset_data))
        
        # Add current portfolio weights
        obs.append(np.tile(self.weights, (self.window_size, 1)).T)
        
        return np.vstack(obs).T

    def _indicator_feature_size(self, indicator: Dict) -> int:
        """Return number of features contributed by an indicator."""
        name = indicator['name'].upper()
        if name == 'MACD':
            return 2
        if name == 'BB':
            return 1
        if name == 'RSI':
            return 1
        return 1

    def step(self, action: np.ndarray) -> Tuple[np.ndarray, float, bool, bool, Dict]:
        """
        Execute one time step within the environment.
        
        Args:
            action (np.ndarray): Array of target portfolio weights
            
        Returns:
            tuple: (observation, reward, done, info)
        """
        # Ensure action sums to 1
        action = self._normalize_action(action)
        current_date = self.data.index[self.current_step]
        
        # Calculate transaction costs
        costs = self._calculate_transaction_costs(action)
        
        # Update portfolio weights
        self.weights = action
        
        # Calculate portfolio return
        step_returns = self.returns.iloc[self.current_step]
        portfolio_return = np.sum(self.weights * step_returns) - costs
        
        # Calculate reward (Sharpe ratio component)
        self.portfolio_value *= (1 + portfolio_return)
        self.returns_memory.append(portfolio_return)
        
        reward = self._calculate_reward()
        
        # Update state
        self.current_step += 1
        terminated = self.current_step >= len(self.data) - 1
        truncated = False
        
        info = {
            'portfolio_value': self.portfolio_value,
            'portfolio_return': portfolio_return,
            'transaction_costs': costs,
            'weights': self.weights,
            'date': current_date
        }
        
        return self._get_observation(), reward, terminated, truncated, info

    def _normalize_action(self, action: np.ndarray) -> np.ndarray:
        """Normalize portfolio weights to sum to 1."""
        norm = np.sum(np.abs(action))
        if norm < 1e-8:
            weights = np.ones_like(action) / len(action)
        else:
            weights = action / norm
        weights = np.clip(weights, self.min_position_size, self.max_position_size)
        leverage = np.sum(np.abs(weights))
        if leverage > self.max_leverage:
            weights = weights / leverage * self.max_leverage
        return weights

    def _calculate_transaction_costs(self, new_weights: np.ndarray) -> float:
        """Calculate transaction costs for rebalancing."""
        costs = np.sum(np.abs(new_weights - self.weights)) * self.transaction_cost
        return costs

    def _calculate_reward(self) -> float:
        """
        Calculate the reward signal.
        Combines Sharpe ratio with risk-adjusted returns and drawdown penalty.
        """
        if len(self.returns_memory) < 2:
            return 0
        
        returns = np.array(self.returns_memory)
        
        # Calculate Sharpe ratio component
        excess_returns = returns - self.risk_free_rate / 252  # Daily risk-free rate
        std = np.std(excess_returns)
        if std < 1e-8:
            sharpe = np.mean(excess_returns) * np.sqrt(252)
        else:
            sharpe = np.sqrt(252) * np.mean(excess_returns) / std
        
        # Calculate drawdown penalty
        cumulative = np.cumprod(1 + returns)
        peak = np.maximum.accumulate(cumulative)
        drawdown = np.maximum(0, (peak - cumulative) / peak)
        drawdown_penalty = -np.max(drawdown) * 10  # Penalize drawdowns
        
        # Combine components
        reward = sharpe + drawdown_penalty
        
        return reward

    def reset(self, *, seed: Optional[int] = None,
              options: Optional[Dict] = None) -> Tuple[np.ndarray, Dict]:
        """Reset the environment to initial state."""
        super().reset(seed=seed)
        self.current_step = self.window_size
        self.weights = np.array([1/self.n_assets] * self.n_assets)  # Equal weight initially
        self.portfolio_value = 1.0
        self.returns_memory = []
        
        obs = self._get_observation()
        info = {'date': self.data.index[self.current_step]}
        return obs, info

    def render(self, mode='human'):
        """Render the environment."""
        pass  # Implement visualization if needed 