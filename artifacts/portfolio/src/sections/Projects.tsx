import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const projects = [
  {
    title: "HR Management System",
    description:
      "Fullstack HR platform with authentication, employee management, attendance tracking, and an admin dashboard. Built to handle enterprise-scale HR operations.",
    tags: ["React", "Node.js", "PostgreSQL", "Express", "TypeORM"],
    icon: "👥",
    color: "#38bdf8",
    demoUrl: null,
    githubUrl: "#",
  },
  {
    title: "Voting Platform",
    description:
      "Secure voting system supporting large-scale participation with real-time vote analytics and a comprehensive admin panel for election management.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    icon: "🗳️",
    color: "#a78bfa",
    demoUrl: null,
    githubUrl: "#",
  },
  {
    title: "QR Shop System",
    description:
      "Retail system using QR scanning for seamless product interactions. Enables instant checkout, product info lookup, and inventory management via QR codes.",
    tags: ["React", "Node.js", "MongoDB", "REST API"],
    icon: "📱",
    color: "#34d399",
    demoUrl: null,
    githubUrl: "#",
  },
  {
    title: "Flood Risk AI Predictor",
    description:
      "Combines satellite rainfall data and river discharge data with time-series LSTM forecasting to predict flood risk with high accuracy for early warning systems.",
    tags: ["Python", "LSTM", "TensorFlow", "Time-series", "AWS"],
    icon: "🌊",
    color: "#fb923c",
    demoUrl: null,
    githubUrl: "#",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card rounded-2xl overflow-hidden cursor-default group relative flex flex-col"
      style={{
        border: `1px solid ${hovered ? project.color + "35" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 0 40px ${project.color}15, 0 0 80px ${project.color}08` : "none",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      {/* Preview area */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color}10, transparent 70%)`,
        }}
      >
        <motion.div
          animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="text-6xl select-none"
        >
          {project.icon}
        </motion.div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color}15, transparent 60%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{
                background: `${project.color}12`,
                color: project.color,
                border: `1px solid ${project.color}20`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                color: project.color,
              }}
            >
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-sky-500 opacity-60" />
              <span className="text-sky-400 text-sm font-medium tracking-widest uppercase">Projects</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-sky-500 opacity-60" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="gradient-text-sky">Work</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              Real-world systems built with modern architecture and engineering best practices
            </p>
          </motion.div>

          {inView && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
