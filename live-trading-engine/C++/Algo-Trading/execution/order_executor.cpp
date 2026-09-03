#include "order_executor.h"
#include <iostream>
#include <sstream>
#include <random>
#include <algorithm>

namespace AlpacaTrading {

OrderExecutor::OrderExecutor() 
    : auth_(nullptr), running_(false), order_counter_(0),
      max_orders_per_symbol_(5), max_total_orders_(100),
      max_position_size_(10000.0), max_daily_loss_(1000.0),
      max_drawdown_(5000.0), daily_pnl_(0.0) {
}

OrderExecutor::~OrderExecutor() {
    stop();
}

void OrderExecutor::initialize(AlpacaAuth* auth) {
    auth_ = auth;
}

void OrderExecutor::start() {
    if (running_) {
        return;
    }
    
    running_ = true;
    execution_thread_ = std::thread([this]() { processOrderQueue(); });
}

void OrderExecutor::stop() {
    if (!running_) {
        return;
    }
    
    running_ = false;
    if (execution_thread_.joinable()) {
        execution_thread_.join();
    }
}

std::string OrderExecutor::submitOrder(const Order& order) {
    if (!auth_) {
        throw std::runtime_error("OrderExecutor not initialized");
    }
    
    // Risk checks
    if (!checkRiskLimits(order)) {
        std::cerr << "Order rejected due to risk limits: " << order.symbol << std::endl;
        return "";
    }
    
    // Generate order ID
    std::string order_id = generateOrderId();
    Order order_copy = order;
    order_copy.order_id = order_id;
    order_copy.status = OrderStatus::PENDING;
    order_copy.created_time = std::chrono::system_clock::now();
    order_copy.updated_time = order_copy.created_time;
    
    // Add to queue
    {
        std::lock_guard<std::mutex> lock(queue_mutex_);
        order_queue_.push(order_copy);
    }
    
    return order_id;
}

bool OrderExecutor::cancelOrder(const std::string& order_id) {
    if (!auth_) {
        return false;
    }
    
    std::lock_guard<std::mutex> lock(orders_mutex_);
    auto it = orders_.find(order_id);
    if (it != orders_.end() && it->second.status == OrderStatus::SUBMITTED) {
        try {
            auth_->cancelOrder(order_id);
            it->second.status = OrderStatus::CANCELLED;
            it->second.updated_time = std::chrono::system_clock::now();
            return true;
        } catch (const std::exception& e) {
            std::cerr << "Failed to cancel order " << order_id << ": " << e.what() << std::endl;
            return false;
        }
    }
    
    return false;
}

Order OrderExecutor::getOrderStatus(const std::string& order_id) {
    std::lock_guard<std::mutex> lock(orders_mutex_);
    auto it = orders_.find(order_id);
    if (it != orders_.end()) {
        return it->second;
    }
    return Order{};
}

std::vector<Order> OrderExecutor::getAllOrders() {
    std::lock_guard<std::mutex> lock(orders_mutex_);
    std::vector<Order> orders;
    for (const auto& pair : orders_) {
        orders.push_back(pair.second);
    }
    return orders;
}

std::vector<Order> OrderExecutor::getOrdersByStrategy(const std::string& strategy_name) {
    std::lock_guard<std::mutex> lock(orders_mutex_);
    std::vector<Order> orders;
    for (const auto& pair : orders_) {
        if (pair.second.strategy_name == strategy_name) {
            orders.push_back(pair.second);
        }
    }
    return orders;
}

void OrderExecutor::processSignals(const std::vector<Signal>& signals) {
    for (const auto& signal : signals) {
        Order order = createOrderFromSignal(signal);
        if (!order.order_id.empty()) {
            submitOrder(order);
        }
    }
}

void OrderExecutor::setPositionLimit(const std::string& symbol, int max_quantity) {
    position_limits_[symbol] = max_quantity;
}

void OrderExecutor::setMaxOrdersPerSymbol(int max_orders) {
    max_orders_per_symbol_ = max_orders;
}

void OrderExecutor::setMaxTotalOrders(int max_orders) {
    max_total_orders_ = max_orders;
}

void OrderExecutor::setMaxPositionSize(double max_size) {
    max_position_size_ = max_size;
}

void OrderExecutor::setMaxDailyLoss(double max_loss) {
    max_daily_loss_ = max_loss;
}

void OrderExecutor::setMaxDrawdown(double max_drawdown) {
    max_drawdown_ = max_drawdown;
}

std::map<std::string, int> OrderExecutor::getCurrentPositions() {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    return positions_;
}

std::vector<ExecutionReport> OrderExecutor::getExecutionReports() {
    std::lock_guard<std::mutex> lock(reports_mutex_);
    return execution_reports_;
}

std::string OrderExecutor::generateOrderId() {
    std::stringstream ss;
    ss << "HF_" << std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::system_clock::now().time_since_epoch()).count()
       << "_" << order_counter_++;
    return ss.str();
}

bool OrderExecutor::checkRiskLimits(const Order& order) {
    // Check position limits
    if (!checkPositionLimits(order.symbol, order.quantity)) {
        return false;
    }
    
    // Check daily loss
    if (!checkDailyLoss()) {
        return false;
    }
    
    // Check total orders
    {
        std::lock_guard<std::mutex> lock(orders_mutex_);
        if (orders_.size() >= max_total_orders_) {
            return false;
        }
    }
    
    return true;
}

bool OrderExecutor::checkPositionLimits(const std::string& symbol, int quantity) {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    
    auto it = positions_.find(symbol);
    int current_position = (it != positions_.end()) ? it->second : 0;
    int new_position = current_position + quantity;
    
    // Check symbol-specific limit
    auto limit_it = position_limits_.find(symbol);
    if (limit_it != position_limits_.end() && std::abs(new_position) > limit_it->second) {
        return false;
    }
    
    // Check global position size limit
    if (std::abs(new_position) > max_position_size_) {
        return false;
    }
    
    return true;
}

bool OrderExecutor::checkDailyLoss() {
    return daily_pnl_ >= -max_daily_loss_;
}

void OrderExecutor::processOrderQueue() {
    while (running_) {
        std::queue<Order> orders_to_process;
        
        // Get orders from queue
        {
            std::lock_guard<std::mutex> lock(queue_mutex_);
            if (!order_queue_.empty()) {
                orders_to_process = order_queue_;
                std::queue<Order> empty;
                order_queue_.swap(empty);
            }
        }
        
        // Process orders
        while (!orders_to_process.empty()) {
            Order order = orders_to_process.front();
            orders_to_process.pop();
            
            try {
                // Submit to Alpaca
                nlohmann::json response = auth_->placeOrder(
                    order.symbol,
                    order.quantity,
                    (order.side == OrderSide::BUY) ? "buy" : "sell",
                    (order.type == OrderType::MARKET) ? "market" : "limit",
                    order.time_in_force
                );
                
                // Update order status
                order.status = OrderStatus::SUBMITTED;
                order.updated_time = std::chrono::system_clock::now();
                
                // Store order
                {
                    std::lock_guard<std::mutex> lock(orders_mutex_);
                    orders_[order.order_id] = order;
                }
                
                // Call callback
                if (order_callback_) {
                    order_callback_(order);
                }
                
            } catch (const std::exception& e) {
                std::cerr << "Failed to submit order " << order.order_id << ": " << e.what() << std::endl;
                order.status = OrderStatus::REJECTED;
                order.updated_time = std::chrono::system_clock::now();
                
                {
                    std::lock_guard<std::mutex> lock(orders_mutex_);
                    orders_[order.order_id] = order;
                }
            }
        }
        
        // Small delay to prevent busy waiting
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    }
}

void OrderExecutor::updateOrderStatus(const std::string& order_id, OrderStatus status) {
    std::lock_guard<std::mutex> lock(orders_mutex_);
    auto it = orders_.find(order_id);
    if (it != orders_.end()) {
        it->second.status = status;
        it->second.updated_time = std::chrono::system_clock::now();
    }
}

void OrderExecutor::processExecution(const ExecutionReport& report) {
    // Update position
    updatePosition(report.symbol, report.quantity, report.price);
    
    // Update daily PnL
    daily_pnl_ += report.quantity * report.price;
    
    // Store execution report
    {
        std::lock_guard<std::mutex> lock(reports_mutex_);
        execution_reports_.push_back(report);
    }
    
    // Call callback
    if (execution_callback_) {
        execution_callback_(report);
    }
}

void OrderExecutor::updatePosition(const std::string& symbol, int quantity, double price) {
    std::lock_guard<std::mutex> lock(positions_mutex_);
    auto it = positions_.find(symbol);
    if (it != positions_.end()) {
        it->second += quantity;
    } else {
        positions_[symbol] = quantity;
    }
}

int OrderExecutor::calculateOrderQuantity(const Signal& signal, const std::string& symbol) {
    // Simple position sizing based on signal strength
    double base_quantity = 100.0; // Base position size
    double scaled_quantity = base_quantity * signal.confidence;
    
    // Apply signal direction
    int quantity = static_cast<int>(scaled_quantity);
    if (signal.signal_value < 0) {
        quantity = -quantity;
    }
    
    return quantity;
}

Order OrderExecutor::createOrderFromSignal(const Signal& signal) {
    Order order;
    
    int quantity = calculateOrderQuantity(signal, signal.symbol);
    if (quantity == 0) {
        return order; // Empty order
    }
    
    order.symbol = signal.symbol;
    order.side = (quantity > 0) ? OrderSide::BUY : OrderSide::SELL;
    order.type = OrderType::MARKET; // High-frequency typically uses market orders
    order.quantity = std::abs(quantity);
    order.time_in_force = "day";
    order.strategy_name = signal.strategy_name;
    
    return order;
}

// HFExecutionEngine implementation
HFExecutionEngine::HFExecutionEngine() 
    : running_(false), target_execution_latency_us_(1000),
      max_concurrent_orders_(10), total_orders_(0),
      successful_orders_(0), failed_orders_(0), total_commission_(0.0) {
}

HFExecutionEngine::~HFExecutionEngine() {
    stop();
}

void HFExecutionEngine::initialize(std::shared_ptr<OrderExecutor> executor) {
    executor_ = executor;
}

void HFExecutionEngine::start() {
    if (running_) {
        return;
    }
    
    running_ = true;
    execution_thread_ = std::thread([this]() { executionLoop(); });
}

void HFExecutionEngine::stop() {
    if (!running_) {
        return;
    }
    
    running_ = false;
    if (execution_thread_.joinable()) {
        execution_thread_.join();
    }
}

void HFExecutionEngine::processMarketData(const std::vector<BarData>& bars) {
    // High-frequency processing would go here
    // This is a simplified version
    for (const auto& bar : bars) {
        auto start_time = std::chrono::high_resolution_clock::now();
        
        // Process bar data (simplified)
        // In a real HF system, this would trigger immediate order execution
        
        auto end_time = std::chrono::high_resolution_clock::now();
        auto latency = std::chrono::duration_cast<std::chrono::microseconds>(end_time - start_time);
        recordExecutionLatency(latency.count());
    }
}

void HFExecutionEngine::setExecutionSpeed(int microseconds) {
    target_execution_latency_us_ = microseconds;
}

void HFExecutionEngine::setMaxConcurrentOrders(int max_orders) {
    max_concurrent_orders_ = max_orders;
}

HFExecutionEngine::PerformanceMetrics HFExecutionEngine::getPerformanceMetrics() {
    PerformanceMetrics metrics;
    
    if (!execution_latencies_.empty()) {
        double sum = std::accumulate(execution_latencies_.begin(), execution_latencies_.end(), 0.0);
        metrics.avg_execution_latency_us = sum / execution_latencies_.size();
        metrics.max_execution_latency_us = *std::max_element(execution_latencies_.begin(), execution_latencies_.end());
    } else {
        metrics.avg_execution_latency_us = 0.0;
        metrics.max_execution_latency_us = 0.0;
    }
    
    metrics.total_orders_executed = total_orders_.load();
    metrics.successful_executions = successful_orders_.load();
    metrics.failed_executions = failed_orders_.load();
    metrics.total_commission = total_commission_.load();
    
    return metrics;
}

void HFExecutionEngine::executionLoop() {
    while (running_) {
        auto start_time = std::chrono::high_resolution_clock::now();
        
        // High-frequency execution logic would go here
        // This is a simplified version that just measures latency
        
        auto end_time = std::chrono::high_resolution_clock::now();
        auto latency = std::chrono::duration_cast<std::chrono::microseconds>(end_time - start_time);
        
        recordExecutionLatency(latency.count());
        
        // Sleep to maintain target execution speed
        if (latency.count() < target_execution_latency_us_) {
            std::this_thread::sleep_for(std::chrono::microseconds(target_execution_latency_us_ - latency.count()));
        }
    }
}

void HFExecutionEngine::recordExecutionLatency(double latency_us) {
    execution_latencies_.push_back(latency_us);
    
    // Keep only recent latencies to prevent memory growth
    if (execution_latencies_.size() > 10000) {
        execution_latencies_.erase(execution_latencies_.begin(), execution_latencies_.begin() + 1000);
    }
}

} // namespace AlpacaTrading
