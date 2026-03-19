// 智能投资分析专家仪表板 - 主应用脚本

// Configuration
const CONFIG = {
    GOOGLE_AI_API_KEY: 'xxxx',
    GOOGLE_AI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    UPDATE_INTERVAL: 300000 // 5 minutes
};

// Global variables
let charts = {};
let marketData = {};
let lastUpdateTime = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    loadInitialData();
    setupAutoRefresh();
});

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.section-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Chart initialization
function initializeCharts() {
    // Market Indices Chart
    const marketCtx = document.getElementById('marketIndicesChart').getContext('2d');
    charts.marketIndices = new Chart(marketCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: '标普500',
                data: [4500, 4650, 4800, 4750, 4900, 4850],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.1
            }, {
                label: '纳斯达克',
                data: [14000, 14500, 15000, 14800, 15200, 15100],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: { family: "'Noto Sans SC', sans-serif" }
                    }
                }
            }
        }
    });

    // Asset Classes Chart
    const assetCtx = document.getElementById('assetClassesChart').getContext('2d');
    charts.assetClasses = new Chart(assetCtx, {
        type: 'doughnut',
        data: {
            labels: ['股票', '债券', '商品', '现金', '另类投资'],
            datasets: [{
                data: [40, 30, 15, 10, 5],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(156, 163, 175, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: "'Noto Sans SC', sans-serif" }
                    }
                }
            }
        }
    });

    // Portfolio Allocation Chart
    const portfolioCtx = document.getElementById('portfolioAllocationChart').getContext('2d');
    charts.portfolioAllocation = new Chart(portfolioCtx, {
        type: 'pie',
        data: {
            labels: ['美国股票', '国际股票', '债券', '黄金', 'REITs', '加密货币'],
            datasets: [{
                data: [30, 15, 20, 10, 10, 5],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: "'Noto Sans SC', sans-serif" }
                    }
                }
            }
        }
    });

    // Sector Analysis Chart
    const sectorCtx = document.getElementById('sectorAnalysisChart').getContext('2d');
    charts.sectorAnalysis = new Chart(sectorCtx, {
        type: 'bar',
        data: {
            labels: ['科技', '金融', '医疗', '能源', '消费', '工业', '公用事业'],
            datasets: [{
                label: '年初至今表现 (%)',
                data: [8.5, 3.2, -2.1, -5.8, 4.1, 1.8, 6.2],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(156, 163, 175, 0.8)',
                    'rgba(251, 191, 36, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        font: { family: "'Noto Sans SC', sans-serif" }
                    }
                }
            }
        }
    });
}

// Data loading functions
async function loadInitialData() {
    showLoading(true);
    try {
        await loadMarketData();
        await loadEconomicData();
        await loadPortfolioData();
        
        showLoading(false);
        updateLastUpdateTime();
    } catch (error) {
        console.error('Error loading initial data:', error);
        showLoading(false);
        showError('数据加载失败，请稍后重试');
    }
}

async function loadMarketData() {
    // Mock data - in production, this would be real API calls
    const mockData = {
        sp500: { price: 4850.23, change: '+1.2%', changeValue: '+57.8' },
        nasdaq: { price: 15123.45, change: '+0.8%', changeValue: '+120.3' },
        gold: { price: 2658.90, change: '+2.1%', changeValue: '+54.7' },
        btc: { price: 104687, change: '+3.5%', changeValue: '+3547' },
        treasury: { yield: 4.41 },
        dxy: { index: 103.45 },
        vix: { index: 18.2 }
    };

    // Update UI elements
    document.getElementById('sp500-price').textContent = mockData.sp500.price.toLocaleString();
    document.getElementById('sp500-change').textContent = mockData.sp500.change;
    document.getElementById('sp500-change').className = mockData.sp500.changeValue.startsWith('+') ? 'text-sm text-green-600' : 'text-sm text-red-600';

    document.getElementById('nasdaq-price').textContent = mockData.nasdaq.price.toLocaleString();
    document.getElementById('nasdaq-change').textContent = mockData.nasdaq.change;
    document.getElementById('nasdaq-change').className = mockData.nasdaq.changeValue.startsWith('+') ? 'text-sm text-green-600' : 'text-sm text-red-600';

    document.getElementById('gold-price').textContent = `$${mockData.gold.price}`;
    document.getElementById('gold-change').textContent = mockData.gold.change;
    document.getElementById('gold-change').className = mockData.gold.changeValue.startsWith('+') ? 'text-sm text-green-600' : 'text-sm text-red-600';

    document.getElementById('btc-price').textContent = `$${mockData.btc.price.toLocaleString()}`;
    document.getElementById('btc-change').textContent = mockData.btc.change;
    document.getElementById('btc-change').className = mockData.btc.changeValue.startsWith('+') ? 'text-sm text-green-600' : 'text-sm text-red-600';

    document.getElementById('treasury-yield').textContent = `${mockData.treasury.yield}%`;
    document.getElementById('dxy-index').textContent = mockData.dxy.index;
    document.getElementById('vix-index').textContent = mockData.vix.index;

    marketData = mockData;
}

async function loadEconomicData() {
    // Update economic indicators and forecasts
    // This would typically involve API calls to economic data providers
}

async function loadPortfolioData() {
    // Update portfolio metrics and recommendations
    // This would involve portfolio analysis calculations
}

// AI Analysis functions
async function generateAIAdvice() {
    showLoading(true);
    try {
        const analysisPrompt = `
        基于以下当前市场数据，请提供专业的投资建议：
        
        标普500指数: ${marketData.sp500?.price || 'N/A'}
        纳斯达克: ${marketData.nasdaq?.price || 'N/A'}
        黄金价格: $${marketData.gold?.price || 'N/A'}
        比特币: $${marketData.btc?.price || 'N/A'}
        10年期国债收益率: ${marketData.treasury?.yield || 'N/A'}%
        美元指数: ${marketData.dxy?.index || 'N/A'}
        VIX恐慌指数: ${marketData.vix?.index || 'N/A'}
        
        请从以下几个方面进行分析：
        1. 市场整体趋势判断
        2. 各资产类别投资机会
        3. 风险因素分析
        4. 具体投资建议
        5. 资产配置建议
        
        请用中文回答，语言专业但易懂。
        `;

        const response = await callGoogleAI(analysisPrompt);
        displayAIAdvice(response);
        
        showLoading(false);
    } catch (error) {
        console.error('Error generating AI advice:', error);
        showLoading(false);
        showError('AI分析生成失败，请稍后重试');
    }
}

async function callGoogleAI(prompt) {
    try {
        const response = await fetch(`${CONFIG.GOOGLE_AI_API_URL}?key=${CONFIG.GOOGLE_AI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Google AI API error:', error);
        // Return mock response if API fails
        return `
        【AI投资分析报告】
        
        基于当前市场数据，AI分析系统提供以下投资建议：
        
        1. 市场趋势判断：
        - 股票市场呈现震荡上行趋势，科技股表现强劲
        - 债券市场收益率处于相对高位，提供较好投资机会
        - 黄金作为避险资产，在地缘政治不确定性下表现良好
        - 加密货币市场波动较大，需谨慎配置
        
        2. 投资机会分析：
        - 科技股：AI相关公司长期前景看好，但需注意估值风险
        - 债券：当前收益率水平提供了较好的配置价值
        - 黄金：在地缘政治风险下，建议适当增持
        - 国际股票：估值相对合理，可考虑增加配置
        
        3. 风险提示：
        - 通胀数据仍需关注，可能影响央行政策
        - 地缘政治风险持续存在
        - 企业盈利增长可能放缓
        
        4. 资产配置建议：
        - 股票：40%（其中科技股15%，价值股15%，国际股票10%）
        - 债券：30%（政府债券20%，公司债券10%）
        - 另类投资：20%（黄金10%，REITs 5%，其他5%）
        - 现金：10%
        
        5. 操作建议：
        - 保持适度风险敞口
        - 定期再平衡投资组合
        - 关注经济数据变化
        - 避免追涨杀跌
        `;
    }
}

function displayAIAdvice(advice) {
    const adviceElement = document.getElementById('aiAdviceText');
    adviceElement.innerHTML = advice.replace(/\n/g, '<br>');
    
    // Scroll to AI insights section
    document.getElementById('ai-insights').scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const mainContent = document.getElementById('mainContent');
    
    if (show) {
        loadingIndicator.classList.remove('hidden');
        mainContent.style.opacity = '0.5';
    } else {
        loadingIndicator.classList.add('hidden');
        mainContent.style.opacity = '1';
    }
}

function showError(message) {
    // Simple error display - could be enhanced with a proper modal
    alert(message);
}

function updateLastUpdateTime() {
    lastUpdateTime = new Date();
    // Could add a timestamp display to the UI
}

function setupAutoRefresh() {
    // Auto-refresh data every 5 minutes
    setInterval(() => {
        loadInitialData();
    }, CONFIG.UPDATE_INTERVAL);
}

// Event listeners
document.getElementById('refreshData').addEventListener('click', loadInitialData);
document.getElementById('generateAIAdvice').addEventListener('click', generateAIAdvice);

// Responsive chart resizing
window.addEventListener('resize', () => {
    Object.values(charts).forEach(chart => {
        chart.resize();
    });
});

