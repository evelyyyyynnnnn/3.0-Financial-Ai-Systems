# Smart Contract Audit Agent

Static vulnerability analysis for Solidity. Six detectors covering known bug
classes, each finding carrying the line that triggered it, the surrounding
source, a confidence level, and an explicit statement of how that detector
produces false positives.

## The design constraint

An automated auditor is only useful if a human can check its output. A tool
that reports "possible reentrancy" with no line, no reasoning, and no account
of when it is wrong costs more review time than it saves — the auditor has to
re-derive the finding from scratch to know whether to trust it.

So every finding here answers four questions:

- **Where** — the exact line, with three lines of context either side.
- **Why it matters** — what an attacker does with it, in this contract.
- **When this is wrong** — the concrete conditions under which this detector
  fires on safe code.
- **How to fix it** — the remediation, not a link to one.

Confidence is meant honestly: `high` means the pattern is nearly always the
bug, `medium` means it usually warrants a change, `low` means look at it.

## Detectors

| Detector | Severity | Finds |
|---|---|---|
| `reentrancy` | critical | State written after an external call — checks-effects-interactions violated |
| `unprotected-selfdestruct` | critical | `selfdestruct` with no owner modifier and no `msg.sender` check |
| `tx-origin-auth` | high | `tx.origin` in a condition — authorization a proxy contract defeats |
| `weak-randomness` | high | `keccak256` seeded from block state the proposer influences |
| `unprotected-state-change` | high | Public setter writing a privileged variable with no access check |
| `unchecked-call` | medium | `call` / `send` / `delegatecall` whose boolean result is discarded |

Comments and string literals are blanked before matching, with line numbers
preserved — so a pattern inside a comment or a revert message never fires, and
findings still point at real source lines.

## Running it

```bash
python analyzer/build_report.py                       # audit contracts/, write data.json
python analyzer/build_report.py --contracts src/      # audit somewhere else
python analyzer/build_report.py --fail-on high        # exit non-zero on high+ findings
```

`--fail-on` makes the same command a CI gate.

## Test fixtures

`contracts/` holds two contracts with the same surface:

- **`VulnerableVault.sol`** — six planted vulnerabilities, one per detector.
- **`SafeVault.sol`** — the same functionality written safely.

The second one matters more. Any detector set can find bugs by flagging
everything; the question is whether it stays quiet on correct code. The safe
contract uses a reentrancy guard, `msg.sender` authorization, checked return
values, and owner modifiers, and the analyzer reports **zero findings** on it.
That result is the false-positive test, and it runs every time the report is
rebuilt.

## Layout

```
index.html               the site
assets/app.js            renders data/data.json
assets/app.css           styles, light and dark
data/data.json           the audit report
contracts/               test fixtures
analyzer/
  detectors.py           source model + the six detectors
  build_report.py        audits a directory → data.json, optional CI gate
```

Standard library only.

## Scope

This is pattern analysis, not symbolic execution or formal verification. It
finds the *shapes* of known bug classes. It will miss logic errors with no
syntactic signature — a contract that is economically broken but syntactically
clean passes. A clean report means these detectors found nothing; it is not a
certificate, and the site says so on the page.

## Deploying

Static. Point Vercel's root directory at `project-4/`.
