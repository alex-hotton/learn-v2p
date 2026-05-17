# Level 3 — Agent Engineer

You stop **using** Claude Code and you start **engineering** it.

This level is about building your own **vibe-to-prod pipeline**: a set
of custom slash commands, subagents, and hooks that, together, turn a
PRD into shipped, tested, working code — without you babysitting each
step.

## Prerequisites

- Node ≥ 18
- Claude Code CLI installed and authenticated
- You've completed (or at least read) levels 1 and 2 — the pipeline
  primitives in this level assume you've seen MCP and slash commands
  before

## Quick start

```bash
git clone -b level-3 https://github.com/alex-hotton/learn-v2p.git level-3
cd level-3
npm install
npm run dev        # frontend on :5173 — you'll see a "Failed to list todos" error
```

The error is intentional: the frontend tries to call `/api/todos` and
there's no backend yet. That's what your pipeline will produce.

Then:

```bash
claude --dangerously-skip-permissions
```

…and start building your pipeline.

## What's in this branch

```
src/                ← frontend, already built (don't touch)
spec/
  prd.md            ← the PRD your pipeline ingests
.claude/            ← (doesn't exist yet) your pipeline lives here
server/             ← (doesn't exist yet) the API your pipeline produces
README.md           ← this file
```

Everything outside `src/` and `spec/` is for you to create — that's the
exercise.

## The exercise

1. **Build the pipeline** in `.claude/` — slash commands, skills,
   subagents, hooks. It should turn `spec/prd.md` into a working,
   tested API end-to-end with minimal manual orchestration from you.
2. **Run your pipeline** on `spec/prd.md` to produce the backend in
   `server/` (and bootstrap the surrounding infra — deps, scripts, test
   runner; see `spec/prd.md` for the full list).
3. **Verify**: `npm run dev` starts frontend + API, the todo app works
   end-to-end, refresh persists state, `npm test` passes.

## What "the pipeline" means

A pipeline at this level is at least:

- **A slash command** (e.g. `/v2p`) that orchestrates the whole flow
  from one user prompt
- **A "challenger" subagent** that interrogates the PRD, surfaces gaps,
  asks the user to fill them
- **A "PRD → issues" step** that splits the PRD into atomic units of
  work (one endpoint = one issue, roughly)
- **A "TDD" subagent** that writes failing tests for an issue *before*
  the implementation
- **A pre-commit hook** that refuses to commit if tests fail

You're free to add more primitives (planner, reviewer, doc-writer…) and
free to restructure. What matters is: one invocation, the whole flow
runs, the backend appears, the tests pass, the app works.

## Tips

- **Read the frontend first.** `src/lib/api.ts` shows you exactly what
  endpoints, methods, and JSON shapes the API must serve. That's the
  contract. Your pipeline should derive it automatically — don't
  duplicate it by hand.
- **The pipeline also has to bootstrap infra.** The branch ships with
  only the frontend deps installed. Backend deps (`hono`,
  `better-sqlite3`, …), test runner, dev script wiring — all part of
  what your pipeline must handle. See `spec/prd.md`.
- **Five tight primitives beat fifteen half-broken ones.** Get the loop
  running, then add steps if useful.
- **Hooks are your safety net.** A pre-commit that runs the tests is
  the difference between "the agent shipped code" and "the agent
  shipped *working* code."

## You're done when

- `npm run dev` brings up frontend + your API together
- The todo app works end-to-end (add, toggle, delete, persists across
  reload)
- `npm test` passes
- You can re-run your pipeline from a clean slate on a slightly
  different PRD (e.g. adding a "priority" field) and watch it produce a
  clean delta — that's the real proof your pipeline is engineered, not
  staged

## Stack reference

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Vite + React + TS + Tailwind + shadcn | Identical to level-1 / level-2 — familiar |
| Backend (you build) | Hono on Node + better-sqlite3 | Same as level-2's reference — no new infra |
| Pipeline runtime | Claude Code (`.claude/` primitives) | The thing you're learning to engineer |

## Where to find the Claude Code primitive docs

You'll be writing slash commands, hooks, and subagents — here's where
the official docs cover each:

- **Claude Code documentation index**: <https://docs.claude.com/en/docs/claude-code>
- Look up these topics specifically: **slash commands** (where to put
  your `/v2p` file and its frontmatter), **subagents** (definition
  format, how to invoke from a parent agent), **hooks** (the
  `.claude/settings.json` shape and event names like `PreToolUse`,
  `Stop`), **skills** (folder structure and `SKILL.md` frontmatter).

If a primitive isn't behaving the way you expect, the docs are the
first stop — not the second.
