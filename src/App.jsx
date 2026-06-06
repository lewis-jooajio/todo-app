import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import { useAuth } from './context/AuthContext'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import TodoDetailPage from './pages/TodoDetailPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {
  const { isDark } = useTheme()
  const { user, login, logout } = useAuth()
  const [needNickname, setNeedNickname] = useState(false)
  const [authReady, setAuthReady] = useState(false)

  // authReady가 false일 때마다 로그인 흐름 실행 (시작 시 + 로그아웃 후)
  useEffect(() => {
    if (authReady) return
    if (user) {
      setAuthReady(true)
      return
    }
    login().then(({ needNickname }) => {
      setNeedNickname(needNickname)
      setAuthReady(true)
    })
  }, [authReady])

  if (!authReady) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>로딩 중...</div>

  if (needNickname) {
    return (
      <div className={`app${isDark ? ' dark' : ''}`}>
        <LoginPage onLogin={() => setNeedNickname(false)} />
      </div>
    )
  }

  return (
    <div className={`app${isDark ? ' dark' : ''}`}>
      <h1>Family Checklist</h1>

      <nav>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <Link to="/settings">설정</Link>
        {user && (
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {user.nickname}님
          </span>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos/:id" element={<TodoDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
