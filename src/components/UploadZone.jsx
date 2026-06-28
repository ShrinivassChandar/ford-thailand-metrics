import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function UploadZone({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploaderName, setUploaderName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const inputRef = useRef()

  const validateFile = (file) => {
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!['.csv', '.xlsx', '.xls'].includes(ext)) return 'type'
    if (file.size > 50 * 1024 * 1024) return 'size'
    return null
  }

  const handleFiles = (files) => {
    const file = files[0]
    if (!file) return
    const err = validateFile(file)
    if (err === 'type') {
      onUpload(null, null, 'TYPE_ERROR')
      return
    }
    if (err === 'size') {
      onUpload(null, null, 'SIZE_ERROR')
      return
    }
    setSelectedFile(file)
    setUploadError(null)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [])

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)

  const handleUploadClick = async () => {
    if (!uploaderName.trim()) {
      setNameError(true)
      return
    }
    setNameError(false)
    setIsUploading(true)
    setProgress(0)
    setUploadError(null)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 15, 85))
    }, 200)

    try {
      const result = await onUpload(selectedFile, uploaderName.trim())
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        setSelectedFile(null)
        setUploaderName('')
        setProgress(0)
        setIsUploading(false)
      }, 600)
    } catch (err) {
      clearInterval(interval)
      setUploadError('Upload failed. Please try again.')
      setProgress(0)
      setIsUploading(false)
    }
  }

  const cancel = () => {
    setSelectedFile(null)
    setUploaderName('')
    setNameError(false)
    setProgress(0)
    setUploadError(null)
  }

  return (
    <div className="mb-8">
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !selectedFile && inputRef.current.click()}
        className="relative rounded-2xl p-8 text-center cursor-pointer transition-all duration-200"
        style={{
          border: isDragging ? '1.5px dashed rgba(255,255,255,0.6)' : '1.5px dashed rgba(255,255,255,0.15)',
          background: isDragging ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
          cursor: selectedFile ? 'default' : 'pointer',
          backdropFilter: 'blur(8px)',
        }}
        animate={isDragging ? { scale: 1.01 } : { scale: 1 }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />

        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="drop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="text-4xl opacity-50">📁</div>
              <p className="font-body font-medium text-white/70">
                Drop your Excel or CSV file here, or{' '}
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>click to browse</span>
              </p>
              <p className="font-body text-sm text-white/30">
                Supports .csv, .xlsx, .xls · Max 50MB
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 justify-center">
                <span className="text-2xl">
                  {selectedFile.name.endsWith('.csv') ? '📄' : '📊'}
                </span>
                <div className="text-left">
                  <p className="font-body font-medium text-white text-sm">{selectedFile.name}</p>
                  <p className="font-body text-xs text-white/40">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {/* Name input */}
              <div className="max-w-xs mx-auto w-full">
                <input
                  type="text"
                  placeholder="Enter your name *"
                  value={uploaderName}
                  onChange={e => { setUploaderName(e.target.value); setNameError(false) }}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-body text-white placeholder-white/30 outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: nameError ? '1px solid #ff6464' : '1px solid rgba(255,255,255,0.15)',
                    focusRingColor: '#4a9eff',
                  }}
                />
                {nameError && (
                  <p className="text-xs text-red-400 mt-1 font-body">Please enter your name before uploading</p>
                )}
              </div>

              {/* Progress bar */}
              {isUploading && (
                <div className="w-full max-w-xs mx-auto">
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'rgba(255,255,255,0.6)' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-white/40 font-body mt-1 text-center">Uploading... {progress}%</p>
                </div>
              )}

              {uploadError && (
                <div className="flex items-center gap-2 justify-center">
                  <p className="text-sm text-red-400 font-body">{uploadError}</p>
                  <button
                    onClick={handleUploadClick}
                    className="text-xs font-body px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(255,100,100,0.15)', color: '#ff9999', border: '1px solid rgba(255,100,100,0.3)' }}
                  >
                    Retry
                  </button>
                </div>
              )}

              {!isUploading && (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleUploadClick}
                    className="px-6 py-2.5 rounded-xl font-body font-semibold text-sm text-white transition-all duration-150"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                  >
                    Upload File
                  </button>
                  <button
                    onClick={cancel}
                    className="px-4 py-2.5 rounded-xl font-body text-sm transition-all duration-150"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
