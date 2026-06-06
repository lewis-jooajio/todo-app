import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function LoginPage({ onLogin }) {
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    if (nickname.trim() === '') return
    try {
      await login(nickname.trim())
      onLogin()
    } catch {
      setError('오류가 발생했어요. 다시 시도해주세요.')
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>안녕하세요!</h2>
      <p>사용할 닉네임을 입력해주세요</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="닉네임 입력..."
          maxLength={20}
          autoFocus
          style={{ padding: '0.5rem 1rem', fontSize: '1.1rem' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '0.5rem 2rem' }}>시작하기</button>
      </form>
    </div>
  )
}

export default LoginPage
