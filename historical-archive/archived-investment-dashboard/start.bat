@echo off
chcp 65001 >nul
title 智能投资分析专家仪表板

echo 🚀 启动智能投资分析专家仪表板...
echo ==================================

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: Node.js 未安装
    echo 请访问 https://nodejs.org/ 下载并安装 Node.js
    pause
    exit /b 1
)

REM 检查npm是否安装
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: npm 未安装
    echo 请确保 npm 已正确安装
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js 版本: %NODE_VERSION%
echo ✅ npm 版本: %NPM_VERSION%

REM 检查依赖是否安装
if not exist "node_modules" (
    echo 📦 安装项目依赖...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
) else (
    echo ✅ 依赖已安装
)

REM 检查主要文件
if not exist "index.html" (
    echo ❌ 错误: index.html 文件不存在
    pause
    exit /b 1
)

if not exist "server\app.js" (
    echo ❌ 错误: server\app.js 文件不存在
    pause
    exit /b 1
)

echo ✅ 项目文件检查通过

REM 启动服务
echo 🔄 启动服务...
echo 服务将在端口 3000 运行
echo 请在浏览器中访问: http://localhost:3000
echo.

REM 启动服务
npm start