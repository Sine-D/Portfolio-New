import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub, FiX, FiPlus, FiMinus } from 'react-icons/fi'
import { SectionTransition } from './PageTransition'
import { ParallaxElement } from './ParallaxSection'
import { useDragScroll } from '../hooks/useDragScroll'
import {
  Hover3D,
  ImageTilt3D,
} from './ThreeD'

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  demo: string
  featured: boolean
  category: string
  videoUrl?: string
  caseStudy?: {
    challenge: string
    solution: string
    results: string
    technologies: string[]
  }
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Invoice & Report System',
    description: 'A modern Invoicing & Reports solution with real-time inventory management, payment integration, and admin dashboard.',
    tech: ['Next.js', 'Node.js', 'SQL'],
    image: 'https://zegal.com/wp-content/uploads/2023/08/Legal-Invoicing-Software-1024x602.jpg',
    github: 'https://github.com/Sine-D/Report-System',
    demo: '',
    featured: true,
    category: 'Web App',
    videoUrl: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4',
    caseStudy: {
      challenge: 'Build a scalable e-commerce platform with real-time inventory tracking and secure payment processing.',
      solution: 'Developed a full-stack application using React for the frontend, Node.js for the backend, MongoDB for data storage, and integrated Stripe for secure payments.',
      results: 'Increased conversion rate by 40% and reduced checkout time by 60%.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'JWT'],
    },
  },
  {
    id: 2,
    title: 'Medical Center Management System',
    description: 'A modern Medical Center Management System with inventory, payment, laborotory, supplier management and admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Express.js'],
    image: 'https://sellbery.com/wp-content/uploads/2024/12/how-to-build-a-comprehensive-hospital-management.png',
    github: 'https://github.com/Sine-D/Medicura',
    demo: 'https://example.com',
    featured: true,
    category: 'Web App',
    caseStudy: {
      challenge: 'Create a comprehensive analytics dashboard for managing multiple social media accounts.',
      solution: 'Built a real-time dashboard using React and TypeScript with Chart.js for visualizations and Firebase for real-time data synchronization.',
      results: 'Improved user engagement tracking by 50% and reduced data loading time by 70%.',
      technologies: ['React', 'TypeScript', 'Chart.js', 'Firebase', 'Material-UI'],
    },
  },
  {
    id: 3,
    title: 'Expenses Tracker',
    description: 'A modern Expenses Tracker with real-time money management and user dashboard .',
    tech: ['C#', 'SQL', '.Net', 'Windows Forms'],
    image: 'https://www.moneypatrol.com/moneytalk/wp-content/uploads/2023/06/budget185.png',
    github: 'https://github.com/Sine-D/Expenses-Tracker',
    demo: 'https://example.com',
    featured: false,
    category: 'Desktop App',
    caseStudy: {
      challenge: 'Develop a collaborative task management tool with real-time updates and intuitive drag-and-drop functionality.',
      solution: 'Created a full-featured app using React with Redux for state management, WebSockets for real-time collaboration, and PostgreSQL for reliable data storage.',
      results: 'Increased team productivity by 35% and improved task completion rate by 45%.',
      technologies: ['React', 'Redux', 'WebSockets', 'PostgreSQL', 'Socket.io'],
    },
  },
  {
    id: 4,
    title: 'Habits Tracking & Meditation App',
    description: 'A modern Habits Tracking & Meditation App with real-time habits tracking and user dashboard .',
    tech: ['Kotlin', 'Shared Preferences', 'Android', 'SQLite'],
    image: 'https://techcrunch.com/wp-content/uploads/2020/02/Screen-Shot-2020-02-10-at-11.44.06-AM.png?resize=668,433',
    github: 'https://github.com/Sine-D/Habito',
    demo: 'https://example.com',
    featured: false,
    category: 'Mobile',
    videoUrl: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4',
  },
  {
    id: 5,
    title: 'T-Shirt Design App',
    description: 'A modern T-Shirt Design App with T-Shirt design and selling features .',
    tech: ['Kotlin', 'Android'],
    image: 'https://www.sapphiresolutions.net/images/tshirt_printing_app_development_services/images/t_shirt_printing_app_banner.svg',
    github: 'https://github.com/Sine-D/Teezy',
    demo: 'https://example.com',
    featured: false,
    category: 'Mobile',
  },
  {
    id: 6,
    title: 'Snake Game',
    description: 'A modern Snake Game with Java and Windows Forms with best user performance .',
    tech: ['Java', 'Windows Forms', 'Swing library'],
    image: 'https://www.culinaryschools.org/screenshots/snake-challenge.png',
    github: 'https://github.com/Sine-D/Java-Snake-Game',
    demo: 'https://example.com',
    featured: false,
    category: 'Desktop App',
  },
  {
    id: 7,
    title: 'Mobile Invoice App',
    description: 'A modern Mobile Invoice App with Real-time inventory management.',
    tech: ['React-Native', 'SQLite'],
    image: 'https://images.yourstory.com/cs/1/b9c4b0f0-14cc-11e9-8866-4bab3c90f0c7/mobile-invoice-app1553852071584.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75',
    github: 'https://github.com/Sine-D/Mobile-Invoice',
    demo: 'https://example.com',
    featured: false,
    category: 'Mobile',
  },
  {
    id: 8,
    title: 'Video Browsing Website',
    description: 'A modern Video Browsing Website with Real-time video experience.',
    tech: ['Java', 'Html', 'Css', 'JavaScript'],
    image: 'https://i.pinimg.com/originals/b9/5a/e8/b95ae8f419155dca624f7bb84b8d485f.jpg',
    github: 'https://github.com/Sine-D/Video-Browsing-Website',
    demo: 'https://example.com',
    featured: false,
    category: 'Website',
  },
  {
    id: 9,
    title: 'To-Do List',
    description: 'A modern To-Do List with Real-time daily tasks management and user dashboard .',
    tech: ['Html', 'Css', 'JavaScript'],
    image: 'https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/15/main/xXMabYYezGITsPPA8PduAZXEmXvz0Xr71FEQGqy4.png',
    github: 'https://github.com/Sine-D/To-Do-List',
    demo: 'https://example.com',
    featured: false,
    category: 'Web App',
  },
  {
    id: 10,
    title: 'Petty Cash Management App',
    description: 'A modern Petty Cash Management App with Real-time cash transactions.',
    tech: ['Html', 'Css', 'JavaScript'],
    image: 'https://ksvl.co.in/assets/img/petty.jpg',
    github: 'https://github.com/Sine-D/Petty-Cash',
    demo: 'https://example.com',
    featured: false,
    category: 'Web App',
  },
  {
    id: 11,
    title: 'Speech AI',
    description: 'A modern Speech AI with Real-time voice to text web application with best user experience .',
    tech: ['Html', 'Css', 'JavaScript'],
    image: 'https://www.shutterstock.com/image-illustration/ai-speaks-letters-texttospeech-tts-600nw-2252053125.jpg',
    github: 'https://github.com/Sine-D/Speech-AI',
    demo: 'https://example.com',
    featured: false,
    category: 'Web App',
  },
  {
    id: 12,
    title: 'Attendance Marking App',
    description: 'A modern Attendance Marking App with Real-time attendance marking and leave management .',
    tech: ['React.js', 'Node.js', 'MongoDB', 'JavaScript'],
    image: 'https://www.deltasalesapp.com/assets/images/deltaSalesApp/Solutions/Slider/Mark%20Attendance%20_%20Leaves.png',
    github: 'https://github.com/Sine-D/Attendance-Marking',
    demo: 'https://example.com',
    featured: false,
    category: 'Web App',
  },
]



export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [caseStudyModal, setCaseStudyModal] = useState<Project | null>(null)
  const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null)
  const { containerRef, isDragging, dragHandlers } = useDragScroll<HTMLDivElement>()

  const featuredProjects = projects.filter((p) => p.featured)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  const openLightbox = (image: string, title: string) => {
    setLightbox({ image, title })
    setZoom(1.1)
  }

  const closeLightbox = () => {
    setLightbox(null)
    setZoom(1)
  }

  const adjustZoom = (delta: number) => {
    setZoom((prev) => Math.min(3, Math.max(0.8, prev + delta)))
  }

  const openCaseStudy = (project: Project) => {
    setCaseStudyModal(project)
  }





  return (
    <section id="projects" ref={ref} className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            A showcase of my recent work and creative solutions
          </p>



          {/* Featured Projects Stack */}
          {featuredProjects.length > 0 && (
            <div className="mb-32 space-y-32">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } gap-8 md:gap-16 items-center`}
                >
                  {/* Image Section */}
                  <div className="w-full md:w-3/5 perspective-1000">
                    <Hover3D intensity={5}>
                      <div
                        className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-2xl shadow-cyan-500/10"
                        onClick={() => openCaseStudy(project)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mix-blend-overlay z-10" />
                        <ImageTilt3D
                          src={project.image}
                          alt={project.title}
                          className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700"
                          intensity={10}
                        />


                      </div>
                    </Hover3D>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-2/5 relative">
                    <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? '-right-20' : '-left-20'} w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10`} />

                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-cyan-400 font-mono text-sm tracking-wider">0{index + 1}</span>
                        <div className="h-px w-12 bg-cyan-500/30"></div>
                        <span className="text-white/50 text-sm uppercase tracking-widest">{project.category}</span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-left">
                        {project.title}
                      </h3>

                      <p className="text-white/70 text-lg leading-relaxed mb-8 text-left">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.tech.map((t) => (
                          <span key={t} className="px-4 py-2 text-sm glass rounded-full text-cyan-300 border border-cyan-500/20">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4">




                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 glass rounded-xl text-white hover:text-cyan-400 transition-colors"
                          aria-label="View Source"
                        >
                          <FiGithub size={24} />
                        </motion.a>

                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <ParallaxElement speed={0.1}>
          <div
            ref={containerRef}
            {...dragHandlers}
            className={`drag-scroll -mx-4 px-4 pb-4 flex gap-6 overflow-x-auto snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:mx-0 md:px-0 md:pb-0 ${isDragging ? 'dragging' : ''
              }`}
            style={{ touchAction: 'pan-y' }}
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="skeleton-card w-72 flex-shrink-0 snap-center md:w-auto md:flex-shrink-0 md:snap-none p-6 space-y-4"
                >
                  <div className="h-40 w-full rounded-xl bg-white/10" />
                  <div className="h-4 w-2/3 rounded bg-white/10" />
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 rounded-full bg-white/10" />
                    <div className="h-6 w-20 rounded-full bg-white/10" />
                  </div>
                </div>
              ))
              : projects.map((project, index) => (
                <SectionTransition key={project.id} delay={index * 0.1}>
                  <div className="w-[85vw] max-w-sm flex-shrink-0 snap-center md:w-auto md:flex-shrink md:snap-none">
                    <Hover3D intensity={15}>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        whileHover={{ y: -6 }}
                        data-magnetic="true"
                        className={`glass rounded-2xl overflow-hidden group relative card-3d ${project.featured ? 'border border-cyan-500/30' : ''
                          }`}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <button
                          type="button"
                          onClick={() => openLightbox(project.image, project.title)}
                          className="relative h-64 w-full overflow-hidden"
                          aria-label={`Open ${project.title} preview`}
                        >
                          <ImageTilt3D
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full"
                            intensity={20}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">

                          </div>
                        </button>

                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                              {project.title}
                            </h3>
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span key={tech} className="px-3 py-1 text-xs glass rounded-full text-white/80">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-3">

                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              data-magnetic="true"
                              data-cursor-text="GitHub"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="glass-strong p-3 rounded-lg hover:bg-white/30 transition-colors relative icon-hover btn-ripple"
                            >
                              <FiGithub className="text-xl" />
                            </motion.a>

                          </div>
                        </div>
                      </motion.div>
                    </Hover3D>
                  </div>
                </SectionTransition>
              ))}
          </div>
        </ParallaxElement>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-4xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Close preview"
              >
                <FiX size={24} />
              </button>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                <motion.img
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="w-full max-h-[70vh] object-contain"
                  style={{ transform: `scale(${zoom})` }}
                  onWheel={(event) => {
                    event.preventDefault()
                    adjustZoom(event.deltaY < 0 ? 0.1 : -0.1)
                  }}
                />
              </div>
              <div className="mt-6 flex items-center gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => adjustZoom(-0.15)}
                  className="glass px-4 py-2 rounded-full flex items-center gap-2 text-white/80 btn-ripple"
                >
                  <FiMinus /> Zoom out
                </button>
                <button
                  type="button"
                  onClick={() => adjustZoom(0.15)}
                  className="glass px-4 py-2 rounded-full flex items-center gap-2 text-white/80 btn-ripple"
                >
                  <FiPlus /> Zoom in
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-5xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setVideoModal(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Close video"
              >
                <FiX size={24} />
              </button>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                <video
                  src={videoModal.url}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 className="text-2xl font-bold text-white mt-4 text-center">{videoModal.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Modal */}
      <AnimatePresence>
        {caseStudyModal && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCaseStudyModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-4xl w-full p-8 glass-strong rounded-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setCaseStudyModal(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Close case study"
              >
                <FiX size={24} />
              </button>

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold mb-2 text-gradient">{caseStudyModal.title}</h2>
                  <p className="text-white/70">{caseStudyModal.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-cyan-400 font-semibold mb-2">Challenge</h3>
                    <p className="text-white/80 text-sm">{caseStudyModal.caseStudy?.challenge}</p>
                  </div>
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-blue-400 font-semibold mb-2">Solution</h3>
                    <p className="text-white/80 text-sm">{caseStudyModal.caseStudy?.solution}</p>
                  </div>
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-purple-400 font-semibold mb-2">Results</h3>
                    <p className="text-white/80 text-sm">{caseStudyModal.caseStudy?.results}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudyModal.caseStudy?.technologies.map((tech) => (
                      <span key={tech} className="px-4 py-2 glass rounded-full text-white/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.a
                    href={caseStudyModal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white flex items-center gap-2 btn-ripple"
                  >
                    <FiGithub /> View Code
                  </motion.a>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

