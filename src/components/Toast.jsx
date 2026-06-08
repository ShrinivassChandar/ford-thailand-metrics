import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 4000)
    return () => clearTimeout(timer)
  }, [onRemove])

  const colors = {
    success: 'border-green-500 bg-green-500/10',
    error: 'border-red-500 bg-red-500/10',
    warning: 'border-yellow-500 bg-yellow-500/10',
    info: 'border-ford-accent bg-ford-accent/10',
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl text-white text-sm max-w-sm shadow-2xl ${colors[toast.type] || colors.info}`}
      style={{ background: 'rgba(0,13,26,0.9)' }}
    >
      <span className="text-base mt-0.5 shrink-0">{icons[toast.type]}</span>
      <p className="flex-1 font-body">{toast.message}</p>
      <button onClick={onRemove} className="ml-2 opacity-60 hover:opacity-100 text-lg leading-none shrink-0">×</button>
    </motion.div>
  )
}
