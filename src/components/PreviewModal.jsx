import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as XLSX from 'xlsx'

const PAGE_SIZE = 100

export default function PreviewModal({ file, onClose }) {
  const [sheets, setSheets] = useState([])
  const [activeSheet, setActiveSheet] = useState(0)
  const [sheetData, setSheetData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [workbook, setWorkbook] = useState(null)

  useEffect(() => {
    if (!file) return
    setLoading(true)
    setError(false)
    setPage(0)

    fetch(file.file_url)
      .then(r => r.arrayBuffer())
      .then(buf => {
        const wb = XLSX.read(buf, { type: 'array' })
        setWorkbook(wb)
        setSheets(wb.SheetNames)
        setActiveSheet(0)
        const ws = wb.Sheets[wb.SheetNames[0]]
        const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
        setSheetData(json)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [file])

  const switchSheet = (idx) => {
    setActiveSheet(idx)
    setPage(0)
    if (!workbook) return
    const ws = workbook.Sheets[workbook.SheetNames[idx]]
    const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
    setSheetData(json)
  }

  const headers = sheetData?.[0] || []
  const rows = sheetData?.slice(1) || []
  const totalPages = Math.ceil(rows.length / PAGE_SIZE)
  const pagedRows = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <AnimatePresence>
      {file && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-2xl flex flex-col w-full max-w-6xl max-h-[90vh]"
            style={{
              background: 'rgba(0,13,26,0.98)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 0 60px rgba(74,158,255,0.1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-4 p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex-1 min-w-0">
                <p className="font-condensed font-bold text-lg text-white tracking-wide uppercase truncate">{file.file_name}</p>
                <p className="font-body text-xs text-white/40">
                  {!loading && !error && sheetData && `${rows.length} rows × ${headers.length} columns`}
                </p>
              </div>
              <a
                href={file.file_url}
                download={file.file_name}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-medium transition-all"
                style={{ background: 'rgba(74,158,255,0.1)', color: '#4a9eff', border: '1px solid rgba(74,158,255,0.2)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,158,255,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(74,158,255,0.1)' }}
              >
                ⬇ Download
              </a>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all text-xl font-body"
              >
                ×
              </button>
            </div>

            {/* Sheet tabs */}
            {sheets.length > 1 && (
              <div className="flex gap-1 px-5 pt-3 border-b pb-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {sheets.map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => switchSheet(idx)}
                    className="px-4 py-1.5 rounded-lg text-sm font-body font-medium transition-all"
                    style={{
                      background: activeSheet === idx ? '#003476' : 'rgba(255,255,255,0.04)',
                      color: activeSheet === idx ? 'white' : 'rgba(255,255,255,0.5)',
                      border: `1px solid ${activeSheet === idx ? 'rgba(74,158,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-auto p-5">
              {loading && (
                <div className="flex items-center justify-center h-40">
                  <div className="w-8 h-8 border-2 border-ford-accent/30 border-t-ford-accent rounded-full animate-spin" />
                </div>
              )}
              {error && (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                  <p className="font-body text-white/50 text-center">
                    Preview unavailable — click Download to open in Excel
                  </p>
                  <a
                    href={file.file_url}
                    download={file.file_name}
                    className="px-5 py-2 rounded-xl font-body font-medium text-sm text-white transition-all"
                    style={{ background: '#003476' }}
                  >
                    ⬇ Download File
                  </a>
                </div>
              )}
              {!loading && !error && sheetData && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-body border-collapse min-w-max">
                    <thead>
                      <tr>
                        {headers.map((h, i) => (
                          <th
                            key={i}
                            className="px-4 py-2.5 text-left font-semibold text-white whitespace-nowrap"
                            style={{
                              background: '#003476',
                              border: '1px solid rgba(255,255,255,0.1)',
                              position: 'sticky',
                              top: 0,
                              zIndex: 1,
                            }}
                          >
                            {String(h)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pagedRows.map((row, ri) => (
                        <tr key={ri} style={{ background: ri % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                          {headers.map((_, ci) => (
                            <td
                              key={ci}
                              className="px-4 py-2 text-white/70 whitespace-nowrap"
                              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                              {String(row[ci] ?? '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-body text-white/40">
                  Page {page + 1} of {totalPages} · Showing {pagedRows.length} of {rows.length} rows
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-4 py-1.5 rounded-lg text-sm font-body transition-all disabled:opacity-30"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-1.5 rounded-lg text-sm font-body transition-all disabled:opacity-30"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
