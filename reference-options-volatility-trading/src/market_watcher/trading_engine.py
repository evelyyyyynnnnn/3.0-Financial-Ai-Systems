#!/usr/bin/env python3
"""
交易引擎 - 核心交易逻辑实现
"""

from typing import Dict, List, Optional
from datetime import datetime
from enum import Enum
import yaml

from .data_fetcher import DataFetcher

class Strategy(Enum):
    """交易策略枚举"""
    LONG_STRADDLE = "long straddle"
    SHORT_STRADDLE = "short straddle"

class TradingEngine:
    """交易引擎"""
    
    def __init__(self, config: Dict):
        """
        初始化交易引擎
        
        Args:
            config: 配置字典，包含阈值等参数
        """
        self.config = config
        self.data_fetcher = DataFetcher()
        
        # 交易阈值
        self.long_threshold = config.get('long_threshold', 0.05)  # 5%
        self.short_threshold = config.get('short_threshold', 0.005)  # 0.5%
        
        # 股票列表
        self.target_stocks = {}
        self.stock_strategies = {}
        
        # 交易历史
        self.trading_history = []
        
    def load_target_stocks(self, file_path: str) -> Dict:
        """
        加载目标股票列表
        
        Args:
            file_path: YAML文件路径
            
        Returns:
            股票配置字典
        """
        try:
            with open(file_path, 'r') as f:
                stocks_config = yaml.load(f, Loader=yaml.FullLoader)
            
            self.target_stocks = stocks_config
            self.stock_strategies = {
                ticker: info['strategy'] 
                for ticker, info in stocks_config.items()
            }
            
            return stocks_config
            
        except Exception as e:
            print(f"Error loading target stocks: {e}")
            return {}
    
    def get_market_data(self) -> Dict[str, Dict]:
        """
        获取市场数据
        
        Returns:
            市场数据字典
        """
        tickers = list(self.target_stocks.keys())
        return self.data_fetcher.get_current_data(tickers)
    
    def analyze_opportunities(self, market_data: Dict[str, Dict]) -> Dict[str, List[Dict]]:
        """
        分析投资机会
        
        Args:
            market_data: 市场数据
            
        Returns:
            投资机会字典
        """
        opportunities = {
            Strategy.LONG_STRADDLE.value: [],
            Strategy.SHORT_STRADDLE.value: []
        }
        
        for ticker, data in market_data.items():
            if not data.get('data_available', False):
                continue
                
            change_percent = abs(data['change_percent']) / 100  # 转换为小数
            strategy = self.stock_strategies.get(ticker)
            
            if strategy == Strategy.LONG_STRADDLE.value:
                # Long Straddle: 高波动率股票，涨跌幅 > 5%
                if change_percent > self.long_threshold:
                    opportunity = {
                        'ticker': ticker,
                        'change_percent': data['change_percent'],
                        'current_price': data['current_price'],
                        'volume': data['volume'],
                        'strategy': strategy,
                        'threshold': self.long_threshold * 100,
                        'timestamp': data['timestamp'],
                        'direction': 'UP' if data['change_percent'] > 0 else 'DOWN'
                    }
                    opportunities[Strategy.LONG_STRADDLE.value].append(opportunity)
            
            elif strategy == Strategy.SHORT_STRADDLE.value:
                # Short Straddle: 低波动率股票，涨跌幅 < 0.5%
                if change_percent < self.short_threshold:
                    opportunity = {
                        'ticker': ticker,
                        'change_percent': data['change_percent'],
                        'current_price': data['current_price'],
                        'volume': data['volume'],
                        'strategy': strategy,
                        'threshold': self.short_threshold * 100,
                        'timestamp': data['timestamp'],
                        'direction': 'UP' if data['change_percent'] > 0 else 'DOWN'
                    }
                    opportunities[Strategy.SHORT_STRADDLE.value].append(opportunity)
        
        # 按涨跌幅排序
        opportunities[Strategy.LONG_STRADDLE.value].sort(
            key=lambda x: abs(x['change_percent']), reverse=True
        )
        opportunities[Strategy.SHORT_STRADDLE.value].sort(
            key=lambda x: abs(x['change_percent']), reverse=False
        )
        
        return opportunities
    
    def generate_trading_signals(self, opportunities: Dict[str, List[Dict]]) -> Dict:
        """
        生成交易信号
        
        Args:
            opportunities: 投资机会
            
        Returns:
            交易信号字典
        """
        signals = {
            'timestamp': datetime.now().isoformat(),
            'long_straddle_signals': len(opportunities[Strategy.LONG_STRADDLE.value]),
            'short_straddle_signals': len(opportunities[Strategy.SHORT_STRADDLE.value]),
            'total_signals': 0,
            'signals': []
        }
        
        # 处理Long Straddle信号
        for opp in opportunities[Strategy.LONG_STRADDLE.value]:
            signal = {
                'type': 'LONG_STRADDLE',
                'action': 'BUY_CALL_PUT',  # 买入看涨和看跌期权
                'ticker': opp['ticker'],
                'current_price': opp['current_price'],
                'change_percent': opp['change_percent'],
                'volume': opp['volume'],
                'reason': f"High volatility detected: {abs(opp['change_percent']):.2f}% > {opp['threshold']:.1f}%",
                'timestamp': opp['timestamp'],
                'direction': opp['direction']
            }
            signals['signals'].append(signal)
        
        # 处理Short Straddle信号
        for opp in opportunities[Strategy.SHORT_STRADDLE.value]:
            signal = {
                'type': 'SHORT_STRADDLE',
                'action': 'SELL_CALL_PUT',  # 卖出看涨和看跌期权
                'ticker': opp['ticker'],
                'current_price': opp['current_price'],
                'change_percent': opp['change_percent'],
                'volume': opp['volume'],
                'reason': f"Low volatility detected: {abs(opp['change_percent']):.2f}% < {opp['threshold']:.1f}%",
                'timestamp': opp['timestamp'],
                'direction': opp['direction']
            }
            signals['signals'].append(signal)
        
        signals['total_signals'] = len(signals['signals'])
        
        return signals
    
    def execute_trading_cycle(self) -> Dict:
        """
        执行完整的交易周期
        
        Returns:
            交易结果字典
        """
        print(f"\n🔄 执行交易周期 - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        # 1. 获取市场数据
        print("📊 步骤1: 获取市场数据...")
        market_data = self.get_market_data()
        available_stocks = sum(1 for data in market_data.values() if data.get('data_available'))
        print(f"   ✅ 成功获取 {available_stocks}/{len(market_data)} 只股票数据")
        
        # 2. 分析投资机会
        print("\n🎯 步骤2: 分析投资机会...")
        opportunities = self.analyze_opportunities(market_data)
        long_count = len(opportunities[Strategy.LONG_STRADDLE.value])
        short_count = len(opportunities[Strategy.SHORT_STRADDLE.value])
        print(f"   📈 Long Straddle 机会: {long_count} 个")
        print(f"   📉 Short Straddle 机会: {short_count} 个")
        
        # 3. 生成交易信号
        print("\n⚡ 步骤3: 生成交易信号...")
        signals = self.generate_trading_signals(opportunities)
        print(f"   🎯 总信号数量: {signals['total_signals']} 个")
        
        # 4. 记录交易历史
        trading_record = {
            'timestamp': datetime.now().isoformat(),
            'market_data': market_data,
            'opportunities': opportunities,
            'signals': signals
        }
        self.trading_history.append(trading_record)
        
        # 5. 返回结果
        result = {
            'success': True,
            'timestamp': datetime.now().isoformat(),
            'market_summary': {
                'total_stocks': len(market_data),
                'available_stocks': available_stocks,
                'long_opportunities': long_count,
                'short_opportunities': short_count
            },
            'opportunities': opportunities,
            'signals': signals,
            'market_data': market_data
        }
        
        return result


