import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'CP', to: 'competitive' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          background: scrolled ? 'rgba(6,6,13,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}
          >
            <span style={{ opacity: 0.4 }}>&#123;</span> SKC <span style={{ opacity: 0.4 }}>&#125;</span>
          </motion.div>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link
                  to={link.to}
                  spy smooth duration={600}
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 500,
                    fontSize: '0.875rem', color: 'var(--text-secondary)',
                    cursor: 'pointer', padding: '0.5rem 0.9rem',
                    borderRadius: '8px', transition: 'all 0.2s', display: 'block'
                  }}
                  activeStyle={{ color: 'var(--accent)', background: 'rgba(0,255,136,0.08)' }}
                  onMouseEnter={e => { e.target.style.color = 'var(--text-primary)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                  onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent' }}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <a
                href="mailto:srijankunduchowdhury@gmail.com"
                className="btn btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                Hire Me
              </a>
            </motion.li>
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{
              display: 'none', flexDirection: 'column', gap: '5px',
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px'
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', height: '2px', background: 'var(--text-primary)',
                borderRadius: '2px',
                width: i === 1 ? '18px' : '24px',
                transition: 'all 0.3s',
                transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)'
                  : menuOpen && i === 1 ? 'scaleX(0)'
                  : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 490,
              background: 'var(--bg-secondary)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <Link
                  to={link.to} spy smooth duration={600}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '2rem', color: 'var(--text-primary)', cursor: 'pointer'
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
