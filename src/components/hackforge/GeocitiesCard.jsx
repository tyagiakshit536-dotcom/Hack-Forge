import React from "react";
import { motion } from "framer-motion";

const BG_STYLES = {
  stars: {
    background: "#000033",
    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
    backgroundSize: "30px 30px",
  },
  bricks: {
    background: "#8B0000",
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 18px, #00000044 18px, #00000044 20px),
      repeating-linear-gradient(90deg, transparent, transparent 38px, #00000044 38px, #00000044 40px)
    `,
  },
  marble: {
    background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    backgroundImage: "radial-gradient(circle at 30% 70%, #ffffff15 0%, transparent 50%)",
  },
  checkerboard: {
    background: "#000",
    backgroundImage: "repeating-conic-gradient(#222 0% 25%, #000 0% 50%)",
    backgroundSize: "24px 24px",
  },
  gradient_chaos: {
    background: "linear-gradient(45deg, #000033, #330033, #003300, #330000)",
  },
  pixel_dots: {
    background: "#0a0a0a",
    backgroundImage: "radial-gradient(circle, #ff00ff22 2px, transparent 2px)",
    backgroundSize: "20px 20px",
  },
  diagonal_stripes: {
    background: "#000",
    backgroundImage: "repeating-linear-gradient(45deg, #111 0px, #111 8px, #1a0033 8px, #1a0033 16px)",
  },
  circuit: {
    background: "#001100",
    backgroundImage: `
      linear-gradient(90deg, #00ff0010 1px, transparent 1px),
      linear-gradient(0deg, #00ff0010 1px, transparent 1px)
    `,
    backgroundSize: "32px 32px",
  },
};

const THEME_COLORS = {
  classic_geocities: { primary: "#ffff00", secondary: "#ff00ff", accent: "#00ffff", bg: "#000080" },
  angelfire: { primary: "#ff6600", secondary: "#ffff00", accent: "#ff00ff", bg: "#1a0000" },
  tripod: { primary: "#00ff00", secondary: "#00ffff", accent: "#ffff00", bg: "#001a00" },
  under_construction: { primary: "#ffff00", secondary: "#ff6600", accent: "#ffffff", bg: "#000000" },
  web10_maximalist: { primary: "#ff00ff", secondary: "#00ffff", accent: "#ff6600", bg: "#0d001a" },
  neon_dreamz: { primary: "#00ffff", secondary: "#ff00ff", accent: "#00ff88", bg: "#0a0015" },
  pixel_party: { primary: "#ff6600", secondary: "#ff00ff", accent: "#ffff00", bg: "#1a0000" },
  cyber_chaos: { primary: "#00ff88", secondary: "#00aaff", accent: "#ff0055", bg: "#001a0d" },
};

export default function GeocitiesCard({ hack, cardRef }) {
  const bgStyle = BG_STYLES[hack.bgPattern] || BG_STYLES.stars;
  const colors = THEME_COLORS[hack.theme] || THEME_COLORS.classic_geocities;

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden w-full"
      style={{
        ...bgStyle,
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
        minHeight: "600px",
        border: `6px ridge ${colors.primary}`,
      }}
    >
      {/* Scan-line overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* Top marquee bar */}
      <div
        className="overflow-hidden py-2 relative"
        style={{ background: `linear-gradient(90deg, #000, ${colors.bg}, #000)`, borderBottom: `3px groove ${colors.secondary}` }}
      >
        <motion.div
          animate={{ x: [0, -800] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-sm font-bold"
          style={{ color: colors.secondary, textShadow: `0 0 10px ${colors.secondary}` }}
        >
          ◈◈◈ WELCOME TO MY GEOCITIES PAGE ◈◈◈ YOU ARE VISITOR #{hack.hitCount?.toLocaleString()} ◈◈◈ BEST VIEWED AT 800x600 ◈◈◈ SIGN MY GUESTBOOK ◈◈◈ FREE WEB COUNTER ◈◈◈&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </motion.div>
      </div>

      {/* Blinking headline */}
      <div className="text-center py-6 px-4 relative z-20">
        <motion.h1
          animate={{ opacity: [1, 0.2, 1, 0.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl md:text-3xl font-black uppercase leading-tight"
          style={{
            color: colors.primary,
            textShadow: `3px 3px 0 #000, -1px -1px 0 #000, 0 0 20px ${colors.primary}`,
          }}
        >
          ◆ {hack.title} ◆
        </motion.h1>

        {/* Under construction banner */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block mt-2 px-4 py-1 text-xs font-bold uppercase"
          style={{
            background: "repeating-linear-gradient(45deg, #ff6600, #ff6600 10px, #000 10px, #000 20px)",
            color: "#fff",
            border: "2px inset #fff",
          }}
        >
          ▣ THIS PAGE IS UNDER CONSTRUCTION ▣
        </motion.div>
      </div>

      {/* Problem box */}
      <div className="mx-4 mb-4 p-3 relative z-20" style={{ border: `3px inset ${colors.accent}`, background: "rgba(0,0,0,0.7)" }}>
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: colors.accent }}>
          ► THE PROBLEM:
        </p>
        <p className="text-base font-bold" style={{ color: "#fff" }}>
          "{hack.problem}"
        </p>
      </div>

      {/* 3 Steps */}
      <div className="mx-4 space-y-3 relative z-20">
        {hack.steps?.map((step, i) => (
          <motion.div
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 150 }}
            className="flex gap-3 items-start p-3"
            style={{
              border: `2px groove ${i % 2 === 0 ? colors.primary : colors.secondary}`,
              background: "rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-xl font-black border-2"
              style={{
                borderStyle: "outset",
                borderColor: colors.primary,
                background: `linear-gradient(135deg, ${colors.bg}, #000)`,
                color: colors.primary,
                textShadow: `0 0 8px ${colors.primary}`,
              }}
            >
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase font-bold mb-1" style={{ color: colors.accent }}>
                STEP {i + 1}:
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#e0e0e0" }}>
                {step}
              </p>
            </div>
            <span className="text-2xl flex-shrink-0" style={{ color: colors.accent, fontFamily: "monospace" }}>
              {["◆", "◉", "◈"][i]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-4 my-4 h-1" style={{ background: `repeating-linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})` }} />

      {/* Testimonial */}
      <div
        className="mx-4 p-4 relative z-20"
        style={{
          border: `3px double ${colors.accent}`,
          background: "rgba(0,0,50,0.8)",
          backgroundImage: "radial-gradient(circle at 90% 10%, #ff00ff15 0%, transparent 50%)",
        }}
      >
        <div className="flex items-start gap-2">
          <span className="text-3xl" style={{ color: colors.accent, fontFamily: "monospace" }}>◎</span>
          <div>
            <p className="text-sm italic leading-relaxed mb-1" style={{ color: "#ccccff" }}>
              "{hack.testimonial}"
            </p>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-bold"
              style={{ color: colors.primary }}
            >
              ★★★★★ — 5 OUT OF 5 STARS — VERIFIED LIFE CHANGER
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 px-4 pb-4 relative z-20">
        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
          <div style={{ border: `1px inset ${colors.secondary}`, padding: "6px", background: "rgba(0,0,0,0.5)", color: colors.secondary }}>
            <div className="font-bold">◉ HIT COUNTER</div>
            <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              {hack.hitCount?.toLocaleString()}
            </motion.div>
          </div>
          <div style={{ border: `1px inset ${colors.primary}`, padding: "6px", background: "rgba(0,0,0,0.5)", color: colors.primary }}>
            <div className="font-bold">◇ GUESTBOOK</div>
            <div>SIGN IT!!!</div>
          </div>
          <div style={{ border: `1px inset ${colors.accent}`, padding: "6px", background: "rgba(0,0,0,0.5)", color: colors.accent }}>
            <div className="font-bold">◈ NETSCAPE</div>
            <div>BEST VIEW</div>
          </div>
        </div>

        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-center text-xs font-bold uppercase mb-2"
          style={{ color: colors.secondary }}
        >
          ▣ PAGE LAST UPDATED: MARCH 1998 ▣
        </motion.div>

        <div className="text-center text-xs" style={{ color: "#555", fontFamily: "monospace" }}>
          Made with ◆ on HackForge.dev · by <a href="https://detha.pages.dev" target="_blank" rel="noopener noreferrer" style={{ color: colors.secondary }}>Detha</a> · © 1998 All Rights Reserved
        </div>
      </div>
    </div>
  );
}