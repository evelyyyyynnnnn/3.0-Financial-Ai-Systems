#!/bin/bash

echo "🚀 Starting Trading Simulation Platform Setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create public directory if it doesn't exist
if [ ! -d "public" ]; then
    echo "📁 Creating public directory..."
    mkdir -p public
fi

echo ""
echo "🎯 Trading Simulation Platform is ready!"
echo ""
echo "To start the platform:"
echo "  npm start          # Start production server"
echo "  npm run dev        # Start development server with auto-reload"
echo ""
echo "The platform will be available at: http://localhost:3000"
echo ""
echo "Features available:"
echo "  📊 Dashboard with performance metrics"
echo "  🔬 Advanced backtesting engine"
echo "  📈 Portfolio optimization"
echo "  🎯 Trading strategy library"
echo "  📊 Real-time market data"
echo "  📈 Advanced analytics and Monte Carlo simulation"
echo ""
echo "This platform demonstrates:"
echo "  • Advanced quantitative trading capabilities"
echo "  • Professional backtesting infrastructure"
echo "  • Modern portfolio theory implementation"
echo "  • Risk management and analytics"
echo "  • Real-time data processing"
echo ""
echo "Perfect for NIW applications showcasing quantitative expertise!"
echo ""
