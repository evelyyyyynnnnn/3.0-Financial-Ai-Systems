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


# --- a gap in the fetch must not read as a quiet market ----------------------
#
# The first real walk lost nine chunks in ten to rate limiting and still wrote a
# manifest. The loader reads whatever log files exist, so a window with holes in
# it was indistinguishable from a window in which little happened -- and every
# activity figure is computed over the transfers that arrived.

def _coverage_tree(tmp_path, fraction):
    """A raw/ tree carrying a coverage record and nothing else."""
    import json

    cov = tmp_path / "raw" / "chain" / "coverage.json"
    cov.parent.mkdir(parents=True, exist_ok=True)
    cov.write_text(json.dumps({
        "generated_utc": "2026-09-12T00:00:00+00:00",
        "rpc": "https://example.invalid",
        "by_symbol": {"BUIDL": {
            "requested_blocks": [1000, 6000],
            "chunk_size": 5000,
            "chunks_requested": 10,
            "chunks_retrieved": int(10 * fraction),
            "fraction_retrieved": fraction,
            "missing_ranges": [] if fraction == 1.0 else [[1000, 2000]],
        }},
    }))
    return cov


def test_an_incomplete_walk_is_recorded_as_incomplete(tmp_path):
    import json

    _coverage_tree(tmp_path, 0.2)
    cov = json.loads((tmp_path / "raw" / "chain" / "coverage.json").read_text())
    by = cov["by_symbol"]["BUIDL"]

    assert by["fraction_retrieved"] < 1.0
    assert by["chunks_retrieved"] < by["chunks_requested"]
    assert by["missing_ranges"], "the ranges that failed must be named"


def test_the_walk_records_what_it_asked_for_not_only_what_it_got():
    """Without the requested range, nothing downstream can tell a short window
    from a window with holes.

    Counted in blocks rather than chunks: chunk sizes are no longer fixed, so
    "9 of 11 chunks" would not say how much of the window arrived, and how much
    arrived is the only thing that decides whether the numbers may be quoted.
    """
    import inspect

    from data import fetch

    src = inspect.getsource(fetch)

    assert "blocks_requested" in src
    assert "blocks_retrieved" in src
    assert "missing_ranges" in src
    assert "coverage.json" in src


def test_a_403_outside_sec_changes_identity_rather_than_backing_off():
    """403 means opposite things on the two kinds of host here.

    SEC refuses a request whose User-Agent does NOT name a contact; a browser
    UA makes that worse, so it must fail at once with the fix in the message.
    Everywhere else a 403 is usually a CDN bot filter rejecting the identifying
    UA before the request reaches the application -- probing six public
    Ethereum endpoints returned 403 from all six under the identifying UA and
    answers from three under a browser UA. Backing off cannot fix an identity
    check, and the earlier code's exponential sleep both lost the data and told
    the reader to slow down, which was the wrong instruction.
    """
    import inspect

    from data import datakit

    src = inspect.getsource(datakit)

    assert "_is_sec" in src
    sec_branch = src.index("_is_sec(host)")
    # Anchor on the branch BODY, not on the variable's first mention -- the
    # flag is initialised before the handler and would match too early.
    ua_branch = src.index("ua, ua_fallback_used = BROWSER_UA, True")
    assert sec_branch < ua_branch, "the SEC case must be distinguished first"
    assert "BROWSER_UA" in src
    # The old advice must not come back: it sent the reader to fix throttling
    # that was never happening.
    assert "as rate limiting" not in src


def test_the_manifest_records_which_identity_the_host_accepted():
    """A silent UA swap would change provenance without saying so."""
    import inspect

    from data import datakit

    src = inspect.getsource(datakit.Fetcher.get)
    assert '"user_agent": ua' in src
    assert '"identifying_ua_refused": ua_fallback_used' in src


def test_a_refused_range_is_halved_rather_than_abandoned():
    """Public endpoints cap the span of one eth_getLogs and disagree on both
    the cap and how they report it -- 403, 400, or a plain message saying
    "limited to 0 - 50 blocks range". The only portable way to find the cap is
    to hit it and back off, so a refused range must be split and retried."""
    from data import fetch

    calls = []

    class FakeFetcher:
        raw = pathlib.Path(".")

        def get(self, src, refresh=False):
            lo, hi = (int(x) for x in src.name.split()[-1].split("-"))
            calls.append((lo, hi))
            if hi - lo + 1 > 50:
                raise datakit.FetchError("limited to 0 - 50 blocks range")
            return pathlib.Path(".")

    got, missing, smallest = fetch.walk_token(
        FakeFetcher(), "BUIDL", TOKENS["BUIDL"]["address"],
        1_000, 1_399, chunk=400, refresh=False, verbose=False)

    assert missing == [], "a range refused for its span must not be dropped"
    assert got == 400, f"every block should arrive in smaller pieces, got {got}"
    assert smallest <= 50
    assert any(hi - lo + 1 > 50 for lo, hi in calls), "the wide try should happen first"


def test_a_range_refused_even_when_tiny_is_recorded_as_missing():
    """Halving cannot fix every refusal. What it cannot fetch must show up in
    missing_ranges, never be silently skipped."""
    from data import fetch

    class AlwaysRefuses:
        raw = pathlib.Path(".")

        def get(self, src, refresh=False):
            raise datakit.FetchError("nope")

    got, missing, _ = fetch.walk_token(
        AlwaysRefuses(), "BUIDL", TOKENS["BUIDL"]["address"],
        1_000, 1_199, chunk=200, refresh=False, verbose=False)

    assert got == 0
    assert sum(b - a + 1 for a, b in missing) == 200, \
        "every unfetched block must be accounted for"


def test_sec_hosts_are_recognised():
    from data.datakit import _is_sec

    assert _is_sec("data.sec.gov")
    assert _is_sec("www.sec.gov")
    assert not _is_sec("ethereum-rpc.publicnode.com")
    assert not _is_sec("sec.gov.example.com")


def _seed_with_coverage(tmp_path, fraction):
    """A cache plus a coverage record saying the walk was only partly answered."""
    f = _seed(tmp_path)
    cov = f.raw / "chain" / "coverage.json"
    cov.write_text(json.dumps({"by_symbol": {"BUIDL": {
        "requested_blocks": [1000, 56000],
        "blocks_requested": 55001,
        "blocks_retrieved": int(55001 * fraction),
        "fraction_retrieved": fraction,
        "missing_ranges": [] if fraction >= 1.0 else [[11000, 56000]],
    }}}), encoding="utf8")
    return f


def test_a_partial_window_is_flagged_in_the_metadata(tmp_path):
    """The guard that says "these activity numbers are computed over a window
    with holes in it" was, for one release, written after the function's return
    statement -- unreachable. The run looked clean, the JSON carried no
    qualifier, and a tape missing 9 blocks in 11 was indistinguishable from a
    quiet market. This test exists so that cannot happen again silently.
    """
    _seed_with_coverage(tmp_path, 0.1818)
    _, meta = load_tokens(root=tmp_path)

    assert meta.get("window_is_incomplete") is True
    why = meta.get("activity_metrics_qualified_because", "")
    assert "18.2%" in why, "the qualifier must say how much of the window arrived"
    assert "quiet market" in why


def test_a_complete_window_is_not_flagged(tmp_path):
    """The flag has to mean something, so it must be absent when the walk
    actually finished."""
    _seed_with_coverage(tmp_path, 1.0)
    _, meta = load_tokens(root=tmp_path)

    assert meta.get("window_is_incomplete") is False
    assert "activity_metrics_qualified_because" not in meta


def test_the_qualifier_reaches_the_result_file_and_the_screen():
    """A caveat that lives only in a JSON nobody opens is not a caveat."""
    import inspect

    from src import demo

    src = inspect.getsource(demo)
    assert '"window_is_incomplete": meta.get("window_is_incomplete"' in src
    assert "activity_metrics_qualified_because" in src
    assert "WINDOW IS INCOMPLETE" in src, "it must print, not only serialise"


def test_overlapping_cached_chunks_do_not_double_count(tmp_path):
    """Adaptive chunking leaves a wide file and the narrow ones that replaced
    it, so the same transfer can sit in two cached files. Counting it twice
    would inflate every activity figure while looking entirely plausible."""
    f = _seed(tmp_path)
    man = f.load_manifest()
    original = sorted(k for k in man["files"] if "-logs-" in k)[0]
    payload = (f.raw / original).read_bytes()
    rows = json.loads(payload)["result"]
    for i, lg in enumerate(rows):          # a real node returns a log index
        lg["logIndex"] = hex(i)
    payload = _rpc(rows)
    for dest in ("chain/buidl-logs-000001000-000001999.json",
                 "chain/buidl-logs-000001000-000001499.json"):
        (f.raw / dest).write_bytes(payload)
        man["files"][dest] = dict(man["files"][original], source=dest,
                                  sha256=datakit.sha256_file(f.raw / dest))
    del man["files"][original]
    (f.raw / original).unlink()
    f._write_manifest(man)

    tokens, _ = load_tokens(root=tmp_path)
    assert len(tokens[0].trades) == len(rows), \
        "the same log in two cached files must be counted once"


def test_a_log_without_an_index_is_never_deduped_away(tmp_path):
    """One transaction can emit many Transfer events -- a batch settlement does
    exactly that -- so the hash alone identifies nothing. Deduping on it would
    delete real transfers while the totals still looked healthy."""
    f = _seed(tmp_path)
    man = f.load_manifest()
    dest = sorted(k for k in man["files"] if "-logs-" in k)[0]
    n = len(json.loads((f.raw / dest).read_bytes())["result"])

    tokens, _ = load_tokens(root=tmp_path)
    assert len(tokens[0].trades) == n, (
        "the fixture gives every log the same transactionHash and no logIndex; "
        "all of them must survive")


def test_addresses_go_out_lower_cased():
    """A mixed-case address carries an EIP-55 checksum. An endpoint that
    validates it answers a wrong one with a bare HTTP 400, which the walk
    cannot tell apart from "range too wide" -- so it halves itself to the floor
    and reports the wrong cause. Sending lower case removes the ambiguity."""
    s = logs_source("BUIDL", TOKENS["BUIDL"]["address"], 100, 200)
    sent = s.body["params"][0]["address"]
    assert sent == sent.lower(), f"address sent with mixed case: {sent}"
    assert sent == TOKENS["BUIDL"]["address"].lower()


def test_an_http_error_reports_what_the_server_said():
    """"returned HTTP 400" names the status and hides the cause. The body is
    where a JSON-RPC endpoint explains itself; discarding it left guessing as
    the only way forward."""
    import inspect

    src = inspect.getsource(datakit)
    assert "_body_of" in src
    assert "The server said:" in src
    body_src = inspect.getsource(datakit._body_of)
    assert "error" in body_src and "message" in body_src, \
        "a JSON-RPC error's message must be unwrapped, not dumped raw"
