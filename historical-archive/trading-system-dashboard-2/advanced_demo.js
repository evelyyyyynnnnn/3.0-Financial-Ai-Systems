const InstrumentService = require('./services/InstrumentService');

// Create instance of the service
const instrumentService = new InstrumentService();

console.log('=== 高级金融工具分析演示 ===\n');

// 基础参数
const principal = 100000; // $100,000
const baseMarketRate = 0.05; // 5% 基础市场利率

// 1. 压力测试 - 不同利率环境下的表现
console.log('1. 压力测试 - 利率环境变化分析');
console.log('================================');

const stressTestRates = [0.01, 0.03, 0.05, 0.07, 0.09, 0.11, 0.13];
console.log('利率环境\t浮动利率日支付\t利率差年支付\t利率差\t浮动利率总收益\t利率差总收益');
console.log('--------\t------------\t----------\t------\t----------\t----------');

stressTestRates.forEach(rate => {
  const floatingRate = instrumentService.createFloatingRateInstrument(principal, rate, 3650);
  const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, rate);
  
  const floatingRateTotalReturn = floatingRate.totalInterest;
  const interestRateGapTotalReturn = interestRateGap.annualPayment * interestRateGap.yearsToMaturity;
  
  console.log(`${(rate * 100).toFixed(1)}%\t\t$${floatingRate.dailyPayment.toFixed(2)}\t\t$${interestRateGap.annualPayment.toFixed(0)}\t\t${(interestRateGap.rateGap * 100).toFixed(1)}%\t$${floatingRateTotalReturn.toFixed(0)}\t\t$${interestRateGapTotalReturn.toFixed(0)}`);
});

// 2. 久期分析
console.log('\n2. 久期和凸性分析');
console.log('==================');

const durationAnalysisRates = [0.03, 0.05, 0.07, 0.09];
console.log('市场利率\t修正久期\t凸性\t\t价格敏感度(-1%)\t价格敏感度(+1%)');
console.log('--------\t--------\t----\t\t------------\t------------');

durationAnalysisRates.forEach(rate => {
  const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, rate);
  const priceChangeDown = interestRateGap.calculatePriceSensitivity(-0.01);
  const priceChangeUp = interestRateGap.calculatePriceSensitivity(0.01);
  
  console.log(`${(rate * 100).toFixed(1)}%\t\t${interestRateGap.modifiedDuration.toFixed(2)}\t\t${interestRateGap.convexity.toFixed(2)}\t\t${(priceChangeDown * 100).toFixed(2)}%\t\t${(priceChangeUp * 100).toFixed(2)}%`);
});

// 3. 投资组合优化分析
console.log('\n3. 投资组合优化分析');
console.log('==================');

const portfolioWeights = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
console.log('浮动利率权重\t投资组合久期\t投资组合凸性\t投资组合收益率\t风险调整收益');
console.log('------------\t----------\t----------\t----------\t--------');

portfolioWeights.forEach(floatingRateWeight => {
  const interestRateGapWeight = 1 - floatingRateWeight;
  const metrics = instrumentService.calculatePortfolioMetrics(
    floatingRateWeight,
    interestRateGapWeight,
    principal,
    baseMarketRate,
    3650
  );
  
  // 计算风险调整收益 (夏普比率简化版)
  const riskAdjustedReturn = metrics.portfolioReturn / (metrics.portfolioDuration * 0.1); // 假设风险与久期成正比
  
  console.log(`${(floatingRateWeight * 100).toFixed(0)}%\t\t${metrics.portfolioDuration.toFixed(2)}年\t\t${metrics.portfolioConvexity.toFixed(2)}\t\t${(metrics.portfolioReturn * 100).toFixed(2)}%\t\t${riskAdjustedReturn.toFixed(3)}`);
});

// 4. 时间价值分析
console.log('\n4. 时间价值分析 - 利率差工具');
console.log('============================');

const timeHorizons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const marketRates = [0.03, 0.05, 0.07, 0.09];

console.log('剩余年限\t3%利率\t\t5%利率\t\t7%利率\t\t9%利率');
console.log('--------\t------\t\t------\t\t------\t\t------');

timeHorizons.forEach(year => {
  let row = `${year}年\t\t`;
  
  marketRates.forEach(rate => {
    const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, rate);
    const value = interestRateGap.calculateValue(10 - year);
    row += `$${value.toFixed(0)}\t\t`;
  });
  
  console.log(row);
});

// 5. 现金流分析
console.log('\n5. 现金流分析');
console.log('============');

const floatingRate = instrumentService.createFloatingRateInstrument(principal, baseMarketRate, 3650);
const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, baseMarketRate);

console.log('浮动利率工具现金流:');
console.log(`- 每日支付: $${floatingRate.dailyPayment.toFixed(2)}`);
console.log(`- 每月支付: $${(floatingRate.dailyPayment * 30).toFixed(2)}`);
console.log(`- 每年支付: $${(floatingRate.dailyPayment * 365).toFixed(2)}`);
console.log(`- 10年总支付: $${floatingRate.totalInterest.toFixed(2)}`);

console.log('\n利率差工具现金流:');
console.log(`- 年支付: $${interestRateGap.annualPayment.toFixed(2)}`);
console.log(`- 10年总支付: $${(interestRateGap.annualPayment * 10).toFixed(2)}`);

// 6. 风险指标计算
console.log('\n6. 风险指标计算');
console.log('==============');

// 计算VaR (Value at Risk) 简化版
const calculateVaR = (instrument, confidenceLevel, timeHorizon) => {
  const volatility = 0.02; // 假设2%的日波动率
  const zScore = confidenceLevel === 0.95 ? 1.645 : 2.326; // 95% 和 99% 置信水平
  
  if (instrument.type === 'floating-rate-daily-reset') {
    return instrument.principal * volatility * zScore * Math.sqrt(timeHorizon);
  } else {
    return instrument.principal * instrument.modifiedDuration * volatility * zScore * Math.sqrt(timeHorizon);
  }
};

console.log('风险价值 (VaR) 分析:');
console.log('工具类型\t\t\t95%置信度(1天)\t99%置信度(1天)\t95%置信度(10天)\t99%置信度(10天)');
console.log('--------\t\t\t------------\t------------\t------------\t------------');

const floatingRateVaR = calculateVaR(floatingRate, 0.95, 1);
const floatingRateVaR99 = calculateVaR(floatingRate, 0.99, 1);
const floatingRateVaR10 = calculateVaR(floatingRate, 0.95, 10);
const floatingRateVaR1099 = calculateVaR(floatingRate, 0.99, 10);

const interestRateGapVaR = calculateVaR(interestRateGap, 0.95, 1);
const interestRateGapVaR99 = calculateVaR(interestRateGap, 0.99, 1);
const interestRateGapVaR10 = calculateVaR(interestRateGap, 0.95, 10);
const interestRateGapVaR1099 = calculateVaR(interestRateGap, 0.99, 10);

console.log(`浮动利率\t\t\t$${floatingRateVaR.toFixed(2)}\t\t$${floatingRateVaR99.toFixed(2)}\t\t$${floatingRateVaR10.toFixed(2)}\t\t$${floatingRateVaR1099.toFixed(2)}`);
console.log(`利率差工具\t\t\t$${interestRateGapVaR.toFixed(2)}\t\t$${interestRateGapVaR99.toFixed(2)}\t\t$${interestRateGapVaR10.toFixed(2)}\t\t$${interestRateGapVaR1099.toFixed(2)}`);

// 7. 对冲策略分析
console.log('\n7. 对冲策略分析');
console.log('==============');

console.log('利率风险对冲策略:');
console.log('- 浮动利率工具: 由于每日重置，利率风险极低，适合作为利率风险的对冲工具');
console.log('- 利率差工具: 具有显著的利率风险敞口，需要额外的对冲策略');

console.log('\n推荐的对冲组合:');
console.log('1. 保守策略: 70% 浮动利率 + 30% 利率差工具');
console.log('   - 投资组合久期: 3.7年');
console.log('   - 适合利率上升环境');
console.log('   - 风险较低');

console.log('2. 平衡策略: 50% 浮动利率 + 50% 利率差工具');
console.log('   - 投资组合久期: 5.5年');
console.log('   - 平衡风险和收益');
console.log('   - 适合中性利率环境');

console.log('3. 激进策略: 30% 浮动利率 + 70% 利率差工具');
console.log('   - 投资组合久期: 7.3年');
console.log('   - 适合利率下降环境');
console.log('   - 风险较高但收益潜力大');

// 8. 市场环境适应性分析
console.log('\n8. 市场环境适应性分析');
console.log('====================');

const marketEnvironments = [
  { name: '利率上升环境', rateChange: 0.02, description: '市场利率从5%上升到7%' },
  { name: '利率下降环境', rateChange: -0.02, description: '市场利率从5%下降到3%' },
  { name: '利率稳定环境', rateChange: 0, description: '市场利率保持在5%' },
  { name: '利率剧烈波动', rateChange: 0.05, description: '市场利率从5%上升到10%' }
];

marketEnvironments.forEach(env => {
  console.log(`\n${env.name}:`);
  console.log(`描述: ${env.description}`);
  
  const newRate = baseMarketRate + env.rateChange;
  const floatingRateNew = instrumentService.createFloatingRateInstrument(principal, newRate, 3650);
  const interestRateGapNew = instrumentService.createInterestRateGapInstrument(principal, newRate);
  
  const floatingRateReturnChange = ((floatingRateNew.dailyPayment - floatingRate.dailyPayment) / floatingRate.dailyPayment) * 100;
  const interestRateGapReturnChange = ((interestRateGapNew.annualPayment - interestRateGap.annualPayment) / Math.abs(interestRateGap.annualPayment)) * 100;
  
  console.log(`浮动利率工具: 日支付变化 ${floatingRateReturnChange.toFixed(1)}%`);
  console.log(`利率差工具: 年支付变化 ${interestRateGapReturnChange.toFixed(1)}%`);
  
  if (env.rateChange > 0) {
    console.log(`表现: 利率差工具表现更好，因为利率上升时支付增加`);
  } else if (env.rateChange < 0) {
    console.log(`表现: 浮动利率工具表现更好，因为利率下降时风险较低`);
  } else {
    console.log(`表现: 两种工具表现相似`);
  }
});

console.log('\n=== 高级分析完成 ===');
console.log('\n总结:');
console.log('1. 浮动利率工具提供稳定的现金流和极低的利率风险');
console.log('2. 利率差工具提供利率敞口，适合利率方向性交易');
console.log('3. 通过调整权重可以创建不同风险特征的投资组合');
console.log('4. 在利率上升环境中，利率差工具表现更好');
console.log('5. 在利率下降环境中，浮动利率工具风险更低');
console.log('6. 投资组合久期可以通过权重调整进行精确控制');
