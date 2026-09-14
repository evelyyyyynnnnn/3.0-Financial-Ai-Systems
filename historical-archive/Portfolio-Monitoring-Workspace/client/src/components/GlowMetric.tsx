/* Design reminder: Neo-terminal luxury. Metric tiles should feel like illuminated instruments with compact labeling, crisp numerals, and subtle depth. */
import type { ReactNode } from "react";

export default function GlowMetric({ label, value, detail, accent }: { label: string; value: string; detail: string; accent?: ReactNode }) {
  return (
    <div className="panel metric-glow signal-border rounded-[1.6rem] px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/55">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          <p className="mt-2 text-sm leading-6 text-white/62">{detail}</p>
        </div>
        {accent}
      </div>
    </div>
  );
}
