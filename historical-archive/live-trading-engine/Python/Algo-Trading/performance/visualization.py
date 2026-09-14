def compute_drawdown(equity: pd.Series) -> pd.Series:
    curve = equity / equity.iloc[0]
    peak = curve.cummax()
    dd = (curve / peak) - 1.0
    return dd

def plot_equity_curve(res: dict):
    eq = res["portfolio_value"]
    plt.figure(figsize=(12, 6))
    plt.plot(eq.index, eq.values, linewidth=2, color='blue')
    plt.title("Equity Curve", fontsize=14, fontweight='bold')
    plt.xlabel("Time", fontsize=12)
    plt.ylabel("Portfolio Value", fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.show()

def plot_drawdown(res: dict):
    eq = res["portfolio_value"]
    dd = compute_drawdown(eq)
    plt.figure(figsize=(12, 6))
    plt.fill_between(dd.index, dd.values, 0, alpha=0.3, color='red')
    plt.plot(dd.index, dd.values, color='red', linewidth=2)
    plt.title("Drawdown", fontsize=14, fontweight='bold')
    plt.xlabel("Time", fontsize=12)
    plt.ylabel("Drawdown (ratio)", fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.show()

def plot_returns_hist(res: dict, bins: int = 50):
    rets = res["returns"]
    plt.figure(figsize=(10, 6))
    plt.hist(rets.dropna().values, bins=bins, alpha=0.7, color='skyblue', edgecolor='black')
    plt.title("Strategy Returns Histogram", fontsize=14, fontweight='bold')
    plt.xlabel("Return per Bar", fontsize=12)
    plt.ylabel("Frequency", fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.show()

def plot_price_with_positions(df_prices: pd.DataFrame, positions: pd.Series):
    """
    单图展示：价格曲线 + 仓位切换点（用竖线标出切换时刻）
    说明：不使用多子图；竖线位置在 positions 发生变化的时刻。
    """
    prices = df_prices["close"].astype(float)
    change_idx = positions.diff().fillna(0).ne(0)
    switch_times = positions.index[change_idx]

    plt.figure(figsize=(12, 6))
    plt.plot(prices.index, prices.values, linewidth=2, color='blue', label='Price')
    
    # 添加仓位切换点
    for t in switch_times:
        color = 'green' if positions.loc[t] > 0 else 'red' if positions.loc[t] < 0 else 'gray'
        plt.axvline(t, linestyle="--", alpha=0.7, color=color, linewidth=1)
    
    plt.title("Price with Position Switches", fontsize=14, fontweight='bold')
    plt.xlabel("Time", fontsize=12)
    plt.ylabel("Close Price", fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.xticks(rotation=45, ha='right')
    plt.legend()
    plt.tight_layout()
    plt.show()

# ===== =====
if __name__ == "__main__":
    # 1) 获取历史数据
    df = fetch_history(SYMBOL)
    if df.empty:
        print("No data.")
    else:
        # 2) 计算策略表现
        res = compute_performance(df, TF)

        # 3) 逐个图表展示
        plot_equity_curve(res)
        plot_drawdown(res)
        plot_returns_hist(res, bins=60)
        out = apply_strategy(df)
        plot_price_with_positions(df, out["positions"])