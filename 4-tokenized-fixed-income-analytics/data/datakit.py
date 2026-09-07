"""Retrieval layer shared by every project's data/fetch.py.

Three things make a fetcher trustworthy enough to cite in a filing, and this
module exists to make all three automatic:

  1. Every downloaded byte is hashed and recorded, so a result can be tied to
     the exact file it came from rather than to a URL that may have changed.
  2. A network that is blocked fails loudly and specifically, instead of
     falling through to synthetic data and quietly producing numbers that look
     real.
  3. Requests are rate limited and identify themselves, because several of the
     sources here (SEC in particular) will ban an unidentified scraper.

Standard library only, so a fetcher runs anywhere Python does.
"""
from __future__ import annotations

import hashlib
import json
import os
import pathlib
import ssl
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from datetime import datetime, timezone

__all__ = ["Fetcher", "Source", "NetworkBlocked", "FetchError", "utc_now"]

# SEC's fair-access policy requires a User-Agent naming a real contact. Other
# sources do not require it but none object to it. Override with DATAKIT_UA.
DEFAULT_UA = os.environ.get(
    "DATAKIT_UA",
    "niw-portfolio-research/0.1 (contact: set DATAKIT_UA env var)",
)

RETRYABLE_STATUS = {408, 425, 429, 500, 502, 503, 504}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class FetchError(RuntimeError):
    """A download failed for a reason the caller may be able to fix."""


class NetworkBlocked(FetchError):
    """The environment cannot reach the host at all.

    Raised for connection refusals and proxy CONNECT denials — the signature of
    a sandbox with an allowlist — as opposed to a 404, which means the URL is
    wrong, or a 403 from the origin, which usually means the User-Agent is.
    """

    def __init__(self, host: str, detail: str):
        super().__init__(
            f"cannot reach {host}: {detail}\n"
            f"  This environment's network policy appears to block it. The fetch\n"
            f"  itself is fine; run it where {host} is reachable.\n"
            f"  If you are on Claude Code on the web, choose an environment with a\n"
            f"  more permissive network policy:\n"
            f"  https://code.claude.com/docs/en/claude-code-on-the-web"
        )
        self.host = host
        self.detail = detail


@dataclass
class Source:
    """One retrievable file and the provenance that has to travel with it."""

    name: str
    url: str
    dest: str
    publisher: str
    terms: str
    note: str = ""
    headers: dict = field(default_factory=dict)
    # JSON-RPC endpoints (public Ethereum nodes, for instance) answer POST only.
    # Set body to the request payload; it is sent as JSON.
    body: object = None


class Fetcher:
    def __init__(self, root, user_agent: str = DEFAULT_UA,
                 min_interval: float = 0.15, timeout: float = 60.0,
                 retries: int = 4):
        self.root = pathlib.Path(root)
        self.raw = self.root / "raw"
        self.manifest_path = self.root / "MANIFEST.json"
        self.user_agent = user_agent
        self.min_interval = min_interval   # SEC allows 10 req/s; stay under it
        self.timeout = timeout
        self.retries = retries
        self._last_request = 0.0
        self._ctx = ssl.create_default_context()
        cab = os.environ.get("REQUESTS_CA_BUNDLE") or os.environ.get("SSL_CERT_FILE")
        if cab and pathlib.Path(cab).exists():
            self._ctx.load_verify_locations(cab)

    # -- manifest -------------------------------------------------------

    def load_manifest(self) -> dict:
        if self.manifest_path.exists():
            return json.loads(self.manifest_path.read_text())
        return {"generated_utc": None, "files": {}}

    def _write_manifest(self, man: dict) -> None:
        man["generated_utc"] = utc_now()
        self.manifest_path.parent.mkdir(parents=True, exist_ok=True)
        self.manifest_path.write_text(json.dumps(man, indent=2, sort_keys=True) + "\n")

    # -- retrieval ------------------------------------------------------

    def _throttle(self) -> None:
        gap = time.monotonic() - self._last_request
        if gap < self.min_interval:
            time.sleep(self.min_interval - gap)
        self._last_request = time.monotonic()

    def _open(self, url: str, headers: dict, body=None) -> bytes:
        data = None
        if body is not None:
            data = json.dumps(body).encode()
            headers = {"Content-Type": "application/json", **headers}
        req = urllib.request.Request(url, data=data, headers={
            "User-Agent": self.user_agent,
            "Accept-Encoding": "gzip, deflate",
            **headers,
        })
        self._throttle()
        with urllib.request.urlopen(req, timeout=self.timeout, context=self._ctx) as r:
            data = r.read()
            enc = (r.headers.get("Content-Encoding") or "").lower()
        if enc == "gzip":
            import gzip
            data = gzip.decompress(data)
        elif enc == "deflate":
            import zlib
            data = zlib.decompress(data, -zlib.MAX_WBITS)
        return data

    def get(self, src: Source, refresh: bool = False) -> pathlib.Path:
        """Download one Source into the cache and record it in the manifest."""
        dest = self.raw / src.dest
        man = self.load_manifest()
        rec = man["files"].get(src.dest)

        if dest.exists() and not refresh and rec:
            same_request = rec.get("request_fingerprint") == _fingerprint(src)
            if same_request and sha256_file(dest) == rec.get("sha256"):
                return dest   # cached, intact, and answering the same request

        host = src.url.split("/")[2] if "://" in src.url else src.url
        last: Exception | None = None
        for attempt in range(self.retries):
            try:
                data = self._open(src.url, src.headers, src.body)
                break
            except urllib.error.HTTPError as e:
                last = e
                if e.code == 403:
                    raise FetchError(
                        f"{src.url} returned 403. For SEC hosts this means the "
                        f"User-Agent was rejected — set DATAKIT_UA to "
                        f"'Your Name your@email' and retry."
                    ) from e
                if e.code == 404:
                    raise FetchError(f"{src.url} returned 404 — the URL has moved.") from e
                if e.code not in RETRYABLE_STATUS:
                    raise FetchError(f"{src.url} returned HTTP {e.code}.") from e
            except urllib.error.URLError as e:
                last = e
                reason = str(getattr(e, "reason", e))
                if _looks_blocked(reason):
                    raise NetworkBlocked(host, reason) from e
            except (TimeoutError, OSError) as e:
                last = e
                if _looks_blocked(str(e)):
                    raise NetworkBlocked(host, str(e)) from e
            if attempt < self.retries - 1:
                time.sleep(2 ** attempt)
        else:
            raise FetchError(f"{src.url} failed after {self.retries} attempts: {last}")

        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        man["files"][src.dest] = {
            "source": src.name,
            "url": src.url,
            "publisher": src.publisher,
            "terms": src.terms,
            "note": src.note,
            "sha256": hashlib.sha256(data).hexdigest(),
            "bytes": len(data),
            "retrieved_utc": utc_now(),
            "request_fingerprint": _fingerprint(src),
        }
        self._write_manifest(man)
        return dest

    def get_all(self, sources, refresh: bool = False) -> dict:
        """Fetch every Source, reporting progress. Stops on the first failure."""
        out = {}
        for i, s in enumerate(sources, 1):
            print(f"  [{i}/{len(sources)}] {s.name} ... ", end="", flush=True)
            p = self.get(s, refresh=refresh)
            print(f"{p.stat().st_size:,} bytes")
            out[s.name] = p
        return out

    def verify(self) -> list:
        """Re-hash every cached file against the manifest. Returns problems."""
        man = self.load_manifest()
        problems = []
        for name, rec in sorted(man["files"].items()):
            p = self.raw / name
            if not p.exists():
                problems.append(f"{name}: recorded in manifest but missing on disk")
            elif sha256_file(p) != rec["sha256"]:
                problems.append(f"{name}: on-disk bytes do not match recorded sha256")
        return problems

    def require(self, *names) -> dict:
        """Resolve cached files by manifest key, or explain how to get them."""
        man = self.load_manifest()
        missing = [n for n in names if not (self.raw / n).exists()]
        if missing:
            raise FetchError(
                "missing real data: " + ", ".join(missing) + "\n"
                "  Run `python -m data.fetch` in a networked environment first.\n"
                "  Without it this project runs on authored data, which is "
                "labelled as such and must not be presented as measurement."
            )
        return {n: (self.raw / n, man["files"].get(n, {})) for n in names}


def _fingerprint(src) -> str:
    """Identify the request, not just the URL.

    Two JSON-RPC calls to the same node differ only in their POST body, so a
    URL-keyed cache would serve the first answer for every later question.
    """
    payload = json.dumps({"url": src.url, "body": src.body}, sort_keys=True)
    return hashlib.sha256(payload.encode()).hexdigest()[:16]


def sha256_file(path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def _looks_blocked(reason: str) -> bool:
    r = reason.lower()
    return any(s in r for s in (
        "connection refused", "connection reset", "tunnel connection failed",
        "name or service not known", "temporary failure in name resolution",
        "no route to host", "network is unreachable", "403", "forbidden",
        "cannot connect", "timed out",
    ))


def main(sources, root, description: str) -> int:
    """Standard CLI shared by every data/fetch.py."""
    import argparse
    ap = argparse.ArgumentParser(description=description)
    ap.add_argument("--refresh", action="store_true",
                    help="re-download even if the cached copy is intact")
    ap.add_argument("--verify", action="store_true",
                    help="re-hash the cache against MANIFEST.json and exit")
    ap.add_argument("--list", action="store_true",
                    help="print the sources and exit without downloading")
    args = ap.parse_args()

    f = Fetcher(root)

    if args.list:
        for s in sources:
            print(f"{s.name}\n  {s.url}\n  -> raw/{s.dest}\n"
                  f"  {s.publisher} | {s.terms}")
        return 0

    if args.verify:
        problems = f.verify()
        if problems:
            print("MANIFEST VERIFICATION FAILED")
            for p in problems:
                print("  " + p)
            return 1
        n = len(f.load_manifest()["files"])
        print(f"all {n} cached file(s) match MANIFEST.json")
        return 0

    print(description)
    try:
        f.get_all(sources, refresh=args.refresh)
    except NetworkBlocked as e:
        print(f"\nBLOCKED: {e}", file=sys.stderr)
        return 2
    except FetchError as e:
        print(f"\nFAILED: {e}", file=sys.stderr)
        return 1
    print(f"\nwrote {f.manifest_path}")
    print("every file is hashed there with its URL and retrieval time")
    return 0
