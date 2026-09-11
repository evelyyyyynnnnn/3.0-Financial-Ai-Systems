"""Shared fixtures. Every test here runs offline and without a deep-learning
framework: the model needs TensorFlow and a network, the properties worth
guarding do not."""
import pathlib
import sys

import numpy as np
import pandas as pd
import pytest

LSTM = pathlib.Path(__file__).resolve().parent.parent / "LSTM-Volatility-Prediction"
sys.path.insert(0, str(LSTM))


def price_frame(n: int = 600, seed: int = 0, tail_shock: float | None = None):
    """A synthetic OHLCV frame. Nothing is claimed from these numbers -- they
    exist so the pipeline's handling of time can be checked without a download."""
    idx = pd.bdate_range("2015-01-01", periods=n)
    rng = np.random.default_rng(seed)
    close = 100 * np.exp(np.cumsum(rng.normal(0, 0.01, n)))
    if tail_shock is not None:
        close = close.copy()
        close[int(n * 0.9):] *= tail_shock
    return pd.DataFrame(
        {"Open": close, "High": close * 1.01, "Low": close * 0.99,
         "Close": close, "Volume": rng.integers(1_000_000, 2_000_000, n)},
        index=idx,
    )


@pytest.fixture
def loader():
    from config.config import DataConfig
    from data.data_loader import MarketDataLoader

    def build(df=None, **overrides):
        cfg = DataConfig(**overrides)
        ld = MarketDataLoader(cfg)
        ld.raw_data = price_frame() if df is None else df
        return ld

    return build
