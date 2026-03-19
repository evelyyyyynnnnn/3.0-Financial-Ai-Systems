#!/usr/bin/env python3
"""
完整的交易系统演示 - 展示从输入到输出的完整流程
"""

import sys
import os
sys.path.append('src')

from market_watcher.trading_engine import TradingEngine
from market_watcher.data_fetcher import DataFetcher
import json
from datetime import datetime

def print_header(title):
    """打印标题"""
    print("\n" + "=" * 80)
    print(f"🎯 {title}")
    print("=" * 80)

def print_section(title):
    """打印章节标题"""
    print(f"\n📋 {title}")
    print("-" * 60)

def print_input_output(input_data, output_data, title):
    """打印输入输出对比"""
    print(f"\n🔄 {title}")
    print("输入 (INPUT):")
    print(json.dumps(input_data, indent=2, ensure_ascii=False))
    print("\n输出 (OUTPUT):")
    print(json.dumps(output_data, indent=2, ensure_ascii=False))

def main():
    """主函数 - 演示完整的交易流程"""
    
    print_header("量化交易系统完整演示")
    print("展示从输入到输出的完整交易逻辑")
    
    # ==================== 输入配置 ====================
    print_section("1. 系统输入配置")
    
    # 交易配置
    trading_config = {
        'long_threshold': 0.05,    # 5% - Long Straddle触发阈值
        'short_threshold': 0.005,  # 0.5% - Short Straddle触发阈值
        'update_interval': 300,    # 5分钟更新间隔
        'max_stocks': 100          # 最大监控股票数量
    }
    
    # 股票列表文件路径
    stocks_file = "src/market_watcher/research/target_stocks.yaml"
    
    print("📊 交易配置:")
    for key, value in trading_config.items():
        print(f"   • {key}: {value}")
    
    print(f"\n📁 股票列表文件: {stocks_file}")
    
    # ==================== 初始化系统 ====================
    print_section("2. 系统初始化")
    
    # 创建交易引擎
    engine = TradingEngine(trading_config)
    
    # 加载目标股票
    print("📈 加载目标股票...")
    stocks_config = engine.load_target_stocks(stocks_file)
    
    print(f"   ✅ 成功加载 {len(stocks_config)} 只股票")
    
    # 显示股票分类
    long_stocks = [ticker for ticker, info in stocks_config.items() 
                   if info['strategy'] == 'long straddle']
    short_stocks = [ticker for ticker, info in stocks_config.items() 
                    if info['strategy'] == 'short straddle']
    
    print(f"   📈 Long Straddle 股票: {len(long_stocks)} 只")
    print(f"   📉 Short Straddle 股票: {len(short_stocks)} 只")
    
    print(f"\n   Long Straddle 示例: {long_stocks[:5]}")
    print(f"   Short Straddle 示例: {short_stocks[:5]}")
    
    # ==================== 数据获取 ====================
    print_section("3. 市场数据获取")
    
    # 创建数据获取器
    data_fetcher = DataFetcher()
    
    # 测试获取少量股票数据
    test_tickers = ['AAPL', 'TSLA', 'GME', 'AMC', 'JNJ']
    print(f"📊 测试获取数据: {test_tickers}")
    
    market_data = data_fetcher.get_current_data(test_tickers)
    
    print("\n📈 获取到的市场数据:")
    for ticker, data in market_data.items():
        if data.get('data_available'):
            direction = "📈" if data['change_percent'] > 0 else "📉"
            print(f"   {ticker}: ${data['current_price']:.2f} ({data['change_percent']:+.2f}%) {direction}")
        else:
            print(f"   {ticker}: ❌ 数据不可用 - {data.get('error', 'Unknown error')}")
    
    # ==================== 交易分析 ====================
    print_section("4. 交易机会分析")
    
    # 创建测试用的股票配置
    test_stocks_config = {
        'AAPL': {'strategy': 'long straddle'},
        'TSLA': {'strategy': 'long straddle'},
        'GME': {'strategy': 'long straddle'},
        'AMC': {'strategy': 'long straddle'},
        'JNJ': {'strategy': 'short straddle'}
    }
    
    # 临时设置测试配置
    engine.target_stocks = test_stocks_config
    engine.stock_strategies = {ticker: info['strategy'] for ticker, info in test_stocks_config.items()}
    
    # 分析投资机会
    opportunities = engine.analyze_opportunities(market_data)
    
    print("🎯 分析结果:")
    
    # Long Straddle 机会
    long_opps = opportunities['long straddle']
    print(f"\n📈 Long Straddle 机会 ({len(long_opps)} 个):")
    for opp in long_opps:
        print(f"   {opp['ticker']}: {opp['change_percent']:+.2f}% (阈值: >{opp['threshold']:.1f}%)")
    
    # Short Straddle 机会
    short_opps = opportunities['short straddle']
    print(f"\n📉 Short Straddle 机会 ({len(short_opps)} 个):")
    for opp in short_opps:
        print(f"   {opp['ticker']}: {opp['change_percent']:+.2f}% (阈值: <{opp['threshold']:.1f}%)")
    
    # ==================== 交易信号生成 ====================
    print_section("5. 交易信号生成")
    
    signals = engine.generate_trading_signals(opportunities)
    
    print(f"⚡ 生成交易信号: {signals['total_signals']} 个")
    print(f"   📈 Long Straddle 信号: {signals['long_straddle_signals']} 个")
    print(f"   📉 Short Straddle 信号: {signals['short_straddle_signals']} 个")
    
    print("\n🎯 详细交易信号:")
    for signal in signals['signals']:
        action_emoji = "🟢 买入" if signal['action'] == 'BUY_CALL_PUT' else "🔴 卖出"
        print(f"   {action_emoji} {signal['ticker']} - {signal['type']}")
        print(f"      价格: ${signal['current_price']:.2f}, 涨跌幅: {signal['change_percent']:+.2f}%")
        print(f"      原因: {signal['reason']}")
    
    # ==================== 完整交易周期 ====================
    print_section("6. 完整交易周期执行")
    
    # 执行完整交易周期
    result = engine.execute_trading_cycle()
    
    # ==================== 输出总结 ====================
    print_section("7. 最终输出总结")
    
    print("📊 交易系统输出:")
    print(f"   ✅ 执行状态: {'成功' if result['success'] else '失败'}")
    print(f"   ⏰ 执行时间: {result['timestamp']}")
    print(f"   📈 监控股票: {result['market_summary']['total_stocks']} 只")
    print(f"   💹 可用数据: {result['market_summary']['available_stocks']} 只")
    print(f"   🎯 Long Straddle 机会: {result['market_summary']['long_opportunities']} 个")
    print(f"   🎯 Short Straddle 机会: {result['market_summary']['short_opportunities']} 个")
    print(f"   ⚡ 交易信号: {result['signals']['total_signals']} 个")
    
    # ==================== 输入输出对比 ====================
    print_section("8. 输入 vs 输出对比")
    
    # 输入数据
    input_data = {
        "trading_config": trading_config,
        "target_stocks_file": stocks_file,
        "total_stocks": len(stocks_config),
        "long_stocks": len(long_stocks),
        "short_stocks": len(short_stocks)
    }
    
    # 输出数据
    output_data = {
        "execution_result": result['success'],
        "market_summary": result['market_summary'],
        "trading_signals": {
            "total": result['signals']['total_signals'],
            "long_straddle": result['signals']['long_straddle_signals'],
            "short_straddle": result['signals']['short_straddle_signals']
        },
        "detailed_signals": result['signals']['signals']
    }
    
    print_input_output(input_data, output_data, "系统输入输出对比")
    
    # ==================== 系统架构说明 ====================
    print_section("9. 系统架构说明")
    
    print("🏗️ 系统架构:")
    print("   输入 → 数据获取 → 机会分析 → 信号生成 → 输出")
    print("\n📋 各模块功能:")
    print("   • DataFetcher: 从Yahoo Finance获取实时股票数据")
    print("   • TradingEngine: 核心交易逻辑和信号生成")
    print("   • 配置管理: 交易阈值和股票列表")
    print("   • 结果输出: 交易信号和投资机会")
    
    print("\n🎯 交易策略逻辑:")
    print("   • Long Straddle: 高波动率股票 + 涨跌幅 > 5% → 买入看涨看跌期权")
    print("   • Short Straddle: 低波动率股票 + 涨跌幅 < 0.5% → 卖出看涨看跌期权")
    
    print_header("演示完成")
    print("✅ 完整的交易系统演示已完成")
    print("📊 从输入配置到输出信号的完整流程已展示")

if __name__ == "__main__":
    main()


