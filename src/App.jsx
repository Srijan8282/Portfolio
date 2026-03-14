import { useEffect } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import ScrollSpy from './components/ScrollSpy'
import FloatingOrbs from './components/FloatingOrbs'
import SectionDivider from './components/SectionDivider'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Competitive from './sections/Competitive'
import Contact from './sections/Contact'

export default function App() {
  // Mouse glow for cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.querySelectorAll('.card').forEach(card => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--mouse-x', `${x}%`)
        card.style.setProperty('--mouse-y', `${y}%`)
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <ScrollSpy />
      <FloatingOrbs />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider variant="line" />
        <About />
        <SectionDivider variant="dots" />
        <Experience />
        <SectionDivider variant="line" />
        <Projects />
        <SectionDivider variant="dots" />
        <Skills />
        <SectionDivider variant="line" />
        <Competitive />
        <SectionDivider variant="dots" />
        <Contact />
      </main>
    </>
  )
}
