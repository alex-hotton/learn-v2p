import Database from "better-sqlite3"
import { mkdirSync } from "node:fs"
import { dirname } from "node:path"

const DB_PATH = process.env.TODO_DB_PATH ?? "./data/todos.db"

mkdirSync(dirname(DB_PATH), { recursive: true })

export const db = new Database(DB_PATH)
db.pragma("journal_mode = WAL")

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`)

const count = (db.prepare("SELECT COUNT(*) as n FROM todos").get() as { n: number }).n
if (count === 0) {
  const insert = db.prepare("INSERT INTO todos (title, done) VALUES (?, ?)")
  insert.run("Run the todo app", 1)
  insert.run("Read mcp-server/README.md", 0)
  insert.run("Build the MCP server", 0)
}

export interface TodoRow {
  id: number
  title: string
  done: number
  created_at: string
}

export interface Todo {
  id: number
  title: string
  done: boolean
  created_at: string
}

export function rowToTodo(row: TodoRow): Todo {
  return { ...row, done: row.done === 1 }
}
