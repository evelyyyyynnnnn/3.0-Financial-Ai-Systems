# ===========================================================
# 6) Machine Learning / AI Signals (supervised alpha)
# data needs: features (panel), model with .predict -> expected returns
# ===========================================================
def build_signals_ml(data: Dict, model, top_n: int = 10, max_weight: float = 0.10) -> pd.DataFrame:
    prices = _wide_prices(data["prices"])
    Xpanel: Dict[pd.Timestamp, pd.DataFrame] = data.get("features", {})  # time-> DataFrame(index=tickers, cols=features)
    rebal_days = _month_ends(prices.index)
    out = []
    for d in rebal_days:
        d_eff = prices.index[prices.index <= d].max()
        X = Xpanel.get(d_eff, None)
        if X is None or X.empty:
            continue
        preds = pd.Series(model.predict(X.values), index=X.index)
        picks = preds.sort_values(ascending=False).index[:min(top_n, len(preds))].tolist()
        W = _eq_weight(picks, list(prices.columns))
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()

