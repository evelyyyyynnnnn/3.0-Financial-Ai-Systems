import { URLSearchParams } from "url";
declare function fetchDevel(): Promise<(url: RequestInfo, init?: RequestInit) => Promise<Response>>;
declare const _default: {
    fetch: typeof fetch;
    fetchDevel: typeof fetchDevel;
    URLSearchParams: typeof URLSearchParams;
};
export default _default;
