'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import AdBanner from '../../components/AdBanner';
import LessonCards from './LessonCards';
import Link from 'next/link';
import { Timer, Flame, RotateCcw, ArrowRight, ChevronDown, BookOpen, Zap } from 'lucide-react';

const GAME_DURATION = 60;

/**
 * Shared GCSE topic game engine.
 * Props:
 *   config: { title, emoji, color, description, lessons, generateQuestion, inputHint?, fractionInput? }
 */
export default function TopicGame({ config }) {
  const [phase, setPhase] = useState('menu');
  const [mode, setMode] = useState('test');
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

  const accent = config.color || '#00e5a0';

  const nextQuestion = useCallback(() => {
    setQuestion(config.generateQuestion(tier));
    setInput(''); setFeedback(null); setShowExplanation(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [tier, config]);

  const startGame = (gameMode) => {
    setMode(gameMode); setPhase('playing'); setScore(0); setStreak(0);
    setBestStreak(0); setTimeLeft(GAME_DURATION); setHistory([]); setPracticeCount(0);
    nextQuestion();
  };

  useEffect(() => {
    if (phase !== 'playing' || mode !== 'test') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { clearInterval(timerRef.current); setPhase('results'); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, mode]);

  useEffect(() => {
    if (phase === 'results') {
      try {
        const existing = JSON.parse(localStorage.getItem('gcse-maths-stats') || '{}');
        localStorage.setItem('gcse-maths-stats', JSON.stringify({
          totalPlays: (existing.totalPlays || 0) + 1,
          bestStreak: Math.max(existing.bestStreak || 0, bestStreak),
        }));
      } catch {}
    }
  }, [phase, bestStreak]);

  const checkAnswer = (userInput, q) => {
    const trimmed = userInput.trim();
    if (!trimmed) return false;
    if (q.answerType === 'fraction') return trimmed === String(q.answer);
    if (q.answerType === 'text') return trimmed.toLowerCase() === String(q.answer).toLowerCase();
    const num = parseFloat(trimmed);
    return !isNaN(num) && Math.abs(num - q.answer) < 0.01;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !question || showExplanation) return;
    const isCorrect = checkAnswer(input, question);
    setHistory((prev) => [...prev, { q: question.display, correct: isCorrect, userAnswer: input.trim(), answer: question.answer }]);

    if (isCorrect) {
      const ns = streak + 1;
      setScore((s) => s + (ns >= 5 ? 3 : ns >= 3 ? 2 : 1));
      setStreak(ns); setBestStreak((b) => Math.max(b, ns)); setFeedback('correct');
      if (mode === 'practice') { setPracticeCount((c) => c + 1); setTimeout(() => nextQuestion(), 800); }
      else setTimeout(() => nextQuestion(), 400);
    } else {
      setStreak(0); setFeedback('wrong');
      if (mode === 'practice') setShowExplanation(true);
      else setTimeout(() => nextQuestion(), 400);
    }
  };

  // ===== MENU =====
  if (phase === 'menu') {
    const isCompSci = ['Algorithms & Thinking', 'Programming Concepts', 'Logic & Data'].includes(config.category);
    const parentCategory = isCompSci ? 'GCSE Computer Science' :
                           config.category === 'Biology' || config.category === 'Chemistry' || config.category === 'Physics' ? 'GCSE Science' : 'GCSE Maths';

    return (
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="animate-fade-in">
          <div className="game-badge">{parentCategory}</div>
          <h1 className="game-title" style={{ color: accent }}>{config.emoji} {config.title}</h1>
          <p className="game-subtitle">{config.description}</p>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#888', marginBottom: 12 }}>SELECT TIER</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {['foundation', 'higher'].map((t) => (
                <button key={t} onClick={() => setTier(t)} className="btn-outline" style={{
                  borderColor: tier === t ? accent : 'var(--border-light)',
                  color: tier === t ? accent : 'var(--text-muted)',
                  background: tier === t ? `${accent}18` : 'transparent',
                  textTransform: 'capitalize', minWidth: 120,
                }}>
                  {t === 'foundation' ? '📗 Foundation' : '📘 Higher'}
                </button>
              ))}
            </div>
          </div>

          <LessonCards cards={config.lessons[tier]} accentColor={accent} />

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
            <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: accent, color: accent, fontSize: 16, padding: '14px 28px' }}>
              <BookOpen size={18} /> Practice Mode
            </button>
            <button onClick={() => startGame('test')} className="btn-primary" style={{ fontSize: 16, background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#000' }}>
              <Zap size={18} /> Timed Test
            </button>
          </div>
          <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>
            Practice = no timer, with hints &bull; Test = 60 seconds, score-based
          </div>

          {config.inputHint && (
            <div style={{ padding: '12px 16px', borderRadius: 14, background: `${accent}08`, border: `1px solid ${accent}18`, textAlign: 'left', maxWidth: 400, margin: '0 auto 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: accent, marginBottom: 6 }}>💡 Tip</div>
              <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>{config.inputHint}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleOptionClick = (opt) => {
    if (!question || showExplanation) return;
    const isCorrect = checkAnswer(opt, question);
    setHistory((prev) => [...prev, { q: question.display, correct: isCorrect, userAnswer: opt, answer: question.answer }]);

    if (isCorrect) {
      const ns = streak + 1;
      setScore((s) => s + (ns >= 5 ? 3 : ns >= 3 ? 2 : 1));
      setStreak(ns); setBestStreak((b) => Math.max(b, ns)); setFeedback('correct');
      if (mode === 'practice') { setPracticeCount((c) => c + 1); setTimeout(() => nextQuestion(), 800); }
      else setTimeout(() => nextQuestion(), 400);
    } else {
      setStreak(0); setFeedback('wrong');
      if (mode === 'practice') setShowExplanation(true);
      else setTimeout(() => nextQuestion(), 400);
    }
  };

  // ===== PLAYING =====
  if (phase === 'playing') {
    const timerPct = (timeLeft / GAME_DURATION) * 100;
    const timerColor = timeLeft <= 10 ? '#ff2d78' : timeLeft <= 20 ? '#ffe600' : accent;
    const isPractice = mode === 'practice';

    return (
      <div className="game-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          {isPractice ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 14, color: accent }}>
              <BookOpen size={16} /> Practice — Q{practiceCount + 1}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 18 }}>
              <Timer size={18} color={timerColor} />
              <span style={{ color: timerColor, fontVariantNumeric: 'tabular-nums' }}>{timeLeft}s</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontWeight: 800, color: accent }}>{score} pts</span>
            {streak >= 3 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800, color: '#ff6b35', animation: 'pulse 1s infinite' }}>
                <Flame size={16} /> {streak}x
              </span>
            )}
          </div>
        </div>

        {!isPractice && (
          <div className="progress-bar" style={{ marginBottom: 32 }}>
            <div className="progress-fill" style={{ width: `${timerPct}%`, background: `linear-gradient(90deg, ${timerColor}, ${timerColor}88)`, transition: 'width 1s linear' }} />
          </div>
        )}

        <div style={{
          textAlign: 'center', padding: '32px 24px', borderRadius: 20,
          background: feedback === 'correct' ? 'rgba(0,255,148,0.08)' : feedback === 'wrong' ? 'rgba(255,45,120,0.08)' : 'var(--bg-card)',
          border: `2px solid ${feedback === 'correct' ? '#00ff94' : feedback === 'wrong' ? '#ff2d78' : 'var(--border-light)'}`,
          transition: 'all 0.3s ease', marginBottom: 24,
        }}>
          {question?.hint && <div style={{ fontSize: 12, color: '#666', fontWeight: 600, marginBottom: 8 }}>{question.hint}</div>}
          <div style={{ fontSize: 'clamp(20px, 5vw, 34px)', fontWeight: 900, color: '#fff', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
            {question?.display}
          </div>
        </div>

        {showExplanation && (
          <div style={{ padding: '16px 20px', borderRadius: 14, marginBottom: 16, background: 'rgba(255,230,0,0.06)', border: '1px solid rgba(255,230,0,0.2)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ffe600', marginBottom: 6 }}>✗ Incorrect — The answer is {question?.answer}{question?.unit || ''}</div>
            <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{question?.explanation}</div>
            <button onClick={() => { setPracticeCount((c) => c + 1); nextQuestion(); }} className="btn-outline" style={{ marginTop: 12, borderColor: accent, color: accent }}>
              Next Question →
            </button>
          </div>
        )}

        {!showExplanation && question && (
          question.options ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {question.options.map((opt, i) => (
                <button key={i} onClick={() => handleOptionClick(opt)} className="btn-outline" style={{ padding: '16px', fontSize: 16, fontWeight: 700, borderColor: `${accent}40` }}>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12 }}>
              <input ref={inputRef}
                type={config.fractionInput ? 'text' : 'number'}
                inputMode={config.fractionInput ? 'text' : 'decimal'}
                step={config.fractionInput ? undefined : 'any'}
                value={input} onChange={(e) => setInput(e.target.value)}
                placeholder={question?.placeholder || 'Your answer...'}
                className="input-field"
                style={{ flex: 1, textAlign: 'center', fontSize: 24, fontWeight: 800, marginBottom: 0 }} autoFocus />
              <button type="submit" className="btn-primary" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#000', padding: '14px 24px' }}>
                <ArrowRight size={20} />
              </button>
            </form>
          )
        )}

        {streak > 0 && !showExplanation && (
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: streak >= 5 ? '#ffe600' : streak >= 3 ? '#ff6b35' : accent, fontWeight: 700 }}>
            {streak >= 5 ? '🔥 ON FIRE! 3x points!' : streak >= 3 ? '⚡ Streak! 2x points!' : `${streak} in a row`}
          </div>
        )}

        {isPractice && practiceCount >= 3 && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button onClick={() => setPhase('results')} className="btn-outline" style={{ fontSize: 13 }}>Finish Practice & See Results</button>
          </div>
        )}
      </div>
    );
  }

  // ===== RESULTS =====
  const cc = history.filter((h) => h.correct).length;
  const acc = history.length > 0 ? Math.round((cc / history.length) * 100) : 0;

  return (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="result-card" style={{ borderColor: accent }}>
        <div className="result-emoji">{mode === 'practice' ? '📖' : '🏆'}</div>
        <div className="result-title" style={{ color: accent }}>{mode === 'practice' ? 'Practice Complete' : `${score} Points`}</div>
        <p className="result-desc">{cc}/{history.length} correct{mode === 'test' ? ` • Best streak: ${bestStreak}` : ''}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          <div style={{ padding: 12, borderRadius: 12, background: `${accent}12` }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: accent }}>{cc}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Correct</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,230,0,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#ffe600' }}>{bestStreak}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Best Streak</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(0,255,148,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#00ff94' }}>{acc}%</div>
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
                  <span style={{ fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{h.q}</span>
                  <span style={{ fontWeight: 700, color: h.correct ? '#00ff94' : '#ff2d78' }}>{h.correct ? '✓' : `✗ (${h.answer})`}</span>
                </div>
              ))}
            </div>
          </details>
        )}

        <AdBanner format="rectangle" />

        {mode === 'practice' && acc < 80 && (
          <div style={{ padding: '12px 16px', borderRadius: 12, background: `${accent}08`, border: `1px solid ${accent}20`, marginBottom: 16, fontSize: 13, color: accent, fontWeight: 600 }}>
            💡 Review the lesson cards again before trying the timed test.
          </div>
        )}
        {mode === 'practice' && acc >= 80 && (
          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)', marginBottom: 16, fontSize: 13, color: '#00e5a0', fontWeight: 600 }}>
            ✅ Great accuracy! Ready for the timed test.
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
          {mode === 'practice' ? (
            <>
              <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: accent, color: accent }}><RotateCcw size={16} /> More Practice</button>
              <button onClick={() => startGame('test')} className="btn-primary" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#000' }}><Zap size={16} /> Timed Test</button>
            </>
          ) : (
            <>
              <button onClick={() => startGame('test')} className="btn-primary" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#000' }}><RotateCcw size={16} /> Play Again</button>
              <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: accent, color: accent }}><BookOpen size={16} /> Practice</button>
            </>
          )}
          <Link href={config.hubPath || '/gcse/maths'}><button className="btn-outline">{config.backLabel || 'Back to Maths'}</button></Link>
        </div>
      </div>
    </div>
  );
}
