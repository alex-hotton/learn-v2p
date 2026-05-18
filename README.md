# Learn V2P — From Vibecoder to Agent Engineer

A training to take you from using Claude Code as a coding assistant, to
equipping it with custom tools, to engineering your own end-to-end
pipelines.

Each level lives on its own branch. Pick one, follow its README.

## The levels

The arc: **use** → **equip** → **engineer**. Each level lives on its
own branch — clone the one you want.

### Level 1 — Vibecoder · branch [`level-1`](../../tree/level-1)

**Goal: stop typing code, start driving Claude Code.** You walk away
able to ship a working app from a PRD in an afternoon, not a week. The
exercise: build a minimal CRM (5 user stories) using `/initproject` —
a single slash command that takes you from PRD to running React +
Supabase app, end-to-end.

### Level 2.1 — Equipped Vibecoder · skills · branch [`level-2.1`](../../tree/level-2.1)

**Goal: extend Claude with reusable skills, don't just consume the
default ones.** You walk away knowing how to install and apply
community skills to drive a real workflow. The exercise: install
`grill-with-docs` + `tdd` (Matt Pocock) and `create-mcp-app`
(Anthropic), then use them to build a local MCP server that gives
Claude Desktop new powers over a todo app — including an inline UI in
the chat.

### Level 2.2 — Equipped Vibecoder · subagents + hooks · branch [`level-2.2`](../../tree/level-2.2)

**Goal: automate Claude's lifecycle — turn manual workflows into
enforced ones.** You walk away knowing the split between subagents
(delegate reasoning) and hooks (deterministic gates / triggers). The
exercise: build one subagent (a CHANGELOG writer) + two hooks
(`PostToolUse` on `git commit` to fire it, `Stop` to refuse ending the
session if any commit is missing its entry).

### Level 3 — Agent Engineer · branch [`level-3`](../../tree/level-3)

**Goal: package your own end-to-end agent workflow as something
shippable.** You walk away able to design, build, and distribute a
Claude Code workflow others can install and use. The exercise: build
a skill that codifies a 3-step development methodology (Grill-Me →
TDD → Update Docs), then run it on a PRD to ship a tested backend.

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
