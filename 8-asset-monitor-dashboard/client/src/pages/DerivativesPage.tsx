import DashboardShell from "@/components/DashboardShell";

/**
 * Design reminder: professional, light, and simple.
 * The derivatives page should describe future monitoring modules with clarity and restrained visual weight.
 */
const derivativeModules = [
  "Volatility regime and implied versus realized spread",
  "Options term structure and skew",
  "Hedge overlays for equity and fixed-income exposures",
  "Event windows and scenario planning",
  "Forward path into interest-rate derivatives and structured overlays",
];

export default function DerivativesPage() {
  return (
    <DashboardShell
      eyebrow="Assets / Derivative"
      title="A placeholder for volatility, hedging, and option-structure monitoring."
      description="The derivative section remains intentionally light in this revision. It is present so the overall site architecture matches the requested hierarchy, while leaving room for later expansion into options, futures, swaps, and rate-sensitive overlays."
      breadcrumbs={[
        { label: "Assets", href: "/assets" },
        { label: "Derivative" },
      ]}
      aside={
        <div className="panel-muted rounded-[1.75rem] p-6">
          <p className="eyebrow">Future fit</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>This page can later absorb both equity derivatives and interest-rate derivatives.</p>
            <p>For now, it serves as a clear branch in the asset hierarchy rather than a fully built analytics module.</p>
          </div>
        </div>
      }
    >
      <div className="page-surface rounded-[2rem] p-6 sm:p-8">
        <h3 className="font-display text-2xl text-slate-950">Planned monitoring modules</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {derivativeModules.map((module) => (
            <div key={module} className="panel-soft rounded-[1.5rem] p-5 text-sm leading-7 text-slate-600">
              {module}
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
