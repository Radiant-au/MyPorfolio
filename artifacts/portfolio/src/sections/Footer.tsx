import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-12 px-6 overflow-hidden">
      {/* Gradient divider */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-[1px] mb-10 origin-center"
          style={{
            background: "linear-gradient(90deg, transparent, #38bdf8, #a78bfa, transparent)",
          }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-sm">
              Designed and built by{" "}
              <span className="gradient-text-sky font-semibold">Radiant</span>
            </p>
            <p className="text-gray-700 text-xs mt-1">
              Built with React, Three.js & Framer Motion
            </p>
          </div>

          <div className="flex items-center gap-6">
            {[
              { icon: "📧", href: "mailto:radiant@example.com", label: "Email" },
              { icon: "💻", href: "https://github.com", label: "GitHub" },
              { icon: "🔗", href: "https://linkedin.com", label: "LinkedIn" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-sky-400 transition-colors text-sm flex items-center gap-1.5"
                whileHover={{ y: -2 }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-800 text-xs mt-8">
          © {new Date().getFullYear()} Radiant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
