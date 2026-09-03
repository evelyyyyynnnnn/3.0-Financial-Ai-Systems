/* Design reminder: Neo-terminal luxury. Tables should present dense equity coverage calmly, using disciplined spacing, restrained color coding, and a research-terminal atmosphere. */
type LegacyEquityRow = {
  ticker: string;
  bucket: string;
  horizon: string;
  trigger: string;
  liquidity: string;
  momentum: string;
  risk: string;
  note: string;
};

const riskTone: Record<string, string> = {
  Cyclical: "text-amber-200 bg-amber-200/10 border-amber-200/15",
  Volatile: "text-rose-200 bg-rose-200/10 border-rose-200/15",
  Crowded: "text-orange-200 bg-orange-200/10 border-orange-200/15",
  Valuation: "text-sky-200 bg-sky-200/10 border-sky-200/15",
  Regulatory: "text-violet-200 bg-violet-200/10 border-violet-200/15",
  Concentration: "text-teal-200 bg-teal-200/10 border-teal-200/15",
  default: "text-white/75 bg-white/6 border-white/10",
};

export default function AssetTable({ rows }: { rows: LegacyEquityRow[] }) {
  return (
    <div className="panel signal-border overflow-hidden rounded-[1.8rem]">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="eyebrow">Seeded equity watchlist</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Coverage table</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
              The table is structured around the monitoring fields that matter during review: bucket, horizon, trigger, liquidity, momentum, and explicit risk framing.
            </p>
          </div>
          <div className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-primary/85">
            19 symbols loaded
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-white/55">
            <tr>
              {[
                "Ticker",
                "Coverage Bucket",
                "Horizon",
                "Primary Trigger",
                "Liquidity",
                "Momentum Lens",
                "Risk Flag",
                "Analyst Note",
              ].map((header) => (
                <th key={header} className="px-4 py-3 font-medium uppercase tracking-[0.18em] text-[0.65rem] first:pl-6 last:pr-6">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.ticker} className={index % 2 === 0 ? "bg-white/[0.015]" : "bg-transparent"}>
                <td className="px-4 py-4 first:pl-6">
                  <div className="font-semibold tracking-[0.08em] text-primary">{row.ticker}</div>
                </td>
                <td className="px-4 py-4 text-white/82">{row.bucket}</td>
                <td className="px-4 py-4 text-white/72">{row.horizon}</td>
                <td className="px-4 py-4 text-white/72">{row.trigger}</td>
                <td className="px-4 py-4 text-white/72">{row.liquidity}</td>
                <td className="px-4 py-4 text-white/72">{row.momentum}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${riskTone[row.risk] ?? riskTone.default}`}>
                    {row.risk}
                  </span>
                </td>
                <td className="px-4 py-4 pr-6 text-white/62">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
