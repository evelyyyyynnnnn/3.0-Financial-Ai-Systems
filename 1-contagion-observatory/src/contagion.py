"""Tail dependence, edge selection, and shock propagation.

The distinction this module exists to make: correlation is not transmission. A
common factor makes everything move together with no causal link at all, so a
correlation-based edge set is mostly false edges. Two things separate them --
asking whether dependence is concentrated in the tail, and asking whether the
lead-lag is directional.
"""

from __future__ import annotations

import numpy as np


def lower_tail_dependence(x: np.ndarray, y: np.ndarray, q: float = 0.10) -> float:
    """P(y in its lower q | x in its lower q).

    The empirical tail-dependence coefficient. Independence gives q; a value
    near 1 means the two crash together. Reported against q, not against zero,
    which is the comparison that matters.
    """
    if len(x) != len(y) or len(x) < 50:
        return float("nan")
    qx, qy = np.quantile(x, q), np.quantile(y, q)
    in_x = x <= qx
    if in_x.sum() == 0:
        return float("nan")
    return float(np.mean(y[in_x] <= qy))


def tail_lift(x: np.ndarray, y: np.ndarray, q: float = 0.10) -> float:
    """Tail dependence relative to independence. 1.0 means no tail linkage."""
    td = lower_tail_dependence(x, y, q)
    return float(td / q) if td == td else float("nan")


def lagged_corr(x: np.ndarray, y: np.ndarray, lag: int = 1) -> float:
    """corr(x[t-lag], y[t]). Directional, unlike a contemporaneous correlation."""
    if lag <= 0 or len(x) <= lag + 5:
        return float("nan")
    a, b = x[:-lag], y[lag:]
    if a.std() < 1e-12 or b.std() < 1e-12:
        return 0.0
    return float(np.corrcoef(a, b)[0, 1])


def partial_out_factor(R: np.ndarray) -> np.ndarray:
    """Remove the first principal component.

    This is the step that turns a correlation study into a transmission study.
    The common factor produces correlation between every pair; regressing it out
    leaves the residual co-movement, which is where a real link shows up.
    """
    X = R - R.mean(0)
    u, s, vt = np.linalg.svd(X, full_matrices=False)
    pc1 = np.outer(u[:, 0] * s[0], vt[0])
    return X - pc1


SCORERS = ("lagged_corr", "tail_lift", "product")


def _combine(lc: float, tl: float, scorer: str) -> float:
    if lc != lc:
        return 0.0
    if scorer == "lagged_corr":
        return abs(lc)
    if scorer == "tail_lift":
        return tl if tl == tl else 0.0
    return abs(lc) * (tl if tl == tl else 1.0)


def edge_scores(market, q: float = 0.10, lag: int = 1,
                remove_factor: bool = True,
                scorer: str = "lagged_corr") -> list:
    """Score every ordered pair. Higher means more likely a real link.

    `scorer` is exposed rather than fixed because the obvious combination turns
    out to be the wrong one -- see the comparison in the demo. Multiplying the
    lead-lag correlation by tail lift was the original design and it degrades
    recovery badly: on factor-removed residuals, several genuine links have tail
    lift BELOW 1, so the multiplier suppresses exactly the edges it was added to
    surface. Lagged correlation alone is the default because it wins.
    """
    R = partial_out_factor(market.returns) if remove_factor else market.returns
    n = len(market.names)
    out = []
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            lc = lagged_corr(R[:, i], R[:, j], lag)
            tl = tail_lift(R[:, i], R[:, j], q)
            out.append({
                "src": market.names[i], "dst": market.names[j],
                "lagged_corr": round(lc, 5) if lc == lc else None,
                "tail_lift": round(tl, 4) if tl == tl else None,
                "score": round(_combine(lc, tl, scorer), 5),
            })
    return sorted(out, key=lambda r: -r["score"])


def rank_of_true_edges(market, scores: list) -> list:
    """Where the real links sit in the ranked list. The clearest diagnostic."""
    truth = market.true_edge_set()
    return sorted(i + 1 for i, r in enumerate(scores)
                  if (r["src"], r["dst"]) in truth)


def select_edges(scores: list, threshold: float) -> set:
    return {(r["src"], r["dst"]) for r in scores if r["score"] >= threshold}


def score_recovery(market, scores: list, threshold: float) -> dict:
    """Precision and recall against the constructed edge set."""
    truth = market.true_edge_set()
    picked = select_edges(scores, threshold)
    tp = len(picked & truth)
    fp = len(picked - truth)
    fn = len(truth - picked)
    prec = tp / (tp + fp) if (tp + fp) else 0.0
    rec = tp / (tp + fn) if (tp + fn) else 0.0
    return {"threshold": round(threshold, 5), "tp": tp, "fp": fp, "fn": fn,
            "precision": round(prec, 4), "recall": round(rec, 4),
            "f1": round(2 * prec * rec / (prec + rec), 4) if (prec + rec) else 0.0,
            "n_selected": len(picked), "n_true": len(truth)}


def threshold_sweep(market, scores: list, n: int = 14) -> list:
    vals = [r["score"] for r in scores if r["score"] > 0]
    if not vals:
        return []
    lo, hi = float(np.percentile(vals, 50)), float(max(vals))
    return [score_recovery(market, scores, t)
            for t in np.linspace(lo, hi * 0.95, n)]


def propagate(market, shocked: str, magnitude: float = -0.20,
              rounds: int = 4, decay: float = 1.0) -> dict:
    """Push a shock through the TRUE edge set and record where it lands.

    Uses the constructed edges deliberately. Propagating through estimated edges
    would compound estimation error and produce a confident-looking fan-out that
    is mostly artefact; this separates "can we recover the network" from "given
    a network, what does a shock do".
    """
    # Only newly-received impact re-transmits. Carrying the accumulated total
    # forward each round makes every node re-emit its whole balance, which
    # compounds: a -20% shock to CRY1 produced 104% of total absolute impact,
    # five times the energy that entered the system.
    total = {n: 0.0 for n in market.names}
    total[shocked] = magnitude
    wave = {shocked: magnitude}
    history = [dict(total)]
    for r in range(rounds):
        nxt: dict = {}
        for src, dst, strength, tail_only in market.true_edges:
            if abs(wave.get(src, 0.0)) > 1e-9:
                nxt[dst] = nxt.get(dst, 0.0) + wave[src] * strength * (decay ** r)
        if not nxt:
            history.append(dict(total))
            break
        for k, v in nxt.items():
            total[k] += v
        wave = nxt
        history.append(dict(total))
    impact = total
    reached = [n for n, v in impact.items() if abs(v) > 1e-6 and n != shocked]
    return {
        "shocked": shocked, "magnitude": magnitude, "rounds": rounds,
        "final": {k: round(v, 6) for k, v in impact.items()},
        "n_reached": len(reached),
        "reached": sorted(reached, key=lambda n: abs(impact[n]), reverse=True),
        "total_absolute_impact": round(
            sum(abs(v) for k, v in impact.items() if k != shocked), 6),
        "history": [{k: round(v, 6) for k, v in h.items()} for h in history],
    }
