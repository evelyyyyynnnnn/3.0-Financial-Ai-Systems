# 🌐 MarketWatcher Web Application

## 期权波动率交易系统 - Web界面

这是一个完整的Web应用程序，为IBKR期权波动率交易系统提供现代化的Web界面。你可以通过浏览器实时监控交易机会、查看市场数据和控制系统。

## ✨ 功能特性

### 🎯 实时监控
- **实时投资机会检测**：自动识别Long Straddle和Short Straddle交易机会
- **市场数据展示**：实时显示股票涨跌幅和趋势
- **WebSocket连接**：实时推送市场更新，无需刷新页面

### 📊 仪表板功能
- **系统状态监控**：查看系统运行状态和配置
- **统计信息**：监控股票数量、机会数量等关键指标
- **历史数据**：查看最近的投资机会记录

### 🎮 控制面板
- **一键启停**：通过Web界面启动或停止交易系统
- **实时刷新**：手动刷新数据或查看最新状态
- **系统配置**：查看当前系统配置和阈值设置

## 🚀 快速开始

### 方法1：使用启动脚本（推荐）
```bash
cd "/Users/evelyndu/Desktop/To-do/编程/量化系统开发/ibkr-options-volatility-trading-main"
./start_webapp.sh
```

### 方法2：手动启动
```bash
# 1. 激活虚拟环境
cd "/Users/evelyndu/Desktop/To-do/编程/量化系统开发/ibkr-options-volatility-trading-main"
source venv/bin/activate

# 2. 启动MarketWatcher系统（如果未运行）
market_watcher_cli start

# 3. 启动Web应用
cd webapp
python app.py
```

## 🌍 访问Web应用

启动成功后，打开浏览器访问：

**🔗 http://localhost:8080**

## 📱 界面说明

### 主仪表板
- **系统状态卡片**：显示系统运行状态和基本统计
- **投资机会区域**：实时显示检测到的交易机会
- **市场数据表格**：展示前20只股票的实时表现

### 系统控制
- **启动/停止按钮**：控制MarketWatcher系统的运行状态
- **刷新按钮**：手动更新数据
- **连接状态指示器**：显示WebSocket连接状态

## 🔧 API接口

Web应用提供以下API接口：

### 系统状态
- `GET /api/status` - 获取系统状态和统计信息
- `POST /api/control` - 控制系统启停

### 市场数据
- `GET /api/opportunities` - 获取当前投资机会
- `GET /api/market-data` - 获取市场数据
- `GET /api/config` - 获取系统配置

### WebSocket事件
- `market_update` - 实时市场数据更新
- `connect` - 客户端连接
- `disconnect` - 客户端断开

## 📊 交易策略说明

### Long Straddle策略
- **触发条件**：股票日涨跌幅 > 5%
- **适用场景**：高波动率股票，预期价格大幅波动
- **示例股票**：GME, AMC, TSLA等

### Short Straddle策略
- **触发条件**：股票日涨跌幅 < 0.5%
- **适用场景**：低波动率股票，预期价格稳定
- **示例股票**：JNJ, KO, PG等

## 🔄 实时更新

系统每5分钟自动检查一次市场数据，并通过WebSocket实时推送到浏览器。你可以看到：

- 实时投资机会更新
- 系统统计信息变化
- 市场数据刷新
- 连接状态指示

## 🛠️ 技术架构

### 后端技术
- **Flask**：Python Web框架
- **Flask-SocketIO**：WebSocket支持
- **Eventlet**：异步处理
- **Yahoo Finance API**：市场数据源

### 前端技术
- **Bootstrap 5**：响应式UI框架
- **Font Awesome**：图标库
- **Socket.IO**：实时通信
- **原生JavaScript**：交互逻辑

### 数据流程
```
MarketWatcher CLI → 后台监控线程 → Web应用 → WebSocket → 浏览器
```

## 🔍 故障排除

### 常见问题

1. **端口被占用**
   - 如果8080端口被占用，修改`webapp/app.py`中的端口号

2. **MarketWatcher未运行**
   - 确保先启动MarketWatcher CLI：`market_watcher_cli start`

3. **WebSocket连接失败**
   - 检查防火墙设置
   - 确保浏览器支持WebSocket

4. **数据不更新**
   - 检查Yahoo Finance API连接
   - 查看控制台错误信息

### 日志查看
```bash
# 查看MarketWatcher日志
tail -f market_watcher.log

# 查看Web应用日志（在终端中直接显示）
```

## 📈 使用建议

1. **实时监控**：保持浏览器标签页打开以接收实时更新
2. **移动端访问**：界面支持移动设备，可在手机上查看
3. **多标签页**：可以打开多个标签页同时监控不同数据
4. **数据记录**：建议定期截图保存重要的投资机会记录

## 🔒 安全注意事项

- Web应用默认只允许本地访问
- 生产环境请配置适当的认证和授权
- 敏感信息（如API密钥）不要暴露在客户端

## 🎉 享受使用！

现在你可以通过现代化的Web界面来监控和管理你的期权波动率交易系统了！

---

**📞 技术支持**：如有问题，请查看控制台日志或检查系统状态。


