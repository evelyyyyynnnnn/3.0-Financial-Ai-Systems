import Queue from "./queue.js";
import errors from "./errors.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: we have to ignore this for csm output.assert
import pkg from "../../package.json" with { type: "json" };
import getCrumb from "./getCrumb.js";
const userAgent = `${pkg.name}/${pkg.version} (+${pkg.repository})`;
const _queue = new Queue();
function assertQueueOptions(queue, opts) {
    opts; //?
    if (typeof opts.concurrency === "number" &&
        queue.concurrency !== opts.concurrency)
        queue.concurrency = opts.concurrency;
    if (typeof opts.timeout === "number" && queue.timeout !== opts.timeout)
        queue.timeout = opts.timeout;
}
function substituteVariables(urlBase) {
    return urlBase.replace(/\$\{([^}]+)\}/g, (match, varName) => {
        if (varName === "YF_QUERY_HOST") {
            // const hosts = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"];
            // return hosts[Math.floor(Math.random() * hosts.length)];
            return this._opts.YF_QUERY_HOST || "query2.finance.yahoo.com";
        }
        else {
            // i.e. return unsubstituted original variable expression ${VAR}
            return match;
        }
    });
}
async function yahooFinanceFetch(urlBase, params = {}, moduleOpts = {}, func = "json", needsCrumb = false) {
    var _a;
    if (!(this && this._env))
        throw new errors.NoEnvironmentError("yahooFinanceFetch called without this._env set");
    // TODO: adds func type to json schema which is not supported
    //const queue = moduleOpts.queue?._queue || _queue;
    const queue = _queue;
    assertQueueOptions(queue, { ...this._opts.queue, ...moduleOpts.queue });
    const { URLSearchParams, fetch, fetchDevel } = this._env;
    /* istanbul ignore next */
    // no need to force coverage on real network request.
    const fetchFunc = moduleOpts.devel ? await fetchDevel() : fetch;
    const fetchOptionsBase = {
        ...moduleOpts.fetchOptions,
        devel: moduleOpts.devel,
        headers: {
            "User-Agent": userAgent,
            ...(_a = moduleOpts.fetchOptions) === null || _a === void 0 ? void 0 : _a.headers,
        },
    };
    if (needsCrumb) {
        if (!this._opts.cookieJar)
            throw new Error("No cookieJar set");
        if (!this._opts.logger)
            throw new Error("Logger was unset.");
        const crumb = await getCrumb(this._opts.cookieJar, fetchFunc, fetchOptionsBase, this._opts.logger);
        if (crumb)
            params.crumb = crumb;
    }
    // @ts-expect-error: TODO copy interface? @types lib?
    const urlSearchParams = new URLSearchParams(params);
    const url = substituteVariables.call(this, urlBase) + "?" + urlSearchParams.toString();
    // console.log(url);
    // console.log(cookieJar.serializeSync());
    if (!this._opts.cookieJar)
        throw new Error("No cookieJar set");
    const fetchOptions = {
        ...fetchOptionsBase,
        headers: {
            ...fetchOptionsBase.headers,
            cookie: await this._opts.cookieJar.getCookieString(url, {
                allPaths: true,
            }),
        },
    };
    // console.log("fetch", url, fetchOptions);
    // used in moduleExec.ts
    if (func === "csv")
        func = "text";
    const response = (await queue.add(() => fetchFunc(url, fetchOptions)));
    const setCookieHeaders = response.headers.getSetCookie();
    if (setCookieHeaders) {
        if (!this._opts.cookieJar)
            throw new Error("No cookieJar set");
        this._opts.cookieJar.setFromSetCookieHeaders(setCookieHeaders, url);
    }
    const result = await response[func]();
    /*
      {
        finance: {  // or quoteSummary, or any other single key
          result: null,
          error: {
            code: 'Bad Request',
            description: 'Missing required query parameter=q'
          }
        }
      }
     */
    if (func === "json") {
        const keys = Object.keys(result);
        if (keys.length === 1) {
            const errorObj = result[keys[0]].error;
            if (errorObj) {
                const errorName = errorObj.code.replace(/ /g, "") + "Error";
                const ErrorClass = errors[errorName] || Error;
                throw new ErrorClass(errorObj.description);
            }
        }
    }
    // We do this last as it generally contains less information (e.g. no desc).
    if (!response.ok) {
        console.error(url);
        const error = new errors.HTTPError(response.statusText);
        error.code = response.status;
        throw error;
    }
    return result;
}
export { substituteVariables };
export default yahooFinanceFetch;
