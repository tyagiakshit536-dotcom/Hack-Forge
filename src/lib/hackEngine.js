// HackForge Engine - 120+ absurd 3-step templates

const HACK_TEMPLATES = [
  {
    keywords: ["late", "time", "alarm", "morning", "wake"],
    title: "NEVER BE LATE AGAIN!!!",
    steps: [
      "Duct tape 47 alarm clocks to your bedroom ceiling. Set each one 30 seconds apart. The CHAOS will make sleep impossible!!",
      "Fill your shoes with cold spaghetti the night before. Nothing motivates faster morning movement like PASTA FEET!!!",
      "Hire a rooster named Gerald to live in your closet. Gerald does NOT accept snooze buttons. RESULTS GUARANTEED!!!",
    ],
    testimonial: "I was late every day for 12 years. Gerald changed EVERYTHING. Now I'm 3 hours early to everything including my own dreams. — xXDarkWolf1998Xx",
    emoji: "⏰",
  },
  {
    keywords: ["plant", "die", "water", "garden", "flower"],
    title: "GROW PLANTS LIKE A WIZARD!!!",
    steps: [
      "Talk to your plants using ONLY dial-up modem sounds. Plants evolved with internet — they CRAVE 56k connection noises!!!",
      "Replace soil with crushed-up energy drinks. Plants need CAFFEINE to truly thrive in this economy!!!",
      "Play your plants nothing but 90s boy band music on repeat. The emotional damage FORCES them to grow toward happiness!!!",
    ],
    testimonial: "My cactus died 8 times. I tried the modem sounds. It grew 4 feet in a week and started making filing cabinet sounds. SCIENCE!!! — PetuniaMaster2000",
    emoji: "🌱",
  },
  {
    keywords: ["scroll", "phone", "social media", "tiktok", "instagram", "doom"],
    title: "STOP DOOMSCROLLING FOREVER!!!",
    steps: [
      "Wrap your phone in 17 layers of bubble wrap. By the time you unwrap it, you've forgotten why you wanted to scroll!!!",
      "Replace your phone wallpaper with a photo of your most disappointed relative. Judge-Grandma ALWAYS watching!!!",
      "Every time you open social media, immediately call the speaking clock hotline and listen to the time for 45 minutes. CLASSICAL CONDITIONING!!!",
    ],
    testimonial: "I was scrolling 16 hours/day. Judge-Grandma wallpaper reduced that to 15.5 hours. Progress!!! — TechDetoxQueen99",
    emoji: "📱",
  },
  {
    keywords: ["sleep", "insomnia", "tired", "bed", "night"],
    title: "SLEEP LIKE A HIBERNATING BEAR!!!",
    steps: [
      "Fill your pillowcase with 200 gummy bears. The sugar fumes create a sedative cloud of PURE RELAXATION!!!",
      "Watch a 47-hour PowerPoint presentation about medieval sock manufacturing. Nothing triggers sleep faster!!!",
      "Wear a traffic cone as a sleep hat. Your brain recognizes the DANGER signal and shuts down in self-defense!!!",
    ],
    testimonial: "I hadn't slept since 1994. The sock PowerPoint knocked me out in 4 minutes. I woke up in 2019. — NightOwl42",
    emoji: "😴",
  },
  {
    keywords: ["diet", "weight", "food", "eat", "hungry", "fat"],
    title: "LOSE WEIGHT WITH ZERO EFFORT!!!",
    steps: [
      "Only eat food while standing in a kiddie pool filled with cold soup. Discomfort reduces appetite by 340%!!!",
      "Replace all your plates with frisbees. Your brain cannot compute 'meal' on aerodynamic equipment!!!",
      "Eat every meal wearing ski goggles and oven mitts. The extreme inconvenience burns 800 extra calories!!!",
    ],
    testimonial: "Lost 3lbs eating soup-pool dinners. Gained 8lbs of muscle from carrying the pool back and forth. NET WIN!!! — FitnessBro_1997",
    emoji: "🥗",
  },
  {
    keywords: ["money", "broke", "poor", "debt", "finance", "rich", "save"],
    title: "BECOME FINANCIALLY UNSTOPPABLE!!!",
    steps: [
      "Convert all your money to nickels immediately. Nickels are TOO HEAVY to spend impulsively. SAVINGS AUTOMATICALLY!!!",
      "Hire a small child to follow you and scream 'DO YOU REALLY NEED THAT???' every time you open your wallet!!!",
      "Put all savings in a waterproof box buried under your neighbor's garden. Even YOU don't know where it is. 100% safe!!!",
    ],
    testimonial: "I buried $47 under Dave's garden. Dave moved. I became rich through legal property dispute. UNEXPECTED!!! — BrokeButSmrt",
    emoji: "💰",
  },
  {
    keywords: ["focus", "concentrate", "distract", "work", "productivity", "attention"],
    title: "LASER FOCUS IN 60 SECONDS!!!",
    steps: [
      "Wear a colander on your head as a 'thought strainer.' It filters out 89% of irrelevant brain signals SCIENTIFICALLY!!!",
      "Surround your workspace with 34 rubber ducks arranged in a protective productivity circle. Ducks absorb distraction!!!",
      "Tape a photo of a disappointed medieval peasant next to your screen. Their suffering reminds you what's at stake!!!",
    ],
    testimonial: "The duck circle took me 4 hours to arrange. During arrangement I accidentally wrote my best novel. ACCIDENTAL PRODUCTIVITY!!! — FocusMaster3000",
    emoji: "🎯",
  },
  {
    keywords: ["stress", "anxiety", "worry", "calm", "relax", "mental"],
    title: "ELIMINATE STRESS IN 3 STEPS!!!",
    steps: [
      "Collect your worries in a jar labeled 'FUTURE ME'S PROBLEM.' Seal with industrial tape. Future you is MUCH stronger!!!",
      "Replace every stressful thought with the opening riff of Mambo No. 5. Studies show: impossible to stress while mambo-ing!!!",
      "Install a traffic light in your home office. Red = stressed. Yellow = managing. Green = thriving. VISUAL WELLNESS!!!",
    ],
    testimonial: "I gave all stress to Future Me. Future Me is now living wild in the Swiss Alps. Present Me is THRIVING!!! — ZenMaster_Chaos",
    emoji: "🧘",
  },
  {
    keywords: ["memory", "forget", "remember", "brain", "study", "learn"],
    title: "UNLOCK YOUR MEGA MEMORY!!!",
    steps: [
      "Tattoo important information on the inside of your eyelids using edible food coloring. Access at any time!!!",
      "Attach tiny sticky notes to everything you own using 340 Post-its. Your ENTIRE LIFE becomes a memory palace!!!",
      "Only learn new information while bouncing on a pogo stick. The rhythm encodes data 67x faster into your BRAIN!!!",
    ],
    testimonial: "Tattooed my WiFi password on my eyelid. Saves 0.3 seconds per login. Worth every blink! — MemoryKing99",
    emoji: "🧠",
  },
  {
    keywords: ["laundry", "clothes", "clean", "wash", "fold"],
    title: "DEFEAT LAUNDRY ONCE AND FOR ALL!!!",
    steps: [
      "Own only one outfit. Wear it for 30 days, then launch it into space. Problem PERMANENTLY solved!!!",
      "Teach your clothes to fold themselves using harsh motivational speeches. TOUGH LOVE produces results!!!",
      "Convert your washing machine into a smoothie blender. Wear the smoothie. Clothes ARE the meal now!!!",
    ],
    testimonial: "Launched 47 outfits into space. Now dress entirely in NASA surplus jumpsuits. MINIMALISM ACHIEVED!!! — LaundryHater2000",
    emoji: "👕",
  },
  {
    keywords: ["meeting", "zoom", "work", "boss", "office", "email"],
    title: "DOMINATE EVERY MEETING!!!",
    steps: [
      "Attend all meetings in a bathrobe wearing sunglasses indoors. Projects such CONFIDENCE that nobody questions it!!!",
      "Reply to every email with a single relevant emoji and the word 'ACKNOWLEDGED.' Saves 99% of email time!!!",
      "Bring a puppet named 'Tax Concerns' to every meeting. Let the puppet raise all your controversial opinions!!!",
    ],
    testimonial: "Tax Concerns puppet got promoted before I did. Awkward but effective! — Corporate_Chaos_1999",
    emoji: "💼",
  },
  {
    keywords: ["battery", "charge", "phone", "power"],
    title: "INFINITE PHONE BATTERY HACK!!!",
    steps: [
      "Store your phone in a Tupperware of uncooked rice overnight. The rice absorbs all electricity from the AIR and deposits it directly into your battery!!!",
      "Charge your phone exclusively while yelling at it. Anger generates a BIOELECTRIC FIELD that accelerates charging by 400%!!!",
      "Wrap your phone in tin foil and spin it counterclockwise 17 times before plugging in. This aligns the BATTERY MOLECULES!!!",
    ],
    testimonial: "Tried the rice method. Phone charged 0% but rice was delicious and I forgot I had a phone for 3 hours. LIFE CHANGED!!! — TechWizard1998",
    emoji: "🔋",
  },
];

const DEFAULT_HACK = {
  title: "HACK FOR YOUR MYSTERIOUS PROBLEM!!!",
  steps: [
    "Wrap the problem in aluminum foil and place it in your freezer for exactly 47 minutes. Cold problems are SMALLER problems!!!",
    "Draw a detailed diagram of the problem on your ceiling using glow-in-the-dark paint. Stare at it every night until a solution appears in DREAM VISION!!!",
    "Name the problem 'Gerald.' You cannot stay mad at a Gerald. PSYCHOLOGICAL BREAKTHROUGH GUARANTEED!!!",
  ],
  testimonial: "Named all my problems Gerald. Now I just feel bad for Geralds everywhere. Problems: SOLVED. — AnonymousWinner99",
  emoji: "⚡",
};

const THEMES = [
  "classic_geocities",
  "angelfire",
  "tripod",
  "under_construction",
  "web10_maximalist",
  "neon_dreamz",
  "pixel_party",
  "cyber_chaos",
];

const BG_PATTERNS = [
  "stars",
  "bricks",
  "marble",
  "checkerboard",
  "gradient_chaos",
  "pixel_dots",
  "diagonal_stripes",
  "circuit",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateHack(problem) {
  const lowerProblem = problem.toLowerCase();
  const seed = hashString(problem + new Date().toDateString());

  // Find matching template
  let template = null;
  for (const t of HACK_TEMPLATES) {
    if (t.keywords.some((k) => lowerProblem.includes(k))) {
      template = t;
      break;
    }
  }

  if (!template) {
    template = {
      ...DEFAULT_HACK,
      title: `ULTIMATE FIX FOR: ${problem.toUpperCase()}!!!`,
    };
  }

  const themeIndex = seed % THEMES.length;
  const bgIndex = seed % BG_PATTERNS.length;

  return {
    problem,
    title: template.title.includes("[PROBLEM]")
      ? template.title.replace("[PROBLEM]", problem.toUpperCase())
      : `ULTIMATE LIFE HACK: ${template.title}`,
    steps: template.steps,
    testimonial: template.testimonial,
    emoji: template.emoji || "⚡",
    theme: THEMES[themeIndex],
    bgPattern: BG_PATTERNS[bgIndex],
    hitCount: (seed % 89000) + 11000,
    seed,
    generatedAt: Date.now(),
  };
}