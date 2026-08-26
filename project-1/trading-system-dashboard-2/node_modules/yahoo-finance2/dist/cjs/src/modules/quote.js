"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteOptionsSchema = exports.QuoteBase = void 0;
exports.default = quote;
const typebox_1 = require("@sinclair/typebox");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
exports.QuoteBase = typebox_1.Type.Object({
    language: typebox_1.Type.String(), // "en-US",
    region: typebox_1.Type.String(), // "US",
    quoteType: typebox_1.Type.String(), // "EQUITY" | "ETF" | "MUTUALFUND";
    typeDisp: typebox_1.Type.Optional(typebox_1.Type.String()), // "Equity", not always present.
    quoteSourceName: typebox_1.Type.Optional(typebox_1.Type.String()), // "Delayed Quote",
    triggerable: typebox_1.Type.Boolean(), // true,
    currency: typebox_1.Type.Optional(typebox_1.Type.String()), // "USD",
    // Seems to appear / disappear based not on symbol but network load (#445)
    customPriceAlertConfidence: typebox_1.Type.Optional(typebox_1.Type.String()), // "HIGH" | "LOW"; TODO: anything else?
    marketState: typebox_1.Type.Union([
        typebox_1.Type.Literal("REGULAR"),
        typebox_1.Type.Literal("CLOSED"),
        typebox_1.Type.Literal("PRE"),
        typebox_1.Type.Literal("PREPRE"),
        typebox_1.Type.Literal("POST"),
        typebox_1.Type.Literal("POSTPOST"),
    ]),
    tradeable: typebox_1.Type.Boolean(), // false,
    cryptoTradeable: typebox_1.Type.Optional(typebox_1.Type.Boolean()), // false
    exchange: typebox_1.Type.String(), // "NMS",
    shortName: typebox_1.Type.Optional(typebox_1.Type.String()), // "NVIDIA Corporation",
    longName: typebox_1.Type.Optional(typebox_1.Type.String()), // "NVIDIA Corporation",
    messageBoardId: typebox_1.Type.Optional(typebox_1.Type.String()), // "finmb_32307",
    exchangeTimezoneName: typebox_1.Type.String(), // "America/New_York",
    exchangeTimezoneShortName: typebox_1.Type.String(), // "EST",
    gmtOffSetMilliseconds: yahooFinanceTypes_js_1.YahooNumber, // -18000000,
    market: typebox_1.Type.String(), // "us_market",
    esgPopulated: typebox_1.Type.Boolean(), // false,
    fiftyTwoWeekLowChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 362.96002,
    fiftyTwoWeekLowChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 2.0088556,
    fiftyTwoWeekRange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooTwoNumberRange), // "180.68 - 589.07" -> { low, high }
    fiftyTwoWeekHighChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // -45.429993,
    fiftyTwoWeekHighChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // -0.07712155,
    fiftyTwoWeekLow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 180.68,
    fiftyTwoWeekHigh: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 589.07,
    fiftyTwoWeekChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 22.604025
    dividendDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // 1609200000,
    // maybe always present on EQUITY?
    earningsTimestamp: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // 1614200400,
    earningsTimestampStart: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // 1614200400,
    earningsTimestampEnd: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // 1614200400,
    trailingAnnualDividendRate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 0.64,
    trailingPE: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 88.873634,
    trailingAnnualDividendYield: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 0.0011709387,
    epsTrailingTwelveMonths: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 6.117,
    epsForward: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 11.68,
    epsCurrentYear: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 9.72,
    priceEpsCurrentYear: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 55.930042,
    sharesOutstanding: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 619000000,
    bookValue: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 24.772,
    fiftyDayAverage: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 530.8828,
    fiftyDayAverageChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 12.757202,
    fiftyDayAverageChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 0.024030166,
    twoHundredDayAverage: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 515.8518,
    twoHundredDayAverageChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 27.788208,
    twoHundredDayAverageChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 0.053868588,
    marketCap: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 336513171456,
    forwardPE: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 46.54452,
    priceToBook: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 21.945745,
    sourceInterval: yahooFinanceTypes_js_1.YahooNumber, // 15,
    exchangeDataDelayedBy: yahooFinanceTypes_js_1.YahooNumber, // 0,
    firstTradeDateMilliseconds: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooDateInMs), // 917015400000 -> Date
    priceHint: yahooFinanceTypes_js_1.YahooNumber, // 2,
    postMarketChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 0.093813874,
    postMarketTime: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // 1612573179 -> new Date()
    postMarketPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 544.15,
    postMarketChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 0.51000977,
    regularMarketChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // -2.9299927,
    regularMarketChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // -0.53606904,
    regularMarketTime: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // 1612558802 -> new Date()
    regularMarketPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 543.64,
    regularMarketDayHigh: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 549.19,
    regularMarketDayRange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooTwoNumberRange), // "541.867 - 549.19" -> { low, high }
    regularMarketDayLow: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 541.867,
    regularMarketVolume: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 4228841,
    regularMarketPreviousClose: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 546.57,
    preMarketChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // -2.9299927,
    preMarketChangePercent: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // -0.53606904,
    preMarketTime: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // 1612558802 -> new Date()
    preMarketPrice: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 543.64,
    bid: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 543.84,
    ask: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 544.15,
    bidSize: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 18,
    askSize: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 8,
    fullExchangeName: typebox_1.Type.String(), // "NasdaqGS",
    financialCurrency: typebox_1.Type.Optional(typebox_1.Type.String()), // "USD",
    regularMarketOpen: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 549.0,
    averageDailyVolume3Month: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 7475022,
    averageDailyVolume10Day: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 5546385,
    displayName: typebox_1.Type.Optional(typebox_1.Type.String()), // "NVIDIA",
    symbol: typebox_1.Type.String(), // "NVDA"
    underlyingSymbol: typebox_1.Type.Optional(typebox_1.Type.String()), // "LD.MI" (for LDO.MI, #363)
    // only on ETF?  not on EQUITY?
    ytdReturn: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 0.31
    trailingThreeMonthReturns: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 16.98
    trailingThreeMonthNavReturns: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 17.08
    ipoExpectedDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // "2020-08-13",
    newListingDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // "2021-02-16",
    nameChangeDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
    prevName: typebox_1.Type.Optional(typebox_1.Type.String()),
    averageAnalystRating: typebox_1.Type.Optional(typebox_1.Type.String()),
    pageViewGrowthWeekly: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // Since 2021-11-11 (#326)
    openInterest: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // SOHO (#248)
    beta: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    additionalProperties: typebox_1.Type.Any(),
});
/*
 * [TODO] Fields seen in a query but not in this module yet:
 *
 *   - extendedMarketChange
 *   - extendedMarketChangePercent
 *   - extendedMarketPrice
 *   - extendedMarketTime
 *   - dayHigh (separate to regularMarketDayHigh, etc)
 *   - dayLow (separate to regularMarketDayLow, etc)
 *   - volume (separaet to regularMarketVolume, etc)
 *
 * i.e. on yahoo site, with ?fields=dayHigh,dayLow,etc.
 */
/*
 * Guaranteed fields, even we don't ask for them
 */
const QuoteCryptoCurrency = typebox_1.Type.Composite([
    exports.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("CRYPTOCURRENCY"),
        circulatingSupply: yahooFinanceTypes_js_1.YahooNumber,
        fromCurrency: typebox_1.Type.String(), // 'BTC'
        toCurrency: typebox_1.Type.String(), // 'USD=X'
        lastMarket: typebox_1.Type.String(), // 'CoinMarketCap'
        coinImageUrl: typebox_1.Type.Optional(typebox_1.Type.String()), // 'https://s.yimg.com/uc/fin/img/reports-thumbnails/1.png'
        volume24Hr: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 62631043072
        volumeAllCurrencies: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 62631043072
        startDate: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate), // new Date(1367103600 * 1000)
    }),
]);
const QuoteCurrency = typebox_1.Type.Composite([
    exports.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("CURRENCY"),
    }),
]);
const QuoteEtf = typebox_1.Type.Composite([
    exports.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("ETF"),
    }),
]);
const QuoteEquity = typebox_1.Type.Composite([
    exports.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("EQUITY"),
        dividendRate: typebox_1.Type.Optional(typebox_1.Type.Number()),
        dividendYield: typebox_1.Type.Optional(typebox_1.Type.Number()),
    }),
]);
const QuoteFuture = typebox_1.Type.Composite([
    exports.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("FUTURE"),
        headSymbolAsString: typebox_1.Type.String(),
        contractSymbol: typebox_1.Type.Boolean(),
        underlyingExchangeSymbol: typebox_1.Type.String(),
        expireDate: yahooFinanceTypes_js_1.YahooFinanceDate,
        expireIsoDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    }),
]);
const QuoteIndex = typebox_1.Type.Composite([
    exports.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("INDEX"),
    }),
]);
const QuoteOption = typebox_1.Type.Composite([
    exports.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("OPTION"),
        strike: yahooFinanceTypes_js_1.YahooNumber,
        openInterest: yahooFinanceTypes_js_1.YahooNumber,
        expireDate: yahooFinanceTypes_js_1.YahooNumber,
        expireIsoDate: yahooFinanceTypes_js_1.YahooNumber,
        underlyingSymbol: typebox_1.Type.String(),
    }),
]);
const QuoteMutualfund = typebox_1.Type.Composite([
    exports.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("MUTUALFUND"),
    }),
]);
const QuoteSchema = typebox_1.Type.Union([
    QuoteCryptoCurrency,
    QuoteCurrency,
    QuoteEtf,
    QuoteEquity,
    QuoteFuture,
    QuoteIndex,
    QuoteMutualfund,
    QuoteOption,
]);
const QuoteFieldSchema = typebox_1.Type.KeyOf(QuoteSchema);
const ResultType = typebox_1.Type.Union([
    typebox_1.Type.Literal("array"),
    typebox_1.Type.Literal("object"),
    typebox_1.Type.Literal("map"),
]);
const QuoteResponseArraySchema = typebox_1.Type.Array(QuoteSchema);
exports.QuoteOptionsSchema = typebox_1.Type.Object({
    fields: typebox_1.Type.Optional(typebox_1.Type.Array(QuoteFieldSchema)),
    return: typebox_1.Type.Optional(ResultType),
});
const QuoteOptionsWithReturnArraySchema = typebox_1.Type.Composite([
    exports.QuoteOptionsSchema,
    typebox_1.Type.Object({
        return: typebox_1.Type.Optional(typebox_1.Type.Literal("array")),
    }),
]);
const QuoteOptionsWithReturnMapSchema = typebox_1.Type.Composite([
    exports.QuoteOptionsSchema,
    typebox_1.Type.Object({
        return: typebox_1.Type.Literal("map"),
    }),
]);
const QuoteOptionsWithReturnObjectSchema = typebox_1.Type.Composite([
    exports.QuoteOptionsSchema,
    typebox_1.Type.Object({
        return: typebox_1.Type.Literal("object"),
    }),
]);
const queryOptionsDefaults = {};
function quote(query, queryOptionsOverrides, moduleOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const symbols = typeof query === "string" ? query : query.join(",");
        const returnAs = queryOptionsOverrides && queryOptionsOverrides.return;
        const results = yield this._moduleExec({
            moduleName: "quote",
            query: {
                url: "https://${YF_QUERY_HOST}/v7/finance/quote",
                needsCrumb: true,
                schema: exports.QuoteOptionsSchema,
                defaults: queryOptionsDefaults,
                runtime: { symbols },
                overrides: queryOptionsOverrides,
                transformWith(queryOptions) {
                    // Options validation ensures this is a string[]
                    if (queryOptions.fields)
                        queryOptions.fields.join(",");
                    // Don't pass this on to Yahoo
                    delete queryOptions.return;
                    return queryOptions;
                },
            },
            result: {
                schema: QuoteResponseArraySchema,
                transformWith(rawResult) {
                    var _a;
                    // console.log({ rawResult: JSON.stringify(rawResult, null, 2) });
                    let results = (_a = rawResult === null || rawResult === void 0 ? void 0 : rawResult.quoteResponse) === null || _a === void 0 ? void 0 : _a.result;
                    if (!results || !Array.isArray(results))
                        throw new Error("Unexpected result: " + JSON.stringify(rawResult));
                    // Filter out quoteType==='NONE'
                    // So that delisted stocks will be undefined just like symbol-not-found
                    results = results.filter((quote) => (quote === null || quote === void 0 ? void 0 : quote.quoteType) !== "NONE");
                    return results;
                },
            },
            moduleOptions,
        });
        if (returnAs) {
            switch (returnAs) {
                case "array":
                    return results;
                case "object": {
                    const object = {};
                    for (const result of results)
                        object[result.symbol] = result;
                    return object; // TODO: type
                }
                case "map": {
                    const map = new Map();
                    for (const result of results)
                        map.set(result.symbol, result);
                    return map; // TODO: type
                }
            }
        }
        else {
            // By default, match the query input shape (string or string[]).
            return typeof query === "string"
                ? results[0]
                : results;
        }
    });
}
