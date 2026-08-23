const InstrumentService = require('./services/InstrumentService');

// Create instance of the service
const instrumentService = new InstrumentService();

// Example parameters
const principal = 100000; // $100,000
const currentMarketRate = 0.05; // 5% current market rate
const daysToMaturity = 3650; // 10 years in days

console.log('=== Financial Instruments Demo ===\n');

// Create Instrument 1: Floating Rate with Daily Duration Reset
console.log('1. FLOATING RATE INSTRUMENT (Daily Duration Reset)');
console.log('==================================================');
const floatingRate = instrumentService.createFloatingRateInstrument(principal, currentMarketRate, daysToMaturity);
console.log(`Type: ${floatingRate.type}`);
console.log(`Principal: $${floatingRate.principal.toLocaleString()}`);
console.log(`Current Market Rate: ${(floatingRate.currentMarketRate * 100).toFixed(2)}%`);
console.log(`Daily Rate: ${(floatingRate.dailyRate * 100).toFixed(4)}%`);
console.log(`Duration: ${floatingRate.duration} day`);
console.log(`Days to Maturity: ${floatingRate.daysToMaturity.toLocaleString()}`);
console.log(`Daily Payment: $${floatingRate.dailyPayment.toFixed(2)}`);
console.log(`Total Interest (10 years): $${floatingRate.totalInterest.toFixed(2)}`);
console.log(`Risk Profile: ${floatingRate.riskProfile}`);
console.log(`Reset Frequency: ${floatingRate.resetFrequency}`);
console.log(`Current Value: $${floatingRate.calculateValue(0).toFixed(2)}`);
console.log(`Value after 1 year: $${floatingRate.calculateValue(365).toFixed(2)}`);
console.log(`Convexity: ${floatingRate.calculateConvexity()}\n`);

// Create Instrument 2: Interest Rate Gap with 10-Year Duration
console.log('2. INTEREST RATE GAP INSTRUMENT (10-Year Duration)');
console.log('==================================================');
const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, currentMarketRate);
console.log(`Type: ${interestRateGap.type}`);
console.log(`Principal: $${interestRateGap.principal.toLocaleString()}`);
console.log(`Base Rate (Fixed): ${(interestRateGap.baseRate * 100).toFixed(2)}%`);
console.log(`Current Market Rate: ${(interestRateGap.currentMarketRate * 100).toFixed(2)}%`);
console.log(`Rate Gap: ${(interestRateGap.rateGap * 100).toFixed(2)}%`);
console.log(`Annual Payment: $${interestRateGap.annualPayment.toFixed(2)}`);
console.log(`Duration: ${interestRateGap.duration} years`);
console.log(`Modified Duration: ${interestRateGap.modifiedDuration.toFixed(2)}`);
console.log(`Convexity: ${interestRateGap.convexity.toFixed(2)}`);
console.log(`Years to Maturity: ${interestRateGap.yearsToMaturity}`);
console.log(`Risk Profile: ${interestRateGap.riskProfile}`);
console.log(`Reset Frequency: ${interestRateGap.resetFrequency}`);
console.log(`Current Value: $${interestRateGap.calculateValue(0).toFixed(2)}`);
console.log(`Value after 1 year: $${interestRateGap.calculateValue(1).toFixed(2)}`);
console.log(`Value after 5 years: $${interestRateGap.calculateValue(5).toFixed(2)}`);

// Show price sensitivity to interest rate changes
console.log('\nPrice Sensitivity Analysis:');
const rateChanges = [-0.01, -0.005, 0.005, 0.01]; // -1%, -0.5%, +0.5%, +1%
rateChanges.forEach(rateChange => {
  const priceChange = interestRateGap.calculatePriceSensitivity(rateChange);
  console.log(`Rate change ${(rateChange * 100).toFixed(1)}%: Price change ${(priceChange * 100).toFixed(2)}%`);
});

// Compare the two instruments
console.log('\n3. INSTRUMENT COMPARISON');
console.log('========================');
const comparison = instrumentService.compareInstruments(principal, currentMarketRate, daysToMaturity);
console.log(`Duration Comparison:`);
console.log(`  - Floating Rate: ${comparison.comparison.durationComparison.floatingRate} day`);
console.log(`  - Interest Rate Gap: ${comparison.comparison.durationComparison.interestRateGap} years`);
console.log(`  - Difference: ${comparison.comparison.durationComparison.difference} years`);
console.log(`\nRisk Comparison:`);
console.log(`  - Floating Rate: ${comparison.comparison.riskComparison.floatingRate}`);
console.log(`  - Interest Rate Gap: ${comparison.comparison.riskComparison.interestRateGap}`);
console.log(`\nPayment Comparison:`);
console.log(`  - Floating Rate: ${comparison.comparison.paymentComparison.floatingRate}`);
console.log(`  - Interest Rate Gap: ${comparison.comparison.paymentComparison.interestRateGap}`);

// Portfolio analysis with different weights
console.log('\n4. PORTFOLIO ANALYSIS');
console.log('======================');
const portfolioScenarios = [
  { floatingRateWeight: 0.5, interestRateGapWeight: 0.5, name: 'Equal Weight (50/50)' },
  { floatingRateWeight: 0.7, interestRateGapWeight: 0.3, name: 'Conservative (70/30)' },
  { floatingRateWeight: 0.3, interestRateGapWeight: 0.7, name: 'Aggressive (30/70)' }
];

portfolioScenarios.forEach(scenario => {
  console.log(`\n${scenario.name}:`);
  const metrics = instrumentService.calculatePortfolioMetrics(
    scenario.floatingRateWeight,
    scenario.interestRateGapWeight,
    principal,
    currentMarketRate,
    daysToMaturity
  );
  
  console.log(`  Portfolio Duration: ${metrics.portfolioDuration.toFixed(2)} years`);
  console.log(`  Portfolio Convexity: ${metrics.portfolioConvexity.toFixed(2)}`);
  console.log(`  Portfolio Return: ${(metrics.portfolioReturn * 100).toFixed(2)}%`);
  console.log(`  Weights: Floating Rate ${(metrics.weights.floatingRate * 100).toFixed(0)}%, Interest Rate Gap ${(metrics.weights.interestRateGap * 100).toFixed(0)}%`);
});

// Show how the instruments behave under different market conditions
console.log('\n5. MARKET CONDITION SCENARIOS');
console.log('==============================');
const marketScenarios = [
  { rate: 0.03, name: 'Low Rate Environment (3%)' },
  { rate: 0.05, name: 'Current Market (5%)' },
  { rate: 0.07, name: 'Neutral (7%)' },
  { rate: 0.09, name: 'High Rate Environment (9%)' }
];

marketScenarios.forEach(scenario => {
  console.log(`\n${scenario.name}:`);
  const floatingRate = instrumentService.createFloatingRateInstrument(principal, scenario.rate, daysToMaturity);
  const interestRateGap = instrumentService.createInterestRateGapInstrument(principal, scenario.rate);
  
  console.log(`  Floating Rate Daily Payment: $${floatingRate.dailyPayment.toFixed(2)}`);
  console.log(`  Interest Rate Gap Annual Payment: $${interestRateGap.annualPayment.toFixed(2)}`);
  console.log(`  Interest Rate Gap Rate Gap: ${(interestRateGap.rateGap * 100).toFixed(2)}%`);
});

console.log('\n=== Demo Complete ===');
console.log('\nKey Insights:');
console.log('- The floating rate instrument has minimal duration risk due to daily reset');
console.log('- The interest rate gap instrument has significant duration risk (10 years)');
console.log('- The gap instrument pays more when market rates are above 7%');
console.log('- The gap instrument pays less (or requires payment) when market rates are below 7%');
console.log('- Portfolio duration can be managed by adjusting weights between the two instruments');
