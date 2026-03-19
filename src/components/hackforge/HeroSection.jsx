import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../lib/themeContext";

const COUNTER_BASE = 9472381;

const STATS = [
  { value: "9.4M+", label: "HACKS FORGED" },
  { value: "142", label: "COUNTRIES" },
  { value: "0.8s", label: "AVG FORGE TIME" },
  { value: "100%", label: "ABSURDITY RATE" },
];

export default function HeroSection() {
  const { theme } = useTheme();
  const [count, setCount] = useState(COUNTER_BASE);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem("hf_count") || String(COUNTER_BASE));
    setCount(stored);
    const interval = setInterval(() => {
      setCount((c) => {
        const n = c + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem("hf_count", String(n));
        return n;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="forge" className="relative text-center py-24 md:py-36 px-4 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${theme.primary}10 0%, transparent 70%)`,
        }}
      />

      {/* Alien classification badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-sm text-xs font-bold tracking-widest uppercase"
        style={{
          border: `1px solid ${theme.border}`,
          background: `${theme.primary}08`,
          color: theme.primary,
          fontFamily: "monospace",
          boxShadow: `0 0 20px ${theme.primary}15`,
        }}
      >
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>◈</motion.span>
        <span>CLASSIFIED · NEURAL HACK ENGINE v4.2.7 · ACTIVE</span>
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}>◈</motion.span>
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="mb-6"
      >
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-3 tracking-tight"
          style={{ fontFamily: "'Courier New', 'SF Mono', monospace" }}
        >
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.accent}, ${theme.primary})`,
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "block",
            }}
          >
            TRANSMUTE
          </motion.span>
          <span style={{ color: theme.text, display: "block" }}>ANY PROBLEM</span>
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              color: theme.accent,
              display: "block",
              fontSize: "0.6em",
              letterSpacing: "0.2em",
            }}
          >
            INTO ABSURD LIFE INTEL
          </motion.span>
        </h1>
      </motion.div>

      {/* Sub headline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-base md:text-lg max-w-2xl mx-auto mb-4 leading-relaxed"
        style={{ color: theme.muted, fontFamily: "monospace" }}
      >
        Neural-forged, Geocities-styled, infinitely shareable absurd life-hack screenshots.
        Describe your problem. Watch the system synthesize chaos.
      </motion.p>

      {/* Detha attribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-10 text-xs font-bold tracking-widest"
        style={{ color: theme.muted, fontFamily: "monospace" }}
      >
        ENGINEERED BY{" "}
        <a
          href="https://detha.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black transition-all hover:underline"
          style={{ color: theme.secondary }}
        >
          DETHA
        </a>
        {" "}· ALIEN TECHNOLOGY DIVISION
      </motion.div>

      {/* Live counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="inline-flex items-center gap-4 px-8 py-4 rounded-sm mb-16"
        style={{
          border: `1px solid ${theme.primary}40`,
          background: `${theme.primary}08`,
          boxShadow: `0 0 40px ${theme.primary}10, inset 0 0 20px ${theme.primary}05`,
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-2 rounded-full"
          style={{ background: theme.accent, boxShadow: `0 0 8px ${theme.accent}` }}
        />
        <span className="text-xs font-bold tracking-widest" style={{ color: theme.muted, fontFamily: "monospace" }}>LIVE</span>
        <span
          className="text-3xl font-black tabular-nums"
          style={{ color: theme.primary, fontFamily: "monospace", textShadow: `0 0 20px ${theme.primary}80` }}
        >
          {count.toLocaleString()}
        </span>
        <span className="text-xs font-bold tracking-widest" style={{ color: theme.muted, fontFamily: "monospace" }}>HACKS SYNTHESIZED</span>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            whileHover={{ scale: 1.05, borderColor: theme.primary }}
            className="p-4 rounded-sm text-center"
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.cardBg,
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="text-2xl font-black tracking-tight"
              style={{ color: theme.primary, fontFamily: "monospace", textShadow: `0 0 15px ${theme.primary}60` }}
            >
              {s.value}
            </div>
            <div className="text-xs tracking-widest mt-1" style={{ color: theme.muted, fontFamily: "monospace" }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}