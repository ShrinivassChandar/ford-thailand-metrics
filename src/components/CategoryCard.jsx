import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CATEGORIES = {
  backorder: { icon: '📦', label: 'Back Order', color: '#4a9eff' },
  overdue: { icon: '⏰', label: 'Over Due', color: '#ff6b4a' },
  fillrate: { icon: '📊', label: 'Fill Rate', color: '#4aff9e' },
  inventory: { icon: '🏭', label: 'Inventory', color: '#c84aff' },
}

export default function CategoryCard({ slug, fileCount }) {
  const navigate = useNavigate()
  const cat = CATEGORIES[slug]

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/category/${slug}`)}
      className="cursor-pointer rounded-2xl p-6 border transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${cat.color}40`
        e.currentTarget.style.boxShadow = `0 0 30px ${cat.color}20, 0 8px 32px rgba(0,0,0,0.4)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{cat.icon}</span>
        <span
          className="text-xs font-body font-semibold px-3 py-1 rounded-full"
          style={{ background: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}40` }}
        >
          {fileCount} {fileCount === 1 ? 'file' : 'files'}
        </span>
      </div>
      <h3
        className="font-condensed font-bold text-2xl tracking-wide text-white mb-1"
        style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
      >
        {cat.label}
      </h3>
      <p className="text-sm font-body text-white/40">Click to manage files</p>
      <div
        className="mt-4 h-0.5 w-full rounded-full opacity-30"
        style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
      />
    </motion.div>
  )
}

export { CATEGORIES }
