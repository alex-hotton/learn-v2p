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

## Step 2 — MCP App (inline HTML)

Build an **MCP App**: Claude calls a tool, gets data back, and the
host renders a styled HTML view **inline in the chat** — not in a
side-panel. Claude should trigger it on its own when the user asks
something like "show me my todos".

You won't make this work without two things:

1. **The `create-mcp-app` skill** (official Anthropic):
   <https://github.com/modelcontextprotocol/ext-apps/tree/main/plugins/mcp-apps/skills/create-mcp-app>
2. **The `ext-apps` repo** as your reference:
   <https://github.com/modelcontextprotocol/ext-apps> — clone it and
   read `examples/basic-server-vanillajs/`. That's the canonical
   layout. The skill walks you through the wiring on top of it.

### Validation

Restart Claude Desktop, then in a fresh chat:

> Show me my todos

Claude should:

1. Call your MCP App tool **autonomously** (no attach, no manual browse)
2. Render the styled view **inline under the tool call**, with the
   current todos

If the inline view is blank, your bundle isn't self-contained — go
back to the reference example.

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
