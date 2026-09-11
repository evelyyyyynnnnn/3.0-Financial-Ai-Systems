"""Build the portfolio roll-up."""
from __future__ import annotations
import json, pathlib, sys
from datetime import datetime, timezone
from .collect import discover
from .rollup import headline, portfolio_summary
from .report import render as render_readme

ROOT = pathlib.Path(__file__).resolve().parent.parent


def run() -> dict:
    projects = discover()
    summary = portfolio_summary(projects)
    rows = []
    for p in projects:
        rows.append({**p.as_dict(),
                     "headline": [{"metric": k, "value": v, "note": n}
                                  for k, v, n in headline(p.project, p.payload)]})
    results = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "is_synthetic": True,
        "data_source": "each project's own results/latest.json",
        "summary": summary,
        "projects": rows,
        "claims_status": [
            {"claim": "600+ filings analysed; ~70% cut in processing time",
             "project": "filing-intelligence",
             "status": "partially addressed",
             "detail": "Real 10-K filings are now retrieved from SEC EDGAR with a data "
                       "manifest (URLs, sha256, retrieval times) and Item 1A is "
                       "extracted per filing. No processing-time reduction is claimed "
                       "here: real filing pairs carry no human-annotated change list, "
                       "so no baseline or percentage is computed."},
            {"claim": "7,500+ crypto and 6,000+ equities",
             "project": "contagion-observatory",
             "status": "not evidenced in this repo",
             "detail": "This repo now runs on real Fama-French 10-industry daily "
                       "returns (756 trading days, 90 candidate pairs) from the "
                       "Kenneth R. French Data Library, with a manifest. The "
                       "7,500-crypto / 6,000-equity scale is from other work and is "
                       "not reproduced here."},
            {"claim": "1.2M on-chain transactions; ChainTrust-Bench adopted by two "
                      "fintech startups",
             "project": "chaintrust-bench",
             "status": "partially addressed",
             "detail": "The benchmark now runs on 121 real SmartBugs-curated contracts "
                       "across seven vulnerability classes, not authored cases. There "
                       "is still no 1.2M-transaction corpus, no DOI or release, and no "
                       "adopters."},
            {"claim": "LLM audit agents cut manual audit workload 65%",
             "project": "llm-audit-agent",
             "status": "partially addressed",
             "detail": "A real open language model (qwen2.5-coder:7b via Ollama) has "
                       "now been run: the agent re-checks each finding and drops the "
                       "ones it cannot verify (2 confirmed, 2 dropped on the worked "
                       "example). No 65% workload reduction is measured, and on the "
                       "121-case SmartBugs corpus the agent does not beat the "
                       "rule-based baseline on macro-F1."},
            {"claim": "12,000 ICU patients, 58,000 waveform-hours, 22% false-alert cut",
             "project": "icu-early-warning",
             "status": "partially addressed",
             "detail": "Runs on the real PhysioNet MIMIC-IV demo (~100 ICU stays -- a "
                       "demonstration, not a study). At matched sensitivity, "
                       "calibrated logistic risk cuts false alerts 19.4% for "
                       "hypotension (6.5% for hypoxemia) and improves calibration "
                       "(ECE 0.42 -> 0.045). The 12,000-patient / 58,000-hour scale is "
                       "from other work, not this demo."},
            {"claim": "PyHealth / RHealth extensions used by external research groups",
             "project": "pyhealth-rhealth-extension",
             "status": "partially addressed",
             "detail": "An installable package now exists. It is not published to "
                       "PyPI, so it has no downloads and no external users."},
        ],
    }
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results" / "latest.json").write_text(
        json.dumps(results, indent=2) + "\n", encoding="utf8")
    # results/README.md is the file ground rule 1 points a reader at, so it
    # is written from this run rather than maintained by hand.
    (ROOT / "results" / "README.md").write_text(
        render_readme(results), encoding="utf8")
    return results


def main() -> int:
    r = run()
    s = r["summary"]
    print(f"portfolio: {s['n_projects']} projects across {len(s['repos'])} repositories")
    print(f"  with a recorded run : {s['n_with_results']}")
    print(f"  never run           : {s['n_never_run']}")
    print(f"  on synthetic data   : {s['n_synthetic_data']}")
    print(f"  on real data        : {s['n_real_data']}")
    print(f"  with a website      : {s['n_with_site']}")
    print(f"  total tests         : {s['total_tests']}")
    print()
    cur = None
    for p in r["projects"]:
        if p["repo"] != cur:
            cur = p["repo"]
            print(f"[{cur}]")
        mark = "ok " if p["has_results"] else "-- "
        print(f"  {mark}{p['project']:<34}{p['n_tests']:>3} tests")
        for h in p["headline"]:
            print(f"        {h['metric']:<34}{h['value']}")
    print("\npetition claims vs what the portfolio can show:")
    for c in r["claims_status"]:
        print(f"  [{c['status']}] {c['claim'][:72]}")
    try:
        from .site import build_site
        build_site(r); print("\nwebsite/ rebuilt from this run")
    except Exception as exc:
        print(f"\n(site not rebuilt: {exc})", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
