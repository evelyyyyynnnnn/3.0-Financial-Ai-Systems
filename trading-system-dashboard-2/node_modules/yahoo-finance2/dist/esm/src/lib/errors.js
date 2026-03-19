// Yahoo's servers returned an HTTP 400 for this request.
export class BadRequestError extends Error {
    constructor() {
        super(...arguments);
        this.name = "BadRequestError";
    }
}
// Yahoo's servers returned a 'not-ok' status for this request.
// https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
export class HTTPError extends Error {
    constructor() {
        super(...arguments);
        this.name = "HTTPError";
    }
}
// A YahooFinance method was called with invalid options.
export class InvalidOptionsError extends Error {
    constructor() {
        super(...arguments);
        this.name = "InvalidOptionsError";
    }
}
// An internal method yahooFinanceFetch() was called without this._env set.
export class NoEnvironmentError extends Error {
    constructor() {
        super(...arguments);
        this.name = "NoEnvironmentError";
    }
}
export class FailedYahooValidationError extends Error {
    constructor(message, { result, errors }) {
        super(message);
        this.name = "FailedYahooValidationError";
        this.result = result;
        this.errors = errors;
    }
}
const errors = {
    BadRequestError,
    HTTPError,
    InvalidOptionsError,
    NoEnvironmentError,
    FailedYahooValidationError,
};
export default errors;
