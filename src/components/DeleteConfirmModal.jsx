import { motion, AnimatePresence } from 'framer-motion'

export default function DeleteConfirmModal({ file, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {file && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-2xl p-8 max-w-sm w-full"
            style={{
              background: 'rgba(0,13,26,0.97)',
              border: '1px solid rgba(255,60,60,0.2)',
              boxShadow: '0 0 40px rgba(255,60,60,0.1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-4xl mb-4 text-center">🗑️</div>
            <h3 className="font-condensed font-bold text-xl text-white text-center mb-3 tracking-wide uppercase">
              Delete File
            </h3>
            <p className="font-body text-sm text-white/60 text-center mb-6">
              Are you sure you want to delete{' '}
              <span className="text-white font-medium">"{file.file_name}"</span>?
              <br />
              <span className="text-red-400 text-xs">This action cannot be undone.</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl font-body font-medium text-sm transition-all"
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(file)}
                className="flex-1 py-2.5 rounded-xl font-body font-semibold text-sm text-white transition-all"
                style={{ background: '#cc3333', border: '1px solid rgba(255,60,60,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ff4444' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#cc3333' }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
