import logging
from pathlib import Path
from typing import Tuple, List

import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler

from config.config import DataConfig

logger = logging.getLogger(__name__)

class MarketDataLoader:
    def __init__(self, config: DataConfig):
        self.config = config
        self.scaler = self._get_scaler()
        self.raw_data = None
        self.processed_data = None
        self.indicator_columns = []
        
    def _get_scaler(self):
        """Get the appropriate scaler based on configuration"""
        if self.config.normalization_method == "minmax":
            return MinMaxScaler()
        elif self.config.normalization_method == "standard":
            return StandardScaler()
        elif self.config.normalization_method == "robust":
            return RobustScaler()
        else:
            raise ValueError(f"Unknown normalization method: {self.config.normalization_method}")
    
    def load_data(self) -> pd.DataFrame:
        """Load market data from yfinance or local source"""
        if self.config.data_source == "yfinance":
            logger.info(f"Loading data for {self.config.ticker} from yfinance")
            try:
                data = yf.download(
                    self.config.ticker,
                    start=self.config.start_date,
                    end=self.config.end_date,
                    progress=False
                )
            except Exception as err:
                logger.error("Failed to download data from yfinance: %s", err)
                raise

            if data.empty:
                msg = (
                    f"No data returned for ticker {self.config.ticker} "
                    f"between {self.config.start_date} and {self.config.end_date}"
                )
                logger.error(msg)
                raise ValueError(msg)

        elif self.config.data_source == "local":
            if not self.config.local_data_path:
                raise ValueError(
                    "local_data_path must be provided when data_source is set to 'local'"
                )

            data_path = Path(self.config.local_data_path).expanduser()
            if not data_path.exists():
                raise FileNotFoundError(f"Local data file not found: {data_path}")

            logger.info("Loading local data from %s", data_path)
            try:
                data = pd.read_csv(
                    data_path,
                    index_col=0,
                    parse_dates=True,
                )
            except Exception as err:
                logger.error("Failed to read local data file: %s", err)
                raise

            if data.empty:
                msg = f"Local data file {data_path} is empty"
                logger.error(msg)
                raise ValueError(msg)
        else:
            raise ValueError(f"Unknown data source: {self.config.data_source}")

        if not data.index.is_monotonic_increasing:
            data = data.sort_index()

        self._validate_data(data)
        self.raw_data = data
        return data

    def _validate_data(self, data: pd.DataFrame):
        """Validate the presence of required columns and report missing values."""
        required_columns = {"Open", "High", "Low", "Close", "Volume"}
        missing_columns = required_columns.difference(data.columns)
        if missing_columns:
            raise ValueError(
                f"Input data is missing required columns: {sorted(missing_columns)}"
            )

        missing_counts = data[list(required_columns)].isna().sum()
        missing_counts = missing_counts[missing_counts > 0]
        if not missing_counts.empty:
            logger.warning(
                "Detected missing values in raw data: %s",
                missing_counts.to_dict(),
            )
    
    def calculate_volatility(self, data: pd.DataFrame) -> pd.Series:
        """Calculate volatility using specified method"""
        if self.config.volatility_type == "close_to_close":
            returns = np.log(data['Close'] / data['Close'].shift(1))
            volatility = returns.rolling(window=self.config.volatility_window).std() * np.sqrt(252)
        elif self.config.volatility_type == "parkinson":
            high_low = np.log(data['High'] / data['Low'])
            volatility = high_low.rolling(window=self.config.volatility_window).std() * np.sqrt(252/4/np.log(2))
        elif self.config.volatility_type == "garman_klass":
            log_hl = np.log(data['High'] / data['Low'])
            log_co = np.log(data['Close'] / data['Open'])
            volatility = np.sqrt(0.5 * log_hl**2 - (2*np.log(2)-1) * log_co**2)
            volatility = volatility.rolling(window=self.config.volatility_window).mean() * np.sqrt(252)
        else:
            raise ValueError(f"Unknown volatility type: {self.config.volatility_type}")
        
        return volatility
    
    def add_technical_indicators(self, data: pd.DataFrame) -> pd.DataFrame:
        """Add technical indicators to the dataset"""
        if not self.config.use_technical_indicators:
            return data
            
        df = data.copy()
        self.indicator_columns = []
        
        for indicator in self.config.technical_indicators:
            if indicator == "SMA":
                df['SMA'] = df['Close'].rolling(window=20).mean()
                self.indicator_columns.append('SMA')
            elif indicator == "EMA":
                df['EMA'] = df['Close'].ewm(span=20, adjust=False).mean()
                self.indicator_columns.append('EMA')
            elif indicator == "RSI":
                delta = df['Close'].diff()
                gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
                loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
                rs = gain / loss
                df['RSI'] = 100 - (100 / (1 + rs))
                self.indicator_columns.append('RSI')
            elif indicator == "MACD":
                exp1 = df['Close'].ewm(span=12, adjust=False).mean()
                exp2 = df['Close'].ewm(span=26, adjust=False).mean()
                df['MACD'] = exp1 - exp2
                df['Signal_Line'] = df['MACD'].ewm(span=9, adjust=False).mean()
                self.indicator_columns.extend(['MACD', 'Signal_Line'])
            elif indicator == "BBANDS":
                df['BB_Middle'] = df['Close'].rolling(window=20).mean()
                std = df['Close'].rolling(window=20).std()
                df['BB_Upper'] = df['BB_Middle'] + (std * 2)
                df['BB_Lower'] = df['BB_Middle'] - (std * 2)
                self.indicator_columns.extend(['BB_Middle', 'BB_Upper', 'BB_Lower'])
            elif indicator == "ATR":
                high_low = df['High'] - df['Low']
                high_close = np.abs(df['High'] - df['Close'].shift())
                low_close = np.abs(df['Low'] - df['Close'].shift())
                ranges = pd.concat([high_low, high_close, low_close], axis=1)
                true_range = np.max(ranges, axis=1)
                df['ATR'] = true_range.rolling(14).mean()
                self.indicator_columns.append('ATR')
            elif indicator == "OBV":
                df['OBV'] = (np.sign(df['Close'].diff()) * df['Volume']).fillna(0).cumsum()
                self.indicator_columns.append('OBV')
            elif indicator == "ADX":
                plus_dm = df['High'].diff()
                minus_dm = df['Low'].diff()
                plus_dm[plus_dm < 0] = 0
                minus_dm[minus_dm > 0] = 0
                tr1 = pd.DataFrame(df['High'] - df['Low'])
                tr2 = pd.DataFrame(abs(df['High'] - df['Close'].shift(1)))
                tr3 = pd.DataFrame(abs(df['Low'] - df['Close'].shift(1)))
                frames = [tr1, tr2, tr3]
                tr = pd.concat(frames, axis=1, join='inner').max(axis=1)
                atr = tr.rolling(14).mean()
                plus_di = 100 * (plus_dm.ewm(alpha=1/14).mean() / atr)
                minus_di = abs(100 * (minus_dm.ewm(alpha=1/14).mean() / atr))
                dx = 100 * abs((plus_di - minus_di) / (plus_di + minus_di))
                df['ADX'] = dx.ewm(alpha=1/14).mean()
                self.indicator_columns.append('ADX')
            elif indicator == "CCI":
                tp = (df['High'] + df['Low'] + df['Close']) / 3
                cci = (tp - tp.rolling(20).mean()) / (0.015 * tp.rolling(20).std())
                df['CCI'] = cci
                self.indicator_columns.append('CCI')
            elif indicator == "STOCH":
                low_min = df['Low'].rolling(14).min()
                high_max = df['High'].rolling(14).max()
                df['%K'] = 100 * ((df['Close'] - low_min) / (high_max - low_min))
                df['%D'] = df['%K'].rolling(3).mean()
                self.indicator_columns.extend(['%K', '%D'])
        
        return df
    
    def prepare_data(self) -> Tuple[np.ndarray, np.ndarray]:
        """Prepare data for model training"""
        if self.raw_data is None:
            self.load_data()
            
        # Calculate volatility
        volatility = self.calculate_volatility(self.raw_data)
        
        # Add technical indicators
        data_with_indicators = self.add_technical_indicators(self.raw_data)
        
        # Select features
        base_features = ['Close', 'Volume']
        feature_columns = base_features + self.indicator_columns
        features = data_with_indicators[feature_columns].copy()
        
        # Report missing values before imputation
        self._log_missing_values(features, "feature set before imputation")
        self._log_missing_values(volatility.to_frame(name="volatility"), "volatility series before imputation")

        # Handle missing values
        features = features.fillna(method='ffill').fillna(method='bfill')
        volatility = volatility.fillna(method='ffill').fillna(method='bfill')
        
        # Scale features if required
        if self.config.scale_features:
            features = pd.DataFrame(
                self.scaler.fit_transform(features),
                columns=features.columns,
                index=features.index
            )
        
        # Create sequences
        X, y = self._create_sequences(features, volatility)
        
        self.processed_data = (X, y)
        return X, y

    def _log_missing_values(self, data: pd.DataFrame, context: str):
        """Log warnings for missing values in the provided dataframe."""
        if data.isna().sum().sum() == 0:
            return

        missing_info = data.isna().sum()
        missing_info = missing_info[missing_info > 0]
        if not missing_info.empty:
            logger.warning(
                "Missing values detected in %s: %s",
                context,
                missing_info.to_dict()
            )
    
    def _create_sequences(self, features: pd.DataFrame, target: pd.Series) -> Tuple[np.ndarray, np.ndarray]:
        """Create sequences for time series prediction"""
        X, y = [], []
        
        for i in range(len(features) - self.config.window_size):
            X.append(features.iloc[i:(i + self.config.window_size)].values)
            y.append(target.iloc[i + self.config.window_size])
            
        return np.array(X), np.array(y)
    
    def get_train_val_test_split(self) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
        """Split data into train, validation, and test sets"""
        if self.processed_data is None:
            X, y = self.prepare_data()
        else:
            X, y = self.processed_data
            
        # Calculate split indices
        train_size = int(len(X) * self.config.train_ratio)
        val_size = int(len(X) * self.config.val_ratio)
        
        # Split data
        X_train = X[:train_size]
        y_train = y[:train_size]
        
        X_val = X[train_size:train_size + val_size]
        y_val = y[train_size:train_size + val_size]
        
        X_test = X[train_size + val_size:]
        y_test = y[train_size + val_size:]
        
        return X_train, X_val, X_test, y_train, y_val, y_test 