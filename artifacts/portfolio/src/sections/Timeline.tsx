import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const timelineItems = [
  {
    year: "2022",
    title: "The Beginning",
    description:
      "Started learning programming and computer science fundamentals. First steps into HTML, CSS, JavaScript and the world of software engineering.",
    color: "#38bdf8",
    icon: "🌱",
  },
  {
    year: "2023",
    title: "Full-Stack Foundations",
    description:
      "Built first full-stack applications using React and Node.js. Learned database design, REST APIs, and deployed real projects that users interacted with.",
    color: "#a78bfa",
    icon: "🚀",
  },
  {
    year: "2024",
    title: "Systems & Scale",
    description:
      "Developed scalable backend systems and database architectures. Deep dived into PostgreSQL, TypeORM, and microservice patterns.",
    color: "#34d399",
    icon: "⚡",
  },
  {
    year: "2025",
    title: "Cloud & Intelligence",
    description:
      "Exploring cloud engineering with AWS and Docker. Experimenting with AI forecasting systems, LSTM models, and intelligent automation.",
    color: "#fb923c",
    icon: "🤖",
  },
];

function TimelineItem({
  item,
  index,
  inView,
}: {
  item: typeof timelineItems[0];
  index: number;
  inView: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"} relative`}
    >
      {/* Card */}
      <div className="flex-1">
        <div
          className="glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300"
          style={{
            border: `1px solid ${item.color}20`,
            boxShadow: `0 0 20px ${item.color}08`,
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <div
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: item.color }}
              >
                {item.year}
              </div>
              <div className="text-white font-semibold">{item.title}</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className="flex-shrink-0 relative z-10">
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
          className="w-4 h-4 rounded-full"
          style={{
            background: item.color,
            boxShadow: `0 0 12px ${item.color}80, 0 0 24px ${item.color}40`,
          }}
        />
      </div>

      {/* Empty space for opposite side */}
      <div className="flex-1" />
    </motion.div>
  );
}

export function Timeline() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="journey" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-violet-500 opacity-60" />
              <span className="text-violet-400 text-sm font-medium tracking-widest uppercase">Journey</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-violet-500 opacity-60" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Engineering <span className="gradient-text-violet">Journey</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              The path from curious beginner to seasoned full-stack engineer
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] origin-top"
              style={{
                background: "linear-gradient(to bottom, #38bdf8, #a78bfa, #34d399, #fb923c)",
                opacity: 0.4,
              }}
            />

            <div className="flex flex-col gap-12">
              {timelineItems.map((item, index) => (
                <TimelineItem key={item.year} item={item} index={index} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
