// Trading Simulation Platform - Main Application
class TradingPlatform {
    constructor() {
        this.socket = null;
        this.charts = {};
        this.currentSection = 'dashboard';
        this.strategies = [];
        this.init();
    }

    init() {
        this.initializeSocket();
        this.initializeNavigation();
        this.initializeCharts();
        this.loadStrategies();
        this.setupEventListeners();
        this.updateMarketData();
    }

    // Initialize Socket.IO connection
    initializeSocket() {
        this.socket = io();
        
        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.socket.emit('join-market-data', 'AAPL');
        });

        this.socket.on('market-data-update', (data) => {
            this.updateMarketWidget(data);
        });

        this.socket.on('strategy-execution-status', (data) => {
            this.handleStrategyExecution(data);
        });
    }

    // Initialize navigation
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.showSection(targetSection);
            });
        });
    }

    // Show specific section
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.currentSection = sectionId;
        this.updateCharts();
    }

    // Initialize charts
    initializeCharts() {
        this.initializePerformanceChart();
        this.initializeEquityChart();
        this.initializeWeightsChart();
        this.initializeMarketChart();
        this.initializeAttributionChart();
        this.initializeSimulationChart();
    }

    // Initialize performance chart
    initializePerformanceChart() {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) {
            console.error('Performance chart canvas not found');
            return;
        }

        try {
            // Generate sample data for demonstration
            const sampleData = this.generatePortfolioData(365);
            const sampleLabels = this.generateDateLabels(365);
            
            console.log('Generated portfolio data:', sampleData.length, 'points');
            console.log('Sample data range:', Math.min(...sampleData), 'to', Math.max(...sampleData));

            this.charts.performance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: sampleLabels,
                    datasets: [{
                        label: 'Portfolio Value',
                        data: sampleData,
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'month'
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });

            console.log('Performance chart initialized successfully');
        } catch (error) {
            console.error('Error initializing performance chart:', error);
        }
    }

    // Initialize equity chart
    initializeEquityChart() {
        const ctx = document.getElementById('equityChart');
        if (!ctx) return;

        this.charts.equity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Equity Curve',
                    data: [],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Initialize weights chart
    initializeWeightsChart() {
        const ctx = document.getElementById('weightsChart');
        if (!ctx) return;

        this.charts.weights = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'],
                datasets: [{
                    data: [20, 20, 20, 20, 20],
                    backgroundColor: [
                        '#2563eb',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Initialize market chart
    initializeMarketChart() {
        const ctx = document.getElementById('marketChart');
        if (!ctx) return;

        this.charts.market = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.generateDateLabels(100),
                datasets: [{
                    label: 'Price',
                    data: this.generatePriceData(100),
                    borderColor: '#1e293b',
                    backgroundColor: 'rgba(30, 41, 59, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Initialize attribution chart
    initializeAttributionChart() {
        const ctx = document.getElementById('attributionChart');
        if (!ctx) return;

        this.charts.attribution = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Stock Selection', 'Sector Allocation', 'Market Timing', 'Risk Management'],
                datasets: [{
                    label: 'Contribution',
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#2563eb',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Initialize simulation chart
    initializeSimulationChart() {
        const ctx = document.getElementById('simulationChart');
        if (!ctx) return;

        this.charts.simulation = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Simulation Results',
                    data: [],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Load strategies
    async loadStrategies() {
        try {
            const response = await fetch('/api/strategy/list');
            const data = await response.json();
            
            if (data.success) {
                this.strategies = data.data;
                this.renderStrategies();
            }
        } catch (error) {
            console.error('Error loading strategies:', error);
        }
    }

    // Render strategies
    renderStrategies() {
        const grid = document.getElementById('strategies-grid');
        if (!grid) return;

        grid.innerHTML = '';

        this.strategies.forEach(strategy => {
            const card = this.createStrategyCard(strategy);
            grid.appendChild(card);
        });
    }

    // Create strategy card
    createStrategyCard(strategy) {
        const card = document.createElement('div');
        card.className = 'strategy-card';
        
        card.innerHTML = `
            <div class="strategy-header">
                <div class="strategy-name">${strategy.name}</div>
                <span class="strategy-category ${strategy.category}">${strategy.category}</span>
            </div>
            <p class="strategy-description">${strategy.description}</p>
            <div class="strategy-metrics">
                <div class="metric-small">
                    <span class="label">Return</span>
                    <span class="value">${strategy.performance.averageReturn}%</span>
                </div>
                <div class="metric-small">
                    <span class="label">Sharpe</span>
                    <span class="value">${strategy.performance.sharpeRatio}</span>
                </div>
            </div>
            <div class="strategy-actions">
                <button class="btn btn-primary" onclick="tradingPlatform.runStrategy('${strategy.id}')">
                    <i class="fas fa-play"></i> Run
                </button>
                <button class="btn btn-outline" onclick="tradingPlatform.viewStrategy('${strategy.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        `;
        
        return card;
    }

    // Setup event listeners
    setupEventListeners() {
        // Strategy selection
        const strategySelect = document.getElementById('strategy');
        if (strategySelect) {
            strategySelect.addEventListener('change', (e) => {
                this.loadStrategyParameters(e.target.value);
            });
        }

        // Chart period controls
        document.querySelectorAll('.chart-controls .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateChartPeriod(e.target.dataset.period);
            });
        });

        // Strategy category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterStrategies(e.target.dataset.category);
            });
        });

        // Form submissions
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }
    }

    // Load strategy parameters
    loadStrategyParameters(strategyId) {
        const paramsContainer = document.getElementById('strategy-params');
        if (!paramsContainer) return;

        if (!strategyId) {
            paramsContainer.style.display = 'none';
            return;
        }

        const strategy = this.strategies.find(s => s.id === strategyId);
        if (!strategy) return;

        const paramsGrid = paramsContainer.querySelector('.params-grid');
        paramsGrid.innerHTML = '';

        Object.entries(strategy.parameters).forEach(([key, param]) => {
            const paramDiv = document.createElement('div');
            paramDiv.className = 'form-group';
            
            if (param.type === 'number') {
                paramDiv.innerHTML = `
                    <label for="param-${key}">${param.description}</label>
                    <input type="number" id="param-${key}" class="form-control" 
                           value="${param.default}" min="${param.min}" max="${param.max}">
                `;
            } else if (param.type === 'string' && param.options) {
                paramDiv.innerHTML = `
                    <label for="param-${key}">${param.description}</label>
                    <select id="param-${key}" class="form-control">
                        ${param.options.map(option => 
                            `<option value="${option}" ${option === param.default ? 'selected' : ''}>${option}</option>`
                        ).join('')}
                    </select>
                `;
            }
            
            paramsGrid.appendChild(paramDiv);
        });

        paramsContainer.style.display = 'block';
    }

    // Run backtest
    async runBacktest() {
        const strategy = document.getElementById('strategy').value;
        const symbol = document.getElementById('symbol').value;
        const capital = document.getElementById('capital').value;
        const period = document.getElementById('period').value;

        if (!strategy || !symbol) {
            alert('Please select a strategy and symbol');
            return;
        }

        this.showLoading(true);

        try {
            // Get parameters
            const parameters = {};
            const paramInputs = document.querySelectorAll('#strategy-params input, #strategy-params select');
            paramInputs.forEach(input => {
                const key = input.id.replace('param-', '');
                parameters[key] = input.type === 'number' ? parseFloat(input.value) : input.value;
            });

            const response = await fetch('/api/backtest/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    strategy,
                    symbol,
                    initialCapital: parseFloat(capital),
                    period,
                    parameters
                })
            });

            const data = await response.json();
            
            if (data.success) {
                this.displayBacktestResults(data.data);
            } else {
                alert('Backtest failed: ' + data.message);
            }
        } catch (error) {
            console.error('Backtest error:', error);
            alert('Backtest failed. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    // Display backtest results
    displayBacktestResults(results) {
        // Update summary metrics
        document.getElementById('total-return').textContent = `${results.summary.totalReturn.toFixed(2)}%`;
        document.getElementById('sharpe-ratio').textContent = results.summary.sharpeRatio.toFixed(2);
        document.getElementById('max-drawdown').textContent = `${results.summary.maxDrawdown.toFixed(2)}%`;
        document.getElementById('win-rate').textContent = `${results.summary.winRate.toFixed(1)}%`;

        // Update equity chart
        this.updateEquityChart(results.equity);

        // Update trades table
        this.updateTradesTable(results.trades);

        // Show results
        document.getElementById('backtest-results').style.display = 'block';
    }

    // Update equity chart
    updateEquityChart(equity) {
        if (!this.charts.equity) return;

        const labels = equity.map((_, index) => new Date(Date.now() - (equity.length - index) * 24 * 60 * 60 * 1000));
        const data = equity;

        this.charts.equity.data.labels = labels;
        this.charts.equity.data.datasets[0].data = data;
        this.charts.equity.update();
    }

    // Update trades table
    updateTradesTable(trades) {
        const tbody = document.getElementById('trades-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        trades.forEach(trade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(trade.date).toLocaleDateString()}</td>
                <td><span class="status-badge ${trade.type.toLowerCase()}">${trade.type}</span></td>
                <td>$${trade.price.toFixed(2)}</td>
                <td>${trade.shares}</td>
                <td>$${trade.cost ? trade.cost.toFixed(2) : trade.proceeds.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Optimize portfolio
    async optimizePortfolio() {
        const method = document.getElementById('optimization-method').value;
        
        this.showLoading(true);

        try {
            // Simulate portfolio optimization
            const weights = [0.25, 0.25, 0.25, 0.25]; // Equal weights for demo
            const returns = [0.12, 0.15, 0.10, 0.18]; // Simulated returns
            const prices = [155.75, 2800.00, 320.50, 150.25]; // Current prices

            const response = await fetch('/api/portfolio/optimize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    returns,
                    method,
                    prices
                })
            });

            const data = await response.json();
            
            if (data.success) {
                this.displayOptimizationResults(data.data);
            } else {
                alert('Portfolio optimization failed: ' + data.message);
            }
        } catch (error) {
            console.error('Optimization error:', error);
            alert('Portfolio optimization failed. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    // Display optimization results
    displayOptimizationResults(results) {
        // Update weights chart
        this.updateWeightsChart(results.weights.weights);

        // Update metrics
        document.getElementById('expected-return').textContent = `${(results.metrics.expectedReturn * 100).toFixed(2)}%`;
        document.getElementById('portfolio-risk').textContent = `${(results.metrics.risk * 100).toFixed(2)}%`;
        document.getElementById('portfolio-sharpe').textContent = results.metrics.sharpeRatio.toFixed(2);
        document.getElementById('diversification-ratio').textContent = results.metrics.diversificationRatio.toFixed(2);

        // Show results
        document.getElementById('optimization-results').style.display = 'block';
    }

    // Update weights chart
    updateWeightsChart(weights) {
        if (!this.charts.weights) return;

        this.charts.weights.data.datasets[0].data = weights;
        this.charts.weights.update();
    }

    // Run Monte Carlo simulation
    async runSimulation() {
        const simulationCount = document.getElementById('simulation-count').value;
        
        this.showLoading(true);

        try {
            // Simulate portfolio returns
            const weights = [0.25, 0.25, 0.25, 0.25];
            const returns = [0.12, 0.15, 0.10, 0.18];

            const response = await fetch('/api/portfolio/simulate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    weights,
                    returns,
                    numSimulations: parseInt(simulationCount)
                })
            });

            const data = await response.json();
            
            if (data.success) {
                this.displaySimulationResults(data.data);
            } else {
                alert('Simulation failed: ' + data.message);
            }
        } catch (error) {
            console.error('Simulation error:', error);
            alert('Simulation failed. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    // Display simulation results
    displaySimulationResults(results) {
        // Update simulation chart
        this.updateSimulationChart(results.simulatedReturns);

        // Update percentiles
        document.getElementById('p1').textContent = `${(results.percentiles.p1 * 100).toFixed(2)}%`;
        document.getElementById('p5').textContent = `${(results.percentiles.p5 * 100).toFixed(2)}%`;
        document.getElementById('p25').textContent = `${(results.percentiles.p25 * 100).toFixed(2)}%`;
        document.getElementById('p50').textContent = `${(results.percentiles.p50 * 100).toFixed(2)}%`;
        document.getElementById('p75').textContent = `${(results.percentiles.p75 * 100).toFixed(2)}%`;
        document.getElementById('p95').textContent = `${(results.percentiles.p95 * 100).toFixed(2)}%`;
        document.getElementById('p99').textContent = `${(results.percentiles.p99 * 100).toFixed(2)}%`;

        // Show results
        document.getElementById('simulation-results').style.display = 'block';
    }

    // Update simulation chart
    updateSimulationChart(simulatedReturns) {
        if (!this.charts.simulation) return;

        const sortedReturns = [...simulatedReturns].sort((a, b) => a - b);
        const labels = sortedReturns.map((_, index) => index + 1);

        this.charts.simulation.data.labels = labels;
        this.charts.simulation.data.datasets[0].data = sortedReturns;
        this.charts.simulation.update();
    }

    // Filter strategies by category
    filterStrategies(category) {
        const grid = document.getElementById('strategies-grid');
        if (!grid) return;

        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Filter strategies
        const filteredStrategies = category === 'all' 
            ? this.strategies 
            : this.strategies.filter(s => s.category === category);

        // Re-render
        grid.innerHTML = '';
        filteredStrategies.forEach(strategy => {
            const card = this.createStrategyCard(strategy);
            grid.appendChild(card);
        });
    }

    // Update market data
    updateMarketData() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateMarketWidgets();
        }, 5000);
    }

    // Update market widget
    updateMarketWidget(data) {
        // Update specific symbol widget if it exists
        const widget = document.querySelector(`[data-symbol="${data.symbol}"]`);
        if (widget) {
            const priceElement = widget.querySelector('.widget-price');
            const changeElement = widget.querySelector('.change');
            
            if (priceElement) priceElement.textContent = `$${data.price.toFixed(2)}`;
            if (changeElement) {
                const change = data.change;
                const changePercent = data.changePercent;
                changeElement.textContent = `${change > 0 ? '+' : ''}$${change.toFixed(2)} (${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%)`;
                changeElement.className = `change ${change > 0 ? 'positive' : 'negative'}`;
            }
        }
    }

    // Update market widgets (simulated)
    updateMarketWidgets() {
        const widgets = document.querySelectorAll('.market-widget');
        widgets.forEach(widget => {
            const priceElement = widget.querySelector('.widget-price');
            const changeElement = widget.querySelector('.change');
            
            if (priceElement && changeElement) {
                const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
                const change = (Math.random() - 0.5) * 10;
                const newPrice = currentPrice + change;
                const changePercent = (change / currentPrice) * 100;
                
                priceElement.textContent = `$${newPrice.toFixed(2)}`;
                changeElement.textContent = `${change > 0 ? '+' : ''}$${change.toFixed(2)} (${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%)`;
                changeElement.className = `change ${change > 0 ? 'positive' : 'negative'}`;
            }
        });
    }

    // Handle strategy execution
    handleStrategyExecution(data) {
        console.log('Strategy execution:', data);
        // Add strategy execution handling logic here
    }

    // Run strategy
    runStrategy(strategyId) {
        console.log('Running strategy:', strategyId);
        // Add strategy execution logic here
    }

    // View strategy
    viewStrategy(strategyId) {
        console.log('Viewing strategy:', strategyId);
        // Add strategy viewing logic here
    }

    // Update charts
    updateCharts() {
        // Update charts based on current section
        if (this.currentSection === 'dashboard' && this.charts.performance) {
            this.charts.performance.update();
        }
    }

    // Update chart period
    updateChartPeriod(period) {
        // Update chart controls
        document.querySelectorAll('.chart-controls .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update chart data based on period
        if (this.charts.performance) {
            const days = period === '1Y' ? 365 : period === '3Y' ? 1095 : period === '5Y' ? 1825 : 3650;
            this.charts.performance.data.labels = this.generateDateLabels(days);
            this.charts.performance.data.datasets[0].data = this.generatePortfolioData(days);
            this.charts.performance.update();
        }
    }

    // Generate date labels
    generateDateLabels(days) {
        const labels = [];
        const now = new Date();
        for (let i = days; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            labels.push(date);
        }
        return labels;
    }

    // Generate portfolio data
    generatePortfolioData(days) {
        const data = [];
        let value = 100000;
        for (let i = 0; i <= days; i++) {
            const dailyReturn = (Math.random() - 0.5) * 0.02; // ±1% daily return
            value *= (1 + dailyReturn);
            data.push(value);
        }
        return data;
    }

    // Generate price data
    generatePriceData(days) {
        const data = [];
        let price = 150;
        for (let i = 0; i <= days; i++) {
            const dailyReturn = (Math.random() - 0.5) * 0.03; // ±1.5% daily return
            price *= (1 + dailyReturn);
            data.push(price);
        }
        return data;
    }

    // Show/hide loading overlay
    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = show ? 'flex' : 'none';
        }
    }

    // Handle login
    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simulate login
        console.log('Login attempt:', { email, password });
        alert('Login functionality would be implemented here');
        closeLoginModal();
    }

    // Handle signup
    handleSignup() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // Simulate signup
        console.log('Signup attempt:', { name, email, password });
        alert('Signup functionality would be implemented here');
        closeSignupModal();
    }

    // Compare strategies
    compareStrategies() {
        alert('Strategy comparison feature would be implemented here');
    }
}

// Modal functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showSignupModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupModal').style.display = 'flex';
}

function closeSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
}

// Global functions for onclick handlers
function runBacktest() {
    tradingPlatform.runBacktest();
}

function optimizePortfolio() {
    tradingPlatform.optimizePortfolio();
}

function runSimulation() {
    tradingPlatform.runSimulation();
}

function compareStrategies() {
    tradingPlatform.compareStrategies();
}

// Initialize platform when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tradingPlatform = new TradingPlatform();
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === signupModal) {
        closeSignupModal();
    }
});
