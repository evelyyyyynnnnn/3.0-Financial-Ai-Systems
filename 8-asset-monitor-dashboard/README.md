# Asset Monitor Dashboard

> An applied **full-stack product**, not a research project — included as evidence of
> applied financial-engineering breadth, alongside the trustworthy/verifiable-AI
> research that is the core of this repository.

A web dashboard for monitoring assets and market data, built as a real,
deployable application:

- **Client** — React + TypeScript (Radix UI, Tailwind), bundled with Vite.
- **Server** — Node/Express (TypeScript), bundled with esbuild.
- **Shared** — types shared between client and server.

## What it is (and is not)

This is a **product/engineering artifact**: a working full-stack dashboard.
It does **not** make a machine-learning research claim and is **not** counted
in this repository's real-data / test-coverage figures — those describe the
research subprojects (1–7). Portions of the UI were built with AI-assisted
tooling; the design brief and integration are the author's.

## Run it

```bash
pnpm install          # dependencies are not vendored (see .gitignore)
pnpm dev              # start the Vite dev server + API
pnpm build            # production build to dist/
pnpm start            # serve the production build
```

## Layout

```
client/    React/TypeScript front-end
server/    Node/Express API (TypeScript)
shared/    types shared across client and server
patches/   dependency patches
*.md       design notes (ideas, todo, restructure/preview notes)
```

Dependencies (`node_modules/`) and build output (`dist/`) are intentionally not
committed; install from `pnpm-lock.yaml`.
