import { StaticDecode } from "@sinclair/typebox";
import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
declare const TrendingSymbolsResult: import("@sinclair/typebox").TObject<{
    count: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    quotes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
    }>>;
    jobTimestamp: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    startInterval: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
declare const TrendingSymbolsOptions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    region: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    count: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>>;
export type TrendingSymbolsResult = StaticDecode<typeof TrendingSymbolsResult>;
export type TrendingSymbolsOptions = StaticDecode<typeof TrendingSymbolsOptions>;
export default function trendingSymbols(this: ModuleThis, query: string, queryOptionsOverrides?: TrendingSymbolsOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<TrendingSymbolsResult>;
export default function trendingSymbols(this: ModuleThis, query: string, queryOptionsOverrides?: TrendingSymbolsOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
export {};
