"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNotice = showNotice;
exports.suppressNotices = suppressNotices;
const options_js_1 = __importDefault(require("./options.js"));
const logger = options_js_1.default.logger || console;
const notices = {
    yahooSurvey: {
        id: "yahooSurvey",
        text: "Please consider completing the survey at https://bit.ly/yahoo-finance-api-feedback " +
            "if you haven't already; for more info see " +
            "https://github.com/gadicc/node-yahoo-finance2/issues/764#issuecomment-2056623851.",
        onceOnly: true,
    },
    ripHistorical: {
        id: "ripHistorical",
        text: "[Deprecated] historical() relies on an API that Yahoo have removed.  We'll " +
            "map this request to chart() for convenience, but, please consider using " +
            "chart() directly instead; for more info see " +
            "https://github.com/gadicc/node-yahoo-finance2/issues/795.",
        level: "warn",
        onceOnly: true,
    },
};
function showNotice(id) {
    const n = notices[id];
    if (!n)
        throw new Error(`Unknown notice id: ${id}`);
    if (n.suppress)
        return;
    if (n.onceOnly)
        n.suppress = true;
    const text = n.text +
        (n.onceOnly ? "  This will only be shown once, but you" : "You") +
        " can suppress this message in future with `yahooFinance.suppressNotices(['" +
        id +
        "'])`.";
    const level = n.level || "info";
    logger[level](text);
}
function suppressNotices(noticeIds) {
    noticeIds.forEach((id) => {
        const n = notices[id];
        if (!n)
            logger.error(`Unknown notice id: ${id}`);
        n.suppress = true;
    });
}
