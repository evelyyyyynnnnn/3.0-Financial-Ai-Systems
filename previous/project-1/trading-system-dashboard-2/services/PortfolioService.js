const moment = require('moment');

class PortfolioService {
  constructor() {
    this.riskFreeRate = 0.02; // 2% annual risk-free rate
  }

  /**
   * Calculate portfolio weights using Modern Portfolio Theory
   * @param {Array} returns - Array of return arrays for each asset
   * @param {string} method - Optimization method ('equal', 'min-variance', 'max-sharpe', 'risk-parity')
   * @returns {Object} Portfolio weights and metrics
   */
  calculatePortfolioWeights(returns, method = 'max-sharpe') {
    const numAssets = returns.length;
    
    if (method === 'equal') {
      return this.equalWeightPortfolio(numAssets);
    } else if (method === 'min-variance') {
      return this.minimumVariancePortfolio(returns);
    } else if (method === 'max-sharpe') {
      return this.maximumSharpePortfolio(returns);
    } else if (method === 'risk-parity') {
      return this.riskParityPortfolio(returns);
    }
    
    throw new Error(`Unknown optimization method: ${method}`);
  }

  /**
   * Equal weight portfolio
   */
  equalWeightPortfolio(numAssets) {
    const weight = 1 / numAssets;
    const weights = new Array(numAssets).fill(weight);
    
    return {
      weights,
      method: 'equal-weight',
      description: 'Equal allocation across all assets'
    };
  }

  /**
   * Minimum variance portfolio
   */
  minimumVariancePortfolio(returns) {
    const numAssets = returns.length;
    const covarianceMatrix = this.calculateCovarianceMatrix(returns);
    
    // Simple optimization: find weights that minimize variance
    // This is a simplified version - in practice, you'd use a proper optimization library
    const weights = new Array(numAssets).fill(1 / numAssets);
    
    // Iterative optimization to minimize variance
    for (let iteration = 0; iteration < 100; iteration++) {
      const newWeights = [...weights];
      
      for (let i = 0; i < numAssets; i++) {
        let partialDerivative = 0;
        for (let j = 0; j < numAssets; j++) {
          partialDerivative += 2 * covarianceMatrix[i][j] * weights[j];
        }
        newWeights[i] = Math.max(0, weights[i] - 0.01 * partialDerivative);
      }
      
      // Normalize weights
      const sum = newWeights.reduce((a, b) => a + b, 0);
      for (let i = 0; i < numAssets; i++) {
        newWeights[i] = newWeights[i] / sum;
      }
      
      weights.splice(0, weights.length, ...newWeights);
    }
    
    return {
      weights,
      method: 'minimum-variance',
      description: 'Portfolio weights that minimize total variance'
    };
  }

  /**
   * Maximum Sharpe ratio portfolio
   */
  maximumSharpePortfolio(returns) {
    const numAssets = returns.length;
    const expectedReturns = returns.map(assetReturns => 
      assetReturns.reduce((sum, ret) => sum + ret, 0) / assetReturns.length
    );
    const covarianceMatrix = this.calculateCovarianceMatrix(returns);
    
    // Simplified optimization for maximum Sharpe ratio
    const weights = new Array(numAssets).fill(1 / numAssets);
    
    for (let iteration = 0; iteration < 100; iteration++) {
      const newWeights = [...weights];
      
      for (let i = 0; i < numAssets; i++) {
        let partialDerivative = 0;
        
        // Calculate partial derivative of Sharpe ratio
        const portfolioReturn = this.calculatePortfolioReturn(weights, expectedReturns);
        const portfolioRisk = this.calculatePortfolioRisk(weights, covarianceMatrix);
        
        for (let j = 0; j < numAssets; j++) {
          partialDerivative += covarianceMatrix[i][j] * weights[j];
        }
        
        const returnContribution = expectedReturns[i] - this.riskFreeRate;
        const riskContribution = partialDerivative / portfolioRisk;
        
        newWeights[i] = Math.max(0, weights[i] + 0.01 * (returnContribution - riskContribution));
      }
      
      // Normalize weights
      const sum = newWeights.reduce((a, b) => a + b, 0);
      for (let i = 0; i < numAssets; i++) {
        newWeights[i] = newWeights[i] / sum;
      }
      
      weights.splice(0, weights.length, ...newWeights);
    }
    
    return {
      weights,
      method: 'maximum-sharpe',
      description: 'Portfolio weights that maximize Sharpe ratio'
    };
  }

  /**
   * Risk parity portfolio
   */
  riskParityPortfolio(returns) {
    const numAssets = returns.length;
    const covarianceMatrix = this.calculateCovarianceMatrix(returns);
    const weights = new Array(numAssets).fill(1 / numAssets);
    
    // Iterative optimization to achieve equal risk contribution
    for (let iteration = 0; iteration < 100; iteration++) {
      const newWeights = [...weights];
      const riskContributions = this.calculateRiskContributions(weights, covarianceMatrix);
      const avgRiskContribution = riskContributions.reduce((a, b) => a + b, 0) / numAssets;
      
      for (let i = 0; i < numAssets; i++) {
        const riskDiff = riskContributions[i] - avgRiskContribution;
        newWeights[i] = Math.max(0, weights[i] - 0.01 * riskDiff);
      }
      
      // Normalize weights
      const sum = newWeights.reduce((a, b) => a + b, 0);
      for (let i = 0; i < numAssets; i++) {
        newWeights[i] = newWeights[i] / sum;
      }
      
      weights.splice(0, weights.length, ...newWeights);
    }
    
    return {
      weights,
      method: 'risk-parity',
      description: 'Portfolio weights that equalize risk contribution from each asset'
    };
  }

  /**
   * Calculate covariance matrix
   */
  calculateCovarianceMatrix(returns) {
    const numAssets = returns.length;
    const covarianceMatrix = Array(numAssets).fill().map(() => Array(numAssets).fill(0));
    
    for (let i = 0; i < numAssets; i++) {
      for (let j = 0; j < numAssets; j++) {
        if (i === j) {
          // Variance
          const mean = returns[i].reduce((sum, ret) => sum + ret, 0) / returns[i].length;
          const variance = returns[i].reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns[i].length;
          covarianceMatrix[i][j] = variance;
        } else {
          // Covariance
          const meanI = returns[i].reduce((sum, ret) => sum + ret, 0) / returns[i].length;
          const meanJ = returns[j].reduce((sum, ret) => sum + ret, 0) / returns[j].length;
          
          let covariance = 0;
          for (let k = 0; k < returns[i].length; k++) {
            covariance += (returns[i][k] - meanI) * (returns[j][k] - meanJ);
          }
          covarianceMatrix[i][j] = covariance / returns[i].length;
        }
      }
    }
    
    return covarianceMatrix;
  }

  /**
   * Calculate portfolio return
   */
  calculatePortfolioReturn(weights, expectedReturns) {
    return weights.reduce((sum, weight, i) => sum + weight * expectedReturns[i], 0);
  }

  /**
   * Calculate portfolio risk (standard deviation)
   */
  calculatePortfolioRisk(weights, covarianceMatrix) {
    let variance = 0;
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        variance += weights[i] * weights[j] * covarianceMatrix[i][j];
      }
    }
    return Math.sqrt(variance);
  }

  /**
   * Calculate risk contributions
   */
  calculateRiskContributions(weights, covarianceMatrix) {
    const portfolioRisk = this.calculatePortfolioRisk(weights, covarianceMatrix);
    const riskContributions = [];
    
    for (let i = 0; i < weights.length; i++) {
      let contribution = 0;
      for (let j = 0; j < weights.length; j++) {
        contribution += weights[i] * weights[j] * covarianceMatrix[i][j];
      }
      riskContributions.push(contribution / portfolioRisk);
    }
    
    return riskContributions;
  }

  /**
   * Calculate portfolio metrics
   */
  calculatePortfolioMetrics(weights, returns, prices) {
    const numAssets = returns.length;
    const expectedReturns = returns.map(assetReturns => 
      assetReturns.reduce((sum, ret) => sum + ret, 0) / assetReturns.length
    );
    const covarianceMatrix = this.calculateCovarianceMatrix(returns);
    
    const portfolioReturn = this.calculatePortfolioReturn(weights, expectedReturns);
    const portfolioRisk = this.calculatePortfolioRisk(weights, covarianceMatrix);
    const sharpeRatio = (portfolioReturn - this.riskFreeRate) / portfolioRisk;
    
    // Calculate Value at Risk (VaR)
    const portfolioReturns = this.simulatePortfolioReturns(weights, returns, 10000);
    portfolioReturns.sort((a, b) => a - b);
    const var95 = portfolioReturns[Math.floor(portfolioReturns.length * 0.05)];
    const var99 = portfolioReturns[Math.floor(portfolioReturns.length * 0.01)];
    
    // Calculate maximum drawdown
    const cumulativeReturns = this.calculateCumulativeReturns(portfolioReturns);
    const maxDrawdown = this.calculateMaximumDrawdown(cumulativeReturns);
    
    // Calculate diversification ratio
    const individualRisks = returns.map(assetReturns => {
      const mean = assetReturns.reduce((sum, ret) => sum + ret, 0) / assetReturns.length;
      const variance = assetReturns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / assetReturns.length;
      return Math.sqrt(variance);
    });
    
    const weightedIndividualRisk = weights.reduce((sum, weight, i) => sum + weight * individualRisks[i], 0);
    const diversificationRatio = weightedIndividualRisk / portfolioRisk;
    
    return {
      weights,
      expectedReturn: portfolioReturn,
      risk: portfolioRisk,
      sharpeRatio,
      var95,
      var99,
      maxDrawdown,
      diversificationRatio,
      riskContributions: this.calculateRiskContributions(weights, covarianceMatrix)
    };
  }

  /**
   * Simulate portfolio returns using Monte Carlo
   */
  simulatePortfolioReturns(weights, returns, numSimulations) {
    const numAssets = returns.length;
    const portfolioReturns = [];
    
    for (let sim = 0; sim < numSimulations; sim++) {
      let portfolioReturn = 0;
      
      for (let asset = 0; asset < numAssets; asset++) {
        const randomIndex = Math.floor(Math.random() * returns[asset].length);
        portfolioReturn += weights[asset] * returns[asset][randomIndex];
      }
      
      portfolioReturns.push(portfolioReturn);
    }
    
    return portfolioReturns;
  }

  /**
   * Calculate cumulative returns
   */
  calculateCumulativeReturns(returns) {
    const cumulative = [1];
    for (let i = 0; i < returns.length; i++) {
      cumulative.push(cumulative[i] * (1 + returns[i]));
    }
    return cumulative;
  }

  /**
   * Calculate maximum drawdown
   */
  calculateMaximumDrawdown(cumulativeReturns) {
    let maxDrawdown = 0;
    let peak = cumulativeReturns[0];
    
    for (let i = 1; i < cumulativeReturns.length; i++) {
      if (cumulativeReturns[i] > peak) {
        peak = cumulativeReturns[i];
      }
      const drawdown = (peak - cumulativeReturns[i]) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
    
    return maxDrawdown;
  }

  /**
   * Rebalance portfolio
   */
  rebalancePortfolio(currentWeights, targetWeights, currentPrices, targetPrices) {
    const rebalanceTrades = [];
    
    for (let i = 0; i < currentWeights.length; i++) {
      const weightDiff = targetWeights[i] - currentWeights[i];
      if (Math.abs(weightDiff) > 0.01) { // 1% threshold
        rebalanceTrades.push({
          asset: i,
          action: weightDiff > 0 ? 'BUY' : 'SELL',
          weightChange: Math.abs(weightDiff),
          estimatedCost: Math.abs(weightDiff) * targetPrices[i]
        });
      }
    }
    
    return rebalanceTrades;
  }

  /**
   * Calculate transaction costs
   */
  calculateTransactionCosts(trades, commission = 0.001, slippage = 0.0005) {
    let totalCost = 0;
    
    for (const trade of trades) {
      const tradeCost = trade.estimatedCost * (commission + slippage);
      totalCost += tradeCost;
    }
    
    return totalCost;
  }
}

module.exports = PortfolioService;
