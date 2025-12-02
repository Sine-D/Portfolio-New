import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiHome, FiUser, FiCode, FiBriefcase, FiMessageCircle, FiAward, FiMail } from 'react-icons/fi'

const navItems = [
  { name: 'Home', href: '#home', icon: FiHome },
  { name: 'About', href: '#about', icon: FiUser },
  { name: 'Skills', href: '#skills', icon: FiCode },
  { name: 'Projects', href: '#projects', icon: FiBriefcase },
  { name: 'Testimonials', href: '#testimonials', icon: FiMessageCircle },
  { name: 'Achievements', href: '#achievements', icon: FiAward },
  { name: 'Contact', href: '#contact', icon: FiMail },
]

export default function BottomNavigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      for (const item of navItems) {
        const element = document.querySelector(item.href)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(item.href.substring(1))
            break
          }
        }
      }

      // Show/hide based on scroll direction
      const scrollY = window.scrollY
      const lastScrollY = window.sessionStorage.getItem('lastScrollY')
      
      if (lastScrollY) {
        setIsVisible(scrollY < parseInt(lastScrollY))
      } else {
        setIsVisible(true)
      }
      
      window.sessionStorage.setItem('lastScrollY', scrollY.toString())
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    setIsVisible(true) // Show initially

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(href.substring(1))
    }
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="glass-strong border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.substring(1)

              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="flex flex-col items-center gap-1 px-2 py-2 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      color: isActive ? '#06b6d4' : 'rgba(255, 255, 255, 0.6)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="text-xl" />
                  </motion.div>
                  <motion.span
                    className="text-xs font-medium"
                    animate={{
                      color: isActive ? '#06b6d4' : 'rgba(255, 255, 255, 0.6)',
                      scale: isActive ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

