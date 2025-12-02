import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorTrail {
  id: number
  x: number
  y: number
  timestamp: number
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [trail, setTrail] = useState<CursorTrail[]>([])
  const [isDesktop, setIsDesktop] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const trailXSpring = useSpring(trailX, { damping: 20, stiffness: 200 })
  const trailYSpring = useSpring(trailY, { damping: 20, stiffness: 200 })
  
  const trailIdRef = useRef(0)
  const trailIntervalRef = useRef<number | null>(null)

  // Check if device supports mouse (desktop)
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.matchMedia('(pointer: fine)').matches && !('ontouchstart' in window))
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const resetMagneticElements = () => {
      const magneticElements = document.querySelectorAll('[data-magnetic="true"]')
      magneticElements.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.transition = 'transform 0.3s ease-out'
        htmlElement.style.transform = 'translate(0, 0)'
      })
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setIsHoveringButton(false)
      setIsHoveringLink(false)
      setCursorText('')
      resetMagneticElements()
    }

    // Handle hoverable elements
    const handleElementMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for buttons
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a[href]')
      ) {
        setIsHoveringButton(true)
      }
      
      // Check for links
      if (target.tagName === 'A' || target.closest('a')) {
        setIsHoveringLink(true)
        const link = target.closest('a') as HTMLAnchorElement
        if (link && link.dataset.cursorText) {
          setCursorText(link.dataset.cursorText)
        } else if (link?.href) {
          setCursorText('Open →')
        }
      }
      
      // Check for magnetic elements
      if (target.dataset.magnetic === 'true') {
        setIsHoveringButton(true)
      }
    }

    const handleElementMouseLeave = () => {
      setIsHoveringButton(false)
      setIsHoveringLink(false)
      setCursorText('')
    }

    // Create cursor trail particles
    const createTrail = () => {
      trailIntervalRef.current = window.setInterval(() => {
        setTrail((prev) => {
          const newTrail: CursorTrail[] = [
            ...prev,
            {
              id: trailIdRef.current++,
              x: cursorX.get(),
              y: cursorY.get(),
              timestamp: Date.now(),
            },
          ]
          
          // Keep only recent particles (last 20)
          return newTrail
            .filter((particle) => Date.now() - particle.timestamp < 500)
            .slice(-20)
        })
      }, 50)
    }

    // Magnetic effect for buttons
    const handleMagneticMove = (e: MouseEvent) => {
      const magneticElements = document.querySelectorAll('[data-magnetic="true"]')
      
      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const distance = Math.sqrt(x * x + y * y)
        const maxDistance = 100
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const moveX = x * force * 0.25
          const moveY = y * force * 0.25
          
          const htmlElement = element as HTMLElement
          htmlElement.style.transform = `translate(${moveX}px, ${moveY}px)`
          htmlElement.style.transition = 'transform 0.1s ease-out'
        } else {
          const htmlElement = element as HTMLElement
          htmlElement.style.transition = 'transform 0.3s ease-out'
          htmlElement.style.transform = 'translate(0, 0)'
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleMagneticMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleElementMouseEnter)
    document.addEventListener('mouseout', handleElementMouseLeave)
    
    createTrail()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleMagneticMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleElementMouseEnter)
      document.removeEventListener('mouseout', handleElementMouseLeave)
      if (trailIntervalRef.current) {
        clearInterval(trailIntervalRef.current)
      }
      resetMagneticElements()
    }
  }, [cursorX, cursorY, trailX, trailY, isDesktop])

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className={`rounded-full transition-all duration-300 ${
            isHoveringButton || isHoveringLink
              ? 'bg-cyan-400 scale-150'
              : isHovering
              ? 'bg-white scale-100'
              : 'bg-transparent scale-0'
          }`}
          animate={{
            width: isHoveringButton || isHoveringLink ? 60 : isHovering ? 20 : 0,
            height: isHoveringButton || isHoveringLink ? 60 : isHovering ? 20 : 0,
            opacity: isHovering || isHoveringButton || isHoveringLink ? 1 : 0,
          }}
        >
          {cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-slate-900 whitespace-nowrap"
            >
              {cursorText}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-cyan-400/50"
          animate={{
            opacity: isHovering ? 0.6 : 0,
            scale: isHovering ? 1 : 0,
          }}
        />
      </motion.div>

      {/* Particle Trail */}
      {trail.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997] w-1 h-1 rounded-full bg-cyan-400"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0.8,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          style={{
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}

      {/* Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className={`rounded-full ${
            isHoveringButton || isHoveringLink
              ? 'bg-cyan-400/20'
              : 'bg-cyan-400/10'
          } blur-xl`}
          animate={{
            width: isHoveringButton || isHoveringLink ? 80 : isHovering ? 40 : 0,
            height: isHoveringButton || isHoveringLink ? 80 : isHovering ? 40 : 0,
            opacity: isHovering || isHoveringButton || isHoveringLink ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </motion.div>

      {/* Hide default cursor on desktop only */}
      {isDesktop && (
        <style>{`
          * {
            cursor: none !important;
          }
        `}</style>
      )}
    </>
  )
}

