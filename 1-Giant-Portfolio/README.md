# Giant Portfolio Tracker — setup
The website can be found [here](https://giant-portfolio.vercel.app/)

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
   Vercel, set the root directory to `giant-portfolio-tracker/`. Every push
   to `main` redeploys automatically.

## After that, refreshing is hands-off

- The GitHub Action in `.github/workflows/refresh-data.yml` runs every
  Monday, re-pulls the Notion database, and commits `data.json` if anything
  changed. A commit to `main` triggers a Vercel redeploy — no manual step.
- To refresh immediately instead of waiting for Monday: repo → Actions tab →
  "Refresh portfolio data" → Run workflow.
- To change the schedule, edit the `cron` line in the workflow file.

## Running it locally / manually

```bash
export NOTION_TOKEN=ntn_xxxxxxxxxxxx
pip install requests
python scripts/refresh_data.py
```

This overwrites `giant-portfolio-tracker/data.json` in place. Commit and
push it yourself if you're not relying on the Action.

## Files

```
giant-portfolio-tracker/
  index.html      the site — never needs to change
  data.json        the data — this is what gets refreshed
scripts/
  refresh_data.py  pulls Notion, rewrites data.json
.github/workflows/
  refresh-data.yml the scheduled job
```
