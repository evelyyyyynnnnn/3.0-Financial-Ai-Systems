#include "historical_data.h"
#include <fstream>
#include <sstream>
#include <iomanip>
#include <iostream>
#include <thread>

namespace AlpacaTrading {

HistoricalDataDownloader::HistoricalDataDownloader() {
    auth_ = g_auth.get();
    last_request_time_ = std::chrono::steady_clock::now();
}

std::vector<BarData> HistoricalDataDownloader::downloadBars(const std::string& symbol,
                                                          const std::string& timeframe,
                                                          int limit,
                                                          const std::string& start_date,
                                                          const std::string& end_date) {
    if (!auth_) {
        throw std::runtime_error("Authentication not initialized");
    }
    
    rateLimitDelay();
    
    std::stringstream endpoint;
    endpoint << "/v2/stocks/" << symbol << "/bars?timeframe=" << timeframe 
             << "&limit=" << limit;
    
    if (!start_date.empty()) {
        endpoint << "&start=" << start_date;
    }
    if (!end_date.empty()) {
        endpoint << "&end=" << end_date;
    }
    
    try {
        nlohmann::json response = auth_->getMarketData(symbol, timeframe, limit);
        return parseBarsResponse(response, symbol);
    } catch (const std::exception& e) {
        std::cerr << "Error downloading bars for " << symbol << ": " << e.what() << std::endl;
        return {};
    }
}

std::vector<QuoteData> HistoricalDataDownloader::downloadQuotes(const std::string& symbol,
                                                              int limit,
                                                              const std::string& start_date,
                                                              const std::string& end_date) {
    if (!auth_) {
        throw std::runtime_error("Authentication not initialized");
    }
    
    rateLimitDelay();
    
    std::stringstream endpoint;
    endpoint << "/v2/stocks/" << symbol << "/quotes?limit=" << limit;
    
    if (!start_date.empty()) {
        endpoint << "&start=" << start_date;
    }
    if (!end_date.empty()) {
        endpoint << "&end=" << end_date;
    }
    
    try {
        // Note: This would need to be implemented in the auth class
        // For now, return empty vector
        return {};
    } catch (const std::exception& e) {
        std::cerr << "Error downloading quotes for " << symbol << ": " << e.what() << std::endl;
        return {};
    }
}

std::vector<TradeData> HistoricalDataDownloader::downloadTrades(const std::string& symbol,
                                                              int limit,
                                                              const std::string& start_date,
                                                              const std::string& end_date) {
    if (!auth_) {
        throw std::runtime_error("Authentication not initialized");
    }
    
    rateLimitDelay();
    
    std::stringstream endpoint;
    endpoint << "/v2/stocks/" << symbol << "/trades?limit=" << limit;
    
    if (!start_date.empty()) {
        endpoint << "&start=" << start_date;
    }
    if (!end_date.empty()) {
        endpoint << "&end=" << end_date;
    }
    
    try {
        // Note: This would need to be implemented in the auth class
        // For now, return empty vector
        return {};
    } catch (const std::exception& e) {
        std::cerr << "Error downloading trades for " << symbol << ": " << e.what() << std::endl;
        return {};
    }
}

std::map<std::string, std::vector<BarData>> HistoricalDataDownloader::downloadMultipleBars(
    const std::vector<std::string>& symbols,
    const std::string& timeframe,
    int limit,
    const std::string& start_date,
    const std::string& end_date) {
    
    std::map<std::string, std::vector<BarData>> result;
    
    for (const auto& symbol : symbols) {
        std::cout << "Downloading data for " << symbol << "..." << std::endl;
        auto bars = downloadBars(symbol, timeframe, limit, start_date, end_date);
        result[symbol] = std::move(bars);
        
        // Small delay between symbols to respect rate limits
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    
    return result;
}

void HistoricalDataDownloader::saveBarsToCSV(const std::vector<BarData>& bars, const std::string& filename) {
    std::ofstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + filename);
    }
    
    // Write header
    file << "symbol,timestamp,open,high,low,close,volume,trade_count,vwap\n";
    
    // Write data
    for (const auto& bar : bars) {
        file << bar.symbol << ","
             << formatTimestamp(bar.timestamp) << ","
             << bar.open << ","
             << bar.high << ","
             << bar.low << ","
             << bar.close << ","
             << bar.volume << ","
             << bar.trade_count << ","
             << bar.vwap << "\n";
    }
    
    file.close();
}

void HistoricalDataDownloader::saveQuotesToCSV(const std::vector<QuoteData>& quotes, const std::string& filename) {
    std::ofstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + filename);
    }
    
    // Write header
    file << "symbol,timestamp,bid_price,ask_price,bid_size,ask_size\n";
    
    // Write data
    for (const auto& quote : quotes) {
        file << quote.symbol << ","
             << formatTimestamp(quote.timestamp) << ","
             << quote.bid_price << ","
             << quote.ask_price << ","
             << quote.bid_size << ","
             << quote.ask_size << "\n";
    }
    
    file.close();
}

void HistoricalDataDownloader::saveTradesToCSV(const std::vector<TradeData>& trades, const std::string& filename) {
    std::ofstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + filename);
    }
    
    // Write header
    file << "symbol,timestamp,price,size,side,trade_id\n";
    
    // Write data
    for (const auto& trade : trades) {
        file << trade.symbol << ","
             << formatTimestamp(trade.timestamp) << ","
             << trade.price << ","
             << trade.size << ","
             << trade.side << ","
             << trade.trade_id << "\n";
    }
    
    file.close();
}

std::vector<BarData> HistoricalDataDownloader::loadBarsFromCSV(const std::string& filename) {
    std::vector<BarData> bars;
    std::ifstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + filename);
    }
    
    std::string line;
    std::getline(file, line); // Skip header
    
    while (std::getline(file, line)) {
        std::stringstream ss(line);
        std::string token;
        std::vector<std::string> tokens;
        
        while (std::getline(ss, token, ',')) {
            tokens.push_back(token);
        }
        
        if (tokens.size() >= 9) {
            BarData bar;
            bar.symbol = tokens[0];
            bar.timestamp = parseTimestamp(tokens[1]);
            bar.open = std::stod(tokens[2]);
            bar.high = std::stod(tokens[3]);
            bar.low = std::stod(tokens[4]);
            bar.close = std::stod(tokens[5]);
            bar.volume = std::stod(tokens[6]);
            bar.trade_count = std::stoi(tokens[7]);
            bar.vwap = std::stod(tokens[8]);
            bars.push_back(bar);
        }
    }
    
    file.close();
    return bars;
}

std::vector<QuoteData> HistoricalDataDownloader::loadQuotesFromCSV(const std::string& filename) {
    std::vector<QuoteData> quotes;
    std::ifstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + filename);
    }
    
    std::string line;
    std::getline(file, line); // Skip header
    
    while (std::getline(file, line)) {
        std::stringstream ss(line);
        std::string token;
        std::vector<std::string> tokens;
        
        while (std::getline(ss, token, ',')) {
            tokens.push_back(token);
        }
        
        if (tokens.size() >= 6) {
            QuoteData quote;
            quote.symbol = tokens[0];
            quote.timestamp = parseTimestamp(tokens[1]);
            quote.bid_price = std::stod(tokens[2]);
            quote.ask_price = std::stod(tokens[3]);
            quote.bid_size = std::stoi(tokens[4]);
            quote.ask_size = std::stoi(tokens[5]);
            quotes.push_back(quote);
        }
    }
    
    file.close();
    return quotes;
}

std::vector<TradeData> HistoricalDataDownloader::loadTradesFromCSV(const std::string& filename) {
    std::vector<TradeData> trades;
    std::ifstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + filename);
    }
    
    std::string line;
    std::getline(file, line); // Skip header
    
    while (std::getline(file, line)) {
        std::stringstream ss(line);
        std::string token;
        std::vector<std::string> tokens;
        
        while (std::getline(ss, token, ',')) {
            tokens.push_back(token);
        }
        
        if (tokens.size() >= 6) {
            TradeData trade;
            trade.symbol = tokens[0];
            trade.timestamp = parseTimestamp(tokens[1]);
            trade.price = std::stod(tokens[2]);
            trade.size = std::stod(tokens[3]);
            trade.side = tokens[4];
            trade.trade_id = tokens[5];
            trades.push_back(trade);
        }
    }
    
    file.close();
    return trades;
}

std::string HistoricalDataDownloader::formatTimestamp(const std::chrono::system_clock::time_point& tp) {
    auto time_t = std::chrono::system_clock::to_time_t(tp);
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(
        tp.time_since_epoch()) % 1000;
    
    std::stringstream ss;
    ss << std::put_time(std::gmtime(&time_t), "%Y-%m-%dT%H:%M:%S");
    ss << "." << std::setfill('0') << std::setw(3) << ms.count() << "Z";
    return ss.str();
}

std::chrono::system_clock::time_point HistoricalDataDownloader::parseTimestamp(const std::string& timestamp) {
    std::tm tm = {};
    std::stringstream ss(timestamp);
    ss >> std::get_time(&tm, "%Y-%m-%dT%H:%M:%S");
    
    auto time_t = std::mktime(&tm);
    return std::chrono::system_clock::from_time_t(time_t);
}

std::vector<BarData> HistoricalDataDownloader::parseBarsResponse(const nlohmann::json& response, const std::string& symbol) {
    std::vector<BarData> bars;
    
    if (response.contains("bars") && response["bars"].contains(symbol)) {
        for (const auto& bar_json : response["bars"][symbol]) {
            BarData bar;
            bar.symbol = symbol;
            bar.timestamp = parseTimestamp(bar_json["t"].get<std::string>());
            bar.open = bar_json["o"].get<double>();
            bar.high = bar_json["h"].get<double>();
            bar.low = bar_json["l"].get<double>();
            bar.close = bar_json["c"].get<double>();
            bar.volume = bar_json["v"].get<double>();
            bar.trade_count = bar_json["n"].get<int>();
            bar.vwap = bar_json["vw"].get<double>();
            bars.push_back(bar);
        }
    }
    
    return bars;
}

std::vector<QuoteData> HistoricalDataDownloader::parseQuotesResponse(const nlohmann::json& response, const std::string& symbol) {
    // Implementation for parsing quotes response
    return {};
}

std::vector<TradeData> HistoricalDataDownloader::parseTradesResponse(const nlohmann::json& response, const std::string& symbol) {
    // Implementation for parsing trades response
    return {};
}

void HistoricalDataDownloader::rateLimitDelay() {
    auto now = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(now - last_request_time_);
    
    if (elapsed.count() < MIN_REQUEST_INTERVAL_MS) {
        std::this_thread::sleep_for(std::chrono::milliseconds(MIN_REQUEST_INTERVAL_MS - elapsed.count()));
    }
    
    last_request_time_ = std::chrono::steady_clock::now();
}

} // namespace AlpacaTrading
