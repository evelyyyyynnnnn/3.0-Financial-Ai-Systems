import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from src.collect import ProjectResult, discover, _count_tests
from src.rollup import EXTRACTORS, headline, portfolio_summary


def _mk_project(root, repo, name, results=None, tests=0, site=False):
    p = root / repo / name
    (p / "src").mkdir(parents=True)
    if results is not None:
        (p / "results").mkdir()
        (p / "results" / "latest.json").write_text(json.dumps(results))
    if tests:
        (p / "tests").mkdir()
        body = "\n".join(f"def test_{i}():\n    assert True" for i in range(tests))
        (p / "tests" / "test_x.py").write_text(body)
    if site:
        (p / "website").mkdir()
        (p / "website" / "index.html").write_text("<h1>x</h1>")
    return p


def test_discovers_projects_and_reads_results(tmp_path):
    _mk_project(tmp_path, "1.0-Repo", "alpha",
                results={"generated_at": "2026-01-01T00:00:00Z",
                         "is_synthetic": True, "data_source": "synthetic"},
                tests=3, site=True)
    found = discover(tmp_path)
    assert len(found) == 1
    p = found[0]
    assert p.project == "alpha" and p.has_results
    assert p.n_tests == 3 and p.has_site
    assert p.is_synthetic is True


def test_project_without_results_is_listed_not_dropped(tmp_path):
    """A project that has never run must be visible, not omitted."""
    _mk_project(tmp_path, "1.0-Repo", "beta", results=None, tests=1)
    found = discover(tmp_path)
    assert len(found) == 1 and not found[0].has_results


def test_previous_folder_is_skipped(tmp_path):
    _mk_project(tmp_path, "1.0-Repo", "alpha", results={})
    _mk_project(tmp_path, "1.0-Repo", "previous", results={})
    assert {p.project for p in discover(tmp_path)} == {"alpha"}


def test_corrupt_results_file_is_reported_as_no_results(tmp_path):
    p = _mk_project(tmp_path, "1.0-Repo", "alpha", results={})
    (p / "results" / "latest.json").write_text("{not json")
    assert discover(tmp_path)[0].has_results is False


def test_summary_counts_are_consistent(tmp_path):
    _mk_project(tmp_path, "1.0-Repo", "a",
                results={"is_synthetic": True}, tests=2, site=True)
    _mk_project(tmp_path, "1.0-Repo", "b",
                results={"is_synthetic": False}, tests=3)
    _mk_project(tmp_path, "2.0-Repo", "c", results=None, tests=1)
    s = portfolio_summary(discover(tmp_path))
    assert s["n_projects"] == 3
    assert s["n_with_results"] == 2 and s["n_never_run"] == 1
    assert s["n_synthetic_data"] == 1 and s["n_real_data"] == 1
    assert s["total_tests"] == 6 and s["n_with_site"] == 1


def test_test_counting_only_counts_test_functions(tmp_path):
    p = tmp_path / "proj"
    (p / "tests").mkdir(parents=True)
    (p / "tests" / "test_a.py").write_text(
        "def helper():\n    pass\n\ndef test_one():\n    pass\n"
        "def test_two():\n    pass\n")
    assert _count_tests(p) == 2


def test_headline_returns_nothing_for_an_unknown_project():
    assert headline("no-such-project", {"a": 1}) == []


def test_headline_survives_a_missing_key():
    """A results file that changed shape must not crash the roll-up."""
    assert headline("chaintrust-bench", {}) == []
    assert headline("icu-early-warning", {"events": {}}) == []


def test_headline_reads_a_real_shape():
    payload = {"tiers": {"seed": {"macro_f1": 1.0}, "hard": {"macro_f1": 0.0}},
               "corpus": {"n_cases": 17}}
    out = headline("chaintrust-bench", payload)
    assert ("Baseline macro-F1, seed tier", 1.0, "") in out
    assert any(v == 17 for _, v, _ in out)


def test_every_extractor_is_callable_on_an_empty_payload():
    """Guards against a roll-up that crashes when one project has not run."""
    for name in EXTRACTORS:
        assert headline(name, {}) == []


def test_live_portfolio_is_readable():
    """The roll-up must work against the real tree, not only fixtures."""
    found = discover()
    assert len(found) >= 4
    assert any(p.has_results for p in found)
