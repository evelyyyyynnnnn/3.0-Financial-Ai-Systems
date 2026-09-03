# ==== 订单参数（按需修改）====
SYMBOL = "AAPL"
QTY    = 1
SIDE   = "buy"          # 或 "sell"
TYPE   = "market"       # 也可用 "limit" 并加 limit_price
TIF    = "day"          # time_in_force: "day"/"gtc"/"fok"/"ioc"/"opg"/"cls" 等
POLL_SEC = 1
TIMEOUT  = 60

def account_snapshot():
    acc = api.get_account()
    eq = float(acc.equity or 0.0); last = float(acc.last_equity or eq)
    pl = eq - last; plpc = (pl/last*100) if last else 0.0
    print("\n== Account ==")
    print("Status:", acc.status, "| Cash:", acc.cash, "| BuyingPower:", acc.buying_power)
    print("Equity:", acc.equity,  "| Today P/L: %.2f (%.2f%%)" % (pl, plpc))

def positions_snapshot():
    poss = api.list_positions()
    print("\n== Positions ==")
    if not poss:
        print("No open positions")
    else:
        for p in poss:
            print(f"{p.symbol}: qty={p.qty}, avg={p.avg_entry_price}, "
                  f"px={p.current_price}, uPnL={p.unrealized_pl}")

def place_and_wait():
    print(f"\nPlacing order: {SIDE} {QTY} {SYMBOL} @ {TYPE}/{TIF} ...")
    order = api.submit_order(symbol=SYMBOL, qty=QTY, side=SIDE, type=TYPE, time_in_force=TIF)
    oid = order.id
    start = time.time()
    terminal = {"filled", "canceled", "rejected", "expired"}

    while True:
        o = api.get_order(oid)
        if o.status in terminal:
            print(f"Order {o.status} • filled_qty={o.filled_qty} • avg_fill_price={o.filled_avg_price}")
            if o.status != "filled":
                print("Reason:", o.status)
            return o
        if time.time() - start > TIMEOUT:
            print("Timeout → canceling...")
            try:
                api.cancel_order(oid)
            except Exception as e:
                print("Cancel failed:", e)
            return o
        time.sleep(POLL_SEC)

if __name__ == "__main__":
    account_snapshot()
    positions_snapshot()
    place_and_wait()
    positions_snapshot()
    account_snapshot()