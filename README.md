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

In a **second terminal**, from the same `level-2/` directory:

```bash
mkdir -p .claude/skills
git clone --depth 1 https://github.com/mattpocock/skills.git /tmp/mp-skills
cp -r /tmp/mp-skills/skills/engineering/grill-with-docs .claude/skills/
cp -r /tmp/mp-skills/skills/engineering/tdd .claude/skills/
rm -rf /tmp/mp-skills
```

Skill sources:
- [`grill-with-docs`](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs)
- [`tdd`](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd)

### 3. Verify in Claude Code

In that second terminal, still in `level-2/`:

```bash
claude --dangerously-skip-permissions
```

Then type `/skills` — you should see **grill-with-docs** and **tdd**
listed. If not, the install path is wrong; check that the SKILL.md
files landed at `.claude/skills/<name>/SKILL.md`.

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

## The exercise (3 phases)

### Phase 1 — Grill the idea

Invoke the `grill-with-docs` skill on the MCP server idea. Have it
question what you're about to build:

- What does the MCP TypeScript SDK actually expose? (tools vs resources,
  transports, schema)
- What's the right shape for each tool name + input?
- What edge cases for "add/toggle/delete a todo"?
- How does Claude Desktop render an MCP resource — fully embedded HTML,
  or a side-panel preview?

Lock the answers before writing any code.

### Phase 2 — TDD the tools

Invoke the `tdd` skill to implement **Step 1** of the technical spec
(see `mcp-server/README.md`): MCP tools that wrap
`http://localhost:3001/api/todos` for list / add / toggle / delete.

Failing tests first, then implementation, then validate in Claude
Desktop.

### Phase 3 — TDD the HTML resource

Same `tdd` skill, now for **Step 2** of the spec: an MCP resource that
returns the todo list as styled HTML.

The full technical spec, the Claude Desktop config block, and the exact
validation steps all live in [`mcp-server/README.md`](mcp-server/README.md).

## You're done when

- From a Claude Desktop chat, you can list / add / toggle / delete
  todos and see the changes reflected in the frontend
- The HTML resource displays a clean, styled view of the current todo
  list when surfaced in Claude Desktop
- You can articulate the difference between an MCP **tool** and an MCP
  **resource**, and why this server has both
- You can articulate why you used `grill-with-docs` and `tdd` in that
  order

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
