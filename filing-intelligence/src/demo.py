"""Run the change detector over the labelled pairs."""
from __future__ import annotations
import json, pathlib, sys, time
from datetime import datetime, timezone
from .corpus import CORPUS, corpus_stats
from .score import score_corpus
from .sections import extract_risk_factors, find_item, split_risk_factors
from .edgar import is_configured

ROOT = pathlib.Path(__file__).resolve().parent.parent


def timing() -> dict:
    """How long the automated read takes, measured not estimated.

    This is the only honest half of a "time saved" claim. The other half is how
    long a person takes on the same documents, which has not been measured, so
    no reduction percentage is reported anywhere in this project.
    """
    t0 = time.perf_counter()
    for _ in range(20):
        for p in CORPUS:
            split_risk_factors(extract_risk_factors(p.prior))
            split_risk_factors(extract_risk_factors(p.current))
    elapsed = (time.perf_counter() - t0) / 20
    chars = sum(len(p.prior) + len(p.current) for p in CORPUS)
    return {"seconds_per_corpus_pass": round(elapsed, 5),
            "chars_processed": chars,
            "chars_per_second": round(chars / elapsed) if elapsed else 0,
            "human_baseline_measured": False}


def toc_check() -> dict:
    """Item 1A appears in the table of contents too. The first match is wrong."""
    doc = ("TABLE OF CONTENTS\nItem 1A. Risk Factors .......... 12\n"
           "Item 2. Properties .......... 40\n\n" + "filler. " * 40 +
           "\n\nItem 1A. Risk Factors\n\n" + "The real section body. " * 60 +
           "\n\nItem 1B. Unresolved Staff Comments\n")
    a, b = find_item(doc, "1A")
    picked = doc[a:b]
    return {"picked_the_body_not_the_toc": "real section body" in picked,
            "picked_len": b - a,
            "n_occurrences": doc.lower().count("item 1a")}


def run() -> dict:
    scored = score_corpus(CORPUS)
    results = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "is_synthetic": True,
        "data_source": "3 authored filing pairs with labelled changes (src/corpus.py)",
        "edgar_configured": is_configured(),
        "edgar_used_in_this_run": False,
        "corpus": corpus_stats(),
        "scoring": scored,
        "timing": timing(),
        "toc_check": toc_check(),
    }
    (ROOT / "results").mkdir(exist_ok=True)
    (ROOT / "results" / "latest.json").write_text(
        json.dumps(results, indent=2) + "\n", encoding="utf8")
    return results


def main() -> int:
    r = run()
    c, s = r["corpus"], r["scoring"]
    print(f"corpus: {c['n_pairs']} filing pairs, "
          f"{c['n_added']} added / {c['n_removed']} removed / "
          f"{c['n_reworded']} reworded / {c['n_unchanged']} unchanged (labelled)")
    print(f"\nmaterial changes recovered: {s['material_found']}/"
          f"{s['material_expected']} ({s['recall']:.0%})")
    print(f"false alarms on unchanged pairs: "
          f"{s['false_alarms_on_unchanged_pairs']} across {s['n_quiet_pairs']} pair(s)")
    print()
    for p in s["pairs"]:
        print(f"{p['company']} ({p['periods']}): {p['counts']['added']} added, "
              f"{p['counts']['removed']} removed, {p['counts']['reworded']} reworded, "
              f"{p['counts']['unchanged']} unchanged")
        for k in ("added", "removed", "reworded"):
            if p["per_kind"][k]["missed"]:
                print(f"    MISSED {k}: {p['per_kind'][k]['missed']}")
    t = r["timing"]
    print(f"\nthroughput: {t['chars_per_second']:,} chars/s "
          f"({t['seconds_per_corpus_pass']*1000:.1f} ms per pass over "
          f"{t['chars_processed']:,} chars)")
    print(f"human baseline measured: {t['human_baseline_measured']}")
    tc = r["toc_check"]
    print(f"table-of-contents trap avoided: {tc['picked_the_body_not_the_toc']} "
          f"({tc['n_occurrences']} occurrences of 'Item 1A')")
    print(f"EDGAR configured for live pulls: {r['edgar_configured']} "
          f"(used in this run: {r['edgar_used_in_this_run']})")
    try:
        from .site import build_site
        build_site(r); print("\nwebsite/ rebuilt from this run")
    except Exception as exc:
        print(f"\n(site not rebuilt: {exc})", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
