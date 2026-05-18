# Learn V2P — From Vibecoder to Agent Engineer

A training to take you from using Claude Code as a coding assistant, to
equipping it with custom tools, to engineering your own end-to-end
pipelines.

Each level lives on its own branch. Pick one, follow its README.

## The levels

| Level | Branch | What you learn |
|-------|--------|----------------|
| 1 | [`level-1`](../../tree/level-1) | **Vibecoder** — Ship a real app fast. PRD → Supabase MCP → Vite + React + TS + Tailwind + shadcn + Supabase. |
| 2.1 | [`level-2.1`](../../tree/level-2.1) | **Equipped Vibecoder (skills)** — Use existing Claude Code skills (`grill-with-docs`, `tdd`, `create-mcp-app`) to build an MCP server with tools + an inline-rendered MCP App against a local todo app. |
| 2.2 | [`level-2.2`](../../tree/level-2.2) | **Equipped Vibecoder (subagents + hooks)** — Build an automatic CHANGELOG that writes itself after every commit: one subagent + two hooks (`PostToolUse` + `Stop`). |
| 3 | [`level-3`](../../tree/level-3) | **Agent Engineer** — Build your own Claude Code skill that codifies a 3-step methodology (Grill-Me → TDD → Update Docs), then run it on a PRD to ship a backend. |

The arc: **use** → **equip** → **engineer**.

## Why the stack changes between levels

- **Level 1** ships a real project, so it uses **Supabase** (real DB,
  real auth, real hosting story).
- **Levels 2.x and 3** are **standalone exercises** that must run on a
  laptop with zero cloud setup. They use **SQLite + Hono** so you
  don't have to spin up a fresh Supabase project per exercise.

Each branch is self-contained — pick the level you care about.

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
| 1 | Free [Supabase](https://supabase.com) account |
| 2.1 | [Claude Desktop](https://claude.ai/download) installed |
| 2.2 | — |
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
