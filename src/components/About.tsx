import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { FiCode, FiLayout, FiZap, FiUsers } from 'react-icons/fi'
import { SectionTransition } from './PageTransition'
import { ParallaxElement } from './ParallaxSection'
import ExperienceTimeline from './ExperienceTimeline'
import {
  Hover3D,
  Floating3D,
  ExtrudedText3D,
} from './ThreeD'

const features = [
  {
    icon: FiCode,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code following best practices',
  },
  {
    icon: FiLayout,
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user interfaces',
  },
  {
    icon: FiZap,
    title: 'Performance',
    description: 'Optimized applications for speed and efficiency',
  },
  {
    icon: FiUsers,
    title: 'Collaboration',
    description: 'Working effectively in teams and communicating clearly',
  },
]

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="about" ref={ref} className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Hover3D intensity={10}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <ExtrudedText3D className="text-gradient">About</ExtrudedText3D> Me
            </h2>
          </Hover3D>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            I'm a passionate developer who loves creating amazing digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <ParallaxElement speed={0.15}>
            <SectionTransition delay={0.2}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-4 text-gradient">Who I Am</h3>
                <p className="text-white/70 mb-4 leading-relaxed text-justify">
                  I'm a creative full-stack developer with a passion for building exceptional
                  digital experiences. With expertise in modern web technologies, I transform
                  ideas into beautiful, functional, and user-centered applications.
                </p>
                <p className="text-white/70 mb-4 leading-relaxed text-justify">
                  My journey in web development started with curiosity and has evolved into
                  a career focused on creating innovative solutions that make a difference.
                  I believe in writing clean, maintainable code and staying up-to-date with
                  the latest technologies and best practices.
                </p>
                <p className="text-white/70 leading-relaxed text-justify">
                  When I'm not coding, I enjoy exploring new technologies, contributing to
                  open-source projects, and sharing knowledge with the developer community.
                </p>
              </motion.div>
            </SectionTransition>
          </ParallaxElement>

          <ParallaxElement speed={0.2}>
            <SectionTransition delay={0.4}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 gap-6"
              >
                {features.map((feature, index) => (
                  <Floating3D key={feature.title} depth={20} rotationSpeed={0.5}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass rounded-xl p-6 text-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <feature.icon className="text-4xl text-cyan-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                      <p className="text-white/60 text-sm">{feature.description}</p>
                    </motion.div>
                  </Floating3D>
                ))}
              </motion.div>
            </SectionTransition>
          </ParallaxElement>
        </div>

        {/* Stats */}
        <ParallaxElement speed={0.1}>
          <SectionTransition delay={0.6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { number: '20+', label: 'Projects Completed' },
                { number: '2+', label: 'Years Experience' },
                { number: '20+', label: 'Happy Clients' },
                { number: '100%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="glass rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-white/60">{stat.label}              </div>
                </motion.div>
              ))}
            </motion.div>
          </SectionTransition>
        </ParallaxElement>

        <ExperienceTimeline />
      </div>
    </section>
  )
}

