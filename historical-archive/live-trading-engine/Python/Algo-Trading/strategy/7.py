# ===========================================================
# 7) Relative Value / Pairs Trading（广义，非协整也可）
# data needs: prices, pairs, lookback_days
# ===========================================================
def build_signals_relative_value(data: Dict, lookback_days: int = 120, z_enter: float = 1.0,
                                 max_weight: float = 0.10) -> pd.DataFrame:
    # 与 1) 类似，但允许对价差做更通用的归一（如价差/对数价差/比值）
    prices = _wide_prices(data["prices"])
    pairs: List[Tuple[str,str]] = data.get("pairs", [])
    rebal_days = _month_ends(prices.index)
    out = []
    for d in rebal_days:
        d_eff = prices.index[prices.index <= d].max()
        hist = prices.loc[:d_eff].tail(lookback_days)
        W = pd.Series(0.0, index=list(prices.columns) + [CASH])
        for a,b in pairs:
            if a not in hist or b not in hist: 
                continue
            spread = np.log(hist[a]).diff().sub(np.log(hist[b]).diff()).cumsum().dropna()
            z = (spread.iloc[-1] - spread.mean()) / (spread.std() + 1e-9)
            if z > z_enter:
                W[a] -= max_weight; W[b] += max_weight
            elif z < -z_enter:
                W[a] += max_weight; W[b] -= max_weight
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()

