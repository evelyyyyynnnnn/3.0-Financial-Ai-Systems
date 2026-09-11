"""Thin entry point so the portfolio roll-up can discover and run this project.

The model lives in ../LSTM-Volatility-Prediction. This runs a short training on
real Yahoo Finance data (^GSPC realised volatility) and writes
results/latest-real.json. Epoch count is overridable via VOL_EPOCHS for CI.

    python -m src.demo          # retrain, then rebuild the page
    python -m src.site          # rebuild the page from the recorded run only

Requires TensorFlow and network access to Yahoo Finance. The test suite in
tests/ deliberately needs neither: it guards the handling of time, which is
where this kind of model goes wrong, and it runs in two seconds.
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
    rc = subprocess.call(cmd, cwd=str(LSTM))

    # Rebuild the page from whatever the run recorded, so the site and the code
    # cannot drift apart -- including when the run recorded a withheld result.
    try:
        from .site import main as build
        build()
    except Exception as exc:  # pragma: no cover - the site is not the result
        print(f"(site not rebuilt: {exc})", file=sys.stderr)
    return rc


if __name__ == "__main__":
    raise SystemExit(main())
