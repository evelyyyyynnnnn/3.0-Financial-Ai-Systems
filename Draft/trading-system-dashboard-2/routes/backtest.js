const express = require('express');
const router = express.Router();
const BacktestService = require('../services/BacktestService');
const MarketDataService = require('../services/MarketDataService');

const backtestService = new BacktestService();
const marketDataService = new MarketDataService();

/**
 * @route POST /api/backtest/run
 * @desc Run a backtest for a specific strategy
 * @access Public
 */
router.post('/run', async (req, res) => {
  try {
    const {
      strategy,
      symbol,
      startDate,
      endDate,
      initialCapital = 100000,
      commission = 0.001,
      slippage = 0.0005,
      parameters = {}
    } = req.body;

    // Validate required fields
    if (!strategy || !symbol) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Strategy and symbol are required'
      });
    }

    // Get historical data
    const historicalData = await marketDataService.getHistoricalData(
      symbol,
      '1y',
      '1d'
    );

    // Filter data by date range if specified
    let filteredData = historicalData;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = historicalData.filter(d => d.date >= start && d.date <= end);
    }

    // Run backtest
    const results = await backtestService.runBacktest({
      strategy,
      symbol,
      startDate: startDate || filteredData[0]?.date,
      endDate: endDate || filteredData[filteredData.length - 1]?.date,
      initialCapital,
      commission,
      slippage,
      data: filteredData,
      parameters
    });

    res.json({
      success: true,
      data: results,
      metadata: {
        symbol,
        strategy,
        startDate: results.equity[0]?.date,
        endDate: results.equity[results.equity.length - 1]?.date,
        dataPoints: filteredData.length,
        executionTime: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Backtest error:', error);
    res.status(500).json({
      error: 'Backtest failed',
      message: error.message
    });
  }
});

/**
 * @route GET /api/backtest/strategies
 * @desc Get available trading strategies
 * @access Public
 */
router.get('/strategies', (req, res) => {
  const strategies = [
    {
      id: 'moving-average-crossover',
      name: 'Moving Average Crossover',
      description: 'Golden cross and death cross signals based on moving average crossovers',
      parameters: {
        fastPeriod: { type: 'number', default: 10, min: 5, max: 50, description: 'Fast moving average period' },
        slowPeriod: { type: 'number', default: 20, min: 10, max: 100, description: 'Slow moving average period' }
      },
      category: 'trend-following'
    },
    {
      id: 'mean-reversion',
      name: 'Mean Reversion',
      description: 'Bollinger Bands + RSI mean reversion strategy',
      parameters: {
        period: { type: 'number', default: 20, min: 10, max: 50, description: 'Bollinger Bands period' },
        stdDev: { type: 'number', default: 2, min: 1, max: 3, description: 'Standard deviation multiplier' },
        rsiPeriod: { type: 'number', default: 14, min: 10, max: 30, description: 'RSI period' },
        rsiOverbought: { type: 'number', default: 70, min: 60, max: 80, description: 'RSI overbought threshold' },
        rsiOversold: { type: 'number', default: 30, min: 20, max: 40, description: 'RSI oversold threshold' }
      },
      category: 'mean-reversion'
    },
    {
      id: 'momentum',
      name: 'Momentum',
      description: 'Price momentum-based strategy with configurable thresholds',
      parameters: {
        lookbackPeriod: { type: 'number', default: 20, min: 10, max: 60, description: 'Lookback period for momentum calculation' },
        threshold: { type: 'number', default: 0.05, min: 0.01, max: 0.20, description: 'Momentum threshold for signals' }
      },
      category: 'momentum'
    },
    {
      id: 'bollinger-bands',
      name: 'Bollinger Bands',
      description: 'Simple Bollinger Bands breakout strategy',
      parameters: {
        period: { type: 'number', default: 20, min: 10, max: 50, description: 'Moving average period' },
        stdDev: { type: 'number', default: 2, min: 1, max: 3, description: 'Standard deviation multiplier' }
      },
      category: 'mean-reversion'
    },
    {
      id: 'rsi-divergence',
      name: 'RSI Divergence',
      description: 'RSI divergence detection for trend reversal signals',
      parameters: {
        period: { type: 'number', default: 14, min: 10, max: 30, description: 'RSI period' },
        divergencePeriod: { type: 'number', default: 20, min: 10, max: 50, description: 'Period for divergence detection' }
      },
      category: 'oscillator'
    },
    {
      id: 'macd-crossover',
      name: 'MACD Crossover',
      description: 'MACD line and signal line crossover strategy',
      parameters: {
        fastPeriod: { type: 'number', default: 12, min: 8, max: 20, description: 'Fast EMA period' },
        slowPeriod: { type: 'number', default: 26, min: 20, max: 40, description: 'Slow EMA period' },
        signalPeriod: { type: 'number', default: 9, min: 5, max: 15, description: 'Signal line period' }
      },
      category: 'trend-following'
    }
  ];

  res.json({
    success: true,
    data: strategies
  });
});

/**
 * @route POST /api/backtest/compare
 * @desc Compare multiple strategies on the same data
 * @access Public
 */
router.post('/compare', async (req, res) => {
  try {
    const {
      strategies,
      symbol,
      startDate,
      endDate,
      initialCapital = 100000,
      commission = 0.001,
      slippage = 0.0005
    } = req.body;

    if (!strategies || !Array.isArray(strategies) || strategies.length === 0) {
      return res.status(400).json({
        error: 'Invalid strategies',
        message: 'Strategies must be a non-empty array'
      });
    }

    // Get historical data
    const historicalData = await marketDataService.getHistoricalData(symbol, '1y', '1d');
    
    // Filter data by date range if specified
    let filteredData = historicalData;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = historicalData.filter(d => d.date >= start && d.date <= end);
    }

    // Run backtests for all strategies
    const results = [];
    for (const strategyConfig of strategies) {
      try {
        const result = await backtestService.runBacktest({
          strategy: strategyConfig.strategy,
          symbol,
          startDate: startDate || filteredData[0]?.date,
          endDate: endDate || filteredData[filteredData.length - 1]?.date,
          initialCapital,
          commission,
          slippage,
          data: filteredData,
          parameters: strategyConfig.parameters || {}
        });

        results.push({
          strategy: strategyConfig.strategy,
          success: true,
          data: result
        });
      } catch (error) {
        results.push({
          strategy: strategyConfig.strategy,
          success: false,
          error: error.message
        });
      }
    }

    // Calculate comparison metrics
    const comparison = this.calculateStrategyComparison(results, initialCapital);

    res.json({
      success: true,
      data: {
        results,
        comparison,
        metadata: {
          symbol,
          startDate: filteredData[0]?.date,
          endDate: filteredData[filteredData.length - 1]?.date,
          dataPoints: filteredData.length,
          executionTime: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Strategy comparison error:', error);
    res.status(500).json({
      error: 'Strategy comparison failed',
      message: error.message
    });
  }
});

/**
 * @route POST /api/backtest/optimize
 * @desc Optimize strategy parameters using grid search
 * @access Public
 */
router.post('/optimize', async (req, res) => {
  try {
    const {
      strategy,
      symbol,
      startDate,
      endDate,
      initialCapital = 100000,
      commission = 0.001,
      slippage = 0.0005,
      parameterRanges,
      metric = 'sharpeRatio'
    } = req.body;

    if (!strategy || !symbol || !parameterRanges) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Strategy, symbol, and parameterRanges are required'
      });
    }

    // Get historical data
    const historicalData = await marketDataService.getHistoricalData(symbol, '1y', '1d');
    
    // Filter data by date range if specified
    let filteredData = historicalData;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = historicalData.filter(d => d.date >= start && d.date <= end);
    }

    // Generate parameter combinations
    const parameterCombinations = this.generateParameterCombinations(parameterRanges);
    
    // Test each combination
    const results = [];
    for (const params of parameterCombinations) {
      try {
        const result = await backtestService.runBacktest({
          strategy,
          symbol,
          startDate: startDate || filteredData[0]?.date,
          endDate: endDate || filteredData[filteredData.length - 1]?.date,
          initialCapital,
          commission,
          slippage,
          data: filteredData,
          parameters: params
        });

        results.push({
          parameters: params,
          metrics: result.summary,
          success: true
        });
      } catch (error) {
        results.push({
          parameters: params,
          success: false,
          error: error.message
        });
      }
    }

    // Find best parameters
    const successfulResults = results.filter(r => r.success);
    if (successfulResults.length === 0) {
      return res.status(400).json({
        error: 'No successful backtests',
        message: 'All parameter combinations failed'
      });
    }

    // Sort by metric
    successfulResults.sort((a, b) => b.metrics[metric] - a.metrics[metric]);
    const bestResult = successfulResults[0];

    res.json({
      success: true,
      data: {
        bestParameters: bestResult.parameters,
        bestMetrics: bestResult.metrics,
        allResults: results,
        optimizationMetric: metric,
        totalCombinations: parameterCombinations.length,
        successfulCombinations: successfulResults.length
      }
    });

  } catch (error) {
    console.error('Parameter optimization error:', error);
    res.status(500).json({
      error: 'Parameter optimization failed',
      message: error.message
    });
  }
});

/**
 * @route GET /api/backtest/performance
 * @desc Get backtest performance statistics
 * @access Public
 */
router.get('/performance', (req, res) => {
  const performanceMetrics = {
    totalBacktests: 0,
    averageSharpeRatio: 0,
    averageReturn: 0,
    averageMaxDrawdown: 0,
    strategies: {}
  };

  res.json({
    success: true,
    data: performanceMetrics
  });
});

// Helper methods
router.calculateStrategyComparison = (results, initialCapital) => {
  const successfulResults = results.filter(r => r.success);
  
  if (successfulResults.length === 0) {
    return null;
  }

  const comparison = {
    bestSharpeRatio: { strategy: null, value: -Infinity },
    bestReturn: { strategy: null, value: -Infinity },
    bestRiskAdjusted: { strategy: null, value: -Infinity },
    lowestDrawdown: { strategy: null, value: Infinity },
    summary: []
  };

  for (const result of successfulResults) {
    const metrics = result.data.summary;
    
    // Best Sharpe ratio
    if (metrics.sharpeRatio > comparison.bestSharpeRatio.value) {
      comparison.bestSharpeRatio = { strategy: result.strategy, value: metrics.sharpeRatio };
    }
    
    // Best return
    if (metrics.totalReturn > comparison.bestReturn.value) {
      comparison.bestReturn = { strategy: result.strategy, value: metrics.totalReturn };
    }
    
    // Best risk-adjusted return (return / max drawdown)
    const riskAdjusted = metrics.totalReturn / Math.abs(metrics.maxDrawdown);
    if (riskAdjusted > comparison.bestRiskAdjusted.value) {
      comparison.bestRiskAdjusted = { strategy: result.strategy, value: riskAdjusted };
    }
    
    // Lowest drawdown
    if (Math.abs(metrics.maxDrawdown) < comparison.lowestDrawdown.value) {
      comparison.lowestDrawdown = { strategy: result.strategy, value: Math.abs(metrics.maxDrawdown) };
    }
    
    comparison.summary.push({
      strategy: result.strategy,
      totalReturn: metrics.totalReturn,
      sharpeRatio: metrics.sharpeRatio,
      maxDrawdown: metrics.maxDrawdown,
      volatility: metrics.volatility,
      winRate: metrics.winRate
    });
  }

  return comparison;
};

router.generateParameterCombinations = (parameterRanges) => {
  const combinations = [];
  const keys = Object.keys(parameterRanges);
  
  const generateCombinations = (current, index) => {
    if (index === keys.length) {
      combinations.push({ ...current });
      return;
    }
    
    const key = keys[index];
    const range = parameterRanges[key];
    
    for (let value = range.min; value <= range.max; value += range.step || 1) {
      current[key] = value;
      generateCombinations(current, index + 1);
    }
  };
  
  generateCombinations({}, 0);
  return combinations;
};

module.exports = router;
