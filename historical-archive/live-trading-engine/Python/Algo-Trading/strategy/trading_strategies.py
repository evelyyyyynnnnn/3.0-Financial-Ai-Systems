#!/usr/bin/env python3
"""
算法交易策略代码包 - Python版本
=====================================

基于JavaScript版本转换的Python实现
包含6种核心交易策略的完整实现

作者: Evelyn Du
日期: 2024
"""

import numpy as np
import pandas as pd
import yfinance as yf
from typing import Dict, List, Tuple, Optional
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# 设置matplotlib中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False

class TradingStrategies:
    """
    交易策略类
    实现6种核心量化交易策略
    """
    
    def __init__(self):
        self.strategies = {
            'moving-average-crossover': self.moving_average_crossover,
            'mean-reversion': self.mean_reversion,
            'momentum': self.momentum,
            'bollinger-bands': self.bollinger_bands,
            'rsi-divergence': self.rsi_divergence,
            'macd-crossover': self.macd_crossover
        }
    
    def moving_average_crossover(self, data: pd.DataFrame, params: Dict = None) -> pd.DataFrame:
        """
        移动平均交叉策略
        
        Args:
            data: 包含OHLCV数据的DataFrame
            params: 策略参数字典 {'fast_period': 10, 'slow_period': 20}
        
        Returns:
            包含交易信号的DataFrame
        """
        if params is None:
            params = {'fast_period': 10, 'slow_period': 20}
        
        fast_period = params.get('fast_period', 10)
        slow_period = params.get('slow_period', 20)
        
        # 计算移动平均线
        data['fast_ma'] = data['Close'].rolling(window=fast_period).mean()
        data['slow_ma'] = data['Close'].rolling(window=slow_period).mean()
        
        # 计算信号
        data['signal'] = 0
        data['position'] = 0
        
        # 金叉买入信号
        data.loc[data['fast_ma'] > data['slow_ma'], 'signal'] = 1
        # 死叉卖出信号
        data.loc[data['fast_ma'] < data['slow_ma'], 'signal'] = -1
        
        # 计算持仓变化
        data['position'] = data['signal'].diff()
        
        return data
    
    def mean_reversion(self, data: pd.DataFrame, params: Dict = None) -> pd.DataFrame:
        """
        均值回归策略 (布林带 + RSI)
        
        Args:
            data: 包含OHLCV数据的DataFrame
            params: 策略参数字典
        
        Returns:
            包含交易信号的DataFrame
        """
        if params is None:
            params = {
                'bb_period': 20,
                'bb_std': 2,
                'rsi_period': 14,
                'rsi_overbought': 70,
                'rsi_oversold': 30
            }
        
        bb_period = params.get('bb_period', 20)
        bb_std = params.get('bb_std', 2)
        rsi_period = params.get('rsi_period', 14)
        rsi_overbought = params.get('rsi_overbought', 70)
        rsi_oversold = params.get('rsi_oversold', 30)
        
        # 计算布林带
        data['bb_middle'] = data['Close'].rolling(window=bb_period).mean()
        data['bb_std'] = data['Close'].rolling(window=bb_period).std()
        data['bb_upper'] = data['bb_middle'] + (data['bb_std'] * bb_std)
        data['bb_lower'] = data['bb_middle'] - (data['bb_std'] * bb_std)
        
        # 计算RSI
        delta = data['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=rsi_period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=rsi_period).mean()
        rs = gain / loss
        data['rsi'] = 100 - (100 / (1 + rs))
        
        # 计算信号
        data['signal'] = 0
        
        # 超卖买入条件: 价格接近下轨且RSI超卖
        buy_condition = (
            (data['Close'] <= data['bb_lower'] * 1.01) & 
            (data['rsi'] <= rsi_oversold)
        )
        data.loc[buy_condition, 'signal'] = 1
        
        # 超买卖出条件: 价格接近上轨且RSI超买
        sell_condition = (
            (data['Close'] >= data['bb_upper'] * 0.99) & 
            (data['rsi'] >= rsi_overbought)
        )
        data.loc[sell_condition, 'signal'] = -1
        
        # 计算持仓变化
        data['position'] = data['signal'].diff()
        
        return data
    
    def momentum(self, data: pd.DataFrame, params: Dict = None) -> pd.DataFrame:
        """
        动量策略
        
        Args:
            data: 包含OHLCV数据的DataFrame
            params: 策略参数字典 {'lookback_period': 20, 'threshold': 0.05}
        
        Returns:
            包含交易信号的DataFrame
        """
        if params is None:
            params = {'lookback_period': 20, 'threshold': 0.05}
        
        lookback_period = params.get('lookback_period', 20)
        threshold = params.get('threshold', 0.05)
        
        # 计算动量
        data['momentum'] = data['Close'].pct_change(periods=lookback_period)
        
        # 计算信号
        data['signal'] = 0
        
        # 正动量买入
        data.loc[data['momentum'] > threshold, 'signal'] = 1
        # 负动量卖出
        data.loc[data['momentum'] < -threshold, 'signal'] = -1
        
        # 计算持仓变化
        data['position'] = data['signal'].diff()
        
        return data
    
    def bollinger_bands(self, data: pd.DataFrame, params: Dict = None) -> pd.DataFrame:
        """
        布林带策略
        
        Args:
            data: 包含OHLCV数据的DataFrame
            params: 策略参数字典 {'period': 20, 'std': 2}
        
        Returns:
            包含交易信号的DataFrame
        """
        if params is None:
            params = {'period': 20, 'std': 2}
        
        period = params.get('period', 20)
        std = params.get('std', 2)
        
        # 计算布林带
        data['bb_middle'] = data['Close'].rolling(window=period).mean()
        data['bb_std'] = data['Close'].rolling(window=period).std()
        data['bb_upper'] = data['bb_middle'] + (data['bb_std'] * std)
        data['bb_lower'] = data['bb_middle'] - (data['bb_std'] * std)
        
        # 计算带宽
        data['bb_width'] = (data['bb_upper'] - data['bb_lower']) / data['bb_middle']
        
        # 计算信号
        data['signal'] = 0
        
        # 价格触及下轨买入
        data.loc[data['Close'] <= data['bb_lower'], 'signal'] = 1
        # 价格触及上轨卖出
        data.loc[data['Close'] >= data['bb_upper'], 'signal'] = -1
        
        # 计算持仓变化
        data['position'] = data['signal'].diff()
        
        return data
    
    def rsi_divergence(self, data: pd.DataFrame, params: Dict = None) -> pd.DataFrame:
        """
        RSI背离策略
        
        Args:
            data: 包含OHLCV数据的DataFrame
            params: 策略参数字典 {'period': 14, 'divergence_period': 20}
        
        Returns:
            包含交易信号的DataFrame
        """
        if params is None:
            params = {'period': 14, 'divergence_period': 20}
        
        period = params.get('period', 14)
        divergence_period = params.get('divergence_period', 20)
        
        # 计算RSI
        delta = data['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        data['rsi'] = 100 - (100 / (1 + rs))
        
        # 计算价格和RSI的移动平均
        data['price_ma'] = data['Close'].rolling(window=divergence_period).mean()
        data['rsi_ma'] = data['rsi'].rolling(window=divergence_period).mean()
        
        # 计算信号
        data['signal'] = 0
        
        # 看涨背离: 价格创新低，RSI创新高
        bullish_divergence = (
            (data['Close'] < data['Close'].shift(divergence_period)) &
            (data['rsi'] > data['rsi'].shift(divergence_period)) &
            (data['rsi'] < 40)
        )
        data.loc[bullish_divergence, 'signal'] = 1
        
        # 看跌背离: 价格创新高，RSI创新低
        bearish_divergence = (
            (data['Close'] > data['Close'].shift(divergence_period)) &
            (data['rsi'] < data['rsi'].shift(divergence_period)) &
            (data['rsi'] > 60)
        )
        data.loc[bearish_divergence, 'signal'] = -1
        
        # 计算持仓变化
        data['position'] = data['signal'].diff()
        
        return data
    
    def macd_crossover(self, data: pd.DataFrame, params: Dict = None) -> pd.DataFrame:
        """
        MACD交叉策略
        
        Args:
            data: 包含OHLCV数据的DataFrame
            params: 策略参数字典 {'fast': 12, 'slow': 26, 'signal': 9}
        
        Returns:
            包含交易信号的DataFrame
        """
        if params is None:
            params = {'fast': 12, 'slow': 26, 'signal': 9}
        
        fast = params.get('fast', 12)
        slow = params.get('slow', 26)
        signal = params.get('signal', 9)
        
        # 计算MACD
        exp1 = data['Close'].ewm(span=fast, adjust=False).mean()
        exp2 = data['Close'].ewm(span=slow, adjust=False).mean()
        data['macd'] = exp1 - exp2
        data['macd_signal'] = data['macd'].ewm(span=signal, adjust=False).mean()
        data['macd_histogram'] = data['macd'] - data['macd_signal']
        
        # 计算信号
        data['signal'] = 0
        
        # MACD线上穿信号线买入
        data.loc[
            (data['macd'] > data['macd_signal']) & 
            (data['macd'].shift(1) <= data['macd_signal'].shift(1)), 
            'signal'
        ] = 1
        
        # MACD线下穿信号线卖出
        data.loc[
            (data['macd'] < data['macd_signal']) & 
            (data['macd'].shift(1) >= data['macd_signal'].shift(1)), 
            'signal'
        ] = -1
        
        # 计算持仓变化
        data['position'] = data['signal'].diff()
        
        return data
    
    def execute_strategy(self, strategy_name: str, data: pd.DataFrame, params: Dict = None) -> pd.DataFrame:
        """
        执行指定策略
        
        Args:
            strategy_name: 策略名称
            data: 价格数据
            params: 策略参数
        
        Returns:
            包含交易信号的DataFrame
        """
        if strategy_name not in self.strategies:
            raise ValueError(f"策略 {strategy_name} 不存在")
        
        return self.strategies[strategy_name](data, params)
    
    def get_available_strategies(self) -> List[Dict]:
        """
        获取所有可用策略列表
        
        Returns:
            策略列表
        """
        return [
            {
                'id': 'moving-average-crossover',
                'name': '移动平均交叉',
                'description': '基于快慢移动平均线交叉的趋势跟踪策略',
                'category': 'trend-following',
                'parameters': {
                    'fast_period': {'type': 'int', 'default': 10, 'min': 5, 'max': 50, 'description': '快线周期'},
                    'slow_period': {'type': 'int', 'default': 20, 'min': 10, 'max': 100, 'description': '慢线周期'}
                }
            },
            {
                'id': 'mean-reversion',
                'name': '均值回归',
                'description': '基于布林带和RSI的均值回归策略',
                'category': 'mean-reversion',
                'parameters': {
                    'bb_period': {'type': 'int', 'default': 20, 'min': 10, 'max': 50, 'description': '布林带周期'},
                    'bb_std': {'type': 'float', 'default': 2, 'min': 1, 'max': 3, 'description': '标准差倍数'},
                    'rsi_period': {'type': 'int', 'default': 14, 'min': 10, 'max': 30, 'description': 'RSI周期'},
                    'rsi_overbought': {'type': 'int', 'default': 70, 'min': 60, 'max': 80, 'description': 'RSI超买阈值'},
                    'rsi_oversold': {'type': 'int', 'default': 30, 'min': 20, 'max': 40, 'description': 'RSI超卖阈值'}
                }
            },
            {
                'id': 'momentum',
                'name': '动量策略',
                'description': '基于价格动量的趋势跟踪策略',
                'category': 'momentum',
                'parameters': {
                    'lookback_period': {'type': 'int', 'default': 20, 'min': 10, 'max': 60, 'description': '回望周期'},
                    'threshold': {'type': 'float', 'default': 0.05, 'min': 0.01, 'max': 0.20, 'description': '动量阈值'}
                }
            },
            {
                'id': 'bollinger-bands',
                'name': '布林带策略',
                'description': '基于布林带的均值回归策略',
                'category': 'mean-reversion',
                'parameters': {
                    'period': {'type': 'int', 'default': 20, 'min': 10, 'max': 50, 'description': '布林带周期'},
                    'std': {'type': 'float', 'default': 2, 'min': 1, 'max': 3, 'description': '标准差倍数'}
                }
            },
            {
                'id': 'rsi-divergence',
                'name': 'RSI背离策略',
                'description': '基于RSI背离的反转策略',
                'category': 'oscillator',
                'parameters': {
                    'period': {'type': 'int', 'default': 14, 'min': 10, 'max': 30, 'description': 'RSI周期'},
                    'divergence_period': {'type': 'int', 'default': 20, 'min': 10, 'max': 50, 'description': '背离检测周期'}
                }
            },
            {
                'id': 'macd-crossover',
                'name': 'MACD交叉策略',
                'description': '基于MACD线交叉的趋势跟踪策略',
                'category': 'trend-following',
                'parameters': {
                    'fast': {'type': 'int', 'default': 12, 'min': 8, 'max': 20, 'description': '快EMA周期'},
                    'slow': {'type': 'int', 'default': 26, 'min': 20, 'max': 40, 'description': '慢EMA周期'},
                    'signal': {'type': 'int', 'default': 9, 'min': 5, 'max': 15, 'description': '信号线周期'}
                }
            }
        ]


class BacktestExecutor:
    """
    回测执行器
    用于执行策略回测和计算性能指标
    """
    
    def __init__(self):
        self.default_commission = 0.001  # 0.1%
        self.default_slippage = 0.0005  # 0.05%
    
    def execute_backtest(self, data: pd.DataFrame, signals: pd.DataFrame, 
                        config: Dict = None) -> Dict:
        """
        执行回测
        
        Args:
            data: 价格数据
            signals: 交易信号数据
            config: 回测配置
        
        Returns:
            回测结果字典
        """
        if config is None:
            config = {
                'initial_capital': 100000,
                'commission': self.default_commission,
                'slippage': self.default_slippage
            }
        
        initial_capital = config.get('initial_capital', 100000)
        commission = config.get('commission', self.default_commission)
        slippage = config.get('slippage', self.default_slippage)
        
        # 初始化变量
        capital = initial_capital
        shares = 0
        trades = []
        equity = [initial_capital]
        positions = []
        
        # 执行回测
        for i in range(len(signals)):
            signal = signals.iloc[i]
            price = signal['Close']
            
            if signal['signal'] == 1 and shares == 0:  # 买入信号
                shares_to_buy = int(capital * 0.95 / price)  # 使用95%资金
                if shares_to_buy > 0:
                    cost = shares_to_buy * price * (1 + commission + slippage)
                    capital -= cost
                    shares = shares_to_buy
                    
                    trades.append({
                        'date': signal.name,
                        'type': 'BUY',
                        'shares': shares_to_buy,
                        'price': price,
                        'cost': cost,
                        'capital': capital + shares * price
                    })
            
            elif signal['signal'] == -1 and shares > 0:  # 卖出信号
                proceeds = shares * price * (1 - commission - slippage)
                capital += proceeds
                
                trades.append({
                    'date': signal.name,
                    'type': 'SELL',
                    'shares': shares,
                    'price': price,
                    'proceeds': proceeds,
                    'capital': capital
                })
                
                shares = 0
            
            # 计算当前权益
            current_equity = capital + shares * price
            equity.append(current_equity)
            
            positions.append({
                'date': signal.name,
                'shares': shares,
                'price': price,
                'equity': current_equity,
                'capital': capital,
                'market_value': shares * price
            })
        
        # 平仓最终持仓
        if shares > 0:
            final_price = data['Close'].iloc[-1]
            proceeds = shares * final_price * (1 - commission - slippage)
            capital += proceeds
            
            trades.append({
                'date': data.index[-1],
                'type': 'SELL',
                'shares': shares,
                'price': final_price,
                'proceeds': proceeds,
                'capital': capital
            })
        
        return self.calculate_performance_metrics(equity, trades, positions, config)
    
    def calculate_performance_metrics(self, equity: List[float], trades: List[Dict], 
                                    positions: List[Dict], config: Dict) -> Dict:
        """
        计算性能指标
        
        Args:
            equity: 权益曲线
            trades: 交易记录
            positions: 持仓记录
            config: 配置
        
        Returns:
            性能指标字典
        """
        initial_capital = config.get('initial_capital', 100000)
        final_capital = equity[-1]
        
        # 基础指标
        total_return = (final_capital - initial_capital) / initial_capital
        absolute_return = final_capital - initial_capital
        
        # 计算日收益率
        equity_array = np.array(equity)
        daily_returns = np.diff(equity_array) / equity_array[:-1]
        
        # 风险指标
        mean_return = np.mean(daily_returns)
        volatility = np.std(daily_returns) * np.sqrt(252)  # 年化波动率
        
        # 夏普比率 (假设无风险利率为0%)
        sharpe_ratio = (mean_return * 252) / volatility if volatility > 0 else 0
        
        # 最大回撤
        peak = np.maximum.accumulate(equity_array)
        drawdown = (equity_array - peak) / peak
        max_drawdown = np.min(drawdown)
        
        # 索提诺比率
        negative_returns = daily_returns[daily_returns < 0]
        downside_deviation = np.std(negative_returns) if len(negative_returns) > 0 else 0
        sortino_ratio = (mean_return * 252) / downside_deviation if downside_deviation > 0 else 0
        
        # 卡尔玛比率
        calmar_ratio = (total_return * 252 / 365) / abs(max_drawdown) if max_drawdown != 0 else 0
        
        # 交易统计
        sell_trades = [t for t in trades if t['type'] == 'SELL']
        winning_trades = len([t for t in sell_trades if t['proceeds'] > 0])
        total_trades = len(sell_trades)
        win_rate = winning_trades / total_trades if total_trades > 0 else 0
        
        return {
            'summary': {
                'initial_capital': initial_capital,
                'final_capital': final_capital,
                'total_return': total_return * 100,
                'absolute_return': absolute_return,
                'sharpe_ratio': sharpe_ratio,
                'sortino_ratio': sortino_ratio,
                'calmar_ratio': calmar_ratio,
                'max_drawdown': max_drawdown * 100,
                'volatility': volatility * 100,
                'win_rate': win_rate * 100,
                'total_trades': total_trades
            },
            'equity': equity,
            'trades': trades,
            'positions': positions,
            'daily_returns': daily_returns.tolist(),
            'metrics': {
                'sharpe_ratio': sharpe_ratio,
                'sortino_ratio': sortino_ratio,
                'calmar_ratio': calmar_ratio,
                'max_drawdown': max_drawdown,
                'volatility': volatility,
                'win_rate': win_rate
            }
        }


class DataProcessor:
    """
    数据处理器
    用于获取和处理市场数据
    """
    
    def __init__(self):
        self.data_cache = {}
    
    def get_data(self, symbol: str, start_date: str, end_date: str) -> pd.DataFrame:
        """
        获取股票数据
        
        Args:
            symbol: 股票代码
            start_date: 开始日期
            end_date: 结束日期
        
        Returns:
            包含OHLCV数据的DataFrame
        """
        try:
            data = yf.download(symbol, start=start_date, end=end_date)
            if data.empty:
                raise ValueError(f"无法获取 {symbol} 的数据")
            return data
        except Exception as e:
            print(f"获取数据时出错: {str(e)}")
            return pd.DataFrame()
    
    def prepare_data(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        准备数据用于策略分析
        
        Args:
            data: 原始OHLCV数据
        
        Returns:
            处理后的数据
        """
        # 确保数据按日期排序
        data = data.sort_index()
        
        # 计算收益率
        data['returns'] = data['Close'].pct_change()
        
        # 计算对数收益率
        data['log_returns'] = np.log(data['Close']).diff()
        
        # 计算成交量指标
        data['volume_ma'] = data['Volume'].rolling(window=20).mean()
        data['volume_ratio'] = data['Volume'] / data['volume_ma']
        
        return data


class StrategyVisualizer:
    """
    策略可视化器
    用于创建策略分析图表
    """
    
    def __init__(self):
        self.colors = {
            'buy': '#2E8B57',      # 绿色
            'sell': '#DC143C',     # 红色
            'price': '#1f77b4',    # 蓝色
            'signal': '#ff7f0e'    # 橙色
        }
    
    def plot_strategy_signals(self, data: pd.DataFrame, signals: pd.DataFrame, 
                            title: str = "策略信号图"):
        """
        绘制策略信号图
        
        Args:
            data: 价格数据
            signals: 信号数据
            title: 图表标题
        """
        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(15, 10), sharex=True)
        
        # 价格和信号图
        ax1.plot(data.index, data['Close'], label='收盘价', color=self.colors['price'], linewidth=1)
        
        # 标记买入信号
        buy_signals = signals[signals['signal'] == 1]
        ax1.scatter(buy_signals.index, buy_signals['Close'], 
                   color=self.colors['buy'], marker='^', s=100, label='买入信号', alpha=0.7)
        
        # 标记卖出信号
        sell_signals = signals[signals['signal'] == -1]
        ax1.scatter(sell_signals.index, sell_signals['Close'], 
                   color=self.colors['sell'], marker='v', s=100, label='卖出信号', alpha=0.7)
        
        ax1.set_title(title, fontsize=16, fontweight='bold')
        ax1.set_ylabel('价格', fontsize=12)
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        # 成交量图
        ax2.bar(data.index, data['Volume'], alpha=0.6, color='gray', label='成交量')
        ax2.set_ylabel('成交量', fontsize=12)
        ax2.set_xlabel('日期', fontsize=12)
        ax2.legend()
        ax2.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()
    
    def plot_performance_metrics(self, results: Dict, title: str = "策略性能指标"):
        """
        绘制性能指标图
        
        Args:
            results: 回测结果
            title: 图表标题
        """
        metrics = results['summary']
        
        # 创建子图
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 10))
        
        # 权益曲线
        equity = results['equity']
        ax1.plot(equity, label='投资组合价值', color=self.colors['price'], linewidth=2)
        ax1.set_title('投资组合价值变化', fontweight='bold')
        ax1.set_ylabel('价值')
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        # 收益率分布
        daily_returns = results['daily_returns']
        ax2.hist(daily_returns, bins=50, alpha=0.7, color=self.colors['signal'])
        ax2.set_title('日收益率分布', fontweight='bold')
        ax2.set_xlabel('日收益率')
        ax2.set_ylabel('频次')
        ax2.grid(True, alpha=0.3)
        
        # 回撤图
        equity_array = np.array(equity)
        peak = np.maximum.accumulate(equity_array)
        drawdown = (equity_array - peak) / peak * 100
        
        ax3.fill_between(range(len(drawdown)), drawdown, 0, 
                        color='red', alpha=0.3, label='回撤')
        ax3.plot(drawdown, color='red', linewidth=1)
        ax3.set_title('回撤分析', fontweight='bold')
        ax3.set_ylabel('回撤 (%)')
        ax3.legend()
        ax3.grid(True, alpha=0.3)
        
        # 关键指标
        key_metrics = [
            f"总收益率: {metrics['total_return']:.2f}%",
            f"夏普比率: {metrics['sharpe_ratio']:.2f}",
            f"最大回撤: {metrics['max_drawdown']:.2f}%",
            f"胜率: {metrics['win_rate']:.2f}%",
            f"总交易次数: {metrics['total_trades']}"
        ]
        
        ax4.text(0.1, 0.9, '\n'.join(key_metrics), transform=ax4.transAxes,
                fontsize=12, verticalalignment='top', fontweight='bold')
        ax4.set_title('关键指标', fontweight='bold')
        ax4.axis('off')
        
        plt.suptitle(title, fontsize=16, fontweight='bold')
        plt.tight_layout()
        plt.show()


def example():
    """
    使用示例
    """
    print("=== 算法交易策略代码包 - Python版本 ===\n")
    
    # 创建策略实例
    strategies = TradingStrategies()
    backtest = BacktestExecutor()
    data_processor = DataProcessor()
    visualizer = StrategyVisualizer()
    
    # 获取数据
    print("1. 获取市场数据...")
    symbol = "AAPL"
    start_date = "2023-01-01"
    end_date = "2023-12-31"
    
    data = data_processor.get_data(symbol, start_date, end_date)
    if data.empty:
        print("无法获取数据，使用示例数据...")
        # 创建示例数据
        dates = pd.date_range(start=start_date, end=end_date, freq='D')
        np.random.seed(42)
        prices = 100 + np.cumsum(np.random.randn(len(dates)) * 0.02)
        data = pd.DataFrame({
            'Open': prices * 0.99,
            'High': prices * 1.01,
            'Low': prices * 0.98,
            'Close': prices,
            'Volume': np.random.randint(1000000, 10000000, len(dates))
        }, index=dates)
    
    data = data_processor.prepare_data(data)
    print(f"数据获取完成，共 {len(data)} 条记录")
    
    # 执行移动平均交叉策略
    print("\n2. 执行移动平均交叉策略...")
    signals = strategies.execute_strategy('moving-average-crossover', data, {
        'fast_period': 10,
        'slow_period': 20
    })
    
    # 执行回测
    print("3. 执行回测...")
    results = backtest.execute_backtest(data, signals, {
        'initial_capital': 100000,
        'commission': 0.001,
        'slippage': 0.0005
    })
    
    # 显示结果
    print("\n4. 回测结果:")
    print("=" * 50)
    for metric, value in results['summary'].items():
        if isinstance(value, float):
            print(f"{metric}: {value:.4f}")
        else:
            print(f"{metric}: {value}")
    
    # 创建可视化
    print("\n5. 创建可视化图表...")
    visualizer.plot_strategy_signals(data, signals, f"{symbol} 移动平均交叉策略")
    visualizer.plot_performance_metrics(results, f"{symbol} 策略性能分析")
    
    # 获取所有可用策略
    print("\n6. 可用策略列表:")
    available_strategies = strategies.get_available_strategies()
    for strategy in available_strategies:
        print(f"- {strategy['name']} ({strategy['id']}): {strategy['description']}")
    
    print("\n=== 示例完成 ===")


# 导出模块
__all__ = ['TradingStrategies', 'BacktestExecutor', 'DataProcessor', 'StrategyVisualizer', 'example']

# 如果直接运行此文件，执行示例
if __name__ == "__main__":
    example()
