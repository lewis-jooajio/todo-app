import { useReducer } from 'react'

// 1. reducer: (현재 상태, action) => 새 상태
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    default:
      return state
  }
}

// 2. 초기 상태
const initialState = { count: 0 }

function CounterPage() {
  // 3. useReducer 사용
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>useReducer 카운터</h2>
      <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>{state.count}</p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {/* 4. dispatch로 action 전송 */}
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>리셋</button>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'left', display: 'inline-block' }}>
        <h3>동작 흐름</h3>
        <p>버튼 클릭 → dispatch 호출 → reducer 실행 → 새 state → 리렌더링</p>
      </div>
    </div>
  )
}

export default CounterPage
