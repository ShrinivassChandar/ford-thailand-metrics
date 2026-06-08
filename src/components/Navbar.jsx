import { Link } from 'react-router-dom'
import FordOvalLogo from './FordOvalLogo'

export default function Navbar({ categoryName, categorySlug }) {
  return (
    <nav className="sticky top-0 z-40 flex items-center gap-4 px-6 py-4 border-b border-white/10 backdrop-blur-xl"
      style={{ background: 'rgba(0,13,26,0.85)' }}>
      <Link to="/" className="shrink-0">
        <FordOvalLogo width={60} />
      </Link>
      <div className="flex items-center gap-2 text-sm font-body">
        <Link to="/" className="text-ford-accent hover:text-white transition-colors">Home</Link>
        <span className="text-white/30">→</span>
        <span className="text-white font-medium">{categoryName}</span>
      </div>
    </nav>
  )
}
