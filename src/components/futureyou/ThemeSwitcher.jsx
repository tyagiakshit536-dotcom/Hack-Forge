import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '@/lib/ThemeContext';
import { Palette } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300 text-sm font-space"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{THEMES[theme]?.emoji} {THEMES[theme]?.name}</span>
        <span className="sm:hidden">{THEMES[theme]?.emoji}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 z-50 rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl p-2 shadow-2xl min-w-[160px]"
            >
              {Object.entries(THEMES).map(([key, t]) => (
                <motion.button
                  key={key}
                  whileHover={{ x: 4 }}
                  onClick={() => { setTheme(key); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-space transition-all duration-200 ${
                    theme === key
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="text-base">{t.emoji}</span>
                  <span>{t.name}</span>
                  {theme === key && (
                    <motion.div
                      layoutId="theme-check"
                      className="ml-auto w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}