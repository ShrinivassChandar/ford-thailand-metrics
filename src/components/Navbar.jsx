import { Link } from 'react-router-dom'
import FordOvalLogo from './FordOvalLogo'

export default function Navbar({ categoryName, categorySlug }) {
  return (
    <nav className="sticky top-0 z-40 flex items-center gap-4 border-b border-white/10"
      style={{ background: 'rgba(8,20,32,0.95)', height: '56px', paddingLeft: '24px', paddingRight: '24px', overflow: 'visible' }}>
      <Link to="/" className="shrink-0 flex items-center">
        <img
          src="/Ford_logo_flat.svg"
          alt="Ford"
          style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </Link>
      <div className="flex items-center gap-2 text-sm font-body">
        <Link to="/" className="text-ford-accent hover:text-white transition-colors">Home</Link>
        <span className="text-white/30">→</span>
        <span className="text-white font-medium">{categoryName}</span>
      </div>
    </nav>
  )
}
