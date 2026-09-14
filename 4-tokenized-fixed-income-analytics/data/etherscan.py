"""Reading the transfer tape from Etherscan instead of a JSON-RPC node.

Why a second backend exists. eth_getLogs was never designed to scan history:
every free RPC tier caps how many blocks one call may span, they cap it at
different numbers, and one major provider caps it at ten -- which turns a
90-day window into 194,000 requests. Etherscan's log endpoint is built for the
opposite job. It has no block-range cap; it pages through results instead, so
the cost scales with how many transfers there ARE rather than with how much
chain you looked at. For three quiet tokenised-treasury funds that is the
difference between a day of requests and a minute of them.

What it costs: an API key, and trust in a second party's index rather than a
node's own logs. The manifest records which backend answered, so a reader can
tell the two runs apart -- and the key itself is redacted before it is written.
"""
from __future__ import annotations

import json
import os
import urllib.parse

from .datakit import Source
from .onchain import TRANSFER_TOPIC, _addr

BASE = "https://api.etherscan.io/v2/api"
CHAIN_ID = 1                       # Ethereum mainnet
PAGE_SIZE = 1000                   # Etherscan's maximum records per page

TERMS = ("public blockchain data, served through Etherscan's log index; "
         "free API key required, no account data involved")


def api_key() -> str | None:
    return os.environ.get("ETHERSCAN_API_KEY") or None


def available() -> bool:
    return api_key() is not None


def logs_source(symbol: str, address: str, from_block: int, to_block: int,
                page: int) -> Source:
    """One page of Transfer logs for a contract over a block range."""
    q = {
        "chainid": CHAIN_ID,
        "module": "logs",
        "action": "getLogs",
        "address": address.lower(),
        "topic0": TRANSFER_TOPIC,
        "fromBlock": from_block,
        "toBlock": to_block,
        "page": page,
        "offset": PAGE_SIZE,
        "apikey": api_key() or "",
    }
    return Source(
        name=f"{symbol} transfers {from_block}-{to_block} page {page}",
        url=f"{BASE}?{urllib.parse.urlencode(q)}",
        # Named by range and page so a resumed run reuses exactly what it
        # already has, and never reads a stale file as this request's answer.
        dest=f"chain/{symbol.lower()}-logs-{from_block:09d}-{to_block:09d}"
             f"-p{page:03d}.json",
        publisher="Etherscan",
        terms=TERMS,
        note=f"Transfer events for {address}",
    )


class RateLimited(RuntimeError):
    """Etherscan answered 200 with a refusal in the body."""


def parse_page(raw: bytes, decimals: int) -> tuple[list, bool]:
    """Return (rows, is_last_page).

    Etherscan answers 200 for everything and puts the outcome in the envelope,
    so an error here looks exactly like success to anything that only checks
    the status code. "No records found" is a legitimate empty page and ends the
    walk; a rate-limit refusal is not, and must not be mistaken for one --
    treating it as an empty page would silently truncate the tape.
    """
    d = json.loads(raw)
    status, message = str(d.get("status", "")), str(d.get("message", ""))
    result = d.get("result")

    if status != "1":
        if "no record" in message.lower():
            return [], True
        detail = result if isinstance(result, str) else message
        raise RateLimited(f"Etherscan refused the request: {detail}")

    if not isinstance(result, list):
        raise RateLimited(f"Etherscan returned a non-list result: {result!r}")

    scale = 10 ** decimals
    rows = []
    for lg in result:
        topics = lg.get("topics") or []
        if len(topics) < 3:
            continue                      # not a standard Transfer
        try:
            value = int(lg.get("data") or "0x0", 16) / scale
        except ValueError:
            continue
        rows.append({
            "block": int(lg["blockNumber"], 16),
            "from": _addr(topics[1]),
            "to": _addr(topics[2]),
            "value": value,
            "tx": lg.get("transactionHash"),
            "log_index": lg.get("logIndex"),
            # Etherscan returns the block's timestamp with the log, so the
            # RPC path's two-point interpolation is not needed here.
            "ts": int(lg["timeStamp"], 16) if lg.get("timeStamp") else None,
        })
    return rows, len(result) < PAGE_SIZE
