import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, THEMES } from "../../lib/themeContext";

export default function SiteHeader() {
  const { theme, themeName, setTheme } = useTheme();
  const [showThemes, setShowThemes] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3"
      style={{
        background: `${theme.bg}ee`,
        borderBottom: `1px solid ${theme.border}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Logo */}
      <motion.a
        href="/"
        className="flex items-center gap-3 no-underline"
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-black"
          style={{ borderColor: theme.primary, color: theme.primary, boxShadow: `0 0 12px ${theme.primary}50` }}
        >
          ◈
        </motion.div>
        <div>
          <div className="text-base font-black tracking-widest uppercase leading-none" style={{ color: theme.primary, letterSpacing: "0.2em", fontFamily: "'Courier New', monospace" }}>
            HACK<span style={{ color: theme.accent }}>FORGE</span>
          </div>
          <div className="text-xs tracking-widest" style={{ color: theme.muted, fontFamily: "monospace" }}>
            BY{" "}
            <a
              href="https://detha.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline transition-all"
              style={{ color: theme.secondary }}
              onClick={(e) => e.stopPropagation()}
            >
              DETHA
            </a>
          </div>
        </div>
      </motion.a>

      {/* Nav center */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
        {["FORGE", "TRENDING", "HISTORY", "ABOUT"].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ scale: 1.1, color: theme.primary }}
            className="transition-all no-underline"
            style={{ color: theme.muted }}
          >
            {item}
          </motion.a>
        ))}
      </nav>

      {/* Theme switcher */}
      <div className="relative">
        <motion.button
          onClick={() => setShowThemes(!showThemes)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold tracking-widest uppercase"
          style={{
            border: `1px solid ${theme.border}`,
            background: theme.cardBg,
            color: theme.primary,
            fontFamily: "monospace",
            boxShadow: `0 0 12px ${theme.primary}20`,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: "16px" }}
          >
            {THEMES[themeName].icon}
          </motion.span>
          <span className="hidden sm:inline">{THEMES[themeName].name}</span>
          <span style={{ color: theme.muted }}>▼</span>
        </motion.button>

        <AnimatePresence>
          {showThemes && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-48 z-50 overflow-hidden"
              style={{
                border: `1px solid ${theme.border}`,
                background: `${theme.bg}f0`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 20px 60px ${theme.primary}20`,
              }}
            >
              <div className="p-1">
                <div className="text-xs px-3 py-2 font-bold tracking-widest uppercase" style={{ color: theme.muted, fontFamily: "monospace" }}>
                  ◈ SELECT THEME
                </div>
                {Object.entries(THEMES).map(([key, t]) => (
                  <motion.button
                    key={key}
                    onClick={() => { setTheme(key); setShowThemes(false); }}
                    whileHover={{ x: 4, background: `${t.primary}15` }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold tracking-wider text-left transition-all"
                    style={{
                      color: key === themeName ? t.primary : theme.text,
                      fontFamily: "monospace",
                      background: key === themeName ? `${t.primary}10` : "transparent",
                      borderLeft: key === themeName ? `2px solid ${t.primary}` : "2px solid transparent",
                    }}
                  >
                    <span style={{ color: t.primary, fontSize: "14px" }}>{t.icon}</span>
                    <span className="uppercase">{t.name}</span>
                    {key === themeName && <span className="ml-auto" style={{ color: t.primary }}>◈</span>}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}