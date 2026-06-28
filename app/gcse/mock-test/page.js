'use client';

import React, { useState, useEffect } from 'react';
import MathText from '../components/MathText';
import { useFleurir } from '../components/StateContext';

// Import all question sets to draw from dynamically
import bidmasData from '../maths/data/bidmas.json';
import fractionsData from '../maths/data/fractions.json';
import ratioData from '../maths/data/ratio.json';
import indicesData from '../maths/data/indices.json';
import sfData from '../maths/data/standard_form.json';

const ALL_DATA = [bidmasData, fractionsData, ratioData, indicesData, sfData];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[arr[j]]] = [arr[arr[j]], arr[arr[i]]];
  }
  return arr;
}

export default function MockTestPage() {
  const state = useFleurir();

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userText, setUserText] = useState('');
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, finished]);

  if (!state) return null;

  const { addXp, addCoins } = state;

  function handleStart() {
    // Collect all available questions from loaded data
    let pool = [];
    ALL_DATA.forEach(d => {
      if (d && d.quizLevel && d.quizLevel.questions) {
        pool = [...pool, ...d.quizLevel.questions.map(q => ({ ...q, source: d.title }))];
      }
    });

    const selectedQ = shuffleArray(pool).slice(0, 10);
    setQuestions(selectedQ);
    setStarted(true);
    setIdx(0);
    setScore(0);
    setTimeLeft(600);
    setFinished(false);
    setAnswered(false);
    setSelected(null);
    setUserText('');
  }

  const q = questions[idx];
  const isFill = q?.type === 'fill_blank';
  const currentAnswer = isFill ? userText.trim() : selected;

  const checkCorrect = () => {
    const ans = isFill ? userText.trim() : selected;
    return ans?.toLowerCase() === q?.correctAnswer?.value?.toString().toLowerCase();
  };

  function handleSubmit() {
    if (!currentAnswer) return;
    const correct = checkCorrect();
    setAnswered(true);
    if (correct) setScore(s => s + 1);
  }

  function handleNext() {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      // Awards
      const xpGained = score * 20;
      const coinsGained = score * 30;
      addXp(xpGained);
      addCoins(coinsGained);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setUserText('');
      setAnswered(false);
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  /* ── Home Start Page ── */
  if (!started) {
    return (
      <>
        <style>{S_MOCK}</style>
        <div className="mock-container">
          <div className="mock-card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 56 }}>📝</span>
            <h1 className="mock-title">GCSE Maths Mock Test</h1>
            <p className="mock-desc">
              Challenge yourself with a mixed exam of 10 random questions drawn from your unlocked arithmetic, ratio, and indices modules.
            </p>
            <div style={{ background: '#faf3e9', padding: '16px 20px', borderRadius: 12, border: '1px solid #e8e2d8', marginBottom: 24, textAlign: 'left' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: 13, fontWeight: 700, color: '#854e60' }}>EXAM PROTOCOL:</p>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#504445', lineHeight: 1.6 }}>
                <li>10 mixed-spec questions</li>
                <li>10-minute timer limit</li>
                <li>Earn +20 XP and +30 Petals per correct answer</li>
                <li>No hints available during the test</li>
              </ul>
            </div>
            <button className="mock-btn" onClick={handleStart}>Begin Mock Exam</button>
          </div>
        </div>
      </>
    );
  }

  /* ── Finished / Score Screen ── */
  if (finished) {
    const xpGained = score * 20;
    const coinsGained = score * 30;
    return (
      <>
        <style>{S_MOCK}</style>
        <div className="mock-container">
          <div className="mock-card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 56 }}>🎓</span>
            <h1 className="mock-title">Mock Test Complete</h1>
            <p className="mock-desc">You completed the mixed exam in {formatTime(600 - timeLeft)}!</p>
            
            <div style={{ margin: '24px 0', padding: '20px', background: '#faf3e9', borderRadius: 16, border: '1px solid #e8e2d8' }}>
              <p style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: '#854e60' }}>{score} / 10 Correct</p>
              <p style={{ fontSize: 14, color: '#827475', margin: 0 }}>Accuracy Rate: {score * 10}%</p>
            </div>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
              <div style={{ background: '#fffbea', border: '1px solid #7b590030', padding: '10px 20px', borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#7b5900', display: 'block' }}>PETALS EARNED</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#7b5900' }}>+ {coinsGained} 🌸</span>
              </div>
              <div style={{ background: '#fff0f3', border: '1px solid #854e6030', padding: '10px 20px', borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#854e60', display: 'block' }}>XP EARNED</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#854e60' }}>+ {xpGained} XP</span>
              </div>
            </div>

            <button className="mock-btn" onClick={handleStart}>Retake Exam</button>
          </div>
        </div>
      </>
    );
  }

  /* ── Active Quiz Runner ── */
  return (
    <>
      <style>{S_MOCK}</style>
      <div className="mock-container">
        
        {/* Top HUD */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 680, margin: '0 auto 16px', fontFamily: "'Nunito Sans', sans-serif" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#854e60', letterSpacing: '0.05em' }}>MOCK TEST</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: timeLeft < 60 ? '#D4785A' : '#504445' }}>
            ⏱️ {formatTime(timeLeft)}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, borderRadius: 99, background: '#e8e2d8', maxWidth: 680, margin: '0 auto 24px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, #854e60, #a8607a)', width: `${(idx / 10) * 100}%`, transition: 'width 0.4s' }} />
        </div>

        {/* Q Card */}
        <div className="mock-card">
          <span style={{ fontSize: 10, fontWeight: 800, color: '#827475', fontFamily: "'Nunito Sans', sans-serif", textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
            Question {idx + 1} of 10 · Topic: {q?.source}
          </span>
          <p className="mock-prompt">
            <MathText text={q?.prompt} />
          </p>

          {/* Options / Input */}
          {isFill ? (
            <input
              className="mock-input"
              type="text"
              placeholder="Type your answer…"
              value={userText}
              onChange={e => !answered && setUserText(e.target.value)}
              disabled={answered}
              onKeyDown={e => e.key === 'Enter' && !answered && handleSubmit()}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q?.options?.map(opt => {
                const isSelected = selected === opt;
                const isRight    = answered && opt === q?.correctAnswer?.value;
                const isWrong    = answered && isSelected && !isRight;
                return (
                  <button
                    key={opt}
                    onClick={() => !answered && setSelected(opt)}
                    className="mock-option-btn"
                    style={{
                      borderColor: isRight ? '#9DB58A' : isWrong ? '#D4785A' : isSelected ? '#854e60' : '#e8e2d8',
                      background:  isRight ? '#f0f7ee' : isWrong ? '#fdf0ee' : isSelected ? '#fff0f3' : '#ffffff',
                      color:       isRight ? '#3d6b3a' : isWrong ? '#8b3a2a' : '#1e1b16',
                      fontWeight:  isSelected ? 600 : 400,
                      cursor:      answered ? 'default' : 'pointer',
                    }}
                  >
                    <MathText text={opt} />
                  </button>
                );
              })}
            </div>
          )}

          {/* Feedback */}
          {answered && (
            <div className="fade-slide-up" style={{
              marginTop: 14,
              padding: '12px 16px',
              borderRadius: 10,
              background: checkCorrect() ? '#f0f7ee' : '#fdf0ee',
              border: `1px solid ${checkCorrect() ? '#9DB58A' : '#D4785A'}`,
              color: checkCorrect() ? '#3d6b3a' : '#8b3a2a',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'Nunito Sans', sans-serif",
            }}>
              {checkCorrect() ? '✓ Correct! Well done.' : `✗ Incorrect. The answer is: ${q.correctAnswer.value}`}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 680, margin: '0 auto' }}>
          {!answered ? (
            <button className="mock-btn" onClick={handleSubmit} disabled={!currentAnswer} style={{ opacity: currentAnswer ? 1 : 0.5 }}>
              Submit Answer
            </button>
          ) : (
            <button className="mock-btn" onClick={handleNext}>
              {idx + 1 >= 10 ? 'Finish Exam →' : 'Next Question →'}
            </button>
          )}
        </div>

      </div>
    </>
  );
}

const S_MOCK = `
  .mock-container {
    min-height: 100vh;
    padding: 40px 20px;
  }
  .mock-card {
    background: #ffffff;
    border: 1px solid #e8e2d8;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 4px 24px rgba(42,32,53,0.05);
    max-width: 680px;
    margin: 0 auto 20px;
  }
  .mock-title {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: #2A2035;
    margin: 12px 0 8px;
  }
  .mock-desc {
    font-size: 15px;
    color: #504445;
    line-height: 1.6;
    margin: 0 0 24px;
  }
  .mock-prompt {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: #2A2035;
    margin: 0 0 20px;
    line-height: 1.5;
  }
  .mock-input {
    width: 100%;
    padding: 13px 16px;
    border-radius: 10px;
    border: 1.5px solid #d4c2c4;
    background: #faf3e9;
    color: #1e1b16;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .mock-option-btn {
    text-align: left;
    padding: 13px 18px;
    border-radius: 10px;
    border: 1.5px solid;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s ease;
    width: 100%;
  }
  .mock-option-btn:hover { transform: translateX(3px); }
  .mock-btn {
    background: #854e60;
    color: #fff8f0;
    border: none;
    padding: 13px 32px;
    border-radius: 9999px;
    font-size: 15px;
    font-weight: 700;
    font-family: 'Nunito Sans', sans-serif;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 16px rgba(133,78,96,0.25);
  }
  .mock-btn:hover { background: #6e3f50; }
  .mock-btn:disabled { opacity: 0.5; pointer-events: none; }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-slide-up { animation: fadeSlideUp 0.4s ease both; }
`;
