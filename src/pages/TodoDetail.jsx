import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TodoModal from '../components/TodoModal.jsx'

export default function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showEdit, setShowEdit] = useState(false)

  const todo = todos.find((t) => String(t.id) === id)

  if (!todo) {
    return (
      <main className="detail-wrap">
        <section className="detail-card not-found">
          <h2>Tugas tidak ditemukan</h2>
          <p>Tugas yang kamu cari mungkin sudah dihapus.</p>
          <button className="btn btn-red" onClick={() => navigate('/')}>Kembali</button>
        </section>
      </main>
    )
  }

  return (
    <main className="detail-wrap">
      <section className="detail-card">
        <div className="detail-left">
          <h3 className="label">Judul</h3>
          <p className="value">{todo.title}</p>
          <h3 className="label">Deskripsi</h3>
          <div className="desc-box">{todo.description || '-'}</div>
        </div>

        <div className="detail-right">
          <h3 className="label">Status</h3>
          <p className="value">{todo.status}</p>
          <h3 className="label">Prioritas</h3>
          <p className="value">{todo.priority}</p>
          <h3 className="label">Deadline</h3>
          <p className="value">{todo.deadline}</p>
          <div className="detail-actions">
            <button className="btn btn-red" onClick={() => navigate('/')}>Kembali</button>
            <button className="btn btn-blue" onClick={() => setShowEdit(true)}>Update</button>
          </div>
        </div>
      </section>

      {showEdit && (
        <TodoModal
          mode="edit"
          initial={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => {
            onUpdate(todo.id, data)
            setShowEdit(false)
          }}
        />
      )}
    </main>
  )
}
