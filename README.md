# Level 2 — Equipped Vibecoder

Second rung of the ladder: you stop just **using** Claude — you start
**equipping it** with capabilities it didn't have.

In this level you'll:
1. Run a working todo app locally
2. Install two existing Claude Code skills (Matt Pocock's
   `grill-with-docs` and `tdd`)
3. **Grill** the MCP server idea with `grill-with-docs`
4. **TDD-implement** the MCP server (tools + HTML resource) with `tdd`
5. Connect it to Claude Desktop and watch Claude drive the local app

Progression note: in level-1 you used a slash command. Here you use
**skills**. In level-3 you'll **build your own**.

## Prerequisites

- Node ≥ 18, git, two terminal tabs
- Claude Code CLI installed and authenticated
- [Claude Desktop](https://claude.ai/download) installed (this is where
  your MCP server gets tested)

## Quick start

### 1. Run the todo app

```bash
git clone -b level-2 https://github.com/alex-hotton/learn-v2p.git level-2
cd level-2
npm install
npm run dev
```

You should see:

- Frontend on <http://localhost:5173>
- API on <http://localhost:3001>
- SQLite DB at `./data/todos.db`, seeded with 3 todos

Open the browser, play with the app. Then check
`curl http://localhost:3001/api/todos` to see the JSON shape the MCP
server will work with. Leave this terminal running.

### 2. Install the two skills

Install Matt Pocock's `grill-with-docs` and `tdd` skills. The repo
explains the install path:

- <https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs>
- <https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd>

Project-level or user-level, your call. The next step verifies they're
loaded.

### 3. Verify in Claude Code

In a **second terminal**, open Claude Code:

```bash
claude --dangerously-skip-permissions
```

Type `/skills` — you should see **grill-with-docs** and **tdd**
listed. If not, fix the install path before going further.

## What's in this branch

```
src/              React + Tailwind + shadcn frontend (don't touch)
server/           Hono + better-sqlite3 backend (don't touch)
mcp-server/       ← your exercise lives here
  README.md       the technical spec for the MCP server
```

The todo app (`src/` + `server/`) is a working reference target — your
MCP server talks to it over HTTP. The `mcp-server/` folder is **empty
on purpose**: you init the project there, install deps, write the
code. Only the README is shipped because it's the spec.

## The exercise

You'll build two MCP features. The technical spec for each (what to
build, validation, Claude Desktop config) lives in
[`mcp-server/README.md`](mcp-server/README.md) — **read it first.**

Both features follow the same 3-step loop:

1. **Grill** — invoke `grill-with-docs` to interrogate the feature
   against the MCP TypeScript SDK docs. Pin the shape, name the tools,
   surface edge cases.
2. **TDD** — invoke `tdd` to red-green-refactor your way to a working
   implementation.
3. **Connect & test** — wire it into Claude Desktop, validate
   end-to-end, and let `grill-with-docs` capture the decisions that
   crystallized into the docs.

### Feature 1 — MCP tools (text)

Run the 3-step loop on **Step 1** of `mcp-server/README.md`: tools that
wrap the Todo HTTP API (list / add / toggle / delete).

### Feature 2 — MCP resource (HTML)

Run the same 3-step loop on **Step 2**: a styled HTML resource at
`todo://list`.

## You're done when

- From a Claude Desktop chat, you can list / add / toggle / delete
  todos and see the changes reflected in the frontend
- The HTML resource displays a clean, styled view of the current todo
  list when surfaced in Claude Desktop
- Both features went through the Grill → TDD → Connect & test loop and
  the doc updates from `grill-with-docs` reflect the decisions you made
- You can articulate the difference between an MCP **tool** and an MCP
  **resource**, and why this server has both

## Stack reference

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Vite + React + TS + Tailwind + shadcn | Same as level-1 — familiar |
| Backend | Hono on Node | Tiny, modern, TS-first |
| DB | SQLite via `better-sqlite3` | Zero install, file-based |
| MCP SDK | `@modelcontextprotocol/sdk` (TypeScript) | Official |
| Skills | Matt Pocock's `grill-with-docs` + `tdd` | Battle-tested patterns |

## Troubleshooting

- **`npm install` fails on `better-sqlite3`**: Node ≥ 18 with build
  tools available. On macOS: `xcode-select --install`.
- **Port 5173 or 3001 already in use**: kill whatever's holding them
  (`lsof -i :3001`) or change (`PORT=3002 npm run dev:server`).
- **Wiped the DB**: `rm -rf data/` and restart — it re-seeds.
- **Skills don't show in `/skills`**: confirm the path is
  `.claude/skills/grill-with-docs/SKILL.md` (not nested further). The
  folder name in `.claude/skills/` should match the skill name.

## Next level

[`level-3`](../../tree/level-3) — **Agent Engineer.** Now you stop
*using* skills others wrote, and start **writing your own**.
