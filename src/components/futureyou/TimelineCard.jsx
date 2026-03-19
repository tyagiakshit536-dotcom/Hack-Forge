import React from 'react';
import { motion } from 'framer-motion';
import { getPersonalityTheme } from '@/lib/futureEngine';

function MilestoneBubble({ milestone, index }) {
  const colors = [
    'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 shadow-cyan-500/10',
    'from-pink-500/20 to-rose-500/20 border-pink-500/30 shadow-pink-500/10',
    'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 shadow-yellow-500/10',
    'from-purple-500/20 to-violet-500/20 border-purple-500/30 shadow-purple-500/10',
    'from-red-500/20 to-orange-500/20 border-red-500/30 shadow-red-500/10',
  ];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: -20 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.02, x: 4 }}
      className={`relative rounded-xl border bg-gradient-to-br ${colors[index]} p-4 backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
    >
      {/* Year pill */}
      <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-card border border-border text-xs font-space font-bold text-primary">
        {milestone.year}
      </div>

      <div className="flex items-start gap-3">
        <motion.div
          className="text-2xl flex-shrink-0 mt-0.5"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        >
          {milestone.emoji}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">Age {milestone.age}</span>
          </div>
          <h4 className="font-space font-bold text-foreground text-sm leading-tight mb-1">
            {milestone.title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {milestone.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TimelineCard({ timeline, cardRef }) {
  const theme = getPersonalityTheme(timeline.answers.vibe);
  const milestones = [
    { ...timeline.milestones.job, key: 'job' },
    { ...timeline.milestones.love, key: 'love' },
    { ...timeline.milestones.meme, key: 'meme' },
    { ...timeline.milestones.habit, key: 'habit' },
    { ...timeline.milestones.death, key: 'death' },
  ];

  return (
    <motion.div
      initial={{ scale: 0.3, rotateY: 40, opacity: 0 }}
      animate={{ scale: 1, rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden border border-border/30 bg-card"
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 opacity-50 transition-all duration-1000"
          style={{ background: `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]}, ${theme.gradient[2]})` }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 50%)',
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative p-6 md:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-center mb-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2 font-inter">
              ✦ Your Future Timeline ✦
            </p>
            <motion.h2
              className="font-space font-bold text-2xl md:text-3xl text-foreground mb-1"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {theme.emoji} The {timeline.answers.vibe}
            </motion.h2>
            <p className="text-sm text-muted-foreground font-inter">
              Age {timeline.currentAge} → {timeline.milestoneYears[4]}
            </p>
          </motion.div>

          {/* Timeline connector line */}
          <div className="relative mb-4">
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-transparent" />
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <MilestoneBubble key={m.key} milestone={m} index={i} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-center border-t border-border/20 pt-4 mt-2"
          >
            <p className="text-xs text-muted-foreground/50 font-inter">
              Created with ❤️ on <span className="text-primary">Future You</span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}