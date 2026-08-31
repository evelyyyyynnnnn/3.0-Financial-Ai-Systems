# Portfolio

The existing body of work: seven projects plus the live 13F tracker, presented
through a two-level site.

**[`index.html`](index.html)** is the entry point — three pillars, a card per
project leading to its own detail page, a page index, and a gap analysis
against the petition. GitHub will not render it inline; open it in a browser,
or deploy this directory.

## Projects

| Project | What it is | Detail page |
|---|---|---|
| Portfolio Optimization Engine | RL for portfolio optimization and dynamic hedging — PPO, SAC, DQN | [→](projects/portfolio-optimization-engine.html) |
| Financial Network Risk | Financial knowledge graph analysed with GNNs | [→](projects/financial-network-risk.html) |
| Volatility Forecasting | LSTM and Transformer volatility forecasters with Optuna tuning | [→](projects/volatility-forecasting.html) |
| Credit Risk AI | Multimodal credit risk across text, market, and image inputs | [→](projects/credit-risk-ai.html) |
| Eventized Microstructure LLM | Research paper: LLMs applied to order-book microstructure | [→](projects/high-frequency-strategy.html) |
| Live Trading Engine | Low-latency Alpaca execution, C++ and Python | [→](projects/live-trading-engine.html) |
| Trading Simulation Platform | Quant dashboard, backtesting engine, research pages | [→](projects/trading-system-dashboard-2.html) |
| Giant Portfolio Tracker | Institutional 13F holdings, refreshed monthly | [→](projects/giant-portfolio.html) |

## Live pages

Open directly, no server:

- [U.S. Stock Market Indicators](trading-system-dashboard-2/public/research/macro-overview.html) — April 2025 macro infographic
- [2025 投资展望](trading-system-dashboard-2/public/research/prediction.html) — forward-looking scenarios
- [投资分析与市场展望](trading-system-dashboard-2/public/research/portfolio-management.html)
- [Balanced Long-Term Portfolio](trading-system-dashboard-2/public/research/investment-suggestion.html)
- [金融工具分析平台](trading-system-dashboard-2/public/instruments.html)
- [Giant Portfolio Tracker](giant-portfolio/index.html)

Need their backend running:

- [Trading Simulation Platform](trading-system-dashboard-2/public/index.html) — `cd trading-system-dashboard-2 && npm install && npm start`

Generated Plotly reports from RL evaluation runs (~5 MB each):

- [Drawdown](portfolio-optimization-engine/visualizations/drawdown_eval.html) ·
  [Portfolio weights](portfolio-optimization-engine/visualizations/portfolio_weights_eval.html) ·
  [Risk metrics](portfolio-optimization-engine/visualizations/risk_metrics_eval.html)

## Giant Portfolio refresh

`data.json` is rebuilt from two Notion databases by a workflow at the
**repository root** — `.github/workflows/refresh-data.yml`, running on the 1st
of each month. It must live there; GitHub Actions reads workflows from nowhere
else. Setup and the manual path are in
[`giant-portfolio/SETUP.md`](giant-portfolio/SETUP.md).

Deployed under `project-1/`, the tracker is served at `/giant-portfolio/`.

## Rebuilding the site

Project descriptions live in one table at the top of `scripts/build_site.py`
at the repository root. Edit that table, then:

```bash
python scripts/build_site.py
```

It rewrites `index.html` and every page under `projects/`.

## Consolidation

The Investment Analysis Dashboard was retired to
[`archive/`](archive/README.md) after the portfolio audit: the Trading
Simulation Platform covered it (26 endpoints against 4, with market summary and
sector performance duplicated). Its two unique pieces moved rather than being
lost — investment commentary became `/api/advisory/*` on the Platform, and its
four research pages moved to `public/research/`.

## Attribution

Third-party code is under [`reference/`](reference/README.md), kept out of the
project directories so the distinction is structural rather than a caveat. It
holds `options-volatility-trading` — MIT-licensed, Copyright (c) 2021 MCF Long
Short, from `mcf-long-short/ibkr-options-volatility-trading`, a course group
project at Union University's Masters in Computational Finance; its
`ib_client/` directory is Interactive Brokers' official Python TWS API.

`volatility-forecasting/` now contains only original work.
