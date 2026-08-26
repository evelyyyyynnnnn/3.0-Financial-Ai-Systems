#!/bin/bash

# MarketWatcher Web Application Startup Script
# 期权波动率交易系统Web应用启动脚本

echo "🌐 MarketWatcher Web Application"
echo "================================"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run setup first."
    exit 1
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Check if MarketWatcher CLI is running
echo "🔍 Checking MarketWatcher system status..."
if pgrep -f "market_watcher_cli" > /dev/null; then
    echo "✅ MarketWatcher CLI is running"
else
    echo "⚠️  MarketWatcher CLI is not running. Starting it now..."
    cd "/Users/evelyndu/Desktop/To-do/编程/量化系统开发/ibkr-options-volatility-trading-main"
    nohup market_watcher_cli start > market_watcher.log 2>&1 &
    echo "✅ MarketWatcher CLI started in background"
fi

# Start Web Application
echo "🚀 Starting Web Application..."
cd webapp
python app.py


