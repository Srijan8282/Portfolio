import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionDivider({ variant = 'dots' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  if (variant === 'dots') {
    return (
      <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', padding: '1rem 0' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: i === 2 ? 1 : 0.3 } : {}}
            transition={{ delay: i * 0.08, duration: 0.4, ease: 'backOut' }}
            style={{
              width: i === 2 ? '10px' : '5px',
              height: i === 2 ? '10px' : '5px',
              borderRadius: '50%',
              background: i === 2 ? 'var(--accent)' : 'var(--text-muted)',
              boxShadow: i === 2 ? '0 0 12px var(--accent)' : 'none'
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'line') {
    return (
      <div ref={ref} style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '1px', width: '120px',
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            transformOrigin: 'center'
          }}
        />
      </div>
    )
  }

  return null
}
