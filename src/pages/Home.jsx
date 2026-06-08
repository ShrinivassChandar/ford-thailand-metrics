import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import CategoryCard from '../components/CategoryCard'
import FordOvalLogo from '../components/FordOvalLogo'

const SLUGS = ['backorder', 'overdue', 'fillrate', 'inventory']

export default function Home() {
  const [fileCounts, setFileCounts] = useState({})
  const [connectionError, setConnectionError] = useState(false)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const { data, error } = await supabase
          .from('files')
          .select('category')
        if (error) throw error
        const counts = {}
        SLUGS.forEach(s => { counts[s] = 0 })
        data?.forEach(row => {
          if (counts[row.category] !== undefined) counts[row.category]++
        })
        setFileCounts(counts)
      } catch {
        setConnectionError(true)
      }
    }
    fetchCounts()
  }, [])

  const wordReveal = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const wordItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const titleWords = ['FORD', 'THAILAND', 'METRICS']

  return (
    <div className="min-h-screen" style={{ background: '#000d1a' }}>
      {connectionError && (
        <div className="w-full py-2 px-4 text-center text-sm font-body text-yellow-300" style={{ background: 'rgba(255,200,50,0.12)', border: '1px solid rgba(255,200,50,0.2)' }}>
          ⚠ Connection issue — please refresh the page
        </div>
      )}

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-8 pb-12 px-4 overflow-hidden">

        {/* Mustang background image — z-index 0 */}
        <motion.img
          src="/mustang.avif"
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
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

        {/* Dark radial gradient overlay — z-index 1 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,52,118,0.3) 0%, rgba(0,13,26,0.85) 70%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Animated blue glow pulse — z-index 1 */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,52,118,0.25) 0%, transparent 70%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ford Oval Logo — z-index 2 */}
        <motion.div
          className="relative mb-6"
          style={{ zIndex: 2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <FordOvalLogo width={280} glow={true} />
        </motion.div>

        {/* Title — z-index 2 */}
        <motion.h1
          variants={wordReveal}
          initial="hidden"
          animate="visible"
          className="relative flex gap-3 flex-wrap justify-center font-condensed font-black uppercase text-white text-center mb-4"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '0.12em',
            textShadow: '0 0 40px rgba(74,158,255,0.3)',
            zIndex: 2,
          }}
        >
          {titleWords.map((word, i) => (
            <motion.span key={i} variants={wordItem}>{word}</motion.span>
          ))}
        </motion.h1>

        {/* Subtitle — z-index 2 */}
        <motion.p
          className="relative font-body text-white/50 text-center mb-10"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', letterSpacing: '0.08em', zIndex: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Metrics &amp; File Management Platform
        </motion.p>

        {/* Divider line — z-index 2 */}
        <motion.div
          className="relative w-48 h-px mb-10"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(74,158,255,0.5), transparent)',
            zIndex: 2,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        />

        {/* Category Cards — z-index 2, perfectly centered */}
        <motion.div
          className="relative w-full px-4"
          style={{
            zIndex: 2,
            maxWidth: '860px',
            margin: '0 auto',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SLUGS.map((slug, i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              >
                <CategoryCard slug={slug} fileCount={fileCounts[slug] ?? 0} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </section>
    </div>
  )
}
