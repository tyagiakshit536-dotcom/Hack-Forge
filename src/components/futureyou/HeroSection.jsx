import React from 'react';
import { motion } from 'framer-motion';
import LiveCounter from './LiveCounter';

const FloatingOrb = ({ size, x, y, color, delay, duration }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size, height: size,
      left: x, top: y,
      background: `radial-gradient(circle, ${color}40, transparent 70%)`,
      filter: 'blur(40px)',
    }}
    animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.15, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export default function HeroSection() {
  return (
    <div className="relative text-center py-8 md:py-16 overflow-hidden">
      {/* Floating background orbs */}
      <FloatingOrb size={400} x="-10%" y="-20%" color="hsl(var(--primary))" delay={0} duration={8} />
      <FloatingOrb size={300} x="60%" y="10%" color="hsl(var(--secondary))" delay={2} duration={10} />
      <FloatingOrb size={200} x="30%" y="40%" color="hsl(var(--accent))" delay={4} duration={7} />

      {/* Glowing ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-[500px] h-[500px] rounded-full border border-primary/10"
          style={{ position: 'absolute' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-[350px] h-[350px] rounded-full border border-secondary/10"
          style={{ position: 'absolute' }}
        />
      </motion.div>

      <div className="relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-space font-semibold mb-6 backdrop-blur-sm"
        >
          <motion.span
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >🔮</motion.span>
          AI-Powered Future Predictor · Year 3000 Edition
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-space font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-4"
        >
          <motion.span
            className="block text-foreground"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              background: 'linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--foreground)))',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Future You
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-base md:text-xl max-w-xl mx-auto mb-3 font-inter leading-relaxed"
        >
          Your hilarious AI-generated life story.{' '}
          <span className="text-foreground font-medium">25 seconds.</span>{' '}
          <span className="text-primary">Zero sign-up.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground/60 text-sm max-w-md mx-auto mb-8 font-inter"
        >
          Just vibes, chaos, and your destiny — served hot from the quantum timeline engine 🚀
        </motion.p>

        {/* Live counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mb-6"
        >
          <LiveCounter />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-xs text-muted-foreground/50 font-inter">Answer 6 questions below</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-primary/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}