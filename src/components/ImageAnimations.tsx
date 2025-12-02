import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, ReactNode, useEffect } from 'react'

// Image Reveal on Scroll
interface ImageRevealProps {
  src: string
  alt: string
  className?: string
}

export function ImageReveal({
  src,
  alt,
  className = '',
}: ImageRevealProps) {
  const ref = useRef<HTMLImageElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-full h-full object-cover"
      />
    </motion.div>
  )
}

// Ken Burns Effect
interface KenBurnsProps {
  src: string
  alt: string
  className?: string
  duration?: number
  scale?: number
}

export function KenBurns({
  src,
  alt,
  className = '',
  duration = 20,
  scale = 1.1,
}: KenBurnsProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{
          scale: [1, scale],
          x: ['0%', '5%'],
          y: ['0%', '5%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
    </div>
  )
}

// Image Parallax
interface ImageParallaxProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function ImageParallax({
  src,
  alt,
  className = '',
  speed = 0.5,
}: ImageParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${50 * speed}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, opacity }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

// Hover Zoom Effect
interface HoverZoomProps {
  src: string
  alt: string
  className?: string
  zoom?: number
  children?: ReactNode
}

export function HoverZoom({
  src,
  alt,
  className = '',
  zoom = 1.1,
  children,
}: HoverZoomProps) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      whileHover={{ scale: zoom }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {children}
    </motion.div>
  )
}

// Lazy Loading with Blur-up
interface LazyImageProps {
  src: string
  alt: string
  placeholder?: string
  className?: string
}

export function LazyImage({
  src,
  alt,
  placeholder,
  className = '',
}: LazyImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    if (isInView && !imageSrc) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
    }
  }, [isInView, src, imageSrc])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && placeholder && (
        <motion.img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Main image */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Loading skeleton */}
      {!imageSrc && !placeholder && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-shimmer" />
      )}
    </div>
  )
}

