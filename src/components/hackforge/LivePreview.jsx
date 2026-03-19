import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateHack } from "../../lib/hackEngine";
import { useTheme } from "../../lib/themeContext";

export default function LivePreview({ problem }) {
  const [previewHack, setPreviewHack] = useState(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (!problem || problem.length < 5) {
      setPreviewHack(null);
      setVisibleSteps(0);
      return;
    }
    setIsBuilding(true);
    setVisibleSteps(0);
    const timeout = setTimeout(() => {
      const hack = generateHack(problem);
      setPreviewHack(hack);
      setIsBuilding(false);
      setTimeout(() => setVisibleSteps(1), 200);
      setTimeout(() => setVisibleSteps(2), 600);
      setTimeout(() => setVisibleSteps(3), 1000);
    }, 400);
    return () => clearTimeout(timeout);
  }, [problem]);

  return (
    <div>
      {/* Section label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.border})` }} />
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.muted, fontFamily: "monospace" }}>
          ◈ LIVE SYNTHESIS PREVIEW
        </span>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.border}, transparent)` }} />
      </div>

      <motion.div
        initial={false}
        className="relative overflow-hidden"
        style={{
          border: `1px solid ${theme.border}`,
          background: theme.cardBg,
          backdropFilter: "blur(10px)",
          minHeight: "360px",
          boxShadow: `0 0 40px ${theme.primary}10`,
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: `1px solid ${theme.border}`, background: `${theme.primary}05` }}
        >
          <div className="flex gap-1.5">
            {[theme.accent, theme.secondary, theme.primary].map((c, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, boxShadow: `0 0 4px ${c}` }} />
            ))}
          </div>
          <span className="text-xs font-bold tracking-widest ml-2" style={{ color: theme.muted, fontFamily: "monospace" }}>
            HACKFORGE://PREVIEW_ENGINE
          </span>
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-auto w-2 h-2 rounded-full"
            style={{ background: previewHack ? theme.accent : theme.muted }}
          />
        </div>

        {!problem || problem.length < 5 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-5xl mb-4"
              style={{ color: theme.border, filter: `drop-shadow(0 0 10px ${theme.primary}30)` }}
            >
              ◎
            </motion.div>
            <p className="text-xs tracking-widest" style={{ color: theme.muted, fontFamily: "monospace" }}>
              AWAITING INPUT...
            </p>
          </div>
        ) : (
          <div className="p-4">
            {isBuilding ? (
              <div className="space-y-3 py-8">
                {[1, 0.8, 0.6].map((w, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="h-3 rounded-sm"
                    style={{ width: `${w * 100}%`, background: `${theme.primary}20` }}
                  />
                ))}
                <p className="text-xs text-center tracking-widest pt-4" style={{ color: theme.primary, fontFamily: "monospace" }}>
                  ◈ NEURAL SYNTHESIS IN PROGRESS...
                </p>
              </div>
            ) : (
              <>
                {/* Preview title */}
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm font-black text-center mb-4 px-2 tracking-widest uppercase"
                  style={{
                    color: theme.primary,
                    fontFamily: "monospace",
                    textShadow: `0 0 15px ${theme.primary}60`,
                  }}
                >
                  ◆ {previewHack?.title} ◆
                </motion.div>

                {/* Steps */}
                <div className="space-y-2">
                  {[0, 1, 2].map((i) => (
                    <AnimatePresence key={i}>
                      {visibleSteps > i && previewHack && (
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="flex gap-3 items-start p-3"
                          style={{
                            border: `1px solid ${i % 2 === 0 ? theme.primary : theme.secondary}30`,
                            background: `${theme.primary}05`,
                          }}
                        >
                          <span
                            className="text-sm font-black flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-sm"
                            style={{
                              color: theme.primary,
                              border: `1px solid ${theme.primary}50`,
                              fontFamily: "monospace",
                            }}
                          >
                            {i + 1}
                          </span>
                          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: theme.text, fontFamily: "monospace", opacity: 0.8 }}>
                            {previewHack.steps[i]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>

                {visibleSteps === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 pt-3 text-center text-xs tracking-widest"
                    style={{
                      borderTop: `1px solid ${theme.border}`,
                      color: theme.muted,
                      fontFamily: "monospace",
                    }}
                  >
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                      ◈ HACK SYNTHESIZED · PRESS FORGE TO RENDER ◈
                    </motion.span>
                  </motion.div>
                )}
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}