# PRD — Todo App backend

## The problem

We have a working todo app frontend. Users complain that **nothing
saves** — close the tab, everything's gone. They want the basics:

- Add a todo
- See all their todos
- Mark them done (and un-done)
- Delete them
- Have it all still be there tomorrow morning

The frontend is already wired to call a JSON API. The exact endpoints,
methods, and JSON shapes the API must serve are visible in
`src/lib/api.ts` — your pipeline reads that file to derive the contract.

## Stack constraints

- **TypeScript + Hono on Node** for the HTTP layer (same family as
  level-2, no new infra surprises)
- **SQLite via `better-sqlite3`** for persistence (file-based, ships
  alongside the repo)
- The API runs on `:3001`. The frontend already proxies `/api/*` there
  (see `vite.config.ts`).

## What your pipeline must produce

Not just the backend code — also the surrounding infra. None of this is
pre-installed:

- Install the backend deps (`hono`, `@hono/node-server`,
  `better-sqlite3`, `@types/better-sqlite3`, `tsx`, `concurrently`)
- Install a test runner (`vitest` recommended) and wire `npm test`
- Add a `dev:server` script and update `npm run dev` so it starts the
  frontend **and** the API together (use `concurrently`)
- Write the tests **before** the implementation (that's the TDD step)
- Write the actual server code

## Non-goals

- No auth, no multi-user, no remote DB — strictly local.
- No deployment story — `npm run dev` is the only target environment.
- No fancy validation framework if a five-line guard does the job.

## Done when

- `npm run dev` starts the frontend **and** the API together
- Open <http://localhost:5173>, add a todo, refresh — it's still there
- The "Failed to list todos" error banner is gone, the list renders
- The tests your pipeline wrote all pass on `npm test`
