# Level 3 — Agent Engineer

You stop **using** Claude Code and you start **engineering** it.

This level: you design and build your own **Claude Code plugin** — a
distributable bundle that packages your V2P (vibe-to-prod) workflow.
Then you use that plugin to ship the missing todo backend.

A plugin is the primitive that bundles everything you've seen
separately so far: skills, subagents, hooks, optionally an MCP server.
You decide what your V2P methodology is and what to package — Grill-Me
→ TDD → Update Docs is a fine default, but you're the engineer now.

## Prerequisites

- Node ≥ 18, git
- Claude Code CLI installed and authenticated
- You've completed (or at least read) levels 1, 2.1, and 2.2 — this
  level assumes you've handled slash commands, skills, subagents and
  hooks individually before

## Quick start

```bash
git clone -b level-3 https://github.com/alex-hotton/learn-v2p.git level-3
cd level-3
npm install
npm run dev        # frontend on :5173 — you'll see a "Failed to list todos" error
```

The error is intentional: the frontend calls `/api/todos` and there's
no backend yet. That's what your plugin will produce.

In a separate terminal:

```bash
claude --dangerously-skip-permissions
```

…and start engineering your plugin.

## What's in this branch

```
src/                  ← frontend, already built (don't touch)
spec/
  prd.md              ← the PRD your plugin will be tested on
<your-plugin-name>/   ← (doesn't exist yet) your plugin lives here
server/               ← (doesn't exist yet) what your plugin produces
README.md             ← this file
```

Everything outside `src/` and `spec/` is yours to create — that's the
exercise.

## The exercise — design a V2P plugin

Build a Claude Code plugin in its own directory at the repo root
(e.g. `v2p-plugin/`). It must:

1. **Have a valid manifest** at `<plugin>/.claude-plugin/plugin.json`
   (name, description, version, author).
2. **Bundle at least 2 components** from the plugin primitive set:
   - A **skill** (`<plugin>/skills/<name>/SKILL.md`)
   - A **subagent** (`<plugin>/agents/<name>.md`)
   - A **hook** (`<plugin>/hooks/hooks.json`)
   - An **MCP server** (`<plugin>/.mcp.json`)
3. **Encode a methodology**. Whatever V2P flow makes sense to you. A
   solid baseline is **Grill-Me → TDD → Update Docs**, but you're the
   engineer — decide what gates and steps matter.
4. **Load and run via `--plugin-dir`**:

   ```bash
   claude --dangerously-skip-permissions --plugin-dir ./your-plugin
   ```

   In Claude Code, `/help` should list your plugin's skills
   namespaced as `/your-plugin:skill-name`.
5. **Use your plugin to produce the backend** described in
   `spec/prd.md`. The point of the plugin is that it can take a fuzzy
   PRD and ship working tested code; this exercise is the proof.

## You're done when

- Your plugin loads cleanly via `--plugin-dir` (no errors, components
  show up in `/help`, `/agents`, etc.)
- You ran your plugin on `spec/prd.md` and the result is a working
  backend: `npm run dev` brings up frontend + API, the todo app works
  end-to-end (add, toggle, delete, persists across reload), `npm test`
  passes
- The docs your plugin produced (CHANGELOG / API doc / inline / wherever
  you chose) match the shipped code
- You can re-run your plugin on a small new requirement (e.g. add a
  `priority` field to todos) and watch your methodology fire end-to-end
  without manual hand-holding — that's the proof your plugin is
  engineered, not staged
- (Bonus) Your plugin has a `README.md` at its root that explains what
  it does, how to install it, and how it would behave if shipped to a
  marketplace

## Tips

- **Read the frontend first.** `src/lib/api.ts` shows exactly what
  endpoints, methods, and JSON shapes the API must serve. That's the
  real contract — your plugin's Grill / inspection step should derive
  it from there.
- **Your plugin also has to bootstrap infra.** Only frontend deps
  ship here. Backend deps (`hono`, `better-sqlite3`, …), a test
  runner, the dev script wiring — your plugin's workflow handles all
  of it. See `spec/prd.md`.
- **Use `--plugin-dir` iteratively.** `/reload-plugins` after every
  change picks up edits without restarting Claude Code. Don't write
  the whole plugin blind; ship one component at a time and reload.
- **Pick scope before primitives.** Decide what your V2P methodology
  is first, *then* pick which primitives (skill / subagent / hook /
  MCP) encode each step. Don't start from "I want to use a hook" — start
  from "the workflow needs an enforced gate here, a hook is the
  primitive for that".

## Stack reference

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Vite + React + TS + Tailwind + shadcn | Identical to level-1 / level-2 — familiar |
| Backend (your plugin builds) | Hono on Node + better-sqlite3 | Same as level-2 — no new infra |
| Plugin runtime | Claude Code plugin system | The thing you're learning to engineer |

## Where to find the Claude Code plugin docs

- **Creating a plugin** (manifest, structure, `--plugin-dir` testing,
  marketplaces): <https://code.claude.com/docs/fr/plugins>
- **Skills** (folder structure, `SKILL.md` frontmatter):
  <https://docs.claude.com/en/docs/claude-code> (search "skills")
- **Subagents** (`agents/` definitions, isolated context):
  <https://claude.com/blog/subagents-in-claude-code>
- **Hooks** (events, payloads, exit codes, gating):
  <https://claudefa.st/blog/tools/hooks/hooks-guide>

If your plugin isn't behaving the way you expect, those docs are the
first stop — not the second.
