/**
 * 算法交易策略代码包
 * ===================
 * 
 * 包含6种核心交易策略的完整实现
 * 适用于量化交易和回测系统
 * 
 * 作者: Evelyn Du
 * 日期: 2024
 */

const { SMA, EMA, RSI, MACD, BollingerBands } = require('technicalindicators');

/**
 * 交易策略服务类
 * 实现6种核心量化交易策略
 */
class TradingStrategies {
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
   * 移动平均交叉策略
   * @param {Array} data - 价格数据数组
   * @param {Object} params - 策略参数
   * @returns {Array} 交易信号数组
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
      
      // 金叉 (快线上穿慢线)
      if (prevFastValue <= prevSlowValue && fastValue > slowValue) {
        signal = 'BUY';
      }
      // 死叉 (快线下穿慢线)
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
   * 均值回归策略 (布林带 + RSI)
   * @param {Array} data - 价格数据数组
   * @param {Object} params - 策略参数
   * @returns {Array} 交易信号数组
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
        
        // 超卖条件: 价格接近下轨且RSI超卖
        if (price <= bbData.lower * 1.01 && rsiValue <= rsiOversold) {
          signal = 'BUY';
        }
        // 超买条件: 价格接近上轨且RSI超买
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
   * 动量策略
   * @param {Array} data - 价格数据数组
   * @param {Object} params - 策略参数
   * @returns {Array} 交易信号数组
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
   * 布林带策略
   * @param {Array} data - 价格数据数组
   * @param {Object} params - 策略参数
   * @returns {Array} 交易信号数组
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
      
      // 价格触及下轨
      if (price <= bbData.lower) {
        signal = 'BUY';
      }
      // 价格触及上轨
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
   * RSI背离策略
   * @param {Array} data - 价格数据数组
   * @param {Object} params - 策略参数
   * @returns {Array} 交易信号数组
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
      
      // 看涨背离: 价格创新低，RSI创新高
      if (currentPrice < pastPrice && currentRSI > pastRSI && currentRSI < 40) {
        signal = 'BUY';
      }
      // 看跌背离: 价格创新高，RSI创新低
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
   * MACD交叉策略
   * @param {Array} data - 价格数据数组
   * @param {Object} params - 策略参数
   * @returns {Array} 交易信号数组
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
        
        // MACD线上穿信号线
        if (previousMACD.MACD <= previousMACD.signal && currentMACD.MACD > currentMACD.signal) {
          signal = 'BUY';
        }
        // MACD线下穿信号线
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
   * 执行指定策略
   * @param {string} strategyName - 策略名称
   * @param {Array} data - 价格数据
   * @param {Object} params - 策略参数
   * @returns {Array} 交易信号
   */
  executeStrategy(strategyName, data, params = {}) {
    if (!this.strategies[strategyName]) {
      throw new Error(`策略 ${strategyName} 不存在`);
    }
    
    return this.strategies[strategyName](data, params);
  }

  /**
   * 获取所有可用策略列表
   * @returns {Array} 策略列表
   */
  getAvailableStrategies() {
    return [
      {
        id: 'moving-average-crossover',
        name: '移动平均交叉',
        description: '基于快慢移动平均线交叉的趋势跟踪策略',
        category: 'trend-following',
        parameters: {
          fastPeriod: { type: 'number', default: 10, min: 5, max: 50, description: '快线周期' },
          slowPeriod: { type: 'number', default: 20, min: 10, max: 100, description: '慢线周期' }
        }
      },
      {
        id: 'mean-reversion',
        name: '均值回归',
        description: '基于布林带和RSI的均值回归策略',
        category: 'mean-reversion',
        parameters: {
          period: { type: 'number', default: 20, min: 10, max: 50, description: '布林带周期' },
          stdDev: { type: 'number', default: 2, min: 1, max: 3, description: '标准差倍数' },
          rsiPeriod: { type: 'number', default: 14, min: 10, max: 30, description: 'RSI周期' },
          rsiOverbought: { type: 'number', default: 70, min: 60, max: 80, description: 'RSI超买阈值' },
          rsiOversold: { type: 'number', default: 30, min: 20, max: 40, description: 'RSI超卖阈值' }
        }
      },
      {
        id: 'momentum',
        name: '动量策略',
        description: '基于价格动量的趋势跟踪策略',
        category: 'momentum',
        parameters: {
          lookbackPeriod: { type: 'number', default: 20, min: 10, max: 60, description: '回望周期' },
          threshold: { type: 'number', default: 0.05, min: 0.01, max: 0.20, description: '动量阈值' }
        }
      },
      {
        id: 'bollinger-bands',
        name: '布林带策略',
        description: '基于布林带的均值回归策略',
        category: 'mean-reversion',
        parameters: {
          period: { type: 'number', default: 20, min: 10, max: 50, description: '布林带周期' },
          stdDev: { type: 'number', default: 2, min: 1, max: 3, description: '标准差倍数' }
        }
      },
      {
        id: 'rsi-divergence',
        name: 'RSI背离策略',
        description: '基于RSI背离的反转策略',
        category: 'oscillator',
        parameters: {
          period: { type: 'number', default: 14, min: 10, max: 30, description: 'RSI周期' },
          divergencePeriod: { type: 'number', default: 20, min: 10, max: 50, description: '背离检测周期' }
        }
      },
      {
        id: 'macd-crossover',
        name: 'MACD交叉策略',
        description: '基于MACD线交叉的趋势跟踪策略',
        category: 'trend-following',
        parameters: {
          fastPeriod: { type: 'number', default: 12, min: 8, max: 20, description: '快EMA周期' },
          slowPeriod: { type: 'number', default: 26, min: 20, max: 40, description: '慢EMA周期' },
          signalPeriod: { type: 'number', default: 9, min: 5, max: 15, description: '信号线周期' }
        }
      }
    ];
  }
}

/**
 * 回测执行器
 * 用于执行策略回测和计算性能指标
 */
class BacktestExecutor {
  constructor() {
    this.defaultCommission = 0.001; // 0.1%
    this.defaultSlippage = 0.0005;  // 0.05%
  }

  /**
   * 执行回测
   * @param {Array} data - 价格数据
   * @param {Array} signals - 交易信号
   * @param {Object} config - 回测配置
   * @returns {Object} 回测结果
   */
  executeBacktest(data, signals, config) {
    const { 
      initialCapital = 100000, 
      commission = this.defaultCommission, 
      slippage = this.defaultSlippage 
    } = config;
    
    let capital = initialCapital;
    let shares = 0;
    let trades = [];
    let equity = [initialCapital];
    let positions = [];
    
    for (let i = 0; i < signals.length; i++) {
      const signal = signals[i];
      const price = signal.price;
      
      if (signal.signal === 'BUY' && shares === 0) {
        const sharesToBuy = Math.floor(capital * 0.95 / price); // 使用95%资金
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
    
    // 平仓最终持仓
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
   * 计算性能指标
   * @param {Array} equity - 权益曲线
   * @param {Array} trades - 交易记录
   * @param {Array} positions - 持仓记录
   * @param {Object} config - 配置
   * @returns {Object} 性能指标
   */
  calculatePerformanceMetrics(equity, trades, positions, config) {
    const { initialCapital } = config;
    const finalCapital = equity[equity.length - 1];
    
    // 基础指标
    const totalReturn = (finalCapital - initialCapital) / initialCapital;
    const absoluteReturn = finalCapital - initialCapital;
    
    // 计算日收益率
    const dailyReturns = [];
    for (let i = 1; i < equity.length; i++) {
      dailyReturns.push((equity[i] - equity[i - 1]) / equity[i - 1]);
    }
    
    // 风险指标
    const meanReturn = dailyReturns.reduce((sum, ret) => sum + ret, 0) / dailyReturns.length;
    const variance = dailyReturns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / dailyReturns.length;
    const volatility = Math.sqrt(variance * 252); // 年化波动率
    
    // 夏普比率 (假设无风险利率为0%)
    const sharpeRatio = volatility > 0 ? (meanReturn * 252) / volatility : 0;
    
    // 最大回撤
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
    
    // 索提诺比率
    const negativeReturns = dailyReturns.filter(ret => ret < 0);
    const downsideDeviation = Math.sqrt(
      negativeReturns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / negativeReturns.length
    );
    const sortinoRatio = downsideDeviation > 0 ? (meanReturn * 252) / downsideDeviation : 0;
    
    // 卡尔玛比率
    const calmarRatio = maxDrawdown > 0 ? (totalReturn * 252 / 365) / maxDrawdown : 0;
    
    // 交易统计
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

/**
 * 使用示例
 */
function example() {
  // 创建策略实例
  const strategies = new TradingStrategies();
  const backtest = new BacktestExecutor();
  
  // 示例数据 (实际使用时需要真实的市场数据)
  const sampleData = [
    { date: '2023-01-01', close: 100 },
    { date: '2023-01-02', close: 102 },
    { date: '2023-01-03', close: 98 },
    // ... 更多数据
  ];
  
  // 执行移动平均交叉策略
  const signals = strategies.executeStrategy('moving-average-crossover', sampleData, {
    fastPeriod: 10,
    slowPeriod: 20
  });
  
  // 执行回测
  const results = backtest.executeBacktest(sampleData, signals, {
    initialCapital: 100000,
    commission: 0.001,
    slippage: 0.0005
  });
  
  console.log('回测结果:', results.summary);
  
  // 获取所有可用策略
  const availableStrategies = strategies.getAvailableStrategies();
  console.log('可用策略:', availableStrategies);
}

// 导出模块
module.exports = {
  TradingStrategies,
  BacktestExecutor,
  example
};

// 如果直接运行此文件，执行示例
if (require.main === module) {
  example();
}
