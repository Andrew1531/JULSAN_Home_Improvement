# JulSan Home Improvement

_A local lead-generation website for JulSan Home Improvement, serving Northern New Jersey._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/julsan-home-improvement/src/App.tsx` — single-page site content and interactions
- `artifacts/julsan-home-improvement/src/index.css` — site styling and responsive behavior

## Architecture decisions

- The site is a standalone frontend; it does not require the shared API server.
- Estimate inquiries are prepared locally for copying; they are not sent or stored.

## Product

The site presents JulSan's kitchen renovations, bathroom renovations, and general contracting services in Northern New Jersey. Visitors can explore the approach, read FAQs, and prepare an estimate inquiry.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Do not describe the estimate form as a submission channel until a real email address or delivery service is connected.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
