"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedCookieJar = void 0;
const index_common_js_1 = __importDefault(require("./index-common.js"));
const env_node_js_1 = __importDefault(require("./env-node.js"));
const cookieJar_js_1 = require("./lib/cookieJar.js");
Object.defineProperty(exports, "ExtendedCookieJar", { enumerable: true, get: function () { return cookieJar_js_1.ExtendedCookieJar; } });
index_common_js_1.default._env = env_node_js_1.default;
exports.default = index_common_js_1.default;
