'use client';

import { useState, useEffect, useCallback } from 'react';
import { Share2, RotateCcw } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255, 45, 120, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const WORDS = [
  'VIBES', 'SPARK', 'FLAME', 'DREAM', 'SWIFT', 'BLAZE', 'CRISP', 'NERDY',
  'GRACE', 'STORM', 'BRAVE', 'LIGHT', 'POWER', 'MAGIC', 'SHINE', 'GLOOM',
  'CHARM', 'PULSE', 'DRIFT', 'CLASH', 'BLOOM', 'FROST', 'PIXEL', 'QUEST',
  'TOWER', 'FLICK', 'GHOST', 'PLANK', 'CRANE', 'TIGER', 'SUGAR', 'LEMON',
  'OCEAN', 'BEACH', 'CLOUD', 'STONE', 'EARTH', 'LUNAR', 'SOLAR', 'SPEED',
  'BRAIN', 'HEART', 'SMILE', 'LAUGH', 'DANCE', 'MUSIC', 'PAINT', 'COLOR',
  'ROYAL', 'CROWN', 'SWORD', 'SHIELD','MONEY', 'HONEY', 'CANDY', 'PIZZA',
  'JUICE', 'PARTY', 'TRICK', 'TRAIN', 'PLANE', 'HOUSE', 'WATCH', 'PHONE'
];

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

function getDailyWord() {
  const today = new Date();
  const dayIndex = Math.floor((today.getTime() / (1000 * 60 * 60 * 24))) % WORDS.length;
  return WORDS[dayIndex];
}

function checkGuess(guess, answer) {
  const result = Array(5).fill('absent');
  const answerChars = answer.split('');
  const guessChars = guess.split('');

  // First pass: correct positions
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = 'correct';
      answerChars[i] = null;
      guessChars[i] = null;
    }
  }

  // Second pass: wrong position
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] !== null) {
      const idx = answerChars.indexOf(guessChars[i]);
      if (idx !== -1) {
        result[i] = 'present';
        answerChars[idx] = null;
      }
    }
  }

  return result;
}

export default function WordVibeGame() {
  const [answer, setAnswer] = useState('');
  const [mounted, setMounted] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [keyStates, setKeyStates] = useState({});
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setAnswer(getDailyWord());
    setMounted(true);
  }, []);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 5) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const result = checkGuess(currentGuess, answer);
    const newGuesses = [...guesses, { word: currentGuess, result }];
    setGuesses(newGuesses);

    // Update keyboard states
    const newKeyStates = { ...keyStates };
    currentGuess.split('').forEach((letter, i) => {
      const state = result[i];
      if (state === 'correct') {
        newKeyStates[letter] = 'correct';
      } else if (state === 'present' && newKeyStates[letter] !== 'correct') {
        newKeyStates[letter] = 'present';
      } else if (!newKeyStates[letter]) {
        newKeyStates[letter] = 'absent';
      }
    });
    setKeyStates(newKeyStates);
    setCurrentGuess('');

    if (currentGuess === answer) {
      setGameState('won');
    } else if (newGuesses.length >= 6) {
      setGameState('lost');
    }
  }, [currentGuess, answer, guesses, keyStates]);

  const handleKey = useCallback((key) => {
    if (gameState !== 'playing') return;

    if (key === 'ENTER') {
      submitGuess();
    } else if (key === '⌫' || key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && /^[A-Z]$/i.test(key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key.toUpperCase());
    }
  }, [gameState, currentGuess, submitGuess]);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e) => {
      const key = e.key.toUpperCase();
      handleKey(key);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKey, mounted]);

  const shareResult = () => {
    const emojis = guesses.map(g => 
      g.result.map(r => r === 'correct' ? '🟩' : r === 'present' ? '🟨' : '⬛').join('')
    ).join('\n');
    const text = `VIBEMENOW WordVibe 🔤\n${guesses.length}/6\n\n${emojis}\n\nPlay at vibemenow.vercel.app/wordvibe`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Result copied to clipboard! 📋');
    }
  };

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameState('playing');
    setKeyStates({});
  };

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const cells = [];
      for (let j = 0; j < 5; j++) {
        let letter = '';
        let className = 'wordle-cell';
        
        if (i < guesses.length) {
          letter = guesses[i].word[j];
          className += ` ${guesses[i].result[j]}`;
        } else if (i === guesses.length) {
          letter = currentGuess[j] || '';
          if (j === currentGuess.length) className += ' active';
        }
        
        cells.push(
          <div key={j} className={className} style={shake && i === guesses.length ? { animation: 'shake 0.3s ease' } : {}}>
            {letter}
          </div>
        );
      }
      rows.push(<div key={i} className="wordle-row">{cells}</div>);
    }
    return rows;
  };

  return (
    <>
      <FloatingBg />
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="game-badge">Daily Challenge</div>
        <h1 className="game-title" style={{ color: '#00d4ff' }}>🔤 WordVibe</h1>
        <p className="game-subtitle">Guess the 5-letter word in 6 tries</p>
        <AdBanner format="horizontal" />

      {/* Game Grid */}
      <div className="wordle-grid animate-fade-in">
        {renderGrid()}
      </div>

      {/* Game Over */}
      {gameState !== 'playing' && (
        <div className="result-card" style={{ marginBottom: 24, borderColor: gameState === 'won' ? '#00ff94' : '#ff2d78' }}>
          <div className="result-emoji">{gameState === 'won' ? '🎉' : '😭'}</div>
          <div className="result-title" style={{ color: gameState === 'won' ? '#00ff94' : '#ff2d78' }}>
            {gameState === 'won' ? `Got it in ${guesses.length}!` : 'Better luck tomorrow!'}
          </div>
          {gameState === 'lost' && (
            <div className="result-desc">
              The word was <strong style={{ color: '#ffe600' }}>{answer}</strong>
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="share-btn" onClick={shareResult}>
              <Share2 size={16} /> Share Result
            </button>
            <button className="btn-outline" onClick={resetGame}>
              <RotateCcw size={16} /> Play Again
            </button>
          </div>
        </div>
      )}

      {/* Ad between game and keyboard */}
      <AdBanner format="horizontal" />

      {/* Keyboard */}
      <div className="keyboard">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="keyboard-row">
            {row.map(key => (
              <button
                key={key}
                className={`key-btn ${keyStates[key] || ''} ${key.length > 1 ? 'wide' : ''}`}
                onClick={() => handleKey(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
