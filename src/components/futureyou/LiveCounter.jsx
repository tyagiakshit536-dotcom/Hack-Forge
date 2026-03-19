import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCounter } from '@/lib/futureEngine';

export default function LiveCounter() {
  const [count, setCount] = useState(getCounter());

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm text-sm font-space"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-green-400"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="text-muted-foreground">
        <span className="text-foreground font-bold">{count.toLocaleString()}</span> futures predicted
      </span>
    </motion.div>
  );
}