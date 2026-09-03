"""Build the portfolio roll-up."""
from __future__ import annotations
import json, pathlib, sys
from datetime import datetime, timezone
from .collect import discover
from .rollup import headline, portfolio_summary

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
             "status": "not evidenced",
             "detail": "0 filings pulled from EDGAR; no human baseline measured, "
                       "so no reduction percentage is computed anywhere."},
            {"claim": "7,500+ crypto and 6,000+ equities",
             "project": "contagion-observatory",
             "status": "not evidenced",
             "detail": "18 synthetic assets. The résumé supports this claim from "
                       "other work; this repository does not."},
            {"claim": "1.2M on-chain transactions; ChainTrust-Bench adopted by two "
                      "fintech startups",
             "project": "chaintrust-bench",
             "status": "partially addressed",
             "detail": "The benchmark now exists under that name with 17 authored "
                       "cases and a two-tier design. No mined corpus, no DOI, no "
                       "release, no adopters."},
            {"claim": "LLM audit agents cut manual audit workload 65%",
             "project": "llm-audit-agent",
             "status": "contradicted by the run",
             "detail": "Measured review-load change is 0.0% with the stub backend, "
                       "and the agent currently loses to the rule-based baseline "
                       "overall. No language model has been run against the corpus."},
            {"claim": "12,000 ICU patients, 58,000 waveform-hours, 22% false-alert cut",
             "project": "icu-early-warning",
             "status": "not evidenced",
             "detail": "400 synthetic patients, 4 synthetic waveform-hours. Measured "
                       "false-alert reduction is 8.7% at matched sensitivity, on "
                       "synthetic data."},
            {"claim": "PyHealth / RHealth extensions used by external research groups",
             "project": "pyhealth-rhealth-extension",
             "status": "partially addressed",
             "detail": "An installable package now exists. It is not published to "
                       "PyPI, so it has no downloads and no users."},
        ],
    }
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results" / "latest.json").write_text(
        json.dumps(results, indent=2) + "\n", encoding="utf8")
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
