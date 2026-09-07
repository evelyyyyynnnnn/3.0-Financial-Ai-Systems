import pathlib
import sys

import numpy as np

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from src.analytics import (amihud_illiquidity, analyse, effective_holders, gini,
                           hhi, latency_by_window, redemption_stats, roll_spread,
                           top_n_share, trade_gap_stats, turnover)
from src.chain import Redemption, make_token, make_universe, _pareto_holdings


# --- concentration on known inputs ---------------------------------------

def test_hhi_of_equal_holders_is_one_over_n():
    for n in (2, 5, 20):
        assert abs(hhi(np.ones(n)) - 1.0 / n) < 1e-12


def test_hhi_of_a_single_holder_is_one():
    assert hhi(np.array([100.0, 0, 0])) == 1.0


def test_effective_holders_recovers_the_count():
    assert abs(effective_holders(np.ones(25)) - 25.0) < 1e-9


def test_gini_is_zero_for_equality_and_near_one_for_monopoly():
    assert abs(gini(np.ones(50))) < 1e-9
    assert gini(np.array([0.0] * 49 + [1.0])) > 0.9


def test_top_n_share_is_the_largest_holders():
    h = np.array([1.0, 2, 3, 4, 90])
    assert abs(top_n_share(h, 1) - 0.9) < 1e-9


def test_concentration_is_monotone_in_the_tail_parameter():
    """The check that the measure tracks what its name says."""
    means = []
    for alpha in (0.7, 1.1, 2.0, 3.0):
        vals = [hhi(_pareto_holdings(150, alpha, 1e6, np.random.default_rng(s)))
                for s in range(10)]
        means.append(float(np.mean(vals)))
    assert means == sorted(means, reverse=True), means


# --- liquidity -----------------------------------------------------------

def test_amihud_rises_as_depth_falls():
    """Regression: this measure was inverted before the generator had impact.

    With no price impact in the price process, Amihud reads noise and ranked the
    thinnest token as the most liquid.
    """
    vals = []
    for depth in (1_000_000.0, 300_000.0, 80_000.0, 25_000.0):
        t = make_token("X", n_days=90, trades_per_day=12.0, depth=depth,
                       stress_day=None, seed=11)
        vals.append(amihud_illiquidity(t.prices(), t.sizes()))
    assert vals == sorted(vals), f"Amihud not monotone in depth: {vals}"


def test_roll_spread_returns_nan_when_the_model_does_not_apply():
    trending = np.cumsum(np.ones(50)) + 100.0     # positive autocovariance
    assert roll_spread(trending) != roll_spread(trending)   # NaN


def test_roll_spread_is_positive_on_a_bouncing_series():
    p = 100.0 + np.array([0, 1, 0, 1, 0, 1, 0, 1, 0, 1.0] * 5)
    v = roll_spread(p)
    assert v == v and v > 0


def test_turnover_scales_with_volume():
    a = turnover(np.array([100.0] * 10), 1000.0, 365.0)
    b = turnover(np.array([200.0] * 10), 1000.0, 365.0)
    assert abs(b - 2 * a) < 1e-9


def test_trade_gaps_are_reported_in_hours():
    times = np.array([0.0, 3600.0, 7200.0])
    s = trade_gap_stats(times)
    assert abs(s["median_gap_h"] - 1.0) < 1e-9
    assert s["n_trades"] == 3


def test_thin_tokens_have_longer_gaps():
    thin = make_token("T", trades_per_day=3.0, stress_day=None, seed=2)
    thick = make_token("K", trades_per_day=30.0, stress_day=None, seed=2)
    assert (trade_gap_stats(thin.times())["p95_gap_h"]
            > trade_gap_stats(thick.times())["p95_gap_h"])


# --- redemption ----------------------------------------------------------

def test_redemption_stats_count_unsettled():
    reds = [Redemption(0, 3600, 1.0), Redemption(0, None, 1.0)]
    s = redemption_stats(reds)
    assert s["n"] == 2 and s["n_unsettled"] == 1
    assert abs(s["unsettled_share"] - 0.5) < 1e-9


def test_latency_ratio_detects_a_stress_window():
    reds = ([Redemption(t, t + 3600, 1.0) for t in range(0, 100_000, 5_000)]
            + [Redemption(t, t + 36_000, 1.0)
               for t in range(200_000, 260_000, 5_000)])
    out = latency_by_window(reds, (200_000, 260_000))
    assert out["ratio"] > 5.0


def test_no_stress_window_gives_a_ratio_near_one():
    reds = [Redemption(t, t + 3600, 1.0) for t in range(0, 200_000, 2_000)]
    out = latency_by_window(reds, (100_000, 120_000))
    assert 0.5 < out["ratio"] < 2.0


def test_generated_stress_lengthens_the_queue():
    t = make_token("S", stress_day=70, seed=5)
    out = latency_by_window(t.redemptions, t.stress_window)
    assert out["ratio"] > 2.0


# --- end to end ----------------------------------------------------------

def test_analyse_returns_every_section():
    t = make_token("A", seed=1)
    out = analyse(t)
    assert set(out) == {"symbol", "concentration", "liquidity", "redemption", "stress"}


def test_universe_spans_the_liquidity_range():
    uni = make_universe(seed=3)
    am = [amihud_illiquidity(t.prices(), t.sizes()) for t in uni]
    assert max(am) / min(am) > 3.0, "universe does not span a useful range"


def test_all_metrics_are_finite_across_the_universe():
    for t in make_universe(seed=3):
        c = analyse(t)["concentration"]
        assert all(np.isfinite(v) for v in c.values() if isinstance(v, float))
