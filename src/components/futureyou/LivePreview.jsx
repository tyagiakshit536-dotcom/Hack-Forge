import React from 'react';
import { motion } from 'framer-motion';
import { getPersonalityTheme } from '@/lib/futureEngine';

export default function LivePreview({ answers, progress }) {
  const theme = getPersonalityTheme(answers.vibe);
  const blurAmount = Math.max(0, 18 - (progress * 18));

  const milestoneLabels = [
    { label: 'Dream Job', emoji: '💼', filled: !!answers.dreamFear },
    { label: 'Love Life', emoji: '❤️', filled: !!answers.vibe },
    { label: 'Meme Fame', emoji: '🌟', filled: !!answers.famousFor },
    { label: 'Weird Habit', emoji: '🔄', filled: !!answers.quirkyHabit },
    { label: 'Final Chapter', emoji: '💀', filled: !!answers.whatIf },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="relative rounded-2xl overflow-hidden border border-border/30 backdrop-blur-sm"
    >
      <div
        className="absolute inset-0 opacity-40 transition-all duration-1000"
        style={{
          background: answers.vibe
            ? `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]}, ${theme.gradient[2]})`
            : 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--muted)), hsl(var(--card)))'
        }}
      />

      <div className="relative p-5 bg-card/40" style={{ filter: `blur(${blurAmount}px)`, transition: 'filter 0.6s ease' }}>
        <div className="text-center mb-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Live Preview</p>
          <h4 className="font-space font-bold text-foreground text-sm">
            {answers.vibe ? `✨ The ${answers.vibe}` : 'Your Future...'}
          </h4>
          <div className="w-16 h-1 rounded-full bg-primary/30 mx-auto mt-2" />
        </div>

        <div className="space-y-2.5">
          {milestoneLabels.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0.2, x: -10 }}
              animate={{ opacity: m.filled ? 1 : 0.25, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={m.filled ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                  m.filled ? 'bg-primary/20 shadow-md shadow-primary/20 border border-primary/30' : 'bg-muted/30'
                }`}
              >
                {m.emoji}
              </motion.div>
              <div className="flex-1">
                <div className={`h-1.5 rounded-full transition-all duration-700 ${
                  m.filled ? 'bg-primary/50 w-full' : 'bg-muted/20 w-2/3'
                }`}
                  style={m.filled ? { boxShadow: '0 0 8px hsl(var(--primary)/0.4)' } : {}}
                />
                <p className="text-[10px] text-muted-foreground mt-1">{m.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {progress < 1 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-muted-foreground text-center px-4"
            >
              {progress < 0.3 ? '🔮 Answer questions to reveal...' :
               progress < 0.7 ? '✨ Getting clearer...' : '🚀 Almost there...'}
            </motion.p>
          </div>
        )}
      </div>

      {/* Progress bar at bottom */}
      <div className="h-1 bg-muted/30">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4 }}
          style={{ boxShadow: '0 0 8px hsl(var(--primary)/0.6)' }}
        />
      </div>
    </motion.div>
  );
}