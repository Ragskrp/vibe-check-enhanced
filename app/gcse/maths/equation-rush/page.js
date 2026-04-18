'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import AdBanner from '../../../components/AdBanner';
import LessonCards from '../../components/LessonCards';
import Link from 'next/link';
import { Timer, Flame, Trophy, RotateCcw, ArrowRight, ChevronDown, BookOpen, Zap } from 'lucide-react';

// Lesson content for Algebra
const ALGEBRA_LESSONS = {
  foundation: [
    {
      title: 'Inverse Operations',
      content: 'To solve an equation, use the opposite operation to isolate x. Addition undoes subtraction. Multiplication undoes division.',
      formula: '+ ↔ −    × ↔ ÷',
      example: 'x + 5 = 12\nSubtract 5 from both sides:\nx = 12 − 5 = 7',
      tip: 'Whatever you do to one side, you must do to the other.',
    },
    {
      title: 'Solving One-Step Equations',
      content: 'When x is multiplied by a number, divide both sides by that number to find x.',
      formula: 'ax = b  →  x = b ÷ a',
      example: '4x = 20\nDivide both sides by 4:\nx = 20 ÷ 4 = 5',
    },
    {
      title: 'Division Equations',
      content: 'When x is divided by a number, multiply both sides to find x.',
      formula: 'x ÷ a = b  →  x = a × b',
      example: 'x ÷ 3 = 7\nMultiply both sides by 3:\nx = 3 × 7 = 21',
    },
    {
      title: 'Evaluating Expressions',
      content: 'To evaluate an expression, substitute the given value and follow BIDMAS (Brackets, Indices, Division, Multiplication, Addition, Subtraction).',
      formula: 'BIDMAS order',
      example: 'Find 3(4) + 5\n= 12 + 5\n= 17',
      tip: 'Always multiply before adding unless there are brackets.',
    },
  ],
  higher: [
    {
      title: 'Two-Step Equations',
      content: 'Undo operations in reverse order: deal with addition/subtraction first, then multiplication/division.',
      formula: 'ax + b = c  →  x = (c − b) ÷ a',
      example: '3x + 7 = 22\nSubtract 7: 3x = 15\nDivide by 3: x = 5',
    },
    {
      title: 'Equations with x on Both Sides',
      content: 'Collect all x terms on one side by subtracting the smaller x term from both sides.',
      formula: 'ax + b = cx + d  →  (a−c)x = d − b',
      example: '5x + 3 = 2x + 18\nSubtract 2x: 3x + 3 = 18\nSubtract 3: 3x = 15\nx = 5',
    },
    {
      title: 'Expanding Brackets',
      content: 'Multiply each term inside the bracket by the number outside.',
      formula: 'a(x + b) = ax + ab',
      example: '3(x + 4) = 21\n3x + 12 = 21\n3x = 9\nx = 3',
      tip: 'Expand first, then solve like a normal equation.',
    },
    {
      title: 'Square Root Equations',
      content: 'If x² = a, then x = √a (take the positive root for GCSE unless stated otherwise).',
      formula: 'x² = a  →  x = √a',
      example: 'x² = 49\nx = √49 = 7',
    },
  ],
};

// Question generators by difficulty
const generateQuestion = (tier) => {
  const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (tier === 'foundation') {
    const types = [
      () => { const x = r(1, 20); const a = r(1, 15); return { display: `x + ${a} = ${x + a}`, answer: x, hint: 'Solve for x', explanation: `Subtract ${a} from both sides: x = ${x + a} − ${a} = ${x}` }; },
      () => { const x = r(5, 30); const a = r(1, x - 1); return { display: `x − ${a} = ${x - a}`, answer: x, hint: 'Solve for x', explanation: `Add ${a} to both sides: x = ${x - a} + ${a} = ${x}` }; },
      () => { const x = r(1, 12); const a = r(2, 10); return { display: `${a}x = ${a * x}`, answer: x, hint: 'Solve for x', explanation: `Divide both sides by ${a}: x = ${a * x} ÷ ${a} = ${x}` }; },
      () => { const a = r(2, 8); const b = r(1, 10); const x = r(1, 6); return { display: `${a}(${x}) + ${b}`, answer: a * x + b, hint: 'Evaluate', explanation: `${a} × ${x} = ${a * x}, then + ${b} = ${a * x + b}` }; },
      () => { const b = r(1, 10); const a = r(2, 8); const x = a * b; return { display: `x ÷ ${a} = ${b}`, answer: x, hint: 'Solve for x', explanation: `Multiply both sides by ${a}: x = ${b} × ${a} = ${x}` }; },
    ];
    return types[r(0, types.length - 1)]();
  } else {
    const types = [
      () => { const x = r(-10, 15); const a = r(2, 8); const b = r(-20, 20); const c = a * x + b; return { display: `${a}x + ${b < 0 ? `(${b})` : b} = ${c}`, answer: x, hint: 'Solve for x', explanation: `Subtract ${b}: ${a}x = ${c - b}\nDivide by ${a}: x = ${x}` }; },
      () => { const x = r(1, 10); const a = r(3, 9); const c = r(1, a - 1); const b = r(-15, 15); const d = (a - c) * x + b; return { display: `${a}x + ${b < 0 ? `(${b})` : b} = ${c}x + ${d}`, answer: x, hint: 'Solve for x', explanation: `Collect x terms: ${a - c}x = ${d - b}\nx = ${x}` }; },
      () => { const x = r(-8, 12); const a = r(2, 6); const b = r(-5, 10); const c = a * (x + b); return { display: `${a}(x + ${b < 0 ? `(${b})` : b}) = ${c}`, answer: x, hint: 'Expand & solve', explanation: `Expand: ${a}x + ${a * b} = ${c}\n${a}x = ${c - a * b}\nx = ${x}` }; },
      () => { const x = r(1, 12); return { display: `x² = ${x * x}`, answer: x, hint: 'Positive root', explanation: `x = √${x * x} = ${x}` }; },
      () => { const x = r(1, 10); const a = r(1, 8); const b = r(-10, 10); const c = 2 * (x + a) + b; return { display: `2(x + ${a}) + ${b < 0 ? `(${b})` : b} = ${c}`, answer: x, hint: 'Expand & solve', explanation: `Expand: 2x + ${2 * a} + ${b} = ${c}\n2x = ${c - 2 * a - b}\nx = ${x}` }; },
    ];
    return types[r(0, types.length - 1)]();
  }
};

const GAME_DURATION = 60;

import AdGateway from '../../../../components/AdGateway';

export default function EquationRush() {
  return (
    <AdGateway gameName="Equation Rush">
      <EquationRushContent />
    </AdGateway>
  );
}

function EquationRushContent() {
  const [phase, setPhase] = useState('menu'); // menu | playing | practice | results
  const [mode, setMode] = useState('test'); // test | practice
  const [tier, setTier] = useState('foundation');
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [practiceCount, setPracticeCount] = useState(0);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(tier));
    setInput('');
    setFeedback(null);
    setShowExplanation(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [tier]);

  const startGame = (gameMode) => {
    setMode(gameMode);
    setPhase('playing');
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(GAME_DURATION);
    setHistory([]);
    setPracticeCount(0);
    nextQuestion();
  };

  // Timer — only in test mode
  useEffect(() => {
    if (phase !== 'playing' || mode !== 'test') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase('results'); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, mode]);

  useEffect(() => {
    if (phase === 'results') {
      try {
        const existing = JSON.parse(localStorage.getItem('gcse-maths-stats') || '{}');
        const updated = {
          totalPlays: (existing.totalPlays || 0) + 1,
          bestStreak: Math.max(existing.bestStreak || 0, bestStreak),
        };
        localStorage.setItem('gcse-maths-stats', JSON.stringify(updated));
        if (mode === 'test') {
          localStorage.setItem('equation-rush-best', Math.max(
            parseInt(localStorage.getItem('equation-rush-best') || '0'), score
          ).toString());
        }
      } catch {}
    }
  }, [phase, bestStreak, score, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !question) return;
    if (showExplanation) return; // Already answered in practice mode

    const userAnswer = parseInt(input, 10);
    const isCorrect = userAnswer === question.answer;

    setHistory((prev) => [...prev, { q: question.display, correct: isCorrect, userAnswer, answer: question.answer }]);

    if (isCorrect) {
      const newStreak = streak + 1;
      setScore((s) => s + (newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1));
      setStreak(newStreak);
      setBestStreak((b) => Math.max(b, newStreak));
      setFeedback('correct');

      if (mode === 'practice') {
        setPracticeCount((c) => c + 1);
        setTimeout(() => nextQuestion(), 800);
      } else {
        setTimeout(() => nextQuestion(), 400);
      }
    } else {
      setStreak(0);
      setFeedback('wrong');

      if (mode === 'practice') {
        // Show explanation, don't auto-advance
        setShowExplanation(true);
      } else {
        setTimeout(() => nextQuestion(), 400);
      }
    }
  };

  const handlePracticeNext = () => {
    setPracticeCount((c) => c + 1);
    nextQuestion();
  };

  const handlePracticeEnd = () => {
    setPhase('results');
  };

  const personalBest = typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('equation-rush-best') || '0') : 0;

  // MENU
  if (phase === 'menu') {
    return (
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="animate-fade-in">
          <div className="game-badge">GCSE Maths</div>
          <h1 className="game-title" style={{ color: '#00e5a0' }}>⚡ Equation Rush</h1>
          <p className="game-subtitle">
            Solve as many algebra equations as you can in 60 seconds. Build streaks for bonus points.
          </p>

          {/* Tier selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#888', marginBottom: 12 }}>SELECT TIER</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {['foundation', 'higher'].map((t) => (
                <button key={t} onClick={() => setTier(t)} className="btn-outline" style={{
                  borderColor: tier === t ? '#00e5a0' : 'var(--border-light)',
                  color: tier === t ? '#00e5a0' : 'var(--text-muted)',
                  background: tier === t ? 'rgba(0,229,160,0.1)' : 'transparent',
                  textTransform: 'capitalize', minWidth: 120,
                }}>
                  {t === 'foundation' ? '📗 Foundation' : '📘 Higher'}
                </button>
              ))}
            </div>
          </div>

          {/* Lesson Cards */}
          <LessonCards
            cards={ALGEBRA_LESSONS[tier]}
            accentColor="#00e5a0"
          />

          {personalBest > 0 && (
            <div style={{
              padding: '10px 20px', borderRadius: 12,
              background: 'rgba(255,230,0,0.08)', border: '1px solid rgba(255,230,0,0.15)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 14, fontWeight: 700, color: '#ffe600', marginBottom: 24,
            }}>
              <Trophy size={16} /> Personal Best: {personalBest} pts
            </div>
          )}

          {/* Two mode buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
            <button onClick={() => startGame('practice')} className="btn-outline" style={{
              borderColor: '#00e5a0', color: '#00e5a0', fontSize: 16, padding: '14px 28px',
            }}>
              <BookOpen size={18} /> Practice Mode
            </button>
            <button onClick={() => startGame('test')} className="btn-primary" style={{
              fontSize: 16, background: 'linear-gradient(135deg, #00e5a0, #00d4ff)', color: '#000',
            }}>
              <Zap size={18} /> Timed Test
            </button>
          </div>
          <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>
            Practice = no timer, with hints • Test = 60 seconds, score-based
          </div>

          <div className="how-to-play" style={{ maxWidth: 400, margin: '0 auto' }}>
            <div className="how-to-play-title">📋 How it works</div>
            <div className="how-to-play-steps">
              <div className="how-to-play-step"><span className="how-to-play-number">1</span>Solve the equation shown on screen</div>
              <div className="how-to-play-step"><span className="how-to-play-number">2</span>Type your answer and press Enter</div>
              <div className="how-to-play-step"><span className="how-to-play-number">3</span>Build streaks of 3+ for bonus points</div>
              <div className="how-to-play-step"><span className="how-to-play-number">4</span>Get the highest score in 60 seconds</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PLAYING (both test and practice modes)
  if (phase === 'playing') {
    const timerPct = (timeLeft / GAME_DURATION) * 100;
    const timerColor = timeLeft <= 10 ? '#ff2d78' : timeLeft <= 20 ? '#ffe600' : '#00e5a0';
    const isPractice = mode === 'practice';

    return (
      <div className="game-container">
        {/* HUD */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          {isPractice ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 14, color: '#00e5a0' }}>
              <BookOpen size={16} /> Practice Mode — Q{practiceCount + 1}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 18 }}>
              <Timer size={18} color={timerColor} />
              <span style={{ color: timerColor, fontVariantNumeric: 'tabular-nums' }}>{timeLeft}s</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontWeight: 800, color: '#00e5a0' }}>{score} pts</span>
            {streak >= 3 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800, color: '#ff6b35', animation: 'pulse 1s infinite' }}>
                <Flame size={16} /> {streak}x
              </span>
            )}
          </div>
        </div>

        {/* Timer bar — test mode only */}
        {!isPractice && (
          <div className="progress-bar" style={{ marginBottom: 32 }}>
            <div className="progress-fill" style={{
              width: `${timerPct}%`,
              background: `linear-gradient(90deg, ${timerColor}, ${timerColor}88)`,
              transition: 'width 1s linear',
            }} />
          </div>
        )}

        {/* Question */}
        <div style={{
          textAlign: 'center', padding: '40px 24px', borderRadius: 20,
          background: feedback === 'correct' ? 'rgba(0,255,148,0.08)' : feedback === 'wrong' ? 'rgba(255,45,120,0.08)' : 'var(--bg-card)',
          border: `2px solid ${feedback === 'correct' ? '#00ff94' : feedback === 'wrong' ? '#ff2d78' : 'var(--border-light)'}`,
          transition: 'all 0.3s ease', marginBottom: 24,
        }}>
          <div style={{ fontSize: 12, color: '#666', fontWeight: 600, marginBottom: 8 }}>{question?.hint}</div>
          <div style={{ fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: 900, color: '#fff', fontFamily: 'monospace', letterSpacing: '0.02em' }}>
            {question?.display}
          </div>
        </div>

        {/* Explanation (practice mode, wrong answer) */}
        {showExplanation && (
          <div style={{
            padding: '16px 20px', borderRadius: 14, marginBottom: 16,
            background: 'rgba(255,230,0,0.06)', border: '1px solid rgba(255,230,0,0.2)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ffe600', marginBottom: 6 }}>✗ Incorrect — The answer is {question?.answer}</div>
            <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{question?.explanation}</div>
            <button onClick={handlePracticeNext} className="btn-outline" style={{
              marginTop: 12, borderColor: '#00e5a0', color: '#00e5a0',
            }}>
              Next Question →
            </button>
          </div>
        )}

        {/* Input */}
        {!showExplanation && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12 }}>
            <input ref={inputRef} type="number" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Your answer..." className="input-field"
              style={{ flex: 1, textAlign: 'center', fontSize: 24, fontWeight: 800, marginBottom: 0 }} autoFocus />
            <button type="submit" className="btn-primary" style={{
              background: 'linear-gradient(135deg, #00e5a0, #00d4ff)', color: '#000', padding: '14px 24px',
            }}>
              <ArrowRight size={20} />
            </button>
          </form>
        )}

        {/* Streak indicator */}
        {streak > 0 && !showExplanation && (
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: streak >= 5 ? '#ffe600' : streak >= 3 ? '#ff6b35' : '#00e5a0', fontWeight: 700 }}>
            {streak >= 5 ? '🔥 ON FIRE! 3x points!' : streak >= 3 ? '⚡ Streak! 2x points!' : `${streak} correct in a row`}
          </div>
        )}

        {/* End practice button */}
        {isPractice && practiceCount >= 3 && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button onClick={handlePracticeEnd} className="btn-outline" style={{ fontSize: 13 }}>
              Finish Practice & See Results
            </button>
          </div>
        )}
      </div>
    );
  }

  // RESULTS
  const correctCount = history.filter((h) => h.correct).length;
  const accuracy = history.length > 0 ? Math.round((correctCount / history.length) * 100) : 0;

  return (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="result-card" style={{ borderColor: '#00e5a0' }}>
        <div className="result-emoji">{mode === 'practice' ? '📖' : '🏆'}</div>
        <div className="result-title" style={{ color: '#00e5a0' }}>
          {mode === 'practice' ? 'Practice Complete' : `${score} Points`}
        </div>
        <p className="result-desc">
          {correctCount}/{history.length} correct{mode === 'test' ? ` • Best streak: ${bestStreak}` : ''}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(0,229,160,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#00e5a0' }}>{correctCount}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Correct</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,230,0,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#ffe600' }}>{bestStreak}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Best Streak</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(0,212,255,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#00d4ff' }}>{accuracy}%</div>
            <div style={{ fontSize: 11, color: '#888' }}>Accuracy</div>
          </div>
        </div>

        {history.length > 0 && (
          <details style={{ textAlign: 'left', marginBottom: 24 }}>
            <summary style={{ cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#888', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <ChevronDown size={14} /> Review answers
            </summary>
            <div style={{ display: 'grid', gap: 6, maxHeight: 200, overflowY: 'auto' }}>
              {history.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: h.correct ? 'rgba(0,255,148,0.06)' : 'rgba(255,45,120,0.06)', fontSize: 13 }}>
                  <span style={{ fontFamily: 'monospace' }}>{h.q}</span>
                  <span style={{ fontWeight: 700, color: h.correct ? '#00ff94' : '#ff2d78' }}>{h.correct ? '✓' : `✗ (${h.answer})`}</span>
                </div>
              ))}
            </div>
          </details>
        )}

        <AdBanner format="rectangle" />

        {/* Suggest next step */}
        {mode === 'practice' && accuracy < 80 && (
          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', marginBottom: 16, fontSize: 13, color: '#00d4ff', fontWeight: 600 }}>
            💡 Tip: Try reviewing the lesson cards again before attempting the timed test.
          </div>
        )}
        {mode === 'practice' && accuracy >= 80 && (
          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)', marginBottom: 16, fontSize: 13, color: '#00e5a0', fontWeight: 600 }}>
            ✅ Great accuracy! You&apos;re ready for the timed test.
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
          {mode === 'practice' ? (
            <>
              <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: '#00e5a0', color: '#00e5a0' }}>
                <RotateCcw size={16} /> More Practice
              </button>
              <button onClick={() => startGame('test')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #00e5a0, #00d4ff)', color: '#000' }}>
                <Zap size={16} /> Try Timed Test
              </button>
            </>
          ) : (
            <>
              <button onClick={() => startGame('test')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #00e5a0, #00d4ff)', color: '#000' }}>
                <RotateCcw size={16} /> Play Again
              </button>
              <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: '#00e5a0', color: '#00e5a0' }}>
                <BookOpen size={16} /> Practice Mode
              </button>
            </>
          )}
          <Link href="/gcse/maths"><button className="btn-outline">Back to Maths</button></Link>
        </div>
      </div>
    </div>
  );
}
}
