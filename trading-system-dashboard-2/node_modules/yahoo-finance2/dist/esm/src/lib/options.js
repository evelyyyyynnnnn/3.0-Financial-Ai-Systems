import { ExtendedCookieJar } from "./cookieJar.js";
import { Type } from "@sinclair/typebox";
import { QueueOptionsSchema } from "./queue.js";
const LoggerSchema = Type.Object({
    info: Type.Function([], Type.Void()),
    warn: Type.Function([], Type.Void()),
    error: Type.Function([], Type.Void()),
    debug: Type.Function([], Type.Void()),
});
const ValidationOptionsSchema = Type.Object({
    logErrors: Type.Optional(Type.Boolean()),
    logOptionsErrors: Type.Optional(Type.Boolean()),
    _internalThrowOnAdditionalProperties: Type.Optional(Type.Boolean({
        default: process.env.NODE_ENV === "test",
        description: "Use this property to throw when properties beyond what is explicitly specified in the schema are provided. It is an internal option and subject to change, use at your own risk",
    })),
});
export const YahooFinanceOptionsSchema = Type.Object({
    YF_QUERY_HOST: Type.Optional(Type.String()),
    cookieJar: Type.Optional(Type.Any()),
    queue: Type.Optional(QueueOptionsSchema),
    validation: Type.Optional(ValidationOptionsSchema),
    logger: Type.Optional(LoggerSchema),
}, { title: "YahooFinanceOptions" });
const options = {
    YF_QUERY_HOST: process.env.YF_QUERY_HOST || "query2.finance.yahoo.com",
    cookieJar: new ExtendedCookieJar(),
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
export default options;
