import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 25, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 }
  },
  slideIn: {
    hidden: { opacity: 0, x: -30, skewX: -3 },
    visible: { opacity: 1, x: 0, skewX: 0 }
  }
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.65,
  threshold = 0.15,
  once = true,
  style = {}
}) {
  const [ref, inView] = useInView({ triggerOnce: once, threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={style}
    >
      {children}
    </motion.div>
  )
}
