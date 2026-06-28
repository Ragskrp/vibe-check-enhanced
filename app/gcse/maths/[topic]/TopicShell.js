"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FleurirLearnClient from '../../components/FleurirLearnClient';
import FleurirQuizClient from '../../components/FleurirQuizClient';
import { useFleurir } from '../../components/StateContext';

/**
 * TopicShell — client orchestrator
 * Manages mode: 'learn' | 'quiz' | 'complete'
 * Receives parsed JSON levelData from the server page.
 */
export default function TopicShell({ levelData }) {
  const [mode, setMode] = useState('learn'); // 'learn' | 'quiz' | 'complete'
  const [result, setResult] = useState(null);

  const state = useFleurir();

  function handleLearnComplete() {
    setMode('quiz');
  }

  function handleQuizComplete(res) {
    if (res?.retry) {
      setMode('quiz');
      return;
    }
    setResult(res);
    setMode('complete');

    // Reward XP & Coins
    if (state && res) {
      const isPass = res.score >= 3; // Bronze or better
      if (isPass) {
        state.completeTopic(levelData.id);
        state.addXp(50);
        state.addCoins(100);
      }
    }
  }

  if (mode === 'learn') {
    return <FleurirLearnClient levelData={levelData} onComplete={handleLearnComplete} />;
  }

  if (mode === 'quiz') {
    return (
      <FleurirQuizClient
        quizData={levelData.quizLevel}
        topicTitle={levelData.title}
        onComplete={handleQuizComplete}
      />
    );
  }

  // complete screen
  const tierEmoji = { gold: '🏅', silver: '🥈', bronze: '🥉', none: '📖' };
  const tierColor = { gold: '#F5C518', silver: '#C0C0C0', bronze: '#CD7F32', none: '#827475' };
  const t = result?.tier ?? 'none';

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={{ fontSize: 64, marginBottom: 12, textAlign: 'center' }}>{tierEmoji[t]}</div>
        <h1 style={styles.heading}>{levelData.title} — Complete</h1>
        <p style={{ color: tierColor[t], fontSize: 20, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          {result?.tier?.toUpperCase()} TIER
        </p>
        <p style={styles.sub}>
          You scored <strong>{result?.score}</strong> out of <strong>{result?.total}</strong>.
        </p>
        <p style={styles.closingQuote}>
          "{levelData.learnLevel.closingScene.dialogue[0]}"
        </p>
        <p style={styles.speaker}>— {levelData.learnLevel.closingScene.character}</p>

        <div style={styles.actions}>
          <button style={styles.retryBtn} onClick={() => { setMode('learn'); }}>
            ↺ Redo Lesson
          </button>
          <Link href="/gcse/maths" style={styles.continueBtn}>
            Back to Map →
          </Link>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#fff8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 20px',
    fontFamily: 'DM Sans, sans-serif',
    color: '#1e1b16',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e8e2d8',
    borderRadius: 16,
    padding: 40,
    maxWidth: 600,
    width: '100%',
    boxShadow: '0 8px 32px rgba(42,32,53,0.08)',
    textAlign: 'center',
  },
  heading: {
    fontFamily: 'Playfair Display, serif',
    fontSize: 28,
    fontWeight: 700,
    color: '#2A2035',
    margin: '0 0 8px',
  },
  sub: {
    fontSize: 16,
    color: '#504445',
    margin: '0 0 20px',
  },
  closingQuote: {
    fontFamily: 'Playfair Display, serif',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#2A2035',
    lineHeight: 1.7,
    margin: '0 0 4px',
    padding: '16px 20px',
    background: '#f4ede3',
    borderRadius: 10,
    borderLeft: '4px solid #854e60',
    textAlign: 'left',
  },
  speaker: {
    fontSize: 13,
    color: '#827475',
    fontFamily: 'Nunito Sans, sans-serif',
    margin: '4px 0 24px',
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  retryBtn: {
    background: 'transparent',
    border: '1px solid #2A2035',
    color: '#2A2035',
    padding: '11px 24px',
    borderRadius: 9999,
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'Nunito Sans, sans-serif',
    cursor: 'pointer',
  },
  continueBtn: {
    background: '#854e60',
    color: '#ffffff',
    padding: '12px 28px',
    borderRadius: 9999,
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'Nunito Sans, sans-serif',
    textDecoration: 'none',
    display: 'inline-block',
  },
};
