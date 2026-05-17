import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

// This is your starting point. The server runs and connects, but exposes
// nothing yet — no tools, no resources. Your job is to add them.
//
// Read README.md for the exercise spec. Don't write code by hand — open
// Claude Code in this directory and have it build it with you.

const server = new McpServer({
  name: "todo-mcp",
  version: "0.0.0",
})

// Step 1 — add tools here (server.tool(...))
// Step 2 — add a resource here (server.resource(...))

const transport = new StdioServerTransport()
await server.connect(transport)
