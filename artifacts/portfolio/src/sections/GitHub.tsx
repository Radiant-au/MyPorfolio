import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const stats = [
  { label: "Repositories", value: "20+", icon: "📁" },
  { label: "Commits", value: "500+", icon: "✅" },
  { label: "Stars Earned", value: "50+", icon: "⭐" },
  { label: "PRs Merged", value: "80+", icon: "🔀" },
];

const languages = [
  { name: "TypeScript", percentage: 45, color: "#3178c6" },
  { name: "JavaScript", percentage: 25, color: "#f7df1e" },
  { name: "Python", percentage: 18, color: "#3572A5" },
  { name: "CSS/HTML", percentage: 12, color: "#e34c26" },
];

function ContributionGrid() {
  const weeks = 26;
  const days = 7;

  const getIntensity = () => {
    const rand = Math.random();
    if (rand > 0.85) return 4;
    if (rand > 0.65) return 3;
    if (rand > 0.4) return 2;
    if (rand > 0.2) return 1;
    return 0;
  };

  const intensityColors = [
    "rgba(255,255,255,0.05)",
    "rgba(56,189,248,0.2)",
    "rgba(56,189,248,0.4)",
    "rgba(56,189,248,0.6)",
    "rgba(56,189,248,0.9)",
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, d) => {
              const intensity = getIntensity();
              return (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (w * days + d) * 0.003, duration: 0.2 }}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: intensityColors[intensity] }}
                  title={intensity > 0 ? `${intensity} contributions` : "No contributions"}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GitHub() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="github" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-sky-500 opacity-60" />
              <span className="text-sky-400 text-sm font-medium tracking-widest uppercase">Open Source</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-sky-500 opacity-60" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              GitHub <span className="gradient-text-sky">Activity</span>
            </h2>
          </motion.div>

          {inView && (
            <>
              {/* Stats grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="glass-card rounded-xl p-5 text-center glow-border-sky hover:scale-105 transition-transform"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold gradient-text-sky">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contribution graph */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="glass-card rounded-2xl p-8 glow-border-sky mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Contribution Graph</h3>
                  <span className="text-xs text-gray-600">Last 6 months</span>
                </div>
                <ContributionGrid />
                <div className="flex items-center gap-2 mt-4 justify-end">
                  <span className="text-xs text-gray-600">Less</span>
                  {["rgba(255,255,255,0.05)", "rgba(56,189,248,0.2)", "rgba(56,189,248,0.4)", "rgba(56,189,248,0.6)", "rgba(56,189,248,0.9)"].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
                  ))}
                  <span className="text-xs text-gray-600">More</span>
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="glass-card rounded-2xl p-8 glow-border-violet"
              >
                <h3 className="text-white font-semibold mb-6">Top Languages</h3>
                <div className="space-y-4">
                  {languages.map((lang, i) => (
                    <div key={lang.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-400">{lang.name}</span>
                        <span className="text-sm text-gray-500">{lang.percentage}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.percentage}%` }}
                          transition={{ delay: i * 0.1 + 0.5, duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${lang.color}, ${lang.color}99)`,
                            boxShadow: `0 0 8px ${lang.color}50`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
