const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const cron = require('node-cron');

// Import routes
const tradingRoutes = require('./routes/trading');
const backtestRoutes = require('./routes/backtest');
const portfolioRoutes = require('./routes/portfolio');
const marketDataRoutes = require('./routes/marketData');
const strategyRoutes = require('./routes/strategy');

// Import services
const MarketDataService = require('./services/MarketDataService');
const BacktestService = require('./services/BacktestService');
const PortfolioService = require('./services/PortfolioService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "ws:"]
    }
  }
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/trading', tradingRoutes);
app.use('/api/backtest', backtestRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/market-data', marketDataRoutes);
app.use('/api/strategy', strategyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      marketData: 'operational',
      backtest: 'operational',
      portfolio: 'operational'
    }
  });
});

// Serve main application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join market data room
  socket.on('join-market-data', (symbol) => {
    socket.join(`market-data-${symbol}`);
    console.log(`Client ${socket.id} joined market data room for ${symbol}`);
  });

  // Join portfolio updates room
  socket.on('join-portfolio', (portfolioId) => {
    socket.join(`portfolio-${portfolioId}`);
    console.log(`Client ${socket.id} joined portfolio room ${portfolioId}`);
  });

  // Handle strategy execution
  socket.on('execute-strategy', async (data) => {
    try {
      const { strategyId, parameters } = data;
      console.log(`Executing strategy ${strategyId} with parameters:`, parameters);
      
      // Emit strategy execution status
      socket.emit('strategy-execution-status', {
        status: 'executing',
        strategyId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      socket.emit('strategy-execution-error', {
        error: error.message,
        strategyId: data.strategyId
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Scheduled tasks
cron.schedule('*/5 * * * * *', async () => {
  try {
    // Update market data every 5 seconds
    const marketDataService = new MarketDataService();
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
    
    for (const symbol of symbols) {
      const data = await marketDataService.getRealTimeData(symbol);
      if (data) {
        io.to(`market-data-${symbol}`).emit('market-data-update', {
          symbol,
          data,
          timestamp: new Date().toISOString()
        });
      }
    }
  } catch (error) {
    console.error('Market data update error:', error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Trading Simulation Platform running on port ${PORT}`);
  console.log(`📊 Market data updates every 5 seconds`);
  console.log(`🔌 WebSocket server ready for real-time connections`);
  console.log(`🌐 Access the platform at: http://localhost:${PORT}`);
});

module.exports = { app, server, io };
