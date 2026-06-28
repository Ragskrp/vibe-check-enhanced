"use client";

import Image from 'next/image';
import { useState, useCallback } from "react";

/* ── tier config ──────────────────────────────────────────── */
function getTier(score, tiers) {
  if (score >= tiers.gold.minScore)   return "gold";
  if (score >= tiers.silver.minScore) return "silver";
  if (score >= tiers.bronze.minScore) return "bronze";
  return "none";
}
const TIER_META = {
  gold:   { label: "Gold Scholar",   color: "#7b5900", bg: "#fffbea", icon: "🏅" },
  silver: { label: "Silver Scholar", color: "#504445", bg: "#f4ede3", icon: "🥈" },
  bronze: { label: "Bronze Scholar", color: "#854e60", bg: "#fff0f3", icon: "🥉" },
  none:   { label: "Keep Studying",  color: "#827475", bg: "#faf3e9", icon: "📖" },
};

export default function FleurirQuizClient({ quizData, topicTitle, onComplete }) {
  const questions = quizData.questions;
  const tiers     = quizData.tiers;
  const total     = questions.length;

  const [idx,      setIdx]      = useState(0);
  const [selected, setSelected] = useState(null);
  const [userText, setUserText] = useState("");
  const [answered, setAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score,    setScore]    = useState(0);
  const [finished, setFinished] = useState(false);

  const q      = questions[idx];
  const isFill = q?.type === "fill_blank";
  const pct    = (idx / total) * 100;
  const answer = isFill ? userText.trim() : selected;

  const isCorrect = useCallback(() => {
    const a = isFill ? userText.trim() : selected;
    return a?.toLowerCase() === q?.correctAnswer?.value?.toString().toLowerCase();
  }, [isFill, userText, selected, q]);

  function handleSubmit() {
    if (!answer) return;
    const correct = isCorrect();
    setAnswered(true);
    if (correct) setScore(s => s + 1);
  }

  function handleNext() {
    const atEnd = idx + 1 >= total;
    if (atEnd) {
      setFinished(true);
      onComplete?.({ score: score + (isCorrect() ? 0 : 0), tier: getTier(score, tiers), total });
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setUserText("");
      setAnswered(false);
      setShowHint(false);
    }
  }

  /* ── Result screen ── */
  if (finished) {
    const tier = getTier(score, tiers);
    const meta = TIER_META[tier];
    return (
      <>
        <style>{SHARED_CSS}</style>
        <div className="quiz-page">
          <div className="quiz-result-card">
            <div style={{ fontSize: 56, marginBottom: 8, textAlign: 'center' }}>{meta.icon}</div>
            <div style={{ background: meta.bg, border: `1px solid ${meta.color}30`, borderRadius: 9999, padding: '6px 20px', display: 'inline-block', marginBottom: 16 }}>
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: meta.color, textTransform: 'uppercase' }}>{meta.label}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#2A2035', margin: '0 0 8px', textAlign: 'center' }}>
              {score} / {total} correct
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#504445', textAlign: 'center', lineHeight: 1.6, margin: '0 0 24px' }}>
              {tier === 'gold'   ? "Outstanding! You've mastered this section of Arithmia." :
               tier === 'silver' ? "Well done — a polished performance. One more try for gold?" :
               tier === 'bronze' ? "A solid start. Revisit the lesson and return stronger." :
                                   "The Unraveller still holds sway. Study and return."}
            </p>

            {/* Arith portrait */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <div style={{ position: 'relative', width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '2.5px solid #854e60', boxShadow: '0 4px 16px rgba(133,78,96,0.2)' }}>
                <Image src="/gcse/arith-portrait.png" alt="Arith" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {tier !== 'gold' && (
                <button className="back-btn" onClick={() => onComplete?.({ retry: true })}>↺ Try Again</button>
              )}
              <button className="advance-btn" onClick={() => onComplete?.({ score, tier, total })}>
                Continue Journey →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Quiz screen ── */
  return (
    <>
      <style>{SHARED_CSS}</style>
      <div className="quiz-page">

        {/* Header */}
        <div style={Q.header}>
          <div>
            <p style={Q.eyebrow}>✦ {topicTitle}</p>
            <h1 style={Q.heading}>Quiz Time</h1>
          </div>
          {/* Portrait */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ position: 'relative', width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', border: '2px solid #854e60', boxShadow: '0 3px 12px rgba(133,78,96,0.2)' }}>
              <Image src="/gcse/arith-portrait.png" alt="Arith" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', color: '#827475', textTransform: 'uppercase' }}>ARITH</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={Q.progressTrack}>
          <div style={{ ...Q.progressFill, width: `${pct}%` }} />
        </div>
        <p style={Q.progressLabel}>Question {idx + 1} of {total}</p>

        {/* Question card */}
        <div className="quiz-card">
          <p style={Q.prompt}>{q.prompt}</p>

          {/* Answer area */}
          {isFill ? (
            <input
              style={{ ...Q.input, borderColor: answered ? (isCorrect() ? '#9DB58A' : '#D4785A') : '#d4c2c4' }}
              type="text"
              placeholder="Type your answer…"
              value={userText}
              onChange={e => !answered && setUserText(e.target.value)}
              disabled={answered}
              onKeyDown={e => e.key === 'Enter' && !answered && handleSubmit()}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map(opt => {
                const isSelected = selected === opt;
                const isRight    = answered && opt === q.correctAnswer.value;
                const isWrong    = answered && isSelected && !isRight;
                return (
                  <button
                    key={opt}
                    onClick={() => !answered && setSelected(opt)}
                    className="option-btn"
                    style={{
                      ...Q.option,
                      borderColor: isRight ? '#9DB58A' : isWrong ? '#D4785A' : isSelected ? '#854e60' : '#e8e2d8',
                      background:  isRight ? '#f0f7ee' : isWrong ? '#fdf0ee' : isSelected ? '#fff0f3' : '#ffffff',
                      color:       isRight ? '#3d6b3a' : isWrong ? '#8b3a2a' : '#1e1b16',
                      fontWeight:  isSelected ? 600 : 400,
                      cursor:      answered ? 'default' : 'pointer',
                    }}
                  >
                    {opt}
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
              background: isCorrect() ? '#f0f7ee' : '#fdf0ee',
              border: `1px solid ${isCorrect() ? '#9DB58A' : '#D4785A'}`,
              color: isCorrect() ? '#3d6b3a' : '#8b3a2a',
              fontSize: 14,
              fontFamily: "'Nunito Sans', sans-serif",
              fontWeight: 600,
            }}>
              {isCorrect() ? '✓ Correct! Well done, Scholar.' : `✗ Not quite. The answer is: ${q.correctAnswer.value}`}
            </div>
          )}

          {/* Hint */}
          {showHint && (
            <div className="fade-slide-up" style={Q.hintBox}>
              💡 <span style={{ fontStyle: 'italic' }}>{q.hint}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={Q.actions}>
          <button className="back-btn" onClick={() => setShowHint(true)} disabled={showHint || answered} style={{ opacity: showHint || answered ? 0.4 : 1 }}>
            💡 Hint
          </button>
          {!answered ? (
            <button className="advance-btn" onClick={handleSubmit} disabled={!answer} style={{ opacity: answer ? 1 : 0.5 }}>
              Submit Answer
            </button>
          ) : (
            <button className="advance-btn" onClick={handleNext}>
              {idx + 1 >= total ? 'See Results →' : 'Next Question →'}
            </button>
          )}
        </div>

      </div>
    </>
  );
}

/* ── Shared CSS ──────────────────────────────────────────────── */
const SHARED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600&family=Nunito+Sans:wght@600;700;800&display=swap');

  .quiz-page {
    min-height: 100vh;
    background-color: #fff8f0;
    background-image: radial-gradient(circle, #d4c2c480 1px, transparent 1px);
    background-size: 28px 28px;
    font-family: 'DM Sans', sans-serif;
    color: #1e1b16;
    padding: 32px 20px 64px;
  }
  .quiz-card {
    background: #ffffff;
    border: 1px solid #e8e2d8;
    border-radius: 16px;
    padding: 28px 32px;
    box-shadow: 0 4px 24px rgba(42,32,53,0.06);
    max-width: 680px;
    margin: 0 auto 20px;
  }
  .quiz-result-card {
    background: #ffffff;
    border: 1px solid #e8e2d8;
    border-radius: 20px;
    padding: 40px 32px;
    box-shadow: 0 6px 32px rgba(42,32,53,0.08);
    max-width: 520px;
    margin: 60px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .option-btn {
    text-align: left;
    padding: 13px 18px;
    border-radius: 10px;
    border: 1.5px solid;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s ease;
    width: 100%;
  }
  .option-btn:hover { transform: translateX(3px); }

  .advance-btn {
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
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(133,78,96,0.25);
  }
  .advance-btn:hover { background: #6e3f50; transform: translateY(-1px); }

  .back-btn {
    background: transparent;
    color: #7a545a;
    border: 1.5px solid #d4c2c4;
    padding: 12px 24px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Nunito Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }
  .back-btn:hover { border-color: #7a545a; color: #2A2035; }
  .back-btn:disabled { opacity: 0.35; pointer-events: none; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-slide-up { animation: fadeSlideUp 0.4s ease both; }
`;

/* ── Quiz-specific styles ──────────────────────────────────── */
const Q = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: 680,
    margin: '0 auto 20px',
  },
  eyebrow: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#854e60',
    margin: '0 0 4px',
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    fontWeight: 700,
    color: '#2A2035',
    margin: 0,
  },
  progressTrack: {
    height: 6,
    borderRadius: 99,
    background: '#e8e2d8',
    maxWidth: 680,
    margin: '0 auto 6px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #854e60, #a8607a)',
    borderRadius: 99,
    transition: 'width 0.5s ease',
  },
  progressLabel: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: '#827475',
    letterSpacing: '0.08em',
    textAlign: 'right',
    maxWidth: 680,
    margin: '0 auto 16px',
  },
  prompt: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 19,
    fontWeight: 700,
    color: '#2A2035',
    lineHeight: 1.5,
    margin: '0 0 20px',
  },
  input: {
    width: '100%',
    padding: '13px 16px',
    borderRadius: 10,
    border: '1.5px solid',
    background: '#faf3e9',
    color: '#1e1b16',
    fontSize: 16,
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  option: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '13px 18px',
    borderRadius: 10,
    border: '1.5px solid',
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.2s ease',
  },
  hintBox: {
    marginTop: 14,
    padding: '12px 16px',
    borderRadius: 10,
    background: '#faf3e9',
    border: '1px solid #e8e2d8',
    color: '#504445',
    fontSize: 14,
    lineHeight: 1.6,
    fontFamily: "'DM Sans', sans-serif",
  },
  actions: {
    display: 'flex',
    gap: 12,
    justifyContent: 'flex-end',
    maxWidth: 680,
    margin: '0 auto',
    flexWrap: 'wrap',
  },
};
