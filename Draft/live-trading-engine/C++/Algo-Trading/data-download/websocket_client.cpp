#include "websocket_client.h"
#include <iostream>
#include <chrono>
#include <iomanip>
#include <sstream>

namespace AlpacaTrading {

WebSocketClient::WebSocketClient() 
    : running_(false), connected_(false) {
    client_.clear_access_channels(websocketpp::log::alevel::all);
    client_.clear_error_channels(websocketpp::log::elevel::all);
    
    client_.init_asio();
    
    client_.set_open_handler([this](connection_hdl hdl) {
        onOpen(hdl);
    });
    
    client_.set_close_handler([this](connection_hdl hdl) {
        onClose(hdl);
    });
    
    client_.set_message_handler([this](connection_hdl hdl, message_ptr msg) {
        onMessage(hdl, msg);
    });
    
    client_.set_fail_handler([this](connection_hdl hdl) {
        onFail(hdl);
    });
}

WebSocketClient::~WebSocketClient() {
    stop();
}

void WebSocketClient::initialize(const std::string& api_key, 
                                const std::string& secret_key,
                                const std::string& ws_url) {
    api_key_ = api_key;
    secret_key_ = secret_key;
    ws_url_ = ws_url;
}

void WebSocketClient::subscribe(const std::vector<std::string>& symbols, 
                               const std::vector<std::string>& data_types) {
    if (!connected_) {
        std::cerr << "WebSocket not connected. Cannot subscribe." << std::endl;
        return;
    }
    
    sendSubscription(symbols, data_types);
}

void WebSocketClient::unsubscribe(const std::vector<std::string>& symbols) {
    if (!connected_) {
        return;
    }
    
    nlohmann::json unsubscribe_msg;
    unsubscribe_msg["action"] = "unsubscribe";
    
    nlohmann::json trades = nlohmann::json::array();
    nlohmann::json quotes = nlohmann::json::array();
    nlohmann::json bars = nlohmann::json::array();
    
    for (const auto& symbol : symbols) {
        trades.push_back(symbol);
        quotes.push_back(symbol);
        bars.push_back(symbol);
    }
    
    unsubscribe_msg["trades"] = trades;
    unsubscribe_msg["quotes"] = quotes;
    unsubscribe_msg["bars"] = bars;
    
    // Send unsubscribe message
    // Note: This would need the connection handle to send
    std::cout << "Unsubscribing from: " << unsubscribe_msg.dump() << std::endl;
}

void WebSocketClient::start() {
    if (running_) {
        return;
    }
    
    running_ = true;
    client_thread_ = std::thread([this]() { runClient(); });
}

void WebSocketClient::stop() {
    if (!running_) {
        return;
    }
    
    running_ = false;
    client_.stop();
    
    if (client_thread_.joinable()) {
        client_thread_.join();
    }
}

MarketData WebSocketClient::getLatestData(const std::string& symbol) {
    std::lock_guard<std::mutex> lock(data_mutex_);
    auto it = latest_data_.find(symbol);
    if (it != latest_data_.end()) {
        return it->second;
    }
    return MarketData{};
}

void WebSocketClient::onOpen(connection_hdl hdl) {
    connected_ = true;
    std::cout << "[WebSocket] Connection opened" << std::endl;
    sendAuth();
}

void WebSocketClient::onClose(connection_hdl hdl) {
    connected_ = false;
    std::cout << "[WebSocket] Connection closed" << std::endl;
}

void WebSocketClient::onMessage(connection_hdl hdl, message_ptr msg) {
    try {
        nlohmann::json message = nlohmann::json::parse(msg->get_payload());
        processMessage(message);
    } catch (const std::exception& e) {
        std::cerr << "[WebSocket] Error parsing message: " << e.what() << std::endl;
        if (error_callback_) {
            error_callback_("Failed to parse message: " + std::string(e.what()));
        }
    }
}

void WebSocketClient::onFail(connection_hdl hdl) {
    connected_ = false;
    std::cerr << "[WebSocket] Connection failed" << std::endl;
    if (error_callback_) {
        error_callback_("WebSocket connection failed");
    }
}

void WebSocketClient::processMessage(const nlohmann::json& message) {
    if (message.is_array()) {
        for (const auto& item : message) {
            processMessage(item);
        }
        return;
    }
    
    if (message.contains("T")) {
        std::string type = message["T"];
        std::string symbol = message["S"];
        
        MarketData data;
        data.symbol = symbol;
        data.type = type;
        
        if (type == "t") {  // Trade
            data.price = message["p"].get<double>();
            data.volume = message["s"].get<double>();
            data.timestamp = message["t"].get<uint64_t>();
            data.side = message["c"].get<std::string>();
            
            std::cout << "[Trade] " << symbol << " price=" << data.price 
                     << " volume=" << data.volume << " ts=" << data.timestamp << std::endl;
            
        } else if (type == "q") {  // Quote
            data.bid_price = message["bp"].get<double>();
            data.ask_price = message["ap"].get<double>();
            data.bid_size = message["bs"].get<int>();
            data.ask_size = message["as"].get<int>();
            data.timestamp = message["t"].get<uint64_t>();
            
            std::cout << "[Quote] " << symbol << " bid=" << data.bid_price 
                     << " ask=" << data.ask_price << " ts=" << data.timestamp << std::endl;
            
        } else if (type == "b") {  // Bar
            data.price = message["c"].get<double>();
            data.volume = message["v"].get<double>();
            data.timestamp = message["t"].get<uint64_t>();
            
            std::cout << "[Bar] " << symbol << " close=" << data.price 
                     << " volume=" << data.volume << " ts=" << data.timestamp << std::endl;
        }
        
        // Update latest data
        {
            std::lock_guard<std::mutex> lock(data_mutex_);
            latest_data_[symbol] = data;
        }
        
        // Call callback
        if (data_callback_) {
            data_callback_(data);
        }
        
    } else if (message.contains("T") && message["T"] == "success") {
        std::cout << "[WebSocket] Success: " << message["msg"].get<std::string>() << std::endl;
    } else if (message.contains("T") && message["T"] == "subscription") {
        std::cout << "[WebSocket] Subscription: " << message.dump() << std::endl;
    } else {
        std::cout << "[WebSocket] Unknown message: " << message.dump() << std::endl;
    }
}

void WebSocketClient::sendAuth() {
    nlohmann::json auth_msg;
    auth_msg["action"] = "auth";
    auth_msg["key"] = api_key_;
    auth_msg["secret"] = secret_key_;
    
    // Note: This would need the connection handle to send
    std::cout << "Sending auth: " << auth_msg.dump() << std::endl;
}

void WebSocketClient::sendSubscription(const std::vector<std::string>& symbols, 
                                      const std::vector<std::string>& data_types) {
    nlohmann::json subscribe_msg;
    subscribe_msg["action"] = "subscribe";
    
    nlohmann::json trades = nlohmann::json::array();
    nlohmann::json quotes = nlohmann::json::array();
    nlohmann::json bars = nlohmann::json::array();
    
    for (const auto& symbol : symbols) {
        for (const auto& type : data_types) {
            if (type == "trades") {
                trades.push_back(symbol);
            } else if (type == "quotes") {
                quotes.push_back(symbol);
            } else if (type == "bars") {
                bars.push_back(symbol);
            }
        }
    }
    
    subscribe_msg["trades"] = trades;
    subscribe_msg["quotes"] = quotes;
    subscribe_msg["bars"] = bars;
    
    // Note: This would need the connection handle to send
    std::cout << "Subscribing to: " << subscribe_msg.dump() << std::endl;
}

void WebSocketClient::runClient() {
    try {
        websocketpp::lib::error_code ec;
        auto con = client_.get_connection(ws_url_, ec);
        
        if (ec) {
            std::cerr << "[WebSocket] Connection error: " << ec.message() << std::endl;
            return;
        }
        
        client_.connect(con);
        client_.run();
        
    } catch (const std::exception& e) {
        std::cerr << "[WebSocket] Error: " << e.what() << std::endl;
        if (error_callback_) {
            error_callback_("WebSocket error: " + std::string(e.what()));
        }
    }
}

} // namespace AlpacaTrading
