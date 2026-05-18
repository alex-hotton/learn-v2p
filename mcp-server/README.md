# Technical spec — Todo MCP Server

This is the **what to build**. For the **how** (workflow, skills,
setup), see the level-2 root README.

The folder is empty on purpose. You init the project here, install
deps, write the code. Recommended stack: **TypeScript + the official
MCP SDK** (`@modelcontextprotocol/sdk`).

---

## Step 1 — MCP Tools

Expose MCP tools that wrap the Todo app's HTTP API at
`http://localhost:3001/api/todos`. At minimum:

- List all todos
- Add a new todo
- Toggle a todo done / not done
- Delete a todo

**Hard constraint:** the MCP server **must not** read SQLite directly.
It goes through the HTTP API like any other client. That's the whole
point of the separation.

### API reference (already running for you)

| Method | Path | Body |
|--------|------|------|
| `GET` | `/api/todos` | — |
| `POST` | `/api/todos` | `{ "title": "..." }` |
| `PATCH` | `/api/todos/:id` | `{ "title"?: "...", "done"?: true }` |
| `DELETE` | `/api/todos/:id` | — |

### Validation

Restart Claude Desktop (it only re-reads MCP config on startup), then
in a fresh chat:

> What's on my todo list?

Then:

> Add "ship the MCP server" to my todos.

If both work end-to-end (your MCP server → local HTTP API → SQLite),
step 1 is done.

---

## Step 2 — MCP Resource (HTML)

Expose an MCP **resource** that returns the todo list as styled HTML.

Heads-up on rendering: Claude Desktop surfaces MCP resources as
side-panel / attachment-style previews, not as a full embedded webpage.
Aim for **clean, readable, well-styled HTML** that holds up in that
context — think "well-designed document page", not "interactive
dashboard".

Suggested shape (decide what works for you):

- Resource URI: `todo://list` returning `text/html`
- Inline CSS (no external stylesheet)
- Same `GET /api/todos` endpoint for data, build HTML on the fly
- Counts, group done vs not done, make it look intentional

### Validation

Surface `todo://list` in a Claude Desktop chat. You should see a
clean, styled HTML rendering — not a JSON blob, not a bullet list.

---

## Connecting your server to Claude Desktop

Config file path:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Add a `mcpServers.todo` entry. The exact `command` and `args` depend
on how you built the server (compiled JS via `node dist/...`, source
via `tsx`, etc.) — the `tdd` skill can generate the right config block
once it knows your setup.

**Restart Claude Desktop after every change to your server code.** It
only re-reads the config and re-spawns the MCP subprocess on startup.

---

## References

- MCP TypeScript SDK: <https://github.com/modelcontextprotocol/typescript-sdk>
- MCP spec: <https://modelcontextprotocol.io/>
