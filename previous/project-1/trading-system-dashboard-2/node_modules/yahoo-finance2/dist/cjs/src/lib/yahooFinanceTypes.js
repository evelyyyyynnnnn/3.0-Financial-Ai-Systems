"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YahooTwoNumberRange = exports.NullableYahooNumber = exports.YahooDateInMs = exports.YahooNumber = exports.NullableYahooFinanceDate = exports.YahooFinanceDate = exports.ISOStringDate = exports.RawDateObject = exports.EpochTimestamp = exports.TwoNumberRangeString = exports.RawNumber = exports.EmptyObjectCoerceToNull = void 0;
const typebox_1 = require("@sinclair/typebox");
const value_1 = require("@sinclair/typebox/value");
const typebox_2 = require("@sinclair/typebox");
const datetime_js_1 = require("./datetime.js");
typebox_2.FormatRegistry.Set("date", datetime_js_1.isDate);
typebox_2.FormatRegistry.Set("date-time", datetime_js_1.isDateTime);
typebox_2.FormatRegistry.Set("year", datetime_js_1.isYear);
// Strictly must be empty
exports.EmptyObjectCoerceToNull = typebox_1.Type.Transform(typebox_1.Type.Object({}, { maxProperties: 0, title: "EmptyObjectCoerceToNull" }))
    .Decode(() => null)
    .Encode(() => ({}));
// Technically this will also contain a string 'fmt' key but we don't care because we don't use it
exports.RawNumber = typebox_1.Type.Transform(typebox_1.Type.Object({
    raw: typebox_1.Type.Number(),
}, {
    title: "RawNumber",
}))
    .Decode((v) => v.raw)
    .Encode((v) => ({ raw: v }));
exports.TwoNumberRangeString = typebox_1.Type.Transform(typebox_1.Type.RegExp(/^(-?\d+(?:\.\d+)?) - (-?\d+(?:\.\d+)?)$/g, {
    title: "TwoNumberRangeString",
}))
    .Decode((value) => {
    // Split the two numbers allowing for negatives on either side
    const validatedNumbers = value.match(/-?\d+(?:\.\d+)?/g);
    if (!validatedNumbers) {
        throw new Error(`Unable to decode number range from: ${value}`);
    }
    const [low, high] = validatedNumbers.map((number) => parseFloat(number));
    if (isNaN(low) || isNaN(high)) {
        throw new Error(`Unable to decode number range from: ${value}. Decoded value for low is: ${low}, decoded value for high is: ${high}`);
    }
    return { low, high };
})
    .Encode(({ low, high }) => `${low} - ${high}`);
const TwoNumberRange = typebox_1.Type.Object({
    low: typebox_1.Type.Number(),
    high: typebox_1.Type.Number(),
}, { title: "TwoNumberRange" });
exports.EpochTimestamp = typebox_1.Type.Transform(typebox_1.Type.Number())
    .Decode((v) => new Date(v * 1000))
    .Encode((v) => +v / 1000);
exports.RawDateObject = typebox_1.Type.Transform(typebox_1.Type.Object({
    raw: exports.EpochTimestamp,
}, { title: "RawDateObject" }))
    .Decode((v) => v.raw)
    .Encode((v) => ({
    raw: value_1.Value.Encode(exports.EpochTimestamp, v),
}));
exports.ISOStringDate = typebox_1.Type.Transform(typebox_1.Type.Union([
    typebox_1.Type.String({ format: "date" }),
    typebox_1.Type.String({ format: "year" }),
    typebox_1.Type.String({ format: "date-time" }),
], { title: "ISOStringDate" }))
    .Decode((v) => new Date(v))
    .Encode((v) => v.toISOString());
exports.YahooFinanceDate = typebox_1.Type.Union([typebox_1.Type.Date(), exports.EpochTimestamp, exports.RawDateObject, exports.ISOStringDate], { title: "YahooFinanceDate" });
/**
 * Validates and decodes all nullable date representations produced by Yahoo
 * e.g. accepted inputs include:
 * - 1612313997
 * - { raw: 1612313997 }
 * - "2024-02-29"
 * - "2024-05-04T13:24:41.100Z"
 * - {} (coerces to null)
 */
exports.NullableYahooFinanceDate = typebox_1.Type.Union([exports.YahooFinanceDate, typebox_1.Type.Null(), exports.EmptyObjectCoerceToNull], {
    title: "NullableYahooFinanceDate",
});
/**
 * Validates and decodes all number types and coerces to a number
 * e.g. accepted inputs include:
 * - 10.54
 * - {raw: 10.54, fmt: "%6f"}
 */
exports.YahooNumber = typebox_1.Type.Union([exports.RawNumber, typebox_1.Type.Number()], {
    title: "YahooNumber",
});
/**
 * Validates and decodes dates represented as milliseconds since the unix epoch to Date objects
 * e.g. accepted inputs include:
 * - 1612313997000
 */
exports.YahooDateInMs = typebox_1.Type.Transform(typebox_1.Type.Number({ title: "YahooDateInMs" }))
    .Decode((v) => new Date(v))
    .Encode((v) => +v);
/**
 * Validates and decodes all nullable number types and coerces to a number or null
 * e.g. accepted inputs include:
 * - 10.54
 * - {raw: 10.54, fmt: "%6f"}
 * - null
 * - {} (coerces to null)
 */
exports.NullableYahooNumber = typebox_1.Type.Union([exports.RawNumber, exports.EmptyObjectCoerceToNull, typebox_1.Type.Number(), typebox_1.Type.Null()], {
    title: "NullableYahooNumber",
});
/**
 * Validates and decodes 2 number ranges to a consistent object format of { low: <number>, high: <number> }
 * e.g. accepted inputs include:
 * - { low: 103, high: 10043 }
 * - "-32432 - 453"
 */
exports.YahooTwoNumberRange = typebox_1.Type.Union([TwoNumberRange, exports.TwoNumberRangeString], {
    title: "YahooTwoNumberRange",
});
