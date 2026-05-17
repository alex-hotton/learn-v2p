export interface Todo {
  id: number
  title: string
  done: boolean
  created_at: string
}

const BASE = "/api/todos"

export async function listTodos(): Promise<Todo[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error("Failed to list todos")
  return res.json()
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  })
  if (!res.ok) throw new Error("Failed to create todo")
  return res.json()
}

export async function updateTodo(id: number, patch: Partial<Pick<Todo, "title" | "done">>): Promise<Todo> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw new Error("Failed to update todo")
  return res.json()
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete todo")
}
