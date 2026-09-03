# 金融工具服务 - 详细说明

## 概述

本服务提供了两种基于10年期7%固定利率债券的金融工具，用于利率风险管理和投资组合优化。

## 工具1: 浮动利率工具 (每日重置)

### 特征
- **类型**: 浮动利率，每日重置
- **久期**: 1天 (每日重置)
- **风险特征**: 极低久期风险
- **适用场景**: 利率风险对冲，稳定现金流

### 工作原理
- 每日根据当前市场利率计算支付
- 久期始终为1天，不受利率变化影响
- 提供稳定的现金流，风险极低

### 示例
```javascript
const floatingRate = instrumentService.createFloatingRateInstrument(
  100000,    // 本金
  0.05,      // 当前市场利率 (5%)
  3650       // 到期天数 (10年)
);

console.log(`日支付: $${floatingRate.dailyPayment}`);
console.log(`久期: ${floatingRate.duration} 天`);
```

## 工具2: 利率差工具 (10年期)

### 特征
- **类型**: 利率差支付，固定久期
- **久期**: 10年
- **风险特征**: 高利率敏感性
- **适用场景**: 利率方向性交易，久期管理

### 工作原理
- 支付当前市场利率与7%固定利率的差额
- 久期为10年，具有显著的利率风险敞口
- 当市场利率 > 7% 时，获得正支付
- 当市场利率 < 7% 时，需要支付差额

### 示例
```javascript
const interestRateGap = instrumentService.createInterestRateGapInstrument(
  100000,    // 本金
  0.05       // 当前市场利率 (5%)
);

console.log(`年支付: $${interestRateGap.annualPayment}`);
console.log(`久期: ${interestRateGap.duration} 年`);
console.log(`修正久期: ${interestRateGap.modifiedDuration}`);
console.log(`凸性: ${interestRateGap.convexity}`);
```

## 投资组合分析

### 权重优化
通过调整两种工具的权重，可以创建不同风险特征的投资组合：

```javascript
const metrics = instrumentService.calculatePortfolioMetrics(
  0.7,        // 浮动利率权重 (70%)
  0.3,        // 利率差工具权重 (30%)
  100000,     // 本金
  0.05,       // 市场利率
  3650        // 到期天数
);

console.log(`投资组合久期: ${metrics.portfolioDuration} 年`);
console.log(`投资组合收益率: ${(metrics.portfolioReturn * 100).toFixed(2)}%`);
```

### 推荐配置

#### 保守策略 (70/30)
- 浮动利率: 70%
- 利率差工具: 30%
- 投资组合久期: 3.7年
- 适合: 利率上升环境，风险厌恶投资者

#### 平衡策略 (50/50)
- 浮动利率: 50%
- 利率差工具: 50%
- 投资组合久期: 5.5年
- 适合: 中性利率环境，平衡风险收益

#### 激进策略 (30/70)
- 浮动利率: 30%
- 利率差工具: 70%
- 投资组合久期: 7.3年
- 适合: 利率下降环境，追求高收益

## 风险分析

### 利率敏感性
- **浮动利率工具**: 极低敏感性，每日重置消除久期风险
- **利率差工具**: 高敏感性，修正久期约7.3年

### 价格敏感度
```javascript
const priceChange = interestRateGap.calculatePriceSensitivity(0.01);
console.log(`利率上升1%的价格变化: ${(priceChange * 100).toFixed(2)}%`);
```

### 风险价值 (VaR)
- **浮动利率工具**: 低VaR，适合风险控制
- **利率差工具**: 高VaR，需要风险管理

## 市场环境适应性

### 利率上升环境
- 浮动利率工具: 支付增加，风险低
- 利率差工具: 支付增加，表现更好

### 利率下降环境
- 浮动利率工具: 支付减少，但风险仍低
- 利率差工具: 支付减少，风险增加

### 利率稳定环境
- 两种工具表现相似
- 适合平衡配置

## 使用方法

### 1. 基础使用
```javascript
const InstrumentService = require('./services/InstrumentService');
const instrumentService = new InstrumentService();

// 创建工具
const floatingRate = instrumentService.createFloatingRateInstrument(100000, 0.05, 3650);
const interestRateGap = instrumentService.createInterestRateGapInstrument(100000, 0.05);
```

### 2. 投资组合分析
```javascript
// 比较工具
const comparison = instrumentService.compareInstruments(100000, 0.05, 3650);

// 计算投资组合指标
const portfolioMetrics = instrumentService.calculatePortfolioMetrics(0.6, 0.4, 100000, 0.05, 3650);
```

### 3. 风险分析
```javascript
// 价格敏感度
const sensitivity = interestRateGap.calculatePriceSensitivity(0.01);

// 现值计算
const value = interestRateGap.calculateValue(5); // 5年后
```

## 演示脚本

### 基础演示
```bash
node demo_instruments.js
```

### 高级分析
```bash
node advanced_demo.js
```

### 可视化演示
```bash
node visualization_demo.js
```

## 技术特性

### 计算精度
- 支持高精度利率计算
- 考虑复利效应
- 准确的久期和凸性计算

### 性能优化
- 高效的现金流计算
- 优化的投资组合分析
- 快速的风险指标计算

### 扩展性
- 模块化设计
- 易于添加新的金融工具
- 支持自定义参数

## 注意事项

1. **利率假设**: 所有计算基于当前市场利率，实际利率可能变化
2. **信用风险**: 本模型不考虑信用风险，仅关注利率风险
3. **流动性**: 实际交易中需要考虑流动性成本
4. **税收**: 计算中未考虑税收影响
5. **监管**: 使用前请确认符合当地金融监管要求

## 更新日志

- **v1.0.0**: 初始版本，包含两种基础工具
- 支持基础计算和投资组合分析
- 包含完整的演示和文档

## 联系方式

如有问题或建议，请联系开发团队。

---

*本服务仅供教育和研究目的使用，不构成投资建议。实际投资决策请咨询专业金融顾问。*
