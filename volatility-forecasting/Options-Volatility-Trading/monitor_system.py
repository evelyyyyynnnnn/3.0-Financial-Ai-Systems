#!/usr/bin/env python3
"""
MarketWatcher系统监控脚本
用于查看系统运行状态和检测到的投资机会
"""

import sys
import os
import time
import json
sys.path.append('src')

from market_watcher.common import get_terget_stocks, MarketWatcherEngine
from market_watcher.config import context

def monitor_system():
    """监控MarketWatcher系统运行状态"""
    
    print("🔍 MarketWatcher 系统监控")
    print("=" * 50)
    
    # 检查系统状态
    try:
        with open('src/market_watcher/state.json', 'r') as f:
            state = json.load(f)
        
        print(f"系统状态: {'🟢 运行中' if state['running'] else '🔴 已停止'}")
        print(f"Email通知: {'✅ 启用' if state['email'] else '❌ 禁用'}")
        print(f"Slack通知: {'✅ 启用' if state['slack'] else '❌ 禁用'}")
        print()
        
    except Exception as e:
        print(f"❌ 无法读取系统状态: {e}")
        return
    
    # 读取目标股票
    try:
        target_stocks = get_terget_stocks("src/market_watcher/research/target_stocks.yaml")
        print(f"📊 监控股票数量: {len(target_stocks)} 只")
        
        long_count = sum(1 for info in target_stocks.values() if info['strategy'] == 'long straddle')
        short_count = sum(1 for info in target_stocks.values() if info['strategy'] == 'short straddle')
        
        print(f"   - Long Straddle 策略: {long_count} 只")
        print(f"   - Short Straddle 策略: {short_count} 只")
        print()
        
    except Exception as e:
        print(f"❌ 无法读取股票列表: {e}")
        return
    
    # 创建引擎进行实时检测
    try:
        engine = MarketWatcherEngine(target_stocks=target_stocks, notifiers=[])
        print(f"🎯 交易阈值设置:")
        print(f"   - Long Straddle 触发: > {engine.long_threshlold * 100}%")
        print(f"   - Short Straddle 触发: < {engine.short_threshlold * 100}%")
        print()
        
        print("🔄 开始实时监控...")
        print("按 Ctrl+C 停止监控")
        print("-" * 50)
        
        iteration = 0
        while True:
            iteration += 1
            print(f"\n📅 第 {iteration} 次检查 - {time.strftime('%Y-%m-%d %H:%M:%S')}")
            
            try:
                # 获取市场数据
                print("📈 获取市场数据...")
                daily_pnls = engine.get_daily_pnls()
                
                if not daily_pnls:
                    print("⚠️  无法获取市场数据，请检查网络连接")
                    time.sleep(60)  # 等待1分钟再试
                    continue
                
                # 分析投资机会
                opportunities = []
                for ticker, pnl in daily_pnls.items():
                    if pnl is not None and engine.is_investment_opportunity(
                        target_stocks[ticker]["strategy"], abs(pnl)
                    ):
                        opportunities.append((ticker, pnl, target_stocks[ticker]["strategy"]))
                
                # 显示结果
                if opportunities:
                    print(f"🚨 发现 {len(opportunities)} 个投资机会!")
                    
                    long_opps = [opp for opp in opportunities if opp[2] == 'long straddle']
                    short_opps = [opp for opp in opportunities if opp[2] == 'short straddle']
                    
                    if long_opps:
                        print("\n📈 Long Straddle 机会:")
                        for ticker, pnl, strategy in sorted(long_opps, key=lambda x: abs(x[1]), reverse=True):
                            direction = "📈" if pnl > 0 else "📉"
                            print(f"   {ticker}: {pnl*100:.2f}% {direction}")
                    
                    if short_opps:
                        print("\n📉 Short Straddle 机会:")
                        for ticker, pnl, strategy in sorted(short_opps, key=lambda x: abs(x[1]), reverse=False):
                            direction = "📈" if pnl > 0 else "📉"
                            print(f"   {ticker}: {pnl*100:.2f}% {direction}")
                else:
                    print("✅ 当前无符合策略的投资机会")
                
                # 显示一些当前市场概况
                print(f"\n📊 市场概况 (前10只股票):")
                sorted_stocks = sorted([(k, v) for k, v in daily_pnls.items() if v is not None], 
                                     key=lambda x: abs(x[1]), reverse=True)[:10]
                
                for ticker, pnl in sorted_stocks:
                    direction = "📈" if pnl > 0 else "📉"
                    strategy = target_stocks[ticker]["strategy"]
                    print(f"   {ticker}: {pnl*100:.2f}% {direction} ({strategy})")
                
                print(f"\n⏰ 下次检查时间: {time.strftime('%H:%M:%S', time.localtime(time.time() + 300))}")
                
            except Exception as e:
                print(f"❌ 检查过程中出错: {e}")
            
            # 等待5分钟（与系统设置一致）
            time.sleep(300)
            
    except KeyboardInterrupt:
        print("\n\n👋 监控已停止")
    except Exception as e:
        print(f"❌ 监控过程中出错: {e}")

if __name__ == "__main__":
    monitor_system()


