import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function CountUp({ end, duration = 1800, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const startTime = useRef(null)
  const rafRef = useRef(null)

  // Parse numeric part from strings like "1500+" → 1500
  const numericEnd = parseInt(String(end).replace(/\D/g, ''), 10)
  const hasSuffix = String(end).includes('+') ? '+' : ''

  useEffect(() => {
    if (!inView) return
    startTime.current = null

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericEnd))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, numericEnd, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{hasSuffix}{suffix}
    </span>
  )
}
