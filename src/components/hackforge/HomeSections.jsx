import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../lib/themeContext";

const HOW_IT_WORKS = [
  {
    step: "01",
    symbol: "◎",
    title: "INPUT PROTOCOL",
    desc: "Describe any problem — social, biological, financial, existential. The engine accepts all frequencies.",
  },
  {
    step: "02",
    symbol: "◈",
    title: "NEURAL SYNTHESIS",
    desc: "Our absurdity matrix cross-references 47 databases of chaotic wisdom to forge your 3-step protocol.",
  },
  {
    step: "03",
    symbol: "◆",
    title: "RETRO RENDER",
    desc: "Output crystallizes as a 1200×900 Geocities-era screenshot — blinking, glitching, gloriously unhinged.",
  },
  {
    step: "04",
    symbol: "◉",
    title: "BROADCAST SIGNAL",
    desc: "Download PNG, copy magic link. Your hack travels the internet and finds its people.",
  },
];

const FEATURES = [
  { symbol: "◈", title: "MAGIC LINKS", desc: "Every hack encodes into a permanent URL. Share it — anyone who opens it sees the exact same chaos." },
  { symbol: "◆", title: "PNG EXPORT", desc: "Download 2x retro screenshot cards, pixel-perfect for Instagram Stories, TikTok, Twitter." },
  { symbol: "◎", title: "ZERO DATABASE", desc: "Nothing stored. Everything in the URL. Infinite scale, zero cost, maximum privacy." },
  { symbol: "◉", title: "8 RETRO THEMES", desc: "Classic Geocities, Angelfire, Tripod, Neon Dreamz — each render is uniquely chaotic." },
  { symbol: "◇", title: "LIVE PREVIEW", desc: "Watch your hack build in real-time as you type — neural assembly visible before forging." },
  { symbol: "◐", title: "HACK HISTORY", desc: "Your last 30 hacks stored locally. Revisit, share, or cringe at your past problems." },
];

const TESTIMONIALS = [
  { user: "DARKVORTEX_99", text: "I tried the rooster alarm hack. Gerald is now my life coach. 10/10 no regrets.", rating: 5, tag: "VERIFIED" },
  { user: "QUANTUMCHAOS", text: "The colander focus hack made me Employee of the Month. My boss also bought one.", rating: 5, tag: "VERIFIED" },
  { user: "PIXEL_WITCH_88", text: "Converted all savings to nickels. Back hurts. Bank account healthy.", rating: 5, tag: "CERTIFIED" },
  { user: "NEON_PROPHET", text: "HackForge is either peak comedy or peak wisdom. Cannot tell anymore. Irrelevant.", rating: 5, tag: "VERIFIED" },
  { user: "BYTE_SHAMAN", text: "Shared this with my therapist. She laughed for 4 minutes. Saved $200 on the session.", rating: 5, tag: "CERTIFIED" },
  { user: "GLITCH_ORACLE", text: "A product from Detha that literally rewired how I think about problems. Sending.", rating: 5, tag: "VERIFIED" },
];

const USECASES = [
  { symbol: "◎", label: "TIKTOK CREATORS", desc: "Film reactions to your forge. Tag #HackForge. Watch your followers ascend." },
  { symbol: "◈", label: "REDDIT WARRIORS", desc: "r/shittylifeprotips is literally waiting for your next drop." },
  { symbol: "◆", label: "MEME ENGINEERS", desc: "The format is perfect. Screenshot. Crop. Post. Repeat." },
  { symbol: "◉", label: "OFFICE CHAOS AGENTS", desc: "Send coworkers their personalized hack. Watch morale collapse beautifully." },
];

function SectionDivider() {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.border})` }} />
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="text-lg"
        style={{ color: theme.primary, fontFamily: "monospace" }}
      >
        ◈
      </motion.span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${theme.border}, transparent)` }} />
    </div>
  );
}

export function HowItWorksSection() {
  const { theme } = useTheme();
  return (
    <section id="about" className="py-20 px-4">
      <SectionDivider />
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-sm"
          style={{ border: `1px solid ${theme.border}`, color: theme.muted, fontFamily: "monospace" }}
        >
          ◇ SYSTEM ARCHITECTURE
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: theme.text, fontFamily: "monospace" }}
        >
          HOW THE <span style={{ color: theme.primary }}>FORGE</span> OPERATES
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {HOW_IT_WORKS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, borderColor: theme.primary }}
            className="p-6 rounded-sm relative overflow-hidden"
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.cardBg,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="text-xs font-black tracking-widest mb-3" style={{ color: theme.primary, fontFamily: "monospace" }}>
              STEP {item.step}
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              className="text-4xl mb-4"
              style={{ color: theme.primary, fontFamily: "monospace", textShadow: `0 0 20px ${theme.primary}50` }}
            >
              {item.symbol}
            </motion.div>
            <h3 className="text-sm font-black tracking-widest mb-2" style={{ color: theme.text, fontFamily: "monospace" }}>
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme.muted, fontFamily: "monospace" }}>
              {item.desc}
            </p>
            {/* Connecting arrow */}
            {i < 3 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-sm" style={{ color: theme.border, fontFamily: "monospace" }}>
                ▶
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const { theme } = useTheme();
  return (
    <section className="py-20 px-4">
      <SectionDivider />
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: theme.text, fontFamily: "monospace" }}
        >
          SYSTEM <span style={{ color: theme.primary }}>CAPABILITIES</span>
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02, borderColor: theme.primary }}
            className="p-6 rounded-sm"
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.cardBg,
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              className="text-3xl mb-3"
              style={{ color: theme.secondary, fontFamily: "monospace" }}
            >
              {f.symbol}
            </motion.div>
            <h3 className="text-xs font-black tracking-widest mb-2" style={{ color: theme.primary, fontFamily: "monospace" }}>
              {f.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme.muted, fontFamily: "monospace" }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const { theme } = useTheme();
  return (
    <section className="py-20 px-4">
      <SectionDivider />
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: theme.text, fontFamily: "monospace" }}
        >
          FIELD <span style={{ color: theme.primary }}>REPORTS</span>
        </motion.h2>
        <p className="text-sm mt-2" style={{ color: theme.muted, fontFamily: "monospace" }}>
          Transmissions from verified hack survivors
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-sm relative"
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.cardBg,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-black"
                style={{ background: `${theme.primary}20`, color: theme.primary, border: `1px solid ${theme.primary}40`, fontFamily: "monospace" }}
              >
                {t.user[0]}
              </div>
              <div>
                <div className="text-xs font-black" style={{ color: theme.text, fontFamily: "monospace" }}>{t.user}</div>
                <div className="text-xs px-1.5 py-0.5 rounded-sm inline-block mt-0.5" style={{ background: `${theme.accent}15`, color: theme.accent, fontFamily: "monospace" }}>
                  ◈ {t.tag}
                </div>
              </div>
              <div className="ml-auto text-xs" style={{ color: theme.primary, fontFamily: "monospace" }}>
                {"◆".repeat(t.rating)}
              </div>
            </div>
            <p className="text-xs leading-relaxed italic" style={{ color: theme.text, fontFamily: "monospace", opacity: 0.8 }}>
              "{t.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function UseCasesSection() {
  const { theme } = useTheme();
  return (
    <section className="py-20 px-4">
      <SectionDivider />
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: theme.text, fontFamily: "monospace" }}
        >
          DEPLOYMENT <span style={{ color: theme.primary }}>VECTORS</span>
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {USECASES.map((u, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.04, borderColor: theme.secondary }}
            className="p-6 text-center rounded-sm"
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.cardBg,
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              className="text-4xl mb-3"
              style={{ color: theme.secondary, fontFamily: "monospace" }}
            >
              {u.symbol}
            </motion.div>
            <h3 className="text-xs font-black tracking-widest mb-2" style={{ color: theme.primary, fontFamily: "monospace" }}>
              {u.label}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: theme.muted, fontFamily: "monospace" }}>
              {u.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner({ onScrollToForge }) {
  const { theme } = useTheme();
  return (
    <section className="py-24 px-4 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${theme.primary}08 0%, transparent 70%)` }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs font-bold tracking-widest uppercase mb-6"
          style={{ color: theme.muted, fontFamily: "monospace" }}
        >
          ◈ READY TO TRANSMUTE YOUR CHAOS? ◈
        </motion.div>
        <h2
          className="text-4xl md:text-6xl font-black leading-none mb-6 tracking-tight"
          style={{ color: theme.text, fontFamily: "monospace" }}
        >
          YOUR PROBLEM.<br />
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "block",
            }}
          >
            OUR ABSURDITY.
          </motion.span>
        </h2>
        <p className="text-sm mb-10 max-w-xl mx-auto" style={{ color: theme.muted, fontFamily: "monospace" }}>
          Engineered by{" "}
          <a href="https://detha.pages.dev" target="_blank" rel="noopener noreferrer" className="font-black hover:underline" style={{ color: theme.secondary }}>
            Detha
          </a>
          {" "}· Zero accounts · Zero database · 100% viral potential
        </p>
        <motion.button
          onClick={onScrollToForge}
          whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${theme.primary}40` }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 text-lg font-black uppercase tracking-widest rounded-sm"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
            border: `1px solid ${theme.primary}`,
            color: theme.primary,
            fontFamily: "monospace",
            boxShadow: `0 0 30px ${theme.primary}20`,
            letterSpacing: "0.3em",
          }}
        >
          ◆ BEGIN SYNTHESIS ◆
        </motion.button>
      </motion.div>
    </section>
  );
}

export function SiteFooter() {
  const { theme } = useTheme();
  return (
    <footer
      className="py-12 px-4"
      style={{ borderTop: `1px solid ${theme.border}` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-base font-black tracking-widest mb-2" style={{ color: theme.primary, fontFamily: "monospace" }}>
              HACK<span style={{ color: theme.accent }}>FORGE</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: theme.muted, fontFamily: "monospace" }}>
              The neural absurdity engine. Turn any problem into shareable chaos.
            </p>
            <div className="mt-3 text-xs" style={{ color: theme.muted, fontFamily: "monospace" }}>
              A product by{" "}
              <a href="https://detha.pages.dev" target="_blank" rel="noopener noreferrer" className="font-black hover:underline" style={{ color: theme.secondary }}>
                Detha
              </a>
              {" "}· Alien Technology Division
            </div>
          </div>
          <div>
            <div className="text-xs font-black tracking-widest mb-3" style={{ color: theme.primary, fontFamily: "monospace" }}>
              ◈ PROTOCOLS
            </div>
            {["Forge Engine", "Trending Hacks", "Magic Links", "PNG Export", "Hack History"].map((l) => (
              <div key={l} className="text-xs mb-1.5" style={{ color: theme.muted, fontFamily: "monospace" }}>
                <span style={{ color: theme.primary }}>▶</span> {l}
              </div>
            ))}
          </div>
          <div>
            <div className="text-xs font-black tracking-widest mb-3" style={{ color: theme.primary, fontFamily: "monospace" }}>
              ◈ BROADCAST CHANNELS
            </div>
            {["#HackForge on TikTok", "#HackForge on X/Twitter", "r/shittylifeprotips", "Instagram @HackForgeDev"].map((l) => (
              <div key={l} className="text-xs mb-1.5" style={{ color: theme.muted, fontFamily: "monospace" }}>
                <span style={{ color: theme.secondary }}>◆</span> {l}
              </div>
            ))}
          </div>
        </div>
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: `1px solid ${theme.border}`, color: theme.muted, fontFamily: "monospace" }}
        >
          <span>© 2026 HACKFORGE · ENGINEERED BY <a href="https://detha.pages.dev" target="_blank" rel="noopener noreferrer" className="font-black hover:underline" style={{ color: theme.secondary }}>DETHA</a></span>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            ◈ NEURAL ENGINE ONLINE ◈
          </motion.span>
          <span>ZERO DATA STORED · INFINITE SCALE</span>
        </div>
      </div>
    </footer>
  );
}