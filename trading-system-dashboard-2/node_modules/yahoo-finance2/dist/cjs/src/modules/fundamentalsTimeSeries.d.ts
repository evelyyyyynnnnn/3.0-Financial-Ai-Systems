import { StaticDecode } from "@sinclair/typebox";
import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
declare const FundamentalsTimeSeriesResultSchema: import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
}>;
declare const FundamentalsTimeSeriesOptionsSchema: import("@sinclair/typebox").TObject<{
    period1: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TString]>;
    period2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TString]>>;
    type: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    merge: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    padTimeSeries: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    region: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    module: import("@sinclair/typebox").TString;
}>;
export type FundamentalsTimeSeriesOptions = StaticDecode<typeof FundamentalsTimeSeriesOptionsSchema>;
export type FundamentalsTimeSeriesResult = StaticDecode<typeof FundamentalsTimeSeriesResultSchema>;
export default function fundamentalsTimeSeries(this: ModuleThis, symbol: string, queryOptionsOverrides: FundamentalsTimeSeriesOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<FundamentalsTimeSeriesResult>;
export default function fundamentalsTimeSeries(this: ModuleThis, symbol: string, queryOptionsOverrides: FundamentalsTimeSeriesOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
/**
 * Transform the input options into query parameters.
 * The options module defines which keys that are used in the query.
 * The keys are joined together into the query parameter type and
 * pre-fixed with the options type (e.g. annualTotalRevenue).
 * @param queryOptions Input query options.
 * @returns Query parameters.
 */
export declare const processQuery: (queryOptions: FundamentalsTimeSeriesOptions) => Partial<FundamentalsTimeSeriesOptions>;
/**
 * Transforms the time-series into an array with reported values per period.
 * Each object represents a period and its properties are the data points.
 * Financial statement content variates and keys are skipped when empty.
 * The query keys include the option type  (e.g. annualTotalRevenue).
 * In the response the type is removed (e.g. totalRevenue) for
 * easier mapping by the client.
 * @param response Query response.
 * @returns Formatted response.
 */
export declare const processResponse: (response: any) => any;
export {};
