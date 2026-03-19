import { StaticDecode } from "@sinclair/typebox";
import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
declare const ChartResultArraySchema: import("@sinclair/typebox").TObject<{
    meta: import("@sinclair/typebox").TObject<{
        currency: import("@sinclair/typebox").TString;
        symbol: import("@sinclair/typebox").TString;
        exchangeName: import("@sinclair/typebox").TString;
        instrumentType: import("@sinclair/typebox").TString;
        firstTradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull]>;
        regularMarketTime: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        timezone: import("@sinclair/typebox").TString;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        chartPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        previousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        scale: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        currentTradingPeriod: import("@sinclair/typebox").TObject<{
            pre: import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>;
            regular: import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>;
            post: import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>;
        }>;
        tradingPeriods: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            pre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>>>;
            post: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>>>;
            regular: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>>>;
        }>, import("@sinclair/typebox").TArray<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            timezone: import("@sinclair/typebox").TString;
            start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>>]>>;
        dataGranularity: import("@sinclair/typebox").TString;
        range: import("@sinclair/typebox").TString;
        validRanges: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    }>;
    events: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        dividends: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            amount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        }>>>;
        splits: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            numerator: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            denominator: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            splitRatio: import("@sinclair/typebox").TString;
        }>>>;
    }>>;
    quotes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>;
        low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>;
        open: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>;
        close: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>;
        volume: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>;
        adjclose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>>;
    }>>;
}>;
declare const ChartResultObjectSchema: import("@sinclair/typebox").TObject<{
    meta: import("@sinclair/typebox").TObject<{
        currency: import("@sinclair/typebox").TString;
        symbol: import("@sinclair/typebox").TString;
        exchangeName: import("@sinclair/typebox").TString;
        instrumentType: import("@sinclair/typebox").TString;
        firstTradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull]>;
        regularMarketTime: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        timezone: import("@sinclair/typebox").TString;
        exchangeTimezoneName: import("@sinclair/typebox").TString;
        regularMarketPrice: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        chartPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        previousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        scale: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        currentTradingPeriod: import("@sinclair/typebox").TObject<{
            pre: import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>;
            regular: import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>;
            post: import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>;
        }>;
        tradingPeriods: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
            pre: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>>>;
            post: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>>>;
            regular: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                timezone: import("@sinclair/typebox").TString;
                start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>>>;
        }>, import("@sinclair/typebox").TArray<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            timezone: import("@sinclair/typebox").TString;
            start: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            end: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            gmtoffset: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>>]>>;
        dataGranularity: import("@sinclair/typebox").TString;
        range: import("@sinclair/typebox").TString;
        validRanges: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    }>;
    timestamp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>>;
    events: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        dividends: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{}>>;
        splits: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{}>>;
    }>>;
    indicators: import("@sinclair/typebox").TObject<{
        quote: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            high: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>>;
            low: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>>;
            open: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>>;
            close: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>>;
            volume: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>>;
        }>>;
        adjclose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            adjclose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>, import("@sinclair/typebox").TNull]>>>;
        }>>>;
    }>;
}>;
export declare const ChartOptionsSchema: import("@sinclair/typebox").TObject<{
    period1: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>]>;
    period2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>]>>;
    useYfid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    interval: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"1m">, import("@sinclair/typebox").TLiteral<"2m">, import("@sinclair/typebox").TLiteral<"5m">, import("@sinclair/typebox").TLiteral<"15m">, import("@sinclair/typebox").TLiteral<"30m">, import("@sinclair/typebox").TLiteral<"60m">, import("@sinclair/typebox").TLiteral<"90m">, import("@sinclair/typebox").TLiteral<"1h">, import("@sinclair/typebox").TLiteral<"1d">, import("@sinclair/typebox").TLiteral<"5d">, import("@sinclair/typebox").TLiteral<"1wk">, import("@sinclair/typebox").TLiteral<"1mo">, import("@sinclair/typebox").TLiteral<"3mo">]>>;
    includePrePost: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    events: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    return: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"array">, import("@sinclair/typebox").TLiteral<"object">]>>;
}>;
declare const ChartOptionsWithReturnArraySchema: import("@sinclair/typebox").TObject<{
    events: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    period1: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>]>;
    period2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>]>>;
    useYfid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    interval: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"1m">, import("@sinclair/typebox").TLiteral<"2m">, import("@sinclair/typebox").TLiteral<"5m">, import("@sinclair/typebox").TLiteral<"15m">, import("@sinclair/typebox").TLiteral<"30m">, import("@sinclair/typebox").TLiteral<"60m">, import("@sinclair/typebox").TLiteral<"90m">, import("@sinclair/typebox").TLiteral<"1h">, import("@sinclair/typebox").TLiteral<"1d">, import("@sinclair/typebox").TLiteral<"5d">, import("@sinclair/typebox").TLiteral<"1wk">, import("@sinclair/typebox").TLiteral<"1mo">, import("@sinclair/typebox").TLiteral<"3mo">]>>;
    includePrePost: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    return: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"array">, import("@sinclair/typebox").TLiteral<"object">]>, import("@sinclair/typebox").TLiteral<"array">]>>;
}>;
declare const ChartOptionsWithReturnObjectSchema: import("@sinclair/typebox").TObject<{
    events: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    period1: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>]>;
    period2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TString, import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>]>>;
    useYfid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    interval: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"1m">, import("@sinclair/typebox").TLiteral<"2m">, import("@sinclair/typebox").TLiteral<"5m">, import("@sinclair/typebox").TLiteral<"15m">, import("@sinclair/typebox").TLiteral<"30m">, import("@sinclair/typebox").TLiteral<"60m">, import("@sinclair/typebox").TLiteral<"90m">, import("@sinclair/typebox").TLiteral<"1h">, import("@sinclair/typebox").TLiteral<"1d">, import("@sinclair/typebox").TLiteral<"5d">, import("@sinclair/typebox").TLiteral<"1wk">, import("@sinclair/typebox").TLiteral<"1mo">, import("@sinclair/typebox").TLiteral<"3mo">]>>;
    includePrePost: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    return: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"array">, import("@sinclair/typebox").TLiteral<"object">]>, import("@sinclair/typebox").TLiteral<"object">]>;
}>;
export type ChartOptions = StaticDecode<typeof ChartOptionsSchema>;
export type ChartOptionsWithReturnObject = StaticDecode<typeof ChartOptionsWithReturnObjectSchema>;
export type ChartResultObject = StaticDecode<typeof ChartResultObjectSchema>;
export type ChartOptionsWithReturnArray = StaticDecode<typeof ChartOptionsWithReturnArraySchema>;
export type ChartResultArray = StaticDecode<typeof ChartResultArraySchema>;
export declare const _chart: typeof chart;
export default function chart(this: ModuleThis, symbol: string, queryOptionsOverrides: ChartOptionsWithReturnObject, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<ChartResultObject>;
export default function chart(this: ModuleThis, symbol: string, queryOptionsOverrides: ChartOptionsWithReturnArray, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<ChartResultArray>;
export default function chart(this: ModuleThis, symbol: string, queryOptionsOverrides: ChartOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
export {};
