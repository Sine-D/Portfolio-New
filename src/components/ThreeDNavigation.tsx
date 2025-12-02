import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'

// 3D Page Transition
interface PageTransition3DProps {
  children: ReactNode
  className?: string
  key?: string | number
}

export function PageTransition3D({ children, className = '', key }: PageTransition3DProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        className={className}
        style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
        initial={{ rotateX: 90, opacity: 0, translateZ: -200 }}
        animate={{ rotateX: 0, opacity: 1, translateZ: 0 }}
        exit={{ rotateX: -90, opacity: 0, translateZ: -200 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// 3D Menu Item
interface MenuItem3DProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  active?: boolean
}

export function MenuItem3D({
  children,
  onClick,
  className = '',
  active = false,
}: MenuItem3DProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
      animate={{
        rotateX: hovered ? 5 : 0,
        rotateY: hovered ? 5 : 0,
        translateZ: hovered || active ? 20 : 0,
        scale: hovered ? 1.05 : active ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div style={{ transform: 'translateZ(10px)' }}>{children}</div>
    </motion.div>
  )
}

// 3D Sidebar
interface Sidebar3DProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Sidebar3D({
  isOpen,
  onClose,
  children,
  className = '',
}: Sidebar3DProps) {
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
            className={`fixed top-0 right-0 h-full w-80 glass-strong z-50 ${className}`}
            style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            initial={{ rotateY: 90, opacity: 0, translateZ: -200 }}
            animate={{ rotateY: 0, opacity: 1, translateZ: 0 }}
            exit={{ rotateY: 90, opacity: 0, translateZ: -200 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// 3D Tab Navigation
interface TabNav3DProps {
  tabs: Array<{ label: string; content: ReactNode }>
  activeTab: number
  onTabChange: (index: number) => void
  className?: string
}

export function TabNav3D({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabNav3DProps) {
  return (
    <div className={className} style={{ perspective: '2000px' }}>
      <div className="flex gap-2 mb-4">
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => onTabChange(index)}
            className={`px-6 py-3 rounded-lg font-semibold ${
              activeTab === index ? 'glass-strong' : 'glass'
            }`}
            style={{
              transform: activeTab === index ? 'translateZ(30px)' : 'translateZ(0px)',
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ translateZ: 15, rotateX: 5 }}
            whileTap={{ translateZ: -5 }}
            animate={{
              rotateY: activeTab === index ? 0 : 0,
              scale: activeTab === index ? 1.05 : 1,
            }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
      <motion.div
        key={activeTab}
        initial={{ rotateX: 90, opacity: 0, translateZ: -200 }}
        animate={{ rotateX: 0, opacity: 1, translateZ: 0 }}
        exit={{ rotateX: -90, opacity: 0, translateZ: -200 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="perspective-1000"
      >
        {tabs[activeTab].content}
      </motion.div>
    </div>
  )
}

// 3D Breadcrumb
interface Breadcrumb3DProps {
  items: string[]
  className?: string
  onItemClick?: (index: number) => void
}

export function Breadcrumb3D({
  items,
  className = '',
  onItemClick,
}: Breadcrumb3DProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ perspective: '1000px' }}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-2"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ translateZ: 10, rotateY: 5 }}
        >
          <motion.button
            onClick={() => onItemClick?.(index)}
            className="px-4 py-2 glass rounded-lg"
            style={{ transform: 'translateZ(5px)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.button>
          {index < items.length - 1 && (
            <span className="text-white/40" style={{ transform: 'translateZ(5px)' }}>
              /
            </span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

