"""Run the analytics across the token universe."""
from __future__ import annotations
import json, pathlib, sys
from datetime import datetime, timezone
import numpy as np
from .chain import make_universe
from .analytics import analyse, effective_holders, hhi

ROOT = pathlib.Path(__file__).resolve().parent.parent


def recovery_check() -> dict:
    """Does the concentration measure recover a concentration we built?

    Sweep the Pareto tail parameter and confirm HHI moves monotonically with it.
    A metric that cannot detect a difference you deliberately created is not
    measuring what its name says.
    """
    from .chain import _pareto_holdings
    rng = np.random.default_rng(0)
    rows = []
    for alpha in (0.7, 0.9, 1.1, 1.5, 2.0, 3.0):
        vals = [hhi(_pareto_holdings(120, alpha, 1e6, np.random.default_rng(s)))
                for s in range(12)]
        rows.append({"alpha": alpha, "mean_hhi": round(float(np.mean(vals)), 5),
                     "effective_holders": round(1.0 / float(np.mean(vals)), 1)})
    monotone = all(rows[i]["mean_hhi"] >= rows[i + 1]["mean_hhi"]
                   for i in range(len(rows) - 1))
    return {"sweep": rows, "monotone_in_alpha": monotone}


def run() -> dict:
    universe = make_universe(seed=3)
    per_token = [analyse(t) for t in universe]
    stressed = [r for r in per_token if r["stress"]["n_inside"] > 0]
    ratios = [r["stress"]["ratio"] for r in stressed
              if r["stress"]["ratio"] == r["stress"]["ratio"]]
    results = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "is_synthetic": True,
        "data_source": "synthetic on-chain trade and redemption history (src/chain.py)",
        "universe_size": len(universe),
        "total_trades": sum(len(t.trades) for t in universe),
        "total_redemptions": sum(len(t.redemptions) for t in universe),
        "tokens": per_token,
        "stress": {
            "n_tokens_with_episode": len(stressed),
            "median_latency_ratio": round(float(np.median(ratios)), 3) if ratios else None,
            "max_latency_ratio": round(float(np.max(ratios)), 3) if ratios else None,
        },
        "recovery": recovery_check(),
    }
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results" / "latest.json").write_text(
        json.dumps(results, indent=2) + "\n", encoding="utf8")
    return results


def main() -> int:
    r = run()
    print(f"universe: {r['universe_size']} tokens, {r['total_trades']:,} trades, "
          f"{r['total_redemptions']:,} redemption requests")
    print(f"\n{'token':<10}{'wallets':>8}{'eff.holders':>13}{'top5':>8}"
          f"{'amihud':>10}{'roll bps':>10}{'gaps p95h':>11}{'redeem p95h':>13}")
    for t in r["tokens"]:
        c, l, rd = t["concentration"], t["liquidity"], t["redemption"]
        roll = f"{l['roll_spread_bps']:.1f}" if l["roll_spread_bps"] is not None else "n/a"
        print(f"{t['symbol']:<10}{c['n_wallets']:>8}{c['effective_holders']:>13.1f}"
              f"{c['top5_share']:>8.1%}{l['amihud_x1e6']:>10.3f}{roll:>10}"
              f"{l['p95_gap_h']:>11.1f}{rd['p95_latency_h']:>13.1f}")
    print(f"\nredemption latency, stress vs calm:")
    for t in r["tokens"]:
        s = t["stress"]
        if s["n_inside"]:
            print(f"  {t['symbol']:<10} {s['median_outside_h']:>7.1f}h -> "
                  f"{s['median_inside_h']:>7.1f}h  ({s['ratio']:.1f}x)")
    rc = r["recovery"]
    print(f"\nconcentration recovery (monotone in alpha: {rc['monotone_in_alpha']}):")
    for row in rc["sweep"]:
        print(f"  alpha={row['alpha']:<5} HHI={row['mean_hhi']:.5f}  "
              f"effective holders={row['effective_holders']:.1f}")
    try:
        from .site import build_site
        build_site(r); print("\nwebsite/ rebuilt from this run")
    except Exception as exc:
        print(f"\n(site not rebuilt: {exc})", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
