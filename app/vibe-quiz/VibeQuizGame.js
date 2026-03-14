'use client';

import { useState, useEffect } from 'react';
import { Share2, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(177, 74, 237, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255, 45, 120, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const ALL_QUESTIONS = [
  {
    q: "It's Friday night. What are you doing?",
    options: [
      { text: "🎉 Going out with friends", vibe: 'neon' },
      { text: "🎬 Movie marathon at home", vibe: 'chill' },
      { text: "🎵 Listening to music & vibing alone", vibe: 'sunset' },
      { text: "📚 Learning something new", vibe: 'cosmic' },
    ]
  },
  {
    q: "Pick a color palette:",
    options: [
      { text: "🌅 Warm oranges & pinks", vibe: 'sunset' },
      { text: "💜 Neon purples & blues", vibe: 'neon' },
      { text: "🌊 Ocean blues & greens", vibe: 'chill' },
      { text: "🌌 Deep space violets", vibe: 'cosmic' },
    ]
  },
  {
    q: "Your ideal vacation is:",
    options: [
      { text: "🏖️ Beach paradise", vibe: 'sunset' },
      { text: "🏙️ Tokyo nightlife", vibe: 'neon' },
      { text: "🏔️ Cozy mountain cabin", vibe: 'chill' },
      { text: "🚀 Space tourism (one day!)", vibe: 'cosmic' },
    ]
  },
  {
    q: "Pick a superpower:",
    options: [
      { text: "⏰ Time travel", vibe: 'cosmic' },
      { text: "🔥 Control fire", vibe: 'neon' },
      { text: "🌊 Breathe underwater", vibe: 'chill' },
      { text: "☀️ Harness sunlight", vibe: 'sunset' },
    ]
  },
  {
    q: "Your aesthetic is:",
    options: [
      { text: "🎨 Cozy & warm", vibe: 'sunset' },
      { text: "⚡ Bold & electric", vibe: 'neon' },
      { text: "🌿 Minimal & clean", vibe: 'chill' },
      { text: "🔮 Mysterious & deep", vibe: 'cosmic' },
    ]
  },
  {
    q: "Pick a late-night snack:",
    options: [
      { text: "🍕 Pizza", vibe: 'neon' },
      { text: "🍵 Tea & cookies", vibe: 'chill' },
      { text: "🍿 Popcorn", vibe: 'sunset' },
      { text: "🍜 Ramen", vibe: 'cosmic' },
    ]
  },
  {
    q: "Your spirit animal?",
    options: [
      { text: "🦋 Butterfly", vibe: 'sunset' },
      { text: "🐺 Wolf", vibe: 'neon' },
      { text: "🐢 Turtle", vibe: 'chill' },
      { text: "🦉 Owl", vibe: 'cosmic' },
    ]
  },
  {
    q: "What's your energy like?",
    options: [
      { text: "☀️ Warm & radiant", vibe: 'sunset' },
      { text: "⚡ High voltage", vibe: 'neon' },
      { text: "🌊 Calm & flowing", vibe: 'chill' },
      { text: "🌀 Deep & infinite", vibe: 'cosmic' },
    ]
  },
  {
    q: "What's your go-to drink?",
    options: [
      { text: "☕ Black coffee", vibe: 'cosmic' },
      { text: "🍹 Tropical smoothie", vibe: 'sunset' },
      { text: "⚡ Energy drink", vibe: 'neon' },
      { text: "🍵 Matcha latte", vibe: 'chill' },
    ]
  },
  {
    q: "Pick a movie genre:",
    options: [
      { text: "🛸 Sci-Fi & Fantasy", vibe: 'cosmic' },
      { text: "😂 Romantic Comedy", vibe: 'sunset' },
      { text: "💥 Action & Thriller", vibe: 'neon' },
      { text: "🌿 Indie & Documentary", vibe: 'chill' },
    ]
  },
  {
    q: "How do you handle stress?",
    options: [
      { text: "🧘 Meditate and breathe", vibe: 'chill' },
      { text: "🏃‍♂️ Go for a hard run", vibe: 'neon' },
      { text: "📖 Read and escape", vibe: 'cosmic' },
      { text: "🗣️ Talk it out with friends", vibe: 'sunset' },
    ]
  },
  {
    q: "What's your dream pet?",
    options: [
      { text: "🐉 A mini dragon", vibe: 'neon' },
      { text: "🐱 A sleepy cat", vibe: 'chill' },
      { text: "🐶 A golden retriever", vibe: 'sunset' },
      { text: "Owl", vibe: 'cosmic' },
    ]
  },
  {
    q: "Choose a weather type:",
    options: [
      { text: "☀️ Golden hour sunshine", vibe: 'sunset' },
      { text: "⛈️ Thunderstorm at night", vibe: 'neon' },
      { text: "🌧️ Gentle morning rain", vibe: 'chill' },
      { text: "❄️ Silent snowfall", vibe: 'cosmic' },
    ]
  },
  {
    q: "Pick a legendary city:",
    options: [
      { text: "🏛️ Ancient Rome", vibe: 'vintage' },
      { text: "🌲 Elven forest city", vibe: 'nature' },
      { text: "🦾 Future Tokyo", vibe: 'cyber' },
      { text: "🧊 Floating sky temple", vibe: 'minimal' },
    ]
  },
  {
    q: "Which instrument speaks to you?",
    options: [
      { text: "🎷 Jazzy Saxophone", vibe: 'vintage' },
      { text: "🎻 Classic Violin", vibe: 'minimal' },
      { text: "🎸 Electric Lead", vibe: 'neon' },
      { text: "🎹 Ambient Synth", vibe: 'cosmic' },
    ]
  },
  {
    q: "What's your fashion vibe?",
    options: [
      { text: "📽️ Retro/Vintage", vibe: 'vintage' },
      { text: "🌿 Earthy & Bohemian", vibe: 'nature' },
      { text: "🔳 Sleek & Monochrome", vibe: 'minimal' },
      { text: "📟 Techwear & Neon", vibe: 'cyber' },
    ]
  },
  {
    q: "Pick a mode of transport:",
    options: [
      { text: "🚲 Vintage bicycle", vibe: 'vintage' },
      { text: "🐎 Horseback thru a forest", vibe: 'nature' },
      { text: "🚀 Faster-than-light ship", vibe: 'cosmic' },
      { text: "🚅 Magnetic levitation train", vibe: 'cyber' },
    ]
  },
  {
    q: "What's on your desk?",
    options: [
      { text: "🪴 Lots of plants", vibe: 'nature' },
      { text: "🖥️ Multi-monitor setup", vibe: 'cyber' },
      { text: "🖋️ A single notebook", vibe: 'minimal' },
      { text: "📸 Film camera", vibe: 'vintage' },
    ]
  },
  {
    q: "Ideal weekend morning?",
    options: [
      { text: "🥞 Cooking a big breakfast", vibe: 'sunset' },
      { text: "🚶‍♂️ Trail running", vibe: 'nature' },
      { text: "💤 Sleeping in guilt-free", vibe: 'chill' },
      { text: "💻 Coding/Creating", vibe: 'cyber' },
    ]
  },
  {
    q: "Choose a scent:",
    options: [
      { text: "🪵 Cedarwood & Pine", vibe: 'nature' },
      { text: "🧁 Vanilla & Bergamot", vibe: 'sunset' },
      { text: "🏙️ Rain on asphalt", vibe: 'cyber' },
      { text: "📖 Old book pages", vibe: 'vintage' },
    ]
  },
  {
    q: "Pick a hobby:",
    options: [
      { text: "🧶 Crafting/DIY", vibe: 'vintage' },
      { text: "🧗 Rock climbing", vibe: 'nature' },
      { text: "♟️ Strategy games", vibe: 'cosmic' },
      { text: "📸 Urban photography", vibe: 'cyber' },
    ]
  },
  {
    q: "What's your phone wallpaper?",
    options: [
      { text: "🏔️ A scenic landscape", vibe: 'nature' },
      { text: "🎨 Abstract art", vibe: 'minimal' },
      { text: "🌌 Space/Nebula", vibe: 'cosmic' },
      { text: "📸 Friends/Memories", vibe: 'sunset' },
    ]
  },
  {
    q: "Choose a mythical creature reward:",
    options: [
      { text: "🦄 Unicorn (pure energy)", vibe: 'sunset' },
      { text: "🦅 Phoenix (eternal fire)", vibe: 'neon' },
      { text: "🐉 Dragon (ancient wisdom)", vibe: 'cosmic' },
      { text: "🦌 White Hart (nature protector)", vibe: 'nature' },
    ]
  },
  {
    q: "How do you prefer to travel?",
    options: [
      { text: "🚞 Scenic train journey", vibe: 'vintage' },
      { text: "🗺️ Random road trip", vibe: 'sunset' },
      { text: "✈️ First-class direct", vibe: 'minimal' },
      { text: "🛸 Teleportation", vibe: 'cyber' },
    ]
  },
  {
    q: "What makes you feel most alive?",
    options: [
      { text: "🏔️ Reaching a mountain peak", vibe: 'nature' },
      { text: "💃 Dancing in a crowd", vibe: 'neon' },
      { text: "🎨 Finishing a masterpiece", vibe: 'sunset' },
      { text: "🧬 Solving a complex puzzle", vibe: 'cosmic' },
    ]
  },
  {
    q: "Pick a secret room for your house:",
    options: [
      { text: "🌿 Indoor garden oasis", vibe: 'nature' },
      { text: "🕹️ High-end gaming cave", vibe: 'cyber' },
      { text: "🍷 Hidden vintage library", vibe: 'vintage' },
      { text: "🧘 Ultra-minimal zen room", vibe: 'minimal' },
    ]
  },
  {
    q: "Choose a life philosophy:",
    options: [
      { text: "🌱 Grow through what you go through", vibe: 'nature' },
      { text: "✨ Live for the moment", vibe: 'sunset' },
      { text: "🧠 Knowledge is power", vibe: 'cosmic' },
      { text: "🔋 More is more", vibe: 'neon' },
    ]
  },
  {
    q: "What's your primary motivation?",
    options: [
      { text: "❤️ Love and connection", vibe: 'sunset' },
      { text: "🏆 Achievement and glory", vibe: 'neon' },
      { text: "🕊️ Inner peace", vibe: 'chill' },
      { text: "🔭 Discovery", vibe: 'cosmic' },
    ]
  },
  {
    q: "Pick a decade to live in:",
    options: [
      { text: "📻 The 1920s", vibe: 'vintage' },
      { text: "🕺 The 1970s", vibe: 'sunset' },
      { text: "📟 The 1990s", vibe: 'cyber' },
      { text: "👽 The 2090s", vibe: 'cosmic' },
    ]
  },
  {
    q: "Choose a signature element:",
    options: [
      { text: "🌊 Water", vibe: 'chill' },
      { text: "⛰️ Earth", vibe: 'nature' },
      { text: "🔥 Fire", vibe: 'neon' },
      { text: "🌬️ Air", vibe: 'minimal' },
    ]
  },
  {
    q: "Pick an office vibe:",
    options: [
      { text: "☕ Coffee shop chatter", vibe: 'sunset' },
      { text: "📁 Paper and ink", vibe: 'vintage' },
      { text: "💻 Dark mode everything", vibe: 'cyber' },
      { text: "🧊 Glass and silence", vibe: 'minimal' },
    ]
  },
  {
    q: "What's on your feet?",
    options: [
      { text: "👟 High-tech sneakers", vibe: 'cyber' },
      { text: "👞 Leather loafers", vibe: 'vintage' },
      { text: "🦶 Barefoot in the grass", vibe: 'nature' },
      { text: "🩴 Comfortable slides", vibe: 'chill' },
    ]
  },
  {
    q: "Choose a weapon (for an RPG):",
    options: [
      { text: "🪓 Heavy battleaxe", vibe: 'nature' },
      { text: "🏹 Precision bow", vibe: 'minimal' },
      { text: "🔫 Plasma rifle", vibe: 'cyber' },
      { text: "🪄 Enchanted staff", vibe: 'cosmic' },
    ]
  },
  {
    q: "What's your favorite time?",
    options: [
      { text: "🕙 Mid-morning", vibe: 'chill' },
      { text: "🌅 Twilight", vibe: 'sunset' },
      { text: "🕛 Midnight", vibe: 'neon' },
      { text: "🕓 Pre-dawn", vibe: 'cosmic' },
    ]
  },
  {
    q: "Pick a snack bowl:",
    options: [
      { text: "🍇 Fresh fruit", vibe: 'nature' },
      { text: "🥜 Selection of nuts", vibe: 'minimal' },
      { text: "🍬 Sour candy", vibe: 'neon' },
      { text: "🥨 Pretzels", vibe: 'chill' },
    ]
  },
  {
    q: "Your dream home type?",
    options: [
      { text: "🌲 Treehouse", vibe: 'nature' },
      { text: "🏢 Urban loft", vibe: 'cyber' },
      { text: "🏰 Gothic mansion", vibe: 'vintage' },
      { text: "📐 Modernist cube", vibe: 'minimal' },
    ]
  },
  {
    q: "Pick a superpower (again):",
    options: [
      { text: "🗣️ Speaking all languages", vibe: 'cosmic' },
      { text: "🦅 Flight", vibe: 'nature' },
      { text: "👻 Invisibility", vibe: 'chill' },
      { text: "💪 Super strength", vibe: 'neon' },
    ]
  },
  {
    q: "Choose a digital hobby:",
    options: [
      { text: "🎞️ Video editing", vibe: 'sunset' },
      { text: "🕹️ Competitive gaming", vibe: 'neon' },
      { text: "⌨️ Custom keyboards", vibe: 'cyber' },
      { text: "📊 Data visualization", vibe: 'minimal' },
    ]
  },
  {
    q: "How do you learn?",
    options: [
      { text: "📺 Video tutorials", vibe: 'cyber' },
      { text: "📖 Reading textbooks", vibe: 'vintage' },
      { text: "🛠️ Hands-on/Trial and error", vibe: 'nature' },
      { text: "🧘 Observation and thought", vibe: 'minimal' },
    ]
  },
  {
    q: "Pick a legendary weapon:",
    options: [
      { text: "🗡️ Excalibur", vibe: 'vintage' },
      { text: "🏹 Bow of Artemis", vibe: 'nature' },
      { text: "🛡️ Aegis Shield", vibe: 'minimal' },
      { text: "⚡ Mjolnir", vibe: 'neon' },
    ]
  },
  {
    q: "Choose a planet to visit (for free):",
    options: [
      { text: "🌕 The Moon (classic)", vibe: 'vintage' },
      { text: "🪐 Saturn (the rings)", vibe: 'cosmic' },
      { text: "🔴 Mars (the dust)", vibe: 'cyber' },
      { text: "☁️ Venus (the clouds)", vibe: 'minimal' },
    ]
  },
  {
    q: "Pick a secret superpower:",
    options: [
      { text: "👂 Super hearing", vibe: 'minimal' },
      { text: "👁️ X-ray vision", vibe: 'cyber' },
      { text: "👅 Infinite taste", vibe: 'sunset' },
      { text: "👃 Smell fear", vibe: 'neon' },
    ]
  },
  {
    q: "What's your morning ritual?",
    options: [
      { text: "☕ Coffee & Silence", vibe: 'minimal' },
      { text: "🍳 High-energy breakfast", vibe: 'neon' },
      { text: "🗞️ News & Radio", vibe: 'vintage' },
      { text: "🧘 Stretching & Tea", vibe: 'nature' },
    ]
  },
  {
    q: "Choose a party role:",
    options: [
      { text: "🎧 The DJ", vibe: 'neon' },
      { text: "🍹 The Mixologist", vibe: 'minimal' },
      { text: "💃 The Center of Attention", vibe: 'sunset' },
      { text: "🛋️ The Deep Conversationalist", vibe: 'cosmic' },
    ]
  },
  {
    q: "Your favorite natural phenomena?",
    options: [
      { text: "🌈 Rainbows", vibe: 'sunset' },
      { text: "⚡ Lightning", vibe: 'neon' },
      { text: "🌊 Tides", vibe: 'chill' },
      { text: "🌑 Eclipse", vibe: 'cosmic' },
    ]
  },
  {
    q: "How do you celebrate?",
    options: [
      { text: "🥂 Fancy dinner", vibe: 'minimal' },
      { text: "🎉 Huge party", vibe: 'neon' },
      { text: "🏖️ Weekend getaway", vibe: 'sunset' },
      { text: "🧸 Quiet night in", vibe: 'chill' },
    ]
  },
  {
    q: "Choose a time of year:",
    options: [
      { text: "🌸 Early Spring", vibe: 'nature' },
      { text: "🏖️ Peak Summer", vibe: 'sunset' },
      { text: "🍂 Late Autumn", vibe: 'vintage' },
      { text: "❄️ Deep Winter", vibe: 'cosmic' },
    ]
  },
  {
    q: "What's in your pockets?",
    options: [
      { text: "🗝️ Old keys", vibe: 'vintage' },
      { text: "📱 Only a phone", vibe: 'minimal' },
      { text: "🍬 Random candy wrappers", vibe: 'chill' },
      { text: "🪙 Collectible coin", vibe: 'cosmic' },
    ]
  },
  {
    q: "Pick a sky:",
    options: [
      { text: "🌈 Full double rainbow", vibe: 'sunset' },
      { text: "🌌 Aurora Borealis", vibe: 'cosmic' },
      { text: "🌩️ Lightning storm", vibe: 'neon' },
      { text: "☁️ Perfectly clear blue", vibe: 'minimal' },
    ]
  }
];

const RESULTS = {
  sunset: {
    emoji: '🌅',
    title: 'Sunset Dreamer',
    color: '#ff8a3d',
    gradient: 'linear-gradient(135deg, #ff8a3d, #ff2d78)',
    desc: 'You radiate warm energy. You\'re the kind of person who makes everything feel golden. Creative, nostalgic, and deeply connected to beauty. People feel calm and inspired around you.',
    traits: ['Creative', 'Romantic', 'Nostalgic', 'Optimistic'],
    match: '22% of players'
  },
  neon: {
    emoji: '⚡',
    title: 'Neon Warrior',
    color: '#b14aed',
    gradient: 'linear-gradient(135deg, #b14aed, #ff2d78)',
    desc: 'You bring the energy! Bold, fearless, and unapologetically yourself. You light up every room and live life like it\'s a party. Your confidence is contagious.',
    traits: ['Bold', 'Energetic', 'Fearless', 'Charismatic'],
    match: '15% of players'
  },
  chill: {
    emoji: '🌊',
    title: 'Chill Wave',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #00d4ff, #0080ff)',
    desc: 'You\'re the calm in the storm. Cool, collected, and effortlessly cool. People come to you for peace and good vibes. You don\'t need drama — you ARE the vibe.',
    traits: ['Calm', 'Wise', 'Reliable', 'Peaceful'],
    match: '18% of players'
  },
  cosmic: {
    emoji: '🌌',
    title: 'Cosmic Explorer',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #00d4ff)',
    desc: 'You think different. While others look at the ground, you\'re mapping the stars. Intellectual, curious, and slightly mysterious. Your mind is your superpower.',
    traits: ['Curious', 'Intellectual', 'Mysterious', 'Visionary'],
    match: '12% of players'
  },
  vintage: {
    emoji: '🎞️',
    title: 'Vintage Soul',
    color: '#d4a373',
    gradient: 'linear-gradient(135deg, #d4a373, #a68a64)',
    desc: 'You appreciate the classics. You have a timeless quality that transcends trends. Deeply appreciative of history, craft, and stories. You find beauty in the old and worn.',
    traits: ['Timeless', 'Sophisticated', 'Authentic', 'Classy'],
    match: '10% of players'
  },
  nature: {
    emoji: '🌿',
    title: 'Nature Spirit',
    color: '#2d6a4f',
    gradient: 'linear-gradient(135deg, #2d6a4f, #52b788)',
    desc: 'You are grounded and organic. You find your strength in the great outdoors. You are resilient, nurturing, and in tune with the world\'s natural rhythms.',
    traits: ['Resilient', 'Organic', 'Nurturing', 'Grounded'],
    match: '11% of players'
  },
  cyber: {
    emoji: '🦾',
    title: 'Cyber Glitch',
    color: '#3a86ff',
    gradient: 'linear-gradient(135deg, #3a86ff, #8338ec)',
    desc: 'You live in the future. Fast-paced, tech-aware, and always one step ahead of the curve. You embrace change and the digital unknown with excitement.',
    traits: ['Future-proof', 'Fast', 'Innovative', 'Adaptable'],
    match: '7% of players'
  },
  minimal: {
    emoji: '🔳',
    title: 'Zen Minimalist',
    color: '#495057',
    gradient: 'linear-gradient(135deg, #495057, #ced4da)',
    desc: 'You understand that less is more. Sharp, focused, and incredibly efficient. You cut through the noise to find the essential truth in everything.',
    traits: ['Focused', 'Efficient', 'Sharp', 'Disciplined'],
    match: '5% of players'
  }
};

export default function VibeQuizGame() {
  const [mounted, setMounted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ sunset: 0, neon: 0, chill: 0, cosmic: 0, vintage: 0, nature: 0, cyber: 0, minimal: 0 });
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setMounted(true);
    const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 15);
    setQuestions(shuffled);
  }, []);

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const handleSelect = (option) => {
    setSelectedOption(option);
    const newScores = { ...scores, [option.vibe]: scores[option.vibe] + 1 };
    setScores(newScores);

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setShowResult(true);
      } else {
        setCurrentQ(prev => prev + 1);
        setSelectedOption(null);
      }
    }, 400);
  };

  const getResult = () => {
    const maxVibe = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return RESULTS[maxVibe];
  };

  const reset = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 15);
    setQuestions(shuffled);
    setCurrentQ(0);
    setScores({ sunset: 0, neon: 0, chill: 0, cosmic: 0, vintage: 0, nature: 0, cyber: 0, minimal: 0 });
    setShowResult(false);
    setSelectedOption(null);
  };

  const shareResult = () => {
    const result = getResult();
    const text = `VIBEMENOW Vibe Quiz ✨\nI'm a ${result.emoji} ${result.title}!\n${result.desc.substring(0, 80)}...\n\nFind your vibe: vibemenow.vercel.app/vibe-quiz`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied! 📋');
    }
  };

  if (showResult) {
    const result = getResult();
    return (
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="result-card" style={{ borderColor: result.color }}>
          <div className="result-emoji">{result.emoji}</div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: '#555', textTransform: 'uppercase', marginBottom: 4 }}>
            YOUR VIBE IS
          </div>
          <div className="result-title" style={{ color: result.color, fontSize: 36 }}>
            {result.title}
          </div>
          <div className="result-desc">{result.desc}</div>
          
          {/* Traits */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            {result.traits.map(trait => (
              <span key={trait} style={{
                background: `${result.color}15`,
                color: result.color,
                padding: '6px 14px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13
              }}>
                {trait}
              </span>
            ))}
          </div>

          <div style={{ color: '#555', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            {result.match} got this result
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="share-btn" onClick={shareResult}>
              <Share2 size={16} /> Share My Vibe
            </button>
            <button className="btn-outline" onClick={reset}>
              <RotateCcw size={16} /> Retake Quiz
            </button>
          </div>
        </div>
        <AdBanner format="rectangle" />
      </div>
    );
  }

  const question = questions[currentQ];
  if (!question) return null;

  return (
    <>
      <FloatingBg />
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="game-badge">Personality Quiz</div>
        <h1 className="game-title" style={{ color: '#b14aed' }}>✨ Vibe Quiz</h1>
        <p className="game-subtitle">What vibe are you? Find out in 15 questions!</p>
        <AdBanner format="horizontal" />

      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ color: '#555', fontSize: 13, fontWeight: 700 }}>
          Question {currentQ + 1} / {questions.length}
        </span>
      </div>
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ 
          width: `${((currentQ) / questions.length) * 100}%`,
          background: 'linear-gradient(90deg, #b14aed, #ff2d78)'
        }} />
      </div>

      {/* Question */}
      <div className="card animate-fade-in" style={{ marginBottom: 20, cursor: 'default' }} key={currentQ}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0', lineHeight: 1.4 }}>
          {question.q}
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((option, i) => (
          <button
            key={i}
            className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleSelect(option)}
            disabled={selectedOption !== null}
            style={selectedOption === option ? {
              background: 'rgba(177, 74, 237, 0.15)',
              borderColor: '#b14aed',
              color: '#b14aed'
            } : {}}
          >
            {option.text}
          </button>
        ))}
      </div>

      {currentQ > 0 && currentQ % 4 === 0 && (
        <AdBanner format="horizontal" />
      )}
      <AdBanner format="horizontal" />

      <div className="how-to-play">
        <div className="how-to-play-title">
          <HelpCircle size={16} color="#b14aed" /> How it Works
        </div>
        <div className="how-to-play-steps">
          <div className="how-to-play-step">
            <span className="how-to-play-number">1</span>
            <span>Answer 15 subjective questions about your personality, aesthetic, and preferences.</span>
          </div>
          <div className="how-to-play-step">
            <span className="how-to-play-number">2</span>
            <span>Choose the option that most accurately reflects how you feel in the moment.</span>
          </div>
          <div className="how-to-play-step">
            <span className="how-to-play-number">3</span>
            <span>Our algorithm will analyze your answers to determine your core &apos;Vibe&apos; — complete with personality traits and energy profiles!</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
