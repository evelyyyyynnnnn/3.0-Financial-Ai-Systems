"""Builds website/ from the last demo run."""
from __future__ import annotations
import pathlib
from . import sitekit as sk

ROOT = pathlib.Path(__file__).resolve().parent.parent
META = {
    "name": "Filing Intelligence",
    "slug": "filing-intelligence",
    "repo": "3.0-Financial-Ai-Systems",
    "pillar": "Financial Stability",
    "tagline": "What CHANGED in a company's SEC risk disclosures since its prior "
               "filing — matched risk by risk, so reordering is not reported as change.",
    "tags": [("Item 1A extraction", ""), ("risk-level matching", ""),
             ("authored pairs", "demo"), ("EDGAR not pulled", "warn")],
    "banner": "This run used three authored filing pairs with labelled changes, NOT "
              "filings from EDGAR. The EDGAR client in src/edgar.py is real and "
              "unexercised — running it against the live universe is the step that "
              "would turn this into evidence, and it has not been run. No scale claim "
              "and no time-saving percentage appears anywhere on this page.",
}


def build_site(results: dict) -> pathlib.Path:
    # The real run and the authored run have different shapes; dispatch on the
    # flag the results file carries rather than on which keys happen to exist.
    if not results.get("is_synthetic", True):
        return build_site_real(results)

    s, c, t, tc = (results["scoring"], results["corpus"], results["timing"],
                   results["toc_check"])

    metrics = sk.metric_grid([
        ("Material changes found", f"{s['material_found']}/{s['material_expected']}",
         f"{s['recall']:.0%} of labelled changes"),
        ("False alarms", s["false_alarms_on_unchanged_pairs"],
         "on the identical-filings pair"),
        ("Throughput", f"{t['chars_per_second']:,}", "characters per second"),
        ("Filings from EDGAR", "0", "the client is unexercised"),
    ])

    pair_tbl = sk.table(
        ["Company", "Periods", "Added", "Removed", "Reworded", "Unchanged", "Tests"],
        [[p["company"], p["periods"], p["counts"]["added"], p["counts"]["removed"],
          p["counts"]["reworded"], p["counts"]["unchanged"], p["note"]]
         for p in s["pairs"]],
        numeric_cols=(2, 3, 4, 5))

    change_rows = []
    for p in s["pairs"]:
        for ch in p["changes"]:
            if ch["kind"] != "unchanged":
                change_rows.append([p["company"], ch["kind"],
                                    f"{ch['similarity']:.2f}",
                                    ", ".join(ch["numbers_changed"][:4]) or "—",
                                    ch["summary"][:96]])
    change_tbl = sk.table(
        ["Company", "Kind", "Similarity", "Figures changed", "Summary"],
        change_rows, numeric_cols=(2,))

    body = f"""
<section>
  <h2>Why this is not a text diff</h2>
  <div class="stack">
    <p>The report a reader wants is: which risks are new, which are gone, and which are
    still there but now say something different. A positional diff cannot produce that,
    because risks get reordered between filings and the diff then reports the entire
    section as changed.</p>
    <p>So risks are matched across the two documents first, by token overlap, and only
    then classified. Matching is greedy rather than optimal — with a few dozen risks the
    difference is negligible, and greedy keeps every pairing explainable as "the best
    remaining match", which a reader can check.</p>
  </div>
</section>

<section>
  <h2>This run</h2>
  <div class="stack-lg">
    {metrics}
    <p class="mono" style="color:var(--muted);font-size:12.5px">
      generated {sk.esc(results['generated_at'])} &middot; {sk.esc(results['data_source'])}
    </p>
    {pair_tbl}
  </div>
</section>

<section>
  <h2>Every material change it reported</h2>
  <div class="stack-lg">
    {change_tbl}
    <div class="note">
      <h3>The quiet pair is the important one</h3>
      <p>Steadfast Services files an identical Item 1A in both periods, and the detector
      reports {s['false_alarms_on_unchanged_pairs']} material changes for it. That is
      the property that decides whether a tool like this gets used: a report that flags
      something every quarter is indistinguishable from not running it.</p>
      <p>Byte-identical risks are classified as unchanged only when similarity is above
      0.97 <em>and</em> no figure has moved. A risk whose wording is untouched but whose
      concentration percentage went from 31 to 42 is a material change, and catching
      that is most of the value here.</p>
    </div>
  </div>
</section>

<section>
  <h2>Finding the right Item 1A</h2>
  <div class="stack-lg">
    {sk.table(["Check", "Result"],
              [["Occurrences of 'Item 1A' in the test document", tc["n_occurrences"]],
               ["Selected the section body, not the table of contents",
                "yes" if tc["picked_the_body_not_the_toc"] else "NO"],
               ["Characters selected", tc["picked_len"]]],
              numeric_cols=(1,))}
    <p>A 10-K names Item 1A in its table of contents, in cross-references, and at the
    section itself. The naive first match lands in the table of contents every time.
    The rule used here is that the real heading is the occurrence followed by the most
    text before the next item heading — simple, checkable, and stated so a reader can
    judge it rather than trust it.</p>
  </div>
</section>

<section>
  <h2>Timing, and the number that is missing</h2>
  <div class="stack-lg">
    {sk.table(["Measure", "Value"],
              [["Characters processed per second", f"{t['chars_per_second']:,}"],
               ["Time for one pass over the corpus",
                f"{t['seconds_per_corpus_pass'] * 1000:.1f} ms"],
               ["Human baseline measured",
                "yes" if t["human_baseline_measured"] else "NO"]])}
    <div class="note">
      <h3>No time-saving percentage is claimed</h3>
      <p>Throughput is measured and reported above. A <em>reduction</em> figure needs
      two numbers — machine time and human time on the same documents — and the second
      has never been measured here. Dividing a measured machine time by an assumed human
      time produces a percentage that looks empirical and is not.</p>
      <p>Getting that number honestly means timing analysts reading the same filings,
      with the same task definition, and reporting the spread. Until then this page
      reports characters per second and nothing more.</p>
    </div>
  </div>
</section>

<section>
  <h2>Getting real filings in</h2>
  <div class="stack-lg">
    <p><code>src/edgar.py</code> implements the submissions API, rate limiting at the
    SEC's requested 10 requests per second, and the mandatory descriptive User-Agent.
    It is not called by the demo or the tests: a build whose output depends on a live
    third-party service is not reproducible, and a test suite should not be hitting
    EDGAR.</p>
    <pre>from src.edgar import fetch_company_filings, USER_AGENT
# set USER_AGENT to a real contact address first -- the SEC refuses requests without one
refs = fetch_company_filings(cik="0000320193", forms=("10-K",), limit=4)</pre>
    <p>Configured for live pulls: <strong>{"yes" if results['edgar_configured'] else "no"}</strong>.
    Filings pulled in this run: <strong>0</strong>.</p>
  </div>
</section>

<section>
  <h2>Reproduce it</h2>
  <div class="stack">
    <pre>cd filing-intelligence
pip install -r requirements.txt
python -m pytest tests/ -q
python -m src.demo</pre>
  </div>
</section>

<section>
  <h2>What this does not establish</h2>
  <div class="stack">
    <ul class="tight">
      <li><strong>No filings have been processed.</strong> Three authored pairs is a
      correctness test for the matching logic, not a corpus, and no scale claim
      follows from it.</li>
      <li>The pairs were written by the same person who wrote the matcher, so 100%
      recall here shows the rules handle the cases they were written against.</li>
      <li>Real Item 1A sections run to tens of thousands of words with nested
      sub-headings and exhibits; the paragraph splitter used here would need work
      before it survived one.</li>
      <li>Matching is lexical. Two risks describing the same exposure in different
      vocabulary will be reported as one removed and one added.</li>
      <li>No time-saving percentage, for the reason set out above.</li>
    </ul>
  </div>
</section>
"""
    return sk.build(ROOT, META, body, results)


# --------------------------------------------------------------------------
# Real-data page: risk-disclosure diffs on filings pulled live from EDGAR.
# --------------------------------------------------------------------------

REAL_META = dict(META)
REAL_META.update({
    "tags": [("real SEC EDGAR", "real"), ("live 10-K pairs", ""),
             ("risk-by-risk diff", ""), ("no answer key", "")],
    "banner": "Run on real 10-K filings retrieved from SEC EDGAR, with URLs, hashes and "
              "retrieval times recorded in data/MANIFEST.json. Each report matches the "
              "prior year's risk items against the current year's and classifies every "
              "change.",
    "datanote": "Built from results/latest-real.json. Real filing pairs carry no "
                "human-annotated list of material changes, so precision and recall have "
                "no denominator and the run reports what it found rather than how often "
                "it was right.",
})


def build_site_real(results: dict) -> pathlib.Path:
    reports = results.get("reports", [])
    timing = results.get("timing", {})
    tot = sum(r["counts"]["total"] for r in reports)
    mat = sum(r["counts"]["material"] for r in reports)
    biggest = max(reports, key=lambda r: r["counts"]["total"]) if reports else None

    metrics = sk.metric_grid([
        ("Filing pairs", len(reports), "pulled live from EDGAR"),
        ("Changes classified", f"{tot:,}", "added, removed, reworded, unchanged"),
        ("Material changes", f"{mat:,}", "across all pairs"),
        ("Throughput", f"{timing.get('chars_per_second', 0) / 1e6:.1f} M",
         "characters per second"),
    ])

    rep_tbl = sk.table(
        ["Company", "Period", "Risks prior → current", "Added", "Removed",
         "Reworded", "Unchanged", "Material"],
        [[r["company"], f"{r['prior_period']} → {r['current_period']}",
          f"{r['n_risks_prior']} → {r['n_risks_current']}",
          r["counts"]["added"], r["counts"]["removed"], r["counts"]["reworded"],
          r["counts"]["unchanged"], r["counts"]["material"]] for r in reports],
        numeric_cols=(3, 4, 5, 6, 7))

    total_chart = sk.bar_chart(
        [(r["company"], r["counts"]["total"]) for r in reports], fmt="{:.0f}")

    kind_chart = ""
    kind_tbl = ""
    if biggest:
        c = biggest["counts"]
        kind_chart = sk.bar_chart(
            [("reworded", c["reworded"]), ("unchanged", c["unchanged"]),
             ("removed", c["removed"]), ("added", c["added"])], fmt="{:.0f}")
        kind_tbl = sk.table(
            ["Classification", "Items", "Share of the pair"],
            [[k, c[k], f"{c[k] / c['total'] * 100:.1f}%"]
             for k in ("reworded", "unchanged", "removed", "added")],
            numeric_cols=(1, 2))

    body = f"""
<section>
  <h2>This run</h2>
  <div class="stack-lg">
    {metrics}
    <p class="mono" style="color:var(--muted);font-size:12.5px">
      generated {sk.esc(results['generated_at'])} &middot;
      EDGAR used in this run: {str(results.get('edgar_used_in_this_run', False)).lower()}
      &middot; {timing.get('chars_processed', 0):,} characters compared
    </p>
  </div>
</section>

<section>
  <h2>Every filing pair, as the run reported it</h2>
  <div class="stack-lg">
    {total_chart}
    {rep_tbl}
  </div>
</section>

<section>
  <h2>{"Inside the " + biggest["company"] + " pair" if biggest else "Change breakdown"}</h2>
  <div class="stack-lg">
    {kind_chart}
    {kind_tbl}
    <p>{"This pair moves from " + str(biggest["n_risks_prior"]) + " risk items to "
        + str(biggest["n_risks_current"]) + ", so a reader comparing headline counts "
          "would see a handful disappear. The diff shows "
        + str(biggest["counts"]["material"]) + " material movements underneath."
        if biggest else ""}</p>
  </div>
</section>

<section>
  <h2>What this run does not compute</h2>
  <div class="stack-lg">
    <div class="note">
      <h3>There is no labelled change list to score against</h3>
      <p>{sk.esc(results.get('accuracy_withheld_because', ''))}</p>
      <p>The throughput figure is a machine measurement with
      <code>human_baseline_measured: {str(timing.get('human_baseline_measured', False)).lower()}</code>
      beside it. No human comparison was run, so no time saving is quoted from it.</p>
    </div>
  </div>
</section>

<section>
  <h2>Reproduce</h2>
  <div class="stack">
    <pre>python -m src.demo --real   # pulls live from SEC EDGAR
# -&gt; results/latest-real.json
pytest -q</pre>
  </div>
</section>
"""
    return sk.build(ROOT, REAL_META, body, results)
