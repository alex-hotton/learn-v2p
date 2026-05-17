# Level 2 — Equipped Vibecoder

Second rung: you stop just using Claude — you start **giving it
capabilities it didn't have**. Specifically, you build an MCP server
that plugs into Claude Desktop and lets it manage the todos in a local
app.

You won't write the server by hand. You'll use **Claude Code** to build
it. The point is precisely to learn how to equip an AI agent with new
tools — by having the agent build those tools alongside you.

## Prerequisites

- Node ≥ 18
- Claude Code CLI installed and authenticated
- [Claude Desktop](https://claude.ai/download) installed (this is where
  your MCP server gets tested)
- Two terminal tabs: one for the todo app, one for Claude Code in
  `mcp-server/`

## Quick start

```bash
git clone -b level-2 https://github.com/alex-hotton/learn-v2p.git level-2
cd level-2
npm install
npm run dev
```

This starts:

- Frontend on <http://localhost:5173>
- API on <http://localhost:3001>
- SQLite DB created at `./data/todos.db` on first boot (seeded with 3 todos)

Open the browser, play with it. Then `curl http://localhost:3001/api/todos`
so you can see the JSON shape the MCP server will work with.

Leave that running in this terminal. In a **second terminal**:

```bash
cd mcp-server
cat README.md
```

That's where the actual exercise lives.

## What's in this branch

```
src/              React + Tailwind + shadcn frontend (don't touch)
server/           Hono + better-sqlite3 backend (don't touch)
mcp-server/       ← your exercise lives here
  README.md       the spec — everything else in this folder, you build
```

The todo app (`src/` + `server/`) is a working reference target the MCP
server will interact with through HTTP. The `mcp-server/` folder is
**empty on purpose** — you init the project, pick the stack inside it,
install the deps, write the code. The README is the only file there
because it's the spec.

## The exercise (two steps)

1. **Tools** — expose MCP tools (`list_todos`, `add_todo`, toggle,
   delete) that wrap the Todo HTTP API. Validate by chatting with Claude
   Desktop: "what's on my todo list?", "add 'buy milk'".
2. **A resource** — expose an MCP resource that returns the todo list as
   styled HTML. In Claude Desktop, MCP resources surface in a side panel
   / attachment view (not a full embedded webpage), so aim for "clean and
   readable", not "interactive dashboard".

Full spec in [`mcp-server/README.md`](mcp-server/README.md).

## You're done when

- From a Claude Desktop chat, you can list / add / toggle / delete todos
  and see the changes reflected in the frontend
- The HTML resource displays a clean, styled view of the current todo
  list when surfaced in Claude Desktop
- You can articulate the difference between an MCP **tool** and an MCP
  **resource**, and why this server has both

## Stack reference

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Vite + React + TS + Tailwind + shadcn | Same as level-1 — familiar |
| Backend | Hono on Node | Tiny, modern, TS-first |
| DB | SQLite via `better-sqlite3` | Zero install, file-based, ships in `data/` |
| MCP SDK | `@modelcontextprotocol/sdk` (TypeScript) | Official |
| MCP runtime | stdio transport via `tsx` | Claude Desktop spawns it as a subprocess |

## Troubleshooting

- **`npm install` fails on `better-sqlite3`**: Node ≥ 18 with build
  tools available. On macOS: `xcode-select --install`.
- **Port 5173 or 3001 already in use**: kill whatever's holding them
  (`lsof -i :3001`) or change (`PORT=3002 npm run dev:server`).
- **Wiped the DB**: just `rm -rf data/` and restart — it re-seeds.

## Next level

[`level-3`](../../tree/level-3) — **Agent Engineer.** You stop building
one custom capability and start engineering an entire pipeline.
