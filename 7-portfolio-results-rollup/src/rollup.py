"""Pull the headline measured figure out of each project's results."""

from __future__ import annotations

import re


def _get(d: dict, *path, default=None):
    """Walk a results payload by key, and by index into a list."""
    cur = d
    for k in path:
        if isinstance(cur, dict) and k in cur:
            cur = cur[k]
        elif isinstance(cur, list) and isinstance(k, int) and -len(cur) <= k < len(cur):
            cur = cur[k]
        else:
            return default
    return cur


# A project that cannot honestly compute a metric on real data says so in its
# own results, under "<topic>_withheld_because" or "<topic>_suppressed_because".
# To a reader, a withheld metric and an absent one look identical unless the
# roll-up says which it is -- and the reason is usually more informative than
# the number would have been.
WITHHELD_SUFFIXES = ("_withheld_because", "_suppressed_because")


def withheld(payload: dict) -> list:
    """Return [(topic, reason)] for every metric the project declined to report."""
    out = []
    for key, reason in (payload or {}).items():
        for suffix in WITHHELD_SUFFIXES:
            if key.endswith(suffix) and isinstance(reason, str) and reason.strip():
                topic = key[: -len(suffix)].replace("_", " ")
                out.append((topic, reason.strip()))
                break
    return sorted(out)


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
        ("Review items cut",
         _get(d, "comparison", "workload", "delta", "review_reduction_pct"),
         "percent (105 -> 59), but 6 more findings missed"),
        ("False alarms cut",
         _get(d, "comparison", "workload", "delta", "false_alarm_reduction_pct"),
         "percent (68 -> 28)"),
        ("Best detector macro-F1",
         (d.get("comparison", {}).get("leaderboard") or [{}])[0].get("macro_f1"),
         "held by the rule baseline -- the agent does not beat it"),
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
        ("Median beat-rate error vs the bedside monitor",
         _get(d, "beat_detection_vs_monitor", "median_difference_bpm"),
         "bpm, against an independent device's own algorithm"),
        ("Records agreeing within 5 bpm",
         _get(d, "beat_detection_vs_monitor", "within_5_bpm"),
         f"of {_get(d, 'beat_detection_vs_monitor', 'n_records_compared')} BIDMC records"),
        ("Worst-record error",
         _get(d, "beat_detection_vs_monitor", "max_absolute_difference_bpm"), "bpm"),
    ],
    "pyhealth-rhealth-extension": lambda d: [
        ("Leakage inflation", _get(d, "leakage", "inflation_pct"),
         "percent AUROC, row split vs subject split"),
        ("Package exports", _get(d, "package", "exports"), "public API"),
    ],
    "clinical-empathy-analysis": lambda d: [
        ("Real consultations scored", _get(d, "n_transcripts"),
         "MTS-Dialog doctor-patient transcripts"),
        ("Transcripts on which no cue fired",
         _get(d, "score_distribution", "share_with_no_cue"),
         "share -- the lexicon is silent on most real consultations"),
        ("Distinct cues that fired at all", _get(d, "n_distinct_cues_fired"),
         "the rest of the lexicon never matched"),
    ],
    "private-credit-data-provenance": lambda d: [
        ("Cited spans that contain their value",
         _get(d, "provenance_check", "span_support_rate"),
         "share -- checkable without an answer key, unlike accuracy"),
        ("Values extracted", _get(d, "provenance_check", "extracted_values"), ""),
        ("Fields abstained on", _get(d, "provenance_check", "abstentions"),
         "declined rather than guessed"),
    ],
    "tokenized-fixed-income-analytics": lambda d: [
        ("Stress latency ratio", _get(d, "stress", "median_latency_ratio"),
         "redemption queue lengthening"),
        ("Tokens analysed", _get(d, "universe_size"), "synthetic"),
    ],
    "filing-intelligence": lambda d: [
        ("Filings pulled from EDGAR",
         sum(1 for p in d.get("provenance", []) if p.get("status") == "ok"),
         "real 10-K pairs (manifest: URLs, hashes); no accuracy claimed -- "
         "real pairs carry no labelled change list"),
    ],
    "contagion-observatory": lambda d: [
        ("Trading days of real returns", _get(d, "universe", "n_days"),
         f"{_get(d, 'universe', 'first_date')} to {_get(d, 'universe', 'last_date')}"),
        ("Tail lift, unlinked pairs, raw",
         (d.get("tail_raw") or [{}])[0].get("tail_lift"),
         "how much co-crashing the raw series appear to show"),
        ("Tail lift, same pairs, after removing the common factor",
         (d.get("tail_residual") or [{}])[0].get("tail_lift"),
         "most of the apparent contagion was the market moving together"),
    ],
    "volatility-forecasting": lambda d: [
        ("Test R2", _get(d, "metrics", "test", "r2"),
         "realised-volatility LSTM on real ^GSPC, 2010-2023"),
        ("Test RMSE", _get(d, "metrics", "test", "rmse"), "held-out"),
    ],
    "portfolio-optimization-engine": lambda d: [
        ("DQN Sharpe", _get(d, "agents", "dqn", "sharpe_ratio"),
         "IN-SAMPLE -- the declared train/test split was read by no code"),
        ("SAC Sharpe", _get(d, "agents", "sac", "sharpe_ratio"),
         "in-sample; both agents lose money on their own training data"),
        ("Buy-and-hold SPY Sharpe, same period",
         _get(d, "baselines", "full", "buy-and-hold SPY", "sharpe_ratio"),
         f"total return {_get(d, 'baselines', 'full', 'buy-and-hold SPY', 'total_return')}"
         " -- the baseline the agents were said to underperform, now computed"),
    ],
    "optimization-under-uncertainty": lambda d: [
        ("Out-of-sample optimism, deterministic",
         next((r["optimism"] for r in d.get("optimism", [])
               if r.get("method", "").startswith("deterministic")), None),
         "CVaR the plan promised minus the CVaR it delivered"),
        ("Out-of-sample optimism, robust (box)",
         next((r["optimism"] for r in d.get("optimism", [])
               if r.get("method", "").startswith("robust")), None),
         "the point of robust optimisation, measured"),
        ("Assets", _get(d, "portfolio", "n_assets"), "real Fama-French industries"),
    ],
    "quant-productivity-toolkit": lambda d: [
        ("Days of real factor history", _get(d, "factors", "n_days"),
         f"{_get(d, 'factors', 'first')} to {_get(d, 'factors', 'last')}"),
        ("Best Sharpe found by searching a grid",
         _get(d, "selection", "best", "sharpe"),
         f"of {_get(d, 'selection', 'n_strategies_tried')} strategies tried -- "
         "a selection-bias demonstration, not a strategy"),
        ("Lookahead detector, forward correlation of the planted leak",
         _get(d, "lookahead", "cases", 0, "max_forward_corr"),
         "caught: a feature that copies next period's return"),
    ],
    "decision-audit-framework": lambda d: [
        ("Decisions replayed to the same action",
         _get(d, "replay", "reproduced"),
         f"of {_get(d, 'replay', 'n')} on real UCI credit records"),
        ("Tampered record detected at index", _get(d, "tamper", "detected_at"),
         "one field edited in a hash-chained ledger"),
        ("Largest disagreement between occlusion and exact Shapley",
         _get(d, "max_disagreement"),
         "two attribution methods on the same decision"),
    ],
    "icu-triage-optimization": lambda d: [
        ("Operating points on the Pareto front held by the model",
         _get(d, "pooled", "front_share_model"),
         "share, model vs the single-vital baseline"),
        ("Knee-point sensitivity", _get(d, "knee", "sensitivity"),
         f"at {_get(d, 'knee', 'false_alerts_per_100')} false alerts per 100 stays"),
        ("Observations", _get(d, "n_observations"),
         "a demonstration on the MIMIC-IV demo, not a study"),
    ],
    "decision-benchmark-suite": lambda d: [
        ("Irreducible regret against the clairvoyant oracle",
         _get(d, "oracle_gap", "irreducible_regret"),
         "the floor no policy can beat -- reported so the table is readable"),
        ("Calibration error, empirical-fractile newsvendor",
         _get(d, "newsvendor", "policies", "empirical fractile", "calibration", "ece"),
         "a policy can be near-optimal and badly calibrated at once"),
    ],
    "data-provenance-library": lambda d: [
        ("Filers traced to the character span they were filed in",
         len(d.get("companies") or []) or None, "SEC EDGAR XBRL, as filed"),
        ("Fetches that failed and are recorded as failures",
         len(d.get("failures") or []) or None, "not silently dropped"),
        ("Package exports", _get(d, "package", "exports"),
         f"{_get(d, 'package', 'name')}, not published"),
    ],
    "llm-eval-calibration-harness": lambda d: [
        ("Questions built from filed values", _get(d, "suite", "n_questions"),
         "every answer checkable against SEC EDGAR"),
        ("Accuracy spread between best and worst answerer",
         _get(d, "separation", "spread"),
         "the harness separates behaviours"),
        ("Fabrication rate, the careful answerer",
         _get(d, "models", "careful", "fabrication_rate"),
         "stubs, not language models -- see no_model_caveat"),
    ],
    "risk-portfolio-saas": lambda d: [
        ("Observations", _get(d, "observations"),
         f"{_get(d, 'window', 'first')} to {_get(d, 'window', 'last')}"),
        ("Cornish-Fisher VaR, equal-weight",
         _get(d, "reports", "EQUAL-WEIGHT", "risk", "var_cornish_fisher"),
         f"vs {_get(d, 'reports', 'EQUAL-WEIGHT', 'risk', 'var_gaussian')} Gaussian "
         "-- the tail correction is the point"),
        ("Industries", _get(d, "n_tickers"), "real Fama-French returns"),
    ],
}


def headline_with_error(project: str, payload: dict) -> tuple:
    """Return (rows, error). A shape change must not read as 'nothing measured'.

    The original swallowed every exception and returned an empty list, so a
    project whose results file changed shape looked exactly like a project that
    measured nothing -- which is how four real-data projects came to show blank
    rows. The error now travels with the result and is rendered.
    """
    # Folders may carry an ordering prefix like "1-"; match on the bare name too.
    bare = re.sub(r"^\d+-", "", project)
    fn = EXTRACTORS.get(project) or EXTRACTORS.get(bare)
    if not fn or not payload:
        return [], None
    try:
        return [(k, v, n) for k, v, n in fn(payload) if v is not None], None
    except Exception as exc:
        return [], f"{type(exc).__name__}: {exc}"


def headline(project: str, payload: dict) -> list:
    return headline_with_error(project, payload)[0]


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
