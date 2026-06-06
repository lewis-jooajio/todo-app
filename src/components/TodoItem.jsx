import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useInput from '../hooks/useInput'
import { formatDate } from '../utils/formatDate'

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const { user } = useAuth()
  const isOwner = user && todo.user_id === user.id
  const [isEditing, setIsEditing] = useState(false)
  const [editText, handleEditChange, resetEdit] = useInput(todo.text)

  function handleSave() {
    if (editText.trim() === '') return
    onEdit(todo.id, editText)
    setIsEditing(false)
  }

  function handleCancel() {
    resetEdit()
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') handleCancel()
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => isOwner && onToggle(todo.id)}
        disabled={!isOwner}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleCancel}>취소</button>
        </>
      ) : (
        <>
          <div className="todo-main">
            <Link to={`/todos/${todo.id}`}>{todo.text}</Link>
            {isOwner && (
              <div className="todo-actions">
                <button onClick={() => setIsEditing(true)}>수정</button>
                <button onClick={() => { if (window.confirm('정말로 삭제하시겠습니까?')) onDelete(todo.id) }}>삭제</button>
              </div>
            )}
          </div>
          <span className="todo-author">{todo.author}</span>
          <span className="todo-date">{formatDate(todo.created_at)}</span>
        </>
      )}
    </li>
  )
}

export default TodoItem
