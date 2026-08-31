
# ===========================================================
# 9) Volatility / Vol-Arbitrage（IV-RV / term-structure）
# data needs: iv (implied vol), rv (realized vol), tickers should match underlying
# ===========================================================
def build_signals_volarb(data: Dict, iv_tgt: str = "30d", rv_win_days: int = 21,
                         top_long_n: int = 5, top_short_n: int = 0, max_weight: float = 0.10) -> pd.DataFrame:
    prices = _wide_prices(data["prices"])
    iv: Dict[str, pd.DataFrame] = data.get("iv", {})  # dict tenor-> DataFrame(index=date, cols=ticker)
    rv: pd.DataFrame = data.get("rv", None)          # DataFrame(index=date, cols=ticker) of realized vol
    if iv_tgt not in iv or rv is None:
        return pd.DataFrame()
    rebal_days = _month_ends(prices.index)
    out = []
    for d in rebal_days:
        d_eff = prices.index[prices.index <= d].max()
        iv_now = iv[iv_tgt].loc[:d_eff].iloc[-1:].T.squeeze().reindex(prices.columns)
        rv_now = rv.loc[:d_eff].iloc[-1:].T.squeeze().reindex(prices.columns)
        vrp = (iv_now - rv_now)  # variance risk premium proxy；越大越适合做空波动（卖保费）；谨慎风险管理
        # 这里演示“做多标的、利用隐含>实现作为择时过滤”，实际波动交易需期权执行层
        picks = vrp.sort_values(ascending=False).index[:min(top_long_n, len(vrp))].tolist()
        W = _eq_weight(picks, list(prices.columns))
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()

# ===========================================================
# 10) Liquid Alts / Quantamental（指数增强：基准 + 量化偏离）
# data needs: prices, benchmark ticker name, tilt alpha (e.g., factors/ml)
# ===========================================================
def build_signals_quantamental(data: Dict, benchmark: str, tilt_alpha: pd.DataFrame = None,
                               tracking_max: float = 0.05, top_n: int = 20, max_weight: float = 0.10) -> pd.DataFrame:
    prices = _wide_prices(data["prices"])
    names = list(prices.columns)
    if benchmark not in names:
        raise ValueError("benchmark not in price columns")
    rebal_days = _month_ends(prices.index)
    out = []
    for d in rebal_days:
        d_eff = prices.index[prices.index <= d].max()
        # 基准：全部资金在 benchmark
        W = pd.Series(0.0, index=names + [CASH])
        W[benchmark] = 1.0
        # 量化 alpha 倾斜：从基准挪出 <= tracking_max 的权重，分配给 top_n alphas
        if tilt_alpha is not None and d_eff in tilt_alpha.index:
            alpha = tilt_alpha.loc[d_eff].reindex(names).dropna()
            picks = alpha.sort_values(ascending=False).index[:min(top_n, len(alpha))].tolist()
            if len(picks):
                tilt = tracking_max
                W[benchmark] = max(0.0, W[benchmark] - tilt)
                W[picks] += tilt / len(picks)
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()
