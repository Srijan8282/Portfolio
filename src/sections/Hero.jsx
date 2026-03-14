import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import { Link } from 'react-scroll'
import { data } from '../data'
import MagneticButton from '../components/MagneticButton'
import CountUp from '../components/CountUp'

export default function Hero() {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)

  // Scroll-driven parallax
  const { scrollY } = useScroll()
  const rawY = useTransform(scrollY, [0, 600], [0, -180])
  const parallaxY = useSpring(rawY, { stiffness: 80, damping: 25 })
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale  = useTransform(scrollY, [0, 500], [1, 0.92])
  const nameY  = useTransform(scrollY, [0, 600], [0, -60])
  const tagY   = useTransform(scrollY, [0, 600], [0, -30])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.6 ? '#00ff88' : Math.random() > 0.5 ? '#00d4ff' : '#ffffff'
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Lines between close particles
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0,255,136,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const typeSequence = data.personal.taglines.flatMap(t => [t, 2000]).flat()

  return (
    <section ref={heroRef} id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Canvas — slower parallax */}
      <motion.canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, y: parallaxY }} />

      {/* Grid */}
      <div className="grid-bg" style={{ zIndex: 1 }} />

      {/* Radial glows — move at different speeds */}
      <motion.div style={{
        position: 'absolute', top: '20%', left: '10%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
        y: useTransform(scrollY, [0, 600], [0, -120])
      }} />
      <motion.div style={{
        position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
        y: useTransform(scrollY, [0, 600], [0, -60])
      }} />

      {/* Hero content fades + scales out as you scroll away */}
      <motion.div style={{ opacity, scale, width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '800px' }}>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}
          >
            <span style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)',
              borderRadius: '100px', padding: '0.35rem 1rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)'
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--accent)', animation: 'pulse-ring 2s infinite'
              }} />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.0,
              marginBottom: '1.25rem', letterSpacing: '-0.02em'
            }}
          >
            Srijan<br />
            <span className="gradient-text">Kundu</span><br />
            Chowdhury
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              color: 'var(--text-secondary)', marginBottom: '1.75rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            <span style={{ color: 'var(--accent)', opacity: 0.6 }}>&gt;</span>
            <TypeAnimation
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ color: 'var(--accent-2)' }}
            />
            <span style={{ animation: 'blink 1s infinite', color: 'var(--accent)' }}>_</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: '1.05rem', color: 'var(--text-secondary)',
              maxWidth: '560px', lineHeight: 1.75, marginBottom: '2.5rem'
            }}
          >
            {data.personal.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}
          >
            <Link to="projects" smooth duration={600}>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects ✦
              </motion.button>
            </Link>
            <a href="mailto:srijankunduchowdhury@gmail.com">
              <motion.button
                className="btn btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiMail size={15} /> Get In Touch
              </motion.button>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
          >
          </motion.div>
          </div>
        </div>
      </motion.div>{/* end opacity/scale wrapper */}

      {/* Stats Bar — outside fade wrapper so it stays visible */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(17,17,33,0.8)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)', zIndex: 3,
          padding: '1.5rem 0'
        }}
      >
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {data.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--accent)' }}>
                  <CountUp end={stat.value} duration={1600} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute', bottom: '7rem', right: '2rem', zIndex: 4,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.5rem', opacity: 0.4
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', writingMode: 'vertical-rl', color: 'var(--text-muted)' }}>SCROLL</span>
        <FiArrowDown size={14} color="var(--text-muted)" />
      </motion.div>
    </section>
  )
}
