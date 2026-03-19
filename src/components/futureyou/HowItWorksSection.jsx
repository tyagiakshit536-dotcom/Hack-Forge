import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', emoji: '✍️', title: 'Answer 6 Questions', desc: 'Tell us your vibe, habits, dreams and fears. Takes under a minute.' },
  { num: '02', emoji: '🧠', title: 'AI Crunches Your Destiny', desc: 'Our quantum AI processes your answers and generates your unique future timeline.' },
  { num: '03', emoji: '🎉', title: 'Get Your Future Card', desc: 'Receive a beautiful, shareable timeline card with 5 hilarious life milestones.' },
  { num: '04', emoji: '📱', title: 'Go Viral', desc: 'Download your card, copy your magic link, and watch your future take over the internet.' },
];

export default function HowItWorksSection() {
  return (
    <div className="py-16 md:py-24 relative">
      {/* Connecting line */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-space font-bold text-3xl md:text-4xl text-foreground mb-3">
          How It <span className="text-primary">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          From zero to fully predicted future in 4 easy steps.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative text-center group"
          >
            {/* Step number */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg shadow-primary/10 group-hover:shadow-primary/25 transition-all duration-300"
            >
              {step.emoji}
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-space font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </motion.div>

            <h3 className="font-space font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}