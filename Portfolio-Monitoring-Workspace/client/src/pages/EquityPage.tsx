import DashboardShell from "@/components/DashboardShell";
import { equityRows, equityTableColumns } from "@/lib/assetData";

export default function EquityPage() {
  const watchlistCount = equityRows.length;

  return (
    <DashboardShell
      eyebrow="Assets · Equity Watchlist"
      title="Equity monitoring grid"
      description="Operational equity list structured for live monitoring: seeded tickers, review fields, and room for prices, returns, and sector overlays."
      breadcrumbs={[
        { label: "Assets", href: "/assets" },
        { label: "Equity" },
      ]}
      aside={
        <section className="space-y-4">
          <div className="panel-muted rounded-2xl p-5">
            <p className="eyebrow">Coverage summary</p>
            <div className="mt-4 grid gap-4 text-xs text-slate-600">
              <div className="flex items-baseline justify-between gap-4">
                <span className="metric-label">Total tickers tracked</span>
                <span className="metric-value text-base font-semibold text-slate-900">
                  {watchlistCount}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="metric-label">New this iteration</span>
                <span className="metric-value text-sm font-medium text-emerald-700">
                  CPM, IRWD, SOFR
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="metric-label">Tickers to verify before live feed</span>
                <span className="metric-value inline-flex items-center gap-2 text-sm font-medium text-amber-800">
                  <span className="status-pill status-pill-warning">Attention</span>
                  <span>VISN, DFIS</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="metric-label">Monitoring focus</span>
                <span className="metric-value text-xs text-slate-500">
                  Tape leadership, cyclicals, metals, and liquidity proxies.
                </span>
              </div>
            </div>
          </div>
        </section>
      }
    >
      <section className="space-y-4">
        <div className="page-surface rounded-[1.25rem] border border-slate-200/90 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
                Equity Watchlist
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Market status: <span className="font-semibold">OPEN</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="metric-label">
                Watchlist size:{" "}
                <span className="metric-value font-semibold text-slate-800">
                  {watchlistCount} tickers
                </span>
              </span>
              <span className="hidden h-3 w-px bg-slate-200 sm:inline" />
              <span className="metric-label">
                Last updated:{" "}
                <span className="metric-value font-medium text-slate-700">
                  Today · 09:30 ET
                </span>
              </span>
            </div>
          </div>

          <div className="mt-3 grid gap-3 text-xs text-slate-600 sm:grid-cols-[2fr_minmax(0,3fr)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="metric-chip">Benchmarks: QQQ, SPMD, XME</span>
              <span className="metric-chip">Defensive sleeves: RTX, GDX</span>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] hover:border-slate-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Filter: Liquidity &gt;= Medium
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] hover:border-slate-300"
              >
                Sort: Ticker A–Z
              </button>
            </div>
          </div>
        </div>

        <div className="page-surface overflow-hidden rounded-[1.25rem]">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full text-left">
            <thead>
              <tr>
                {equityTableColumns.map((column) => (
                  <th
                    key={column.key}
                    className={column.key === "ticker" ? "px-4 py-2.5 text-left" : "px-4 py-2.5 text-right"}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
              {equityRows.map((row) => (
                <tr key={row.ticker} className="align-middle">
                  <td className="px-4 py-2.5">
                    <div className="flex items-baseline gap-2">
                      <span className="ticker-symbol font-mono text-sm font-semibold tracking-[0.12em] text-slate-900">
                        {row.ticker}
                      </span>
                      <span className="text-xs text-slate-500">{row.segment}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-slate-600">{row.marketLens}</td>
                  <td className="px-4 py-2.5 text-right text-xs">
                    <span className="status-pill status-pill-liquidity">{row.liquidity}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs">
                    <span className="status-pill status-pill-volatility">{row.volatility}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-slate-600">{row.trigger}</td>
                  <td className="px-4 py-2.5 text-xs leading-5 text-slate-500">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </section>
    </DashboardShell>
  );
}
