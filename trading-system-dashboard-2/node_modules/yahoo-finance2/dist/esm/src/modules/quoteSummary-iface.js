import { Type } from "@sinclair/typebox";
import { NullableYahooFinanceDate, NullableYahooNumber, YahooFinanceDate, YahooNumber, } from "../lib/yahooFinanceTypes.js";
/*
 * To generate the initial file, we took the output of all submodules for
 * 'AAPL', 'OCDO.L', '0700.HK' and '^IXIC' and ran the results through
 * the awesome https://app.quicktype.io/
 * and then the smashing https://sinclairzx81.github.io/typebox-workbench
 *
 * Manual cleanup afterwards:
 *
 *  1) Spaces: 4 to 2
 *  ~~2) Wrapped in a module~~ <--- undid this after tooling issues.
 *  3) Alphabeticalize QuoteSummaryResult
 */
var EnumGrade;
(function (EnumGrade) {
    EnumGrade["Accumulate"] = "Accumulate";
    EnumGrade["Add"] = "Add";
    EnumGrade["Average"] = "Average";
    EnumGrade["BelowAverage"] = "Below Average";
    EnumGrade["Buy"] = "Buy";
    EnumGrade["ConvictionBuy"] = "Conviction Buy";
    EnumGrade["Empty"] = "";
    EnumGrade["EqualWeight"] = "Equal-Weight";
    EnumGrade["FairValue"] = "Fair Value";
    EnumGrade["GradeEqualWeight"] = "Equal-weight";
    EnumGrade["GradeLongTermBuy"] = "Long-term Buy";
    EnumGrade["Hold"] = "Hold";
    EnumGrade["LongTermBuy"] = "Long-Term Buy";
    EnumGrade["MarketOutperform"] = "Market Outperform";
    EnumGrade["MarketPerform"] = "Market Perform";
    EnumGrade["Mixed"] = "Mixed";
    EnumGrade["Negative"] = "Negative";
    EnumGrade["Neutral"] = "Neutral";
    EnumGrade["InLine"] = "In-Line";
    EnumGrade["Outperform"] = "Outperform";
    EnumGrade["Overweight"] = "Overweight";
    EnumGrade["PeerPerform"] = "Peer Perform";
    EnumGrade["Perform"] = "Perform";
    EnumGrade["Positive"] = "Positive";
    EnumGrade["Reduce"] = "Reduce";
    EnumGrade["SectorOutperform"] = "Sector Outperform";
    EnumGrade["SectorPerform"] = "Sector Perform";
    EnumGrade["SectorWeight"] = "Sector Weight";
    EnumGrade["Sell"] = "Sell";
    EnumGrade["StrongBuy"] = "Strong Buy";
    EnumGrade["TopPick"] = "Top Pick";
    EnumGrade["Underperform"] = "Underperform";
    EnumGrade["Underperformer"] = "Underperformer";
    EnumGrade["Underweight"] = "Underweight";
    EnumGrade["Trim"] = "Trim";
    EnumGrade["AboveAverage"] = "Above Average";
    EnumGrade["Inline"] = "In-line";
    EnumGrade["Outperformer"] = "Outperformer";
    EnumGrade["OVerweight"] = "OVerweight";
    EnumGrade["Cautious"] = "Cautious";
    EnumGrade["MarketWeight"] = "Market Weight";
    EnumGrade["SectorUnderperform"] = "Sector Underperform";
    EnumGrade["MarketUnderperform"] = "Market Underperform";
    EnumGrade["Peerperform"] = "Peer perform";
    EnumGrade["GraduallyAccumulate"] = "Gradually Accumulate";
    EnumGrade["ActionListBuy"] = "Action List Buy";
    EnumGrade["Performer"] = "Performer";
    EnumGrade["SectorPerformer"] = "Sector Performer";
    EnumGrade["SpeculativeBuy"] = "Speculative Buy";
    EnumGrade["StrongSell"] = "Strong Sell";
    EnumGrade["SpeculativeHold"] = "Speculative Hold";
    EnumGrade["NotRated"] = "Not Rated";
    EnumGrade["HoldNeutral"] = "Hold Neutral";
    EnumGrade["Developing"] = "Developing";
    EnumGrade["buy"] = "buy";
    EnumGrade["HOld"] = "HOld";
    EnumGrade["TradingSell"] = "Trading Sell";
    EnumGrade["Tender"] = "Tender";
    EnumGrade["marketperform"] = "market perform";
    EnumGrade["BUy"] = "BUy";
})(EnumGrade || (EnumGrade = {}));
var Action;
(function (Action) {
    Action["Down"] = "down";
    Action["Init"] = "init";
    Action["Main"] = "main";
    Action["Reit"] = "reit";
    Action["Up"] = "up";
})(Action || (Action = {}));
const Grade = Type.Enum(EnumGrade, { title: "QuoteSummaryEnumGrade" });
const ActionSchema = Type.Enum(Action, { title: "QuoteSummaryAction" });
const UpgradeDowngradeHistoryHistorySchema = Type.Object({
    epochGradeDate: YahooFinanceDate,
    firm: Type.String(),
    toGrade: Grade,
    fromGrade: Type.Optional(Grade),
    action: ActionSchema,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryUpgradeDowngradeHistoryHistory",
});
const UpgradeDowngradeHistorySchema = Type.Object({
    history: Type.Array(UpgradeDowngradeHistoryHistorySchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryUpgradeDowngradeHistory",
});
const TopHoldingsSectorWeightingSchema = Type.Object({
    realestate: Type.Optional(YahooNumber),
    consumer_cyclical: Type.Optional(YahooNumber),
    basic_materials: Type.Optional(YahooNumber),
    consumer_defensive: Type.Optional(YahooNumber),
    technology: Type.Optional(YahooNumber),
    communication_services: Type.Optional(YahooNumber),
    financial_services: Type.Optional(YahooNumber),
    utilities: Type.Optional(YahooNumber),
    industrials: Type.Optional(YahooNumber),
    energy: Type.Optional(YahooNumber),
    healthcare: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldingsSectorWeighting",
});
const TopHoldingsBondRatingSchema = Type.Object({
    a: Type.Optional(YahooNumber),
    aa: Type.Optional(YahooNumber),
    aaa: Type.Optional(YahooNumber),
    other: Type.Optional(YahooNumber),
    b: Type.Optional(YahooNumber),
    bb: Type.Optional(YahooNumber),
    bbb: Type.Optional(YahooNumber),
    below_b: Type.Optional(YahooNumber),
    us_government: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldingsBondRating",
});
const TopHoldingsEquityHoldingsSchema = Type.Object({
    medianMarketCap: Type.Optional(YahooNumber),
    medianMarketCapCat: Type.Optional(YahooNumber),
    priceToBook: YahooNumber,
    priceToBookCat: Type.Optional(YahooNumber),
    priceToCashflow: YahooNumber,
    priceToCashflowCat: Type.Optional(YahooNumber),
    priceToEarnings: YahooNumber,
    priceToEarningsCat: Type.Optional(YahooNumber),
    priceToSales: YahooNumber,
    priceToSalesCat: Type.Optional(YahooNumber),
    threeYearEarningsGrowth: Type.Optional(YahooNumber),
    threeYearEarningsGrowthCat: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldingsEquityHoldings",
});
const TopHoldingsHoldingSchema = Type.Object({
    symbol: Type.String(),
    holdingName: Type.String(),
    holdingPercent: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldingsHolding",
});
const TopHoldingsSchema = Type.Object({
    maxAge: YahooNumber,
    stockPosition: Type.Optional(YahooNumber),
    bondPosition: Type.Optional(YahooNumber),
    holdings: Type.Array(TopHoldingsHoldingSchema),
    equityHoldings: TopHoldingsEquityHoldingsSchema,
    bondHoldings: Type.Object({}),
    bondRatings: Type.Array(TopHoldingsBondRatingSchema),
    sectorWeightings: Type.Array(TopHoldingsSectorWeightingSchema),
    cashPosition: Type.Optional(YahooNumber),
    otherPosition: Type.Optional(YahooNumber),
    preferredPosition: Type.Optional(YahooNumber),
    convertiblePosition: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTopHoldings",
});
const SummaryProfileSchema = Type.Object({
    address1: Type.Optional(Type.String()),
    address2: Type.Optional(Type.String()),
    address3: Type.Optional(Type.String()),
    city: Type.Optional(Type.String()),
    state: Type.Optional(Type.String()),
    zip: Type.Optional(Type.String()),
    country: Type.Optional(Type.String()),
    phone: Type.Optional(Type.String()),
    fax: Type.Optional(Type.String()),
    website: Type.Optional(Type.String()),
    industry: Type.Optional(Type.String()),
    industryDisp: Type.Optional(Type.String()),
    sector: Type.Optional(Type.String()),
    sectorDisp: Type.Optional(Type.String()),
    longBusinessSummary: Type.Optional(Type.String()),
    fullTimeEmployees: Type.Optional(YahooNumber),
    companyOfficers: Type.Array(Type.Any()),
    maxAge: YahooNumber,
    twitter: Type.Optional(Type.String()), // in e.g. "ADA-USD" (#418)
    // seems like for cryptocurency only
    // TODO: how does this relate to Quote type.  Common base?
    name: Type.Optional(Type.String()), // 'Bitcoin'
    startDate: Type.Optional(YahooFinanceDate), // new Date('2013-04-28')
    description: Type.Optional(Type.String()), // 'Bitcoin (BTC) is a cryptocurrency...'
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummarySummaryProfile",
});
const SummaryDetailSchema = Type.Object({
    maxAge: YahooNumber,
    priceHint: YahooNumber,
    previousClose: Type.Optional(YahooNumber), // missing in e.g. "APS.AX"
    open: Type.Optional(YahooNumber),
    dayLow: Type.Optional(YahooNumber),
    dayHigh: Type.Optional(YahooNumber),
    regularMarketPreviousClose: Type.Optional(YahooNumber), // missing in e.g. "APS.AX"
    regularMarketOpen: Type.Optional(YahooNumber),
    regularMarketDayLow: Type.Optional(YahooNumber),
    regularMarketDayHigh: Type.Optional(YahooNumber),
    regularMarketVolume: Type.Optional(YahooNumber),
    dividendRate: Type.Optional(YahooNumber),
    dividendYield: Type.Optional(YahooNumber),
    exDividendDate: Type.Optional(YahooFinanceDate),
    payoutRatio: Type.Optional(YahooNumber),
    fiveYearAvgDividendYield: Type.Optional(YahooNumber),
    beta: Type.Optional(YahooNumber),
    trailingPE: Type.Optional(YahooNumber),
    forwardPE: Type.Optional(YahooNumber),
    volume: Type.Optional(YahooNumber),
    averageVolume: Type.Optional(YahooNumber),
    averageVolume10days: Type.Optional(YahooNumber),
    averageDailyVolume10Day: Type.Optional(YahooNumber),
    bid: Type.Optional(YahooNumber),
    ask: Type.Optional(YahooNumber),
    bidSize: Type.Optional(YahooNumber),
    askSize: Type.Optional(YahooNumber),
    marketCap: Type.Optional(YahooNumber),
    fiftyDayAverage: Type.Optional(YahooNumber),
    fiftyTwoWeekLow: Type.Optional(YahooNumber),
    fiftyTwoWeekHigh: Type.Optional(YahooNumber),
    twoHundredDayAverage: Type.Optional(YahooNumber),
    priceToSalesTrailing12Months: Type.Optional(YahooNumber),
    trailingAnnualDividendRate: Type.Optional(YahooNumber),
    trailingAnnualDividendYield: Type.Optional(YahooNumber),
    currency: Type.String(),
    algorithm: Type.Null(),
    tradeable: Type.Boolean(),
    yield: Type.Optional(YahooNumber),
    totalAssets: Type.Optional(YahooNumber),
    navPrice: Type.Optional(YahooNumber),
    ytdReturn: Type.Optional(YahooNumber),
    // crypto only (optional, or null in other types)
    // TODO: how does Price / SummaryDetail compare? common base?
    fromCurrency: Type.Union([Type.String(), Type.Null()]), // 'BTC'
    toCurrency: Type.Optional(Type.Union([Type.String(), Type.Null()])), // 'USD-X'
    lastMarket: Type.Union([Type.String(), Type.Null()]), // 'CoinMarketCap'
    volume24Hr: Type.Optional(YahooNumber), // 62650314752
    volumeAllCurrencies: Type.Optional(YahooNumber), // 62650314752
    circulatingSupply: Type.Optional(YahooNumber), // 18638932
    startDate: Type.Optional(YahooFinanceDate), // new Date(1367107200 * 1000)
    coinMarketCapLink: Type.Optional(Type.Union([Type.String(), Type.Null()])), // "https://coinmarketcap.com/currencies/cardano"
    // futures
    expireDate: Type.Optional(YahooFinanceDate), // 1656374400,
    openInterest: Type.Optional(YahooNumber), // 444411,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummarySummaryDetail",
});
// May consider switching this to string, as we keep finding more and more.
const FilingType = Type.Union([
    Type.Literal("10-K"),
    Type.Literal("10-Q"),
    Type.Literal("8-K"),
    Type.Literal("8-K/A"),
    Type.Literal("10-K/A"),
    Type.Literal("10-Q/A"),
    Type.Literal("SD"),
    Type.Literal("PX14A6G"),
    Type.Literal("SC 13G/A"),
    Type.Literal("DEFA14A"),
    Type.Literal("25-NSE"),
    Type.Literal("S-8 POS"),
    Type.Literal("6-K"),
    Type.Literal("F-3ASR"),
    Type.Literal("SC 13D/A"),
    Type.Literal("20-F"),
    Type.Literal("425"),
    Type.Literal("SC14D9C"),
    Type.Literal("SC 13G"),
    Type.Literal("S-8"),
    Type.Literal("DEF 14A"),
    Type.Literal("F-10"),
], {
    title: "QuoteSummaryFilingType",
});
const FilingSchema = Type.Object({
    date: Type.String(),
    epochDate: YahooFinanceDate,
    type: FilingType,
    title: Type.String(),
    edgarUrl: Type.String(),
    maxAge: YahooNumber,
    url: Type.Optional(Type.String()),
    exhibits: Type.Optional(Type.Array(Type.Object({
        type: Type.String(),
        url: Type.String(),
        downloadUrl: Type.Optional(Type.String()),
    }))),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFiling",
});
const SECFilingsSchema = Type.Object({
    filings: Type.Array(FilingSchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummarySECFilings",
});
const RecommendationTrendTrendSchema = Type.Object({
    period: Type.String(),
    strongBuy: YahooNumber,
    buy: YahooNumber,
    hold: YahooNumber,
    sell: YahooNumber,
    strongSell: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryRecommendationTrendTrend",
});
const RecommendationTrendSchema = Type.Object({
    trend: Type.Array(RecommendationTrendTrendSchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryRecommendationTrend",
});
const QuoteTypeSchema = Type.Object({
    exchange: Type.String(),
    quoteType: Type.String(),
    symbol: Type.String(),
    underlyingSymbol: Type.String(),
    shortName: Type.Union([Type.Null(), Type.String()]),
    longName: Type.Union([Type.Null(), Type.String()]),
    firstTradeDateEpochUtc: NullableYahooFinanceDate,
    timeZoneFullName: Type.String(),
    timeZoneShortName: Type.String(),
    uuid: Type.String(),
    messageBoardId: Type.Optional(Type.Union([Type.Null(), Type.String()])),
    gmtOffSetMilliseconds: YahooNumber,
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryQuoteType",
});
const PriceSchema = Type.Object({
    averageDailyVolume10Day: Type.Optional(YahooNumber),
    averageDailyVolume3Month: Type.Optional(YahooNumber),
    exchange: Type.Optional(Type.String()),
    exchangeName: Type.Optional(Type.String()),
    exchangeDataDelayedBy: Type.Optional(YahooNumber),
    maxAge: YahooNumber,
    postMarketChangePercent: Type.Optional(YahooNumber),
    postMarketChange: Type.Optional(YahooNumber),
    postMarketTime: Type.Optional(YahooFinanceDate),
    postMarketPrice: Type.Optional(YahooNumber),
    postMarketSource: Type.Optional(Type.String()),
    preMarketChangePercent: Type.Optional(YahooNumber),
    preMarketChange: Type.Optional(YahooNumber),
    preMarketTime: Type.Optional(YahooFinanceDate),
    preMarketPrice: Type.Optional(YahooNumber),
    preMarketSource: Type.Optional(Type.String()),
    priceHint: YahooNumber,
    regularMarketChangePercent: Type.Optional(YahooNumber),
    regularMarketChange: Type.Optional(YahooNumber),
    regularMarketTime: Type.Optional(YahooFinanceDate),
    regularMarketPrice: Type.Optional(YahooNumber),
    regularMarketDayHigh: Type.Optional(YahooNumber),
    regularMarketDayLow: Type.Optional(YahooNumber),
    regularMarketVolume: Type.Optional(YahooNumber),
    regularMarketPreviousClose: Type.Optional(YahooNumber),
    regularMarketSource: Type.Optional(Type.String()),
    regularMarketOpen: Type.Optional(YahooNumber),
    quoteSourceName: Type.Optional(Type.String()),
    quoteType: Type.String(),
    symbol: Type.String(),
    underlyingSymbol: Type.Union([Type.Null(), Type.String()]),
    shortName: Type.Union([Type.Null(), Type.String()]),
    longName: Type.Union([Type.Null(), Type.String()]),
    lastMarket: Type.Union([Type.Null(), Type.String()]),
    marketState: Type.Optional(Type.String()),
    marketCap: Type.Optional(YahooNumber),
    currency: Type.Optional(Type.String()),
    currencySymbol: Type.Optional(Type.String()),
    fromCurrency: Type.Union([Type.String(), Type.Null()]),
    toCurrency: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    volume24Hr: Type.Optional(YahooNumber),
    volumeAllCurrencies: Type.Optional(YahooNumber),
    circulatingSupply: Type.Optional(YahooNumber),
    expireDate: Type.Optional(YahooFinanceDate),
    openInterest: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryPrice",
});
const NetSharePurchaseActivitySchema = Type.Object({
    maxAge: YahooNumber,
    period: Type.String(),
    buyInfoCount: YahooNumber,
    buyInfoShares: YahooNumber,
    buyPercentInsiderShares: Type.Optional(YahooNumber),
    sellInfoCount: YahooNumber,
    sellInfoShares: Type.Optional(YahooNumber),
    sellPercentInsiderShares: Type.Optional(YahooNumber),
    netInfoCount: YahooNumber,
    netInfoShares: YahooNumber,
    netPercentInsiderShares: Type.Optional(YahooNumber),
    totalInsiderShares: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryNetSharePurchaseActivity",
});
const MajorHoldersBreakdownSchema = Type.Object({
    maxAge: YahooNumber,
    insidersPercentHeld: Type.Optional(YahooNumber),
    institutionsPercentHeld: Type.Optional(YahooNumber),
    institutionsFloatPercentHeld: Type.Optional(YahooNumber),
    institutionsCount: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryMajorHoldersBreakdown",
});
var EnumOwnership;
(function (EnumOwnership) {
    EnumOwnership["D"] = "D";
    EnumOwnership["I"] = "I";
})(EnumOwnership || (EnumOwnership = {}));
var EnumRelation;
(function (EnumRelation) {
    EnumRelation["ChairmanOfTheBoard"] = "Chairman of the Board";
    EnumRelation["ChiefExecutiveOfficer"] = "Chief Executive Officer";
    EnumRelation["ChiefFinancialOfficer"] = "Chief Financial Officer";
    EnumRelation["ChiefOperatingOfficer"] = "Chief Operating Officer";
    EnumRelation["ChiefTechnologyOfficer"] = "Chief Technology Officer";
    EnumRelation["Director"] = "Director";
    EnumRelation["DirectorIndependent"] = "Director (Independent)";
    EnumRelation["Empty"] = "";
    EnumRelation["GeneralCounsel"] = "General Counsel";
    EnumRelation["IndependentNonExecutiveDirector"] = "Independent Non-Executive Director";
    EnumRelation["Officer"] = "Officer";
    EnumRelation["President"] = "President";
})(EnumRelation || (EnumRelation = {}));
const Relation = Type.Enum(EnumRelation, { title: "QuoteSummaryRelation" });
const OwnershipEnumSchema = Type.Enum(EnumOwnership, {
    title: "QuoteSummaryOwnershipEnum",
});
const TransactionSchema = Type.Object({
    maxAge: YahooNumber,
    shares: YahooNumber,
    filerUrl: Type.String(),
    transactionText: Type.String(),
    filerName: Type.String(),
    filerRelation: Type.Union([Relation, Type.String()]),
    moneyText: Type.String(),
    startDate: YahooFinanceDate,
    ownership: Type.Union([OwnershipEnumSchema, Type.String()]),
    value: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTransaction",
});
const InsiderTransactionsSchema = Type.Object({
    transactions: Type.Array(TransactionSchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryInsiderTransactions",
});
const HolderSchema = Type.Object({
    maxAge: YahooNumber,
    name: Type.String(),
    relation: Type.Union([Relation, Type.String()]),
    url: Type.String(),
    transactionDescription: Type.String(),
    latestTransDate: YahooFinanceDate,
    positionDirect: Type.Optional(YahooNumber),
    positionDirectDate: Type.Optional(YahooFinanceDate),
    positionIndirect: Type.Optional(YahooNumber),
    positionIndirectDate: Type.Optional(YahooFinanceDate),
    positionSummaryDate: Type.Optional(YahooFinanceDate),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryHolder",
});
const HoldersSchema = Type.Object({
    holders: Type.Array(HolderSchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryHolders",
});
const TrendSchema = Type.Object({
    maxAge: YahooNumber,
    symbol: Type.Null(),
    estimates: Type.Array(Type.Any()),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryTrend",
});
const EstimateSchema = Type.Object({
    period: Type.String(),
    growth: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEstimate",
});
const IndexTrendSchema = Type.Object({
    maxAge: YahooNumber,
    symbol: Type.String(),
    peRatio: YahooNumber,
    pegRatio: YahooNumber,
    estimates: Type.Array(EstimateSchema),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryIndexTrend",
});
const IncomeStatementHistoryElementSchema = Type.Object({
    maxAge: NullableYahooNumber,
    endDate: YahooFinanceDate,
    totalRevenue: NullableYahooNumber,
    costOfRevenue: NullableYahooNumber,
    grossProfit: NullableYahooNumber,
    researchDevelopment: NullableYahooNumber,
    sellingGeneralAdministrative: NullableYahooNumber,
    nonRecurring: NullableYahooNumber,
    otherOperatingExpenses: NullableYahooNumber,
    totalOperatingExpenses: NullableYahooNumber,
    operatingIncome: NullableYahooNumber,
    totalOtherIncomeExpenseNet: NullableYahooNumber,
    ebit: NullableYahooNumber,
    interestExpense: NullableYahooNumber,
    incomeBeforeTax: NullableYahooNumber,
    incomeTaxExpense: NullableYahooNumber,
    minorityInterest: NullableYahooNumber,
    netIncomeFromContinuingOps: NullableYahooNumber,
    discontinuedOperations: NullableYahooNumber,
    extraordinaryItems: NullableYahooNumber,
    effectOfAccountingCharges: NullableYahooNumber,
    otherItems: NullableYahooNumber,
    netIncome: NullableYahooNumber,
    netIncomeApplicableToCommonShares: NullableYahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryIncomeStatementHistoryElement",
});
const IncomeStatementHistorySchema = Type.Object({
    incomeStatementHistory: Type.Array(IncomeStatementHistoryElementSchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryIncomeStatementHistory",
});
const FundProfileBrokerageSchema = Type.Object({}, {
    title: "QuoteSummaryFundProfileBrokerage",
});
const FundProfileFeesExpensesInvestmentSchema = Type.Object({
    annualHoldingsTurnover: Type.Optional(YahooNumber),
    annualReportExpenseRatio: Type.Optional(YahooNumber),
    grossExpRatio: Type.Optional(YahooNumber),
    netExpRatio: Type.Optional(YahooNumber),
    projectionValues: Type.Object({}),
    totalNetAssets: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundProfileFeesExpensesInvestment",
});
const FundProfileFeesExpensesInvestmentCatSchema = Type.Composite([
    Type.Omit(FundProfileFeesExpensesInvestmentSchema, ["projectionValues"]),
    Type.Object({
        projectionValuesCat: Type.Object({}),
    }),
], {
    title: "QuoteSummaryFundProfileFeesExpensesInvestmentCat",
    additionalProperties: Type.Any(),
});
const FundProfileManagementInfoSchema = Type.Object({
    managerName: Type.Union([Type.Null(), Type.String()]),
    managerBio: Type.Union([Type.Null(), Type.String()]),
    startdate: Type.Optional(YahooFinanceDate),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundProfileManagementInfo",
});
const FundProfileSchema = Type.Object({
    maxAge: YahooNumber,
    styleBoxUrl: Type.Optional(Type.Union([Type.Null(), Type.String()])),
    family: Type.Union([Type.Null(), Type.String()]),
    categoryName: Type.Union([Type.Null(), Type.String()]),
    legalType: Type.Union([Type.Null(), Type.String()]),
    managementInfo: Type.Optional(FundProfileManagementInfoSchema),
    feesExpensesInvestment: Type.Optional(FundProfileFeesExpensesInvestmentSchema),
    feesExpensesInvestmentCat: Type.Optional(FundProfileFeesExpensesInvestmentCatSchema),
    brokerages: Type.Optional(Type.Array(FundProfileBrokerageSchema)),
    initInvestment: Type.Optional(YahooNumber),
    initIraInvestment: Type.Optional(YahooNumber),
    initAipInvestment: Type.Optional(YahooNumber),
    subseqInvestment: Type.Optional(YahooNumber),
    subseqIraInvestment: Type.Optional(YahooNumber),
    subseqAipInvestment: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundProfile",
});
const FundPerformanceRiskOverviewStatsRowSchema = Type.Object({
    year: Type.String(), // "5y" | "3y" | "10y" | anything else?
    alpha: YahooNumber, // 7.76
    beta: YahooNumber, // 1.04
    meanAnnualReturn: YahooNumber, // 2.05
    rSquared: YahooNumber, // 84.03
    stdDev: Type.Optional(YahooNumber), // 17.12
    sharpeRatio: YahooNumber, // 1.37
    treynorRatio: YahooNumber, // 23.61
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStatsRow",
});
const FundPerformanceRiskOverviewStatsCatSchema = Type.Object({
    riskStatisticsCat: Type.Array(FundPerformanceRiskOverviewStatsRowSchema),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStatsCat",
});
const FundPerformanceRiskOverviewStatsSchema = Type.Object({
    riskStatistics: Type.Array(FundPerformanceRiskOverviewStatsRowSchema),
    riskRating: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStats",
});
const FundPerformanceReturnsRowSchema = Type.Object({
    year: YahooFinanceDate,
    annualValue: Type.Optional(YahooNumber),
    q1: Type.Optional(YahooNumber),
    q2: Type.Optional(YahooNumber),
    q3: Type.Optional(YahooNumber),
    q4: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceReturnsRow",
});
const FundPerformanceReturnsSchema = Type.Object({
    returns: Type.Array(FundPerformanceReturnsRowSchema),
    returnsCat: Type.Optional(Type.Array(FundPerformanceReturnsRowSchema)),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformanceReturns",
});
const FundPerformancePerformanceOverviewCatSchema = Type.Object({
    ytdReturnPct: Type.Optional(YahooNumber),
    fiveYrAvgReturnPct: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformancePerformanceOverviewCat",
});
const FundPerformancePerformanceOverviewSchema = Type.Object({
    asOfDate: Type.Optional(YahooFinanceDate),
    ytdReturnPct: Type.Optional(YahooNumber),
    oneYearTotalReturn: Type.Optional(YahooNumber),
    threeYearTotalReturn: Type.Optional(YahooNumber),
    fiveYrAvgReturnPct: Type.Optional(YahooNumber),
    morningStarReturnRating: Type.Optional(YahooNumber),
    numYearsUp: Type.Optional(YahooNumber),
    numYearsDown: Type.Optional(YahooNumber),
    bestOneYrTotalReturn: Type.Optional(YahooNumber),
    worstOneYrTotalReturn: Type.Optional(YahooNumber),
    bestThreeYrTotalReturn: Type.Optional(YahooNumber),
    worstThreeYrTotalReturn: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformancePerformanceOverview",
});
const PeriodRangeSchema = Type.Object({
    asOfDate: Type.Optional(YahooFinanceDate),
    ytd: Type.Optional(YahooNumber),
    oneMonth: Type.Optional(YahooNumber),
    threeMonth: Type.Optional(YahooNumber),
    oneYear: Type.Optional(YahooNumber),
    threeYear: Type.Optional(YahooNumber),
    fiveYear: Type.Optional(YahooNumber),
    tenYear: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryPeriodRange",
});
const FundPerformanceTrailingReturnsSchema = Type.Composite([
    PeriodRangeSchema,
    Type.Object({
        lastBullMkt: Type.Optional(YahooNumber),
        lastBearMkt: Type.Optional(YahooNumber),
    }, {
        additionalProperties: Type.Any(),
    }),
], {
    title: "QuoteSummaryFundPerformanceTrailingReturns",
});
const FundPerformanceSchema = Type.Object({
    maxAge: YahooNumber,
    loadAdjustedReturns: Type.Optional(PeriodRangeSchema),
    rankInCategory: Type.Optional(PeriodRangeSchema),
    performanceOverview: FundPerformancePerformanceOverviewSchema,
    performanceOverviewCat: FundPerformancePerformanceOverviewCatSchema,
    trailingReturns: FundPerformanceTrailingReturnsSchema,
    trailingReturnsNav: FundPerformanceTrailingReturnsSchema,
    trailingReturnsCat: FundPerformanceTrailingReturnsSchema,
    annualTotalReturns: FundPerformanceReturnsSchema,
    pastQuarterlyReturns: FundPerformanceReturnsSchema,
    riskOverviewStatistics: FundPerformanceRiskOverviewStatsSchema,
    riskOverviewStatisticsCat: FundPerformanceRiskOverviewStatsCatSchema,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFundPerformance",
});
const OwnershipListSchema = Type.Object({
    maxAge: YahooNumber,
    reportDate: YahooFinanceDate,
    organization: Type.String(),
    pctHeld: YahooNumber,
    position: YahooNumber,
    value: YahooNumber,
    pctChange: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryOwnershipList",
});
const OwnershipSchema = Type.Object({
    maxAge: YahooNumber,
    ownershipList: Type.Array(OwnershipListSchema),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryOwnership",
});
const FinancialDataSchema = Type.Object({
    maxAge: YahooNumber,
    currentPrice: Type.Optional(YahooNumber),
    targetHighPrice: Type.Optional(YahooNumber),
    targetLowPrice: Type.Optional(YahooNumber),
    targetMeanPrice: Type.Optional(YahooNumber),
    targetMedianPrice: Type.Optional(YahooNumber),
    recommendationMean: Type.Optional(YahooNumber),
    recommendationKey: Type.String(),
    numberOfAnalystOpinions: Type.Optional(YahooNumber),
    totalCash: Type.Optional(YahooNumber),
    totalCashPerShare: Type.Optional(YahooNumber),
    ebitda: Type.Optional(YahooNumber),
    totalDebt: Type.Optional(YahooNumber),
    quickRatio: Type.Optional(YahooNumber),
    currentRatio: Type.Optional(YahooNumber),
    totalRevenue: Type.Optional(YahooNumber),
    debtToEquity: Type.Optional(YahooNumber),
    revenuePerShare: Type.Optional(YahooNumber),
    returnOnAssets: Type.Optional(YahooNumber),
    returnOnEquity: Type.Optional(YahooNumber),
    grossProfits: Type.Optional(YahooNumber),
    freeCashflow: Type.Optional(YahooNumber),
    operatingCashflow: Type.Optional(YahooNumber),
    earningsGrowth: Type.Optional(YahooNumber),
    revenueGrowth: Type.Optional(YahooNumber),
    grossMargins: Type.Optional(YahooNumber),
    ebitdaMargins: Type.Optional(YahooNumber),
    operatingMargins: Type.Optional(YahooNumber),
    profitMargins: Type.Optional(YahooNumber),
    financialCurrency: Type.Union([Type.String(), Type.Null()]),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFinancialData",
});
const RevenueEstimateSchema = Type.Object({
    avg: NullableYahooNumber,
    low: NullableYahooNumber,
    high: NullableYahooNumber,
    numberOfAnalysts: NullableYahooNumber,
    yearAgoRevenue: NullableYahooNumber,
    growth: NullableYahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryRevenueEstimate",
});
const EpsTrendSchema = Type.Object({
    current: NullableYahooNumber,
    "7daysAgo": NullableYahooNumber,
    "30daysAgo": NullableYahooNumber,
    "60daysAgo": NullableYahooNumber,
    "90daysAgo": NullableYahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEpsTrend",
});
const EpsRevisionsSchema = Type.Object({
    upLast7days: NullableYahooNumber,
    upLast30days: NullableYahooNumber,
    downLast30days: NullableYahooNumber,
    downLast90days: NullableYahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEpsRevisions",
});
const EarningsEstimateSchema = Type.Object({
    avg: NullableYahooNumber,
    low: NullableYahooNumber,
    high: NullableYahooNumber,
    yearAgoEps: NullableYahooNumber,
    numberOfAnalysts: NullableYahooNumber,
    growth: NullableYahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsEstimate",
});
const EarningsTrendTrendSchema = Type.Object({
    maxAge: YahooNumber,
    period: Type.String(),
    endDate: NullableYahooFinanceDate,
    growth: NullableYahooNumber,
    earningsEstimate: EarningsEstimateSchema,
    revenueEstimate: RevenueEstimateSchema,
    epsTrend: EpsTrendSchema,
    epsRevisions: EpsRevisionsSchema,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsTrendTrend",
});
const EarningsTrendSchema = Type.Object({
    trend: Type.Array(EarningsTrendTrendSchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsTrend",
});
const EarningsHistoryHistorySchema = Type.Object({
    maxAge: YahooNumber,
    epsActual: NullableYahooNumber,
    epsEstimate: NullableYahooNumber,
    epsDifference: NullableYahooNumber,
    surprisePercent: NullableYahooNumber,
    quarter: NullableYahooFinanceDate,
    period: Type.String(),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsHistoryHistory",
});
const EarningsHistorySchema = Type.Object({
    history: Type.Array(EarningsHistoryHistorySchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsHistory",
});
const YearlySchema = Type.Object({
    date: YahooNumber,
    revenue: YahooNumber,
    earnings: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryYearly",
});
const FinancialsChartQuarterlySchema = Type.Object({
    date: Type.String(),
    revenue: YahooNumber,
    earnings: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFinancialsChartQuarterly",
});
const FinancialsChartSchema = Type.Object({
    yearly: Type.Array(YearlySchema),
    quarterly: Type.Array(FinancialsChartQuarterlySchema),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryFinancialsChart",
});
const EarningsChartQuarterlySchema = Type.Object({
    date: Type.String(),
    actual: YahooNumber,
    estimate: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsChartQuarterly",
});
const EarningsChartSchema = Type.Object({
    quarterly: Type.Array(EarningsChartQuarterlySchema),
    currentQuarterEstimate: Type.Optional(YahooNumber),
    currentQuarterEstimateDate: Type.Optional(Type.String()),
    currentQuarterEstimateYear: Type.Optional(YahooNumber),
    earningsDate: Type.Array(YahooFinanceDate),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarningsChart",
});
const QuoteSummaryEarningsSchema = Type.Object({
    maxAge: YahooNumber,
    earningsChart: EarningsChartSchema,
    financialsChart: FinancialsChartSchema,
    financialCurrency: Type.Optional(Type.String()),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryEarnings",
});
const DefaultKeyStatisticsSchema = Type.Object({
    maxAge: YahooNumber,
    priceHint: YahooNumber,
    enterpriseValue: Type.Optional(YahooNumber),
    forwardPE: Type.Optional(YahooNumber),
    profitMargins: Type.Optional(YahooNumber),
    floatShares: Type.Optional(YahooNumber),
    sharesOutstanding: Type.Optional(YahooNumber),
    sharesShort: Type.Optional(YahooNumber),
    sharesShortPriorMonth: Type.Optional(YahooFinanceDate),
    sharesShortPreviousMonthDate: Type.Optional(YahooFinanceDate),
    dateShortInterest: Type.Optional(YahooNumber),
    sharesPercentSharesOut: Type.Optional(YahooNumber),
    heldPercentInsiders: Type.Optional(YahooNumber),
    heldPercentInstitutions: Type.Optional(YahooNumber),
    shortRatio: Type.Optional(YahooNumber),
    shortPercentOfFloat: Type.Optional(YahooNumber),
    beta: Type.Optional(YahooNumber),
    impliedSharesOutstanding: Type.Optional(YahooNumber),
    category: Type.Union([Type.Null(), Type.String()]),
    bookValue: Type.Optional(YahooNumber),
    priceToBook: Type.Optional(YahooNumber),
    fundFamily: Type.Union([Type.Null(), Type.String()]),
    legalType: Type.Union([Type.Null(), Type.String()]),
    lastFiscalYearEnd: Type.Optional(YahooFinanceDate),
    nextFiscalYearEnd: Type.Optional(YahooFinanceDate),
    mostRecentQuarter: Type.Optional(YahooFinanceDate),
    earningsQuarterlyGrowth: Type.Optional(YahooNumber),
    netIncomeToCommon: Type.Optional(YahooNumber),
    trailingEps: Type.Optional(YahooNumber),
    forwardEps: Type.Optional(YahooNumber),
    pegRatio: Type.Optional(YahooNumber),
    lastSplitFactor: Type.Union([Type.Null(), Type.String()]),
    lastSplitDate: Type.Optional(YahooNumber),
    enterpriseToRevenue: Type.Optional(YahooNumber),
    enterpriseToEbitda: Type.Optional(YahooNumber),
    "52WeekChange": Type.Optional(YahooNumber),
    SandP52WeekChange: Type.Optional(YahooNumber),
    lastDividendValue: Type.Optional(YahooNumber),
    lastDividendDate: Type.Optional(YahooFinanceDate),
    ytdReturn: Type.Optional(YahooNumber),
    beta3Year: Type.Optional(YahooNumber),
    totalAssets: Type.Optional(YahooNumber),
    yield: Type.Optional(YahooNumber),
    fundInceptionDate: Type.Optional(YahooFinanceDate),
    threeYearAverageReturn: Type.Optional(YahooNumber),
    fiveYearAverageReturn: Type.Optional(YahooNumber),
    morningStarOverallRating: Type.Optional(YahooNumber),
    morningStarRiskRating: Type.Optional(YahooNumber),
    annualReportExpenseRatio: Type.Optional(YahooNumber),
    lastCapGain: Type.Optional(YahooNumber),
    annualHoldingsTurnover: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryDefaultKeyStatistics",
});
const CashflowStatementSchema = Type.Object({
    maxAge: YahooNumber,
    endDate: YahooFinanceDate,
    netIncome: YahooNumber,
    depreciation: Type.Optional(YahooNumber),
    changeToNetincome: Type.Optional(YahooNumber),
    changeToAccountReceivables: Type.Optional(YahooNumber),
    changeToLiabilities: Type.Optional(YahooNumber),
    changeToInventory: Type.Optional(YahooNumber),
    changeToOperatingActivities: Type.Optional(YahooNumber),
    totalCashFromOperatingActivities: Type.Optional(YahooNumber),
    capitalExpenditures: Type.Optional(YahooNumber),
    investments: Type.Optional(YahooNumber),
    otherCashflowsFromInvestingActivities: Type.Optional(YahooNumber),
    totalCashflowsFromInvestingActivities: Type.Optional(YahooNumber),
    dividendsPaid: Type.Optional(YahooNumber),
    netBorrowings: Type.Optional(YahooNumber),
    otherCashflowsFromFinancingActivities: Type.Optional(YahooNumber),
    totalCashFromFinancingActivities: Type.Optional(YahooNumber),
    changeInCash: Type.Optional(YahooNumber),
    repurchaseOfStock: Type.Optional(YahooNumber),
    issuanceOfStock: Type.Optional(YahooNumber),
    effectOfExchangeRate: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryCashflowStatement",
});
const CashflowStatementHistorySchema = Type.Object({
    cashflowStatements: Type.Array(CashflowStatementSchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryCashflowStatementHistory",
});
const CalendarEventsEarningsSchema = Type.Object({
    earningsDate: Type.Array(YahooFinanceDate),
    earningsAverage: Type.Optional(YahooNumber),
    earningsLow: Type.Optional(YahooNumber),
    earningsHigh: Type.Optional(YahooNumber),
    revenueAverage: Type.Optional(YahooNumber),
    revenueLow: Type.Optional(YahooNumber),
    revenueHigh: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSumamryCalendarEventsEarnings",
});
const CalendarEventsSchema = Type.Object({
    maxAge: YahooNumber,
    earnings: CalendarEventsEarningsSchema,
    exDividendDate: Type.Optional(YahooFinanceDate),
    dividendDate: Type.Optional(YahooFinanceDate),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryCalendarEvents",
});
const BalanceSheetStatementSchema = Type.Object({
    maxAge: YahooNumber,
    endDate: YahooFinanceDate,
    cash: Type.Optional(YahooNumber),
    shortTermInvestments: Type.Optional(YahooNumber),
    netReceivables: Type.Optional(YahooNumber),
    inventory: Type.Optional(YahooNumber),
    otherCurrentAssets: Type.Optional(YahooNumber),
    totalCurrentAssets: Type.Optional(YahooNumber),
    longTermInvestments: Type.Optional(YahooNumber),
    propertyPlantEquipment: Type.Optional(YahooNumber),
    otherAssets: Type.Optional(YahooNumber),
    totalAssets: Type.Optional(YahooNumber),
    accountsPayable: Type.Optional(YahooNumber),
    shortLongTermDebt: Type.Optional(YahooNumber),
    otherCurrentLiab: Type.Optional(YahooNumber),
    longTermDebt: Type.Optional(YahooNumber),
    otherLiab: Type.Optional(YahooNumber),
    totalCurrentLiabilities: Type.Optional(YahooNumber),
    totalLiab: Type.Optional(YahooNumber),
    commonStock: Type.Optional(YahooNumber),
    retainedEarnings: Type.Optional(YahooNumber),
    treasuryStock: Type.Optional(YahooNumber),
    otherStockholderEquity: Type.Optional(YahooNumber),
    totalStockholderEquity: Type.Optional(YahooNumber),
    netTangibleAssets: Type.Optional(YahooNumber),
    goodWill: Type.Optional(YahooNumber),
    intangibleAssets: Type.Optional(YahooNumber),
    deferredLongTermAssetCharges: Type.Optional(YahooNumber),
    deferredLongTermLiab: Type.Optional(YahooNumber),
    minorityInterest: Type.Optional(NullableYahooNumber),
    capitalSurplus: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryBalanceSheetStatement",
});
const BalanceSheetHistorySchema = Type.Object({
    balanceSheetStatements: Type.Array(BalanceSheetStatementSchema),
    maxAge: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryBalanceSheetHistory",
});
const CompanyOfficerSchema = Type.Object({
    maxAge: YahooNumber,
    name: Type.String(),
    age: Type.Optional(YahooNumber),
    title: Type.String(),
    yearBorn: Type.Optional(YahooNumber),
    fiscalYear: Type.Optional(YahooNumber),
    totalPay: Type.Optional(YahooNumber),
    exercisedValue: Type.Optional(YahooNumber),
    unexercisedValue: Type.Optional(YahooNumber),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryCompanyOfficer",
});
const AssetProfileSchema = Type.Object({
    maxAge: YahooNumber,
    address1: Type.Optional(Type.String()),
    address2: Type.Optional(Type.String()),
    address3: Type.Optional(Type.String()),
    city: Type.Optional(Type.String()),
    state: Type.Optional(Type.String()),
    zip: Type.Optional(Type.String()),
    country: Type.Optional(Type.String()),
    phone: Type.Optional(Type.String()),
    fax: Type.Optional(Type.String()),
    website: Type.Optional(Type.String()),
    industry: Type.Optional(Type.String()),
    industryDisp: Type.Optional(Type.String()),
    industryKey: Type.Optional(Type.String()),
    industrySymbol: Type.Optional(Type.String()),
    sector: Type.Optional(Type.String()),
    sectorDisp: Type.Optional(Type.String()),
    sectorKey: Type.Optional(Type.String()),
    longBusinessSummary: Type.Optional(Type.String()),
    fullTimeEmployees: Type.Optional(YahooNumber),
    companyOfficers: Type.Array(CompanyOfficerSchema),
    auditRisk: Type.Optional(YahooNumber),
    boardRisk: Type.Optional(YahooNumber),
    compensationRisk: Type.Optional(YahooNumber),
    shareHolderRightsRisk: Type.Optional(YahooNumber),
    overallRisk: Type.Optional(YahooNumber),
    governanceEpochDate: Type.Optional(YahooFinanceDate),
    compensationAsOfEpochDate: Type.Optional(YahooFinanceDate),
    name: Type.Optional(Type.String()), // 'Bitcoin';
    startDate: Type.Optional(YahooFinanceDate), // new Date('2013-04-28')
    description: Type.Optional(Type.String()), // 'Bitcoin (BTC) is a cryptocurrency...'
    twitter: Type.Optional(Type.String()), // in e.g. "ADA-USD" (#418)
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryAssetProfile",
});
export const QuoteSummaryResultSchema = Type.Object({
    assetProfile: Type.Optional(AssetProfileSchema),
    balanceSheetHistory: Type.Optional(BalanceSheetHistorySchema),
    balanceSheetHistoryQuarterly: Type.Optional(BalanceSheetHistorySchema),
    calendarEvents: Type.Optional(CalendarEventsSchema),
    cashflowStatementHistory: Type.Optional(CashflowStatementHistorySchema),
    cashflowStatementHistoryQuarterly: Type.Optional(CashflowStatementHistorySchema),
    defaultKeyStatistics: Type.Optional(DefaultKeyStatisticsSchema),
    earnings: Type.Optional(QuoteSummaryEarningsSchema),
    earningsHistory: Type.Optional(EarningsHistorySchema),
    earningsTrend: Type.Optional(EarningsTrendSchema),
    financialData: Type.Optional(FinancialDataSchema),
    fundOwnership: Type.Optional(OwnershipSchema),
    fundPerformance: Type.Optional(FundPerformanceSchema),
    fundProfile: Type.Optional(FundProfileSchema),
    incomeStatementHistory: Type.Optional(IncomeStatementHistorySchema),
    incomeStatementHistoryQuarterly: Type.Optional(IncomeStatementHistorySchema),
    indexTrend: Type.Optional(IndexTrendSchema),
    industryTrend: Type.Optional(TrendSchema),
    // insiderHolders: Type.Optional(InsiderTransactionsSchema), // <--
    institutionOwnership: Type.Optional(OwnershipSchema),
    majorDirectHolders: Type.Optional(HoldersSchema),
    majorHoldersBreakdown: Type.Optional(MajorHoldersBreakdownSchema),
    netSharePurchaseActivity: Type.Optional(NetSharePurchaseActivitySchema),
    price: Type.Optional(PriceSchema),
    quoteType: Type.Optional(QuoteTypeSchema),
    recommendationTrend: Type.Optional(RecommendationTrendSchema),
    secFilings: Type.Optional(SECFilingsSchema),
    sectorTrend: Type.Optional(TrendSchema),
    summaryDetail: Type.Optional(SummaryDetailSchema),
    summaryProfile: Type.Optional(SummaryProfileSchema),
    topHoldings: Type.Optional(TopHoldingsSchema),
    upgradeDowngradeHistory: Type.Optional(UpgradeDowngradeHistorySchema),
}, {
    additionalProperties: Type.Any(),
    title: "QuoteSummaryResult",
});
