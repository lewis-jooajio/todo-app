import { Routes, Route, Link } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import TodoDetailPage from './pages/TodoDetailPage'
import './App.css'

function App() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className={`app${isDark ? ' dark' : ''}`}>
      <h1>My Todo App</h1>

      <nav>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <button className="theme-btn" onClick={toggleTheme}>
          {isDark ? '라이트 모드' : '다크 모드'}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos/:id" element={<TodoDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
