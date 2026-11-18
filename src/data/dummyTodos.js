// Struktur data sama dengan atribut pada REST API:
// id, title, description, priority, deadline, status
export const STATUS_OPTIONS = ['to-do', 'in progress', 'done']
export const PRIORITY_OPTIONS = ['low', 'medium', 'high']

export const dummyTodos = [
  {
    id: 1,
    title: 'Mengerjakan Proyek Computer Vision',
    description:
      'Menyelesaikan proyek akhir computer vision tentang deteksi penggunaan helm',
    priority: 'high',
    deadline: '2026-10-11',
    status: 'in progress',
  },
  {
    id: 2,
    title: 'Mempelajari Dasar Zustand',
    description:
      'Memahami cara membuat store, membaca state, dan memperbarui state dengan Zustand.',
    priority: 'low',
    deadline: '2026-11-25',
    status: 'in progress',
  },
  {
    id: 3,
    title: 'Membuat Website Portfolio',
    description:
      'Membuat website portfolio pribadi yang berisi profil, proyek, dan kontak.',
    priority: 'low',
    deadline: '2026-10-20',
    status: 'in progress',
  },
  {
    id: 4,
    title: 'Mempelajari React Hooks',
    description:
      'Mempelajari useState, useEffect, useRef, dan membuat custom hook sederhana.',
    priority: 'low',
    deadline: '2026-10-11',
    status: 'to-do',
  },
]
