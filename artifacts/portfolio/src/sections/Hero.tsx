import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export function Hero() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle cursor reactive glow */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          transition: "left 0.12s ease, top 0.12s ease",
        }}
      />

      {/* Bottom vignette so text reads clearly over the space scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(2,8,24,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-5"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.25)",
              color: "#38bdf8",
              backdropFilter: "blur(8px)",
            }}
          >
            Full Stack Engineer
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
        >
          <span className="gradient-text-sky glow-sky">Radiant</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
        >
          I build scalable systems, cloud infrastructure,{" "}
          <br className="hidden md:block" />
          and intelligent software.
        </motion.p>

        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            onClick={() => scrollTo("#projects")}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(56,189,248,0.08))",
              border: "1px solid rgba(56,189,248,0.45)",
              color: "#38bdf8",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 20px rgba(56,189,248,0.15)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(56,189,248,0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
          </motion.button>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide flex items-center gap-2"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#e2e8f0",
              backdropFilter: "blur(10px)",
            }}
            whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </motion.a>

          <motion.button
            onClick={() => scrollTo("#contact")}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide"
            style={{
              background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(167,139,250,0.08))",
              border: "1px solid rgba(167,139,250,0.45)",
              color: "#a78bfa",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 20px rgba(167,139,250,0.1)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(167,139,250,0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            Contact
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => scrollTo("#about")}
          >
            <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-gray-600 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
