#!/usr/bin/env python3
"""Generate a labelled sample dataset so the site renders before a live pull.

The series here are simulated, not real prices, and the payload says so. They
are built from a factor model with a deliberately planted structure so the
estimators have something real to find:

  - a common market factor everything loads on,
  - a crypto-specific factor the equities do not see,
  - BTC leading the other coins by one day,
  - a stress channel between BTC and XLF: on the market's worst decile they
    are forced down together.

That last one is the case the project exists to surface. Forcing joint tail
moves does lift the pair's ordinary correlation somewhat — it cannot not — but
the effect lands far harder on tail dependence, and that gap is the signal:
BTC-XLF ends up with a tail dependence well above BTC's other equity links
while its correlation is only modestly higher than theirs. Correlation alone
would rank XLF as one equity among several; the tail measure singles it out.

    python pipeline/make_sample.py
"""
from __future__ import annotations

import json
import math
import pathlib
import random
import sys
from datetime import date, timedelta

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))
from pipeline.build_dataset import build_payload   # noqa: E402

OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "data.json"
N = 400
SEED = 20260101

EQUITIES = {"SPY": 1.00, "QQQ": 1.15, "XLF": 0.95, "XLK": 1.20,
            "IWM": 1.10, "GLD": 0.20, "TLT": -0.35}
CRYPTO = {"BTC": 1.30, "ETH": 1.45, "SOL": 1.70, "XRP": 1.25, "ADA": 1.40}


def simulate():
    rng = random.Random(SEED)
    market = [rng.gauss(0, 0.011) for _ in range(N)]
    crypto_factor = [rng.gauss(0, 0.020) for _ in range(N)]

    # Stress days: the worst decile of the market factor.
    cutoff = sorted(market)[int(N * 0.10) - 1]
    stressed = {i for i, m in enumerate(market) if m <= cutoff}

    rets: dict[str, list[float]] = {}

    for sym, beta in EQUITIES.items():
        rets[sym] = [beta * market[i] + rng.gauss(0, 0.006) for i in range(N)]

    for sym, beta in CRYPTO.items():
        series = []
        for i in range(N):
            v = 0.12 * beta * market[i] + beta * crypto_factor[i] + rng.gauss(0, 0.015)
            series.append(v)
        rets[sym] = series

    # BTC leads the other coins by one day.
    for sym in ("ETH", "SOL", "XRP", "ADA"):
        rets[sym] = [rets[sym][0]] + [0.55 * rets["BTC"][i - 1] + 0.45 * rets[sym][i]
                                      for i in range(1, N)]

    # Tail-only channel: on market stress days, BTC and XLF both crater.
    # Off those days they are close to unrelated, so correlation stays modest.
    for i in stressed:
        rets["BTC"][i] = -abs(rets["BTC"][i]) - 0.055
        rets["XLF"][i] = -abs(rets["XLF"][i]) - 0.040

    start = date(2024, 8, 1)
    dates, prices = [], {k: [] for k in rets}
    for k in rets:
        px = 100.0
        for i in range(N):
            px *= math.exp(rets[k][i])
            prices[k].append(round(px, 4))
    d = start
    while len(dates) < N:
        if d.weekday() < 5:
            dates.append(d.isoformat())
        d += timedelta(days=1)

    meta = {}
    for k in EQUITIES:
        meta[k] = {"market": "equity", "source": "simulated"}
    for k in CRYPTO:
        meta[k] = {"market": "crypto", "source": "simulated"}
    return prices, meta, dates


if __name__ == "__main__":
    prices, meta, dates = simulate()
    payload = build_payload(
        prices, meta, [], is_sample=True, dates=dates,
        note="Simulated series, not real prices, produced by pipeline/make_sample.py "
             "so the site renders before a live pull. A factor model with a planted "
             "tail-only channel between BTC and XLF. Run pipeline/build_dataset.py "
             "to replace it with real market data.")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=1), encoding="utf8")
    print(f"Wrote {OUT} — {len(payload['nodes'])} nodes, {len(payload['edges'])} edges "
          f"({payload['cross_market_edges']} cross-market).")
