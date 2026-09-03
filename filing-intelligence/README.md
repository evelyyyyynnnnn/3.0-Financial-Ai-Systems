# Filing Intelligence

> What CHANGED in a company's SEC risk disclosures since its prior filing — matched risk by risk, so reordering is not reported as change.

**Repository:** `3.0-Financial-Ai-Systems` &middot; **Pillar:** Financial Stability

## Status

This is working code with a runnable demo and 0 tests. It is **not** a
finished result.

This run used three authored filing pairs with labelled changes, NOT filings from EDGAR. The EDGAR client in src/edgar.py is real and unexercised — running it against the live universe is the step that would turn this into evidence, and it has not been run. No scale claim and no time-saving percentage appears anywhere on this page.

Last run: `2026-08-31T18:43:07+00:00`

## Quick start

```bash
pip install -r requirements.txt
python -m pytest tests/ -q     # 0 tests
python -m src.demo             # runs everything, rewrites results/ and website/
```

## Layout

```
README.md
data/
  |-- README.md
  |-- manifests/
  |-- sample/
docs/
  |-- DATA.md
  |-- EVIDENCE.md
  |-- METHOD.md
requirements.txt
results/
  |-- README.md
  |-- latest.json
src/
  |-- .gitkeep
  |-- __init__.py
  |-- corpus.py
  |-- demo.py
  |-- diff.py
  |-- edgar.py
  |-- score.py
  |-- sections.py
  |-- site.py
  |-- sitekit.py
tests/
  |-- .gitkeep
  |-- test_filing.py
website/
  |-- README.md
  |-- index.html
  |-- results.json
  |-- vercel.json
```

- `src/` &mdash; the implementation.
- `tests/` &mdash; pytest suite. These guard behaviour, not just imports.
- `results/latest.json` &mdash; the output of the last demo run. Every figure quoted
  anywhere in this project traces back to this file.
- `website/` &mdash; a self-contained static site, deployable to Vercel by copying the
  folder into its own repository. See `website/README.md`.

## The website

`website/` has no build step. To deploy it independently:

```bash
cp -r website/ ../my-filing-intelligence-site && cd ../my-filing-intelligence-site
git init && git add -A && git commit -m "site"
vercel deploy --prod
```

The page is regenerated from `results.json` on every `python -m src.demo`, so the
figures on the site and the figures the code produces cannot drift apart. Do not edit
numbers on the page by hand.

## Honesty note

Everything in this project runs on clearly-labelled synthetic or authored data.
Swap in the real source and the same pipeline reports real numbers &mdash; that is
what the structure is for. Until that happens, nothing here should be cited as a
measured result, and the site's closing section states explicitly what the project
does not establish.
