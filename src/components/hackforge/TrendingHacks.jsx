import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../lib/themeContext";

const TRENDING = [
  { problem: "I'm always late", symbol: "◷", views: "2.1M", tag: "TIME" },
  { problem: "My plants keep dying", symbol: "◈", views: "1.8M", tag: "NATURE" },
  { problem: "I can't stop doomscrolling", symbol: "◎", views: "3.4M", tag: "TECH" },
  { problem: "I hate folding laundry", symbol: "◇", views: "987K", tag: "HOME" },
  { problem: "I can never focus at work", symbol: "◆", views: "2.7M", tag: "WORK" },
  { problem: "My phone battery dies too fast", symbol: "◉", views: "1.2M", tag: "TECH" },
  { problem: "I always forget where I put my keys", symbol: "◊", views: "876K", tag: "MEMORY" },
  { problem: "I stress eat too much", symbol: "◌", views: "1.5M", tag: "HEALTH" },
  { problem: "I'm terrible at saving money", symbol: "◐", views: "2.2M", tag: "FINANCE" },
  { problem: "I can't wake up in the morning", symbol: "◑", views: "3.1M", tag: "SLEEP" },
  { problem: "I'm always stressed", symbol: "◒", views: "1.9M", tag: "MENTAL" },
  { problem: "I can't stop going to meetings", symbol: "◓", views: "744K", tag: "WORK" },
];

export default function TrendingHacks({ onSelect }) {
  const { theme } = useTheme();

  return (
    <section id="trending" className="mt-24 mb-16">
      {/* Section header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-2 mb-4 rounded-sm text-xs font-bold tracking-widest uppercase"
          style={{
            border: `1px solid ${theme.border}`,
            background: `${theme.primary}08`,
            color: theme.primary,
            fontFamily: "monospace",
            boxShadow: `0 0 20px ${theme.primary}10`,
          }}
        >
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>◈</motion.span>
          TOP SIGNAL PATTERNS · TRENDING PROTOCOLS
          <motion.span animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>◈</motion.span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: theme.text, fontFamily: "monospace" }}
        >
          MOST SYNTHESIZED <span style={{ color: theme.primary }}>HACKS</span>
        </motion.h2>
        <p className="text-sm mt-2 tracking-widest" style={{ color: theme.muted, fontFamily: "monospace" }}>
          Click any protocol to auto-load into the forge engine
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TRENDING.map((item, i) => (
          <motion.button
            key={i}
            onClick={() => onSelect(item.problem)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 150 }}
            whileHover={{
              scale: 1.02,
              borderColor: theme.primary,
              boxShadow: `0 0 20px ${theme.primary}20`,
            }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 p-4 text-left w-full rounded-sm transition-all"
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.cardBg,
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              className="text-xl flex-shrink-0 w-8 text-center font-black"
              style={{ color: theme.primary, fontFamily: "monospace" }}
            >
              {item.symbol}
            </motion.span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate mb-1" style={{ color: theme.text, fontFamily: "monospace" }}>
                {item.problem}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs px-1.5 py-0.5 rounded-sm" style={{ background: `${theme.primary}15`, color: theme.primary, fontFamily: "monospace" }}>
                  {item.tag}
                </span>
                <span className="text-xs" style={{ color: theme.muted, fontFamily: "monospace" }}>
                  ◎ {item.views}
                </span>
              </div>
            </div>
            <motion.span
              whileHover={{ x: 4 }}
              className="text-sm flex-shrink-0"
              style={{ color: theme.primary, fontFamily: "monospace" }}
            >
              ▶
            </motion.span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}