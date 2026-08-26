# Regulatory Filing Intelligence

Reads a company's SEC 10-K / 10-Q filings and reports **what changed** in the
risk disclosures since the prior period — not a summary of the filing, but a
diff of it, with every finding quoted from the source.

Three kinds of finding:

| Kind | Meaning |
|---|---|
| **Escalated** | A prior sentence still survives inside this one, but the new wording carries risk language the old one did not. The disclosure got worse without being rewritten — these are the ones worth reading first. |
| **Added** | No prior sentence survives inside it. A genuinely new disclosure. |
| **Removed** | Carried risk language and is gone since the prior filing. |

## Why containment, not similarity

The obvious approach is `difflib.SequenceMatcher.ratio()`. It fails on the
case that matters most: a company keeps a risk factor word-for-word and
*extends* it with a new admission. Because `ratio()` is symmetric, the longer
new sentence scores low against the shorter old one, and the escalation is
misfiled as a brand-new disclosure — losing the very comparison that makes it
interesting.

So `analyze.py` scores by **containment**: how much of the *prior* sentence
still survives inside the current one. An extended disclosure scores near 1.0
and is correctly recognised as the same disclosure, escalated, with the prior
text carried alongside it so the change is checkable on the page.

## Running it

The site reads a pre-computed `data/data.json`. That is deliberate: a browser
cannot call EDGAR directly (CORS, and SEC's rate limits apply per-client), so
the pipeline runs ahead of time and the site is pure static.

**Sample data** ships in the repo so the site renders immediately. Its issuers
are fictional — attaching invented risk language to a real ticker would produce
something that reads like an SEC disclosure and is not one. The payload carries
`is_sample: true` and the site shows a banner saying so.

```bash
python pipeline/make_sample.py            # regenerate the sample
```

**Real filings** need only a contact string, which SEC requires of all API
clients:

```bash
export SEC_USER_AGENT="Your Name you@example.com"
python pipeline/build_dataset.py --tickers AAPL MSFT NVDA
```

With no `--tickers`, it refreshes whatever universe is already in
`data/data.json`, which is what the scheduled workflow does.

Or run it without any local setup: repo → Actions → **Refresh filing
intelligence** → Run workflow. GitHub's runners can reach EDGAR, and the job
commits the new `data.json`, which redeploys the site.

## Layout

```
index.html              the site
assets/app.js           renders data/data.json (no framework, no build)
assets/app.css          styles, light and dark
data/data.json          the dataset — this is what gets refreshed
pipeline/
  edgar_client.py       SEC EDGAR client (User-Agent + rate limit enforced)
  sections.py           flatten filing HTML, cut into Regulation S-K Items
  analyze.py            sentence diff, containment scoring, escalation signals
  build_dataset.py      orchestrates a live pull → data.json
  make_sample.py        the labelled fictional sample
```

No dependencies beyond the Python standard library.

## Deploying

Static. Point Vercel's root directory at `project-2/`; `vercel.json` pins a
no-build deploy.

## Escalation signals

`analyze.py` flags language that marks a materially different disclosure
rather than an edit: material adverse language, going concern, restatement,
impairment, regulatory action, cybersecurity incident, supply-chain
disruption, covenant breach, delisting, and loss of a major customer. The list
lives in one table at the top of the module and is meant to be extended.
