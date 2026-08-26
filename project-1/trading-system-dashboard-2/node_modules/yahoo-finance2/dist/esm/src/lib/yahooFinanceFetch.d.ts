import type { YahooFinanceOptions } from "./options.js";
import type { QueueOptions } from "./queue.js";
interface YahooFinanceFetchThisEnv {
    [key: string]: any;
    URLSearchParams: (init?: any) => any;
    fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
    fetchDevel: () => Promise<(url: RequestInfo, init?: RequestInit) => Promise<Response>>;
}
interface YahooFinanceFetchThis {
    [key: string]: any;
    _env: YahooFinanceFetchThisEnv;
    _opts: YahooFinanceOptions;
}
interface YahooFinanceFetchModuleOptions {
    devel?: string | boolean;
    fetchOptions?: RequestInit;
    queue?: QueueOptions;
}
declare function substituteVariables(this: YahooFinanceFetchThis, urlBase: string): string;
declare function yahooFinanceFetch(this: YahooFinanceFetchThis, urlBase: string, params?: Record<string, string>, moduleOpts?: YahooFinanceFetchModuleOptions, func?: string, needsCrumb?: boolean): Promise<any>;
export { substituteVariables };
export default yahooFinanceFetch;
