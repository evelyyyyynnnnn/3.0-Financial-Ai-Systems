"""Reading a token's transfer tape from a public Ethereum node.

What this can and cannot produce, because the gap decides what the real run is
allowed to report:

  CAN: every transfer, its size, its sender and recipient, and its block. From
  those, holder balances can be reconstructed and concentration measured
  exactly -- HHI, effective holders, top-N share and Gini are counts of tokens,
  and the chain is the authoritative record of who holds them.

  CANNOT: a price. An ERC-20 Transfer event carries a value and two addresses
  and nothing else. There is no price in it, because a transfer is not a trade.
  Amihud illiquidity and the Roll spread are both built on price changes, so on
  a transfer tape alone they cannot be computed -- and for a tokenised treasury
  fund there is often no market price to find, since units are created and
  redeemed at net asset value rather than traded on an exchange.

So the real run reports concentration and activity, and withholds the two
price-based liquidity measures rather than substituting $1.00 for every
transfer and reporting a spread of zero.
"""
from __future__ import annotations

import json

from .datakit import Source

# keccak256("Transfer(address,address,uint256)")
TRANSFER_TOPIC = ("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df"
                  "523b3ef")

RPC = "https://ethereum-rpc.publicnode.com"

# Tokenised fixed income on Ethereum mainnet. Each is a fund whose units are
# ERC-20 tokens; the contract address is the fund.
TOKENS = {
    "BUIDL": {
        "address": "0x7712c34205737192402172409a8F7ccef8aA2AEc",
        "decimals": 18,
        "note": "BlackRock USD Institutional Digital Liquidity Fund",
    },
    "OUSG": {
        "address": "0x1B19C19393e2d034D8Ff31ff34c81252FcBbee92",
        "decimals": 18,
        "note": "Ondo Short-Term US Government Treasuries",
    },
    "USDY": {
        "address": "0x96F6eF951840721AdBF46Ac996b59E0235CB985C",
        "decimals": 18,
        "note": "Ondo US Dollar Yield",
    },
}

TERMS = "public blockchain data; read through a public RPC endpoint, no account"


def _rpc(method: str, params: list) -> dict:
    return {"jsonrpc": "2.0", "id": 1, "method": method, "params": params}


def block_number_source() -> Source:
    return Source(name="eth_blockNumber", url=RPC, dest="chain/blocknumber.json",
                  publisher="public Ethereum RPC", terms=TERMS,
                  note="the chain head, so the window is anchored to a real block",
                  body=_rpc("eth_blockNumber", []))


def block_source(block: int, tag: str) -> Source:
    return Source(name=f"eth_getBlockByNumber {tag}", url=RPC,
                  dest=f"chain/block-{tag}.json",
                  publisher="public Ethereum RPC", terms=TERMS,
                  note="block timestamp, used to date the transfers",
                  body=_rpc("eth_getBlockByNumber", [hex(block), False]))


def logs_source(symbol: str, address: str, from_block: int,
                to_block: int, chunk: int) -> Source:
    return Source(
        name=f"{symbol} transfers {from_block}-{to_block}", url=RPC,
        dest=f"chain/{symbol.lower()}-logs-{chunk:04d}.json",
        publisher="public Ethereum RPC", terms=TERMS,
        note=f"Transfer events for {address}",
        body=_rpc("eth_getLogs", [{
            "address": address,
            "fromBlock": hex(from_block), "toBlock": hex(to_block),
            "topics": [TRANSFER_TOPIC],
        }]),
    )


# --- parsing ---------------------------------------------------------------

def rpc_result(raw: bytes, method: str):
    d = json.loads(raw)
    if "error" in d:
        raise ValueError(f"{method}: {d['error']}")
    if "result" not in d:
        raise ValueError(f"{method}: response has no result")
    return d["result"]


def parse_block_number(raw: bytes) -> int:
    return int(rpc_result(raw, "eth_blockNumber"), 16)


def parse_block_timestamp(raw: bytes) -> int:
    res = rpc_result(raw, "eth_getBlockByNumber")
    if not res:
        raise ValueError("eth_getBlockByNumber returned null; the block may be "
                         "beyond this node's retained history")
    return int(res["timestamp"], 16)


def _addr(topic: str) -> str:
    """A topic is 32 bytes; an address is the low 20."""
    return "0x" + topic[-40:].lower()


def parse_logs(raw: bytes, decimals: int) -> list:
    """Return [{block, from, to, value}] with value in whole units."""
    res = rpc_result(raw, "eth_getLogs")
    scale = 10 ** decimals
    out = []
    for lg in res:
        topics = lg.get("topics") or []
        if len(topics) < 3:
            continue          # a malformed or non-standard Transfer
        data = lg.get("data") or "0x0"
        try:
            value = int(data, 16) / scale
        except ValueError:
            continue
        out.append({
            "block": int(lg["blockNumber"], 16),
            "from": _addr(topics[1]),
            "to": _addr(topics[2]),
            "value": value,
            "tx": lg.get("transactionHash"),
        })
    return out


ZERO = "0x" + "0" * 40


def reconstruct_balances(transfers: list) -> dict:
    """Net balance per address over the observed window.

    This is a window balance, not a full holder register, unless the window
    reaches back to the token's first block. Mints (from the zero address) and
    burns (to it) are excluded from the holder set but counted as supply
    changes, because the zero address is not a holder.
    """
    bal: dict = {}
    minted = burned = 0.0
    for t in transfers:
        if t["from"] == ZERO:
            minted += t["value"]
        else:
            bal[t["from"]] = bal.get(t["from"], 0.0) - t["value"]
        if t["to"] == ZERO:
            burned += t["value"]
        else:
            bal[t["to"]] = bal.get(t["to"], 0.0) + t["value"]
    bal.pop(ZERO, None)
    return {"balances": bal, "minted": minted, "burned": burned}


def block_to_time(block: int, lo_block: int, lo_ts: int,
                  hi_block: int, hi_ts: int) -> int:
    """Date a block by linear interpolation between two known timestamps.

    Post-merge Ethereum produces a block every 12 seconds apart from missed
    slots, so interpolating between the window's endpoints is accurate to a few
    seconds -- far finer than the daily aggregation these statistics use, and
    it costs two requests instead of one per block.
    """
    if hi_block == lo_block:
        return lo_ts
    frac = (block - lo_block) / (hi_block - lo_block)
    return int(lo_ts + frac * (hi_ts - lo_ts))
