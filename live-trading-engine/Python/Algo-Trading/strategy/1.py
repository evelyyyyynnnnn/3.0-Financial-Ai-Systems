import pandas as pd
import numpy as np
from typing import Dict, List, Tuple

CASH = "CASH"

# ---------- Common helpers ----------
def _wide_prices(df: pd.DataFrame) -> pd.DataFrame:
    return df.copy().astype(float).sort_index()

def _month_ends(idx: pd.DatetimeIndex) -> pd.DatetimeIndex:
    return pd.to_datetime(pd.Series(idx).dt.to_period("M").dt.to_timestamp("M").unique().values)

def _to_monthly(pr: pd.DataFrame) -> pd.DataFrame:
    return pr.resample("M").last()

def _tplus1_timestamp(prices: pd.DataFrame, ts) -> pd.Timestamp:
    nxt = prices.index[prices.index > ts]
    return nxt[0] if len(nxt) else ts

def _eq_weight(names: List[str], universe: List[str]) -> pd.Series:
    w = pd.Series(0.0, index=universe + [CASH])
    if names:
        w[names] = 1.0 / len(names)
    else:
        w[CASH] = 1.0
    return w

def _clip_and_cash(W: pd.Series, max_weight: float = 1.0) -> pd.Series:
    names = [c for c in W.index if c != CASH]
    W[names] = W[names].clip(0, max_weight)
    W[CASH] += (1.0 - W.sum())
    return W

# ===========================================================
# 1) Statistical Arbitrage (pairs / cointegration MR)
# data needs: prices (wide), pairs=[(A,B), ...], lookback_days
# ===========================================================
def build_signals_statarb(data: Dict, lookback_days: int = 252, z_enter: float = 1.0, z_exit: float = 0.0,
                          max_weight: float = 0.10) -> pd.DataFrame:
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
            X = np.log(hist[[a,b]]).dropna()
            if X.shape[0] < 60: 
                continue
            # OLS hedge ratio: reg log(a) ~ beta * log(b)
            beta = np.polyfit(X[b], X[a], 1)[0]
            spread = X[a] - beta * X[b]
            z = (spread.iloc[-1] - spread.mean()) / (spread.std() + 1e-9)
            if z > z_enter:     # a overpriced vs b -> short a, long b
                W[a] -= max_weight
                W[b] += max_weight
            elif z < -z_enter:  # a underpriced -> long a, short b
                W[a] += max_weight
                W[b] -= max_weight
            else:
                # flat / carry old pos由执行层管理，这里信号为当期目标
                pass
        W = _clip_and_cash(W, max_weight=max_weight)
        W.name = _tplus1_timestamp(prices, d_eff)
        out.append(W)
    return pd.DataFrame(out).sort_index()
