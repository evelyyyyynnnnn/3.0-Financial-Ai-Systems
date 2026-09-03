"""A synthetic multi-asset market with a KNOWN transmission structure.

This is the point of the module. Correlation is everywhere in market data and
almost none of it is transmission, so a contagion method has to be tested
against a market where you know which links are real. Here the true edges are
constructed, and the method's job is to recover them and reject the rest.

The generator builds three things a real cross-asset panel has, and that a naive
correlation study confuses with each other:

  a common factor      everything loads on it, producing correlation with no
                       transmission at all -- the main source of false edges
  true directed links  a shock to A genuinely moves B, with a lag
  tail asymmetry       links that are quiet in calm markets and active in
                       stress, which is the whole phenomenon of interest
"""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np


@dataclass
class Market:
    names: list
    returns: np.ndarray            # T x N
    true_edges: list = field(default_factory=list)   # (src, dst, strength, tail_only)
    stress_days: np.ndarray = field(default_factory=lambda: np.array([], bool))
    classes: dict = field(default_factory=dict)      # name -> "crypto" | "equity"

    def index(self, name: str) -> int:
        return self.names.index(name)

    def true_edge_set(self) -> set:
        return {(s, d) for s, d, _, _ in self.true_edges}


def _topological(edges: list) -> list:
    """Order edges so a source is fully built before it transmits."""
    remaining = list(edges)
    done_nodes: set = set()
    out: list = []
    all_dst = {d for _, d, _, _ in edges}
    for _ in range(len(edges) + 1):
        progressed = False
        for e in list(remaining):
            src = e[0]
            if src not in all_dst or src in done_nodes:
                out.append(e)
                done_nodes.add(e[1])
                remaining.remove(e)
                progressed = True
        if not remaining or not progressed:
            break
    return out + remaining


def make_market(n_crypto: int = 8, n_equity: int = 10, T: int = 1500,
                seed: int = 17) -> Market:
    rng = np.random.default_rng(seed)
    names = ([f"CRY{i+1}" for i in range(n_crypto)]
             + [f"EQ{i+1}" for i in range(n_equity)])
    classes = {n: ("crypto" if n.startswith("CRY") else "equity") for n in names}
    N = len(names)

    # Regime: stress arrives in blocks, not as isolated days.
    stress = np.zeros(T, bool)
    d = 0
    while d < T:
        if rng.random() < 0.035:
            length = int(rng.integers(8, 25))
            stress[d:d + length] = True
            d += length
        else:
            d += 1

    # Common factor. Everything loads on it -> correlation without transmission.
    factor = rng.normal(0, 1.0, T) * np.where(stress, 2.4, 1.0)
    loadings = np.where(np.array([classes[n] == "crypto" for n in names]),
                        rng.uniform(0.35, 0.75, N), rng.uniform(0.25, 0.55, N))

    idio_vol = np.where(np.array([classes[n] == "crypto" for n in names]),
                        rng.uniform(0.030, 0.055, N), rng.uniform(0.008, 0.018, N))

    # True directed edges. `tail_only` links fire only during stress -- the
    # phenomenon the whole project is about.
    edges = [
        ("CRY1", "CRY2", 0.45, False),
        ("CRY1", "EQ1", 0.30, True),      # crypto -> equity, stress only
        ("CRY2", "EQ2", 0.26, True),
        ("EQ1", "EQ3", 0.35, False),
        ("CRY3", "CRY4", 0.40, False),
        ("EQ4", "EQ5", 0.28, False),
        ("CRY1", "EQ6", 0.22, True),
    ]

    R = np.zeros((T, N))
    base = (factor[:, None] * loadings[None, :] * idio_vol[None, :] * 12.0
            + rng.normal(0, 1, (T, N)) * idio_vol[None, :])
    R[:] = base

    # Apply transmission with a one-day lag, once per edge, in topological
    # order. An earlier version looped twice "to handle chains", which silently
    # applied every edge a second time and doubled each link's true strength --
    # making the constructed ground truth different from the documented one.
    name_i = {n: i for i, n in enumerate(names)}
    ordered = _topological(edges)
    for src, dst, strength, tail_only in ordered:
        si, di = name_i[src], name_i[dst]
        active = stress if tail_only else np.ones(T, bool)
        lagged = np.concatenate([[0.0], R[:-1, si]])
        R[:, di] += strength * lagged * active
    return Market(names=names, returns=R, true_edges=edges,
                  stress_days=stress, classes=classes)
