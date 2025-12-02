import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

export function useScrollTriggered(threshold = 0.1) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false,
  })

  return { ref, inView }
}

export function useStickyElement() {
  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setIsSticky(rect.top <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { ref, isSticky }
}

export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll()
  return scrollYProgress
}

export function useParallaxScroll(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  return { ref, y, opacity }
}

