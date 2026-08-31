import { CookieJar } from "tough-cookie";
export declare class ExtendedCookieJar extends CookieJar {
    setFromSetCookieHeaders(setCookieHeader: string | Array<string>, url: string): Promise<void>;
}
