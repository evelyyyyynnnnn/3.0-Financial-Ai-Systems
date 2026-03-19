"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = trendingSymbols;
const typebox_1 = require("@sinclair/typebox");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
const TrendingSymbol = typebox_1.Type.Object({
    symbol: typebox_1.Type.String(),
}, {
    additionalProperties: typebox_1.Type.Any(),
});
const TrendingSymbolsResult = typebox_1.Type.Object({
    count: yahooFinanceTypes_js_1.YahooNumber,
    quotes: typebox_1.Type.Array(TrendingSymbol),
    jobTimestamp: yahooFinanceTypes_js_1.YahooNumber,
    startInterval: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "TrendingSymbolsResult",
});
const TrendingSymbolsOptions = typebox_1.Type.Optional(typebox_1.Type.Object({
    lang: typebox_1.Type.Optional(typebox_1.Type.String()),
    region: typebox_1.Type.Optional(typebox_1.Type.String()),
    count: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
}, {
    title: "TrendingSymbolsOptions",
}));
const queryOptionsDefaults = {
    lang: "en-US",
    count: 5,
};
function trendingSymbols(query, queryOptionsOverrides, moduleOptions) {
    return this._moduleExec({
        moduleName: "trendingSymbols",
        query: {
            url: "https://${YF_QUERY_HOST}/v1/finance/trending/" + query,
            schema: TrendingSymbolsOptions,
            defaults: queryOptionsDefaults,
            overrides: queryOptionsOverrides,
        },
        result: {
            schema: TrendingSymbolsResult,
            transformWith(result) {
                if (!result.finance)
                    throw new Error("Unexpected result: " + JSON.stringify(result));
                return result.finance.result[0];
            },
        },
        moduleOptions,
    });
}
