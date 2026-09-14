// 智能投资分析专家仪表板 - 后端服务
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 配置
const CONFIG = {
    GOOGLE_AI_API_KEY: 'xxxxxx',
    GOOGLE_AI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    CACHE_TIMEOUT: 300000, // 5分钟缓存
    UPDATE_INTERVAL: 300000 // 5分钟更新间隔
};

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// 缓存存储
const cache = new Map();

// 缓存管理函数
function getCachedData(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_TIMEOUT) {
        return cached.data;
    }
    return null;
}

function setCachedData(key, data) {
    cache.set(key, {
        data: data,
        timestamp: Date.now()
    });
}

// 获取股票数据
async function getStockData(symbol) {
    try {
        const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
        const data = response.data.chart.result[0];
        const quote = data.meta;
        const price = data.indicators.quote[0].close[data.indicators.quote[0].close.length - 1];
        
        return {
            symbol: symbol,
            price: price,
            change: quote.regularMarketChange,
            changePercent: quote.regularMarketChangePercent,
            volume: quote.regularMarketVolume,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
        return null;
    }
}

// 获取加密货币数据
async function getCryptoData(symbol) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_24hr_change=true`);
        const data = response.data[symbol];
        
        return {
            symbol: symbol,
            price: data.usd,
            change24h: data.usd_24h_change,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error(`Error fetching crypto data for ${symbol}:`, error);
        return null;
    }
}

// 获取市场数据摘要
async function getMarketSummary() {
    const cacheKey = 'market_summary';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
        const majorIndices = ['^GSPC', '^IXIC', '^DJI']; // 标普500, 纳斯达克, 道琼斯
        const commodities = ['GC=F', 'CL=F']; // 黄金, 原油
        const crypto = ['bitcoin', 'ethereum'];

        const [indicesData, commoditiesData, cryptoData, economicData] = await Promise.all([
            Promise.all(majorIndices.map(symbol => getStockData(symbol))),
            Promise.all(commodities.map(symbol => getStockData(symbol))),
            Promise.all(crypto.map(symbol => getCryptoData(symbol))),
            getEconomicData()
        ]);

        const result = {
            indices: {
                sp500: indicesData.find(s => s?.symbol === '^GSPC'),
                nasdaq: indicesData.find(s => s?.symbol === '^IXIC'),
                dow: indicesData.find(s => s?.symbol === '^DJI')
            },
            commodities: {
                gold: commoditiesData.find(s => s?.symbol === 'GC=F'),
                oil: commoditiesData.find(s => s?.symbol === 'CL=F')
            },
            crypto: {
                bitcoin: cryptoData.find(c => c?.symbol === 'bitcoin'),
                ethereum: cryptoData.find(c => c?.symbol === 'ethereum')
            },
            economic: economicData,
            timestamp: new Date().toISOString()
        };

        setCachedData(cacheKey, result);
        return result;
    } catch (error) {
        console.error('Error fetching market summary:', error);
        return null;
    }
}

// 获取经济数据
async function getEconomicData() {
    try {
        const indicators = ['^TNX', 'DX-Y.NYB', '^VIX']; // 10年期国债收益率, 美元指数, VIX恐慌指数
        const stockData = await Promise.all(indicators.map(symbol => getStockData(symbol)));
        
        return {
            treasury10y: stockData.find(s => s?.symbol === '^TNX')?.price || null,
            dollarIndex: stockData.find(s => s?.symbol === 'DX-Y.NYB')?.price || null,
            vix: stockData.find(s => s?.symbol === '^VIX')?.price || null,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error fetching economic data:', error);
        return null;
    }
}

// 获取行业表现数据
async function getSectorPerformance() {
    const cacheKey = 'sector_performance';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
        const sectorETFs = [
            'XLK', // 科技
            'XLF', // 金融
            'XLV', // 医疗
            'XLE', // 能源
            'XLY', // 消费
            'XLI', // 工业
            'XLU', // 公用事业
            'XLB'  // 材料
        ];

        const sectorData = await Promise.all(sectorETFs.map(symbol => getStockData(symbol)));
        
        const result = sectorData.map(sector => ({
            symbol: sector?.symbol,
            name: getSectorName(sector?.symbol),
            price: sector?.price,
            change: sector?.change,
            changePercent: sector?.changePercent
        })).filter(sector => sector.symbol); // 过滤掉空数据

        setCachedData(cacheKey, result);
        return result;
    } catch (error) {
        console.error('Error fetching sector performance:', error);
        return [];
    }
}

// 获取行业名称
function getSectorName(symbol) {
    const sectorNames = {
        'XLK': '科技',
        'XLF': '金融',
        'XLV': '医疗',
        'XLE': '能源',
        'XLY': '消费',
        'XLI': '工业',
        'XLU': '公用事业',
        'XLB': '材料'
    };
    return sectorNames[symbol] || symbol;
}

// 调用Google AI API
async function callGoogleAI(prompt) {
    try {
        const response = await axios.post(
            `${CONFIG.GOOGLE_AI_API_URL}?key=${CONFIG.GOOGLE_AI_API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 30000 // 30秒超时
            }
        );

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error calling Google AI API:', error);
        throw error;
    }
}

// 生成投资建议
async function generateInvestmentAdvice(marketData) {
    const prompt = `
    基于以下实时市场数据，请提供专业的投资建议：
    
    市场指数：
    - 标普500: ${marketData.indices?.sp500?.price || 'N/A'} (${marketData.indices?.sp500?.changePercent || 'N/A'}%)
    - 纳斯达克: ${marketData.indices?.nasdaq?.price || 'N/A'} (${marketData.indices?.nasdaq?.changePercent || 'N/A'}%)
    - 道琼斯: ${marketData.indices?.dow?.price || 'N/A'} (${marketData.indices?.dow?.changePercent || 'N/A'}%)
    
    商品价格：
    - 黄金: $${marketData.commodities?.gold?.price || 'N/A'} (${marketData.commodities?.gold?.changePercent || 'N/A'}%)
    - 原油: $${marketData.commodities?.oil?.price || 'N/A'} (${marketData.commodities?.oil?.changePercent || 'N/A'}%)
    
    加密货币：
    - 比特币: $${marketData.crypto?.bitcoin?.price || 'N/A'} (${marketData.crypto?.bitcoin?.change24h || 'N/A'}%)
    - 以太坊: $${marketData.crypto?.ethereum?.price || 'N/A'} (${marketData.crypto?.ethereum?.change24h || 'N/A'}%)
    
    经济指标：
    - 10年期国债收益率: ${marketData.economic?.treasury10y || 'N/A'}%
    - 美元指数: ${marketData.economic?.dollarIndex || 'N/A'}
    - VIX恐慌指数: ${marketData.economic?.vix || 'N/A'}
    
    请从以下几个方面提供专业分析：
    1. 市场整体趋势判断
    2. 各资产类别投资机会分析
    3. 风险因素识别
    4. 具体投资建议和操作策略
    5. 资产配置建议
    6. 短期和长期展望
    
    请用中文回答，语言专业但易懂，提供可操作的投资建议。
    `;

    return await callGoogleAI(prompt);
}

// API路由

// 获取市场数据摘要
app.get('/api/market-summary', async (req, res) => {
    try {
        const data = await getMarketSummary();
        if (data) {
            res.json(data);
        } else {
            res.status(500).json({ error: '无法获取市场数据' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 获取行业表现数据
app.get('/api/sector-performance', async (req, res) => {
    try {
        const data = await getSectorPerformance();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 生成AI投资建议
app.post('/api/generate-advice', async (req, res) => {
    try {
        const marketData = req.body;
        const advice = await generateInvestmentAdvice(marketData);
        res.json({ advice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 获取投资组合指标
app.get('/api/portfolio-metrics/:riskLevel', (req, res) => {
    try {
        const riskLevel = req.params.riskLevel.toUpperCase();
        
        const riskConfigs = {
            CONSERVATIVE: {
                expectedReturn: 4.5,
                maxDrawdown: -8,
                volatility: 6.5,
                sharpeRatio: 0.69,
                riskLevel: 'conservative'
            },
            MODERATE: {
                expectedReturn: 6.5,
                maxDrawdown: -12,
                volatility: 9.2,
                sharpeRatio: 0.71,
                riskLevel: 'moderate'
            },
            AGGRESSIVE: {
                expectedReturn: 8.5,
                maxDrawdown: -20,
                volatility: 15.8,
                sharpeRatio: 0.54,
                riskLevel: 'aggressive'
            }
        };

        const config = riskConfigs[riskLevel];
        if (config) {
            res.json(config);
        } else {
            res.status(400).json({ error: '无效的风险等级' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        cacheSize: cache.size
    });
});

// 提供静态文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

// 404处理
app.use((req, res) => {
    res.status(404).json({ error: '未找到请求的资源' });
});

// 定期清理缓存
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CONFIG.CACHE_TIMEOUT) {
            cache.delete(key);
        }
    }
    console.log(`缓存清理完成，当前缓存大小: ${cache.size}`);
}, 60000); // 每分钟清理一次

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 智能投资分析专家仪表板服务启动`);
    console.log(`📊 服务地址: http://localhost:${PORT}`);
    console.log(`🔧 API端点:`);
    console.log(`  - GET  /api/market-summary`);
    console.log(`  - GET  /api/sector-performance`);
    console.log(`  - POST /api/generate-advice`);
    console.log(`  - GET  /api/portfolio-metrics/:riskLevel`);
    console.log(`  - GET  /api/health`);
    console.log(`🌐 前端界面: http://localhost:${PORT}`);
    console.log(`⏰ 数据更新间隔: ${CONFIG.UPDATE_INTERVAL / 1000}秒`);
    console.log(`💾 缓存超时: ${CONFIG.CACHE_TIMEOUT / 1000}秒`);
});

module.exports = app;

