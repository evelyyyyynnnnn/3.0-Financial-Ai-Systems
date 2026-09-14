# === 多单定义：按需增删 ===
ORDERS = [
    {"symbol": "AAPL", "qty": 1, "side": "buy",  "type": "market", "tif": "day"},
    {"symbol": "MSFT", "qty": 1, "side": "buy",  "type": "market", "tif": "day"},
    {"symbol": "NVDA", "qty": 1, "side": "buy",  "type": "market", "tif": "day"},
    # {"symbol": "AAPL", "qty": 1, "side": "sell", "type": "market", "tif": "day"},
]

POLL_SEC = 1
TIMEOUT  = 60


def place_and_wait_one(order):
    symbol = order["symbol"]; qty = order["qty"]; side = order["side"]
    typ    = order.get("type", "market"); tif = order.get("tif", "day")
    print(f"\nPlacing: {side} {qty} {symbol} @ {typ}/{tif} ...")
    o = api.submit_order(symbol=symbol, qty=qty, side=side, type=typ, time_in_force=tif)
    oid = o.id
    start = time.time()
    terminal = {"filled", "canceled", "rejected", "expired"}
    while True:
        cur = api.get_order(oid)
        if cur.status in terminal:
            print(f"→ {symbol} {cur.status} • filled={cur.filled_qty} • avg={cur.filled_avg_price}")
            if cur.status != "filled":
                print("  Reason:", cur.status)
            return cur
        if time.time() - start > TIMEOUT:
            print(f"→ {symbol} timeout, canceling…")
            try: api.cancel_order(oid)
            except Exception as e: print("  Cancel failed:", e)
            return api.get_order(oid)
        time.sleep(POLL_SEC)

if __name__ == "__main__":
    account_snapshot()
    positions_snapshot()
    for od in ORDERS:
        place_and_wait_one(od)
    positions_snapshot()
    account_snapshot()