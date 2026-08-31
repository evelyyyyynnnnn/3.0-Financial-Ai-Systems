"""Pull the headline measured figure out of each project's results."""

from __future__ import annotations


def _get(d: dict, *path, default=None):
    cur = d
    for k in path:
        if isinstance(cur, dict) and k in cur:
            cur = cur[k]
        else:
            return default
    return cur


# Each entry says how to read one project's headline result. Keeping these in
# one table, rather than scattered through the site, means a project whose
# results file changes shape fails loudly here instead of quietly reporting a
# stale number somewhere else.
EXTRACTORS = {
    "chaintrust-bench": lambda d: [
        ("Baseline macro-F1, seed tier", _get(d, "tiers", "seed", "macro_f1"), ""),
        ("Baseline macro-F1, hard tier", _get(d, "tiers", "hard", "macro_f1"),
         "headroom the benchmark exists to create"),
        ("Corpus size", _get(d, "corpus", "n_cases"), "cases"),
    ],
    "llm-audit-agent": lambda d: [
        ("Agent macro-F1, hard tier",
         _get(d, "comparison", "per_tier", "hard", "agent_f1"),
         "baseline scores 0.000 here"),
        ("Agent macro-F1, seed tier",
         _get(d, "comparison", "per_tier", "seed", "agent_f1"),
         "baseline scores 1.000 — the agent regresses"),
        ("Review-load change",
         _get(d, "comparison", "workload", "delta", "review_reduction_pct"),
         "percent, at equal corpus"),
    ],
    "agent-verification-harness": lambda d: [
        ("Precision", _get(d, "grounding", "precision"), "on flagged claims"),
        ("Recall", _get(d, "grounding", "recall"), "of bad claims caught"),
        ("Claims checked", _get(d, "grounding", "n_claims"), ""),
    ],
    "blockchain-shared-charging": lambda d: [
        ("Gas per session", _get(d, "gas", "per_session"), "estimated"),
        ("L1 overhead at 20 gwei",
         next((r["overhead_pct"] for r in d.get("viability", [])
               if r.get("gas_price_gwei") == 20), None),
         "percent of session value — not viable"),
    ],
    "icu-early-warning": lambda d: [
        ("AUROC, hypotension",
         _get(d, "events", "hypotension", "models", "gradient boosting + isotonic",
              "auroc"), "4-hour horizon"),
        ("Calibration ECE",
         _get(d, "events", "hypotension", "models", "gradient boosting + isotonic",
              "ece"), "after isotonic"),
        ("False-alert reduction",
         _get(d, "events", "hypotension", "false_alert_reduction",
              "false_alert_reduction_pct"),
         "percent, at matched 80% sensitivity"),
    ],
    "physiological-waveform-pipeline": lambda d: [
        ("Artifact rejection F1", _get(d, "rejection", "f1"), "vs injected truth"),
        ("Specificity", _get(d, "rejection", "specificity"), "clean windows kept"),
        ("Waveform-hours", _get(d, "dataset", "waveform_hours"), "synthetic"),
    ],
    "pyhealth-rhealth-extension": lambda d: [
        ("Leakage inflation", _get(d, "leakage", "inflation_pct"),
         "percent AUROC, row split vs subject split"),
        ("Package exports", _get(d, "package", "exports"), "public API"),
    ],
    "clinical-empathy-analysis": lambda d: [
        ("LOO correlation", _get(d, "evaluation", "model_loo", "pearson_r"),
         "circular — see the project page"),
        ("Transcripts", _get(d, "corpus", "n_transcripts"), "authored"),
    ],
    "private-credit-data-provenance": lambda d: [
        ("Value accuracy", _get(d, "values", "accuracy"), "circular"),
        ("Span accuracy, exact", _get(d, "spans_exact", "span_accuracy"), ""),
        ("Invented values", _get(d, "values", "wrong_or_invented"),
         "on genuinely absent fields"),
    ],
    "tokenized-fixed-income-analytics": lambda d: [
        ("Stress latency ratio", _get(d, "stress", "median_latency_ratio"),
         "redemption queue lengthening"),
        ("Tokens analysed", _get(d, "universe_size"), "synthetic"),
    ],
    "filing-intelligence": lambda d: [
        ("Material changes recovered", _get(d, "scoring", "recall"), "of labelled"),
        ("False alarms on unchanged pairs",
         _get(d, "scoring", "false_alarms_on_unchanged_pairs"), ""),
        ("Filings pulled from EDGAR", 0, "the client is unexercised"),
    ],
    "contagion-observatory": lambda d: [
        ("Edge recall", _get(d, "best", "recall"), "of constructed edges"),
        ("Edge precision", _get(d, "best", "precision"), "the honest cost"),
        ("True edges", _get(d, "universe", "n_true_edges"),
         f"of {_get(d, 'universe', 'n_candidate_pairs')} pairs"),
    ],
}


def headline(project: str, payload: dict) -> list:
    fn = EXTRACTORS.get(project)
    if not fn or not payload:
        return []
    try:
        return [(k, v, n) for k, v, n in fn(payload) if v is not None]
    except Exception:
        return []


def portfolio_summary(projects: list) -> dict:
    run = [p for p in projects if p.has_results]
    synthetic = [p for p in run if p.is_synthetic]
    real = [p for p in run if p.is_synthetic is False]
    return {
        "n_projects": len(projects),
        "n_with_results": len(run),
        "n_never_run": len(projects) - len(run),
        "n_synthetic_data": len(synthetic),
        "n_real_data": len(real),
        "n_with_site": sum(1 for p in projects if p.has_site),
        "total_tests": sum(p.n_tests for p in projects),
        "repos": sorted({p.repo for p in projects}),
    }
