import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Share2, Lock, Cpu, Laugh, Globe } from 'lucide-react';

const features = [
  { icon: Cpu, title: 'Quantum AI Engine', desc: 'Powered by next-gen AI that predicts your future with suspicious accuracy and maximum comedy.', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Laugh, title: 'Certified Hilarious', desc: 'Every timeline is uniquely absurd, shareable, and guaranteed to make you spit out your drink.', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: Share2, title: 'Magic Share Links', desc: 'Your future lives in a URL. Share it on TikTok, X, or your group chat. No account needed.', color: 'text-secondary', bg: 'bg-secondary/10' },
  { icon: Lock, title: 'Zero Data Stored', desc: 'We never store your answers. Your future is encoded in the link itself. Privacy first.', color: 'text-green-400', bg: 'bg-green-400/10' },
  { icon: Zap, title: '25 Second Results', desc: 'Faster than you can say "existential crisis." Your entire life arc, predicted in seconds.', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { icon: Globe, title: 'Goes Viral Fast', desc: 'Join millions who\'ve already seen their destiny. The results are too funny not to share.', color: 'text-pink-400', bg: 'bg-pink-400/10' },
];

export default function FeaturesSection() {
  return (
    <div className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-space font-bold text-3xl md:text-4xl text-foreground mb-3">
          Why <span className="text-primary">Future You</span> Goes Viral
        </h2>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          The internet's favorite AI that tells you exactly how weird your life is going to get.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm p-6 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.05), transparent 60%)' }}
            />
            <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <f.icon className={`w-6 h-6 ${f.color}`} />
            </div>
            <h3 className="font-space font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}