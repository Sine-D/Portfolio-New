import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi'
import { useConfetti } from '../hooks/useConfetti'
import { useTypingAnimation } from '../hooks/useTypingAnimation'

const socials = [
  { icon: FiGithub, href: 'https://github.com/Sine-D', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/sineth-dinsara/', label: 'LinkedIn' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const launchConfetti = useConfetti()
  const roleVariations = ['Product-Focused Developer', 'Full Stack Engineer', 'UI Engineer', 'Creative Technologist']
  const typedRole = useTypingAnimation({ texts: roleVariations, typingSpeed: 90, deletingSpeed: 45 })

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_55%),radial-gradient(circle_at_75%_0%,rgba(99,102,241,0.2),transparent_45%)] opacity-80" />
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-6 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200/70">Sineth Dinsara</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight text-left">
              Transforming Ideas Into Polished, Reliable Web   Applications.
            </h1>
            <p className="text-xl text-cyan-200 font-medium min-h-[32px]">{typedRole || 'Product-Focused Developer'}</p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-justify">
              I build modern, reliable web applications that focus on clarity, speed, and user experience. My work blends thoughtful design with strong engineering practices to create products that feel intuitive and effortless to use. I prioritize clean architecture, maintainable code, and long-term stability. Every project is crafted to help users achieve their goals smoothly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => {
                  launchConfetti()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-white/25 hover:-translate-y-0.5 transition"
              >
                Let's collaborate
                <FiArrowUpRight />
              </button>
            </div>
            <div className="flex gap-6 justify-center lg:justify-start text-white/70">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-2xl hover:text-white transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Interactive 3D Cube */}
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Ambient glow effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <motion.div
              className="relative w-72 h-72 cursor-grab active:cursor-grabbing"
              style={{ perspective: '1200px' }}
              drag
              dragElastic={0.16}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{
                  scale: 1.08,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                {/* Front Face - Profile Photo */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] pointer-events-none overflow-hidden"
                  style={{
                    transform: 'translateZ(144px)',
                    backfaceVisibility: 'visible',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(6, 182, 212, 0.4)',
                    boxShadow: '0 0 60px rgba(6, 182, 212, 0.6)',
                    scale: 1.02,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/profile.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/40 via-transparent to-blue-500/40 rounded-3xl" />
                  </motion.div>
                </motion.div>

                {/* Back Face - Profile Photo 1 */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-purple-400/60 bg-gradient-to-br from-purple-500/30 to-pink-600/30 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)] pointer-events-none overflow-hidden"
                  style={{
                    transform: 'translateZ(-144px) rotateY(180deg)',
                    backfaceVisibility: 'visible',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(168, 85, 247, 0.4)',
                    boxShadow: '0 0 60px rgba(168, 85, 247, 0.6)',
                    scale: 1.02,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/profile.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/40 via-transparent to-pink-500/40 rounded-3xl" />
                  </motion.div>
                </motion.div>

                {/* Right Face - Profile Photo 2 */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-indigo-400/60 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)] pointer-events-none overflow-hidden"
                  style={{
                    transform: 'rotateY(90deg) translateZ(144px)',
                    backfaceVisibility: 'visible',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(99, 102, 241, 0.4)',
                    boxShadow: '0 0 60px rgba(99, 102, 241, 0.6)',
                    scale: 1.02,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/profile2.jpg"
                      alt="Profile 2"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/40 via-transparent to-purple-500/40 rounded-3xl" />
                  </motion.div>
                </motion.div>

                {/* Left Face - Profile Photo 2 */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-pink-400/60 bg-gradient-to-br from-pink-500/30 to-rose-600/30 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.3)] pointer-events-none overflow-hidden"
                  style={{
                    transform: 'rotateY(-90deg) translateZ(144px)',
                    backfaceVisibility: 'visible',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(236, 72, 153, 0.4)',
                    boxShadow: '0 0 60px rgba(236, 72, 153, 0.6)',
                    scale: 1.02,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/profile2.jpg"
                      alt="Profile 2"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 via-transparent to-rose-500/40 rounded-3xl" />
                  </motion.div>
                </motion.div>

                {/* Top Face - Profile Photo 3 */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-blue-400/60 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] pointer-events-none overflow-hidden"
                  style={{
                    transform: 'rotateX(90deg) translateZ(144px)',
                    backfaceVisibility: 'visible',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(59, 130, 246, 0.4)',
                    boxShadow: '0 0 60px rgba(59, 130, 246, 0.6)',
                    scale: 1.02,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/profile3.jpg"
                      alt="Profile 3"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 via-transparent to-cyan-500/40 rounded-3xl" />
                  </motion.div>
                </motion.div>

                {/* Bottom Face - Profile Photo 3 */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-violet-400/60 bg-gradient-to-br from-violet-500/30 to-purple-600/30 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)] pointer-events-none overflow-hidden"
                  style={{
                    transform: 'rotateX(-90deg) translateZ(144px)',
                    backfaceVisibility: 'visible',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(139, 92, 246, 0.4)',
                    boxShadow: '0 0 60px rgba(139, 92, 246, 0.6)',
                    scale: 1.02,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/profile3.jpg"
                      alt="Profile 3"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-500/40 via-transparent to-purple-500/40 rounded-3xl" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/40"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
