import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { FaQuoteRight } from 'react-icons/fa'
import { Hover3D, ExtrudedText3D } from './ThreeD'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Shanika Perera',
    role: 'Product Manager',
    company: 'LankaTech Solutions',
    rating: 5,
    text: 'Working with this developer was an absolute pleasure. The attention to detail and commitment to quality is unmatched. Our project was delivered on time and exceeded all expectations.',
  },
  {
    id: 2,
    name: 'Milan Fernando',
    role: 'CTO',
    company: 'CeylonStart Innovations',
    rating: 5,
    text: 'Exceptional technical skills combined with great communication. The code quality is outstanding and the solutions provided were innovative and scalable.',
  },
  {
    id: 3,
    name: 'Esha Wijesinghe',
    role: 'Design Lead',
    company: 'Colombo Creative Studio',
    rating: 4,
    text: 'The collaboration was seamless. They understood our vision and brought it to life with beautiful, functional code. Highly recommend for any frontend project.',
  },
  {
    id: 4,
    name: 'Dilshan Jayawardena',
    role: 'Founder',
    company: 'Innovate Lanka Labs',
    rating: 5,
    text: 'Professional, reliable, and incredibly talented. They transformed our MVP into a production-ready application. The best investment we made for our product.',
  },
  {
    id: 5,
    name: 'Lakmini Abeysekera',
    role: 'Engineering Manager',
    company: 'ScaleUp Sri Lanka',
    rating: 4,
    text: 'Outstanding problem-solving abilities and clean code practices. They integrated seamlessly with our team and delivered complex features with ease.',
  },
  {
    id: 6,
    name: 'Janidu Wickramasinghe',
    role: 'CEO',
    company: 'Digital Lanka Solutions',
    rating: 5,
    text: 'The technical expertise and business acumen are impressive. They not only built what we asked for but suggested improvements that saved us time and money.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
        >
          <FiStar
            className={`text-lg ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'
              }`}
          />
        </motion.div>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass rounded-2xl p-8 relative overflow-hidden group h-full flex flex-col"
    >
      {/* Gradient Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 -z-10 blur-xl" />

      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <FaQuoteRight className="text-7xl" />
      </div>

      {/* Rating */}
      <div className="mb-6 relative z-10">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Testimonial Text */}
      <p className="text-white/90 text-base leading-relaxed mb-8 relative z-10 flex-grow text-center">
        "{testimonial.text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold shadow-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
          <p className="text-sm text-white/60">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>

      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-transparent to-purple-500" />
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="testimonials" ref={ref} className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Hover3D intensity={10}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Client <ExtrudedText3D className="text-gradient">Testimonials</ExtrudedText3D>
            </h2>
          </Hover3D>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            What clients say about working with me
          </p>
        </motion.div>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
