# Giant Portfolio Tracker

> An applied **product**, not a research project — a live portfolio-holdings tracker included as evidence of applied financial-engineering breadth. It is **not** counted in this repository's real-data / test figures (those describe research subprojects 1–7). It surfaces public 13F-style investor holdings from Notion-backed databases and deploys on Vercel.

---

# Giant Portfolio Tracker — setup

## One-time setup

1. **Create a Notion integration**
   Go to `notion.so/my-integrations` → New integration → give it a name (e.g.
   "Portfolio Tracker") → Internal → copy the **token** (starts with `ntn_` or
   `secret_`).

2. **Share both databases with it**
   Open "Investor Portfolio Holdings" **and** "Investor/Institution List" in
   Notion → `•••` menu → Connections → add the integration you just created,
   on each one. The second database supplies full (untruncated) fund names,
   the manager/representative, and fund type, which is what makes fund names
   like "Alex Roepers - Atlantic Investment Management" and manager names
   like "Warren Buffett" searchable on the site. Skip either share and that
   database's API calls will 404 even with a valid token.

3. **Push this folder to a GitHub repo**, then add the token as a secret:
   Repo → Settings → Secrets and variables → Actions → New repository secret
   → name it `NOTION_TOKEN` → paste the token.

4. **Connect the repo to Vercel** (if not already): import the repo in
   Vercel and set **Root Directory** to `9-giant-portfolio-tracker` (this
   folder) with Framework Preset **Other** — there is no build step. The
   root directory has to be this folder exactly, because `index.html` loads
   its data with a relative `fetch('data.json')` and the two files are
   siblings here. Every push to `main` redeploys automatically.

## Where the numbers come from

**SEC EDGAR 13F-HR filings**, parsed by `edgar_13f.py`. Not Dataroma: Dataroma
publishes only a manager's *top* holdings, which is why 16 of the 50 funds in
this database sum to well under 100% of portfolio (Greenlight 68%, Bill Miller
78%). EDGAR's information table is the complete filing.

The two columns Dataroma provided that a raw filing does not are each one
division away, verified against the existing data to the cent:

    % of Portfolio = value / sum of the fund's values
    Reported Price = value / shares

Each fund needs its **CIK** filled in on the Investor/Institution List database;
the job skips any row without one.

## History

`Report Date` on the holdings database is the quarter end a filing reports on
(Q1 = Mar 31, not the May filing date). Every refresh appends a new set of rows
rather than overwriting, so quarters accumulate and `Change %` / `Reduce/Add`
are computed against the prior one. Sort or filter by `Report Date` instead of
reordering rows; `refresh_data.py` publishes only each fund's newest quarter, so
the site shows one snapshot while the database keeps the history.

## After that, refreshing is hands-off

Two Actions, both at the repository root (GitHub Actions only reads workflows
from that path, so a copy nested in this folder would be silently ignored):

- **`refresh-13f.yml`** runs on the 16th of Feb/May/Aug/Nov — two days after
  each 13F deadline — pulls EDGAR into Notion, rebuilds `data.json`, commits.
  Run it by hand first with **dry_run = true** to see what it would write.
- **`refresh-data.yml`** runs monthly and only re-reads Notion into
  `data.json`, so edits you make by hand in Notion still reach the site.

A commit to `main` triggers a Vercel redeploy — no manual step.
- To refresh immediately instead of waiting: repo → Actions tab →
  "Refresh portfolio data" → Run workflow.
- To change the schedule, edit the `cron` line in the workflow file.

## Running it locally / manually

```bash
export NOTION_TOKEN=ntn_xxxxxxxxxxxx
export SEC_USER_AGENT="Your Name you@example.com"   # EDGAR requires this
pip install requests

python -m unittest test_edgar_13f    # parser tests, no network needed
python edgar_13f.py --dry-run        # see what EDGAR would write
python edgar_13f.py --investor Berkshire
python refresh_data.py               # Notion -> data.json
```

This overwrites `data.json` in place, beside the script. Commit and push it
yourself if you're not relying on the Action.

## Files

This folder is flat on purpose: it *is* the Vercel site root, so the two
files the browser needs sit side by side at the top level.

```
9-giant-portfolio-tracker/     <- Vercel Root Directory
  index.html               the site — never needs to change
  data.json                the data — this is what gets refreshed
  edgar_13f.py             pulls SEC EDGAR 13F filings into Notion
  test_edgar_13f.py        offline tests for the parser and the math
  refresh_data.py          pulls Notion, rewrites data.json
  backfill_report_date.py  one-time: stamps existing rows as Q1 2026
  .vercelignore            keeps scripts and docs out of the published site
```

At the repository root, outside this folder:

```
.github/workflows/
  refresh-data.yml   the scheduled job (must live at the repo root)
```
