# Level 3 — Agent Engineer

You stop **using** Claude Code and you start **engineering** it.

This level: you build **one Claude Code skill** that codifies a 3-step
development methodology, then you use that skill to ship the missing
todo backend.

The methodology your skill implements:

1. **Grill-Me** — interrogate the PRD, surface gaps, lock the spec
2. **TDD** — write the failing tests first, then the implementation
3. **Update Documentation** — keep the docs in sync with what shipped

That's the whole exercise. One skill, three steps, applied to a real
feature.

## Prerequisites

- Node ≥ 18
- Claude Code CLI installed and authenticated
- You've completed (or at least read) levels 1 and 2 — this level
  assumes you've seen slash commands and MCP before

## Quick start

```bash
git clone -b level-3 https://github.com/alex-hotton/learn-v2p.git level-3
cd level-3
npm install
npm run dev        # frontend on :5173 — you'll see a "Failed to list todos" error
```

The error is intentional: the frontend calls `/api/todos` and there's
no backend yet. That's what your skill will produce.

Then, in a separate terminal:

```bash
claude --dangerously-skip-permissions
```

…and start building your skill.

## What's in this branch

```
src/                ← frontend, already built (don't touch)
spec/
  prd.md            ← the PRD you'll feed your skill
.claude/skills/     ← (doesn't exist yet) your skill lives here
server/             ← (doesn't exist yet) what your skill produces
README.md           ← this file
```

Everything outside `src/` and `spec/` is yours to create — that's the
exercise.

## The exercise

1. **Build the skill** in `.claude/skills/<your-skill-name>/SKILL.md`.
   It encodes the 3-step methodology so it can be invoked on any
   feature, not just this one.
2. **Apply your skill to `spec/prd.md`** — Grill-Me first, then TDD
   per endpoint, then docs at the end.
3. **Verify**: `npm run dev` brings up frontend + API, the todo app
   works end-to-end, `npm test` passes, and the docs you updated match
   what shipped.

## The 3 steps your skill must implement

### 1. Grill-Me
Take a PRD (or feature description) as input. Interrogate it: what
edge cases are unspecified? What assumptions need confirming? Which
data shapes are ambiguous? Surface every gap to the user, get answers,
**lock the spec** before any code is written.

### 2. TDD
For each unit of work (one endpoint = one unit, roughly), write the
failing tests first and show them. Only then write the implementation
that makes them pass. Don't move to the next unit until the current
tests are green.

### 3. Update Documentation
Once the feature works, update the project docs so they reflect what
actually shipped. The form is your call — a `CHANGELOG.md`, an
`API.md`, the README, TSDoc on exported functions — but docs must not
lag the code.

## Tips

- **Read the frontend first.** `src/lib/api.ts` shows exactly what
  endpoints, methods, and JSON shapes the API must serve. That's the
  real contract — your skill's Grill-Me step should derive it from
  there.
- **The skill also has to bootstrap infra.** Only the frontend deps
  ship in this branch. Backend deps (`hono`, `better-sqlite3`, …), a
  test runner, the dev script wiring (`concurrently`) — all part of
  what your skill must handle. See `spec/prd.md`.
- **Build the skill incrementally.** Get Grill-Me working first, then
  add TDD, then Update Documentation. Don't try to write all 3 steps
  blind.
- **Test it on something else.** The proof that the skill is
  engineered (not staged) is that you can re-invoke it on a slightly
  different PRD — say, "add a `priority` field to todos" — and watch
  all 3 steps fire cleanly without manual hand-holding.

## You're done when

- `npm run dev` brings up frontend + your API together
- The todo app works end-to-end (add, toggle, delete, persists across
  reload)
- `npm test` passes
- A docs file you created (CHANGELOG, API doc, whichever you picked)
  reflects what shipped
- You can re-run your skill on a small new requirement and the 3 steps
  fire end-to-end

## Stack reference

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Vite + React + TS + Tailwind + shadcn | Identical to level-1 / level-2 — familiar |
| Backend (you build) | Hono on Node + better-sqlite3 | Same as level-2's reference — no new infra |
| Skill runtime | Claude Code (`.claude/skills/`) | The thing you're learning to engineer |

## Where to find the Claude Code skill docs

You'll be writing a Claude Code **skill** — the file format, the
frontmatter fields, and where `SKILL.md` lives are all documented:

- **Claude Code documentation**: <https://docs.claude.com/en/docs/claude-code>
- Look up **skills** specifically (folder structure, `SKILL.md`
  frontmatter, how skills get auto-loaded by Claude).

If the skill isn't behaving the way you expect, the docs are the first
stop — not the second.
