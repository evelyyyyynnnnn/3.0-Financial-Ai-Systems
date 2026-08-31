# Private Credit Data Provenance

Verifiable extraction of terms from private credit and alternative-asset
documents, where every extracted value carries a citation back to the source
span that produced it.

> Relocated from `1.0-Secure-Ai-Agent-Infrastructure`. The work is financial
> data analysis, so it belongs with the finance projects; the provenance layer
> is a correctness property, not a security control.

## Problem

Private credit disclosure is thin, non-standard, and mostly prose. LLM
extraction pipelines produce a clean table and destroy the audit trail doing
it — a number lands in a risk model with no way to check which clause of which
document produced it, or whether that clause was later amended. For a figure
feeding a risk decision or a regulatory filing, uncitable is unusable.

## Scope

- **Span-anchored extraction** — every field carries document id, page,
  character span, and extraction confidence.
- **Term normalisation** — covenants, pricing grids, PIK toggles, call
  protection, and amendment lineage into a stable schema.
- **Contradiction detection** — flag where an amendment supersedes a base
  agreement term and the pipeline used the stale value.
- **Independent verification** — a reader can re-derive any field from the
  cited span without re-running the model.
- **Change tracking** — diff a term set across reporting periods.

## Relationship to the rest of this repository

The span-anchoring idea is already implemented, in a different domain, by
`project-2/` — every filing finding there quotes the sentence that produced it
rather than paraphrasing. This project would apply the same discipline to
private credit documents, where the extraction problem is harder because the
source is prose rather than a mandated Item structure.

## Why it matters now

Private credit has grown faster than its disclosure infrastructure. The
underlying documents are less standardised than public debt, and demand for
position-level transparency is rising from both allocators and regulators.
Extraction is the bottleneck, and unverifiable extraction is not a solution.

## Status

Scaffold. No implementation yet.
