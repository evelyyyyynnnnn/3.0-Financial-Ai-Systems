const express = require('express');
const router = express.Router();
const MarketDataService = require('../services/MarketDataService');

const marketDataService = new MarketDataService();

/**
 * @route GET /api/market-data/quote/:symbol
 * @desc Get real-time quote for a symbol
 * @access Public
 */
router.get('/quote/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const quote = await marketDataService.getRealTimeData(symbol);
    
    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    console.error('Quote error:', error);
    res.status(500).json({
      error: 'Failed to fetch quote',
      message: error.message
    });
  }
});

/**
 * @route GET /api/market-data/historical/:symbol
 * @desc Get historical data for a symbol
 * @access Public
 */
router.get('/historical/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { period = '1y', interval = '1d' } = req.query;
    
    const historicalData = await marketDataService.getHistoricalData(symbol, period, interval);
    
    res.json({
      success: true,
      data: historicalData
    });
  } catch (error) {
    console.error('Historical data error:', error);
    res.status(500).json({
      error: 'Failed to fetch historical data',
      message: error.message
    });
  }
});

/**
 * @route GET /api/market-data/indicators/:symbol
 * @desc Get technical indicators for a symbol
 * @access Public
 */
router.get('/indicators/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { period = '1y', interval = '1d' } = req.query;
    
    const historicalData = await marketDataService.getHistoricalData(symbol, period, interval);
    const indicators = marketDataService.calculateIndicators(historicalData, {
      sma: { 20: true, 50: true, 200: true },
      ema: { 12: true, 26: true },
      rsi: { period: 14 },
      macd: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
      bollinger: { period: 20, stdDev: 2 }
    });
    
    res.json({
      success: true,
      data: {
        symbol,
        indicators,
        priceData: historicalData
      }
    });
  } catch (error) {
    console.error('Indicators error:', error);
    res.status(500).json({
      error: 'Failed to calculate indicators',
      message: error.message
    });
  }
});

/**
 * @route GET /api/market-data/summary
 * @desc Get market summary for multiple symbols
 * @access Public
 */
router.get('/summary', async (req, res) => {
  try {
    const { symbols } = req.query;
    
    if (!symbols) {
      return res.status(400).json({
        error: 'Missing symbols parameter',
        message: 'Symbols parameter is required'
      });
    }
    
    const symbolArray = symbols.split(',');
    const summary = await marketDataService.getMarketSummary(symbolArray);
    
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Market summary error:', error);
    res.status(500).json({
      error: 'Failed to fetch market summary',
      message: error.message
    });
  }
});

/**
 * @route GET /api/market-data/search
 * @desc Search for symbols by company name
 * @access Public
 */
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        error: 'Missing query parameter',
        message: 'Query parameter is required'
      });
    }
    
    const results = await marketDataService.searchSymbols(query);
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
});

/**
 * @route GET /api/market-data/options/:symbol
 * @desc Get options chain for a symbol
 * @access Public
 */
router.get('/options/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const options = await marketDataService.getOptionsChain(symbol);
    
    res.json({
      success: true,
      data: options
    });
  } catch (error) {
    console.error('Options error:', error);
    res.status(500).json({
      error: 'Failed to fetch options chain',
      message: error.message
    });
  }
});

/**
 * @route POST /api/market-data/clear-cache
 * @desc Clear market data cache
 * @access Public
 */
router.post('/clear-cache', (req, res) => {
  try {
    const { symbol } = req.body;
    marketDataService.clearCache(symbol);
    
    res.json({
      success: true,
      message: symbol ? `Cache cleared for ${symbol}` : 'All cache cleared'
    });
  } catch (error) {
    console.error('Clear cache error:', error);
    res.status(500).json({
      error: 'Failed to clear cache',
      message: error.message
    });
  }
});

module.exports = router;
