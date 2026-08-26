# Archive

Retired projects, kept for reference. Nothing here is part of the active
portfolio, and nothing on the site links into it as current work.

## trading-system-dashboard

Retired after the portfolio audit found the Trading Simulation Platform
covered it functionally: 4 API endpoints against the Platform's 26, with
market summary and sector performance both already served by the Platform's
`/api/market-data/*` routes.

Its two unique pieces were migrated rather than lost:

- `POST /api/generate-advice` became the Platform's
  `POST /api/advisory/generate`, backed by `services/AdvisoryService.js`.
  The Google AI key now comes from `GOOGLE_AI_API_KEY` in the environment
  instead of a source literal, and a missing key returns a typed 503.
- `GET /api/portfolio-metrics/:riskLevel` became
  `GET /api/advisory/portfolio-metrics/:riskLevel`.
- The four standalone research pages moved to the Platform under
  `public/research/`.

The code here still runs (`npm install && npm start`), but it is no longer
maintained and the site treats it as archived.
