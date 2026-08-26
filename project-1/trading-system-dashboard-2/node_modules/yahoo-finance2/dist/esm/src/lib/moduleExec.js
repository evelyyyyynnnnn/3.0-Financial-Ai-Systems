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
import { validateAndCoerceTypebox } from "./validateAndCoerceTypes.js";
import csv2json from "./csv2json.js";
async function moduleExec(opts) {
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
    validateAndCoerceTypebox({
        type: "options",
        data: (_a = queryOpts.overrides) !== null && _a !== void 0 ? _a : {},
        schema: queryOpts.schema,
        options: this._opts.validation,
    });
    let queryOptions = {
        ...queryOpts.defaults, // Module defaults e.g. { period: '1wk', lang: 'en' }
        ...queryOpts.runtime, // Runtime params e.g. { q: query }
        ...queryOpts.overrides, // User supplied options that override above
    };
    /*
     * Called with the merged (defaults,runtime,overrides) before running
     * the query.  Useful to transform options we allow but not Yahoo, e.g.
     * allow a "2020-01-01" date but transform this to a UNIX epoch.
     */
    if (queryOpts.transformWith) {
        queryOptions = queryOpts.transformWith(queryOptions);
    }
    // this._fetch is lib/yahooFinanceFetch
    let result = await this._fetch(queryOpts.url, queryOptions, moduleOpts, queryOpts.fetchType, (_b = queryOpts.needsCrumb) !== null && _b !== void 0 ? _b : false);
    if (queryOpts.fetchType === "csv") {
        result = csv2json(result);
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
    const validationOpts = {
        ...this._opts.validation,
        // Set logErrors=false if validateResult=false
        logErrors: validateResult ? this._opts.validation.logErrors : false,
    };
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
        return validateAndCoerceTypebox({
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
}
export default moduleExec;
