# previous/

Everything that was at the top level of `3.0-Financial-Ai-Systems` before the restructure, moved
here unchanged. Nothing was deleted, and history is preserved — these were moved
with `git mv`.

- `project-1`
- `project-2`
- `roadmap`
- `scripts`
- `project-overview.xlsx`
- `PREVIOUS-README.md` (the former root `README.md`)

## Why this exists

The repository was restructured around the build-out plan in
`NIW_Project_Portfolio_and_Gap_Plan.xlsx`. The new top-level folders are project
slots named by that plan; this folder holds what was there before so nothing is
lost while the new structure is refined.

## Inventory and disposition

### `project-1`

Portfolio site: seven supporting projects plus the live 13F Giant Portfolio tracker, an archive/ of retired work and a reference/ of third-party code (RISK — exclude from the petition).

### `project-2`

Trustworthy Systems site: Filing Intelligence, Contagion Observatory and Contract Audit — the three CORE projects. Superseded by the rebuilt filing-intelligence/ and contagion-observatory/ at the repository root; contract-audit/ seeds ChainTrust-Bench in repo 1.0.

### `roadmap`

Scoping documents only for Private Credit Data Provenance and Tokenized Fixed-Income Analytics. Both are now build slots at the repository root.

### `scripts`

build_overview.py, build_site.py, refresh_data.py. Paths resolve relative to this folder, so they continue to work unchanged.

### `project-overview.xlsx`

Generated inventory of the archived layout.

### `PREVIOUS-README.md`

The former root `README.md`, renamed so it does not
collide with this inventory. Unchanged in content.

## A note on paths

`scripts/` resolves its output paths relative to its own parent directory, so
moving the whole tree together keeps `build_overview.py`, `build_site.py` and
`refresh_data.py` working unchanged.

The two GitHub Actions workflows must stay at the repository root under
`.github/workflows/` — Actions reads them from nowhere else — so they were left
in place and their paths repointed at `previous/`.

## Rules for citing anything in here

- Nothing under `previous/` is petition-grade as it stands.
- Forked or third-party code is flagged above. Label it clearly, never cite it,
  never count it.
- Where a new top-level project supersedes something here, its README names this
  folder as the seed.

---
Scaffold generated from `NIW_Project_Portfolio_and_Gap_Plan.xlsx` (sheets: Repo Build-Out Plan, Core Ideas at a Glance, NIW Claim vs Repo Evidence, Notion 创业 Alignment). Structure only — no results are claimed here yet.
