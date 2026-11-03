"""Builds website/ from the last demo run."""
from __future__ import annotations
import pathlib
from . import sitekit as sk

ROOT = pathlib.Path(__file__).resolve().parent.parent
META = {
    "name": "Private Credit Data Provenance",
    "slug": "private-credit-data-provenance",
    "repo": "3.0-Financial-Ai-Systems",
    "pillar": "Financial Stability",
    "tagline": "Term extraction from private-credit documents where every value "
               "carries the character span it came from, so a wrong number can be "
               "found rather than merely suspected.",
    "tags": [("span-level citation", ""), ("abstention", ""),
             ("tamper-evident records", ""), ("authored corpus", "demo"),
             ("circular validation", "warn")],
    "banner": "Real term sheets are confidential, so the five documents here are "
              "authored for this project. The same person wrote the documents and the "
              "extractors, which makes the 100% value accuracy CIRCULAR — it shows the "
              "rules handle the cases they were written against, not that they "
              "generalise. The exact-span figure is the more honest number.",
}


def build_site(results: dict) -> pathlib.Path:
    # The real run and the authored run have different shapes; dispatch on the
    # flag the results file carries rather than on which keys happen to exist.
    if not results.get("is_synthetic", True):
        return build_site_real(results)

    c, v = results["corpus"], results["values"]
    so, se, t = results["spans_overlap"], results["spans_exact"], results["tamper"]

    metrics = sk.metric_grid([
        ("Value accuracy", f"{v['accuracy']:.0%}", f"{v['correct']}/{v['n']} cells"),
        ("Span accuracy", f"{so['span_accuracy']:.0%}", "overlap with true evidence"),
        ("Exact spans", f"{se['span_accuracy']:.0%}", "character-identical"),
        ("Invented values", v["wrong_or_invented"], "on absent fields"),
    ])

    field_tbl = sk.table(
        ["Field", "Correct", "Accuracy", "What makes it hard"],
        [["commitment_usd", f"{v['per_field']['commitment_usd']['correct']}/5",
          f"{v['per_field']['commitment_usd']['accuracy']:.0%}",
          "TS-003 states original, incremental and total; only the total is right"],
         ["spread_bps", f"{v['per_field']['spread_bps']['correct']}/5",
          f"{v['per_field']['spread_bps']['accuracy']:.0%}",
          "TS-002 carries a superseded S+700 that must not win"],
         ["floor_bps", f"{v['per_field']['floor_bps']['correct']}/5",
          f"{v['per_field']['floor_bps']['accuracy']:.0%}",
          "A 0.00% floor is a value; a missing floor is an abstention"],
         ["maturity_years", f"{v['per_field']['maturity_years']['correct']}/5",
          f"{v['per_field']['maturity_years']['accuracy']:.0%}",
          "\"seven (7) years\", \"Tenor: 6 years\", \"fifth anniversary\""],
         ["oid", f"{v['per_field']['oid']['correct']}/5",
          f"{v['per_field']['oid']['accuracy']:.0%}",
          "\"par\" is 100.0, not a missing value"],
         ["leverage_covenant", f"{v['per_field']['leverage_covenant']['correct']}/5",
          f"{v['per_field']['leverage_covenant']['accuracy']:.0%}",
          "Covenant-lite means genuinely absent, not zero"]])

    doc_tbl = sk.table(
        ["Document", "SHA-256", "Chars", "What it tests"],
        [[d["doc_id"], d["sha"], d["chars"], d["note"]]
         for d in results["documents"]], numeric_cols=(2,))

    span_rows = [[x["doc"], x["field"], x["result"],
                  str(x.get("predicted_span")), str(x.get("true_span")),
                  (x.get("quoted") or "")[:44]]
                 for x in results["span_details"]]
    span_tbl = sk.table(
        ["Doc", "Field", "Result", "Predicted", "True", "Quoted evidence"], span_rows)

    ex = results["example_report"]
    rec_rows = [[r["field"], str(r["value"]), r["rule"], r["confidence"],
                 (r["evidence"] or "—")[:46]] for r in ex["records"]]
    rec_tbl = sk.table(["Field", "Value", "Rule", "Confidence", "Evidence"],
                       rec_rows, numeric_cols=(3,))

    body = f"""
<section>
  <h2>Why the span is the product</h2>
  <div class="stack">
    <p>An extractor that returns <code>{{"spread_bps": 575}}</code> is unauditable. A
    reviewer cannot tell whether it read the right sentence, and a wrong-but-plausible
    number looks exactly like a right one. Every extraction here returns the value
    <em>and</em> the character range that produced it, so a disagreement is settled by
    looking at the document rather than by trusting the pipeline.</p>
    <p>Abstention is a first-class outcome. Two cells in this corpus are genuinely
    absent — a covenant-lite facility has no leverage test and no floor — and a system
    that invents values for them is worse than one that says it did not find them.
    This run invented {v['wrong_or_invented']}.</p>
  </div>
</section>

<section>
  <h2>This run</h2>
  <div class="stack-lg">
    {metrics}
    <p class="mono" style="color:var(--muted);font-size:12.5px">
      generated {sk.esc(results['generated_at'])} &middot;
      {c['n_documents']} documents &times; {c['n_fields']} fields &middot;
      {c['absent_instances']} genuinely absent cells
    </p>
    {field_tbl}
  </div>
</section>

<section>
  <h2>Two accuracies, and why both are needed</h2>
  <div class="stack-lg">
    {sk.table(["Measure", "Score", "What it catches"],
              [["Value accuracy", f"{v['accuracy']:.1%}",
                "Is the number right?"],
               ["Span overlap", f"{so['span_accuracy']:.1%}",
                "Did it come from the right place in the document?"],
               ["Span exact", f"{se['span_accuracy']:.1%}",
                "Is the quoted evidence character-identical to the ground truth?"]],
              numeric_cols=(1,))}
    <div class="note">
      <h3>The gap between the last two is the real finding</h3>
      <p>Every value came from a region overlapping the correct evidence, but only
      {se['span_accuracy']:.0%} of spans match the ground-truth range exactly. The
      extractors tend to capture the label as well as the value
      (<code>OID: 99.25</code> rather than <code>99.25</code>), which is harmless for
      a human reader and matters for anything that consumes spans programmatically.</p>
      <p>Reporting only the overlap figure would hide that. An extractor can also
      return the right number from the wrong sentence — correct today, wrong the moment
      the document changes, and undetectable without a span metric.</p>
    </div>
    {span_tbl}
  </div>
</section>

<section>
  <h2>Records that notice when the document changes</h2>
  <div class="stack-lg">
    {sk.table(["Check", "Result"],
              [["Record verifies against the original document",
                "pass" if t["verified_on_original"] else "FAIL"],
               ["Record rejects an edited document",
                "pass" if t["rejected_on_edited"] else "FAIL"],
               ["Reason given", t["reason"]]])}
    <p>Each record stores a hash of the source document alongside the span and the
    quoted evidence. Editing the spread from 5.75% to 6.75% invalidates every record
    for that document, which is the property that makes an extraction archive usable
    months later: a record that still verifies is one you can rely on.</p>
  </div>
</section>

<section>
  <h2>The corpus</h2>
  <div class="stack-lg">
    {doc_tbl}
  </div>
</section>

<section>
  <h2>A full extraction report — {sk.esc(ex['doc_id'])}</h2>
  <div class="stack-lg">
    {rec_tbl}
    <p>Written to <code>data/extractions/{sk.esc(ex['doc_id'])}.json</code>. The
    <code>rule</code> column names which pattern fired, so a systematic error can be
    traced to one rule rather than to "the extractor".</p>
  </div>
</section>

<section>
  <h2>Reproduce it</h2>
  <div class="stack">
    <pre>cd private-credit-data-provenance
pip install -r requirements.txt
python -m pytest tests/ -q
python -m src.demo</pre>
  </div>
</section>

<section>
  <h2>What this does not establish</h2>
  <div class="stack">
    <ul class="tight">
      <li><strong>The accuracy figures are circular.</strong> The same person wrote the
      documents and the rules. 100% shows the rules handle the cases they were written
      against; it says nothing about an unseen term sheet.</li>
      <li>Five documents. Real private-credit paper runs to tens of pages with
      defined terms, cross-references and schedules, none of which are here.</li>
      <li>Rule-based extraction of the kind used here degrades sharply on unseen
      phrasings. The rule names in every record exist so that degradation is
      diagnosable, not so it can be denied.</li>
      <li>No PDF or OCR layer. Real documents arrive as scans, and layout-aware
      extraction is a different problem from the one solved here.</li>
      <li>Nothing here has been run against a real portfolio, and no regulatory
      reporting claim follows from it.</li>
    </ul>
  </div>
</section>
"""
    return sk.build(ROOT, META, body, results)


# --------------------------------------------------------------------------
# Real-data page: extraction from real BDC filings, where span support is
# checkable without an answer key and accuracy is not.
# --------------------------------------------------------------------------

REAL_META = dict(META)
REAL_META.update({
    "tags": [("real BDC 10-Ks", "real"), ("span-level provenance", ""),
             ("abstains rather than guesses", ""), ("no answer key", "")],
    "banner": "Run on real business-development-company 10-K filings retrieved from SEC "
              "EDGAR, with URLs, hashes and retrieval times recorded in "
              "data/MANIFEST.json. Every extracted value carries the exact character "
              "span it came from, so a wrong number can be located rather than merely "
              "suspected.",
    "datanote": "Built from results/latest-real.json. Nobody has annotated a real BDC "
                "schedule of investments with the values an extractor ought to return, "
                "so precision and recall have no denominator; span support does, and is "
                "reported instead.",
})


def build_site_real(results: dict) -> pathlib.Path:
    pc = results["provenance_check"]
    docs = results.get("documents", [])
    per = results.get("per_document", [])

    metrics = sk.metric_grid([
        ("Span support rate", f"{pc['span_support_rate'] * 100:.1f}%",
         "cited spans that contain their value"),
        ("Values extracted", pc["extracted_values"], "across all filings"),
        ("Fields abstained on", pc["abstentions"], "declined rather than guessed"),
        ("Spans that failed", pc["spans_not_supporting_their_value"],
         "cited a span without the value"),
    ])

    support_chart = sk.bar_chart(
        [("spans supporting their value", pc["spans_supporting_their_value"]),
         ("fields abstained on", pc["abstentions"]),
         ("spans not supporting", pc["spans_not_supporting_their_value"])],
        fmt="{:.0f}")

    check_tbl = sk.table(
        ["", "Count"],
        [["Values extracted", pc["extracted_values"]],
         ["Spans that do contain the value cited",
          pc["spans_supporting_their_value"]],
         ["Spans that do not", pc["spans_not_supporting_their_value"]],
         ["Fields the extractor abstained on", pc["abstentions"]]],
        numeric_cols=(1,))

    doc_tbl = sk.table(
        ["Filing", "Schedule located", "Document characters", "SHA-256 (first 16)"],
        [[d["doc_id"], "yes" if d.get("schedule_located") else "no",
          f"{d.get('document_chars', 0):,}", d.get("sha256", "")] for d in docs],
        numeric_cols=(2,))

    per_tbl = sk.table(
        ["Filing", "Values extracted", "Fields abstained on"],
        [[p["doc_id"], p["n_extracted"], p["n_abstained"]] for p in per],
        numeric_cols=(1, 2))
    per_chart = sk.bar_chart(
        [(p["doc_id"], p["n_extracted"]) for p in per], fmt="{:.0f}")

    body = f"""
<section>
  <h2>This run</h2>
  <div class="stack-lg">
    {metrics}
    <p class="mono" style="color:var(--muted);font-size:12.5px">
      generated {sk.esc(results['generated_at'])} &middot;
      {len(docs)} filings &middot; {len(results.get('fields', []))} target fields
    </p>
  </div>
</section>

<section>
  <h2>The check that works without an answer key</h2>
  <div class="stack-lg">
    {support_chart}
    {check_tbl}
    <p>{sk.esc(pc.get('what_this_measures', ''))}</p>
  </div>
</section>

<section>
  <h2>Per filing</h2>
  <div class="stack-lg">
    {per_chart}
    {per_tbl}
    <p>Abstention is the designed behaviour, not a weakness being hidden. Counting the
    refusals is what makes the span-support rate meaningful: a extractor that guessed
    every field would have more values and a worse story.</p>
  </div>
</section>

<section>
  <h2>Source filings</h2>
  <div class="stack-lg">
    {doc_tbl}
  </div>
</section>

<section>
  <h2>What this run does not compute</h2>
  <div class="stack-lg">
    <div class="note">
      <h3>Accuracy has no denominator here</h3>
      <p>{sk.esc(results.get('accuracy_withheld_because', ''))}</p>
      <p>Span support says each cited span <em>contains</em> the value attributed to it.
      It says nothing about whether that value is the right one for the field, and the
      distinction is recorded in the result file rather than left to the reader.</p>
    </div>
  </div>
</section>

<section>
  <h2>Reproduce</h2>
  <div class="stack">
    <pre>python -m src.demo --real
# -&gt; results/latest-real.json
pytest -q</pre>
  </div>
</section>
"""
    return sk.build(ROOT, REAL_META, body, results)
