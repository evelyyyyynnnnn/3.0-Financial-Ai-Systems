# Historical archive

Earlier projects that used to sit at the top level of 3.0 Financial AI Systems. They were moved out
during the portfolio restructure because they are off-theme, third-party, or superseded
by the numbered projects beside this folder. They are kept here as a record of prior
work, not as current claims.

**Nothing in this folder is part of the portfolio's results.** The test workflow walks
only top-level directories that contain a `tests/` directory; this folder has none at its
root, so CI does not run, install, or measure anything in here. No figure quoted anywhere
else in this repository comes from these files.

10 project(s), 318 files:

- `Portfolio-Monitoring-Workspace/`
- `archived-investment-dashboard/`
- `code-pipeline/`
- `credit-risk-ai/`
- `financial-network-risk/`
- `giant-portfolio/`
- `high-frequency-strategy/`
- `live-trading-engine/`
- `reference-options-volatility-trading/`
- `trading-system-dashboard-2/`

## What was changed before publishing

These files are public. Credentials and local paths that were hard-coded in the
originals have been replaced; everything else is byte-for-byte as it was.

- live-trading-engine/ -- an Alpaca paper-trading key id and secret were hard-coded in five files (README.md, config.json, authentication.cpp, main.cpp, Python/authentication.py). Both are replaced by REDACTED_* placeholders.
- archived-investment-dashboard/API_INFO.md -- a Google AI API key, replaced by a placeholder.
- live-trading-engine/.vscode/settings.json -- editor config naming a local directory; excluded by .gitignore and not committed.
- Absolute paths naming the author's machine were replaced with <local path removed> in live-trading-engine/, reference-options-volatility-trading/ and code-pipeline/.

The replaced credentials were real and had already been committed to this
repository's public history before the restructure, so redacting them here
limits further spread but does not undo that exposure. They should be treated
as compromised and revoked at the issuing provider.


Archived from `evelyyyyynnnnn/archive-prior-work`, restored 2026-09-14.
