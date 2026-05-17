import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { listTodos, createTodo, updateTodo, deleteTodo, type Todo } from "@/lib/api"
import { cn } from "@/lib/utils"

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    listTodos()
      .then(setTodos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    try {
      const todo = await createTodo(trimmed)
      setTodos((prev) => [todo, ...prev])
      setTitle("")
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function handleToggle(todo: Todo) {
    const updated = await updateTodo(todo.id, { done: !todo.done })
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)))
  }

  async function handleDelete(id: number) {
    await deleteTodo(id)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Todos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? "Loading…" : `${remaining} remaining`}
          </p>
        </header>

        <form onSubmit={handleCreate} className="flex gap-2 mb-6">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs doing?"
            autoFocus
          />
          <Button type="submit">Add</Button>
        </form>

        {error && (
          <div className="mb-4 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <ul className="space-y-1">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 hover:border-border hover:bg-accent/50"
            >
              <Checkbox
                checked={todo.done}
                onCheckedChange={() => handleToggle(todo)}
                aria-label={`Mark "${todo.title}" as ${todo.done ? "not done" : "done"}`}
              />
              <span
                className={cn(
                  "flex-1 text-sm",
                  todo.done && "line-through text-muted-foreground"
                )}
              >
                {todo.title}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
                onClick={() => handleDelete(todo.id)}
                aria-label={`Delete "${todo.title}"`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>

        {!loading && todos.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">
            Nothing here yet. Add your first todo above.
          </p>
        )}
      </div>
    </div>
  )
}
