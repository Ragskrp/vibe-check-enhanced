'use client';

import { useState, useEffect, useCallback } from 'react';
import { Share2, RotateCcw, HelpCircle } from 'lucide-react';
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
  'ROYAL', 'CROWN', 'SWORD', 'SHIELD', 'MONEY', 'HONEY', 'CANDY', 'PIZZA',
  'JUICE', 'PARTY', 'TRICK', 'TRAIN', 'PLANE', 'HOUSE', 'WATCH', 'PHONE',
  'ALIVE', 'ARISE', 'AWAKE', 'BASIC', 'BEAST', 'BEGIN', 'BERRY', 'BLACK',
  'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BREAD', 'BREAK', 'BRICK',
  'BRIDE', 'BRIEF', 'BRING', 'BROAD', 'BROWN', 'BUILD', 'BURST', 'CABLE',
  'CALM', 'CANAL', 'CARRY', 'CAUSE', 'CHAIN', 'CHAIR', 'CHART', 'CHASE',
  'CHEAP', 'CHECK', 'CHEEK', 'CHEST', 'CHIEF', 'CHILD', 'CHOIR', 'CLEAN',
  'CLEAR', 'CLIMB', 'CLOCK', 'CLOSE', 'COACH', 'COAST', 'COFFEE', 'COUNT',
  'COURT', 'COVER', 'CREAM', 'CREW', 'CROSS', 'CROWD', 'DAILY', 'DEATH',
  'DELAY', 'DEPTH', 'DIRTY', 'DOUBT', 'DOZEN', 'DRINK', 'DRIVE', 'EAGER',
  'EARLY', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'EQUAL', 'ERROR', 'EVENT',
  'EXACT', 'EXIST', 'FAINT', 'FAITH', 'FALSE', 'FAULT', 'FIELD', 'FIFTH',
  'FINAL', 'FIRST', 'FLAT', 'FLOOR', 'FOCUS', 'FORCE', 'FOUND', 'FRAME',
  'FRESH', 'FRONT', 'FRUIT', 'GLASS', 'GLOBE', 'GLOVE', 'GRAND', 'GREAT',
  'GREEN', 'GROUP', 'GUARD', 'GUESS', 'GUIDE', 'HABIT', 'HAPPY', 'HEAVY',
  'HONOR', 'HORSE', 'HOTEL', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER',
  'INPUT', 'IRON', 'ISSUE', 'JOINT', 'JUDGE', 'KNIFE', 'KNOCK', 'LABEL',
  'LARGE', 'LASER', 'LATER', 'LEARN', 'LEASE', 'LEAST', 'LEVEL', 'LIMIT',
  'LINER', 'LOCAL', 'LOGIC', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'MAJOR',
  'METAL', 'METRE', 'MIDST', 'MIGHT', 'MINOR', 'MODEL', 'MOIST', 'MONTH',
  'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVIE', 'MUSIC', 'NERVE',
  'NEVER', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OFFER',
  'ORDER', 'OTHER', 'OUTER', 'OWNER', 'PANEL', 'PAPER', 'PARTY', 'PEACE',
  'PHONE', 'PHOTO', 'PIANO', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE',
  'PLANT', 'PLATE', 'POINT', 'POUND', 'PRESS', 'PRICE', 'PRIDE', 'PRIME',
  'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK',
  'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH',
  'READY', 'REPLY', 'RIGHT', 'RIVAL', 'RIVER', 'ROUGH', 'ROUND', 'ROUTE',
  'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE',
  'SHAKE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHIRT',
  'SHOCK', 'SHOOT', 'SHORT', 'SHOUT', 'SIGHT', 'SINCE', 'SKILL', 'SLEEP',
  'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMOKE', 'SOUND', 'SOUTH', 'SPACE',
  'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPIRIT', 'SPORT', 'STAFF', 'STAGE',
  'STAMP', 'STAND', 'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK',
  'STORE', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET',
  'TABLE', 'TASTE', 'TEACH', 'THANK', 'THEME', 'THERE', 'THICK', 'THING',
  'THINK', 'THREE', 'THROW', 'TIGHT', 'TITLE', 'TOTAL', 'TOUCH', 'TOUGH',
  'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRUST',
  'TRUTH', 'TWICE', 'UNDER', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET',
  'URBAN', 'USAGE', 'USUAL', 'VAGUE', 'VALID', 'VALUE', 'VIDEO', 'VIRUS',
  'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE',
  'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WORLD', 'WORST', 'WORTH', 'WRITE',
  'WRONG', 'YOUTH', 'ZONES'
];

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
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

import GameEndScreen from '../components/GameEndScreen';

export default function WordVibeGame() {
  const [answer, setAnswer] = useState('');
  const [mounted, setMounted] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [keyStates, setKeyStates] = useState({});
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setAnswer(getRandomWord());
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
    const text = `VIBEMENOW WordVibe 🔤\n${guesses.length}/6\n\n${emojis}\n\nPlay at vibemenow.uk/wordvibe`;
    
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
    setAnswer(getRandomWord());
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
      <div className="wordle-grid animate-fade-in" style={{ marginBottom: gameState !== 'playing' ? 0 : 24 }}>
        {renderGrid()}
      </div>

      {/* Game Over */}
      {gameState !== 'playing' && (
        <GameEndScreen
          gameId="wordvibe"
          score={gameState === 'won' ? guesses.length : 0}
          maxScore={6}
          emoji={gameState === 'won' ? '🎉' : '😭'}
          title={gameState === 'won' ? `Got it in ${guesses.length}!` : 'Try Again!'}
          description={gameState === 'lost' ? `The word was ${answer}` : 'Brilliant vocabulary!'}
          accentColor={gameState === 'won' ? '#00ff94' : '#ff2d78'}
          onShare={shareResult}
          onPlayAgain={resetGame}
        />
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

      <div className="how-to-play">
        <div className="how-to-play-title">
          <HelpCircle size={16} color="#00d4ff" /> How to Play
        </div>
        <div className="how-to-play-steps">
          <div className="how-to-play-step">
            <span className="how-to-play-number">1</span>
            <span>Guess the <strong>WORDVIBE</strong> in 6 tries. The word resets every match.</span>
          </div>
          <div className="how-to-play-step">
            <span className="how-to-play-number">2</span>
            <span>Each guess must be a valid 5-letter word. Hit the enter button to submit.</span>
          </div>
          <div className="how-to-play-step">
            <span className="how-to-play-number">3</span>
            <span>The color of the tiles will change to show how close your guess was.</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
