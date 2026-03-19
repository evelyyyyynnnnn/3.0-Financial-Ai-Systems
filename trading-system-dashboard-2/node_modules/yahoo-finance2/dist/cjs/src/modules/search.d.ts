import { StaticDecode } from "@sinclair/typebox";
import type { ModuleOptionsWithValidateTrue, ModuleOptionsWithValidateFalse, ModuleThis } from "../lib/moduleCommon.js";
export type SearchResult = StaticDecode<typeof SearchResultSchema>;
declare const SearchResultSchema: import("@sinclair/typebox").TObject<{
    explains: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
    count: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    quotes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        exchange: import("@sinclair/typebox").TString;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        isYahooFinance: import("@sinclair/typebox").TLiteral<true>;
        exchDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        shortname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        index: import("@sinclair/typebox").TLiteral<"quotes">;
        dispSecIndFlag: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quoteType: import("@sinclair/typebox").TLiteral<"EQUITY">;
        typeDisp: import("@sinclair/typebox").TLiteral<"Equity">;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        exchange: import("@sinclair/typebox").TString;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        isYahooFinance: import("@sinclair/typebox").TLiteral<true>;
        exchDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        shortname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        index: import("@sinclair/typebox").TLiteral<"quotes">;
        dispSecIndFlag: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quoteType: import("@sinclair/typebox").TLiteral<"OPTION">;
        typeDisp: import("@sinclair/typebox").TLiteral<"Option">;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        exchange: import("@sinclair/typebox").TString;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        isYahooFinance: import("@sinclair/typebox").TLiteral<true>;
        exchDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        shortname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        index: import("@sinclair/typebox").TLiteral<"quotes">;
        dispSecIndFlag: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quoteType: import("@sinclair/typebox").TLiteral<"ETF">;
        typeDisp: import("@sinclair/typebox").TLiteral<"ETF">;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        exchange: import("@sinclair/typebox").TString;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        isYahooFinance: import("@sinclair/typebox").TLiteral<true>;
        exchDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        shortname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        index: import("@sinclair/typebox").TLiteral<"quotes">;
        dispSecIndFlag: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quoteType: import("@sinclair/typebox").TLiteral<"MUTUALFUND">;
        typeDisp: import("@sinclair/typebox").TLiteral<"Fund">;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        exchange: import("@sinclair/typebox").TString;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        isYahooFinance: import("@sinclair/typebox").TLiteral<true>;
        exchDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        shortname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        index: import("@sinclair/typebox").TLiteral<"quotes">;
        dispSecIndFlag: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quoteType: import("@sinclair/typebox").TLiteral<"INDEX">;
        typeDisp: import("@sinclair/typebox").TLiteral<"Index">;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        exchange: import("@sinclair/typebox").TString;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        isYahooFinance: import("@sinclair/typebox").TLiteral<true>;
        exchDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        shortname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        index: import("@sinclair/typebox").TLiteral<"quotes">;
        dispSecIndFlag: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quoteType: import("@sinclair/typebox").TLiteral<"CURRENCY">;
        typeDisp: import("@sinclair/typebox").TLiteral<"Currency">;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        exchange: import("@sinclair/typebox").TString;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        isYahooFinance: import("@sinclair/typebox").TLiteral<true>;
        exchDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        shortname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        index: import("@sinclair/typebox").TLiteral<"quotes">;
        dispSecIndFlag: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quoteType: import("@sinclair/typebox").TLiteral<"CRYPTOCURRENCY">;
        typeDisp: import("@sinclair/typebox").TLiteral<"Cryptocurrency">;
    }>, import("@sinclair/typebox").TObject<{
        index: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
        permalink: import("@sinclair/typebox").TString;
        isYahooFinance: import("@sinclair/typebox").TLiteral<false>;
    }>, import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        exchange: import("@sinclair/typebox").TString;
        newListingDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nameChangeDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        prevName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        score: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        isYahooFinance: import("@sinclair/typebox").TLiteral<true>;
        exchDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        shortname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longname: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        index: import("@sinclair/typebox").TLiteral<"quotes">;
        dispSecIndFlag: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        quoteType: import("@sinclair/typebox").TLiteral<"FUTURE">;
        typeDisp: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"Future">, import("@sinclair/typebox").TLiteral<"Futures">]>;
    }>]>>;
    news: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        uuid: import("@sinclair/typebox").TString;
        title: import("@sinclair/typebox").TString;
        publisher: import("@sinclair/typebox").TString;
        link: import("@sinclair/typebox").TString;
        providerPublishTime: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        type: import("@sinclair/typebox").TString;
        thumbnail: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            resolutions: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                url: import("@sinclair/typebox").TString;
                width: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                height: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                tag: import("@sinclair/typebox").TString;
            }>>;
        }>>;
        relatedTickers: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    }>>;
    nav: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
    lists: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
    researchReports: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
    totalTime: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    screenerFieldResults: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    culturalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    timeTakenForQuotes: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    timeTakenForNews: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    timeTakenForAlgowatchlist: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    timeTakenForPredefinedScreener: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    timeTakenForCrunchbase: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    timeTakenForNav: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    timeTakenForResearchReports: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    timeTakenForScreenerField: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    timeTakenForCulturalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
declare const SearchOptionsSchema: import("@sinclair/typebox").TObject<{
    lang: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    region: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quotesCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    newsCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    enableFuzzyQuery: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    quotesQueryId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    multiQuoteQueryId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    newsQueryId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    enableCb: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    enableNavLinks: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    enableEnhancedTrivialQuery: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export type SearchOptions = StaticDecode<typeof SearchOptionsSchema>;
export default function search(this: ModuleThis, query: string, queryOptionsOverrides?: SearchOptions, moduleOptions?: ModuleOptionsWithValidateTrue): Promise<SearchResult>;
export default function search(this: ModuleThis, query: string, queryOptionsOverrides?: SearchOptions, moduleOptions?: ModuleOptionsWithValidateFalse): Promise<any>;
export {};
