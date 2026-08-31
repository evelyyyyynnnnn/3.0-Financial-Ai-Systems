import pathlib
import sys

import numpy as np

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from src.contagion import (SCORERS, edge_scores, lagged_corr,
                           lower_tail_dependence, partial_out_factor, propagate,
                           rank_of_true_edges, score_recovery, select_edges,
                           tail_lift, threshold_sweep)
from src.market import make_market, _topological


# --- primitives on known inputs ------------------------------------------

def test_tail_dependence_of_independent_series_is_about_q():
    rng = np.random.default_rng(0)
    x, y = rng.normal(size=6000), rng.normal(size=6000)
    assert abs(lower_tail_dependence(x, y, 0.10) - 0.10) < 0.04


def test_tail_dependence_of_identical_series_is_one():
    rng = np.random.default_rng(1)
    x = rng.normal(size=2000)
    assert lower_tail_dependence(x, x, 0.10) == 1.0


def test_tail_lift_is_one_for_independence():
    rng = np.random.default_rng(2)
    x, y = rng.normal(size=8000), rng.normal(size=8000)
    assert abs(tail_lift(x, y, 0.10) - 1.0) < 0.4


def test_lagged_corr_is_directional():
    rng = np.random.default_rng(3)
    x = rng.normal(size=3000)
    y = np.concatenate([[0.0], 0.8 * x[:-1]]) + rng.normal(0, 0.2, 3000)
    assert lagged_corr(x, y, 1) > 0.6
    assert abs(lagged_corr(y, x, 1)) < 0.3


def test_partial_out_factor_removes_the_common_component():
    rng = np.random.default_rng(4)
    f = rng.normal(size=1200)
    R = np.column_stack([f * (0.5 + 0.1 * i) + rng.normal(0, 0.15, 1200)
                         for i in range(6)])
    before = np.mean(np.abs(np.corrcoef(R.T)[np.triu_indices(6, 1)]))
    after = np.mean(np.abs(np.corrcoef(partial_out_factor(R).T)[np.triu_indices(6, 1)]))
    assert after < before / 2


# --- generator integrity -------------------------------------------------

def test_topological_order_builds_sources_first():
    edges = [("B", "C", 0.3, False), ("A", "B", 0.4, False)]
    order = [e[0] for e in _topological(edges)]
    assert order.index("A") < order.index("B")


def test_edges_are_applied_once_not_twice():
    """Regression: a two-pass loop silently doubled every link's strength."""
    m = make_market(seed=17)
    i, j = m.index("CRY3"), m.index("CRY4")
    R = m.returns
    est = lagged_corr(R[:, i], R[:, j], 1)
    # A doubled 0.40 link would push the lead-lag correlation implausibly high.
    assert est < 0.95, f"lead-lag {est:.3f} suggests the edge was applied twice"


def test_market_has_stress_and_calm_periods():
    m = make_market(seed=17)
    assert 0.05 < m.stress_days.mean() < 0.6


def test_crypto_is_more_volatile_than_equity():
    m = make_market(seed=17)
    cry = np.mean([m.returns[:, m.index(n)].std()
                   for n in m.names if n.startswith("CRY")])
    eq = np.mean([m.returns[:, m.index(n)].std()
                  for n in m.names if n.startswith("EQ")])
    assert cry > eq


# --- the central finding -------------------------------------------------

def test_factor_removal_separates_linked_from_unlinked_pairs():
    """On raw returns, unlinked pairs look as tail-dependent as real links."""
    m = make_market(seed=17)
    truth = m.true_edge_set()
    rng = np.random.default_rng(0)

    def mean_lift(R, pairs):
        return float(np.nanmean([tail_lift(R[:, m.index(a)], R[:, m.index(b)])
                                 for a, b in pairs]))

    unlinked = []
    while len(unlinked) < 40:
        i, j = rng.integers(0, len(m.names), 2)
        if i != j and (m.names[i], m.names[j]) not in truth:
            unlinked.append((m.names[i], m.names[j]))

    raw_gap = mean_lift(m.returns, truth) - mean_lift(m.returns, unlinked)
    Rr = partial_out_factor(m.returns)
    res_gap = mean_lift(Rr, truth) - mean_lift(Rr, unlinked)
    assert res_gap > raw_gap, (
        f"factor removal did not improve separation: raw {raw_gap:.2f}, "
        f"residual {res_gap:.2f}")


def test_lagged_corr_alone_beats_the_product_scorer():
    """The original design loses. Guards the comparison published on the site."""
    m = make_market(seed=17)
    lc = rank_of_true_edges(m, edge_scores(m, scorer="lagged_corr"))
    pr = rank_of_true_edges(m, edge_scores(m, scorer="product"))
    assert np.median(lc) < np.median(pr)


def test_every_scorer_is_runnable():
    m = make_market(seed=17)
    for s in SCORERS:
        sc = edge_scores(m, scorer=s)
        assert len(sc) == len(m.names) * (len(m.names) - 1)


def test_true_edges_rank_above_chance():
    m = make_market(seed=17)
    sc = edge_scores(m)
    ranks = rank_of_true_edges(m, sc)
    assert np.median(ranks) < len(sc) / 3, f"ranks {ranks} of {len(sc)}"


def test_recovery_reaches_full_recall_somewhere_on_the_sweep():
    m = make_market(seed=17)
    sweep = threshold_sweep(m, edge_scores(m))
    assert max(r["recall"] for r in sweep) == 1.0


def test_recovery_counts_are_consistent():
    m = make_market(seed=17)
    sc = edge_scores(m)
    r = score_recovery(m, sc, threshold=0.05)
    assert r["tp"] + r["fn"] == r["n_true"]
    assert r["tp"] + r["fp"] == r["n_selected"]


# --- propagation ---------------------------------------------------------

def test_no_node_exceeds_the_original_shock():
    """Regression: nodes re-emitted their accumulated balance every round.

    Summing impact across a BRANCHING network can legitimately exceed the shock
    -- CRY1 has three outbound edges, so a 20% shock produces more than 20% of
    total absolute movement without anything being wrong. This model reports
    sensitivities, not a conserved flow, so the total is the wrong invariant to
    assert on.

    What compounding actually violates is per-node decay: with every edge
    strength below 1, no downstream node can move further than the asset that
    was shocked. The bug produced exactly that, and this catches it.
    """
    m = make_market(seed=17)
    out = propagate(m, "CRY1", magnitude=-0.20, rounds=6)
    for name, val in out["final"].items():
        if name == "CRY1":
            continue
        assert abs(val) < 0.20, f"{name} moved {val:.4f}, more than the shock"


def test_impact_decays_along_a_chain():
    """CRY1 -> CRY2 -> EQ2. Each hop must be strictly smaller."""
    m = make_market(seed=17)
    f = propagate(m, "CRY1", magnitude=-0.20, rounds=6)["final"]
    assert abs(f["CRY1"]) > abs(f["CRY2"]) > abs(f["EQ2"]) > 0


def test_doubling_the_shock_doubles_the_response():
    """The cascade is linear, so this must hold exactly."""
    m = make_market(seed=17)
    a = propagate(m, "CRY1", magnitude=-0.10)["final"]
    b = propagate(m, "CRY1", magnitude=-0.20)["final"]
    for k in a:
        assert abs(b[k] - 2 * a[k]) < 1e-9


def test_shock_reaches_downstream_assets_only():
    m = make_market(seed=17)
    out = propagate(m, "CRY3", magnitude=-0.20)
    assert out["reached"] == ["CRY4"]


def test_isolated_asset_transmits_nothing():
    m = make_market(seed=17)
    assert propagate(m, "EQ7", magnitude=-0.20)["n_reached"] == 0


def test_crypto_hub_reaches_equities():
    """The crypto-to-equity path is the phenomenon of interest."""
    m = make_market(seed=17)
    reached = propagate(m, "CRY1", magnitude=-0.20)["reached"]
    assert any(n.startswith("EQ") for n in reached)


def test_selection_is_monotone_in_threshold():
    m = make_market(seed=17)
    sc = edge_scores(m)
    a = select_edges(sc, 0.02)
    b = select_edges(sc, 0.20)
    assert b <= a
