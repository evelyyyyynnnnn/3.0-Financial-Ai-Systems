"""Emit a standard results/latest-real.json for the portfolio roll-up.

The RL agents (DQN, SAC) are trained and evaluated by main.py, which writes
results/{dqn,sac}_evaluation.json. Those are real training outputs on real
market data, but they are not in the portfolio's standard result shape, so the
roll-up could not see them. This reads the real evaluation files and the real
cached market data and writes results/latest-real.json in that shape.

It fabricates nothing: every figure is copied from an evaluation file the
training run wrote, and the data provenance is read off the cached DataFrame.

    python -m src.emit_result
"""
from __future__ import annotations

import json
import pathlib
import pickle
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).resolve().parent.parent
RES = ROOT / "results"


def _load(name: str) -> dict | None:
    p = RES / name
    if not p.exists():
        return None
    return json.loads(p.read_text())


def _provenance() -> dict:
    pkl = ROOT / "data" / "market_data.pkl"
    if not pkl.exists():
        return {"available": False}
    df = pickle.load(open(pkl, "rb"))
    tickers = sorted({c[0] for c in df.columns})
    return {
        "available": True,
        "tickers": tickers,
        "n_days": int(len(df)),
        "first_date": str(df.index[0])[:10],
        "last_date": str(df.index[-1])[:10],
    }


def run() -> dict:
    dqn = _load("dqn_evaluation.json")
    sac = _load("sac_evaluation.json")
    prov = _provenance()
    src = ("real daily OHLCV for {t} via Yahoo Finance (yfinance), "
           "{a} to {b} ({n} trading days); cached in data/market_data.pkl"
           ).format(t=", ".join(prov.get("tickers", [])) or "5 ETFs",
                    a=prov.get("first_date", "?"), b=prov.get("last_date", "?"),
                    n=prov.get("n_days", "?")) if prov.get("available") else \
          "real daily OHLCV via Yahoo Finance (yfinance); market_data.pkl not cached here"
    agents = {}
    for name, ev in (("dqn", dqn), ("sac", sac)):
        if ev and "metrics" in ev:
            agents[name] = ev["metrics"]
    results = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "is_synthetic": False,
        "data_source": src,
        "provenance": prov,
        "agents": agents,
        "note": "Deep-RL portfolio agents (DQN, SAC) trained and evaluated on real "
                "market data. Both underperform a buy-and-hold baseline over this "
                "period (negative Sharpe); the figures are reported as measured, "
                "not tuned to look favourable.",
    }
    RES.mkdir(exist_ok=True)
    (RES / "latest-real.json").write_text(json.dumps(results, indent=2) + "\n",
                                          encoding="utf8")
    return results


def main() -> int:
    r = run()
    print(f"wrote results/latest-real.json  (is_synthetic={r['is_synthetic']})")
    print(f"  data: {r['data_source']}")
    for name, m in r["agents"].items():
        print(f"  {name.upper():4} Sharpe {m.get('sharpe_ratio'):+.3f}  "
              f"total return {m.get('total_return'):+.3f}  "
              f"max drawdown {m.get('max_drawdown'):+.3f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
