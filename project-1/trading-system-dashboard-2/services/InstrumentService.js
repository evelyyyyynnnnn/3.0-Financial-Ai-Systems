const moment = require('moment');

class InstrumentService {
  constructor() {
    this.baseRate = 0.07; // 7% fixed rate
    this.term = 10; // 10 years
  }

  /**
   * Instrument 1: Floating Rate Instrument with Daily Duration Reset
   * Pays the floating interest rate with duration reset every day
   */
  createFloatingRateInstrument(principal, currentMarketRate, daysToMaturity) {
    const dailyRate = currentMarketRate / 365;
    const duration = 1; // 1 day duration (daily reset)
    
    const dailyPayment = principal * dailyRate;
    const totalPayments = daysToMaturity;
    
    return {
      type: 'floating-rate-daily-reset',
      principal: principal,
      currentMarketRate: currentMarketRate,
      dailyRate: dailyRate,
      duration: duration,
      daysToMaturity: daysToMaturity,
      dailyPayment: dailyPayment,
      totalPayments: totalPayments,
      totalInterest: dailyPayment * totalPayments,
      description: 'Floating rate instrument with daily duration reset',
      riskProfile: 'low-duration-risk',
      resetFrequency: 'daily',
      calculateValue: (daysElapsed) => {
        const remainingDays = Math.max(0, daysToMaturity - daysElapsed);
        return principal + (dailyPayment * remainingDays);
      },
      calculateDuration: () => duration,
      calculateConvexity: () => 0 // Zero convexity due to daily reset
    };
  }

  /**
   * Instrument 2: Interest Rate Gap Instrument with 10-Year Duration
   * Pays the difference between current market rate and 7% fixed rate
   * Duration is 10 years (the term of the original bond)
   */
  createInterestRateGapInstrument(principal, currentMarketRate, yearsToMaturity = 10) {
    const rateGap = currentMarketRate - this.baseRate;
    const annualPayment = principal * rateGap;
    const duration = yearsToMaturity; // 10-year duration
    
    // Calculate modified duration and convexity
    const modifiedDuration = this.calculateModifiedDuration(yearsToMaturity, currentMarketRate);
    const convexity = this.calculateConvexity(yearsToMaturity, currentMarketRate);
    
    return {
      type: 'interest-rate-gap',
      principal: principal,
      baseRate: this.baseRate,
      currentMarketRate: currentMarketRate,
      rateGap: rateGap,
      annualPayment: annualPayment,
      duration: duration,
      modifiedDuration: modifiedDuration,
      convexity: convexity,
      yearsToMaturity: yearsToMaturity,
      description: 'Interest rate gap instrument paying the difference between market rate and 7% fixed rate',
      riskProfile: 'interest-rate-sensitive',
      resetFrequency: 'annual',
      calculateValue: (yearsElapsed) => {
        const remainingYears = Math.max(0, yearsToMaturity - yearsElapsed);
        const presentValue = this.calculatePresentValue(annualPayment, remainingYears, currentMarketRate);
        return presentValue;
      },
      calculateDuration: () => duration,
      calculateConvexity: () => convexity,
      calculatePriceSensitivity: (rateChange) => {
        // Price change = -Modified Duration × Rate Change + 0.5 × Convexity × (Rate Change)²
        const priceChange = -modifiedDuration * rateChange + 0.5 * convexity * Math.pow(rateChange, 2);
        return priceChange;
      }
    };
  }

  /**
   * Calculate modified duration for a bond
   */
  calculateModifiedDuration(yearsToMaturity, yieldRate) {
    if (yieldRate === 0) return yearsToMaturity;
    
    const couponRate = this.baseRate;
    const periodsPerYear = 1; // Annual payments
    const totalPeriods = yearsToMaturity * periodsPerYear;
    
    let duration = 0;
    let presentValue = 0;
    
    for (let period = 1; period <= totalPeriods; period++) {
      const cashFlow = this.baseRate * 1000; // Assuming $1000 face value
      const discountFactor = Math.pow(1 + yieldRate, -period);
      duration += period * cashFlow * discountFactor;
      presentValue += cashFlow * discountFactor;
    }
    
    // Add final principal payment
    const principalPayment = 1000;
    const principalDiscountFactor = Math.pow(1 + yieldRate, -totalPeriods);
    duration += totalPeriods * principalPayment * principalDiscountFactor;
    presentValue += principalPayment * principalDiscountFactor;
    
    const macaulayDuration = duration / presentValue;
    const modifiedDuration = macaulayDuration / (1 + yieldRate);
    
    return modifiedDuration;
  }

  /**
   * Calculate convexity for a bond
   */
  calculateConvexity(yearsToMaturity, yieldRate) {
    if (yieldRate === 0) return 0;
    
    const couponRate = this.baseRate;
    const periodsPerYear = 1; // Annual payments
    const totalPeriods = yearsToMaturity * periodsPerYear;
    
    let convexity = 0;
    let presentValue = 0;
    
    for (let period = 1; period <= totalPeriods; period++) {
      const cashFlow = this.baseRate * 1000; // Assuming $1000 face value
      const discountFactor = Math.pow(1 + yieldRate, -period);
      convexity += period * (period + 1) * cashFlow * discountFactor;
      presentValue += cashFlow * discountFactor;
    }
    
    // Add final principal payment
    const principalPayment = 1000;
    const principalDiscountFactor = Math.pow(1 + yieldRate, -totalPeriods);
    convexity += totalPeriods * (totalPeriods + 1) * principalPayment * principalDiscountFactor;
    presentValue += principalPayment * principalDiscountFactor;
    
    return convexity / (presentValue * Math.pow(1 + yieldRate, 2));
  }

  /**
   * Calculate present value of future cash flows
   */
  calculatePresentValue(annualPayment, yearsRemaining, discountRate) {
    let presentValue = 0;
    
    for (let year = 1; year <= yearsRemaining; year++) {
      const discountFactor = Math.pow(1 + discountRate, -year);
      presentValue += annualPayment * discountFactor;
    }
    
    return presentValue;
  }

  /**
   * Compare the two instruments
   */
  compareInstruments(principal, currentMarketRate, daysToMaturity) {
    const floatingRate = this.createFloatingRateInstrument(principal, currentMarketRate, daysToMaturity);
    const interestRateGap = this.createInterestRateGapInstrument(principal, currentMarketRate);
    
    return {
      floatingRate: floatingRate,
      interestRateGap: interestRateGap,
      comparison: {
        durationComparison: {
          floatingRate: floatingRate.duration,
          interestRateGap: interestRateGap.duration,
          difference: interestRateGap.duration - floatingRate.duration
        },
        riskComparison: {
          floatingRate: 'Low duration risk due to daily reset',
          interestRateGap: 'High duration risk due to 10-year term'
        },
        paymentComparison: {
          floatingRate: `Daily payment: $${floatingRate.dailyPayment.toFixed(2)}`,
          interestRateGap: `Annual payment: $${interestRateGap.annualPayment.toFixed(2)}`
        }
      }
    };
  }

  /**
   * Calculate portfolio metrics for a combination of both instruments
   */
  calculatePortfolioMetrics(floatingRateWeight, interestRateGapWeight, principal, currentMarketRate, daysToMaturity) {
    const floatingRate = this.createFloatingRateInstrument(principal, currentMarketRate, daysToMaturity);
    const interestRateGap = this.createInterestRateGapInstrument(principal, currentMarketRate);
    
    // Portfolio duration (weighted average)
    const portfolioDuration = floatingRateWeight * floatingRate.duration + 
                             interestRateGapWeight * interestRateGap.duration;
    
    // Portfolio convexity (weighted average)
    const portfolioConvexity = floatingRateWeight * floatingRate.calculateConvexity() + 
                               interestRateGapWeight * interestRateGap.convexity;
    
    // Expected return
    const floatingRateReturn = floatingRate.totalInterest / principal;
    const interestRateGapReturn = interestRateGap.annualPayment * interestRateGap.yearsToMaturity / principal;
    const portfolioReturn = floatingRateWeight * floatingRateReturn + 
                           interestRateGapWeight * interestRateGapReturn;
    
    return {
      portfolioDuration: portfolioDuration,
      portfolioConvexity: portfolioConvexity,
      portfolioReturn: portfolioReturn,
      weights: {
        floatingRate: floatingRateWeight,
        interestRateGap: interestRateGapWeight
      },
      individualMetrics: {
        floatingRate: {
          duration: floatingRate.duration,
          return: floatingRateReturn
        },
        interestRateGap: {
          duration: interestRateGap.duration,
          return: interestRateGapReturn
        }
      }
    };
  }
}

module.exports = InstrumentService;
