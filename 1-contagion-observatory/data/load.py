"""Build a Market from the real price tape.

The same limit applies here as everywhere else in this portfolio: real data
answers a different question than synthetic data, and pretending otherwise is
the failure mode worth guarding against.

On the synthetic market the true edges are known, so edge recovery can be
scored -- that is the whole reason the synthetic market exists. On the real
tape nobody knows which links genuinely transmit; that is the open question.
So `--real` produces a RANKING and a shock propagation, and reports no recovery
precision, because there is nothing to score against.

What the real tape does test, and the synthetic one cannot: whether the method
survives real return distributions -- fat tails, weekend gaps in crypto that
equities do not have, and a common factor far stronger than anything simulated.
"""
from __future__ import annotations

import pathlib

import numpy as np

from .datakit import Fetcher, FetchError
from .marketdata import (align, parse_french_industries, parse_stooq,
                         to_returns)

ROOT = pathlib.Path(__file__).resolve().parent

CLASSES = {
    "btcusd": "crypto", "ethusd": "crypto",
    "coin.us": "equity", "mstr.us": "equity", "gbtc.us": "equity",
    "xlf.us": "equity", "spy.us": "equity", "xle.us": "equity",
    "tlt.us": "equity",
}


def load_market(root=ROOT, min_days: int = 250, recent_days: int = 756):
    """Return (Market, provenance). Raises if the real cache is empty.

    Two real sources are supported. If the Fama-French 10 industry portfolios
    are cached, they are used: ten daily return series on one calendar. This is
    the live path, because the per-ticker Stooq feed is now bot-walled. The
    Stooq price path is kept as a fallback for any cache that still holds it.
    """
    f = Fetcher(root)
    man = f.load_manifest()
    french = {k: v for k, v in man["files"].items()
              if k.startswith("french/") and "industr" in k.lower()}
    if french:
        return _load_market_french(f, french, min_days, recent_days)
    return _load_market_stooq(f, man, min_days)


def _load_market_french(f, french, min_days, recent_days):
    """Build a Market from the Fama-French 10 industry daily portfolios.

    The file is already returns, not prices, so it does not pass through
    to_returns. It runs back to 1926; only the most recent `recent_days`
    trading days are kept so the sample is modern and free of the -99.99
    missing-data sentinels that appear in the early history.
    """
    from src.market import Market

    dest, rec = sorted(french.items())[0]
    dates_all, data = parse_french_industries((f.raw / dest).read_bytes())
    if recent_days and len(dates_all) > recent_days:
        dates_all = dates_all[-recent_days:]
        data = {c: v[-recent_days:] for c, v in data.items()}

    series = {c: (dates_all, rets) for c, rets in data.items()}
    if len(series) < 3:
        raise FetchError(f"only {len(series)} usable series; need at least 3")

    dates, aligned = align(series)
    if len(dates) < min_days:
        raise FetchError(
            f"only {len(dates)} trading days in the French industries sample; "
            f"need {min_days}. Widen recent_days in data/load.py.")

    names = sorted(aligned)
    R = np.column_stack([aligned[n] for n in names])   # already returns
    prov = [{"symbol": n, "status": "ok", "n_returns": R.shape[0],
             "first": str(dates[0]), "last": str(dates[-1]),
             "sha256": rec["sha256"][:16], "url": rec["url"]} for n in names]

    market = Market(
        names=names,
        returns=R,
        true_edges=[],          # unknown on real data, and left empty on purpose
        stress_days=_stress_days(R),
        classes={n: "equity" for n in names},   # industry portfolios, all equity
    )
    meta = {
        "n_days": R.shape[0], "n_assets": R.shape[1],
        "first_date": str(dates[0]), "last_date": str(dates[-1]),
        "series": prov,
        "data_source": (
            "real daily value-weighted returns of the Fama-French 10 industry "
            "portfolios (Kenneth R. French Data Library; see data/MANIFEST.json "
            "for the URL, sha256 and retrieval time)"),
        "ground_truth_available": False,
        "recovery_withheld_because":
            "the real transmission graph is unknown -- that is the question, "
            "not the answer -- so edge-recovery precision has no denominator",
    }
    return market, meta


def _load_market_stooq(f, man, min_days: int):
    """Build a Market from a cached Stooq price tape (fallback path)."""
    from src.market import Market

    cached = {k: v for k, v in man["files"].items() if k.startswith("stooq/")}
    if not cached:
        raise FetchError(
            "no real price data cached. Run `python -m data.fetch` in a "
            "networked environment first; this project will not pass the "
            "simulated market off as a real one.")

    series, prov = {}, []
    for dest, rec in sorted(cached.items()):
        sym = pathlib.Path(dest).stem
        try:
            dates, closes = parse_stooq((f.raw / dest).read_bytes())
        except ValueError as exc:
            prov.append({"symbol": sym, "status": f"unusable: {exc}"})
            continue
        series[sym] = (dates, closes)
        prov.append({"symbol": sym, "status": "ok", "n_closes": len(closes),
                     "first": str(dates[0]), "last": str(dates[-1]),
                     "sha256": rec["sha256"][:16], "url": rec["url"]})

    if len(series) < 3:
        raise FetchError(f"only {len(series)} usable series; need at least 3")

    dates, aligned = align(series)
    if len(dates) < min_days:
        raise FetchError(
            f"only {len(dates)} overlapping trading days across "
            f"{len(series)} symbols; need {min_days}. Crypto trades daily and "
            f"equities do not, so the intersection is bounded by the equity "
            f"calendar -- widen the date range in data/fetch.py.")

    names = sorted(aligned)
    R = np.column_stack([to_returns(aligned[n]) for n in names])

    market = Market(
        names=names,
        returns=R,
        true_edges=[],          # unknown on real data, and left empty on purpose
        stress_days=_stress_days(R),
        classes={n: CLASSES.get(n, "equity") for n in names},
    )
    meta = {
        "n_days": R.shape[0], "n_assets": R.shape[1],
        "first_date": str(dates[0]), "last_date": str(dates[-1]),
        "series": prov,
        "data_source": (
            "real daily closes from Stooq (see data/MANIFEST.json for URLs, "
            "hashes and retrieval times)"),
        "ground_truth_available": False,
        "recovery_withheld_because":
            "the real transmission graph is unknown -- that is the question, "
            "not the answer -- so edge-recovery precision has no denominator",
    }
    return market, meta


def _stress_days(R: np.ndarray, q: float = 0.10) -> np.ndarray:
    """Days in the worst decile of cross-sectional average return.

    Defined from the data rather than declared, because on a real tape nobody
    hands you a stress flag.
    """
    avg = R.mean(axis=1)
    return avg <= np.quantile(avg, q)
