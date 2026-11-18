import { useEffect, useState } from 'react'
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../data/dummyTodos.js'

const EMPTY = { title: '', description: '', status: 'to-do', priority: 'low', deadline: '' }

// mode: 'add' | 'edit'
export default function TodoModal({ mode = 'add', initial, onSubmit, onClose }) {
  const [form, setForm] = useState(() =>
    initial
      ? {
          title: initial.title,
          description: initial.description,
          status: initial.status,
          priority: initial.priority,
          deadline: initial.deadline,
        }
      : EMPTY
  )
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.title.trim()) next.title = 'Judul wajib diisi'
    if (!form.deadline) next.deadline = 'Deadline wajib diisi'
    if (Object.keys(next).length) return setErrors(next)

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    })
  }

  const heading = mode === 'add' ? 'Tambah Todo' : 'Update Todo'
  const submitLabel = mode === 'add' ? 'Tambah' : 'Update'

  return (
    <div className="overlay" onClick={onClose}>
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 id="modal-title" className="modal-title">{heading}</h2>

        <label className="field">
          <span className="label">Judul</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={errors.title ? 'input input-error' : 'input'}
            autoFocus
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </label>

        <label className="field">
          <span className="label">Deskripsi</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="input textarea"
            rows={3}
          />
        </label>

        <div className="row">
          <label className="field">
            <span className="label">Status</span>
            <select name="status" value={form.status} onChange={handleChange} className="input">
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="label">Prioritas</span>
            <select name="priority" value={form.priority} onChange={handleChange} className="input">
              {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
        </div>

        <label className="field">
          <span className="label">Deadline</span>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className={errors.deadline ? 'input input-error' : 'input'}
          />
          {errors.deadline && <span className="error-text">{errors.deadline}</span>}
        </label>

        <div className="form-actions">
          <button type="button" className="btn btn-red" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-blue">{submitLabel}</button>
        </div>
      </form>
    </div>
  )
}
