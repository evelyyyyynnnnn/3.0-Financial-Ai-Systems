import { StaticDecode } from "@sinclair/typebox";
import type { ModuleOptionsWithValidateFalse, ModuleOptionsWithValidateTrue, ModuleThis } from "../lib/moduleCommon.js";
declare const RecommendationsBySymbolResponse: import("@sinclair/typebox").TObject<{
    recommendedSymbols: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        symbol: import("@sinclair/typebox").TString;
    }>>;
    symbol: import("@sinclair/typebox").TString;
}>;
declare const RecommendationsBySymbolResponseArray: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
    recommendedSymbols: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        symbol: import("@sinclair/typebox").TString;
    }>>;
    symbol: import("@sinclair/typebox").TString;
}>>;
declare const RecommendationsBySymbolOptions: import("@sinclair/typebox").TObject<{}>;
export type RecommendationsBySymbolResponse = StaticDecode<typeof RecommendationsBySymbolResponse>;
export type RecommendationsBySymbolOptions = StaticDecode<typeof RecommendationsBySymbolOptions>;
export type RecommendationsBySymbolResponseArray = StaticDecode<typeof RecommendationsBySymbolResponseArray>;
export default function recommendationsBySymbol(this: ModuleThis, query: string, queryOptionsOverrides?: RecommendationsBySymbolOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<RecommendationsBySymbolResponse>;
export default function recommendationsBySymbol(this: ModuleThis, query: string | string[], queryOptionsOverrides?: RecommendationsBySymbolOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<RecommendationsBySymbolResponseArray>;
export default function recommendationsBySymbol(this: ModuleThis, query: string | string[], queryOptionsOverrides?: RecommendationsBySymbolOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
export {};
