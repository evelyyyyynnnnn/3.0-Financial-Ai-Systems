# ===========================================================
# 8) Global/Systematic Macro（跨资产 TS momo + carry 组合）
# data needs: prices (can include futures/FX/bonds/equities), optional carry signals
# ===========================================================
def build_signals_macro(data: Dict, lookback_m: int = 12, carry: Dict[str, float] = None,
                        max_weight: float = 0.10) -> pd.DataFrame:
    prices = _wide_prices(data["prices"])
    carry = carry or {}  # e.g., {'ED1': +0.3, 'CL1': +0.1, ...}
    rebal_days = _month_ends(prices.index)
    out = []
    for d in rebal_days:
        d_eff = prices.index[prices.index <= d].max()
        mpx = _to_monthly(prices.loc[:d_eff])
        if len(mpx) < lookback_m + 1: 
            continue
        ts = mpx.pct_change(lookback_m).iloc[-1].reindex(prices.columns)
        score = ts.fillna(0.0) + pd.Series(carry, dtype=float).reindex(prices.columns).fillna(0.0)
        longs = score[score > 0].index.tolist()
        W = _eq_weight(longs, list(prices.columns))
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()
