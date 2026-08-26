import { TSchema } from "@sinclair/typebox";
interface ModuleExecOptions<TOpts, TResult> {
    /**
     * Name of the module, e.g. "search", "quoteSummary", etc.  Used in error
     * reporting.
     */
    moduleName: string;
    query: {
        /**
         * If given, a runtime assertion is performed to check that the given
         * argument is a string.  If not, a helpful error is thrown.
         */
        assertSymbol?: string;
        /**
         * URL of the API to query, WITHOUT query params.
         */
        url: string;
        /**
         * The schema to use to validate the options overrides
         */
        schema: TSchema;
        /**
         * Defaults for this query, e.g. { period: '1d' } in history,
         * and other required options that aren't often changed { locale: 'en' }.
         */
        defaults: any;
        /**
         * Query parameters generated inside the module, most commonly something
         * like { q: query } to take e.g. yf.search(query) and pass it how Yahoo
         * expects it.
         */
        runtime?: any;
        /**
         * Query options passed by the user that will override the default and
         * runtime params.  Will be validated with schemaKey.
         */
        overrides: any;
        /**
         * Called with the merged (defaults,runtime,overrides) before running
         * the query.  Useful to transform options we allow but not Yahoo, e.g.
         * allow a "2020-01-01" date but transform this to a UNIX epoch.
         */
        transformWith?: (opts: TOpts) => unknown;
        /**
         * Default: 'json'.  Can be 'text' or 'csv' (augments fetch's "text").
         */
        fetchType?: string;
        /**
         * Default: false.  This request requires Yahoo cookies & crumb.
         */
        needsCrumb?: boolean;
    };
    result: {
        /**
         * The schema to validate (and coerce) the retruned result from Yahoo.
         */
        schema: TSchema;
        /**
         * Mutate the Yahoo result *before* validating and coercion.  Mostly used
         * to e.g. throw if no (resault.returnField) and return result.returnField.
         */
        transformWith?: (result: unknown) => TResult;
    };
    moduleOptions?: {
        /**
         * Allow validation failures to pass if false;
         */
        validateResult?: boolean;
        /**
         * Any options to pass to fetch() just for this request.
         */
        fetchOptions?: any;
    };
}
declare function moduleExec<TOpts = unknown, TResult = unknown>(this: {
    [key: string]: any;
}, opts: ModuleExecOptions<TOpts, TResult>): Promise<any>;
export default moduleExec;
