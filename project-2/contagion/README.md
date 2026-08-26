# Crypto–Equity Contagion Observatory

Estimates **directional risk transmission** between crypto assets and US
equities, and lets you shock a node to see what the estimated graph implies.

## The argument

Correlation is the wrong instrument for this question. Two assets can move
together every day and transmit nothing — they share a factor. What matters
for systemic risk is whether a pair **fails together**, and that is a
statement about the tail, not the average.

So every pair gets three numbers:

| Measure | What it answers |
|---|---|
| `corr` | Pearson correlation of daily log returns — the baseline everyone already has. |
| `lead_lag` | Cross-correlation over ±3 days. Which side moved first, which orients the edge. |
| `tail_dep` | P(target in its own worst 10% \| source in its worst 10%). Joint failure, measured directly. |

Edge strength is `0.35·|corr| + 0.65·tail_dep` — weighted toward the tail,
because a pair that only co-moves in calm markets is not a contagion channel.

Tail dependence is estimated empirically rather than by fitting a copula. With
a few hundred observations a copula's tail parameter is mostly prior; the
empirical rate is checkable against the data you actually have.

## Running it

```bash
python pipeline/make_sample.py     # simulated data, ships in the repo
```

The sample is a factor model with a deliberately planted structure — a common
market factor, a crypto-specific factor, BTC leading the other coins by one
day, and a stress channel between BTC and XLF. It exists so the site renders
before a live pull, and so the estimators can be checked against something
whose answer is known. It is simulated, not real prices, and the payload sets
`is_sample: true`.

Real data needs no key:

```bash
python pipeline/build_dataset.py
python pipeline/build_dataset.py --equities spy qqq xlf --crypto bitcoin ethereum
```

Equities come from Stooq's daily CSV, crypto from CoinGecko's free tier. Both
are rate-limited and neither is a contractual feed — this is for research use.
Series are aligned onto shared trading days before anything is estimated;
crypto trades weekends and equities do not, and comparing unaligned series
would put a Monday equity move beside a Saturday crypto move and report the
mismatch as a lead-lag relationship.

## Layout

```
index.html              the site
assets/app.js           SVG network, shock propagation, edge table
assets/app.css          styles, light and dark
data/data.json          the dataset
pipeline/
  contagion.py          correlation, lead-lag, tail dependence, propagation
  market_data.py        Stooq + CoinGecko clients, trading-day alignment
  build_dataset.py      live pull → data.json
  make_sample.py        the labelled simulated sample
```

Standard library only.

## What this is not

Tail dependence is a statement about co-movement in the tail, not proof of a
causal channel. The lead-lag orientation says which side moved first in this
window — evidence of direction, not of mechanism. Shock propagation is a decay
model over the estimated edges: it shows what the graph implies, not a
forecast. The site says all three on the page rather than only here.

## Deploying

This is one page of the Trustworthy Systems site. Deploy the whole site by
pointing Vercel's root directory at `project-2/`; this page is served at
`/contagion/`.
