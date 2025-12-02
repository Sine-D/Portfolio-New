import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

// Mobile-specific slide animations
interface MobileSlideProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  isVisible: boolean
  className?: string
}

export function MobileSlide({
  children,
  direction = 'left',
  isVisible,
  className = '',
}: MobileSlideProps) {
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { x: '100%', opacity: 0 }
      case 'right':
        return { x: '-100%', opacity: 0 }
      case 'up':
        return { y: '100%', opacity: 0 }
      case 'down':
        return { y: '-100%', opacity: 0 }
      default:
        return { x: '100%', opacity: 0 }
    }
  }

  const getAnimate = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      default:
        return { x: 0, opacity: 1 }
    }
  }

  const getExit = () => {
    switch (direction) {
      case 'left':
        return { x: '-100%', opacity: 0 }
      case 'right':
        return { x: '100%', opacity: 0 }
      case 'up':
        return { y: '-100%', opacity: 0 }
      case 'down':
        return { y: '100%', opacity: 0 }
      default:
        return { x: '-100%', opacity: 0 }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={getInitial()}
          animate={getAnimate()}
          exit={getExit()}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Mobile bounce animation
interface MobileBounceProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MobileBounce({
  children,
  className = '',
  delay = 0,
}: MobileBounceProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Mobile fade with scale
interface MobileFadeScaleProps {
  children: ReactNode
  isVisible: boolean
  className?: string
}

export function MobileFadeScale({
  children,
  isVisible,
  className = '',
}: MobileFadeScaleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Touch feedback animation
interface TouchFeedbackProps {
  children: ReactNode
  className?: string
}

export function TouchFeedback({
  children,
  className = '',
}: TouchFeedbackProps) {
  return (
    <motion.div
      className={className}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

