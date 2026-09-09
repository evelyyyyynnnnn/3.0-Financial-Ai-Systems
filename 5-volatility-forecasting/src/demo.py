"""Thin entry point so the portfolio roll-up can discover and run this project.

The model lives in ../LSTM-Volatility-Prediction. This runs a short training on
real Yahoo Finance data (^GSPC realised volatility) and writes
results/latest-real.json. Epoch count is overridable via VOL_EPOCHS for CI.

    python -m src.demo
"""
from __future__ import annotations

import os
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
LSTM = ROOT / "LSTM-Volatility-Prediction"


def main() -> int:
    epochs = os.environ.get("VOL_EPOCHS", "15")
    cmd = [sys.executable, "main.py", "--no-wandb", "--model_type", "lstm",
           "--num_epochs", str(epochs), "--ticker", "^GSPC"]
    print(f"[5-volatility] {' '.join(cmd)}  (cwd={LSTM})")
    return subprocess.call(cmd, cwd=str(LSTM))


if __name__ == "__main__":
    raise SystemExit(main())
