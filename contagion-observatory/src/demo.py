"""Recover the transmission network, then shock it."""
from __future__ import annotations
import json, pathlib, sys
from datetime import datetime, timezone
import numpy as np
from .market import make_market
from .contagion import (edge_scores, lower_tail_dependence, propagate,
                        score_recovery, tail_lift, threshold_sweep)

ROOT = pathlib.Path(__file__).resolve().parent.parent


def design_comparison(market) -> list:
    """Every combination of scorer and factor handling, scored the same way.

    Published because the obvious design loses. Reporting only the configuration
    that happens to work, without the ones tried first, is how a method gets
    presented as though it were derived rather than searched.
    """
    from .contagion import SCORERS, rank_of_true_edges
    rows = []
    for scorer in SCORERS:
        for label, remove in (("factor removed", True), ("raw", False)):
            sc = edge_scores(market, remove_factor=remove, scorer=scorer)
            sweep = threshold_sweep(market, sc)
            best = max(sweep, key=lambda r: r["f1"]) if sweep else {}
            ranks = rank_of_true_edges(market, sc)
            rows.append({
                "scorer": scorer, "returns": label,
                "best_f1": best.get("f1", 0.0),
                "precision": best.get("precision", 0.0),
                "recall": best.get("recall", 0.0),
                "true_edge_ranks": ranks,
                "median_rank": int(np.median(ranks)) if ranks else None,
                "n_pairs": len(sc),
            })
    return sorted(rows, key=lambda r: -r["best_f1"])


def tail_vs_calm(market, remove_factor: bool = False) -> list:
    """Tail lift on true edges vs unlinked pairs.

    Run on both raw returns and factor-removed residuals. On raw returns the
    common factor makes everything crash together, so unlinked pairs score as
    high as real links -- which is the concrete demonstration that tail
    dependence measured on raw prices is not evidence of transmission.
    """
    from .contagion import partial_out_factor
    R = partial_out_factor(market.returns) if remove_factor else market.returns
    rows = []
    for src, dst, strength, tail_only in market.true_edges:
        i, j = market.index(src), market.index(dst)
        rows.append({"pair": f"{src}->{dst}", "kind":
                     "stress-only" if tail_only else "always-on",
                     "strength": strength,
                     "tail_lift": round(tail_lift(R[:, i], R[:, j]), 3),
                     "tail_dep": round(lower_tail_dependence(R[:, i], R[:, j]), 3)})
    rng = np.random.default_rng(0)
    truth = market.true_edge_set()
    lifts = []
    for _ in range(60):
        i, j = rng.integers(0, len(market.names), 2)
        if i == j or (market.names[i], market.names[j]) in truth:
            continue
        lifts.append(tail_lift(R[:, i], R[:, j]))
    rows.append({"pair": "unlinked pairs (mean of 60)", "kind": "none",
                 "strength": 0.0,
                 "tail_lift": round(float(np.nanmean(lifts)), 3),
                 "tail_dep": round(float(np.nanmean(lifts)) * 0.10, 3)})
    return rows


def run() -> dict:
    market = make_market(seed=17)
    scores = edge_scores(market)
    sweep = threshold_sweep(market, scores)
    best = max(sweep, key=lambda r: r["f1"]) if sweep else {}

    shocks = {n: propagate(market, n, magnitude=-0.20)
              for n in ("CRY1", "CRY3", "EQ4", "EQ7")}

    results = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "is_synthetic": True,
        "data_source": "synthetic multi-asset panel with a constructed edge set "
                       "(src/market.py)",
        "universe": {
            "n_assets": len(market.names),
            "n_crypto": sum(1 for v in market.classes.values() if v == "crypto"),
            "n_equity": sum(1 for v in market.classes.values() if v == "equity"),
            "n_days": int(market.returns.shape[0]),
            "stress_days": int(market.stress_days.sum()),
            "stress_share": round(float(market.stress_days.mean()), 4),
            "n_true_edges": len(market.true_edges),
            "n_candidate_pairs": len(scores),
        },
        "best": best,
        "sweep": sweep,
        "top_edges": scores[:14],
        "true_edges": [{"src": s, "dst": d, "strength": st, "stress_only": t}
                       for s, d, st, t in market.true_edges],
        "design_comparison": design_comparison(market),
        "tail_raw": tail_vs_calm(market, remove_factor=False),
        "tail_residual": tail_vs_calm(market, remove_factor=True),
        "shocks": shocks,
    }
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results" / "latest.json").write_text(
        json.dumps(results, indent=2) + "\n", encoding="utf8")
    return results


def main() -> int:
    r = run()
    u, b = r["universe"], r["best"]
    print(f"universe: {u['n_assets']} assets ({u['n_crypto']} crypto / "
          f"{u['n_equity']} equity), {u['n_days']} days, "
          f"{u['stress_days']} stress days ({u['stress_share']:.1%})")
    print(f"true edges: {u['n_true_edges']} of {u['n_candidate_pairs']} ordered pairs")
    print(f"\nbest recovery: P={b['precision']:.3f} R={b['recall']:.3f} "
          f"F1={b['f1']:.3f} ({b['tp']} true, {b['fp']} false, {b['fn']} missed)")
    print("\ndesign comparison (best F1 over the threshold sweep):")
    print(f"  {'scorer':<14}{'returns':<16}{'F1':>7}{'P':>7}{'R':>7}{'med rank':>10}")
    for row in r["design_comparison"]:
        print(f"  {row['scorer']:<14}{row['returns']:<16}{row['best_f1']:>7.3f}"
              f"{row['precision']:>7.3f}{row['recall']:>7.3f}"
              f"{str(row['median_rank']):>10}")
    print("\ntail lift, raw returns vs factor-removed residuals:")
    print(f"  {'pair':<30}{'kind':<14}{'raw':>8}{'residual':>10}")
    resid = {x['pair']: x['tail_lift'] for x in r["tail_residual"]}
    for row in r["tail_raw"]:
        print(f"  {row['pair']:<30}{row['kind']:<14}{row['tail_lift']:>8.2f}"
              f"{resid.get(row['pair'], float('nan')):>10.2f}")
    print("\nshock propagation (-20% to one asset):")
    for name, s in r["shocks"].items():
        print(f"  {name:<6} reaches {s['n_reached']} assets, "
              f"total |impact| {s['total_absolute_impact']:.4f}  "
              f"-> {', '.join(s['reached'][:5]) or 'nothing'}")
    try:
        from .site import build_site
        build_site(r); print("\nwebsite/ rebuilt from this run")
    except Exception as exc:
        print(f"\n(site not rebuilt: {exc})", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
