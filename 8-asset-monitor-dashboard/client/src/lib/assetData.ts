/**
 * Design reminder: keep content structured, professional, and easy to extend with future subpages.
 */
export const marketOverviewSections = [
  {
    title: "Public Market",
    description: "Public market coverage starts with equity and fixed income so future drill-down pages can expand from a clean taxonomy.",
    groups: [
      {
        title: "Public Equity",
        items: ["Large Cap", "Mid Cap", "Small Cap", "Emerging Market Equity", "Sector Equity"],
      },
      {
        title: "Fixed Income",
        items: [
          "Government Bonds",
          "US Treasuries",
          "Sovereign Bonds",
          "Inflation-Linked Bonds",
          "Corporate Bonds",
          "Investment Grade",
          "High Yield",
          "Structured Finance",
        ],
      },
      {
        title: "Mortgage-Backed & Structured Credit",
        items: [
          "ABS (Asset-Backed Securities)",
          "MBS (Mortgage-Backed Securities)",
          "RMBS",
          "Pass-through MBS",
          "CMO",
          "Senior Tranche",
          "Mezzanine Tranche",
          "Equity Tranche",
          "CMBS",
          "CLO",
        ],
      },
    ],
  },
  {
    title: "Private Market",
    description: "The private market stack should read clearly from capital provider to underlying operating asset.",
    groups: [
      {
        title: "Capital Chain",
        items: ["LP", "Fund", "GP", "Portfolio Company/Assets"],
      },
      {
        title: "Private Equity",
        items: [
          "Venture Capital",
          "Early-stage (Seed, Series A, Growth VC)",
          "Growth Equity",
          "Scaling Companies",
          "Buyout/LBO",
          "Mature Companies",
          "Distressed Equity",
        ],
      },
      {
        title: "Private Credit",
        items: [
          "Return target: IR 8% - 15%; SOFR + spread",
          "Direct Lending",
          "Fund lends a loan to a company with IR payment",
          "Mezzanine (debt plus equity)",
          "Distressed Debt",
          "Special Situation",
        ],
      },
      {
        title: "Other Private Market Areas",
        items: ["Private Infrastructure", "Private Real Estate"],
      },
    ],
  },
  {
    title: "Alternative",
    description: "Alternatives should be grouped by strategy family so the page can later branch into manager, vehicle, and exposure subpages.",
    groups: [
      {
        title: "Hedge Fund",
        items: ["Long/Short Equity", "Global Macro", "Event Driven", "Relative Value", "Multi-Strategy"],
      },
      {
        title: "Real Assets",
        items: [
          "Real Estate",
          "Natural Resources",
          "Energy",
          "Agriculture",
          "Timber",
          "Infrastructure",
          "Transport",
          "Utilities",
          "Digital Infrastructure",
        ],
      },
      {
        title: "Structured Products",
        items: ["Derivative-heavy strategies"],
      },
    ],
  },
];

export const assetSubpages = [
  {
    name: "Equity",
    href: "/assets/equity",
    summary: "Current stock and ETF watchlist, organized around market-relevant review fields.",
  },
  {
    name: "Fixed Income",
    href: "/assets/fixed-income",
    summary: "A clean placeholder for government bonds, corporate credit, and future rates or spread monitoring.",
  },
  {
    name: "Derivative",
    href: "/assets/derivative",
    summary: "A structured area for volatility, options, hedging overlays, and term-structure monitoring.",
  },
  {
    name: "Structured Products",
    href: "/assets/structured-products",
    summary: "A hierarchy-first section that begins with MBS and can grow into deeper securitized credit coverage.",
  },
];

export const equityTableColumns = [
  { key: "ticker", title: "Ticker" },
  { key: "segment", title: "Segment" },
  { key: "marketLens", title: "Market Lens" },
  { key: "liquidity", title: "Liquidity" },
  { key: "volatility", title: "Volatility" },
  { key: "trigger", title: "Key Market Trigger" },
  { key: "note", title: "Portfolio Note" },
];

export const equityRows = [
  { ticker: "XME", segment: "Materials ETF", marketLens: "Cyclical metals breadth", liquidity: "High", volatility: "Medium/High", trigger: "Commodity trend and industrial demand", note: "Use as a broad metals and mining read." },
  { ticker: "XOP", segment: "Energy ETF", marketLens: "Oil beta and exploration sensitivity", liquidity: "High", volatility: "High", trigger: "Crude, refining margin, and energy tape", note: "Useful for energy regime confirmation." },
  { ticker: "CPM", segment: "Industrial machinery", marketLens: "Capital equipment and processing demand", liquidity: "Medium", volatility: "Medium/High", trigger: "Order backlog and industrial spending cycle", note: "Useful for tracking cyclical industrial equipment demand." },
  { ticker: "SOFR", segment: "Rates benchmark", marketLens: "Short-term funding and liquidity conditions", liquidity: "Very high", volatility: "Low", trigger: "Fed policy path and repo market conditions", note: "Use as the front-end rate anchor for macro and risk context." },
  { ticker: "IRWD", segment: "Biopharma", marketLens: "Specialty GI drug commercialization", liquidity: "Medium", volatility: "High", trigger: "Prescription trend and pipeline catalysts", note: "Event-driven healthcare name with catalyst sensitivity." },
  { ticker: "VISN", segment: "Single name", marketLens: "Idiosyncratic event watch", liquidity: "Verify", volatility: "Name specific", trigger: "Company-specific catalyst", note: "Ticker mapping should be confirmed before live data connection." },
  { ticker: "ANET", segment: "Networking", marketLens: "AI networking leadership", liquidity: "High", volatility: "Medium", trigger: "Enterprise demand and AI capex", note: "Relative strength versus semis remains useful." },
  { ticker: "SPMD", segment: "Mid-cap ETF", marketLens: "Breadth confirmation", liquidity: "High", volatility: "Medium", trigger: "Participation beyond mega-cap tech", note: "Works as a broad mid-cap participation check." },
  { ticker: "GOOGL", segment: "Mega-cap tech", marketLens: "Market leadership", liquidity: "High", volatility: "Medium", trigger: "Ads, cloud, and AI narrative", note: "Useful benchmark for platform risk appetite." },
  { ticker: "NVDA", segment: "Semiconductor", marketLens: "AI demand proxy", liquidity: "High", volatility: "High", trigger: "AI demand pulse and chip sentiment", note: "Crowded leadership name; relative strength matters." },
  { ticker: "RTX", segment: "Defense / industrial", marketLens: "Geopolitical and industrial exposure", liquidity: "High", volatility: "Medium", trigger: "Defense budgets and execution", note: "Good bridge between macro and stock-specific monitoring." },
  { ticker: "GDX", segment: "Gold miners ETF", marketLens: "Real rates hedge", liquidity: "High", volatility: "High", trigger: "Real yields and gold pricing", note: "Useful metals hedge sleeve reference." },
  { ticker: "PAAS", segment: "Precious metals", marketLens: "Silver beta", liquidity: "Medium", volatility: "High", trigger: "Silver regime shifts", note: "Higher-beta precious metals expression." },
  { ticker: "ATI", segment: "Advanced materials", marketLens: "Industrial cycle participation", liquidity: "Medium", volatility: "Medium", trigger: "Aerospace cycle and margins", note: "Track backlog and end-market demand." },
  { ticker: "MSFT", segment: "Mega-cap tech", marketLens: "Quality leadership", liquidity: "High", volatility: "Medium", trigger: "Cloud, AI, and enterprise spend", note: "Benchmark quality compounder." },
  { ticker: "DFIS", segment: "Single name", marketLens: "Idiosyncratic event watch", liquidity: "Verify", volatility: "Name specific", trigger: "Company-specific catalyst", note: "Ticker spelling should be confirmed before live mapping." },
  { ticker: "AAPL", segment: "Mega-cap tech", marketLens: "Consumer hardware and services tone", liquidity: "High", volatility: "Medium", trigger: "Product cycle and services demand", note: "Useful for broad sentiment and consumer read-through." },
  { ticker: "KTOS", segment: "Defense tech", marketLens: "Higher-beta defense", liquidity: "Medium", volatility: "High", trigger: "Program wins and contract flow", note: "More tactical than RTX." },
  { ticker: "PANW", segment: "Cybersecurity", marketLens: "Security spending leadership", liquidity: "High", volatility: "Medium", trigger: "Enterprise security budgets", note: "Use for cybersecurity theme leadership." },
  { ticker: "AMZN", segment: "Platform / cloud", marketLens: "Consumer plus cloud read", liquidity: "High", volatility: "Medium", trigger: "AWS demand and retail margin", note: "Good read on capex discipline and cloud tone." },
  { ticker: "AVGO", segment: "Semiconductor", marketLens: "AI infrastructure stack", liquidity: "High", volatility: "Medium", trigger: "AI networking and integration execution", note: "Complements ANET and NVDA." },
  { ticker: "QQQ", segment: "Nasdaq ETF", marketLens: "Top-down growth benchmark", liquidity: "Very high", volatility: "Medium", trigger: "Large-cap growth beta", note: "Useful base layer for relative performance." },
];

export const mbsColumns = [
  { key: "instrument", title: "Instrument" },
  { key: "bucket", title: "Tracking Bucket" },
  { key: "useCase", title: "Use on Page" },
  { key: "status", title: "Current Status" },
];

export const mbsRows = [
  { instrument: "MBB", bucket: "Agency MBS ETF", useCase: "Broad liquid agency MBS benchmark", status: "Ready for coverage" },
  { instrument: "VMBS", bucket: "Agency MBS ETF", useCase: "Low-cost agency MBS index reference", status: "Ready for coverage" },
  { instrument: "Agency", bucket: "Agency mortgage exposure", useCase: "Core government-backed mortgage sleeve", status: "Ready for coverage" },
  { instrument: "Agency MBS Pools", bucket: "Pool-level agency collateral", useCase: "Future prepayment and composition drill-down", status: "Expansion path" },
  { instrument: "Non-Agency", bucket: "Credit-sensitive mortgage exposure", useCase: "Add spread and collateral risk monitoring", status: "Expansion path" },
  { instrument: "MBS Bond", bucket: "Individual mortgage bond", useCase: "Future security-level coverage", status: "Expansion path" },
  { instrument: "TOTL", bucket: "Multi-sector bond fund", useCase: "Context benchmark for broader bond allocation", status: "Ready for coverage" },
  { instrument: "AGG", bucket: "Core aggregate bond ETF", useCase: "Base fixed income benchmark", status: "Ready for coverage" },
  { instrument: "CMBS ETF", bucket: "Commercial mortgage exposure", useCase: "Future CMBS sleeve reference", status: "Expansion path" },
  { instrument: "AAA", bucket: "Senior-quality securitized credit", useCase: "Top-of-structure comparison point", status: "Expansion path" },
  { instrument: "CMBS Bonds", bucket: "Commercial mortgage bonds", useCase: "Security-level CMBS monitoring", status: "Expansion path" },
  { instrument: "REITs", bucket: "Listed real-estate proxy", useCase: "Public-market cross-check for property sentiment", status: "Ready for coverage" },
];

export const macroSections = [
  {
    title: "Policy & Structural Forces",
    description: "This layer explains the backdrop that shapes capital allocation and risk appetite over longer horizons.",
    items: ["Fiscal Policy", "Regulation", "Geopolitics", "Demographics"],
  },
  {
    title: "Monetary Conditions",
    description: "Rates, curves, and policy expectations should be grouped together so the page reads like a decision framework rather than a list.",
    items: [
      "Policy Rates",
      "Federal Reserve Funds Rate",
      "European Central Bank Policy Rate",
      "Global Policy Rates",
      "Yield Curve",
      "Short-term rates",
      "Long-term rates",
      "Curve slope",
      "Forward rates",
      "Rate cuts and hikes",
    ],
  },
  {
    title: "Inflation Dynamics",
    description: "Inflation should combine current prints, core trends, labor pressure, and market-sensitive inflation expectations.",
    items: ["CPI", "Core Inflation / PPI", "Wage Growth", "Commodity-driven inflation", "Inflation Expectations"],
  },
  {
    title: "Liquidity & Financial Conditions",
    description: "This section should frame how policy flows through credit, money, and overall market functioning.",
    items: ["Central Bank Balance Sheets", "Credit Conditions", "Money Supply", "Financial Conditions Index (M2 Money Supply)"],
  },
  {
    title: "Economic Growth",
    description: "Growth indicators should stay close to labor and demand data so turning points can be interpreted quickly.",
    items: ["GDP", "Nonfarm Payrolls", "Unemployment Rate", "Consumption", "Business Investment"],
  },
  {
    title: "Risk Sentiment",
    description: "Risk appetite should connect directly to pricing pressure across equities, credit, and safe-haven demand.",
    items: ["Market Volatility", "Credit Spreads", "Equity Risk Premium", "Safe-haven flows"],
  },
];

export const rateFramework = [
  {
    title: "Policy Rates",
    summary: "Use central-bank policy rates as the anchor for the global rates regime.",
    references: ["US Federal Funds Rate", "ECB Deposit Rate", "Bank of England Bank Rate", "Global Central Bank Rates"],
  },
  {
    title: "Money Market Rates",
    summary: "Separate overnight and short-term funding rates to show where immediate liquidity conditions are tightening or easing.",
    references: ["Federal Funds Rate", "SOFR", "Repo Rate", "Interbank Rates", "LIBOR (historical)"],
  },
  {
    title: "Benchmark Reference Rates",
    summary: "Show the reference-rate family as the pricing basis used across loans, swaps, and floating-rate instruments.",
    references: ["SOFR", "SONIA", "€STR", "TONAR", "LIBOR (legacy)"],
  },
  {
    title: "Term Structure",
    summary: "Group the yield curve by short, medium, and long-term tenors so slope shifts can be read clearly.",
    references: ["Short-term", "Medium-term", "Long-term"],
  },
  {
    title: "Forward Rates",
    summary: "Use forward rates to represent market expectations for cuts, hikes, and future funding conditions.",
    references: ["Forward rates", "Interest-rate expectations", "Cuts/Hikes pricing"],
  },
  {
    title: "Interest Rate Derivatives",
    summary: "Reserve this area for futures, swaps, and options overlays once the page expands beyond a reference framework.",
    references: ["To be added in future derivative-linked subpages"],
  },
];
