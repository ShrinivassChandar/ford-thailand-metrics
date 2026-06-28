import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import UploadZone from '../components/UploadZone'
import FileCard from '../components/FileCard'
import FilterBar from '../components/FilterBar'
import EmptyState from '../components/EmptyState'
import PreviewModal from '../components/PreviewModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import Toast from '../components/Toast'
import { useFiles } from '../hooks/useFiles'
import { CATEGORIES } from '../components/CategoryCard'

const SLUG_LABELS = {
  backorder: 'Back Order',
  overdue:   'Over Due',
  fillrate:  'Fill Rate',
  inventory: 'Inventory',
}

let toastId = 0
function makeToast(type, message) {
  return { id: ++toastId, type, message }
}

export default function CategoryPage() {
  const { slug } = useParams()
  const category = SLUG_LABELS[slug] ? slug : 'backorder'
  const { files, uploadFile, deleteFile } = useFiles(category)

  const [toasts, setToasts] = useState([])
  const [previewFile, setPreviewFile] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [filters, setFilters] = useState({ search: '', sort: 'newest', type: 'all', dateFrom: '', dateTo: '' })

  const addToast = (type, message) => setToasts(prev => [...prev, makeToast(type, message)])
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id))

  const handleUpload = async (file, uploaderName, errorCode) => {
    if (errorCode === 'TYPE_ERROR') {
      addToast('error', 'Only .csv, .xlsx, and .xls files are supported.')
      return
    }
    if (errorCode === 'SIZE_ERROR') {
      addToast('error', 'File too large. Maximum size is 50MB.')
      return
    }
    try {
      const result = await uploadFile(file, uploaderName)
      if (result.wasDuplicate) {
        addToast('warning', `Duplicate name detected. Saved as "${result.finalName}" to avoid overwriting.`)
      } else {
        addToast('success', `"${result.finalName}" uploaded successfully!`)
      }
    } catch {
      addToast('error', 'Upload failed. Please try again.')
    }
  }

  const handleConfirmDelete = async (file) => {
    setDeleteTarget(null)
    try {
      await deleteFile(file.id, file.storage_path)
      addToast('success', `"${file.file_name}" deleted.`)
    } catch {
      addToast('error', 'Delete failed. Please try again.')
    }
  }

  const filteredFiles = useMemo(() => {
    let result = [...files]
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(f => f.file_name.toLowerCase().includes(q))
    }
    if (filters.type !== 'all') {
      result = result.filter(f => f.file_type === filters.type)
    }
    if (filters.dateFrom) {
      result = result.filter(f => new Date(f.created_at) >= new Date(filters.dateFrom))
    }
    if (filters.dateTo) {
      result = result.filter(f => new Date(f.created_at) <= new Date(filters.dateTo + 'T23:59:59'))
    }
    switch (filters.sort) {
      case 'oldest':   result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); break
      case 'az':       result.sort((a, b) => a.file_name.localeCompare(b.file_name)); break
      case 'za':       result.sort((a, b) => b.file_name.localeCompare(a.file_name)); break
      case 'largest':  result.sort((a, b) => b.file_size - a.file_size); break
      case 'smallest': result.sort((a, b) => a.file_size - b.file_size); break
      default:         result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    return result
  }, [files, filters])

  const categoryName = SLUG_LABELS[slug] || 'Category'
  const catMeta = CATEGORIES[slug]

  return (
    <div className="min-h-screen" style={{ background: '#081420' }}>
      <Navbar categoryName={categoryName} categorySlug={slug} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category header */}
        <div className="mb-8 flex items-center gap-4">
          <div>
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '28px',
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {categoryName}
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '13px',
              color: '#BFC8D4',
              marginTop: '4px',
              marginBottom: 0,
            }}>
              {files.length} {files.length === 1 ? 'file' : 'files'}
            </p>
          </div>
        </div>

        {/* Upload zone */}
        <UploadZone onUpload={handleUpload} />

        {/* Filter bar */}
        {files.length > 0 && (
          <FilterBar filters={filters} onChange={setFilters} />
        )}

        {/* Files grid — show immediately, no loading state */}
        {filteredFiles.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
            }}
          >
            <AnimatePresence>
              {filteredFiles.map(file => (
                <FileCard
                  key={file.id}
                  file={file}
                  onPreview={setPreviewFile}
                  onDelete={setDeleteTarget}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      <DeleteConfirmModal file={deleteTarget} onConfirm={handleConfirmDelete} onCancel={() => setDeleteTarget(null)} />
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
