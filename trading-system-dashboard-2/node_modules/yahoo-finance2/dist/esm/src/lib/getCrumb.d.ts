import type { ExtendedCookieJar } from "./cookieJar";
import { Logger } from "./options.js";
type CrumbOptions = RequestInit & {
    devel?: boolean | string;
};
export declare function _getCrumb(cookieJar: ExtendedCookieJar, fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>, fetchOptionsBase: CrumbOptions, logger: Logger, url?: string, develOverride?: string, noCache?: boolean): Promise<string | null>;
export declare function getCrumbClear(cookieJar: ExtendedCookieJar): Promise<void>;
export default function getCrumb(cookieJar: ExtendedCookieJar, fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>, fetchOptionsBase: CrumbOptions, logger: Logger, url?: string, __getCrumb?: typeof _getCrumb): Promise<string | null>;
export {};
