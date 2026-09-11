"""Builds website/ from the last recorded run."""
from __future__ import annotations

import json
import pathlib

try:
    from . import sitekit as sk
except ImportError:                      # run with src/ on sys.path
    import sitekit as sk

ROOT = pathlib.Path(__file__).resolve().parent.parent
META = {
    "name": "Portfolio Optimization Engine",
    "slug": "portfolio-optimization-engine",
    "repo": "3.0-Financial-Ai-Systems",
    "pillar": "Financial Stability",
    "tagline": "Deep-RL portfolio agents on fourteen years of real ETF prices. "
               "They lose money, and they lose it on the data they trained on.",
    "tags": [("real market data", ""), ("DQN / SAC", ""),
             ("negative result", ""), ("in-sample", "demo")],
    "banner": "Real daily OHLCV for GLD, IWM, QQQ, SPY and TLT from Yahoo Finance, "
              "2010-2023, cached in data/market_data.pkl. The agent figures are "
              "IN-SAMPLE: the train/test split was declared in the config and read "
              "by no code, so the environment served the whole series to both "
              "training and evaluation. The split is now honoured; the agents have "
              "not yet been retrained under it.",
}


def _row(label, m, suffix=""):
    return [label + suffix,
            f"{m['sharpe_ratio']:+.3f}", f"{m['sortino_ratio']:+.3f}",
            f"{m['total_return']:+.3f}", f"{m['max_drawdown']:+.3f}"]


def build_site(results: dict) -> pathlib.Path:
    agents = results.get("agents") or {}
    full = (results.get("baselines") or {}).get("full") or {}
    test = (results.get("baselines") or {}).get("test") or {}
    spy = full.get("buy-and-hold SPY", {})

    grid = sk.metric_grid([
        ("Best agent Sharpe",
         f"{max((m['sharpe_ratio'] for m in agents.values()), default=0):+.3f}",
         "in-sample"),
        ("Buy-and-hold SPY Sharpe", f"{spy.get('sharpe_ratio', 0):+.3f}",
         "same period, same formula"),
        ("Agent total return",
         f"{max((m['total_return'] for m in agents.values()), default=0):+.1%}",
         "in-sample"),
        ("Buy-and-hold total return", f"{spy.get('total_return', 0):+.0%}",
         "the thing they had to beat"),
    ])

    rows = [_row(name.upper(), m, "  (in-sample)") for name, m in agents.items()]
    rows += [_row(label, m) for label, m in full.items()]
    table = sk.table(
        ["Strategy", "Sharpe", "Sortino", "Total return", "Max drawdown"],
        rows, numeric_cols=(1, 2, 3, 4))

    body = [grid, """
<section>
  <h2>The result</h2>
  <p>Both agents lose money. A buy-and-hold position in SPY over the same fourteen
  years returned <strong>+446%</strong> at a Sharpe of +0.67; the better of the two
  agents returned <strong>&minus;14%</strong> at a Sharpe of &minus;0.35. Rebalancing
  daily to equal weights &mdash; a strategy with no model in it at all &mdash; beat
  both by a wider margin still.</p>
  <p>This is reported because it is what the run produced. Deep reinforcement
  learning is not obviously the right tool for asset allocation, and a portfolio of
  projects in which every method works is not a portfolio anyone should believe.</p>
</section>
""", table, """
<section>
  <h2>Why the agent numbers are worse than they look</h2>
  <p>They are <strong>in-sample</strong>. The configuration declared</p>
  <pre><code>data:
  train_test_split: 0.8</code></pre>
  <p>in all three YAML files, and no code anywhere read it. <code>PortfolioEnv</code>
  loaded the entire 2010&ndash;2023 series, and <code>evaluate()</code> built the same
  environment from the same config &mdash; so the agents were scored on the data they
  were trained on. Losing money on your own training data is a stronger negative
  result than losing it out of sample.</p>
  <p>The environment now takes <code>split="train"</code> / <code>"test"</code>,
  <code>evaluate()</code> defaults to the held-out slice, and
  <code>tests/test_split_is_honoured.py</code> fails if a config declares a split
  the code does not read. The agents have not been retrained under the fix.</p>
</section>

<section>
  <h2>The baseline was an assertion until now</h2>
  <p>The committed result said both agents &ldquo;underperform a buy-and-hold
  baseline&rdquo;. No buy-and-hold figure existed anywhere in the repository, so
  nothing had been compared. <code>src/baselines.py</code> now computes two passive
  strategies over the train, test and full windows, importing the <em>same</em>
  metric functions <code>main.py</code> scores the agents with &mdash; a baseline
  measured with a different Sharpe formula would not be a comparison.</p>
</section>
"""]

    if test:
        body.append(sk.table(
            ["Strategy, held-out window only", "Sharpe", "Sortino",
             "Total return", "Max drawdown"],
            [_row(label, m) for label, m in test.items()],
            numeric_cols=(1, 2, 3, 4)))
        body.append("""
<section>
  <p class="note">The held-out window is what a retrained agent will have to beat.
  No agent figure exists for it yet.</p>
</section>
""")

    body.append("""
<section>
  <h2>What this project does <em>not</em> establish</h2>
  <ul>
    <li>It does not establish that deep RL cannot allocate a portfolio. Two
    architectures, one asset universe, one period, one hyperparameter setting.</li>
    <li>It does not establish an out-of-sample result of any kind. The agents have
    never been evaluated on held-out data.</li>
    <li>The passive baselines are not a strategy recommendation; they are the floor
    a method has to clear before it is worth discussing.</li>
  </ul>
  <p class="note">Reproduce the baselines: <code>python -m src.baselines</code>.
  Rebuild this page: <code>python -m src.site</code>. Retrain:
  <code>python src/main.py --config src/config/sb3_dqn.yaml</code> (needs
  stable-baselines3 and PyTorch).</p>
</section>
""")
    return sk.build(ROOT, META, "\n".join(body), results)


def main() -> int:
    rp = ROOT / "results" / "latest-real.json"
    build_site(json.loads(rp.read_text(encoding="utf8")))
    print(f"website/ rebuilt from {rp.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
