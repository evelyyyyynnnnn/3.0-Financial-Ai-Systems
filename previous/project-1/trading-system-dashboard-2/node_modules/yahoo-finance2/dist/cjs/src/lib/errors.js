"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedYahooValidationError = exports.NoEnvironmentError = exports.InvalidOptionsError = exports.HTTPError = exports.BadRequestError = void 0;
// Yahoo's servers returned an HTTP 400 for this request.
class BadRequestError extends Error {
    constructor() {
        super(...arguments);
        this.name = "BadRequestError";
    }
}
exports.BadRequestError = BadRequestError;
// Yahoo's servers returned a 'not-ok' status for this request.
// https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
class HTTPError extends Error {
    constructor() {
        super(...arguments);
        this.name = "HTTPError";
    }
}
exports.HTTPError = HTTPError;
// A YahooFinance method was called with invalid options.
class InvalidOptionsError extends Error {
    constructor() {
        super(...arguments);
        this.name = "InvalidOptionsError";
    }
}
exports.InvalidOptionsError = InvalidOptionsError;
// An internal method yahooFinanceFetch() was called without this._env set.
class NoEnvironmentError extends Error {
    constructor() {
        super(...arguments);
        this.name = "NoEnvironmentError";
    }
}
exports.NoEnvironmentError = NoEnvironmentError;
class FailedYahooValidationError extends Error {
    constructor(message, { result, errors }) {
        super(message);
        this.name = "FailedYahooValidationError";
        this.result = result;
        this.errors = errors;
    }
}
exports.FailedYahooValidationError = FailedYahooValidationError;
const errors = {
    BadRequestError,
    HTTPError,
    InvalidOptionsError,
    NoEnvironmentError,
    FailedYahooValidationError,
};
exports.default = errors;
