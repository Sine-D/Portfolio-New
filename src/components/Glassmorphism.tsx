import { motion } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'

// Glass Effect Variations
interface GlassCardProps {
  children: ReactNode
  variant?: 'default' | 'strong' | 'subtle' | 'colored' | 'frosted'
  className?: string
  animated?: boolean
}

export function GlassCard({
  children,
  variant = 'default',
  className = '',
  animated = false,
}: GlassCardProps) {
  const baseClasses = 'rounded-2xl backdrop-blur-md border'
  
  const variantClasses = {
    default: 'glass',
    strong: 'glass-strong',
    subtle: 'bg-white/5 backdrop-blur-sm border-white/10',
    colored: 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border-cyan-400/30',
    frosted: 'glass-frosted',
  }

  const Component = animated ? motion.div : 'div'
  const props = animated
    ? {
        animate: {
          background: [
            'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))',
            'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          ],
        },
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }
    : {}

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

// Animated Glass Morphing
interface AnimatedGlassProps {
  children: ReactNode
  className?: string
}

export function AnimatedGlass({
  children,
  className = '',
}: AnimatedGlassProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className={`glass rounded-2xl p-8 relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(14, 165, 233, 0.2), rgba(147, 51, 234, 0.1))`,
      }}
      animate={{
        boxShadow: [
          '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          '0 12px 40px 0 rgba(14, 165, 233, 0.4)',
          '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

// Gradient Border Glass
interface GradientBorderGlassProps {
  children: ReactNode
  className?: string
  gradient?: string[]
  animated?: boolean
}

export function GradientBorderGlass({
  children,
  className = '',
  gradient = ['#06b6d4', '#8b5cf6', '#ec4899'],
  animated = false,
}: GradientBorderGlassProps) {
  const gradientString = gradient.join(', ')

  return (
    <div
      className={`glass-gradient-border rounded-2xl p-[2px] ${className}`}
      style={{
        background: animated
          ? `linear-gradient(90deg, ${gradientString})`
          : `linear-gradient(135deg, ${gradientString})`,
        backgroundSize: animated ? '200% auto' : '100% auto',
        animation: animated ? 'gradientShift 3s ease infinite' : 'none',
      }}
    >
      <div className="glass rounded-2xl p-8 h-full w-full">{children}</div>
    </div>
  )
}

// Frosted Glass Card
interface FrostedGlassCardProps {
  children: ReactNode
  className?: string
  blur?: 'sm' | 'md' | 'lg' | 'xl'
}

export function FrostedGlassCard({
  children,
  className = '',
  blur = 'lg',
}: FrostedGlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  }

  return (
    <div
      className={`glass-frosted ${blurClasses[blur]} rounded-2xl p-8 border border-white/30 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.5)',
      }}
    >
      {children}
    </div>
  )
}

