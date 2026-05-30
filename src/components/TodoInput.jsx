import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === '') return
    onAdd(text.trim())
    setText('')
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="할 일을 입력하세요..."
      />
      <button type="submit">추가</button>
    </form>
  )
}

export default TodoInput
