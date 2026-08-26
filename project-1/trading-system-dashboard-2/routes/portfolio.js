const express = require('express');
const router = express.Router();
const PortfolioService = require('../services/PortfolioService');

const portfolioService = new PortfolioService();

/**
 * @route POST /api/portfolio/optimize
 * @desc Optimize portfolio weights using Modern Portfolio Theory
 * @access Public
 */
router.post('/optimize', async (req, res) => {
  try {
    const { returns, method = 'max-sharpe', prices } = req.body;
    
    if (!returns || !Array.isArray(returns) || returns.length === 0) {
      return res.status(400).json({
        error: 'Invalid returns data',
        message: 'Returns must be a non-empty array of return arrays'
      });
    }
    
    const portfolioWeights = portfolioService.calculatePortfolioWeights(returns, method);
    const metrics = portfolioService.calculatePortfolioMetrics(portfolioWeights.weights, returns, prices);
    
    res.json({
      success: true,
      data: {
        weights: portfolioWeights,
        metrics,
        optimizationMethod: method
      }
    });
  } catch (error) {
    console.error('Portfolio optimization error:', error);
    res.status(500).json({
      error: 'Portfolio optimization failed',
      message: error.message
    });
  }
});

/**
 * @route POST /api/portfolio/analyze
 * @desc Analyze existing portfolio
 * @access Public
 */
router.post('/analyze', async (req, res) => {
  try {
    const { weights, returns, prices } = req.body;
    
    if (!weights || !returns || !prices) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Weights, returns, and prices are required'
      });
    }
    
    const metrics = portfolioService.calculatePortfolioMetrics(weights, returns, prices);
    
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Portfolio analysis error:', error);
    res.status(500).json({
      error: 'Portfolio analysis failed',
      message: error.message
    });
  }
});

/**
 * @route POST /api/portfolio/rebalance
 * @desc Calculate rebalancing trades
 * @access Public
 */
router.post('/rebalance', async (req, res) => {
  try {
    const { currentWeights, targetWeights, currentPrices, targetPrices } = req.body;
    
    if (!currentWeights || !targetWeights || !currentPrices || !targetPrices) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Current weights, target weights, current prices, and target prices are required'
      });
    }
    
    const rebalanceTrades = portfolioService.rebalancePortfolio(
      currentWeights,
      targetWeights,
      currentPrices,
      targetPrices
    );
    
    const transactionCosts = portfolioService.calculateTransactionCosts(rebalanceTrades);
    
    res.json({
      success: true,
      data: {
        trades: rebalanceTrades,
        transactionCosts,
        totalTrades: rebalanceTrades.length
      }
    });
  } catch (error) {
    console.error('Portfolio rebalancing error:', error);
    res.status(500).json({
      error: 'Portfolio rebalancing failed',
      message: error.message
    });
  }
});

/**
 * @route POST /api/portfolio/simulate
 * @desc Simulate portfolio performance using Monte Carlo
 * @access Public
 */
router.post('/simulate', async (req, res) => {
  try {
    const { weights, returns, numSimulations = 10000 } = req.body;
    
    if (!weights || !returns) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Weights and returns are required'
      });
    }
    
    const simulatedReturns = portfolioService.simulatePortfolioReturns(weights, returns, numSimulations);
    const cumulativeReturns = portfolioService.calculateCumulativeReturns(simulatedReturns);
    const maxDrawdown = portfolioService.calculateMaximumDrawdown(cumulativeReturns);
    
    // Calculate percentiles
    simulatedReturns.sort((a, b) => a - b);
    const percentiles = {
      p1: simulatedReturns[Math.floor(simulatedReturns.length * 0.01)],
      p5: simulatedReturns[Math.floor(simulatedReturns.length * 0.05)],
      p10: simulatedReturns[Math.floor(simulatedReturns.length * 0.10)],
      p25: simulatedReturns[Math.floor(simulatedReturns.length * 0.25)],
      p50: simulatedReturns[Math.floor(simulatedReturns.length * 0.50)],
      p75: simulatedReturns[Math.floor(simulatedReturns.length * 0.75)],
      p90: simulatedReturns[Math.floor(simulatedReturns.length * 0.90)],
      p95: simulatedReturns[Math.floor(simulatedReturns.length * 0.95)],
      p99: simulatedReturns[Math.floor(simulatedReturns.length * 0.99)]
    };
    
    res.json({
      success: true,
      data: {
        simulatedReturns,
        cumulativeReturns,
        maxDrawdown,
        percentiles,
        numSimulations
      }
    });
  } catch (error) {
    console.error('Portfolio simulation error:', error);
    res.status(500).json({
      error: 'Portfolio simulation failed',
      message: error.message
    });
  }
});

/**
 * @route GET /api/portfolio/methods
 * @desc Get available portfolio optimization methods
 * @access Public
 */
router.get('/methods', (req, res) => {
  const methods = [
    {
      id: 'equal',
      name: 'Equal Weight',
      description: 'Equal allocation across all assets',
      category: 'simple'
    },
    {
      id: 'min-variance',
      name: 'Minimum Variance',
      description: 'Portfolio weights that minimize total variance',
      category: 'risk-based'
    },
    {
      id: 'max-sharpe',
      name: 'Maximum Sharpe Ratio',
      description: 'Portfolio weights that maximize risk-adjusted returns',
      category: 'risk-adjusted'
    },
    {
      id: 'risk-parity',
      name: 'Risk Parity',
      description: 'Portfolio weights that equalize risk contribution from each asset',
      category: 'risk-based'
    }
  ];
  
  res.json({
    success: true,
    data: methods
  });
});

module.exports = router;
