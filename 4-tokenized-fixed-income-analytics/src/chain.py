"""A synthetic on-chain trade and holder history for tokenised debt.

Not real chain data. It exists so the analytics have a series with known
properties -- a known holder concentration, a known stress episode, a known
redemption backlog -- against which the measures can be checked. A liquidity
metric that cannot recover a concentration you deliberately built is not
measuring concentration.

The generator models the three things that distinguish tokenised debt from an
equity token: redemption is a queue with a settlement lag, holdings are far more
concentrated than in listed markets, and secondary trading is thin and bursty.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np


@dataclass
class Trade:
    t: int              # block time, seconds
    price: float        # per unit, in the debt's currency
    size: float         # units
    side: int           # +1 buy, -1 sell


@dataclass
class Redemption:
    requested_at: int
    settled_at: int | None
    size: float

    def latency_s(self):
        return None if self.settled_at is None else self.settled_at - self.requested_at


@dataclass
class TokenHistory:
    symbol: str
    trades: list = field(default_factory=list)
    holders: np.ndarray = field(default_factory=lambda: np.array([]))
    redemptions: list = field(default_factory=list)
    stress_window: tuple = (0, 0)
    note: str = ""

    def prices(self) -> np.ndarray:
        return np.array([tr.price for tr in self.trades], float)

    def sizes(self) -> np.ndarray:
        return np.array([tr.size for tr in self.trades], float)

    def times(self) -> np.ndarray:
        return np.array([tr.t for tr in self.trades], float)


def _pareto_holdings(n: int, alpha: float, total: float,
                     rng: np.random.Generator) -> np.ndarray:
    """Holder sizes from a Pareto tail. Lower alpha -> more concentrated."""
    raw = rng.pareto(alpha, n) + 1.0
    return raw / raw.sum() * total


def make_token(symbol: str, n_days: int = 120, trades_per_day: float = 14.0,
               alpha: float = 1.1, n_holders: int = 90, supply: float = 5_000_000,
               stress_day: int | None = 70, depth: float = 60_000.0,
               seed: int = 3) -> TokenHistory:
    """`depth` is the notional that moves the price by roughly one percent.

    Adding it fixed a real flaw. The first version drew every token's per-trade
    return from the same distribution, so trade size carried no price impact at
    all -- and the Amihud measure came out INVERTED, scoring the thinnest token
    in the universe as the most liquid. Amihud is a price-impact measure; with
    no impact in the generator it was reading pure noise.

    Illiquid tokens now have shallow depth, so the same order moves them further,
    which is the mechanism the measure is supposed to detect.
    """
    rng = np.random.default_rng(seed)
    holders = _pareto_holdings(n_holders, alpha, supply, rng)

    trades: list = []
    price = 100.0
    day_s = 86_400
    stress_lo = (stress_day or 0) * day_s
    stress_hi = stress_lo + 5 * day_s

    for day in range(n_days):
        in_stress = stress_day is not None and stress_lo <= day * day_s < stress_hi
        # Trading is bursty: a Poisson count, inflated during stress.
        n = rng.poisson(trades_per_day * (2.6 if in_stress else 1.0))
        vol = 0.0035 * (3.2 if in_stress else 1.0)
        drift = -0.004 if in_stress else 0.0001
        eff_depth = depth * (0.35 if in_stress else 1.0)   # depth evaporates in stress
        for _ in range(int(n)):
            t = day * day_s + int(rng.uniform(0, day_s))
            side = -1 if (in_stress and rng.random() < 0.72) else int(
                rng.choice([-1, 1]))
            size = float(rng.lognormal(8.4 if not in_stress else 9.0, 0.85))
            # Price impact proportional to order notional over depth, plus a
            # smaller idiosyncratic component. This is what Amihud measures.
            impact = side * 0.01 * (size * price) / eff_depth
            price *= float(np.exp(rng.normal(drift, vol) + impact))
            price = max(45.0, min(130.0, price))
            trades.append(Trade(t=t, price=price, size=size, side=side))

    trades.sort(key=lambda x: x.t)

    # Redemptions: a steady trickle, with a backlog opening during stress.
    reds: list = []
    for day in range(n_days):
        in_stress = stress_day is not None and stress_lo <= day * day_s < stress_hi
        n = rng.poisson(3.0 * (4.0 if in_stress else 1.0))
        for _ in range(int(n)):
            req = day * day_s + int(rng.uniform(0, day_s))
            base_lag = rng.gamma(2.0, 0.55 * day_s)
            lag = base_lag * (5.5 if in_stress else 1.0)
            settled = req + int(lag)
            if settled > n_days * day_s:
                reds.append(Redemption(req, None, float(rng.lognormal(8.0, 0.7))))
            else:
                reds.append(Redemption(req, settled, float(rng.lognormal(8.0, 0.7))))

    return TokenHistory(symbol=symbol, trades=trades, holders=holders,
                        redemptions=reds,
                        stress_window=(stress_lo, stress_hi),
                        note=f"alpha={alpha}, {n_holders} holders")


def make_universe(seed: int = 3) -> list:
    """Tokens spanning the concentration and liquidity range."""
    # (symbol, pareto alpha, holders, trades/day, stress day, depth)
    specs = [
        ("TBILL-A", 1.9, 220, 22.0, 70, 900_000.0),    # broad, deep
        ("TBILL-B", 1.5, 140, 15.0, 70, 500_000.0),
        ("CORP-A", 1.15, 90, 12.0, 70, 220_000.0),     # private placement
        ("CORP-B", 0.95, 55, 7.0, 70, 90_000.0),       # concentrated
        ("MUNI-A", 0.8, 32, 4.0, 70, 35_000.0),        # very thin
        ("STABLE-X", 2.4, 400, 40.0, None, 1_500_000.0),
    ]
    return [make_token(sym, alpha=a, n_holders=h, trades_per_day=tpd,
                       stress_day=sd, depth=d, seed=seed + i)
            for i, (sym, a, h, tpd, sd, d) in enumerate(specs)]
