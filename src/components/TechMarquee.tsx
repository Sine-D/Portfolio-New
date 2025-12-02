import { motion } from 'framer-motion'
import {
    SiReact,
    SiTypescript,
    SiJavascript,
    SiNodedotjs,
    SiTailwindcss,
    SiGit,
    SiFigma,
    SiMongodb,
    SiPython,
    SiNextdotjs,
    SiC,
    SiCplusplus,
    SiCsharp,
    SiMysql,
    SiChartdotjs,
    SiHtml5,
    SiCss3,
    SiPhp,
    SiExpress,
} from 'react-icons/si'
import { DiJava } from 'react-icons/di'

const skills = [
    { name: 'React', icon: SiReact, color: '#61dafb' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572b6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express.js', icon: SiExpress, color: '#000000' },
    { name: 'Python', icon: SiPython, color: '#3776ab' },
    { name: 'PHP', icon: SiPhp, color: '#777bb4' },
    { name: 'C', icon: SiC, color: '#a8b9cc' },
    { name: 'C++', icon: SiCplusplus, color: '#00599c' },
    { name: 'C#', icon: SiCsharp, color: '#239120' },
    { name: 'Java', icon: DiJava, color: '#007396' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
    { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
    { name: 'Chart.js', icon: SiChartdotjs, color: '#ff6384' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Git', icon: SiGit, color: '#f05032' },
    { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
]

export default function TechMarquee() {
    return (
        <div className="relative w-full overflow-hidden py-10">


            <div className="flex">
                <motion.div
                    className="flex gap-16 items-center flex-nowrap px-8"
                    animate={{
                        x: [0, -1920], // Adjust based on content width
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Duplicate list 3 times to ensure seamless infinite scroll */}
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div
                            key={`${skill.name}-${index}`}
                            className="group flex flex-col items-center justify-center gap-3 min-w-[100px] cursor-pointer"
                        >
                            <div className="relative p-4 rounded-xl transition-all duration-300">
                                <skill.icon
                                    className="text-5xl transition-all duration-300 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                    style={{ color: skill.color }}
                                />
                            </div>
                            <span className="text-sm font-medium text-white/40 group-hover:text-white transition-colors duration-300">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
