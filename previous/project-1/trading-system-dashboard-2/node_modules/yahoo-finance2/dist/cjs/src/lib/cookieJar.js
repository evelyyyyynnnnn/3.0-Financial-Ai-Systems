"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedCookieJar = void 0;
const tough_cookie_1 = require("tough-cookie");
class ExtendedCookieJar extends tough_cookie_1.CookieJar {
    setFromSetCookieHeaders(setCookieHeader, url) {
        return __awaiter(this, void 0, void 0, function* () {
            let cookies;
            // console.log("setFromSetCookieHeaders", setCookieHeader);
            if (typeof setCookieHeader === "undefined") {
                // no-op
            }
            else if (setCookieHeader instanceof Array) {
                cookies = setCookieHeader.map((header) => tough_cookie_1.Cookie.parse(header));
            }
            else if (typeof setCookieHeader === "string") {
                cookies = [tough_cookie_1.Cookie.parse(setCookieHeader)];
            }
            if (cookies)
                for (const cookie of cookies)
                    if (cookie instanceof tough_cookie_1.Cookie) {
                        // console.log("setCookieSync", cookie, url);
                        yield this.setCookie(cookie, url);
                    }
        });
    }
}
exports.ExtendedCookieJar = ExtendedCookieJar;
