const InstrumentService = require('./services/InstrumentService');

// Create instance of the service
const instrumentService = new InstrumentService();

console.log('=== 金融工具可视化演示 ===\n');

// 基础参数
const principal = 100000;
const baseMarketRate = 0.05;

// 1. 利率环境对支付的影响 - 柱状图
console.log('1. 利率环境对日支付的影响');
console.log('==========================');

const rates = [0.01, 0.03, 0.05, 0.07, 0.09, 0.11, 0.13];
const maxPayment = 40; // 最大支付金额用于缩放

console.log('利率\t浮动利率日支付\t图表');
console.log('----\t------------\t' + '='.repeat(50));

rates.forEach(rate => {
  const floatingRate = instrumentService.createFloatingRateInstrument(principal, rate, 3650);
  const payment = floatingRate.dailyPayment;
  const barLength = Math.round((payment / maxPayment) * 50);
  const bar = '█'.repeat(barLength);
  
  console.log(`${(rate * 100).toFixed(1)}%\t$${payment.toFixed(2)}\t\t${bar}`);
});

// 2. 投资组合久期分布 - 柱状图
console.log('\n2. 投资组合久期分布');
console.log('==================');

const weights = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const maxDuration = 10; // 最大久期用于缩放

console.log('权重\t久期\t\t图表');
console.log('----\t----\t\t' + '='.repeat(50));

weights.forEach(weight => {
  const interestRateGapWeight = 1 - weight;
  const metrics = instrumentService.calculatePortfolioMetrics(
    weight,
    interestRateGapWeight,
    principal,
    baseMarketRate,
    3650
  );
  
  const duration = metrics.portfolioDuration;
  const barLength = Math.round((duration / maxDuration) * 50);
  const bar = '█'.repeat(barLength);
  
  console.log(`${(weight * 100).toFixed(0)}%\t${duration.toFixed(2)}年\t\t${bar}`);
});

// 3. 风险收益散点图
console.log('\n3. 风险收益散点图');
console.log('================');

console.log('权重\t久期\t收益率\t\t图表');
console.log('----\t----\t----\t\t' + '='.repeat(50));

weights.forEach(weight => {
  const interestRateGapWeight = 1 - weight;
  const metrics = instrumentService.calculatePortfolioMetrics(
    weight,
    interestRateGapWeight,
    principal,
    baseMarketRate,
    3650
  );
  
  const duration = metrics.portfolioDuration;
  const return_ = metrics.portfolioReturn * 100;
  
  // 创建散点图位置 (x轴: 久期, y轴: 收益率)
  const xPos = Math.round((duration / maxDuration) * 50);
  const yPos = Math.round(((return_ + 20) / 60) * 20); // 收益率范围: -20% 到 +40%
  
  let chart = '';
  for (let i = 0; i < 20; i++) {
    if (i === yPos) {
      chart += '█'.repeat(xPos) + '●' + ' '.repeat(50 - xPos);
    } else {
      chart += ' '.repeat(51);
    }
    chart += '\n';
  }
  
  console.log(`${(weight * 100).toFixed(0)}%\t${duration.toFixed(2)}年\t${return_.toFixed(1)}%\t\t${chart}`);
});

// 4. 利率差工具的现值时间衰减
console.log('\n4. 利率差工具现值时间衰减');
console.log('========================');

const timeHorizons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const marketRates = [0.03, 0.05, 0.07, 0.09];

console.log('剩余年限\t3%利率\t\t5%利率\t\t7%利率\t\t9%利率');
console.log('--------\t------\t\t------\t\t------\t\t------');

timeHorizons.forEach(year => {
  let row = `${year}年\t\t`;
  
  marketRates.forEach(rate => {
    const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, rate);
    const value = interestRateGap.calculateValue(10 - year);
    
    // 创建可视化条形
    const absValue = Math.abs(value);
    const maxValue = 40000; // 最大绝对值用于缩放
    const barLength = Math.round((absValue / maxValue) * 20);
    const bar = '█'.repeat(barLength);
    
    if (value < 0) {
      row += `-${bar} ($${Math.abs(value).toFixed(0)})`;
    } else {
      row += `+${bar} ($${value.toFixed(0)})`;
    }
    row += '\t\t';
  });
  
  console.log(row);
});

// 5. 价格敏感度热力图
console.log('\n5. 价格敏感度热力图 (利率差工具)');
console.log('================================');

const sensitivityRates = [0.03, 0.05, 0.07, 0.09];
const rateChanges = [-0.02, -0.01, 0.01, 0.02];

console.log('市场利率\t-2%变化\t-1%变化\t+1%变化\t+2%变化');
console.log('--------\t--------\t--------\t--------\t--------');

sensitivityRates.forEach(rate => {
  const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, rate);
  let row = `${(rate * 100).toFixed(1)}%\t\t`;
  
  rateChanges.forEach(rateChange => {
    const priceChange = interestRateGap.calculatePriceSensitivity(rateChange);
    const changePercent = priceChange * 100;
    
    // 根据变化幅度选择颜色/符号
    let symbol;
    if (Math.abs(changePercent) < 5) {
      symbol = '🟢'; // 绿色 - 低敏感度
    } else if (Math.abs(changePercent) < 10) {
      symbol = '🟡'; // 黄色 - 中等敏感度
    } else {
      symbol = '🔴'; // 红色 - 高敏感度
    }
    
    row += `${symbol}${changePercent.toFixed(1)}%\t`;
  });
  
  console.log(row);
});

// 6. 现金流时间线
console.log('\n6. 现金流时间线');
console.log('==============');

const floatingRate = instrumentService.createFloatingRateInstrument(principal, baseMarketRate, 3650);
const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, baseMarketRate);

console.log('时间\t\t浮动利率工具\t\t利率差工具\t\t总现金流');
console.log('----\t\t------------\t\t----------\t\t--------');

const timePoints = [1, 30, 90, 180, 365, 730, 1095, 1460, 1825, 2190, 2555, 2920, 3285, 3650];
timePoints.forEach(days => {
  const years = days / 365;
  const floatingRatePayment = floatingRate.dailyPayment * days;
  const interestRateGapPayment = interestRateGap.annualPayment * years;
  const totalCashFlow = floatingRatePayment + interestRateGapPayment;
  
  const timeLabel = days < 365 ? `${days}天` : `${years.toFixed(1)}年`;
  
  console.log(`${timeLabel}\t\t$${floatingRatePayment.toFixed(0)}\t\t\t$${interestRateGapPayment.toFixed(0)}\t\t\t$${totalCashFlow.toFixed(0)}`);
});

// 7. 投资组合效率前沿
console.log('\n7. 投资组合效率前沿');
console.log('==================');

console.log('权重组合\t\t久期\t收益率\t风险调整收益\t效率评级');
console.log('--------\t\t----\t----\t--------\t----');

const portfolioScenarios = [
  { floatingRateWeight: 0.9, interestRateGapWeight: 0.1, name: '保守 (90/10)' },
  { floatingRateWeight: 0.7, interestRateGapWeight: 0.3, name: '稳健 (70/30)' },
  { floatingRateWeight: 0.5, interestRateGapWeight: 0.5, name: '平衡 (50/50)' },
  { floatingRateWeight: 0.3, interestRateGapWeight: 0.7, name: '积极 (30/70)' },
  { floatingRateWeight: 0.1, interestRateGapWeight: 0.9, name: '激进 (10/90)' }
];

portfolioScenarios.forEach(scenario => {
  const metrics = instrumentService.calculatePortfolioMetrics(
    scenario.floatingRateWeight,
    scenario.interestRateGapWeight,
    principal,
    baseMarketRate,
    3650
  );
  
  const riskAdjustedReturn = metrics.portfolioReturn / (metrics.portfolioDuration * 0.1);
  
  // 效率评级
  let efficiencyRating;
  if (riskAdjustedReturn > 1.0) {
    efficiencyRating = '⭐⭐⭐'; // 高
  } else if (riskAdjustedReturn > 0.5) {
    efficiencyRating = '⭐⭐'; // 中
  } else {
    efficiencyRating = '⭐'; // 低
  }
  
  console.log(`${scenario.name}\t\t${metrics.portfolioDuration.toFixed(2)}年\t${(metrics.portfolioReturn * 100).toFixed(1)}%\t${riskAdjustedReturn.toFixed(3)}\t\t${efficiencyRating}`);
});

console.log('\n=== 可视化演示完成 ===');
console.log('\n图表说明:');
console.log('█ - 表示数值大小');
console.log('● - 表示散点位置');
console.log('🟢 - 低敏感度 (价格变化 < 5%)');
console.log('🟡 - 中等敏感度 (价格变化 5-10%)');
console.log('🔴 - 高敏感度 (价格变化 > 10%)');
console.log('⭐⭐⭐ - 高效率投资组合');
console.log('⭐⭐ - 中等效率投资组合');
console.log('⭐ - 低效率投资组合');
