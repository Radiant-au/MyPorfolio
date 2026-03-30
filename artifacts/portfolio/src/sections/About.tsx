import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

export function About() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-sky-500 opacity-60" />
            <span className="text-sky-400 text-sm font-medium tracking-widest uppercase">About</span>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Crafting digital
                <span className="gradient-text-sky"> experiences</span> that matter
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 text-base">
                Radiant is a full-stack developer focused on building scalable web applications,
                backend architecture, and cloud-based systems.
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Passionate about engineering clean systems, automation, and intelligent software.
                From designing efficient database schemas to deploying containerized microservices —
                every layer of the stack is a canvas for thoughtful engineering.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { label: "Projects", value: "10+" },
                  { label: "Years Coding", value: "3+" },
                  { label: "Technologies", value: "20+" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card rounded-xl p-4 text-center glow-border-sky">
                    <div className="text-2xl font-bold gradient-text-sky">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-card rounded-2xl p-8 glow-border-violet relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10"
                  style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />

                <div className="space-y-5">
                  {[
                    { icon: "⚡", title: "Performance First", desc: "Optimized systems that scale under pressure" },
                    { icon: "🏗️", title: "Clean Architecture", desc: "Maintainable, well-structured codebases" },
                    { icon: "🌐", title: "Cloud Native", desc: "AWS, Docker, CI/CD pipelines" },
                    { icon: "🤖", title: "AI Integration", desc: "LSTM models, time-series forecasting" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="text-xl flex-shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <div className="text-white font-medium text-sm">{item.title}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
