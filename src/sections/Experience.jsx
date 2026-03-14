import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiMapPin, FiChevronDown } from 'react-icons/fi'
import { data } from '../data'

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeExp, setActiveExp] = useState(0)

  return (
    <section id="experience" className="section" ref={ref} style={{ background: 'linear-gradient(180deg, transparent 0%, var(--bg-secondary) 30%, var(--bg-secondary) 70%, transparent 100%)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Where I've <span className="gradient-text">Worked</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Tab List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            {data.experience.map((exp, i) => (
              <button
                key={exp.company}
                onClick={() => setActiveExp(i)}
                style={{
                  all: 'unset', cursor: 'pointer',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius)',
                  background: activeExp === i ? 'var(--surface)' : 'transparent',
                  border: activeExp === i ? `1px solid ${exp.color}33` : '1px solid transparent',
                  borderLeft: `3px solid ${activeExp === i ? exp.color : 'transparent'}`,
                  transition: 'all 0.25s ease',
                  display: 'flex', flexDirection: 'column', gap: '0.25rem',
                  textAlign: 'left'
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.92rem',
                  color: activeExp === i ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}>
                  {exp.company}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: activeExp === i ? exp.color : 'var(--text-muted)' }}>
                  {exp.type}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {data.experience.map((exp, i) => (
              activeExp === i && (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="card" style={{ borderColor: `${exp.color}20` }}>
                    {/* Accent line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${exp.color}, transparent)`, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.25rem' }}>
                          {exp.role}
                        </h3>
                        <div style={{ color: exp.color, fontWeight: 600, fontSize: '1rem' }}>{exp.company}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-end' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <FiCalendar size={12} /> {exp.period}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <FiMapPin size={12} /> {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Stack */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                      {exp.stack.map(tech => (
                        <span key={tech} className="tag" style={{ borderColor: `${exp.color}30`, color: exp.color, background: `${exp.color}10` }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {exp.highlights.map((h, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.07 }}
                          style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}
                        >
                          <span style={{ color: exp.color, flexShrink: 0, marginTop: '0.1em', fontSize: '0.8rem' }}>▹</span>
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
