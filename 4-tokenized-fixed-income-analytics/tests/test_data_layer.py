"""Tests for reading the on-chain transfer tape.

Two things decide whether the real numbers mean anything: decoding the log
format correctly (a topic is 32 bytes, an address is the low 20 of it, and the
value is in the data field scaled by the token's decimals), and refusing to
invent a price that Transfer events do not carry.
"""
import json
import pathlib
import sys

import numpy as np
import pytest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from data import datakit
from data.load import load_tokens
from data.onchain import (TOKENS, TRANSFER_TOPIC, ZERO, block_to_time,
                          logs_source, parse_block_number,
                          parse_block_timestamp, parse_logs,
                          reconstruct_balances)

A1 = "0x" + "11" * 20
A2 = "0x" + "22" * 20
A3 = "0x" + "33" * 20


def _topic(addr):
    return "0x" + "0" * 24 + addr[2:]


def _log(block, frm, to, value, decimals=18):
    return {"blockNumber": hex(block),
            "topics": [TRANSFER_TOPIC, _topic(frm), _topic(to)],
            "data": hex(int(value * 10 ** decimals)),
            "transactionHash": "0xabc"}


def _rpc(result):
    return json.dumps({"jsonrpc": "2.0", "id": 1, "result": result}).encode()


def test_parse_logs_decodes_addresses_from_the_low_20_bytes():
    got = parse_logs(_rpc([_log(100, A1, A2, 5.0)]), 18)
    assert got[0]["from"] == A1.lower()
    assert got[0]["to"] == A2.lower()
    assert got[0]["block"] == 100


def test_parse_logs_applies_token_decimals():
    """Reading raw wei as whole units overstates a balance by 10^18."""
    got = parse_logs(_rpc([_log(1, A1, A2, 2.5, decimals=18)]), 18)
    assert got[0]["value"] == pytest.approx(2.5)
    six = parse_logs(_rpc([_log(1, A1, A2, 2.5, decimals=6)]), 6)
    assert six[0]["value"] == pytest.approx(2.5)


def test_parse_logs_skips_malformed_entries_rather_than_crashing():
    bad = {"blockNumber": "0x1", "topics": [TRANSFER_TOPIC], "data": "0x1"}
    got = parse_logs(_rpc([bad, _log(2, A1, A2, 1.0)]), 18)
    assert len(got) == 1


def test_rpc_errors_surface():
    err = json.dumps({"jsonrpc": "2.0", "id": 1,
                      "error": {"code": -32005, "message": "range too large"}}).encode()
    with pytest.raises(ValueError, match="range too large"):
        parse_logs(err, 18)


def test_block_number_and_timestamp_decode_hex():
    assert parse_block_number(_rpc("0x112a880")) == 18000000
    assert parse_block_timestamp(_rpc({"timestamp": "0x65000000"})) == 0x65000000


def test_a_null_block_is_an_explicit_error():
    with pytest.raises(ValueError, match="retained history"):
        parse_block_timestamp(_rpc(None))


# --- balances --------------------------------------------------------------

def test_zero_address_is_not_a_holder():
    """A mint comes from 0x0 and a burn goes to it; counting either as a holder
    puts a negative or phantom balance into the concentration statistics."""
    rec = reconstruct_balances([
        {"block": 1, "from": ZERO, "to": A1, "value": 100.0},
        {"block": 2, "from": A1, "to": A2, "value": 40.0},
        {"block": 3, "from": A2, "to": ZERO, "value": 10.0},
    ])
    assert ZERO not in rec["balances"]
    assert rec["balances"][A1] == pytest.approx(60.0)
    assert rec["balances"][A2] == pytest.approx(30.0)
    assert rec["minted"] == 100.0 and rec["burned"] == 10.0


def test_block_to_time_interpolates_between_endpoints():
    ts = block_to_time(150, 100, 1_000_000, 200, 1_001_200)
    assert ts == 1_000_600
    # A degenerate window must not divide by zero.
    assert block_to_time(100, 100, 5, 100, 5) == 5


def test_logs_source_is_a_post_with_the_transfer_topic():
    s = logs_source("BUIDL", TOKENS["BUIDL"]["address"], 100, 200, 0)
    assert s.body["method"] == "eth_getLogs"
    params = s.body["params"][0]
    assert params["topics"] == [TRANSFER_TOPIC]
    assert params["fromBlock"] == "0x64" and params["toBlock"] == "0xc8"
    # Chunks share a URL, so the cache must key on the body.
    other = logs_source("BUIDL", TOKENS["BUIDL"]["address"], 201, 300, 1)
    assert datakit._fingerprint(s) != datakit._fingerprint(other)


# --- end to end ------------------------------------------------------------

def test_refuses_when_nothing_is_cached(tmp_path):
    with pytest.raises(datakit.FetchError, match="no on-chain transfer data"):
        load_tokens(root=tmp_path)


def _seed(tmp_path, symbol="BUIDL", n_holders=8):
    f = datakit.Fetcher(tmp_path)
    man = f.load_manifest()
    (f.raw / "chain").mkdir(parents=True, exist_ok=True)

    def put(dest, payload):
        (f.raw / dest).write_bytes(payload)
        man["files"][dest] = {
            "source": dest, "url": "https://ethereum-rpc.publicnode.com",
            "publisher": "public RPC", "terms": "public chain data",
            "sha256": datakit.sha256_file(f.raw / dest), "bytes": len(payload),
            "retrieved_utc": datakit.utc_now(), "request_fingerprint": dest}

    put("chain/block-lo.json", _rpc({"timestamp": hex(1_700_000_000)}))
    put("chain/block-hi.json", _rpc({"timestamp": hex(1_700_864_000)}))

    holders = ["0x" + f"{i:02x}" * 20 for i in range(1, n_holders + 1)]
    logs = []
    block = 1000
    for i, h in enumerate(holders):
        # A deliberately concentrated distribution, as these funds really are.
        logs.append(_log(block, ZERO, h, 1000.0 / (i + 1)))
        block += 50
    for i in range(len(holders) - 1):
        logs.append(_log(block, holders[i], holders[i + 1], 5.0))
        block += 50
    put(f"chain/{symbol.lower()}-logs-0000.json", _rpc(logs))
    f._write_manifest(man)
    return f


def test_builds_a_history_with_holders_and_transfers(tmp_path):
    _seed(tmp_path)
    tokens, meta = load_tokens(root=tmp_path)
    assert len(tokens) == 1
    tk = tokens[0]
    assert tk.symbol == "BUIDL"
    assert len(tk.holders) >= 7
    assert len(tk.trades) == len(tk.sizes())
    assert meta["n_tokens"] == 1


def test_prices_are_nan_not_a_placeholder(tmp_path):
    """A $1.00 placeholder would make the Roll spread exactly zero and the
    Amihud illiquidity exactly zero -- artefacts, reported as measurements."""
    _seed(tmp_path)
    tokens, meta = load_tokens(root=tmp_path)
    prices = tokens[0].prices()
    assert np.isnan(prices).all()
    assert meta["prices_available"] is False
    assert "carries a value and two addresses and no" in \
        meta["price_metrics_withheld_because"]


def test_concentration_is_computable_from_the_chain(tmp_path):
    """The statistics that a transfer tape CAN support, on real-shaped input."""
    _seed(tmp_path)
    from src.analytics import effective_holders, gini, hhi, top_n_share
    tokens, _ = load_tokens(root=tmp_path)
    held = tokens[0].holders

    assert (held > 0).all()
    assert held.tolist() == sorted(held.tolist(), reverse=True)
    h = hhi(held)
    assert 0.0 < h <= 1.0
    assert effective_holders(held) == pytest.approx(1.0 / h, rel=1e-6)
    assert 0.0 < top_n_share(held, 5) <= 1.0
    assert 0.0 <= gini(held) <= 1.0


def test_window_limitation_is_stated(tmp_path):
    _seed(tmp_path)
    _, meta = load_tokens(root=tmp_path)
    assert "only if the window reaches" in meta["holder_register_is_window_limited"]
    tok = meta["tokens"][0]
    assert tok["first_block"] < tok["last_block"]
    assert tok["n_transfers"] > 0


def test_transfer_times_are_dated_from_block_timestamps(tmp_path):
    _seed(tmp_path)
    tokens, meta = load_tokens(root=tmp_path)
    times = tokens[0].times()
    assert times.min() >= 1_700_000_000
    assert times.max() <= 1_700_864_000
    assert (np.diff(times) >= 0).all()
    assert meta["tokens"][0]["time_basis"].startswith("interpolated")
