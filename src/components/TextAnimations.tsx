import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode, useEffect, useState } from 'react'

// Split Text Animation
interface SplitTextProps {
  children: string
  className?: string
  delay?: number
}

export function SplitText({ children, className = '', delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <span ref={ref} className={className}>
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: delay + index * 0.02 }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Text Reveal on Scroll
interface TextRevealProps {
  children: ReactNode
  className?: string
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function TextReveal({
  children,
  className = '',
  direction = 'left',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { clipPath: 'inset(0 100% 0 0)' }
      case 'right':
        return { clipPath: 'inset(0 0 0 100%)' }
      case 'up':
        return { clipPath: 'inset(100% 0 0 0)' }
      case 'down':
        return { clipPath: 'inset(0 0 100% 0)' }
      default:
        return { clipPath: 'inset(0 100% 0 0)' }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : getInitial()}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Glitch Text Effect
interface GlitchTextProps {
  children: string
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function GlitchText({
  children,
  className = '',
  intensity = 'medium',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getIntensity = () => {
    switch (intensity) {
      case 'low':
        return { x: [-2, 2, -2, 2, 0], y: [0, -1, 1, 0, 0] }
      case 'medium':
        return { x: [-4, 4, -4, 4, 0], y: [0, -2, 2, 0, 0] }
      case 'high':
        return { x: [-8, 8, -8, 8, 0], y: [0, -4, 4, 0, 0] }
      default:
        return { x: [-4, 4, -4, 4, 0], y: [0, -2, 2, 0, 0] }
    }
  }

  return (
    <motion.span
      className={`glitch-text ${className}`}
      animate={isGlitching ? getIntensity() : {}}
      transition={{ duration: 0.2 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  )
}

// Gradient Text Animation
interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  animate?: boolean
}

export function GradientText({
  children,
  className = '',
  colors = ['#06b6d4', '#8b5cf6', '#ec4899'],
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={className}
      style={{
        background: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: animate ? '200% auto' : '100% auto',
        animation: animate ? 'gradientShift 3s ease infinite' : 'none',
      }}
    >
      {children}
    </span>
  )
}

// Typing/Deleting Text Effect (enhanced version)
interface TypingTextProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
  loop?: boolean
}

export function TypingText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
  loop = true,
}: TypingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[currentTextIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && currentText.length < current.length) {
      timeout = setTimeout(() => {
        setCurrentText(current.substring(0, currentText.length + 1))
      }, typingSpeed)
    } else if (!isDeleting && currentText.length === current.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseDuration)
    } else if (isDeleting && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText(current.substring(0, currentText.length - 1))
      }, deletingSpeed)
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false)
      if (loop) {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      } else if (currentTextIndex < texts.length - 1) {
        setCurrentTextIndex((prev) => prev + 1)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration, loop])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </span>
  )
}

