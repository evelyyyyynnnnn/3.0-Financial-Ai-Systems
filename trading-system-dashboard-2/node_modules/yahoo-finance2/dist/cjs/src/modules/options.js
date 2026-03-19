"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = options;
const typebox_1 = require("@sinclair/typebox");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
const quote_js_1 = require("./quote.js");
const value_1 = require("@sinclair/typebox/value");
/*
 * [TODO] Fields seen in a query but not in this module yet:
 *
 *   - extendedMarketChange
 *   - extendedMarketChangePercent
 *   - extendedMarketPrice
 *   - extendedMarketTime
 *   - dayHigh (separate to regularMarketDayHigh, etc)
 *   - dayLow (separate to regularMarketDayLow, etc)
 *   - volume (separate to regularMarketVolume, etc)
 *
 * i.e. on yahoo site, with ?fields=dayHigh,dayLow,etc.
 */
/*
 * Guaranteed fields, even we don't ask for them
 */
const QuoteCryptoCurrencySchema = typebox_1.Type.Composite([
    quote_js_1.QuoteBase,
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
], { title: "QuoteCryptoCurrency" });
const QuoteCurrencySchema = typebox_1.Type.Composite([
    quote_js_1.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("CURRENCY"),
    }),
], { title: "QuoteCurrency" });
const QuoteEtfSchema = typebox_1.Type.Composite([
    quote_js_1.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("ETF"),
    }),
]);
const QuoteEquitySchema = typebox_1.Type.Composite([
    quote_js_1.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("EQUITY"),
        dividendRate: typebox_1.Type.Optional(typebox_1.Type.Number()),
        dividendYield: typebox_1.Type.Optional(typebox_1.Type.Number()),
    }),
], { title: "QuoteEquity" });
const QuoteFutureSchema = typebox_1.Type.Composite([
    quote_js_1.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("FUTURE"),
        headSymbolAsString: typebox_1.Type.String(),
        contractSymbol: typebox_1.Type.Boolean(),
        underlyingExchangeSymbol: typebox_1.Type.String(),
        expireDate: yahooFinanceTypes_js_1.YahooFinanceDate,
        expireIsoDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    }),
], {
    title: "QuoteFuture",
});
const QuoteIndexSchema = typebox_1.Type.Composite([
    quote_js_1.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("INDEX"),
    }),
], {
    title: "QuoteIndex",
});
const QuoteOptionSchema = typebox_1.Type.Composite([
    quote_js_1.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("OPTION"),
        strike: yahooFinanceTypes_js_1.YahooNumber,
        openInterest: yahooFinanceTypes_js_1.YahooNumber,
        expireDate: yahooFinanceTypes_js_1.YahooNumber,
        expireIsoDate: yahooFinanceTypes_js_1.YahooNumber,
        underlyingSymbol: typebox_1.Type.String(),
    }),
], {
    title: "QuoteOption",
});
const QuoteMutualfundSchema = typebox_1.Type.Composite([
    quote_js_1.QuoteBase,
    typebox_1.Type.Object({
        quoteType: typebox_1.Type.Literal("MUTUALFUND"),
    }),
], {
    title: "QuoteMutualFund",
});
const QuoteSchema = typebox_1.Type.Union([
    QuoteCryptoCurrencySchema,
    QuoteCurrencySchema,
    QuoteEtfSchema,
    QuoteEquitySchema,
    QuoteFutureSchema,
    QuoteIndexSchema,
    QuoteMutualfundSchema,
    QuoteOptionSchema,
], {
    title: "Quote",
});
const CallOrPutSchema = typebox_1.Type.Object({
    contractSymbol: typebox_1.Type.String(),
    strike: yahooFinanceTypes_js_1.YahooNumber,
    currency: typebox_1.Type.Optional(typebox_1.Type.String()),
    lastPrice: yahooFinanceTypes_js_1.YahooNumber,
    change: yahooFinanceTypes_js_1.YahooNumber,
    percentChange: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    volume: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    openInterest: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    bid: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    ask: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    contractSize: typebox_1.Type.Literal("REGULAR"),
    expiration: yahooFinanceTypes_js_1.YahooFinanceDate,
    lastTradeDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    impliedVolatility: yahooFinanceTypes_js_1.YahooNumber,
    inTheMoney: typebox_1.Type.Boolean(),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "CallOrPut",
});
const OptionSchema = typebox_1.Type.Object({
    expirationDate: yahooFinanceTypes_js_1.YahooFinanceDate,
    hasMiniOptions: typebox_1.Type.Boolean(),
    calls: typebox_1.Type.Array(CallOrPutSchema),
    puts: typebox_1.Type.Array(CallOrPutSchema),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "Option",
});
const OptionsResultSchema = typebox_1.Type.Object({
    underlyingSymbol: typebox_1.Type.String(),
    expirationDates: typebox_1.Type.Array(yahooFinanceTypes_js_1.YahooFinanceDate),
    strikes: typebox_1.Type.Array(yahooFinanceTypes_js_1.YahooNumber),
    hasMiniOptions: typebox_1.Type.Boolean(),
    quote: QuoteSchema,
    options: typebox_1.Type.Array(OptionSchema),
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "OptionsResult",
});
const OptionsOptionsSchema = typebox_1.Type.Object({
    formatted: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    lang: typebox_1.Type.Optional(typebox_1.Type.String()),
    region: typebox_1.Type.Optional(typebox_1.Type.String()),
    date: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooFinanceDate),
}, {
    title: "OptionsOptions",
});
const queryOptionsDefaults = {
    formatted: false,
    lang: "en-US",
    region: "US",
};
function options(symbol, queryOptionsOverrides, moduleOptions) {
    return this._moduleExec({
        moduleName: "options",
        query: {
            assertSymbol: symbol,
            url: "https://${YF_QUERY_HOST}/v7/finance/options/" + symbol,
            needsCrumb: true,
            schema: OptionsOptionsSchema,
            defaults: queryOptionsDefaults,
            overrides: queryOptionsOverrides,
            transformWith(queryOptions) {
                // This is honestly the easiest way to coerce the date properly
                const parsed = value_1.Value.Decode(OptionsOptionsSchema, queryOptions);
                const transformed = parsed.date
                    ? Object.assign(Object.assign({}, parsed), { date: Math.floor(parsed.date.getTime() / 1000) }) : parsed;
                return transformed;
            },
        },
        result: {
            schema: OptionsResultSchema,
            transformWith(result) {
                if (!result.optionChain)
                    throw new Error("Unexpected result: " + JSON.stringify(result));
                return result.optionChain.result[0];
            },
        },
        moduleOptions,
    });
}
