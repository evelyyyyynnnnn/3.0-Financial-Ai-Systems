import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
import { StaticDecode } from "@sinclair/typebox";
declare const QuoteCryptoCurrencySchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"CRYPTOCURRENCY">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    circulatingSupply: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    fromCurrency: import("@sinclair/typebox").TString;
    toCurrency: import("@sinclair/typebox").TString;
    lastMarket: import("@sinclair/typebox").TString;
    coinImageUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    volume24Hr: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    volumeAllCurrencies: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type QuoteCryptoCurrency = StaticDecode<typeof QuoteCryptoCurrencySchema>;
declare const QuoteCurrencySchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"CURRENCY">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type QuoteCurrency = StaticDecode<typeof QuoteCurrencySchema>;
declare const QuoteEtfSchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"ETF">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type QuoteEtf = StaticDecode<typeof QuoteEtfSchema>;
declare const QuoteEquitySchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"EQUITY">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    dividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export type QuoteEquity = StaticDecode<typeof QuoteEquitySchema>;
declare const QuoteFutureSchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"FUTURE">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    headSymbolAsString: import("@sinclair/typebox").TString;
    contractSymbol: import("@sinclair/typebox").TBoolean;
    underlyingExchangeSymbol: import("@sinclair/typebox").TString;
    expireDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    expireIsoDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
}>;
export type QuoteFuture = StaticDecode<typeof QuoteFutureSchema>;
declare const QuoteIndexSchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"INDEX">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type QuoteIndex = StaticDecode<typeof QuoteIndexSchema>;
declare const QuoteOptionSchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"OPTION">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>]>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    expireDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    expireIsoDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    strike: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type QuoteOption = StaticDecode<typeof QuoteOptionSchema>;
declare const QuoteMutualfundSchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"MUTUALFUND">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type QuoteMutualfund = StaticDecode<typeof QuoteMutualfundSchema>;
declare const QuoteSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"CRYPTOCURRENCY">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    circulatingSupply: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    fromCurrency: import("@sinclair/typebox").TString;
    toCurrency: import("@sinclair/typebox").TString;
    lastMarket: import("@sinclair/typebox").TString;
    coinImageUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    volume24Hr: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    volumeAllCurrencies: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>, import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"CURRENCY">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>, import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"ETF">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>, import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"EQUITY">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    dividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>, import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"FUTURE">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    headSymbolAsString: import("@sinclair/typebox").TString;
    contractSymbol: import("@sinclair/typebox").TBoolean;
    underlyingExchangeSymbol: import("@sinclair/typebox").TString;
    expireDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    expireIsoDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
}>, import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"INDEX">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>, import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"MUTUALFUND">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>, import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    exchangeTimezoneName: import("@sinclair/typebox").TString;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    region: import("@sinclair/typebox").TString;
    language: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"OPTION">]>;
    typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    triggerable: import("@sinclair/typebox").TBoolean;
    customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
    tradeable: import("@sinclair/typebox").TBoolean;
    cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    exchange: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeTimezoneShortName: import("@sinclair/typebox").TString;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    market: import("@sinclair/typebox").TString;
    esgPopulated: import("@sinclair/typebox").TBoolean;
    fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        low: import("@sinclair/typebox").TNumber;
        high: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
        low: number;
        high: number;
    }>]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
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
    fullExchangeName: import("@sinclair/typebox").TString;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    underlyingSymbol: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>]>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    expireDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    expireIsoDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    strike: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>]>;
export type Quote = StaticDecode<typeof QuoteSchema>;
declare const CallOrPutSchema: import("@sinclair/typebox").TObject<{
    contractSymbol: import("@sinclair/typebox").TString;
    strike: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    lastPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    change: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    percentChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    volume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ask: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    contractSize: import("@sinclair/typebox").TLiteral<"REGULAR">;
    expiration: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    lastTradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    impliedVolatility: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    inTheMoney: import("@sinclair/typebox").TBoolean;
}>;
export type CallOrPut = StaticDecode<typeof CallOrPutSchema>;
declare const OptionSchema: import("@sinclair/typebox").TObject<{
    expirationDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    hasMiniOptions: import("@sinclair/typebox").TBoolean;
    calls: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        contractSymbol: import("@sinclair/typebox").TString;
        strike: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        lastPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        change: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        percentChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        volume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ask: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        contractSize: import("@sinclair/typebox").TLiteral<"REGULAR">;
        expiration: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        lastTradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        impliedVolatility: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        inTheMoney: import("@sinclair/typebox").TBoolean;
    }>>;
    puts: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        contractSymbol: import("@sinclair/typebox").TString;
        strike: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        lastPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        change: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        percentChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        volume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ask: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        contractSize: import("@sinclair/typebox").TLiteral<"REGULAR">;
        expiration: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        lastTradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        impliedVolatility: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        inTheMoney: import("@sinclair/typebox").TBoolean;
    }>>;
}>;
export type Option = StaticDecode<typeof OptionSchema>;
declare const OptionsResultSchema: import("@sinclair/typebox").TObject<{
    underlyingSymbol: import("@sinclair/typebox").TString;
    expirationDates: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    strikes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    hasMiniOptions: import("@sinclair/typebox").TBoolean;
    quote: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        region: import("@sinclair/typebox").TString;
        language: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"CRYPTOCURRENCY">]>;
        typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        exchange: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        market: import("@sinclair/typebox").TString;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        fullExchangeName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        circulatingSupply: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        fromCurrency: import("@sinclair/typebox").TString;
        toCurrency: import("@sinclair/typebox").TString;
        lastMarket: import("@sinclair/typebox").TString;
        coinImageUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        volume24Hr: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        volumeAllCurrencies: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        region: import("@sinclair/typebox").TString;
        language: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"CURRENCY">]>;
        typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        exchange: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        market: import("@sinclair/typebox").TString;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        fullExchangeName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        region: import("@sinclair/typebox").TString;
        language: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"ETF">]>;
        typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        exchange: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        market: import("@sinclair/typebox").TString;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        fullExchangeName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        region: import("@sinclair/typebox").TString;
        language: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"EQUITY">]>;
        typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        exchange: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        market: import("@sinclair/typebox").TString;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        fullExchangeName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        dividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        region: import("@sinclair/typebox").TString;
        language: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"FUTURE">]>;
        typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        exchange: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        market: import("@sinclair/typebox").TString;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        fullExchangeName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        headSymbolAsString: import("@sinclair/typebox").TString;
        contractSymbol: import("@sinclair/typebox").TBoolean;
        underlyingExchangeSymbol: import("@sinclair/typebox").TString;
        expireDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        expireIsoDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        region: import("@sinclair/typebox").TString;
        language: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"INDEX">]>;
        typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        exchange: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        market: import("@sinclair/typebox").TString;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        fullExchangeName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        region: import("@sinclair/typebox").TString;
        language: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"MUTUALFUND">]>;
        typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        exchange: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        market: import("@sinclair/typebox").TString;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        fullExchangeName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        underlyingSymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        region: import("@sinclair/typebox").TString;
        language: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TLiteral<"OPTION">]>;
        typeDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        triggerable: import("@sinclair/typebox").TBoolean;
        customPriceAlertConfidence: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketState: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"REGULAR">, import("@sinclair/typebox").TLiteral<"CLOSED">, import("@sinclair/typebox").TLiteral<"PRE">, import("@sinclair/typebox").TLiteral<"PREPRE">, import("@sinclair/typebox").TLiteral<"POST">, import("@sinclair/typebox").TLiteral<"POSTPOST">]>;
        tradeable: import("@sinclair/typebox").TBoolean;
        cryptoTradeable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        exchange: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeTimezoneShortName: import("@sinclair/typebox").TString;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        market: import("@sinclair/typebox").TString;
        esgPopulated: import("@sinclair/typebox").TBoolean;
        fiftyTwoWeekLowChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLowChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        fiftyTwoWeekHighChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHighChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampStart: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsTimestampEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverageChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        firstTradeDateMilliseconds: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayRange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            low: import("@sinclair/typebox").TNumber;
            high: import("@sinclair/typebox").TNumber;
        }>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TRegExp, {
            low: number;
            high: number;
        }>]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
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
        fullExchangeName: import("@sinclair/typebox").TString;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        underlyingSymbol: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingThreeMonthNavReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ipoExpectedDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        averageAnalystRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        pageViewGrowthWeekly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        openInterest: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>]>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        expireDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        expireIsoDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        strike: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>]>;
    options: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        expirationDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        hasMiniOptions: import("@sinclair/typebox").TBoolean;
        calls: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            contractSymbol: import("@sinclair/typebox").TString;
            strike: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            lastPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            change: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            percentChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            volume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            bid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            ask: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            contractSize: import("@sinclair/typebox").TLiteral<"REGULAR">;
            expiration: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            lastTradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            impliedVolatility: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            inTheMoney: import("@sinclair/typebox").TBoolean;
        }>>;
        puts: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            contractSymbol: import("@sinclair/typebox").TString;
            strike: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            lastPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            change: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            percentChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            volume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            bid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            ask: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            contractSize: import("@sinclair/typebox").TLiteral<"REGULAR">;
            expiration: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            lastTradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            impliedVolatility: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            inTheMoney: import("@sinclair/typebox").TBoolean;
        }>>;
    }>>;
}>;
declare const OptionsOptionsSchema: import("@sinclair/typebox").TObject<{
    formatted: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    region: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    date: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
}>;
export type OptionsOptions = StaticDecode<typeof OptionsOptionsSchema>;
export type OptionsResult = StaticDecode<typeof OptionsResultSchema>;
export default function options(this: ModuleThis, symbol: string, queryOptionsOverrides: OptionsOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<OptionsResult>;
export default function options(this: ModuleThis, symbol: string, queryOptionsOverrides: OptionsOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
export {};
