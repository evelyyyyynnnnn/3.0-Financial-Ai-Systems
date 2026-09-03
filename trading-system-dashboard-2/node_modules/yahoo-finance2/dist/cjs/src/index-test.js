"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_common_js_1 = __importDefault(require("./index-common.js"));
const env_test_js_1 = __importDefault(require("./env-test.js"));
index_common_js_1.default._env = env_test_js_1.default;
exports.default = index_common_js_1.default;
