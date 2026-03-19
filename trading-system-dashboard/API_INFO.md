# 智能投资分析专家仪表板 - API信息记录

## 📋 API概览

本项目集成了多个API服务，用于获取实时数据、生成AI分析和提供投资建议。

## 🔑 API密钥信息

### 1. Google AI Studio API
- **API密钥**: `AIzaSyAWlsEVOzyf7J0dyxWItfQfdLhH7qEkIjI`
- **服务类型**: AI语言模型服务
- **主要用途**: 生成智能投资建议和分析报告
- **当前模型**: gemini-pro (默认)
- **可用模型**: 
  - gemini-2.5-pro (最新最强大)
  - gemini-2.5-flash (快速响应)
  - gemini-2.5-flash-lite (轻量级)
  - gemini-2.5-flash-live (实时交互)
- **状态**: ✅ 已配置并集成

### 2. Mistral API
- **API密钥**: `f3cilbbMMNvqEry3Tt87Ci32630BaVYD`
- **服务类型**: AI语言模型服务
- **主要用途**: 备用AI分析服务
- **模型**: Mistral AI模型
- **状态**: ⚠️ 已配置但未集成

### 3. 智谱 API
- **API密钥**: `dd9cb9ce5efb4340aca915941f550e17.1sG32dG6vDgqLVKt`
- **服务类型**: 中文AI语言模型服务
- **主要用途**: 中文投资分析服务
- **模型**: 智谱AI模型
- **状态**: ⚠️ 已配置但未集成

## 🌐 数据源API

### 4. Yahoo Finance API
- **服务类型**: 金融数据服务
- **用途**: 股票、指数、商品价格数据
- **端点**: `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`
- **数据范围**:
  - 股票指数: 标普500, 纳斯达克, 道琼斯
  - 商品: 黄金, 原油
  - 经济指标: 国债收益率, 美元指数, VIX
- **状态**: ✅ 已集成
- **限制**: 免费使用，有请求频率限制

### 5. CoinGecko API
- **服务类型**: 加密货币数据服务
- **用途**: 加密货币价格和变化数据
- **端点**: `https://api.coingecko.com/api/v3/simple/price`
- **数据范围**:
  - 比特币 (bitcoin)
  - 以太坊 (ethereum)
  - 其他主流加密货币
- **状态**: ✅ 已集成
- **限制**: 免费使用，有请求频率限制

## 🔧 API配置详情

### Google AI Studio API配置
```javascript
const CONFIG = {
    GOOGLE_AI_API_KEY: 'AIzaSyAWlsEVOzyf7J0dyxWItfQfdLhH7qEkIjI',
    GOOGLE_AI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
};
```

### Google AI Studio API使用方法

#### 1. 可选择的模型
- **gemini-2.5-pro**: 最新最强大的模型，适合复杂分析
- **gemini-2.5-flash**: 快速响应模型，适合实时分析
- **gemini-2.5-flash-lite**: 轻量级模型，适合简单任务
- **gemini-2.5-flash-live**: 实时交互模型

#### 2. API调用示例
```javascript
// 基础调用
async function callGoogleAI(prompt, model = 'gemini-pro') {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${CONFIG.GOOGLE_AI_API_KEY}`,
            {
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
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Google AI API error:', error);
        throw error;
    }
}

// 使用不同模型的调用示例
const models = {
    'pro': 'gemini-2.5-pro',
    'flash': 'gemini-2.5-flash', 
    'flash-lite': 'gemini-2.5-flash-lite',
    'flash-live': 'gemini-2.5-flash-live'
};

// 调用不同模型
const result = await callGoogleAI(prompt, models.pro);
```

#### 3. 请求格式
```javascript
{
    "contents": [
        {
            "parts": [
                {
                    "text": "您的提示文本"
                }
            ]
        }
    ],
    "generationConfig": {
        "temperature": 0.7,
        "topK": 40,
        "topP": 0.95,
        "maxOutputTokens": 1024
    },
    "safetySettings": [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        }
    ]
}
```

#### 4. 响应格式
```javascript
{
    "candidates": [
        {
            "content": {
                "parts": [
                    {
                        "text": "AI生成的响应文本"
                    }
                ],
                "role": "model"
            },
            "finishReason": "STOP",
            "index": 0,
            "safetyRatings": [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "probability": "NEGLIGIBLE"
                }
            ]
        }
    ],
    "usageMetadata": {
        "promptTokenCount": 10,
        "candidatesTokenCount": 100,
        "totalTokenCount": 110
    }
}
```

#### 5. 高级配置选项
```javascript
const advancedConfig = {
    generationConfig: {
        temperature: 0.7,        // 创造性 (0-1)
        topK: 40,               // 词汇选择多样性
        topP: 0.95,             // 核采样
        maxOutputTokens: 1024,  // 最大输出长度
        stopSequences: ["STOP"] // 停止序列
    },
    safetySettings: [
        {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
    ]
};
```

#### 6. 错误处理
```javascript
async function safeCallGoogleAI(prompt, model = 'gemini-pro') {
    try {
        const response = await callGoogleAI(prompt, model);
        return response;
    } catch (error) {
        if (error.message.includes('400')) {
            console.error('请求格式错误');
            return '请求格式错误，请检查输入';
        } else if (error.message.includes('401')) {
            console.error('API密钥无效');
            return 'API密钥无效，请检查配置';
        } else if (error.message.includes('403')) {
            console.error('访问被拒绝');
            return '访问被拒绝，请检查权限';
        } else if (error.message.includes('429')) {
            console.error('请求频率过高');
            return '请求频率过高，请稍后重试';
        } else {
            console.error('未知错误:', error);
            return '服务暂时不可用，请稍后重试';
        }
    }
}
```

#### 7. 实际应用示例
```javascript
// 投资分析专用调用
async function generateInvestmentAdvice(marketData, model = 'gemini-2.5-pro') {
    const prompt = `
    基于以下市场数据，请提供专业的投资建议：
    
    市场指数：
    - 标普500: ${marketData.sp500?.price || 'N/A'}
    - 纳斯达克: ${marketData.nasdaq?.price || 'N/A'}
    
    请从以下几个方面分析：
    1. 市场趋势判断
    2. 投资机会分析
    3. 风险因素识别
    4. 具体投资建议
    5. 资产配置建议
    
    请用中文回答，语言专业但易懂。
    `;

    const response = await callGoogleAI(prompt, model);
    return response;
}

// 使用不同模型进行分析
const quickAnalysis = await generateInvestmentAdvice(marketData, 'gemini-2.5-flash');
const detailedAnalysis = await generateInvestmentAdvice(marketData, 'gemini-2.5-pro');
```

### Mistral API配置
```javascript
const CONFIG = {
    MISTRAL_API_KEY: 'f3cilbbMMNvqEry3Tt87Ci32630BaVYD',
    MISTRAL_API_URL: 'https://api.mistral.ai/v1/chat/completions'
};
```

### 智谱 API配置
```javascript
const CONFIG = {
    ZHIPU_API_KEY: 'dd9cb9ce5efb4340aca915941f550e17.1sG32dG6vDgqLVKt',
    ZHIPU_API_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
};
```

## 📊 API使用统计

### 当前集成状态
| API服务 | 状态 | 用途 | 集成度 |
|---------|------|------|--------|
| Google AI Studio | ✅ 已集成 | AI投资建议 | 100% |
| Yahoo Finance | ✅ 已集成 | 股票数据 | 100% |
| CoinGecko | ✅ 已集成 | 加密货币数据 | 100% |
| Mistral API | ⚠️ 未集成 | 备用AI服务 | 0% |
| 智谱 API | ⚠️ 未集成 | 中文AI服务 | 0% |

## 🔄 API调用流程

### 1. 数据获取流程
```
前端请求 → 后端服务 → 数据源API → 数据处理 → 缓存 → 返回前端
```

### 2. AI分析流程
```
市场数据 → Google AI Studio → AI分析 → 投资建议 → 返回前端
```

### 3. 缓存策略
- **缓存时间**: 5分钟
- **缓存类型**: 内存缓存
- **清理机制**: 自动清理过期数据

## 📚 API使用指南

### Google AI Studio API 使用建议

#### 模型选择指南
- **gemini-2.5-pro**: 
  - 用途: 复杂投资分析、深度市场研究
  - 特点: 最高准确性，适合详细分析
  - 成本: 较高
  
- **gemini-2.5-flash**: 
  - 用途: 实时投资建议、快速市场分析
  - 特点: 快速响应，平衡性能和成本
  - 成本: 中等
  
- **gemini-2.5-flash-lite**: 
  - 用途: 简单投资提示、基础分析
  - 特点: 最快速，成本最低
  - 成本: 最低
  
- **gemini-2.5-flash-live**: 
  - 用途: 实时对话、交互式分析
  - 特点: 支持实时交互
  - 成本: 中等

#### 最佳实践
1. **根据需求选择模型**:
   - 详细分析 → gemini-2.5-pro
   - 实时建议 → gemini-2.5-flash
   - 简单查询 → gemini-2.5-flash-lite

2. **优化提示词**:
   - 明确指定分析角度
   - 提供具体的市场数据
   - 要求结构化输出

3. **错误处理**:
   - 实现重试机制
   - 设置合理的超时时间
   - 提供降级方案

#### 实际应用场景
```javascript
// 场景1: 实时市场分析
const quickAnalysis = await callGoogleAI(marketPrompt, 'gemini-2.5-flash');

// 场景2: 深度投资研究
const detailedResearch = await callGoogleAI(researchPrompt, 'gemini-2.5-pro');

// 场景3: 简单投资提示
const simpleTip = await callGoogleAI(tipPrompt, 'gemini-2.5-flash-lite');
```

## 🛡️ API安全配置

### 密钥管理
- **存储方式**: 代码中硬编码（开发环境）
- **生产环境建议**: 使用环境变量
- **访问控制**: 限制API调用频率
- **错误处理**: 避免敏感信息泄露

### 安全最佳实践
1. **密钥轮换**: 定期更新API密钥
2. **访问限制**: 设置IP白名单
3. **监控**: 监控API使用情况
4. **备份**: 备份重要配置信息

## 📈 API性能优化

### 缓存策略
- **数据缓存**: 5分钟智能缓存
- **请求合并**: 批量API调用
- **错误重试**: 智能重试机制
- **降级处理**: API失败时的备用方案

### 并发控制
- **请求限制**: 控制并发请求数量
- **超时设置**: 30秒API超时
- **错误处理**: 优雅的错误处理

## 🔮 未来API扩展计划

### 计划集成的API
1. **Alpha Vantage API**: 更详细的股票数据
2. **Polygon.io API**: 专业级市场数据
3. **CoinMarketCap API**: 更全面的加密货币数据
4. **Mistral API**: 多模型AI分析
5. **智谱 API**: 中文AI分析服务

### 集成优先级
1. **高优先级**: Mistral API, 智谱 API
2. **中优先级**: Alpha Vantage, CoinMarketCap
3. **低优先级**: 其他专业数据源

## 🧪 API测试

### 测试端点
- **健康检查**: `GET /api/health`
- **市场数据**: `GET /api/market-summary`
- **AI建议**: `POST /api/generate-advice`

### 测试命令
```bash
# 测试后端连接
curl http://localhost:3000/api/health

# 测试市场数据
curl http://localhost:3000/api/market-summary

# 测试AI建议
curl -X POST http://localhost:3000/api/generate-advice \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## 📋 API维护清单

### 定期检查项目
- [ ] API密钥有效性
- [ ] API调用频率限制
- [ ] 数据准确性
- [ ] 错误处理机制
- [ ] 缓存策略效果
- [ ] 性能监控

### 故障排除
1. **API调用失败**: 检查网络连接和密钥
2. **数据不准确**: 验证数据源和更新频率
3. **响应缓慢**: 检查缓存策略和并发控制
4. **错误频繁**: 检查错误处理和重试机制

## 📞 技术支持

### API文档链接
- [Google AI Studio API](https://ai.google.dev/docs)
- [Mistral API](https://docs.mistral.ai/)
- [智谱 API](https://open.bigmodel.cn/dev/api)
- [Yahoo Finance API](https://finance.yahoo.com/)
- [CoinGecko API](https://www.coingecko.com/en/api/documentation)

### 联系方式
- **技术支持**: 查看项目文档
- **问题报告**: 创建GitHub Issue
- **功能请求**: 提交Feature Request

---

## 📝 更新日志

### 2025-01-25 (最新更新)
- ✅ 添加Google AI Studio API详细使用指南
- ✅ 添加多种Gemini模型选择说明
- ✅ 添加API调用示例和错误处理
- ✅ 添加模型选择指南和最佳实践
- ✅ 集成Google AI Studio API
- ✅ 集成Yahoo Finance API
- ✅ 集成CoinGecko API
- ⚠️ 配置Mistral API（未集成）
- ⚠️ 配置智谱 API（未集成）

### 未来计划
- 🔄 集成Mistral API作为备用AI服务
- 🔄 集成智谱 API提供中文分析
- 🔄 添加更多数据源API
- 🔄 实现API负载均衡
- 🔄 添加模型性能对比测试
- 🔄 实现智能模型选择算法

---

**文档版本**: v1.0.0  
**最后更新**: 2025年1月25日  
**维护者**: AI Assistant
