import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import { data } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] } })
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Left – Text */}
          <div>
            <motion.h2 className="section-title" variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              Crafting Digital<br /><span className="gradient-text">Experiences</span>
            </motion.h2>
            <motion.p
              variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1.0rem' }}
            >
              I'm a Software Engineer based in Howrah, West Bengal, with a passion for building products that are both technically robust and beautifully designed. I thrive at the intersection of engineering and product thinking.
            </motion.p>
            <motion.p
              variants={fadeUp} custom={3} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '2.5rem', fontSize: '1.0rem' }}
            >
              From architecting analytics portals that serve 200+ business users to building NLP-powered tools with LLaMA 3.1, I love solving complex problems with elegant code. Outside work, I am a competitive programmer with 1500+ problems solved on LeetCode.
            </motion.p>

            {/* Contact chips */}
            <motion.div variants={fadeUp} custom={4} initial="hidden" animate={inView ? 'visible' : 'hidden'} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: <FiMapPin size={14} />, text: data.personal.location },
                { icon: <FiMail size={14} />, text: data.personal.email },
                { icon: <FiPhone size={14} />, text: data.personal.phone },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{icon}</span>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – Education Cards + Avatar */}
          <div>
            <motion.div
              variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {/* Avatar placeholder */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  width: '100%', aspectRatio: '16/9',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden'
                }}
              >
                {/* Code animation background */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(0,255,136,0.03) 0%, rgba(0,212,255,0.03) 100%)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'rgba(0,255,136,0.15)', padding: '1.5rem',
                  lineHeight: 1.8, overflow: 'hidden',
                  userSelect: 'none'
                }}>
                  {`const srijan = {\n  role: "Software Engineer",\n  passion: "Building scalable apps",\n  rating: { leetcode: 1983, gfg: 3130 },\n  stack: ["Python", "React", "Flask"],\n  ai: ["LangChain", "FAISS", "LLMs"],\n  status: "Available ✓"\n}`}
                </div>

                {/* Avatar initials overlay */}
                <div style={{
                  position: 'relative', zIndex: 1, textAlign: 'center',
                  fontFamily: 'var(--font-display)'
                }}>
                  <div style={{
                    width: '90px', height: '90px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', fontWeight: 500, color: '#000',
                    margin: '0 auto 0.75rem',
                    boxShadow: '0 0 40px rgba(0,255,136,0.4)'
                  }}>
                    SK
                  </div>
                  <div style={{ fontWeight: 500, fontSize: '1.1rem' }}>Srijan Kundu Chowdhury</div>
                  <div style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                    Software Engineer @ mjunction
                  </div>
                </div>
              </motion.div>

              {/* Education */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: 'var(--accent)' }}
                  className="card"
                  style={{ padding: '1.25rem' }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>B.E. DEGREE</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Jadavpur University</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{data.education.period}</div>
                  <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                    {data.education.cgpa}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: '4px' }}>CGPA</span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, borderColor: 'var(--accent-2)' }}
                  className="card"
                  style={{ padding: '1.25rem' }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-2)', marginBottom: '0.5rem' }}>HIGH SCHOOL</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.25rem' }}>MKCI School</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>2013 – 2020</div>
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      XII: <span style={{ color: 'var(--accent-2)', fontWeight: 600 }}>{data.education.class12}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      X: <span style={{ color: 'var(--accent-2)', fontWeight: 600 }}>{data.education.class10}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
