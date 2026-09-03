#!/usr/bin/env python3
"""
MarketWatcher Web Application
Flask-based web interface for the IBKR Options Volatility Trading System
"""

import os
import sys
import json
import threading
import time
from datetime import datetime, timedelta
from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit
import yaml

# Add the parent directory to the path to import market_watcher modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from market_watcher.trading_engine import TradingEngine
from market_watcher.data_fetcher import DataFetcher

app = Flask(__name__)
app.config['SECRET_KEY'] = 'market_watcher_secret_key_2024'
socketio = SocketIO(app, cors_allowed_origins="*")

# Global variables for storing system state
system_state = {
    'running': False,
    'last_update': None,
    'opportunities': {
        'long straddle': [],
        'short straddle': []
    },
    'market_data': {},
    'trading_signals': [],
    'stats': {
        'total_stocks': 0,
        'long_opportunities': 0,
        'short_opportunities': 0,
        'total_signals': 0,
        'last_check': None
    }
}

# Trading engine instance
trading_engine = None

# Background task for market monitoring
def background_monitor():
    """Background task that monitors the market and updates system state"""
    global system_state, trading_engine
    
    try:
        # Initialize trading engine
        trading_config = {
            'long_threshold': 0.05,    # 5%
            'short_threshold': 0.005,  # 0.5%
            'update_interval': 300,    # 5 minutes
            'max_stocks': 100
        }
        
        trading_engine = TradingEngine(trading_config)
        stocks_config = trading_engine.load_target_stocks("../src/market_watcher/research/target_stocks.yaml")
        
        print(f"✅ Trading engine initialized with {len(stocks_config)} stocks")
        
        while True:
            try:
                # Execute complete trading cycle
                result = trading_engine.execute_trading_cycle()
                
                if result['success']:
                    # Update system state with new data
                    system_state['market_data'] = result['market_data']
                    system_state['opportunities'] = result['opportunities']
                    system_state['trading_signals'] = result['signals']['signals']
                    
                    # Update statistics
                    system_state['stats']['total_stocks'] = result['market_summary']['total_stocks']
                    system_state['stats']['long_opportunities'] = result['market_summary']['long_opportunities']
                    system_state['stats']['short_opportunities'] = result['market_summary']['short_opportunities']
                    system_state['stats']['total_signals'] = result['signals']['total_signals']
                    system_state['stats']['last_check'] = datetime.now().isoformat()
                    system_state['last_update'] = datetime.now().isoformat()
                    
                    # Prepare data for WebSocket emission
                    ws_data = {
                        'opportunities': result['opportunities'],
                        'signals': result['signals']['signals'],
                        'stats': system_state['stats'],
                        'timestamp': system_state['last_update']
                    }
                    
                    # Emit real-time updates to connected clients
                    socketio.emit('market_update', ws_data)
                    
                    print(f"📊 Updated: {result['market_summary']['long_opportunities']} long, {result['market_summary']['short_opportunities']} short opportunities, {result['signals']['total_signals']} signals")
                
            except Exception as e:
                print(f"Error in background monitoring: {e}")
                import traceback
                traceback.print_exc()
            
            # Wait 5 minutes before next check
            time.sleep(300)
            
    except Exception as e:
        print(f"Background monitoring failed: {e}")
        import traceback
        traceback.print_exc()

@app.route('/')
def index():
    """Main dashboard page"""
    return render_template('dashboard.html')

@app.route('/api/status')
def api_status():
    """API endpoint to get system status"""
    try:
        with open('../src/market_watcher/state.json', 'r') as f:
            state = json.load(f)
        
        return jsonify({
            'system_running': state.get('running', False),
            'email_enabled': state.get('email', False),
            'slack_enabled': state.get('slack', False),
            'last_update': system_state.get('last_update'),
            'stats': system_state.get('stats', {}),
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/opportunities')
def api_opportunities():
    """API endpoint to get current investment opportunities"""
    opportunities = system_state.get('opportunities', {'long straddle': [], 'short straddle': []})
    total_count = len(opportunities.get('long straddle', [])) + len(opportunities.get('short straddle', []))
    
    return jsonify({
        'opportunities': opportunities,
        'count': total_count,
        'long_count': len(opportunities.get('long straddle', [])),
        'short_count': len(opportunities.get('short straddle', [])),
        'timestamp': system_state.get('last_update')
    })

@app.route('/api/market-data')
def api_market_data():
    """API endpoint to get current market data"""
    market_data = system_state.get('market_data', {})
    
    # Convert new data format to display format
    display_data = []
    for ticker, data in market_data.items():
        if data.get('data_available', False):
            display_data.append({
                'ticker': ticker,
                'current_price': data.get('current_price', 0),
                'change_percent': data.get('change_percent', 0),
                'volume': data.get('volume', 0),
                'direction': 'UP' if data.get('change_percent', 0) > 0 else 'DOWN'
            })
    
    # Sort by absolute change percent
    display_data.sort(key=lambda x: abs(x['change_percent']), reverse=True)
    
    return jsonify({
        'data': display_data[:20],  # Top 20 stocks
        'total_stocks': len(market_data),
        'timestamp': system_state.get('last_update')
    })

@app.route('/api/trading-signals')
def api_trading_signals():
    """API endpoint to get current trading signals"""
    signals = system_state.get('trading_signals', [])
    
    return jsonify({
        'signals': signals,
        'count': len(signals),
        'timestamp': system_state.get('last_update')
    })

@app.route('/api/control', methods=['POST'])
def api_control():
    """API endpoint to control the system"""
    try:
        data = request.get_json()
        action = data.get('action')
        
        if action == 'start':
            # Start the system
            with open('../src/market_watcher/state.json', 'r') as f:
                state = json.load(f)
            state['running'] = True
            
            with open('../src/market_watcher/state.json', 'w') as f:
                json.dump(state, f)
            
            system_state['running'] = True
            return jsonify({'status': 'success', 'message': 'System started'})
            
        elif action == 'stop':
            # Stop the system
            with open('../src/market_watcher/state.json', 'r') as f:
                state = json.load(f)
            state['running'] = False
            
            with open('../src/market_watcher/state.json', 'w') as f:
                json.dump(state, f)
            
            system_state['running'] = False
            return jsonify({'status': 'success', 'message': 'System stopped'})
            
        else:
            return jsonify({'status': 'error', 'message': 'Invalid action'}), 400
            
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/config')
def api_config():
    """API endpoint to get system configuration"""
    try:
        target_stocks = get_terget_stocks("../src/market_watcher/research/target_stocks.yaml")
        
        config = {
            'total_stocks': len(target_stocks),
            'long_straddle_stocks': sum(1 for info in target_stocks.values() if info['strategy'] == 'long straddle'),
            'short_straddle_stocks': sum(1 for info in target_stocks.values() if info['strategy'] == 'short straddle'),
            'thresholds': {
                'long_threshold': 5.0,  # 5%
                'short_threshold': 0.5  # 0.5%
            }
        }
        
        return jsonify(config)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('Client connected')
    emit('connected', {'message': 'Connected to MarketWatcher'})

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('Client disconnected')

if __name__ == '__main__':
    # Start background monitoring in a separate thread
    monitor_thread = threading.Thread(target=background_monitor, daemon=True)
    monitor_thread.start()
    
    # Start the Flask app
    print("🌐 Starting MarketWatcher Web Application...")
    print("📊 Dashboard: http://localhost:8080")
    print("🔌 WebSocket: Real-time updates enabled")
    
    socketio.run(app, debug=True, host='0.0.0.0', port=8080)
