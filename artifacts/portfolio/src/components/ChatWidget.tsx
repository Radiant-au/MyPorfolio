import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
  ts: number;
};

const STORAGE_KEY = "radiant_chat_open";
const SEEN_KEY    = "radiant_chat_seen";

const initialAiMessage: Message = {
  id: "welcome",
  role: "ai",
  text: "Hey! I'm Radiant's AI assistant. Ask me anything about projects, skills, or experience.",
  ts: Date.now(),
};

const cannedResponses = [
  "Radiant is a full-stack engineer focused on scalable web applications and cloud systems.",
  "He's built systems for HR management, secure voting, retail QR shops, and AI-driven flood prediction.",
  "His main stack: React, Next.js, Node.js, NestJS, PostgreSQL, AWS, and Docker.",
  "Feel free to scroll through the portfolio for project details, or reach out via the contact section!",
];

function Avatar({ size = 40, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <div
      className="relative rounded-full flex items-center justify-center font-bold flex-shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #38bdf8, #a78bfa)",
        boxShadow: glow ? "0 0 18px rgba(56,189,248,0.5), 0 0 36px rgba(167,139,250,0.3)" : "none",
        fontSize: size * 0.4,
        color: "#0f172a",
      }}
    >
      R
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2.5 rounded-2xl rounded-bl-sm bg-white/5 w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-sky-400/70"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [messages, setMessages] = useState<Message[]>([initialAiMessage]);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore persisted state on mount
  useEffect(() => {
    try {
      const wasOpen = localStorage.getItem(STORAGE_KEY) === "1";
      const seen = localStorage.getItem(SEEN_KEY) === "1";
      setOpen(wasOpen);
      setHasSeen(seen);
      if (wasOpen) setHasSeen(true);
    } catch {
      /* ignore localStorage errors */
    }
  }, []);

  // Persist open/close state
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, open ? "1" : "0"); } catch { /* noop */ }
  }, [open]);

  // Mark as seen on first open
  useEffect(() => {
    if (open && !hasSeen) {
      setHasSeen(true);
      try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* noop */ }
    }
  }, [open, hasSeen]);

  // Simulate AI initialization on first open
  useEffect(() => {
    if (!open) return;
    setInitializing(true);
    const t = setTimeout(() => setInitializing(false), 1800);
    return () => clearTimeout(t);
  }, [open]);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, aiTyping, initializing]);

  // Focus input when ready
  useEffect(() => {
    if (open && !initializing) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, initializing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || initializing || aiTyping) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAiTyping(true);

    // Simulated AI response
    const reply = cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "ai", text: reply, ts: Date.now() },
      ]);
      setAiTyping(false);
    }, 1100 + Math.random() * 800);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showBadge = !hasSeen && !open;

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-[60] pointer-events-auto">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {/* Pulse rings (only before first open) */}
              {showBadge && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(56,189,248,0.4)" }}
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(167,139,250,0.4)" }}
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                  />
                </>
              )}

              {/* Tooltip */}
              <AnimatePresence>
                {hovering && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                  >
                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium glass-card border border-white/10 text-white shadow-lg">
                      Chat with me
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button */}
              <motion.button
                onClick={() => setOpen(true)}
                className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Open chat"
              >
                <Avatar size={56} glow />

                {/* Notification badge */}
                {showBadge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#0f172a]"
                    style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.6)" }}
                  >
                    1
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="absolute bottom-0 right-0 w-[calc(100vw-3rem)] sm:w-[380px] h-[560px] max-h-[calc(100vh-3rem)] rounded-2xl overflow-hidden flex flex-col origin-bottom-right"
              style={{
                background: "rgba(15, 23, 42, 0.92)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 25px 60px -10px rgba(0,0,0,0.6), 0 0 40px rgba(56,189,248,0.08)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(167,139,250,0.08))",
                }}
              >
                <div className="relative">
                  <Avatar size={38} />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0f172a]"
                    style={{
                      background: initializing ? "#fbbf24" : "#22c55e",
                      boxShadow: initializing
                        ? "0 0 6px rgba(251,191,36,0.6)"
                        : "0 0 6px rgba(34,197,94,0.6)",
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold">AI Assistant</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1.5">
                    {initializing ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-2.5 h-2.5 border border-amber-400 border-t-transparent rounded-full"
                        />
                        Initializing AI…
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Online
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
                  aria-label="Close chat"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
              >
                {initializing ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                    {/* Skeleton initialization */}
                    <div className="relative">
                      <motion.div
                        className="w-12 h-12 rounded-full border-2 border-sky-400/30 border-t-sky-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-1.5 rounded-full border-2 border-violet-400/30 border-b-violet-400"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">Initializing AI…</div>
                      <div className="text-xs text-gray-500 mt-1">Loading model in browser</div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-32 h-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ background: "linear-gradient(90deg, #38bdf8, #a78bfa)" }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <MessageBubble key={msg.id} message={msg} />
                    ))}
                    {aiTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-end gap-2"
                      >
                        <Avatar size={26} />
                        <TypingDots />
                      </motion.div>
                    )}
                  </>
                )}
              </div>

              {/* Input */}
              <div
                className="px-3 py-3 border-t border-white/5 flex-shrink-0"
                style={{ background: "rgba(0,0,0,0.2)" }}
              >
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 transition-colors focus-within:border-sky-400/40"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={initializing}
                    placeholder={
                      initializing ? "Waiting for AI…" : "Ask me anything about my work…"
                    }
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none py-1.5 disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || initializing || aiTyping}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:scale-105"
                    style={{
                      background:
                        input.trim() && !initializing && !aiTyping
                          ? "linear-gradient(135deg, #38bdf8, #a78bfa)"
                          : "rgba(255,255,255,0.06)",
                      color: input.trim() && !initializing && !aiTyping ? "#0f172a" : "#64748b",
                    }}
                    aria-label="Send message"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l14-7-7 14-2-5-5-2z" />
                    </svg>
                  </button>
                </div>
                <div className="text-[10px] text-gray-600 text-center mt-2">
                  AI may produce inaccurate information.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && <Avatar size={26} />}
      <div
        className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-2xl rounded-br-sm text-white"
            : "rounded-2xl rounded-bl-sm text-gray-200"
        }`}
        style={{
          background: isUser
            ? "linear-gradient(135deg, #38bdf8, #6366f1)"
            : "rgba(255,255,255,0.05)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {message.text}
      </div>
    </motion.div>
  );
}
