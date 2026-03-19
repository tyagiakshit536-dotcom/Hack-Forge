import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Alex M.', handle: '@alexvibes', avatar: '🦋', text: 'I screenshotted this and sent it to literally everyone I know. The meme fame prediction hit different 💀', stars: 5, vibe: 'Chaos Gremlin' },
  { name: 'Jordan K.', handle: '@jordanfuture', avatar: '🚀', text: 'My "weird lifelong habit" prediction was TOO accurate. How does it know I eat cereal at 3am?? 😭', stars: 5, vibe: 'Night Owl Creative' },
  { name: 'Sam R.', handle: '@samrocket', avatar: '🌟', text: 'Sent this to my whole friend group. We spent 2 hours comparing futures. Best site of 2025 no contest.', stars: 5, vibe: 'Hustler' },
  { name: 'Taylor B.', handle: '@taylormemes', avatar: '🐸', text: 'The death headline had me on the floor crying laughing. Sharing this with everyone I\'ve ever met.', stars: 5, vibe: 'Meme Lord' },
  { name: 'Riley W.', handle: '@rileywanders', avatar: '🏔️', text: 'Okay but why is the love life prediction actually kinda inspiring?? I feel weirdly motivated now.', stars: 5, vibe: 'Adventurer' },
  { name: 'Casey L.', handle: '@caseylaughs', avatar: '💕', text: 'My future self apparently becomes a meme queen by 2031. Sounds about right tbh. 10/10 recommend.', stars: 5, vibe: 'Romantic' },
];

export default function TestimonialsSection() {
  return (
    <div className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-space font-bold text-3xl md:text-4xl text-foreground mb-3">
          The <span className="text-primary">Internet</span> Has Spoken
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Millions have discovered their destiny. Here's what they said (before they went viral).
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm p-5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.stars }).map((_, s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-space font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.handle} · {t.vibe}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}