# Exercise — Build a Todo MCP Server

This folder is **empty on purpose**. You're going to build a Model Context
Protocol server here from scratch that plugs into Claude Desktop and gives
it the ability to manage the todos in the local Todo app.

You won't write the code by hand. You'll use **Claude Code** to build it,
step by step. The whole point of this level is to learn how to equip
Claude with tools — and what better way than having Claude build them.

You decide the stack inside this folder (the recommendation: **TypeScript
with the official MCP SDK** — `@modelcontextprotocol/sdk`). You init the
project, install the deps, write the code, configure the build.

---

## Before you start

1. The Todo app must be running. From the **repo root**:

   ```bash
   npm install
   npm run dev
   ```

   You should be able to open <http://localhost:5173> and see the UI, and
   `curl http://localhost:3001/api/todos` should return JSON.

2. Install Claude Desktop: <https://claude.ai/download>

3. Open Claude Code **in this folder**:

   ```bash
   cd mcp-server
   claude --dangerously-skip-permissions
   ```

   Everything you do, you do through Claude Code. This is the level where
   you stop typing code and start driving the agent.

---

## Step 1 — Tools (text)

Teach Claude Desktop to **manage the todos** by exposing MCP **tools** that
call the Todo app's HTTP API at `http://localhost:3001/api/todos`.

You decide the exact tool names and shapes, but at minimum Claude should be
able to:

- See what's on the todo list
- Add a new todo
- Toggle a todo done / not done
- Delete a todo

**Constraint:** the MCP server **must not** read SQLite directly. It goes
through the HTTP API like any other client. That's the whole point of the
separation.

**API reference** (already running for you):

| Method | Path | Body |
|--------|------|------|
| `GET` | `/api/todos` | — |
| `POST` | `/api/todos` | `{ "title": "..." }` |
| `PATCH` | `/api/todos/:id` | `{ "title"?: "...", "done"?: true }` |
| `DELETE` | `/api/todos/:id` | — |

### Suggested prompt to Claude Code

> Read README.md. We're at step 1. I have nothing in this folder yet.
> Init a TypeScript project that builds an MCP server using
> `@modelcontextprotocol/sdk`. Expose tools that wrap the Todo HTTP API
> documented in the README. Then walk me through connecting it to Claude
> Desktop so I can test it.

### Connecting to Claude Desktop

Once your server runs, add it to your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

The exact `command` and `args` depend on how you built it (compiled JS,
`tsx`, `node --import tsx`, etc.) — Claude Code can generate the right
config block for you once it knows your setup.

**Restart Claude Desktop after every change to the server.** It only
re-reads the config and re-spawns the server on startup.

### Validating step 1

In a new Claude Desktop chat, ask:

> What's on my todo list?

Then:

> Add "ship the MCP server" to my todos.

If Claude can do both end-to-end (through your server, hitting the local
API, mutating the SQLite DB), step 1 is done.

---

## Step 2 — A resource (HTML)

Now add an MCP **resource** that returns the todo list as **styled HTML**
— something visual and structured, not plain text or JSON.

A heads-up on what to expect: Claude Desktop surfaces MCP resources as
side-panel / attachment-style previews, not as a full embedded webpage.
Aim for **clean, readable, well-styled HTML** that holds up in that
context — not an interactive dashboard. Think "well-designed page of a
document", not "single-page application".

Some directions to think in (don't follow blindly, decide what works):

- A resource URI like `todo://list` returning `text/html`
- Inline CSS so it renders standalone (no external stylesheet)
- Use the same `GET /api/todos` endpoint to fetch the data, build the HTML
  on the fly
- Show counts, group done vs not done, make it look intentional

### Suggested prompt to Claude Code

> Step 2 from the README. Add an MCP resource at `todo://list` that
> returns styled HTML showing the todos. Inline CSS. Make it look like a
> well-designed document page (Claude Desktop renders resources as
> side-panel previews, not a full webpage). Tell me when to restart
> Claude Desktop.

### Validating step 2

You should be able to surface `todo://list` in a Claude Desktop chat and
see a clean, styled HTML rendering of your todos — not a JSON blob, not a
bullet list.

---

## You're done when

- Step 1 tools work end-to-end (list / add / toggle / delete from Claude
  Desktop, going through your server → local API → SQLite)
- Step 2 resource renders an actual nice-looking HTML view of the todos
- You can explain to someone else what an MCP tool is vs an MCP resource
  and why this server has both

---

## Resources

- MCP TypeScript SDK: <https://github.com/modelcontextprotocol/typescript-sdk>
- MCP spec: <https://modelcontextprotocol.io/>

## Stuck?

Ask Claude Code — that's the whole point of this level. Show it the
error, show it the README, ask it what's wrong. The exercise isn't to
suffer alone, it's to learn how to drive an AI agent to build real things.
