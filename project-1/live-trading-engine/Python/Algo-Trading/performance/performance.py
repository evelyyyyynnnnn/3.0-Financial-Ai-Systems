INITIAL_CAPITAL = 100000.0
TF = TimeFrame.Minute  

def periods_per_year(tf: TimeFrame) -> int:
    if tf == TimeFrame.Day:    return 252
    if tf == TimeFrame.Hour:   return 1638
    if tf == TimeFrame.Minute: return 390 * 252
    return 252

def compute_performance(df_prices: pd.DataFrame, tf: TimeFrame = TF) -> dict:
    from __main__ import apply_strategy
    out = apply_strategy(df_prices)
    prices, positions, strategy_returns = out["prices"], out["positions"], out["strategy_returns"]

    equity = (1.0 + strategy_returns).cumprod() * INITIAL_CAPITAL
    total_return = (equity.iloc[-1] / INITIAL_CAPITAL - 1.0) * 100.0

    py = periods_per_year(tf)
    ann_return = (equity.iloc[-1] / INITIAL_CAPITAL) ** (py / max(len(equity),1)) - 1.0
    ann_return *= 100.0

    vol = strategy_returns.std() * np.sqrt(py) * 100.0
    sharpe = 0.0
    denom = strategy_returns.std() * np.sqrt(py)
    if denom > 0:
        sharpe = (strategy_returns.mean() * py) / denom

    eq = equity / INITIAL_CAPITAL
    max_drawdown = ((eq / eq.cummax()) - 1.0).min() * 100.0

    trades = int(positions.diff().abs().fillna(0).gt(0).sum())
    buy_hold_return = (prices.iloc[-1] / prices.iloc[0] - 1.0) * 100.0

    return {
        "portfolio_value": equity,
        "returns": strategy_returns,      # ← 新增
        "positions": positions,           # ← 可选：给画仓位用
        "total_return": float(total_return),
        "annual_return": float(ann_return),
        "volatility": float(vol),
        "sharpe_ratio": float(sharpe),
        "max_drawdown": float(max_drawdown),
        "trade_count": trades,
        "buy_hold_return": float(buy_hold_return),
    }

def print_report(res: dict):
    print("\n=== 策略表现（分钟）===")
    print(f"初始资金: ${INITIAL_CAPITAL:,.0f}")
    print(f"最终资金: ${res['portfolio_value'].iloc[-1]:,.0f}")
    print(f"总收益率: {res['total_return']:.2f}%")
    print(f"年化收益率: {res['annual_return']:.2f}%")
    print(f"年化波动率: {res['volatility']:.2f}%")
    print(f"夏普比率: {res['sharpe_ratio']:.2f}")
    print(f"最大回撤: {res['max_drawdown']:.2f}%")
    print(f"交易次数: {res['trade_count']}")
    print(f"买入持有收益: {res['buy_hold_return']:.2f}%")

if __name__ == "__main__":
    from __main__ import fetch_history, SYMBOL 
    df = fetch_history(SYMBOL)
    if df.empty:
        print("No data.")
    else:
        res = compute_performance(df, TF)
        print_report(res)