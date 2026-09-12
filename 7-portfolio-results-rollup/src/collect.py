"""Walk the portfolio and read each project's results/latest.json.

This exists because of a specific failure mode. Numbers get quoted in a CV, a
petition or a README, and over time nobody can say which run produced them or
whether that run still exists. Every figure here is read from the file the
project's own demo wrote, so a number without a run behind it simply cannot
appear -- and a project that has never been run shows up as such rather than
being silently omitted.
"""

from __future__ import annotations

import json
import pathlib
from dataclasses import dataclass, field

# The five repositories, relative to this project.
REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
PORTFOLIO_ROOT = REPO_ROOT.parent


@dataclass
class ProjectResult:
    repo: str
    project: str
    path: pathlib.Path
    has_results: bool
    generated_at: str = ""
    is_synthetic: bool | None = None
    data_source: str = ""
    n_tests: int = 0
    has_site: bool = False
    payload: dict = field(default_factory=dict)

    def as_dict(self) -> dict:
        return {"repo": self.repo, "project": self.project,
                "has_results": self.has_results,
                "generated_at": self.generated_at,
                "is_synthetic": self.is_synthetic,
                "data_source": self.data_source,
                "n_tests": self.n_tests, "has_site": self.has_site}


# Not every project calls the field data_source. llm-audit-agent records its
# provenance under "corpus", and a run whose provenance is simply not shown is
# indistinguishable, to a reader, from one that has none.
SOURCE_KEYS = ("data_source", "corpus", "dataset", "source")


def _source_of(data: dict) -> str:
    for key in SOURCE_KEYS:
        v = data.get(key)
        if isinstance(v, str) and v.strip():
            return v.strip()
        if isinstance(v, dict):
            inner = v.get("data_source") or v.get("source") or v.get("name")
            if isinstance(inner, str) and inner.strip():
                return inner.strip()
    return ""


def _count_tests(project: pathlib.Path) -> int:
    """Count test functions without importing anything."""
    n = 0
    tdir = project / "tests"
    if not tdir.is_dir():
        return 0
    for f in tdir.glob("test_*.py"):
        for line in f.read_text(encoding="utf8", errors="replace").splitlines():
            if line.startswith("def test_"):
                n += 1
    return n


RESULT_FILES = ("latest-llm.json", "latest-real.json", "latest.json")


def _newest_real(results: pathlib.Path) -> pathlib.Path:
    """The most recent result whose run was on real data, else the demo run."""
    real = []
    for name in RESULT_FILES:
        fp = results / name
        if not fp.exists():
            continue
        try:
            d = json.loads(fp.read_text(encoding="utf8"))
        except (ValueError, OSError):
            continue
        if d.get("is_synthetic") is False:
            real.append((d.get("generated_at") or "", fp))
    if real:
        return max(real)[1]
    return results / "latest.json"


def discover(root: pathlib.Path | None = None) -> list:
    root = root or PORTFOLIO_ROOT
    out: list = []
    for repo in sorted(p for p in root.iterdir()
                       if p.is_dir() and p.name[0].isdigit()):
        for project in sorted(p for p in repo.iterdir() if p.is_dir()):
            if project.name in ("previous", ".git", ".github", "scripts"):
                continue
            if not (project / "src").is_dir():
                continue
            # A project can carry several result files. The roll-up reports the
            # most recent run that used real data, whatever the file is called
            # -- latest-llm.json when a real language model was scored,
            # latest-real.json otherwise -- and falls back to the synthetic
            # demo result only when no real run exists. Hardcoding
            # latest-real.json meant a newer real-model run sat unread beside
            # the superseded run the page kept showing.
            rp = _newest_real(project / "results")
            pr = ProjectResult(repo=repo.name, project=project.name, path=project,
                               has_results=rp.exists(),
                               n_tests=_count_tests(project),
                               has_site=(project / "website" / "index.html").exists())
            if rp.exists():
                try:
                    data = json.loads(rp.read_text(encoding="utf8"))
                except json.JSONDecodeError:
                    pr.has_results = False
                else:
                    pr.payload = data
                    pr.generated_at = data.get("generated_at", "")
                    pr.is_synthetic = data.get("is_synthetic")
                    pr.data_source = _source_of(data)
            out.append(pr)
    return out
