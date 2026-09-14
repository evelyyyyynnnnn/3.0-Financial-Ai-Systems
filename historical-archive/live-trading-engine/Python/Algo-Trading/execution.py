def apply_strategy(df_prices: pd.DataFrame, fast: int = FAST, slow: int = SLOW) -> dict:
    """返回价格、仓位与策略收益序列。"""
    prices = df_prices["close"].astype(float)
    pos    = build_signals(df_prices, fast, slow)
    ret    = prices.pct_change().fillna(0.0)
    strat  = (pos * ret).fillna(0.0)
    return {"prices": prices, "positions": pos, "strategy_returns": strat}