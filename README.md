# Learn V2P — From Vibecoder to Agent Engineer

A three-level training to take you from using Claude Code as a coding
assistant, to equipping it with custom tools, to engineering your own
end-to-end pipelines.

Each level lives on its own branch. Pick one, follow its README.

## The three levels

| Level | Branch | What you learn | Time |
|-------|--------|----------------|------|
| 1 | [`level-1`](../../tree/level-1) | **Vibecoder** — Ship a real app fast. PRD → Supabase MCP → Vite + React + TS + Tailwind + shadcn + Supabase. | 1–3h |
| 2 | [`level-2`](../../tree/level-2) | **Equipped Vibecoder** — Build an MCP server that gives Claude Desktop custom tools + an HTML resource against a local todo app. | 3–5h |
| 3 | [`level-3`](../../tree/level-3) | **Agent Engineer** — Engineer your own vibe-to-prod pipeline (slash commands, subagents, hooks) and use it to build a backend from a PRD. | ½ to 1 day |

The arc: **use** → **equip** → **engineer**.

## Why the stack changes between levels

- **Level 1** ships a real project to production, so it uses **Supabase**
  (real DB, real auth, real hosting story).
- **Levels 2 and 3** are **standalone exercises** that must run on a
  laptop with zero cloud setup. They use **SQLite + Hono** so you don't
  have to spin up a fresh Supabase project for every exercise (which would
  be both annoying and pointless).

If you only care about a specific level, pick that one — each branch is
self-contained.

## Prerequisites

Common to all levels:

- **Node ≥ 18** (`node -v`)
- **Claude Code** CLI installed and authenticated
- A terminal you're comfortable with

> Heads-up: every level starts Claude Code with
> `claude --dangerously-skip-permissions`. This flag tells Claude to
> auto-approve every tool call without prompting — fine inside these
> sandboxed exercises, but **don't make it a habit on real codebases**
> until you understand what you're approving.

Level-specific:

| Level | Extra prerequisites |
|-------|---------------------|
| 1 | Free [Supabase](https://supabase.com) account · `gh` CLI (optional, for pushing to GitHub at the end) |
| 2 | [Claude Desktop](https://claude.ai/download) installed |
| 3 | — |

## How to start

```bash
git clone -b level-1 https://github.com/alex-hotton/learn-v2p.git level-1
cd level-1
# Then follow the README on that branch.
```

Replace `level-1` with the level you want.

When you finish a level, follow the **Next level** link at the bottom
of its README — you'll clone the next branch into a separate folder
and start fresh.
