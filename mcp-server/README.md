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

## Step 2 — MCP App (autonomous inline HTML)

Build an **MCP App**: a tool that returns `structuredContent` paired
with a `ui://` resource that serves a self-contained HTML bundle.
Claude renders this **inline in the chat**, not in a side-panel, and
calls it autonomously when the user asks something like "show me my
todos".

You don't have to invent the shape — there's an official Anthropic
template. Clone it for reference:

```
git clone --depth 1 https://github.com/modelcontextprotocol/ext-apps.git
```

Look at `examples/basic-server-vanillajs/`. That's the canonical layout.

### Pieces you'll write (mirrors the reference example)

| Piece | File | What it does |
|-------|------|--------------|
| App tool | `src/index.ts` | `server.registerTool("show_todo_list_html", {...})` with `_meta.ui.resourceUri = "ui://todo/list.html"`. Handler hits `GET /api/todos` and returns `structuredContent: { todos }` — that's the data the iframe consumes. |
| App resource | `src/index.ts` | `registerAppResource(server, "todo_app", "ui://todo/list.html", {...}, async () => readFile("dist-client/mcp-app.html"))` |
| HTML shell | `client/mcp-app.html` | Empty shell: `<div id="root">` + `<script src="src/mcp-app.ts">` + inline CSS |
| Client logic | `client/src/mcp-app.ts` | `new App({...})`, register `ontoolresult`, `app.connect()`, render todos into the DOM |
| Build | `vite.config.ts` | `vite-plugin-singlefile` to inline every JS/CSS asset into one HTML file |

### Validation

Restart Claude Desktop, then in a fresh chat:

> Show me my todos

Claude should:

1. Call `show_todo_list_html` **autonomously** (no attach step, no
   `/resources` browse)
2. Inline-render the styled HTML view directly under the tool call,
   with counts, the two sections (done / not done), and the current
   todo list

If the iframe is empty under the tool call, your client bundle isn't
self-contained — check that `vite-plugin-singlefile` is wired correctly
and compare against the reference example.

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
