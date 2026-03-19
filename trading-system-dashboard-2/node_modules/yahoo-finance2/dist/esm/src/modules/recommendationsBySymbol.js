import { Type } from "@sinclair/typebox";
import { YahooNumber } from "../lib/yahooFinanceTypes.js";
const RecommendationsBySymbolResponse = Type.Object({
    recommendedSymbols: Type.Array(Type.Object({
        score: YahooNumber, // 0.1927
        symbol: Type.String(), // "BMW.DE"
    }, {
        additionalProperties: Type.Any(),
    })),
    symbol: Type.String(),
}, {
    additionalProperties: Type.Any(),
});
const RecommendationsBySymbolResponseArray = Type.Array(RecommendationsBySymbolResponse);
const RecommendationsBySymbolOptions = Type.Object({});
const queryOptionsDefaults = {};
export default function recommendationsBySymbol(query, queryOptionsOverrides, moduleOptions) {
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
