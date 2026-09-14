#!/bin/bash

# 智能投资分析专家仪表板 - 演示脚本

echo "🎯 智能投资分析专家仪表板演示"
echo "=================================="

# 检查系统要求
echo "📋 检查系统要求..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    echo "   访问: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 安装依赖
echo ""
echo "📦 安装项目依赖..."
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已安装"
fi

# 启动服务
echo ""
echo "🚀 启动服务..."
echo "服务将在端口 3000 运行"
echo ""

# 后台启动服务
node server/app.js &
SERVER_PID=$!

# 等待服务启动
sleep 3

# 检查服务是否启动成功
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ 服务启动成功"
    echo ""
    echo "🌐 请在浏览器中访问以下地址："
    echo "   http://localhost:3000"
    echo ""
    echo "📊 功能演示："
    echo "   1. 查看实时市场数据"
    echo "   2. 浏览投资组合建议"
    echo "   3. 分析市场深度数据"
    echo "   4. 生成AI投资建议"
    echo ""
    echo "🔧 管理命令："
    echo "   - 停止服务: Ctrl+C"
    echo "   - 运行测试: npm test"
    echo ""
    echo "📖 更多信息:"
    echo "   - 查看 README.md 获取详细说明"
    echo "   - 查看 PROJECT_OVERVIEW.md 了解项目概览"
    echo "   - 查看 DEPLOYMENT_GUIDE.md 获取部署指南"
    echo ""
    
    # 自动打开浏览器（如果可能）
    if command -v open &> /dev/null; then
        echo "🌐 正在打开浏览器..."
        open http://localhost:3000
    elif command -v xdg-open &> /dev/null; then
        echo "🌐 正在打开浏览器..."
        xdg-open http://localhost:3000
    fi
    
    echo "按 Ctrl+C 停止服务..."
    
    # 等待用户中断
    trap 'echo ""; echo "🛑 正在停止服务..."; kill $SERVER_PID 2>/dev/null; echo "✅ 服务已停止"; exit 0' INT
    
    wait
else
    echo "❌ 服务启动失败"
    exit 1
fi

