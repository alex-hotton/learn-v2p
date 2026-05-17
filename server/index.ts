import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { db, rowToTodo, type TodoRow } from "./db"

const app = new Hono()

app.use("/api/*", cors())

app.get("/api/todos", (c) => {
  const rows = db.prepare("SELECT * FROM todos ORDER BY done ASC, id DESC").all() as TodoRow[]
  return c.json(rows.map(rowToTodo))
})

app.post("/api/todos", async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const title = typeof body.title === "string" ? body.title.trim() : ""
  if (!title) return c.json({ error: "title is required" }, 400)

  const result = db.prepare("INSERT INTO todos (title) VALUES (?)").run(title)
  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(result.lastInsertRowid) as TodoRow
  return c.json(rowToTodo(row), 201)
})

app.patch("/api/todos/:id", async (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isInteger(id)) return c.json({ error: "invalid id" }, 400)

  const existing = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined
  if (!existing) return c.json({ error: "not found" }, 404)

  const body = await c.req.json().catch(() => ({}))
  const fields: string[] = []
  const values: (string | number)[] = []

  if (typeof body.title === "string" && body.title.trim()) {
    fields.push("title = ?")
    values.push(body.title.trim())
  }
  if (typeof body.done === "boolean") {
    fields.push("done = ?")
    values.push(body.done ? 1 : 0)
  }

  if (fields.length === 0) return c.json(rowToTodo(existing))

  values.push(id)
  db.prepare(`UPDATE todos SET ${fields.join(", ")} WHERE id = ?`).run(...values)
  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow
  return c.json(rowToTodo(row))
})

app.delete("/api/todos/:id", (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isInteger(id)) return c.json({ error: "invalid id" }, 400)

  const result = db.prepare("DELETE FROM todos WHERE id = ?").run(id)
  if (result.changes === 0) return c.json({ error: "not found" }, 404)
  return c.body(null, 204)
})

const port = Number(process.env.PORT ?? 3001)
serve({ fetch: app.fetch, port }, ({ port }) => {
  console.log(`Todo API listening on http://localhost:${port}`)
})
