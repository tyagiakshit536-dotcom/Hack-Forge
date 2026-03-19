import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

import StarField from '@/components/futureyou/StarField';
import HeroSection from '@/components/futureyou/HeroSection';
import QuestionCard from '@/components/futureyou/QuestionCard';
import LivePreview from '@/components/futureyou/LivePreview';
import GenerateButton from '@/components/futureyou/GenerateButton';
import TimelineCard from '@/components/futureyou/TimelineCard';
import ShareButtons from '@/components/futureyou/ShareButtons';
import TrendingFutures from '@/components/futureyou/TrendingFutures';
import FeaturesSection from '@/components/futureyou/FeaturesSection';
import HowItWorksSection from '@/components/futureyou/HowItWorksSection';
import TestimonialsSection from '@/components/futureyou/TestimonialsSection';
import StatsSection from '@/components/futureyou/StatsSection';
import CTABanner from '@/components/futureyou/CTABanner';
import ThemeSwitcher from '@/components/futureyou/ThemeSwitcher';

import {
  QUESTIONS,
  encodeAnswers,
  decodeAnswers,
  generateTimeline,
  saveToHistory,
  incrementCounter,
} from '@/lib/futureEngine';

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function fireConfetti() {
  import('canvas-confetti').then(mod => {
    const confetti = mod.default;
    const colors = ['#00d4ff', '#a855f7', '#ec4899', '#fde047', '#22d3ee'];
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60 + Math.random() * 60, spread: 60, origin: { x: Math.random(), y: Math.random() * 0.4 }, colors });
      confetti({ particleCount: 4, angle: 120 + Math.random() * 20, spread: 60, origin: { x: Math.random(), y: Math.random() * 0.4 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }).catch(() => {});
}

const timelineSchema = {
  type: 'object',
  properties: {
    job: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } } },
    love: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } } },
    meme: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } } },
    habit: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } } },
    death: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } } },
  },
};

function buildPrompt(answers, baseTimeline) {
  return `You are a hilarious, creative comedy writer. Generate a FUNNY personal future timeline. Make it absurd, self-deprecating, and meme-worthy.

PERSON'S ANSWERS:
- Age range: ${answers.ageRange}
- Biggest dream/fear: ${answers.dreamFear}
- Quirky habit: ${answers.quirkyHabit}
- Personality vibe: ${answers.vibe}
- Secretly wants to be famous for: ${answers.famousFor}
- Wild "what if" daydream: ${answers.whatIf}

Generate EXACTLY 5 milestones with short punchy "title" (max 8 words) and funny "description" (max 25 words):
1. "job" (year ${baseTimeline.milestoneYears[0]}): Career evolution
2. "love" (year ${baseTimeline.milestoneYears[1]}): Romantic milestone
3. "meme" (year ${baseTimeline.milestoneYears[2]}): Viral moment
4. "habit" (year ${baseTimeline.milestoneYears[3]}): Quirky habit evolves
5. "death" (year ${baseTimeline.milestoneYears[4]}): Funny final headline

Be GENUINELY FUNNY. Gen-Z meme energy. Reference their answers.`;
}

function mergeTimeline(baseTimeline, aiResult, answers) {
  const currentAge = parseInt(answers.ageRange?.split(/[–-]/)[0]) || 25;
  const currentYear = 2026;
  const fields = ['job', 'love', 'meme', 'habit', 'death'];
  const defaults = {
    job: ['Career Chaos Begins', 'Things got weird at the office.'],
    love: ['Love Found in Strange Places', 'Cupid was clearly confused.'],
    meme: ['Accidentally Famous', 'The internet never forgets.'],
    habit: ['The Habit Took Over', "It started small. It didn't stay small."],
    death: ['The Final Plot Twist', 'Nobody saw it coming. Not even them.'],
  };
  const milestones = {};
  fields.forEach((f, i) => {
    milestones[f] = {
      ...baseTimeline.milestones[f],
      title: aiResult?.[f]?.title || defaults[f][0],
      description: aiResult?.[f]?.description || defaults[f][1],
      age: currentAge + (baseTimeline.milestoneYears[i] - currentYear),
    };
  });
  return { ...baseTimeline, milestones };
}

export default function FutureYou() {
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState('quiz');
  const [timeline, setTimeline] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [magicLink, setMagicLink] = useState('');
  const cardRef = useRef(null);
  const quizRef = useRef(null);

  const runGenerate = useCallback(async (answersToUse) => {
    setIsGenerating(true);
    setPhase('generating');
    try {
      const seed = answersToUse.seed || (Date.now() + hashString(JSON.stringify(answersToUse)));
      const answersWithSeed = { ...answersToUse, seed };
      const baseTimeline = generateTimeline(answersWithSeed);
      const prompt = buildPrompt(answersWithSeed, baseTimeline);
      const result = await base44.integrations.Core.InvokeLLM({ prompt, response_json_schema: timelineSchema });
      const fullTimeline = mergeTimeline(baseTimeline, result, answersWithSeed);
      setTimeline(fullTimeline);
      setAnswers(answersWithSeed);
      const encoded = encodeAnswers(answersWithSeed, seed);
      setMagicLink(`${window.location.origin}${window.location.pathname}?f=${encoded}`);
      saveToHistory(answersWithSeed, fullTimeline);
      incrementCounter();
      setPhase('results');
      fireConfetti();
    } catch (err) {
      console.error('Generation failed:', err);
      toast.error('Something went wrong generating your future. Please try again!');
      setPhase('quiz');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('f');
    if (encoded) {
      try {
        const decoded = decodeAnswers(encoded);
        setAnswers(decoded);
        runGenerate(decoded);
      } catch (e) {
        console.error('Failed to decode shared link:', e);
      }
    }
  }, [runGenerate]);

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const answeredCount = QUESTIONS.filter(q => answers[q.id]).length;
  const progress = answeredCount / QUESTIONS.length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const handleGenerate = () => {
    if (!allAnswered) { toast.error('Answer all 6 questions first! 🔮'); return; }
    runGenerate(answers);
  };

  const handleRegenerate = () => {
    setPhase('quiz');
    setTimeline(null);
    setMagicLink('');
    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleSeeMyOwn = () => {
    setPhase('quiz');
    setTimeline(null);
    setMagicLink('');
    setAnswers({});
    window.history.replaceState({}, '', window.location.pathname);
  };

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden font-inter">
      <StarField />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.03 }} className="font-space font-bold text-xl">
            <span style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Future You
            </span>
          </motion.div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={scrollToQuiz}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-space font-semibold text-sm hover:opacity-90 transition-all"
            >
              ✨ Try It Now
            </motion.button>
            <ThemeSwitcher />
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TrendingFutures />

        {/* QUIZ SECTION */}
        <div ref={quizRef} id="quiz" className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-space font-bold text-3xl md:text-4xl text-foreground mb-3">
              Predict <span className="text-primary">Your Future</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Answer 6 quick questions and let our AI generate your hilarious destiny.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {phase === 'quiz' && (
              <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress * 100}%` }}
                          transition={{ duration: 0.4 }}
                          style={{ boxShadow: '0 0 12px hsl(var(--primary)/0.6)' }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-space font-bold">{answeredCount}/{QUESTIONS.length}</span>
                    </div>
                    {QUESTIONS.map((q, i) => (
                      <QuestionCard key={q.id} question={q} value={answers[q.id]} onChange={handleAnswer} index={i} />
                    ))}
                    <div className="pt-4">
                      <GenerateButton onClick={handleGenerate} disabled={!allAnswered} isGenerating={isGenerating} />
                    </div>
                  </div>
                  <div className="lg:col-span-2 hidden lg:block">
                    <div className="sticky top-20">
                      <LivePreview answers={answers} progress={progress} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'generating' && (
              <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24">
                <div className="relative mb-8">
                  <motion.div
                    animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 rounded-full border-4 border-muted border-t-primary"
                    style={{ filter: 'drop-shadow(0 0 12px hsl(var(--primary)/0.5))' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">🔮</div>
                </div>
                <motion.h2 className="font-space font-bold text-2xl text-foreground mb-2" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  Fast-forwarding your life...
                </motion.h2>
                <p className="text-sm text-muted-foreground">Consulting the quantum timeline engine ✨</p>
              </motion.div>
            )}

            {phase === 'results' && timeline && (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {new URLSearchParams(window.location.search).get('f') && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 p-4 rounded-2xl border border-primary/20 bg-primary/5">
                    <p className="text-sm text-muted-foreground mb-3">👀 Someone shared their future with you!</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSeeMyOwn}
                      className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-space font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/30">
                      ✨ See My Own Future
                    </motion.button>
                  </motion.div>
                )}
                <TimelineCard timeline={timeline} cardRef={cardRef} />
                <div className="mt-8">
                  <ShareButtons magicLink={magicLink} cardRef={cardRef} onRegenerate={handleRegenerate} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {phase === 'quiz' && <CTABanner onScrollToQuiz={scrollToQuiz} />}
        <TestimonialsSection />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center py-12 border-t border-border/20 mt-8"
        >
          <div className="font-space font-bold text-xl mb-1">
            <span style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Future You</span>
          </div>
          <p className="text-xs text-muted-foreground/60 mb-2 font-inter">
            A product by{' '}
            <a
              href="https://detha.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold transition-colors underline underline-offset-2"
            >
              Detha
            </a>
          </p>
          <p className="text-xs text-muted-foreground/40 font-inter">
            100% fictional · For entertainment only · No data stored · Made with ❤️ & AI
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4">
            {['🔮 AI-Powered', '🚀 No Sign-up', '🎉 100% Free', '🌍 Worldwide'].map((item, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="text-xs text-muted-foreground/50">
                {item}
              </motion.span>
            ))}
          </div>
        </motion.footer>
      </div>
    </div>
  );
}