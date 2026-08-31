# 时间级别映射
TF_OPTIONS = {
    "1m":  TimeFrame.Minute,
    "5m":  TimeFrame(5,  TimeFrameUnit.Minute),
    "15m": TimeFrame(15, TimeFrameUnit.Minute),
    "1h":  TimeFrame.Hour,
    "1d":  TimeFrame.Day,
}
TF_KEY = "5m"                      # 可选 "1m"/"5m"/"15m"/"1h"/"1d"
TF     = TF_OPTIONS[TF_KEY]

# ===== 外部时间参数（你可以直接改这里）=====
# 如果都为 None，则使用 LOOKBACK_DAYS 回溯
START_TIME = "2025-09-20 09:30"    # e.g. "2025-09-24 09:30"
END_TIME   = "2025-09-25 16:00"    # e.g. "2025-09-25 16:00"

# ===== 工具函数 =====
def _to_rfc3339_z(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00","Z")

def _ensure_dt_utc(x) -> datetime:
    """支持 datetime 或 str；字符串按纽约时区解析再转UTC。"""
    if isinstance(x, datetime):
        return x.astimezone(timezone.utc)
    if isinstance(x, str):
        from dateutil import parser, tz
        ny = tz.gettz("America/New_York")
        dt_local = parser.parse(x)
        if dt_local.tzinfo is None:
            dt_local = dt_local.replace(tzinfo=ny)
        return dt_local.astimezone(timezone.utc)
    raise TypeError("start/end 必须是 datetime 或 str")

def fetch_history(symbol: str = SYMBOL,
                  tf: TimeFrame = TF,
                  feed: str = FEED) -> pd.DataFrame:
    """下载历史K线，返回标准化DataFrame"""
    if START_TIME or END_TIME:
        end_dt   = _ensure_dt_utc(END_TIME)   if END_TIME   else datetime.now(timezone.utc)
        start_dt = _ensure_dt_utc(START_TIME) if START_TIME else end_dt - timedelta(days=LOOKBACK_DAYS)
    else:
        end_dt   = datetime.now(timezone.utc).replace(microsecond=0)
        start_dt = end_dt - timedelta(days=LOOKBACK_DAYS)

    bars = api.get_bars(
        symbol, tf,
        start=_to_rfc3339_z(start_dt),
        end=_to_rfc3339_z(end_dt),
        adjustment="raw",
        feed=feed
    ).df

    if bars.empty:
        cols = ["time","open","high","low","close","volume"]
        return pd.DataFrame(columns=cols).set_index(pd.DatetimeIndex([], name="time"))

    df = (bars.reset_index()[["timestamp","open","high","low","close","volume"]]
               .rename(columns={"timestamp":"time"})
               .set_index("time")
               .sort_index())
    return df

# ===== 演示调用 =====
if __name__ == "__main__":
    hist = fetch_history(SYMBOL, TF)
    print(f"=== Historical Data ({TF_KEY}) ===")
    print(hist.head(3))
    print(hist.tail(3))