import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedNumber({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 8472391, suffix: '+', label: 'Futures Predicted', emoji: '🔮' },
  { value: 99, suffix: '%', label: 'Laugh Rate', emoji: '😂' },
  { value: 147, suffix: ' Countries', label: 'Across the Globe', emoji: '🌍' },
  { value: 25, suffix: ' Seconds', label: 'Average Generate Time', emoji: '⚡' },
];

export default function StatsSection() {
  return (
    <div className="py-12 md:py-16">
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm p-8 md:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="font-space font-bold text-2xl md:text-3xl text-primary mb-1">
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-xs text-muted-foreground font-inter">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}