import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiAward, FiCode, FiTrendingUp, FiUsers, FiTarget } from 'react-icons/fi'
import {
  Hover3D,
  ExtrudedText3D,
} from './ThreeD'

interface Stat {
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon: any
  color: string
}

interface Certification {
  name: string
  issuer: string
  date: string
  credentialId?: string
  link?: string
  icon: any
}


const stats: Stat[] = [
  { label: 'Projects Completed', value: 20, suffix: '+', icon: FiCode, color: '#06b6d4' },
  { label: 'Happy Clients', value: 20, suffix: '+', icon: FiUsers, color: '#10b981' },
  { label: 'Years Experience', value: 2, suffix: '+', icon: FiTrendingUp, color: '#8b5cf6' },
  { label: 'Success Rate', value: 98, suffix: '%', icon: FiTarget, color: '#f59e0b' },
]

const certifications: Certification[] = [
  {
    name: 'BSc (Hons) in Information Technology Specialising in Software Engineering',
    issuer: 'Sri Lanka Institute of Information Technology',
    date: '2023 - Present',

    icon: FiAward,
  },
  {
    name: 'Career Essentials in Generative AI by Microsoft and LinkedIn',
    issuer: 'Microsoft',
    date: '2025',

    icon: FiAward,
  },
  {
    name: 'Career Essentials in Cybersecurity by Microsoft and LinkedIn',
    issuer: 'Microsoft',
    date: '2025',
    icon: FiAward,
  },
  {
    name: 'Career Essentials in Software Development by Microsoft and LinkedIn',
    issuer: 'Microsoft',
    date: '2025',
    icon: FiAward,
  },
  {
    name: 'Foundations of Web Development: CSS, Bootstrap, JS, React',
    issuer: 'Udemy',
    date: '2025',
    icon: FiAward,
  },
  {
    name: 'Microsoft Azure AI Essentials Professional Certificate by Microsoft and LinkedIn',
    issuer: 'Microsoft',
    date: '2025',
    icon: FiAward,
  },
  {
    name: 'Professional Certificate in SQL and SQL for Data Analysis',
    issuer: 'Udemy',
    date: '2025',
    icon: FiAward,
  },
  {
    name: 'Python Complete Course For Beginners',
    issuer: 'Udemy',
    date: '2025',
    icon: FiAward,
  },
  {
    name: 'Python for Beginners',
    issuer: 'University of Moratuwa',
    date: '2025',
    icon: FiAward,
  },
]

// Animated Counter Hook
function useCountUp(end: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(startValue + (end - startValue) * easeOutQuart))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, inView])

  return count
}

// Stat Card Component
function StatCard({ stat, inView, index }: { stat: Stat; inView: boolean; index: number }) {
  const count = useCountUp(stat.value, 2000, inView)
  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="glass rounded-2xl p-8 text-center group relative overflow-hidden"
    >
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 -z-10 blur-xl" />

      <div className="flex justify-center mb-6">
        <div
          className="p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: `${stat.color}20` }}
        >
          <Icon className="text-4xl" style={{ color: stat.color }} />
        </div>
      </div>
      <div className="text-5xl font-bold mb-3" style={{ color: stat.color }}>
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="text-white/70 text-base font-medium">{stat.label}</div>

      {/* Animated background accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${stat.color}, transparent)` }} />
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="achievements" ref={ref} className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Hover3D intensity={10}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Achievements & <ExtrudedText3D className="text-gradient">Stats</ExtrudedText3D>
            </h2>
          </Hover3D>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Track record of excellence and continuous growth
          </p>
        </motion.div>

        {/* Stats Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} inView={inView} index={index} />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold mb-10 text-center">
            <span className="text-gradient">Certifications</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
                >
                  {/* Gradient accent */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 -z-10" />

                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                      <Icon className="text-4xl text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-center group-hover:text-cyan-400 transition-colors">{cert.name}</h4>
                  <p className="text-sm text-white/70 text-center mb-1">{cert.issuer}</p>
                  <p className="text-xs text-white/50 text-center mb-3">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-cyan-400/70 text-center font-mono bg-white/5 rounded px-2 py-1">
                      {cert.credentialId}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

