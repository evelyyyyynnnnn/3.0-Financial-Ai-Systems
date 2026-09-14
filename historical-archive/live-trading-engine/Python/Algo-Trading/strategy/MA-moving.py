# 策略参数
FAST, SLOW = 20, 50

def build_signals(df_prices: pd.DataFrame,
                  fast: int = FAST,
                  slow: int = SLOW) -> pd.Series:
    """
    输入：含 'close' 的 DataFrame
    输出：仓位信号(0/1)，为避免前视，信号 T+1 生效（回测）
    """
    prices  = df_prices["close"].astype(float)
    fast_ma = prices.rolling(fast).mean()
    slow_ma = prices.rolling(slow).mean()
    sig_raw = (fast_ma > slow_ma).astype(int)
    return sig_raw.shift(1).fillna(0)