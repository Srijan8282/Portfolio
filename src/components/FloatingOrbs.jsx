import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Individual orb that floats and reacts to scroll
function Orb({ x, y, size, color, speed, scrollY, scrollRange, outputRange }) {
  const translateY = useTransform(scrollY, scrollRange, outputRange)

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${color}22, ${color}05 60%, transparent 80%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0,
        translateY,
      }}
      animate={{
        x: [0, 30, -20, 15, 0],
        y: [0, -25, 20, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function FloatingOrbs() {
  const { scrollY } = useScroll()

  const orbs = [
    { x: 5,  y: 15,  size: '500px', color: '#00ff88', speed: 18, scrollRange: [0, 3000], outputRange: [0, -300] },
    { x: 75, y: 5,   size: '400px', color: '#00d4ff', speed: 22, scrollRange: [0, 3000], outputRange: [0, -200] },
    { x: 50, y: 40,  size: '350px', color: '#7c3aed', speed: 15, scrollRange: [500, 3500], outputRange: [0, -250] },
    { x: 10, y: 60,  size: '300px', color: '#00ff88', speed: 20, scrollRange: [1000, 4000], outputRange: [0, -200] },
    { x: 85, y: 55,  size: '450px', color: '#ff6b35', speed: 25, scrollRange: [1500, 4500], outputRange: [0, -180] },
    { x: 35, y: 75,  size: '380px', color: '#00d4ff', speed: 17, scrollRange: [2000, 5000], outputRange: [0, -220] },
    { x: 65, y: 85,  size: '320px', color: '#7c3aed', speed: 23, scrollRange: [2500, 5500], outputRange: [0, -160] },
  ]

  return (
    <>
      {orbs.map((orb, i) => (
        <Orb key={i} {...orb} scrollY={scrollY} />
      ))}
    </>
  )
}
