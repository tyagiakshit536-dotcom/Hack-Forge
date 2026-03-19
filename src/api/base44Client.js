const LLM_CACHE_KEY = 'futureYou.llmCache';

function getCache() {
  try {
    return JSON.parse(localStorage.getItem(LLM_CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function setCache(cache) {
  localStorage.setItem(LLM_CACHE_KEY, JSON.stringify(cache));
}

function buildFallbackTimeline(prompt = '') {
  const normalized = prompt.toLowerCase();

  const templates = {
    job: [
      { title: 'Promoted to Spreadsheet Wizard', description: 'Your calendar became sentient and still gave you a glowing review.' },
      { title: 'CEO of Side Quests', description: 'You monetized procrastination and called it strategic ideation.' },
      { title: 'Accidental Industry Expert', description: 'One chaotic post turned into conference talks and free tote bags.' },
    ],
    love: [
      { title: 'Met Cute at Checkout Line', description: 'You bonded over discount snacks and emotional availability.' },
      { title: 'Romance in Airplane Mode', description: 'You both forgot your phones and had to make eye contact.' },
      { title: 'Soft Launch Relationship', description: 'Friends noticed matching playlists before you made it official.' },
    ],
    meme: [
      { title: 'Reaction Face Goes Global', description: 'Your confused selfie became the internet answer to everything.' },
      { title: 'Viral for Wrong Reason', description: 'A typo became merch. You leaned in and doubled profits.' },
      { title: 'Trending for 48 Hours', description: 'You peaked online and immediately took a hydration break.' },
    ],
    habit: [
      { title: 'Hobby Became Lifestyle', description: 'What started as a joke now requires dedicated shelf space.' },
      { title: 'Routine with Main Character Energy', description: 'You color-coded life and somehow made it look cinematic.' },
      { title: 'Micro Habit, Massive Lore', description: 'A tiny ritual became your most quoted personality trait.' },
    ],
    death: [
      { title: 'Legendary Last Notification', description: 'Your final status update was unhelpful, iconic, and heavily shared.' },
      { title: 'Retired from Plot Twists', description: 'Even your goodbye had a callback and a cliffhanger.' },
      { title: 'Final Boss Defeated', description: 'You exited with style, snacks, and suspiciously perfect timing.' },
    ],
  };

  const pick = (key, seed) => {
    const options = templates[key];
    const index = Math.abs(seed) % options.length;
    return options[index];
  };

  const seed = Array.from(normalized).reduce((acc, char) => acc + char.charCodeAt(0), 0) || Date.now();

  return {
    job: pick('job', seed + 1),
    love: pick('love', seed + 2),
    meme: pick('meme', seed + 3),
    habit: pick('habit', seed + 4),
    death: pick('death', seed + 5),
  };
}

export const base44 = {
  integrations: {
    Core: {
      async InvokeLLM({ prompt }) {
        const cache = getCache();
        if (cache[prompt]) return cache[prompt];

        const generated = buildFallbackTimeline(prompt);
        cache[prompt] = generated;
        setCache(cache);
        return generated;
      },
    },
  },
  auth: {
    async me() {
      const error = new Error('Authentication is not configured for this app.');
      error.status = 401;
      throw error;
    },
    logout(redirectUrl) {
      localStorage.removeItem('base44_access_token');
      localStorage.removeItem('token');
      if (redirectUrl) {
        window.location.assign(redirectUrl);
      }
    },
    redirectToLogin(redirectUrl) {
      window.location.assign(redirectUrl || '/');
    },
  },
};
