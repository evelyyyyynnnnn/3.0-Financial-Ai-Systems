import { TransformDecodeError, TransformDecodeCheckError } from "@sinclair/typebox/build/cjs/value";
export declare class BadRequestError extends Error {
    name: string;
}
type ValidationError = TransformDecodeError | TransformDecodeCheckError;
export declare class HTTPError extends Error {
    name: string;
}
export declare class InvalidOptionsError extends Error {
    name: string;
}
export declare class NoEnvironmentError extends Error {
    name: string;
}
export declare class FailedYahooValidationError extends Error {
    name: string;
    result: any;
    errors?: null | ValidationError[];
    constructor(message: string, { result, errors }: {
        result: any;
        errors?: null | ValidationError[];
    });
}
type ErrorsIndex = {
    [key: string]: any;
};
declare const errors: ErrorsIndex;
export default errors;
