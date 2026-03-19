import { StaticDecode } from "@sinclair/typebox";
import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
declare const HistoricalRowHistorySchema: import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    open: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    close: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    adjClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    volume: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type HistoricalRowHistory = StaticDecode<typeof HistoricalRowHistorySchema>;
declare const HistoricalRowDividendSchema: import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    dividends: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type HistoricalRowDividend = StaticDecode<typeof HistoricalRowDividendSchema>;
declare const HistoricalRowStockSplitSchema: import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    stockSplits: import("@sinclair/typebox").TString;
}>;
export type HistoricalRowStockSplit = StaticDecode<typeof HistoricalRowStockSplitSchema>;
declare const HistoricalOptionsSchema: import("@sinclair/typebox").TObject<{
    period1: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TNumber]>;
    period2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TNumber]>>;
    interval: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"1d">, import("@sinclair/typebox").TLiteral<"1wk">, import("@sinclair/typebox").TLiteral<"1mo">]>>;
    events: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"history">, import("@sinclair/typebox").TLiteral<"dividends">, import("@sinclair/typebox").TLiteral<"split">]>>;
    includeAdjustedClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type HistoricalOptions = StaticDecode<typeof HistoricalOptionsSchema>;
declare const HistoricalOptionsEventsHistorySchema: import("@sinclair/typebox").TObject<{
    events: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"history">, import("@sinclair/typebox").TLiteral<"dividends">, import("@sinclair/typebox").TLiteral<"split">]>, import("@sinclair/typebox").TLiteral<"history">]>>;
    period1: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TNumber]>;
    period2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TNumber]>>;
    interval: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"1d">, import("@sinclair/typebox").TLiteral<"1wk">, import("@sinclair/typebox").TLiteral<"1mo">]>>;
    includeAdjustedClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type HistoricalOptionsEventsHistory = StaticDecode<typeof HistoricalOptionsEventsHistorySchema>;
declare const HistoricalOptionsEventsDividendsSchema: import("@sinclair/typebox").TObject<{
    events: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"history">, import("@sinclair/typebox").TLiteral<"dividends">, import("@sinclair/typebox").TLiteral<"split">]>, import("@sinclair/typebox").TLiteral<"dividends">]>;
    period1: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TNumber]>;
    period2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TNumber]>>;
    interval: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"1d">, import("@sinclair/typebox").TLiteral<"1wk">, import("@sinclair/typebox").TLiteral<"1mo">]>>;
    includeAdjustedClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type HistoricalOptionsEventsDividends = StaticDecode<typeof HistoricalOptionsEventsDividendsSchema>;
declare const HistoricalOptionsEventsSplitSchema: import("@sinclair/typebox").TObject<{
    events: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"history">, import("@sinclair/typebox").TLiteral<"dividends">, import("@sinclair/typebox").TLiteral<"split">]>, import("@sinclair/typebox").TLiteral<"split">]>;
    period1: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TNumber]>;
    period2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TNumber]>>;
    interval: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"1d">, import("@sinclair/typebox").TLiteral<"1wk">, import("@sinclair/typebox").TLiteral<"1mo">]>>;
    includeAdjustedClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type HistoricalOptionsEventsSplit = StaticDecode<typeof HistoricalOptionsEventsSplitSchema>;
declare const HistoricalHistoryResultSchema: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    open: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    close: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    adjClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    volume: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>>;
export type HistoricalHistoryResult = StaticDecode<typeof HistoricalHistoryResultSchema>;
declare const HistoricalDividendsResultSchema: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    dividends: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>>;
export type HistoricalDividendsResult = StaticDecode<typeof HistoricalDividendsResultSchema>;
declare const HistoricalStockSplitsResultSchema: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    stockSplits: import("@sinclair/typebox").TString;
}>>;
export type HistoricalStockSplitsResult = StaticDecode<typeof HistoricalStockSplitsResultSchema>;
export default function historical(this: ModuleThis, symbol: string, queryOptionsOverrides: HistoricalOptionsEventsHistory, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<HistoricalHistoryResult>;
export default function historical(this: ModuleThis, symbol: string, queryOptionsOverrides: HistoricalOptionsEventsDividends, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<HistoricalDividendsResult>;
export default function historical(this: ModuleThis, symbol: string, queryOptionsOverrides: HistoricalOptionsEventsSplit, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<HistoricalStockSplitsResult>;
export default function historical(this: ModuleThis, symbol: string, queryOptionsOverrides: HistoricalOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
export {};
