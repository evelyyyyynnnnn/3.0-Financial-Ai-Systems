const yahooFinance = require('yahoo-finance2').default;
const moment = require('moment');
const { SMA, EMA, RSI, MACD, BollingerBands } = require('technicalindicators');

class MarketDataService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30000; // 30 seconds
  }

  /**
   * Get real-time market data for a symbol
   * @param {string} symbol - Stock symbol
   * @returns {Promise<Object>} Real-time market data
   */
  async getRealTimeData(symbol) {
    try {
      const cacheKey = `realtime-${symbol}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }

      const quote = await yahooFinance.quote(symbol);
      
      const marketData = {
        symbol: quote.symbol,
        price: quote.regularMarketPrice,
        change: quote.regularMarketChange,
        changePercent: quote.regularMarketChangePercent,
        volume: quote.regularMarketVolume,
        marketCap: quote.marketCap,
        pe: quote.trailingPE,
        high: quote.regularMarketDayHigh,
        low: quote.regularMarketDayLow,
        open: quote.regularMarketOpen,
        previousClose: quote.regularMarketPreviousClose,
        timestamp: new Date().toISOString()
      };

      // Cache the data
      this.cache.set(cacheKey, {
        data: marketData,
        timestamp: Date.now()
      });

      return marketData;
    } catch (error) {
      console.error(`Error fetching real-time data for ${symbol}:`, error);
      throw new Error(`Failed to fetch market data for ${symbol}`);
    }
  }

  /**
   * Get historical data for backtesting
   * @param {string} symbol - Stock symbol
   * @param {string} period - Time period (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
   * @param {string} interval - Data interval (1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo)
   * @returns {Promise<Array>} Historical price data
   */
  async getHistoricalData(symbol, period = '1y', interval = '1d') {
    try {
      const cacheKey = `historical-${symbol}-${period}-${interval}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout * 10) {
        return cached.data;
      }

      const historicalData = await yahooFinance.historical(symbol, {
        period,
        interval
      });

      const formattedData = historicalData.map(candle => ({
        date: candle.date,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume,
        timestamp: candle.date.getTime()
      }));

      // Cache the data
      this.cache.set(cacheKey, {
        data: formattedData,
        timestamp: Date.now()
      });

      return formattedData;
    } catch (error) {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      throw new Error(`Failed to fetch historical data for ${symbol}`);
    }
  }

  /**
   * Calculate technical indicators
   * @param {Array} priceData - Array of price objects with close prices
   * @param {Object} indicators - Object specifying which indicators to calculate
   * @returns {Object} Calculated indicators
   */
  calculateIndicators(priceData, indicators = {}) {
    const closePrices = priceData.map(d => d.close);
    const highPrices = priceData.map(d => d.high);
    const lowPrices = priceData.map(d => d.low);
    const volume = priceData.map(d => d.volume);

    const result = {};

    // Simple Moving Average
    if (indicators.sma) {
      result.sma = {};
      Object.keys(indicators.sma).forEach(period => {
        result.sma[period] = SMA.calculate({
          period: parseInt(period),
          values: closePrices
        });
      });
    }

    // Exponential Moving Average
    if (indicators.ema) {
      result.ema = {};
      Object.keys(indicators.ema).forEach(period => {
        result.ema[period] = EMA.calculate({
          period: parseInt(period),
          values: closePrices
        });
      });
    }

    // RSI
    if (indicators.rsi) {
      result.rsi = RSI.calculate({
        period: indicators.rsi.period || 14,
        values: closePrices
      });
    }

    // MACD
    if (indicators.macd) {
      result.macd = MACD.calculate({
        fastPeriod: indicators.macd.fastPeriod || 12,
        slowPeriod: indicators.macd.slowPeriod || 26,
        signalPeriod: indicators.macd.signalPeriod || 9,
        values: closePrices
      });
    }

    // Bollinger Bands
    if (indicators.bollinger) {
      result.bollinger = BollingerBands.calculate({
        period: indicators.bollinger.period || 20,
        stdDev: indicators.bollinger.stdDev || 2,
        values: closePrices
      });
    }

    return result;
  }

  /**
   * Get market summary for multiple symbols
   * @param {Array} symbols - Array of stock symbols
   * @returns {Promise<Array>} Market summary data
   */
  async getMarketSummary(symbols) {
    try {
      const promises = symbols.map(symbol => this.getRealTimeData(symbol));
      const results = await Promise.allSettled(promises);
      
      return results.map((result, index) => ({
        symbol: symbols[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason.message : null
      }));
    } catch (error) {
      console.error('Error fetching market summary:', error);
      throw new Error('Failed to fetch market summary');
    }
  }

  /**
   * Search for symbols by company name
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  async searchSymbols(query) {
    try {
      const results = await yahooFinance.search(query);
      return results.quotes.map(quote => ({
        symbol: quote.symbol,
        name: quote.shortname || quote.longname,
        exchange: quote.exchange,
        type: quote.quoteType
      }));
    } catch (error) {
      console.error('Error searching symbols:', error);
      throw new Error('Failed to search symbols');
    }
  }

  /**
   * Get options chain data
   * @param {string} symbol - Stock symbol
   * @returns {Promise<Object>} Options chain data
   */
  async getOptionsChain(symbol) {
    try {
      const options = await yahooFinance.options(symbol);
      return {
        symbol,
        expirationDates: options.expirationDates,
        strikes: options.strikes,
        calls: options.calls,
        puts: options.puts,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching options chain for ${symbol}:`, error);
      throw new Error(`Failed to fetch options chain for ${symbol}`);
    }
  }

  /**
   * Clear cache for a specific symbol or all cache
   * @param {string} symbol - Optional symbol to clear cache for
   */
  clearCache(symbol = null) {
    if (symbol) {
      // Clear all cache entries for a specific symbol
      for (const [key] of this.cache) {
        if (key.includes(symbol)) {
          this.cache.delete(key);
        }
      }
    } else {
      // Clear all cache
      this.cache.clear();
    }
  }
}

module.exports = MarketDataService;
