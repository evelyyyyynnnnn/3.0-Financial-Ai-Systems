#pragma once

#include <string>
#include <vector>
#include <functional>
#include <thread>
#include <atomic>
#include <mutex>
#include <queue>
#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/client.hpp>
#include <nlohmann/json.hpp>

namespace AlpacaTrading {

struct MarketData {
    std::string symbol;
    std::string type;  // "trade", "quote", "bar"
    double price;
    double volume;
    uint64_t timestamp;
    std::string side;  // "buy", "sell" for trades
    double bid_price;
    double ask_price;
    int bid_size;
    int ask_size;
};

class WebSocketClient {
public:
    using DataCallback = std::function<void(const MarketData&)>;
    using ErrorCallback = std::function<void(const std::string&)>;
    
    WebSocketClient();
    ~WebSocketClient();
    
    // Initialize connection
    void initialize(const std::string& api_key, 
                   const std::string& secret_key,
                   const std::string& ws_url = "wss://stream.data.alpaca.markets/v2/iex");
    
    // Subscribe to symbols
    void subscribe(const std::vector<std::string>& symbols, 
                  const std::vector<std::string>& data_types = {"trades", "quotes", "bars"});
    
    // Unsubscribe from symbols
    void unsubscribe(const std::vector<std::string>& symbols);
    
    // Start/stop streaming
    void start();
    void stop();
    
    // Set callbacks
    void setDataCallback(DataCallback callback) { data_callback_ = callback; }
    void setErrorCallback(ErrorCallback callback) { error_callback_ = callback; }
    
    // Check connection status
    bool isConnected() const { return connected_; }
    
    // Get latest data for symbol
    MarketData getLatestData(const std::string& symbol);

private:
    using client = websocketpp::client<websocketpp::config::asio>;
    using connection_hdl = websocketpp::connection_hdl;
    using message_ptr = websocketpp::config::asio::message_type::ptr;
    
    client client_;
    std::thread client_thread_;
    std::atomic<bool> running_;
    std::atomic<bool> connected_;
    
    std::string api_key_;
    std::string secret_key_;
    std::string ws_url_;
    
    DataCallback data_callback_;
    ErrorCallback error_callback_;
    
    std::mutex data_mutex_;
    std::unordered_map<std::string, MarketData> latest_data_;
    
    // WebSocket event handlers
    void onOpen(connection_hdl hdl);
    void onClose(connection_hdl hdl);
    void onMessage(connection_hdl hdl, message_ptr msg);
    void onFail(connection_hdl hdl);
    
    // Process incoming messages
    void processMessage(const nlohmann::json& message);
    
    // Send authentication
    void sendAuth();
    
    // Send subscription
    void sendSubscription(const std::vector<std::string>& symbols, 
                         const std::vector<std::string>& data_types);
    
    // Run client in separate thread
    void runClient();
};

} // namespace AlpacaTrading
