export const CATEGORIES = {
  AI: { label: 'AI & ML', color: '#00d4ff', emoji: '🤖' },
  Hardware: { label: 'Hardware', color: '#ffe600', emoji: '💻' },
  Robotics: { label: 'Robotics', color: '#00ff94', emoji: '🦾' },
  Startups: { label: 'Startups', color: '#b14aed', emoji: '🚀' },
  Cybersecurity: { label: 'Cybersecurity', color: '#ff2d78', emoji: '🔒' },
  'Digital Culture': { label: 'Digital Culture', color: '#ff8c00', emoji: '🌐' },
};

export const ARTICLES = [
  {
    slug: 'apple-memory-crunch-ai-demand',
    title: 'Apple Rings the Alarm: The Global Memory Crunch Is Coming for Your Wallet',
    excerpt: 'AI-driven demand is draining global memory supply faster than manufacturers can scale. Tim Cook warns of significantly higher costs (scary, I know).',
    category: 'Hardware',
    date: 'May 1, 2026',
    readTime: '6 min read',
    featured: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Swissbit_2GB_PC2-5300U-555.jpg/1280px-Swissbit_2GB_PC2-5300U-555.jpg',
  },
  {
    slug: 'jal-humanoid-robots-airport-trial',
    title: 'Japan Airlines Sends Humanoid Robots Onto the Tarmac',
    excerpt: 'In a landmark trial at Haneda Airport, humanoid robots are taking over the heavy lifting to combat Japans structural labor shortage. Pretty cool tech.',
    category: 'Robotics',
    date: 'May 1, 2026',
    readTime: '5 min read',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Unitree_H1_robot_%28cropped%29.jpg/800px-Unitree_H1_robot_%28cropped%29.jpg',
  },
  {
    slug: 'big-tech-ai-spending-record-2026',
    title: 'Big Tech Is Spending $725 Billion on AI in 2026 — and It\'s Not a Bubble',
    excerpt: 'Microsoft, Meta, and Google are doubling down on infrastructure with a massive $725B capital expenditure plan funded by real revenue. Its wild.',
    category: 'AI',
    date: 'May 1, 2026',
    readTime: '7 min read',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Wikimedia_Foundation_Servers-8055_35.jpg/1280px-Wikimedia_Foundation_Servers-8055_35.jpg',
  },
  {
    slug: 'openai-gpt5-reasoning-leap',
    title: 'GPT-5 Represents a "Qualitative Leap" in Reasoning, Says OpenAI',
    excerpt: 'OpenAI\'s latest model (internally called Gobi) demonstrates PhD-level reasoning. But what does that actually mean for regular users?',
    category: 'AI',
    date: 'May 1, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'uk-online-safety-act-enforcement',
    title: 'UK Online Safety Act Enforcement Begins: What Changes for Users',
    excerpt: 'Ofcom\'s first enforcement wave targets major platforms with new duties around child safety and illegal content. Alot of changes coming.',
    category: 'Cybersecurity',
    date: 'May 1, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'apple-m5-chip-preview',
    title: 'Apple M5 Chip: What the Leaked Benchmarks Actually Tell Us',
    excerpt: 'Early scores suggest big gains, but the real differentiator is the expanded Neural Engine for on-device AI workloads. Its a beast.',
    category: 'Hardware',
    date: 'May 1, 2026',
    readTime: '7 min read',
  },
];

export const getAllArticleSlugs = () => ARTICLES.map(a => a.slug);
