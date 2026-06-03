import { useState, useEffect } from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function HomePage() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch(`${API}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  async function addTodo(text) {
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    const newTodo = await res.json()
    setTodos([...todos, newTodo])
  }

  async function toggleTodo(id) {
    const res = await fetch(`${API}/todos/${id}`, { method: 'PUT' })
    const updated = await res.json()
    setTodos(todos.map(todo => todo.id === id ? updated : todo))
  }

  async function deleteTodo(id) {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <p className="page-title">My Todos</p>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default HomePage
