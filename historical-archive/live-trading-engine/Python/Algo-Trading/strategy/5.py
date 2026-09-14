# ===========================================================
# 5) Factor / Multi-Factor (cross-sectional expected alpha)
# data needs: monthly factor exposures & returns or risk model: data["factors"]
# ===========================================================
def build_signals_multifactor(data: Dict, factor_weights: Dict[str,float] = None,
                              top_n: int = 10, max_weight: float = 0.10) -> pd.DataFrame:
    prices = _wide_prices(data["prices"])
    factors: Dict[str, pd.DataFrame] = data.get("factors", {})  # dict of DataFrame (index=date, columns=tickers)
    factor_weights = factor_weights or {"value":0.25,"quality":0.25,"momentum":0.25,"lowvol":0.25}
    rebal_days = _month_ends(prices.index)
    out = []
    for d in rebal_days:
        d_eff = prices.index[prices.index <= d].max()
        # 构造当期横截面预期 alpha = 加权因子暴露（越大越好，符号按定义）
        alpha = pd.Series(0.0, index=prices.columns)
        for fname, w in factor_weights.items():
            if fname in factors and d_eff in factors[fname].index:
                x = factors[fname].loc[d_eff].reindex(alpha.index).astype(float)
                alpha = alpha.add(w * x.fillna(x.median()), fill_value=0.0)
        picks = alpha.sort_values(ascending=False).index[:min(top_n, len(alpha))].tolist()
        W = _eq_weight(picks, list(prices.columns))
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()

