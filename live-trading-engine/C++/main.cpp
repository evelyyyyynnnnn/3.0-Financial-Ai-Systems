#include <iostream>
#include <memory>
#include <thread>
#include <chrono>
#include <signal.h>
#include <atomic>

#include "authentication.h"
#include "Algo-Trading/data-download/websocket_client.h"
#include "Algo-Trading/data-download/historical_data.h"
#include "Algo-Trading/strategy/factor_strategy.h"
#include "Algo-Trading/execution/order_executor.h"
#include "Algo-Trading/performance/performance_monitor.h"

using namespace AlpacaTrading;

// Global variables for signal handling
std::atomic<bool> g_running(true);
std::unique_ptr<WebSocketClient> g_ws_client;
std::unique_ptr<OrderExecutor> g_order_executor;
std::unique_ptr<StrategyManager> g_strategy_manager;
std::unique_ptr<PerformanceMonitor> g_performance_monitor;

// Signal handler
void signalHandler(int signal) {
    std::cout << "\n[Main] Received signal " << signal << ". Shutting down..." << std::endl;
    g_running = false;
    
    if (g_ws_client) {
        g_ws_client->stop();
    }
    
    if (g_order_executor) {
        g_order_executor->stop();
    }
    
    if (g_performance_monitor) {
        g_performance_monitor->stopRealTimeMonitoring();
    }
}

// Market data callback
void onMarketData(const MarketData& data) {
    std::cout << "[MarketData] " << data.symbol << " " << data.type 
              << " price=" << data.price << " volume=" << data.volume << std::endl;
    
    // Convert to BarData for strategy processing
    BarData bar;
    bar.symbol = data.symbol;
    bar.timestamp = std::chrono::system_clock::now();
    bar.open = data.price;
    bar.high = data.price;
    bar.low = data.price;
    bar.close = data.price;
    bar.volume = data.volume;
    bar.trade_count = 1;
    bar.vwap = data.price;
    
    std::vector<BarData> bars = {bar};
    
    // Process through strategies
    if (g_strategy_manager) {
        auto signals = g_strategy_manager->processData(bars);
        
        // Execute orders
        if (g_order_executor && !signals.empty()) {
            g_order_executor->processSignals(signals);
        }
    }
}

// Order callback
void onOrderUpdate(const Order& order) {
    std::cout << "[Order] " << order.order_id << " " << order.symbol 
              << " " << (order.side == OrderSide::BUY ? "BUY" : "SELL")
              << " " << order.quantity << " @ " << order.price 
              << " Status: " << static_cast<int>(order.status) << std::endl;
}

// Execution callback
void onExecution(const ExecutionReport& report) {
    std::cout << "[Execution] " << report.order_id << " " << report.symbol 
              << " " << report.quantity << " @ " << report.price 
              << " Commission: " << report.commission << std::endl;
    
    // Record execution in performance monitor
    if (g_performance_monitor) {
        g_performance_monitor->recordOrderExecution(report);
    }
}

// Performance callback
void onPerformanceUpdate(const PerformanceMetrics& metrics) {
    std::cout << "[Performance] Total Return: " << metrics.total_return * 100 << "%"
              << " Sharpe: " << metrics.sharpe_ratio
              << " Max DD: " << metrics.max_drawdown * 100 << "%"
              << " Win Rate: " << metrics.win_rate * 100 << "%" << std::endl;
}

// Initialize strategies
void initializeStrategies() {
    g_strategy_manager = std::make_unique<StrategyManager>();
    
    // Momentum Strategy
    auto momentum_strategy = std::make_shared<MomentumStrategy>();
    std::map<std::string, double> momentum_params;
    momentum_params["lookback_period"] = 20;
    momentum_params["momentum_threshold"] = 0.02;
    momentum_params["position_size"] = 0.1;
    momentum_params["max_positions"] = 10;
    momentum_strategy->initialize(momentum_params);
    g_strategy_manager->addStrategy(momentum_strategy);
    
    // Mean Reversion Strategy
    auto mean_reversion_strategy = std::make_shared<MeanReversionStrategy>();
    std::map<std::string, double> mr_params;
    mr_params["lookback_period"] = 20;
    mr_params["zscore_threshold"] = 2.0;
    mr_params["position_size"] = 0.1;
    mr_params["max_positions"] = 10;
    mean_reversion_strategy->initialize(mr_params);
    g_strategy_manager->addStrategy(mean_reversion_strategy);
    
    // Volume Breakout Strategy
    auto volume_breakout_strategy = std::make_shared<VolumeBreakoutStrategy>();
    std::map<std::string, double> vb_params;
    vb_params["lookback_period"] = 20;
    vb_params["volume_multiplier"] = 2.0;
    vb_params["price_threshold"] = 0.01;
    vb_params["position_size"] = 0.1;
    vb_params["max_positions"] = 10;
    volume_breakout_strategy->initialize(vb_params);
    g_strategy_manager->addStrategy(volume_breakout_strategy);
    
    std::cout << "[Main] Initialized " << 3 << " trading strategies" << std::endl;
}

// Run backtest
void runBacktest() {
    std::cout << "[Main] Running backtest..." << std::endl;
    
    BacktestEngine backtest;
    backtest.initialize(100000.0, "2023-01-01", "2023-12-31");
    
    // Add strategies to backtest
    auto momentum_strategy = std::make_shared<MomentumStrategy>();
    std::map<std::string, double> params;
    params["lookback_period"] = 20;
    params["momentum_threshold"] = 0.02;
    momentum_strategy->initialize(params);
    backtest.addStrategy(momentum_strategy);
    
    // Download historical data
    HistoricalDataDownloader downloader;
    std::vector<std::string> symbols = {"AAPL", "MSFT", "GOOGL", "TSLA", "NVDA"};
    
    std::cout << "[Main] Downloading historical data..." << std::endl;
    auto historical_data = downloader.downloadMultipleBars(symbols, "1Min", 1000);
    
    // Combine all data
    std::vector<BarData> all_bars;
    for (const auto& pair : historical_data) {
        all_bars.insert(all_bars.end(), pair.second.begin(), pair.second.end());
    }
    
    if (all_bars.empty()) {
        std::cout << "[Main] No historical data available for backtest" << std::endl;
        return;
    }
    
    // Run backtest
    auto metrics = backtest.runBacktest(all_bars);
    
    // Print results
    std::cout << "\n[Backtest Results]" << std::endl;
    std::cout << "Total Return: " << metrics.total_return * 100 << "%" << std::endl;
    std::cout << "Annualized Return: " << metrics.annualized_return * 100 << "%" << std::endl;
    std::cout << "Volatility: " << metrics.volatility * 100 << "%" << std::endl;
    std::cout << "Sharpe Ratio: " << metrics.sharpe_ratio << std::endl;
    std::cout << "Max Drawdown: " << metrics.max_drawdown * 100 << "%" << std::endl;
    std::cout << "Calmar Ratio: " << metrics.calmar_ratio << std::endl;
    std::cout << "Win Rate: " << metrics.win_rate * 100 << "%" << std::endl;
    std::cout << "Total Trades: " << metrics.total_trades << std::endl;
    std::cout << "Net Profit: $" << metrics.net_profit << std::endl;
}

// Live trading mode
void runLiveTrading() {
    std::cout << "[Main] Starting live trading..." << std::endl;
    
    // Initialize WebSocket client
    g_ws_client = std::make_unique<WebSocketClient>();
    g_ws_client->initialize("PKVFX17VIP19CWGQPOBN", "SG0MX5gJ3LwnGt9LasXYUbVywCZ7SH4slJkXqPZl");
    g_ws_client->setDataCallback(onMarketData);
    
    // Initialize order executor
    g_order_executor = std::make_unique<OrderExecutor>();
    g_order_executor->initialize(g_auth.get());
    g_order_executor->setOrderCallback(onOrderUpdate);
    g_order_executor->setExecutionCallback(onExecution);
    
    // Set risk limits
    g_order_executor->setMaxPositionSize(10000.0);
    g_order_executor->setMaxDailyLoss(1000.0);
    g_order_executor->setMaxDrawdown(0.2);
    
    // Initialize performance monitor
    g_performance_monitor = std::make_unique<PerformanceMonitor>();
    g_performance_monitor->initialize(100000.0);
    g_performance_monitor->setPerformanceCallback(onPerformanceUpdate);
    
    // Start components
    g_ws_client->start();
    g_order_executor->start();
    g_performance_monitor->startRealTimeMonitoring();
    
    // Subscribe to symbols
    std::vector<std::string> symbols = {"AAPL", "MSFT", "GOOGL", "TSLA", "NVDA"};
    g_ws_client->subscribe(symbols, {"trades", "quotes", "bars"});
    
    std::cout << "[Main] Live trading started. Press Ctrl+C to stop." << std::endl;
    
    // Main loop
    while (g_running) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    std::cout << "[Main] Stopping live trading..." << std::endl;
}

int main(int argc, char* argv[]) {
    std::cout << "=== Alpaca High-Frequency Trading System ===" << std::endl;
    std::cout << "Version: 1.0.0" << std::endl;
    std::cout << "Built with C++17" << std::endl;
    
    // Set up signal handling
    signal(SIGINT, signalHandler);
    signal(SIGTERM, signalHandler);
    
    try {
        // Initialize authentication
        initializeAuth();
        std::cout << "[Main] Authentication initialized" << std::endl;
        
        // Check command line arguments
        bool run_backtest = false;
        bool run_live = false;
        
        for (int i = 1; i < argc; ++i) {
            std::string arg = argv[i];
            if (arg == "--backtest" || arg == "-b") {
                run_backtest = true;
            } else if (arg == "--live" || arg == "-l") {
                run_live = true;
            } else if (arg == "--test" || arg == "-t") {
                std::cout << "[Main] Running in test mode" << std::endl;
                return 0;
            } else if (arg == "--help" || arg == "-h") {
                std::cout << "Usage: " << argv[0] << " [options]" << std::endl;
                std::cout << "Options:" << std::endl;
                std::cout << "  --backtest, -b    Run backtest mode" << std::endl;
                std::cout << "  --live, -l        Run live trading mode" << std::endl;
                std::cout << "  --test, -t        Run test mode" << std::endl;
                std::cout << "  --help, -h        Show this help message" << std::endl;
                return 0;
            }
        }
        
        // Initialize strategies
        initializeStrategies();
        
        if (run_backtest) {
            runBacktest();
        } else if (run_live) {
            runLiveTrading();
        } else {
            // Default: run both backtest and live trading
            runBacktest();
            std::cout << "\n[Main] Press Enter to start live trading..." << std::endl;
            std::cin.get();
            runLiveTrading();
        }
        
    } catch (const std::exception& e) {
        std::cerr << "[Main] Error: " << e.what() << std::endl;
        return 1;
    }
    
    std::cout << "[Main] Trading system shutdown complete" << std::endl;
    return 0;
}
