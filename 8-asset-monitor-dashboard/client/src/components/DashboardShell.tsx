import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  aside?: ReactNode;
};

const primaryNav = [
  { label: "Financial Market Overview", href: "/" },
  { label: "Assets", href: "/assets" },
  { label: "Macro / Risk Indicators", href: "/macro-risk" },
];

export default function DashboardShell({
  eyebrow,
  title,
  description,
  children,
  breadcrumbs,
  aside,
}: DashboardShellProps) {
  const [location] = useLocation();

  return (
    <div className="app-shell bg-background text-foreground">
      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl">
          <div className="container py-3">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="space-y-1">
                <p className="eyebrow text-[0.68rem] tracking-[0.2em] text-slate-500">
                  Asset Monitor
                </p>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h1 className="font-sans text-[1.15rem] font-semibold leading-snug text-slate-900">
                    Portfolio monitoring workspace
                  </h1>
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-emerald-800">
                    Live overview
                  </span>
                </div>
                <p className="max-w-2xl text-[0.78rem] leading-5 text-slate-500">
                  Market overview, asset watchlists, and macro / risk indicators in a single institutional review surface.
                </p>
              </div>

              <nav
                aria-label="Primary navigation"
                className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100/85 p-1.5"
              >
                {primaryNav.map((item) => {
                  const active = item.href === "/"
                    ? location === item.href
                    : location === item.href || location.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors duration-150",
                        active
                          ? "bg-slate-900 text-white shadow-[0_8px_24px_rgba(15,23,42,0.2)]"
                          : "text-slate-700 hover:bg-white hover:text-slate-950",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </header>

        <main className="container grid gap-6 py-7 xl:grid-cols-[minmax(0,8fr)_minmax(300px,4fr)] xl:items-start xl:gap-8">
          <section className="min-w-0 space-y-6">
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                {breadcrumbs.map((crumb, index) => (
                  <div key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-slate-900">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-slate-700">{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 ? <ChevronRight className="h-4 w-4 text-slate-400" /> : null}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="page-surface rounded-[1.5rem] px-6 py-6 sm:px-7 sm:py-7">
              <p className="eyebrow">{eyebrow}</p>
              <div className="mt-3 max-w-3xl space-y-2.5">
                <h2 className="font-display text-[2rem] leading-tight text-slate-950 sm:text-[2.45rem]">
                  {title}
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-[1.05rem] sm:leading-8">
                  {description}
                </p>
              </div>
            </div>

            {children}
          </section>

          <aside className="min-w-0 space-y-4 xl:sticky xl:top-32">
            {aside ?? (
              <div className="panel-muted rounded-[1.75rem] p-6">
                <p className="eyebrow">Context</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  This page is structured for clear institutional review, with room for deeper analytics in later iterations.
                </p>
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
}
