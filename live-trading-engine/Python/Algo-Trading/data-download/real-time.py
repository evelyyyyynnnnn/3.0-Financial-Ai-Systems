WS_URL = "wss://stream.data.alpaca.markets/v2/iex"

class AlpacaWS:
    def __init__(self, url: str, key: str, secret: str, symbol: str):
        self.url = url
        self.key = key
        self.secret = secret
        self.symbol = symbol
        self.ws = None

    def on_open(self, ws):
        ws.send(json.dumps({"action": "auth", "key": self.key, "secret": self.secret}))
        ws.send(json.dumps({"action": "subscribe","trades":[self.symbol],"bars":[self.symbol]}))
        print(f"[WS] Opened & Subscribed: {self.symbol}")

    def on_message(self, ws, message):
        data = json.loads(message)
        for evt in data:
            if evt.get("T") == "t":
                print(f"[Trade] {evt['S']} px={evt['p']} ts={evt['t']}")
            elif evt.get("T") == "b":
                print(f"[Bar]   {evt['S']} o={evt['o']} h={evt['h']} "
                      f"l={evt['l']} c={evt['c']} v={evt['v']} t={evt['t']}")
            elif evt.get("T") == "success":
                print("[WS] success:", evt.get("msg"))
            elif evt.get("T") == "subscription":
                print("[WS] subscribed:", evt)
            else:
                print("[WS] evt:", evt)

    def on_error(self, ws, error): print("[WS] error:", error)
    def on_close(self, ws, code, msg): print(f"[WS] closed code={code} msg={msg}")

    def run(self):
        self.ws = websocket.WebSocketApp(
            self.url,
            on_open=self.on_open,
            on_message=self.on_message,
            on_error=self.on_error,
            on_close=self.on_close
        )
        self.ws.run_forever(ping_interval=20, ping_timeout=10)

    def stop(self):
        if self.ws: self.ws.close()

if __name__ == "__main__":
    client = AlpacaWS(WS_URL, API_KEY, SECRET_KEY, SYMBOL)
    t = threading.Thread(target=client.run, daemon=True)
    t.start()

    RUN_SECONDS = 60
    def handle_sigint(sig, frame):
        print("\n[Main] SIGINT received. Closing WS...")
        client.stop()
        time.sleep(1); raise SystemExit(0)
    signal.signal(signal.SIGINT, handle_sigint)

    elapsed = 0
    while elapsed < RUN_SECONDS:
        time.sleep(1); elapsed += 1

    print("\n[Main] Time up. Closing WS...")
    client.stop()