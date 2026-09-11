"""Builds website/ from the last recorded run."""
from __future__ import annotations

import json
import pathlib

from . import sitekit as sk

ROOT = pathlib.Path(__file__).resolve().parent.parent
META = {
    "name": "Volatility Forecasting",
    "slug": "volatility-forecasting",
    "repo": "3.0-Financial-Ai-Systems",
    "pillar": "Financial Stability",
    "tagline": "A sequence model for realised volatility on real S&P 500 prices — "
               "and the lookahead leak that made its first result unusable.",
    "tags": [("real market data", ""), ("LSTM", ""),
             ("lookahead audit", ""), ("result withheld", "demo")],
    "banner": "Real daily ^GSPC prices from Yahoo Finance, 2010-2023. The committed "
              "metrics are WITHHELD: they were produced before a lookahead leak in "
              "the feature scaler was found and fixed, so they say nothing about "
              "held-out performance. The model must be retrained before any figure "
              "on this page is quoted.",
}


def build_site(results: dict) -> pathlib.Path:
    withheld = results.get("metrics_withheld_because")
    sup = results.get("superseded_metrics") or {}
    live = results.get("metrics") or {}

    if live:
        m = live
        grid = sk.metric_grid([
            ("Test R2", f"{m['test']['r2']:.3f}", "held out, chronological"),
            ("Test RMSE", f"{m['test']['rmse']:.4f}", "annualised volatility"),
            ("Train R2", f"{m['train']['r2']:.3f}", ""),
            ("Epochs", results.get("num_epochs", "—"), results.get("model_type", "")),
        ])
    else:
        grid = sk.metric_grid([
            ("Test R2", "withheld", "pending a retrain"),
            ("Leak found", "yes", "scaler fitted across the split"),
            ("Training tensor moved by", "0.99", "on a [0, 1] scale, from future data alone"),
            ("Tests", 5, "all offline, no framework needed"),
        ])

    body = [grid]

    if withheld:
        body.append(f"""
<section>
  <h2>Why there is no number here yet</h2>
  <p>{sk.esc(withheld)}</p>
</section>
""")

    body.append("""
<section>
  <h2>The leak, stated as a test</h2>
  <p>The feature scaler was fitted with <code>fit_transform</code> over the whole
  2010&ndash;2023 series, before the chronological split. A MinMax scaler fitted that
  way carries the minimum and maximum of the <em>test</em> period into every
  training feature.</p>
  <p>The check is blunt and does not need a model. Take the price series, multiply
  the last 10% of it &mdash; which is test data &mdash; by ten, and rebuild the
  training tensor. If the split is a split, the training tensor cannot move:</p>
  <pre><code>baseline, *_ = split(price_frame())
shocked,  *_ = split(price_frame(tail_shock=10.0))
assert np.allclose(baseline, shocked)</code></pre>
  <p>It moved by <strong>0.99</strong> on a [0,&nbsp;1] scale. The scaler is now
  fitted only on the rows the training split can reach
  (<code>train_size + window_size</code>), and the assertion above is
  <code>tests/test_no_lookahead.py</code>.</p>
</section>

<section>
  <h2>What the old numbers should have prompted</h2>
  <p>The superseded run reported validation R&sup2; <em>above</em> training R&sup2;,
  and both far above test R&sup2;. A validation score that beats the training score
  is not a good sign; it is a question. Here the answer was that the scaler had
  seen the whole series.</p>
</section>
""")

    if sup:
        body.append(sk.table(
            ["Split", "R2", "RMSE", "MAE", "MSE"],
            [[name, f"{v['r2']:.4f}", f"{v['rmse']:.5f}",
              f"{v['mae']:.5f}", f"{v['mse']:.6f}"]
             for name, v in sup.items()],
            numeric_cols=(1, 2, 3, 4)))
        body.append("""
<section>
  <p class="note">The table above is the <strong>superseded</strong> run, kept as a
  record of what was executed on 2026-09-09. It is not a result and must not be
  cited.</p>
</section>
""")

    body.append(f"""
<section>
  <h2>What this project does not establish</h2>
  <ul>
    <li>It does not establish that the model forecasts volatility. No metric from
    the fixed pipeline exists yet.</li>
    <li>Realised volatility is strongly autocorrelated, so a high R&sup2; against it
    is weak evidence on its own; the comparison that matters is against a
    previous-value baseline, which has not been run.</li>
    <li>One index, one period, one architecture. Nothing here generalises.</li>
  </ul>
  <p class="note">Reproduce: <code>{sk.esc(results.get('rerun_command', 'python -m src.demo'))}</code></p>
</section>
""")

    return sk.build(ROOT, META, "\n".join(body), results)


def main() -> int:
    rp = ROOT / "results" / "latest-real.json"
    if not rp.exists():
        rp = ROOT / "results" / "latest.json"
    build_site(json.loads(rp.read_text(encoding="utf8")))
    print(f"website/ rebuilt from {rp.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
