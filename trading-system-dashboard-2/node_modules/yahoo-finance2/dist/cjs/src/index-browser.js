"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_common_js_1 = __importDefault(require("./index-common.js"));
const env_browser_js_1 = __importDefault(require("./env-browser.js"));
index_common_js_1.default._env = env_browser_js_1.default;
// NOTE: The repo name is hardcoded, see #167
console.warn("⚠️ WARNING! This package (i.e. `yahoo-finance2`) is being used in the browser.", "Trying to use this may not work because of CORS. Be aware of that (and don't file issues for help with that).", "You can use a proxy to make CORS errors disappear, but we will not help you with that.", "Please read the README (https://github.com/gadicc/node-yahoo-finance2) for more details.");
exports.default = index_common_js_1.default;
