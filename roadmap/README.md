# Roadmap

Planned projects. **Nothing here is implemented** — these are scoping documents
that state the problem, the intended scope, and why the problem is worth
solving. They are kept separate from `project-1/` … `project-4/` precisely so
that distinction is visible from the directory tree rather than only from a
status line at the bottom of a README.

When one of these is actually built, it graduates to its own numbered project
directory and comes off this list.

| Project | Problem it would address |
|---|---|
| [Private Credit Data Provenance](private-credit-data-provenance/README.md) | Term extraction from private credit documents where every value carries a citation back to the source span, so a figure feeding a risk decision can be re-derived without re-running the model. |
| [Tokenized Fixed-Income Analytics](tokenized-fixed-income-analytics/README.md) | Liquidity, holder concentration, and redemption latency for tokenized debt, measured from on-chain trade data rather than from the prospectus. |

Both were relocated from `1.0-Secure-Ai-Agent-Infrastructure`: the work is
financial data analysis rather than security engineering, so it belongs with
the finance projects.
