import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

export default function QuestionCard({ question, value, onChange, index }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      <motion.div
        className={`relative rounded-2xl border transition-all duration-300 p-5 ${
          value
            ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/10'
            : 'border-border/50 bg-card/60 hover:border-primary/20'
        } ${isFocused ? 'border-primary/70 shadow-xl shadow-primary/15' : ''}`}
        whileHover={{ y: -2 }}
      >
        {/* Glow effect when answered */}
        {value && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: 'radial-gradient(circle at top left, hsl(var(--primary)/0.08), transparent 60%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <motion.span
            className="text-2xl"
            animate={value ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {question.emoji}
          </motion.span>
          <div className="flex-1">
            <h3 className="font-space font-semibold text-foreground text-sm leading-tight">
              {question.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{question.subtitle}</p>
          </div>
          {value && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/30"
            >
              <span className="text-primary-foreground text-xs font-bold">✓</span>
            </motion.div>
          )}
        </div>

        {question.type === 'choice' && (
          <div className="flex flex-wrap gap-2 relative z-10">
            {question.options.map((option, oi) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + oi * 0.03 }}
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange(question.id, option)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  value === option
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent hover:border-primary/20'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        )}

        {question.type === 'text' && (
          <div className="relative z-10">
            <Input
              placeholder={question.placeholder}
              value={value || ''}
              onChange={(e) => onChange(question.id, e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="bg-muted/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm focus:ring-primary/30 rounded-xl"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}