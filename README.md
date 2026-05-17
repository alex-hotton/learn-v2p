# Level 3 — Agent Engineer

You stop **using** Claude Code and you start **engineering** it.

This level is about building your own **vibe-to-prod pipeline**: a set of
custom skills, subagents, and hooks that, together, turn a fuzzy
product idea into shipped, tested, working code — without you babysitting
each step.

## The exercise

You're handed a working todo app **frontend** with no backend. The
frontend tries to call `/api/todos` and shows a "Failed to list todos"
error because there's nothing there.

```
src/                      ← frontend, already built (don't touch)
spec/
  idea.md                 ← the user need your pipeline ingests
.claude/                  ← (doesn't exist yet) your pipeline lives here
server/                   ← (doesn't exist yet) the API your pipeline produces
README.md                 ← this file
```

Your job:

1. **Build the pipeline** in `.claude/` — slash commands, skills, subagents,
   hooks. It should turn `spec/idea.md` into a working API end-to-end with
   minimal manual orchestration from you.
2. **Run your pipeline** on `spec/idea.md` to produce the backend in
   `server/`.
3. **Verify**: `npm run dev` starts both processes, the todo app works
   end-to-end, refresh persists state, tests pass.

## What "the pipeline" means

A pipeline at this level is at least:

- **A slash command** (e.g. `/v2p`) that orchestrates the whole flow from
  one user prompt
- **A "challenger" subagent** that interrogates the idea, surfaces gaps,
  produces a PRD
- **A "PRD → issues" step** that splits the PRD into atomic units of work
  (one endpoint = one issue, roughly)
- **A "TDD" subagent** that writes failing tests for an issue *before* the
  implementation
- **A pre-commit hook** that refuses to commit if tests fail

You're free to add more (planner, reviewer, doc-writer…), free to
restructure. What matters is: one invocation, the whole flow runs, the
backend appears, the tests pass, the app works.

## Quick start

```bash
git clone -b level-3 <repo-url> level-3
cd level-3
npm install
npm run dev        # frontend on :5173 — you'll see the API error
```

Then:

```bash
claude --dangerously-skip-permissions
```

…and start building your pipeline.

## Tips

- **Read the frontend first.** `src/lib/api.ts` shows you exactly what
  endpoints, methods, and JSON shapes the API must serve. That's the
  contract. Your pipeline should derive this automatically — don't
  duplicate it by hand.
- **Don't over-engineer the pipeline.** Five tight primitives beat fifteen
  half-broken ones. Get the loop running, then add steps if useful.
- **Hooks are your safety net.** A pre-commit that runs the tests is the
  difference between "the agent shipped code" and "the agent shipped
  *working* code."

## Inspiration

If you're stuck on what good pipeline shapes look like, look at existing
ones — Madpaw Cocked, PRD2issue, and similar V2P-style toolchains floating
around. **Don't copy-paste them.** Use them to understand the moves, then
write your own primitives that fit your taste and this exercise's shape.

## Stack reference

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Vite + React + TS + Tailwind + shadcn | Identical to level-1 / level-2 — familiar |
| Backend (you build) | Hono on Node + better-sqlite3 | Same as level-2's reference — no new infra |
| Pipeline runtime | Claude Code (`.claude/` primitives) | The thing you're learning to engineer |

## You're done when

- `npm run dev` brings up frontend + your API together
- The todo app works end-to-end (add, toggle, delete, persists)
- All tests pass on `npm test`
- You can re-run your pipeline from a clean slate on a slightly different
  spec (e.g. adding a "priority" field) and watch it produce a clean
  delta — that's the real proof your pipeline is engineered, not staged
