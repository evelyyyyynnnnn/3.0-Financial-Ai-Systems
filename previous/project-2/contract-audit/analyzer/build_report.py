#!/usr/bin/env python3
"""Audit every contract under contracts/ and write data/data.json.

    python analyzer/build_report.py
    python analyzer/build_report.py --contracts path/to/dir --fail-on critical

Exits non-zero when a finding at or above --fail-on is present, so the same
command works as a CI gate.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import sys
from datetime import datetime, timezone

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))
from analyzer.detectors import analyze, DETECTORS, SEVERITY_ORDER   # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "data.json"

CONTEXT = 3   # source lines shown either side of a finding


def snippet(src: str, line: int, context: int = CONTEXT):
    lines = src.split("\n")
    lo = max(1, line - context)
    hi = min(len(lines), line + context)
    return {"start": lo,
            "lines": [{"n": n, "text": lines[n - 1]} for n in range(lo, hi + 1)]}


def audit_file(path: pathlib.Path, rel: str):
    src = path.read_text(encoding="utf8", errors="replace")
    findings = analyze(src)
    out = []
    for f in findings:
        d = f.to_dict()
        d["snippet"] = snippet(src, f.line)
        out.append(d)
    counts = {}
    for f in findings:
        counts[f.severity] = counts.get(f.severity, 0) + 1
    return {
        "path": rel,
        "lines": src.count("\n") + 1,
        "counts": counts,
        "findings": out,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--contracts", type=pathlib.Path, default=ROOT / "contracts")
    ap.add_argument("--out", type=pathlib.Path, default=OUT)
    ap.add_argument("--fail-on", choices=list(SEVERITY_ORDER),
                    help="exit non-zero if a finding at or above this severity exists")
    args = ap.parse_args()

    files = sorted(args.contracts.rglob("*.sol"))
    if not files:
        print(f"ERROR: no .sol files under {args.contracts}", file=sys.stderr)
        return 1

    contracts = []
    for p in files:
        rel = str(p.relative_to(args.contracts))
        row = audit_file(p, rel)
        contracts.append(row)
        n = len(row["findings"])
        print(f"  {rel}: {n} finding{'' if n == 1 else 's'}")

    totals = {}
    for c in contracts:
        for sev, n in c["counts"].items():
            totals[sev] = totals.get(sev, 0) + n

    payload = {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "contracts_scanned": len(contracts),
        "totals": totals,
        "detectors": [{"name": d.__name__.replace("_", "-"),
                       "doc": (d.__doc__ or "").strip().split("\n")[0]}
                      for d in DETECTORS],
        "method_note": (
            "Static pattern analysis over lightly-parsed source. Comments and string "
            "literals are blanked before matching, preserving line numbers, so a "
            "pattern inside a comment or a revert message never fires. Every finding "
            "carries the line that triggered it and states how it produces false "
            "positives — the tool narrows what a human reads, it does not replace them."),
        "contracts": contracts,
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(payload, indent=1), encoding="utf8")

    summary = ", ".join(f"{n} {s}" for s, n in
                        sorted(totals.items(), key=lambda kv: SEVERITY_ORDER[kv[0]]))
    print(f"\nWrote {args.out} — {len(contracts)} contracts, "
          f"{sum(totals.values())} findings ({summary or 'none'}).")

    if args.fail_on:
        limit = SEVERITY_ORDER[args.fail_on]
        blocking = sum(n for s, n in totals.items() if SEVERITY_ORDER[s] <= limit)
        if blocking:
            print(f"FAIL: {blocking} finding(s) at or above {args.fail_on}.",
                  file=sys.stderr)
            return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
