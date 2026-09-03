#include "authentication.h"
#include <iostream>
#include <sstream>

namespace AlpacaTrading {

// Global authentication instance
std::unique_ptr<AlpacaAuth> g_auth = nullptr;

AlpacaAuth::AlpacaAuth() : curl_(nullptr) {
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl_ = curl_easy_init();
}

AlpacaAuth::~AlpacaAuth() {
    if (curl_) {
        curl_easy_cleanup(curl_);
    }
    curl_global_cleanup();
}

void AlpacaAuth::initialize(const std::string& api_key, 
                           const std::string& secret_key, 
                           const std::string& base_url) {
    api_key_ = api_key;
    secret_key_ = secret_key;
    base_url_ = base_url;
}

std::string AlpacaAuth::makeRequest(const std::string& endpoint, 
                                   const std::string& method,
                                   const std::string& data) {
    if (!curl_) {
        throw std::runtime_error("CURL not initialized");
    }
    
    std::string url = base_url_ + endpoint;
    std::string response;
    
    curl_easy_setopt(curl_, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl_, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl_, CURLOPT_WRITEDATA, &response);
    curl_easy_setopt(curl_, CURLOPT_USERPWD, (api_key_ + ":" + secret_key_).c_str());
    curl_easy_setopt(curl_, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_easy_setopt(curl_, CURLOPT_SSL_VERIFYPEER, 1L);
    curl_easy_setopt(curl_, CURLOPT_SSL_VERIFYHOST, 2L);
    curl_easy_setopt(curl_, CURLOPT_TIMEOUT, 30L);
    
    if (method == "POST") {
        curl_easy_setopt(curl_, CURLOPT_POSTFIELDS, data.c_str());
        curl_easy_setopt(curl_, CURLOPT_POSTFIELDSIZE, data.length());
    } else if (method == "DELETE") {
        curl_easy_setopt(curl_, CURLOPT_CUSTOMREQUEST, "DELETE");
    }
    
    // Set headers
    struct curl_slist* headers = nullptr;
    headers = curl_slist_append(headers, "Content-Type: application/json");
    curl_easy_setopt(curl_, CURLOPT_HTTPHEADER, headers);
    
    CURLcode res = curl_easy_perform(curl_);
    curl_slist_free_all(headers);
    
    if (res != CURLE_OK) {
        throw std::runtime_error("CURL error: " + std::string(curl_easy_strerror(res)));
    }
    
    return response;
}

size_t AlpacaAuth::WriteCallback(void* contents, size_t size, size_t nmemb, std::string* s) {
    size_t newLength = size * nmemb;
    try {
        s->append((char*)contents, newLength);
        return newLength;
    } catch (std::bad_alloc& e) {
        return 0;
    }
}

nlohmann::json AlpacaAuth::getAccount() {
    std::string response = makeRequest("/v2/account");
    return nlohmann::json::parse(response);
}

nlohmann::json AlpacaAuth::getPositions() {
    std::string response = makeRequest("/v2/positions");
    return nlohmann::json::parse(response);
}

nlohmann::json AlpacaAuth::getOrders(const std::string& status) {
    std::string endpoint = "/v2/orders";
    if (!status.empty()) {
        endpoint += "?status=" + status;
    }
    std::string response = makeRequest(endpoint);
    return nlohmann::json::parse(response);
}

nlohmann::json AlpacaAuth::placeOrder(const std::string& symbol,
                                     int qty,
                                     const std::string& side,
                                     const std::string& type,
                                     const std::string& time_in_force) {
    nlohmann::json order_data;
    order_data["symbol"] = symbol;
    order_data["qty"] = std::to_string(qty);
    order_data["side"] = side;
    order_data["type"] = type;
    order_data["time_in_force"] = time_in_force;
    
    std::string data = order_data.dump();
    std::string response = makeRequest("/v2/orders", "POST", data);
    return nlohmann::json::parse(response);
}

nlohmann::json AlpacaAuth::cancelOrder(const std::string& order_id) {
    std::string endpoint = "/v2/orders/" + order_id;
    std::string response = makeRequest(endpoint, "DELETE");
    return nlohmann::json::parse(response);
}

nlohmann::json AlpacaAuth::getMarketData(const std::string& symbol, 
                                        const std::string& timeframe,
                                        int limit) {
    std::stringstream endpoint;
    endpoint << "/v2/stocks/" << symbol << "/bars?timeframe=" << timeframe 
             << "&limit=" << limit;
    std::string response = makeRequest(endpoint.str());
    return nlohmann::json::parse(response);
}

nlohmann::json AlpacaAuth::getLatestQuote(const std::string& symbol) {
    std::string endpoint = "/v2/stocks/" + symbol + "/quotes/latest";
    std::string response = makeRequest(endpoint);
    return nlohmann::json::parse(response);
}

nlohmann::json AlpacaAuth::getLatestTrade(const std::string& symbol) {
    std::string endpoint = "/v2/stocks/" + symbol + "/trades/latest";
    std::string response = makeRequest(endpoint);
    return nlohmann::json::parse(response);
}

void initializeAuth() {
    if (!g_auth) {
        g_auth = std::make_unique<AlpacaAuth>();
        g_auth->initialize(
            "PKVFX17VIP19CWGQPOBN",
            "SG0MX5gJ3LwnGt9LasXYUbVywCZ7SH4slJkXqPZl",
            "https://paper-api.alpaca.markets"
        );
    }
}

} // namespace AlpacaTrading
