import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiCode, FiTrendingUp } from 'react-icons/fi'
import { data } from '../data'
import ScrollReveal from '../components/ScrollReveal'
import CountUp from '../components/CountUp'

function CPCard({ cp, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, borderColor: `${cp.color}50` }}
      className="card"
      style={{ borderColor: `${cp.color}15`, cursor: 'default', perspective: '600px' }}
    >
      {/* Top bar */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.35, duration: 0.6 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: cp.color, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', transformOrigin: 'left' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.35rem', letterSpacing: '0.1em' }}>PLATFORM</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>{cp.platform}</h3>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{ padding: '0.3rem 0.75rem', borderRadius: '100px', background: `${cp.color}15`, border: `1px solid ${cp.color}30`, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: cp.color, fontWeight: 600 }}
        >
          {cp.badge}
        </motion.div>
      </div>

      {/* Animated count-up rating */}
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', color: cp.color, lineHeight: 1, marginBottom: '0.5rem' }}>
        <CountUp end={cp.rating} duration={1400} />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.08em' }}>
        MAX RATING
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {cp.rank && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <FiTrendingUp size={12} style={{ color: cp.color }} /> {cp.rank}
          </div>
        )}
        {cp.problems && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <FiCode size={12} style={{ color: cp.color }} /> <CountUp end={cp.problems} duration={1200} /> problems solved
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Competitive() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const achY   = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section id="competitive" className="section" ref={sectionRef}>
      {/* Floating grid dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div key={i}
            style={{ position: 'absolute', width: '2px', height: '2px', borderRadius: '50%', background: 'var(--accent-2)', opacity: 0.15, left: `${12 + i * 12}%`, top: `${20 + (i % 3) * 30}%` }}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }} ref={ref}>
        <motion.div style={{ y: titleY, textAlign: 'center', marginBottom: '4rem' }}>
          <ScrollReveal>
            <p className="section-label" style={{ justifyContent: 'center' }}>Competitive Programming</p>
            <h2 className="section-title">Problem <span className="gradient-text">Solving</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Avid competitive programmer with 4000+ problems solved across all major platforms.
            </p>
          </ScrollReveal>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
          {data.competitive.map((cp, i) => <CPCard key={cp.platform} cp={cp} index={i} />)}
        </div>

        {/* Achievements */}
        <motion.div style={{ y: achY }}>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <FiAward size={20} color="var(--accent)" />
              </motion.div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>Notable Achievements</h3>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
            {data.achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6, borderColor: 'var(--border-glow)', background: 'rgba(0,255,136,0.04)' }}
                style={{
                  display: 'flex', gap: '0.75rem', padding: '0.875rem 1.25rem',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', fontSize: '0.875rem',
                  color: 'var(--text-secondary)', alignItems: 'center',
                  transition: 'all 0.25s'
                }}
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                  style={{ color: 'var(--accent)', fontSize: '0.55rem', flexShrink: 0 }}
                >
                  ◆
                </motion.span>
                {ach}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
