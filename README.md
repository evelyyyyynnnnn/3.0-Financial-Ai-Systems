# 3.0 Financial AI Systems

Portfolio of work supporting the endeavor described in the EB2-NIW petition:
the design and implementation of **optimization-driven, system-level decision
frameworks** — integrating operations research, mathematical optimization, and
applied AI — for domains where a wrong decision carries systemic consequences.

**[Open the site](index.html)** for the full overview: three pillars, nine
project pages, a page index, and a petition-to-repository gap analysis.

## Structure

```
index.html            top-level overview (Vercel serves this)
projects/*.html       one detail page per project
assets/site.css       shared stylesheet
giant-portfolio/      live 13F tracker (index.html + data.json)
project-1/            source for the eight portfolio projects
scripts/
  build_site.py       regenerates index.html and projects/*.html
  refresh_data.py     pulls Notion → giant-portfolio/data.json
.github/workflows/
  refresh-data.yml    monthly data refresh (must stay at the repo root)
```

## Deploying

The site is static. Import the repository into Vercel and leave the root
directory at the repository root — `vercel.json` pins it to a no-build static
deploy, and `.vercelignore` keeps `node_modules/` and model checkpoints out of
the bundle.

## Refreshing the portfolio data

`.github/workflows/refresh-data.yml` runs on the 1st of each month, re-pulls the
two Notion databases, and commits `giant-portfolio/data.json` if anything
changed — which triggers a Vercel redeploy. To run it now: repo → Actions →
"Refresh portfolio data" → Run workflow. Locally:

```bash
export NOTION_TOKEN=ntn_xxxxxxxxxxxx
pip install requests
python scripts/refresh_data.py
```

Setup details, including the Notion integration and the `NOTION_TOKEN` secret,
are in [`giant-portfolio/SETUP.md`](giant-portfolio/SETUP.md).

## Rebuilding the site

Project descriptions live in one table at the top of `scripts/build_site.py`.
Edit that table, then:

```bash
python scripts/build_site.py
```

It rewrites `index.html` and every page under `projects/`.

## Attribution

`project-1/volatility-forecasting/Options-Volatility-Trading/` is **not original
work**. It is MIT-licensed software, Copyright (c) 2021 MCF Long Short, from
`mcf-long-short/ibkr-options-volatility-trading` — a course group project at
Union University's Masters in Computational Finance. Its `ib_client/` directory
is Interactive Brokers' official Python TWS API. It is retained as a reference
implementation and labelled as third-party throughout the site.
