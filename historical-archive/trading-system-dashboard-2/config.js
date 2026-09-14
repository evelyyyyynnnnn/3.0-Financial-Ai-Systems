// Trading Simulation Platform Configuration
// Based on config.example.js

module.exports = {
    // Server Configuration
    server: {
        port: process.env.PORT || 3000,
        environment: process.env.NODE_ENV || 'development'
    },

    // API Configuration
    api: {
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        },
        cors: {
            origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
            credentials: true
        }
    },

    // Market Data Configuration
    marketData: {
        cacheTimeout: 30000, // 30 seconds
        updateInterval: 5000, // 5 seconds
        defaultSymbols: ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']
    },

    // Backtesting Configuration
    backtesting: {
        maxDataPoints: 10000,
        defaultCommission: 0.001, // 0.1%
        defaultSlippage: 0.0005, // 0.05%
        maxSimulations: 100000
    },

    // Portfolio Configuration
    portfolio: {
        riskFreeRate: 0.02, // 2% annual
        maxPositionSize: 0.05, // 5% of portfolio
        rebalanceThreshold: 0.01 // 1%
    },

    // Security Configuration
    security: {
        sessionSecret: process.env.SESSION_SECRET || 'development_session_secret_2024',
        helmet: {
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'", "wss:", "ws:"]
                }
            }
        }
    },

    // Logging Configuration
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: 'combined'
    }
};
