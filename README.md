# Level 2.1 — Equipped Vibecoder (skills)

Second rung of the ladder: you stop just **using** Claude — you start
**equipping it** with capabilities it didn't have. This level uses
**skills**. Level 2.2 will go further with **subagents + hooks**.

In this level you'll:
1. Run a working todo app locally
2. Install two Claude Code skills (`grill-with-docs` + `tdd`)
3. Grill → TDD → connect each MCP feature into Claude Desktop
4. Watch Claude drive the todo app — and, in feature 2, render UI
   inline in the chat

Progression note: in level-1 you used a slash command. Here you use
**skills**. In **level-2.2** you'll add **subagents + hooks**. In
**level-3** you'll build your own skill.

## Prerequisites

- Node ≥ 18, git, two terminal tabs
- Claude Code CLI installed and authenticated
- [Claude Desktop](https://claude.ai/download) installed (this is where
  your MCP server gets tested)

## Quick start

### 1. Run the todo app

```bash
git clone -b level-2.1 https://github.com/alex-hotton/learn-v2p.git level-2.1
cd level-2.1
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

### 2. Install the skills

Install Matt Pocock's `grill-with-docs` and `tdd`. The repos explain
the install path:

- <https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs>
- <https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd>

Project-level or user-level, your call.

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

### Feature 2 — MCP App (inline HTML)

Run the same 3-step loop on **Step 2**: a styled view that Claude
renders **inline in the chat**, autonomously, when the user asks to
see their todos. Different from feature 1 — this is full UI rendered
in-chat, not just text replies.

**You need two extra things before starting feature 2**, otherwise it
won't work:

1. **Install the official Anthropic `create-mcp-app` skill** —
   <https://github.com/modelcontextprotocol/ext-apps/tree/main/plugins/mcp-apps/skills/create-mcp-app>
2. **Use the `ext-apps` repo as your reference** —
   <https://github.com/modelcontextprotocol/ext-apps>
   (look at `examples/basic-server-vanillajs/`; the skill walks you
   through everything else)

## You're done when

- From a Claude Desktop chat, you can list / add / toggle / delete
  todos and see the changes reflected in the frontend
- Asking Claude to "show me my todos" triggers a tool call **on its
  own** and the HTML view renders **inline in the chat** with the
  current todo list (no manual attach, no side-panel)
- Both features went through the Grill → TDD → Connect & test loop and
  the doc updates from `grill-with-docs` reflect the decisions you made
- You can articulate why MCP **Apps** exist on top of plain tools and
  resources, and when you'd reach for one

## Stack reference

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Vite + React + TS + Tailwind + shadcn | Same as level-1 — familiar |
| Backend | Hono on Node | Tiny, modern, TS-first |
| DB | SQLite via `better-sqlite3` | Zero install, file-based |
| MCP SDK | `@modelcontextprotocol/sdk` (TypeScript) | Official |
| MCP Apps | Anthropic `ext-apps` extension | Feature 2 — inline UI in chat |
| Skills | `grill-with-docs`, `tdd`, `create-mcp-app` (feature 2) | Battle-tested patterns |

## Troubleshooting

- **`npm install` fails on `better-sqlite3`**: Node ≥ 18 with build
  tools available. On macOS: `xcode-select --install`.
- **Port 5173 or 3001 already in use**: kill whatever's holding them
  (`lsof -i :3001`) or change (`PORT=3002 npm run dev:server`).
- **Wiped the DB**: `rm -rf data/` and restart — it re-seeds.
- **Skills don't show in `/skills`**: confirm the path is
  `.claude/skills/<name>/SKILL.md` (not nested further). The folder
  name should match the skill name.
- **MCP App view is blank in the chat**: your client bundle isn't
  self-contained. Compare against `basic-server-vanillajs/` in the
  `ext-apps` repo — the `create-mcp-app` skill knows the fix.

## Next level

[`level-2.2`](../../tree/level-2.2) — **Equipped Vibecoder, part 2.**
Same Claude Code, two new primitives: **subagents** and **hooks**.
You'll automate a workflow that, today, you'd do by hand.
