import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import DashboardShell from "@/components/DashboardShell";
import { assetSubpages } from "@/lib/assetData";

/**
 * Design reminder: professional, light, and simple.
 * The assets page should behave like a clean entry directory for the instrument hierarchy.
 */
const sideNotes = [
  "This section is the operational entry point for security-level coverage.",
  "Equity contains the live watchlist structure first; the other asset classes remain ready for deeper buildout.",
  "Structured Products includes an MBS branch now so future securitized-credit pages can grow without changing navigation.",
];

export default function AssetsPage() {
  return (
    <DashboardShell
      eyebrow="Assets"
      title="Track assets through a clean subpage hierarchy."
      description="The assets section is organized as a straightforward navigation layer: Equity, Fixed Income, Derivative, and Structured Products. Each page is designed to support later expansion into more detailed instruments, screens, and analytics."
      breadcrumbs={[{ label: "Assets" }]}
      aside={
        <div className="panel-muted rounded-[1.75rem] p-6">
          <p className="eyebrow">Structure note</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            {sideNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {assetSubpages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="panel-soft group rounded-[1.75rem] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="tag-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
                  Subpage
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-display text-2xl text-slate-950">{page.name}</h3>
                <p className="max-w-md text-sm leading-7 text-slate-600">{page.summary}</p>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-800" />
            </div>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
