import { StaticDecode } from "@sinclair/typebox";
import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
declare const DailyGainersOptionsSchema: import("@sinclair/typebox").TObject<{
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    region: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    count: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
declare const DailyGainersResultSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    title: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    canonicalName: import("@sinclair/typebox").TString;
    criteriaMeta: import("@sinclair/typebox").TObject<{
        size: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        offset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sortField: import("@sinclair/typebox").TString;
        sortType: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TString;
        criteria: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            field: import("@sinclair/typebox").TString;
            operators: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            values: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            labelsSelected: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            dependentValues: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
        }>>;
        topOperator: import("@sinclair/typebox").TString;
    }>;
    rawCriteria: import("@sinclair/typebox").TString;
    start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    count: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    total: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    quotes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        language: import("@sinclair/typebox").TString;
        region: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TString;
        typeDisp: import("@sinclair/typebox").TString;
        quoteSourceName: import("@sinclair/typebox").TString;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TString;
        lastCloseTevEbitLtm: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastClosePriceToNNWCPerShare: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        firstTradeDateMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        regularMarketTime: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        regularMarketPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        regularMarketDayHigh: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        regularMarketDayRange: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TString;
        regularMarketDayLow: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        regularMarketVolume: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        regularMarketPreviousClose: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        bid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ask: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bidSize: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        askSize: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        market: import("@sinclair/typebox").TString;
        messageBoardId: import("@sinclair/typebox").TString;
        fullExchangeName: import("@sinclair/typebox").TString;
        longName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        averageDailyVolume3Month: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        averageDailyVolume10Day: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TString;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        marketState: import("@sinclair/typebox").TString;
        epsTrailingTwelveMonths: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        epsForward: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        epsCurrentYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceEpsCurrentYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sharesOutstanding: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fiftyDayAverageChange: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        twoHundredDayAverage: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        marketCap: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        forwardPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceToBook: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sourceInterval: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        exchangeDataDelayedBy: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TBoolean;
        exchange: import("@sinclair/typebox").TString;
        fiftyTwoWeekLow: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        shortName: import("@sinclair/typebox").TString;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketChangePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        symbol: import("@sinclair/typebox").TString;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    useRecords: import("@sinclair/typebox").TBoolean;
    predefinedScr: import("@sinclair/typebox").TBoolean;
    versionId: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    creationDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    lastUpdated: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    isPremium: import("@sinclair/typebox").TBoolean;
    iconUrl: import("@sinclair/typebox").TString;
}>;
export type DailyGainersResult = StaticDecode<typeof DailyGainersResultSchema>;
export type DailyGainersOptions = StaticDecode<typeof DailyGainersOptionsSchema>;
export default function dailyGainers(this: ModuleThis, queryOptionsOverrides?: DailyGainersOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<DailyGainersResult>;
export default function dailyGainers(this: ModuleThis, queryOptionsOverrides?: DailyGainersOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
export {};
