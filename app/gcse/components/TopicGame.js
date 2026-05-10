'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import AdBanner from '../../components/AdBanner';
import LessonCards from './LessonCards';
import FlashcardMode from './FlashcardMode';
import useStoredStats from './useStoredStats';
import Link from 'next/link';
import { Timer, Flame, RotateCcw, ArrowRight, ChevronDown, BookOpen, Zap, Brain, Layers } from 'lucide-react';
import { recordActivity } from '../utils/streakLogic';
import { getBankQuestions, shuffleArray } from '../utils/questionBankLoader';
import { applyRating, resultToQuality, getMemoryStrength } from '../utils/spacedRepetitionEngine';

const GAME_DURATION = 60;

function getSubjectMeta(config) {
  const hub = config.hubPath || (config.subjectSlug ? `/gcse/${config.subjectSlug}` : '');

  if (hub === '/gcse/science' || ['Biology', 'Chemistry', 'Physics'].includes(config.category)) {
    return { badge: 'GCSE Science', hubPath: '/gcse/science', backLabel: 'Back to Science', statsKey: 'gcse-science-stats' };
  }
  if (hub === '/gcse/computer-science' || config.subjectSlug === 'computer-science' || ['Algorithms & Thinking', 'Programming Concepts', 'Logic & Data'].includes(config.category)) {
    return { badge: 'GCSE Computer Science', hubPath: '/gcse/computer-science', backLabel: 'Back to Computer Science', statsKey: 'gcse-compsci-stats' };
  }
  if (hub === '/gcse/business' || config.subjectSlug === 'business' || ['Real World', 'Operations', 'Human Resources'].includes(config.category)) {
    return { badge: 'GCSE Business', hubPath: '/gcse/business', backLabel: 'Back to Business', statsKey: 'gcse-business-stats' };
  }
  if (hub === '/gcse/history' || config.subjectSlug === 'history') {
    return { badge: 'GCSE History', hubPath: '/gcse/history', backLabel: 'Back to History', statsKey: 'gcse-history-stats' };
  }
  if (hub === '/gcse/geography' || config.subjectSlug === 'geography') {
    return { badge: 'GCSE Geography', hubPath: '/gcse/geography', backLabel: 'Back to Geography', statsKey: 'gcse-geography-stats' };
  }
  if (hub === '/gcse/english-language' || config.subjectSlug === 'english-language') {
    return { badge: 'GCSE English Language', hubPath: '/gcse/english-language', backLabel: 'Back to English Lang', statsKey: 'gcse-english-lang-stats' };
  }
  if (hub === '/gcse/english-literature' || config.subjectSlug === 'english-literature') {
    return { badge: 'GCSE English Literature', hubPath: '/gcse/english-literature', backLabel: 'Back to English Lit', statsKey: 'gcse-english-lit-stats' };
  }

  return { badge: 'GCSE Maths', hubPath: '/gcse/maths', backLabel: 'Back to Maths', statsKey: 'gcse-maths-stats' };
}

/**
 * Shared GCSE topic game engine.
 * Props:
 *   config: { title, emoji, color, description, lessons, generateQuestion, inputHint?, fractionInput? }
 */
export default function TopicGame({ config, topic, subjectName, subjectSlug, accentColor, categoryName }) {
  // Support both legacy (topic) and new (config) prop patterns
  const finalConfig = config || topic;
  const [mounted, setMounted] = useState(false);
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
  const [stepIndex, setStepIndex] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [questionDeck, setQuestionDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([]);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const hasSavedRef = useRef(false);
  const bankRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const accent = accentColor || finalConfig?.color || '#00e5a0';
  const subjectMeta = getSubjectMeta({ subjectSlug, ...finalConfig });
  const statsKey = subjectMeta.statsKey;
  const stats = useStoredStats(statsKey);

  const nextQuestion = useCallback(() => {
    if (deckIndex < questionDeck.length - 1) {
      const nextIdx = deckIndex + 1;
      setDeckIndex(nextIdx);
      setQuestion(questionDeck[nextIdx]);
      setInput(''); setFeedback(null); setShowExplanation(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Deck exhausted, results or reshuffle
      if (mode === 'test') setPhase('results');
      else {
        // In practice mode, pull more unseen from bank or fallback
        const meta = getSubjectMeta(config);
        const subjectId = meta.hubPath.split('/').pop();
        const seenKey = `seen_${subjectId}_${config.slug}`;
        const seenIds = JSON.parse(localStorage.getItem(seenKey) || '[]');
        
        const unseenBank = bankRef.current.filter(q => !seenIds.includes(q.id));
        const newDeck = [];
        if (unseenBank.length > 0) {
          const toAdd = shuffleArray(unseenBank).slice(0, 15);
          newDeck.push(...toAdd);
        }
        
        while (newDeck.length < 15) {
          newDeck.push({ ...config.generateQuestion(tier), id: 'gen_' + Math.random() });
        }
        
        setQuestionDeck(newDeck);
        setDeckIndex(0);
        setQuestion(newDeck[0]);
        setInput(''); setFeedback(null); setShowExplanation(false);
      }
    }
  }, [deckIndex, questionDeck, mode, tier, config]);

  const startFlashcards = async () => {
    const meta = getSubjectMeta(config);
    const subjectId = meta.hubPath.split('/').pop();
    let cards = [];
    try {
      const rawBank = await getBankQuestions(subjectId, config.slug);
      cards = rawBank.map((q, i) => ({
        id: q.id || `fc_${i}`,
        front: q.q,
        back: q.a + (q.e ? `\n\n${q.e}` : ''),
        hint: q.hint || null,
      }));
    } catch {}
    if (!cards.length && config.lessons) {
      const allLessons = [...(config.lessons.foundation || []), ...(config.lessons.higher || [])];
      cards = allLessons.map((l, i) => ({ id: `lesson_${i}`, front: l.title, back: l.content }));
    }
    setFlashcards(cards);
    setPhase('flashcard');
  };

  const startGame = async (gameMode) => {
    setMode(gameMode); setPhase('playing'); setScore(0); setStreak(0);
    setBestStreak(0); setTimeLeft(GAME_DURATION); setHistory([]); setPracticeCount(0);
    hasSavedRef.current = false;
    
    // Determine subject and topic
    const meta = getSubjectMeta(config);
    const subjectId = meta.hubPath.split('/').pop();
    const topicSlug = config.slug;

    // Load from Bank
    let bankQuestions = [];
    try {
      const rawBank = await getBankQuestions(subjectId, topicSlug);
      // Map bank format to internal format
      bankQuestions = rawBank.map(q => ({
        id: q.id,
        display: q.q,
        answer: q.a,
        options: q.o,
        explanation: q.e || 'Correct answer: ' + q.a
      }));
      bankRef.current = bankQuestions;
    } catch (e) {
      console.warn("Failed to load bank questions:", e);
    }

    // ── Persistent Exhaustion Logic ──────────────────────────────────────────
    const deckSize = gameMode === 'test' ? 30 : 15;
    const seenKey = `seen_${subjectId}_${topicSlug}`;
    const seenIds = JSON.parse(localStorage.getItem(seenKey) || '[]');
    
    // Prioritize unseen questions
    const unseen = bankQuestions.filter(q => !seenIds.includes(q.id));
    const seen = bankQuestions.filter(q => seenIds.includes(q.id));
    
    let pool = [];
    if (unseen.length >= deckSize) {
      pool = shuffleArray(unseen).slice(0, deckSize);
    } else {
      // If we don't have enough unseen, take all unseen + some seen
      pool = [...unseen, ...shuffleArray(seen).slice(0, deckSize - unseen.length)];
      // If the bank is completely exhausted, we reset seen tracking for this topic
      if (bankQuestions.length > 0 && unseen.length === 0) {
        localStorage.setItem(seenKey, '[]');
      }
    }

    let initialDeck = pool;
    
    // Fill remaining with dynamic generator if pool is still too small
    while (initialDeck.length < deckSize) {
      initialDeck.push({ ...config.generateQuestion(tier), id: 'gen_' + Math.random() });
    }
    
    setQuestionDeck(initialDeck);
    setDeckIndex(0);
    setQuestion(initialDeck[0]);
    setInput(''); setFeedback(null); setShowExplanation(false);
  };

  useEffect(() => {
    if (phase !== 'playing' || mode !== 'test') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { clearInterval(timerRef.current); setPhase('results'); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, mode]);

  useEffect(() => {
    if (phase === 'results' && !hasSavedRef.current) {
      hasSavedRef.current = true;
      try {
        const existing = JSON.parse(localStorage.getItem(subjectMeta.statsKey) || '{}');
        const accuracy = history.length > 0 ? (history.filter(h => h.correct).length / history.length) : 0;
        const topicKey = `topic_${config.slug || 'unknown'}`;
        
        const newStats = {
          totalPlays: (existing.totalPlays || 0) + 1,
          bestStreak: Math.max(existing.bestStreak || 0, bestStreak),
        };

        // Track per-topic mastery
        if (!existing[topicKey]) existing[topicKey] = {};
        if (accuracy >= 0.9 && history.length >= 5) {
          existing[topicKey].mastered = true;
        }
        
        localStorage.setItem(subjectMeta.statsKey, JSON.stringify({
          ...existing,
          ...newStats
        }));
        
        // Record global daily streak
        recordActivity();
      } catch {}
    }
  }, [phase, bestStreak, subjectMeta.statsKey, history, config.slug]);

  const checkAnswer = (userInput, q) => {
    const trimmed = userInput.trim();
    if (!trimmed) return false;
    if (q.answerType === 'fraction') return trimmed === String(q.answer);
    if (q.answerType === 'text') return trimmed.toLowerCase() === String(q.answer).toLowerCase();
    const num = parseFloat(trimmed);
    if (!isNaN(num) && typeof q.answer === 'number') {
      return Math.abs(num - q.answer) < 0.01;
    }
    return trimmed.toLowerCase() === String(q.answer).toLowerCase();
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
      // SRS: record correct answer
      if (config.slug) { try { const meta = getSubjectMeta(config); applyRating(meta.hubPath.split('/').pop(), config.slug, 5); } catch {} }
      // Record as seen
      if (question.id && !question.id.startsWith('gen_')) {
        const meta = getSubjectMeta(config);
        const subjectId = meta.hubPath.split('/').pop();
        const seenKey = `seen_${subjectId}_${config.slug}`;
        const seenIds = JSON.parse(localStorage.getItem(seenKey) || '[]');
        if (!seenIds.includes(question.id)) { seenIds.push(question.id); localStorage.setItem(seenKey, JSON.stringify(seenIds)); }
      }
      if (mode === 'practice') { setPracticeCount((c) => c + 1); setTimeout(() => nextQuestion(), 800); }
      else setTimeout(() => nextQuestion(), 400);
    } else {
      setStreak(0); setFeedback('wrong');
      // SRS: record failed answer
      if (config.slug) { try { const meta = getSubjectMeta(config); applyRating(meta.hubPath.split('/').pop(), config.slug, 1); } catch {} }
      if (mode === 'practice') { setShowExplanation(true); setStepIndex(0); }
      else setTimeout(() => nextQuestion(), 400);
    }
  };

  const handleOptionClick = (opt) => {
    if (!question || showExplanation) return;
    const isCorrect = checkAnswer(opt, question);
    setHistory((prev) => [...prev, { q: question.display, correct: isCorrect, userAnswer: opt, answer: question.answer }]);

    if (isCorrect) {
      const ns = streak + 1;
      setScore((s) => s + (ns >= 5 ? 3 : ns >= 3 ? 2 : 1));
      setStreak(ns); setBestStreak((b) => Math.max(b, ns)); setFeedback('correct');

      // Record as seen
      if (question.id && !question.id.startsWith('gen_')) {
        const meta = getSubjectMeta(config);
        const subjectId = meta.hubPath.split('/').pop();
        const seenKey = `seen_${subjectId}_${config.slug}`;
        const seenIds = JSON.parse(localStorage.getItem(seenKey) || '[]');
        if (!seenIds.includes(question.id)) {
          seenIds.push(question.id);
          localStorage.setItem(seenKey, JSON.stringify(seenIds));
        }
      }

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
    return (
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="animate-fade-in">
          <div className="game-badge">{subjectMeta.badge}</div>
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

          {config.hacks && (
            <div style={{ margin: '24px 0', textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ff6b35', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Zap size={16} /> EXAM HACKS
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {config.hacks.map((hack, i) => (
                  <div key={i} style={{ padding: '16px 20px', borderRadius: 16, background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#ff6b35', marginBottom: 4 }}>{hack.title}</div>
                    <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>{hack.content}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {config.advanced && (
            <div style={{ margin: '24px 0', textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#00d4ff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Brain size={16} /> ADVANCED ANALYSIS
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {config.advanced.map((item, i) => (
                  <div key={i} style={{ padding: '16px 20px', borderRadius: 16, background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#00d4ff', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>{item.content}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
            <button onClick={() => startGame('practice')} className="btn-outline" style={{ borderColor: accent, color: accent, fontSize: 16, padding: '14px 28px' }}>
              <BookOpen size={18} /> Practice Mode
            </button>
            <button onClick={() => startGame('test')} className="btn-primary" style={{ fontSize: 16, background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#000' }}>
              <Zap size={18} /> Timed Test
            </button>
            <button onClick={startFlashcards} className="btn-outline" style={{ borderColor: '#ffe600', color: '#ffe600', fontSize: 16, padding: '14px 28px' }}>
              <Layers size={18} /> Flashcards
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
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ffe600', marginBottom: 10 }}>✗ Incorrect — The answer is <span style={{ color: '#fff' }}>{question?.answer}{question?.unit || ''}</span></div>
            {/* Step-by-step solution reveal */}
            {question?.steps?.length > 0 ? (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                  {question.steps.slice(0, stepIndex + 1).map((step, i) => (
                    <div key={i} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 13, color: '#ccc', lineHeight: 1.6 }}>
                      <span style={{ color: '#ffe600', fontWeight: 700, marginRight: 8 }}>Step {i + 1}:</span>{step}
                    </div>
                  ))}
                </div>
                {stepIndex < question.steps.length - 1 ? (
                  <button onClick={() => setStepIndex(s => s + 1)} className="btn-outline" style={{ borderColor: '#ffe600', color: '#ffe600', marginRight: 10 }}>Next Step →</button>
                ) : (
                  <button onClick={() => { setPracticeCount((c) => c + 1); nextQuestion(); setStepIndex(0); }} className="btn-outline" style={{ borderColor: accent, color: accent }}>Got it — Next Question →</button>
                )}
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: 12 }}>{question?.explanation}</div>
                <button onClick={() => { setPracticeCount((c) => c + 1); nextQuestion(); }} className="btn-outline" style={{ borderColor: accent, color: accent }}>Next Question →</button>
              </div>
            )}
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
          ) : question.answerType === 'cloze' ? (
            /* Cloze (fill-in-the-blank) render */
            <form onSubmit={handleSubmit}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#ccc', lineHeight: 1.8, marginBottom: 12 }}>
                {question.display.split('___').map((part, i, arr) => (
                  <span key={i}>{part}{i < arr.length - 1 && (
                    <input
                      ref={i === 0 ? inputRef : null}
                      type="text" value={input} onChange={(e) => setInput(e.target.value)}
                      style={{ display: 'inline-block', width: '140px', background: 'rgba(255,255,255,0.08)', border: `2px solid ${accent}60`, borderRadius: 8, padding: '4px 10px', color: '#fff', fontSize: 16, fontWeight: 700, textAlign: 'center', margin: '0 4px' }}
                      autoFocus
                    />
                  )}
                  </span>
                ))}
              </div>
              <button type="submit" className="btn-primary" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#000', width: '100%' }}>
                Check Answer <ArrowRight size={18} />
              </button>
            </form>
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

  // ===== FLASHCARD MODE =====
  if (phase === 'flashcard') {
    const meta = getSubjectMeta(config);
    const subjectId = meta.hubPath.split('/').pop();
    return (
      <div className="game-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Layers size={20} color="#ffe600" /> Flashcard Mode
          </h2>
          <button onClick={() => setPhase('menu')} style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>← Exit</button>
        </div>
        <FlashcardMode
          cards={flashcards}
          subjectId={subjectId}
          topicSlug={config.slug || 'unknown'}
          accentColor={accent}
          onExit={() => setPhase('menu')}
        />
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
          <Link href={config.hubPath || subjectMeta.hubPath}><button className="btn-outline">{config.backLabel || subjectMeta.backLabel}</button></Link>
        </div>
      </div>
    </div>
  );
}
