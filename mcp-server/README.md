# Exercise — Build a Todo MCP Server

This folder is where **you** build a Model Context Protocol server that
plugs into Claude Desktop and gives it the ability to manage the todos in
the local Todo app.

You won't write the code by hand. You'll use **Claude Code** to build it,
step by step. The whole point of this level is to learn how to equip Claude
with tools — and what better way than having Claude build those tools.

---

## Before you start

1. The Todo app must be running. From the **repo root**:

   ```bash
   npm install
   npm run dev
   ```

   You should be able to open <http://localhost:5173> and see the UI, and
   `curl http://localhost:3001/api/todos` should return JSON.

2. You have Claude Desktop installed: <https://claude.ai/download>

3. Install this folder's deps:

   ```bash
   cd mcp-server
   npm install
   ```

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

### How to do it

Open Claude Code **in this directory**:

```bash
cd mcp-server
claude --dangerously-skip-permissions
```

Then prompt it something like:

> Read README.md. Build step 1. Use `server.tool(...)` from the MCP
> TypeScript SDK. The Todo API is documented in the README — call it with
> `fetch`. Once you've added a tool, restart Claude Desktop so it picks up
> the change, and have me test it.

### How to connect to Claude Desktop

Add this to your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "todo": {
      "command": "npx",
      "args": [
        "tsx",
        "/absolute/path/to/learn-v2p/mcp-server/src/index.ts"
      ]
    }
  }
}
```

Replace `/absolute/path/to/learn-v2p` with the real path on your machine
(`pwd` from this folder, then strip the `mcp-server` suffix).

**Restart Claude Desktop after every change to the server code.** It only
re-reads the config and re-spawns the server on startup.

### Validating step 1

In a new Claude Desktop chat, ask:

> What's on my todo list?

Then:

> Add "ship the MCP server" to my todos.

If Claude can do both, step 1 is done. Now break the build, fix it, and
make sure you can iterate.

---

## Step 2 — A resource (HTML)

Now add an MCP **resource** that returns the todo list as **rendered HTML**
— something visual and styled, not plain text or JSON. The goal is that
when Claude Desktop displays this resource, it looks like a real little
dashboard, not a debug dump.

Some directions to think in (don't follow blindly, decide what works):

- A resource URI like `todo://list` returning `text/html`
- Inline CSS so it renders standalone (no external stylesheet)
- Use the same `GET /api/todos` endpoint to fetch the data, build the HTML
  on the fly
- Show counts, group done vs not done, make it look intentional

### How to do it

Same flow — back to Claude Code in this folder:

> Now build step 2 from the README. Add a `server.resource(...)` that
> returns HTML at `todo://list`. Make it look good — proper styling, clear
> hierarchy, not a bare `<ul>`.

Restart Claude Desktop, then in a chat reference the resource explicitly
(Claude Desktop has a "Add from MCP" affordance for resources).

### Validating step 2

You should be able to surface `todo://list` in a Claude Desktop chat and
see a clean, styled HTML rendering of your todos — not a JSON blob, not a
bullet list.

---

## You're done when

- Step 1 tools work end-to-end (list / add / toggle / delete from Claude
  Desktop)
- Step 2 resource renders an actual nice-looking HTML view of the todos
- You can explain to someone else what an MCP tool is vs an MCP resource
  and why this server has both

---

## Resources

- MCP TypeScript SDK: <https://github.com/modelcontextprotocol/typescript-sdk>
- MCP spec: <https://modelcontextprotocol.io/>
- The starter file you'll edit: [`src/index.ts`](src/index.ts)

## Stuck?

Ask Claude Code — that's the point of this level. Show it the error, show
it the README, ask it what's wrong. The exercise isn't to suffer alone,
it's to learn how to drive an AI agent to build real things.
