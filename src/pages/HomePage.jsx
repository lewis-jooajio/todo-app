import { useTodo } from '../context/TodoContext'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'

function HomePage() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodo()

  return (
    <div>
      <p className="page-title">My Todos</p>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default HomePage
