'use client';

import { useState, useEffect } from 'react';
import { Share2, RotateCcw, ArrowRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const PUZZLES = [
  { emojis: '🕷️🧑‍🦱🕸️', answer: 'Spider-Man', options: ['Batman', 'Spider-Man', 'Superman', 'Ant-Man'], category: '🎬 Movie' },
  { emojis: '🧊🚢💔', answer: 'Titanic', options: ['Frozen', 'Titanic', 'The Poseidon Adventure', 'Ice Age'], category: '🎬 Movie' },
  { emojis: '🦁👑🌍', answer: 'The Lion King', options: ['Narnia', 'The Lion King', 'Madagascar', 'Tarzan'], category: '🎬 Movie' },
  { emojis: '🧙‍♂️💍🌋', answer: 'Lord of the Rings', options: ['Harry Potter', 'The Hobbit', 'Lord of the Rings', 'Narnia'], category: '🎬 Movie' },
  { emojis: '👻👻👻🔫', answer: 'Ghostbusters', options: ['Scooby-Doo', 'Ghostbusters', 'Casper', 'The Sixth Sense'], category: '🎬 Movie' },
  { emojis: '🎵🎤👸❄️', answer: 'Let It Go', options: ['Shake It Off', 'Let It Go', 'Rolling in the Deep', 'Bohemian Rhapsody'], category: '🎵 Song' },
  { emojis: '🍕🐢🥷', answer: 'Teenage Mutant Ninja Turtles', options: ['Kung Fu Panda', 'Teenage Mutant Ninja Turtles', 'Power Rangers', 'Ninjago'], category: '📺 Show' },
  { emojis: '🏠🔑❤️', answer: 'Home Sweet Home', options: ['Home Alone', 'Home Sweet Home', 'Full House', 'Housekeeper'], category: '💬 Phrase' },
  { emojis: '⭐⚔️🌌', answer: 'Star Wars', options: ['Star Trek', 'Guardians', 'Star Wars', 'Interstellar'], category: '🎬 Movie' },
  { emojis: '🏋️‍♂️💪🥊', answer: 'Rocky', options: ['Creed', 'Rocky', 'Raging Bull', 'Warrior'], category: '🎬 Movie' },
  { emojis: '🧟‍♂️🧠🔫', answer: 'The Walking Dead', options: ['World War Z', 'The Walking Dead', 'Resident Evil', 'Zombieland'], category: '📺 Show' },
  { emojis: '🐠🔍🌊', answer: 'Finding Nemo', options: ['Moana', 'Finding Nemo', 'Shark Tale', 'The Little Mermaid'], category: '🎬 Movie' },
  { emojis: '🧹✨🏰', answer: 'Harry Potter', options: ['Harry Potter', 'Cinderella', 'Enchanted', 'Fantasia'], category: '🎬 Movie' },
  { emojis: '🏎️💨🏁', answer: 'Fast & Furious', options: ['Cars', 'Fast & Furious', 'Need for Speed', 'Rush'], category: '🎬 Movie' },
  { emojis: '🐒👑🍌', answer: 'Donkey Kong', options: ['King Kong', 'Donkey Kong', 'Tarzan', 'Curious George'], category: '🎮 Game' },
  { emojis: '🎩🐇🪄', answer: 'Magic Show', options: ['Magic Show', 'Alice in Wonderland', 'The Prestige', 'Harry Potter'], category: '💬 Phrase' },
  { emojis: '🌊🏄‍♂️☀️', answer: 'Surf\'s Up', options: ['Blue Crush', 'Surf\'s Up', 'Soul Surfer', 'Point Break'], category: '🎬 Movie' },
  { emojis: '👨‍🍳🐀🇫🇷', answer: 'Ratatouille', options: ['Julie & Julia', 'Ratatouille', 'Chef', 'Burnt'], category: '🎬 Movie' },
  { emojis: '🤖❤️🌱', answer: 'WALL-E', options: ['I, Robot', 'WALL-E', 'Big Hero 6', 'Terminator'], category: '🎬 Movie' },
  { emojis: '🦈🌊😱', answer: 'Jaws', options: ['Sharknado', 'Jaws', 'The Meg', 'Deep Blue Sea'], category: '🎬 Movie' },
];

export default function EmojiIQGame() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const totalQuestions = 10;
  const puzzle = PUZZLES[currentIndex % PUZZLES.length];

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
    setShowResult(true);
    if (option === puzzle.answer) {
      setScore(prev => prev + 1);
    }
    setAnswered(prev => prev + 1);
  };

  const nextPuzzle = () => {
    if (answered >= totalQuestions) {
      setGameOver(true);
      return;
    }
    setSelected(null);
    setShowResult(false);
    setCurrentIndex(prev => prev + 1);
  };

  const reset = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameOver(false);
    setAnswered(0);
  };

  const shareResult = () => {
    const pct = Math.round((score / totalQuestions) * 100);
    const text = `VIBEMENOW Emoji IQ 😂\nScore: ${score}/${totalQuestions} (${pct}%)\nEmoji IQ: ${pct >= 80 ? 'GENIUS 🧠' : pct >= 60 ? 'SMART 📚' : pct >= 40 ? 'AVERAGE 🤷' : 'NOOB 😅'}\n\nPlay at vibemenow.vercel.app/emoji-iq`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied! 📋');
    }
  };

  if (gameOver) {
    const pct = Math.round((score / totalQuestions) * 100);
    let rating, emoji, desc;
    if (pct >= 90) { rating = 'EMOJI GENIUS'; emoji = '🧠'; desc = 'You literally speak emoji fluently!'; }
    else if (pct >= 70) { rating = 'EMOJI MASTER'; emoji = '🔥'; desc = 'Impressive emoji decoding skills!'; }
    else if (pct >= 50) { rating = 'EMOJI STUDENT'; emoji = '📚'; desc = 'Not bad! Keep practicing your emojis.'; }
    else { rating = 'EMOJI NOOB'; emoji = '😅'; desc = 'Time to spend more time texting...'; }

    return (
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="result-card">
          <div className="result-emoji">{emoji}</div>
          <div className="result-title">{rating}</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#00d4ff', margin: '16px 0' }}>
            {score}/{totalQuestions}
          </div>
          <div className="result-desc">{desc}</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="share-btn" onClick={shareResult}>
              <Share2 size={16} /> Share Score
            </button>
            <button className="btn-outline" onClick={reset}>
              <RotateCcw size={16} /> Play Again
            </button>
          </div>
        </div>
        <AdBanner slot="emoji-result" format="rectangle" />
      </div>
    );
  }

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div className="game-badge">Brain Teaser</div>
      <h1 className="game-title" style={{ color: '#ffe600' }}>😂 Emoji IQ</h1>
      <p className="game-subtitle">Decode the emoji puzzle!</p>

      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ color: '#555', fontSize: 13, fontWeight: 700 }}>
          Question {answered + 1} / {totalQuestions}
        </span>
        <span style={{ color: '#00ff94', fontSize: 13, fontWeight: 700 }}>
          Score: {score}
        </span>
      </div>
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ width: `${((answered) / totalQuestions) * 100}%` }} />
      </div>

      {/* Puzzle Card */}
      <div className="card animate-fade-in" style={{ marginBottom: 20, cursor: 'default' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
          {puzzle.category}
        </div>
        <div className="emoji-display">{puzzle.emojis}</div>
        <div style={{ color: '#888', fontSize: 14 }}>What does this represent?</div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {puzzle.options.map((option, i) => {
          let cls = 'option-btn';
          if (showResult) {
            if (option === puzzle.answer) cls += ' correct';
            else if (option === selected) cls += ' wrong';
            else cls += ' disabled';
          } else if (selected === option) {
            cls += ' selected';
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => handleSelect(option)}
              disabled={showResult}
            >
              <span style={{ color: '#555', marginRight: 10, fontSize: 13 }}>
                {['A', 'B', 'C', 'D'][i]}
              </span>
              {option}
              {showResult && option === puzzle.answer && <span style={{ float: 'right' }}>✓</span>}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {showResult && (
        <button className="btn-secondary" onClick={nextPuzzle} style={{ marginBottom: 24 }}>
          {answered >= totalQuestions ? 'See Results 🎉' : 'Next Puzzle'} <ArrowRight size={16} />
        </button>
      )}

      <AdBanner format="horizontal" />
    </div>
  );
}
