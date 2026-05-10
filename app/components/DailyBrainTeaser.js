'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

const TEASERS = [
  {
    question: "In Computer Science, what does 'CPU' stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Control Process Utility", "Core Processor Unit"],
    answer: 0,
    explanation: "The Central Processing Unit (CPU) is the primary component of a computer that acts as its 'control center'."
  },
  {
    question: "Which of these is a prime number?",
    options: ["9", "15", "21", "23"],
    answer: 3,
    explanation: "23 is a prime number as it has only two factors: 1 and 23."
  },
  {
    question: "What is the result of 2 + 3 * 4 in standard BIDMAS/BODMAS?",
    options: ["20", "14", "18", "9"],
    answer: 1,
    explanation: "Multiplication comes before addition. 3 * 4 = 12, and 2 + 12 = 14."
  }
];

export default function DailyBrainTeaser() {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  // Pick one based on day of month
  const index = new Date().getDate() % TEASERS.length;
  const teaser = TEASERS[index];

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  return (
    <div style={{
      padding: '24px',
      borderRadius: '24px',
      background: 'rgba(0, 212, 255, 0.03)',
      border: '1px solid rgba(0, 212, 255, 0.1)',
      maxWidth: '600px',
      margin: '0 auto 40px auto',
      textAlign: 'left'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <HelpCircle size={20} color="#00d4ff" />
        <div style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.15em', color: '#00d4ff', textTransform: 'uppercase' }}>
          Daily GCSE Brain Teaser
        </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '20px', lineHeight: '1.4' }}>
        {teaser.question}
      </h3>

      <div style={{ display: 'grid', gap: '10px' }}>
        {teaser.options.map((option, idx) => {
          let state = 'default';
          if (showResult) {
            if (idx === teaser.answer) state = 'correct';
            else if (idx === selected) state = 'wrong';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: state === 'correct' ? 'rgba(0, 255, 148, 0.1)' : (state === 'wrong' ? 'rgba(255, 45, 120, 0.1)' : 'rgba(255, 255, 255, 0.03)'),
                border: `1px solid ${state === 'correct' ? '#00ff94' : (state === 'wrong' ? '#ff2d78' : 'rgba(255, 255, 255, 0.1)')}`,
                color: state === 'correct' ? '#00ff94' : (state === 'wrong' ? '#ff2d78' : '#fff'),
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                cursor: showResult ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              {option}
              {state === 'correct' && <CheckCircle2 size={16} />}
              {state === 'wrong' && <XCircle size={16} />}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
          <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Explanation:</strong>
          {teaser.explanation}
        </div>
      )}
    </div>
  );
}
