#!/bin/bash

# 智能投资分析专家仪表板启动脚本

echo "🚀 启动智能投资分析专家仪表板..."
echo "=================================="

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: Node.js 未安装"
    echo "请访问 https://nodejs.org/ 下载并安装 Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: npm 未安装"
    echo "请确保 npm 已正确安装"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装项目依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已安装"
fi

# 检查主要文件
if [ ! -f "index.html" ]; then
    echo "❌ 错误: index.html 文件不存在"
    exit 1
fi

if [ ! -f "server/app.js" ]; then
    echo "❌ 错误: server/app.js 文件不存在"
    exit 1
fi

echo "✅ 项目文件检查通过"

# 启动服务
echo "🔄 启动服务..."
echo "服务将在端口 3000 运行"
echo "请在浏览器中访问: http://localhost:3000"
echo ""

# 启动服务
npm start