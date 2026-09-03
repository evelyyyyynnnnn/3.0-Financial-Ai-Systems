import DashboardShell from "@/components/DashboardShell";

/**
 * Design reminder: professional, light, and simple.
 * The fixed income page should feel structured, calm, and ready for expansion into rates and credit coverage.
 */
const focusAreas = [
  "Government bonds and US Treasuries",
  "Sovereign bonds and inflation-linked debt",
  "Investment grade and high yield corporate credit",
  "Structured finance including ABS, MBS, CMBS, and CLO branches",
  "Duration, curve shape, spread behavior, and issuance monitoring",
];

export default function FixedIncomePage() {
  return (
    <DashboardShell
      eyebrow="Assets / Fixed Income"
      title="A placeholder for rates, credit, and structured-finance monitoring."
      description="The new brief treats fixed income as one of the primary asset subpages. This page is therefore kept simple and expandable, with emphasis on the categories and lenses that should guide future data integration."
      breadcrumbs={[
        { label: "Assets", href: "/assets" },
        { label: "Fixed Income" },
      ]}
      aside={
        <div className="panel-muted rounded-[1.75rem] p-6">
          <p className="eyebrow">Future additions</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>Add benchmark yields, spread monitors, and bond ETF references once a live data source is selected.</p>
            <p>MBS now sits under Structured Products so securitized detail can be separated cleanly from the broader fixed-income overview.</p>
          </div>
        </div>
      }
    >
      <div className="page-surface rounded-[2rem] p-6 sm:p-8">
        <h3 className="font-display text-2xl text-slate-950">Coverage framework</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {focusAreas.map((area) => (
            <div key={area} className="panel-soft rounded-[1.5rem] p-5 text-sm leading-7 text-slate-600">
              {area}
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
