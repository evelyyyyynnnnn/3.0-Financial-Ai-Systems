"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = historical;
const typebox_1 = require("@sinclair/typebox");
const value_1 = require("@sinclair/typebox/value");
const yahooFinanceTypes_js_1 = require("../lib/yahooFinanceTypes.js");
const chart_js_1 = require("./chart.js");
const validateAndCoerceTypes_js_1 = __importDefault(require("../lib/validateAndCoerceTypes.js"));
const notices_js_1 = require("../lib/notices.js");
const HistoricalRowHistorySchema = typebox_1.Type.Object({
    date: yahooFinanceTypes_js_1.YahooFinanceDate,
    open: yahooFinanceTypes_js_1.YahooNumber,
    high: yahooFinanceTypes_js_1.YahooNumber,
    low: yahooFinanceTypes_js_1.YahooNumber,
    close: yahooFinanceTypes_js_1.YahooNumber,
    adjClose: typebox_1.Type.Optional(yahooFinanceTypes_js_1.YahooNumber),
    volume: yahooFinanceTypes_js_1.YahooNumber,
}, {
    additionalProperties: typebox_1.Type.Any(),
    title: "HistoricalRowHistory",
});
const HistoricalRowDividendSchema = typebox_1.Type.Object({
    date: yahooFinanceTypes_js_1.YahooFinanceDate,
    dividends: yahooFinanceTypes_js_1.YahooNumber,
}, { title: "HistoricalRowDividend" });
const HistoricalRowStockSplitSchema = typebox_1.Type.Object({
    date: yahooFinanceTypes_js_1.YahooFinanceDate,
    stockSplits: typebox_1.Type.String(),
}, { title: "HistoricalRowStockSplit" });
const HistoricalOptionsSchema = typebox_1.Type.Object({
    period1: typebox_1.Type.Union([typebox_1.Type.Date(), typebox_1.Type.String(), typebox_1.Type.Number()]),
    period2: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Date(), typebox_1.Type.String(), typebox_1.Type.Number()])),
    interval: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("1d"),
        typebox_1.Type.Literal("1wk"),
        typebox_1.Type.Literal("1mo"),
    ])),
    // events: Type.Optional(Type.String()),
    events: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("history"),
        typebox_1.Type.Literal("dividends"),
        typebox_1.Type.Literal("split"),
    ])),
    includeAdjustedClose: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
}, { title: "HistoricalOptions" });
const HistoricalOptionsEventsHistorySchema = typebox_1.Type.Composite([
    HistoricalOptionsSchema,
    typebox_1.Type.Object({
        events: typebox_1.Type.Optional(typebox_1.Type.Literal("history")),
    }),
], { title: "HistoricalOptionsEventsHistory" });
const HistoricalOptionsEventsDividendsSchema = typebox_1.Type.Composite([
    HistoricalOptionsSchema,
    typebox_1.Type.Object({
        events: typebox_1.Type.Literal("dividends"),
    }),
], { title: "HistoricalOptionsEventsDividends" });
const HistoricalOptionsEventsSplitSchema = typebox_1.Type.Composite([
    HistoricalOptionsSchema,
    typebox_1.Type.Object({
        events: typebox_1.Type.Literal("split"),
    }),
], { title: "HistoricalOptionsEventsSplit" });
const HistoricalHistoryResultSchema = typebox_1.Type.Array(HistoricalRowHistorySchema, {
    title: "HistoricalHistoryResult",
});
const HistoricalDividendsResultSchema = typebox_1.Type.Array(HistoricalRowDividendSchema, {
    title: "HistoricalDividendsResult",
});
const HistoricalStockSplitsResultSchema = typebox_1.Type.Array(HistoricalRowStockSplitSchema, {
    title: "HistoricalRowStockSplit",
});
const queryOptionsDefaults = {
    interval: "1d",
    events: "history",
    includeAdjustedClose: true,
};
// Count number of null values in object (1-level deep)
function nullFieldCount(object) {
    if (object == null) {
        return;
    }
    let nullCount = 0;
    for (const val of Object.values(object))
        if (val === null)
            nullCount++;
    return nullCount;
}
function historical(symbol, queryOptionsOverrides, moduleOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        (0, notices_js_1.showNotice)("ripHistorical");
        (0, validateAndCoerceTypes_js_1.default)({
            type: "options",
            data: queryOptionsOverrides !== null && queryOptionsOverrides !== void 0 ? queryOptionsOverrides : {},
            schema: HistoricalOptionsSchema,
            options: this._opts.validation,
        });
        let schema;
        if (!queryOptionsOverrides.events ||
            queryOptionsOverrides.events === "history")
            schema = HistoricalHistoryResultSchema;
        else if (queryOptionsOverrides.events === "dividends")
            schema = HistoricalDividendsResultSchema;
        else if (queryOptionsOverrides.events === "split")
            schema = HistoricalStockSplitsResultSchema;
        else
            throw new Error("No such event type:" + queryOptionsOverrides.events);
        const queryOpts = Object.assign(Object.assign({}, queryOptionsDefaults), queryOptionsOverrides);
        if (!value_1.Value.Check(HistoricalOptionsSchema, queryOpts))
            throw new Error("Internal error, please report.  Overrides validated but not defaults?");
        // Don't forget that queryOpts are already validated and safe-safe.
        const eventsMap = { history: "", dividends: "div", split: "split" };
        const chartQueryOpts = {
            period1: queryOpts.period1,
            period2: queryOpts.period2,
            interval: queryOpts.interval,
            events: eventsMap[queryOpts.events || "history"],
        };
        if (!value_1.Value.Check(chart_js_1.ChartOptionsSchema, chartQueryOpts))
            throw new Error("Internal error, please report.  historical() provided invalid chart() query options.");
        // TODO: do we even care?
        if (queryOpts.includeAdjustedClose === false) {
            /* */
        }
        const result = yield this.chart(symbol, chartQueryOpts, Object.assign(Object.assign({}, moduleOptions), { validateResult: true }));
        let out;
        if (queryOpts.events === "dividends") {
            out = ((_b = (_a = result.events) === null || _a === void 0 ? void 0 : _a.dividends) !== null && _b !== void 0 ? _b : []).map((d) => ({
                date: d.date,
                dividends: d.amount,
            }));
        }
        else if (queryOpts.events === "split") {
            out = ((_d = (_c = result.events) === null || _c === void 0 ? void 0 : _c.splits) !== null && _d !== void 0 ? _d : []).map((s) => ({
                date: s.date,
                stockSplits: s.splitRatio,
            }));
        }
        else {
            out = ((_e = result.quotes) !== null && _e !== void 0 ? _e : [])
                .filter((quote) => {
                const fieldCount = Object.keys(quote).length;
                const nullCount = nullFieldCount(quote);
                if (nullCount === 0) {
                    // No nulls is a legit (regular) result
                    return true;
                }
                else if (nullCount !== fieldCount - 1 /* skip "date" */) {
                    // Unhandled case: some but not all values are null.
                    // Note: no need to check for null "date", validation does it for us
                    console.error(nullCount, quote);
                    throw new Error("Historical returned a result with SOME (but not " +
                        "all) null values.  Please report this, and provide the " +
                        "query that caused it.");
                }
                else {
                    // All fields (except "date") are null
                    return false;
                }
            })
                .map((quote) => {
                if (!quote.adjclose)
                    return quote;
                const { adjclose } = quote, rest = __rest(quote, ["adjclose"]);
                return Object.assign(Object.assign({}, rest), { adjClose: adjclose });
            });
        }
        const validateResult = !moduleOptions ||
            moduleOptions.validateResult === undefined ||
            moduleOptions.validateResult === true;
        const validationOpts = Object.assign(Object.assign({}, this._opts.validation), { 
            // Set logErrors=false if validateResult=false
            logErrors: validateResult ? this._opts.validation.logErrors : false });
        try {
            return (0, validateAndCoerceTypes_js_1.default)({
                type: "result",
                data: out,
                schema,
                options: validationOpts,
            });
        }
        catch (error) {
            if (validateResult)
                throw error;
        }
        return out;
        /*
        // Original historical() retrieval code when Yahoo API still existed.
        return this._moduleExec({
          moduleName: "historical",
      
          query: {
            assertSymbol: symbol,
            url: "https://${YF_QUERY_HOST}/v7/finance/download/" + symbol,
            schema: HistoricalOptionsSchema,
            defaults: queryOptionsDefaults,
            overrides: queryOptionsOverrides,
            fetchType: "csv",
            transformWith(queryOptions: HistoricalOptions) {
              if (!queryOptions.period2) queryOptions.period2 = new Date();
      
              const dates = ["period1", "period2"] as const;
              for (const fieldName of dates) {
                const value = queryOptions[fieldName];
                if (value instanceof Date)
                  queryOptions[fieldName] = Math.floor(value.getTime() / 1000);
                else if (typeof value === "string") {
                  const timestamp = new Date(value as string).getTime();
      
                  if (isNaN(timestamp))
                    throw new Error(
                      "yahooFinance.historical() option '" +
                        fieldName +
                        "' invalid date provided: '" +
                        value +
                        "'",
                    );
      
                  queryOptions[fieldName] = Math.floor(timestamp / 1000);
                }
              }
      
              if (queryOptions.period1 === queryOptions.period2) {
                throw new Error(
                  "yahooFinance.historical() options `period1` and `period2` " +
                    "cannot share the same value.",
                );
              }
      
              return queryOptions;
            },
          },
      
          result: {
            schema,
            transformWith(result: any) {
              if (result.length === 0) return result;
      
              const filteredResults = [];
              const fieldCount = Object.keys(result[0]).length;
      
              // Count number of null values in object (1-level deep)
              function nullFieldCount(object: unknown) {
                if (object == null) {
                  return;
                }
                let nullCount = 0;
                for (const val of Object.values(object))
                  if (val === null) nullCount++;
                return nullCount;
              }
      
              for (const row of result) {
                const nullCount = nullFieldCount(row);
      
                if (nullCount === 0) {
                  // No nulls is a legit (regular) result
                  filteredResults.push(row);
                } else if (nullCount !== fieldCount - 1 /* skip "date" */ /*) {
          // Unhandled case: some but not all values are null.
          // Note: no need to check for null "date", validation does it for us
          console.error(nullCount, row);
          throw new Error(
            "Historical returned a result with SOME (but not " +
              "all) null values.  Please report this, and provide the " +
              "query that caused it.",
          );
        } else {
          // All fields (except "date") are null: silently skip (no-op)
        }
      }

      /*
       * We may consider, for future optimization, to count rows and create
       * new array in advance, and skip consecutive blocks of null results.
       * Of doubtful utility.
       */ /*
       return filteredResults;
     },
   },

   moduleOptions,
 });
 */
    });
}
