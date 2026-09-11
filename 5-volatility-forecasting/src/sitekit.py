#!/usr/bin/env python3
"""Shared generator for the per-project `website/` folders.

Every project gets a self-contained, Vercel-deployable static site:
    website/index.html   the page
    website/vercel.json  static config, no build step
    website/results.json the real output of that project's demo run

The page is built from the project's own metadata plus the JSON its demo
actually produced, so nothing on the site is hand-written numbers.
"""

import json
import pathlib
import html as _html

CSS = """
:root{
  --bg:#FCFCFD; --surface:#FFFFFF; --surface-2:#F4F5F8;
  --ink:#16191F; --ink-2:#40474F; --muted:#6C7480;
  --line:#E2E5EA; --line-2:#EFF1F4;
  --accent:#1D5B70; --accent-2:#E6F0F3;
  --ok:#2C6B4F; --ok-bg:#E5F1EA;
  --warn:#8A6212; --warn-bg:#F7EFDC;
  --demo:#6E4B8F; --demo-bg:#F0EAF6;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme=light]){
    --bg:#0F1216; --surface:#161A20; --surface-2:#1C212A;
    --ink:#E9ECF0; --ink-2:#BEC5CE; --muted:#8A939F;
    --line:#282F38; --line-2:#20262E;
    --accent:#72B3CB; --accent-2:#18272E;
    --ok:#7BC09F; --ok-bg:#15251E;
    --warn:#D8AD5E; --warn-bg:#292216;
    --demo:#B79AD6; --demo-bg:#241C2E;
  }
}
:root[data-theme=dark]{
  --bg:#0F1216; --surface:#161A20; --surface-2:#1C212A;
  --ink:#E9ECF0; --ink-2:#BEC5CE; --muted:#8A939F;
  --line:#282F38; --line-2:#20262E;
  --accent:#72B3CB; --accent-2:#18272E;
  --ok:#7BC09F; --ok-bg:#15251E;
  --warn:#D8AD5E; --warn-bg:#292216;
  --demo:#B79AD6; --demo-bg:#241C2E;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0;background:var(--bg);color:var(--ink);
  font-family:"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,
    "PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  font-size:15.5px;line-height:1.62;-webkit-font-smoothing:antialiased;
}
.wrap{max-width:900px;margin:0 auto;padding:0 24px 88px}
h1,h2,h3{font-family:Spectral,Georgia,"Songti SC",serif;margin:0;text-wrap:balance}
h1{font-size:clamp(28px,4.2vw,42px);font-weight:700;letter-spacing:-.015em;line-height:1.14}
h2{font-size:clamp(20px,2.5vw,25px);font-weight:600;letter-spacing:-.01em}
h3{font-size:17px;font-weight:600}
p{margin:0}
a{color:var(--accent)}
code,.mono{font-family:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;font-size:.88em}
.stack{display:flex;flex-direction:column;gap:14px}
.stack-lg{display:flex;flex-direction:column;gap:22px}
section{margin-top:52px}

header.mast{border-bottom:1px solid var(--line);padding:44px 0 26px;margin-bottom:8px;
  display:flex;flex-direction:column;gap:15px}
.eyebrow{font-family:"IBM Plex Mono",monospace;font-size:11.5px;letter-spacing:.13em;
  text-transform:uppercase;color:var(--muted)}
.lede{color:var(--ink-2);font-size:16.5px;max-width:66ch}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.06em;
  text-transform:uppercase;padding:3px 9px;border-radius:4px;background:var(--surface-2);
  color:var(--muted);font-weight:500;white-space:nowrap}
.tag.ok{background:var(--ok-bg);color:var(--ok)}
.tag.demo{background:var(--demo-bg);color:var(--demo)}
.tag.warn{background:var(--warn-bg);color:var(--warn)}

.banner{display:flex;gap:13px;align-items:flex-start;background:var(--demo-bg);
  border-radius:9px;padding:15px 18px;margin-top:26px}
.banner .bi{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.09em;
  text-transform:uppercase;color:var(--demo);flex:none;padding-top:3px;font-weight:600}
.banner p{font-size:14.2px;color:var(--ink-2)}

.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(158px,1fr));gap:1px;
  background:var(--line);border:1px solid var(--line);border-radius:9px;overflow:hidden}
.metric{background:var(--surface);padding:15px 16px;display:flex;flex-direction:column;gap:5px}
.metric .mk{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.08em;
  text-transform:uppercase;color:var(--muted);line-height:1.35}
.metric .mv{font-family:Spectral,Georgia,serif;font-size:26px;font-weight:600;
  font-variant-numeric:tabular-nums;line-height:1.1;color:var(--accent)}
.metric .mn{font-size:12.4px;color:var(--muted);line-height:1.4}

.tw{overflow-x:auto;border:1px solid var(--line);border-radius:9px;background:var(--surface)}
table{border-collapse:collapse;width:100%;font-size:13.8px;min-width:520px}
th{text-align:left;font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.09em;
  text-transform:uppercase;color:var(--muted);font-weight:500;padding:11px 14px;
  border-bottom:1px solid var(--line);background:var(--surface-2)}
td{padding:10px 14px;border-bottom:1px solid var(--line-2);vertical-align:top;line-height:1.5}
td.n{font-variant-numeric:tabular-nums;text-align:right}
tr:last-child td{border-bottom:0}

pre{margin:0;background:var(--surface-2);border:1px solid var(--line);border-radius:9px;
  padding:15px 17px;overflow-x:auto;font-family:"IBM Plex Mono",monospace;
  font-size:12.8px;line-height:1.62;color:var(--ink-2)}
ul.tight{margin:0;padding-left:19px;display:flex;flex-direction:column;gap:7px}
ul.tight li::marker{color:var(--muted)}
.note{background:var(--surface-2);border:1px solid var(--line);border-radius:9px;
  padding:16px 18px;display:flex;flex-direction:column;gap:10px}
.foot{margin-top:60px;padding-top:22px;border-top:1px solid var(--line);
  color:var(--muted);font-size:13px;display:flex;flex-direction:column;gap:9px}
figure{margin:0}
svg.chart{display:block;width:100%;height:auto}
@media (max-width:600px){.wrap{padding:0 17px 68px}.banner{flex-direction:column;gap:7px}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
"""

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>{css}</style>
</head>
<body>
<div class="wrap">
"""

FOOT = """
<div class="foot">
  <p>{repo} &middot; {slug} &middot; part of a five-repository portfolio on optimization-driven,
     system-level decision frameworks.</p>
  <p>Every figure on this page was produced by running <code>python -m src.demo</code> in this
     project and reading <code>results.json</code>. Nothing here is hand-entered. {datanote}</p>
</div>
</div>
</body>
</html>
"""

VERCEL = {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "framework": None,
    "buildCommand": None,
    "outputDirectory": ".",
    "cleanUrls": True,
    "trailingSlash": False,
    "headers": [
        {
            "source": "/(.*)",
            "headers": [
                {"key": "X-Content-Type-Options", "value": "nosniff"},
                {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"},
            ],
        }
    ],
}

E = _html.escape


def esc(x):
    return E(str(x), quote=True)


def metric_grid(metrics):
    """metrics: list of (key, value, note)"""
    cells = "".join(
        f'<div class="metric"><span class="mk">{esc(k)}</span>'
        f'<span class="mv">{esc(v)}</span>'
        f'<span class="mn">{esc(n)}</span></div>'
        for k, v, n in metrics
    )
    return f'<div class="metrics">{cells}</div>'


def table(headers, rows, numeric_cols=()):
    th = "".join(f"<th>{esc(h)}</th>" for h in headers)
    trs = []
    for r in rows:
        tds = "".join(
            f'<td class="n">{esc(c)}</td>' if i in numeric_cols else f"<td>{esc(c)}</td>"
            for i, c in enumerate(r)
        )
        trs.append(f"<tr>{tds}</tr>")
    return (
        f'<div class="tw"><table><thead><tr>{th}</tr></thead>'
        f'<tbody>{"".join(trs)}</tbody></table></div>'
    )


def bar_chart(pairs, width=680, bar_h=26, gap=9, fmt="{:.3f}"):
    """Horizontal bars from (label, value) pairs. Pure inline SVG, theme-safe."""
    if not pairs:
        return ""
    vals = [v for _, v in pairs]
    vmax = max(vals) or 1.0
    label_w = 190
    plot_w = width - label_w - 68
    h = len(pairs) * (bar_h + gap) + gap
    parts = [
        f'<svg class="chart" viewBox="0 0 {width} {h}" role="img" '
        f'aria-label="Bar chart of results">'
    ]
    for i, (lab, val) in enumerate(pairs):
        y = gap + i * (bar_h + gap)
        w = max(2.0, (val / vmax) * plot_w)
        parts.append(
            f'<text x="{label_w - 10}" y="{y + bar_h * 0.68}" text-anchor="end" '
            f'font-family="IBM Plex Mono, monospace" font-size="11.5" '
            f'fill="currentColor" opacity=".72">{esc(lab)}</text>'
        )
        parts.append(
            f'<rect x="{label_w}" y="{y}" width="{w:.1f}" height="{bar_h}" rx="3" '
            f'fill="var(--accent)" opacity=".85"/>'
        )
        parts.append(
            f'<text x="{label_w + w + 9:.1f}" y="{y + bar_h * 0.68}" '
            f'font-family="IBM Plex Mono, monospace" font-size="11.5" '
            f'fill="currentColor" opacity=".62">{fmt.format(val)}</text>'
        )
    parts.append("</svg>")
    return "<figure>" + "".join(parts) + "</figure>"


def line_chart(series, width=680, height=210, xlabel="", ylabel=""):
    """series: list of (name, [(x,y), ...]). Simple multi-line plot."""
    pts = [p for _, s in series for p in s]
    if not pts:
        return ""
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    x0, x1 = min(xs), max(xs)
    y0, y1 = min(ys), max(ys)
    if x1 == x0:
        x1 = x0 + 1
    if y1 == y0:
        y1 = y0 + 1
    pad_l, pad_r, pad_t, pad_b = 46, 14, 12, 30
    pw, ph = width - pad_l - pad_r, height - pad_t - pad_b

    def sx(x):
        return pad_l + (x - x0) / (x1 - x0) * pw

    def sy(y):
        return pad_t + ph - (y - y0) / (y1 - y0) * ph

    out = [
        f'<svg class="chart" viewBox="0 0 {width} {height}" role="img" '
        f'aria-label="Line chart">'
    ]
    for gi in range(5):
        gy = pad_t + ph * gi / 4
        out.append(
            f'<line x1="{pad_l}" y1="{gy:.1f}" x2="{width - pad_r}" y2="{gy:.1f}" '
            f'stroke="currentColor" opacity=".12" stroke-width="1"/>'
        )
        gv = y1 - (y1 - y0) * gi / 4
        out.append(
            f'<text x="{pad_l - 8}" y="{gy + 4:.1f}" text-anchor="end" '
            f'font-family="IBM Plex Mono, monospace" font-size="10" '
            f'fill="currentColor" opacity=".5">{gv:.2f}</text>'
        )
    colors = ["var(--accent)", "var(--warn)", "var(--ok)", "var(--demo)"]
    for i, (name, s) in enumerate(series):
        d = " ".join(
            ("M" if j == 0 else "L") + f"{sx(x):.1f},{sy(y):.1f}"
            for j, (x, y) in enumerate(s)
        )
        out.append(
            f'<path d="{d}" fill="none" stroke="{colors[i % len(colors)]}" '
            f'stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>'
        )
        out.append(
            f'<text x="{width - pad_r}" y="{pad_t + 13 + i * 15}" text-anchor="end" '
            f'font-family="IBM Plex Mono, monospace" font-size="10.5" '
            f'fill="{colors[i % len(colors)]}">{esc(name)}</text>'
        )
    if xlabel:
        out.append(
            f'<text x="{pad_l + pw / 2}" y="{height - 6}" text-anchor="middle" '
            f'font-family="IBM Plex Mono, monospace" font-size="10" '
            f'fill="currentColor" opacity=".5">{esc(xlabel)}</text>'
        )
    if ylabel:
        out.append(
            f'<text x="12" y="{pad_t + ph / 2}" text-anchor="middle" '
            f'transform="rotate(-90 12 {pad_t + ph / 2})" '
            f'font-family="IBM Plex Mono, monospace" font-size="10" '
            f'fill="currentColor" opacity=".5">{esc(ylabel)}</text>'
        )
    out.append("</svg>")
    return "<figure>" + "".join(out) + "</figure>"


def build(project_dir, meta, body_html, results):
    """Write website/index.html, vercel.json and results.json."""
    site = pathlib.Path(project_dir) / "website"
    site.mkdir(parents=True, exist_ok=True)

    datanote = meta.get(
        "datanote",
        "The run used clearly-labelled synthetic data; swap in the real source and the "
        "same pipeline reports real numbers.",
    )
    head = HEAD.format(
        title=esc(meta["name"]),
        desc=esc(meta["tagline"]),
        css=CSS,
    )
    tags = "".join(f'<span class="tag {c}">{esc(t)}</span>' for t, c in meta["tags"])
    mast = f"""<header class="mast">
  <div class="eyebrow">{esc(meta['repo'])} &middot; {esc(meta['pillar'])}</div>
  <h1>{esc(meta['name'])}</h1>
  <p class="lede">{esc(meta['tagline'])}</p>
  <div class="tags">{tags}</div>
</header>
<div class="banner">
  <span class="bi">Data</span>
  <p>{esc(meta['banner'])}</p>
</div>
"""
    foot = FOOT.format(
        repo=esc(meta["repo"]), slug=esc(meta["slug"]), datanote=esc(datanote)
    )
    (site / "index.html").write_text(head + mast + body_html + foot, encoding="utf8")
    (site / "vercel.json").write_text(json.dumps(VERCEL, indent=2) + "\n", encoding="utf8")
    (site / "results.json").write_text(json.dumps(results, indent=2) + "\n", encoding="utf8")

    readme = f"""# {meta['name']} — website

Static site for `{meta['slug']}`. No build step: Vercel serves this folder as-is.

## Deploy on its own

Copy this folder into a new repository and point Vercel at the repository root:

```
vercel deploy --prod
```

`vercel.json` already sets `outputDirectory` to `.` and disables the build command,
so there is nothing else to configure.

## Refreshing the numbers

The page reads from `results.json`, which is written by the project's demo run:

```
cd ..            # the project root
pip install -r requirements.txt
python -m src.demo
```

That regenerates `website/results.json` and rebuilds `index.html`. Never edit the
figures on the page by hand — they exist so that what the site shows and what the
code produces cannot drift apart.
"""
    (site / "README.md").write_text(readme, encoding="utf8")
    return site
