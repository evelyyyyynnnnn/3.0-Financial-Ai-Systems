"use strict";
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
exports.default = setGlobalConfig;
const options_js_1 = require("./options.js");
const validateAndCoerceTypes_js_1 = __importDefault(require("./validateAndCoerceTypes.js"));
const cookieJar_js_1 = require("./cookieJar.js");
function setGlobalConfig(_config) {
    const parsed = (0, validateAndCoerceTypes_js_1.default)({
        data: _config,
        type: "options",
        options: this._opts.validation,
        schema: options_js_1.YahooFinanceOptionsSchema,
    });
    // Instances (e.g. cookieJar) don't validate well :)
    const { cookieJar } = parsed, config = __rest(parsed, ["cookieJar"]);
    mergeObjects(this._opts, config);
    if (cookieJar) {
        if (!(cookieJar instanceof cookieJar_js_1.ExtendedCookieJar))
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
