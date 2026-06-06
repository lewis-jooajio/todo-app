import { createContext, useContext, useReducer, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const TodoContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD':
      return [action.payload, ...state]
    case 'TOGGLE':
      return state.map(todo => todo.id === action.payload.id ? action.payload : todo)
    case 'EDIT':
      return state.map(todo => todo.id === action.payload.id ? action.payload : todo)
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload)
    default:
      return state
  }
}

function authHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, [])

  function refreshTodos() {
    fetch(`${API}/todos`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET', payload: data }))
  }

  useEffect(() => { refreshTodos() }, [])

  async function addTodo(text) {
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ text }),
    })
    const newTodo = await res.json()
    dispatch({ type: 'ADD', payload: newTodo })
  }

  async function toggleTodo(id) {
    const res = await fetch(`${API}/todos/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
    })
    const updated = await res.json()
    dispatch({ type: 'TOGGLE', payload: updated })
  }

  async function editTodo(id, text) {
    const res = await fetch(`${API}/todos/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ text }),
    })
    const updated = await res.json()
    dispatch({ type: 'EDIT', payload: updated })
  }

  async function deleteTodo(id) {
    await fetch(`${API}/todos/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    dispatch({ type: 'DELETE', payload: id })
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, editTodo, deleteTodo, refreshTodos }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo() {
  return useContext(TodoContext)
}
