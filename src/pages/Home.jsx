import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import CategoryCard from '../components/CategoryCard'
import FordOvalLogo from '../components/FordOvalLogo'

const SLUGS = ['backorder', 'overdue', 'fillrate', 'inventory']

export default function Home() {
  const [fileCounts, setFileCounts] = useState({})

  useEffect(() => {
    supabase.from('files').select('category').then(({ data }) => {
      if (!data) return
      const counts = {}
      SLUGS.forEach(s => { counts[s] = 0 })
      data.forEach(row => {
        if (counts[row.category] !== undefined) counts[row.category]++
      })
      setFileCounts(counts)
    })
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#081420' }}>
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-8 pb-12 px-4 overflow-hidden">

        {/* Mustang background image */}
        <img
          src="/mustang.avif"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
            filter: 'brightness(0.7) saturate(1.3)',
            zIndex: 0,
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Ford logo */}
        <div className="relative mb-8" style={{ zIndex: 2 }}>
          <FordOvalLogo width={200} glow={false} />
        </div>

        {/* Title */}
        <h1
          className="relative text-white text-center mb-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.8rem, 5vw, 4rem)',
            letterSpacing: '-0.02em',
            zIndex: 2,
            margin: '0 0 16px',
          }}
        >
          Ford Thailand Metrics
        </h1>

        {/* Subtitle */}
        <p
          className="relative text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            zIndex: 2,
            margin: '0 0 40px',
          }}
        >
          Internal Metrics Platform
        </p>

        {/* Divider */}
        <div
          className="relative"
          style={{
            width: '100%',
            maxWidth: '860px',
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 2,
            marginBottom: '36px',
          }}
        />

        {/* Category cards */}
        <div
          className="relative w-full px-4"
          style={{ zIndex: 2, maxWidth: '860px', margin: '0 auto' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SLUGS.map(slug => (
              <CategoryCard key={slug} slug={slug} fileCount={fileCounts[slug] ?? 0} />
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}
