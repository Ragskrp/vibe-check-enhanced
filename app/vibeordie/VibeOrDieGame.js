'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Share2, RotateCcw, Zap } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const STATES = {
  IDLE: 'idle',
  WAITING: 'waiting',
  READY: 'ready',
  CLICKED: 'clicked',
  TOO_EARLY: 'too_early'
};

const RATINGS = [
  { max: 150, label: '⚡ GOD TIER', color: '#00ff94', desc: 'Are you even human? Insane reflexes!' },
  { max: 200, label: '🔥 BLAZING', color: '#ffe600', desc: 'Lightning fast! Top 1% reaction time.' },
  { max: 250, label: '✨ VIBING', color: '#00d4ff', desc: 'Solid reflexes! You\'re in the zone.' },
  { max: 350, label: '😎 CHILL', color: '#b14aed', desc: 'Not bad! Room for improvement though.' },
  { max: 500, label: '🐢 SLOW VIBES', color: '#ff2d78', desc: 'Might wanna wake up first...' },
  { max: Infinity, label: '💀 VIBE CHECK FAILED', color: '#ff2d78', desc: 'Were you asleep? Try again!' }
];

export default function VibeOrDieGame() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState(STATES.IDLE);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [round, setRound] = useState(0);
  const timeoutRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startRound = useCallback(() => {
    setState(STATES.WAITING);
    const delay = 1500 + Math.random() * 4000; // 1.5s - 5.5s
    timeoutRef.current = setTimeout(() => {
      setState(STATES.READY);
      startRef.current = performance.now();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (state === STATES.IDLE) {
      startRound();
      return;
    }

    if (state === STATES.WAITING) {
      clearTimeout(timeoutRef.current);
      setState(STATES.TOO_EARLY);
      return;
    }

    if (state === STATES.READY) {
      const time = Math.round(performance.now() - startRef.current);
      setReactionTime(time);
      setAttempts(prev => [...prev, time]);
      setRound(prev => prev + 1);
      if (!bestTime || time < bestTime) setBestTime(time);
      setState(STATES.CLICKED);
      return;
    }

    if (state === STATES.TOO_EARLY || state === STATES.CLICKED) {
      startRound();
    }
  }, [state, bestTime, startRound]);

  if (!mounted) return <div className="game-container" style={{ minHeight: '500px' }} />;

  const getRating = (time) => RATINGS.find(r => time <= r.max);

  const shareResult = () => {
    const avg = attempts.length ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) : 0;
    const text = `VIBECHECK Vibe or Die 🎯\nBest: ${bestTime}ms\nAverage: ${avg}ms (${attempts.length} rounds)\nRating: ${getRating(bestTime)?.label}\n\nPlay at vibecheck-play.vercel.app/vibeordie`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Result copied! 📋');
    }
  };

  const reset = () => {
    setState(STATES.IDLE);
    setReactionTime(null);
    setBestTime(null);
    setAttempts([]);
    setRound(0);
    clearTimeout(timeoutRef.current);
  };

  const getScreenStyle = () => {
    const base = {
      minHeight: 300,
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.15s',
      userSelect: 'none',
      marginBottom: 24,
      padding: '40px 20px',
    };
    
    switch (state) {
      case STATES.IDLE:
        return { ...base, background: '#13131f', border: '2px solid #2a2a3e' };
      case STATES.WAITING:
        return { ...base, background: 'linear-gradient(135deg, #ff2d78, #b14aed)', border: '2px solid #ff2d78' };
      case STATES.READY:
        return { ...base, background: 'linear-gradient(135deg, #00ff94, #00d4ff)', border: '2px solid #00ff94' };
      case STATES.TOO_EARLY:
        return { ...base, background: '#1a0a0a', border: '2px solid #ff2d78' };
      case STATES.CLICKED:
        return { ...base, background: '#13131f', border: '2px solid #00d4ff' };
      default:
        return base;
    }
  };

  const rating = reactionTime ? getRating(reactionTime) : null;

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div className="game-badge">Reaction Game</div>
      <h1 className="game-title" style={{ color: '#ff2d78' }}>🎯 Vibe or Die</h1>
      <p className="game-subtitle">Test your reaction speed. How fast can you click?</p>

      {/* Stats Bar */}
      {attempts.length > 0 && (
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ background: '#13131f', border: '1px solid #2a2a3e', borderRadius: 10, padding: '8px 16px' }}>
            <div style={{ fontSize: 11, color: '#555', fontWeight: 700 }}>ROUND</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#00d4ff' }}>{round}</div>
          </div>
          <div style={{ background: '#13131f', border: '1px solid #2a2a3e', borderRadius: 10, padding: '8px 16px' }}>
            <div style={{ fontSize: 11, color: '#555', fontWeight: 700 }}>BEST</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#00ff94' }}>{bestTime}ms</div>
          </div>
          <div style={{ background: '#13131f', border: '1px solid #2a2a3e', borderRadius: 10, padding: '8px 16px' }}>
            <div style={{ fontSize: 11, color: '#555', fontWeight: 700 }}>AVG</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#ffe600' }}>
              {Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)}ms
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div style={getScreenStyle()} onClick={handleClick} className="animate-fade-in">
        {state === STATES.IDLE && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#f0f0f0' }}>Tap to Start</div>
            <div style={{ fontSize: 14, color: '#888', marginTop: 8 }}>Click/tap when the screen turns GREEN</div>
          </>
        )}
        {state === STATES.WAITING && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Wait for it...</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>Don&apos;t click yet!</div>
          </>
        )}
        {state === STATES.READY && (
          <>
            <div style={{ fontSize: 64, marginBottom: 8 }}>⚡</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#000' }}>NOW!</div>
            <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)', marginTop: 4 }}>TAP / CLICK!</div>
          </>
        )}
        {state === STATES.TOO_EARLY && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💀</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#ff2d78' }}>Too Early!</div>
            <div style={{ fontSize: 14, color: '#888', marginTop: 8 }}>Click to try again</div>
          </>
        )}
        {state === STATES.CLICKED && (
          <>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{rating?.label.split(' ')[0]}</div>
            <div style={{ fontSize: 48, fontWeight: 800, color: rating?.color }}>{reactionTime}ms</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: rating?.color, marginTop: 8 }}>{rating?.label}</div>
            <div style={{ fontSize: 14, color: '#888', marginTop: 8 }}>{rating?.desc}</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 16 }}>Click to play again</div>
          </>
        )}
      </div>

      {/* Actions */}
      {attempts.length > 0 && (
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="share-btn" onClick={shareResult}>
            <Share2 size={16} /> Share Results
          </button>
          <button className="btn-outline" onClick={reset}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      )}

      <AdBanner format="rectangle" />
    </div>
  );
}
