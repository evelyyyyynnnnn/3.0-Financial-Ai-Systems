"use strict";
/*
 * moduleExec(options: ModuleExecOptions)
 *
 * 1. Query Stage
 *   1. Validate user-supplied module params, e.g. { period: '1d' }
 *   2. Merge query params: (module defaults, user-supplied overrides, etc)
 *   3. Optionally transform query params
 *
 * 2. Call lib/yahooFinanceFetch
 *
 * 3. Result Stage
 *   1. Optional transform the result
 *   2. Validate the result and coerce types
 *
 * Further info below, inline.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateAndCoerceTypes_js_1 = require("./validateAndCoerceTypes.js");
const csv2json_js_1 = __importDefault(require("./csv2json.js"));
function moduleExec(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const queryOpts = opts.query;
        const moduleOpts = opts.moduleOptions;
        const moduleName = opts.moduleName;
        const resultOpts = opts.result;
        if (queryOpts.assertSymbol) {
            const symbol = queryOpts.assertSymbol;
            if (typeof symbol !== "string")
                throw new Error(`yahooFinance.${moduleName}() expects a single string symbol as its ` +
                    `query, not a(n) ${typeof symbol}: ${JSON.stringify(symbol)}`);
        }
        // Check that query options passed by the user are valid for this module
        (0, validateAndCoerceTypes_js_1.validateAndCoerceTypebox)({
            type: "options",
            data: (_a = queryOpts.overrides) !== null && _a !== void 0 ? _a : {},
            schema: queryOpts.schema,
            options: this._opts.validation,
        });
        let queryOptions = Object.assign(Object.assign(Object.assign({}, queryOpts.defaults), queryOpts.runtime), queryOpts.overrides);
        /*
         * Called with the merged (defaults,runtime,overrides) before running
         * the query.  Useful to transform options we allow but not Yahoo, e.g.
         * allow a "2020-01-01" date but transform this to a UNIX epoch.
         */
        if (queryOpts.transformWith) {
            queryOptions = queryOpts.transformWith(queryOptions);
        }
        // this._fetch is lib/yahooFinanceFetch
        let result = yield this._fetch(queryOpts.url, queryOptions, moduleOpts, queryOpts.fetchType, (_b = queryOpts.needsCrumb) !== null && _b !== void 0 ? _b : false);
        if (queryOpts.fetchType === "csv") {
            result = (0, csv2json_js_1.default)(result);
        }
        /*
         * Mutate the Yahoo result *before* validating and coercion.  Mostly used
         * to e.g. throw if no (result.returnField) and return result.returnField.
         */
        if (resultOpts.transformWith) {
            result = resultOpts.transformWith(result);
        }
        const validateResult = !moduleOpts ||
            moduleOpts.validateResult === undefined ||
            moduleOpts.validateResult === true;
        const validationOpts = Object.assign(Object.assign({}, this._opts.validation), { 
            // Set logErrors=false if validateResult=false
            logErrors: validateResult ? this._opts.validation.logErrors : false });
        /*
         * Validate the returned result (after transforming, above) and coerce types.
         *
         * The coersion works as follows: if we're expecting a "Date" type, but Yahoo
         * gives us { raw: 1231421524, fmt: "2020-01-01" }, we'll return that as
         * `new Date(1231421524 * 1000)`.
         *
         * Beyond that, ensures that user won't process unexpected data, in two
         * cases:
         *
         * a) Missing required properties or unexpected additional properties
         * b) A total new change in format that we really have no idea what to do
         *    with, e.g. a new kind of Date that we've never seen before and
         *
         * The idea is that if you receive a result, it's safe to use / store in
         * database, etc.  Otherwise you'll receive an error.
         */
        try {
            return (0, validateAndCoerceTypes_js_1.validateAndCoerceTypebox)({
                type: "result",
                data: result,
                schema: resultOpts.schema,
                options: validationOpts,
            });
        }
        catch (error) {
            if (validateResult)
                throw error;
        }
        return result;
    });
}
exports.default = moduleExec;
