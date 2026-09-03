"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteSummaryResultSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
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
const Grade = typebox_1.Type.Enum(EnumGrade, { title: "QuoteSummaryEnumGrade" });
const ActionSchema = typebox_1.Type.Enum(Action, { title: "QuoteSummaryAction" });
const UpgradeDowngradeHistoryHistorySchema = typebox_1.Type.Object({
    epochGradeDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    firm: typebox_1.Type.String(),
    toGrade: Grade,
    fromGrade: typebox_1.Type.Optional(Grade),
    action: ActionSchema,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryUpgradeDowngradeHistoryHistory",
});
const UpgradeDowngradeHistorySchema = typebox_1.Type.Object({
    history: typebox_1.Type.Array(UpgradeDowngradeHistoryHistorySchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryUpgradeDowngradeHistory",
});
const TopHoldingsSectorWeightingSchema = typebox_1.Type.Object({
    realestate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    consumer_cyclical: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    basic_materials: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    consumer_defensive: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    technology: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    communication_services: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    financial_services: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    utilities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    industrials: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    energy: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    healthcare: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryTopHoldingsSectorWeighting",
});
const TopHoldingsBondRatingSchema = typebox_1.Type.Object({
    a: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    aa: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    aaa: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    other: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    b: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    bb: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    bbb: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    below_b: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    us_government: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryTopHoldingsBondRating",
});
const TopHoldingsEquityHoldingsSchema = typebox_1.Type.Object({
    medianMarketCap: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    medianMarketCapCat: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    priceToBook: yahooFinanceTypes_js_1.YahooNumber,
    priceToBookCat: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    priceToCashflow: yahooFinanceTypes_js_1.YahooNumber,
    priceToCashflowCat: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    priceToEarnings: yahooFinanceTypes_js_1.YahooNumber,
    priceToEarningsCat: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    priceToSales: yahooFinanceTypes_js_1.YahooNumber,
    priceToSalesCat: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    threeYearEarningsGrowth: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    threeYearEarningsGrowthCat: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryTopHoldingsEquityHoldings",
});
const TopHoldingsHoldingSchema = typebox_1.Type.Object({
    symbol: typebox_1.Type.String(),
    holdingName: typebox_1.Type.String(),
    holdingPercent: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryTopHoldingsHolding",
});
const TopHoldingsSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    stockPosition: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    bondPosition: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    holdings: typebox_1.Type.Array(TopHoldingsHoldingSchema),
    equityHoldings: TopHoldingsEquityHoldingsSchema,
    bondHoldings: typebox_1.Type.Object({}),
    bondRatings: typebox_1.Type.Array(TopHoldingsBondRatingSchema),
    sectorWeightings: typebox_1.Type.Array(TopHoldingsSectorWeightingSchema),
    cashPosition: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    otherPosition: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    preferredPosition: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    convertiblePosition: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryTopHoldings",
});
const SummaryProfileSchema = typebox_1.Type.Object({
    address1: typebox_1.Type.Optional(typebox_1.Type.String()),
    address2: typebox_1.Type.Optional(typebox_1.Type.String()),
    address3: typebox_1.Type.Optional(typebox_1.Type.String()),
    city: typebox_1.Type.Optional(typebox_1.Type.String()),
    state: typebox_1.Type.Optional(typebox_1.Type.String()),
    zip: typebox_1.Type.Optional(typebox_1.Type.String()),
    country: typebox_1.Type.Optional(typebox_1.Type.String()),
    phone: typebox_1.Type.Optional(typebox_1.Type.String()),
    fax: typebox_1.Type.Optional(typebox_1.Type.String()),
    website: typebox_1.Type.Optional(typebox_1.Type.String()),
    industry: typebox_1.Type.Optional(typebox_1.Type.String()),
    industryDisp: typebox_1.Type.Optional(typebox_1.Type.String()),
    sector: typebox_1.Type.Optional(typebox_1.Type.String()),
    sectorDisp: typebox_1.Type.Optional(typebox_1.Type.String()),
    longBusinessSummary: typebox_1.Type.Optional(typebox_1.Type.String()),
    fullTimeEmployees: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    companyOfficers: typebox_1.Type.Array(typebox_1.Type.Any()),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    twitter: typebox_1.Type.Optional(typebox_1.Type.String()), // in e.g. "ADA-USD" (#418)
    // seems like for cryptocurency only
    // TODO: how does this relate to Quote type.  Common base?
    name: typebox_1.Type.Optional(typebox_1.Type.String()), // 'Bitcoin'
    startDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // new Date('2013-04-28')
    description: typebox_1.Type.Optional(typebox_1.Type.String()), // 'Bitcoin (BTC) is a cryptocurrency...'
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummarySummaryProfile",
});
const SummaryDetailSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    priceHint: yahooFinanceTypes_js_1.YahooNumber,
    previousClose: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // missing in e.g. "APS.AX"
    open: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    dayLow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    dayHigh: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketPreviousClose: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // missing in e.g. "APS.AX"
    regularMarketOpen: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketDayLow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketDayHigh: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketVolume: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    dividendRate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    dividendYield: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    exDividendDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    payoutRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiveYearAvgDividendYield: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    beta: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    trailingPE: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    forwardPE: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    volume: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    averageVolume: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    averageVolume10days: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    averageDailyVolume10Day: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    bid: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    ask: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    bidSize: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    askSize: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    marketCap: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiftyDayAverage: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiftyTwoWeekLow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiftyTwoWeekHigh: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    twoHundredDayAverage: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    priceToSalesTrailing12Months: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    trailingAnnualDividendRate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    trailingAnnualDividendYield: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    currency: typebox_1.Type.String(),
    algorithm: typebox_1.Type.Null(),
    tradeable: typebox_1.Type.Boolean(),
    yield: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    navPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    ytdReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    // crypto only (optional, or null in other types)
    // TODO: how does Price / SummaryDetail compare? common base?
    fromCurrency: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]), // 'BTC'
    toCurrency: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()])), // 'USD-X'
    lastMarket: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]), // 'CoinMarketCap'
    volume24Hr: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 62650314752
    volumeAllCurrencies: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 62650314752
    circulatingSupply: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 18638932
    startDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // new Date(1367107200 * 1000)
    coinMarketCapLink: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()])), // "https://coinmarketcap.com/currencies/cardano"
    // futures
    expireDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // 1656374400,
    openInterest: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 444411,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummarySummaryDetail",
});
// May consider switching this to string, as we keep finding more and more.
const FilingType = typebox_1.Type.Union([
    typebox_1.Type.Literal("10-K"),
    typebox_1.Type.Literal("10-Q"),
    typebox_1.Type.Literal("8-K"),
    typebox_1.Type.Literal("8-K/A"),
    typebox_1.Type.Literal("10-K/A"),
    typebox_1.Type.Literal("10-Q/A"),
    typebox_1.Type.Literal("SD"),
    typebox_1.Type.Literal("PX14A6G"),
    typebox_1.Type.Literal("SC 13G/A"),
    typebox_1.Type.Literal("DEFA14A"),
    typebox_1.Type.Literal("25-NSE"),
    typebox_1.Type.Literal("S-8 POS"),
    typebox_1.Type.Literal("6-K"),
    typebox_1.Type.Literal("F-3ASR"),
    typebox_1.Type.Literal("SC 13D/A"),
    typebox_1.Type.Literal("20-F"),
    typebox_1.Type.Literal("425"),
    typebox_1.Type.Literal("SC14D9C"),
    typebox_1.Type.Literal("SC 13G"),
    typebox_1.Type.Literal("S-8"),
    typebox_1.Type.Literal("DEF 14A"),
    typebox_1.Type.Literal("F-10"),
], {
    title: "QuoteSummaryFilingType",
});
const FilingSchema = typebox_1.Type.Object({
    date: typebox_1.Type.String(),
    epochDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    type: FilingType,
    title: typebox_1.Type.String(),
    edgarUrl: typebox_1.Type.String(),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    url: typebox_1.Type.Optional(typebox_1.Type.String()),
    exhibits: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Object({
        type: typebox_1.Type.String(),
        url: typebox_1.Type.String(),
        downloadUrl: typebox_1.Type.Optional(typebox_1.Type.String()),
    }))),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFiling",
});
const SECFilingsSchema = typebox_1.Type.Object({
    filings: typebox_1.Type.Array(FilingSchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummarySECFilings",
});
const RecommendationTrendTrendSchema = typebox_1.Type.Object({
    period: typebox_1.Type.String(),
    strongBuy: yahooFinanceTypes_js_1.YahooNumber,
    buy: yahooFinanceTypes_js_1.YahooNumber,
    hold: yahooFinanceTypes_js_1.YahooNumber,
    sell: yahooFinanceTypes_js_1.YahooNumber,
    strongSell: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryRecommendationTrendTrend",
});
const RecommendationTrendSchema = typebox_1.Type.Object({
    trend: typebox_1.Type.Array(RecommendationTrendTrendSchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryRecommendationTrend",
});
const QuoteTypeSchema = typebox_1.Type.Object({
    exchange: typebox_1.Type.String(),
    quoteType: typebox_1.Type.String(),
    symbol: typebox_1.Type.String(),
    underlyingSymbol: typebox_1.Type.String(),
    shortName: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    longName: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    firstTradeDateEpochUtc: yahooFinanceTypes_js_1.NullableYahooFinanceDate,
    timeZoneFullName: typebox_1.Type.String(),
    timeZoneShortName: typebox_1.Type.String(),
    uuid: typebox_1.Type.String(),
    messageBoardId: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()])),
    gmtOffSetMilliseconds: yahooFinanceTypes_js_1.YahooNumber,
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryQuoteType",
});
const PriceSchema = typebox_1.Type.Object({
    averageDailyVolume10Day: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    averageDailyVolume3Month: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    exchange: typebox_1.Type.Optional(typebox_1.Type.String()),
    exchangeName: typebox_1.Type.Optional(typebox_1.Type.String()),
    exchangeDataDelayedBy: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    postMarketChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    postMarketChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    postMarketTime: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    postMarketPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    postMarketSource: typebox_1.Type.Optional(typebox_1.Type.String()),
    preMarketChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    preMarketChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    preMarketTime: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    preMarketPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    preMarketSource: typebox_1.Type.Optional(typebox_1.Type.String()),
    priceHint: yahooFinanceTypes_js_1.YahooNumber,
    regularMarketChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketTime: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    regularMarketPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketDayHigh: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketDayLow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketVolume: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketPreviousClose: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    regularMarketSource: typebox_1.Type.Optional(typebox_1.Type.String()),
    regularMarketOpen: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    quoteSourceName: typebox_1.Type.Optional(typebox_1.Type.String()),
    quoteType: typebox_1.Type.String(),
    symbol: typebox_1.Type.String(),
    underlyingSymbol: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    shortName: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    longName: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    lastMarket: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    marketState: typebox_1.Type.Optional(typebox_1.Type.String()),
    marketCap: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    currency: typebox_1.Type.Optional(typebox_1.Type.String()),
    currencySymbol: typebox_1.Type.Optional(typebox_1.Type.String()),
    fromCurrency: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
    toCurrency: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()])),
    volume24Hr: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    volumeAllCurrencies: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    circulatingSupply: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    expireDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    openInterest: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryPrice",
});
const NetSharePurchaseActivitySchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    period: typebox_1.Type.String(),
    buyInfoCount: yahooFinanceTypes_js_1.YahooNumber,
    buyInfoShares: yahooFinanceTypes_js_1.YahooNumber,
    buyPercentInsiderShares: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    sellInfoCount: yahooFinanceTypes_js_1.YahooNumber,
    sellInfoShares: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    sellPercentInsiderShares: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    netInfoCount: yahooFinanceTypes_js_1.YahooNumber,
    netInfoShares: yahooFinanceTypes_js_1.YahooNumber,
    netPercentInsiderShares: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalInsiderShares: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryNetSharePurchaseActivity",
});
const MajorHoldersBreakdownSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    insidersPercentHeld: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    institutionsPercentHeld: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    institutionsFloatPercentHeld: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    institutionsCount: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
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
const Relation = typebox_1.Type.Enum(EnumRelation, { title: "QuoteSummaryRelation" });
const OwnershipEnumSchema = typebox_1.Type.Enum(EnumOwnership, {
    title: "QuoteSummaryOwnershipEnum",
});
const TransactionSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    shares: yahooFinanceTypes_js_1.YahooNumber,
    filerUrl: typebox_1.Type.String(),
    transactionText: typebox_1.Type.String(),
    filerName: typebox_1.Type.String(),
    filerRelation: typebox_1.Type.Union([Relation, typebox_1.Type.String()]),
    moneyText: typebox_1.Type.String(),
    startDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    ownership: typebox_1.Type.Union([OwnershipEnumSchema, typebox_1.Type.String()]),
    value: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryTransaction",
});
const InsiderTransactionsSchema = typebox_1.Type.Object({
    transactions: typebox_1.Type.Array(TransactionSchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryInsiderTransactions",
});
const HolderSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    name: typebox_1.Type.String(),
    relation: typebox_1.Type.Union([Relation, typebox_1.Type.String()]),
    url: typebox_1.Type.String(),
    transactionDescription: typebox_1.Type.String(),
    latestTransDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    positionDirect: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    positionDirectDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    positionIndirect: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    positionIndirectDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    positionSummaryDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryHolder",
});
const HoldersSchema = typebox_1.Type.Object({
    holders: typebox_1.Type.Array(HolderSchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryHolders",
});
const TrendSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    symbol: typebox_1.Type.Null(),
    estimates: typebox_1.Type.Array(typebox_1.Type.Any()),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryTrend",
});
const EstimateSchema = typebox_1.Type.Object({
    period: typebox_1.Type.String(),
    growth: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEstimate",
});
const IndexTrendSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    symbol: typebox_1.Type.String(),
    peRatio: yahooFinanceTypes_js_1.YahooNumber,
    pegRatio: yahooFinanceTypes_js_1.YahooNumber,
    estimates: typebox_1.Type.Array(EstimateSchema),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryIndexTrend",
});
const IncomeStatementHistoryElementSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.NullableYahooNumber,
    endDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    totalRevenue: yahooFinanceTypes_js_1.NullableYahooNumber,
    costOfRevenue: yahooFinanceTypes_js_1.NullableYahooNumber,
    grossProfit: yahooFinanceTypes_js_1.NullableYahooNumber,
    researchDevelopment: yahooFinanceTypes_js_1.NullableYahooNumber,
    sellingGeneralAdministrative: yahooFinanceTypes_js_1.NullableYahooNumber,
    nonRecurring: yahooFinanceTypes_js_1.NullableYahooNumber,
    otherOperatingExpenses: yahooFinanceTypes_js_1.NullableYahooNumber,
    totalOperatingExpenses: yahooFinanceTypes_js_1.NullableYahooNumber,
    operatingIncome: yahooFinanceTypes_js_1.NullableYahooNumber,
    totalOtherIncomeExpenseNet: yahooFinanceTypes_js_1.NullableYahooNumber,
    ebit: yahooFinanceTypes_js_1.NullableYahooNumber,
    interestExpense: yahooFinanceTypes_js_1.NullableYahooNumber,
    incomeBeforeTax: yahooFinanceTypes_js_1.NullableYahooNumber,
    incomeTaxExpense: yahooFinanceTypes_js_1.NullableYahooNumber,
    minorityInterest: yahooFinanceTypes_js_1.NullableYahooNumber,
    netIncomeFromContinuingOps: yahooFinanceTypes_js_1.NullableYahooNumber,
    discontinuedOperations: yahooFinanceTypes_js_1.NullableYahooNumber,
    extraordinaryItems: yahooFinanceTypes_js_1.NullableYahooNumber,
    effectOfAccountingCharges: yahooFinanceTypes_js_1.NullableYahooNumber,
    otherItems: yahooFinanceTypes_js_1.NullableYahooNumber,
    netIncome: yahooFinanceTypes_js_1.NullableYahooNumber,
    netIncomeApplicableToCommonShares: yahooFinanceTypes_js_1.NullableYahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryIncomeStatementHistoryElement",
});
const IncomeStatementHistorySchema = typebox_1.Type.Object({
    incomeStatementHistory: typebox_1.Type.Array(IncomeStatementHistoryElementSchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryIncomeStatementHistory",
});
const FundProfileBrokerageSchema = typebox_1.Type.Object({}, {
    title: "QuoteSummaryFundProfileBrokerage",
});
const FundProfileFeesExpensesInvestmentSchema = typebox_1.Type.Object({
    annualHoldingsTurnover: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    annualReportExpenseRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    grossExpRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    netExpRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    projectionValues: typebox_1.Type.Object({}),
    totalNetAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundProfileFeesExpensesInvestment",
});
const FundProfileFeesExpensesInvestmentCatSchema = typebox_1.Type.Composite([
    typebox_1.Type.Omit(FundProfileFeesExpensesInvestmentSchema, ["projectionValues"]),
    typebox_1.Type.Object({
        projectionValuesCat: typebox_1.Type.Object({}),
    }),
], {
    title: "QuoteSummaryFundProfileFeesExpensesInvestmentCat",
    additionalProperties: typebox_1.Type.Any(),
});
const FundProfileManagementInfoSchema = typebox_1.Type.Object({
    managerName: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    managerBio: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    startdate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundProfileManagementInfo",
});
const FundProfileSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    styleBoxUrl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()])),
    family: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    categoryName: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    legalType: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    managementInfo: typebox_1.Type.Optional(FundProfileManagementInfoSchema),
    feesExpensesInvestment: typebox_1.Type.Optional(FundProfileFeesExpensesInvestmentSchema),
    feesExpensesInvestmentCat: typebox_1.Type.Optional(FundProfileFeesExpensesInvestmentCatSchema),
    brokerages: typebox_1.Type.Optional(typebox_1.Type.Array(FundProfileBrokerageSchema)),
    initInvestment: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    initIraInvestment: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    initAipInvestment: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    subseqInvestment: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    subseqIraInvestment: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    subseqAipInvestment: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundProfile",
});
const FundPerformanceRiskOverviewStatsRowSchema = typebox_1.Type.Object({
    year: typebox_1.Type.String(), // "5y" | "3y" | "10y" | anything else?
    alpha: yahooFinanceTypes_js_1.YahooNumber, // 7.76
    beta: yahooFinanceTypes_js_1.YahooNumber, // 1.04
    meanAnnualReturn: yahooFinanceTypes_js_1.YahooNumber, // 2.05
    rSquared: yahooFinanceTypes_js_1.YahooNumber, // 84.03
    stdDev: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 17.12
    sharpeRatio: yahooFinanceTypes_js_1.YahooNumber, // 1.37
    treynorRatio: yahooFinanceTypes_js_1.YahooNumber, // 23.61
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStatsRow",
});
const FundPerformanceRiskOverviewStatsCatSchema = typebox_1.Type.Object({
    riskStatisticsCat: typebox_1.Type.Array(FundPerformanceRiskOverviewStatsRowSchema),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStatsCat",
});
const FundPerformanceRiskOverviewStatsSchema = typebox_1.Type.Object({
    riskStatistics: typebox_1.Type.Array(FundPerformanceRiskOverviewStatsRowSchema),
    riskRating: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundPerformanceRiskOverviewStats",
});
const FundPerformanceReturnsRowSchema = typebox_1.Type.Object({
    year: yahooFinanceTypes_js_1.YahooFinanceDate,
    annualValue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    q1: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    q2: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    q3: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    q4: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundPerformanceReturnsRow",
});
const FundPerformanceReturnsSchema = typebox_1.Type.Object({
    returns: typebox_1.Type.Array(FundPerformanceReturnsRowSchema),
    returnsCat: typebox_1.Type.Optional(typebox_1.Type.Array(FundPerformanceReturnsRowSchema)),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundPerformanceReturns",
});
const FundPerformancePerformanceOverviewCatSchema = typebox_1.Type.Object({
    ytdReturnPct: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiveYrAvgReturnPct: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundPerformancePerformanceOverviewCat",
});
const FundPerformancePerformanceOverviewSchema = typebox_1.Type.Object({
    asOfDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    ytdReturnPct: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    oneYearTotalReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    threeYearTotalReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiveYrAvgReturnPct: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    morningStarReturnRating: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    numYearsUp: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    numYearsDown: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    bestOneYrTotalReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    worstOneYrTotalReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    bestThreeYrTotalReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    worstThreeYrTotalReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundPerformancePerformanceOverview",
});
const PeriodRangeSchema = typebox_1.Type.Object({
    asOfDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    ytd: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    oneMonth: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    threeMonth: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    oneYear: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    threeYear: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiveYear: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    tenYear: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryPeriodRange",
});
const FundPerformanceTrailingReturnsSchema = typebox_1.Type.Composite([
    PeriodRangeSchema,
    typebox_1.Type.Object({
        lastBullMkt: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        lastBearMkt: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    }, {
        additionalProperties: typebox_1.Type.Any(),
    }),
], {
    title: "QuoteSummaryFundPerformanceTrailingReturns",
});
const FundPerformanceSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    loadAdjustedReturns: typebox_1.Type.Optional(PeriodRangeSchema),
    rankInCategory: typebox_1.Type.Optional(PeriodRangeSchema),
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
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFundPerformance",
});
const OwnershipListSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    reportDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    organization: typebox_1.Type.String(),
    pctHeld: yahooFinanceTypes_js_1.YahooNumber,
    position: yahooFinanceTypes_js_1.YahooNumber,
    value: yahooFinanceTypes_js_1.YahooNumber,
    pctChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryOwnershipList",
});
const OwnershipSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    ownershipList: typebox_1.Type.Array(OwnershipListSchema),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryOwnership",
});
const FinancialDataSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    currentPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    targetHighPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    targetLowPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    targetMeanPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    targetMedianPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    recommendationMean: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    recommendationKey: typebox_1.Type.String(),
    numberOfAnalystOpinions: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalCash: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalCashPerShare: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    ebitda: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalDebt: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    quickRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    currentRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalRevenue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    debtToEquity: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    revenuePerShare: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    returnOnAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    returnOnEquity: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    grossProfits: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    freeCashflow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    operatingCashflow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    earningsGrowth: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    revenueGrowth: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    grossMargins: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    ebitdaMargins: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    operatingMargins: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    profitMargins: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    financialCurrency: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFinancialData",
});
const RevenueEstimateSchema = typebox_1.Type.Object({
    avg: yahooFinanceTypes_js_1.NullableYahooNumber,
    low: yahooFinanceTypes_js_1.NullableYahooNumber,
    high: yahooFinanceTypes_js_1.NullableYahooNumber,
    numberOfAnalysts: yahooFinanceTypes_js_1.NullableYahooNumber,
    yearAgoRevenue: yahooFinanceTypes_js_1.NullableYahooNumber,
    growth: yahooFinanceTypes_js_1.NullableYahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryRevenueEstimate",
});
const EpsTrendSchema = typebox_1.Type.Object({
    current: yahooFinanceTypes_js_1.NullableYahooNumber,
    "7daysAgo": yahooFinanceTypes_js_1.NullableYahooNumber,
    "30daysAgo": yahooFinanceTypes_js_1.NullableYahooNumber,
    "60daysAgo": yahooFinanceTypes_js_1.NullableYahooNumber,
    "90daysAgo": yahooFinanceTypes_js_1.NullableYahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEpsTrend",
});
const EpsRevisionsSchema = typebox_1.Type.Object({
    upLast7days: yahooFinanceTypes_js_1.NullableYahooNumber,
    upLast30days: yahooFinanceTypes_js_1.NullableYahooNumber,
    downLast30days: yahooFinanceTypes_js_1.NullableYahooNumber,
    downLast90days: yahooFinanceTypes_js_1.NullableYahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEpsRevisions",
});
const EarningsEstimateSchema = typebox_1.Type.Object({
    avg: yahooFinanceTypes_js_1.NullableYahooNumber,
    low: yahooFinanceTypes_js_1.NullableYahooNumber,
    high: yahooFinanceTypes_js_1.NullableYahooNumber,
    yearAgoEps: yahooFinanceTypes_js_1.NullableYahooNumber,
    numberOfAnalysts: yahooFinanceTypes_js_1.NullableYahooNumber,
    growth: yahooFinanceTypes_js_1.NullableYahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEarningsEstimate",
});
const EarningsTrendTrendSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    period: typebox_1.Type.String(),
    endDate: yahooFinanceTypes_js_1.NullableYahooFinanceDate,
    growth: yahooFinanceTypes_js_1.NullableYahooNumber,
    earningsEstimate: EarningsEstimateSchema,
    revenueEstimate: RevenueEstimateSchema,
    epsTrend: EpsTrendSchema,
    epsRevisions: EpsRevisionsSchema,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEarningsTrendTrend",
});
const EarningsTrendSchema = typebox_1.Type.Object({
    trend: typebox_1.Type.Array(EarningsTrendTrendSchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEarningsTrend",
});
const EarningsHistoryHistorySchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    epsActual: yahooFinanceTypes_js_1.NullableYahooNumber,
    epsEstimate: yahooFinanceTypes_js_1.NullableYahooNumber,
    epsDifference: yahooFinanceTypes_js_1.NullableYahooNumber,
    surprisePercent: yahooFinanceTypes_js_1.NullableYahooNumber,
    quarter: yahooFinanceTypes_js_1.NullableYahooFinanceDate,
    period: typebox_1.Type.String(),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEarningsHistoryHistory",
});
const EarningsHistorySchema = typebox_1.Type.Object({
    history: typebox_1.Type.Array(EarningsHistoryHistorySchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEarningsHistory",
});
const YearlySchema = typebox_1.Type.Object({
    date: yahooFinanceTypes_js_1.YahooNumber,
    revenue: yahooFinanceTypes_js_1.YahooNumber,
    earnings: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryYearly",
});
const FinancialsChartQuarterlySchema = typebox_1.Type.Object({
    date: typebox_1.Type.String(),
    revenue: yahooFinanceTypes_js_1.YahooNumber,
    earnings: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFinancialsChartQuarterly",
});
const FinancialsChartSchema = typebox_1.Type.Object({
    yearly: typebox_1.Type.Array(YearlySchema),
    quarterly: typebox_1.Type.Array(FinancialsChartQuarterlySchema),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryFinancialsChart",
});
const EarningsChartQuarterlySchema = typebox_1.Type.Object({
    date: typebox_1.Type.String(),
    actual: yahooFinanceTypes_js_1.YahooNumber,
    estimate: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEarningsChartQuarterly",
});
const EarningsChartSchema = typebox_1.Type.Object({
    quarterly: typebox_1.Type.Array(EarningsChartQuarterlySchema),
    currentQuarterEstimate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    currentQuarterEstimateDate: typebox_1.Type.Optional(typebox_1.Type.String()),
    currentQuarterEstimateYear: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    earningsDate: typebox_1.Type.Array(yahooFinanceTypes_js_1.YahooFinanceDate),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEarningsChart",
});
const QuoteSummaryEarningsSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    earningsChart: EarningsChartSchema,
    financialsChart: FinancialsChartSchema,
    financialCurrency: typebox_1.Type.Optional(typebox_1.Type.String()),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryEarnings",
});
const DefaultKeyStatisticsSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    priceHint: yahooFinanceTypes_js_1.YahooNumber,
    enterpriseValue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    forwardPE: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    profitMargins: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    floatShares: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    sharesOutstanding: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    sharesShort: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    sharesShortPriorMonth: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    sharesShortPreviousMonthDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    dateShortInterest: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    sharesPercentSharesOut: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    heldPercentInsiders: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    heldPercentInstitutions: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    shortRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    shortPercentOfFloat: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    beta: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    impliedSharesOutstanding: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    category: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    bookValue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    priceToBook: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fundFamily: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    legalType: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    lastFiscalYearEnd: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    nextFiscalYearEnd: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    mostRecentQuarter: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    earningsQuarterlyGrowth: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    netIncomeToCommon: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    trailingEps: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    forwardEps: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    pegRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    lastSplitFactor: typebox_1.Type.Union([typebox_1.Type.Null(), typebox_1.Type.String()]),
    lastSplitDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    enterpriseToRevenue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    enterpriseToEbitda: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    "52WeekChange": typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    SandP52WeekChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    lastDividendValue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    lastDividendDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    ytdReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    beta3Year: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    yield: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fundInceptionDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    threeYearAverageReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiveYearAverageReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    morningStarOverallRating: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    morningStarRiskRating: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    annualReportExpenseRatio: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    lastCapGain: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    annualHoldingsTurnover: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryDefaultKeyStatistics",
});
const CashflowStatementSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    endDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    netIncome: yahooFinanceTypes_js_1.YahooNumber,
    depreciation: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    changeToNetincome: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    changeToAccountReceivables: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    changeToLiabilities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    changeToInventory: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    changeToOperatingActivities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalCashFromOperatingActivities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    capitalExpenditures: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    investments: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    otherCashflowsFromInvestingActivities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalCashflowsFromInvestingActivities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    dividendsPaid: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    netBorrowings: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    otherCashflowsFromFinancingActivities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalCashFromFinancingActivities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    changeInCash: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    repurchaseOfStock: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    issuanceOfStock: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    effectOfExchangeRate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryCashflowStatement",
});
const CashflowStatementHistorySchema = typebox_1.Type.Object({
    cashflowStatements: typebox_1.Type.Array(CashflowStatementSchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryCashflowStatementHistory",
});
const CalendarEventsEarningsSchema = typebox_1.Type.Object({
    earningsDate: typebox_1.Type.Array(yahooFinanceTypes_js_1.YahooFinanceDate),
    earningsAverage: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    earningsLow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    earningsHigh: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    revenueAverage: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    revenueLow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    revenueHigh: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSumamryCalendarEventsEarnings",
});
const CalendarEventsSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    earnings: CalendarEventsEarningsSchema,
    exDividendDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    dividendDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryCalendarEvents",
});
const BalanceSheetStatementSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    endDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    cash: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    shortTermInvestments: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    netReceivables: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    inventory: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    otherCurrentAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalCurrentAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    longTermInvestments: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    propertyPlantEquipment: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    otherAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    accountsPayable: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    shortLongTermDebt: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    otherCurrentLiab: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    longTermDebt: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    otherLiab: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalCurrentLiabilities: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalLiab: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    commonStock: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    retainedEarnings: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    treasuryStock: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    otherStockholderEquity: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalStockholderEquity: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    netTangibleAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    goodWill: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    intangibleAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    deferredLongTermAssetCharges: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    deferredLongTermLiab: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    minorityInterest: typebox_1.Type.Optional(yahooFinanceTypes_js_1.NullableYahooNumber),
    capitalSurplus: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryBalanceSheetStatement",
});
const BalanceSheetHistorySchema = typebox_1.Type.Object({
    balanceSheetStatements: typebox_1.Type.Array(BalanceSheetStatementSchema),
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryBalanceSheetHistory",
});
const CompanyOfficerSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    name: typebox_1.Type.String(),
    age: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    title: typebox_1.Type.String(),
    yearBorn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    fiscalYear: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    totalPay: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    exercisedValue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    unexercisedValue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryCompanyOfficer",
});
const AssetProfileSchema = typebox_1.Type.Object({
    maxAge: yahooFinanceTypes_js_1.YahooNumber,
    address1: typebox_1.Type.Optional(typebox_1.Type.String()),
    address2: typebox_1.Type.Optional(typebox_1.Type.String()),
    address3: typebox_1.Type.Optional(typebox_1.Type.String()),
    city: typebox_1.Type.Optional(typebox_1.Type.String()),
    state: typebox_1.Type.Optional(typebox_1.Type.String()),
    zip: typebox_1.Type.Optional(typebox_1.Type.String()),
    country: typebox_1.Type.Optional(typebox_1.Type.String()),
    phone: typebox_1.Type.Optional(typebox_1.Type.String()),
    fax: typebox_1.Type.Optional(typebox_1.Type.String()),
    website: typebox_1.Type.Optional(typebox_1.Type.String()),
    industry: typebox_1.Type.Optional(typebox_1.Type.String()),
    industryDisp: typebox_1.Type.Optional(typebox_1.Type.String()),
    industryKey: typebox_1.Type.Optional(typebox_1.Type.String()),
    industrySymbol: typebox_1.Type.Optional(typebox_1.Type.String()),
    sector: typebox_1.Type.Optional(typebox_1.Type.String()),
    sectorDisp: typebox_1.Type.Optional(typebox_1.Type.String()),
    sectorKey: typebox_1.Type.Optional(typebox_1.Type.String()),
    longBusinessSummary: typebox_1.Type.Optional(typebox_1.Type.String()),
    fullTimeEmployees: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    companyOfficers: typebox_1.Type.Array(CompanyOfficerSchema),
    auditRisk: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    boardRisk: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    compensationRisk: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    shareHolderRightsRisk: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    overallRisk: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    governanceEpochDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    compensationAsOfEpochDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    name: typebox_1.Type.Optional(typebox_1.Type.String()), // 'Bitcoin';
    startDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // new Date('2013-04-28')
    description: typebox_1.Type.Optional(typebox_1.Type.String()), // 'Bitcoin (BTC) is a cryptocurrency...'
    twitter: typebox_1.Type.Optional(typebox_1.Type.String()), // in e.g. "ADA-USD" (#418)
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryAssetProfile",
});
exports.QuoteSummaryResultSchema = typebox_1.Type.Object({
    assetProfile: typebox_1.Type.Optional(AssetProfileSchema),
    balanceSheetHistory: typebox_1.Type.Optional(BalanceSheetHistorySchema),
    balanceSheetHistoryQuarterly: typebox_1.Type.Optional(BalanceSheetHistorySchema),
    calendarEvents: typebox_1.Type.Optional(CalendarEventsSchema),
    cashflowStatementHistory: typebox_1.Type.Optional(CashflowStatementHistorySchema),
    cashflowStatementHistoryQuarterly: typebox_1.Type.Optional(CashflowStatementHistorySchema),
    defaultKeyStatistics: typebox_1.Type.Optional(DefaultKeyStatisticsSchema),
    earnings: typebox_1.Type.Optional(QuoteSummaryEarningsSchema),
    earningsHistory: typebox_1.Type.Optional(EarningsHistorySchema),
    earningsTrend: typebox_1.Type.Optional(EarningsTrendSchema),
    financialData: typebox_1.Type.Optional(FinancialDataSchema),
    fundOwnership: typebox_1.Type.Optional(OwnershipSchema),
    fundPerformance: typebox_1.Type.Optional(FundPerformanceSchema),
    fundProfile: typebox_1.Type.Optional(FundProfileSchema),
    incomeStatementHistory: typebox_1.Type.Optional(IncomeStatementHistorySchema),
    incomeStatementHistoryQuarterly: typebox_1.Type.Optional(IncomeStatementHistorySchema),
    indexTrend: typebox_1.Type.Optional(IndexTrendSchema),
    industryTrend: typebox_1.Type.Optional(TrendSchema),
    // insiderHolders: Type.Optional(InsiderTransactionsSchema), // <--
    institutionOwnership: typebox_1.Type.Optional(OwnershipSchema),
    majorDirectHolders: typebox_1.Type.Optional(HoldersSchema),
    majorHoldersBreakdown: typebox_1.Type.Optional(MajorHoldersBreakdownSchema),
    netSharePurchaseActivity: typebox_1.Type.Optional(NetSharePurchaseActivitySchema),
    price: typebox_1.Type.Optional(PriceSchema),
    quoteType: typebox_1.Type.Optional(QuoteTypeSchema),
    recommendationTrend: typebox_1.Type.Optional(RecommendationTrendSchema),
    secFilings: typebox_1.Type.Optional(SECFilingsSchema),
    sectorTrend: typebox_1.Type.Optional(TrendSchema),
    summaryDetail: typebox_1.Type.Optional(SummaryDetailSchema),
    summaryProfile: typebox_1.Type.Optional(SummaryProfileSchema),
    topHoldings: typebox_1.Type.Optional(TopHoldingsSchema),
    upgradeDowngradeHistory: typebox_1.Type.Optional(UpgradeDowngradeHistorySchema),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "QuoteSummaryResult",
});
