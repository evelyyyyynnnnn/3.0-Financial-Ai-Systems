"""Cross-market contagion estimation.

Contagion is not correlation. Two assets can move together every day and
transmit nothing — they simply share a factor. What matters for systemic risk
is *directional* transmission: does a shock to A show up in B afterwards, and
does that link intensify precisely when markets are stressed?

Three measures, in increasing order of what they tell you:

  corr      contemporaneous Pearson correlation of returns — the baseline
  lead_lag  cross-correlation at lag k, signed: does A lead B or the reverse
  tail_dep  co-movement conditional on the tail — the share of A's worst days
            on which B is also in its own worst days

The last is the one that separates contagion from co-movement. A pair can be
weakly correlated overall and still fail together, which is exactly the case
ordinary correlation misses and risk managers care about.

Standard library only — the matrices here are small and clarity beats speed.
"""
from __future__ import annotations

import math
from dataclasses import dataclass


def returns(prices: list[float]) -> list[float]:
    """Log returns. Log, not simple, so shocks are additive across periods."""
    out = []
    for a, b in zip(prices, prices[1:]):
        if a > 0 and b > 0:
            out.append(math.log(b / a))
    return out


def _mean(xs): return sum(xs) / len(xs) if xs else 0.0


def _std(xs, mu=None):
    if len(xs) < 2:
        return 0.0
    mu = _mean(xs) if mu is None else mu
    return math.sqrt(sum((x - mu) ** 2 for x in xs) / (len(xs) - 1))


def correlation(a: list[float], b: list[float]) -> float:
    n = min(len(a), len(b))
    if n < 3:
        return 0.0
    a, b = a[-n:], b[-n:]
    ma, mb = _mean(a), _mean(b)
    sa, sb = _std(a, ma), _std(b, mb)
    if sa == 0 or sb == 0:
        return 0.0
    cov = sum((x - ma) * (y - mb) for x, y in zip(a, b)) / (n - 1)
    return max(-1.0, min(1.0, cov / (sa * sb)))


def lead_lag(a: list[float], b: list[float], max_lag: int = 3) -> tuple[int, float]:
    """Best (lag, correlation) over ±max_lag.

    A positive lag means `a` leads `b` by that many periods — a's move today
    lines up with b's move `lag` periods later, which is the direction of
    transmission if there is one.
    """
    best_lag, best_r = 0, correlation(a, b)
    for k in range(1, max_lag + 1):
        r_fwd = correlation(a[:-k], b[k:])     # a leads b
        if abs(r_fwd) > abs(best_r):
            best_lag, best_r = k, r_fwd
        r_bwd = correlation(a[k:], b[:-k])     # b leads a
        if abs(r_bwd) > abs(best_r):
            best_lag, best_r = -k, r_bwd
    return best_lag, best_r


def tail_dependence(a: list[float], b: list[float], q: float = 0.10) -> float:
    """P(b in its own lower tail | a in its lower tail).

    Estimated empirically rather than through a copula: with a few hundred
    observations a fitted copula's tail parameter is mostly prior, and this
    quantity is directly checkable against the data.
    """
    n = min(len(a), len(b))
    if n < 20:
        return 0.0
    a, b = a[-n:], b[-n:]
    k = max(2, int(n * q))
    a_cut = sorted(a)[k - 1]
    b_cut = sorted(b)[k - 1]
    a_tail = [i for i, x in enumerate(a) if x <= a_cut]
    if not a_tail:
        return 0.0
    both = sum(1 for i in a_tail if b[i] <= b_cut)
    return both / len(a_tail)


@dataclass
class Edge:
    source: str
    target: str
    corr: float
    lag: int
    lag_corr: float
    tail_dep: float
    strength: float      # composite, 0..1

    def to_dict(self):
        return {"source": self.source, "target": self.target,
                "corr": round(self.corr, 4), "lag": self.lag,
                "lag_corr": round(self.lag_corr, 4),
                "tail_dep": round(self.tail_dep, 4),
                "strength": round(self.strength, 4)}


def edge_strength(corr: float, tail: float) -> float:
    """Composite transmission strength.

    Weighted toward tail dependence: a pair that only co-moves in calm
    markets is not a contagion channel, and a pair that fails together is
    one even if its everyday correlation is unremarkable.
    """
    return round(0.35 * abs(corr) + 0.65 * tail, 6)


def build_edges(series: dict[str, list[float]], *, min_strength: float = 0.18,
                max_lag: int = 3) -> list[Edge]:
    """All pairwise edges above a strength floor, strongest first."""
    names = sorted(series)
    edges: list[Edge] = []
    for i, a in enumerate(names):
        for b in names[i + 1:]:
            ra, rb = series[a], series[b]
            c = correlation(ra, rb)
            lag, lag_r = lead_lag(ra, rb, max_lag)
            t = tail_dependence(ra, rb)
            s = edge_strength(c, t)
            if s < min_strength:
                continue
            # Orient the edge along the lead: the leader is the source.
            src, tgt, L = (a, b, lag) if lag >= 0 else (b, a, -lag)
            edges.append(Edge(source=src, target=tgt, corr=c, lag=L,
                              lag_corr=lag_r, tail_dep=t, strength=s))
    edges.sort(key=lambda e: -e.strength)
    return edges


def propagate(edges: list[Edge], shocked: str, *, decay: float = 0.75,
              rounds: int = 3, floor: float = 0.02) -> dict[str, float]:
    """Simulate a unit shock at one node spreading along the edges.

    Each hop multiplies by the edge strength and a decay factor, so influence
    dies out with distance. A node keeps the largest impact reaching it rather
    than a sum, so a hub with many weak inbound edges does not accumulate a
    spuriously large number.
    """
    adj: dict[str, list[Edge]] = {}
    for e in edges:
        adj.setdefault(e.source, []).append(e)
        adj.setdefault(e.target, []).append(e)   # transmission is not one-way

    impact = {shocked: 1.0}
    frontier = {shocked: 1.0}
    for _ in range(rounds):
        nxt: dict[str, float] = {}
        for node, level in frontier.items():
            for e in adj.get(node, []):
                other = e.target if e.source == node else e.source
                val = level * e.strength * decay
                if val < floor:
                    continue
                if val > impact.get(other, 0.0) and val > nxt.get(other, 0.0):
                    nxt[other] = val
        if not nxt:
            break
        for k, v in nxt.items():
            impact[k] = max(impact.get(k, 0.0), v)
        frontier = nxt
    return impact
