import { YahooFinanceOptionsSchema, } from "./options.js";
import validateAndCoerceTypes from "./validateAndCoerceTypes.js";
import { ExtendedCookieJar } from "./cookieJar.js";
export default function setGlobalConfig(_config) {
    const parsed = validateAndCoerceTypes({
        data: _config,
        type: "options",
        options: this._opts.validation,
        schema: YahooFinanceOptionsSchema,
    });
    // Instances (e.g. cookieJar) don't validate well :)
    const { cookieJar, ...config } = parsed;
    mergeObjects(this._opts, config);
    if (cookieJar) {
        if (!(cookieJar instanceof ExtendedCookieJar))
            throw new Error("cookieJar must be an instance of ExtendedCookieJar");
        this._opts.cookieJar = cookieJar;
    }
}
function mergeObjects(original, objToMerge) {
    const ownKeys = Reflect.ownKeys(objToMerge);
    for (const key of ownKeys) {
        if (typeof objToMerge[key] === "object") {
            mergeObjects(original[key], objToMerge[key]);
        }
        else {
            original[key] = objToMerge[key];
        }
    }
}
