
# ===========================================================
# 2) Trend Following / Momentum (time-series)
# ===========================================================
def build_signals_trend_ts(data: Dict, lookback_m: int = 12, max_weight: float = 0.15) -> pd.DataFrame:
    prices = _wide_prices(data["prices"])
    rebal_days = _month_ends(prices.index)
    out = []
    for d in rebal_days:
        d_eff = prices.index[prices.index <= d].max()
        mpx = _to_monthly(prices.loc[:d_eff])
        if len(mpx) < lookback_m + 1: 
            continue
        mom = mpx.pct_change(lookback_m).iloc[-1]
        longs = mom[mom > 0].index.tolist()
        W = _eq_weight(longs, list(prices.columns))
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()
