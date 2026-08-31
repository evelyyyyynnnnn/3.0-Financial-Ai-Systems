import { StaticDecode } from "@sinclair/typebox";
declare enum EnumGrade {
    Accumulate = "Accumulate",
    Add = "Add",
    Average = "Average",
    BelowAverage = "Below Average",
    Buy = "Buy",
    ConvictionBuy = "Conviction Buy",
    Empty = "",
    EqualWeight = "Equal-Weight",
    FairValue = "Fair Value",
    GradeEqualWeight = "Equal-weight",
    GradeLongTermBuy = "Long-term Buy",
    Hold = "Hold",
    LongTermBuy = "Long-Term Buy",
    MarketOutperform = "Market Outperform",
    MarketPerform = "Market Perform",
    Mixed = "Mixed",
    Negative = "Negative",
    Neutral = "Neutral",
    InLine = "In-Line",
    Outperform = "Outperform",
    Overweight = "Overweight",
    PeerPerform = "Peer Perform",
    Perform = "Perform",
    Positive = "Positive",
    Reduce = "Reduce",
    SectorOutperform = "Sector Outperform",
    SectorPerform = "Sector Perform",
    SectorWeight = "Sector Weight",
    Sell = "Sell",
    StrongBuy = "Strong Buy",
    TopPick = "Top Pick",
    Underperform = "Underperform",
    Underperformer = "Underperformer",
    Underweight = "Underweight",
    Trim = "Trim",
    AboveAverage = "Above Average",
    Inline = "In-line",
    Outperformer = "Outperformer",
    OVerweight = "OVerweight",
    Cautious = "Cautious",
    MarketWeight = "Market Weight",
    SectorUnderperform = "Sector Underperform",
    MarketUnderperform = "Market Underperform",
    Peerperform = "Peer perform",
    GraduallyAccumulate = "Gradually Accumulate",
    ActionListBuy = "Action List Buy",
    Performer = "Performer",
    SectorPerformer = "Sector Performer",
    SpeculativeBuy = "Speculative Buy",
    StrongSell = "Strong Sell",
    SpeculativeHold = "Speculative Hold",
    NotRated = "Not Rated",
    HoldNeutral = "Hold Neutral",
    Developing = "Developing",
    buy = "buy",
    HOld = "HOld",// Not a typo, how it was returned from API
    TradingSell = "Trading Sell",
    Tender = "Tender",
    marketperform = "market perform",
    BUy = "BUy"
}
declare enum Action {
    Down = "down",
    Init = "init",
    Main = "main",
    Reit = "reit",
    Up = "up"
}
declare const UpgradeDowngradeHistoryHistorySchema: import("@sinclair/typebox").TObject<{
    epochGradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    firm: import("@sinclair/typebox").TString;
    toGrade: import("@sinclair/typebox").TEnum<typeof EnumGrade>;
    fromGrade: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TEnum<typeof EnumGrade>>;
    action: import("@sinclair/typebox").TEnum<typeof Action>;
}>;
export type UpgradeDowngradeHistoryHistory = StaticDecode<typeof UpgradeDowngradeHistoryHistorySchema>;
declare const UpgradeDowngradeHistorySchema: import("@sinclair/typebox").TObject<{
    history: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        epochGradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        firm: import("@sinclair/typebox").TString;
        toGrade: import("@sinclair/typebox").TEnum<typeof EnumGrade>;
        fromGrade: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TEnum<typeof EnumGrade>>;
        action: import("@sinclair/typebox").TEnum<typeof Action>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type UpgradeDowngradeHistory = StaticDecode<typeof UpgradeDowngradeHistorySchema>;
declare const TopHoldingsSectorWeightingSchema: import("@sinclair/typebox").TObject<{
    realestate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    consumer_cyclical: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    basic_materials: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    consumer_defensive: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    technology: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    communication_services: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    financial_services: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    utilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    industrials: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    energy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    healthcare: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type TopHoldingsSectorWeighting = StaticDecode<typeof TopHoldingsSectorWeightingSchema>;
declare const TopHoldingsBondRatingSchema: import("@sinclair/typebox").TObject<{
    a: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    aa: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    aaa: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    other: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    b: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bb: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bbb: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    below_b: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    us_government: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type TopHoldingsBondRating = StaticDecode<typeof TopHoldingsBondRatingSchema>;
declare const TopHoldingsEquityHoldingsSchema: import("@sinclair/typebox").TObject<{
    medianMarketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    medianMarketCapCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceToBook: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    priceToBookCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceToCashflow: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    priceToCashflowCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceToEarnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    priceToEarningsCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceToSales: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    priceToSalesCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    threeYearEarningsGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    threeYearEarningsGrowthCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type TopHoldingsEquityHoldings = StaticDecode<typeof TopHoldingsEquityHoldingsSchema>;
declare const TopHoldingsHoldingSchema: import("@sinclair/typebox").TObject<{
    symbol: import("@sinclair/typebox").TString;
    holdingName: import("@sinclair/typebox").TString;
    holdingPercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type TopHoldingsHolding = StaticDecode<typeof TopHoldingsHoldingSchema>;
declare const TopHoldingsSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    stockPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bondPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    holdings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        symbol: import("@sinclair/typebox").TString;
        holdingName: import("@sinclair/typebox").TString;
        holdingPercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    equityHoldings: import("@sinclair/typebox").TObject<{
        medianMarketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        medianMarketCapCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceToBook: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        priceToBookCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceToCashflow: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        priceToCashflowCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceToEarnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        priceToEarningsCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceToSales: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        priceToSalesCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeYearEarningsGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeYearEarningsGrowthCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>;
    bondHoldings: import("@sinclair/typebox").TObject<{}>;
    bondRatings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        a: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        aa: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        aaa: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        other: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        b: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bb: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bbb: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        below_b: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        us_government: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    sectorWeightings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        realestate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        consumer_cyclical: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        basic_materials: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        consumer_defensive: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        technology: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        communication_services: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        financial_services: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        utilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        industrials: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        energy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        healthcare: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    cashPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    otherPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preferredPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    convertiblePosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type TopHoldings = StaticDecode<typeof TopHoldingsSchema>;
declare const SummaryProfileSchema: import("@sinclair/typebox").TObject<{
    address1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    address2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    address3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    city: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    state: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    zip: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    country: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    phone: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fax: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    website: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    industryDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sectorDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longBusinessSummary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fullTimeEmployees: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    companyOfficers: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    twitter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type SummaryProfile = StaticDecode<typeof SummaryProfileSchema>;
declare const SummaryDetailSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    previousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    open: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    exDividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    payoutRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiveYearAvgDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    forwardPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    volume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageVolume10days: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
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
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceToSalesTrailing12Months: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    currency: import("@sinclair/typebox").TString;
    algorithm: import("@sinclair/typebox").TNull;
    tradeable: import("@sinclair/typebox").TBoolean;
    yield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    navPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fromCurrency: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    toCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    lastMarket: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    volume24Hr: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    volumeAllCurrencies: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    circulatingSupply: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    coinMarketCapLink: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    expireDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type SummaryDetail = StaticDecode<typeof SummaryDetailSchema>;
declare const FilingSchema: import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TString;
    epochDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"10-K">, import("@sinclair/typebox").TLiteral<"10-Q">, import("@sinclair/typebox").TLiteral<"8-K">, import("@sinclair/typebox").TLiteral<"8-K/A">, import("@sinclair/typebox").TLiteral<"10-K/A">, import("@sinclair/typebox").TLiteral<"10-Q/A">, import("@sinclair/typebox").TLiteral<"SD">, import("@sinclair/typebox").TLiteral<"PX14A6G">, import("@sinclair/typebox").TLiteral<"SC 13G/A">, import("@sinclair/typebox").TLiteral<"DEFA14A">, import("@sinclair/typebox").TLiteral<"25-NSE">, import("@sinclair/typebox").TLiteral<"S-8 POS">, import("@sinclair/typebox").TLiteral<"6-K">, import("@sinclair/typebox").TLiteral<"F-3ASR">, import("@sinclair/typebox").TLiteral<"SC 13D/A">, import("@sinclair/typebox").TLiteral<"20-F">, import("@sinclair/typebox").TLiteral<"425">, import("@sinclair/typebox").TLiteral<"SC14D9C">, import("@sinclair/typebox").TLiteral<"SC 13G">, import("@sinclair/typebox").TLiteral<"S-8">, import("@sinclair/typebox").TLiteral<"DEF 14A">, import("@sinclair/typebox").TLiteral<"F-10">]>;
    title: import("@sinclair/typebox").TString;
    edgarUrl: import("@sinclair/typebox").TString;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    url: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exhibits: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TString;
        url: import("@sinclair/typebox").TString;
        downloadUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>>;
}>;
export type Filing = StaticDecode<typeof FilingSchema>;
declare const SECFilingsSchema: import("@sinclair/typebox").TObject<{
    filings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        date: import("@sinclair/typebox").TString;
        epochDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"10-K">, import("@sinclair/typebox").TLiteral<"10-Q">, import("@sinclair/typebox").TLiteral<"8-K">, import("@sinclair/typebox").TLiteral<"8-K/A">, import("@sinclair/typebox").TLiteral<"10-K/A">, import("@sinclair/typebox").TLiteral<"10-Q/A">, import("@sinclair/typebox").TLiteral<"SD">, import("@sinclair/typebox").TLiteral<"PX14A6G">, import("@sinclair/typebox").TLiteral<"SC 13G/A">, import("@sinclair/typebox").TLiteral<"DEFA14A">, import("@sinclair/typebox").TLiteral<"25-NSE">, import("@sinclair/typebox").TLiteral<"S-8 POS">, import("@sinclair/typebox").TLiteral<"6-K">, import("@sinclair/typebox").TLiteral<"F-3ASR">, import("@sinclair/typebox").TLiteral<"SC 13D/A">, import("@sinclair/typebox").TLiteral<"20-F">, import("@sinclair/typebox").TLiteral<"425">, import("@sinclair/typebox").TLiteral<"SC14D9C">, import("@sinclair/typebox").TLiteral<"SC 13G">, import("@sinclair/typebox").TLiteral<"S-8">, import("@sinclair/typebox").TLiteral<"DEF 14A">, import("@sinclair/typebox").TLiteral<"F-10">]>;
        title: import("@sinclair/typebox").TString;
        edgarUrl: import("@sinclair/typebox").TString;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        url: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exhibits: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            type: import("@sinclair/typebox").TString;
            url: import("@sinclair/typebox").TString;
            downloadUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type SECFilings = StaticDecode<typeof SECFilingsSchema>;
declare const RecommendationTrendTrendSchema: import("@sinclair/typebox").TObject<{
    period: import("@sinclair/typebox").TString;
    strongBuy: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    buy: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    hold: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    sell: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    strongSell: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type RecommendationTrendTrend = StaticDecode<typeof RecommendationTrendTrendSchema>;
declare const RecommendationTrendSchema: import("@sinclair/typebox").TObject<{
    trend: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        period: import("@sinclair/typebox").TString;
        strongBuy: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        buy: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        hold: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sell: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        strongSell: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type RecommendationTrend = StaticDecode<typeof RecommendationTrendSchema>;
declare const QuoteTypeSchema: import("@sinclair/typebox").TObject<{
    exchange: import("@sinclair/typebox").TString;
    quoteType: import("@sinclair/typebox").TString;
    symbol: import("@sinclair/typebox").TString;
    underlyingSymbol: import("@sinclair/typebox").TString;
    shortName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    longName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    firstTradeDateEpochUtc: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
    timeZoneFullName: import("@sinclair/typebox").TString;
    timeZoneShortName: import("@sinclair/typebox").TString;
    uuid: import("@sinclair/typebox").TString;
    messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>>;
    gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type QuoteType = StaticDecode<typeof QuoteTypeSchema>;
declare const PriceSchema: import("@sinclair/typebox").TObject<{
    averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    exchange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    exchangeDataDelayedBy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    postMarketSource: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    preMarketSource: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    regularMarketSource: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    quoteType: import("@sinclair/typebox").TString;
    symbol: import("@sinclair/typebox").TString;
    underlyingSymbol: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    shortName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    longName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    lastMarket: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    marketState: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    currencySymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fromCurrency: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    toCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    volume24Hr: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    volumeAllCurrencies: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    circulatingSupply: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    expireDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type Price = StaticDecode<typeof PriceSchema>;
declare const NetSharePurchaseActivitySchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    period: import("@sinclair/typebox").TString;
    buyInfoCount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    buyInfoShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    buyPercentInsiderShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    sellInfoCount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    sellInfoShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    sellPercentInsiderShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    netInfoCount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    netInfoShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    netPercentInsiderShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalInsiderShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type NetSharePurchaseActivity = StaticDecode<typeof NetSharePurchaseActivitySchema>;
declare const MajorHoldersBreakdownSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    insidersPercentHeld: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    institutionsPercentHeld: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    institutionsFloatPercentHeld: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    institutionsCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type MajorHoldersBreakdown = StaticDecode<typeof MajorHoldersBreakdownSchema>;
declare enum EnumOwnership {
    D = "D",
    I = "I"
}
declare enum EnumRelation {
    ChairmanOfTheBoard = "Chairman of the Board",
    ChiefExecutiveOfficer = "Chief Executive Officer",
    ChiefFinancialOfficer = "Chief Financial Officer",
    ChiefOperatingOfficer = "Chief Operating Officer",
    ChiefTechnologyOfficer = "Chief Technology Officer",
    Director = "Director",
    DirectorIndependent = "Director (Independent)",
    Empty = "",
    GeneralCounsel = "General Counsel",
    IndependentNonExecutiveDirector = "Independent Non-Executive Director",
    Officer = "Officer",
    President = "President"
}
export type OwnershipEnum = StaticDecode<typeof OwnershipSchema>;
declare const TransactionSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    shares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    filerUrl: import("@sinclair/typebox").TString;
    transactionText: import("@sinclair/typebox").TString;
    filerName: import("@sinclair/typebox").TString;
    filerRelation: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TEnum<typeof EnumRelation>, import("@sinclair/typebox").TString]>;
    moneyText: import("@sinclair/typebox").TString;
    startDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    ownership: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TEnum<typeof EnumOwnership>, import("@sinclair/typebox").TString]>;
    value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type Transaction = StaticDecode<typeof TransactionSchema>;
declare const InsiderTransactionsSchema: import("@sinclair/typebox").TObject<{
    transactions: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        shares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        filerUrl: import("@sinclair/typebox").TString;
        transactionText: import("@sinclair/typebox").TString;
        filerName: import("@sinclair/typebox").TString;
        filerRelation: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TEnum<typeof EnumRelation>, import("@sinclair/typebox").TString]>;
        moneyText: import("@sinclair/typebox").TString;
        startDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        ownership: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TEnum<typeof EnumOwnership>, import("@sinclair/typebox").TString]>;
        value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type InsiderTransactions = StaticDecode<typeof InsiderTransactionsSchema>;
declare const HolderSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    name: import("@sinclair/typebox").TString;
    relation: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TEnum<typeof EnumRelation>, import("@sinclair/typebox").TString]>;
    url: import("@sinclair/typebox").TString;
    transactionDescription: import("@sinclair/typebox").TString;
    latestTransDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    positionDirect: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    positionDirectDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    positionIndirect: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    positionIndirectDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    positionSummaryDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
}>;
export type Holder = StaticDecode<typeof HolderSchema>;
declare const HoldersSchema: import("@sinclair/typebox").TObject<{
    holders: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        name: import("@sinclair/typebox").TString;
        relation: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TEnum<typeof EnumRelation>, import("@sinclair/typebox").TString]>;
        url: import("@sinclair/typebox").TString;
        transactionDescription: import("@sinclair/typebox").TString;
        latestTransDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        positionDirect: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        positionDirectDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        positionIndirect: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        positionIndirectDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        positionSummaryDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type Holders = StaticDecode<typeof HoldersSchema>;
declare const TrendSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    symbol: import("@sinclair/typebox").TNull;
    estimates: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
}>;
export type Trend = StaticDecode<typeof TrendSchema>;
declare const EstimateSchema: import("@sinclair/typebox").TObject<{
    period: import("@sinclair/typebox").TString;
    growth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type Estimate = StaticDecode<typeof EstimateSchema>;
declare const IndexTrendSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    symbol: import("@sinclair/typebox").TString;
    peRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    pegRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    estimates: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        period: import("@sinclair/typebox").TString;
        growth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
}>;
export type IndexTrend = StaticDecode<typeof IndexTrendSchema>;
declare const IncomeStatementHistoryElementSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    totalRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    costOfRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    grossProfit: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    researchDevelopment: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    sellingGeneralAdministrative: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    nonRecurring: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    otherOperatingExpenses: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    totalOperatingExpenses: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    operatingIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    totalOtherIncomeExpenseNet: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    ebit: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    interestExpense: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    incomeBeforeTax: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    incomeTaxExpense: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    minorityInterest: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    netIncomeFromContinuingOps: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    discontinuedOperations: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    extraordinaryItems: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    effectOfAccountingCharges: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    otherItems: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    netIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    netIncomeApplicableToCommonShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
}>;
export type IncomeStatementHistoryElement = StaticDecode<typeof IncomeStatementHistoryElementSchema>;
declare const IncomeStatementHistorySchema: import("@sinclair/typebox").TObject<{
    incomeStatementHistory: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        totalRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        costOfRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        grossProfit: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        researchDevelopment: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        sellingGeneralAdministrative: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        nonRecurring: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        otherOperatingExpenses: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        totalOperatingExpenses: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        operatingIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        totalOtherIncomeExpenseNet: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        ebit: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        interestExpense: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        incomeBeforeTax: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        incomeTaxExpense: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        minorityInterest: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        netIncomeFromContinuingOps: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        discontinuedOperations: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        extraordinaryItems: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        effectOfAccountingCharges: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        otherItems: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        netIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        netIncomeApplicableToCommonShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type IncomeStatementHistory = StaticDecode<typeof IncomeStatementHistorySchema>;
declare const FundProfileBrokerageSchema: import("@sinclair/typebox").TObject<{}>;
export type FundProfileBrokerage = StaticDecode<typeof FundProfileBrokerageSchema>;
declare const FundProfileFeesExpensesInvestmentSchema: import("@sinclair/typebox").TObject<{
    annualHoldingsTurnover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    annualReportExpenseRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    grossExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    netExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    projectionValues: import("@sinclair/typebox").TObject<{}>;
    totalNetAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type FundProfileFeesExpensesInvestment = StaticDecode<typeof FundProfileFeesExpensesInvestmentSchema>;
declare const FundProfileFeesExpensesInvestmentCatSchema: import("@sinclair/typebox").TObject<{
    annualHoldingsTurnover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    annualReportExpenseRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    grossExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    netExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalNetAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    projectionValuesCat: import("@sinclair/typebox").TObject<{}>;
}>;
export type FundProfileFeesExpensesInvestmentCat = StaticDecode<typeof FundProfileFeesExpensesInvestmentCatSchema>;
declare const FundProfileManagementInfoSchema: import("@sinclair/typebox").TObject<{
    managerName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    managerBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    startdate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
}>;
export type FundProfileManagementInfo = StaticDecode<typeof FundProfileManagementInfoSchema>;
declare const FundProfileSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    styleBoxUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>>;
    family: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    categoryName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    legalType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    managementInfo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        managerName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        managerBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        startdate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    }>>;
    feesExpensesInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        annualHoldingsTurnover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        annualReportExpenseRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        grossExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        netExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        projectionValues: import("@sinclair/typebox").TObject<{}>;
        totalNetAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    feesExpensesInvestmentCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        annualHoldingsTurnover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        annualReportExpenseRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        grossExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        netExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalNetAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        projectionValuesCat: import("@sinclair/typebox").TObject<{}>;
    }>>;
    brokerages: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{}>>>;
    initInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    initIraInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    initAipInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    subseqInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    subseqIraInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    subseqAipInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type FundProfile = StaticDecode<typeof FundProfileSchema>;
declare const FundPerformanceRiskOverviewStatsRowSchema: import("@sinclair/typebox").TObject<{
    year: import("@sinclair/typebox").TString;
    alpha: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    beta: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    meanAnnualReturn: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    rSquared: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    stdDev: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    sharpeRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    treynorRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type FundPerformanceRiskOverviewStatsRow = StaticDecode<typeof FundPerformanceRiskOverviewStatsRowSchema>;
declare const FundPerformanceRiskOverviewStatsCatSchema: import("@sinclair/typebox").TObject<{
    riskStatisticsCat: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        year: import("@sinclair/typebox").TString;
        alpha: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        beta: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        meanAnnualReturn: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        rSquared: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        stdDev: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sharpeRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        treynorRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
}>;
export type FundPerformanceRiskOverviewStatsCat = StaticDecode<typeof FundPerformanceRiskOverviewStatsCatSchema>;
declare const FundPerformanceRiskOverviewStatsSchema: import("@sinclair/typebox").TObject<{
    riskStatistics: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        year: import("@sinclair/typebox").TString;
        alpha: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        beta: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        meanAnnualReturn: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        rSquared: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        stdDev: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sharpeRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        treynorRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    riskRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type FundPerformanceRiskOverviewStats = StaticDecode<typeof FundPerformanceRiskOverviewStatsSchema>;
declare const FundPerformanceReturnsRowSchema: import("@sinclair/typebox").TObject<{
    year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type FundPerformanceReturnsRow = StaticDecode<typeof FundPerformanceReturnsRowSchema>;
declare const FundPerformanceReturnsSchema: import("@sinclair/typebox").TObject<{
    returns: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    returnsCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>>;
}>;
export type FundPerformanceReturns = StaticDecode<typeof FundPerformanceReturnsSchema>;
declare const FundPerformancePerformanceOverviewCatSchema: import("@sinclair/typebox").TObject<{
    ytdReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiveYrAvgReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type FundPerformancePerformanceOverviewCat = StaticDecode<typeof FundPerformancePerformanceOverviewCatSchema>;
declare const FundPerformancePerformanceOverviewSchema: import("@sinclair/typebox").TObject<{
    asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    ytdReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    oneYearTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    threeYearTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiveYrAvgReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    morningStarReturnRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    numYearsUp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    numYearsDown: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bestOneYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    worstOneYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    bestThreeYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    worstThreeYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type FundPerformancePerformanceOverview = StaticDecode<typeof FundPerformancePerformanceOverviewSchema>;
declare const PeriodRangeSchema: import("@sinclair/typebox").TObject<{
    asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type PeriodRange = StaticDecode<typeof PeriodRangeSchema>;
declare const FundPerformanceTrailingReturnsSchema: import("@sinclair/typebox").TObject<{
    asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    lastBullMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    lastBearMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type FundPerformanceTrailingReturns = StaticDecode<typeof FundPerformanceTrailingReturnsSchema>;
declare const FundPerformanceSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    loadAdjustedReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    rankInCategory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    performanceOverview: import("@sinclair/typebox").TObject<{
        asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        ytdReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneYearTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeYearTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYrAvgReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        morningStarReturnRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        numYearsUp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        numYearsDown: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bestOneYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        worstOneYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bestThreeYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        worstThreeYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>;
    performanceOverviewCat: import("@sinclair/typebox").TObject<{
        ytdReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYrAvgReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>;
    trailingReturns: import("@sinclair/typebox").TObject<{
        asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastBullMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastBearMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>;
    trailingReturnsNav: import("@sinclair/typebox").TObject<{
        asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastBullMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastBearMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>;
    trailingReturnsCat: import("@sinclair/typebox").TObject<{
        asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastBullMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastBearMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>;
    annualTotalReturns: import("@sinclair/typebox").TObject<{
        returns: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        returnsCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>>;
    }>;
    pastQuarterlyReturns: import("@sinclair/typebox").TObject<{
        returns: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        returnsCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>>;
    }>;
    riskOverviewStatistics: import("@sinclair/typebox").TObject<{
        riskStatistics: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            year: import("@sinclair/typebox").TString;
            alpha: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            beta: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            meanAnnualReturn: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            rSquared: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            stdDev: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            sharpeRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            treynorRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>;
        riskRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>;
    riskOverviewStatisticsCat: import("@sinclair/typebox").TObject<{
        riskStatisticsCat: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            year: import("@sinclair/typebox").TString;
            alpha: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            beta: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            meanAnnualReturn: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            rSquared: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            stdDev: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            sharpeRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            treynorRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>;
    }>;
}>;
export type FundPerformance = StaticDecode<typeof FundPerformanceSchema>;
declare const OwnershipListSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    reportDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    organization: import("@sinclair/typebox").TString;
    pctHeld: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    position: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    pctChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type OwnershipList = StaticDecode<typeof OwnershipListSchema>;
declare const OwnershipSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    ownershipList: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        reportDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        organization: import("@sinclair/typebox").TString;
        pctHeld: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        position: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        pctChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
}>;
export type Ownership = StaticDecode<typeof OwnershipSchema>;
declare const FinancialDataSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    currentPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    targetHighPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    targetLowPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    targetMeanPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    targetMedianPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    recommendationMean: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    recommendationKey: import("@sinclair/typebox").TString;
    numberOfAnalystOpinions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalCash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalCashPerShare: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ebitda: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    quickRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    currentRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalRevenue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    debtToEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    revenuePerShare: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    returnOnAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    returnOnEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    grossProfits: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    freeCashflow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    operatingCashflow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    earningsGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    revenueGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    grossMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    ebitdaMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    operatingMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    profitMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    financialCurrency: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
}>;
export type FinancialData = StaticDecode<typeof FinancialDataSchema>;
declare const RevenueEstimateSchema: import("@sinclair/typebox").TObject<{
    avg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    numberOfAnalysts: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    yearAgoRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
}>;
export type RevenueEstimate = StaticDecode<typeof RevenueEstimateSchema>;
declare const EpsTrendSchema: import("@sinclair/typebox").TObject<{
    current: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    "7daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    "30daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    "60daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    "90daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
}>;
export type EpsTrend = StaticDecode<typeof EpsTrendSchema>;
declare const EpsRevisionsSchema: import("@sinclair/typebox").TObject<{
    upLast7days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    upLast30days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    downLast30days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    downLast90days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
}>;
export type EpsRevisions = StaticDecode<typeof EpsRevisionsSchema>;
declare const EarningsEstimateSchema: import("@sinclair/typebox").TObject<{
    avg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    yearAgoEps: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    numberOfAnalysts: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
}>;
export type EarningsEstimate = StaticDecode<typeof EarningsEstimateSchema>;
declare const EarningsTrendTrendSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    period: import("@sinclair/typebox").TString;
    endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
    growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    earningsEstimate: import("@sinclair/typebox").TObject<{
        avg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        yearAgoEps: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        numberOfAnalysts: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    }>;
    revenueEstimate: import("@sinclair/typebox").TObject<{
        avg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        numberOfAnalysts: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        yearAgoRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    }>;
    epsTrend: import("@sinclair/typebox").TObject<{
        current: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        "7daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        "30daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        "60daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        "90daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    }>;
    epsRevisions: import("@sinclair/typebox").TObject<{
        upLast7days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        upLast30days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        downLast30days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        downLast90days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    }>;
}>;
export type EarningsTrendTrend = StaticDecode<typeof EarningsTrendTrendSchema>;
declare const EarningsTrendSchema: import("@sinclair/typebox").TObject<{
    trend: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        period: import("@sinclair/typebox").TString;
        endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
        growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        earningsEstimate: import("@sinclair/typebox").TObject<{
            avg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            yearAgoEps: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            numberOfAnalysts: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        }>;
        revenueEstimate: import("@sinclair/typebox").TObject<{
            avg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            numberOfAnalysts: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            yearAgoRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        }>;
        epsTrend: import("@sinclair/typebox").TObject<{
            current: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            "7daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            "30daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            "60daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            "90daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        }>;
        epsRevisions: import("@sinclair/typebox").TObject<{
            upLast7days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            upLast30days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            downLast30days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            downLast90days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        }>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type EarningsTrend = StaticDecode<typeof EarningsTrendSchema>;
declare const EarningsHistoryHistorySchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    epsActual: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    epsEstimate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    epsDifference: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    surprisePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
    quarter: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
    period: import("@sinclair/typebox").TString;
}>;
export type EarningsHistoryHistory = StaticDecode<typeof EarningsHistoryHistorySchema>;
declare const EarningsHistorySchema: import("@sinclair/typebox").TObject<{
    history: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        epsActual: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        epsEstimate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        epsDifference: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        surprisePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        quarter: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
        period: import("@sinclair/typebox").TString;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type EarningsHistory = StaticDecode<typeof EarningsHistorySchema>;
declare const YearlySchema: import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    revenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    earnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type Yearly = StaticDecode<typeof YearlySchema>;
declare const FinancialsChartQuarterlySchema: import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TString;
    revenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    earnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type FinancialsChartQuarterly = StaticDecode<typeof FinancialsChartQuarterlySchema>;
declare const FinancialsChartSchema: import("@sinclair/typebox").TObject<{
    yearly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        revenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        earnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    quarterly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        date: import("@sinclair/typebox").TString;
        revenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        earnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
}>;
export type FinancialsChart = StaticDecode<typeof FinancialsChartSchema>;
declare const EarningsChartQuarterlySchema: import("@sinclair/typebox").TObject<{
    date: import("@sinclair/typebox").TString;
    actual: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    estimate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type EarningsChartQuarterly = StaticDecode<typeof EarningsChartQuarterlySchema>;
declare const EarningsChartSchema: import("@sinclair/typebox").TObject<{
    quarterly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        date: import("@sinclair/typebox").TString;
        actual: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        estimate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    currentQuarterEstimate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    currentQuarterEstimateDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    currentQuarterEstimateYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    earningsDate: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
}>;
export type EarningsChart = StaticDecode<typeof EarningsChartSchema>;
declare const QuoteSummaryEarningsSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    earningsChart: import("@sinclair/typebox").TObject<{
        quarterly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            date: import("@sinclair/typebox").TString;
            actual: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            estimate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>;
        currentQuarterEstimate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        currentQuarterEstimateDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        currentQuarterEstimateYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        earningsDate: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    }>;
    financialsChart: import("@sinclair/typebox").TObject<{
        yearly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            revenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            earnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>;
        quarterly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            date: import("@sinclair/typebox").TString;
            revenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            earnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>;
    }>;
    financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type QuoteSummaryEarnings = StaticDecode<typeof QuoteSummaryEarningsSchema>;
declare const DefaultKeyStatisticsSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    enterpriseValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    forwardPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    profitMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    floatShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    sharesShort: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    sharesShortPriorMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    sharesShortPreviousMonthDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    dateShortInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    sharesPercentSharesOut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    heldPercentInsiders: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    heldPercentInstitutions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    shortRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    shortPercentOfFloat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    impliedSharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    category: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    priceToBook: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fundFamily: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    legalType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    lastFiscalYearEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    nextFiscalYearEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    mostRecentQuarter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsQuarterlyGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    netIncomeToCommon: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    trailingEps: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    forwardEps: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    pegRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    lastSplitFactor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
    lastSplitDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    enterpriseToRevenue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    enterpriseToEbitda: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    "52WeekChange": import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    SandP52WeekChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    lastDividendValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    lastDividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    beta3Year: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    yield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fundInceptionDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    threeYearAverageReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiveYearAverageReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    morningStarOverallRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    morningStarRiskRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    annualReportExpenseRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    lastCapGain: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    annualHoldingsTurnover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type DefaultKeyStatistics = StaticDecode<typeof DefaultKeyStatisticsSchema>;
declare const CashflowStatementSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    netIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    depreciation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    changeToNetincome: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    changeToAccountReceivables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    changeToLiabilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    changeToInventory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    changeToOperatingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalCashFromOperatingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    capitalExpenditures: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    investments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    otherCashflowsFromInvestingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalCashflowsFromInvestingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    dividendsPaid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    netBorrowings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    otherCashflowsFromFinancingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalCashFromFinancingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    changeInCash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    repurchaseOfStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    issuanceOfStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    effectOfExchangeRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type CashflowStatement = StaticDecode<typeof CashflowStatementSchema>;
declare const CashflowStatementHistorySchema: import("@sinclair/typebox").TObject<{
    cashflowStatements: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        netIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        depreciation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        changeToNetincome: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        changeToAccountReceivables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        changeToLiabilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        changeToInventory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        changeToOperatingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalCashFromOperatingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        capitalExpenditures: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        investments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        otherCashflowsFromInvestingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalCashflowsFromInvestingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendsPaid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        netBorrowings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        otherCashflowsFromFinancingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalCashFromFinancingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        changeInCash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        repurchaseOfStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        issuanceOfStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        effectOfExchangeRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type CashflowStatementHistory = StaticDecode<typeof CashflowStatementHistorySchema>;
declare const CalendarEventsEarningsSchema: import("@sinclair/typebox").TObject<{
    earningsDate: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    earningsAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    earningsLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    earningsHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    revenueAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    revenueLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    revenueHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type CalendarEventsEarnings = StaticDecode<typeof CalendarEventsEarningsSchema>;
declare const CalendarEventsSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    earnings: import("@sinclair/typebox").TObject<{
        earningsDate: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        earningsLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        earningsHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        revenueAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        revenueLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        revenueHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>;
    exDividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
}>;
export type CalendarEvents = StaticDecode<typeof CalendarEventsSchema>;
declare const BalanceSheetStatementSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
    cash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    shortTermInvestments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    netReceivables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    inventory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    otherCurrentAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalCurrentAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    longTermInvestments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    propertyPlantEquipment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    otherAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    accountsPayable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    shortLongTermDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    otherCurrentLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    longTermDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    otherLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalCurrentLiabilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    commonStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    retainedEarnings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    treasuryStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    otherStockholderEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalStockholderEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    netTangibleAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    goodWill: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    intangibleAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    deferredLongTermAssetCharges: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    deferredLongTermLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    minorityInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
    capitalSurplus: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type BalanceSheetStatement = StaticDecode<typeof BalanceSheetStatementSchema>;
declare const BalanceSheetHistorySchema: import("@sinclair/typebox").TObject<{
    balanceSheetStatements: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
        cash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        shortTermInvestments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        netReceivables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        inventory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        otherCurrentAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalCurrentAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        longTermInvestments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        propertyPlantEquipment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        otherAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        accountsPayable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        shortLongTermDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        otherCurrentLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        longTermDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        otherLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalCurrentLiabilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        commonStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        retainedEarnings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        treasuryStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        otherStockholderEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalStockholderEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        netTangibleAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        goodWill: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        intangibleAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        deferredLongTermAssetCharges: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        deferredLongTermLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        minorityInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
        capitalSurplus: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
}>;
export type BalanceSheetHistory = StaticDecode<typeof BalanceSheetHistorySchema>;
declare const CompanyOfficerSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    name: import("@sinclair/typebox").TString;
    age: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    title: import("@sinclair/typebox").TString;
    yearBorn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    fiscalYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    totalPay: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    exercisedValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    unexercisedValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
}>;
export type CompanyOfficer = StaticDecode<typeof CompanyOfficerSchema>;
declare const AssetProfileSchema: import("@sinclair/typebox").TObject<{
    maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>;
    address1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    address2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    address3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    city: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    state: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    zip: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    country: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    phone: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fax: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    website: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    industryDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    industryKey: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    industrySymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sectorDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sectorKey: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    longBusinessSummary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    fullTimeEmployees: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    companyOfficers: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        name: import("@sinclair/typebox").TString;
        age: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        title: import("@sinclair/typebox").TString;
        yearBorn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiscalYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalPay: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        exercisedValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        unexercisedValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    auditRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    boardRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    compensationRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    shareHolderRightsRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    overallRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TNumber;
    }>, number>, import("@sinclair/typebox").TNumber]>>;
    governanceEpochDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    compensationAsOfEpochDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
        raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
    }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    twitter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type AssetProfile = StaticDecode<typeof AssetProfileSchema>;
export declare const QuoteSummaryResultSchema: import("@sinclair/typebox").TObject<{
    assetProfile: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        address1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        address2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        address3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        city: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        state: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        zip: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        country: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        phone: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        fax: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        website: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industryDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industryKey: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industrySymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sectorDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sectorKey: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longBusinessSummary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        fullTimeEmployees: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        companyOfficers: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            name: import("@sinclair/typebox").TString;
            age: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            title: import("@sinclair/typebox").TString;
            yearBorn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            fiscalYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalPay: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            exercisedValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            unexercisedValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        auditRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        boardRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        compensationRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        shareHolderRightsRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        overallRisk: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        governanceEpochDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        compensationAsOfEpochDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        twitter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    balanceSheetHistory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        balanceSheetStatements: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            cash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            shortTermInvestments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            netReceivables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            inventory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherCurrentAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCurrentAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            longTermInvestments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            propertyPlantEquipment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            accountsPayable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            shortLongTermDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherCurrentLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            longTermDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCurrentLiabilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            commonStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            retainedEarnings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            treasuryStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherStockholderEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalStockholderEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            netTangibleAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            goodWill: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            intangibleAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            deferredLongTermAssetCharges: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            deferredLongTermLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            minorityInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
            capitalSurplus: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    balanceSheetHistoryQuarterly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        balanceSheetStatements: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            cash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            shortTermInvestments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            netReceivables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            inventory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherCurrentAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCurrentAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            longTermInvestments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            propertyPlantEquipment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            accountsPayable: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            shortLongTermDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherCurrentLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            longTermDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCurrentLiabilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            commonStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            retainedEarnings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            treasuryStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherStockholderEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalStockholderEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            netTangibleAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            goodWill: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            intangibleAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            deferredLongTermAssetCharges: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            deferredLongTermLiab: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            minorityInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>>;
            capitalSurplus: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    calendarEvents: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        earnings: import("@sinclair/typebox").TObject<{
            earningsDate: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            earningsAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            earningsLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            earningsHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            revenueAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            revenueLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            revenueHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        exDividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        dividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
    }>>;
    cashflowStatementHistory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        cashflowStatements: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            netIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            depreciation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToNetincome: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToAccountReceivables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToLiabilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToInventory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToOperatingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCashFromOperatingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            capitalExpenditures: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            investments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherCashflowsFromInvestingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCashflowsFromInvestingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            dividendsPaid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            netBorrowings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherCashflowsFromFinancingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCashFromFinancingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeInCash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            repurchaseOfStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            issuanceOfStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            effectOfExchangeRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    cashflowStatementHistoryQuarterly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        cashflowStatements: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            netIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            depreciation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToNetincome: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToAccountReceivables: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToLiabilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToInventory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeToOperatingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCashFromOperatingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            capitalExpenditures: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            investments: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherCashflowsFromInvestingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCashflowsFromInvestingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            dividendsPaid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            netBorrowings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            otherCashflowsFromFinancingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalCashFromFinancingActivities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            changeInCash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            repurchaseOfStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            issuanceOfStock: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            effectOfExchangeRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    defaultKeyStatistics: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        enterpriseValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        forwardPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        profitMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        floatShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sharesShort: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sharesShortPriorMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        sharesShortPreviousMonthDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        dateShortInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sharesPercentSharesOut: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        heldPercentInsiders: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        heldPercentInstitutions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        shortRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        shortPercentOfFloat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        impliedSharesOutstanding: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        category: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        bookValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceToBook: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fundFamily: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        legalType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        lastFiscalYearEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        nextFiscalYearEnd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        mostRecentQuarter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        earningsQuarterlyGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        netIncomeToCommon: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingEps: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        forwardEps: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        pegRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastSplitFactor: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        lastSplitDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        enterpriseToRevenue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        enterpriseToEbitda: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        "52WeekChange": import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        SandP52WeekChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastDividendValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastDividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta3Year: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        yield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fundInceptionDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        threeYearAverageReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYearAverageReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        morningStarOverallRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        morningStarRiskRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        annualReportExpenseRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        lastCapGain: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        annualHoldingsTurnover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    earnings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        earningsChart: import("@sinclair/typebox").TObject<{
            quarterly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                date: import("@sinclair/typebox").TString;
                actual: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                estimate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>;
            currentQuarterEstimate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            currentQuarterEstimateDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            currentQuarterEstimateYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            earningsDate: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        }>;
        financialsChart: import("@sinclair/typebox").TObject<{
            yearly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                date: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                revenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                earnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>;
            quarterly: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                date: import("@sinclair/typebox").TString;
                revenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                earnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>;
        }>;
        financialCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    earningsHistory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        history: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            epsActual: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            epsEstimate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            epsDifference: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            surprisePercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            quarter: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
            period: import("@sinclair/typebox").TString;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    earningsTrend: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        trend: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            period: import("@sinclair/typebox").TString;
            endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
            growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            earningsEstimate: import("@sinclair/typebox").TObject<{
                avg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                yearAgoEps: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                numberOfAnalysts: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            }>;
            revenueEstimate: import("@sinclair/typebox").TObject<{
                avg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                low: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                high: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                numberOfAnalysts: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                yearAgoRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                growth: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            }>;
            epsTrend: import("@sinclair/typebox").TObject<{
                current: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                "7daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                "30daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                "60daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                "90daysAgo": import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            }>;
            epsRevisions: import("@sinclair/typebox").TObject<{
                upLast7days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                upLast30days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                downLast30days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
                downLast90days: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            }>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    financialData: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        currentPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        targetHighPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        targetLowPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        targetMeanPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        targetMedianPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        recommendationMean: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        recommendationKey: import("@sinclair/typebox").TString;
        numberOfAnalystOpinions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalCash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalCashPerShare: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ebitda: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalDebt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        quickRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        currentRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalRevenue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        debtToEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        revenuePerShare: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        returnOnAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        returnOnEquity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        grossProfits: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        freeCashflow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        operatingCashflow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        earningsGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        revenueGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        grossMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ebitdaMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        operatingMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        profitMargins: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        financialCurrency: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    }>>;
    fundOwnership: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        ownershipList: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            reportDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            organization: import("@sinclair/typebox").TString;
            pctHeld: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            position: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            pctChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
    }>>;
    fundPerformance: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        loadAdjustedReturns: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        rankInCategory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        performanceOverview: import("@sinclair/typebox").TObject<{
            asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            ytdReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneYearTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeYearTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            fiveYrAvgReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            morningStarReturnRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            numYearsUp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            numYearsDown: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            bestOneYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            worstOneYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            bestThreeYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            worstThreeYrTotalReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        performanceOverviewCat: import("@sinclair/typebox").TObject<{
            ytdReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            fiveYrAvgReturnPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        trailingReturns: import("@sinclair/typebox").TObject<{
            asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            lastBullMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            lastBearMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        trailingReturnsNav: import("@sinclair/typebox").TObject<{
            asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            lastBullMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            lastBearMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        trailingReturnsCat: import("@sinclair/typebox").TObject<{
            asOfDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            ytd: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeMonth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            oneYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            fiveYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            tenYear: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            lastBullMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            lastBearMkt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        annualTotalReturns: import("@sinclair/typebox").TObject<{
            returns: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
            }>>;
            returnsCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
            }>>>;
        }>;
        pastQuarterlyReturns: import("@sinclair/typebox").TObject<{
            returns: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
            }>>;
            returnsCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                year: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
                }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
                annualValue: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                q4: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
            }>>>;
        }>;
        riskOverviewStatistics: import("@sinclair/typebox").TObject<{
            riskStatistics: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                year: import("@sinclair/typebox").TString;
                alpha: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                beta: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                meanAnnualReturn: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                rSquared: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                stdDev: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                sharpeRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                treynorRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>;
            riskRating: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        riskOverviewStatisticsCat: import("@sinclair/typebox").TObject<{
            riskStatisticsCat: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                year: import("@sinclair/typebox").TString;
                alpha: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                beta: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                meanAnnualReturn: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                rSquared: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                stdDev: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>>;
                sharpeRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
                treynorRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                    raw: import("@sinclair/typebox").TNumber;
                }>, number>, import("@sinclair/typebox").TNumber]>;
            }>>;
        }>;
    }>>;
    fundProfile: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        styleBoxUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>>;
        family: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        categoryName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        legalType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        managementInfo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            managerName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
            managerBio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
            startdate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        }>>;
        feesExpensesInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            annualHoldingsTurnover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            annualReportExpenseRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            grossExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            netExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            projectionValues: import("@sinclair/typebox").TObject<{}>;
            totalNetAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        feesExpensesInvestmentCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            annualHoldingsTurnover: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            annualReportExpenseRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            grossExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            netExpRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            totalNetAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            projectionValuesCat: import("@sinclair/typebox").TObject<{}>;
        }>>;
        brokerages: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{}>>>;
        initInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        initIraInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        initAipInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        subseqInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        subseqIraInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        subseqAipInvestment: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    incomeStatementHistory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        incomeStatementHistory: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            totalRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            costOfRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            grossProfit: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            researchDevelopment: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            sellingGeneralAdministrative: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            nonRecurring: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            otherOperatingExpenses: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            totalOperatingExpenses: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            operatingIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            totalOtherIncomeExpenseNet: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            ebit: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            interestExpense: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            incomeBeforeTax: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            incomeTaxExpense: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            minorityInterest: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            netIncomeFromContinuingOps: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            discontinuedOperations: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            extraordinaryItems: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            effectOfAccountingCharges: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            otherItems: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            netIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            netIncomeApplicableToCommonShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    incomeStatementHistoryQuarterly: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        incomeStatementHistory: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            endDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            totalRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            costOfRevenue: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            grossProfit: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            researchDevelopment: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            sellingGeneralAdministrative: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            nonRecurring: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            otherOperatingExpenses: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            totalOperatingExpenses: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            operatingIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            totalOtherIncomeExpenseNet: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            ebit: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            interestExpense: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            incomeBeforeTax: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            incomeTaxExpense: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            minorityInterest: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            netIncomeFromContinuingOps: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            discontinuedOperations: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            extraordinaryItems: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            effectOfAccountingCharges: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            otherItems: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            netIncome: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
            netIncomeApplicableToCommonShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>, import("@sinclair/typebox").TNumber, import("@sinclair/typebox").TNull]>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    indexTrend: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        symbol: import("@sinclair/typebox").TString;
        peRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        pegRatio: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        estimates: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            period: import("@sinclair/typebox").TString;
            growth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
    }>>;
    industryTrend: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        symbol: import("@sinclair/typebox").TNull;
        estimates: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
    }>>;
    institutionOwnership: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        ownershipList: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            reportDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            organization: import("@sinclair/typebox").TString;
            pctHeld: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            position: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            value: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            pctChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
    }>>;
    majorDirectHolders: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        holders: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            name: import("@sinclair/typebox").TString;
            relation: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TEnum<typeof EnumRelation>, import("@sinclair/typebox").TString]>;
            url: import("@sinclair/typebox").TString;
            transactionDescription: import("@sinclair/typebox").TString;
            latestTransDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            positionDirect: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            positionDirectDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            positionIndirect: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            positionIndirectDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
            positionSummaryDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    majorHoldersBreakdown: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        insidersPercentHeld: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        institutionsPercentHeld: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        institutionsFloatPercentHeld: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        institutionsCount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    netSharePurchaseActivity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        period: import("@sinclair/typebox").TString;
        buyInfoCount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        buyInfoShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        buyPercentInsiderShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sellInfoCount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        sellInfoShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        sellPercentInsiderShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        netInfoCount: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        netInfoShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        netPercentInsiderShares: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalInsiderShares: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    price: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume3Month: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        exchange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        exchangeDataDelayedBy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        postMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        postMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        postMarketSource: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        preMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        preMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preMarketSource: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        regularMarketChangePercent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketChange: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketTime: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        regularMarketPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketSource: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        quoteSourceName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quoteType: import("@sinclair/typebox").TString;
        symbol: import("@sinclair/typebox").TString;
        underlyingSymbol: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        shortName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        longName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        lastMarket: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        marketState: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        currency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        currencySymbol: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        fromCurrency: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        toCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        volume24Hr: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        volumeAllCurrencies: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        circulatingSupply: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        expireDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    quoteType: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        exchange: import("@sinclair/typebox").TString;
        quoteType: import("@sinclair/typebox").TString;
        symbol: import("@sinclair/typebox").TString;
        underlyingSymbol: import("@sinclair/typebox").TString;
        shortName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        longName: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>;
        firstTradeDateEpochUtc: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>, import("@sinclair/typebox").TNull, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{}>, null>]>;
        timeZoneFullName: import("@sinclair/typebox").TString;
        timeZoneShortName: import("@sinclair/typebox").TString;
        uuid: import("@sinclair/typebox").TString;
        messageBoardId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TNull, import("@sinclair/typebox").TString]>>;
        gmtOffSetMilliseconds: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    recommendationTrend: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        trend: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            period: import("@sinclair/typebox").TString;
            strongBuy: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            buy: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            hold: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            sell: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            strongSell: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    secFilings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        filings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            date: import("@sinclair/typebox").TString;
            epochDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"10-K">, import("@sinclair/typebox").TLiteral<"10-Q">, import("@sinclair/typebox").TLiteral<"8-K">, import("@sinclair/typebox").TLiteral<"8-K/A">, import("@sinclair/typebox").TLiteral<"10-K/A">, import("@sinclair/typebox").TLiteral<"10-Q/A">, import("@sinclair/typebox").TLiteral<"SD">, import("@sinclair/typebox").TLiteral<"PX14A6G">, import("@sinclair/typebox").TLiteral<"SC 13G/A">, import("@sinclair/typebox").TLiteral<"DEFA14A">, import("@sinclair/typebox").TLiteral<"25-NSE">, import("@sinclair/typebox").TLiteral<"S-8 POS">, import("@sinclair/typebox").TLiteral<"6-K">, import("@sinclair/typebox").TLiteral<"F-3ASR">, import("@sinclair/typebox").TLiteral<"SC 13D/A">, import("@sinclair/typebox").TLiteral<"20-F">, import("@sinclair/typebox").TLiteral<"425">, import("@sinclair/typebox").TLiteral<"SC14D9C">, import("@sinclair/typebox").TLiteral<"SC 13G">, import("@sinclair/typebox").TLiteral<"S-8">, import("@sinclair/typebox").TLiteral<"DEF 14A">, import("@sinclair/typebox").TLiteral<"F-10">]>;
            title: import("@sinclair/typebox").TString;
            edgarUrl: import("@sinclair/typebox").TString;
            maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            url: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            exhibits: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                type: import("@sinclair/typebox").TString;
                url: import("@sinclair/typebox").TString;
                downloadUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            }>>>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
    sectorTrend: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        symbol: import("@sinclair/typebox").TNull;
        estimates: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
    }>>;
    summaryDetail: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        priceHint: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        previousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        open: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketPreviousClose: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketOpen: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketDayHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        regularMarketVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        dividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        exDividendDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        payoutRatio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiveYearAvgDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        beta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        forwardPE: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        volume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageVolume: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageVolume10days: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        averageDailyVolume10Day: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
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
        marketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekLow: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fiftyTwoWeekHigh: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        twoHundredDayAverage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        priceToSalesTrailing12Months: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendRate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        trailingAnnualDividendYield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        currency: import("@sinclair/typebox").TString;
        algorithm: import("@sinclair/typebox").TNull;
        tradeable: import("@sinclair/typebox").TBoolean;
        yield: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        totalAssets: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        navPrice: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        ytdReturn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        fromCurrency: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        toCurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        lastMarket: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
        volume24Hr: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        volumeAllCurrencies: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        circulatingSupply: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        coinMarketCapLink: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
        expireDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        openInterest: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    summaryProfile: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        address1: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        address2: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        address3: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        city: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        state: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        zip: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        country: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        phone: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        fax: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        website: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industry: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        industryDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sector: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sectorDisp: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        longBusinessSummary: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        fullTimeEmployees: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        companyOfficers: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        twitter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
        }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>>;
        description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    topHoldings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
        stockPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        bondPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        holdings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            symbol: import("@sinclair/typebox").TString;
            holdingName: import("@sinclair/typebox").TString;
            holdingPercent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
        }>>;
        equityHoldings: import("@sinclair/typebox").TObject<{
            medianMarketCap: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            medianMarketCapCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            priceToBook: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            priceToBookCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            priceToCashflow: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            priceToCashflowCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            priceToEarnings: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            priceToEarningsCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            priceToSales: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>;
            priceToSalesCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeYearEarningsGrowth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            threeYearEarningsGrowthCat: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>;
        bondHoldings: import("@sinclair/typebox").TObject<{}>;
        bondRatings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            a: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            aa: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            aaa: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            other: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            b: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            bb: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            bbb: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            below_b: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            us_government: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        sectorWeightings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            realestate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            consumer_cyclical: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            basic_materials: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            consumer_defensive: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            technology: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            communication_services: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            financial_services: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            utilities: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            industrials: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            energy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
            healthcare: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TNumber;
            }>, number>, import("@sinclair/typebox").TNumber]>>;
        }>>;
        cashPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        otherPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        preferredPosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
        convertiblePosition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>>;
    }>>;
    upgradeDowngradeHistory: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        history: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            epochGradeDate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TDate, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
                raw: import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TNumber, Date>;
            }>, Date>, import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString]>, Date>]>;
            firm: import("@sinclair/typebox").TString;
            toGrade: import("@sinclair/typebox").TEnum<typeof EnumGrade>;
            fromGrade: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TEnum<typeof EnumGrade>>;
            action: import("@sinclair/typebox").TEnum<typeof Action>;
        }>>;
        maxAge: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TTransform<import("@sinclair/typebox").TObject<{
            raw: import("@sinclair/typebox").TNumber;
        }>, number>, import("@sinclair/typebox").TNumber]>;
    }>>;
}>;
export type QuoteSummaryResult = StaticDecode<typeof QuoteSummaryResultSchema>;
export {};
