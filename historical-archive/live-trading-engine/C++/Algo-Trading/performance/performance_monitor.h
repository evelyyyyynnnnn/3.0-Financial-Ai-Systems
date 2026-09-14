#pragma once

#include <string>
#include <vector>
#include <map>
#include <chrono>
#include <mutex>
#include <atomic>
#include <memory>
#include "../strategy/factor_strategy.h"
#include "../execution/order_executor.h"

namespace AlpacaTrading {

struct PerformanceMetrics {
    double total_return;
    double annualized_return;
    double volatility;
    double sharpe_ratio;
    double max_drawdown;
    double calmar_ratio;
    double win_rate;
    double avg_win;
    double avg_loss;
    double profit_factor;
    int total_trades;
    int winning_trades;
    int losing_trades;
    double total_commission;
    double net_profit;
    std::chrono::system_clock::time_point start_time;
    std::chrono::system_clock::time_point end_time;
};

struct Trade {
    std::string symbol;
    std::chrono::system_clock::time_point entry_time;
    std::chrono::system_clock::time_point exit_time;
    double entry_price;
    double exit_price;
    int quantity;
    double pnl;
    double commission;
    std::string strategy_name;
    double holding_period_hours;
};

struct PortfolioSnapshot {
    std::chrono::system_clock::time_point timestamp;
    double total_value;
    double cash;
    std::map<std::string, double> positions;
    double unrealized_pnl;
    double realized_pnl;
    double daily_pnl;
};

class PerformanceMonitor {
public:
    PerformanceMonitor();
    ~PerformanceMonitor() = default;
    
    // Initialize with starting capital
    void initialize(double starting_capital);
    
    // Record trade execution
    void recordTrade(const Trade& trade);
    
    // Record portfolio snapshot
    void recordSnapshot(const PortfolioSnapshot& snapshot);
    
    // Record order execution
    void recordOrderExecution(const ExecutionReport& report);
    
    // Calculate performance metrics
    PerformanceMetrics calculateMetrics();
    
    // Get trade history
    std::vector<Trade> getTradeHistory();
    
    // Get portfolio snapshots
    std::vector<PortfolioSnapshot> getPortfolioSnapshots();
    
    // Get performance by strategy
    std::map<std::string, PerformanceMetrics> getPerformanceByStrategy();
    
    // Get performance by symbol
    std::map<std::string, PerformanceMetrics> getPerformanceBySymbol();
    
    // Real-time monitoring
    void startRealTimeMonitoring();
    void stopRealTimeMonitoring();
    
    // Set monitoring callbacks
    using PerformanceCallback = std::function<void(const PerformanceMetrics&)>;
    void setPerformanceCallback(PerformanceCallback callback) { performance_callback_ = callback; }

private:
    double starting_capital_;
    std::vector<Trade> trades_;
    std::vector<PortfolioSnapshot> snapshots_;
    std::vector<ExecutionReport> executions_;
    
    std::mutex trades_mutex_;
    std::mutex snapshots_mutex_;
    std::mutex executions_mutex_;
    
    std::atomic<bool> monitoring_;
    std::thread monitoring_thread_;
    
    PerformanceCallback performance_callback_;
    
    // Calculation helpers
    double calculateTotalReturn(const std::vector<PortfolioSnapshot>& snapshots);
    double calculateVolatility(const std::vector<double>& returns);
    double calculateSharpeRatio(double annual_return, double volatility, double risk_free_rate = 0.02);
    double calculateMaxDrawdown(const std::vector<PortfolioSnapshot>& snapshots);
    double calculateCalmarRatio(double annual_return, double max_drawdown);
    
    // Real-time monitoring loop
    void monitoringLoop();
};

// Backtesting engine
class BacktestEngine {
public:
    BacktestEngine();
    ~BacktestEngine() = default;
    
    // Initialize backtest
    void initialize(double starting_capital, 
                   const std::string& start_date,
                   const std::string& end_date);
    
    // Add strategy
    void addStrategy(std::shared_ptr<FactorStrategy> strategy);
    
    // Run backtest
    PerformanceMetrics runBacktest(const std::vector<BarData>& historical_data);
    
    // Get detailed results
    std::vector<Trade> getBacktestTrades();
    std::vector<PortfolioSnapshot> getBacktestSnapshots();
    
    // Set backtest parameters
    void setCommission(double commission_per_trade);
    void setSlippage(double slippage_bps);
    void setInitialCash(double cash);

private:
    double starting_capital_;
    std::string start_date_;
    std::string end_date_;
    double commission_per_trade_;
    double slippage_bps_;
    
    std::vector<std::shared_ptr<FactorStrategy>> strategies_;
    std::unique_ptr<PerformanceMonitor> monitor_;
    
    // Backtest execution
    void executeBacktest(const std::vector<BarData>& data);
    void processSignals(const std::vector<Signal>& signals, 
                       const std::map<std::string, double>& prices,
                       std::chrono::system_clock::time_point timestamp);
    
    // Position management
    std::map<std::string, int> positions_;
    double cash_;
    double portfolio_value_;
    
    // Trade execution simulation
    void executeTrade(const std::string& symbol, int quantity, double price, 
                    std::chrono::system_clock::time_point timestamp);
};

// Risk manager
class RiskManager {
public:
    RiskManager();
    ~RiskManager() = default;
    
    // Initialize risk parameters
    void initialize(double max_position_size,
                   double max_portfolio_risk,
                   double max_drawdown,
                   double max_daily_loss);
    
    // Check if trade is allowed
    bool isTradeAllowed(const std::string& symbol, int quantity, double price);
    
    // Check portfolio risk
    bool checkPortfolioRisk(const std::map<std::string, int>& positions,
                           const std::map<std::string, double>& prices);
    
    // Update risk metrics
    void updateRiskMetrics(const PortfolioSnapshot& snapshot);
    
    // Get risk metrics
    struct RiskMetrics {
        double portfolio_var;
        double max_position_concentration;
        double current_drawdown;
        double daily_pnl;
        double portfolio_beta;
        std::map<std::string, double> position_risks;
    };
    
    RiskMetrics getRiskMetrics();

private:
    double max_position_size_;
    double max_portfolio_risk_;
    double max_drawdown_;
    double max_daily_loss_;
    
    std::vector<PortfolioSnapshot> recent_snapshots_;
    std::mutex snapshots_mutex_;
    
    // Risk calculations
    double calculatePositionRisk(const std::string& symbol, int quantity, double price);
    double calculatePortfolioVAR(const std::map<std::string, int>& positions,
                               const std::map<std::string, double>& prices);
    double calculateCurrentDrawdown();
};

} // namespace AlpacaTrading
