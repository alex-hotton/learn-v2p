# Idea — Todo App backend

We have a working todo app frontend. Users complain that **nothing
saves** — close the tab, everything's gone. They want the basics:

- Add a todo
- See all their todos
- Mark them done (and un-done)
- Delete them
- Have it all still be there tomorrow morning

The frontend is already wired to call a JSON API (look at the code to see
exactly what shape and what endpoints it expects). Your job is to build
that API.

## Stack constraints

- **TypeScript + Hono on Node** for the HTTP layer (same family as level-2,
  no new infra surprises)
- **SQLite via `better-sqlite3`** for persistence (file-based, ships
  alongside the repo)
- The API runs on `:3001`. The frontend already proxies `/api/*` there
  (see `vite.config.ts`).

## Non-goals

- No auth, no multi-user, no remote DB — strictly local.
- No deployment story — `npm run dev` is the only target environment.
- No fancy validation framework if a five-line guard does the job.

## Done when

- `npm run dev` starts the frontend **and** the API
- Open <http://localhost:5173>, add a todo, refresh — it's still there
- The "Failed to list todos" error banner is gone, the list renders
- The tests your pipeline wrote all pass and run on `npm test`
