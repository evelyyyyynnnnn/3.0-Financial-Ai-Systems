# 3.0 Financial AI Systems

Portfolio of work supporting the endeavor described in the EB2-NIW petition:
the design and implementation of **optimization-driven, system-level decision
frameworks** — integrating operations research, mathematical optimization, and
applied AI — for domains where a wrong decision carries systemic consequences.

Two independently deployable sites. Point Vercel's root directory at either;
each carries its own `vercel.json` and needs no build step.

| Deploy root | Site | Contains |
|---|---|---|
| `project-1/` | **Portfolio** | Seven projects, a two-level site, and the live 13F tracker |
| `project-2/` | **Trustworthy Systems** | Three systems on one site, a page each: Filing Intelligence, Contagion Observatory, Contract Audit |

Alongside them: `roadmap/` (planned, not built) and `project-1/reference/`
(third-party code).

Every project has its own README with the method, the run instructions, and an
explicit statement of what it does *not* establish.

## Coverage against the petition

| Pillar | Status |
|---|---|
| Financial stability | `project-1`, and Filing Intelligence + Contagion in `project-2` |
| Secure digital infrastructure | Contract Audit in `project-2` |
| Healthcare safety | **No code in this repository.** It does not belong under "Financial AI Systems" — it wants a separate repository rather than being folded in here. |

## Data, and where it comes from

The three systems in `project-2` follow the same shape as the 13F tracker, which has been running
this way for a while: **a pipeline produces `data.json`, and the site is pure
static**. Browsers cannot call SEC EDGAR or market APIs directly (CORS, and
per-client rate limits), so precomputation is not a shortcut — it is the only
workable architecture for a static deploy.

Projects 2 and 3 ship **sample data so the site renders before any live pull**,
and both label it in the payload and on the page:

- Filing Intelligence uses **fictional issuers**. Attaching invented risk-factor
  language to a real ticker would produce something that reads like an SEC
  disclosure without being one.
- Contagion uses **simulated series**, built from a factor model with planted
  structure so the estimators can be checked against a known answer.

Replace either with real data in one command — see each README.

## Automation

`.github/workflows/` must stay at the repository root; GitHub Actions reads
workflows from nowhere else.

| Workflow | Schedule | Refreshes |
|---|---|---|
| `refresh-data.yml` | 1st of each month | `project-1/giant-portfolio/data.json` from Notion |
| `refresh-filings.yml` | 3rd of each month | `project-2/filing-intelligence/data/data.json` from SEC EDGAR |

Both also run on demand from the Actions tab, and both commit only when the
data actually changed — which redeploys the affected site.

Secrets: `NOTION_TOKEN` for the tracker, `SEC_USER_AGENT` for filings (SEC
requires a contact string on every API request, e.g. `Jane Doe jane@example.com`).

## Roadmap

`roadmap/` holds scoping documents for work that is planned but **not
implemented**. It is a separate directory from the numbered projects so that
distinction is visible from the tree, not just from a status line. A project
graduates out of it when there is code.

## Attribution

Third-party code lives in `project-1/reference/`, separated at the directory
level rather than by a caveat. It currently holds
`options-volatility-trading` — MIT-licensed, Copyright (c) 2021 MCF Long
Short, from `mcf-long-short/ibkr-options-volatility-trading`, a course group
project at Union University's Masters in Computational Finance. Its
`ib_client/` directory is Interactive Brokers' official Python TWS API.
Everything under the numbered projects outside that directory is original work.

The three systems in `project-2` were built as portfolio work; their commit dates reflect
when they were written.
