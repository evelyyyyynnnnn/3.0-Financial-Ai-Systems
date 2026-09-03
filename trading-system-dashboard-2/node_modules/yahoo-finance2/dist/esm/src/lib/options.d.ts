import { ExtendedCookieJar } from "./cookieJar.js";
import { Static } from "@sinclair/typebox";
export type Logger = {
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    debug: (...args: any[]) => void;
};
declare const ValidationOptionsSchema: import("@sinclair/typebox").TObject<{
    logErrors: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    logOptionsErrors: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    _internalThrowOnAdditionalProperties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type ValidationOptions = Static<typeof ValidationOptionsSchema>;
export declare const YahooFinanceOptionsSchema: import("@sinclair/typebox").TObject<{
    YF_QUERY_HOST: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    cookieJar: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    queue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        concurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>>;
    validation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        logErrors: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        logOptionsErrors: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        _internalThrowOnAdditionalProperties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>>;
    logger: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        info: import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TVoid>;
        warn: import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TVoid>;
        error: import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TVoid>;
        debug: import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TVoid>;
    }>>;
}>;
export type YahooFinanceOptions = Static<typeof YahooFinanceOptionsSchema> & {
    cookieJar?: ExtendedCookieJar;
    logger?: Logger;
};
declare const options: YahooFinanceOptions;
export default options;
