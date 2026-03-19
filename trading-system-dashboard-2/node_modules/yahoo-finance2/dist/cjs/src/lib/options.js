"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YahooFinanceOptionsSchema = void 0;
const cookieJar_js_1 = require("./cookieJar.js");
const typebox_1 = require("@sinclair/typebox");
const queue_js_1 = require("./queue.js");
const LoggerSchema = typebox_1.Type.Object({
    info: typebox_1.Type.Function([], typebox_1.Type.Void()),
    warn: typebox_1.Type.Function([], typebox_1.Type.Void()),
    error: typebox_1.Type.Function([], typebox_1.Type.Void()),
    debug: typebox_1.Type.Function([], typebox_1.Type.Void()),
});
const ValidationOptionsSchema = typebox_1.Type.Object({
    logErrors: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    logOptionsErrors: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    _internalThrowOnAdditionalProperties: typebox_1.Type.Optional(typebox_1.Type.Boolean({
        default: process.env.NODE_ENV === "test",
        description: "Use this property to throw when properties beyond what is explicitly specified in the schema are provided. It is an internal option and subject to change, use at your own risk",
    })),
});
exports.YahooFinanceOptionsSchema = typebox_1.Type.Object({
    YF_QUERY_HOST: typebox_1.Type.Optional(typebox_1.Type.String()),
    cookieJar: typebox_1.Type.Optional(typebox_1.Type.Any()),
    queue: typebox_1.Type.Optional(queue_js_1.QueueOptionsSchema),
    validation: typebox_1.Type.Optional(ValidationOptionsSchema),
    logger: typebox_1.Type.Optional(LoggerSchema),
}, { title: "YahooFinanceOptions" });
const options = {
    YF_QUERY_HOST: process.env.YF_QUERY_HOST || "query2.finance.yahoo.com",
    cookieJar: new cookieJar_js_1.ExtendedCookieJar(),
    queue: {
        concurrency: 4, // Min: 1, Max: Infinity
        timeout: 60,
    },
    validation: {
        logErrors: true,
        logOptionsErrors: true,
    },
    logger: {
        info: (...args) => console.log(...args),
        warn: (...args) => console.warn(...args),
        error: (...args) => console.error(...args),
        debug: (...args) => console.log(...args),
    },
};
exports.default = options;
