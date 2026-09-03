#!/usr/bin/env python3
"""
数据获取模块 - 使用yfinance替代有问题的YahooFinancials
"""

import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import time

class DataFetcher:
    """股票数据获取器"""
    
    def __init__(self):
        self.session = None
    
    def get_current_data(self, tickers: List[str]) -> Dict[str, Dict]:
        """
        获取股票的当前数据
        
        Args:
            tickers: 股票代码列表
            
        Returns:
            包含股票数据的字典
        """
        data = {}
        
        for ticker in tickers:
            try:
                # 创建股票对象
                stock = yf.Ticker(ticker)
                
                # 获取实时信息
                info = stock.info
                
                # 提取关键数据
                current_price = info.get('currentPrice')
                previous_close = info.get('previousClose')
                volume = info.get('volume', 0)
                day_high = info.get('dayHigh')
                day_low = info.get('dayLow')
                open_price = info.get('open')
                
                if current_price and previous_close:
                    # 计算涨跌幅
                    change_amount = current_price - previous_close
                    change_percent = (change_amount / previous_close) * 100
                    
                    data[ticker] = {
                        'ticker': ticker,
                        'current_price': current_price,
                        'previous_close': previous_close,
                        'change_amount': change_amount,
                        'change_percent': change_percent,
                        'volume': volume,
                        'day_high': day_high,
                        'day_low': day_low,
                        'open_price': open_price,
                        'timestamp': datetime.now().isoformat(),
                        'data_available': True
                    }
                else:
                    data[ticker] = {
                        'ticker': ticker,
                        'data_available': False,
                        'error': 'No price data available',
                        'timestamp': datetime.now().isoformat()
                    }
                    
            except Exception as e:
                data[ticker] = {
                    'ticker': ticker,
                    'data_available': False,
                    'error': str(e),
                    'timestamp': datetime.now().isoformat()
                }
            
            # 添加延迟避免API限制
            time.sleep(0.1)
        
        return data
    
    def get_historical_volatility(self, ticker: str, periods: List[int]) -> Dict[str, float]:
        """
        计算历史波动率
        
        Args:
            ticker: 股票代码
            periods: 计算期间（天数）
            
        Returns:
            各期间的历史波动率
        """
        try:
            stock = yf.Ticker(ticker)
            max_period = max(periods)
            
            # 获取历史数据
            hist = stock.history(period=f"{max_period + 10}d")  # 多获取几天确保数据充足
            
            if hist.empty:
                return {}
            
            # 计算收益率
            returns = hist['Close'].pct_change().dropna()
            
            volatility_data = {}
            for period in periods:
                if len(returns) >= period:
                    # 计算指定期间的年化波动率
                    period_returns = returns.tail(period)
                    volatility = period_returns.std() * (252 ** 0.5)  # 年化
                    volatility_data[f"{period}d"] = volatility
                else:
                    volatility_data[f"{period}d"] = 0.0
            
            return volatility_data
            
        except Exception as e:
            print(f"Error calculating volatility for {ticker}: {e}")
            return {}
    
    def calculate_weighted_volatility(self, ticker: str) -> float:
        """
        计算加权历史波动率
        公式: 0.5 * 1周 + 0.3 * 2周 + 0.2 * 1月
        """
        periods = [5, 10, 20]  # 5天≈1周, 10天≈2周, 20天≈1月
        vol_data = self.get_historical_volatility(ticker, periods)
        
        if not vol_data:
            return 0.0
        
        # 加权计算
        weighted_vol = (
            0.5 * vol_data.get('5d', 0) +
            0.3 * vol_data.get('10d', 0) +
            0.2 * vol_data.get('20d', 0)
        )
        
        return weighted_vol


