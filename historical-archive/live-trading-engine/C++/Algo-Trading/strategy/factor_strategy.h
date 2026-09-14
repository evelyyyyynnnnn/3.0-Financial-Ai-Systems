#pragma once

#include <string>
#include <vector>
#include <map>
#include <memory>
#include <chrono>
#include <queue>
#include <mutex>
#include <atomic>
#include "../data-download/historical_data.h"
#include "../data-download/websocket_client.h"

namespace AlpacaTrading {

struct Signal {
    std::string symbol;
    double signal_value;  // -1.0 to 1.0, negative = sell, positive = buy
    double confidence;    // 0.0 to 1.0
    std::chrono::system_clock::time_point timestamp;
    std::string strategy_name;
};

struct Position {
    std::string symbol;
    int quantity;
    double avg_price;
    double unrealized_pnl;
    double realized_pnl;
    std::chrono::system_clock::time_point entry_time;
};

class FactorStrategy {
public:
    FactorStrategy(const std::string& name);
    virtual ~FactorStrategy() = default;
    
    // Initialize strategy with parameters
    virtual void initialize(const std::map<std::string, double>& params) = 0;
    
    // Process new market data and generate signals
    virtual std::vector<Signal> processData(const std::vector<BarData>& bars) = 0;
    
    // Get current positions
    virtual std::vector<Position> getPositions() const = 0;
    
    // Update position
    virtual void updatePosition(const std::string& symbol, int quantity, double price) = 0;
    
    // Get strategy name
    const std::string& getName() const { return name_; }
    
    // Enable/disable strategy
    void setEnabled(bool enabled) { enabled_ = enabled; }
    bool isEnabled() const { return enabled_; }

protected:
    std::string name_;
    std::atomic<bool> enabled_;
    std::map<std::string, double> parameters_;
};

// Momentum Factor Strategy
class MomentumStrategy : public FactorStrategy {
public:
    MomentumStrategy();
    ~MomentumStrategy() override = default;
    
    void initialize(const std::map<std::string, double>& params) override;
    std::vector<Signal> processData(const std::vector<BarData>& bars) override;
    std::vector<Position> getPositions() const override;
    void updatePosition(const std::string& symbol, int quantity, double price) override;

private:
    std::map<std::string, std::queue<double>> price_history_;
    std::map<std::string, Position> positions_;
    mutable std::mutex positions_mutex_;
    
    int lookback_period_;
    double momentum_threshold_;
    double position_size_;
    int max_positions_;
    
    double calculateMomentum(const std::string& symbol, const std::vector<double>& prices);
    void updatePriceHistory(const std::string& symbol, double price);
};

// Mean Reversion Strategy
class MeanReversionStrategy : public FactorStrategy {
public:
    MeanReversionStrategy();
    ~MeanReversionStrategy() override = default;
    
    void initialize(const std::map<std::string, double>& params) override;
    std::vector<Signal> processData(const std::vector<BarData>& bars) override;
    std::vector<Position> getPositions() const override;
    void updatePosition(const std::string& symbol, int quantity, double price) override;

private:
    std::map<std::string, std::queue<double>> price_history_;
    std::map<std::string, Position> positions_;
    mutable std::mutex positions_mutex_;
    
    int lookback_period_;
    double zscore_threshold_;
    double position_size_;
    int max_positions_;
    
    double calculateZScore(const std::string& symbol, double current_price);
    void updatePriceHistory(const std::string& symbol, double price);
};

// Volume Breakout Strategy
class VolumeBreakoutStrategy : public FactorStrategy {
public:
    VolumeBreakoutStrategy();
    ~VolumeBreakoutStrategy() override = default;
    
    void initialize(const std::map<std::string, double>& params) override;
    std::vector<Signal> processData(const std::vector<BarData>& bars) override;
    std::vector<Position> getPositions() const override;
    void updatePosition(const std::string& symbol, int quantity, double price) override;

private:
    std::map<std::string, std::queue<double>> volume_history_;
    std::map<std::string, std::queue<double>> price_history_;
    std::map<std::string, Position> positions_;
    mutable std::mutex positions_mutex_;
    
    int lookback_period_;
    double volume_multiplier_;
    double price_threshold_;
    double position_size_;
    int max_positions_;
    
    bool isVolumeBreakout(const std::string& symbol, double current_volume);
    bool isPriceBreakout(const std::string& symbol, double current_price);
    void updateHistory(const std::string& symbol, double price, double volume);
};

// Multi-Factor Strategy Manager
class StrategyManager {
public:
    StrategyManager();
    ~StrategyManager() = default;
    
    // Add strategy
    void addStrategy(std::shared_ptr<FactorStrategy> strategy);
    
    // Remove strategy
    void removeStrategy(const std::string& name);
    
    // Process market data through all strategies
    std::vector<Signal> processData(const std::vector<BarData>& bars);
    
    // Get all signals from all strategies
    std::vector<Signal> getAllSignals();
    
    // Get combined positions
    std::map<std::string, Position> getCombinedPositions();
    
    // Enable/disable strategy
    void setStrategyEnabled(const std::string& name, bool enabled);
    
    // Get strategy by name
    std::shared_ptr<FactorStrategy> getStrategy(const std::string& name);

private:
    std::map<std::string, std::shared_ptr<FactorStrategy>> strategies_;
    std::vector<Signal> all_signals_;
    mutable std::mutex signals_mutex_;
    mutable std::mutex strategies_mutex_;
};

} // namespace AlpacaTrading
