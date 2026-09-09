import DashboardShell from "@/components/DashboardShell";
import { mbsRows } from "@/lib/assetData";

/**
 * Design reminder: professional, light, and simple.
 * The MBS page should feel focused, structured, and ready for deeper securitized-credit analysis.
 */
export default function MbsPage() {
  return (
    <DashboardShell
      eyebrow="Assets / Structured Products / MBS"
      title="A starter monitoring page for mortgage-backed securities."
      description="This page establishes the first nested structured-products branch requested in the brief. The initial rows are descriptive rather than live, so they can guide future integration of spread, coupon, prepayment, and agency-specific monitoring."
      breadcrumbs={[
        { label: "Assets", href: "/assets" },
        { label: "Structured Products", href: "/assets/structured-products" },
        { label: "MBS" },
      ]}
      aside={
        <div className="panel-muted rounded-[1.75rem] p-6">
          <p className="eyebrow">Next build layer</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>Possible future columns include coupon, weighted average maturity, spread, convexity, and prepayment sensitivity.</p>
            <p>This subpage is already separated from the general fixed-income page so securitized-credit detail can grow independently.</p>
          </div>
        </div>
      }
    >
      <div className="page-surface overflow-hidden rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-4">Instrument</th>
                <th className="px-4 py-4">Bucket</th>
                <th className="px-4 py-4">Use Case</th>
                <th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {mbsRows.map((row) => (
                <tr key={row.instrument} className="align-top">
                  <td className="px-4 py-4 font-display text-lg text-slate-950">{row.instrument}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{row.bucket}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{row.useCase}</td>
                  <td className="px-4 py-4 text-sm leading-7 text-slate-500">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
