#!/usr/bin/env python3
"""
High-Frequency Data Modeling and Jump Detection - Analysis Demo
================================================================

This script demonstrates the complete workflow for high-frequency financial data analysis,
including jump detection and market microstructure analysis.

Author: Evelyn Du
Date: 2024
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import yfinance as yf
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# Set style for better plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class HighFrequencyAnalyzer:
    """
    High-frequency financial data analyzer with jump detection capabilities.
    """
    
    def __init__(self, symbol="AAPL", start_date="2023-01-01", end_date="2023-12-31"):
        self.symbol = symbol
        self.start_date = start_date
        self.end_date = end_date
        self.data = None
        self.jump_results = {}
        
    def fetch_data(self, interval="1m"):
        """
        Fetch high-frequency data from Yahoo Finance.
        
        Parameters:
        -----------
        interval : str
            Data interval ('1m', '5m', '15m', '1h', '1d')
        """
        print(f"Fetching {self.symbol} data from {self.start_date} to {self.end_date}")
        
        try:
            ticker = yf.Ticker(self.symbol)
            self.data = ticker.history(
                start=self.start_date,
                end=self.end_date,
                interval=interval
            )
            
            if self.data.empty:
                raise ValueError(f"No data found for {self.symbol}")
                
            print(f"Successfully fetched {len(self.data)} data points")
            return self.data
            
        except Exception as e:
            print(f"Error fetching data: {str(e)}")
            return None
    
    def preprocess_data(self):
        """
        Clean and preprocess the financial data.
        """
        if self.data is None:
            raise ValueError("No data available. Please fetch data first.")
        
        print("Preprocessing data...")
        
        # Remove missing values
        self.data = self.data.dropna()
        
        # Calculate returns
        self.data['returns'] = self.data['Close'].pct_change()
        self.data['log_returns'] = np.log(self.data['Close']).diff()
        
        # Calculate additional features
        self.data['spread'] = self.data['High'] - self.data['Low']
        self.data['volume_profile'] = self.data['Volume'] / self.data['Volume'].rolling(window=30).mean()
        
        # Calculate volatility measures
        self.data['realized_volatility'] = self.data['returns'].rolling(window=30).std()
        self.data['bipower_variation'] = self._calculate_bipower_variation()
        
        print("Data preprocessing completed.")
        return self.data
    
    def _calculate_bipower_variation(self, window=30):
        """
        Calculate bipower variation for jump detection.
        """
        abs_returns = self.data['returns'].abs()
        return abs_returns.rolling(window=window).mean() * np.sqrt(np.pi/2)
    
    def detect_jumps_bipower(self, threshold_multiplier=3.0, window=30):
        """
        Detect jumps using bipower variation method.
        
        Parameters:
        -----------
        threshold_multiplier : float
            Multiplier for the threshold (default: 3.0)
        window : int
            Rolling window size (default: 30)
        """
        print("Detecting jumps using bipower variation method...")
        
        bipower_std = self.data['bipower_variation'].rolling(window=window).std()
        threshold = threshold_multiplier * bipower_std
        
        jumps = (self.data['returns'].abs() > threshold).astype(int)
        self.data['jump_bipower'] = jumps
        
        jump_count = jumps.sum()
        print(f"Bipower variation method detected {jump_count} jumps")
        
        self.jump_results['bipower'] = {
            'jumps': jumps,
            'count': jump_count,
            'threshold': threshold
        }
        
        return jumps
    
    def detect_jumps_threshold(self, threshold_type='adaptive', fixed_threshold=0.02, adaptive_window=100):
        """
        Detect jumps using threshold method.
        
        Parameters:
        -----------
        threshold_type : str
            'fixed' or 'adaptive'
        fixed_threshold : float
            Fixed threshold value
        adaptive_window : int
            Window size for adaptive threshold
        """
        print(f"Detecting jumps using {threshold_type} threshold method...")
        
        if threshold_type == 'fixed':
            threshold = fixed_threshold
            jumps = (self.data['returns'].abs() > threshold).astype(int)
        else:
            rolling_std = self.data['returns'].rolling(window=adaptive_window).std()
            threshold = 3 * rolling_std
            jumps = (self.data['returns'].abs() > threshold).astype(int)
        
        self.data['jump_threshold'] = jumps
        
        jump_count = jumps.sum()
        print(f"Threshold method detected {jump_count} jumps")
        
        self.jump_results['threshold'] = {
            'jumps': jumps,
            'count': jump_count,
            'threshold': threshold
        }
        
        return jumps
    
    def analyze_microstructure(self):
        """
        Analyze market microstructure features.
        """
        print("Analyzing market microstructure...")
        
        # Order flow analysis
        self.data['order_imbalance'] = (self.data['Close'] - self.data['Open']) / self.data['Open']
        
        # Volume analysis
        self.data['volume_imbalance'] = self.data['Volume'].pct_change()
        
        # Price impact
        self.data['price_impact'] = self.data['returns'] * self.data['Volume']
        
        # Bid-ask spread proxy
        self.data['spread_proxy'] = self.data['spread'] / self.data['Close']
        
        print("Microstructure analysis completed.")
        return self.data
    
    def plot_price_and_jumps(self, figsize=(15, 10)):
        """
        Plot price data with detected jumps.
        """
        fig, axes = plt.subplots(3, 1, figsize=figsize, sharex=True)
        
        # Price plot
        axes[0].plot(self.data.index, self.data['Close'], label='Close Price', linewidth=1)
        
        # Mark jumps from different methods
        if 'jump_bipower' in self.data.columns:
            bipower_jumps = self.data[self.data['jump_bipower'] == 1]
            axes[0].scatter(bipower_jumps.index, bipower_jumps['Close'], 
                          color='red', marker='^', s=50, label='Bipower Jumps', alpha=0.7)
        
        if 'jump_threshold' in self.data.columns:
            threshold_jumps = self.data[self.data['jump_threshold'] == 1]
            axes[0].scatter(threshold_jumps.index, threshold_jumps['Close'], 
                          color='orange', marker='v', s=50, label='Threshold Jumps', alpha=0.7)
        
        axes[0].set_title(f'{self.symbol} Price and Jump Detection')
        axes[0].set_ylabel('Price ($)')
        axes[0].legend()
        axes[0].grid(True, alpha=0.3)
        
        # Returns plot
        axes[1].plot(self.data.index, self.data['returns'], label='Returns', linewidth=0.5, alpha=0.7)
        axes[1].axhline(y=0, color='black', linestyle='--', alpha=0.5)
        axes[1].set_ylabel('Returns')
        axes[1].legend()
        axes[1].grid(True, alpha=0.3)
        
        # Volume plot
        axes[2].bar(self.data.index, self.data['Volume'], alpha=0.6, label='Volume')
        axes[2].set_ylabel('Volume')
        axes[2].set_xlabel('Date')
        axes[2].legend()
        axes[2].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()
    
    def plot_volatility_measures(self, figsize=(12, 8)):
        """
        Plot various volatility measures.
        """
        fig, axes = plt.subplots(2, 1, figsize=figsize, sharex=True)
        
        # Realized volatility
        axes[0].plot(self.data.index, self.data['realized_volatility'], 
                    label='Realized Volatility', linewidth=1)
        axes[0].set_title(f'{self.symbol} Volatility Measures')
        axes[0].set_ylabel('Volatility')
        axes[0].legend()
        axes[0].grid(True, alpha=0.3)
        
        # Bipower variation
        axes[1].plot(self.data.index, self.data['bipower_variation'], 
                    label='Bipower Variation', linewidth=1, color='orange')
        axes[1].set_ylabel('Bipower Variation')
        axes[1].set_xlabel('Date')
        axes[1].legend()
        axes[1].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()
    
    def plot_microstructure_analysis(self, figsize=(12, 10)):
        """
        Plot market microstructure analysis.
        """
        fig, axes = plt.subplots(4, 1, figsize=figsize, sharex=True)
        
        # Order imbalance
        axes[0].plot(self.data.index, self.data['order_imbalance'], 
                    label='Order Imbalance', linewidth=1)
        axes[0].set_title(f'{self.symbol} Market Microstructure Analysis')
        axes[0].set_ylabel('Order Imbalance')
        axes[0].legend()
        axes[0].grid(True, alpha=0.3)
        
        # Volume imbalance
        axes[1].plot(self.data.index, self.data['volume_imbalance'], 
                    label='Volume Imbalance', linewidth=1, color='green')
        axes[1].set_ylabel('Volume Imbalance')
        axes[1].legend()
        axes[1].grid(True, alpha=0.3)
        
        # Price impact
        axes[2].plot(self.data.index, self.data['price_impact'], 
                    label='Price Impact', linewidth=1, color='red')
        axes[2].set_ylabel('Price Impact')
        axes[2].legend()
        axes[2].grid(True, alpha=0.3)
        
        # Spread proxy
        axes[3].plot(self.data.index, self.data['spread_proxy'], 
                    label='Spread Proxy', linewidth=1, color='purple')
        axes[3].set_ylabel('Spread Proxy')
        axes[3].set_xlabel('Date')
        axes[3].legend()
        axes[3].grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()
    
    def plot_jump_statistics(self, figsize=(10, 6)):
        """
        Plot jump detection statistics.
        """
        methods = list(self.jump_results.keys())
        counts = [self.jump_results[method]['count'] for method in methods]
        
        plt.figure(figsize=figsize)
        bars = plt.bar(methods, counts, color=['red', 'orange', 'blue'][:len(methods)])
        
        # Add value labels on bars
        for bar, count in zip(bars, counts):
            plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1,
                    str(count), ha='center', va='bottom')
        
        plt.title(f'{self.symbol} Jump Detection Statistics')
        plt.xlabel('Detection Method')
        plt.ylabel('Number of Jumps')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.show()
    
    def generate_summary_report(self):
        """
        Generate a summary report of the analysis.
        """
        print("\n" + "="*60)
        print(f"HIGH-FREQUENCY DATA ANALYSIS REPORT - {self.symbol}")
        print("="*60)
        
        # Basic statistics
        print(f"\nData Period: {self.start_date} to {self.end_date}")
        print(f"Total Data Points: {len(self.data)}")
        print(f"Price Range: ${self.data['Close'].min():.2f} - ${self.data['Close'].max():.2f}")
        print(f"Average Daily Return: {self.data['returns'].mean():.4f}")
        print(f"Daily Return Volatility: {self.data['returns'].std():.4f}")
        
        # Jump statistics
        print(f"\nJUMP DETECTION RESULTS:")
        for method, results in self.jump_results.items():
            print(f"  {method.upper()}: {results['count']} jumps detected")
        
        # Microstructure statistics
        print(f"\nMARKET MICROSTRUCTURE:")
        print(f"  Average Order Imbalance: {self.data['order_imbalance'].mean():.4f}")
        print(f"  Average Volume Imbalance: {self.data['volume_imbalance'].mean():.4f}")
        print(f"  Average Price Impact: {self.data['price_impact'].mean():.4f}")
        print(f"  Average Spread Proxy: {self.data['spread_proxy'].mean():.4f}")
        
        print("\n" + "="*60)


def main():
    """
    Main function to run the complete analysis.
    """
    print("High-Frequency Data Modeling and Jump Detection Demo")
    print("=" * 55)
    
    # Initialize analyzer
    analyzer = HighFrequencyAnalyzer(
        symbol="AAPL",
        start_date="2023-01-01",
        end_date="2023-12-31"
    )
    
    try:
        # Fetch data (using daily data for demo - change to '1m' for high-frequency)
        data = analyzer.fetch_data(interval="1d")
        
        if data is not None:
            # Preprocess data
            analyzer.preprocess_data()
            
            # Detect jumps using different methods
            analyzer.detect_jumps_bipower(threshold_multiplier=3.0)
            analyzer.detect_jumps_threshold(threshold_type='adaptive')
            
            # Analyze microstructure
            analyzer.analyze_microstructure()
            
            # Generate visualizations
            print("\nGenerating visualizations...")
            analyzer.plot_price_and_jumps()
            analyzer.plot_volatility_measures()
            analyzer.plot_microstructure_analysis()
            analyzer.plot_jump_statistics()
            
            # Generate summary report
            analyzer.generate_summary_report()
            
            # Save processed data
            output_file = f"{analyzer.symbol}_analysis_results.csv"
            analyzer.data.to_csv(output_file)
            print(f"\nProcessed data saved to: {output_file}")
            
        else:
            print("Failed to fetch data. Please check your internet connection and symbol.")
            
    except Exception as e:
        print(f"Error during analysis: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
