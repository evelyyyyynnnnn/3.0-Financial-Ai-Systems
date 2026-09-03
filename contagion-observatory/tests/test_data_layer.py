"""Tests for the real-data layer.

The download cannot be tested without a network. Everything else can: that the
sources' real response quirks are parsed correctly, that series on different
trading calendars are aligned by date rather than by position, and that asking
for real data with an empty cache refuses instead of quietly returning the
simulated market.
"""
import datetime as dt
import io
import json
import pathlib
import sys
import zipfile

import numpy as np
import pytest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from data import datakit
from data.marketdata import (align, parse_coingecko, parse_french, parse_fred,
                             parse_stooq, stooq_source, to_returns)

D = dt.date.fromisoformat


# --- Stooq -----------------------------------------------------------------

def test_parse_stooq_drops_halted_sessions_rather_than_zero_filling():
    raw = (b"Date,Open,High,Low,Close,Volume\n"
           b"2024-01-02,470,472,469,471.5,80000000\n"
           b"2024-01-03,471,473,468,469.25,75000000\n"
           b"2024-01-04,469,470,,,0\n"                 # halted: empty close
           b"2024-01-05,470,474,470,473.0,71000000\n")
    dates, closes = parse_stooq(raw)
    # A zero-filled close would show as a -100% return and dominate every
    # correlation in the panel.
    assert closes == [471.5, 469.25, 473.0]
    assert D("2024-01-04") not in dates


def test_parse_stooq_rejects_the_200_ok_no_data_response():
    """Stooq answers an unknown symbol with HTTP 200 and the body 'No data'."""
    with pytest.raises(ValueError, match="market suffix"):
        parse_stooq(b"No data")


def test_parse_stooq_rejects_an_html_error_page():
    with pytest.raises(ValueError):
        parse_stooq(b"<html><body>Service unavailable</body></html>")


def test_stooq_source_formats_dates_without_dashes():
    s = stooq_source("spy.us", "2023-01-03", "2024-12-31")
    assert "d1=20230103" in s.url and "d2=20241231" in s.url
    assert s.dest == "stooq/spy.us.csv"


# --- Fama-French -----------------------------------------------------------

def _french_zip():
    inner = (
        "This file was created using the CRSP database.\n"
        "\n"
        ",Mkt-RF,SMB,HML,RF\n"
        "20240102,-0.55,0.21,-0.13,0.021\n"
        "20240103,-0.80,0.05,0.44,0.021\n"
        "20240104,0.35,-0.11,0.07,0.021\n"
        "\n"
        "Annual Factors: January-December\n"
        "\n"
        ",Mkt-RF,SMB,HML,RF\n"
        "2024,23.53,-3.60,-9.20,5.32\n")
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("F-F_Research_Data_Factors_daily.CSV", inner)
    return buf.getvalue()


def test_parse_french_stops_at_the_annual_block():
    """The annual block follows the daily block in the same file.

    Reading past the blank line mixes a +23.53% annual return into a series of
    daily returns, which inflates the volatility estimate and produces a Sharpe
    ratio wrong by roughly the square root of the trading year.
    """
    dates, data = parse_french(_french_zip())
    assert len(dates) == 3
    assert max(abs(v) for v in data["Mkt-RF"]) < 0.05


def test_parse_french_converts_percent_to_decimal():
    _, data = parse_french(_french_zip())
    assert data["Mkt-RF"][0] == pytest.approx(-0.0055)
    assert data["RF"][0] == pytest.approx(0.00021)


# --- CoinGecko and FRED ----------------------------------------------------

def test_parse_coingecko_converts_epoch_millis():
    raw = json.dumps({"prices": [[1704153600000, 42000.5],
                                 [1704240000000, 44100.25]]}).encode()
    dates, closes = parse_coingecko(raw)
    assert closes == [42000.5, 44100.25]
    assert all(isinstance(d, dt.date) for d in dates)


def test_parse_fred_skips_the_dot_used_for_holidays():
    # float('.') raises; FRED writes '.' on every market holiday.
    dates, vals = parse_fred(b"DATE,DGS10\n2024-01-01,.\n2024-01-02,3.95\n")
    assert vals == [3.95]


# --- alignment -------------------------------------------------------------

def test_align_intersects_calendars_instead_of_shifting():
    """Crypto trades weekends; equities do not.

    Zipping the two by position silently pairs a Monday crypto return with a
    Friday equity return, and every lead-lag statistic downstream is then
    measuring the calendar rather than the market.
    """
    eq = ([D("2024-01-02"), D("2024-01-03"), D("2024-01-05")], [100., 101., 103.])
    cr = ([D("2024-01-02"), D("2024-01-03"), D("2024-01-04"), D("2024-01-05")],
          [1., 1.1, 1.2, 1.3])
    common, out = align({"eq": eq, "crypto": cr})
    assert common == [D("2024-01-02"), D("2024-01-03"), D("2024-01-05")]
    assert out["crypto"] == [1.0, 1.1, 1.3]     # 01-04 dropped, nothing shifted


def test_align_refuses_non_overlapping_series():
    with pytest.raises(ValueError, match="overlapping"):
        align({"a": ([D("2024-01-02")], [1.]), "b": ([D("2024-06-03")], [1.])})


def test_to_returns_is_one_shorter_than_prices():
    assert to_returns([100., 110., 99.]) == pytest.approx([0.1, -0.1])


# --- the fallback guard ----------------------------------------------------

def test_load_market_refuses_when_no_real_data_is_cached(tmp_path):
    """The property that matters most: --real must never silently simulate."""
    from data.load import load_market
    with pytest.raises(datakit.FetchError, match="no real price data cached"):
        load_market(root=tmp_path)


def _seed(root, symbols=("btcusd", "spy.us", "coin.us", "xle.us"), n=400, seed=3):
    """Write Stooq-shaped CSVs into a cache the way data.fetch would."""
    rng = np.random.default_rng(seed)
    f = datakit.Fetcher(root)
    man = f.load_manifest()
    start = dt.date(2023, 1, 2)
    common = rng.normal(0, 0.01, n)              # a market factor, as in reality
    for k, sym in enumerate(symbols):
        px, p = [], 100.0
        r = common * (0.9 if k else 0.4) + rng.normal(0, 0.012, n)
        lines = ["Date,Open,High,Low,Close,Volume"]
        d = start
        for i in range(n):
            p *= (1 + r[i])
            # Crypto trades every day; equities only on weekdays.
            while sym.endswith(".us") and d.weekday() >= 5:
                d += dt.timedelta(days=1)
            lines.append(f"{d.isoformat()},{p:.4f},{p:.4f},{p:.4f},{p:.4f},1000")
            d += dt.timedelta(days=1)
        raw = ("\n".join(lines) + "\n").encode()
        dest = f"stooq/{sym}.csv"
        (f.raw / "stooq").mkdir(parents=True, exist_ok=True)
        (f.raw / dest).write_bytes(raw)
        man["files"][dest] = {
            "source": f"Stooq {sym}", "url": f"https://stooq.com/q/d/l/?s={sym}",
            "publisher": "Stooq", "terms": "free for research",
            "sha256": datakit.sha256_file(f.raw / dest), "bytes": len(raw),
            "retrieved_utc": datakit.utc_now(),
        }
    f._write_manifest(man)
    return f


def test_load_market_builds_a_market_with_no_true_edges(tmp_path):
    """Real data has no answer key, and the Market must say so with an empty set."""
    from data.load import load_market
    _seed(tmp_path)
    market, meta = load_market(root=tmp_path)

    assert market.returns.shape[1] == 4
    assert market.returns.shape[0] == meta["n_days"]
    assert market.true_edges == []
    assert meta["ground_truth_available"] is False
    assert market.classes["btcusd"] == "crypto"
    assert market.classes["spy.us"] == "equity"
    # Provenance survives into the result: hash and URL per symbol.
    assert all(p["sha256"] for p in meta["series"] if p["status"] == "ok")


def test_real_market_is_aligned_on_the_equity_calendar(tmp_path):
    """Weekend crypto days have no equity counterpart and must be dropped."""
    _seed(tmp_path)
    from data.load import load_market
    market, meta = load_market(root=tmp_path)
    # 400 calendar days of crypto vs weekdays only for equities: the
    # intersection must be strictly smaller than the crypto series.
    assert meta["n_days"] < 400
    assert not np.isnan(market.returns).any()


def test_stress_days_are_derived_not_declared(tmp_path):
    _seed(tmp_path)
    from data.load import load_market
    market, _ = load_market(root=tmp_path)
    # The worst decile by construction, because a real tape ships no flag.
    assert market.stress_days.sum() == pytest.approx(
        0.10 * market.returns.shape[0], abs=2)


def test_edge_scoring_runs_on_the_real_market(tmp_path):
    """The end that matters: the analysis executes on real-shaped input."""
    _seed(tmp_path)
    from data.load import load_market
    from src.contagion import edge_scores, propagate
    market, _ = load_market(root=tmp_path)

    scores = edge_scores(market)
    n = len(market.names)
    assert len(scores) == n * (n - 1)              # every ordered pair
    assert all(s["score"] == s["score"] for s in scores)   # no NaN leaked
    assert scores == sorted(scores, key=lambda r: -r["score"])

    sh = propagate(market, "btcusd", magnitude=-0.20)
    assert isinstance(sh, dict)


def test_too_few_overlapping_days_is_an_error_not_a_silent_short_sample(tmp_path):
    _seed(tmp_path, symbols=("btcusd", "spy.us", "coin.us"), n=40)
    from data.load import load_market
    with pytest.raises(datakit.FetchError, match="overlapping trading days"):
        load_market(root=tmp_path, min_days=250)
