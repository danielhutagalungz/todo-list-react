import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoModal from '../components/TodoModal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import { EyeIcon, TrashIcon } from '../components/Icons.jsx'

export default function TodoList({ todos, onAdd, onDelete }) {
  const navigate = useNavigate()
  const [showAdd, setShowAdd] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  return (
    <main className="page">
      <header className="page-header">
        <div className="brand">
          <span className="hanko" aria-hidden="true">侍</span>
          <div>
            <h1>Todo List</h1>
          </div>
        </div>
        <button className="btn btn-blue" onClick={() => setShowAdd(true)}>
          Tambah Todo
        </button>
      </header>

      <div className="table-wrap">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th className="col-action">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="cell-title" title={todo.title}>{todo.title}</td>
                <td><span className={`badge badge-${todo.status.replace(/\s+/g, '-')}`}>{todo.status}</span></td>
                <td><span className={`badge badge-${todo.priority}`}>{todo.priority}</span></td>
                <td>{todo.deadline}</td>
                <td className="col-action">
                  <div className="action-group">
                    <button
                      className="icon-btn icon-blue"
                      aria-label={`Lihat detail ${todo.title}`}
                      onClick={() => navigate(`/todo/${todo.id}`)}
                    >
                      <EyeIcon />
                    </button>
                    <button
                      className="icon-btn icon-red"
                      aria-label={`Hapus ${todo.title}`}
                      onClick={() => setToDelete(todo)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {todos.length === 0 && (
        <p className="empty">Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas pertama.</p>
      )}

      {showAdd && (
        <TodoModal
          mode="add"
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => {
            onAdd(data)
            setShowAdd(false)
          }}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Hapus Todo"
          message={`Yakin ingin menghapus "${toDelete.title}"? Tindakan ini tidak dapat dibatalkan.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            onDelete(toDelete.id)
            setToDelete(null)
          }}
        />
      )}
    </main>
  )
}