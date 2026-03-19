import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function CTABanner({ onScrollToQuiz }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden py-16 px-8 text-center my-8"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--secondary)/0.15), hsl(var(--accent)/0.15))',
        border: '1px solid hsl(var(--primary)/0.3)',
      }}
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)/0.2), transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)/0.2), transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      <div className="relative z-10">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-5xl mb-4"
        >🔮</motion.div>
        <h2 className="font-space font-bold text-3xl md:text-4xl text-foreground mb-3">
          Ready to meet <span className="text-primary">Future You</span>?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The funniest 25 seconds of your day. Answer 6 questions and get your complete life arc — no sign-up required.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onScrollToQuiz}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-space font-bold text-lg bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
        >
          Start Predicting My Future
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}