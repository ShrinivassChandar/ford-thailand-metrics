import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = {
  backorder: { label: 'Back Order' },
  overdue:   { label: 'Over Due' },
  fillrate:  { label: 'Fill Rate' },
  inventory: { label: 'Inventory' },
}

export default function CategoryCard({ slug, fileCount }) {
  const navigate = useNavigate()
  const cat = CATEGORIES[slug]
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => navigate(`/category/${slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 32px',
        minHeight: '120px',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'background 200ms ease, border-color 200ms ease, transform 200ms ease',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '13px',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: 0,
        }}>
          {cat.label}
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: '12px',
          color: 'rgba(255,255,255,0.4)',
          margin: '6px 0 0',
        }}>
          {fileCount} {fileCount === 1 ? 'file' : 'files'}
        </p>
      </div>

      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        fontSize: '18px',
        color: 'rgba(255,255,255,0.5)',
        display: 'inline-block',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 200ms ease',
        marginLeft: '16px',
        flexShrink: 0,
      }}>
        →
      </span>
    </div>
  )
}

export { CATEGORIES }
