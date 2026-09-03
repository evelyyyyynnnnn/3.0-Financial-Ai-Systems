#pragma once

#include <string>
#include <vector>
#include <map>
#include <chrono>
#include <nlohmann/json.hpp>
#include "../authentication.h"

namespace AlpacaTrading {

struct BarData {
    std::string symbol;
    std::chrono::system_clock::time_point timestamp;
    double open;
    double high;
    double low;
    double close;
    double volume;
    int trade_count;
    double vwap;
};

struct QuoteData {
    std::string symbol;
    std::chrono::system_clock::time_point timestamp;
    double bid_price;
    double ask_price;
    int bid_size;
    int ask_size;
};

struct TradeData {
    std::string symbol;
    std::chrono::system_clock::time_point timestamp;
    double price;
    double size;
    std::string side;
    std::string trade_id;
};

class HistoricalDataDownloader {
public:
    HistoricalDataDownloader();
    ~HistoricalDataDownloader() = default;
    
    // Download bar data
    std::vector<BarData> downloadBars(const std::string& symbol,
                                    const std::string& timeframe = "1Min",
                                    int limit = 1000,
                                    const std::string& start_date = "",
                                    const std::string& end_date = "");
    
    // Download quote data
    std::vector<QuoteData> downloadQuotes(const std::string& symbol,
                                         int limit = 1000,
                                         const std::string& start_date = "",
                                         const std::string& end_date = "");
    
    // Download trade data
    std::vector<TradeData> downloadTrades(const std::string& symbol,
                                         int limit = 1000,
                                         const std::string& start_date = "",
                                         const std::string& end_date = "");
    
    // Download multiple symbols
    std::map<std::string, std::vector<BarData>> downloadMultipleBars(
        const std::vector<std::string>& symbols,
        const std::string& timeframe = "1Min",
        int limit = 1000,
        const std::string& start_date = "",
        const std::string& end_date = "");
    
    // Save data to CSV
    void saveBarsToCSV(const std::vector<BarData>& bars, const std::string& filename);
    void saveQuotesToCSV(const std::vector<QuoteData>& quotes, const std::string& filename);
    void saveTradesToCSV(const std::vector<TradeData>& trades, const std::string& filename);
    
    // Load data from CSV
    std::vector<BarData> loadBarsFromCSV(const std::string& filename);
    std::vector<QuoteData> loadQuotesFromCSV(const std::string& filename);
    std::vector<TradeData> loadTradesFromCSV(const std::string& filename);

private:
    AlpacaAuth* auth_;
    
    // Helper functions
    std::string formatTimestamp(const std::chrono::system_clock::time_point& tp);
    std::chrono::system_clock::time_point parseTimestamp(const std::string& timestamp);
    
    // Parse API responses
    std::vector<BarData> parseBarsResponse(const nlohmann::json& response, const std::string& symbol);
    std::vector<QuoteData> parseQuotesResponse(const nlohmann::json& response, const std::string& symbol);
    std::vector<TradeData> parseTradesResponse(const nlohmann::json& response, const std::string& symbol);
    
    // Rate limiting
    void rateLimitDelay();
    std::chrono::steady_clock::time_point last_request_time_;
    static constexpr int MIN_REQUEST_INTERVAL_MS = 100; // 100ms between requests
};

} // namespace AlpacaTrading
