import useInput from '../hooks/useInput'

function TodoInput({ onAdd }) {
  const [text, handleChange, reset] = useInput('')

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === '') return
    onAdd(text.trim())
    reset()
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="할 일을 입력하세요..."
      />
      <button type="submit">추가</button>
    </form>
  )
}

export default TodoInput
