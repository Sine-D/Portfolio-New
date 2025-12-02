import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// Soft Shadow Button
interface NeumorphicButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'raised' | 'pressed' | 'flat'
  size?: 'sm' | 'md' | 'lg'
}

export function NeumorphicButton({
  children,
  onClick,
  className = '',
  variant = 'raised',
  size = 'md',
}: NeumorphicButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const getShadow = () => {
    switch (variant) {
      case 'raised':
        return '6px 6px 12px rgba(0, 0, 0, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.1)'
      case 'pressed':
        return 'inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.1)'
      case 'flat':
        return '2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.1)'
      default:
        return '6px 6px 12px rgba(0, 0, 0, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.1)'
    }
  }

  return (
    <motion.button
      onClick={onClick}
      className={`neumorphic-button ${sizeClasses[size]} rounded-xl font-semibold transition-all ${className}`}
      style={{
        background: 'linear-gradient(145deg, #1e293b, #0f172a)',
        boxShadow: getShadow(),
      }}
      whileHover={{
        boxShadow:
          variant === 'pressed'
            ? getShadow()
            : '4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.1)',
      }}
      whileTap={{
        boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.1)',
        scale: 0.98,
      }}
    >
      {children}
    </motion.button>
  )
}

// Neumorphic Card
interface NeumorphicCardProps {
  children: ReactNode
  className?: string
  variant?: 'raised' | 'pressed' | 'flat'
}

export function NeumorphicCard({
  children,
  className = '',
  variant = 'raised',
}: NeumorphicCardProps) {
  const getShadow = () => {
    switch (variant) {
      case 'raised':
        return '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.1)'
      case 'pressed':
        return 'inset 6px 6px 12px rgba(0, 0, 0, 0.3), inset -6px -6px 12px rgba(255, 255, 255, 0.1)'
      case 'flat':
        return '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.1)'
      default:
        return '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.1)'
    }
  }

  return (
    <motion.div
      className={`neumorphic-card rounded-2xl p-8 ${className}`}
      style={{
        background: 'linear-gradient(145deg, #1e293b, #0f172a)',
        boxShadow: getShadow(),
      }}
      whileHover={
        variant === 'raised'
          ? {
              boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.1)',
              scale: 1.02,
            }
          : {}
      }
    >
      {children}
    </motion.div>
  )
}

// Pressed Button Effect
interface PressedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  active?: boolean
}

export function PressedButton({
  children,
  onClick,
  className = '',
  active = false,
}: PressedButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`pressed-button rounded-xl px-6 py-3 font-semibold ${className}`}
      style={{
        background: 'linear-gradient(145deg, #1e293b, #0f172a)',
        boxShadow: active
          ? 'inset 4px 4px 8px rgba(0, 0, 0, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.05)'
          : '4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.1)',
      }}
      animate={{
        boxShadow: active
          ? 'inset 4px 4px 8px rgba(0, 0, 0, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.05)'
          : '4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.1)',
      }}
      whileTap={{
        boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.05)',
        scale: 0.96,
      }}
    >
      {children}
    </motion.button>
  )
}

