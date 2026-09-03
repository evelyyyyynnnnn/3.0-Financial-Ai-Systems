"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = quoteSummary;
const typebox_1 = require("@sinclair/typebox");
const quoteSummary_iface_js_1 = require("./quoteSummary-iface.js");
const QuoteSummaryModules = typebox_1.Type.Union([
    typebox_1.Type.Literal("assetProfile"),
    typebox_1.Type.Literal("balanceSheetHistory"),
    typebox_1.Type.Literal("balanceSheetHistoryQuarterly"),
    typebox_1.Type.Literal("calendarEvents"),
    typebox_1.Type.Literal("cashflowStatementHistory"),
    typebox_1.Type.Literal("cashflowStatementHistoryQuarterly"),
    typebox_1.Type.Literal("defaultKeyStatistics"),
    typebox_1.Type.Literal("earnings"),
    typebox_1.Type.Literal("earningsHistory"),
    typebox_1.Type.Literal("earningsTrend"),
    typebox_1.Type.Literal("financialData"),
    typebox_1.Type.Literal("fundOwnership"),
    typebox_1.Type.Literal("fundPerformance"),
    typebox_1.Type.Literal("fundProfile"),
    typebox_1.Type.Literal("incomeStatementHistory"),
    typebox_1.Type.Literal("incomeStatementHistoryQuarterly"),
    typebox_1.Type.Literal("indexTrend"),
    typebox_1.Type.Literal("industryTrend"),
    typebox_1.Type.Literal("insiderHolders"),
    typebox_1.Type.Literal("insiderTransactions"),
    typebox_1.Type.Literal("institutionOwnership"),
    typebox_1.Type.Literal("majorDirectHolders"),
    typebox_1.Type.Literal("majorHoldersBreakdown"),
    typebox_1.Type.Literal("netSharePurchaseActivity"),
    typebox_1.Type.Literal("price"),
    typebox_1.Type.Literal("quoteType"),
    typebox_1.Type.Literal("recommendationTrend"),
    typebox_1.Type.Literal("secFilings"),
    typebox_1.Type.Literal("sectorTrend"),
    typebox_1.Type.Literal("summaryDetail"),
    typebox_1.Type.Literal("summaryProfile"),
    typebox_1.Type.Literal("topHoldings"),
    typebox_1.Type.Literal("upgradeDowngradeHistory"),
]);
const quoteSummaryModules = [
    "assetProfile",
    "balanceSheetHistory",
    "balanceSheetHistoryQuarterly",
    "calendarEvents",
    "cashflowStatementHistory",
    "cashflowStatementHistoryQuarterly",
    "defaultKeyStatistics",
    "earnings",
    "earningsHistory",
    "earningsTrend",
    "financialData",
    "fundOwnership",
    "fundPerformance",
    "fundProfile",
    "incomeStatementHistory",
    "incomeStatementHistoryQuarterly",
    "indexTrend",
    "industryTrend",
    "insiderHolders",
    "insiderTransactions",
    "institutionOwnership",
    "majorDirectHolders",
    "majorHoldersBreakdown",
    "netSharePurchaseActivity",
    "price",
    "quoteType",
    "recommendationTrend",
    "secFilings",
    "sectorTrend",
    "summaryDetail",
    "summaryProfile",
    "topHoldings",
    "upgradeDowngradeHistory",
];
const QuoteSummaryOptionsSchema = typebox_1.Type.Object({
    formatted: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    modules: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(QuoteSummaryModules), typebox_1.Type.Literal("all")])),
});
const queryOptionsDefaults = {
    formatted: false,
    modules: ["price", "summaryDetail"],
};
function quoteSummary(symbol, queryOptionsOverrides, moduleOptions) {
    return this._moduleExec({
        moduleName: "quoteSummary",
        query: {
            assertSymbol: symbol,
            url: "https://${YF_QUERY_HOST}/v10/finance/quoteSummary/" + symbol,
            needsCrumb: true,
            schema: QuoteSummaryOptionsSchema,
            defaults: queryOptionsDefaults,
            overrides: queryOptionsOverrides,
            transformWith(options) {
                if (typeof options === "object" &&
                    options != null &&
                    "modules" in options &&
                    options.modules === "all")
                    options.modules =
                        quoteSummaryModules;
                return options;
            },
        },
        result: {
            schema: quoteSummary_iface_js_1.QuoteSummaryResultSchema,
            transformWith(result) {
                if (!result.quoteSummary)
                    throw new Error("Unexpected result: " + JSON.stringify(result));
                return result.quoteSummary.result[0];
            },
        },
        moduleOptions,
    });
}
