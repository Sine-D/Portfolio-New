import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ReactNode, useRef, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

// 3D Card Flip
interface Card3DFlipProps {
  front: ReactNode
  back: ReactNode
  className?: string
  flipOnHover?: boolean
}

export function Card3DFlip({
  front,
  back,
  className = '',
  flipOnHover = true,
}: Card3DFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`perspective-1000 ${className}`}>
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onHoverStart={() => flipOnHover && setIsFlipped(true)}
        onHoverEnd={() => flipOnHover && setIsFlipped(false)}
        onClick={() => !flipOnHover && setIsFlipped(!isFlipped)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}

// 3D Floating Object
interface Floating3DProps {
  children: ReactNode
  className?: string
  depth?: number
  rotationSpeed?: number
}

export function Floating3D({
  children,
  className = '',
  depth = 50,
  rotationSpeed = 1,
}: Floating3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  const rotateX = useSpring(useTransform(() => mousePosition.y * depth * rotationSpeed))
  const rotateY = useSpring(useTransform(() => mousePosition.x * depth * rotationSpeed))

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateZ: [0, 5, -5, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

// 3D Text with Perspective
interface Text3DProps {
  children: string
  className?: string
  depth?: number
  perspective?: number
}

export function Text3D({
  children,
  className = '',
  depth = 30,
  perspective = 1000,
}: Text3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
      className={`inline-block ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          rotateX: mousePosition.y * depth,
          rotateY: mousePosition.x * depth,
        }}
        className="inline-block"
      >
        {children.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            style={{
              transform: `translateZ(${Math.abs(index - children.length / 2) * 5}px)`,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.2, z: 20 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

// 3D Hover Transform
interface Hover3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Hover3D({
  children,
  className = '',
  intensity = 20,
}: Hover3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]))
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]))

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  )
}

// 3D Parallax Layers
interface Parallax3DProps {
  children: ReactNode[]
  className?: string
  speed?: number[]
}

export function Parallax3D({
  children,
  className = '',
  speed = [0.5, 0.3, 0.1],
}: Parallax3DProps) {
  const scrollY = useMotionValue(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY])

  return (
    <div className={`relative ${className}`} style={{ perspective: '1000px' }}>
      {children.map((child, index) => {
        const y = useTransform(scrollY, (value) => value * (speed[index] || 0.3))
        return (
          <motion.div
            key={index}
            style={{
              y,
              z: index * -50,
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0"
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

// 3D Cube
interface Cube3DProps {
  faces: ReactNode[]
  className?: string
  size?: number
}

export function Cube3D({
  faces,
  className = '',
  size = 200,
}: Cube3DProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setRotation({
        x: (e.clientY / window.innerHeight - 0.5) * 20,
        y: (e.clientX / window.innerWidth - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const facePositions = [
    { transform: `rotateY(0deg) translateZ(${size / 2}px)` }, // front
    { transform: `rotateY(180deg) translateZ(${size / 2}px)` }, // back
    { transform: `rotateY(90deg) translateZ(${size / 2}px)` }, // right
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)` }, // left
    { transform: `rotateX(90deg) translateZ(${size / 2}px)` }, // top
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)` }, // bottom
  ]

  return (
    <div
      className={`perspective-1000 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {faces.map((face, index) => (
          <div
            key={index}
            className="absolute inset-0 glass flex items-center justify-center"
            style={{
              ...facePositions[index],
              transformStyle: 'preserve-3d',
            }}
          >
            {face}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// 3D Particle System
interface Particle3DProps {
  count?: number
  className?: string
}

export function Particle3D({ count = 50, className = '' }: Particle3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
    }> = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
      })
    }

    const focalLength = 250
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        if (particle.z <= 0) particle.z = 1000
        if (particle.z >= 1000) particle.z = 0
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        const scale = focalLength / (focalLength + particle.z)
        const x = (particle.x - centerX) * scale + centerX
        const y = (particle.y - centerY) * scale + centerY
        const size = particle.size * scale

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(14, 165, 233, ${0.8 * scale})`
        ctx.fill()

        // Draw connections
        particles.forEach((other) => {
          if (other === particle) return
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const dz = particle.z - other.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 150) {
            const otherScale = focalLength / (focalLength + other.z)
            const otherX = (other.x - centerX) * otherScale + centerX
            const otherY = (other.y - centerY) * otherScale + centerY

            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(otherX, otherY)
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 * (1 - distance / 150) * scale})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}

// 3D Extruded Text
interface ExtrudedText3DProps {
  children: string
  className?: string
  depth?: number
  color?: string
}

export function ExtrudedText3D({
  children,
  className = '',
  depth = 20,
  color = '#06b6d4',
}: ExtrudedText3DProps) {
  return (
    <div className={`inline-block ${className}`} style={{ perspective: '1000px' }}>
      <div style={{ transformStyle: 'preserve-3d' }}>
        {children.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block relative"
            style={{
              transform: `translateZ(${depth}px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <span className="relative" style={{ color }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
            {/* Extrusion sides */}
            {Array.from({ length: depth / 2 }).map((_, i) => (
              <span
                key={i}
                className="absolute inset-0"
                style={{
                  transform: `translateZ(${-i * 2}px)`,
                  color: color,
                  opacity: 0.3 - i * 0.02,
                  textShadow: `0 0 ${i * 2}px ${color}`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

// 3D Card Stack
interface CardStack3DProps {
  children: ReactNode[]
  className?: string
  spacing?: number
}

export function CardStack3D({
  children,
  className = '',
  spacing = 20,
}: CardStack3DProps) {
  return (
    <div className={`relative ${className}`} style={{ perspective: '2000px' }}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          style={{
            transform: `translateZ(${-index * spacing}px) scale(${1 - index * 0.05})`,
            transformStyle: 'preserve-3d',
            zIndex: children.length - index,
          }}
          whileHover={{
            transform: `translateZ(${20 - index * spacing}px) scale(${1.05 - index * 0.05})`,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// 3D Image Tilt
interface ImageTilt3DProps {
  src: string
  alt: string
  className?: string
  intensity?: number
}

export function ImageTilt3D({
  src,
  alt,
  className = '',
  intensity = 15,
}: ImageTilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]))
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]))

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ transform: 'translateZ(50px)' }}
        whileHover={{ scale: 1.1 }}
      />
    </motion.div>
  )
}

// 3D Geometric Shapes
interface Geometric3DProps {
  shape?: 'sphere' | 'cube' | 'pyramid' | 'torus'
  size?: number
  className?: string
  color?: string
}

export function Geometric3D({
  shape = 'sphere',
  size = 100,
  className = '',
  color = '#06b6d4',
}: Geometric3DProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setRotation({
        x: (e.clientY / window.innerHeight - 0.5) * 20,
        y: (e.clientX / window.innerWidth - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const renderShape = () => {
    switch (shape) {
      case 'sphere':
        return (
          <div
            className="rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle at 30% 30%, ${color}80, ${color}40)`,
              boxShadow: `0 0 ${size}px ${color}40, inset -${size / 4}px -${size / 4}px ${size / 2}px rgba(0,0,0,0.3)`,
            }}
          />
        )
      case 'cube':
        return (
          <div
            className="relative preserve-3d"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transformStyle: 'preserve-3d',
            }}
          >
            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, i) => (
              <div
                key={face}
                className="absolute inset-0 glass"
                style={{
                  transform: `rotateY(${i * 90}deg) translateZ(${size / 2}px)`,
                  transformStyle: 'preserve-3d',
                }}
              />
            ))}
          </div>
        )
      case 'pyramid':
        return (
          <div
            className="relative preserve-3d"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Pyramid faces */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${size / 2}px solid transparent`,
                  borderRight: `${size / 2}px solid transparent`,
                  borderBottom: `${size}px solid ${color}60`,
                  transform: `rotateY(${i * 90}deg) rotateX(30deg) translateZ(${size / 4}px)`,
                  transformStyle: 'preserve-3d',
                }}
              />
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {renderShape()}
    </motion.div>
  )
}

// 3D Carousel
interface Carousel3DProps {
  children: ReactNode[]
  className?: string
  currentIndex?: number
  onIndexChange?: (index: number) => void
}

export function Carousel3D({
  children,
  className = '',
  currentIndex = 0,
  onIndexChange,
}: Carousel3DProps) {
  const angleStep = 360 / children.length

  return (
    <div className={`relative ${className}`} style={{ perspective: '2000px' }}>
      <div className="relative w-full h-full preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
        {children.map((child, index) => {
          const angle = (index - currentIndex) * angleStep
          const radius = 300
          const x = Math.sin((angle * Math.PI) / 180) * radius
          const z = Math.cos((angle * Math.PI) / 180) * radius

          return (
            <motion.div
              key={index}
              className="absolute inset-0"
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`,
                transformStyle: 'preserve-3d',
                opacity: Math.abs(angle) < 90 ? 1 : 0.3,
              }}
              onClick={() => onIndexChange?.(index)}
              whileHover={{ scale: 1.1, z: 50 }}
            >
              {child}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// 3D Button Press
interface Button3DProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  pressed?: boolean
}

export function Button3D({
  children,
  onClick,
  className = '',
  pressed = false,
}: Button3DProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`perspective-1000 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      animate={{
        rotateX: pressed ? 5 : 0,
        translateZ: pressed ? -10 : 0,
      }}
      whileHover={{
        rotateX: 5,
        translateZ: 10,
      }}
      whileTap={{
        rotateX: 10,
        translateZ: -15,
      }}
    >
      <div style={{ transform: 'translateZ(10px)' }}>{children}</div>
    </motion.button>
  )
}

// 3D Gradient Mesh Background
interface GradientMesh3DProps {
  className?: string
  colors?: string[]
}

export function GradientMesh3D({
  className = '',
  colors = ['#06b6d4', '#8b5cf6', '#ec4899'],
}: GradientMesh3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${colors[0]}20, ${colors[1]}15, ${colors[2]}10)`,
          transform: `translateZ(-500px) scale(2)`,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          background: [
            `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${colors[0]}20, ${colors[1]}15, ${colors[2]}10)`,
            `radial-gradient(circle at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%, ${colors[1]}20, ${colors[2]}15, ${colors[0]}10)`,
            `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${colors[0]}20, ${colors[1]}15, ${colors[2]}10)`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

// 3D Section Transition
interface SectionTransition3DProps {
  children: ReactNode
  className?: string
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function SectionTransition3D({
  children,
  className = '',
  direction = 'up',
}: SectionTransition3DProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { rotateX: 90, opacity: 0, translateZ: -200 }
      case 'down':
        return { rotateX: -90, opacity: 0, translateZ: -200 }
      case 'left':
        return { rotateY: 90, opacity: 0, translateZ: -200 }
      case 'right':
        return { rotateY: -90, opacity: 0, translateZ: -200 }
      default:
        return { rotateX: 90, opacity: 0, translateZ: -200 }
    }
  }

  return (
    <div ref={ref} className={`perspective-2000 ${className}`}>
      <motion.div
        initial={getInitial()}
        animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, translateZ: 0 } : getInitial()}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// 3D Magnetic Effect
interface Magnetic3DProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic3D({
  children,
  className = '',
  strength = 30,
}: Magnetic3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    const maxDistance = 100

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance
      x.set((distanceX / maxDistance) * strength * force)
      y.set((distanceY / maxDistance) * strength * force)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const translateX = useSpring(x, { stiffness: 150, damping: 15 })
  const translateY = useSpring(y, { stiffness: 150, damping: 15 })

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: translateX,
        y: translateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  )
}

// 3D Wireframe Grid
interface Wireframe3DProps {
  className?: string
  size?: number
  color?: string
}

export function Wireframe3D({
  className = '',
  size = 50,
  color = 'rgba(14, 165, 233, 0.3)',
}: Wireframe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = color
      ctx.lineWidth = 1

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw 3D grid
      for (let i = -10; i <= 10; i++) {
        // Horizontal lines
        ctx.beginPath()
        ctx.moveTo(centerX - 500, centerY + i * size)
        ctx.lineTo(centerX + 500, centerY + i * size)
        ctx.stroke()

        // Vertical lines
        ctx.beginPath()
        ctx.moveTo(centerX + i * size, centerY - 500)
        ctx.lineTo(centerX + i * size, centerY + 500)
        ctx.stroke()
      }
    }

    drawGrid()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [size, color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none', opacity: 0.3 }}
    />
  )
}

// 3D Logo Animation
interface Logo3DProps {
  children: ReactNode
  className?: string
  animated?: boolean
}

export function Logo3D({
  children,
  className = '',
  animated = true,
}: Logo3DProps) {
  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      animate={
        animated
          ? {
              rotateY: [0, 360],
              rotateX: [0, 10, -10, 0],
            }
          : {}
      }
      transition={{
        rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
        rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  )
}

// 3D Image Reveal
interface ImageReveal3DProps {
  src: string
  alt: string
  className?: string
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function ImageReveal3D({
  src,
  alt,
  className = '',
  direction = 'left',
}: ImageReveal3DProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { rotateY: -90, opacity: 0, translateZ: -200 }
      case 'right':
        return { rotateY: 90, opacity: 0, translateZ: -200 }
      case 'up':
        return { rotateX: 90, opacity: 0, translateZ: -200 }
      case 'down':
        return { rotateX: -90, opacity: 0, translateZ: -200 }
      default:
        return { rotateY: -90, opacity: 0, translateZ: -200 }
    }
  }

  return (
    <div ref={ref} className={`perspective-1000 overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={getInitial()}
        animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, translateZ: 0 } : getInitial()}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      />
    </div>
  )
}

// 3D Gallery
interface Gallery3DProps {
  images: Array<{ src: string; alt: string }>
  className?: string
}

export function Gallery3D({ images, className = '' }: Gallery3DProps) {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`} style={{ perspective: '2000px' }}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative overflow-hidden"
          style={{
            transform: `translateZ(${index * 20}px)`,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{
            transform: `translateZ(${index * 20 + 50}px) scale(1.1)`,
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}

// 3D Modal
interface Modal3DProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function Modal3D({
  children,
  isOpen,
  onClose,
  className = '',
}: Modal3DProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
            style={{ perspective: '2000px' }}
            initial={{ opacity: 0, rotateX: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, rotateX: -90, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              className="glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// 3D Loading Spinner
interface Spinner3DProps {
  className?: string
  size?: number
  color?: string
}

export function Spinner3D({
  className = '',
  size = 50,
  color = '#06b6d4',
}: Spinner3DProps) {
  return (
    <div
      className={`perspective-1000 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: 360, rotateX: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: color,
              transform: `rotateY(${i * 60}deg) translateZ(${size / 2}px)`,
              transformStyle: 'preserve-3d',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

// 3D Progress Bar
interface ProgressBar3DProps {
  progress: number
  className?: string
  color?: string
}

export function ProgressBar3D({
  progress,
  className = '',
  color = '#06b6d4',
}: ProgressBar3DProps) {
  return (
    <div className={`perspective-1000 ${className}`}>
      <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            transform: 'translateZ(10px)',
            transformStyle: 'preserve-3d',
            boxShadow: `0 0 20px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// 3D Tab Switcher
interface Tab3DProps {
  tabs: Array<{ label: string; content: ReactNode }>
  activeTab: number
  onTabChange: (index: number) => void
  className?: string
}

export function Tab3D({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: Tab3DProps) {
  return (
    <div className={className}>
      <div className="flex gap-2 mb-4" style={{ perspective: '1000px' }}>
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => onTabChange(index)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === index ? 'glass-strong' : 'glass'
            }`}
            style={{
              transform: activeTab === index ? 'translateZ(20px)' : 'translateZ(0px)',
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ translateZ: 10 }}
            whileTap={{ translateZ: -5 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
      <motion.div
        key={activeTab}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: -90, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="perspective-1000"
      >
        {tabs[activeTab].content}
      </motion.div>
    </div>
  )
}

// 3D Timeline
interface Timeline3DProps {
  items: Array<{ title: string; description: string; date: string }>
  className?: string
}

export function Timeline3D({ items, className = '' }: Timeline3DProps) {
  return (
    <div className={`relative ${className}`} style={{ perspective: '2000px' }}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative mb-8"
          initial={{ opacity: 0, rotateY: -90, translateZ: -200 }}
          whileInView={{ opacity: 1, rotateY: 0, translateZ: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-4 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(135deg, #06b6d4, #8b5cf6)`,
                  boxShadow: `0 0 20px #06b6d440`,
                  transform: 'translateZ(10px)',
                }}
              />
              <span className="text-sm text-white/60">{item.date}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-white/70">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// 3D Cursor Follower
interface CursorFollower3DProps {
  children: ReactNode
  className?: string
  distance?: number
}

export function CursorFollower3D({
  children,
  className = '',
  distance = 50,
}: CursorFollower3DProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const x = useSpring(useMotionValue(position.x))
  const y = useSpring(useMotionValue(position.y))

  useEffect(() => {
    x.set(position.x)
    y.set(position.y)
  }, [position, x, y])

  return (
    <motion.div
      className={`fixed pointer-events-none z-50 ${className}`}
      style={{
        x: x,
        y: y,
        transform: `translate(-50%, -50%) translateZ(${distance}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  )
}

// 3D Neon Glow
interface NeonGlow3DProps {
  children: ReactNode
  className?: string
  color?: string
  intensity?: number
}

export function NeonGlow3D({
  children,
  className = '',
  color = '#06b6d4',
  intensity = 1,
}: NeonGlow3DProps) {
  return (
    <motion.div
      className={className}
      style={{
        textShadow: `
          0 0 ${5 * intensity}px ${color},
          0 0 ${10 * intensity}px ${color},
          0 0 ${15 * intensity}px ${color},
          0 0 ${20 * intensity}px ${color}80
        `,
        transform: 'translateZ(20px)',
        transformStyle: 'preserve-3d',
      }}
      animate={{
        textShadow: [
          `0 0 ${5 * intensity}px ${color}, 0 0 ${10 * intensity}px ${color}, 0 0 ${15 * intensity}px ${color}, 0 0 ${20 * intensity}px ${color}80`,
          `0 0 ${10 * intensity}px ${color}, 0 0 ${20 * intensity}px ${color}, 0 0 ${30 * intensity}px ${color}, 0 0 ${40 * intensity}px ${color}80`,
          `0 0 ${5 * intensity}px ${color}, 0 0 ${10 * intensity}px ${color}, 0 0 ${15 * intensity}px ${color}, 0 0 ${20 * intensity}px ${color}80`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

// 3D Isometric View
interface Isometric3DProps {
  children: ReactNode
  className?: string
  angle?: number
}

export function Isometric3D({
  children,
  className = '',
  angle = 30,
}: Isometric3DProps) {
  return (
    <div
      className={className}
      style={{
        perspective: '2000px',
        transform: `rotateX(${angle}deg) rotateY(-${angle}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}

// 3D Morphing Shape
interface MorphingShape3DProps {
  className?: string
  size?: number
  colors?: string[]
}

export function MorphingShape3D({
  className = '',
  size = 200,
  colors = ['#06b6d4', '#8b5cf6', '#ec4899'],
}: MorphingShape3DProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        perspective: '1000px',
      }}
      animate={{
        rotateY: [0, 360],
        rotateX: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${colors.join(', ')})`,
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: [1, 1.2, 0.8, 1],
          borderRadius: ['50%', '30%', '50%', '30%', '50%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

// Re-export advanced 3D components (optional - may require Three.js)
// Uncomment these exports if you want to use WebGL 3D components
// export { default as ThreeDScene } from './ThreeDScene'
// export { default as ThreeDMeshBackground } from './ThreeDMeshBackground'
// export { Scroll3DParallax, Card3DReveal, Stack3D } from './Scroll3DParallax'
// export { AdvancedText3D, WaveText3D, TextReveal3D, GlitchText3D } from './ThreeDTextAdvanced'
// export { PageTransition3D, MenuItem3D, Sidebar3D, TabNav3D, Breadcrumb3D } from './ThreeDNavigation'

