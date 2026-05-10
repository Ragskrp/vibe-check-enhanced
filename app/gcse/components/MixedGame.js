'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Timer, Flame, RotateCcw, ArrowRight, Zap, Target, BookOpen, Layers } from 'lucide-react';
import { recordActivity } from '../utils/streakLogic';
import { getBankQuestions, shuffleArray } from '../utils/questionBankLoader';
import { applyRating, resultToQuality, getMemoryStrength } from '../utils/spacedRepetitionEngine';
import AdBanner from '../../components/AdBanner';

const GAME_DURATION = 180; // 3 minutes
const DATA_LOADERS = {
  'maths': () => import('../maths/topicData'),
  'science': () => import('../science/scienceData'),
  'computer-science': () => import('../computer-science/computerScienceData'),
  'business': () => import('../business/businessData'),
  'english-language': () => import('../english-language/englishLanguageData'),
  'english-literature': () => import('../english-literature/englishLiteratureData'),
  'history': () => import('../history/historyData'),
  'geography': () => import('../geography/geographyData'),
};

async function getTopicConfig(subjectId, topicSlug) {
  const loader = DATA_LOADERS[subjectId];
  if (!loader) return null;

  const module = await loader();
  if (module.getTopicBySlug) return module.getTopicBySlug(topicSlug);
  if (module.TOPICS?.[topicSlug]) return { ...module.TOPICS[topicSlug], slug: topicSlug };
  if (module.getTopicsByCategory) {
    return Object.values(module.getTopicsByCategory()).flat().find((topic) => topic.slug === topicSlug) || null;
  }
  return null;
}

function mapQuestion(question, topic, subjectId, index) {
  return {
    id: question.id || `${subjectId}_${topic.slug}_${index}`,
    display: question.q ?? question.display,
    answer: question.a ?? question.answer,
    options: question.o ?? question.options,
    explanation: question.e ?? question.explanation,
    topicTitle: topic.title,
    subjectId,
    topicSlug: topic.slug,
    color: topic.color || getSubjectColor(subjectId),
  };
}

async function getFallbackQuestions(subjectId, topic) {
  const config = await getTopicConfig(subjectId, topic.slug);
  if (!config) return [];

  if (typeof config.generateQuestion === 'function') {
    return Array.from({ length: 6 }, (_, index) => {
      const generated = config.generateQuestion('higher');
      return mapQuestion(
        { ...generated, id: `${subjectId}_${topic.slug}_generated_${index}` },
        { ...topic, title: config.title || topic.title, color: config.color || topic.color },
        subjectId,
        index
      );
    });
  }

  if (Array.isArray(config.quizzes)) {
    return config.quizzes.map((question, index) => mapQuestion(question, { ...topic, ...config }, subjectId, index));
  }

  if (Array.isArray(config.flashcards)) {
    return config.flashcards.map((card, index) => mapQuestion(card, { ...topic, ...config }, subjectId, index));
  }

  return [];
}

export default function MixedGame({ subjectsData, title, backLink, backLabel }) {
  const [phase, setPhase] = useState('menu');
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [questionDeck, setQuestionDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const hasSavedRef = useRef(false);

  const startGame = async () => {
    setPhase('loading');
    
    let allQuestions = [];

    // Aggregate questions from all provided subjects/topics
    for (const [subjectId, topics] of Object.entries(subjectsData)) {
      for (const topic of topics) {
        try {
          const rawBank = await getBankQuestions(subjectId, topic.slug);
          
          // Get memory strength to bias selection (lower strength = higher chance)
          const memStr = getMemoryStrength(subjectId, topic.slug);
          const weight = memStr < 50 ? 3 : memStr < 80 ? 2 : 1;

          const mapped = rawBank.length
            ? rawBank.map((q, index) => mapQuestion(q, topic, subjectId, index))
            : await getFallbackQuestions(subjectId, topic);

          if (!mapped.length) continue;

          // Add weighted copies to the pool
          for(let i = 0; i < weight; i++) {
            allQuestions.push(...mapped);
          }
        } catch (e) {
          console.warn(`Failed to load bank for ${topic.slug}:`, e);
        }
      }
    }

    // Shuffle and deduplicate
    allQuestions = shuffleArray(allQuestions);
    const uniqueQuestions = [];
    const seenIds = new Set();
    for (const q of allQuestions) {
      if (!seenIds.has(q.id)) {
        seenIds.add(q.id);
        uniqueQuestions.push(q);
      }
    }

    setQuestionDeck(uniqueQuestions);
    setDeckIndex(0);
    setQuestion(uniqueQuestions[0]);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(GAME_DURATION);
    setHistory([]);
    hasSavedRef.current = false;
    setPhase('playing');
  };

  const nextQuestion = useCallback(() => {
    if (deckIndex < questionDeck.length - 1) {
      const nextIdx = deckIndex + 1;
      setDeckIndex(nextIdx);
      setQuestion(questionDeck[nextIdx]);
      setInput(''); 
      setFeedback(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setPhase('results');
    }
  }, [deckIndex, questionDeck]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setPhase('results');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase, timeLeft]);

  // Handle saving stats when game ends
  useEffect(() => {
    if (phase === 'results' && !hasSavedRef.current) {
      hasSavedRef.current = true;
      recordActivity();
      
      // We don't save specific topic mastery here since it's a mixed practice, 
      // but we do update the SM-2 algorithm for each answered question in checkAnswer.
    }
  }, [phase]);

  const checkAnswer = (selectedOpt) => {
    if (!question || feedback) return;

    let isCorrect = false;
    let actualInput = '';

    if (question.options && selectedOpt) {
      actualInput = selectedOpt;
      isCorrect = selectedOpt === question.answer;
    } else {
      actualInput = input.trim();
      const cleanInput = actualInput.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanAnswer = String(question.answer).toLowerCase().replace(/[^a-z0-9]/g, '');
      isCorrect = cleanInput === cleanAnswer || actualInput.toLowerCase() === String(question.answer).toLowerCase();
    }

    const timeSpent = 15; // approximate
    const quality = resultToQuality(isCorrect, timeSpent);
    
    // Update SRS engine for this specific topic
    applyRating(question.subjectId, question.topicSlug, quality);

    if (isCorrect) {
      setScore(s => s + 100 + (streak * 10));
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setFeedback({ type: 'success', msg: 'Correct!' });
      
      setHistory(prev => [{ ...question, correct: true, userAnswer: actualInput }, ...prev]);
      setTimeout(nextQuestion, 600);
    } else {
      setStreak(0);
      setFeedback({ type: 'error', msg: `Incorrect. The answer is ${question.answer}` });
      setHistory(prev => [{ ...question, correct: false, userAnswer: actualInput }, ...prev]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) checkAnswer();
  };

  if (phase === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#00d4ff', fontSize: 18, fontWeight: 800 }}>Generating Interleaved Session...</div>
      </div>
    );
  }

  if (phase === 'menu') {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg, #00d4ff, #ff2d78)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', boxShadow: '0 0 40px rgba(0,212,255,0.3)' }}>
            <Layers size={40} color="#000" />
          </div>
          
          <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.03em' }}>{title}</h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 48 }}>
            Science proves that interleaving (switching topics rapidly) builds stronger neural pathways than blocking (studying one topic). 
            Survive 3 minutes of chaotic retrieval.
          </p>
          
          <button onClick={startGame} className="btn-primary" style={{ background: '#fff', color: '#000', width: '100%', marginBottom: 16, fontSize: 18, padding: '20px' }}>
            START 3-MINUTE GAUNTLET
          </button>
          
          <Link href={backLink}>
            <button className="btn-outline" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.1)' }}>{backLabel}</button>
          </Link>
        </div>
      </div>
    );
  }

  if (phase === 'playing' && question) {
    const accent = question.color || '#00d4ff';

    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '20px' }}>
        <header style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 800, color: accent }}>
              <Target size={20} /> {score}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 800, color: streak >= 3 ? '#ff6b35' : 'rgba(255,255,255,0.4)' }}>
              <Flame size={20} /> {streak}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 24, fontWeight: 900, color: timeLeft <= 10 ? '#ff2d78' : '#fff' }}>
            <Timer size={24} color={timeLeft <= 10 ? '#ff2d78' : '#888'} />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </header>

        <main style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Dynamic Context Banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: '12px 20px', borderRadius: 16, background: `${accent}15`, border: `1px solid ${accent}40` }}>
            <BookOpen size={18} color={accent} />
            <div style={{ fontSize: 13, fontWeight: 800, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {question.topicTitle}
            </div>
          </div>

          <div style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 800, lineHeight: 1.3, marginBottom: 40 }}>
            {question.display}
          </div>

          {question.options ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => checkAnswer(opt)}
                  disabled={!!feedback}
                  style={{
                    padding: '24px', borderRadius: 16, border: `2px solid ${feedback ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)'}`,
                    background: 'rgba(255,255,255,0.02)', color: '#fff', fontSize: 18, fontWeight: 700,
                    cursor: feedback ? 'default' : 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { if (!feedback) { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={(e) => { if (!feedback) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ marginBottom: 40 }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!!feedback}
                autoFocus
                placeholder="Type your answer..."
                style={{
                  width: '100%', padding: '24px', borderRadius: 16, border: '2px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 24, fontWeight: 700,
                  outline: 'none', transition: 'border-color 0.3s'
                }}
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
              <button
                onClick={() => checkAnswer()}
                disabled={!!feedback || !input.trim()}
                style={{
                  width: '100%', padding: '20px', borderRadius: 16, marginTop: 16, border: 'none',
                  background: feedback || !input.trim() ? 'rgba(255,255,255,0.1)' : accent,
                  color: feedback || !input.trim() ? 'rgba(255,255,255,0.4)' : '#000',
                  fontSize: 18, fontWeight: 800, cursor: feedback || !input.trim() ? 'not-allowed' : 'pointer', transition: 'all 0.3s'
                }}
              >
                SUBMIT
              </button>
            </div>
          )}

          {feedback && (
            <div style={{ padding: 24, borderRadius: 16, background: feedback.type === 'success' ? 'rgba(0,255,148,0.1)' : 'rgba(255,45,120,0.1)', border: `2px solid ${feedback.type === 'success' ? '#00ff94' : '#ff2d78'}` }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: feedback.type === 'success' ? '#00ff94' : '#ff2d78', marginBottom: 8 }}>
                {feedback.msg}
              </div>
              {feedback.type === 'error' && question.explanation && (
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{question.explanation}</div>
              )}
              {feedback.type === 'error' && (
                <button onClick={nextQuestion} style={{ marginTop: 16, padding: '12px 24px', borderRadius: 8, background: '#ff2d78', color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                  NEXT QUESTION →
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#00d4ff', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Gauntlet Complete</div>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 900, marginBottom: 40, letterSpacing: '-0.03em' }}>{score} <span style={{ color: 'rgba(255,255,255,0.3)' }}>PTS</span></h1>
          
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 60 }}>
            <div style={{ padding: '20px 40px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 8 }}>QUESTIONS ANSWERED</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{history.length}</div>
            </div>
            <div style={{ padding: '20px 40px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: 8 }}>BEST STREAK</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#ff6b35' }}>{bestStreak}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={startGame} className="btn-primary" style={{ background: '#fff', color: '#000', fontSize: 16, padding: '16px 32px' }}>
              <RotateCcw size={18} style={{ marginRight: 8, display: 'inline-block', verticalAlign: 'text-bottom' }} /> PLAY AGAIN
            </button>
            <Link href={backLink}>
              <button className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.1)', fontSize: 16, padding: '16px 32px' }}>{backLabel}</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function getSubjectColor(subjectId) {
  const colors = {
    'computer-science': '#ff2d78',
    'science': '#00ff94',
    'maths': '#00d4ff',
    'business': '#ffe600',
    'history': '#ff6b35',
    'geography': '#ffe600'
  };
  return colors[subjectId] || '#fff';
}
