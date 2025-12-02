import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// Bold Typography
interface BoldTypographyProps {
  children: ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'display'
  className?: string
  color?: string
}

export function BoldTypography({
  children,
  variant = 'body',
  className = '',
  color = '#ffffff',
}: BoldTypographyProps) {
  const variantClasses = {
    h1: 'text-6xl md:text-8xl font-black tracking-tight',
    h2: 'text-4xl md:text-6xl font-black tracking-tight',
    h3: 'text-2xl md:text-4xl font-black',
    body: 'text-lg md:text-xl font-bold',
    display: 'text-7xl md:text-9xl font-black tracking-tighter',
  }

  return (
    <motion.div
      className={`brutal-typography ${variantClasses[variant]} ${className}`}
      style={{
        color,
        textShadow: '4px 4px 0px rgba(0, 0, 0, 0.5)',
        WebkitTextStroke: variant === 'display' ? '2px currentColor' : 'none',
      }}
    >
      {children}
    </motion.div>
  )
}

// Harsh Shadow Card
interface HarshShadowCardProps {
  children: ReactNode
  className?: string
  shadowColor?: string
  shadowOffset?: number
}

export function HarshShadowCard({
  children,
  className = '',
  shadowColor = '#000000',
  shadowOffset = 8,
}: HarshShadowCardProps) {
  return (
    <motion.div
      className={`brutal-card bg-white rounded-none p-8 ${className}`}
      style={{
        boxShadow: `${shadowOffset}px ${shadowOffset}px 0px 0px ${shadowColor}`,
        border: `4px solid ${shadowColor}`,
      }}
      whileHover={{
        boxShadow: `${shadowOffset + 2}px ${shadowOffset + 2}px 0px 0px ${shadowColor}`,
        x: -2,
        y: -2,
      }}
    >
      {children}
    </motion.div>
  )
}

// Bold Color Button
interface BoldColorButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  color?: string
  bgColor?: string
}

export function BoldColorButton({
  children,
  onClick,
  className = '',
  color = '#000000',
  bgColor = '#ffff00',
}: BoldColorButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`brutal-button px-8 py-4 font-black text-lg uppercase tracking-wider ${className}`}
      style={{
        backgroundColor: bgColor,
        color,
        border: `4px solid ${color}`,
        boxShadow: `6px 6px 0px 0px ${color}`,
      }}
      whileHover={{
        boxShadow: `4px 4px 0px 0px ${color}`,
        x: 2,
        y: 2,
      }}
      whileTap={{
        boxShadow: `2px 2px 0px 0px ${color}`,
        x: 4,
        y: 4,
      }}
    >
      {children}
    </motion.button>
  )
}

// Asymmetric Layout Container
interface AsymmetricLayoutProps {
  children: ReactNode
  className?: string
  rotation?: number
}

export function AsymmetricLayout({
  children,
  className = '',
  rotation = 2,
}: AsymmetricLayoutProps) {
  return (
    <motion.div
      className={`asymmetric-layout ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
      }}
      whileHover={{
        rotate: rotation + 1,
        scale: 1.02,
      }}
    >
      {children}
    </motion.div>
  )
}

// Brutal Card with all effects
interface BrutalCardProps {
  children: ReactNode
  className?: string
  bgColor?: string
  borderColor?: string
  shadowColor?: string
}

export function BrutalCard({
  children,
  className = '',
  bgColor = '#ffffff',
  borderColor = '#000000',
  shadowColor = '#000000',
}: BrutalCardProps) {
  return (
    <motion.div
      className={`brutal-card p-8 ${className}`}
      style={{
        backgroundColor: bgColor,
        border: `6px solid ${borderColor}`,
        boxShadow: `12px 12px 0px 0px ${shadowColor}`,
        transform: 'rotate(-1deg)',
      }}
      whileHover={{
        boxShadow: `10px 10px 0px 0px ${shadowColor}`,
        x: 2,
        y: 2,
        rotate: 0,
      }}
    >
      {children}
    </motion.div>
  )
}

