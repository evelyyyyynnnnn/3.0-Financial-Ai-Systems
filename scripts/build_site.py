#!/usr/bin/env python3
"""Generate the 3.0 Financial AI Systems site.

One data table, one renderer — so the top-level overview and every project
page stay consistent. Re-run after editing PROJECTS; it rewrites index.html
and projects/*.html in place.

    python scripts/build_site.py
"""
import html
import os
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / "project-1"

# --- pillars, straight from the petition's three areas of substantial merit ---
PILLARS = {
    "fin": ("Financial Stability", "金融稳定"),
    "hea": ("Healthcare Safety", "healthcare"),
    "sec": ("Secure Digital Infrastructure", "数字基础设施安全"),
    "gen": ("Cross-cutting", "通用能力"),
}

def E(s):
    return html.escape(s, quote=True)

# --- project data -----------------------------------------------------------
# Every field below is drawn from the project's own README, source tree, or
# entry point — nothing here is invented.
PROJECTS = [
    {
        "slug": "portfolio-optimization-engine",
        "name": "Portfolio Optimization Engine",
        "zh": "强化学习组合优化与动态对冲",
        "pillar": "fin",
        "tagline": "Reinforcement learning for portfolio optimization and dynamic hedging.",
        "summary": "Combines deep reinforcement learning with portfolio theory to learn an "
                   "adaptive allocation policy. Three agents share one custom environment: a "
                   "TensorFlow PPO implementation written from scratch, plus Stable-Baselines3 "
                   "SAC (continuous weights) and DQN (discretised allocation grid).",
        "modules": [
            ("src/environments/portfolio_env.py", "组合管理环境，含技术指标与风险调整奖励"),
            ("src/agents/ppo_agent.py", "自研 TensorFlow PPO 智能体"),
            ("src/agents/sb3_agent.py", "Stable-Baselines3 SAC / DQN 封装"),
            ("src/visualization/visualizer.py", "Plotly 评估报告生成器"),
            ("src/config/*.yaml", "三套智能体配置：default / sb3_sac / sb3_dqn"),
        ],
        "stack": ["Python", "TensorFlow", "Stable-Baselines3", "Gymnasium", "Plotly", "TensorBoard"],
        "entry": "src/main.py",
        "run": "cd project-1/portfolio-optimization-engine\n"
               "python -m venv .venv && source .venv/bin/activate\n"
               "pip install -r requirements.txt\n"
               "python src/main.py --mode train --config src/config/sb3_sac.yaml",
        "artifacts": [
            ("Drawdown Evaluation", "../portfolio-optimization-engine/visualizations/drawdown_eval.html",
             "评估期回撤曲线"),
            ("Portfolio Weights Evaluation", "../portfolio-optimization-engine/visualizations/portfolio_weights_eval.html",
             "各资产权重随时间演化"),
            ("Risk Metrics Evaluation", "../portfolio-optimization-engine/visualizations/risk_metrics_eval.html",
             "波动率、Sharpe 等风险统计"),
        ],
        "notes": [],
        "relevance": "Optimization under uncertainty is the core of the ORIE training the petition "
                     "rests on — this is the clearest instance of a decision policy learned, "
                     "evaluated, and reported end to end.",
    },
    {
        "slug": "financial-network-risk",
        "name": "Financial Network Risk",
        "zh": "金融知识图谱与图神经网络风险传导",
        "pillar": "fin",
        "tagline": "Financial knowledge graph analysed with graph neural networks.",
        "summary": "Builds a graph over financial entities and their relationships, then trains "
                   "GNN architectures over it to surface patterns and propagation paths that "
                   "pairwise correlation analysis misses.",
        "modules": [
            ("models/gnn_model.py", "GNN 架构实现"),
            ("data/data_processor.py", "图构建与特征工程"),
            ("visualization/visualizer.py", "网络图与模型表现可视化"),
            ("config/config.yaml", "架构与训练超参数"),
            ("notebooks/financial_graph_demo.ipynb", "端到端演示 notebook"),
        ],
        "stack": ["Python", "PyTorch", "GNN", "NetworkX", "pandas"],
        "entry": "main.py",
        "run": "cd project-1/financial-network-risk\n"
               "pip install -r requirements.txt\n"
               "python main.py",
        "artifacts": [],
        "notebook": ("financial_graph_demo.ipynb",
                     "../financial-network-risk/notebooks/financial_graph_demo.ipynb",
                     "图构建到 GNN 推理的完整演示"),
        "notes": [],
        "relevance": "Closest existing work to the petition's crypto-equity contagion modelling: "
                     "contagion is a graph problem, and this is the graph machinery.",
    },
    {
        "slug": "volatility-forecasting",
        "name": "Volatility Forecasting",
        "zh": "波动率预测与期权波动率交易",
        "pillar": "fin",
        "tagline": "Deep-learning volatility forecasting, plus an options volatility monitor.",
        "summary": "Two separate efforts under one folder. LSTM-Volatility-Prediction is original "
                   "work: LSTM and Transformer forecasters with Optuna tuning and a full training "
                   "pipeline. Options-Volatility-Trading is a third-party MIT-licensed project "
                   "retained as reference — see the attribution note below.",
        "modules": [
            ("LSTM-Volatility-Prediction/models/lstm_model.py", "LSTM 回归预测器"),
            ("LSTM-Volatility-Prediction/models/transformer_model.py", "Transformer 回归预测器"),
            ("LSTM-Volatility-Prediction/training/trainer.py", "训练循环、早停、指标持久化"),
            ("LSTM-Volatility-Prediction/training/hyperparameter_tuning.py", "Optuna 超参搜索"),
            ("LSTM-Volatility-Prediction/data/data_loader.py", "数据摄取、技术指标、切分"),
        ],
        "stack": ["Python", "PyTorch", "Transformer", "LSTM", "Optuna", "Weights & Biases", "Docker"],
        "entry": "LSTM-Volatility-Prediction/main.py",
        "run": "cd project-1/volatility-forecasting/LSTM-Volatility-Prediction\n"
               "pip install -r requirements.txt\n"
               "python main.py",
        "artifacts": [],
        "notes": [
            ("warn", "Attribution", 
             "<code class='path'>Options-Volatility-Trading/</code> is not original work. It is "
             "MIT-licensed software, <em>Copyright (c) 2021 MCF Long Short</em>, from "
             "<code class='path'>mcf-long-short/ibkr-options-volatility-trading</code> — a group "
             "project for a Financial Derivatives course at Union University's Masters in "
             "Computational Finance. Its <code class='path'>src/market_watcher/ib_client/</code> "
             "is Interactive Brokers' official Python TWS API. Keep it clearly labelled as a "
             "third-party reference wherever this portfolio is presented."),
        ],
        "relevance": "Volatility is the uncertainty term in every risk model; the LSTM/Transformer "
                     "work is the calibration-and-uncertainty thread the petition emphasises.",
    },
    {
        "slug": "credit-risk-ai",
        "name": "Credit Risk AI",
        "zh": "多模态信用风险建模",
        "pillar": "fin",
        "tagline": "Multimodal credit risk modelling across text, market, and image inputs.",
        "summary": "Fuses three modalities into one credit risk model — text (news, filings, "
                   "social), market data (prices, indicators), and images (charts, visual "
                   "sentiment) — with configurable architectures and ensemble methods.",
        "modules": [
            ("models/multimodal_model.py", "多模态融合架构"),
            ("preprocessing/data_processor.py", "三模态预处理管线"),
            ("visualization/visualizer.py", "评估与可视化工具"),
            ("utils/helpers.py", "通用辅助函数"),
            ("config/config.yaml", "模型、训练、评估参数"),
        ],
        "stack": ["Python", "PyTorch", "Transformers", "OpenCV", "scikit-learn"],
        "entry": "train.py",
        "run": "cd project-1/credit-risk-ai\n"
               "pip install -r requirements.txt\n"
               "python train.py",
        "artifacts": [],
        "notes": [],
        "relevance": "The text branch is the nearest thing in this repo to the petition's automated "
                     "10-K/10-Q filing analysis — see the gap analysis on the overview page.",
    },
    {
        "slug": "high-frequency-strategy",
        "name": "Eventized Microstructure LLM",
        "zh": "事件化微观结构 LLM 研究",
        "pillar": "fin",
        "tagline": "Applying large language models to order-book microstructure.",
        "summary": "A research paper and framework proposing that order-book data be tokenised "
                   "into event sequences, letting transformer architectures model microstructure "
                   "dynamics — slippage, volatility spikes, liquidity crises — as a sequence "
                   "problem rather than a time-series one.",
        "modules": [
            ("Frame-work/Logic-Framework.md", "研究逻辑框架：动机、文献、方法、评估"),
            ("Frame-work/Tech-Framework.md", "技术实现框架"),
            ("data/generate_data.py", "合成微观结构数据生成"),
            ("figures/Figure1–8.png", "论文配图"),
        ],
        "stack": ["LLM", "Transformer", "Market Microstructure", "Python"],
        "entry": "Frame-work/Logic-Framework.md",
        "run": None,
        "artifacts": [],
        "paper": ("Eventized Microstructure Modeling with Large Language Models",
                  "../high-frequency-strategy/Final Submission/Eventized Microstructure Modeling with Large Language Models.pdf",
                  "完整论文 PDF"),
        "notes": [],
        "relevance": "The scholarly-output pillar: an original methodology contribution rather "
                     "than an application of existing tools.",
    },
    {
        "slug": "live-trading-engine",
        "name": "Live Trading Engine",
        "zh": "实盘交易执行引擎（C++ / Python 双实现）",
        "pillar": "fin",
        "tagline": "Low-latency factor trading against the Alpaca API, in C++ and Python.",
        "summary": "The execution layer. A C++17 engine built for microsecond-level decisions — "
                   "multi-threaded, WebSocket market data, order management, risk limits, "
                   "performance monitoring — mirrored by a Python implementation carrying a "
                   "library of factor strategies.",
        "modules": [
            ("C++/Algo-Trading/strategy/factor_strategy.cpp", "动量 / 均值回归 / 放量突破多因子策略"),
            ("C++/Algo-Trading/execution/order_executor.cpp", "低延迟订单管理"),
            ("C++/Algo-Trading/data-download/websocket_client.cpp", "实时行情 WebSocket 客户端"),
            ("C++/Algo-Trading/performance/performance_monitor.cpp", "实时绩效监控"),
            ("Python/Algo-Trading/strategy/", "13 个 Python 策略实现"),
        ],
        "stack": ["C++17", "CMake", "Boost", "WebSocket++", "Python", "Alpaca API"],
        "entry": "C++/main.cpp",
        "run": "cd project-1/live-trading-engine/C++\n"
               "./build.sh          # 需要 CMake 3.16+, libcurl, OpenSSL, Boost\n"
               "./build/trading_system",
        "artifacts": [],
        "notes": [
            ("mute", "Platform", "C++ 引擎 README 注明仅在 macOS 14.6 上测试过。"),
        ],
        "relevance": "Demonstrates the systems-engineering half of the endeavor — a decision "
                     "framework is only real once it executes under latency constraints.",
    },
    {
        "slug": "trading-system-dashboard-2",
        "name": "Trading Simulation Platform",
        "zh": "量化交易模拟与回测平台",
        "pillar": "fin",
        "tagline": "Quantitative trading dashboard with a strategy backtesting engine.",
        "summary": "A second-generation platform, and after the portfolio audit the single "
                   "trading front end: Express plus Socket.IO for real-time updates, with "
                   "dedicated services for market data, portfolio state, instrument reference "
                   "data, backtesting, and — migrated from the retired Investment Analysis "
                   "Dashboard — investment commentary and the four research pages.",
        "modules": [
            ("server.js", "Express + Socket.IO 服务入口"),
            ("services/BacktestService.js", "策略回测引擎"),
            ("services/MarketDataService.js", "行情数据服务"),
            ("services/PortfolioService.js", "组合状态管理"),
            ("services/InstrumentService.js", "金融工具参考数据"),
            ("routes/", "backtest / marketData / portfolio / strategy / trading / advisory 六组路由"),
            ("services/AdvisoryService.js", "投资建议生成（自已退役的 Dashboard 迁入）"),
            ("public/research/", "四个独立研究页面（自 Dashboard 迁入）"),
        ],
        "stack": ["Node.js", "Express", "Socket.IO", "Chart.js", "Jest", "webpack"],
        "entry": "server.js",
        "run": "cd project-1/trading-system-dashboard-2\nnpm install && npm start\n# http://localhost:3000",
        "artifacts": [],
        "pages": [
            ("Trading Simulation Platform", "../trading-system-dashboard-2/public/index.html", "需启动服务", "warn"),
            ("金融工具分析平台", "../trading-system-dashboard-2/public/instruments.html", "可直接打开", "ok"),
            ("U.S. Stock Market Indicators", "../trading-system-dashboard-2/public/research/macro-overview.html", "可直接打开", "ok"),
            ("2025 投资展望", "../trading-system-dashboard-2/public/research/prediction.html", "可直接打开", "ok"),
            ("投资分析与市场展望", "../trading-system-dashboard-2/public/research/portfolio-management.html", "可直接打开", "ok"),
            ("Balanced Long-Term Portfolio", "../trading-system-dashboard-2/public/research/investment-suggestion.html", "可直接打开", "ok"),
        ],
        "notes": [
            ("mute", "Consolidation",
             "Investment Analysis Dashboard 已退役并移入 <code class='path'>archive/</code>。"
             "其独有的投资建议生成迁入本项目的 <code class='path'>/api/advisory/*</code>，"
             "四个研究页面迁入 <code class='path'>public/research/</code>。"
             "迁移时把 Google AI 密钥从源码字面量改为读取 <code class='path'>GOOGLE_AI_API_KEY</code> 环境变量。"),
            ("mute", "Repo hygiene",
             "该项目的 <code class='path'>node_modules/</code> 被提交进了版本库（12,979 个文件）。"
             "已加入 <code class='path'>.gitignore</code> 防止继续增长，但历史文件仍在跟踪中。"),
        ],
        "relevance": "Backtesting is the verification step the petition names as missing from most "
                     "AI systems — a claim is only trustworthy once it survives out-of-sample.",
    },
    {
        "slug": "giant-portfolio",
        "name": "Giant Portfolio Tracker",
        "zh": "机构持仓（13F）追踪器",
        "pillar": "fin",
        "tagline": "Institutional 13F holdings, refreshed from Notion on a monthly schedule.",
        "summary": "A live, deployed site tracking 13F holdings across major investors and "
                   "institutions — searchable by fund, manager, and fund type. Data is pulled "
                   "from two Notion databases by a scheduled GitHub Action and committed back "
                   "as data.json, which triggers a Vercel redeploy.",
        "modules": [
            ("giant-portfolio/index.html", "站点本身，数据变更时无需修改"),
            ("giant-portfolio/data.json", "持仓数据，由刷新脚本重写"),
            ("scripts/refresh_data.py", "拉取 Notion 两个数据库并重写 data.json"),
            (".github/workflows/refresh-data.yml", "每月 1 日 09:00 UTC 定时任务"),
        ],
        "stack": ["Static HTML", "Notion API", "GitHub Actions", "Python", "Vercel"],
        "entry": "giant-portfolio/index.html",
        "run": "export NOTION_TOKEN=ntn_xxxxxxxxxxxx\n"
               "pip install requests\n"
               "python scripts/refresh_data.py    # 重写 giant-portfolio/data.json",
        "artifacts": [],
        "pages": [
            ("Giant Portfolio Tracker", "../giant-portfolio/index.html", "可直接打开", "ok"),
        ],
        "notes": [
            ("warn", "Fixed: the scheduled refresh had never run",
             "workflow 此前位于 <code class='path'>1-Giant-Portfolio/.github/workflows/</code>。"
             "GitHub Actions 只读取<strong>仓库根目录</strong>的 <code class='path'>.github/workflows/</code>，"
             "因此该定时任务从未执行过。现已移至根目录，并将频率从每周改为<strong>每月 1 日</strong>。"),
        ],
        "relevance": "Market transparency in the most literal sense: making institutional "
                     "positioning legible and current, on an automated cadence.",
    },
]

PROJ_BY_SLUG = {p["slug"]: p for p in PROJECTS}


def head(title, css, extra_desc=""):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{E(title)}</title>
{f'<meta name="description" content="{E(extra_desc)}">' if extra_desc else ''}
<link rel="stylesheet" href="{css}">
</head>
<body>
"""


def bar(prefix=""):
    return f"""<div class="bar"><div class="wrap">
<a class="home" href="{prefix}index.html">3.0 Financial AI Systems</a>
<nav>
  <a href="{prefix}index.html#endeavor">Endeavor</a>
  <a href="{prefix}index.html#projects">Projects</a>
  <a href="{prefix}index.html#pages">Pages</a>
  <a href="{prefix}index.html#gaps">Gap analysis</a>
</nav>
</div></div>
"""


def render_notes(notes):
    out = []
    for kind, label, body in notes:
        cls = "note warn" if kind == "warn" else "note"
        out.append(f'<p class="{cls}"><strong>{E(label)}.</strong> {body}</p>')
    return "\n".join(out)


def project_page(p):
    pill_label = PILLARS[p["pillar"]][0]
    parts = [head(f'{p["name"]} — 3.0 Financial AI Systems', "../assets/site.css", p["tagline"]),
             bar("../")]
    parts.append(f"""<div class="wrap">
<div class="hero">
  <p class="eyebrow">{E(pill_label)}</p>
  <h1>{E(p["name"])}</h1>
  <p class="lead">{E(p["zh"])} — {E(p["tagline"])}</p>
</div>
</div>
<div class="wrap">

<section>
  <h2>做什么</h2>
  <p class="sec-note">{p["summary"]}</p>
  <div class="chips">{''.join(f'<span class="b acc">{E(s)}</span>' for s in p["stack"])}</div>
  {render_notes(p.get("notes", []))}
</section>

<section>
  <h2>核心模块</h2>
  <p class="sec-note">路径相对于 <code class="path">project-1/{E(p["slug"])}/</code>。</p>
  <div class="tablewrap"><table>
    <thead><tr><th>模块</th><th>职责</th></tr></thead>
    <tbody>
    {''.join(f'<tr><td><code>{E(m)}</code></td><td>{E(d)}</td></tr>' for m, d in p["modules"])}
    </tbody>
  </table></div>
</section>
""")

    # run + entry
    if p["run"]:
        parts.append(f"""<section>
  <h2>如何运行</h2>
  <p class="sec-note">入口文件：<code class="path">{E(p["entry"])}</code></p>
  <pre class="run">{E(p["run"])}</pre>
</section>
""")
    else:
        parts.append(f"""<section>
  <h2>入口</h2>
  <p class="sec-note">这是研究性产出，没有可运行的服务。起点是
    <code class="path">{E(p["entry"])}</code>。</p>
</section>
""")

    # pages / artifacts / paper / notebook
    links = []
    for t, href, note, badge in p.get("pages", []):
        links.append(f'<li><a href="{E(href)}">{E(t)}</a>'
                     f'<span class="b {badge}">{E(note)}</span>'
                     f'<span class="meta">{E(href.replace("../", ""))}</span></li>')
    for t, href, note in p.get("artifacts", []):
        links.append(f'<li><a href="{E(href)}">{E(t)}</a>'
                     f'<span class="b ok">可直接打开</span>'
                     f'<span class="meta">{E(note)}</span></li>')
    if p.get("paper"):
        t, href, note = p["paper"]
        links.append(f'<li><a href="{E(href)}">{E(t)}</a>'
                     f'<span class="b acc">PDF</span><span class="meta">{E(note)}</span></li>')
    if p.get("notebook"):
        t, href, note = p["notebook"]
        links.append(f'<li><a href="{E(href)}">{E(t)}</a>'
                     f'<span class="b acc">Notebook</span><span class="meta">{E(note)}</span></li>')
    if links:
        parts.append(f"""<section>
  <h2>可查看的产出</h2>
  <p class="sec-note">页面、报告、论文与 notebook。</p>
  <ul class="linklist">{''.join(links)}</ul>
</section>
""")

    parts.append(f"""<section>
  <h2>与 endeavor 的关系</h2>
  <p class="sec-note">{E(p["relevance"])}</p>
</section>

<footer>
  <a href="../index.html">← 返回全景</a> ·
  源码位于 <code>project-1/{E(p["slug"])}/</code>
</footer>
</div>
</body>
</html>
""")
    return "".join(parts)


def main():
    (ROOT / "projects").mkdir(exist_ok=True)
    n = 0
    for p in PROJECTS:
        path = ROOT / "projects" / f'{p["slug"]}.html'
        path.write_text(project_page(p), encoding="utf8")
        n += 1
    (ROOT / "index.html").write_text(overview_page(), encoding="utf8")
    print(f"生成 {n} 个项目详情页 + 1 个全景页")




# --- top-level overview page ------------------------------------------------

ENDEAVOR = """The endeavor is the design and implementation of <strong>optimization-driven,
system-level decision frameworks</strong> — integrating operations research, mathematical
optimization, and applied AI — for domains where a wrong decision carries systemic
consequences. The emphasis is not on any single model but on end-to-end systems that are
<strong>reliable, auditable, and interpretable</strong>: verification, calibration, and
uncertainty estimation treated as first-class design constraints rather than afterthoughts."""

PILLAR_CARDS = [
    ("fin", "Financial Stability", "金融稳定",
     "Risk modelling, monitoring, and validation that make market linkages legible to "
     "institutions and regulators before local failures become systemic ones.",
     ["portfolio-optimization-engine", "financial-network-risk", "volatility-forecasting",
      "credit-risk-ai", "high-frequency-strategy", "live-trading-engine",
      "trading-system-dashboard-2", "giant-portfolio"]),
    ("hea", "Healthcare Safety", "医疗安全",
     "Calibrated, interpretable clinical decision support — early-warning models whose "
     "false-alarm behaviour is understood well enough to be trusted at the bedside.",
     []),
    ("sec", "Secure Digital Infrastructure", "数字基础设施安全",
     "Automated auditing and verification for smart contracts and digital assets, as they "
     "become load-bearing parts of financial infrastructure.",
     []),
]

GAPS = [
    ("Automated filing analysis (10-K / 10-Q)",
     "Petition cites 600+ filings analysed and a 70% reduction in report-processing time.",
     "credit-risk-ai 的文本分支最接近，但仓库中没有面向 10-K/10-Q 的解析与抽取管线。",
     "缺口"),
    ("Crypto-equity contagion modelling",
     "Petition cites datasets of 7,500+ crypto assets and 6,000+ US equities/ETFs.",
     "financial-network-risk 提供了图与 GNN 机制，但没有加密资产与股票的跨市场数据集。",
     "部分"),
    ("Smart contract auditing agents",
     "Petition cites a 65% reduction in manual audit workload.",
     "本仓库完全没有涉及。属于第三支柱（数字基础设施安全）。",
     "缺口"),
    ("Clinical decision support",
     "Petition cites a 22% false-alarm reduction with PKU MedX and Edinburgh CMI.",
     "本仓库完全没有涉及。属于第二支柱（医疗安全）。",
     "缺口"),
    ("Portfolio optimization under uncertainty",
     "Core ORIE competency claimed throughout the petition.",
     "portfolio-optimization-engine 完整覆盖：三种智能体、风险调整奖励、评估报告。",
     "覆盖"),
    ("Volatility / uncertainty estimation",
     "Calibration and uncertainty named as design constraints.",
     "volatility-forecasting 的 LSTM/Transformer 部分覆盖。",
     "覆盖"),
]


def overview_page():
    parts = [head("3.0 Financial AI Systems",
                  "assets/site.css",
                  "Optimization-driven, system-level decision frameworks for financial stability."),
             bar("")]
    n_pages = sum(len(p.get("pages", [])) + len(p.get("artifacts", [])) for p in PROJECTS)

    parts.append(f"""<div class="wrap">
<div class="hero" id="endeavor">
  <p class="eyebrow">Portfolio of work · Wenke Du</p>
  <h1>3.0 Financial AI Systems</h1>
  <p class="lead">{ENDEAVOR}</p>
  <div class="stats">
    <div class="stat"><b>{len(PROJECTS)}</b><span>Projects</span></div>
    <div class="stat"><b>{n_pages}</b><span>Live pages</span></div>
    <div class="stat"><b>3</b><span>Pillars</span></div>
    <div class="stat"><b>1</b><span>Research paper</span></div>
  </div>
</div>
</div>
<div class="wrap">

<section id="pillars">
  <h2>三大支柱</h2>
  <p class="sec-note">Petition 中列出的三个 substantial-merit 领域。本仓库当前的工作全部落在第一个支柱内 ——
    另外两个支柱尚无对应代码产出，详见下方缺口分析。</p>
  <div class="pillars">
""")
    for key, en, zh, desc, slugs in PILLAR_CARDS:
        items = "".join(
            f'<li><a href="projects/{s}.html">{E(PROJ_BY_SLUG[s]["name"])}</a></li>'
            for s in slugs) or '<li style="color:var(--faint)">本仓库暂无对应项目</li>'
        parts.append(f"""    <div class="pillar {key}">
      <span class="tag">{E(zh)}</span>
      <h4>{E(en)}</h4>
      <p>{E(desc)}</p>
      <ul>{items}</ul>
    </div>
""")
    parts.append("""  </div>
</section>

<section id="projects">
  <h2>项目全景</h2>
  <p class="sec-note">点击任一卡片进入该项目的详情页：架构说明、核心模块、技术栈、如何运行、入口文件，
    以及可直接查看的页面、报告、论文与 notebook。</p>
  <div class="grid">
""")
    for p in PROJECTS:
        pill = PILLARS[p["pillar"]][0]
        badges = []
        if p.get("pages"):
            badges.append('<span class="b ok">有页面</span>')
        if p.get("artifacts"):
            badges.append('<span class="b acc">有报告</span>')
        if p.get("paper"):
            badges.append('<span class="b acc">论文</span>')
        if p.get("notebook"):
            badges.append('<span class="b acc">Notebook</span>')
        if any(k == "warn" for k, _, _ in p.get("notes", [])):
            badges.append('<span class="b warn">注意事项</span>')
        parts.append(f"""    <a class="card {p['pillar']}" href="projects/{p['slug']}.html">
      <span class="kicker">{E(pill)}</span>
      <h4>{E(p['name'])}</h4>
      <p>{E(p['zh'])}</p>
      <p>{E(p['tagline'])}</p>
      <div class="foot">{''.join(badges)}<span class="arrow">详情 →</span></div>
    </a>
""")
    parts.append("""  </div>
</section>

<section id="pages">
  <h2>网页索引</h2>
  <p class="sec-note">全部可在浏览器中打开的页面，按打开方式分组。
    「可直接打开」表示双击即可；「需启动服务」表示要先跑起对应后端。</p>
""")
    direct, needs, reports = [], [], []
    for p in PROJECTS:
        for t, href, note, badge in p.get("pages", []):
            # PROJECTS stores hrefs relative to projects/; the overview sits at
            # the repo root, so drop the leading "../".
            rel = href[3:] if href.startswith("../") else href
            row = (f'<li><a href="{E(rel)}">{E(t)}</a>'
                   f'<span class="b mute">{E(p["name"])}</span>'
                   f'<span class="meta">{E(rel)}</span></li>')
            (direct if badge == "ok" else needs).append(row)
        for t, href, note in p.get("artifacts", []):
            rel = href[3:] if href.startswith("../") else href
            reports.append(f'<li><a href="{E(rel)}">{E(t)}</a>'
                           f'<span class="b mute">{E(note)}</span>'
                           f'<span class="meta">{E(rel)}</span></li>')
    parts.append(f"""  <h3 class="sub">可直接打开 · {len(direct)}</h3>
  <ul class="linklist">{''.join(direct)}</ul>
  <h3 class="sub">需启动服务 · {len(needs)}</h3>
  <ul class="linklist">{''.join(needs)}</ul>
  <h3 class="sub">生成的评估报告 · {len(reports)}</h3>
  <ul class="linklist">{''.join(reports)}</ul>
</section>

<section id="gaps">
  <h2>Petition 与仓库的缺口分析</h2>
  <p class="sec-note">把 petition 中主张的具体贡献，逐条对照本仓库实际存在的代码。
    这张表的用途是诚实定位 —— 标为「缺口」的项目在本仓库中没有支撑材料。</p>
  <div class="tablewrap"><table>
    <thead><tr><th>Petition 主张</th><th>依据</th><th>仓库现状</th><th>状态</th></tr></thead>
    <tbody>
""")
    badge_of = {"覆盖": "ok", "部分": "warn", "缺口": "warn"}
    for claim, cite, state, status in GAPS:
        parts.append(f'      <tr><td>{E(claim)}</td><td>{E(cite)}</td><td>{E(state)}</td>'
                     f'<td><span class="b {badge_of[status]}">{E(status)}</span></td></tr>\n')
    parts.append("""    </tbody>
  </table></div>
</section>

<footer>
  源码分布：<code>project-1/</code>（八个项目）· <code>giant-portfolio/</code>（13F 追踪器）·
  <code>scripts/</code>（数据刷新）· <code>.github/workflows/</code>（月度定时任务）。<br>
  本站为纯静态页面，Vercel 指向仓库根目录即可部署。
</footer>
</div>
</body>
</html>
""")
    return "".join(parts)


if __name__ == "__main__":
    main()
