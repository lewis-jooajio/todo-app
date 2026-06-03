import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function TodoDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [todo, setTodo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/todos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('할 일을 찾을 수 없습니다.')
        return res.json()
      })
      .then(data => setTodo(data))
      .catch(err => setError(err.message))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return
    const res = await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
    if (res.ok) {
      navigate('/')
    }
  }

  if (error) return <p>{error}</p>
  if (!todo) return <p>불러오는 중...</p>

  return (
    <div className="detail-page">
      <h2>할 일 상세</h2>
      <div className="detail-card">
        <p>
          <strong>내용</strong>
          {todo.text}
        </p>
        <p>
          <strong>상태</strong>
          {todo.completed ? '완료' : '미완료'}
        </p>
        <p>
          <strong>ID</strong>
          {todo.id}
        </p>
      </div>
      <div className="detail-actions">
        <Link className="btn-back" to="/">← 목록으로 돌아가기</Link>
        <button className="btn-delete" onClick={handleDelete}>삭제</button>
      </div>
    </div>
  )
}

export default TodoDetailPage
