# Level 2.2 — Equipped Vibecoder (subagents + hooks)

Same idea as level 2.1 — you keep **equipping** Claude — but with two
new primitives this time: **subagents** and **hooks**. Skills told
Claude *how* to think about a task. Hooks let Claude Code automate
side-effects around tool calls and lifecycle events. Subagents let it
delegate focused work to an isolated Claude instance with its own
context.

In this level you'll build an **automatic CHANGELOG**: every commit
gets a new entry written for you, and the session refuses to end if a
commit slipped through without one.

Progression note: level-1 = a slash command, level-2.1 = existing
skills, **here** = subagents + hooks, level-3 = build your own skill.

## Prerequisites

- Node ≥ 18, git, two terminal tabs
- Claude Code CLI installed and authenticated

## Quick start

### 1. Run the todo app

```bash
git clone -b level-2.2 https://github.com/alex-hotton/learn-v2p.git level-2.2
cd level-2.2
npm install
npm run dev
```

This brings up the same todo app you saw in 2.1 — frontend on
:5173, API on :3001. It's just here to give you something to change
and commit.

### 2. Open Claude Code

In a second terminal, from the same `level-2.2/` directory:

```bash
claude --dangerously-skip-permissions
```

You'll create everything else from here — no skills to install, no
external repos to clone.

## What's in this branch

```
src/              Todo app frontend (don't touch unless you want a change to commit)
server/           Todo app backend
.claude/          ← doesn't exist yet — you'll create it
  agents/         ←   one subagent: the changelog writer
  settings.json   ←   two hooks: PostToolUse + Stop
CHANGELOG.md      ← doesn't exist yet — your automation creates it
README.md         this file
```

## The exercise

Build **one subagent** and **two hooks** that together give the repo
an automatic, enforced changelog.

### The subagent — `changelog-writer`

Lives in `.claude/agents/changelog-writer.md`. Given a commit (SHA or
"the latest commit"), it:

1. Runs `git show` to inspect what changed
2. Drafts a structured CHANGELOG entry (date, one-line summary, the
   change category — feat / fix / refactor / docs / chore)
3. Appends it to `CHANGELOG.md`, creating the file if missing

Tools it needs: enough to read code and run git. Nothing destructive
beyond appending to the changelog file.

### Hook 1 — `PostToolUse` (the trigger)

Fires after `Bash` tool calls that match `git commit`. On success,
invokes the `changelog-writer` subagent on the commit that just
landed.

This is the *automation* — without it, the subagent would have to be
invoked by hand every time.

### Hook 2 — `Stop` (the gate)

Fires when Claude tries to end the session. Checks that every commit
made in the current session has a corresponding `CHANGELOG.md` entry.
If any is missing, the hook **blocks the stop** (exit code 2) and
tells Claude to fix it — Claude then invokes the subagent on the
missing commits and tries to stop again.

This is the *enforcement* — without it, Claude could end the session
mid-way and leave the changelog incomplete.

### Validate

1. Make any change to the todo app (rename a button, add a console
   log — whatever). Commit it through Claude.
2. Confirm `CHANGELOG.md` got a new entry **without you asking for
   it**.
3. Make a second commit, then ask Claude to end the session before
   the changelog catches up. Confirm the Stop hook fires and Claude
   has to add the missing entry.

## You're done when

- A commit through Claude automatically produces a `CHANGELOG.md`
  entry (no manual prompt needed)
- Attempting to end the session with an un-changelogged commit blocks
  and forces Claude to fix it
- You can articulate the split: **hook = deterministic trigger /
  gate**, **subagent = isolated reasoning** — and why this exercise
  needs both

## References

- Claude Code **hooks** guide:
  <https://claudefa.st/blog/tools/hooks/hooks-guide>
- Claude Code **subagents** blog post:
  <https://claude.com/blog/subagents-in-claude-code>
- Claude Code docs index (where `.claude/agents/` format and
  `.claude/settings.json` schema are defined):
  <https://docs.claude.com/en/docs/claude-code>

## Troubleshooting

- **The hook doesn't fire on commit**: check the matcher in
  `.claude/settings.json` — `PostToolUse` matches on tool name + an
  optional regex over the tool input.
- **The subagent never gets called**: a hook can only *invoke* a
  subagent if Claude is involved (most hooks just run shell). The
  cleanest pattern is for the hook to inject a system message into
  the next turn telling Claude to invoke the subagent.
- **`Stop` hook loops forever**: your check returns "missing" even
  after Claude added the entry. Re-read the JSON your hook is
  outputting, and confirm the matching logic against
  `CHANGELOG.md` is right.

## Next level

[`level-3`](../../tree/level-3) — **Agent Engineer.** Stop *using*
primitives others wrote (or that you wired up here), and build your
own skill from scratch.
