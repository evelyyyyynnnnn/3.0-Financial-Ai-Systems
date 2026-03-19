"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = trendingSymbols;
const typebox_1 = require("@sinclair/typebox");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
const InsightsDirection = typebox_1.Type.Union([typebox_1.Type.Literal("Bearish"), typebox_1.Type.Literal("Bullish"), typebox_1.Type.Literal("Neutral")], { title: "InsightsDirection" });
const InsightsOutlookSchema = typebox_1.Type.Object({
    stateDescription: typebox_1.Type.String(),
    direction: InsightsDirection,
    score: yahooFinanceTypes_js_1.YahooNumber,
    scoreDescription: typebox_1.Type.String(),
    sectorDirection: typebox_1.Type.Optional(InsightsDirection),
    sectorScore: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    sectorScoreDescription: typebox_1.Type.Optional(typebox_1.Type.String()),
    indexDirection: InsightsDirection,
    indexScore: yahooFinanceTypes_js_1.YahooNumber,
    indexScoreDescription: typebox_1.Type.String(),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "InsightsOutlook",
});
const InsightsInstrumentInfo = typebox_1.Type.Object({
    keyTechnicals: typebox_1.Type.Object({
        provider: typebox_1.Type.String(),
        support: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        resistance: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        stopLoss: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    }, {
        additionalProperties: typebox_1.Type.Any(),
    }),
    technicalEvents: typebox_1.Type.Object({
        provider: typebox_1.Type.String(),
        sector: typebox_1.Type.Optional(typebox_1.Type.String()),
        shortTermOutlook: InsightsOutlookSchema,
        intermediateTermOutlook: InsightsOutlookSchema,
        longTermOutlook: InsightsOutlookSchema,
    }, {
        additionalProperties: typebox_1.Type.Any(),
    }),
    valuation: typebox_1.Type.Object({
        color: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        description: typebox_1.Type.Optional(typebox_1.Type.String()),
        discount: typebox_1.Type.Optional(typebox_1.Type.String()),
        provider: typebox_1.Type.String(),
        relativeValue: typebox_1.Type.Optional(typebox_1.Type.String()),
    }, {
        additionalProperties: typebox_1.Type.Any(),
    }),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "InsightsInstrumentInfo",
});
const InsightsCompanySnapshot = typebox_1.Type.Object({
    sectorInfo: typebox_1.Type.Optional(typebox_1.Type.String()),
    company: typebox_1.Type.Object({
        innovativeness: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        hiring: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        sustainability: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        insiderSentiments: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        earningsReports: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        dividends: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    }, {
        additionalProperties: typebox_1.Type.Any(),
    }),
    sector: typebox_1.Type.Object({
        innovativeness: yahooFinanceTypes_js_1.YahooNumber,
        hiring: yahooFinanceTypes_js_1.YahooNumber,
        sustainability: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        insiderSentiments: yahooFinanceTypes_js_1.YahooNumber,
        earningsReports: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        dividends: yahooFinanceTypes_js_1.YahooNumber,
    }, {
        additionalProperties: typebox_1.Type.Any(),
    }),
}, { title: "InsightsCompanySnapshot", additionalProperties: typebox_1.Type.Any() });
const InsightsEventSchema = typebox_1.Type.Object({
    eventType: typebox_1.Type.String(),
    pricePeriod: typebox_1.Type.String(),
    tradingHorizon: typebox_1.Type.String(),
    tradeType: typebox_1.Type.String(),
    imageUrl: typebox_1.Type.String(),
    startDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    endDate: yahooFinanceTypes_js_1.YahooFinanceDate,
}, { title: "InsightsEvent", additionalProperties: typebox_1.Type.Any() });
const InsightsReport = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    headHtml: typebox_1.Type.String(),
    provider: typebox_1.Type.String(),
    reportDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    reportTitle: typebox_1.Type.String(),
    reportType: typebox_1.Type.String(),
    targetPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    targetPriceStatus: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("Increased"),
        typebox_1.Type.Literal("Maintained"),
        typebox_1.Type.Literal("Decreased"),
        typebox_1.Type.Literal("-"),
    ])),
    investmentRating: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("Bullish"),
        typebox_1.Type.Literal("Neutral"),
        typebox_1.Type.Literal("Bearish"),
    ])),
    tickers: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
}, { title: "InsightsReport", additionalProperties: typebox_1.Type.Any() });
const InsightsSigDev = typebox_1.Type.Object({
    headline: typebox_1.Type.String(),
    date: yahooFinanceTypes_js_1.YahooFinanceDate,
}, { title: "InsightsSigDev", additionalProperties: typebox_1.Type.Any() });
const InsightsUpsell = typebox_1.Type.Object({
    msBullishSummary: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    msBearishSummary: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    msBullishBearishSummariesPublishDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooDateInMs),
    companyName: typebox_1.Type.Optional(typebox_1.Type.String()),
    upsellReportType: typebox_1.Type.Optional(typebox_1.Type.String()),
}, { title: "InsightsUpsell", additionalProperties: typebox_1.Type.Any() });
const InsightsResearchReport = typebox_1.Type.Object({
    reportId: typebox_1.Type.String(),
    provider: typebox_1.Type.String(),
    title: typebox_1.Type.String(),
    reportDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    summary: typebox_1.Type.String(),
    investmentRating: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("Bullish"),
        typebox_1.Type.Literal("Neutral"),
        typebox_1.Type.Literal("Bearish"),
    ])),
}, { title: "InsightsResearchReport" });
const InsightsSecReport = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    type: typebox_1.Type.String(),
    title: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    filingDate: yahooFinanceTypes_js_1.YahooDateInMs,
    snapshotUrl: typebox_1.Type.String(),
    formType: typebox_1.Type.String(),
}, {
    title: "InsightsSecReport",
    additionalProperties: typebox_1.Type.Any(),
});
const InsightsResultSchema = typebox_1.Type.Object({
    symbol: typebox_1.Type.String(),
    instrumentInfo: typebox_1.Type.Optional(InsightsInstrumentInfo),
    companySnapshot: typebox_1.Type.Optional(InsightsCompanySnapshot),
    recommendation: typebox_1.Type.Optional(typebox_1.Type.Object({
        targetPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
        provider: typebox_1.Type.String(),
        rating: typebox_1.Type.Union([
            typebox_1.Type.Literal("BUY"),
            typebox_1.Type.Literal("SELL"),
            typebox_1.Type.Literal("HOLD"),
        ]),
    })),
    events: typebox_1.Type.Optional(typebox_1.Type.Array(InsightsEventSchema)),
    reports: typebox_1.Type.Optional(typebox_1.Type.Array(InsightsReport)),
    sigDevs: typebox_1.Type.Optional(typebox_1.Type.Array(InsightsSigDev)),
    upsell: typebox_1.Type.Optional(InsightsUpsell),
    upsellSearchDD: typebox_1.Type.Optional(typebox_1.Type.Object({
        researchReports: InsightsResearchReport,
    })),
    secReports: typebox_1.Type.Optional(typebox_1.Type.Array(InsightsSecReport)),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "InsightsResult",
});
const InsightsOptionsSchema = typebox_1.Type.Object({
    lang: typebox_1.Type.Optional(typebox_1.Type.String()),
    region: typebox_1.Type.Optional(typebox_1.Type.String()),
    reportsCount: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, { title: "InsightsOptions" });
const queryOptionsDefaults = {
    lang: "en-US",
    region: "US",
    getAllResearchReports: true,
    reportsCount: 2,
};
function trendingSymbols(symbol, queryOptionsOverrides, moduleOptions) {
    return this._moduleExec({
        moduleName: "insights",
        query: {
            assertSymbol: symbol,
            url: "https://${YF_QUERY_HOST}/ws/insights/v2/finance/insights",
            schema: InsightsOptionsSchema,
            defaults: queryOptionsDefaults,
            overrides: queryOptionsOverrides,
            runtime: { symbol },
        },
        result: {
            schema: InsightsResultSchema,
            transformWith(result) {
                if (!result.finance)
                    throw new Error("Unexpected result: " + JSON.stringify(result));
                return result.finance.result;
            },
        },
        moduleOptions,
    });
}
