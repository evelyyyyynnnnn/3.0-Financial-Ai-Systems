const moment = require('moment');
const { SMA, EMA, RSI, MACD, BollingerBands } = require('technicalindicators');

class BacktestService {
  constructor() {
    this.strategies = {
      'moving-average-crossover': this.movingAverageCrossover,
      'mean-reversion': this.meanReversion,
      'momentum': this.momentum,
      'bollinger-bands': this.bollingerBands,
      'rsi-divergence': this.rsiDivergence,
      'macd-crossover': this.macdCrossover
    };
  }

  /**
   * Run backtest for a strategy
   * @param {Object} config - Backtest configuration
   * @returns {Object} Backtest results
   */
  async runBacktest(config) {
    const {
      strategy,
      symbol,
      startDate,
      endDate,
      initialCapital,
      commission = 0.001,
      slippage = 0.0005,
      data
    } = config;

    if (!this.strategies[strategy]) {
      throw new Error(`Strategy ${strategy} not found`);
    }

    const strategyFunction = this.strategies[strategy];
    const signals = strategyFunction(data, config.parameters || {});
    
    return this.executeBacktest(data, signals, {
      initialCapital,
      commission,
      slippage,
      startDate,
      endDate
    });
  }

  /**
   * Moving Average Crossover Strategy
   */
  movingAverageCrossover(data, params = {}) {
    const { fastPeriod = 10, slowPeriod = 20 } = params;
    const signals = [];
    
    const fastMA = SMA.calculate({ period: fastPeriod, values: data.map(d => d.close) });
    const slowMA = SMA.calculate({ period: slowPeriod, values: data.map(d => d.close) });
    
    for (let i = slowPeriod; i < data.length; i++) {
      const fastValue = fastMA[i - slowPeriod];
      const slowValue = slowMA[i - slowPeriod];
      const prevFastValue = fastMA[i - slowPeriod - 1];
      const prevSlowValue = slowMA[i - slowPeriod - 1];
      
      let signal = 'HOLD';
      
      // Golden cross (fast MA crosses above slow MA)
      if (prevFastValue <= prevSlowValue && fastValue > slowValue) {
        signal = 'BUY';
      }
      // Death cross (fast MA crosses below slow MA)
      else if (prevFastValue >= prevSlowValue && fastValue < slowValue) {
        signal = 'SELL';
      }
      
      signals.push({
        date: data[i].date,
        signal,
        fastMA: fastValue,
        slowMA: slowValue,
        price: data[i].close
      });
    }
    
    return signals;
  }

  /**
   * Mean Reversion Strategy using Bollinger Bands
   */
  meanReversion(data, params = {}) {
    const { period = 20, stdDev = 2, rsiPeriod = 14, rsiOverbought = 70, rsiOversold = 30 } = params;
    const signals = [];
    
    const bb = BollingerBands.calculate({ period, stdDev, values: data.map(d => d.close) });
    const rsi = RSI.calculate({ period: rsiPeriod, values: data.map(d => d.close) });
    
    for (let i = period; i < data.length; i++) {
      const bbIndex = i - period;
      const rsiIndex = i - period;
      
      if (bbIndex >= 0 && rsiIndex >= 0) {
        const bbData = bb[bbIndex];
        const rsiValue = rsi[rsiIndex];
        const price = data[i].close;
        
        let signal = 'HOLD';
        
        // Oversold condition: price near lower band and RSI oversold
        if (price <= bbData.lower * 1.01 && rsiValue <= rsiOversold) {
          signal = 'BUY';
        }
        // Overbought condition: price near upper band and RSI overbought
        else if (price >= bbData.upper * 0.99 && rsiValue >= rsiOverbought) {
          signal = 'SELL';
        }
        
        signals.push({
          date: data[i].date,
          signal,
          price,
          upperBand: bbData.upper,
          lowerBand: bbData.lower,
          middleBand: bbData.middle,
          rsi: rsiValue
        });
      }
    }
    
    return signals;
  }

  /**
   * Momentum Strategy
   */
  momentum(data, params = {}) {
    const { lookbackPeriod = 20, threshold = 0.05 } = params;
    const signals = [];
    
    for (let i = lookbackPeriod; i < data.length; i++) {
      const currentPrice = data[i].close;
      const pastPrice = data[i - lookbackPeriod].close;
      const momentum = (currentPrice - pastPrice) / pastPrice;
      
      let signal = 'HOLD';
      
      if (momentum > threshold) {
        signal = 'BUY';
      } else if (momentum < -threshold) {
        signal = 'SELL';
      }
      
      signals.push({
        date: data[i].date,
        signal,
        price: currentPrice,
        momentum,
        threshold
      });
    }
    
    return signals;
  }

  /**
   * Bollinger Bands Strategy
   */
  bollingerBands(data, params = {}) {
    const { period = 20, stdDev = 2 } = params;
    const signals = [];
    
    const bb = BollingerBands.calculate({ period, stdDev, values: data.map(d => d.close) });
    
    for (let i = period; i < data.length; i++) {
      const bbIndex = i - period;
      const price = data[i].close;
      const bbData = bb[bbIndex];
      
      let signal = 'HOLD';
      
      // Price touches lower band
      if (price <= bbData.lower) {
        signal = 'BUY';
      }
      // Price touches upper band
      else if (price >= bbData.upper) {
        signal = 'SELL';
      }
      
      signals.push({
        date: data[i].date,
        signal,
        price,
        upperBand: bbData.upper,
        lowerBand: bbData.lower,
        middleBand: bbData.middle,
        bandwidth: (bbData.upper - bbData.lower) / bbData.middle
      });
    }
    
    return signals;
  }

  /**
   * RSI Divergence Strategy
   */
  rsiDivergence(data, params = {}) {
    const { period = 14, divergencePeriod = 20 } = params;
    const signals = [];
    
    const rsi = RSI.calculate({ period, values: data.map(d => d.close) });
    
    for (let i = divergencePeriod; i < data.length; i++) {
      const currentPrice = data[i].close;
      const currentRSI = rsi[i - period];
      const pastPrice = data[i - divergencePeriod].close;
      const pastRSI = rsi[i - divergencePeriod - period];
      
      let signal = 'HOLD';
      
      // Bullish divergence: price makes lower low, RSI makes higher low
      if (currentPrice < pastPrice && currentRSI > pastRSI && currentRSI < 40) {
        signal = 'BUY';
      }
      // Bearish divergence: price makes higher high, RSI makes lower high
      else if (currentPrice > pastPrice && currentRSI < pastRSI && currentRSI > 60) {
        signal = 'SELL';
      }
      
      signals.push({
        date: data[i].date,
        signal,
        price: currentPrice,
        rsi: currentRSI,
        pastPrice,
        pastRSI
      });
    }
    
    return signals;
  }

  /**
   * MACD Crossover Strategy
   */
  macdCrossover(data, params = {}) {
    const { fastPeriod = 12, slowPeriod = 26, signalPeriod = 9 } = params;
    const signals = [];
    
    const macd = MACD.calculate({
      fastPeriod,
      slowPeriod,
      signalPeriod,
      values: data.map(d => d.close)
    });
    
    for (let i = slowPeriod; i < data.length; i++) {
      const macdIndex = i - slowPeriod;
      
      if (macdIndex > 0) {
        const currentMACD = macd[macdIndex];
        const previousMACD = macd[macdIndex - 1];
        
        let signal = 'HOLD';
        
        // MACD line crosses above signal line
        if (previousMACD.MACD <= previousMACD.signal && currentMACD.MACD > currentMACD.signal) {
          signal = 'BUY';
        }
        // MACD line crosses below signal line
        else if (previousMACD.MACD >= previousMACD.signal && currentMACD.MACD < currentMACD.signal) {
          signal = 'SELL';
        }
        
        signals.push({
          date: data[i].date,
          signal,
          price: data[i].close,
          macd: currentMACD.MACD,
          signal: currentMACD.signal,
          histogram: currentMACD.histogram
        });
      }
    }
    
    return signals;
  }

  /**
   * Execute backtest with signals
   */
  executeBacktest(data, signals, config) {
    const { initialCapital, commission, slippage } = config;
    
    let capital = initialCapital;
    let shares = 0;
    let trades = [];
    let equity = [initialCapital];
    let positions = [];
    
    for (let i = 0; i < signals.length; i++) {
      const signal = signals[i];
      const price = signal.price;
      
      if (signal.signal === 'BUY' && shares === 0) {
        const sharesToBuy = Math.floor(capital * 0.95 / price); // Use 95% of capital
        if (sharesToBuy > 0) {
          const cost = sharesToBuy * price * (1 + commission + slippage);
          capital -= cost;
          shares = sharesToBuy;
          
          trades.push({
            date: signal.date,
            type: 'BUY',
            shares: sharesToBuy,
            price,
            cost,
            capital: capital + shares * price
          });
        }
      } else if (signal.signal === 'SELL' && shares > 0) {
        const proceeds = shares * price * (1 - commission - slippage);
        capital += proceeds;
        
        trades.push({
          date: signal.date,
          type: 'SELL',
          shares,
          price,
          proceeds,
          capital
        });
        
        shares = 0;
      }
      
      const currentEquity = capital + shares * price;
      equity.push(currentEquity);
      
      positions.push({
        date: signal.date,
        shares,
        price,
        equity: currentEquity,
        capital,
        marketValue: shares * price
      });
    }
    
    // Close final position if any
    if (shares > 0) {
      const finalPrice = data[data.length - 1].close;
      const proceeds = shares * finalPrice * (1 - commission - slippage);
      capital += proceeds;
      
      trades.push({
        date: data[data.length - 1].date,
        type: 'SELL',
        shares,
        price: finalPrice,
        proceeds,
        capital
      });
    }
    
    return this.calculatePerformanceMetrics(equity, trades, positions, config);
  }

  /**
   * Calculate comprehensive performance metrics
   */
  calculatePerformanceMetrics(equity, trades, positions, config) {
    const { initialCapital } = config;
    const finalCapital = equity[equity.length - 1];
    
    // Basic metrics
    const totalReturn = (finalCapital - initialCapital) / initialCapital;
    const absoluteReturn = finalCapital - initialCapital;
    
    // Calculate daily returns
    const dailyReturns = [];
    for (let i = 1; i < equity.length; i++) {
      dailyReturns.push((equity[i] - equity[i - 1]) / equity[i - 1]);
    }
    
    // Risk metrics
    const meanReturn = dailyReturns.reduce((sum, ret) => sum + ret, 0) / dailyReturns.length;
    const variance = dailyReturns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / dailyReturns.length;
    const volatility = Math.sqrt(variance * 252); // Annualized
    
    // Sharpe ratio (assuming 0% risk-free rate)
    const sharpeRatio = volatility > 0 ? (meanReturn * 252) / volatility : 0;
    
    // Maximum drawdown
    let maxDrawdown = 0;
    let peak = equity[0];
    
    for (let i = 1; i < equity.length; i++) {
      if (equity[i] > peak) {
        peak = equity[i];
      }
      const drawdown = (peak - equity[i]) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
    
    // Sortino ratio
    const negativeReturns = dailyReturns.filter(ret => ret < 0);
    const downsideDeviation = Math.sqrt(
      negativeReturns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / negativeReturns.length
    );
    const sortinoRatio = downsideDeviation > 0 ? (meanReturn * 252) / downsideDeviation : 0;
    
    // Calmar ratio
    const calmarRatio = maxDrawdown > 0 ? (totalReturn * 252 / 365) / maxDrawdown : 0;
    
    // Trade statistics
    const winningTrades = trades.filter(t => t.type === 'SELL' && t.proceeds > 0).length;
    const totalTrades = trades.filter(t => t.type === 'SELL').length;
    const winRate = totalTrades > 0 ? winningTrades / totalTrades : 0;
    
    return {
      summary: {
        initialCapital,
        finalCapital,
        totalReturn: totalReturn * 100,
        absoluteReturn,
        sharpeRatio,
        sortinoRatio,
        calmarRatio,
        maxDrawdown: maxDrawdown * 100,
        volatility: volatility * 100,
        winRate: winRate * 100,
        totalTrades
      },
      equity,
      trades,
      positions,
      dailyReturns,
      metrics: {
        sharpeRatio,
        sortinoRatio,
        calmarRatio,
        maxDrawdown,
        volatility,
        winRate
      }
    };
  }
}

module.exports = BacktestService;
