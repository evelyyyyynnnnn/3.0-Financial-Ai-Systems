"use strict";
// Co-authored by @gadicc, @PythonCreator27 and @huned.
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
exports._chart = exports.ChartOptionsSchema = void 0;
exports.default = chart;
const typebox_1 = require("@sinclair/typebox");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
const ChartMetaTradingPeriod = typebox_1.Type.Object({
    timezone: typebox_1.Type.String(), // "EST",
    start: yahooFinanceTypes_js_1.YahooFinanceDate, // new Date(1637355600 * 1000),
    end: yahooFinanceTypes_js_1.YahooFinanceDate, // new Date(1637370000 * 10000),
    gmtoffset: yahooFinanceTypes_js_1.YahooNumber, // -18000
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartMetaTradingPeriod",
});
const ChartMetaTradingPeriods = typebox_1.Type.Object({
    pre: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Array(ChartMetaTradingPeriod))),
    post: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Array(ChartMetaTradingPeriod))),
    regular: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Array(ChartMetaTradingPeriod))),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartMetaTradingPeriods",
});
const ChartResultArrayQuote = typebox_1.Type.Object({
    date: yahooFinanceTypes_js_1.YahooFinanceDate,
    high: typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()]),
    low: typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()]),
    open: typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()]),
    close: typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()]),
    volume: typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()]),
    adjclose: typebox_1.Type.Optional(typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()])),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartResultArrayQuote",
});
const ChartEventDividend = typebox_1.Type.Object({
    amount: yahooFinanceTypes_js_1.YahooNumber,
    date: yahooFinanceTypes_js_1.YahooFinanceDate,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartEventDividend",
});
const ChartEventDividends = typebox_1.Type.Object({}, {
    additionalProperties: ChartEventDividend,
    title: "ChartEventDividends",
});
const ChartEventSplit = typebox_1.Type.Object({
    date: yahooFinanceTypes_js_1.YahooFinanceDate, // new Date(1598880600 * 1000)
    numerator: yahooFinanceTypes_js_1.YahooNumber, // 4
    denominator: yahooFinanceTypes_js_1.YahooNumber, // 1
    splitRatio: typebox_1.Type.String(), // "4:1"
}, {
    additionalProperties: typebox_1.Type.Any(),
});
const ChartEventsArray = typebox_1.Type.Object({
    dividends: typebox_1.Type.Optional(typebox_1.Type.Array(ChartEventDividend)),
    splits: typebox_1.Type.Optional(typebox_1.Type.Array(ChartEventSplit)),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartEventsArray",
});
const ChartMeta = typebox_1.Type.Object({
    currency: typebox_1.Type.String(), // "USD"
    symbol: typebox_1.Type.String(), // "AAPL",
    exchangeName: typebox_1.Type.String(), // "NMS",
    instrumentType: typebox_1.Type.String(), // "EQUITY",
    firstTradeDate: typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooFinanceDate, typebox_1.Type.Null()]), // new Date(345479400 * 1000); null in e.g. "APS.AX"
    regularMarketTime: yahooFinanceTypes_js_1.YahooFinanceDate, // new Date(1637355602 * 1000),
    gmtoffset: yahooFinanceTypes_js_1.YahooNumber, // -18000,
    timezone: typebox_1.Type.String(), /// "EST",
    exchangeTimezoneName: typebox_1.Type.String(), // "America/New_York",
    regularMarketPrice: yahooFinanceTypes_js_1.YahooNumber, // 160.55,
    chartPreviousClose: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 79.75; missing in e.g. "APS.AX"
    previousClose: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 1137.06
    scale: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber), // 3,
    priceHint: yahooFinanceTypes_js_1.YahooNumber, // 2,
    currentTradingPeriod: typebox_1.Type.Object({
        pre: ChartMetaTradingPeriod,
        regular: ChartMetaTradingPeriod,
        post: ChartMetaTradingPeriod,
    }, {
        additionalProperties: typebox_1.Type.Any(),
    }),
    tradingPeriods: typebox_1.Type.Optional(
    // TODO, would be great to use correct type as a generic based on
    // `includePrePost` and `interval`, see #812.
    typebox_1.Type.Union([
        ChartMetaTradingPeriods,
        typebox_1.Type.Array(typebox_1.Type.Array(ChartMetaTradingPeriod)),
    ])),
    dataGranularity: typebox_1.Type.String(), // "1d",
    range: typebox_1.Type.String(), // ""
    validRanges: typebox_1.Type.Array(typebox_1.Type.String()), // ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"]
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartMeta",
});
const ChartResultArraySchema = typebox_1.Type.Object({
    meta: ChartMeta,
    events: typebox_1.Type.Optional(ChartEventsArray),
    quotes: typebox_1.Type.Array(ChartResultArrayQuote),
}, { title: "ChartResultArray" });
const ChartEventSplits = typebox_1.Type.Object({}, {
    additionalProperties: ChartEventSplit,
    title: "ChartEventSplits",
});
const ChartIndicatorQuote = typebox_1.Type.Object({
    high: typebox_1.Type.Array(typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()])),
    low: typebox_1.Type.Array(typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()])),
    open: typebox_1.Type.Array(typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()])),
    close: typebox_1.Type.Array(typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()])),
    volume: typebox_1.Type.Array(typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()])),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartIndicatorQuote",
});
const ChartIndicatorAdjclose = typebox_1.Type.Object({
    adjclose: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Union([yahooFinanceTypes_js_1.YahooNumber, typebox_1.Type.Null()]))), // Missing in e.g. "APS.AX"
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartIndicatorAdjClose",
});
const ChartEventsObject = typebox_1.Type.Object({
    dividends: typebox_1.Type.Optional(ChartEventDividends),
    splits: typebox_1.Type.Optional(ChartEventSplits),
}, {
    additionalProperties: typebox_1.Type.Any(),
});
const ChartIndicatorsObject = typebox_1.Type.Object({
    quote: typebox_1.Type.Array(ChartIndicatorQuote),
    adjclose: typebox_1.Type.Optional(typebox_1.Type.Array(ChartIndicatorAdjclose)),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartIndicatorObject",
});
const ChartResultObjectSchema = typebox_1.Type.Object({
    meta: ChartMeta,
    timestamp: typebox_1.Type.Optional(typebox_1.Type.Array(yahooFinanceTypes_js_1.YahooNumber)),
    events: typebox_1.Type.Optional(ChartEventsObject),
    indicators: ChartIndicatorsObject,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "ChartResultObject",
});
exports.ChartOptionsSchema = typebox_1.Type.Object({
    period1: typebox_1.Type.Union([typebox_1.Type.Date(), typebox_1.Type.String(), yahooFinanceTypes_js_1.YahooNumber]),
    period2: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Date(), typebox_1.Type.String(), yahooFinanceTypes_js_1.YahooNumber])),
    useYfid: typebox_1.Type.Optional(typebox_1.Type.Boolean()), // true
    interval: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("1m"),
        typebox_1.Type.Literal("2m"),
        typebox_1.Type.Literal("5m"),
        typebox_1.Type.Literal("15m"),
        typebox_1.Type.Literal("30m"),
        typebox_1.Type.Literal("60m"),
        typebox_1.Type.Literal("90m"),
        typebox_1.Type.Literal("1h"),
        typebox_1.Type.Literal("1d"),
        typebox_1.Type.Literal("5d"),
        typebox_1.Type.Literal("1wk"),
        typebox_1.Type.Literal("1mo"),
        typebox_1.Type.Literal("3mo"),
    ])),
    includePrePost: typebox_1.Type.Optional(typebox_1.Type.Boolean()), // true
    events: typebox_1.Type.Optional(typebox_1.Type.String()), // 'history',
    lang: typebox_1.Type.Optional(typebox_1.Type.String()), // "en-US"
    return: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal("array"), typebox_1.Type.Literal("object")])),
}, {
    title: "ChartOptions",
});
const ChartOptionsWithReturnArraySchema = typebox_1.Type.Composite([
    exports.ChartOptionsSchema,
    typebox_1.Type.Object({
        return: typebox_1.Type.Optional(typebox_1.Type.Literal("array")),
    }),
], {
    title: "ChartOptionsWithReturnArray",
});
const ChartOptionsWithReturnObjectSchema = typebox_1.Type.Composite([
    exports.ChartOptionsSchema,
    typebox_1.Type.Object({
        return: typebox_1.Type.Literal("object"),
    }),
], {
    title: "ChartOptionsWithReturnObject",
});
const queryOptionsDefaults = {
    useYfid: true,
    interval: "1d",
    includePrePost: true,
    events: "div|split|earn",
    lang: "en-US",
    return: "array",
};
/* --- array input, typed output, honor "return" param --- */
// TODO: make this a deprecration passthrough
exports._chart = chart;
function chart(symbol, queryOptionsOverrides, moduleOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const returnAs = (queryOptionsOverrides === null || queryOptionsOverrides === void 0 ? void 0 : queryOptionsOverrides.return) || "array";
        const result = (yield this._moduleExec({
            moduleName: "chart",
            query: {
                assertSymbol: symbol,
                url: "https://${YF_QUERY_HOST}/v8/finance/chart/" + symbol,
                schema: exports.ChartOptionsSchema,
                defaults: queryOptionsDefaults,
                overrides: queryOptionsOverrides,
                transformWith(queryOptions) {
                    if (!queryOptions.period2)
                        queryOptions.period2 = new Date();
                    const dates = ["period1", "period2"];
                    for (const fieldName of dates) {
                        const value = queryOptions[fieldName];
                        if (value instanceof Date) {
                            queryOptions[fieldName] = Math.floor(value.getTime() / 1000);
                        }
                        else if (typeof value === "string") {
                            const timestamp = new Date(value).getTime();
                            if (isNaN(timestamp))
                                throw new Error("yahooFinance.chart() option '" +
                                    fieldName +
                                    "' invalid date provided: '" +
                                    value +
                                    "'");
                            queryOptions[fieldName] = Math.floor(timestamp / 1000);
                        }
                    }
                    if (queryOptions.period1 === queryOptions.period2) {
                        throw new Error("yahooFinance.chart() options `period1` and `period2` " +
                            "cannot share the same value.");
                    }
                    // Don't pass this on to Yahoo
                    delete queryOptions.return;
                    return queryOptions;
                },
            },
            result: {
                schema: ChartResultObjectSchema,
                transformWith(result) {
                    if (!result.chart)
                        throw new Error("Unexpected result: " + JSON.stringify(result));
                    const chart = result.chart.result[0];
                    // If there are no quotes, chart.timestamp will be empty, but Yahoo also
                    // gives us chart.indicators.quotes = [{}].  Let's clean that up and
                    // deliver an empty array rather than an invalid ChartIndicatorQuote/
                    if (!chart.timestamp) {
                        if (chart.indicators.quote.length !== 1)
                            throw new Error("No timestamp with quotes.length !== 1, please report with your query");
                        if (Object.keys(chart.indicators.quote[0]).length !== 0)
                            // i.e. {}
                            throw new Error("No timestamp with unexpected quote, please report with your query" +
                                JSON.stringify(chart.indicators.quote[0]));
                        chart.indicators.quote.pop();
                    }
                    return chart;
                },
            },
            moduleOptions,
        }));
        if (returnAs === "object") {
            return result;
        }
        else if (returnAs === "array") {
            const timestamp = result.timestamp;
            /*
            seems as though yahoo inserts extra quotes at the event times, so no need.
            if (result.events) {
              for (let event of ["dividends", "splits"]) {
                // @ts-ignore
                if (result.events[event])
                  // @ts-ignore
                  timestamp = timestamp.filter((ts) => !result.events[event][ts]);
              }
            }
            */
            // istanbul ignore next
            if (timestamp &&
                ((_a = result === null || result === void 0 ? void 0 : result.indicators) === null || _a === void 0 ? void 0 : _a.quote) &&
                result.indicators.quote[0].high.length !== timestamp.length) {
                console.log({
                    origTimestampSize: result.timestamp && result.timestamp.length,
                    filteredSize: timestamp.length,
                    quoteSize: result.indicators.quote[0].high.length,
                });
                throw new Error("Timestamp count mismatch, please report this with the query you used");
            }
            const result2 = {
                meta: result.meta,
                quotes: timestamp ? new Array(timestamp.length) : [],
            };
            const adjclose = (_c = (_b = result === null || result === void 0 ? void 0 : result.indicators) === null || _b === void 0 ? void 0 : _b.adjclose) === null || _c === void 0 ? void 0 : _c[0].adjclose;
            if (timestamp)
                for (let i = 0; i < timestamp.length; i++) {
                    result2.quotes[i] = {
                        date: new Date(timestamp[i] * 1000),
                        high: result.indicators.quote[0].high[i],
                        volume: result.indicators.quote[0].volume[i],
                        open: result.indicators.quote[0].open[i],
                        low: result.indicators.quote[0].low[i],
                        close: result.indicators.quote[0].close[i],
                    };
                    if (adjclose)
                        result2.quotes[i].adjclose = adjclose[i];
                }
            if (result.events) {
                result2.events = {};
                for (const event of ["dividends", "splits"]) {
                    // @ts-expect-error (eatkinson): Fix up type in follow up
                    if (result.events[event])
                        // @ts-expect-error (eatkinson): Fix up type in follow up
                        result2.events[event] = Object.values(result.events[event]);
                }
            }
            return result2;
        }
        // TypeScript runtime validation ensures no other values for
        // "returnAs" are possible.
    });
}
