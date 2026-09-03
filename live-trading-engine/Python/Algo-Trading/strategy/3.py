
# ===========================================================
# 3) Mean Reversion (cross-sectional z-score to recent mean)
# ===========================================================
def build_signals_meanrev(data: Dict, lookback_days: int = 20, top_k: int = 4, max_weight: float = 0.15) -> pd.DataFrame:
    prices = _wide_prices(data["prices"])
    rebal_days = _month_ends(prices.index)
    out = []
    for d in rebal_days:
        d_eff = prices.index[prices.index <= d].max()
        hist = prices.loc[:d_eff].tail(lookback_days)
        ret = hist.pct_change().dropna()
        mu = ret.mean()
        sd = ret.std().replace(0, np.nan)
        z = (ret.iloc[-1] - mu) / sd
        # 选最近跌幅“超卖”的 top_k 做多；最近涨幅“超买”的做空（若允许）
        longs = z.sort_values().index[:top_k].tolist()
        shorts = z.sort_values(ascending=False).index[:0]  # 如需做空可设 k
        names = list(prices.columns)
        W = pd.Series(0.0, index=names + [CASH])
        if longs:
            W[longs] += 0.5 / len(longs)
        if len(shorts):
            W[shorts] -= 0.5 / len(shorts)
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()
