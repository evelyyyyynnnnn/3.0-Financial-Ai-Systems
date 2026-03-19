export declare const EmptyObjectCoerceToNull: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>;
export declare const RawNumber: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
    raw: import("@sinclair/typebox").TNumber;
}>, number>;
export declare const TwoNumberRangeString: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
    low: number;
    high: number;
}>;
export declare const EpochTimestamp: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
export declare const RawDateObject: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
}>, Date>;
export declare const ISOStringDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>;
export declare const YahooFinanceDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
}>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
/**
 * Validates and decodes all nullable date representations produced by Yahoo
 * e.g. accepted inputs include:
 * - 1612313997
 * - { raw: 1612313997 }
 * - "2024-02-29"
 * - "2024-05-04T13:24:41.100Z"
 * - {} (coerces to null)
 */
export declare const NullableYahooFinanceDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
}>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
/**
 * Validates and decodes all number types and coerces to a number
 * e.g. accepted inputs include:
 * - 10.54
 * - {raw: 10.54, fmt: "%6f"}
 */
export declare const YahooNumber: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
    raw: import("@sinclair/typebox").TNumber;
}>, number>, import("@sinclair/typebox").TNumber]>;
/**
 * Validates and decodes dates represented as milliseconds since the unix epoch to Date objects
 * e.g. accepted inputs include:
 * - 1612313997000
 */
export declare const YahooDateInMs: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
/**
 * Validates and decodes all nullable number types and coerces to a number or null
 * e.g. accepted inputs include:
 * - 10.54
 * - {raw: 10.54, fmt: "%6f"}
 * - null
 * - {} (coerces to null)
 */
export declare const NullableYahooNumber: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
    raw: import("@sinclair/typebox").TNumber;
}>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
/**
 * Validates and decodes 2 number ranges to a consistent object format of { low: <number>, high: <number> }
 * e.g. accepted inputs include:
 * - { low: 103, high: 10043 }
 * - "-32432 - 453"
 */
export declare const YahooTwoNumberRange: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    low: import("@sinclair/typebox").TNumber;
    high: import("@sinclair/typebox").TNumber;
}>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
    low: number;
    high: number;
}>]>;
