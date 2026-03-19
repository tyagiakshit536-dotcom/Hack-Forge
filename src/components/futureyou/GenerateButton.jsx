import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';

export default function GenerateButton({ onClick, disabled, isGenerating }) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || isGenerating}
      className={`
        relative w-full py-5 px-8 rounded-2xl font-space font-bold text-lg
        transition-all duration-300 overflow-hidden
        ${disabled
          ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-60'
          : 'bg-primary text-primary-foreground cursor-pointer'
        }
      `}
      style={!disabled ? {
        boxShadow: '0 0 30px hsl(var(--primary)/0.4), 0 4px 20px hsl(var(--primary)/0.2)',
      } : {}}
    >
      {/* Shimmer */}
      {!disabled && !isGenerating && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
        />
      )}

      {/* Particle sparks when active */}
      {!disabled && !isGenerating && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary-foreground/60 pointer-events-none"
              style={{ left: `${20 + i * 30}%`, bottom: '10%' }}
              animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
            />
          ))}
        </>
      )}

      <div className="relative flex items-center justify-center gap-3">
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating Your Future...</span>
          </>
        ) : (
          <>
            <motion.div
              animate={!disabled ? { rotate: [0, -15, 15, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <Zap className="w-5 h-5" />
            </motion.div>
            <span>Fast-Forward My Life</span>
            <motion.div
              animate={!disabled ? { rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
            >
              <Zap className="w-5 h-5" />
            </motion.div>
          </>
        )}
      </div>

      {!isGenerating && !disabled && (
        <p className="text-xs opacity-70 mt-1 font-inter font-normal">
          Takes ~5 seconds · AI-powered · Always hilarious
        </p>
      )}
    </motion.button>
  );
}