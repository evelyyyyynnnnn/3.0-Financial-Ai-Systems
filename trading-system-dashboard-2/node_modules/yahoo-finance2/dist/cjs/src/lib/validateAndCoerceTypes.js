"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndCoerceTypebox = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: we have to ignore this for csm output.
const package_json_1 = __importDefault(require("../../package.json"));
const errors_js_1 = require("./errors.js");
const value_1 = require("@sinclair/typebox/value");
function logRelevantErrorInfo(e) {
    const { /* schema, */ error /* , value */ } = e;
    console.log(JSON.stringify(error, null, 2));
}
const handleResultError = (e, options) => {
    const title = e.schema.title;
    if (options.logErrors) {
        logRelevantErrorInfo(e);
        console.log(`
    This may happen intermittently and you should catch errors appropriately.
    However:  1) if this recently started happening on every request for a symbol
    that used to work, Yahoo may have changed their API.  2) If this happens on
    every request for a symbol you've never used before, but not for other
    symbols, you've found an edge-case (OR, we may just be protecting you from
    "bad" data sometimes stored for e.g. misspelt symbols on Yahoo's side).
    Please see if anyone has reported this previously:
    
      ${package_json_1.default.repository}/issues?q=is%3Aissue+${title}
    
    or open a new issue (and mention the symbol):  ${package_json_1.default.name} v${package_json_1.default.version}
    
      ${package_json_1.default.repository}/issues/new?labels=bug%2C+validation&template=validation.md&title=${title}
    
    For information on how to turn off the above logging or skip these errors,
    see https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs/validation.md.
    
    At the end of the doc, there's also a section on how to
    [Help Fix Validation Errors](https://github.com/gadicc/node-yahoo-finance2/blob/devel/docs/validation.md#help-fix)
    in case you'd like to contribute to the project.  Most of the time, these
    fixes are very quick and easy; it's just hard for our small core team to keep up,
    so help is always appreciated!
    `);
    }
    throw new errors_js_1.FailedYahooValidationError("Failed Yahoo Schema validation", {
        result: e.value,
        errors: [e],
    });
};
const handleOptionsError = (e, { logOptionsErrors }) => {
    if (logOptionsErrors) {
        console.error(`[yahooFinance] Invalid options ("${JSON.stringify(e.error, null, 2)}")`);
    }
    throw new errors_js_1.InvalidOptionsError("Validation called with invalid options");
};
const validateAndCoerceTypebox = ({ type, data, schema, options, }) => {
    try {
        const validationSchema = options._internalThrowOnAdditionalProperties
            ? Object.assign(Object.assign({}, schema), { additionalProperties: false }) : schema;
        return value_1.Value.Decode(validationSchema, data);
    }
    catch (e) {
        if (e instanceof value_1.TransformDecodeError ||
            e instanceof value_1.TransformDecodeCheckError) {
            // TODO: The existing implementation of 'validate' assumes that the `type` parameter may not be provided
            // and defaults to validating the options if it is not.
            // We should probably explore validating this further up in the call chain.
            // It'd be nice to do this in the body of a module (e.g. search) so that we can avoid
            // polluting core code with type checks and edge cases
            type === "result"
                ? handleResultError(e, options)
                : handleOptionsError(e, options);
        }
        throw e;
    }
};
exports.validateAndCoerceTypebox = validateAndCoerceTypebox;
exports.default = exports.validateAndCoerceTypebox;
