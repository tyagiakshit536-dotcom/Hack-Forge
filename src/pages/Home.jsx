import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/hackforge/HeroSection";
import HackInput from "../components/hackforge/HackInput";
import LivePreview from "../components/hackforge/LivePreview";
import ResultScreen from "../components/hackforge/ResultScreen";
import TrendingHacks from "../components/hackforge/TrendingHacks";
import SiteHeader from "../components/hackforge/SiteHeader";
import AlienBackground from "../components/hackforge/AlienBackground";
import {
  HowItWorksSection,
  FeaturesSection,
  TestimonialsSection,
  UseCasesSection,
  CtaBanner,
  SiteFooter,
} from "../components/hackforge/HomeSections";
import { generateHack } from "../lib/hackEngine";
import { encodeHack, decodeHack } from "../lib/urlEncoder";
import { ThemeProvider, useTheme } from "../lib/themeContext";
import confetti from "canvas-confetti";

function HomeContent() {
  const [problem, setProblem] = useState("");
  const [hack, setHack] = useState(null);
  const [isForging, setIsForging] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [sharedHack, setSharedHack] = useState(null);
  const forgeRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const h = params.get("h");
    if (h) {
      try {
        const decoded = decodeHack(h);
        setSharedHack(decoded);
        setHack(decoded);
        setShowResult(true);
      } catch (e) {}
    }
  }, []);

  const handleForge = async () => {
    if (!problem.trim()) return;
    setIsForging(true);
    await new Promise((r) => setTimeout(r, 800));
    const generated = generateHack(problem);
    setHack(generated);
    const encoded = encodeHack(generated);
    window.history.pushState({}, "", `?h=${encoded}`);
    setIsForging(false);
    setShowResult(true);
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.6 },
      colors: [theme.primary, theme.secondary, theme.accent, "#ffffff"],
    });
    const history = JSON.parse(localStorage.getItem("hackforge_history") || "[]");
    history.unshift({ problem, hack: generated, encoded, date: Date.now() });
    localStorage.setItem("hackforge_history", JSON.stringify(history.slice(0, 30)));
  };

  const handleForgeAnother = () => {
    setShowResult(false);
    setHack(null);
    setSharedHack(null);
    setProblem("");
    window.history.pushState({}, "", window.location.pathname);
  };

  const scrollToForge = () => {
    forgeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (showResult && hack) {
    return <ResultScreen hack={hack} isShared={!!sharedHack} onForgeAnother={handleForgeAnother} />;
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ background: theme.bgGrad || theme.bg }}
    >
      {/* Alive animated background */}
      <AlienBackground />

      {/* Radial noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      {/* Content layer */}
      <div className="relative z-10">
        <SiteHeader />

        <HeroSection />

        {/* Forge section */}
        <div ref={forgeRef} className="max-w-7xl mx-auto px-4 pb-16">
          {/* Section label */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-sm"
              style={{
                border: `1px solid ${theme.border}`,
                background: `${theme.primary}08`,
                color: theme.primary,
                fontFamily: "monospace",
              }}
            >
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>◈</motion.span>
              FORGE INTERFACE · ACTIVE
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <HackInput
              problem={problem}
              setProblem={setProblem}
              onForge={handleForge}
              isForging={isForging}
            />
            <LivePreview problem={problem} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <TrendingHacks onSelect={(p) => { setProblem(p); scrollToForge(); }} />
          <HowItWorksSection />
          <FeaturesSection />
          <TestimonialsSection />
          <UseCasesSection />
        </div>

        <CtaBanner onScrollToForge={scrollToForge} />
        <SiteFooter />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}