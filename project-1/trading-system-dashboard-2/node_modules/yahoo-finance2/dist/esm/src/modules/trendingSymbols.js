import { Type } from "@sinclair/typebox";
import { YahooNumber } from "../lib/yahooFinanceTypes.js";
const TrendingSymbol = Type.Object({
    symbol: Type.String(),
}, {
    additionalProperties: Type.Any(),
});
const TrendingSymbolsResult = Type.Object({
    count: YahooNumber,
    quotes: Type.Array(TrendingSymbol),
    jobTimestamp: YahooNumber,
    startInterval: YahooNumber,
}, {
    additionalProperties: Type.Any(),
    title: "TrendingSymbolsResult",
});
const TrendingSymbolsOptions = Type.Optional(Type.Object({
    lang: Type.Optional(Type.String()),
    region: Type.Optional(Type.String()),
    count: Type.Optional(YahooNumber),
}, {
    title: "TrendingSymbolsOptions",
}));
const queryOptionsDefaults = {
    lang: "en-US",
    count: 5,
};
export default function trendingSymbols(query, queryOptionsOverrides, moduleOptions) {
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
