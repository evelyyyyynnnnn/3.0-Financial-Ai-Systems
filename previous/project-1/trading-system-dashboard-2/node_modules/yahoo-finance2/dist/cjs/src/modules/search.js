"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
const typebox_1 = require("@sinclair/typebox");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
const SearchQuoteYahoo = typebox_1.Type.Object({
    symbol: typebox_1.Type.String(), // "BABA"
    isYahooFinance: typebox_1.Type.Literal(true), // true
    exchange: typebox_1.Type.String(), // "NYQ"
    exchDisp: typebox_1.Type.Optional(typebox_1.Type.String()), // "London", e.g. with BJ0CDD2
    shortname: typebox_1.Type.Optional(typebox_1.Type.String()), // "Alibaba Group Holding Limited"
    longname: typebox_1.Type.Optional(typebox_1.Type.String()), // "Alibaba Group Holding Limited"
    index: typebox_1.Type.Literal("quotes"), // "quotes"
    score: yahooFinanceTypes_js_1.YahooNumber, // 1111958.0
    newListingDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // "2021-02-16"
    prevName: typebox_1.Type.Optional(typebox_1.Type.String()),
    nameChangeDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    sector: typebox_1.Type.Optional(typebox_1.Type.String()), // "Industrials"
    industry: typebox_1.Type.Optional(typebox_1.Type.String()), // "Building Products & Equipment"
    dispSecIndFlag: typebox_1.Type.Optional(typebox_1.Type.Boolean()), // true
}, {
    additionalProperties: typebox_1.Type.Any(),
});
const SearchQuoteYahooEquity = typebox_1.Type.Composite([
    SearchQuoteYahoo,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("EQUITY"),
        typeDisp: typebox_1.Type.Literal("Equity"),
    }),
], {
    title: "SearchQuoteYahooEntity",
});
const SearchQuoteYahooOption = typebox_1.Type.Composite([
    SearchQuoteYahoo,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("OPTION"),
        typeDisp: typebox_1.Type.Literal("Option"),
    }),
], {
    title: "SearchQuoteYahooOption",
});
const SearchQuoteYahooETF = typebox_1.Type.Composite([
    SearchQuoteYahoo,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("ETF"),
        typeDisp: typebox_1.Type.Literal("ETF"),
    }),
], {
    title: "SearchQuoteYahooETF",
});
const SearchQuoteYahooFund = typebox_1.Type.Composite([
    SearchQuoteYahoo,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("MUTUALFUND"),
        typeDisp: typebox_1.Type.Literal("Fund"),
    }),
], {
    title: "SearchQuoteYahooFund",
});
const SearchQuoteYahooIndex = typebox_1.Type.Composite([
    SearchQuoteYahoo,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("INDEX"),
        typeDisp: typebox_1.Type.Literal("Index"),
    }),
], {
    title: "SearchQuoteYahooIndex",
});
const SearchQuoteYahooCurrency = typebox_1.Type.Composite([
    SearchQuoteYahoo,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("CURRENCY"),
        typeDisp: typebox_1.Type.Literal("Currency"),
    }),
], {
    title: "SearchQuoteYahooCurrency",
});
const SearchQuoteYahooCryptocurrency = typebox_1.Type.Composite([
    SearchQuoteYahoo,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("CRYPTOCURRENCY"),
        typeDisp: typebox_1.Type.Literal("Cryptocurrency"),
    }),
]);
const SearchQuoteYahooFuture = typebox_1.Type.Composite([
    SearchQuoteYahoo,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("FUTURE"),
        typeDisp: typebox_1.Type.Union([typebox_1.Type.Literal("Future"), typebox_1.Type.Literal("Futures")]),
    }),
], {
    title: "SearchQuoteYahooFuture",
});
const SearchQuoteNonYahoo = typebox_1.Type.Object({
    index: typebox_1.Type.String(), // '78ddc07626ff4bbcae663e88514c23a0'
    name: typebox_1.Type.String(), // 'AAPlasma'
    permalink: typebox_1.Type.String(), // 'aaplasma'
    isYahooFinance: typebox_1.Type.Literal(false), // false
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "SearchQuoteNonYahoo",
});
const SearchNewsThumbnailResolution = typebox_1.Type.Object({
    url: typebox_1.Type.String(),
    width: yahooFinanceTypes_js_1.YahooNumber,
    height: yahooFinanceTypes_js_1.YahooNumber,
    tag: typebox_1.Type.String(),
}, {
    title: "SearchNewsThumbnailResolution",
});
const SearchNews = typebox_1.Type.Object({
    uuid: typebox_1.Type.String(), // "9aff624a-e84c-35f3-9c23-db39852006dc"
    title: typebox_1.Type.String(), // "Analyst Report: Alibaba Group Holding Limited"
    publisher: typebox_1.Type.String(), // "Morningstar Research"
    link: typebox_1.Type.String(), // "https://finance.yahoo.com/m/9aff624a-e84c-35f3-9c23-db39852006dc/analyst-report%3A-alibaba-group.html"
    providerPublishTime: yahooFinanceTypes_js_1.YahooFinanceDate, // coerced to New Date(1611285342 * 1000)
    type: typebox_1.Type.String(), // "STORY"   TODO "STORY" | ???
    thumbnail: typebox_1.Type.Optional(typebox_1.Type.Object({
        resolutions: typebox_1.Type.Array(SearchNewsThumbnailResolution),
    })),
    relatedTickers: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())), // [ "AAPL" ]
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "SearchNews",
});
const SearchResultSchema = typebox_1.Type.Object({
    explains: typebox_1.Type.Array(typebox_1.Type.Any()),
    count: yahooFinanceTypes_js_1.YahooNumber,
    quotes: typebox_1.Type.Array(typebox_1.Type.Union([
        SearchQuoteYahooEquity,
        SearchQuoteYahooOption,
        SearchQuoteYahooETF,
        SearchQuoteYahooFund,
        SearchQuoteYahooIndex,
        SearchQuoteYahooCurrency,
        SearchQuoteYahooCryptocurrency,
        SearchQuoteNonYahoo,
        SearchQuoteYahooFuture,
    ])),
    news: typebox_1.Type.Array(SearchNews),
    nav: typebox_1.Type.Array(typebox_1.Type.Any()),
    lists: typebox_1.Type.Array(typebox_1.Type.Any()),
    researchReports: typebox_1.Type.Array(typebox_1.Type.Any()),
    totalTime: yahooFinanceTypes_js_1.YahooNumber,
    // ALWAYS present, but TEMPORARILY marked optional ("?") since its
    // sudden appearance, let's make sure it doesn't get suddenly removed.
    // Array<any> until we can find some examples of what it actually looks
    // like (#255).
    screenerFieldResults: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Any())),
    // ALWAYS present, but TEMPORARILY marked optional ("?") since its
    // sudden appearance, let's make sure it doesn't get suddenly removed.
    // Array<any> until we can find some examples of what it actually looks
    // like (#399).
    culturalAssets: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Any())),
    timeTakenForQuotes: yahooFinanceTypes_js_1.YahooNumber, // 26
    timeTakenForNews: yahooFinanceTypes_js_1.YahooNumber, // 419
    timeTakenForAlgowatchlist: yahooFinanceTypes_js_1.YahooNumber, // 700
    timeTakenForPredefinedScreener: yahooFinanceTypes_js_1.YahooNumber, // 400
    timeTakenForCrunchbase: yahooFinanceTypes_js_1.YahooNumber, // 400
    timeTakenForNav: yahooFinanceTypes_js_1.YahooNumber, // 400
    timeTakenForResearchReports: yahooFinanceTypes_js_1.YahooNumber, // 0
    // ALWAYS present, but TEMPORARILY marked optional ("?") since its
    // sudden appearance, let's make sure it doesn't get suddenly removed.
    timeTakenForScreenerField: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    // ALWAYS present, but TEMPORARILY marked optional ("?") since its
    // sudden appearance, let's make sure it doesn't get suddenly removed.
    timeTakenForCulturalAssets: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "SearchResults",
});
const SearchOptionsSchema = typebox_1.Type.Object({
    lang: typebox_1.Type.Optional(typebox_1.Type.String()),
    region: typebox_1.Type.Optional(typebox_1.Type.String()),
    quotesCount: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    newsCount: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    enableFuzzyQuery: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    quotesQueryId: typebox_1.Type.Optional(typebox_1.Type.String()),
    multiQuoteQueryId: typebox_1.Type.Optional(typebox_1.Type.String()),
    newsQueryId: typebox_1.Type.Optional(typebox_1.Type.String()),
    enableCb: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    enableNavLinks: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    enableEnhancedTrivialQuery: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
}, {
    title: "SearchOptions",
    additionalProperties: false,
});
const queryOptionsDefaults = {
    lang: "en-US",
    region: "US",
    quotesCount: 6,
    newsCount: 4,
    enableFuzzyQuery: false,
    quotesQueryId: "tss_match_phrase_query",
    multiQuoteQueryId: "multi_quote_single_token_query",
    newsQueryId: "news_cie_vespa",
    enableCb: true,
    enableNavLinks: true,
    enableEnhancedTrivialQuery: true,
};
function search(query, queryOptionsOverrides, moduleOptions) {
    return this._moduleExec({
        moduleName: "searchTypebox",
        query: {
            url: "https://${YF_QUERY_HOST}/v1/finance/search",
            schema: SearchOptionsSchema,
            defaults: queryOptionsDefaults,
            runtime: { q: query },
            overrides: queryOptionsOverrides,
            needsCrumb: false,
        },
        result: {
            schema: SearchResultSchema,
        },
        moduleOptions,
    });
}
