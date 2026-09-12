# Data — Tokenized Fixed-Income Analytics

> **Not yet sourced.** Scale is the single most-tested claim in this portfolio.
> State it here, and only state what the run log supports.

| Field | Value |
|---|---|
| Target scale | On-chain tokenized-debt trade data (universe to be stated) |
| Actual scale achieved | _not yet run_ |
| Source | _to be stated_ |
| Licence / terms of use | _to be stated_ |
| Vintage / as-of date | _to be stated_ |
| Access requirements | _to be stated_ |

## Rules for this folder

1. **Never commit raw licensed or patient data.** Commit manifests, checksums,
   and the code that reproduces the pull.
2. **Never ship simulated or sample data under a real number.** If a sample set
   exists so a page renders before a live pull, quarantine it in
   `data/sample/` and label it in the README. Simulated data underneath a real
   number is the sharpest RFE risk in this portfolio.
3. **Record the run.** Every reported scale figure needs a dated run log in
   `results/`.

## Reproduction

```
# the exact command that pulls the stated universe
```

## Fetching the transfer tape from a public RPC endpoint

`python -m data.fetch` walks a block window calling `eth_getLogs`. Two things
go wrong on free endpoints, they look identical from the outside, and neither
is rate limiting:

**1. The User-Agent is refused.** This project sends a User-Agent naming a
contact, because SEC's fair-access policy requires it. Most public Ethereum
endpoints sit behind a consumer CDN, and to that CDN an unfamiliar User-Agent
is a bot: it answers `403` before the request reaches the node. Probing six
public endpoints with the identifying UA returned 403 from all six; the same
`eth_blockNumber` under a browser UA was answered by three of them.

`datakit.py` therefore sends the identifying UA first and, if a non-SEC host
refuses it, retries once with a browser UA and records
`"identifying_ua_refused": true` for that file in `MANIFEST.json`. SEC keeps the
opposite behaviour — a 403 there fails immediately with instructions to set
`DATAKIT_UA`, because a browser UA would only make it worse.

**2. The block range is capped.** Endpoints limit how many blocks one
`eth_getLogs` may span, they do not agree on the cap, and they report hitting
it inconsistently — `403`, `400 Bad Request`, or a plain message reading
`eth_getLogs is limited to 0 - 50 blocks range`. There is no portable way to
ask, so the walk starts at `--chunk` (default 5,000) and **halves any range the
node refuses**, down to a floor of 25 blocks. A range still refused at the floor
is recorded in `missing_ranges` and never silently skipped.

### Reading coverage

`data/raw/chain/coverage.json` records, per token, the blocks requested, the
blocks retrieved, the fraction, the smallest chunk the endpoint accepted, and
every missing range. The loader reads it; when the fraction is below 1.0 the
result file carries `window_is_incomplete: true` plus
`activity_metrics_qualified_because`, and `--real` prints the warning.

This matters more than it looks. Transfer counts, intervals between transfers
and turnover are all computed over the transfers that arrived, so **a hole in
the fetch is indistinguishable from a quiet market** unless the hole is
recorded. A walk that retrieved 2 chunks in 11 once produced a table showing
127 transfers with a median interval of 0.00 hours and turnover of 195.9 — all
of it an artefact of the fetched window's width, none of it flagged, because
the guard that was supposed to flag it had been written after the function's
`return` statement and never ran.

### Covering a useful window

A public endpoint capped at 50 blocks needs ~13,000 requests per token for 90
days. That is not a workable walk, and no amount of `--pace` makes it one. Use
your own endpoint:

```bash
ETH_RPC_URL="https://your-endpoint" python -m data.fetch --days 90
```

A keyed endpoint accepts wide ranges and covers 90 days in about 65 requests
per token. The data is identical either way and `MANIFEST.json` records which
endpoint answered.
