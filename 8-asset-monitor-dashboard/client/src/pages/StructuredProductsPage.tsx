import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import DashboardShell from "@/components/DashboardShell";

/**
 * Design reminder: professional, light, and simple.
 * Structured products should be presented as a hierarchy-first navigation page with clear escalation into MBS.
 */
const branches = [
  {
    title: "MBS",
    href: "/assets/structured-products/mbs",
    summary: "The first live branch for mortgage-backed securities, including the user's requested starter list.",
  },
  {
    title: "ABS",
    href: "/assets/structured-products",
    summary: "Reserved for future asset-backed security tracking and collateral segmentation.",
  },
  {
    title: "CMBS",
    href: "/assets/structured-products",
    summary: "Prepared for future commercial mortgage-backed security monitoring.",
  },
  {
    title: "CLO / Tranches",
    href: "/assets/structured-products",
    summary: "A future branch for senior, mezzanine, and equity tranche coverage.",
  },
];

export default function StructuredProductsPage() {
  return (
    <DashboardShell
      eyebrow="Assets / Structured Products"
      title="Begin structured-product coverage from an explicit hierarchy."
      description="This page is intentionally simple: it establishes the category structure first, then directs the first working branch into MBS. That approach keeps future expansion orderly as new securitized-credit pages are added."
      breadcrumbs={[
        { label: "Assets", href: "/assets" },
        { label: "Structured Products" },
      ]}
      aside={
        <div className="panel-muted rounded-[1.75rem] p-6">
          <p className="eyebrow">Implementation note</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>MBS is the first explicit subpage because the attachment provided starter instruments for that branch.</p>
            <p>ABS, CMBS, and tranche-level pages can be added later without changing the top navigation.</p>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {branches.map((branch) => {
          const isDirectPage = branch.title === "MBS";
          return (
            <Link
              key={branch.title}
              href={branch.href}
              className="panel-soft group rounded-[1.75rem] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="tag-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
                    {isDirectPage ? "Open subpage" : "Planned branch"}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="font-display text-2xl text-slate-950">{branch.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{branch.summary}</p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-800" />
              </div>
            </Link>
          );
        })}
      </div>
    </DashboardShell>
  );
}
