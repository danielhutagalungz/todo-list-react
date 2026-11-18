import { useEffect } from 'react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [toast]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!toast) return null
  return (
    <div key={toast.key} className={`toast toast-${toast.type}`} role="status">
      {toast.message}
    </div>
  )
}
