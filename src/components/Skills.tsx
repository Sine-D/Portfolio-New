import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import {
  Hover3D,
  ExtrudedText3D,
} from './ThreeD'
import TechMarquee from './TechMarquee'

export default function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="skills" ref={ref} className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Hover3D intensity={10}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <ExtrudedText3D className="text-gradient">Skills</ExtrudedText3D>
            </h2>
          </Hover3D>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Infinite Tech Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16"
        >
          <TechMarquee />
        </motion.div>
      </div>
    </section>
  )
}

