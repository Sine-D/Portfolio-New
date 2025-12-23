import { motion } from 'framer-motion'
import { useState } from 'react'

const timeline = [
  {
    year: '2025.12 — Present',
    role: 'Junior Software Engineer',
    company: 'Global Soft Solutions',
    focus: 'Frontend & Backend Development · Web Development',
    description:
      'Developed responsive web applications, implemented accessibility guidelines, and optimized performance.',
  },
  {
    year: '2025.06 — 2025.12',
    role: 'Intern Software Engineer',
    company: 'Global Soft Solutions',
    focus: 'Frontend Development · Web Development',
    description:
      'Developed responsive web applications, implemented accessibility guidelines, and optimized performance.',
  },
  {
    year: '2025.05 — 2025.06',
    role: 'Database Administrator',
    company: '',
    focus: 'Database Management · Security',
    description:
      'Managed database operations, implemented security protocols, and optimized performance.',
  },
]

export default function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Journey</p>
        <h3 className="text-3xl font-semibold text-white mt-2">Experience Timeline</h3>
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-px" />
        <div className="space-y-12">
          {timeline.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <motion.button
                key={item.year}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={`w-full text-left block focus:outline-none`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`md:flex items-start gap-8 ${index % 2 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex items-center gap-4 md:w-1/2">
                    <div className="relative">
                      <span
                        className={`absolute inset-0 rounded-full blur-xl transition-opacity ${isActive ? 'opacity-100 bg-cyan-500/40' : 'opacity-0'
                          }`}
                      />
                      <div
                        className={`w-8 h-8 rounded-full border-2 ${isActive ? 'border-cyan-400 bg-cyan-400/20' : 'border-white/30'
                          } flex items-center justify-center text-xs font-semibold`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-widest text-white/60">{item.year}</p>
                      <h4 className="text-xl font-semibold">{item.role}</h4>
                      <p className="text-white/60 text-sm">{item.company}</p>
                    </div>
                  </div>
                  <motion.div
                    layout
                    className={`md:w-1/2 glass rounded-2xl p-6 mt-6 md:mt-0 ${isActive ? 'border border-cyan-400/40 shadow-lg shadow-cyan-500/10' : ''
                      }`}
                  >
                    <p className="text-sm text-cyan-300 uppercase tracking-widest mb-2">{item.focus}</p>
                    <p className="text-white/80 leading-relaxed">{item.description}</p>
                  </motion.div>
                </motion.div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

