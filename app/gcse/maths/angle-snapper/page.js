'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import AdBanner from '../../../components/AdBanner';
import LessonCards from '../../components/LessonCards';
import Link from 'next/link';
import { Timer, Flame, Trophy, RotateCcw, ChevronDown, BookOpen, Zap } from 'lucide-react';

const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const GEOMETRY_LESSONS = {
  foundation: [
    {
      title: 'Angles on a Straight Line',
      content: 'Angles on a straight line always add up to 180°. If you know one angle, subtract it from 180 to find the other.',
      formula: 'a + b = 180°',
      example: 'One angle is 65°\nOther angle = 180° − 65° = 115°',
    },
    {
      title: 'Angles in a Triangle',
      content: 'The three interior angles of any triangle always add up to 180°.',
      formula: 'a + b + c = 180°',
      example: 'Two angles are 50° and 70°\nThird angle = 180° − 50° − 70° = 60°',
      tip: 'This works for ALL triangles — equilateral, isosceles, scalene, right-angled.',
    },
    {
      title: 'Angles Around a Point',
      content: 'Angles around a full turn always add up to 360°.',
      formula: 'All angles = 360°',
      example: 'Three angles: 120°, 90°, and x\nx = 360° − 120° − 90° = 150°',
    },
    {
      title: 'Vertically Opposite Angles',
      content: 'When two straight lines cross, the opposite angles are equal.',
      formula: 'Opposite angles are equal',
      example: 'Two lines cross. One angle is 72°.\nThe vertically opposite angle = 72°\nThe adjacent angles = 180° − 72° = 108°',
      tip: 'Look for an X shape — the angles across from each other are always equal.',
    },
  ],
  higher: [
    {
      title: 'Interior Angles of Polygons',
      content: 'The sum of interior angles of a polygon = (n − 2) × 180°, where n is the number of sides. For a regular polygon, each angle = sum ÷ n.',
      formula: 'Sum = (n − 2) × 180°',
      example: 'Regular hexagon (6 sides):\nSum = (6 − 2) × 180° = 720°\nEach angle = 720° ÷ 6 = 120°',
    },
    {
      title: 'Exterior Angles of Polygons',
      content: 'Exterior angles of any polygon always add up to 360°. For a regular polygon, each exterior angle = 360° ÷ n.',
      formula: 'Each exterior = 360° ÷ n',
      example: 'Regular pentagon (5 sides):\nEach exterior angle = 360° ÷ 5 = 72°',
      tip: 'Interior + Exterior = 180° (always).',
    },
    {
      title: 'Parallel Lines — Alternate Angles',
      content: 'When a transversal crosses parallel lines, alternate angles (Z-angles) are equal.',
      formula: 'Alternate angles (Z) are equal',
      example: 'A transversal crosses parallel lines.\nOne angle is 55°.\nThe alternate angle = 55°',
    },
    {
      title: 'Parallel Lines — Co-interior Angles',
      content: 'Co-interior angles (C-angles or allied angles) between parallel lines add up to 180°.',
      formula: 'Co-interior angles add to 180°',
      example: 'One co-interior angle is 110°.\nThe other = 180° − 110° = 70°',
      tip: 'Look for a C or U shape between the parallel lines.',
    },
    {
      title: 'Isosceles Triangle Angles',
      content: 'An isosceles triangle has two equal sides and two equal base angles. The apex angle + 2 × base angle = 180°.',
      formula: 'Base angle = (180° − apex) ÷ 2',
      example: 'Apex angle = 40°\nBase angles = (180° − 40°) ÷ 2 = 70° each',
    },
  ],
};

const generateQuestion = (tier) => {
  if (tier === 'foundation') {
    const types = [
      () => {
        const a = r(30, 150);
        return { type: 'straight-line', known: a, answer: 180 - a,
          display: `Two angles on a straight line. One is ${a}°. Find the other.`,
          explanation: `Angles on a straight line = 180°\n${a}° + x = 180°\nx = 180° − ${a}° = ${180 - a}°`,
          visual: { kind: 'straight', angle: a } };
      },
      () => {
        const a = r(30, 80), b = r(30, 130 - a);
        return { type: 'triangle', known: [a, b], answer: 180 - a - b,
          display: `A triangle has angles ${a}° and ${b}°. Find the third angle.`,
          explanation: `Angles in a triangle = 180°\n${a}° + ${b}° + x = 180°\nx = 180° − ${a}° − ${b}° = ${180 - a - b}°`,
          visual: { kind: 'triangle', angles: [a, b] } };
      },
      () => {
        const a = r(60, 200), b = r(30, 300 - a);
        return { type: 'point', known: [a, b], answer: 360 - a - b,
          display: `Three angles around a point: ${a}°, ${b}°, and x. Find x.`,
          explanation: `Angles around a point = 360°\nx = 360° − ${a}° − ${b}° = ${360 - a - b}°`,
          visual: null };
      },
      () => {
        const a = r(20, 160);
        return { type: 'vertical', known: a, answer: a,
          display: `Two straight lines cross. One angle is ${a}°. What is the vertically opposite angle?`,
          explanation: `Vertically opposite angles are equal.\nAnswer = ${a}°`,
          visual: null };
      },
      () => {
        const a = r(10, 80);
        return { type: 'right', known: a, answer: 90 - a,
          display: `Two angles make a right angle. One is ${a}°. Find the other.`,
          explanation: `Right angle = 90°\nx = 90° − ${a}° = ${90 - a}°`,
          visual: null };
      },
    ];
    return types[r(0, types.length - 1)]();
  } else {
    const types = [
      () => {
        const sides = r(5, 8);
        const names = { 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon' };
        const total = (sides - 2) * 180;
        const each = total / sides;
        return { type: 'polygon', answer: Math.round(each),
          display: `Find each interior angle of a regular ${names[sides]}.`,
          explanation: `Sum = (${sides} − 2) × 180° = ${total}°\nEach angle = ${total}° ÷ ${sides} = ${Math.round(each)}°`,
          visual: null };
      },
      () => {
        const sides = [3, 4, 5, 6, 8, 9, 10, 12][r(0, 7)];
        return { type: 'exterior', answer: Math.round(360 / sides),
          display: `Find each exterior angle of a regular ${sides}-sided polygon.`,
          explanation: `Exterior angle = 360° ÷ ${sides} = ${Math.round(360 / sides)}°`,
          visual: null };
      },
      () => {
        const a = r(30, 150);
        return { type: 'alternate', answer: a,
          display: `A transversal crosses parallel lines. An angle is ${a}°. Find the alternate angle.`,
          explanation: `Alternate angles (Z-angles) are equal.\nAnswer = ${a}°`,
          visual: null };
      },
      () => {
        const a = r(40, 140);
        return { type: 'co-interior', answer: 180 - a,
          display: `Co-interior angles between parallel lines. One is ${a}°. Find the other.`,
          explanation: `Co-interior angles = 180°\nx = 180° − ${a}° = ${180 - a}°`,
          visual: null };
      },
      () => {
        const baseWhole = r(30, 80);
        const apexWhole = 180 - 2 * baseWhole;
        return { type: 'isosceles', answer: baseWhole,
          display: `An isosceles triangle has an apex angle of ${apexWhole}°. Find each base angle.`,
          explanation: `Base angle = (180° − ${apexWhole}°) ÷ 2 = ${baseWhole}°`,
          visual: null };
      },
    ];
    return types[r(0, types.length - 1)]();
  }
};

function AngleDiagram({ question }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !question?.visual) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    ctx.strokeStyle = '#00e5a0'; ctx.lineWidth = 2;
    ctx.font = 'bold 14px Space Grotesk, sans-serif';

    if (question.visual.kind === 'straight') {
      ctx.beginPath(); ctx.moveTo(40, cy); ctx.lineTo(w - 40, cy); ctx.stroke();
      const angle = question.visual.angle;
      const rad = (angle * Math.PI) / 180;
      const ax = cx + 80 * Math.cos(-rad), ay = cy + 80 * Math.sin(-rad);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 30, -rad, 0); ctx.strokeStyle = '#ffe600'; ctx.stroke();
      ctx.fillStyle = '#ffe600'; ctx.fillText(`${angle}°`, cx + 35, cy - 10);
      ctx.beginPath(); ctx.arc(cx, cy, 30, -Math.PI, -rad); ctx.strokeStyle = '#ff2d78'; ctx.stroke();
      ctx.fillStyle = '#ff2d78'; ctx.fillText('x°', cx - 55, cy - 10);
    }
    if (question.visual.kind === 'triangle') {
      const [a1, a2] = question.visual.angles;
      const p1 = { x: 60, y: h - 40 }, p2 = { x: w - 60, y: h - 40 }, p3 = { x: w / 2 - 20, y: 40 };
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.closePath(); ctx.stroke();
      ctx.fillStyle = '#ffe600'; ctx.fillText(`${a1}°`, p1.x + 8, p1.y - 12); ctx.fillText(`${a2}°`, p2.x - 35, p2.y - 12);
      ctx.fillStyle = '#ff2d78'; ctx.fillText('x°', p3.x - 5, p3.y + 22);
    }
  }, [question]);
  if (!question?.visual) return null;
  return <canvas ref={canvasRef} width={280} height={180} style={{ display: 'block', margin: '0 auto 16px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)' }} />;
}

const GAME_DURATION = 60;

import AdGateway from '../../../components/AdGateway';

export default function AngleSnapper() {
  return (
    <AdGateway gameName="Angle Snapper">
      <AngleSnapperContent />
    </AdGateway>
  );
}

function AngleSnapperContent() {
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
    setInput(''); setFeedback(null); setShowExplanation(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [tier]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !question || showExplanation) return;
    const userAnswer = parseFloat(input);
    const isCorrect = Math.abs(userAnswer - question.answer) < 0.5;

    setHistory((prev) => [...prev, { q: question.display, correct: isCorrect, userAnswer, answer: question.answer }]);

    if (isCorrect) {
      const newStreak = streak + 1;
      setScore((s) => s + (newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1));
      setStreak(newStreak); setBestStreak((b) => Math.max(b, newStreak));
      setFeedback('correct');
      if (mode === 'practice') { setPracticeCount((c) => c + 1); setTimeout(() => nextQuestion(), 800); }
      else setTimeout(() => nextQuestion(), 400);
    } else {
      setStreak(0); setFeedback('wrong');
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
          <h1 className="game-title" style={{ color: '#b14aed' }}>📐 Angle Snapper</h1>
          <p className="game-subtitle">Calculate missing angles from geometry problems.</p>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#888', marginBottom: 12 }}>SELECT TIER</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {['foundation', 'higher'].map((t) => (
                <button key={t} onClick={() => setTier(t)} className="btn-outline" style={{
                  borderColor: tier === t ? '#b14aed' : 'var(--border-light)',
                  color: tier === t ? '#b14aed' : 'var(--text-muted)',
                  background: tier === t ? 'rgba(177,74,237,0.1)' : 'transparent',
                  textTransform: 'capitalize', minWidth: 120,
                }}>
                  {t === 'foundation' ? '📗 Foundation' : '📘 Higher'}
                </button>
              ))}
            </div>
          </div>

          <LessonCards cards={GEOMETRY_LESSONS[tier]} accentColor="#b14aed" />

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
            <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: '#b14aed', color: '#b14aed', fontSize: 16, padding: '14px 28px' }}>
              <BookOpen size={18} /> Practice Mode
            </button>
            <button onClick={() => startGame('test')} className="btn-primary" style={{ fontSize: 16, background: 'linear-gradient(135deg, #b14aed, #ff2d78)' }}>
              <Zap size={18} /> Timed Test
            </button>
          </div>
          <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>Practice = no timer, with hints • Test = 60 seconds, score-based</div>
        </div>
      </div>
    );
  }

  // PLAYING
  if (phase === 'playing') {
    const timerPct = (timeLeft / GAME_DURATION) * 100;
    const timerColor = timeLeft <= 10 ? '#ff2d78' : timeLeft <= 20 ? '#ffe600' : '#b14aed';
    const isPractice = mode === 'practice';

    return (
      <div className="game-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          {isPractice ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 14, color: '#b14aed' }}>
              <BookOpen size={16} /> Practice — Q{practiceCount + 1}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 18 }}>
              <Timer size={18} color={timerColor} />
              <span style={{ color: timerColor, fontVariantNumeric: 'tabular-nums' }}>{timeLeft}s</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontWeight: 800, color: '#b14aed' }}>{score} pts</span>
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
          textAlign: 'center', padding: '24px', borderRadius: 20,
          background: feedback === 'correct' ? 'rgba(0,255,148,0.08)' : feedback === 'wrong' ? 'rgba(255,45,120,0.08)' : 'var(--bg-card)',
          border: `2px solid ${feedback === 'correct' ? '#00ff94' : feedback === 'wrong' ? '#ff2d78' : 'var(--border-light)'}`,
          transition: 'all 0.3s ease', marginBottom: 24,
        }}>
          <AngleDiagram question={question} />
          <div style={{ fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 800, color: '#fff', lineHeight: 1.5 }}>
            {question?.display}
          </div>
        </div>

        {showExplanation && (
          <div style={{ padding: '16px 20px', borderRadius: 14, marginBottom: 16, background: 'rgba(255,230,0,0.06)', border: '1px solid rgba(255,230,0,0.2)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ffe600', marginBottom: 6 }}>✗ Incorrect — The answer is {question?.answer}°</div>
            <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{question?.explanation}</div>
            <button onClick={handlePracticeNext} className="btn-outline" style={{ marginTop: 12, borderColor: '#b14aed', color: '#b14aed' }}>Next Question →</button>
          </div>
        )}

        {!showExplanation && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12 }}>
            <input ref={inputRef} type="number" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Angle in degrees..." className="input-field"
              style={{ flex: 1, textAlign: 'center', fontSize: 24, fontWeight: 800, marginBottom: 0 }} autoFocus />
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #b14aed, #ff2d78)', padding: '14px 24px' }}>✓</button>
          </form>
        )}

        {streak > 0 && !showExplanation && (
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: streak >= 5 ? '#ffe600' : streak >= 3 ? '#ff6b35' : '#b14aed', fontWeight: 700 }}>
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
      <div className="result-card" style={{ borderColor: '#b14aed' }}>
        <div className="result-emoji">{mode === 'practice' ? '📖' : '📐'}</div>
        <div className="result-title" style={{ color: '#b14aed' }}>
          {mode === 'practice' ? 'Practice Complete' : `${score} Points`}
        </div>
        <p className="result-desc">{correctCount}/{history.length} correct{mode === 'test' ? ` • Best streak: ${bestStreak}` : ''}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(177,74,237,0.08)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#b14aed' }}>{correctCount}</div>
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
                  <span>{h.q.substring(0, 40)}...</span>
                  <span style={{ fontWeight: 700, color: h.correct ? '#00ff94' : '#ff2d78' }}>{h.correct ? `✓ ${h.answer}°` : `✗ ${h.answer}°`}</span>
                </div>
              ))}
            </div>
          </details>
        )}

        <AdBanner format="rectangle" />

        {mode === 'practice' && accuracy < 80 && (
          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(177,74,237,0.06)', border: '1px solid rgba(177,74,237,0.15)', marginBottom: 16, fontSize: 13, color: '#b14aed', fontWeight: 600 }}>
            💡 Tip: Review the lesson cards and try again before the timed test.
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
              <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: '#b14aed', color: '#b14aed' }}><RotateCcw size={16} /> More Practice</button>
              <button onClick={() => startGame('test')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #b14aed, #ff2d78)' }}><Zap size={16} /> Try Timed Test</button>
            </>
          ) : (
            <>
              <button onClick={() => startGame('test')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #b14aed, #ff2d78)' }}><RotateCcw size={16} /> Play Again</button>
              <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: '#b14aed', color: '#b14aed' }}><BookOpen size={16} /> Practice Mode</button>
            </>
          )}
          <Link href="/gcse/maths"><button className="btn-outline">Back to Maths</button></Link>
        </div>
      </div>
    </div>
  );
}
