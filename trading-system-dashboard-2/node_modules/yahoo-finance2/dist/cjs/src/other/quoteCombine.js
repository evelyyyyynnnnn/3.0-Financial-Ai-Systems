"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = quoteCombine;
const validateAndCoerceTypes_js_1 = require("../lib/validateAndCoerceTypes.js");
const quote_js_1 = __importStar(require("../modules/quote.js"));
const DEBOUNCE_TIME = 50;
const slugMap = new Map();
function quoteCombine(query, queryOptionsOverrides = {}, moduleOptions) {
    const symbol = query;
    if (typeof symbol !== "string")
        throw new Error("quoteCombine expects a string query parameter, received: " +
            JSON.stringify(symbol, null, 2));
    (0, validateAndCoerceTypes_js_1.validateAndCoerceTypebox)({
        type: "options",
        data: queryOptionsOverrides,
        schema: quote_js_1.QuoteOptionsSchema,
        options: this._opts.validation,
    });
    // Make sure we only combine requests with same options
    const slug = JSON.stringify(queryOptionsOverrides);
    let entry = slugMap.get(slug);
    if (!entry) {
        entry = {
            timeout: null,
            queryOptionsOverrides,
            symbols: new Map(),
        };
        slugMap.set(slug, entry);
    }
    if (entry.timeout)
        clearTimeout(entry.timeout);
    const thisQuote = quote_js_1.default.bind(this);
    return new Promise((resolve, reject) => {
        let symbolPromiseCallbacks = entry.symbols.get(symbol);
        /* istanbul ignore else */
        if (!symbolPromiseCallbacks) {
            symbolPromiseCallbacks = [];
            entry.symbols.set(symbol, symbolPromiseCallbacks);
        }
        symbolPromiseCallbacks.push({ resolve, reject });
        entry.timeout = setTimeout(() => {
            slugMap.delete(slug);
            const symbols = Array.from(entry.symbols.keys());
            // @ts-ignore
            thisQuote(symbols, queryOptionsOverrides, moduleOptions)
                .then((results) => {
                for (const result of results) {
                    for (const promise of entry.symbols.get(result.symbol)) {
                        promise.resolve(result);
                        promise.resolved = true;
                    }
                }
                // Check for symbols we asked for and didn't get back,
                // e.g. non-existent symbols (#150)
                for (const [_, promises] of entry.symbols) {
                    for (const promise of promises) {
                        if (!promise.resolved) {
                            promise.resolve(undefined);
                        }
                    }
                }
            })
                .catch((error) => {
                for (const symbolPromiseCallbacks of entry.symbols.values())
                    for (const promise of symbolPromiseCallbacks)
                        promise.reject(error);
            });
        }, DEBOUNCE_TIME);
    });
}
