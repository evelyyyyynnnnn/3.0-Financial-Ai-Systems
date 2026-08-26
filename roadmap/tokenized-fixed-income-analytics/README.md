# Tokenized Fixed-Income Analytics

Market analytics for tokenized debt instruments: treasuries, money-market
funds, and tokenized private credit.

> Relocated from `1.0-Secure-Ai-Agent-Infrastructure`. Contract-level security
> analysis of the same instruments stays there, in
> `6.0-Tokenized-Asset-Contract-Security`. This project covers the market
> questions; that one covers whether the contract can be trusted.

## Problem

Tokenized real-world assets moved from pilot to production faster than the
analytics around them. On-chain value is concentrated in yield-bearing
instruments, but a holder has no standard way to distinguish real secondary
depth from wash volume, or to know how concentrated the holder base is, or how
long redemption actually takes in practice rather than in the prospectus.

## Scope

- **Liquidity analytics** — realised depth, spread, and turnover from on-chain
  trade data rather than quoted depth.
- **Holder concentration** — distribution and change over time; flag instruments
  where a handful of addresses dominate.
- **Redemption latency** — observed time from redemption request to settlement.
- **Reserve reconciliation** — claimed backing against attestation cadence and
  on-chain supply.
- **Cross-venue comparison** — same instrument across issuance platforms.

## Relationship to the rest of this repository

Shares the fixed-income domain with the credit-risk and network-risk projects
under `project-1/`. On-chain data is a new source, not a new discipline — the
analytics are conventional fixed-income analytics run against a different feed.
Contract-level analysis of tokenized instruments is `project-4/`; this project
would cover the market questions, that one covers whether the contract holds.

## Status

Scaffold. No implementation yet.
