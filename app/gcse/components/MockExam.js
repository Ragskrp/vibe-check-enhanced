'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Timer, ArrowRight, RotateCcw, ChevronLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { recordActivity } from '../utils/streakLogic';
import { getBankQuestions, shuffleArray } from '../utils/questionBankLoader';

const EXAM_TIME = 900; // 15 minutes in seconds
const QUESTION_COUNT = 20;

export default function MockExam({ subjectData, accentColor, hubPath, backLabel, statsKey }) {
  const [phase, setPhase] = useState('intro');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);
  const [isComplete, setIsComplete] = useState(false);
  
  const timerRef = useRef(null);

  const startExam = async () => {
    // Collect all topics
    const allTopics = Object.values(subjectData).flat();
    const subjectId = hubPath.split('/').pop();

    // Load all bank questions for all topics in this subject
    let allBankQuestions = [];
    for (const topic of allTopics) {
      try {
        const rawBank = await getBankQuestions(subjectId, topic.slug);
        allBankQuestions.push(...rawBank.map(q => ({
          display: q.q,
          answer: q.a,
          options: q.o,
          topicTitle: topic.title
        })));
      } catch (e) {
        console.warn(`Failed to load bank for ${topic.slug}:`, e);
      }
    }

    // Shuffle and pick
    let initialDeck = [];
    if (allBankQuestions.length >= QUESTION_COUNT) {
      initialDeck = shuffleArray(allBankQuestions).slice(0, QUESTION_COUNT);
    } else {
      // Fallback: fill with generator
      initialDeck = [...allBankQuestions];
      while (initialDeck.length < QUESTION_COUNT) {
        const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
        initialDeck.push({
          ...randomTopic.generateQuestion('higher'),
          topicTitle: randomTopic.title
        });
      }
    }

    setQuestions(shuffleArray(initialDeck));
    setAnswers(new Array(QUESTION_COUNT).fill(null));
    setPhase('playing');
    setTimeLeft(EXAM_TIME);
  };

  useEffect(() => {
    if (phase === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            finishExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase, timeLeft]);

  const finishExam = () => {
    setPhase('results');
    setIsComplete(true);
    // Record activity for streak
    recordActivity();
    // Save to stats
    try {
      const existing = JSON.parse(localStorage.getItem(statsKey) || '{}');
      localStorage.setItem(statsKey, JSON.stringify({
        ...existing,
        totalMockExams: (existing.totalMockExams || 0) + 1
      }));
    } catch {}
  };

  const handleAnswer = (val) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = val;
    setAnswers(newAnswers);
    
    if (currentIndex < QUESTION_COUNT - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishExam();
    }
  };

  // UI HELPERS
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs.toString().padStart(2, '0')}`;
  };

  if (phase === 'intro') {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: 600, margin: '0 auto' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: `${accentColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <ShieldCheck size={40} color={accentColor} />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 16 }}>Full Mock Exam</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 40 }}>
          This is a timed assessment covering the entire subject specification. 
          You will have **15 minutes** to answer **20 questions**.
        </p>
        <div style={{ display: 'grid', gap: 16, textAlign: 'left', background: 'rgba(255,255,255,0.02)', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)', marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 12, fontSize: 14 }}>
            <AlertCircle size={18} color={accentColor} />
            <span>No hints or explanations during the exam.</span>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 14 }}>
            <Timer size={18} color={accentColor} />
            <span>The clock will run continuously.</span>
          </div>
        </div>
        <button onClick={startExam} className="btn-primary" style={{ background: accentColor, color: '#000', width: '100%', fontSize: 18 }}>
          START EXAM NOW
        </button>
      </div>
    );
  }

  if (phase === 'playing') {
    const q = questions[currentIndex];
    const progress = ((currentIndex + 1) / QUESTION_COUNT) * 100;
    
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(255,255,255,0.4)' }}>
            QUESTION {currentIndex + 1} OF {QUESTION_COUNT}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 900, color: timeLeft < 60 ? '#ff2d78' : '#fff' }}>
            <Timer size={20} color={timeLeft < 60 ? '#ff2d78' : accentColor} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginBottom: 48, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: accentColor, transition: 'width 0.3s ease' }} />
        </div>

        {/* QUESTION */}
        <div style={{ 
          padding: '48px 32px', borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: 32, textAlign: 'center'
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{q.topicTitle}</div>
          <div style={{ fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: 800, color: '#fff', lineHeight: 1.4 }}>{q.display}</div>
        </div>

        {/* OPTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {q.options ? q.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)} className="btn-outline" style={{ padding: '20px', fontSize: 16, fontWeight: 700, borderColor: 'rgba(255,255,255,0.1)' }}>
              {opt}
            </button>
          )) : (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Input questions not supported in Mock Mode yet.</div>
          )}
        </div>

        {/* NAV */}
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => setPhase('intro')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: 12, cursor: 'pointer' }}>
            ABANDON EXAM
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const score = answers.reduce((acc, ans, i) => {
      const q = questions[i];
      const isCorrect = String(ans).trim().toLowerCase() === String(q.answer).trim().toLowerCase();
      return acc + (isCorrect ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / QUESTION_COUNT) * 100);
    const grade = calculateGrade(percentage);

    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: accentColor, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Assessment Complete</div>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 900, color: '#fff', marginBottom: 8 }}>Grade {grade}</h1>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 48 }}>{percentage}% Score ({score}/{QUESTION_COUNT})</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          <div style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>TIME TAKEN</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{formatTime(EXAM_TIME - timeLeft)}</div>
          </div>
          <div style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>ACCURACY</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{percentage}%</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={startExam} className="btn-primary" style={{ background: accentColor, color: '#000' }}>RETAKE EXAM</button>
          <Link href={hubPath}><button className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>{backLabel}</button></Link>
        </div>
      </div>
    );
  }

  return null;
}

function calculateGrade(pct) {
  if (pct >= 85) return '9';
  if (pct >= 75) return '8';
  if (pct >= 65) return '7';
  if (pct >= 55) return '6';
  if (pct >= 45) return '5';
  if (pct >= 35) return '4';
  if (pct >= 25) return '3';
  if (pct >= 15) return '2';
  return '1';
}
