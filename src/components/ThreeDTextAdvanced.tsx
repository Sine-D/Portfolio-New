import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

// Advanced 3D Text with Multiple Layers
interface AdvancedText3DProps {
  children: string
  className?: string
  depth?: number
  layers?: number
  color?: string
  glowColor?: string
}

export function AdvancedText3D({
  children,
  className = '',
  depth = 50,
  layers = 5,
  color = '#06b6d4',
  glowColor = '#06b6d4',
}: AdvancedText3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          rotateX: mousePosition.y * 20,
          rotateY: mousePosition.x * 20,
        }}
        className="inline-block"
        animate={inView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        {children.split('').map((char, charIndex) => (
          <span key={charIndex} className="inline-block relative">
            {Array.from({ length: layers }).map((_, layerIndex) => (
              <motion.span
                key={layerIndex}
                className="absolute inset-0"
                style={{
                  transform: `translateZ(${(layerIndex - layers / 2) * (depth / layers)}px)`,
                  transformStyle: 'preserve-3d',
                  color: layerIndex === layers - 1 ? color : glowColor,
                  opacity: 0.2 + (layerIndex / layers) * 0.8,
                  textShadow: `0 0 ${layerIndex * 5}px ${glowColor}`,
                  filter: `blur(${Math.abs(layerIndex - layers / 2) * 0.5}px)`,
                }}
                animate={{
                  textShadow: [
                    `0 0 ${layerIndex * 5}px ${glowColor}`,
                    `0 0 ${layerIndex * 8}px ${glowColor}`,
                    `0 0 ${layerIndex * 5}px ${glowColor}`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: layerIndex * 0.1,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// 3D Text with Wave Animation
interface WaveText3DProps {
  children: string
  className?: string
  amplitude?: number
  frequency?: number
}

export function WaveText3D({
  children,
  className = '',
  amplitude = 20,
  frequency = 0.02,
}: WaveText3DProps) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.1)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children.split('').map((char, index) => {
        const offset = index * frequency
        const translateZ = Math.sin(time + offset) * amplitude
        const rotateY = Math.sin(time + offset) * 10

        return (
          <motion.span
            key={index}
            className="inline-block"
            style={{
              transform: `translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              translateZ: translateZ,
              rotateY: rotateY,
            }}
            transition={{ duration: 0.1 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </div>
  )
}

// 3D Text Reveal
interface TextReveal3DProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal3D({
  children,
  className = '',
  delay = 0,
}: TextReveal3DProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ rotateX: 90, opacity: 0, translateZ: -100 }}
          animate={inView ? { rotateX: 0, opacity: 1, translateZ: 0 } : { rotateX: 90, opacity: 0, translateZ: -100 }}
          transition={{
            delay: delay + index * 0.05,
            duration: 0.5,
            ease: 'easeOut',
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

// 3D Glitch Text
interface GlitchText3DProps {
  children: string
  className?: string
  intensity?: number
}

export function GlitchText3D({
  children,
  className = '',
  intensity = 5,
}: GlitchText3DProps) {
  const [glitch, setGlitch] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch({
        x: (Math.random() - 0.5) * intensity,
        y: (Math.random() - 0.5) * intensity,
      })
      setTimeout(() => {
        setGlitch({ x: 0, y: 0 })
      }, 100)
    }, 2000)

    return () => clearInterval(interval)
  }, [intensity])

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      animate={{
        x: glitch.x,
        y: glitch.y,
        rotateZ: glitch.x * 0.1,
      }}
      transition={{ duration: 0.1 }}
    >
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{
            transform: `translateZ(${Math.sin(index) * 10}px)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

