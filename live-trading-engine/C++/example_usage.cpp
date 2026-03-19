#include <iostream>
#include <memory>
#include <thread>
#include <chrono>

#include "authentication.h"
#include "Algo-Trading/data-download/historical_data.h"
#include "Algo-Trading/strategy/factor_strategy.h"
#include "Algo-Trading/execution/order_executor.h"
#include "Algo-Trading/performance/performance_monitor.h"

using namespace AlpacaTrading;

// Example: Simple momentum strategy backtest
void runSimpleBacktest() {
    std::cout << "=== Simple Momentum Strategy Backtest ===" << std::endl;
    
    // Initialize authentication
    initializeAuth();
    
    // Create backtest engine
    BacktestEngine backtest;
    backtest.initialize(100000.0, "2023-01-01", "2023-12-31");
    backtest.setCommission(1.0);
    backtest.setSlippage(5.0);
    
    // Create momentum strategy
    auto momentum_strategy = std::make_shared<MomentumStrategy>();
    std::map<std::string, double> params;
    params["lookback_period"] = 20;
    params["momentum_threshold"] = 0.02;
    params["position_size"] = 0.1;
    params["max_positions"] = 5;
    momentum_strategy->initialize(params);
    
    backtest.addStrategy(momentum_strategy);
    
    // Download historical data
    HistoricalDataDownloader downloader;
    std::vector<std::string> symbols = {"AAPL", "MSFT", "GOOGL"};
    
    std::cout << "Downloading historical data..." << std::endl;
    auto historical_data = downloader.downloadMultipleBars(symbols, "1Min", 500);
    
    // Combine all data
    std::vector<BarData> all_bars;
    for (const auto& pair : historical_data) {
        all_bars.insert(all_bars.end(), pair.second.begin(), pair.second.end());
    }
    
    if (all_bars.empty()) {
        std::cout << "No historical data available" << std::endl;
        return;
    }
    
    std::cout << "Running backtest with " << all_bars.size() << " bars..." << std::endl;
    
    // Run backtest
    auto metrics = backtest.runBacktest(all_bars);
    
    // Print results
    std::cout << "\n=== Backtest Results ===" << std::endl;
    std::cout << "Total Return: " << metrics.total_return * 100 << "%" << std::endl;
    std::cout << "Annualized Return: " << metrics.annualized_return * 100 << "%" << std::endl;
    std::cout << "Volatility: " << metrics.volatility * 100 << "%" << std::endl;
    std::cout << "Sharpe Ratio: " << metrics.sharpe_ratio << std::endl;
    std::cout << "Max Drawdown: " << metrics.max_drawdown * 100 << "%" << std::endl;
    std::cout << "Win Rate: " << metrics.win_rate * 100 << "%" << std::endl;
    std::cout << "Total Trades: " << metrics.total_trades << std::endl;
    std::cout << "Net Profit: $" << metrics.net_profit << std::endl;
}

// Example: Multi-strategy backtest
void runMultiStrategyBacktest() {
    std::cout << "\n=== Multi-Strategy Backtest ===" << std::endl;
    
    // Initialize authentication
    initializeAuth();
    
    // Create backtest engine
    BacktestEngine backtest;
    backtest.initialize(100000.0, "2023-01-01", "2023-12-31");
    
    // Add multiple strategies
    auto momentum_strategy = std::make_shared<MomentumStrategy>();
    std::map<std::string, double> momentum_params;
    momentum_params["lookback_period"] = 20;
    momentum_params["momentum_threshold"] = 0.02;
    momentum_strategy->initialize(momentum_params);
    backtest.addStrategy(momentum_strategy);
    
    auto mean_reversion_strategy = std::make_shared<MeanReversionStrategy>();
    std::map<std::string, double> mr_params;
    mr_params["lookback_period"] = 20;
    mr_params["zscore_threshold"] = 2.0;
    mean_reversion_strategy->initialize(mr_params);
    backtest.addStrategy(mean_reversion_strategy);
    
    auto volume_breakout_strategy = std::make_shared<VolumeBreakoutStrategy>();
    std::map<std::string, double> vb_params;
    vb_params["lookback_period"] = 20;
    vb_params["volume_multiplier"] = 2.0;
    vb_params["price_threshold"] = 0.01;
    volume_breakout_strategy->initialize(vb_params);
    backtest.addStrategy(volume_breakout_strategy);
    
    // Download data
    HistoricalDataDownloader downloader;
    std::vector<std::string> symbols = {"AAPL", "MSFT", "GOOGL", "TSLA", "NVDA"};
    auto historical_data = downloader.downloadMultipleBars(symbols, "1Min", 1000);
    
    // Combine data
    std::vector<BarData> all_bars;
    for (const auto& pair : historical_data) {
        all_bars.insert(all_bars.end(), pair.second.begin(), pair.second.end());
    }
    
    if (all_bars.empty()) {
        std::cout << "No historical data available" << std::endl;
        return;
    }
    
    std::cout << "Running multi-strategy backtest..." << std::endl;
    
    // Run backtest
    auto metrics = backtest.runBacktest(all_bars);
    
    // Print results
    std::cout << "\n=== Multi-Strategy Results ===" << std::endl;
    std::cout << "Total Return: " << metrics.total_return * 100 << "%" << std::endl;
    std::cout << "Sharpe Ratio: " << metrics.sharpe_ratio << std::endl;
    std::cout << "Max Drawdown: " << metrics.max_drawdown * 100 << "%" << std::endl;
    std::cout << "Win Rate: " << metrics.win_rate * 100 << "%" << std::endl;
    std::cout << "Total Trades: " << metrics.total_trades << std::endl;
}

// Example: Strategy performance comparison
void compareStrategies() {
    std::cout << "\n=== Strategy Performance Comparison ===" << std::endl;
    
    // Initialize authentication
    initializeAuth();
    
    // Download data
    HistoricalDataDownloader downloader;
    std::vector<std::string> symbols = {"AAPL", "MSFT", "GOOGL"};
    auto historical_data = downloader.downloadMultipleBars(symbols, "1Min", 500);
    
    // Combine data
    std::vector<BarData> all_bars;
    for (const auto& pair : historical_data) {
        all_bars.insert(all_bars.end(), pair.second.begin(), pair.second.end());
    }
    
    if (all_bars.empty()) {
        std::cout << "No historical data available" << std::endl;
        return;
    }
    
    // Test each strategy individually
    std::vector<std::pair<std::string, std::shared_ptr<FactorStrategy>>> strategies = {
        {"Momentum", std::make_shared<MomentumStrategy>()},
        {"Mean Reversion", std::make_shared<MeanReversionStrategy>()},
        {"Volume Breakout", std::make_shared<VolumeBreakoutStrategy>()}
    };
    
    // Initialize strategies
    std::map<std::string, double> params;
    params["lookback_period"] = 20;
    params["position_size"] = 0.1;
    
    for (auto& pair : strategies) {
        if (pair.first == "Momentum") {
            params["momentum_threshold"] = 0.02;
        } else if (pair.first == "Mean Reversion") {
            params["zscore_threshold"] = 2.0;
        } else if (pair.first == "Volume Breakout") {
            params["volume_multiplier"] = 2.0;
            params["price_threshold"] = 0.01;
        }
        pair.second->initialize(params);
    }
    
    // Run backtests
    std::cout << "\nStrategy Performance:" << std::endl;
    std::cout << "Strategy Name          | Return  | Sharpe | Max DD | Win Rate" << std::endl;
    std::cout << "-----------------------|---------|--------|--------|----------" << std::endl;
    
    for (const auto& pair : strategies) {
        BacktestEngine backtest;
        backtest.initialize(100000.0, "2023-01-01", "2023-12-31");
        backtest.addStrategy(pair.second);
        
        auto metrics = backtest.runBacktest(all_bars);
        
        printf("%-22s | %6.2f%% | %6.2f | %6.2f%% | %7.1f%%\n",
               pair.first.c_str(),
               metrics.total_return * 100,
               metrics.sharpe_ratio,
               metrics.max_drawdown * 100,
               metrics.win_rate * 100);
    }
}

int main() {
    std::cout << "=== Alpaca Trading System Examples ===" << std::endl;
    std::cout << "This demonstrates various usage patterns of the trading system." << std::endl;
    std::cout << "Note: This requires valid Alpaca API credentials." << std::endl;
    std::cout << "" << std::endl;
    
    try {
        // Run examples
        runSimpleBacktest();
        runMultiStrategyBacktest();
        compareStrategies();
        
        std::cout << "\n=== Examples Complete ===" << std::endl;
        std::cout << "All examples ran successfully!" << std::endl;
        
    } catch (const std::exception& e) {
        std::cerr << "Error running examples: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}
