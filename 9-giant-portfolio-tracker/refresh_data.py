#!/usr/bin/env python3
"""
refresh_data.py v3
──────────────────
Quarterly 13F scraper for Giant Portfolio Tracker.
All 20 institutions are HARDCODED below — no Notion dependency.
Fetches holdings from valuesider.com and enriches with static metadata.

Run: pip install requests beautifulsoup4
     python refresh_data.py

13F refresh calendar:
  Q4 (Dec 31) → Feb 14 deadline → run ~Feb 17
  Q1 (Mar 31) → May 15 deadline → run ~May 18
  Q2 (Jun 30) → Aug 14 deadline → run ~Aug 18
  Q3 (Sep 30) → Nov 14 deadline → run ~Nov 17
"""

import json, time, re, sys
from datetime import datetime

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    sys.exit("pip install requests beautifulsoup4")

# ═══════════════════════════════════════════════════════════════════════════
# STATIC INVESTOR MASTER — canonical truth, replaces Notion entirely.
# Fields:
#   id                  internal slug (no spaces)
#   name                exact name used in 13F / valuesider
#   name_zh             Chinese name
#   slug                valuesider.com URL slug
#   representative      lead manager(s)
#   representative_zh   Chinese
#   characteristic      fund type (from Notion: Hedge Fund / Family Office etc.)
#   characteristic_zh
#   investment_style    list of style tags (from Notion)
#   strategy_short      one-line strategy summary (EN)
#   strategy_short_zh   (ZH)
#   founded             year
#   location            {city, state, country, country_zh, lat, lng, flag}
#   latest_aum          numeric, Q2 2026 (USD)
#   latest_aum_display  formatted string
#   latest_date         as-of date, ISO
#   performance_1_5y    text from Notion Performance column
#   cik                 SEC EDGAR CIK (10-digit zero-padded)
#   dataroma_url        direct link to dataroma holdings page
#   valuesider_url      direct link to valuesider portfolio page
#   whalewisdom_url     direct link to whalewisdom filer page
#   hedgefollow_url     direct link to hedgefollow fund page
#   insiderset_url      direct link to insiderset investor page
# ═══════════════════════════════════════════════════════════════════════════

INVESTORS_MASTER = [
    {
        "id": "berkshire",
        "earliest_13f_quarter": "Q4 1999",
        "name": "Warren Buffett - Berkshire Hathaway",
        "name_zh": "沃伦·巴菲特 - 伯克希尔·哈撒韦",
        "slug": "warren-buffett-berkshire-hathaway",
        "representative": "Warren Buffett / Greg Abel",
        "representative_zh": "沃伦·巴菲特 / 格雷格·阿贝尔",
        "characteristic": "Conglomerate",
        "characteristic_zh": "综合企业",
        "investment_style": ["Value Investing", "Long-term", "Concentrated"],
        "strategy_short": "Buy wonderful companies at fair prices and hold forever",
        "strategy_short_zh": "以合理价格买入优秀企业并永久持有",
        "founded": 1965,
        "location": {"city": "Omaha", "state": "NE", "country": "USA",
                     "country_zh": "美国", "lat": 41.26, "lng": -95.94, "flag": "🇺🇸"},
        "latest_aum": 290000000000,
        "latest_aum_display": "$290B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~20% annualized long-term vs S&P 500 ~10%",
        "cik": "0001067983",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=BRK",
        "valuesider_url": "https://valuesider.com/guru/warren-buffett-berkshire-hathaway/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/berkshire-hathaway-inc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Berkshire+Hathaway",
        "insiderset_url": "https://www.insiderset.com/investor/warren-buffett-berkshire-hathaway",
    },
    {
        "id": "tci",
        "earliest_13f_quarter": "Q4 2010",
        "name": "Chris Hohn - TCI Fund Management",
        "name_zh": "克里斯·霍恩 - TCI基金管理",
        "slug": "chris-hohn-tci-fund-management",
        "representative": "Chris Hohn",
        "representative_zh": "克里斯·霍恩",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Quality Activist", "Concentrated"],
        "strategy_short": "Concentrated quality activist — owns 10 stocks, pushes for governance change",
        "strategy_short_zh": "集中持股激进主义——持有10支股票，推动公司治理变革",
        "founded": 2003,
        "location": {"city": "London", "state": "", "country": "UK",
                     "country_zh": "英国", "lat": 51.51, "lng": -0.13, "flag": "🇬🇧"},
        "latest_aum": 46000000000,
        "latest_aum_display": "$46B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~33% annualized 2020-2024",
        "cik": "0001496198",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=TCI",
        "valuesider_url": "https://valuesider.com/guru/chris-hohn-tci-fund-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/tci-fund-management-ltd",
        "hedgefollow_url": "https://hedgefollow.com/funds/TCI+Fund+Management",
        "insiderset_url": "https://www.insiderset.com/investor/chris-hohn-tci-fund-management",
    },
    {
        "id": "viking",
        "earliest_13f_quarter": "Q3 1999",
        "name": "Viking Global Investors",
        "name_zh": "维京全球投资者",
        "slug": "andreas-halvorsen-viking-global-investors",
        "representative": "Andreas Halvorsen",
        "representative_zh": "安德烈亚斯·哈尔沃森",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Long/Short", "Quality Growth"],
        "strategy_short": "Long/short equity; quality growth across sectors; Tiger cub heritage",
        "strategy_short_zh": "多空股票策略；跨行业优质成长；老虎基金系",
        "founded": 1999,
        "location": {"city": "Greenwich", "state": "CT", "country": "USA",
                     "country_zh": "美国", "lat": 41.03, "lng": -73.63, "flag": "🇺🇸"},
        "latest_aum": 36000000000,
        "latest_aum_display": "$36B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~20%+ annualized since 1999; top Tiger cub by AUM",
        "cik": "0001109048",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=vg",
        "valuesider_url": "https://valuesider.com/guru/andreas-halvorsen-viking-global-investors/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/viking-global-investors-lp",
        "hedgefollow_url": "https://hedgefollow.com/funds/Viking+Global+Investors",
        "insiderset_url": "https://www.insiderset.com/investor/viking-global-investors",
    },
    {
        "id": "tiger",
        "earliest_13f_quarter": "Q4 2001",
        "name": "Chase Coleman - Tiger Global Management",
        "name_zh": "蔡斯·科尔曼 - 老虎全球管理",
        "slug": "chase-coleman-tiger-global-management",
        "representative": "Chase Coleman",
        "representative_zh": "蔡斯·科尔曼",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Tech Growth", "Long/Short"],
        "strategy_short": "Tech-focused long/short; Tiger cub; internet, SaaS, semis",
        "strategy_short_zh": "科技多空策略；老虎基金系；互联网、SaaS、半导体",
        "founded": 2001,
        "location": {"city": "New York", "state": "NY", "country": "USA",
                     "country_zh": "美国", "lat": 40.71, "lng": -74.01, "flag": "🇺🇸"},
        "latest_aum": 23000000000,
        "latest_aum_display": "$23B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~26% annualized 2001-2020; Tiger cub; recovered strongly post-2022",
        "cik": "0001167483",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=TGM",
        "valuesider_url": "https://valuesider.com/guru/chase-coleman-tiger-global-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/tiger-global-management-llc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Tiger+Global+Management",
        "insiderset_url": "https://www.insiderset.com/investor/chase-coleman-tiger-global-management",
    },
    {
        "id": "hh",
        "earliest_13f_quarter": "Q4 2017",
        "name": "Duan Yongping - H&H International Investment",
        "name_zh": "段永平 - 鸿和国际投资",
        "slug": "duan-yongping-h-h-international-investment",
        "representative": "Duan Yongping",
        "representative_zh": "段永平",
        "characteristic": "Family Office",
        "characteristic_zh": "家族投资办公室",
        "investment_style": ["Concentrated", "Long-term"],
        "strategy_short": "Ultra-concentrated, ultra-long-term; AAPL + GOOG dominant; Chinese billionaire (VIVO, BBK)",
        "strategy_short_zh": "超级集中、超长期持有；苹果+谷歌主导；中国企业家（步步高、vivo联合创始人）",
        "founded": 2000,
        "location": {"city": "Atherton", "state": "CA", "country": "USA",
                     "country_zh": "美国（华裔）", "lat": 37.46, "lng": -122.20, "flag": "🇺🇸"},
        "latest_aum": 20000000000,
        "latest_aum_display": "$20B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "Concentrated in AAPL, GOOG since early 2010s — significant gains",
        "cik": "0001766825",
        "dataroma_url": "https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio",
        "valuesider_url": "https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/h-h-international-investment",
        "hedgefollow_url": "https://hedgefollow.com/funds/H%26H+International+Investment",
        "insiderset_url": "https://www.insiderset.com/investor/duan-yongping-handh-international-investment",
    },
    {
        "id": "pershing",
        "earliest_13f_quarter": "Q4 2004",
        "name": "Bill Ackman - Pershing Square Capital Management",
        "name_zh": "比尔·阿克曼 - 潘兴广场资本管理",
        "slug": "bill-ackman-pershing-square-capital-management",
        "representative": "Bill Ackman",
        "representative_zh": "比尔·阿克曼",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Activist", "Concentrated"],
        "strategy_short": "Concentrated activist; 8–14 positions; very public campaigns",
        "strategy_short_zh": "集中激进主义；8-14个持仓；高调公开维权",
        "founded": 2004,
        "location": {"city": "New York", "state": "NY", "country": "USA",
                     "country_zh": "美国", "lat": 40.71, "lng": -74.01, "flag": "🇺🇸"},
        "latest_aum": 19470000000,
        "latest_aum_display": "$19.47B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~26% annualized since 2004 inception",
        "cik": "0001336528",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=PS",
        "valuesider_url": "https://valuesider.com/guru/bill-ackman-pershing-square-capital-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/pershing-square-capital-management-l-p",
        "hedgefollow_url": "https://hedgefollow.com/funds/Pershing+Square+Capital+Management",
        "insiderset_url": "https://www.insiderset.com/investor/bill-ackman-pershing-square-capital-management",
    },
    {
        "id": "lone_pine",
        "earliest_13f_quarter": "Q4 1999",
        "name": "Stephen Mandel - Lone Pine Capital",
        "name_zh": "史蒂芬·曼德尔 - 孤松资本",
        "slug": "stephen-mandel-lone-pine-capital",
        "representative": "Stephen Mandel",
        "representative_zh": "史蒂芬·曼德尔",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Long/Short", "Quality Growth"],
        "strategy_short": "Long/short quality growth; Tiger cub; Mandel retired 2019, team continues",
        "strategy_short_zh": "多空优质成长；老虎基金系；曼德尔2019年退休，团队持续运营",
        "founded": 1997,
        "location": {"city": "Greenwich", "state": "CT", "country": "USA",
                     "country_zh": "美国", "lat": 41.03, "lng": -73.63, "flag": "🇺🇸"},
        "latest_aum": 12600000000,
        "latest_aum_display": "$12.6B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~20% annualized 1997-2019; Tiger cub; Mandel retired 2019",
        "cik": "0001061165",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=LP",
        "valuesider_url": "https://valuesider.com/guru/stephen-mandel-lone-pine-capital/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/lone-pine-capital-llc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Lone+Pine+Capital",
        "insiderset_url": "https://www.insiderset.com/investor/stephen-mandel-lone-pine-capital",
    },
    {
        "id": "icahn",
        "earliest_13f_quarter": "Q1 1994",
        "name": "Carl Icahn - Icahn Capital Management",
        "name_zh": "卡尔·伊坎 - 伊坎资本管理",
        "slug": "carl-icahn-icahn-capital-management",
        "representative": "Carl Icahn",
        "representative_zh": "卡尔·伊坎",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Activist", "Concentrated"],
        "strategy_short": "Activist pioneer since 1960s; forces board changes, buybacks, spin-offs",
        "strategy_short_zh": "激进主义先驱，自1960年代；推动董事会变革、回购和分拆",
        "founded": 1987,
        "location": {"city": "Sunny Isles Beach", "state": "FL", "country": "USA",
                     "country_zh": "美国", "lat": 25.95, "lng": -80.12, "flag": "🇺🇸"},
        "latest_aum": 8700000000,
        "latest_aum_display": "$8.7B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~30%+ annualized 1968-2011; activist pioneer",
        "cik": "0000813762",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=ic",
        "valuesider_url": "https://valuesider.com/guru/carl-icahn-icahn-capital-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/icahn-capital-lp",
        "hedgefollow_url": "https://hedgefollow.com/funds/Icahn+Capital",
        "insiderset_url": "https://www.insiderset.com/investor/carl-icahn-icahn-capital-management",
    },
    {
        "id": "altimeter",
        "earliest_13f_quarter": "Q1 2012",
        "name": "Altimeter Capital",
        "name_zh": "高度计资本",
        "slug": "brad-gerstner-altimeter-capital",
        "representative": "Brad Gerstner",
        "representative_zh": "布拉德·格斯特纳",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["AI / Tech", "Concentrated"],
        "strategy_short": "AI-first concentrated tech; early investor in Snowflake, CoreWeave, Cerebras",
        "strategy_short_zh": "AI优先集中科技投资；早期投资Snowflake、CoreWeave、Cerebras",
        "founded": 2008,
        "location": {"city": "Menlo Park", "state": "CA", "country": "USA",
                     "country_zh": "美国", "lat": 37.45, "lng": -122.18, "flag": "🇺🇸"},
        "latest_aum": 7500000000,
        "latest_aum_display": "$7.5B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "Strong AI-driven returns; early CoreWeave, Snowflake investor",
        "cik": "0001569565",
        "dataroma_url": "https://valuesider.com/guru/brad-gerstner-altimeter-capital-management/portfolio",
        "valuesider_url": "https://valuesider.com/guru/brad-gerstner-altimeter-capital-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/altimeter-capital-management-lp",
        "hedgefollow_url": "https://hedgefollow.com/funds/Altimeter+Capital+Management",
        "insiderset_url": "https://www.insiderset.com/investor/brad-gerstner-altimeter-capital-management",
    },
    {
        "id": "akre",
        "earliest_13f_quarter": "Q2 2007",
        "name": "Chuck Akre - Akre Capital Management",
        "name_zh": "查克·阿克里 - 阿克里资本管理",
        "slug": "chuck-akre-akre-capital-management",
        "representative": "Chuck Akre",
        "representative_zh": "查克·阿克里",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Quality Compounders", "Long-term"],
        "strategy_short": "Three-legged stool: great business + great management + great reinvestment",
        "strategy_short_zh": "三脚凳理论：优质商业模式+卓越管理层+卓越再投资能力",
        "founded": 1989,
        "location": {"city": "Middleburg", "state": "VA", "country": "USA",
                     "country_zh": "美国", "lat": 38.97, "lng": -77.73, "flag": "🇺🇸"},
        "latest_aum": 6200000000,
        "latest_aum_display": "$6.2B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~14% annualized vs S&P 500 ~10% since 1989",
        "cik": "0001286188",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=AKRE",
        "valuesider_url": "https://valuesider.com/guru/chuck-akre-akre-capital-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/akre-capital-management-llc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Akre+Capital+Management",
        "insiderset_url": "https://www.insiderset.com/investor/chuck-akre-akre-capital-management",
    },
    {
        "id": "greenhaven",
        "earliest_13f_quarter": "Q4 1993",
        "name": "Greenhaven Associates",
        "name_zh": "绿港投资",
        "slug": "edgar-wachenheim-III-greenhaven-associates",
        "representative": "Edgar Wachenheim III",
        "representative_zh": "埃德加·瓦肯海姆三世",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Concentrated", "Value Investing"],
        "strategy_short": "Low P/E value; concentrated homebuilders + autos + financials; very low turnover",
        "strategy_short_zh": "低市盈率价值投资；集中持有房建商、汽车、金融股；极低换手率",
        "founded": 1987,
        "location": {"city": "Purchase", "state": "NY", "country": "USA",
                     "country_zh": "美国", "lat": 41.05, "lng": -73.71, "flag": "🇺🇸"},
        "latest_aum": 6100000000,
        "latest_aum_display": "$6.1B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~15% annualized long-term; author of 'Common Stocks and Common Sense'",
        "cik": "0000820466",
        "dataroma_url": "https://whalewisdom.com/filer/greenhaven-associates-inc",
        "valuesider_url": "https://valuesider.com/guru/edgar-wachenheim-III-greenhaven-associates/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/greenhaven-associates-inc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Greenhaven+Associates",
        "insiderset_url": "https://www.insiderset.com/investor/edgar-wachenheim-greenhaven-associates",
    },
    {
        "id": "appaloosa",
        "earliest_13f_quarter": "Q1 1994",
        "name": "David Tepper - Appaloosa Management",
        "name_zh": "大卫·泰珀 - 阿帕卢萨管理",
        "slug": "david-tepper-appaloosa-management",
        "representative": "David Tepper",
        "representative_zh": "大卫·泰珀",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Macro", "Value Investing"],
        "strategy_short": "Macro-driven distressed + opportunistic; famous 2009 bank trade; heavy China bets",
        "strategy_short_zh": "宏观驱动的困境投资+机会主义；2009年银行股经典交易；重仓中国股票",
        "founded": 1993,
        "location": {"city": "Miami Beach", "state": "FL", "country": "USA",
                     "country_zh": "美国", "lat": 25.79, "lng": -80.13, "flag": "🇺🇸"},
        "latest_aum": 6000000000,
        "latest_aum_display": "$6B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~30% annualized in peak years; famous 2009 bank trade",
        "cik": "0001006438",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=AM",
        "valuesider_url": "https://valuesider.com/guru/david-tepper-appaloosa-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/appaloosa-lp",
        "hedgefollow_url": "https://hedgefollow.com/funds/Appaloosa",
        "insiderset_url": "https://www.insiderset.com/investor/david-tepper-appaloosa-management",
    },
    {
        "id": "baupost",
        "earliest_13f_quarter": "Q1 1993",
        "name": "Seth Klarman - Baupost Group",
        "name_zh": "赛斯·卡拉曼 - 鲍波斯特集团",
        "slug": "seth-klarman-baupost-group",
        "representative": "Seth Klarman",
        "representative_zh": "赛斯·卡拉曼",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Deep Value", "Distressed", "Concentrated"],
        "strategy_short": "Absolute return value; significant cash when no margin of safety; author of 'Margin of Safety'",
        "strategy_short_zh": "绝对收益价值投资；无安全边际时持有大量现金；《安全边际》作者",
        "founded": 1982,
        "location": {"city": "Boston", "state": "MA", "country": "USA",
                     "country_zh": "美国", "lat": 42.36, "lng": -71.06, "flag": "🇺🇸"},
        "latest_aum": 5300000000,
        "latest_aum_display": "$5.3B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~16% annualized since 1982 inception",
        "cik": "0001061219",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=BSG",
        "valuesider_url": "https://valuesider.com/guru/seth-klarman-baupost-group/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/baupost-group-llc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Baupost+Group+Ma",
        "insiderset_url": "https://www.insiderset.com/investor/seth-klarman-baupost-group",
    },
    {
        "id": "abrams",
        "earliest_13f_quarter": "Q1 2000",
        "name": "David Abrams - Abrams Capital Management",
        "name_zh": "大卫·阿布拉姆斯 - 阿布拉姆斯资本管理",
        "slug": "david-abrams-abrams-capital-management",
        "representative": "David Abrams",
        "representative_zh": "大卫·阿布拉姆斯",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Deep Value", "Concentrated"],
        "strategy_short": "No leverage, no shorts, extremely concentrated deep value; Baupost alum",
        "strategy_short_zh": "无杠杆、无做空、极度集中的深度价值投资；鲍波斯特前员工",
        "founded": 1999,
        "location": {"city": "Boston", "state": "MA", "country": "USA",
                     "country_zh": "美国", "lat": 42.36, "lng": -71.06, "flag": "🇺🇸"},
        "latest_aum": 4700000000,
        "latest_aum_display": "$4.7B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~15%+ annualized, no leverage, no shorts",
        "cik": "0001112520",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=ABC",
        "valuesider_url": "https://valuesider.com/guru/david-abrams-abrams-capital-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/abrams-capital-management-l-p",
        "hedgefollow_url": "https://hedgefollow.com/funds/Abrams+Capital+Management",
        "insiderset_url": "https://www.insiderset.com/investor/david-abrams-abrams-capital-management",
    },
    {
        "id": "valley_forge",
        "earliest_13f_quarter": "Q2 2012",
        "name": "Valley Forge Capital Management",
        "name_zh": "福吉谷资本管理",
        "slug": "dev-kantesaria-valley-forge-capital-management",
        "representative": "Dev Kantesaria",
        "representative_zh": "戴夫·坎特萨利亚",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Quality Compounders", "Concentrated"],
        "strategy_short": "7 positions only; financial info infrastructure moats (FICO, SPGI, MCO, MA)",
        "strategy_short_zh": "仅持7支股票；金融信息基础设施护城河（FICO、标普、穆迪、万事达）",
        "founded": 2007,
        "location": {"city": "Wayne", "state": "PA", "country": "USA",
                     "country_zh": "美国", "lat": 40.04, "lng": -75.39, "flag": "🇺🇸"},
        "latest_aum": 3116388059,
        "latest_aum_display": "$3.1B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~15% annualized since 2007, beats S&P 500 consistently",
        "cik": "0001592987",
        "dataroma_url": "https://valuesider.com/guru/dev-kantesaria-valley-forge-capital-management/portfolio",
        "valuesider_url": "https://valuesider.com/guru/dev-kantesaria-valley-forge-capital-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/valley-forge-capital-management",
        "hedgefollow_url": "https://hedgefollow.com/funds/Valley+Forge+Capital+Management",
        "insiderset_url": "https://www.insiderset.com/investor/dev-kantesaria-valley-forge-capital-management",
    },
    {
        "id": "trian",
        "earliest_13f_quarter": "Q1 2006",
        "name": "Nelson Peltz - Trian Fund Management",
        "name_zh": "纳尔逊·佩尔茨 - 特里安基金管理",
        "slug": "nelson-peltz-trian-fund-management",
        "representative": "Nelson Peltz / Peter May / Ed Garden",
        "representative_zh": "纳尔逊·佩尔茨 / 彼得·梅 / 埃德·加登",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Activist", "Value Investing"],
        "strategy_short": "Industrial/consumer activist; board seats, operational improvement; P&G, Disney campaigns",
        "strategy_short_zh": "工业/消费品激进主义；争夺董事席位、推动运营改善；宝洁、迪士尼维权",
        "founded": 2005,
        "location": {"city": "Palm Beach", "state": "FL", "country": "USA",
                     "country_zh": "美国", "lat": 26.71, "lng": -80.04, "flag": "🇺🇸"},
        "latest_aum": 4000000000,
        "latest_aum_display": "$4B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "Activist-driven returns; notable campaigns at P&G, Disney, Wendy's",
        "cik": "0001418814",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=TFP",
        "valuesider_url": "https://valuesider.com/guru/nelson-peltz-trian-fund-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/trian-fund-management-l-p",
        "hedgefollow_url": "https://hedgefollow.com/funds/Trian+Fund+Management",
        "insiderset_url": "https://www.insiderset.com/investor/nelson-peltz-trian-fund-management",
    },
    {
        "id": "duquesne",
        "earliest_13f_quarter": "Q2 2013",
        "name": "Duquesne Family Office",
        "name_zh": "杜肯家族办公室",
        "slug": "stanley-druckenmiller-duquesne-family-office-llc",
        "representative": "Stanley Druckenmiller",
        "representative_zh": "斯坦利·德鲁肯米勒",
        "characteristic": "Family Office",
        "characteristic_zh": "家族办公室",
        "investment_style": ["Macro", "Concentrated Equity"],
        "strategy_short": "Global macro with concentrated equity; Soros partner; 30+ yr 30% annualized record",
        "strategy_short_zh": "全球宏观+集中持股；索罗斯前合伙人；30年+年化30%的业绩记录",
        "founded": 1981,
        "location": {"city": "New York", "state": "NY", "country": "USA",
                     "country_zh": "美国", "lat": 40.71, "lng": -74.01, "flag": "🇺🇸"},
        "latest_aum": 3500000000,
        "latest_aum_display": "$3.5B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~30% annualized during Duquesne hedge fund era (1981-2010)",
        "cik": "0001536411",
        "dataroma_url": "https://whalewisdom.com/filer/duquesne-family-office-llc",
        "valuesider_url": "https://valuesider.com/guru/stanley-druckenmiller-duquesne-family-office/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/duquesne-family-office-llc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Duquesne+Family+Office",
        "insiderset_url": "https://www.insiderset.com/investor/stanley-druckenmiller-duquesne-family-office",
    },
    {
        "id": "himalaya",
        "earliest_13f_quarter": "Q3 2006",
        "name": "Li Lu - Himalaya Capital Management",
        "name_zh": "李录 - 喜马拉雅资本管理",
        "slug": "li-lu-himalaya-capital-management",
        "representative": "Li Lu",
        "representative_zh": "李录",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Concentrated", "Global Value"],
        "strategy_short": "Ultra-concentrated global value; China expertise; Buffett's trusted successor candidate",
        "strategy_short_zh": "超级集中全球价值投资；中国专家；巴菲特信任的接班人候选人",
        "founded": 1997,
        "location": {"city": "San Francisco", "state": "CA", "country": "USA",
                     "country_zh": "美国（华裔）", "lat": 37.77, "lng": -122.42, "flag": "🇺🇸"},
        "latest_aum": 3300000000,
        "latest_aum_display": "$3.3B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~24% annualized since 1998 inception",
        "cik": "0001709323",
        "dataroma_url": "https://whalewisdom.com/filer/himalaya-capital-investors",
        "valuesider_url": "https://valuesider.com/guru/li-lu-himalaya-capital-management/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/himalaya-capital-investors",
        "hedgefollow_url": "https://hedgefollow.com/funds/Himalaya+Capital+Management",
        "insiderset_url": "https://www.insiderset.com/investor/li-lu-himalaya-capital-management",
    },
    {
        "id": "greenlight",
        "earliest_13f_quarter": "Q4 1999",
        "name": "David Einhorn - Greenlight Capital",
        "name_zh": "大卫·艾因霍恩 - 绿光资本",
        "slug": "david-einhorn-greenlight-capital",
        "representative": "David Einhorn",
        "representative_zh": "大卫·艾因霍恩",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Value Investing", "Long/Short"],
        "strategy_short": "Deep value long/short; famous Lehman short; homebuilder GRBK as core long",
        "strategy_short_zh": "深度价值多空策略；著名做空雷曼兄弟；核心长仓为房建商GRBK",
        "founded": 1996,
        "location": {"city": "New York", "state": "NY", "country": "USA",
                     "country_zh": "美国", "lat": 40.71, "lng": -74.01, "flag": "🇺🇸"},
        "latest_aum": 3100000000,
        "latest_aum_display": "$3.1B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~20% annualized 1996-2014; known for Lehman short call",
        "cik": "0001079114",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=GLC",
        "valuesider_url": "https://valuesider.com/guru/david-einhorn-greenlight-capital/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/greenlight-capital-inc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Greenlight+Capital",
        "insiderset_url": "https://www.insiderset.com/investor/david-einhorn-greenlight-capital",
    },
    {
        "id": "third_point",
        "earliest_13f_quarter": "Q4 1996",
        "name": "Daniel Loeb - Third Point",
        "name_zh": "丹尼尔·勒布 - 第三点对冲基金",
        "slug": "daniel-loeb-third-point",
        "representative": "Daniel Loeb",
        "representative_zh": "丹尼尔·勒布",
        "characteristic": "Hedge Fund",
        "characteristic_zh": "对冲基金",
        "investment_style": ["Activist", "Event-Driven"],
        "strategy_short": "Event-driven activist; famous for blunt shareholder letters; tech + media focus",
        "strategy_short_zh": "事件驱动激进主义；以直白的股东信著称；科技+媒体重点",
        "founded": 1995,
        "location": {"city": "New York", "state": "NY", "country": "USA",
                     "country_zh": "美国", "lat": 40.71, "lng": -74.01, "flag": "🇺🇸"},
        "latest_aum": 2100000000,
        "latest_aum_display": "$2.1B",
        "latest_date": "2026-06-30",
        "performance_1_5y": "~15% annualized since 1995; known for shareholder letters",
        "cik": "0001040273",
        "dataroma_url": "https://www.dataroma.com/m/holdings.php?m=tp",
        "valuesider_url": "https://valuesider.com/guru/daniel-loeb-third-point/portfolio",
        "whalewisdom_url": "https://whalewisdom.com/filer/third-point-llc",
        "hedgefollow_url": "https://hedgefollow.com/funds/Third+Point",
        "insiderset_url": "https://www.insiderset.com/investor/daniel-loeb-third-point",
    },
]

# ── Holdings schema (designed by Claude) ────────────────────────────────────
# Each holding in data.json["investors"][n]["holdings"] has:
#   rank         int   — position rank by % of portfolio
#   ticker       str   — stock symbol (e.g. AAPL)
#   company      str   — company name in English
#   company_zh   str   — company name in Chinese
#   pct          float — % of total 13F portfolio
#   activity     str   — Buy | Add | Reduce | Unchanged | Sold Out
#   shares       int?  — shares held at quarter end (null if not reported)
#   value        int?  — market value USD at quarter end (null if not reported)
#   price        float?— closing price at quarter end
#   hq_country   str   — stock's HQ country
#   hq_city      str   — stock's HQ city, state
#   sector       str   — GICS sector of the stock

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

def clean_num(s):
    if not s: return None
    s = str(s).replace(",", "").replace("$", "").replace("%", "").strip()
    for suf, m in [("T",1e12),("B",1e9),("M",1e6),("K",1e3)]:
        if s.upper().endswith(suf):
            try: return float(s[:-1]) * m
            except: pass
    try: return float(s)
    except: return None

def map_act(raw):
    r = (raw or "").strip().lower()
    if "new" in r or r == "buy": return "Buy"
    if "add" in r or "incr" in r: return "Add"
    if "reduc" in r or "trim" in r or "decr" in r: return "Reduce"
    if "sell" in r or "exit" in r or "100%" in r: return "Sold Out"
    return "Unchanged"

def fetch_valuesider(meta):
    slug = meta["slug"]
    url = f"https://valuesider.com/guru/{slug}/portfolio?sort=-percent_portfolio"
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        r.raise_for_status()
    except Exception as e:
        print(f"  ✗ {e}"); return None
    soup = BeautifulSoup(r.text, "html.parser")
    full = soup.get_text(" ", strip=True)
    aum = None; num_h = None; quarter = None
    m = re.search(r"\$([\d,.]+)\s*([BMT])~?", full)
    if m: aum = clean_num(m.group(1) + m.group(2))
    m = re.search(r"(\d+)\s+(?:security\s+)?holdings?", full, re.I)
    if m: num_h = int(m.group(1))
    m = re.search(r"(\d{4}\s+Q[1-4])", full)
    if m: quarter = m.group(1)
    holdings = []
    for tbl in soup.find_all("table"):
        for row in tbl.find_all("tr")[1:]:
            cells = [td.get_text(" ", strip=True) for td in row.find_all(["td","th"])]
            if len(cells) < 3: continue
            ticker = ""
            for td in row.find_all("td"):
                for a in td.find_all("a"):
                    # Method 1: ticker from link text (e.g. "AAPL")
                    t = a.get_text(strip=True)
                    if t and len(t) <= 10 and t.replace("-","").replace(".","").isupper() and len(t) >= 1:
                        ticker = t; break
                    # Method 2: ticker from href (e.g. /stock/AAPL or /guru/AAPL)
                    href = a.get("href", "")
                    for segment in href.split("/"):
                        s = segment.upper().replace("-","").replace(".","")
                        if 1 <= len(segment) <= 10 and segment.replace("-","").replace(".","").isupper():
                            ticker = segment.upper()
                            break
                    if ticker: break
                if ticker: break
            # Method 3: ticker from cell text "AAPL - Apple Inc." format
            if not ticker:
                for td in row.find_all("td"):
                    text = td.get_text(" ", strip=True)
                    m = re.match(r"^([A-Z][A-Z0-9\.\-]{1,9})\s+[-–]\s+", text)
                    if m:
                        ticker = m.group(1)
                        break
            pct = None; value = None; activity = "Unchanged"; company = ""
            for c in cells:
                if pct is None and "%" in c and len(c) < 10: pct = clean_num(c.replace("%",""))
                if "$" in c and value is None and len(c) < 20: value = clean_num(c)
                if any(w in c for w in ["Add","Buy","New","Reduce","Sell","Unchanged"]): activity = map_act(c)
            for td in row.find_all("td"):
                txt = td.get_text(" ", strip=True)
                if 5 < len(txt) < 70 and " " in txt and "$" not in txt and "%" not in txt:
                    import re as _re
                    if not _re.match(r"^[\d+\-.$%,]+$", txt): company = txt; break
            if pct and pct > 0:
                holdings.append({"rank": len(holdings)+1, "ticker": ticker, "company": company,
                                  "company_zh": "", "pct": round(pct, 4), "activity": activity,
                                  "shares": None, "value": value, "price": None,
                                  "hq_country": "", "hq_city": "", "sector": ""})
            if len(holdings) >= 15: break
        if holdings: break
    fmt = lambda v: (f"${v/1e12:.2f}T" if v and v>=1e12 else f"${v/1e9:.2f}B" if v and v>=1e9 else f"${v/1e6:.1f}M" if v and v>=1e6 else None)
    return {"aum": aum or meta["latest_aum"], "aum_display": fmt(aum) or meta["latest_aum_display"],
            "num_holdings": num_h, "quarter": quarter, "holdings": holdings}


def inject_data_into_html(data):
    """
    Embeds the updated data.json contents directly into index.html as a JS variable.
    This makes the site work instantly with no fetch() latency, and works on file://
    as well as any CDN/server deployment.
    Called automatically after each quarterly refresh.
    """
    import re
    try:
        with open("index.html") as f:
            html = f.read()
        data_js = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        # CRITICAL: escape </script> and <script so browser doesn't close tag early
        data_js = data_js.replace("</script>", r"<\/script>").replace("<script", r"<\u0073cript")
        # Replace the inline data script tag
        html = re.sub(
            r'<script>const __INLINE_DATA__=.*?;</script>',
            f'<script>const __INLINE_DATA__={data_js};</script>',
            html,
            flags=re.DOTALL
        )
        with open("index.html", "w") as f:
            f.write(html)
        print(f"  ✓ index.html updated with fresh inline data ({len(data_js)//1024}KB)")
    except Exception as e:
        print(f"  ⚠ Could not update index.html: {e}")

def fetch_whalewisdom_top_filers(limit=100):
    """
    Fetch top institutional 13F filers from WhaleWisdom.
    Returns list of {name, aum, cik, type, source} dicts sorted by AUM.
    These supplement our 20 tracked investors in the Map Overview.
    Source: https://whalewisdom.com/filer/top_filers
    """
    url = "https://whalewisdom.com/filer/top_filers"
    # Fallback URLs to try
    fallback_urls = ["https://whalewisdom.com/filer/top", "https://whalewisdom.com/top_holders"]
    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        results = []
        for row in soup.find_all("tr")[1:limit+1]:
            cells = [td.get_text(" ", strip=True) for td in row.find_all(["td","th"])]
            if len(cells) < 3:
                continue
            name = cells[1] if len(cells) > 1 else cells[0]
            aum_raw = cells[2] if len(cells) > 2 else ""
            aum = clean_num(aum_raw) or 0
            if not name or aum == 0:
                continue
            results.append({
                "name": name.strip(),
                "aum": aum,
                "aum_d": aum_raw.strip(),
                "type": cells[3] if len(cells) > 3 else "",
                "source": "WhaleWisdom",
                "tracked": False,
            })
        print(f"  WhaleWisdom top filers: {len(results)} fetched")
        return results
    except Exception as e:
        print(f"  WhaleWisdom fetch failed: {e}")
        return []

def build_extended_filers(tracked_investors, ww_filers=None):
    """
    Combine our tracked investors + WhaleWisdom top filers,
    deduplicate, and sort by AUM descending.
    """
    # Build from our tracked investors first
    tracked_names = {inv["name"] for inv in tracked_investors}
    combined = []
    
    # Add tracked investors
    for inv in tracked_investors:
        combined.append({
            "name": inv["name"],
            "name_zh": inv.get("name_zh",""),
            "aum": inv.get("aum", inv.get("latest_aum", 0)),
            "aum_d": inv.get("aum_display","—"),
            "cik": inv.get("cik",""),
            "type": inv.get("characteristic",""),
            "type_zh": inv.get("characteristic_zh",""),
            "style": inv.get("investment_style",[]),
            "earliest": inv.get("earliest_13f_quarter",""),
            "source": "Valuesider / WhaleWisdom",
            "tracked": True,
            "representative": inv.get("representative",""),
            "representative_zh": inv.get("representative_zh",""),
        })
    
    # Add WhaleWisdom filers not already tracked
    if ww_filers:
        for f in ww_filers:
            if f["name"] not in tracked_names:
                combined.append(f)
    
    # Fallback static list for well-known institutions if WW fetch failed
    static_filers = [
        {"name":"Vanguard Group Inc","aum":7200000000000,"aum_d":"$7.2T","cik":"0000102909","type":"Mutual Fund Complex","style":["Index","Passive"],"source":"SEC EDGAR","tracked":False},
        {"name":"BlackRock Inc","aum":4800000000000,"aum_d":"$4.8T","cik":"0001364742","type":"Asset Manager","style":["Multi-Strategy","Index"],"source":"SEC EDGAR","tracked":False},
        {"name":"State Street Corp","aum":3800000000000,"aum_d":"$3.8T","cik":"0000093751","type":"Asset Manager","style":["Index","ETF"],"source":"SEC EDGAR","tracked":False},
        {"name":"Fidelity Management & Research","aum":2400000000000,"aum_d":"$2.4T","cik":"0000315066","type":"Mutual Fund","style":["Active Growth"],"source":"SEC EDGAR","tracked":False},
        {"name":"JPMorgan Chase & Co","aum":2100000000000,"aum_d":"$2.1T","cik":"0000019617","type":"Bank / Asset Manager","style":["Multi-Strategy"],"source":"SEC EDGAR","tracked":False},
        {"name":"Capital Group Companies","aum":2000000000000,"aum_d":"$2.0T","cik":"0000277609","type":"Mutual Fund","style":["Active Growth"],"source":"SEC EDGAR","tracked":False},
        {"name":"Wellington Management Group","aum":1800000000000,"aum_d":"$1.8T","cik":"0000101879","type":"Investment Advisor","style":["Multi-Strategy"],"source":"SEC EDGAR","tracked":False},
        {"name":"T. Rowe Price Associates","aum":1500000000000,"aum_d":"$1.5T","cik":"0001113169","type":"Mutual Fund","style":["Active Growth"],"source":"SEC EDGAR","tracked":False},
        {"name":"Invesco Ltd","aum":1400000000000,"aum_d":"$1.4T","cik":"0000914208","type":"Asset Manager","style":["Multi-Strategy","ETF"],"source":"SEC EDGAR","tracked":False},
        {"name":"Northern Trust Corp","aum":1200000000000,"aum_d":"$1.2T","cik":"0000073124","type":"Asset Manager","style":["Passive"],"source":"SEC EDGAR","tracked":False},
        {"name":"Goldman Sachs Group Inc","aum":1100000000000,"aum_d":"$1.1T","cik":"0000886982","type":"Investment Bank","style":["Multi-Strategy"],"source":"SEC EDGAR","tracked":False},
        {"name":"Morgan Stanley","aum":1050000000000,"aum_d":"$1.05T","cik":"0000895421","type":"Investment Bank","style":["Multi-Strategy"],"source":"SEC EDGAR","tracked":False},
        {"name":"Geode Capital Management","aum":1000000000000,"aum_d":"$1.0T","cik":"0001109517","type":"Quantitative","style":["Passive"],"source":"SEC EDGAR","tracked":False},
        {"name":"Bank of America Corp","aum":950000000000,"aum_d":"$950B","cik":"0000070858","type":"Bank","style":["Multi-Strategy"],"source":"SEC EDGAR","tracked":False},
        {"name":"UBS Group AG","aum":800000000000,"aum_d":"$800B","cik":"0001114446","type":"Investment Bank","style":["Global"],"source":"SEC EDGAR","tracked":False},
        {"name":"Wells Fargo & Company","aum":780000000000,"aum_d":"$780B","cik":"0000072971","type":"Bank","style":["Multi-Strategy"],"source":"SEC EDGAR","tracked":False},
        {"name":"Dimensional Fund Advisors","aum":680000000000,"aum_d":"$680B","cik":"0000354204","type":"Quantitative","style":["Factor","Value"],"source":"SEC EDGAR","tracked":False},
        {"name":"Citadel Advisors LLC","aum":540000000000,"aum_d":"$540B","cik":"0001423241","type":"Hedge Fund","style":["Multi-Strategy","Quant"],"source":"SEC EDGAR","tracked":False},
        {"name":"AQR Capital Management","aum":95000000000,"aum_d":"$95B","cik":"0001328737","type":"Hedge Fund","style":["Quantitative","Multi-Factor"],"source":"SEC EDGAR","tracked":False},
        {"name":"Renaissance Technologies","aum":120000000000,"aum_d":"$120B","cik":"0001037389","type":"Hedge Fund","style":["Quantitative"],"source":"SEC EDGAR","tracked":False},
        {"name":"Bridgewater Associates","aum":100000000000,"aum_d":"$100B","cik":"0001350487","type":"Hedge Fund","style":["Global Macro"],"source":"SEC EDGAR","tracked":False},
        {"name":"D.E. Shaw & Co","aum":90000000000,"aum_d":"$90B","cik":"0001009571","type":"Hedge Fund","style":["Quantitative"],"source":"SEC EDGAR","tracked":False},
        {"name":"Two Sigma Investments","aum":75000000000,"aum_d":"$75B","cik":"0001494922","type":"Hedge Fund","style":["Quantitative"],"source":"SEC EDGAR","tracked":False},
        {"name":"Millennium Management","aum":70000000000,"aum_d":"$70B","cik":"0001273931","type":"Hedge Fund","style":["Multi-Strategy"],"source":"SEC EDGAR","tracked":False},
        {"name":"Point72 Asset Management","aum":30000000000,"aum_d":"$30B","cik":"0001603396","type":"Hedge Fund","style":["Multi-Strategy"],"source":"SEC EDGAR","tracked":False},
        {"name":"Dodge & Cox","aum":320000000000,"aum_d":"$320B","cik":"0000029001","type":"Mutual Fund","style":["Value"],"source":"SEC EDGAR","tracked":False},
        {"name":"First Eagle Investment Management","aum":52000000000,"aum_d":"$52B","cik":"0000036996","type":"Mutual Fund","style":["Global Value"],"source":"SEC EDGAR","tracked":False},
        {"name":"Parnassus Investments","aum":38000000000,"aum_d":"$38B","cik":"0000881346","type":"Mutual Fund","style":["ESG","Quality"],"source":"SEC EDGAR","tracked":False},
        {"name":"Southeastern Asset Management","aum":9000000000,"aum_d":"$9B","cik":"0000884905","type":"Investment Advisor","style":["Deep Value"],"source":"SEC EDGAR","tracked":False},
        {"name":"Yacktman Asset Management","aum":6000000000,"aum_d":"$6B","cik":"0000768835","type":"Investment Advisor","style":["Value","Quality"],"source":"SEC EDGAR","tracked":False},
    ]
    existing_names = {x["name"] for x in combined}
    for sf in static_filers:
        if sf["name"] not in existing_names:
            combined.append(sf)
    
    combined.sort(key=lambda x: x.get("aum",0), reverse=True)
    return combined

# ── Quarter date lookup (matches frontend Q_DATES) ─────────────────────────
QUARTER_DATES = {
    # "Q{n} {year}": {"portfolio": "Jun 30, YYYY", "filing": "Aug 14-15, YYYY"}
}
def _build_quarter_dates():
    pe = {1:'Mar 31', 2:'Jun 30', 3:'Sep 30', 4:'Dec 31'}
    fd = {1:'May 15', 2:'Aug 14-15', 3:'Nov 14-15', 4:'Feb 14-15'}
    for year in range(2026, 1992, -1):
        for q in [1,2,3,4]:
            fy = year if q != 4 else year + 1
            QUARTER_DATES[f"Q{q} {year}"] = {
                "portfolio": f"{pe[q]}, {year}",
                "filing": f"{fd[q]}, {fy}",
                "portfolio_short": pe[q],
                "filing_short": fd[q],
            }
_build_quarter_dates()


def fetch_dataroma_holdings(dataroma_url):
    """
    Scrape activity + shares + reported price from Dataroma holdings page.
    NOTE: CurrentPrice/52W columns are JavaScript-rendered — NOT in static HTML.
           Those are fetched separately by fetch_yahoo_prices().
    
    Actual column layout confirmed from live page:
    col 0: History icon | col 1: Stock (ticker) | col 2: % Portfolio |
    col 3: Activity | col 4: Shares | col 5: Reported Price* | col 6: Value |
    col 7: (empty spacer) | col 8: CurrentPrice* | col 9: +/-Reported |
    col 10: 52W Low | col 11: 52W High
    * cols 8-11 are JS-rendered, always empty in static HTML
    """
    if not dataroma_url or 'dataroma.com' not in dataroma_url:
        return {}
    import re as _re
    m = _re.search(r'm=([A-Za-z0-9]+)', dataroma_url)
    if not m:
        return {}
    code = m.group(1)
    url = f"https://www.dataroma.com/m/holdings.php?m={code}"

    try:
        r = requests.get(url, headers={
            **HEADERS,
            "Referer": "https://www.dataroma.com/",
            "Accept": "text/html,application/xhtml+xml",
        }, timeout=25)

        if r.status_code in (403, 409, 429):
            print(f"    Dataroma {code}: rate limited ({r.status_code})")
            return {}
        r.raise_for_status()

        soup = BeautifulSoup(r.text, "html.parser")
        results = {}

        def parse_num(s):
            s = str(s or "").replace("$","").replace(",","").replace("%","").replace("+","").strip()
            try: return float(s)
            except: return None

        table = (soup.find("table", id="grid") or
                 soup.find("table", id="holdings") or
                 soup.find("table"))

        if not table:
            return {}

        all_rows = table.find_all("tr")
        data_rows = [r for r in all_rows if r.find("td")]

        for row in data_rows:
            cells = row.find_all(["td","th"])
            if len(cells) < 6:
                continue

            # Ticker is in cell[1] (Stock column), NOT cell[0] (History icon)
            ticker = ""
            for cell_idx in [1, 0]:  # try Stock column first, then History
                cell = cells[cell_idx] if cell_idx < len(cells) else None
                if not cell:
                    continue
                for a in cell.find_all("a"):
                    t = a.get_text(strip=True)
                    if t and 1 < len(t) <= 10 and t.replace("-","").replace(".","").replace("^","").replace(" ","").isupper():
                        ticker = t
                        break
                if not ticker:
                    text = cell.get_text(" ", strip=True)
                    parts = text.split(" - ")
                    if parts:
                        cand = parts[0].strip()
                        if 1 < len(cand) <= 10 and cand.replace("-","").replace(".","").isupper():
                            ticker = cand
                if ticker:
                    break

            if not ticker:
                continue

            def gc(i):
                return cells[i].get_text(strip=True) if i < len(cells) else ""

            try:
                pct      = parse_num(gc(2))
                activity = gc(3)
                shares   = parse_num(gc(4))
                rep_px   = parse_num(gc(5))
                value    = parse_num(gc(6))
                # cols 8-11 (CurrentPrice, +/-Rep, 52WLow, 52WHigh) are JS-rendered
                # Always None from static HTML — fetched by fetch_yahoo_prices() instead

                if ticker and (pct or shares or rep_px):
                    results[ticker] = {
                        "pct":      round(pct, 4)    if pct    else None,
                        "activity": map_act(activity) if activity else None,
                        "shares":   int(shares)      if shares  else None,
                        "price":    round(rep_px, 2) if rep_px  else None,
                        "value":    int(value)       if value   else None,
                    }
            except Exception:
                continue

        print(f"    Dataroma {code}: {len(results)} holdings parsed (activity/shares/price)")
        return results

    except Exception as e:
        print(f"    Dataroma {code} failed: {e}")
        return {}


def fetch_dataroma_history(dataroma_url):
    """
    Scrape Dataroma history page for all historical quarterly portfolios:
    https://www.dataroma.com/m/hist/p_hist.php?f=vg
    
    Shows: Period | Portfolio Value | Top 20 holdings (left to right)
    Going back to the manager earliest 13F filing date.
    
    Returns list of {period, aum_display, top20} dicts.
    """
    if not dataroma_url or 'dataroma.com' not in dataroma_url:
        return []
    
    import re as _re
    m = _re.search(r'm=([A-Za-z0-9]+)', dataroma_url)
    if not m:
        return []
    code = m.group(1)
    url = f"https://www.dataroma.com/m/hist/p_hist.php?f={code}"
    
    try:
        r = requests.get(url, headers={
            **HEADERS,
            "Referer": "https://www.dataroma.com/",
        }, timeout=25)
        
        if r.status_code in (403, 409, 429):
            print(f"    Dataroma history {code}: rate limited ({r.status_code})")
            return []
        r.raise_for_status()
        
        soup = BeautifulSoup(r.text, "html.parser")
        results = []
        
        # History table: Period | Portfolio Value | 20 ticker columns
        table = soup.find("table", {"id": "grid"}) or soup.find("table")
        if not table:
            return []
        
        for row in table.find_all("tr")[2:]:  # skip headers
            cells = row.find_all("td")
            if len(cells) < 3:
                continue
            
            period_raw = cells[0].get_text(strip=True)  # e.g. "2026 Q2"
            pm = _re.search(r"(\d{4})\s+Q([1-4])", period_raw)
            pm2 = _re.search(r"Q([1-4])\s+(\d{4})", period_raw)
            if pm:
                period = f"Q{pm.group(2)} {pm.group(1)}"
            elif pm2:
                period = f"Q{pm2.group(1)} {pm2.group(2)}"
            else:
                continue
            
            aum_text = cells[1].get_text(strip=True)
            
            # Tickers are in cells 2 onwards — each cell is a ticker link
            tickers = []
            for cell in cells[2:]:
                for a in cell.find_all("a"):
                    tk = a.get_text(strip=True)
                    if tk and len(tk) <= 10 and tk.replace("-","").replace(".","").isupper():
                        tickers.append(tk)
                        break
                if len(tickers) >= 20:
                    break
            
            results.append({
                "period": period,
                "aum_display": aum_text,
                "top20": tickers,
                "top10": tickers[:10],
            })
        
        print(f"    Dataroma history {code}: {len(results)} quarters fetched")
        return results
        
    except Exception as e:
        print(f"    Dataroma history fetch failed ({code}): {e}")
        return []

def fetch_guru_metadata(meta):
    """
    Auto-fetch metadata that changes when investor name changes:
    - investment_style (style tags from valuesider guru page)
    - performance_1_5y (performance text from hedgefollow/valuesider)
    - earliest_13f_quarter (from Dataroma history last row)
    - characteristic (fund type: Hedge Fund, Family Office, etc.)
    
    This makes the site fully auto-updating even when investor list changes.
    Returns dict with updated fields.
    """
    result = {}
    slug = meta.get("slug", "")
    dm_url = meta.get("dataroma_url", "")
    hw_url = meta.get("hedgefollow_url", "")
    
    # --- A: Get earliest_13f_quarter from Dataroma history page ---
    if dm_url and "dataroma.com" in dm_url:
        import re as _re
        m = _re.search(r'm=([A-Za-z0-9]+)', dm_url)
        if m:
            code = m.group(1)
            url = f"https://www.dataroma.com/m/hist/p_hist.php?f={code}"
            try:
                r = requests.get(url, headers={**HEADERS, "Referer":"https://www.dataroma.com/"}, timeout=20)
                if r.status_code == 200:
                    soup = BeautifulSoup(r.text, "html.parser")
                    table = soup.find("table", {"id":"grid"}) or soup.find("table")
                    if table:
                        all_rows = table.find_all("tr")[2:]
                        if all_rows:
                            # Last row = earliest quarter
                            last_row = all_rows[-1]
                            cells = last_row.find_all("td")
                            if cells:
                                period_raw = cells[0].get_text(strip=True)
                                pm = _re.search(r"(\d{4})\s+Q([1-4])", period_raw)
                                pm2 = _re.search(r"Q([1-4])\s+(\d{4})", period_raw)
                                if pm:
                                    result["earliest_13f_quarter"] = f"Q{pm.group(2)} {pm.group(1)}"
                                elif pm2:
                                    result["earliest_13f_quarter"] = f"Q{pm2.group(1)} {pm2.group(2)}"
                            print(f"    earliest_13f from Dataroma: {result.get('earliest_13f_quarter')}")
            except Exception as e:
                print(f"    earliest_13f fetch failed: {e}")
    
    # --- B: Get style + performance from valuesider guru page ---
    if slug:
        url = f"https://valuesider.com/guru/{slug}/portfolio"
        try:
            r = requests.get(url, headers=HEADERS, timeout=20)
            if r.status_code == 200:
                soup = BeautifulSoup(r.text, "html.parser")
                text = soup.get_text(" ", strip=True)
                
                # Style detection from page content
                style_map = {
                    "Value": "Value Investing", "Growth": "Growth", 
                    "Concentrated": "Concentrated", "Activist": "Activist",
                    "Macro": "Global Macro", "Quantitative": "Quantitative",
                    "Long/Short": "Long/Short", "Event-driven": "Event-Driven",
                    "Deep Value": "Deep Value", "Quality": "Quality Growth",
                }
                styles = []
                for kw, label in style_map.items():
                    if kw.lower() in text.lower():
                        styles.append(label)
                if styles:
                    result["investment_style"] = styles[:4]
                
                # Performance text
                import re as _re
                perf = _re.search(r'(~?[\+\-]?\d+\.?\d*%[\s\w\+\-~]*(?:annualized|annual|return)[^\n]{0,60})', text)
                if perf:
                    result["performance_1_5y"] = perf.group(1).strip()[:80]
                    
                # Fund type / characteristic
                for fund_type in ["Hedge Fund", "Family Office", "Mutual Fund", "Pension", "Endowment", "SWF"]:
                    if fund_type.lower() in text.lower():
                        result["characteristic"] = fund_type
                        break
        except Exception as e:
            print(f"    valuesider metadata failed: {e}")
    
    # --- C: Get performance from hedgefollow ---
    if hw_url and not result.get("performance_1_5y"):
        try:
            r = requests.get(hw_url, headers=HEADERS, timeout=15)
            if r.status_code == 200:
                soup = BeautifulSoup(r.text, "html.parser")
                text = soup.get_text(" ", strip=True)
                import re as _re
                perf = _re.search(r'(\d+\.?\d*%[\s\w]*(?:1|3|5)[\s-]*year)', text, _re.I)
                if perf:
                    result["performance_1_5y"] = perf.group(0).strip()[:80]
        except Exception:
            pass
    
    return result


def fetch_yahoo_prices(tickers):
    """
    Fetch current price + 52W high/low.
    Uses yfinance library (pip install yfinance) — handles Yahoo auth automatically.
    Falls back to direct Yahoo Finance API if yfinance not installed.
    """
    if not tickers:
        return {}
    results = {}

    # Method 1: yfinance (most reliable — handles cookies/auth)
    try:
        import yfinance as yf
        ticker_str = " ".join(tickers)
        data = yf.download(tickers, period="1d", auto_adjust=True, progress=False)
        # Get current price per ticker
        for tk in tickers:
            try:
                info = yf.Ticker(tk).fast_info
                cur = getattr(info, 'last_price', None) or getattr(info, 'regularMarketPrice', None)
                hi  = getattr(info, 'year_high', None) or getattr(info, 'fiftyTwoWeekHigh', None)
                lo  = getattr(info, 'year_low', None) or getattr(info, 'fiftyTwoWeekLow', None)
                if cur:
                    results[tk] = {
                        "current_price": round(float(cur), 2),
                        "w52_high":      round(float(hi), 2) if hi else None,
                        "w52_low":       round(float(lo), 2) if lo else None,
                    }
            except Exception:
                pass
        if results:
            sample = list(results.items())[0]
            print(f"    yfinance: {len(results)}/{len(tickers)} tickers | sample {sample[0]}: ${sample[1]['current_price']}")
            return results
    except ImportError:
        print(f"    yfinance not installed. Run: pip install yfinance")
    except Exception as e:
        print(f"    yfinance error: {e}")

    # Method 2: Yahoo Finance batch API (direct HTTP)
    hdrs = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
    }
    for i in range(0, len(tickers), 50):
        batch = tickers[i:i+50]
        symbols = ",".join(batch)
        for endpoint in [
            f"https://query1.finance.yahoo.com/v7/finance/quote?symbols={symbols}",
            f"https://query2.finance.yahoo.com/v7/finance/quote?symbols={symbols}",
        ]:
            try:
                r = requests.get(endpoint, headers=hdrs, timeout=20)
                if r.status_code == 200:
                    quotes = r.json().get("quoteResponse", {}).get("result", [])
                    for q in quotes:
                        tk = q.get("symbol","")
                        cur = q.get("regularMarketPrice")
                        if cur:
                            results[tk] = {
                                "current_price": round(cur, 2),
                                "w52_high":      round(q.get("fiftyTwoWeekHigh", cur), 2),
                                "w52_low":       round(q.get("fiftyTwoWeekLow", cur), 2),
                            }
                    if results:
                        break
            except Exception:
                pass
        time.sleep(0.3)

    if results:
        sample = list(results.items())[0]
        print(f"    Yahoo API: {len(results)}/{len(tickers)} tickers | sample {sample[0]}: ${sample[1]['current_price']}")
    else:
        print(f"    Yahoo Finance: 0/{len(tickers)} tickers — install yfinance: pip install yfinance")
    return results


def preserve_quarter_to_history(inv_existing, inv_new, quarter_label):
    """Save current full holdings to history before overwriting with new data."""
    history = inv_existing.get('history', [])
    if any(h['period'] == quarter_label for h in history):
        return history
    h_entry = {
        'period': quarter_label,
        'aum_display': inv_existing.get('aum_display', '—'),
        'top10': [h['ticker'] for h in (inv_existing.get('holdings') or [])[:10]],
        'top20': [h['ticker'] for h in (inv_existing.get('holdings') or [])[:20]],
        'holdings_snapshot': inv_existing.get('holdings', []),
    }
    history.insert(0, h_entry)
    return history[:60]  # keep last 60 quarters


def main():
    try:
        with open("data.json") as f: base = json.load(f)
    except:
        base = {}
    inv_map = {inv["name"]: inv for inv in base.get("investors", [])}
    print("=" * 60)
    print(f"Giant Portfolio Tracker — refresh ({datetime.now():%Y-%m-%d})")
    print("=" * 60)
    updated = []
    for meta in INVESTORS_MASTER:
        name = meta["name"]
        print(f"\n→ {name}")
        existing = inv_map.get(name, {})
        inv = {**existing}

        # Save current quarter to history BEFORE overwriting
        if existing.get("holdings"):
            current_q = existing.get("quarter", "Q2 2026")
            inv["history"] = preserve_quarter_to_history(existing, inv, current_q)
        else:
            inv["history"] = existing.get("history", [])

        # Auto-fetch dynamic metadata (style, performance)
        # earliest_13f_quarter is authoritative from INVESTORS_MASTER (SEC records)
        # NOT overridden by Dataroma (Dataroma only shows their own coverage start)
        auto_meta = fetch_guru_metadata(meta)
        if auto_meta:
            for k, v in auto_meta.items():
                if v and k != "earliest_13f_quarter":  # protect earliest_13f
                    inv[k] = v
                    
        # Update static metadata from INVESTORS_MASTER
        for k in ["id","name","name_zh","slug","representative","representative_zh",
                   "characteristic","characteristic_zh","investment_style",
                   "strategy_short","strategy_short_zh","founded","location",
                   "latest_aum","latest_aum_display","latest_date","performance_1_5y",
                   "cik","dataroma_url","valuesider_url","whalewisdom_url",
                   "hedgefollow_url","insiderset_url","earliest_13f_quarter"]:
            inv[k] = meta.get(k)

        # Fetch latest holdings from valuesider.com
        fetched = fetch_valuesider(meta)
        if fetched and fetched.get("holdings"):
            inv["aum"] = fetched["aum"]
            inv["aum_display"] = fetched["aum_display"]
            inv["num_holdings"] = fetched["num_holdings"] or existing.get("num_holdings")
            inv["quarter"] = fetched["quarter"] or "Q2 2026"
            # Ensure rank is assigned by position (1-10)
            holdings = fetched["holdings"]
            for i, h in enumerate(holdings):
                h["rank"] = h.get("rank") or (i + 1)
            inv["holdings"] = holdings
            
            # Check if tickers populated from valuesider
            missing_tickers = sum(1 for h in holdings if not h.get("ticker"))
            if missing_tickers > 0:
                print(f"  ⚠ {missing_tickers}/{len(holdings)} missing tickers — fetching from Dataroma...")
                dm_url = meta.get("dataroma_url", "")
                if dm_url:
                    dm_data = fetch_dataroma_holdings(dm_url)
                    if dm_data:
                        # Build company-name → ticker lookup from Dataroma
                        # e.g. "Visa Inc" → "V", "Moodys Corp" → "MCO"
                        def norm_co(s):
                            s = (s or "").lower()
                            # Strip share class qualifiers and corporate suffixes
                            for sfx in [", cl-a", ", cl-b", ", cl-c", ", cla", " class a",
                                        " class b", " class c", " inc", " corp", " ltd",
                                        " plc", " co", " llc", " adr", " nv", " sa",
                                        " holdings", " group", " management", " capital"]:
                                s = s.replace(sfx, "")
                            return re.sub(r"[^a-z]", "", s)[:10]
                        dm_co_map = {}
                        for tk, d in dm_data.items():
                            co_key = norm_co(d.get("company","") or tk)
                            dm_co_map[co_key] = tk
                        
                        for h in holdings:
                            if not h.get("ticker"):
                                co_key = norm_co(h.get("company",""))
                                matched_tk = None
                                # Try exact company name match
                                if co_key in dm_co_map:
                                    matched_tk = dm_co_map[co_key]
                                else:
                                    # Try partial match (first 8 chars)
                                    co_short = co_key[:8]
                                    for dk, dv in dm_co_map.items():
                                        if dk[:8] == co_short:
                                            matched_tk = dv
                                            break
                                if matched_tk:
                                    h["ticker"] = matched_tk
                                    d = dm_data[matched_tk]
                                    if d.get("pct"):      h["pct"]      = d["pct"]
                                    if d.get("activity"): h["activity"] = d["activity"]
                                    if d.get("shares"):   h["shares"]   = d["shares"]
                                    if d.get("price"):    h["price"]    = d["price"]
                                    if d.get("value"):    h["value"]    = d["value"]
                        fixed = sum(1 for h in holdings if h.get("ticker"))
                        print(f"  → Dataroma company-name match: {fixed}/{len(holdings)} tickers")
                    else:
                        pass

            # Clean and deduplicate tickers
            seen_tickers = set()
            for h in holdings:
                tk = (h.get("ticker") or "").strip()
                # Clean: "CRH PLC" → "CRH", "BRK.B" stays, "BRK B" → "BRK"
                if " " in tk:
                    tk = tk.split()[0]
                h["ticker"] = tk
                # Deduplicate: if ticker seen before, check company name match
                if tk and tk in seen_tickers:
                    h["ticker"] = ""  # clear duplicate, will be 0 or refetched
                elif tk:
                    seen_tickers.add(tk)
            
            print(f"  ✓  {len(fetched['holdings'])} holdings | {fetched['aum_display']} | {fetched['quarter']}")

            # Fetch Dataroma history for this investor
            dm_history = fetch_dataroma_history(meta.get("dataroma_url", ""))
            if dm_history:
                existing_periods = {h["period"] for h in inv.get("history", [])}
                for dm_h in dm_history:
                    if dm_h["period"] not in existing_periods:
                        inv["history"] = inv.get("history", []) + [dm_h]
                inv["history"] = sorted(
                    inv.get("history", []),
                    key=lambda h: (h["period"].split()[-1], h["period"].split()[0]),
                    reverse=True
                )
        else:
            # valuesider 404 — try Dataroma as fallback for holdings
            dm_url = meta.get("dataroma_url", "")
            if dm_url:
                print(f"  → Trying Dataroma as fallback...")
                dm_data = fetch_dataroma_holdings(dm_url)
                if dm_data:
                    holdings_list = []
                    for i, (tk, d) in enumerate(dm_data.items()):
                        holdings_list.append({
                            "ticker": tk, "rank": i+1,
                            "pct": d.get("pct"), "activity": d.get("activity"),
                            "shares": d.get("shares"), "price": d.get("price"),
                            "value": d.get("value"), "company": tk,
                        })
                    if holdings_list:
                        inv["holdings"] = holdings_list
                        print(f"  ✓  {len(holdings_list)} holdings from Dataroma fallback")
            inv.setdefault("aum", meta["latest_aum"])
            inv.setdefault("aum_display", meta["latest_aum_display"])
            if not inv.get("holdings"):
                print("  ⚠  No new data — metadata refreshed, holdings unchanged")

        updated.append(inv)
        time.sleep(1.5)

    # ── Fetch current price + 52W data from Dataroma holdings pages ────────────
    # Source: https://www.dataroma.com/m/holdings.php?m={code}
    # Columns: Current Price | +/- Reported Price | 52W Low | 52W High
    # ── Step 1: Enrich holdings from Dataroma (activity/shares/reported price) ──
    print("\n→ Enriching holdings from Dataroma (activity/shares/price)...")
    total_dm_updates = 0
    total_dm_parsed = 0
    for inv in updated:
        dm_url = inv.get("dataroma_url", "")
        if not dm_url or "dataroma.com" not in dm_url:
            continue
        dm_data = fetch_dataroma_holdings(dm_url)
        if dm_data:
            # Normalize ticker case for matching
            dm_data_upper = {k.upper(): v for k, v in dm_data.items()}
            # DEBUG: show first mismatch
            if not any((h.get("ticker") or "").upper() in dm_data_upper for h in (inv.get("holdings") or [])):
                inv_tks = [(h.get("ticker") or "").upper() for h in (inv.get("holdings") or [])[:5]]
                dm_tks = list(dm_data_upper.keys())[:5]
                print(f"    ⚠ MISMATCH for {inv.get('name','?')[:25]}: holdings={inv_tks} | dataroma={dm_tks}")
            for h in (inv.get("holdings") or []):
                tk = (h.get("ticker") or "").upper()
                if tk in dm_data_upper:
                    d = dm_data_upper[tk]
                    if d.get("pct"):      h["pct"]      = d["pct"]
                    if d.get("activity"): h["activity"]  = d["activity"]
                    if d.get("shares"):   h["shares"]    = d["shares"]
                    if d.get("price"):    h["price"]     = d["price"]
                    if d.get("value"):    h["value"]     = d["value"]
                    total_dm_updates += 1
        time.sleep(1.5)
    if total_dm_updates == 0 and total_dm_parsed > 0:
        print(f"  ⚠ Dataroma: 0 enriched despite {total_dm_parsed} parsed — possible ticker mismatch")
        # Show first mismatch for diagnosis
        for inv in updated[:1]:
            dm_url = inv.get("dataroma_url","")
            if dm_url:
                dm_data = fetch_dataroma_holdings(dm_url)
                dm_keys = list(dm_data.keys())[:5]
                inv_tks = [h.get("ticker") for h in (inv.get("holdings") or [])[:5]]
                print(f"  Dataroma tickers (first 5): {dm_keys}")
                print(f"  Holdings tickers (first 5): {inv_tks}")
    else:
        print(f"  Dataroma: {total_dm_updates} holdings enriched")
    
    # Compute pct_vs_reported for ALL holdings with both price fields
    vs_computed = 0
    for inv in updated:
        for h in (inv.get("holdings") or []):
            cur = h.get("current_price")
            rep = h.get("price")
            if cur and rep and not h.get("pct_vs_reported"):
                h["pct_vs_reported"] = round((cur - rep) / rep * 100, 2)
                vs_computed += 1
    if vs_computed:
        print(f"  Computed pct_vs_reported for additional {vs_computed} holdings")
    
    # Final pass: derive reported price from available data
    price_derived = 0
    for inv in updated:
        for h in (inv.get("holdings") or []):
            if not h.get("price"):
                val = h.get("value")
                shares = h.get("shares")
                if val and shares and shares > 0:
                    # value is total portfolio value; derive per-share price
                    h["price"] = round(val / shares, 2)
                    price_derived += 1
                elif val and not shares and val < 10000:
                    # value is actually the per-share price (valuesider sometimes mixes these)
                    h["price"] = round(val, 2)
                    price_derived += 1
    if price_derived:
        print(f"  Derived {price_derived} reported prices from value field")

    # Then compute pct_vs_reported for all holdings with both price fields
    for inv in updated:
        for h in (inv.get("holdings") or []):
            if h.get("current_price") and h.get("price") and h.get("pct_vs_reported") is None:
                h["pct_vs_reported"] = round((h["current_price"] - h["price"]) / h["price"] * 100, 2)

    # ── Step 2: Current Price + 52W from Yahoo Finance ───────────────────────
    all_tickers = list({h["ticker"] for inv in updated for h in (inv.get("holdings") or []) if h.get("ticker")})
    print(f"\n→ Fetching current prices from Yahoo Finance ({len(all_tickers)} unique tickers across all investors)...")
    if len(all_tickers) < 50:
        print(f"    All tickers: {sorted(all_tickers)}")
    price_data = fetch_yahoo_prices(all_tickers)
    total_price_updates = 0
    if price_data:
        for inv in updated:
            for h in (inv.get("holdings") or []):
                tk = (h.get("ticker") or "").strip().split()[0] if h.get("ticker") else ""
                h["ticker"] = tk  # ensure cleaned
                # Try exact match first, then uppercase
                pd_ = price_data.get(tk) or price_data.get(tk.upper()) or price_data.get(tk.replace("-","."))
                if pd_:
                    h["current_price"] = pd_.get("current_price")
                    h["w52_high"]      = pd_.get("w52_high")
                    h["w52_low"]       = pd_.get("w52_low")
                    if h.get("current_price") and h.get("price"):
                        h["pct_vs_reported"] = round(
                            (h["current_price"] - h["price"]) / h["price"] * 100, 2)
                    total_price_updates += 1
    print(f"  Yahoo Finance: {total_price_updates} holdings updated with live prices")

    # ── WhaleWisdom extended filers for Map Overview ────────────────────────
    print("\n→ Fetching WhaleWisdom top filers...")
    ww_filers = fetch_whalewisdom_top_filers(limit=100)
    extended_filers = build_extended_filers(updated, ww_filers)

    # Build holdings by price for Map Overview
    hMap = {}
    for inv in updated:
        for h in (inv.get("holdings") or []):
            tk = h.get("ticker", "")
            if not tk: continue
            if tk not in hMap:
                hMap[tk] = {"ticker": tk, "company": h.get("company",""),
                            "company_zh": h.get("company_zh",""), "hq_country": h.get("hq_country",""),
                            "price": h.get("price"), "current_price": h.get("current_price"),
                            "total_value": 0, "holders": 0}
            hMap[tk]["total_value"] += (h.get("value") or 0)
            hMap[tk]["holders"] += 1
            if not hMap[tk]["price"] and h.get("price"):
                hMap[tk]["price"] = h["price"]
            if not hMap[tk]["current_price"] and h.get("current_price"):
                hMap[tk]["current_price"] = h["current_price"]
    holdings_list = sorted(hMap.values(), key=lambda x: (x.get("current_price") or x.get("price") or 0), reverse=True)[:100]

    base["meta"] = {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "quarter": "Q2 2026", "quarter_end": "2026-06-30", "filing_date": "2026-08-14",
        "next_refresh": "Nov 17, 2026",
        "refresh_schedule": "Feb 17 · May 18 · Aug 18 · Nov 17 (UTC 10:00)",
        "sources": "valuesider.com (holdings) · dataroma.com (prices + history) · whalewisdom.com (filers)",
    }
    base["investors"] = updated
    base["map_overview"] = {
        "all_filers": extended_filers,
        "top_holdings_by_price": holdings_list,
        "note": f"{len(extended_filers)} filers. Holdings sorted by current/reported price.",
        "sources": ["SEC EDGAR", "WhaleWisdom", "13F.info", "Valuesider", "Dataroma"],
    }

    with open("data.json", "w") as f:
        json.dump(base, f, indent=2, ensure_ascii=False)
    inject_data_into_html(base)
    print(f"\n{'=' * 60}")
    print(f"✅  {len(updated)} investors · {total_price_updates} price entries · {len(extended_filers)} filers")
    print(f"   data.json + index.html updated")


if __name__ == "__main__":
    main()
