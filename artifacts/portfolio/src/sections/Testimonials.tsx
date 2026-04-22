import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  accent: "sky" | "violet" | "emerald" | "amber" | "rose";
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Engineering Manager",
    company: "Stripe",
    text: "Radiant shipped our internal HR platform in half the time we estimated. His attention to system design and clean APIs is rare.",
    avatar: "SC",
    accent: "sky",
  },
  {
    name: "Marcus Webb",
    role: "CTO",
    company: "Lumenstack",
    text: "One of the most thoughtful full-stack engineers I've worked with. He turned a vague brief into a production system that scales.",
    avatar: "MW",
    accent: "violet",
  },
  {
    name: "Aisha Patel",
    role: "Product Lead",
    company: "Voltic Labs",
    text: "He doesn't just write code, he challenges decisions that improve the product. The voting platform launch was flawless.",
    avatar: "AP",
    accent: "emerald",
  },
  {
    name: "Daniel Okafor",
    role: "Founder",
    company: "QRShop",
    text: "Radiant rebuilt our checkout from the ground up. Conversions jumped 34% the first month. Worth every cent.",
    avatar: "DO",
    accent: "amber",
  },
  {
    name: "Elena Rossi",
    role: "ML Engineer",
    company: "ClimateAI",
    text: "His work on the flood-risk predictor combined solid ML pipelines with a UI that actually made sense to non-technical users.",
    avatar: "ER",
    accent: "rose",
  },
  {
    name: "Jordan Kim",
    role: "Senior Designer",
    company: "Frame Studio",
    text: "Pixel-perfect handoffs, smooth animations, no compromises. Working with him made the entire design team faster.",
    avatar: "JK",
    accent: "sky",
  },
  {
    name: "Priya Nair",
    role: "Tech Lead",
    company: "Northwind",
    text: "Excellent communicator. Documents thoroughly, mentors junior devs, and ships reliably under tight deadlines.",
    avatar: "PN",
    accent: "violet",
  },
  {
    name: "Tom Bauer",
    role: "VP Engineering",
    company: "Helio",
    text: "Radiant rearchitected our cloud infra and cut our AWS bill by 40%. He sees three steps ahead of most engineers.",
    avatar: "TB",
    accent: "emerald",
  },
  {
    name: "Maya Singh",
    role: "Product Manager",
    company: "Drift Co.",
    text: "Reliable, proactive, and genuinely cares about the user. Easy 10/10 hire — would bring him onto every project.",
    avatar: "MS",
    accent: "amber",
  },
  {
    name: "Liam O'Connor",
    role: "Co-founder",
    company: "Mintly",
    text: "We went from idea to launch in 6 weeks because of Radiant. He's the kind of engineer that makes startups possible.",
    avatar: "LO",
    accent: "rose",
  },
];

const accentMap = {
  sky:     { from: "#38bdf8", to: "#0ea5e9", glow: "rgba(56,189,248,0.35)" },
  violet:  { from: "#a78bfa", to: "#7c3aed", glow: "rgba(167,139,250,0.35)" },
  emerald: { from: "#34d399", to: "#059669", glow: "rgba(52,211,153,0.30)" },
  amber:   { from: "#fbbf24", to: "#d97706", glow: "rgba(251,191,36,0.30)" },
  rose:    { from: "#fb7185", to: "#e11d48", glow: "rgba(251,113,133,0.30)" },
};

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  const a = accentMap[t.accent];
  return (
    <div
      className="relative w-[340px] sm:w-[380px] flex-shrink-0 rounded-2xl p-6 mx-3 group transition-all duration-300"
      style={{
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 40px ${a.glow}, inset 0 0 1px ${a.glow}` }}
      />

      {/* Quote mark */}
      <div
        className="absolute top-4 right-5 text-5xl leading-none font-serif opacity-20"
        style={{ color: a.from }}
      >
        ”
      </div>

      <StarRow />

      <p className="mt-3 text-sm text-gray-300 leading-relaxed min-h-[88px]">
        “{t.text}”
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
            color: "#0f172a",
            boxShadow: `0 0 12px ${a.glow}`,
          }}
        >
          {t.avatar}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">{t.name}</div>
          <div className="text-xs text-gray-500 truncate">
            {t.role} · <span style={{ color: a.from }}>{t.company}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Marquee({
  items,
  direction = "left",
  speed = 40,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate so the loop is seamless
  const looped = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-3">
      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #020818, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #020818, transparent)" }}
      />

      <motion.div
        className="flex w-max"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {looped.map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  // Split into two rows for visual rhythm
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(5);

  return (
    <section id="github" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 border border-sky-400/20 text-sky-400 bg-sky-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Words from{" "}
            <span className="gradient-text-sky glow-sky">people I've built with</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A few notes from teammates, founders, and collaborators across the projects I've shipped.
          </p>
        </motion.div>
      </div>

      {/* Marquees - full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-2"
      >
        <Marquee items={row1} direction="left"  speed={45} />
        <Marquee items={row2} direction="right" speed={50} />
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-4"
      >
        {[
          { value: "50+", label: "Projects shipped" },
          { value: "4.9/5", label: "Average client rating" },
          { value: "100%", label: "On-time delivery" },
        ].map((s) => (
          <div
            key={s.label}
            className="text-center p-5 rounded-xl"
            style={{
              background: "rgba(15,23,42,0.5)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="text-2xl md:text-3xl font-bold gradient-text-sky">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
