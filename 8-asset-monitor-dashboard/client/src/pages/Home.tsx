import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import DashboardShell from "@/components/DashboardShell";
import { marketOverviewSections } from "@/lib/assetData";

const itemLinks: Record<string, string> = {
  "Public Equity": "/assets/equity",
  "Fixed Income": "/assets/fixed-income",
  "Structured Products": "/assets/structured-products",
  "MBS (Mortgage-Backed Securities)": "/assets/structured-products/mbs",
  "Macro / Risk Indicators": "/macro-risk",
  "Policy Rates": "/macro-risk",
  "Yield Curve": "/macro-risk",
};

const groupLinks: Record<string, string> = {
  "Public Equity": "/assets/equity",
  "Fixed Income": "/assets/fixed-income",
  "Structured Products": "/assets/structured-products",
};

/**
 * Design reminder: professional, light, and simple.
 * The overview should read like a market architecture brief rather than a dark dashboard.
 */
export default function Home() {
  return (
    <DashboardShell
      eyebrow="Financial Market Overview"
      title="Portfolio market map"
      description="Use this page as a quick entry point: start from major market buckets, then move into detailed asset and macro/risk pages."
      aside={
        <div className="space-y-4">
          <div className="panel-muted rounded-[1.75rem] p-6">
            <p className="eyebrow">Workflow</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p><span className="font-semibold text-slate-800">Step 1 – Orient.</span> Skim the sections below to confirm market coverage: public, private, and alternatives.</p>
              <p><span className="font-semibold text-slate-800">Step 2 – Review assets.</span> Move into the Assets pages for watchlists and instrument-level checks.</p>
              <p><span className="font-semibold text-slate-800">Step 3 – Frame macro & risk.</span> Use Macro / Risk Indicators to layer in rates, liquidity, and sentiment.</p>
            </div>
          </div>

          <Link
            href="/assets"
            className="panel-interactive flex items-center justify-between rounded-[1.25rem] p-5 transition"
          >
            <div>
              <p className="eyebrow">Next step</p>
              <p className="mt-2 font-display text-2xl text-slate-950">Review Assets</p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-500" />
          </Link>
        </div>
      }
    >
      <div className="space-y-4">
        {marketOverviewSections.map((section) => (
          <section key={section.title} className="page-surface rounded-[1.5rem] p-6 sm:p-7">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] xl:gap-7">
              <div className="max-w-md space-y-3 xl:max-w-none">
                <p className="eyebrow">Market section</p>
                <h3 className="font-display text-[1.85rem] text-slate-950 sm:text-[2.1rem]">{section.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{section.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {section.groups.map((group) => (
                  <div key={group.title} className="panel-soft rounded-[1.25rem] p-5">
                    {groupLinks[group.title] ? (
                      <Link href={groupLinks[group.title]} className="group inline-flex items-center gap-2">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-800 transition-colors group-hover:text-slate-950">
                          {group.title}
                        </h4>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors group-hover:text-slate-700">
                          Open
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-slate-700" />
                      </Link>
                    ) : (
                      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
                        {group.title}
                      </h4>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {group.items.map((item) => {
                        const href = itemLinks[item];

                        if (href) {
                          return (
                            <Link key={item} href={href} className="tag-pill tag-pill-link rounded-full px-3 py-1.5 text-sm">
                              <span>{item}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          );
                        }

                        return (
                          <span key={item} className="tag-pill rounded-full px-3 py-1.5 text-sm">
                            {item}
                          </span>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-xs text-slate-500">Chips with an arrow open detailed pages.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </DashboardShell>
  );
}
