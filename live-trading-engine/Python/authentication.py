import os
import json
import pytz
import signal
import threading
import websocket
import math, time
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta, timezone
import alpaca_trade_api as tradeapi
from alpaca_trade_api.rest import TimeFrame, TimeFrameUnit

API_KEY    = "PKVFX17VIP19CWGQPOBN"
SECRET_KEY = "SG0MX5gJ3LwnGt9LasXYUbVywCZ7SH4slJkXqPZl"
BASE_URL   = "https://paper-api.alpaca.markets" # Paper 环境
WS_URL     = "wss://stream.data.alpaca.markets/v2/iex"  # IEX 免费实时流
FEED       = "iex"

api = tradeapi.REST(API_KEY, SECRET_KEY, BASE_URL, api_version="v2")
account = api.get_account()