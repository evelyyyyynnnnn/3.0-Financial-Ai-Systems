import DashboardShell from "@/components/DashboardShell";
import { macroSections, rateFramework } from "@/lib/assetData";

/**
 * Design reminder: professional, light, and simple.
 * This page should read as a decision framework for macro conditions, not a cluttered dashboard.
 */
export default function MacroRiskPage() {
  return (
    <DashboardShell
      eyebrow="Macro / Risk Indicators"
      title="Macro and risk framework for the portfolio."
      description="Use this page to keep policy, rates, inflation, liquidity, growth, and sentiment organized as one decision framework. Later, these groupings can wire into live charts and regime diagnostics."
      breadcrumbs={[{ label: "Macro / Risk Indicators" }]}
      aside={
        <div className="space-y-4">
          <div className="panel-muted rounded-[1.75rem] p-6">
            <p className="eyebrow">Rates focus</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The attachment placed special emphasis on rate-related indicators, so the framework panel on this page separates policy rates, money-market rates, benchmark references, curve structure, and forward expectations.
            </p>
          </div>
        </div>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:items-start">
        <section className="space-y-4">
          {macroSections.map((section) => (
            <div key={section.title} className="page-surface rounded-[1.5rem] p-6 sm:p-7">
              <p className="eyebrow">Macro block</p>
              <h3 className="mt-2 font-display text-[1.85rem] text-slate-950 sm:text-[2.05rem]">{section.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{section.description}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {section.items.map((item) => (
                  <span key={item} className="tag-pill rounded-full px-3 py-1.5 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="page-surface rounded-[1.5rem] p-6 sm:p-7">
          <p className="eyebrow">Rates reference framework</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Keep rates organized from anchor policy levels through money markets, reference curves, and forward expectations. This block is the bridge between Macro / Risk and the Assets and Fixed Income pages.
          </p>
          <div className="mt-5 space-y-4">
            {rateFramework.map((item) => (
              <div key={item.title} className="panel-soft rounded-[1.25rem] p-5">
                <h3 className="font-display text-lg text-slate-950 sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  {item.references.map((reference) => (
                    <li key={reference}>• {reference}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
