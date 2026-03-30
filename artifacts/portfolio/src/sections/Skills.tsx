import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const skillCategories = [
  {
    title: "Frontend",
    color: "#38bdf8",
    icon: "🎨",
    skills: ["React", "Next.js", "Tailwind CSS", "PrimeReact", "TypeScript"],
  },
  {
    title: "Backend",
    color: "#a78bfa",
    icon: "⚙️",
    skills: ["Node.js", "Express", "NestJS", "TypeORM", "REST APIs"],
  },
  {
    title: "Database",
    color: "#34d399",
    icon: "🗄️",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "MariaDB"],
  },
  {
    title: "Cloud & DevOps",
    color: "#fb923c",
    icon: "☁️",
    skills: ["AWS", "Docker", "CI/CD", "Linux"],
  },
  {
    title: "AI & Data",
    color: "#f472b6",
    icon: "🤖",
    skills: ["Time-series Forecasting", "Flood Prediction", "LSTM Models"],
  },
];

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 15;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "translateZ(10px)" : ""}`,
        transition: "transform 0.15s ease",
        boxShadow: isHovered ? `0 0 30px ${category.color}20, 0 0 60px ${category.color}10` : "none",
        border: `1px solid ${isHovered ? category.color + "40" : "rgba(255,255,255,0.06)"}`,
      }}
      className="glass-card rounded-2xl p-6 cursor-default"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-white font-semibold text-base">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: `${category.color}12`,
              color: category.color,
              border: `1px solid ${category.color}25`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-violet-500 opacity-60" />
              <span className="text-violet-400 text-sm font-medium tracking-widest uppercase">Skills</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-violet-500 opacity-60" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical <span className="gradient-text-violet">Arsenal</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              A diverse set of technologies for building complete, production-ready systems
            </p>
          </motion.div>

          {inView && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillCategories.map((category, index) => (
                <SkillCard key={category.title} category={category} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
