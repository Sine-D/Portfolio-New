import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface Scroll3DParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  depth?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function Scroll3DParallax({
  children,
  className = '',
  speed = 0.5,
  depth = 100,
  direction = 'up',
}: Scroll3DParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // All hooks must be called at the top level
  const translateZ = useTransform(scrollYProgress, [0, 1], [0, depth * speed])
  const translateY = useTransform(scrollYProgress, [0, 1], 
    direction === 'up' ? [0, -depth * speed] : direction === 'down' ? [0, depth * speed] : [0, 0]
  )
  const translateX = useTransform(scrollYProgress, [0, 1],
    direction === 'left' ? [0, -depth * speed] : direction === 'right' ? [0, depth * speed] : [0, 0]
  )
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15 * speed])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 15 * speed])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5])

  const smoothTranslateZ = useSpring(translateZ, { stiffness: 100, damping: 30 })
  const smoothTranslateY = useSpring(translateY, { stiffness: 100, damping: 30 })
  const smoothTranslateX = useSpring(translateX, { stiffness: 100, damping: 30 })
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  return (
    <div ref={ref} className={`perspective-2000 ${className}`}>
      <motion.div
        style={{
          translateZ: smoothTranslateZ,
          translateY: smoothTranslateY,
          translateX: smoothTranslateX,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          scale: scale,
          opacity: opacity,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// 3D Card Reveal on Scroll
interface Card3DRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function Card3DReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: Card3DRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], 
    direction === 'up' ? [90, 45, 0] : direction === 'down' ? [-90, -45, 0] : [0, 0, 0]
  )
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1],
    direction === 'left' ? [90, 45, 0] : direction === 'right' ? [-90, -45, 0] : [0, 0, 0]
  )
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1])

  return (
    <div ref={ref} className={`perspective-2000 ${className}`}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          opacity,
          scale,
          transformStyle: 'preserve-3d',
        }}
        transition={{ delay, duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// 3D Stack Effect
interface Stack3DProps {
  children: ReactNode[]
  className?: string
  spacing?: number
}

export function Stack3D({
  children,
  className = '',
  spacing = 20,
}: Stack3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: '2000px' }}>
      {children.map((child, index) => {
        const translateZ = useTransform(scrollYProgress, [0, 1], 
          [index * -spacing, (children.length - index) * spacing]
        )
        const rotateY = useTransform(scrollYProgress, [0, 1], 
          [index * 5, (children.length - index) * -5]
        )
        const opacity = useTransform(scrollYProgress, [0, 0.5, 1], 
          [0.3, 1, 0.3]
        )

        return (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              translateZ,
              rotateY,
              opacity,
              transformStyle: 'preserve-3d',
              zIndex: children.length - index,
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

