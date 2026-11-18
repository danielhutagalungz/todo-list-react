import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import TodoList from './pages/TodoList.jsx'
import TodoDetail from './pages/TodoDetail.jsx'
import Toast from './components/Toast.jsx'
import { dummyTodos } from './data/dummyTodos.js'

export default function App() {
  const [todos, setTodos] = useState(dummyTodos)
  const [toast, setToast] = useState(null)

  const notify = (message, type = 'success') =>
    setToast({ message, type, key: Date.now() })

  const addTodo = (data) => {
    setTodos((prev) => {
      const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1
      return [...prev, { id: nextId, ...data }]
    })
    notify('Todo berhasil ditambahkan')
  }

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
    notify('Todo berhasil diperbarui')
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    notify('Todo berhasil dihapus')
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} />}
        />
        <Route
          path="/todo/:id"
          element={<TodoDetail todos={todos} onUpdate={updateTodo} />}
        />
        <Route path="*" element={<TodoDetail todos={[]} onUpdate={() => {}} />} />
      </Routes>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  )
}
