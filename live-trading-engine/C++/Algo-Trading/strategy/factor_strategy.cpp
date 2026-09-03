#include "factor_strategy.h"
#include <algorithm>
#include <numeric>
#include <cmath>
#include <iostream>

namespace AlpacaTrading {

// FactorStrategy base class
FactorStrategy::FactorStrategy(const std::string& name) 
    : name_(name), enabled_(true) {
}

// MomentumStrategy implementation
MomentumStrategy::MomentumStrategy() : FactorStrategy("MomentumStrategy") {
    lookback_period_ = 20;
    momentum_threshold_ = 0.02;
    position_size_ = 0.1;
    max_positions_ = 10;
}

void MomentumStrategy::initialize(const std::map<std::string, double>& params) {
    parameters_ = params;
    
    if (params.find("lookback_period") != params.end()) {
        lookback_period_ = static_cast<int>(params.at("lookback_period"));
    }
    if (params.find("momentum_threshold") != params.end()) {
        momentum_threshold_ = params.at("momentum_threshold");
    }
    if (params.find("position_size") != params.end()) {
        position_size_ = params.at("position_size");
    }
    if (params.find("max_positions") != params.end()) {
        max_positions_ = static_cast<int>(params.at("max_positions"));
    }
}

std::vector<Signal> MomentumStrategy::processData(const std::vector<BarData>& bars) {
    std::vector<Signal> signals;
    
    if (!enabled_) {
        return signals;
    }
    
    for (const auto& bar : bars) {
        updatePriceHistory(bar.symbol, bar.close);
        
        auto it = price_history_.find(bar.symbol);
        if (it != price_history_.end() && it->second.size() >= lookback_period_) {
            std::vector<double> prices(it->second.begin(), it->second.end());
            double momentum = calculateMomentum(bar.symbol, prices);
            
            if (std::abs(momentum) > momentum_threshold_) {
                Signal signal;
                signal.symbol = bar.symbol;
                signal.signal_value = momentum > 0 ? 1.0 : -1.0;
                signal.confidence = std::min(std::abs(momentum) / momentum_threshold_, 1.0);
                signal.timestamp = bar.timestamp;
                signal.strategy_name = name_;
                signals.push_back(signal);
            }
        }
    }
    
    return signals;
}

std::vector<Position> MomentumStrategy::getPositions() const {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    std::vector<Position> positions;
    for (const auto& pair : positions_) {
        positions.push_back(pair.second);
    }
    return positions;
}

void MomentumStrategy::updatePosition(const std::string& symbol, int quantity, double price) {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    
    auto it = positions_.find(symbol);
    if (it != positions_.end()) {
        // Update existing position
        int old_qty = it->second.quantity;
        double old_avg_price = it->second.avg_price;
        
        int new_qty = old_qty + quantity;
        if (new_qty == 0) {
            positions_.erase(it);
        } else {
            double new_avg_price = (old_qty * old_avg_price + quantity * price) / new_qty;
            it->second.quantity = new_qty;
            it->second.avg_price = new_avg_price;
            it->second.unrealized_pnl = (price - new_avg_price) * new_qty;
        }
    } else if (quantity != 0) {
        // Create new position
        Position pos;
        pos.symbol = symbol;
        pos.quantity = quantity;
        pos.avg_price = price;
        pos.unrealized_pnl = 0.0;
        pos.realized_pnl = 0.0;
        pos.entry_time = std::chrono::system_clock::now();
        positions_[symbol] = pos;
    }
}

double MomentumStrategy::calculateMomentum(const std::string& symbol, const std::vector<double>& prices) {
    if (prices.size() < 2) return 0.0;
    
    double current_price = prices.back();
    double past_price = prices[prices.size() - lookback_period_];
    
    return (current_price - past_price) / past_price;
}

void MomentumStrategy::updatePriceHistory(const std::string& symbol, double price) {
    auto& history = price_history_[symbol];
    history.push(price);
    
    if (history.size() > lookback_period_ * 2) {
        history.pop();
    }
}

// MeanReversionStrategy implementation
MeanReversionStrategy::MeanReversionStrategy() : FactorStrategy("MeanReversionStrategy") {
    lookback_period_ = 20;
    zscore_threshold_ = 2.0;
    position_size_ = 0.1;
    max_positions_ = 10;
}

void MeanReversionStrategy::initialize(const std::map<std::string, double>& params) {
    parameters_ = params;
    
    if (params.find("lookback_period") != params.end()) {
        lookback_period_ = static_cast<int>(params.at("lookback_period"));
    }
    if (params.find("zscore_threshold") != params.end()) {
        zscore_threshold_ = params.at("zscore_threshold");
    }
    if (params.find("position_size") != params.end()) {
        position_size_ = params.at("position_size");
    }
    if (params.find("max_positions") != params.end()) {
        max_positions_ = static_cast<int>(params.at("max_positions"));
    }
}

std::vector<Signal> MeanReversionStrategy::processData(const std::vector<BarData>& bars) {
    std::vector<Signal> signals;
    
    if (!enabled_) {
        return signals;
    }
    
    for (const auto& bar : bars) {
        updatePriceHistory(bar.symbol, bar.close);
        
        auto it = price_history_.find(bar.symbol);
        if (it != price_history_.end() && it->second.size() >= lookback_period_) {
            double zscore = calculateZScore(bar.symbol, bar.close);
            
            if (std::abs(zscore) > zscore_threshold_) {
                Signal signal;
                signal.symbol = bar.symbol;
                signal.signal_value = zscore > 0 ? -1.0 : 1.0; // Mean reversion: sell when high, buy when low
                signal.confidence = std::min(std::abs(zscore) / zscore_threshold_, 1.0);
                signal.timestamp = bar.timestamp;
                signal.strategy_name = name_;
                signals.push_back(signal);
            }
        }
    }
    
    return signals;
}

std::vector<Position> MeanReversionStrategy::getPositions() const {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    std::vector<Position> positions;
    for (const auto& pair : positions_) {
        positions.push_back(pair.second);
    }
    return positions;
}

void MeanReversionStrategy::updatePosition(const std::string& symbol, int quantity, double price) {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    
    auto it = positions_.find(symbol);
    if (it != positions_.end()) {
        int old_qty = it->second.quantity;
        double old_avg_price = it->second.avg_price;
        
        int new_qty = old_qty + quantity;
        if (new_qty == 0) {
            positions_.erase(it);
        } else {
            double new_avg_price = (old_qty * old_avg_price + quantity * price) / new_qty;
            it->second.quantity = new_qty;
            it->second.avg_price = new_avg_price;
            it->second.unrealized_pnl = (price - new_avg_price) * new_qty;
        }
    } else if (quantity != 0) {
        Position pos;
        pos.symbol = symbol;
        pos.quantity = quantity;
        pos.avg_price = price;
        pos.unrealized_pnl = 0.0;
        pos.realized_pnl = 0.0;
        pos.entry_time = std::chrono::system_clock::now();
        positions_[symbol] = pos;
    }
}

double MeanReversionStrategy::calculateZScore(const std::string& symbol, double current_price) {
    auto& history = price_history_[symbol];
    if (history.size() < lookback_period_) return 0.0;
    
    std::vector<double> prices;
    std::queue<double> temp_queue = history;
    while (!temp_queue.empty()) {
        prices.push_back(temp_queue.front());
        temp_queue.pop();
    }
    
    // Calculate mean and standard deviation
    double mean = std::accumulate(prices.begin(), prices.end(), 0.0) / prices.size();
    double variance = 0.0;
    for (double price : prices) {
        variance += (price - mean) * (price - mean);
    }
    double std_dev = std::sqrt(variance / prices.size());
    
    if (std_dev == 0.0) return 0.0;
    
    return (current_price - mean) / std_dev;
}

void MeanReversionStrategy::updatePriceHistory(const std::string& symbol, double price) {
    auto& history = price_history_[symbol];
    history.push(price);
    
    if (history.size() > lookback_period_ * 2) {
        history.pop();
    }
}

// VolumeBreakoutStrategy implementation
VolumeBreakoutStrategy::VolumeBreakoutStrategy() : FactorStrategy("VolumeBreakoutStrategy") {
    lookback_period_ = 20;
    volume_multiplier_ = 2.0;
    price_threshold_ = 0.01;
    position_size_ = 0.1;
    max_positions_ = 10;
}

void VolumeBreakoutStrategy::initialize(const std::map<std::string, double>& params) {
    parameters_ = params;
    
    if (params.find("lookback_period") != params.end()) {
        lookback_period_ = static_cast<int>(params.at("lookback_period"));
    }
    if (params.find("volume_multiplier") != params.end()) {
        volume_multiplier_ = params.at("volume_multiplier");
    }
    if (params.find("price_threshold") != params.end()) {
        price_threshold_ = params.at("price_threshold");
    }
    if (params.find("position_size") != params.end()) {
        position_size_ = params.at("position_size");
    }
    if (params.find("max_positions") != params.end()) {
        max_positions_ = static_cast<int>(params.at("max_positions"));
    }
}

std::vector<Signal> VolumeBreakoutStrategy::processData(const std::vector<BarData>& bars) {
    std::vector<Signal> signals;
    
    if (!enabled_) {
        return signals;
    }
    
    for (const auto& bar : bars) {
        updateHistory(bar.symbol, bar.close, bar.volume);
        
        bool vol_breakout = isVolumeBreakout(bar.symbol, bar.volume);
        bool price_breakout = isPriceBreakout(bar.symbol, bar.close);
        
        if (vol_breakout && price_breakout) {
            Signal signal;
            signal.symbol = bar.symbol;
            signal.signal_value = 1.0; // Buy on breakout
            signal.confidence = 0.8;
            signal.timestamp = bar.timestamp;
            signal.strategy_name = name_;
            signals.push_back(signal);
        }
    }
    
    return signals;
}

std::vector<Position> VolumeBreakoutStrategy::getPositions() const {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    std::vector<Position> positions;
    for (const auto& pair : positions_) {
        positions.push_back(pair.second);
    }
    return positions;
}

void VolumeBreakoutStrategy::updatePosition(const std::string& symbol, int quantity, double price) {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    
    auto it = positions_.find(symbol);
    if (it != positions_.end()) {
        int old_qty = it->second.quantity;
        double old_avg_price = it->second.avg_price;
        
        int new_qty = old_qty + quantity;
        if (new_qty == 0) {
            positions_.erase(it);
        } else {
            double new_avg_price = (old_qty * old_avg_price + quantity * price) / new_qty;
            it->second.quantity = new_qty;
            it->second.avg_price = new_avg_price;
            it->second.unrealized_pnl = (price - new_avg_price) * new_qty;
        }
    } else if (quantity != 0) {
        Position pos;
        pos.symbol = symbol;
        pos.quantity = quantity;
        pos.avg_price = price;
        pos.unrealized_pnl = 0.0;
        pos.realized_pnl = 0.0;
        pos.entry_time = std::chrono::system_clock::now();
        positions_[symbol] = pos;
    }
}

bool VolumeBreakoutStrategy::isVolumeBreakout(const std::string& symbol, double current_volume) {
    auto it = volume_history_.find(symbol);
    if (it == volume_history_.end() || it->second.size() < lookback_period_) {
        return false;
    }
    
    std::vector<double> volumes;
    std::queue<double> temp_queue = it->second;
    while (!temp_queue.empty()) {
        volumes.push_back(temp_queue.front());
        temp_queue.pop();
    }
    
    double avg_volume = std::accumulate(volumes.begin(), volumes.end(), 0.0) / volumes.size();
    return current_volume > avg_volume * volume_multiplier_;
}

bool VolumeBreakoutStrategy::isPriceBreakout(const std::string& symbol, double current_price) {
    auto it = price_history_.find(symbol);
    if (it == price_history_.end() || it->second.size() < lookback_period_) {
        return false;
    }
    
    std::vector<double> prices;
    std::queue<double> temp_queue = it->second;
    while (!temp_queue.empty()) {
        prices.push_back(temp_queue.front());
        temp_queue.pop();
    }
    
    double max_price = *std::max_element(prices.begin(), prices.end());
    return current_price > max_price * (1.0 + price_threshold_);
}

void VolumeBreakoutStrategy::updateHistory(const std::string& symbol, double price, double volume) {
    auto& price_history = price_history_[symbol];
    auto& volume_history = volume_history_[symbol];
    
    price_history.push(price);
    volume_history.push(volume);
    
    if (price_history.size() > lookback_period_ * 2) {
        price_history.pop();
    }
    if (volume_history.size() > lookback_period_ * 2) {
        volume_history.pop();
    }
}

// StrategyManager implementation
StrategyManager::StrategyManager() {
}

void StrategyManager::addStrategy(std::shared_ptr<FactorStrategy> strategy) {
    std::lock_guard<std::mutex> lock(strategies_mutex_);
    strategies_[strategy->getName()] = strategy;
}

void StrategyManager::removeStrategy(const std::string& name) {
    std::lock_guard<std::mutex> lock(strategies_mutex_);
    strategies_.erase(name);
}

std::vector<Signal> StrategyManager::processData(const std::vector<BarData>& bars) {
    std::vector<Signal> all_signals;
    
    std::lock_guard<std::mutex> lock(strategies_mutex_);
    for (auto& pair : strategies_) {
        if (pair.second->isEnabled()) {
            auto signals = pair.second->processData(bars);
            all_signals.insert(all_signals.end(), signals.begin(), signals.end());
        }
    }
    
    {
        std::lock_guard<std::mutex> signals_lock(signals_mutex_);
        all_signals_ = all_signals;
    }
    
    return all_signals;
}

std::vector<Signal> StrategyManager::getAllSignals() {
    std::lock_guard<std::mutex> lock(signals_mutex_);
    return all_signals_;
}

std::map<std::string, Position> StrategyManager::getCombinedPositions() {
    std::map<std::string, Position> combined_positions;
    
    std::lock_guard<std::mutex> lock(strategies_mutex_);
    for (const auto& pair : strategies_) {
        auto positions = pair.second->getPositions();
        for (const auto& pos : positions) {
            auto it = combined_positions.find(pos.symbol);
            if (it != combined_positions.end()) {
                // Combine positions
                int total_qty = it->second.quantity + pos.quantity;
                double total_cost = it->second.quantity * it->second.avg_price + 
                                  pos.quantity * pos.avg_price;
                it->second.quantity = total_qty;
                it->second.avg_price = total_qty > 0 ? total_cost / total_qty : 0.0;
                it->second.unrealized_pnl += pos.unrealized_pnl;
                it->second.realized_pnl += pos.realized_pnl;
            } else {
                combined_positions[pos.symbol] = pos;
            }
        }
    }
    
    return combined_positions;
}

void StrategyManager::setStrategyEnabled(const std::string& name, bool enabled) {
    std::lock_guard<std::mutex> lock(strategies_mutex_);
    auto it = strategies_.find(name);
    if (it != strategies_.end()) {
        it->second->setEnabled(enabled);
    }
}

std::shared_ptr<FactorStrategy> StrategyManager::getStrategy(const std::string& name) {
    std::lock_guard<std::mutex> lock(strategies_mutex_);
    auto it = strategies_.find(name);
    return (it != strategies_.end()) ? it->second : nullptr;
}

} // namespace AlpacaTrading
