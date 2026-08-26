# Trustworthy Systems

Three systems for high-stakes financial decisions, deployed as **one site** with
a page each. Point Vercel's root directory at `project-2/` — no build step.

| Page | Question it answers | Section |
|---|---|---|
| [Filing Intelligence](filing-intelligence/README.md) | What changed in a company's SEC risk disclosures since the prior filing | `filing-intelligence/` |
| [Contagion Observatory](contagion/README.md) | Which cross-market links actually transmit stress, and what a shock does | `contagion/` |
| [Contract Audit](contract-audit/README.md) | Whether a Solidity contract has a known bug class, reported so it can be checked | `contract-audit/` |

## The shared constraint

Each answers a question where being wrong is expensive, so each is built so that
**a person can verify the answer** rather than take it on trust:

- Filing Intelligence quotes the filing verbatim and shows the prior sentence
  beside an escalation, so the change is checkable without opening the document.
- Contagion Observatory names its estimator for every number on the page, and
  says plainly that tail dependence is co-movement, not a proven causal channel.
- Contract Audit states, per finding, the conditions under which that detector
  is wrong — a tool that hides its failure modes costs more review time than it
  saves.

## Shape

All three follow the same architecture:

```
pipeline (Python, stdlib only)  →  data/data.json  →  static page
```

Precomputation is not a shortcut. A browser cannot call SEC EDGAR or the market
APIs directly — CORS, and per-client rate limits apply — so the pipeline runs
ahead of time and the page renders whatever it last wrote.

Filing Intelligence and Contagion ship **labelled sample data** so both render
before any live pull: fictional issuers in one, simulated series in the other.
Both set `is_sample` and say so in a banner on the page, not just in a README.
Each section's README has the one command that replaces it with real data.

## Layout

```
index.html              the landing page
assets/shell.css        palette, typography, top bar, footer — shared by all four pages
assets/home.css         landing page only
filing-intelligence/    index.html · assets/ · data/ · pipeline/
contagion/              index.html · assets/ · data/ · pipeline/
contract-audit/         index.html · assets/ · data/ · analyzer/ · contracts/
vercel.json             no-build static deploy
```

`shell.css` owns the neutrals and the chrome; each section's `app.css` owns only
its own components and inherits `--accent` from `body[data-section]`. Section
stylesheets still declare their own semantic colours — finding kinds, market
classes, severity levels — because those mean nothing outside their section.
Every one is declared for both themes.

## Refresh

`.github/workflows/refresh-filings.yml`, at the repository root, rebuilds
`filing-intelligence/data/data.json` from SEC EDGAR on the 3rd of each month, or
on demand from the Actions tab with an optional ticker list. It needs a
`SEC_USER_AGENT` secret — SEC requires a contact string on every API request.

Contagion can be refreshed the same way by running its pipeline; Contract Audit
reads Solidity from disk and needs no network at all.
