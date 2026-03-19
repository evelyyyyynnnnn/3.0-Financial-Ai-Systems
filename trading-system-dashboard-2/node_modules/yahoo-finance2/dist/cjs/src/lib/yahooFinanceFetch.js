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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.substituteVariables = substituteVariables;
const queue_js_1 = __importDefault(require("./queue.js"));
const errors_js_1 = __importDefault(require("./errors.js"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: we have to ignore this for csm output.assert
const package_json_1 = __importDefault(require("../../package.json"));
const getCrumb_js_1 = __importDefault(require("./getCrumb.js"));
const userAgent = `${package_json_1.default.name}/${package_json_1.default.version} (+${package_json_1.default.repository})`;
const _queue = new queue_js_1.default();
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
function yahooFinanceFetch(urlBase_1) {
    return __awaiter(this, arguments, void 0, function* (urlBase, params = {}, moduleOpts = {}, func = "json", needsCrumb = false) {
        var _a;
        if (!(this && this._env))
            throw new errors_js_1.default.NoEnvironmentError("yahooFinanceFetch called without this._env set");
        // TODO: adds func type to json schema which is not supported
        //const queue = moduleOpts.queue?._queue || _queue;
        const queue = _queue;
        assertQueueOptions(queue, Object.assign(Object.assign({}, this._opts.queue), moduleOpts.queue));
        const { URLSearchParams, fetch, fetchDevel } = this._env;
        /* istanbul ignore next */
        // no need to force coverage on real network request.
        const fetchFunc = moduleOpts.devel ? yield fetchDevel() : fetch;
        const fetchOptionsBase = Object.assign(Object.assign({}, moduleOpts.fetchOptions), { devel: moduleOpts.devel, headers: Object.assign({ "User-Agent": userAgent }, (_a = moduleOpts.fetchOptions) === null || _a === void 0 ? void 0 : _a.headers) });
        if (needsCrumb) {
            if (!this._opts.cookieJar)
                throw new Error("No cookieJar set");
            if (!this._opts.logger)
                throw new Error("Logger was unset.");
            const crumb = yield (0, getCrumb_js_1.default)(this._opts.cookieJar, fetchFunc, fetchOptionsBase, this._opts.logger);
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
        const fetchOptions = Object.assign(Object.assign({}, fetchOptionsBase), { headers: Object.assign(Object.assign({}, fetchOptionsBase.headers), { cookie: yield this._opts.cookieJar.getCookieString(url, {
                    allPaths: true,
                }) }) });
        // console.log("fetch", url, fetchOptions);
        // used in moduleExec.ts
        if (func === "csv")
            func = "text";
        const response = (yield queue.add(() => fetchFunc(url, fetchOptions)));
        const setCookieHeaders = response.headers.getSetCookie();
        if (setCookieHeaders) {
            if (!this._opts.cookieJar)
                throw new Error("No cookieJar set");
            this._opts.cookieJar.setFromSetCookieHeaders(setCookieHeaders, url);
        }
        const result = yield response[func]();
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
                    const ErrorClass = errors_js_1.default[errorName] || Error;
                    throw new ErrorClass(errorObj.description);
                }
            }
        }
        // We do this last as it generally contains less information (e.g. no desc).
        if (!response.ok) {
            console.error(url);
            const error = new errors_js_1.default.HTTPError(response.statusText);
            error.code = response.status;
            throw error;
        }
        return result;
    });
}
exports.default = yahooFinanceFetch;
