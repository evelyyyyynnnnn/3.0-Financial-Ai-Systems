"""Build TokenHistory objects from the cached transfer tape."""
from __future__ import annotations

import pathlib

import numpy as np

from .datakit import Fetcher, FetchError
from .onchain import (TOKENS, block_to_time, parse_block_timestamp, parse_logs,
                      reconstruct_balances)

ROOT = pathlib.Path(__file__).resolve().parent
DUST = 1e-9        # a balance below this is rounding, not a holder


def load_tokens(root=ROOT):
    """Return (histories, provenance). Refuses when nothing real is cached."""
    from src.chain import Trade, TokenHistory

    f = Fetcher(root)
    man = f.load_manifest()
    log_files = sorted(k for k in man["files"] if "-logs-" in k)
    if not log_files:
        raise FetchError(
            "no on-chain transfer data cached. Run `python -m data.fetch` in a "
            "networked environment first; this project will not present a "
            "simulated tape as an on-chain record.")

    lo_ts = hi_ts = lo_block = hi_block = None
    if (f.raw / "chain/block-lo.json").exists():
        lo_ts = parse_block_timestamp((f.raw / "chain/block-lo.json").read_bytes())
    if (f.raw / "chain/block-hi.json").exists():
        hi_ts = parse_block_timestamp((f.raw / "chain/block-hi.json").read_bytes())

    by_symbol: dict = {}
    for dest in log_files:
        sym = pathlib.Path(dest).name.split("-logs-")[0].upper()
        meta = TOKENS.get(sym)
        if meta is None:
            continue
        try:
            rows = parse_logs((f.raw / dest).read_bytes(), meta["decimals"])
        except ValueError:
            continue
        by_symbol.setdefault(sym, []).extend(rows)

    histories, prov = [], []
    for sym, transfers in sorted(by_symbol.items()):
        if not transfers:
            prov.append({"symbol": sym, "status": "no transfers in the window"})
            continue
        transfers.sort(key=lambda r: r["block"])
        blocks = [t["block"] for t in transfers]
        lo_block, hi_block = min(blocks), max(blocks)

        if lo_ts is None or hi_ts is None:
            # Without endpoint timestamps, block height is the only clock.
            times = [t["block"] for t in transfers]
            time_basis = "block height (no block timestamps cached)"
        else:
            times = [block_to_time(b, lo_block, lo_ts, hi_block, hi_ts)
                     for b in blocks]
            time_basis = "interpolated between the window's endpoint timestamps"

        rec = reconstruct_balances(transfers)
        held = np.array(sorted((v for v in rec["balances"].values() if v > DUST),
                               reverse=True), dtype=float)

        trades = [
            # price is NaN on purpose: a Transfer event carries no price, and
            # inventing one would make the price-based liquidity statistics
            # look computable when they are not.
            Trade(t=int(ts), price=float("nan"), size=float(tr["value"]),
                  side=1)
            for ts, tr in zip(times, transfers)
        ]

        histories.append(TokenHistory(
            symbol=sym, trades=trades, holders=held, redemptions=[],
            stress_window=(0, 0),
            note=f"on-chain ERC-20 transfers for {TOKENS[sym]['address']}; "
                 f"prices unavailable (a transfer is not a trade)",
        ))
        prov.append({
            "symbol": sym, "status": "ok", "address": TOKENS[sym]["address"],
            "fund": TOKENS[sym]["note"],
            "n_transfers": len(transfers),
            "first_block": lo_block, "last_block": hi_block,
            "n_addresses_with_balance": int(len(held)),
            "observed_supply_change": round(rec["minted"] - rec["burned"], 6),
            "time_basis": time_basis,
        })

    if not histories:
        raise FetchError("no token in the cache had any transfers in the window")

    return histories, {
        "source": "Ethereum mainnet, read through a public RPC endpoint",
        "n_tokens": len(histories),
        "prices_available": False,
        "price_metrics_withheld_because":
            "an ERC-20 Transfer event carries a value and two addresses and no "
            "price. Amihud illiquidity and the Roll spread are both built on "
            "price changes, so neither can be computed from a transfer tape; "
            "and a fund redeeming at net asset value may have no market price "
            "to find at all.",
        "holder_register_is_window_limited":
            "balances are the net of transfers observed in the fetched window. "
            "They equal the true register only if the window reaches the "
            "token's first block; otherwise an address that has not transacted "
            "recently is missing.",
        "tokens": prov,
    }
