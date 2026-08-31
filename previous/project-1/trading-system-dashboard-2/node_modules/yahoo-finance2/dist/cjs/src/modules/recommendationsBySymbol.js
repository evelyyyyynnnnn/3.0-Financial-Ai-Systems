"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = recommendationsBySymbol;
const typebox_1 = require("@sinclair/typebox");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
const RecommendationsBySymbolResponse = typebox_1.Type.Object({
    recommendedSymbols: typebox_1.Type.Array(typebox_1.Type.Object({
        score: yahooFinanceTypes_js_1.YahooNumber, // 0.1927
        symbol: typebox_1.Type.String(), // "BMW.DE"
    }, {
        additionalProperties: typebox_1.Type.Any(),
    })),
    symbol: typebox_1.Type.String(),
}, {
    additionalProperties: typebox_1.Type.Any(),
});
const RecommendationsBySymbolResponseArray = typebox_1.Type.Array(RecommendationsBySymbolResponse);
const RecommendationsBySymbolOptions = typebox_1.Type.Object({});
const queryOptionsDefaults = {};
function recommendationsBySymbol(query, queryOptionsOverrides, moduleOptions) {
    const symbols = typeof query === "string" ? query : query.join(",");
    return this._moduleExec({
        moduleName: "recommendationsBySymbol",
        query: {
            url: "https://${YF_QUERY_HOST}/v6/finance/recommendationsbysymbol/" +
                symbols,
            schema: RecommendationsBySymbolOptions,
            defaults: queryOptionsDefaults,
            overrides: queryOptionsOverrides,
        },
        result: {
            schema: RecommendationsBySymbolResponseArray,
            transformWith(result) {
                if (!result.finance)
                    throw new Error("Unexpected result: " + JSON.stringify(result));
                return result.finance.result;
            },
        },
        moduleOptions,
    }).then((results) => {
        return typeof query === "string"
            ? results[0]
            : results;
    });
}
