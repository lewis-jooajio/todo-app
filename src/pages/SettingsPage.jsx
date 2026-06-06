import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTodo } from '../context/TodoContext'
import useInput from '../hooks/useInput'

function SettingsPage() {
  const { user, updateNickname } = useAuth()
  const { refreshTodos } = useTodo()
  const [isEditing, setIsEditing] = useState(false)
  const [nickname, handleChange, resetNickname] = useInput(user?.nickname ?? '')
  const [error, setError] = useState('')

  async function handleSave() {
    if (nickname.trim() === '') return
    if (nickname.trim() === user.nickname) {
      setIsEditing(false)
      return
    }
    try {
      await updateNickname(nickname.trim())
      refreshTodos()
      setIsEditing(false)
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  function handleCancel() {
    resetNickname()
    setError('')
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') handleCancel()
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>설정</h2>

      <div style={{ marginTop: '1rem' }}>
        <span>닉네임</span>
        <div className="todo-input" style={{ marginTop: '0.5rem' }}>
          {isEditing ? (
            <>
              <input
                type="text"
                value={nickname}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                maxLength={20}
                autoFocus
                placeholder="새 닉네임 입력..."
              />
              <button onClick={handleSave}>저장</button>
              <button onClick={handleCancel}>취소</button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={user?.nickname ?? ''}
                readOnly
              />
              <button onClick={() => setIsEditing(true)}>닉네임 바꾸기</button>
            </>
          )}
        </div>
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/" style={{ color: 'var(--text-muted)' }}>← 홈으로 돌아가기</Link>
      </div>
    </div>
  )
}

export default SettingsPage
