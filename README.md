# 3.0 Financial AI Systems

Portfolio of work supporting the endeavor described in the EB2-NIW petition:
the design and implementation of **optimization-driven, system-level decision
frameworks** — integrating operations research, mathematical optimization, and
applied AI — for domains where a wrong decision carries systemic consequences.

Four independently deployable projects. Point Vercel's root directory at any
one of them; each carries its own `vercel.json` and needs no build step.

| | Project | What it does | Deploy root |
|---|---|---|---|
| 1 | **Portfolio** | The existing body of work — eight projects, a two-level site, and the live 13F tracker | `project-1/` |
| 2 | **Filing Intelligence** | What changed in a company's SEC risk disclosures since the prior filing | `project-2/` |
| 3 | **Contagion Observatory** | Directional risk transmission between crypto and US equities | `project-3/` |
| 4 | **Contract Audit** | Static vulnerability analysis for Solidity, with checkable findings | `project-4/` |

Each project has its own README with the method, the run instructions, and an
explicit statement of what it does *not* establish.

## Coverage against the petition

| Pillar | Status |
|---|---|
| Financial stability | `project-1`, `project-2`, `project-3` |
| Secure digital infrastructure | `project-4` |
| Healthcare safety | **No code in this repository.** It does not belong under "Financial AI Systems" — it wants a separate repository rather than being folded in here. |

## Data, and where it comes from

Projects 2–4 follow the same shape as the 13F tracker, which has been running
this way for a while: **a pipeline produces `data.json`, and the site is pure
static**. Browsers cannot call SEC EDGAR or market APIs directly (CORS, and
per-client rate limits), so precomputation is not a shortcut — it is the only
workable architecture for a static deploy.

Projects 2 and 3 ship **sample data so the site renders before any live pull**,
and both label it in the payload and on the page:

- `project-2` uses **fictional issuers**. Attaching invented risk-factor
  language to a real ticker would produce something that reads like an SEC
  disclosure without being one.
- `project-3` uses **simulated series**, built from a factor model with planted
  structure so the estimators can be checked against a known answer.

Replace either with real data in one command — see each README.

## Automation

`.github/workflows/` must stay at the repository root; GitHub Actions reads
workflows from nowhere else.

| Workflow | Schedule | Refreshes |
|---|---|---|
| `refresh-data.yml` | 1st of each month | `project-1/giant-portfolio/data.json` from Notion |
| `refresh-filings.yml` | 3rd of each month | `project-2/data/data.json` from SEC EDGAR |

Both also run on demand from the Actions tab, and both commit only when the
data actually changed — which redeploys the affected site.

Secrets: `NOTION_TOKEN` for the tracker, `SEC_USER_AGENT` for filings (SEC
requires a contact string on every API request, e.g. `Jane Doe jane@example.com`).

## Attribution

`project-1/volatility-forecasting/Options-Volatility-Trading/` is **not
original work**. It is MIT-licensed software, Copyright (c) 2021 MCF Long
Short, from `mcf-long-short/ibkr-options-volatility-trading` — a course group
project at Union University's Masters in Computational Finance. Its
`ib_client/` directory is Interactive Brokers' official Python TWS API. It is
retained as a reference implementation and labelled third-party throughout.

Projects 2, 3, and 4 were built as portfolio work; their commit dates reflect
when they were written.
