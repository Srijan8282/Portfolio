import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { data } from '../data'

const categoryColors = {
  "Languages": "#00ff88",
  "Frontend": "#00d4ff",
  "Backend": "#7c3aed",
  "AI / NLP": "#ff6b35",
  "Databases": "#f59e0b",
  "Data": "#ec4899",
  "Cloud & Tools": "#6366f1"
}

function SkillCategory({ category, skills, color, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card"
      style={{ borderColor: `${color}15` }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: color, boxShadow: `0 0 12px ${color}`
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          color: color, letterSpacing: '0.12em', textTransform: 'uppercase'
        }}>
          {category}
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.06 + i * 0.04, duration: 0.3 }}
            whileHover={{
              background: `${color}15`,
              borderColor: `${color}40`,
              color: color,
              scale: 1.05,
              transition: { duration: 0.15 }
            }}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '8px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              cursor: 'default',
              transition: 'all 0.2s'
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="section" ref={ref} style={{ background: 'linear-gradient(180deg, transparent, var(--bg-secondary) 20%, var(--bg-secondary) 80%, transparent)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {Object.entries(data.skills).map(([category, skills], i) => (
            <SkillCategory
              key={category}
              category={category}
              skills={skills}
              color={categoryColors[category] || '#00ff88'}
              index={i}
            />
          ))}
        </div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '3rem', overflow: 'hidden',
            padding: '1.25rem 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            position: 'relative'
          }}
        >
          <div style={{
            display: 'flex', gap: '2rem',
            animation: 'marquee 25s linear infinite',
            width: 'max-content'
          }}>
            {[...Object.values(data.skills).flat(), ...Object.values(data.skills).flat()].map((skill, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                color: 'var(--text-muted)', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: '0.75rem'
              }}>
                {skill}
                <span style={{ color: 'var(--accent)', opacity: 0.3 }}>◆</span>
              </span>
            ))}
          </div>

          {/* Fade edges */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(90deg, var(--bg-secondary), transparent)',
            zIndex: 1
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(-90deg, var(--bg-secondary), transparent)',
            zIndex: 1
          }} />
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
