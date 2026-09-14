const axios = require('axios');

/**
 * Investment commentary generation.
 *
 * Carried over from the Investment Analysis Dashboard (now retired) — that
 * project's one capability the Platform did not already have. Two changes
 * were made during the move:
 *
 *   1. The API key comes from the environment, not a source literal.
 *   2. A missing key fails with a typed error the route turns into a 503,
 *      rather than an opaque upstream 400.
 */

const MODEL_URL =
  process.env.GOOGLE_AI_API_URL ||
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const RISK_PROFILES = {
  conservative: { expectedReturn: 4.5, maxDrawdown: -8, volatility: 6.5, sharpeRatio: 0.69 },
  moderate:     { expectedReturn: 6.5, maxDrawdown: -12, volatility: 9.2, sharpeRatio: 0.71 },
  aggressive:   { expectedReturn: 8.5, maxDrawdown: -20, volatility: 15.8, sharpeRatio: 0.54 }
};

class AdvisoryService {
  constructor() {
    this.apiKey = process.env.GOOGLE_AI_API_KEY || '';
  }

  riskLevels() {
    return Object.keys(RISK_PROFILES);
  }

  getRiskProfile(level) {
    if (!level) return null;
    const key = String(level).toLowerCase();
    const profile = RISK_PROFILES[key];
    return profile ? { riskLevel: key, ...profile } : null;
  }

  status() {
    return {
      configured: Boolean(this.apiKey),
      model: MODEL_URL.split('/').pop().split(':')[0],
      hint: this.apiKey ? null : 'Set GOOGLE_AI_API_KEY to enable generation.'
    };
  }

  buildPrompt(m) {
    const at = (path, fallback = 'N/A') =>
      path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), m) ?? fallback;

    return `基于以下实时市场数据，请提供专业的投资建议：

市场指数：
- 标普500: ${at('indices.sp500.price')} (${at('indices.sp500.changePercent')}%)
- 纳斯达克: ${at('indices.nasdaq.price')} (${at('indices.nasdaq.changePercent')}%)
- 道琼斯: ${at('indices.dow.price')} (${at('indices.dow.changePercent')}%)

商品价格：
- 黄金: $${at('commodities.gold.price')} (${at('commodities.gold.changePercent')}%)
- 原油: $${at('commodities.oil.price')} (${at('commodities.oil.changePercent')}%)

加密货币：
- 比特币: $${at('crypto.bitcoin.price')} (${at('crypto.bitcoin.change24h')}%)
- 以太坊: $${at('crypto.ethereum.price')} (${at('crypto.ethereum.change24h')}%)

经济指标：
- 10年期国债收益率: ${at('economic.treasury10y')}%
- 美元指数: ${at('economic.dollarIndex')}
- VIX恐慌指数: ${at('economic.vix')}

请从以下几个方面提供专业分析：
1. 市场整体趋势判断
2. 各资产类别投资机会分析
3. 风险因素识别
4. 具体投资建议和操作策略
5. 资产配置建议
6. 短期和长期展望

请用中文回答，语言专业但易懂，提供可操作的投资建议。`;
  }

  async generateAdvice(marketData) {
    if (!this.apiKey) {
      const err = new Error('GOOGLE_AI_API_KEY is not set.');
      err.code = 'NO_API_KEY';
      throw err;
    }

    const response = await axios.post(
      `${MODEL_URL}?key=${this.apiKey}`,
      { contents: [{ parts: [{ text: this.buildPrompt(marketData) }] }] },
      { headers: { 'Content-Type': 'application/json' }, timeout: 30000 }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Model returned no content.');
    return text;
  }
}

module.exports = AdvisoryService;
