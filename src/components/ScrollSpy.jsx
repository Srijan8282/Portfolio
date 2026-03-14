import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'competitive', label: 'CP' },
  { id: 'contact', label: 'Contact' },
]

export default function ScrollSpy() {
  const [active, setActive] = useState('hero')
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const observers = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div style={{
      position: 'fixed', right: '1.5rem', top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 400, display: 'flex', flexDirection: 'column',
      gap: '0.6rem', alignItems: 'center'
    }}>
      {sections.map(({ id, label }) => (
        <Link key={id} to={id} spy smooth duration={600}>
          <div
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', cursor: 'pointer' }}
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute', right: '20px',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: 'var(--accent)', whiteSpace: 'nowrap',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-glow)',
                    padding: '0.25rem 0.6rem', borderRadius: '6px',
                    letterSpacing: '0.08em'
                  }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              animate={{
                width: active === id ? '20px' : '6px',
                height: active === id ? '6px' : '6px',
                background: active === id ? 'var(--accent)' : 'var(--text-muted)',
                boxShadow: active === id ? '0 0 8px var(--accent)' : 'none',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{ borderRadius: '3px', flexShrink: 0 }}
            />
          </div>
        </Link>
      ))}
    </div>
  )
}
