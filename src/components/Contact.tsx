import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin } from 'react-icons/fi'
import {
  Hover3D,
  ExtrudedText3D,
} from './ThreeD'
import { SiGithub, SiLinkedin, SiWhatsapp } from 'react-icons/si'

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'sineth1211@gmail.com',
    link: 'mailto:sineth1211@gmail.com',
  },
  {
    icon: SiWhatsapp,
    label: 'WhatsApp',
    value: '0721684342',
    link: 'https://wa.me/94721684342?text=Hi%20Sineth!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Malabe, Sri Lanka',
    link: '#',
  },
]

const socialLinks = [
  { icon: SiGithub, href: 'https://github.com/Sine-D', label: 'GitHub', color: '#ffffff' },
  { icon: SiLinkedin, href: 'https://www.linkedin.com/in/sineth-dinsara/', label: 'LinkedIn', color: '#0A66C2' },
  { icon: SiWhatsapp, href: 'https://wa.me/0721684342', label: 'Whatsapp', color: '#1DA1F2' },

]

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="contact" ref={ref} className="py-20 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Hover3D intensity={10}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-reveal">
              Get In <ExtrudedText3D className="text-gradient">Touch</ExtrudedText3D>
            </h2>
          </Hover3D>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Let's discuss your next project or just say hello
          </p>
        </motion.div>

        {/* Centered Contact Info Card */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-12 relative overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="absolute inset-[1px] bg-slate-900/90 rounded-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                >
                  Let's Connect
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-white/60 leading-relaxed text-lg max-w-lg mx-auto"
                >
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </motion.p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid gap-4 mb-14">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  const colors = [
                    { bg: 'from-cyan-500/20 to-blue-500/20', icon: 'text-cyan-400', glow: 'group-hover:shadow-cyan-500/50' },
                    { bg: 'from-green-500/20 to-emerald-500/20', icon: 'text-green-400', glow: 'group-hover:shadow-green-500/50' },
                    { bg: 'from-purple-500/20 to-pink-500/20', icon: 'text-purple-400', glow: 'group-hover:shadow-purple-500/50' },
                  ]
                  const colorScheme = colors[index % colors.length]

                  return (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r ${colorScheme.bg} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg ${colorScheme.glow}`}
                    >
                      {/* Animated background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                      <div className="relative flex items-center gap-5">
                        <div className={`flex-shrink-0 p-4 rounded-xl bg-white/5 ${colorScheme.icon} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="text-3xl" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">{info.label}</div>
                          <div className="font-bold text-white text-lg truncate">{info.value}</div>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              {/* Social Links */}
              <div>
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                  className="text-xl font-bold mb-8 text-center bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
                >
                  Follow Me
                </motion.h4>
                <div className="flex gap-6 justify-center flex-wrap">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.15, y: -8, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative p-5 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 text-3xl"
                        style={{
                          boxShadow: `0 0 30px ${social.color}20`,
                        }}
                        aria-label={social.label}
                      >
                        {/* Glow effect on hover */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"
                          style={{
                            background: `radial-gradient(circle, ${social.color}40, transparent 70%)`,
                          }}
                        ></div>

                        <Icon className="relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ color: social.color }} />

                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {social.label}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-slate-800"></div>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section >
  )
}
