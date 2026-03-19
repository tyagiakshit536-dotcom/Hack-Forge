import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../lib/themeContext";

const SUGGESTIONS = [
  "I'm always late",
  "My phone battery dies too fast",
  "I can't stop doomscrolling",
  "My plants keep dying",
  "I hate folding laundry",
  "I can never focus at work",
  "I always lose my keys",
  "I can't wake up in the morning",
  "I stress eat too much",
  "My back hurts from sitting all day",
];

export default function HackInput({ problem, setProblem, onForge, isForging }) {
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="space-y-5">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.border})` }} />
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.muted, fontFamily: "monospace" }}>
          ◈ NEURAL INPUT INTERFACE
        </span>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.border}, transparent)` }} />
      </div>

      {/* Input field */}
      <motion.div
        animate={{
          boxShadow: focused
            ? `0 0 0 1px ${theme.primary}, 0 0 30px ${theme.primary}30, 0 0 60px ${theme.primary}15`
            : `0 0 0 1px ${theme.border}, 0 0 10px ${theme.primary}10`,
        }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden"
        style={{ background: theme.cardBg, backdropFilter: "blur(10px)" }}
      >
        {/* Top header bar */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: `1px solid ${theme.border}`, background: `${theme.primary}05` }}
        >
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ background: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }}
          />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.primary, fontFamily: "monospace" }}>
            SYS://PROBLEM_INPUT
          </span>
          <span className="text-xs ml-auto" style={{ color: theme.muted, fontFamily: "monospace" }}>
            {problem.length}/500
          </span>
        </div>

        {/* Animated scan line when focused */}
        {focused && (
          <motion.div
            initial={{ top: 0 }}
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-px pointer-events-none z-10"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}40, transparent)` }}
          />
        )}

        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !isForging) { e.preventDefault(); onForge(); } }}
          placeholder="// Describe your most annoying problem..."
          rows={5}
          className="w-full bg-transparent px-4 py-4 text-base resize-none outline-none"
          style={{
            color: theme.text,
            fontFamily: "'Courier New', monospace",
            caretColor: theme.primary,
          }}
        />

        {/* Bottom accent line */}
        <motion.div
          className="h-px w-full"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.secondary}, ${theme.accent}, transparent)`,
            backgroundSize: "300% 100%",
          }}
        />
      </motion.div>

      {/* Suggestions */}
      <div>
        <p className="text-xs mb-2 tracking-widest uppercase" style={{ color: theme.muted, fontFamily: "monospace" }}>
          ◇ QUICK LOAD PROTOCOLS:
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <motion.button
              key={s}
              onClick={() => setProblem(s)}
              whileHover={{ scale: 1.05, borderColor: theme.primary, color: theme.primary }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 text-xs rounded-sm transition-all"
              style={{
                border: `1px solid ${theme.border}`,
                color: theme.muted,
                background: theme.cardBg,
                fontFamily: "monospace",
              }}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Forge button */}
      <motion.button
        onClick={onForge}
        disabled={isForging || !problem.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={
          !isForging && problem.trim()
            ? {
                boxShadow: [
                  `0 0 20px ${theme.primary}40, 0 0 40px ${theme.primary}20`,
                  `0 0 40px ${theme.secondary}50, 0 0 80px ${theme.secondary}20`,
                  `0 0 20px ${theme.primary}40, 0 0 40px ${theme.primary}20`,
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
        className="w-full py-5 text-xl font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden rounded-sm"
        style={{
          fontFamily: "'Courier New', monospace",
          background: isForging
            ? theme.cardBg
            : `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
          border: `1px solid ${isForging ? theme.border : theme.primary}`,
          color: theme.primary,
          letterSpacing: "0.3em",
        }}
      >
        {/* Animated bg sweep */}
        {!isForging && problem.trim() && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.primary}15, transparent)`,
            }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isForging ? (
            <>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>◈</motion.span>
              SYNTHESIZING HACK...
              <motion.span animate={{ rotate: -360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>◈</motion.span>
            </>
          ) : (
            <>
              <span>◆</span> FORGE MY HACK <span>◆</span>
            </>
          )}
        </span>
      </motion.button>

      {/* Loading bar */}
      <AnimatePresence>
        {isForging && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 8 }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-sm"
            style={{ border: `1px solid ${theme.border}` }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="h-full origin-left"
              style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}