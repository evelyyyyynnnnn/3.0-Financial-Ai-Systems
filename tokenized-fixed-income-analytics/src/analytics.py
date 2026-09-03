"""Liquidity, concentration and redemption measures.

Each measure is chosen because it survives thin, irregular data. Tokenised debt
does not trade every minute, so anything requiring a regular grid or a full
order book is unusable; these all work from a trade tape and a holder snapshot.
"""

from __future__ import annotations

import numpy as np

SECONDS_PER_DAY = 86_400


# --- concentration --------------------------------------------------------

def hhi(holdings: np.ndarray) -> float:
    """Herfindahl-Hirschman index on holder shares, in [0, 1].

    1/HHI is the effective number of holders, which is the form worth quoting:
    an HHI of 0.05 means the float behaves as though held by 20 equal holders,
    however many wallets appear on chain.
    """
    h = np.asarray(holdings, float)
    tot = h.sum()
    if tot <= 0:
        return 0.0
    s = h / tot
    return float(np.sum(s ** 2))


def effective_holders(holdings: np.ndarray) -> float:
    v = hhi(holdings)
    return float(1.0 / v) if v > 0 else 0.0


def top_n_share(holdings: np.ndarray, n: int = 5) -> float:
    h = np.sort(np.asarray(holdings, float))[::-1]
    tot = h.sum()
    return float(h[:n].sum() / tot) if tot > 0 else 0.0


def gini(holdings: np.ndarray) -> float:
    h = np.sort(np.asarray(holdings, float))
    n = len(h)
    if n == 0 or h.sum() <= 0:
        return 0.0
    idx = np.arange(1, n + 1)
    return float((2 * np.sum(idx * h)) / (n * h.sum()) - (n + 1) / n)


# --- liquidity ------------------------------------------------------------

def amihud_illiquidity(prices: np.ndarray, sizes: np.ndarray) -> float:
    """Mean |return| per unit of traded value.

    The standard thin-market measure precisely because it needs only trades.
    Higher means price moves more for a given amount of volume, i.e. worse
    liquidity.
    """
    p = np.asarray(prices, float)
    v = np.asarray(sizes, float) * p
    if len(p) < 2:
        return float("nan")
    r = np.abs(np.diff(p) / p[:-1])
    val = v[1:]
    m = val > 0
    return float(np.mean(r[m] / val[m]) * 1e6) if m.any() else float("nan")


def roll_spread(prices: np.ndarray) -> float:
    """Roll's effective spread from the autocovariance of price changes.

    Negative autocovariance is the bid-ask bounce. When the estimate goes
    positive the model does not apply, and this returns NaN rather than a
    fabricated number -- that happens in trending markets and is a real
    limitation of the estimator.
    """
    p = np.asarray(prices, float)
    if len(p) < 3:
        return float("nan")
    d = np.diff(p)
    cov = float(np.cov(d[:-1], d[1:])[0, 1])
    if cov >= 0:
        return float("nan")
    return float(2.0 * np.sqrt(-cov) / np.mean(p) * 10_000)   # bps


def turnover(sizes: np.ndarray, supply: float, days: float) -> float:
    """Annualised turnover as a multiple of supply."""
    if supply <= 0 or days <= 0:
        return 0.0
    return float(np.sum(sizes) / supply * (365.0 / days))


def trade_gap_stats(times: np.ndarray) -> dict:
    """How long the tape goes quiet. Thin markets fail on the gaps."""
    t = np.sort(np.asarray(times, float))
    if len(t) < 2:
        return {"median_gap_h": float("nan"), "p95_gap_h": float("nan"),
                "max_gap_h": float("nan"), "n_trades": int(len(t))}
    g = np.diff(t) / 3600.0
    return {"median_gap_h": round(float(np.median(g)), 3),
            "p95_gap_h": round(float(np.percentile(g, 95)), 3),
            "max_gap_h": round(float(np.max(g)), 3),
            "n_trades": int(len(t))}


# --- redemption -----------------------------------------------------------

def redemption_stats(redemptions) -> dict:
    lat = [r.latency_s() for r in redemptions if r.latency_s() is not None]
    unsettled = [r for r in redemptions if r.settled_at is None]
    if not lat:
        return {"n": len(redemptions), "n_settled": 0,
                "n_unsettled": len(unsettled), "median_latency_h": float("nan"),
                "p95_latency_h": float("nan"), "unsettled_share": 1.0}
    a = np.array(lat, float) / 3600.0
    return {
        "n": len(redemptions), "n_settled": len(lat), "n_unsettled": len(unsettled),
        "median_latency_h": round(float(np.median(a)), 3),
        "p95_latency_h": round(float(np.percentile(a, 95)), 3),
        "mean_latency_h": round(float(np.mean(a)), 3),
        "unsettled_share": round(len(unsettled) / len(redemptions), 4),
    }


def latency_by_window(redemptions, window: tuple) -> dict:
    """Redemption latency inside vs outside a stress window.

    This is the measure that matters for a debt token: the queue lengthening is
    what turns a liquidity problem into a run, and it is invisible in the price.
    """
    lo, hi = window
    inside = [r for r in redemptions
              if lo <= r.requested_at < hi and r.latency_s() is not None]
    outside = [r for r in redemptions
               if not (lo <= r.requested_at < hi) and r.latency_s() is not None]

    def med(rs):
        return (round(float(np.median([r.latency_s() for r in rs])) / 3600.0, 3)
                if rs else float("nan"))

    mi, mo = med(inside), med(outside)
    return {"n_inside": len(inside), "n_outside": len(outside),
            "median_inside_h": mi, "median_outside_h": mo,
            "ratio": round(mi / mo, 3) if (mo and mo == mo and mo > 0) else float("nan")}


def analyse(token, supply: float = 5_000_000) -> dict:
    p, s, t = token.prices(), token.sizes(), token.times()
    days = (t.max() - t.min()) / SECONDS_PER_DAY if len(t) > 1 else 1.0
    return {
        "symbol": token.symbol,
        "concentration": {
            "hhi": round(hhi(token.holders), 5),
            "effective_holders": round(effective_holders(token.holders), 2),
            "n_wallets": int(len(token.holders)),
            "top5_share": round(top_n_share(token.holders, 5), 4),
            "gini": round(gini(token.holders), 4),
        },
        "liquidity": {
            "amihud_x1e6": round(amihud_illiquidity(p, s), 4),
            "roll_spread_bps": (round(roll_spread(p), 2)
                                if roll_spread(p) == roll_spread(p) else None),
            "turnover_annual": round(turnover(s, supply, days), 3),
            **trade_gap_stats(t),
        },
        "redemption": redemption_stats(token.redemptions),
        "stress": latency_by_window(token.redemptions, token.stress_window),
    }
