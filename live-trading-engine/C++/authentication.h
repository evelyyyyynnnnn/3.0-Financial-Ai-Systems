#pragma once

#include <string>
#include <memory>
#include <curl/curl.h>
#include <nlohmann/json.hpp>

namespace AlpacaTrading {

class AlpacaAuth {
public:
    AlpacaAuth();
    ~AlpacaAuth();
    
    // Initialize with credentials
    void initialize(const std::string& api_key, 
                   const std::string& secret_key, 
                   const std::string& base_url = "https://paper-api.alpaca.markets");
    
    // Get account information
    nlohmann::json getAccount();
    
    // Get positions
    nlohmann::json getPositions();
    
    // Get orders
    nlohmann::json getOrders(const std::string& status = "open");
    
    // Place order
    nlohmann::json placeOrder(const std::string& symbol,
                             int qty,
                             const std::string& side,
                             const std::string& type = "market",
                             const std::string& time_in_force = "day");
    
    // Cancel order
    nlohmann::json cancelOrder(const std::string& order_id);
    
    // Get market data
    nlohmann::json getMarketData(const std::string& symbol, 
                                const std::string& timeframe = "1Min",
                                int limit = 100);
    
    // Get latest quote
    nlohmann::json getLatestQuote(const std::string& symbol);
    
    // Get latest trade
    nlohmann::json getLatestTrade(const std::string& symbol);

private:
    std::string api_key_;
    std::string secret_key_;
    std::string base_url_;
    CURL* curl_;
    
    // HTTP request helper
    std::string makeRequest(const std::string& endpoint, 
                           const std::string& method = "GET",
                           const std::string& data = "");
    
    // Callback for curl write
    static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* s);
};

// Global authentication instance
extern std::unique_ptr<AlpacaAuth> g_auth;

// Initialize global auth
void initializeAuth();

} // namespace AlpacaTrading
