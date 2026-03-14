import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { data } from '../data'
import ScrollReveal from '../components/ScrollReveal'

function TiltCard({ children, style = {} }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = ((e.clientY - cy) / (rect.height / 2)) * 6
    const y = -((e.clientX - cx) / (rect.width / 2)) * 6
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000, ...style }}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard>
        <div className="card" style={{ height: '100%' }}>
          {/* Gradient top bar */}
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.12 + 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: project.gradient, transformOrigin: 'left' }}
          />

          {/* Year */}
          <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            {project.year}
          </div>

          {/* Glow bg for featured */}
          {project.featured && (
            <div style={{
              position: 'absolute', top: '-40%', right: '-15%', width: '280px', height: '280px',
              background: `radial-gradient(circle, ${project.color}07 0%, transparent 70%)`,
              pointerEvents: 'none'
            }} />
          )}

          <div style={{ position: 'relative' }}>
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
              style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${project.color}15`, border: `1px solid ${project.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem',
                color: project.color, marginBottom: '1.25rem'
              }}
            >
              {project.name[0]}
            </motion.div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: project.featured ? '1.4rem' : '1.15rem',
              marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              {project.name}
              {project.featured && (
                <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.5rem', borderRadius: '100px', background: `${project.color}20`, color: project.color, letterSpacing: '0.1em' }}>
                  FEATURED
                </span>
              )}
            </h3>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {project.description}
            </p>

            {/* Tech chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {project.stack.map((tech, j) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.12 + 0.35 + j * 0.04 }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                    padding: '0.2rem 0.6rem', borderRadius: '6px',
                    background: 'var(--surface-2)', color: 'var(--text-secondary)',
                    border: '1px solid var(--border)'
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {project.links.github && (
                <motion.a
                  href={project.links.github} target="_blank" rel="noopener"
                  whileHover={{ x: 2, color: 'var(--text-primary)' }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', transition: 'color 0.2s' }}
                >
                  <FiGithub size={15} /> Code
                </motion.a>
              )}
              {project.links.live && (
                <motion.a
                  href={project.links.live} target="_blank" rel="noopener"
                  whileHover={{ x: 2, color: project.color }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', transition: 'color 0.2s' }}
                >
                  <FiExternalLink size={15} /> Live <FiArrowUpRight size={11} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const featured = data.projects.filter(p => p.featured)
  const others   = data.projects.filter(p => !p.featured)

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container" ref={ref}>
        <motion.div style={{ y: titleY, textAlign: 'center', marginBottom: '4rem' }}>
          <ScrollReveal>
            <p className="section-label" style={{ justifyContent: 'center' }}>Projects</p>
            <h2 className="section-title">
              Things I've <span className="gradient-text">Built</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              A collection of projects from real-time apps to AI-powered tools.
            </p>
          </ScrollReveal>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {featured.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {others.map((p, i) => <ProjectCard key={p.name} project={p} index={i + featured.length} />)}
        </div>
      </div>
    </section>
  )
}
