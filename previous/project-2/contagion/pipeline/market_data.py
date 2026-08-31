"""Price history for equities and crypto.

Two free sources, neither needing a key:

  equities  Stooq daily CSV  (https://stooq.com/q/d/l/?s=aapl.us&i=d)
  crypto    CoinGecko market_chart (https://api.coingecko.com/api/v3/...)

Both are rate-limited and neither is a contractual data feed, so this is for
research use. Failures are per-symbol: one bad ticker never aborts a run.
"""
from __future__ import annotations

import csv
import io
import json
import time
import urllib.error
import urllib.request

STOOQ = "https://stooq.com/q/d/l/?s={sym}.us&i=d"
COINGECKO = ("https://api.coingecko.com/api/v3/coins/{id}/market_chart"
             "?vs_currency=usd&days={days}&interval=daily")

MIN_INTERVAL = 1.2   # CoinGecko's free tier is strict; be a good citizen.
_last = 0.0


class MarketDataError(RuntimeError):
    pass


def _get(url: str) -> str:
    global _last
    wait = MIN_INTERVAL - (time.monotonic() - _last)
    if wait > 0:
        time.sleep(wait)
    req = urllib.request.Request(url, headers={
        "User-Agent": "contagion-observatory/1.0 (research)",
        "Accept": "text/csv, application/json",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        raise MarketDataError(f"{e.code} from {url}") from e
    except urllib.error.URLError as e:
        raise MarketDataError(f"cannot reach {url}: {e.reason}") from e
    finally:
        _last = time.monotonic()


def equity_prices(symbol: str, limit: int = 400) -> list[tuple[str, float]]:
    """Daily closes for a US equity or ETF, oldest first."""
    text = _get(STOOQ.format(sym=symbol.lower()))
    if not text.lstrip().lower().startswith("date"):
        raise MarketDataError(f"unexpected response for {symbol}: {text[:80]!r}")
    rows = []
    for row in csv.DictReader(io.StringIO(text)):
        try:
            rows.append((row["Date"], float(row["Close"])))
        except (KeyError, ValueError):
            continue
    if not rows:
        raise MarketDataError(f"no rows for {symbol}")
    return rows[-limit:]


def crypto_prices(coin_id: str, days: int = 400) -> list[tuple[str, float]]:
    """Daily closes for a CoinGecko coin id (e.g. 'bitcoin'), oldest first."""
    from datetime import datetime, timezone
    data = json.loads(_get(COINGECKO.format(id=coin_id, days=days)))
    prices = data.get("prices") or []
    if not prices:
        raise MarketDataError(f"no prices for {coin_id}")
    out = []
    for ms, px in prices:
        d = datetime.fromtimestamp(ms / 1000, tz=timezone.utc).strftime("%Y-%m-%d")
        out.append((d, float(px)))
    return out


def align(series: dict[str, list[tuple[str, float]]]) -> dict[str, list[float]]:
    """Restrict every series to the dates all of them share.

    Necessary because crypto trades weekends and equities do not. Comparing
    unaligned series would put a Monday equity move next to a Saturday crypto
    move and report the mismatch as a lead-lag relationship.
    """
    if not series:
        return {}
    common = set.intersection(*(set(d for d, _ in rows) for rows in series.values()))
    if not common:
        raise MarketDataError("series share no common dates")
    dates = sorted(common)
    return {name: [dict(rows)[d] for d in dates] for name, rows in series.items()}, dates
