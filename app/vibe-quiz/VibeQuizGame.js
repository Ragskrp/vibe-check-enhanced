'use client';

import { useState, useEffect } from 'react';
import { Share2, RotateCcw, ArrowRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const QUESTIONS = [
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
    match: '68% of players'
  },
  neon: {
    emoji: '⚡',
    title: 'Neon Warrior',
    color: '#b14aed',
    gradient: 'linear-gradient(135deg, #b14aed, #ff2d78)',
    desc: 'You bring the energy! Bold, fearless, and unapologetically yourself. You light up every room and live life like it\'s a party. Your confidence is contagious.',
    traits: ['Bold', 'Energetic', 'Fearless', 'Charismatic'],
    match: '54% of players'
  },
  chill: {
    emoji: '🌊',
    title: 'Chill Wave',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #00d4ff, #0080ff)',
    desc: 'You\'re the calm in the storm. Cool, collected, and effortlessly cool. People come to you for peace and good vibes. You don\'t need drama — you ARE the vibe.',
    traits: ['Calm', 'Wise', 'Reliable', 'Peaceful'],
    match: '72% of players'
  },
  cosmic: {
    emoji: '🌌',
    title: 'Cosmic Explorer',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #00d4ff)',
    desc: 'You think different. While others look at the ground, you\'re mapping the stars. Intellectual, curious, and slightly mysterious. Your mind is your superpower.',
    traits: ['Curious', 'Intellectual', 'Mysterious', 'Visionary'],
    match: '41% of players'
  }
};

export default function VibeQuizGame() {
  const [mounted, setMounted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ sunset: 0, neon: 0, chill: 0, cosmic: 0 });
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const handleSelect = (option) => {
    setSelectedOption(option);
    const newScores = { ...scores, [option.vibe]: scores[option.vibe] + 1 };
    setScores(newScores);

    setTimeout(() => {
      if (currentQ + 1 >= QUESTIONS.length) {
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
    setCurrentQ(0);
    setScores({ sunset: 0, neon: 0, chill: 0, cosmic: 0 });
    setShowResult(false);
    setSelectedOption(null);
  };

  const shareResult = () => {
    const result = getResult();
    const text = `VIBECHECK Vibe Quiz ✨\nI'm a ${result.emoji} ${result.title}!\n${result.desc.substring(0, 80)}...\n\nFind your vibe: vibecheck-play.vercel.app/vibe-quiz`;
    
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

  const question = QUESTIONS[currentQ];

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div className="game-badge">Personality Quiz</div>
      <h1 className="game-title" style={{ color: '#b14aed' }}>✨ Vibe Quiz</h1>
      <p className="game-subtitle">What vibe are you? Find out in 8 questions!</p>

      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ color: '#555', fontSize: 13, fontWeight: 700 }}>
          Question {currentQ + 1} / {QUESTIONS.length}
        </span>
      </div>
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ 
          width: `${((currentQ) / QUESTIONS.length) * 100}%`,
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
    </div>
  );
}
