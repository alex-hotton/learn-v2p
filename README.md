# Level 2 — Equipped Vibecoder

Your job at this level: **build an MCP server** that gives Claude Desktop
the ability to manage the todos in this local app.

You won't write it by hand. You'll use **Claude Code** to build it. That's
the whole point — learning how to equip an AI agent with new capabilities,
by having the agent itself build those capabilities.

## What's in this branch

```
src/              React + Tailwind + shadcn frontend (don't touch)
server/           Hono + better-sqlite3 backend (don't touch)
mcp-server/       ← your exercise lives here
  README.md       the spec — everything else in this folder, you build
```

The todo app (`src/` + `server/`) is a working reference target. The
`mcp-server/` folder is **empty on purpose** — you init the project, pick
the stack inside it, install the deps, write the code. The README is the
only file there because it's the spec.

## Quick start

```bash
# 1. Clone this branch and install
git clone -b level-2 <repo-url> level-2
cd level-2
npm install

# 2. Run the todo app (frontend + backend)
npm run dev
```

This starts:
- Frontend on <http://localhost:5173>
- API on <http://localhost:3001>
- SQLite DB created at `./data/todos.db` on first boot (seeded with 3 todos)

Open the browser, play with it. Then `curl http://localhost:3001/api/todos`
so you can see the JSON shape the MCP server will work with.

## Now go build

```bash
cd mcp-server
cat README.md
```

That's where the actual exercise lives. The README walks you through:
1. Connecting an empty MCP server to Claude Desktop
2. Step 1 — exposing text tools (`list_todos`, `add_todo`, …)
3. Step 2 — exposing an HTML resource that renders nicely in Claude Desktop

## Stack reference

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Vite + React + TS + Tailwind + shadcn | Same as level-1 — familiar |
| Backend | Hono on Node | Tiny, modern, TS-first |
| DB | SQLite via `better-sqlite3` | Zero install, file-based, ships in `data/` |
| MCP SDK | `@modelcontextprotocol/sdk` (TypeScript) | Official |
| MCP runtime | stdio transport via `tsx` | Claude Desktop spawns it as a subprocess |

## Troubleshooting the todo app

- **`npm install` fails on `better-sqlite3`**: you need a recent Node (≥18)
  with build tools available. On macOS run `xcode-select --install` if you
  haven't.
- **Port 5173 or 3001 already in use**: kill whatever's holding them
  (`lsof -i :3001`) or change the port (`PORT=3002 npm run dev:server`).
- **Wiped the DB**: just `rm -rf data/` and restart — it re-seeds.

## Next level

When you're done, check out [`level-3`](../../tree/level-3) — _Agent Engineer_.
