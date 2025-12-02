import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

// Intersection Observer Animation Wrapper
interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  className?: string
  threshold?: number
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  })

  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 }
      case 'down':
        return { opacity: 0, y: -50 }
      case 'left':
        return { opacity: 0, x: 50 }
      case 'right':
        return { opacity: 0, x: -50 }
      case 'fade':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: 50 }
    }
  }

  const getAnimate = () => {
    switch (direction) {
      case 'up':
        return { opacity: 1, y: 0 }
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
        return { opacity: 1, x: 0 }
      case 'right':
        return { opacity: 1, x: 0 }
      case 'fade':
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={inView ? getAnimate() : getInitial()}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scroll-Triggered Animation
interface ScrollTriggeredProps {
  children: ReactNode
  className?: string
  offset?: [string, string]
}

export function ScrollTriggered({
  children,
  className = '',
  offset = ['start end', 'end start'] as const,
}: ScrollTriggeredProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1])

  return (
    <motion.div ref={ref} style={{ opacity, scale }} className={className}>
      {children}
    </motion.div>
  )
}

// Sticky Element
interface StickyElementProps {
  children: ReactNode
  className?: string
  top?: number
}

export function StickyElement({
  children,
  className = '',
  top = 0,
}: StickyElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <motion.div
      ref={ref}
      style={{ position: 'sticky', top, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scroll Snap Section
interface ScrollSnapSectionProps {
  children: ReactNode
  className?: string
}

export function ScrollSnapSection({
  children,
  className = '',
}: ScrollSnapSectionProps) {
  return (
    <section
      className={`snap-start snap-always min-h-screen ${className}`}
      style={{ scrollSnapAlign: 'start' }}
    >
      {children}
    </section>
  )
}

// Infinite Scroll Container
interface InfiniteScrollProps {
  children: ReactNode
  direction?: 'horizontal' | 'vertical'
  speed?: number
  className?: string
}

export function InfiniteScroll({
  children,
  direction = 'horizontal',
  speed = 1,
  className = '',
}: InfiniteScrollProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
      }}
    >
      <motion.div
        className="flex"
        style={{
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        animate={{
          x: direction === 'horizontal' ? ['0%', '-50%'] : 0,
          y: direction === 'vertical' ? ['0%', '-50%'] : 0,
        }}
        transition={{
          duration: 20 / speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

