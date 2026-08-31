"use strict";
/// <reference lib="DOM" />
Object.defineProperty(exports, "__esModule", { value: true });
function fetchDevel() {
    throw new Error("{ devel: true } not suported in the browser");
}
exports.default = {
    fetch,
    fetchDevel,
    URLSearchParams,
};
