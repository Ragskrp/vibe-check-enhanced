'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import AdBanner from '../../../components/AdBanner';
import LessonCards from '../../components/LessonCards';
import Link from 'next/link';
import { Timer, Flame, Trophy, RotateCcw, ChevronDown, BookOpen, Zap } from 'lucide-react';

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const FDP_LESSONS = {
  foundation: [
    {
      title: 'Equivalent Fractions',
      content: 'To simplify a fraction, divide the numerator and denominator by their highest common factor (HCF).',
      formula: 'a/b ÷ HCF = simplified',
      example: 'Simplify 12/18\nHCF of 12 and 18 = 6\n12 ÷ 6 = 2\n18 ÷ 6 = 3\nAnswer: 2/3',
    },
    {
      title: 'Fractions to Decimals',
      content: 'To convert a fraction to a decimal, divide the numerator by the denominator.',
      formula: 'a/b = a ÷ b',
      example: '3/4 = 3 ÷ 4 = 0.75',
      tip: 'Common ones to memorise: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75',
    },
    {
      title: 'Decimals to Percentages',
      content: 'Multiply the decimal by 100 to get a percentage.',
      formula: 'decimal × 100 = percentage',
      example: '0.75 × 100 = 75%\n0.2 × 100 = 20%',
    },
    {
      title: 'Finding a Percentage of an Amount',
      content: 'Convert the percentage to a decimal (÷100), then multiply by the amount.',
      formula: 'P% of A = (P ÷ 100) × A',
      example: '25% of 80\n= 0.25 × 80\n= 20',
      tip: 'For 10%, just divide by 10. For 5%, halve the 10%.',
    },
  ],
  higher: [
    {
      title: 'Adding Fractions',
      content: 'To add fractions, find a common denominator, convert both fractions, then add the numerators.',
      formula: 'a/b + c/d = (ad + bc) / bd',
      example: '2/3 + 1/4\n= 8/12 + 3/12\n= 11/12',
      tip: 'Always simplify your answer if possible.',
    },
    {
      title: 'Recurring Decimals',
      content: 'Some fractions produce repeating decimals. Learn the common ones.',
      formula: '1/3 = 0.333...  1/6 = 0.1666...',
      example: '1/3 = 0.333...\n2/3 = 0.666...\n1/7 = 0.1428...\n1/9 = 0.111...',
    },
    {
      title: 'Percentage Increase',
      content: 'To increase by P%, multiply by (1 + P/100).',
      formula: 'New = Original × (1 + P/100)',
      example: 'Increase 200 by 15%\n= 200 × 1.15\n= 230',
    },
    {
      title: 'Reverse Percentages',
      content: 'If you know the result after a percentage increase, divide by the multiplier to find the original.',
      formula: 'Original = Result ÷ (1 + P/100)',
      example: 'After a 20% increase, price is £60\nOriginal = 60 ÷ 1.2 = £50',
      tip: 'This is a common Higher tier exam question!',
    },
  ],
};

const generateQuestion = (tier) => {
  const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (tier === 'foundation') {
    const types = [
      () => {
        const denoms = [2, 4, 5, 10, 20, 25, 50, 100];
        const d = denoms[r(0, denoms.length - 1)];
        const n = r(1, d - 1);
        const g = gcd(n, d);
        const sn = n / g, sd = d / g;
        const answer = Math.round((sn / sd) * 100);
        return { display: `Convert ${sn}/${sd} to a percentage`, answer, unit: '%', explanation: `${sn}/${sd} = ${sn} ÷ ${sd} = ${sn/sd}\n${sn/sd} × 100 = ${answer}%` };
      },
      () => {
        const pcts = [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90];
        const p = pcts[r(0, pcts.length - 1)];
        const answer = p / 100;
        return { display: `Convert ${p}% to a decimal`, answer, unit: '', decimal: true, explanation: `${p}% = ${p} ÷ 100 = ${answer}` };
      },
      () => {
        const sd = r(2, 10);
        const sn = r(1, sd - 1);
        const mult = r(2, 5);
        const n = sn * mult, d = sd * mult;
        return { display: `Simplify ${n}/${d}`, answer: `${sn}/${sd}`, unit: '', fraction: true, explanation: `HCF of ${n} and ${d} = ${mult}\n${n} ÷ ${mult} = ${sn}\n${d} ÷ ${mult} = ${sd}\nAnswer: ${sn}/${sd}` };
      },
      () => {
        const a = r(1, 9) / 10;
        let b; do { b = r(1, 9) / 10; } while (b === a);
        const bigger = a > b ? 1 : 2;
        return { display: `Which is bigger?\n1) ${a}    2) ${b}`, answer: bigger, unit: '', explanation: `${a} ${a > b ? '>' : '<'} ${b}, so the answer is ${bigger}` };
      },
      () => {
        const pcts = [10, 20, 25, 50];
        const p = pcts[r(0, pcts.length - 1)];
        const amounts = [40, 60, 80, 100, 120, 200, 300];
        const amount = amounts[r(0, amounts.length - 1)];
        const answer = (p / 100) * amount;
        return { display: `${p}% of ${amount}`, answer, unit: '', explanation: `${p}% = ${p/100}\n${p/100} × ${amount} = ${answer}` };
      },
    ];
    return types[r(0, types.length - 1)]();
  } else {
    const types = [
      () => {
        const d1 = r(2, 8), d2 = r(2, 8);
        const n1 = r(1, d1 - 1), n2 = r(1, d2 - 1);
        const rn = n1 * d2 + n2 * d1;
        const rd = d1 * d2;
        const g = gcd(rn, rd);
        return { display: `${n1}/${d1} + ${n2}/${d2}`, answer: `${rn / g}/${rd / g}`, unit: '', fraction: true, explanation: `= ${n1*d2}/${d1*d2} + ${n2*d1}/${d1*d2}\n= ${rn}/${rd}\nSimplified: ${rn/g}/${rd/g}` };
      },
      () => {
        const pairs = [
          { decimal: '0.333...', fraction: '1/3' },
          { decimal: '0.666...', fraction: '2/3' },
          { decimal: '0.1666...', fraction: '1/6' },
          { decimal: '0.1428...', fraction: '1/7' },
          { decimal: '0.111...', fraction: '1/9' },
        ];
        const p = pairs[r(0, pairs.length - 1)];
        return { display: `Convert ${p.decimal} to a fraction`, answer: p.fraction, unit: '', fraction: true, explanation: `${p.decimal} = ${p.fraction}\nThis is a standard recurring decimal to memorise.` };
      },
      () => {
        const original = r(2, 20) * 10;
        const pct = [10, 15, 20, 25, 30, 50][r(0, 5)];
        const answer = original * (1 + pct / 100);
        return { display: `Increase ${original} by ${pct}%`, answer, unit: '', explanation: `Multiplier = 1 + ${pct}/100 = ${1 + pct/100}\n${original} × ${1 + pct/100} = ${answer}` };
      },
      () => {
        const d = r(3, 8);
        const n = r(1, d - 1);
        const mult = r(2, 10);
        const amount = d * mult;
        const answer = n * mult;
        return { display: `${n}/${d} of ${amount}`, answer, unit: '', explanation: `${amount} ÷ ${d} = ${mult}\n${mult} × ${n} = ${answer}` };
      },
      () => {
        const pcts = [10, 20, 25];
        const pct = pcts[r(0, pcts.length - 1)];
        const original = r(4, 20) * 10;
        const after = original * (1 + pct / 100);
        return { display: `After a ${pct}% increase, a price is £${after}. What was the original?`, answer: original, unit: '£', explanation: `Multiplier = 1 + ${pct}/100 = ${1 + pct/100}\nOriginal = ${after} ÷ ${1 + pct/100} = £${original}` };
      },
    ];
    return types[r(0, types.length - 1)]();
  }
};

const GAME_DURATION = 60;

import AdGateway from '../../../../components/AdGateway';

export default function FractionFrenzy() {
  return (
    <AdGateway gameName="Fraction Frenzy">
      <FractionFrenzyContent />
    </AdGateway>
  );
}

function FractionFrenzyContent() {
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
    if (q.fraction) return trimmed === String(q.answer);
    if (q.decimal) return parseFloat(trimmed) === q.answer;
    return parseFloat(trimmed) === q.answer;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !question || showExplanation) return;

    const isCorrect = checkAnswer(input, question);
    setHistory((prev) => [...prev, { q: question.display, correct: isCorrect, userAnswer: input.trim(), answer: question.answer }]);

    if (isCorrect) {
      const newStreak = streak + 1;
      setScore((s) => s + (newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1));
      setStreak(newStreak);
      setBestStreak((b) => Math.max(b, newStreak));
      setFeedback('correct');
      if (mode === 'practice') { setPracticeCount((c) => c + 1); setTimeout(() => nextQuestion(), 800); }
      else setTimeout(() => nextQuestion(), 400);
    } else {
      setStreak(0);
      setFeedback('wrong');
      if (mode === 'practice') setShowExplanation(true);
      else setTimeout(() => nextQuestion(), 400);
    }
  };

  const handlePracticeNext = () => { setPracticeCount((c) => c + 1); nextQuestion(); };

  // MENU
  if (phase === 'menu') {
    return (
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="animate-fade-in">
          <div className="game-badge">GCSE Maths</div>
          <h1 className="game-title" style={{ color: '#00d4ff' }}>🥧 Fraction Frenzy</h1>
          <p className="game-subtitle">Convert, compare, and calculate with fractions, decimals, and percentages.</p>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#888', marginBottom: 12 }}>SELECT TIER</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {['foundation', 'higher'].map((t) => (
                <button key={t} onClick={() => setTier(t)} className="btn-outline" style={{
                  borderColor: tier === t ? '#00d4ff' : 'var(--border-light)',
                  color: tier === t ? '#00d4ff' : 'var(--text-muted)',
                  background: tier === t ? 'rgba(0,212,255,0.1)' : 'transparent',
                  textTransform: 'capitalize', minWidth: 120,
                }}>
                  {t === 'foundation' ? '📗 Foundation' : '📘 Higher'}
                </button>
              ))}
            </div>
          </div>

          <LessonCards cards={FDP_LESSONS[tier]} accentColor="#00d4ff" />

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
            <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: '#00d4ff', color: '#00d4ff', fontSize: 16, padding: '14px 28px' }}>
              <BookOpen size={18} /> Practice Mode
            </button>
            <button onClick={() => startGame('test')} className="btn-primary" style={{ fontSize: 16, background: 'linear-gradient(135deg, #00d4ff, #0080ff)', color: '#000' }}>
              <Zap size={18} /> Timed Test
            </button>
          </div>
          <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>Practice = no timer, with hints • Test = 60 seconds, score-based</div>

          <div style={{
            padding: '16px 20px', borderRadius: 14, background: 'rgba(0,212,255,0.06)',
            border: '1px solid rgba(0,212,255,0.1)', textAlign: 'left', maxWidth: 400, margin: '0 auto 20px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#00d4ff', marginBottom: 8 }}>💡 Tip</div>
            <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>
              For fraction answers, type them as <strong style={{ color: '#ddd' }}>a/b</strong> (e.g. 3/4). For decimals, type the number directly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // PLAYING
  if (phase === 'playing') {
    const timerPct = (timeLeft / GAME_DURATION) * 100;
    const timerColor = timeLeft <= 10 ? '#ff2d78' : timeLeft <= 20 ? '#ffe600' : '#00d4ff';
    const isPractice = mode === 'practice';

    return (
      <div className="game-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          {isPractice ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 14, color: '#00d4ff' }}>
              <BookOpen size={16} /> Practice — Q{practiceCount + 1}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 18 }}>
              <Timer size={18} color={timerColor} />
              <span style={{ color: timerColor, fontVariantNumeric: 'tabular-nums' }}>{timeLeft}s</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontWeight: 800, color: '#00d4ff' }}>{score} pts</span>
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
          textAlign: 'center', padding: '40px 24px', borderRadius: 20,
          background: feedback === 'correct' ? 'rgba(0,255,148,0.08)' : feedback === 'wrong' ? 'rgba(255,45,120,0.08)' : 'var(--bg-card)',
          border: `2px solid ${feedback === 'correct' ? '#00ff94' : feedback === 'wrong' ? '#ff2d78' : 'var(--border-light)'}`,
          transition: 'all 0.3s ease', marginBottom: 24,
        }}>
          <div style={{ fontSize: 'clamp(22px, 5vw, 36px)', fontWeight: 900, color: '#fff', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
            {question?.display}
          </div>
        </div>

        {showExplanation && (
          <div style={{ padding: '16px 20px', borderRadius: 14, marginBottom: 16, background: 'rgba(255,230,0,0.06)', border: '1px solid rgba(255,230,0,0.2)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ffe600', marginBottom: 6 }}>✗ Incorrect — The answer is {question?.answer}</div>
            <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{question?.explanation}</div>
            <button onClick={handlePracticeNext} className="btn-outline" style={{ marginTop: 12, borderColor: '#00d4ff', color: '#00d4ff' }}>Next Question →</button>
          </div>
        )}

        {!showExplanation && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12 }}>
            <input ref={inputRef} type="text" inputMode="decimal" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder={question?.fraction ? 'e.g. 3/4' : 'Your answer...'} className="input-field"
              style={{ flex: 1, textAlign: 'center', fontSize: 24, fontWeight: 800, marginBottom: 0 }} autoFocus />
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #00d4ff, #0080ff)', color: '#000', padding: '14px 24px' }}>✓</button>
          </form>
        )}

        {streak > 0 && !showExplanation && (
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: streak >= 5 ? '#ffe600' : streak >= 3 ? '#ff6b35' : '#00d4ff', fontWeight: 700 }}>
            {streak >= 5 ? '🔥 ON FIRE! 3x points!' : streak >= 3 ? '⚡ Streak! 2x points!' : `${streak} correct in a row`}
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

  // RESULTS
  const correctCount = history.filter((h) => h.correct).length;
  const accuracy = history.length > 0 ? Math.round((correctCount / history.length) * 100) : 0;

  return (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="result-card" style={{ borderColor: '#00d4ff' }}>
        <div className="result-emoji">{mode === 'practice' ? '📖' : '🏆'}</div>
        <div className="result-title" style={{ color: '#00d4ff' }}>
          {mode === 'practice' ? 'Practice Complete' : `${score} Points`}
        </div>
        <p className="result-desc">{correctCount}/{history.length} correct{mode === 'test' ? ` • Best streak: ${bestStreak}` : ''}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(0,212,255,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#00d4ff' }}>{correctCount}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Correct</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,230,0,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#ffe600' }}>{bestStreak}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Best Streak</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(0,255,148,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#00ff94' }}>{accuracy}%</div>
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

        {mode === 'practice' && accuracy < 80 && (
          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', marginBottom: 16, fontSize: 13, color: '#00d4ff', fontWeight: 600 }}>
            💡 Tip: Review the lesson cards again before the timed test.
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
              <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: '#00d4ff', color: '#00d4ff' }}><RotateCcw size={16} /> More Practice</button>
              <button onClick={() => startGame('test')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #00d4ff, #0080ff)', color: '#000' }}><Zap size={16} /> Try Timed Test</button>
            </>
          ) : (
            <>
              <button onClick={() => startGame('test')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #00d4ff, #0080ff)', color: '#000' }}><RotateCcw size={16} /> Play Again</button>
              <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: '#00d4ff', color: '#00d4ff' }}><BookOpen size={16} /> Practice Mode</button>
            </>
          )}
          <Link href="/gcse/maths"><button className="btn-outline">Back to Maths</button></Link>
        </div>
      </div>
    </div>
  );
}
