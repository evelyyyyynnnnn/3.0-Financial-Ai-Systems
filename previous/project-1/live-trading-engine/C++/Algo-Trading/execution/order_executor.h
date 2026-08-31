#pragma once

#include <string>
#include <vector>
#include <map>
#include <queue>
#include <mutex>
#include <atomic>
#include <thread>
#include <chrono>
#include <memory>
#include "../strategy/factor_strategy.h"
#include "../../authentication.h"

namespace AlpacaTrading {

enum class OrderStatus {
    PENDING,
    SUBMITTED,
    FILLED,
    PARTIALLY_FILLED,
    CANCELLED,
    REJECTED,
    EXPIRED
};

enum class OrderType {
    MARKET,
    LIMIT,
    STOP,
    STOP_LIMIT
};

enum class OrderSide {
    BUY,
    SELL
};

struct Order {
    std::string order_id;
    std::string symbol;
    OrderSide side;
    OrderType type;
    int quantity;
    double price;
    double stop_price;
    std::string time_in_force;
    OrderStatus status;
    std::chrono::system_clock::time_point created_time;
    std::chrono::system_clock::time_point updated_time;
    int filled_quantity;
    double avg_fill_price;
    std::string client_order_id;
    std::string strategy_name;
};

struct ExecutionReport {
    std::string order_id;
    std::string symbol;
    OrderSide side;
    int quantity;
    double price;
    std::chrono::system_clock::time_point execution_time;
    std::string execution_id;
    double commission;
    std::string strategy_name;
};

class OrderExecutor {
public:
    OrderExecutor();
    ~OrderExecutor();
    
    // Initialize executor
    void initialize(AlpacaAuth* auth);
    
    // Start/stop execution engine
    void start();
    void stop();
    
    // Submit order
    std::string submitOrder(const Order& order);
    
    // Cancel order
    bool cancelOrder(const std::string& order_id);
    
    // Get order status
    Order getOrderStatus(const std::string& order_id);
    
    // Get all orders
    std::vector<Order> getAllOrders();
    
    // Get orders by strategy
    std::vector<Order> getOrdersByStrategy(const std::string& strategy_name);
    
    // Process signals and generate orders
    void processSignals(const std::vector<Signal>& signals);
    
    // Set position limits
    void setPositionLimit(const std::string& symbol, int max_quantity);
    void setMaxOrdersPerSymbol(int max_orders);
    void setMaxTotalOrders(int max_orders);
    
    // Risk management
    void setMaxPositionSize(double max_size);
    void setMaxDailyLoss(double max_loss);
    void setMaxDrawdown(double max_drawdown);
    
    // Get current positions
    std::map<std::string, int> getCurrentPositions();
    
    // Get execution reports
    std::vector<ExecutionReport> getExecutionReports();
    
    // Set execution callbacks
    using OrderCallback = std::function<void(const Order&)>;
    using ExecutionCallback = std::function<void(const ExecutionReport&)>;
    
    void setOrderCallback(OrderCallback callback) { order_callback_ = callback; }
    void setExecutionCallback(ExecutionCallback callback) { execution_callback_ = callback; }

private:
    AlpacaAuth* auth_;
    std::atomic<bool> running_;
    std::thread execution_thread_;
    
    // Order management
    std::map<std::string, Order> orders_;
    std::queue<Order> order_queue_;
    std::mutex orders_mutex_;
    std::mutex queue_mutex_;
    
    // Position tracking
    std::map<std::string, int> positions_;
    std::mutex positions_mutex_;
    
    // Execution reports
    std::vector<ExecutionReport> execution_reports_;
    std::mutex reports_mutex_;
    
    // Risk management
    std::map<std::string, int> position_limits_;
    int max_orders_per_symbol_;
    int max_total_orders_;
    double max_position_size_;
    double max_daily_loss_;
    double max_drawdown_;
    double daily_pnl_;
    
    // Callbacks
    OrderCallback order_callback_;
    ExecutionCallback execution_callback_;
    
    // Order ID generation
    std::atomic<int> order_counter_;
    std::string generateOrderId();
    
    // Risk checks
    bool checkRiskLimits(const Order& order);
    bool checkPositionLimits(const std::string& symbol, int quantity);
    bool checkDailyLoss();
    
    // Order processing
    void processOrderQueue();
    void updateOrderStatus(const std::string& order_id, OrderStatus status);
    void processExecution(const ExecutionReport& report);
    
    // Position management
    void updatePosition(const std::string& symbol, int quantity, double price);
    
    // Signal processing
    int calculateOrderQuantity(const Signal& signal, const std::string& symbol);
    Order createOrderFromSignal(const Signal& signal);
};

// High-frequency execution engine
class HFExecutionEngine {
public:
    HFExecutionEngine();
    ~HFExecutionEngine();
    
    // Initialize with order executor
    void initialize(std::shared_ptr<OrderExecutor> executor);
    
    // Start/stop engine
    void start();
    void stop();
    
    // Process market data and execute trades
    void processMarketData(const std::vector<BarData>& bars);
    
    // Set execution parameters
    void setExecutionSpeed(int microseconds); // Target execution latency
    void setMaxConcurrentOrders(int max_orders);
    
    // Get performance metrics
    struct PerformanceMetrics {
        double avg_execution_latency_us;
        double max_execution_latency_us;
        int total_orders_executed;
        int successful_executions;
        int failed_executions;
        double total_commission;
    };
    
    PerformanceMetrics getPerformanceMetrics();

private:
    std::shared_ptr<OrderExecutor> executor_;
    std::atomic<bool> running_;
    std::thread execution_thread_;
    
    // Performance tracking
    std::vector<double> execution_latencies_;
    std::atomic<int> total_orders_;
    std::atomic<int> successful_orders_;
    std::atomic<int> failed_orders_;
    std::atomic<double> total_commission_;
    
    // Execution parameters
    int target_execution_latency_us_;
    int max_concurrent_orders_;
    
    // High-frequency execution loop
    void executionLoop();
    
    // Latency measurement
    void recordExecutionLatency(double latency_us);
};

} // namespace AlpacaTrading
