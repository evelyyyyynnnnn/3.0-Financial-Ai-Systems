"""Solidity vulnerability detectors.

Static pattern analysis over a lightly-parsed contract. Deliberately not a
symbolic executor: the goal is a report a human auditor can check line by
line, so every finding carries the exact source line that triggered it and an
explicit note on how it produces false positives.

Each detector returns Findings with a confidence, and that confidence is
meant honestly — `high` means the pattern is almost always the bug, `low`
means the pattern is worth a look and frequently is not.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field, asdict

SEVERITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3, "info": 4}


@dataclass
class Finding:
    detector: str
    title: str
    severity: str
    confidence: str          # high | medium | low
    line: int
    code: str
    function: str | None
    explanation: str
    false_positives: str
    remediation: str
    references: list[str] = field(default_factory=list)

    def to_dict(self):
        return asdict(self)


# --- lightweight source model ----------------------------------------------

_COMMENT_BLOCK = re.compile(r"/\*.*?\*/", re.S)
_COMMENT_LINE = re.compile(r"//[^\n]*")
_STRING = re.compile(r'"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'')
_FUNC = re.compile(
    r"\bfunction\s+(\w+)\s*\(([^)]*)\)\s*([^{;]*)", re.S)


def strip_noise(src: str) -> str:
    """Blank out comments and string literals, preserving line numbers.

    Detectors must not fire on a pattern that appears inside a comment or a
    revert message, and line numbers have to survive so findings can point at
    real source lines.
    """
    def blank(m):
        return re.sub(r"[^\n]", " ", m.group(0))
    s = _COMMENT_BLOCK.sub(blank, src)
    s = _COMMENT_LINE.sub(blank, s)
    s = _STRING.sub(blank, s)
    return s


@dataclass
class Function:
    name: str
    start: int          # line number, 1-based
    end: int
    modifiers: str
    body: str


def parse_functions(clean: str) -> list[Function]:
    """Find functions and their bodies by brace matching."""
    lines = clean.split("\n")
    line_at = []
    pos = 0
    for i, ln in enumerate(lines, 1):
        line_at.append((pos, i))
        pos += len(ln) + 1

    def line_of(offset: int) -> int:
        lo = 1
        for start, num in line_at:
            if start > offset:
                break
            lo = num
        return lo

    out: list[Function] = []
    for m in _FUNC.finditer(clean):
        brace = clean.find("{", m.end() - 1)
        if brace == -1:
            continue
        depth, i = 0, brace
        while i < len(clean):
            if clean[i] == "{":
                depth += 1
            elif clean[i] == "}":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        out.append(Function(
            name=m.group(1),
            start=line_of(m.start()),
            end=line_of(i),
            modifiers=" ".join(m.group(3).split()),
            body=clean[brace:i + 1],
        ))
    return out


def _line_text(src: str, n: int) -> str:
    lines = src.split("\n")
    return lines[n - 1].strip() if 0 < n <= len(lines) else ""


def _abs_line(clean: str, func: Function, local_offset: int) -> int:
    """Translate an offset inside a function body to an absolute line."""
    body_start = clean.find(func.body)
    if body_start == -1:
        return func.start
    return clean.count("\n", 0, body_start + local_offset) + 1


# --- detectors --------------------------------------------------------------

_STATE_WRITE = re.compile(r"^\s*(?!.*\b(?:uint|int|address|bool|bytes|string|mapping)\b\s+\w+\s*=)"
                          r"\s*(\w+)\s*(?:\[[^\]]*\])?\s*(?:=|[-+]=)\s*", re.M)
_EXTERNAL_CALL = re.compile(r"\.\s*(call|delegatecall|send|transfer)\s*[({]")


def reentrancy(src: str, clean: str, funcs: list[Function]) -> list[Finding]:
    """State written after an external call — the classic checks-effects order bug."""
    out = []
    for f in funcs:
        call = _EXTERNAL_CALL.search(f.body)
        if not call:
            continue
        after = f.body[call.end():]
        write = _STATE_WRITE.search(after)
        if not write:
            continue
        line = _abs_line(clean, f, call.end() + write.start())
        out.append(Finding(
            detector="reentrancy",
            title="State updated after an external call",
            severity="critical", confidence="high",
            line=line, code=_line_text(src, line), function=f.name,
            explanation=(
                f"{f.name}() makes an external call and then writes contract state. "
                "A malicious callee can re-enter before that write lands, so every "
                "check made earlier in the function still sees the pre-call state."),
            false_positives=(
                "Not exploitable if the callee is a trusted, fixed address, or if a "
                "reentrancy guard modifier already wraps the function — this detector "
                "reads the body, not the modifier's implementation."),
            remediation=(
                "Apply checks-effects-interactions: write state before the external "
                "call, or add a nonReentrant guard."),
            references=["SWC-107"],
        ))
    return out


def tx_origin_auth(src: str, clean: str, funcs) -> list[Finding]:
    """tx.origin used in a condition — authorization that a proxy contract defeats."""
    out = []
    for m in re.finditer(r"\btx\.origin\b", clean):
        line = clean.count("\n", 0, m.start()) + 1
        text = _line_text(src, line)
        if not re.search(r"require|if|assert|==|!=", text):
            continue
        out.append(Finding(
            detector="tx-origin-auth", title="Authorization via tx.origin",
            severity="high", confidence="high", line=line, code=text,
            function=None,
            explanation=(
                "tx.origin is the transaction's original sender, not the immediate "
                "caller. If this contract is called by another contract the user was "
                "tricked into using, tx.origin is still the user and the check passes."),
            false_positives=(
                "Occasionally intentional — a check that the caller is an EOA rather "
                "than a contract. That use is itself discouraged and breaks with "
                "account abstraction."),
            remediation="Use msg.sender for authorization.",
            references=["SWC-115"],
        ))
    return out


def unchecked_call(src: str, clean: str, funcs) -> list[Finding]:
    """Low-level call whose boolean result is discarded."""
    out = []
    for m in re.finditer(r"(?<![=\w.])\s*\w+\s*\.\s*(call|send|delegatecall)\s*[({]", clean):
        line = clean.count("\n", 0, m.start()) + 1
        text = _line_text(src, line)
        if re.search(r"(require|assert)\s*\(|\bbool\s+\w+\s*(,|=)|\(\s*bool", text):
            continue
        if "=" in text.split(".call")[0]:
            continue
        out.append(Finding(
            detector="unchecked-call", title="Return value of a low-level call ignored",
            severity="medium", confidence="medium", line=line, code=text, function=None,
            explanation=(
                "call/send/delegatecall return false on failure rather than reverting. "
                "Ignoring the result means the transaction continues as if the transfer "
                "succeeded."),
            false_positives=(
                "Intentional in fire-and-forget patterns where failure genuinely does "
                "not matter, and in some pull-payment designs."),
            remediation="Check the returned bool, or use a checked wrapper.",
            references=["SWC-104"],
        ))
    return out


def selfdestruct_exposed(src: str, clean: str, funcs: list[Function]) -> list[Finding]:
    """selfdestruct in a function with no owner modifier and no msg.sender check."""
    out = []
    for f in funcs:
        if not re.search(r"\bselfdestruct\s*\(|\bsuicide\s*\(", f.body):
            continue
        guarded = re.search(r"\b(onlyOwner|onlyAdmin|auth|onlyRole)\b", f.modifiers) or \
                  re.search(r"require\s*\([^)]*msg\.sender", f.body)
        if guarded:
            continue
        out.append(Finding(
            detector="unprotected-selfdestruct",
            title="selfdestruct reachable without an access check",
            severity="critical", confidence="high",
            line=f.start, code=_line_text(src, f.start), function=f.name,
            explanation=(
                f"{f.name}() can destroy the contract and there is no owner modifier "
                "on it and no msg.sender check in its body. Anyone can call it."),
            false_positives=(
                "A guard implemented through an inherited modifier this detector does "
                "not resolve, or an access check delegated to another contract."),
            remediation="Gate it behind an ownership or role check.",
            references=["SWC-106"],
        ))
    return out


def weak_randomness(src: str, clean: str, funcs) -> list[Finding]:
    """keccak256 seeded from block state the proposer can influence."""
    pat = re.compile(r"\b(block\.(timestamp|number|difficulty|prevrandao)|blockhash|now)\b")
    out = []
    for m in re.finditer(r"\bkeccak256\s*\(([^;]{0,220})", clean):
        if not pat.search(m.group(1)):
            continue
        line = clean.count("\n", 0, m.start()) + 1
        out.append(Finding(
            detector="weak-randomness", title="Randomness derived from block state",
            severity="high", confidence="medium", line=line, code=_line_text(src, line),
            function=None,
            explanation=(
                "Block timestamp, number, and hash are all influenced or observable by "
                "the proposer. A validator can choose whether to publish a block, which "
                "is enough to bias any draw derived from them."),
            false_positives=(
                "Fine when the result carries no value — a tiebreak, a display seed, or "
                "a nonce that is not security-relevant."),
            remediation="Use a commit-reveal scheme or a VRF.",
            references=["SWC-120"],
        ))
    return out


def unprotected_state_change(src: str, clean: str, funcs: list[Function]) -> list[Finding]:
    """Public/external setter that writes an owner-ish variable with no access check."""
    sensitive = re.compile(r"\b(owner|admin|governance|treasury|beneficiary|oracle|"
                           r"implementation|fee\w*|rate\w*|paused)\b", re.I)
    out = []
    for f in funcs:
        if not re.search(r"\b(public|external)\b", f.modifiers):
            continue
        if re.search(r"\b(onlyOwner|onlyAdmin|onlyRole|auth|onlyGovernance)\b", f.modifiers):
            continue
        if re.search(r"require\s*\([^)]*msg\.sender", f.body):
            continue
        m = re.search(r"^\s*(" + sensitive.pattern + r")\s*=", f.body, re.M | re.I)
        if not m:
            continue
        line = _abs_line(clean, f, m.start())
        out.append(Finding(
            detector="unprotected-state-change",
            title="Privileged state written without an access check",
            severity="high", confidence="medium",
            line=line, code=_line_text(src, line), function=f.name,
            explanation=(
                f"{f.name}() is {('external' if 'external' in f.modifiers else 'public')} "
                "and assigns to a privileged variable, with no modifier and no msg.sender "
                "check in the body."),
            false_positives=(
                "A guard from an inherited modifier this detector does not resolve, or a "
                "constructor-like initializer protected by an initialized flag."),
            remediation="Add an ownership or role modifier.",
            references=["SWC-105"],
        ))
    return out


DETECTORS = [reentrancy, tx_origin_auth, unchecked_call, selfdestruct_exposed,
             weak_randomness, unprotected_state_change]


def analyze(src: str) -> list[Finding]:
    clean = strip_noise(src)
    funcs = parse_functions(clean)
    findings: list[Finding] = []
    for det in DETECTORS:
        findings.extend(det(src, clean, funcs))
    findings.sort(key=lambda f: (SEVERITY_ORDER.get(f.severity, 9), f.line))
    return findings
