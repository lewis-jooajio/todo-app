import { createContext, useContext, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const AuthContext = createContext()

function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem('device_id')
  if (!deviceId) {
    // crypto.randomUUID()는 모던 브라우저에서 기본 지원
    deviceId = crypto.randomUUID()
    localStorage.setItem('device_id', deviceId)
  }
  return deviceId
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  // 기기 ID로 자동 로그인 시도, 신규 기기면 needNickname: true 반환
  async function login(nickname = null) {
    const device_id = getOrCreateDeviceId()
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id, nickname }),
    })
    const data = await res.json()

    if (res.status === 404) return { needNickname: true }
    if (!res.ok) throw new Error(data.error)

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
    return { needNickname: false }
  }

  async function updateNickname(nickname) {
    const res = await fetch(`${API}/auth/nickname`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ nickname }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  function getToken() {
    return localStorage.getItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken, updateNickname }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
