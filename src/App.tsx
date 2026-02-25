import { useEffect, useState } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => res.json())
      .then((data: Todo[]) => {
        setTodos(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const toggleTodo = (id: number) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  if (loading) {
    return (
      <main data-testid="app">
        <h1>QA Workshop</h1>
        <p data-testid="loading">Loading...</p>
      </main>
    )
  }

  return (
    <main data-testid="app">
      <h1>QA Workshop</h1>
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span>{todo.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
