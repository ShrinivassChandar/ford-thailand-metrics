import { useState } from 'react'
import { motion } from 'framer-motion'

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function FileCard({ file, onPreview, onDelete }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const displayName = file.file_name.length > 30
    ? file.file_name.slice(0, 30) + '…'
    : file.file_name

  const isCSV = file.file_type === 'CSV'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-2xl p-5 flex flex-col gap-3 border transition-all duration-200 hover:border-white/20 group"
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* File type badge + name */}
      <div className="flex items-start gap-3">
        <div
          className="text-xs font-condensed font-bold px-2.5 py-1 rounded-lg shrink-0 tracking-wider"
          style={{
            background: isCSV ? 'rgba(74,255,158,0.15)' : 'rgba(74,158,255,0.15)',
            color: isCSV ? '#4aff9e' : '#4a9eff',
            border: `1px solid ${isCSV ? 'rgba(74,255,158,0.3)' : 'rgba(74,158,255,0.3)'}`,
          }}
        >
          {file.file_type}
        </div>
        <div className="flex-1 min-w-0 relative">
          <p
            className="font-body font-medium text-white text-sm leading-tight cursor-default"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {displayName}
          </p>
          {showTooltip && file.file_name.length > 30 && (
            <div
              className="absolute bottom-full left-0 mb-1 px-3 py-1.5 rounded-lg text-xs font-body text-white z-10 whitespace-nowrap"
              style={{ background: 'rgba(0,13,26,0.95)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              {file.file_name}
            </div>
          )}
        </div>
      </div>

      {/* Uploader + date */}
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-condensed font-bold shrink-0"
          style={{ background: 'rgba(74,158,255,0.2)', color: '#4a9eff', border: '1px solid rgba(74,158,255,0.3)' }}
        >
          {getInitials(file.uploader_name)}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-body text-white/70 font-medium truncate">{file.uploader_name}</p>
          <p className="text-xs font-body text-white/35">{formatDate(file.created_at)}</p>
        </div>
        <span className="ml-auto text-xs font-body text-white/35 shrink-0">{formatFileSize(file.file_size)}</span>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onPreview(file)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-body font-medium transition-all duration-150"
          style={{ background: 'rgba(74,158,255,0.1)', color: '#4a9eff', border: '1px solid rgba(74,158,255,0.2)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,158,255,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(74,158,255,0.1)' }}
        >
          👁 Preview
        </button>
        <a
          href={file.file_url}
          download={file.file_name}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-body font-medium transition-all duration-150"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        >
          ⬇ Download
        </a>
        <button
          onClick={() => onDelete(file)}
          className="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-body transition-all duration-150"
          style={{ background: 'rgba(255,60,60,0.08)', color: 'rgba(255,100,100,0.8)', border: '1px solid rgba(255,60,60,0.15)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.18)'; e.currentTarget.style.color = '#ff6464' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.08)'; e.currentTarget.style.color = 'rgba(255,100,100,0.8)' }}
        >
          🗑
        </button>
      </div>
    </motion.div>
  )
}
