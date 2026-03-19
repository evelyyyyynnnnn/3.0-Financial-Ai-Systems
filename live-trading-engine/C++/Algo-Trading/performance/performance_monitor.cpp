#include "performance_monitor.h"
#include <algorithm>
#include <numeric>
#include <cmath>
#include <iostream>
#include <thread>

namespace AlpacaTrading {

PerformanceMonitor::PerformanceMonitor() 
    : starting_capital_(0.0), monitoring_(false) {
}

void PerformanceMonitor::initialize(double starting_capital) {
    starting_capital_ = starting_capital;
}

void PerformanceMonitor::recordTrade(const Trade& trade) {
    std::lock_guard<std::mutex> lock(trades_mutex_);
    trades_.push_back(trade);
}

void PerformanceMonitor::recordSnapshot(const PortfolioSnapshot& snapshot) {
    std::lock_guard<std::mutex> lock(snapshots_mutex_);
    snapshots_.push_back(snapshot);
}

void PerformanceMonitor::recordOrderExecution(const ExecutionReport& report) {
    std::lock_guard<std::mutex> lock(executions_mutex_);
    executions_.push_back(report);
}

PerformanceMetrics PerformanceMonitor::calculateMetrics() {
    PerformanceMetrics metrics;
    
    std::lock_guard<std::mutex> trades_lock(trades_mutex_);
    std::lock_guard<std::mutex> snapshots_lock(snapshots_mutex_);
    
    if (snapshots_.empty()) {
        return metrics;
    }
    
    // Calculate total return
    metrics.total_return = calculateTotalReturn(snapshots_);
    
    // Calculate annualized return
    auto start_time = snapshots_.front().timestamp;
    auto end_time = snapshots_.back().timestamp;
    auto duration = std::chrono::duration_cast<std::chrono::hours>(end_time - start_time);
    double years = duration.count() / (365.25 * 24.0);
    metrics.annualized_return = std::pow(1.0 + metrics.total_return, 1.0 / years) - 1.0;
    
    // Calculate volatility
    std::vector<double> returns;
    for (size_t i = 1; i < snapshots_.size(); ++i) {
        double ret = (snapshots_[i].total_value - snapshots_[i-1].total_value) / snapshots_[i-1].total_value;
        returns.push_back(ret);
    }
    metrics.volatility = calculateVolatility(returns);
    
    // Calculate Sharpe ratio
    metrics.sharpe_ratio = calculateSharpeRatio(metrics.annualized_return, metrics.volatility);
    
    // Calculate max drawdown
    metrics.max_drawdown = calculateMaxDrawdown(snapshots_);
    
    // Calculate Calmar ratio
    metrics.calmar_ratio = calculateCalmarRatio(metrics.annualized_return, metrics.max_drawdown);
    
    // Calculate trade statistics
    metrics.total_trades = trades_.size();
    metrics.winning_trades = 0;
    metrics.losing_trades = 0;
    double total_wins = 0.0;
    double total_losses = 0.0;
    metrics.total_commission = 0.0;
    
    for (const auto& trade : trades_) {
        metrics.total_commission += trade.commission;
        if (trade.pnl > 0) {
            metrics.winning_trades++;
            total_wins += trade.pnl;
        } else if (trade.pnl < 0) {
            metrics.losing_trades++;
            total_losses += std::abs(trade.pnl);
        }
    }
    
    metrics.win_rate = (metrics.total_trades > 0) ? 
        static_cast<double>(metrics.winning_trades) / metrics.total_trades : 0.0;
    
    metrics.avg_win = (metrics.winning_trades > 0) ? total_wins / metrics.winning_trades : 0.0;
    metrics.avg_loss = (metrics.losing_trades > 0) ? total_losses / metrics.losing_trades : 0.0;
    
    metrics.profit_factor = (total_losses > 0) ? total_wins / total_losses : 0.0;
    
    metrics.net_profit = metrics.total_return * starting_capital_;
    metrics.start_time = start_time;
    metrics.end_time = end_time;
    
    return metrics;
}

std::vector<Trade> PerformanceMonitor::getTradeHistory() {
    std::lock_guard<std::mutex> lock(trades_mutex_);
    return trades_;
}

std::vector<PortfolioSnapshot> PerformanceMonitor::getPortfolioSnapshots() {
    std::lock_guard<std::mutex> lock(snapshots_mutex_);
    return snapshots_;
}

std::map<std::string, PerformanceMetrics> PerformanceMonitor::getPerformanceByStrategy() {
    std::map<std::string, std::vector<Trade>> strategy_trades;
    std::map<std::string, PerformanceMetrics> strategy_metrics;
    
    {
        std::lock_guard<std::mutex> lock(trades_mutex_);
        for (const auto& trade : trades_) {
            strategy_trades[trade.strategy_name].push_back(trade);
        }
    }
    
    for (const auto& pair : strategy_trades) {
        PerformanceMetrics metrics;
        const auto& trades = pair.second;
        
        metrics.total_trades = trades.size();
        metrics.winning_trades = 0;
        metrics.losing_trades = 0;
        double total_pnl = 0.0;
        double total_commission = 0.0;
        
        for (const auto& trade : trades) {
            total_pnl += trade.pnl;
            total_commission += trade.commission;
            if (trade.pnl > 0) {
                metrics.winning_trades++;
            } else if (trade.pnl < 0) {
                metrics.losing_trades++;
            }
        }
        
        metrics.win_rate = (metrics.total_trades > 0) ? 
            static_cast<double>(metrics.winning_trades) / metrics.total_trades : 0.0;
        metrics.total_commission = total_commission;
        metrics.net_profit = total_pnl;
        
        strategy_metrics[pair.first] = metrics;
    }
    
    return strategy_metrics;
}

std::map<std::string, PerformanceMetrics> PerformanceMonitor::getPerformanceBySymbol() {
    std::map<std::string, std::vector<Trade>> symbol_trades;
    std::map<std::string, PerformanceMetrics> symbol_metrics;
    
    {
        std::lock_guard<std::mutex> lock(trades_mutex_);
        for (const auto& trade : trades_) {
            symbol_trades[trade.symbol].push_back(trade);
        }
    }
    
    for (const auto& pair : symbol_trades) {
        PerformanceMetrics metrics;
        const auto& trades = pair.second;
        
        metrics.total_trades = trades.size();
        metrics.winning_trades = 0;
        metrics.losing_trades = 0;
        double total_pnl = 0.0;
        double total_commission = 0.0;
        
        for (const auto& trade : trades) {
            total_pnl += trade.pnl;
            total_commission += trade.commission;
            if (trade.pnl > 0) {
                metrics.winning_trades++;
            } else if (trade.pnl < 0) {
                metrics.losing_trades++;
            }
        }
        
        metrics.win_rate = (metrics.total_trades > 0) ? 
            static_cast<double>(metrics.winning_trades) / metrics.total_trades : 0.0;
        metrics.total_commission = total_commission;
        metrics.net_profit = total_pnl;
        
        symbol_metrics[pair.first] = metrics;
    }
    
    return symbol_metrics;
}

void PerformanceMonitor::startRealTimeMonitoring() {
    if (monitoring_) {
        return;
    }
    
    monitoring_ = true;
    monitoring_thread_ = std::thread([this]() { monitoringLoop(); });
}

void PerformanceMonitor::stopRealTimeMonitoring() {
    if (!monitoring_) {
        return;
    }
    
    monitoring_ = false;
    if (monitoring_thread_.joinable()) {
        monitoring_thread_.join();
    }
}

double PerformanceMonitor::calculateTotalReturn(const std::vector<PortfolioSnapshot>& snapshots) {
    if (snapshots.empty()) return 0.0;
    
    double start_value = snapshots.front().total_value;
    double end_value = snapshots.back().total_value;
    
    return (end_value - start_value) / start_value;
}

double PerformanceMonitor::calculateVolatility(const std::vector<double>& returns) {
    if (returns.empty()) return 0.0;
    
    double mean = std::accumulate(returns.begin(), returns.end(), 0.0) / returns.size();
    double variance = 0.0;
    
    for (double ret : returns) {
        variance += (ret - mean) * (ret - mean);
    }
    
    double std_dev = std::sqrt(variance / returns.size());
    return std_dev * std::sqrt(252); // Annualized volatility
}

double PerformanceMonitor::calculateSharpeRatio(double annual_return, double volatility, double risk_free_rate) {
    if (volatility == 0.0) return 0.0;
    return (annual_return - risk_free_rate) / volatility;
}

double PerformanceMonitor::calculateMaxDrawdown(const std::vector<PortfolioSnapshot>& snapshots) {
    if (snapshots.empty()) return 0.0;
    
    double max_value = snapshots[0].total_value;
    double max_drawdown = 0.0;
    
    for (const auto& snapshot : snapshots) {
        if (snapshot.total_value > max_value) {
            max_value = snapshot.total_value;
        }
        double drawdown = (max_value - snapshot.total_value) / max_value;
        if (drawdown > max_drawdown) {
            max_drawdown = drawdown;
        }
    }
    
    return max_drawdown;
}

double PerformanceMonitor::calculateCalmarRatio(double annual_return, double max_drawdown) {
    if (max_drawdown == 0.0) return 0.0;
    return annual_return / max_drawdown;
}

void PerformanceMonitor::monitoringLoop() {
    while (monitoring_) {
        // Calculate current metrics
        auto metrics = calculateMetrics();
        
        // Call callback if set
        if (performance_callback_) {
            performance_callback_(metrics);
        }
        
        // Sleep for monitoring interval
        std::this_thread::sleep_for(std::chrono::seconds(60)); // Monitor every minute
    }
}

// BacktestEngine implementation
BacktestEngine::BacktestEngine() 
    : starting_capital_(100000.0), commission_per_trade_(1.0), slippage_bps_(5.0) {
    monitor_ = std::make_unique<PerformanceMonitor>();
}

void BacktestEngine::initialize(double starting_capital, 
                              const std::string& start_date,
                              const std::string& end_date) {
    starting_capital_ = starting_capital;
    start_date_ = start_date;
    end_date_ = end_date;
    cash_ = starting_capital;
    portfolio_value_ = starting_capital;
    
    monitor_->initialize(starting_capital);
}

void BacktestEngine::addStrategy(std::shared_ptr<FactorStrategy> strategy) {
    strategies_.push_back(strategy);
}

PerformanceMetrics BacktestEngine::runBacktest(const std::vector<BarData>& historical_data) {
    // Sort data by timestamp
    std::vector<BarData> sorted_data = historical_data;
    std::sort(sorted_data.begin(), sorted_data.end(), 
              [](const BarData& a, const BarData& b) {
                  return a.timestamp < b.timestamp;
              });
    
    // Execute backtest
    executeBacktest(sorted_data);
    
    // Calculate and return metrics
    return monitor_->calculateMetrics();
}

std::vector<Trade> BacktestEngine::getBacktestTrades() {
    return monitor_->getTradeHistory();
}

std::vector<PortfolioSnapshot> BacktestEngine::getBacktestSnapshots() {
    return monitor_->getPortfolioSnapshots();
}

void BacktestEngine::setCommission(double commission_per_trade) {
    commission_per_trade_ = commission_per_trade;
}

void BacktestEngine::setSlippage(double slippage_bps) {
    slippage_bps_ = slippage_bps;
}

void BacktestEngine::setInitialCash(double cash) {
    starting_capital_ = cash;
    cash_ = cash;
    portfolio_value_ = cash;
}

void BacktestEngine::executeBacktest(const std::vector<BarData>& data) {
    std::map<std::string, std::vector<BarData>> symbol_data;
    
    // Group data by symbol
    for (const auto& bar : data) {
        symbol_data[bar.symbol].push_back(bar);
    }
    
    // Process each timestamp
    std::set<std::chrono::system_clock::time_point> timestamps;
    for (const auto& bar : data) {
        timestamps.insert(bar.timestamp);
    }
    
    for (const auto& timestamp : timestamps) {
        // Collect prices for current timestamp
        std::map<std::string, double> current_prices;
        for (const auto& pair : symbol_data) {
            for (const auto& bar : pair.second) {
                if (bar.timestamp == timestamp) {
                    current_prices[bar.symbol] = bar.close;
                }
            }
        }
        
        // Process signals from all strategies
        std::vector<Signal> all_signals;
        for (auto& strategy : strategies_) {
            std::vector<BarData> current_bars;
            for (const auto& bar : data) {
                if (bar.timestamp == timestamp) {
                    current_bars.push_back(bar);
                }
            }
            
            auto signals = strategy->processData(current_bars);
            all_signals.insert(all_signals.end(), signals.begin(), signals.end());
        }
        
        // Process signals
        processSignals(all_signals, current_prices, timestamp);
        
        // Record portfolio snapshot
        PortfolioSnapshot snapshot;
        snapshot.timestamp = timestamp;
        snapshot.cash = cash_;
        snapshot.positions = positions_;
        snapshot.total_value = cash_;
        snapshot.unrealized_pnl = 0.0;
        snapshot.realized_pnl = 0.0;
        snapshot.daily_pnl = 0.0;
        
        for (const auto& pair : positions_) {
            if (current_prices.find(pair.first) != current_prices.end()) {
                double position_value = pair.second * current_prices[pair.first];
                snapshot.total_value += position_value;
            }
        }
        
        monitor_->recordSnapshot(snapshot);
    }
}

void BacktestEngine::processSignals(const std::vector<Signal>& signals, 
                                   const std::map<std::string, double>& prices,
                                   std::chrono::system_clock::time_point timestamp) {
    for (const auto& signal : signals) {
        if (prices.find(signal.symbol) == prices.end()) {
            continue;
        }
        
        double price = prices.at(signal.symbol);
        int quantity = static_cast<int>(signal.signal_value * 100); // Simple position sizing
        
        if (quantity != 0) {
            executeTrade(signal.symbol, quantity, price, timestamp);
        }
    }
}

void BacktestEngine::executeTrade(const std::string& symbol, int quantity, double price, 
                                 std::chrono::system_clock::time_point timestamp) {
    // Apply slippage
    double slippage = price * (slippage_bps_ / 10000.0);
    double execution_price = price + (quantity > 0 ? slippage : -slippage);
    
    // Check if we have enough cash for buy orders
    if (quantity > 0 && cash_ < quantity * execution_price + commission_per_trade_) {
        return; // Insufficient cash
    }
    
    // Execute trade
    double trade_value = quantity * execution_price;
    double commission = commission_per_trade_;
    
    if (quantity > 0) {
        // Buy
        cash_ -= trade_value + commission;
        positions_[symbol] += quantity;
    } else {
        // Sell
        if (positions_[symbol] < std::abs(quantity)) {
            return; // Insufficient position
        }
        cash_ += std::abs(trade_value) - commission;
        positions_[symbol] += quantity;
        
        if (positions_[symbol] == 0) {
            positions_.erase(symbol);
        }
    }
    
    // Record trade
    Trade trade;
    trade.symbol = symbol;
    trade.entry_time = timestamp;
    trade.exit_time = timestamp;
    trade.entry_price = execution_price;
    trade.exit_price = execution_price;
    trade.quantity = quantity;
    trade.pnl = -trade_value - commission; // Simplified PnL calculation
    trade.commission = commission;
    trade.strategy_name = "Backtest";
    trade.holding_period_hours = 0.0;
    
    monitor_->recordTrade(trade);
}

// RiskManager implementation
RiskManager::RiskManager() 
    : max_position_size_(10000.0), max_portfolio_risk_(0.1),
      max_drawdown_(0.2), max_daily_loss_(1000.0) {
}

void RiskManager::initialize(double max_position_size,
                           double max_portfolio_risk,
                           double max_drawdown,
                           double max_daily_loss) {
    max_position_size_ = max_position_size;
    max_portfolio_risk_ = max_portfolio_risk;
    max_drawdown_ = max_drawdown;
    max_daily_loss_ = max_daily_loss;
}

bool RiskManager::isTradeAllowed(const std::string& symbol, int quantity, double price) {
    double position_value = std::abs(quantity) * price;
    
    // Check position size limit
    if (position_value > max_position_size_) {
        return false;
    }
    
    return true;
}

bool RiskManager::checkPortfolioRisk(const std::map<std::string, int>& positions,
                                    const std::map<std::string, double>& prices) {
    double portfolio_var = calculatePortfolioVAR(positions, prices);
    
    if (portfolio_var > max_portfolio_risk_) {
        return false;
    }
    
    double current_drawdown = calculateCurrentDrawdown();
    if (current_drawdown > max_drawdown_) {
        return false;
    }
    
    return true;
}

void RiskManager::updateRiskMetrics(const PortfolioSnapshot& snapshot) {
    std::lock_guard<std::mutex> lock(snapshots_mutex_);
    recent_snapshots_.push_back(snapshot);
    
    // Keep only recent snapshots
    if (recent_snapshots_.size() > 1000) {
        recent_snapshots_.erase(recent_snapshots_.begin(), recent_snapshots_.begin() + 100);
    }
}

RiskManager::RiskMetrics RiskManager::getRiskMetrics() {
    RiskMetrics metrics;
    
    std::lock_guard<std::mutex> lock(snapshots_mutex_);
    
    if (!recent_snapshots_.empty()) {
        metrics.current_drawdown = calculateCurrentDrawdown();
        metrics.daily_pnl = recent_snapshots_.back().daily_pnl;
    }
    
    return metrics;
}

double RiskManager::calculatePositionRisk(const std::string& symbol, int quantity, double price) {
    // Simplified risk calculation
    return std::abs(quantity) * price * 0.02; // 2% risk per position
}

double RiskManager::calculatePortfolioVAR(const std::map<std::string, int>& positions,
                                        const std::map<std::string, double>& prices) {
    double total_risk = 0.0;
    
    for (const auto& pair : positions) {
        if (prices.find(pair.first) != prices.end()) {
            total_risk += calculatePositionRisk(pair.first, pair.second, prices.at(pair.first));
        }
    }
    
    return total_risk;
}

double RiskManager::calculateCurrentDrawdown() {
    if (recent_snapshots_.empty()) return 0.0;
    
    double max_value = recent_snapshots_[0].total_value;
    double current_value = recent_snapshots_.back().total_value;
    
    for (const auto& snapshot : recent_snapshots_) {
        if (snapshot.total_value > max_value) {
            max_value = snapshot.total_value;
        }
    }
    
    return (max_value - current_value) / max_value;
}

} // namespace AlpacaTrading
