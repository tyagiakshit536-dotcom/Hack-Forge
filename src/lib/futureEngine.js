// Seeded random number generator
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (s >>> 0) / 0xFFFFFFFF;
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Encode answers to URL-safe base64
export function encodeAnswers(answers, seed) {
  const payload = JSON.stringify({ ...answers, seed });
  return btoa(encodeURIComponent(payload));
}

// Decode answers from URL param
export function decodeAnswers(encoded) {
  const json = decodeURIComponent(atob(encoded));
  return JSON.parse(json);
}

// Get personality theme based on vibe
export function getPersonalityTheme(vibe) {
  const themes = {
    'Adventurer': { gradient: ['#0f766e', '#06b6d4', '#22d3ee'], accent: '#22d3ee', emoji: '🏔️', bg: 'from-teal-900 via-cyan-800 to-sky-900' },
    'Chaos Gremlin': { gradient: ['#9333ea', '#ec4899', '#f43f5e'], accent: '#ec4899', emoji: '👹', bg: 'from-purple-900 via-pink-800 to-rose-900' },
    'Chill Philosopher': { gradient: ['#1e3a5f', '#3b82f6', '#93c5fd'], accent: '#93c5fd', emoji: '🧘', bg: 'from-slate-900 via-blue-900 to-indigo-900' },
    'Hustler': { gradient: ['#854d0e', '#eab308', '#fde047'], accent: '#fde047', emoji: '💰', bg: 'from-yellow-900 via-amber-800 to-orange-900' },
    'Romantic': { gradient: ['#831843', '#ec4899', '#f9a8d4'], accent: '#f9a8d4', emoji: '💕', bg: 'from-pink-900 via-rose-800 to-fuchsia-900' },
    'Meme Lord': { gradient: ['#365314', '#84cc16', '#bef264'], accent: '#bef264', emoji: '🐸', bg: 'from-lime-900 via-green-800 to-emerald-900' },
    'Night Owl Creative': { gradient: ['#1e1b4b', '#6366f1', '#a78bfa'], accent: '#a78bfa', emoji: '🦉', bg: 'from-indigo-950 via-violet-900 to-purple-900' },
    'Chaotic Good': { gradient: ['#7c2d12', '#f97316', '#fdba74'], accent: '#fdba74', emoji: '🔥', bg: 'from-orange-950 via-red-900 to-amber-900' },
  };
  return themes[vibe] || themes['Adventurer'];
}

// Milestone emojis
export const MILESTONE_ICONS = {
  job: '💼',
  love: '❤️',
  meme: '🌟',
  habit: '🔄',
  death: '💀'
};

// Generate timeline from answers + seed
export function generateTimeline(answers) {
  const seed = answers.seed || hashString(JSON.stringify(answers));
  const rng = seededRandom(seed);
  const currentAge = parseInt(answers.ageRange?.split('-')[0]) || 25;
  const theme = getPersonalityTheme(answers.vibe);

  // Generate milestone years
  const milestoneYears = [];
  for (let i = 0; i < 5; i++) {
    milestoneYears.push(2026 + Math.floor(rng() * 30) + i * 5);
  }
  milestoneYears.sort((a, b) => a - b);

  return {
    seed,
    theme,
    currentAge,
    answers,
    milestoneYears,
    milestones: {
      job: { year: milestoneYears[0], emoji: '💼' },
      love: { year: milestoneYears[1], emoji: '❤️' },
      meme: { year: milestoneYears[2], emoji: '🌟' },
      habit: { year: milestoneYears[3], emoji: '🔄' },
      death: { year: milestoneYears[4], emoji: '💀' },
    }
  };
}

// Save to localStorage history
export function saveToHistory(answers, timeline) {
  const history = JSON.parse(localStorage.getItem('futureYouHistory') || '[]');
  const entry = {
    id: Date.now(),
    answers,
    date: new Date().toISOString(),
    encoded: encodeAnswers(answers, answers.seed),
  };
  history.unshift(entry);
  if (history.length > 20) history.pop();
  localStorage.setItem('futureYouHistory', JSON.stringify(history));
}

// Get counter value (fake viral counter)
export function getCounter() {
  const base = 8472391;
  const stored = localStorage.getItem('futureYouCounter');
  if (stored) {
    const { count, timestamp } = JSON.parse(stored);
    const elapsed = (Date.now() - timestamp) / 1000;
    return Math.floor(count + elapsed * 0.3);
  }
  const initial = base + Math.floor(Math.random() * 50000);
  localStorage.setItem('futureYouCounter', JSON.stringify({ count: initial, timestamp: Date.now() }));
  return initial;
}

export function incrementCounter() {
  const current = getCounter();
  localStorage.setItem('futureYouCounter', JSON.stringify({ count: current + 1, timestamp: Date.now() }));
}

// Questions config
export const QUESTIONS = [
  {
    id: 'ageRange',
    title: 'What\'s your current life stage?',
    subtitle: 'Pick the range that fits you best',
    type: 'choice',
    options: ['18–25', '26–35', '36–45', '46–55', '56+'],
    emoji: '🎂'
  },
  {
    id: 'dreamFear',
    title: 'Biggest dream or fear right now?',
    subtitle: 'We\'ll fast-forward from here',
    type: 'choice',
    options: ['Getting rich', 'Finding true love', 'Traveling the world', 'Starting a business', 'Never being good enough', 'AI taking my job', 'Other'],
    emoji: '🔮'
  },
  {
    id: 'quirkyHabit',
    title: 'One quirky habit you already have',
    subtitle: 'Be honest, we won\'t judge (much)',
    type: 'text',
    placeholder: 'e.g. I talk to my plants, I eat cereal at 2am...',
    emoji: '🤪'
  },
  {
    id: 'vibe',
    title: 'What\'s your personality vibe?',
    subtitle: 'Choose your cosmic archetype',
    type: 'choice',
    options: ['Adventurer', 'Chaos Gremlin', 'Chill Philosopher', 'Hustler', 'Romantic', 'Meme Lord', 'Night Owl Creative', 'Chaotic Good'],
    emoji: '✨'
  },
  {
    id: 'famousFor',
    title: 'What do you secretly want to be famous for?',
    subtitle: 'No one is watching (except 8 million users)',
    type: 'text',
    placeholder: 'e.g. inventing a new emoji, cooking show for cats...',
    emoji: '🏆'
  },
  {
    id: 'whatIf',
    title: 'One wild "what if" you daydream about?',
    subtitle: 'The wilder, the better your future gets',
    type: 'text',
    placeholder: 'e.g. what if I quit everything and moved to Mars...',
    emoji: '🚀'
  }
];