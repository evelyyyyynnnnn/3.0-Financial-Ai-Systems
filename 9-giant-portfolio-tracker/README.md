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

## After that, refreshing is hands-off

- The GitHub Action in `.github/workflows/refresh-data.yml` (at the
  repository root — GitHub Actions only reads workflows from that path, so a
  copy nested in this folder would be silently ignored) runs on the 1st of
  each month, re-pulls the Notion database, and commits `data.json` if
  anything changed. A commit to `main` triggers a Vercel redeploy — no
  manual step.
- To refresh immediately instead of waiting: repo → Actions tab →
  "Refresh portfolio data" → Run workflow.
- To change the schedule, edit the `cron` line in the workflow file.

## Running it locally / manually

```bash
export NOTION_TOKEN=ntn_xxxxxxxxxxxx
pip install requests
python refresh_data.py
```

This overwrites `data.json` in place, beside the script. Commit and push it
yourself if you're not relying on the Action.

## Files

This folder is flat on purpose: it *is* the Vercel site root, so the two
files the browser needs sit side by side at the top level.

```
9-giant-portfolio-tracker/     <- Vercel Root Directory
  index.html         the site — never needs to change
  data.json          the data — this is what gets refreshed
  refresh_data.py    pulls Notion, rewrites data.json
  .vercelignore      keeps the script and docs out of the published site
```

At the repository root, outside this folder:

```
.github/workflows/
  refresh-data.yml   the scheduled job (must live at the repo root)
```
