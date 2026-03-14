import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin } from 'react-icons/fi'
import { data } from '../data'
import ScrollReveal from '../components/ScrollReveal'
import MagneticButton from '../components/MagneticButton'

export default function Contact() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const leftY  = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rightY = useTransform(scrollYProgress, [0, 1], [70, -70])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = form
    window.location.href = `mailto:${data.personal.email}?subject=Portfolio Contact from ${name}&body=From: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '0.8rem 1rem',
    background: 'var(--surface-2)',
    border: `1px solid ${focused === field ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: 'var(--radius)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === field ? '0 0 0 3px rgba(0,255,136,0.08)' : 'none',
    boxSizing: 'border-box'
  })

  return (
    <section id="contact" className="section" ref={sectionRef}
      style={{ background: 'linear-gradient(180deg, transparent, var(--bg-secondary))' }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, var(--accent), transparent 70%)', pointerEvents: 'none', zIndex: 0 }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }} ref={ref}>
        <motion.div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <ScrollReveal>
            <p className="section-label" style={{ justifyContent: 'center' }}>Contact</p>
            <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Have an opportunity or just want to say hi? My inbox is always open.
            </p>
          </ScrollReveal>
        </motion.div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '3rem', alignItems: 'start' }}>

          {/* Left panel */}
          <motion.div style={{ y: leftY, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ScrollReveal variant="fadeLeft">
              <motion.div
                className="card"
                style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.04), rgba(0,212,255,0.04))' }}
                whileHover={{ borderColor: 'var(--border-glow)' }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.75rem' }}>Open to Work</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9rem' }}>
                  Currently looking for new opportunities. Whether it's a full-time role, freelance project, or just an interesting conversation about tech, I'd love to hear from you.
                </p>
              </motion.div>
            </ScrollReveal>

            {/* Contact info tiles */}
            <ScrollReveal variant="fadeLeft" delay={0.15}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  { icon: <FiMail size={16} />, label: 'Email', value: data.personal.email, href: `mailto:${data.personal.email}` },
                  { icon: <FiMapPin size={16} />, label: 'Location', value: data.personal.location, href: null },
                ].map(({ icon, label, value, href }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    whileHover={{ x: 4, borderColor: 'var(--border-glow)' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', transition: 'all 0.2s' }}
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.2 }}
                      style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0,255,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}
                    >
                      {icon}
                    </motion.div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginBottom: '2px', letterSpacing: '0.1em' }}>{label.toUpperCase()}</div>
                      {href ? (
                        <a href={href} style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none' }}>{value}</a>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Social icons */}
            <ScrollReveal variant="fadeUp" delay={0.25}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { icon: <FiGithub size={18} />, href: data.personal.links.github, label: 'GitHub' },
                  { icon: <FiLinkedin size={18} />, href: data.personal.links.linkedin, label: 'LinkedIn' },
                  { icon: <FiMail size={18} />, href: `mailto:${data.personal.email}`, label: 'Email' },
                ].map(({ icon, href, label }) => (
                  <MagneticButton key={label} href={href} strength={0.4}
                    style={{ width: '44px', height: '44px', borderRadius: '10px', border: '1px solid var(--border)', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s' }}
                  >
                    <motion.span whileHover={{ color: 'var(--accent)', scale: 1.2 }} style={{ display: 'flex' }}>
                      {icon}
                    </motion.span>
                  </MagneticButton>
                ))}
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Right – form */}
          <motion.div style={{ y: rightY }}>
            <ScrollReveal variant="fadeRight" delay={0.1}>
              <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {['name', 'email'].map(field => (
                      <div key={field}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: focused === field ? 'var(--accent)' : 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
                          {field.toUpperCase()}
                        </label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          value={form[field]}
                          onChange={e => setForm({ ...form, [field]: e.target.value })}
                          onFocus={() => setFocused(field)}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                          style={inputStyle(field)}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: focused === 'message' ? 'var(--accent)' : 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
                      MESSAGE
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      required rows={5}
                      placeholder="Tell me about the opportunity or project..."
                      style={{ ...inputStyle('message'), resize: 'vertical' }}
                    />
                  </div>

                  <MagneticButton strength={0.25} style={{ width: '100%' }}>
                    <motion.button
                      type="submit"
                      className="btn btn-primary"
                      whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(0,255,136,0.3)' }}
                      whileTap={{ scale: 0.97 }}
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', padding: '0.9rem' }}
                    >
                      {sent
                        ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✓ Message Sent!</motion.span>
                        : <><FiSend size={15} /> Send Message</>
                      }
                    </motion.button>
                  </MagneticButton>
                </form>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            © 2025 Srijan Kundu Chowdhury · Built with React + Framer Motion
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}
          >
            Designed & Developed with <span style={{ color: 'var(--accent)' }}>♥</span>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:768px){
          .contact-grid{grid-template-columns:1fr!important}
          .form-row{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
