import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import BottomNavigation from './components/BottomNavigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import LoadingAnimation from './components/LoadingAnimation'
import { useSwipeNavigation } from './hooks/useSwipeNavigation'
import { useTouchGestures } from './hooks/useTouchGestures'
import {
  GradientMesh3D,
  Particle3D,
  Wireframe3D,
  Geometric3D,
} from './components/ThreeD'

function App() {
  const [loading, setLoading] = useState(true)
  const { goToNext, goToPrevious } = useSwipeNavigation()

  const touchHandlers = useTouchGestures({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    threshold: 50,
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LoadingAnimation isLoading={loading}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        {/* Enhanced 3D Background Layers */}
        <GradientMesh3D className="z-0" />
        <Particle3D count={40} className="z-0" />
        <Wireframe3D className="z-0" />
        {/* Optional: Uncomment to add WebGL 3D mesh background */}
        {/* <ThreeDMeshBackground className="z-0 opacity-30" /> */}

        {/* Floating 3D Shapes */}
        <div className="pointer-events-none absolute top-10 right-10 z-0 hidden lg:block">
          <Geometric3D shape="sphere" size={200} color="#06b6d4" />
        </div>
        <div className="pointer-events-none absolute top-1/2 right-1/4 z-0 hidden xl:block">
          <Geometric3D shape="pyramid" size={120} color="#ec4899" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(147,51,234,0.15), transparent 35%)',
          }}
          aria-hidden="true"
        />
        <Navigation />
        <main
          className="relative z-10 pb-20 md:pb-0"
          style={{ scrollSnapType: 'y proximity' }}
          {...touchHandlers}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Testimonials />
          <Achievements />
          <Contact />
        </main>
        <BottomNavigation />
      </div>
    </LoadingAnimation>
  )
}

export default App

