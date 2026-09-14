eq = float(account.equity or 0)
last_eq = float(account.last_equity or eq)
today_pl = eq - last_eq
today_plpc = (today_pl / last_eq * 100) if last_eq else 0.0

print("== Account Info ==")
print("ID:", account.id)
print("Status:", account.status)
print("Cash:", account.cash)
print("Buying Power:", account.buying_power)
print("Portfolio Value:", account.portfolio_value)
print(f"Today's P/L: {today_pl:.2f} ({today_plpc:.2f}%)")

positions = api.list_positions()
print("\n== Positions ==")
if not positions:
    print("No open positions")
else:
    for p in positions:
        print(f"{p.symbol}: qty={p.qty}, avg_entry_price={p.avg_entry_price}, "
              f"current_price={p.current_price}, unrealized_pl={p.unrealized_pl}")