import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
import { StaticDecode } from "@sinclair/typebox";
declare const InsightsOutlookSchema: import("@sinclair/typebox").TObject<{
    stateDescription: import("@sinclair/typebox").TString;
    direction: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>;
    score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    scoreDescription: import("@sinclair/typebox").TString;
    sectorDirection: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>>;
    sectorScore: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    sectorScoreDescription: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    indexDirection: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>;
    indexScore: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    indexScoreDescription: import("@sinclair/typebox").TString;
}>;
declare const InsightsResultSchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    instrumentInfo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        keyTechnicals: import("@sinclair/typebox").TObject<{
            provider: import("@sinclair/typebox").TString;
            support: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            resistance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            stopLoss: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        technicalEvents: import("@sinclair/typebox").TObject<{
            provider: import("@sinclair/typebox").TString;
            sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            shortTermOutlook: import("@sinclair/typebox").TObject<{
                stateDescription: import("@sinclair/typebox").TString;
                direction: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>;
                score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                scoreDescription: import("@sinclair/typebox").TString;
                sectorDirection: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>>;
                sectorScore: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                sectorScoreDescription: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                indexDirection: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>;
                indexScore: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                indexScoreDescription: import("@sinclair/typebox").TString;
            }>;
            intermediateTermOutlook: import("@sinclair/typebox").TObject<{
                stateDescription: import("@sinclair/typebox").TString;
                direction: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>;
                score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                scoreDescription: import("@sinclair/typebox").TString;
                sectorDirection: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>>;
                sectorScore: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                sectorScoreDescription: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                indexDirection: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>;
                indexScore: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                indexScoreDescription: import("@sinclair/typebox").TString;
            }>;
            longTermOutlook: import("@sinclair/typebox").TObject<{
                stateDescription: import("@sinclair/typebox").TString;
                direction: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>;
                score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                scoreDescription: import("@sinclair/typebox").TString;
                sectorDirection: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>>;
                sectorScore: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                sectorScoreDescription: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                indexDirection: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bearish">, import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">]>;
                indexScore: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                indexScoreDescription: import("@sinclair/typebox").TString;
            }>;
        }>;
        valuation: import("@sinclair/typebox").TObject<{
            color: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            discount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            provider: import("@sinclair/typebox").TString;
            relativeValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>;
    }>>;
    companySnapshot: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        sectorInfo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        company: import("@sinclair/typebox").TObject<{
            innovativeness: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            hiring: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            sustainability: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            insiderSentiments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            earningsReports: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            dividends: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        sector: import("@sinclair/typebox").TObject<{
            innovativeness: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            hiring: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            sustainability: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            insiderSentiments: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            earningsReports: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            dividends: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>;
    }>>;
    recommendation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        targetPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        provider: import("@sinclair/typebox").TString;
        rating: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"BUY">, import("@sinclair/typebox").TLiteral<"SELL">, import("@sinclair/typebox").TLiteral<"HOLD">]>;
    }>>;
    events: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        eventType: import("@sinclair/typebox").TString;
        pricePeriod: import("@sinclair/typebox").TString;
        tradingHorizon: import("@sinclair/typebox").TString;
        tradeType: import("@sinclair/typebox").TString;
        imageUrl: import("@sinclair/typebox").TString;
        startDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    }>>>;
    reports: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        headHtml: import("@sinclair/typebox").TString;
        provider: import("@sinclair/typebox").TString;
        reportDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        reportTitle: import("@sinclair/typebox").TString;
        reportType: import("@sinclair/typebox").TString;
        targetPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        targetPriceStatus: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Increased">, import("@sinclair/typebox").TLiteral<"Maintained">, import("@sinclair/typebox").TLiteral<"Decreased">, import("@sinclair/typebox").TLiteral<"-">]>>;
        investmentRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">, import("@sinclair/typebox").TLiteral<"Bearish">]>>;
        tickers: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    }>>>;
    sigDevs: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        headline: import("@sinclair/typebox").TString;
        date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    }>>>;
    upsell: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        msBullishSummary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        msBearishSummary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        msBullishBearishSummariesPublishDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        companyName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        upsellReportType: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    upsellSearchDD: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        researchReports: import("@sinclair/typebox").TObject<{
            reportId: import("@sinclair/typebox").TString;
            provider: import("@sinclair/typebox").TString;
            title: import("@sinclair/typebox").TString;
            reportDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            summary: import("@sinclair/typebox").TString;
            investmentRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Bullish">, import("@sinclair/typebox").TLiteral<"Neutral">, import("@sinclair/typebox").TLiteral<"Bearish">]>>;
        }>;
    }>>;
    secReports: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TString;
        title: import("@sinclair/typebox").TString;
        description: import("@sinclair/typebox").TString;
        filingDate: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        snapshotUrl: import("@sinclair/typebox").TString;
        formType: import("@sinclair/typebox").TString;
    }>>>;
}>;
export type InsightsResult = StaticDecode<typeof InsightsResultSchema>;
export type InsightsOutlook = StaticDecode<typeof InsightsOutlookSchema>;
export interface InsightsInstrumentInfo {
    [key: string]: any;
    keyTechnicals: {
        [key: string]: any;
        provider: string;
        support?: number;
        resistance?: number;
        stopLoss?: number;
    };
    technicalEvents: {
        [key: string]: any;
        provider: string;
        sector?: string;
        shortTermOutlook: InsightsOutlook;
        intermediateTermOutlook: InsightsOutlook;
        longTermOutlook: InsightsOutlook;
    };
    valuation: {
        [key: string]: any;
        color?: number;
        description?: string;
        discount?: string;
        provider: string;
        relativeValue?: string;
    };
}
export interface InsightsCompanySnapshot {
    [key: string]: any;
    sectorInfo?: string;
    company: {
        [key: string]: any;
        innovativeness?: number;
        hiring?: number;
        sustainability?: number;
        insiderSentiments?: number;
        earningsReports?: number;
        dividends?: number;
    };
    sector: {
        [key: string]: any;
        innovativeness: number;
        hiring: number;
        sustainability?: number;
        insiderSentiments: number;
        earningsReports?: number;
        dividends: number;
    };
}
declare const InsightsOptionsSchema: import("@sinclair/typebox").TObject<{
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    region: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    reportsCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type InsightsOptions = StaticDecode<typeof InsightsOptionsSchema>;
export default function trendingSymbols(this: ModuleThis, symbol: string, queryOptionsOverrides?: InsightsOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<InsightsResult>;
export default function trendingSymbols(this: ModuleThis, symbol: string, queryOptionsOverrides?: InsightsOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
export {};
