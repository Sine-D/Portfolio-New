import { useState, useEffect, useRef } from 'react'

const sections = ['home', 'about', 'skills', 'projects', 'testimonials', 'achievements', 'contact']

export function useSwipeNavigation() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scrollToSection = (index: number) => {
    if (isScrolling || index < 0 || index >= sections.length) return

    setIsScrolling(true)
    const sectionId = sections[index]
    const element = document.getElementById(sectionId)
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setCurrentSection(index)
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }

  const goToNext = () => {
    if (currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1)
    }
  }

  const goToPrevious = () => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1)
    }
  }

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return

      const scrollPosition = window.scrollY + window.innerHeight / 2
      const sectionElements = sections.map((id) => document.getElementById(id))
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolling])

  return {
    currentSection,
    goToNext,
    goToPrevious,
    scrollToSection,
    totalSections: sections.length,
  }
}

