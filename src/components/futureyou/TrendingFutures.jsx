import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const TRENDING = [
  { vibe: 'Chaos Gremlin', headline: 'Accidentally invented a new language on TikTok', emoji: '👹', heat: '🔥🔥🔥' },
  { vibe: 'Hustler', headline: 'Sold a startup for $2B, still eats ramen daily', emoji: '💰', heat: '🔥🔥🔥' },
  { vibe: 'Romantic', headline: 'Proposed via skywriting, misspelled the name', emoji: '💕', heat: '🔥🔥' },
  { vibe: 'Meme Lord', headline: 'Elected mayor of a small town through memes alone', emoji: '🐸', heat: '🔥🔥🔥' },
  { vibe: 'Adventurer', headline: 'First person to open a coffee shop on Mars', emoji: '🏔️', heat: '🔥🔥' },
  { vibe: 'Night Owl Creative', headline: 'Won an Oscar for a film shot entirely at 3am', emoji: '🦉', heat: '🔥🔥' },
];

export default function TrendingFutures() {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-5"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Flame className="w-4 h-4 text-accent" />
          </motion.div>
          <h3 className="font-space font-bold text-base text-foreground">Trending Futures</h3>
        </div>
        <span className="text-xs text-muted-foreground font-inter">— what people are discovering right now</span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TRENDING.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default group"
          >
            <div className="flex items-start gap-3">
              <motion.span
                className="text-xl group-hover:scale-110 transition-transform"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
              >
                {item.emoji}
              </motion.span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs text-primary font-space font-bold truncate">{item.vibe}</p>
                  <span className="text-xs">{item.heat}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.headline}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}