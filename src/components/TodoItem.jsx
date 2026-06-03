import { Link } from 'react-router-dom'

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <Link to={`/todos/${todo.id}`}>{todo.text}</Link>
      <button onClick={() => { if (window.confirm('정말로 삭제하시겠습니까?')) onDelete(todo.id) }}>삭제</button>
    </li>
  )
}

export default TodoItem
