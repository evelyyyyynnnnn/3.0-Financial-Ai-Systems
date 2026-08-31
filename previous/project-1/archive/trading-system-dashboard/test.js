// 系统功能测试脚本
const axios = require('axios');

const CONFIG = {
    BACKEND_URL: 'http://localhost:3000',
    TEST_TIMEOUT: 10000 // 10秒超时
};

class SystemTester {
    constructor() {
        this.results = [];
        this.passed = 0;
        this.failed = 0;
    }

    async runTest(testName, testFunction) {
        console.log(`\n🧪 运行测试: ${testName}`);
        try {
            const result = await Promise.race([
                testFunction(),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('测试超时')), CONFIG.TEST_TIMEOUT)
                )
            ]);
            
            this.results.push({ name: testName, status: 'PASS', result });
            this.passed++;
            console.log(`✅ ${testName}: 通过`);
            return true;
        } catch (error) {
            this.results.push({ name: testName, status: 'FAIL', error: error.message });
            this.failed++;
            console.log(`❌ ${testName}: 失败 - ${error.message}`);
            return false;
        }
    }

    async testBackendConnection() {
        const response = await axios.get(`${CONFIG.BACKEND_URL}/api/health`);
        if (response.status === 200) {
            return '后端服务连接成功';
        }
        throw new Error(`HTTP ${response.status}`);
    }

    async testMarketDataAPI() {
        const response = await axios.get(`${CONFIG.BACKEND_URL}/api/market-summary`);
        const data = response.data;
        
        if (!data.indices || !data.economic) {
            throw new Error('市场数据结构不完整');
        }
        
        return `获取到市场数据: ${Object.keys(data).join(', ')}`;
    }

    async testSectorPerformanceAPI() {
        const response = await axios.get(`${CONFIG.BACKEND_URL}/api/sector-performance`);
        const data = response.data;
        
        if (!Array.isArray(data)) {
            throw new Error('行业数据格式错误');
        }
        
        return `获取到 ${data.length} 个行业数据`;
    }

    async testAIAdviceAPI() {
        const mockMarketData = {
            indices: {
                sp500: { price: 4850, changePercent: 1.2 },
                nasdaq: { price: 15123, changePercent: 0.8 }
            },
            economic: {
                treasury10y: 4.41,
                dollarIndex: 103.45,
                vix: 18.2
            }
        };

        const response = await axios.post(
            `${CONFIG.BACKEND_URL}/api/generate-advice`,
            mockMarketData,
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30000 // 30秒超时，因为AI API可能较慢
            }
        );
        
        const data = response.data;
        if (!data.advice || typeof data.advice !== 'string') {
            throw new Error('AI建议格式错误');
        }
        
        return `AI建议长度: ${data.advice.length} 字符`;
    }

    async testPortfolioMetricsAPI() {
        const riskLevels = ['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE'];
        
        for (const riskLevel of riskLevels) {
            const response = await axios.get(`${CONFIG.BACKEND_URL}/api/portfolio-metrics/${riskLevel}`);
            const data = response.data;
            
            if (!data.expectedReturn || !data.maxDrawdown || !data.sharpeRatio) {
                throw new Error(`${riskLevel} 风险等级数据不完整`);
            }
        }
        
        return `所有风险等级数据正常`;
    }

    async testErrorHandling() {
        try {
            await axios.get(`${CONFIG.BACKEND_URL}/api/nonexistent-endpoint`);
            throw new Error('应该返回404错误');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return '错误处理正常';
            }
            throw error;
        }
    }

    printSummary() {
        console.log('\n' + '='.repeat(50));
        console.log('📊 测试结果汇总');
        console.log('='.repeat(50));
        
        console.log(`✅ 通过: ${this.passed}`);
        console.log(`❌ 失败: ${this.failed}`);
        console.log(`📈 成功率: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
        
        if (this.failed > 0) {
            console.log('\n❌ 失败的测试:');
            this.results
                .filter(r => r.status === 'FAIL')
                .forEach(r => console.log(`  - ${r.name}: ${r.error}`));
        }
        
        console.log('\n✅ 通过的测试:');
        this.results
            .filter(r => r.status === 'PASS')
            .forEach(r => console.log(`  - ${r.name}: ${r.result}`));
        
        console.log('\n' + '='.repeat(50));
        
        if (this.failed === 0) {
            console.log('🎉 所有测试通过！系统运行正常。');
        } else {
            console.log('⚠️  部分测试失败，请检查相关配置。');
        }
    }

    async runAllTests() {
        console.log('🚀 开始系统功能测试...');
        console.log(`后端服务地址: ${CONFIG.BACKEND_URL}`);
        console.log(`测试超时时间: ${CONFIG.TEST_TIMEOUT / 1000}秒`);
        
        // 基础连接测试
        await this.runTest('后端服务连接', () => this.testBackendConnection());
        
        // API功能测试
        await this.runTest('市场数据API', () => this.testMarketDataAPI());
        await this.runTest('行业表现API', () => this.testSectorPerformanceAPI());
        await this.runTest('投资组合指标API', () => this.testPortfolioMetricsAPI());
        
        // AI功能测试
        await this.runTest('AI投资建议生成', () => this.testAIAdviceAPI());
        
        // 系统功能测试
        await this.runTest('错误处理', () => this.testErrorHandling());
        
        this.printSummary();
        
        return this.failed === 0;
    }
}

// 运行测试
async function main() {
    const tester = new SystemTester();
    
    try {
        const success = await tester.runAllTests();
        process.exit(success ? 0 : 1);
    } catch (error) {
        console.error('测试运行失败:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此文件
if (require.main === module) {
    main();
}

module.exports = SystemTester;

