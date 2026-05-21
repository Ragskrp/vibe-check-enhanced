'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Headphones } from 'lucide-react';

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Automatically switch modes
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div style={{
      padding: '32px',
      borderRadius: '32px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
      border: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
        <Headphones size={20} color="#b14aed" />
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#fff' }}>Focus Mode</h3>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => switchMode('focus')}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            background: mode === 'focus' ? 'rgba(177,74,237,0.2)' : 'transparent',
            border: `1px solid ${mode === 'focus' ? '#b14aed' : 'rgba(255,255,255,0.1)'}`,
            color: mode === 'focus' ? '#b14aed' : '#888',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Pomodoro
        </button>
        <button
          onClick={() => switchMode('break')}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            background: mode === 'break' ? 'rgba(0,212,255,0.2)' : 'transparent',
            border: `1px solid ${mode === 'break' ? '#00d4ff' : 'rgba(255,255,255,0.1)'}`,
            color: mode === 'break' ? '#00d4ff' : '#888',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Short Break
        </button>
      </div>

      <div style={{ fontSize: 72, fontWeight: 900, color: mode === 'focus' ? '#fff' : '#00d4ff', fontFamily: 'monospace', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 32 }}>
        {minutes}:{seconds}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <button
          onClick={toggleTimer}
          style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: isActive ? 'rgba(255,45,120,0.1)' : 'rgba(0,255,148,0.1)',
            border: `2px solid ${isActive ? '#ff2d78' : '#00ff94'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: isActive ? '#ff2d78' : '#00ff94',
            transition: 'all 0.2s'
          }}
        >
          {isActive ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: 4 }} />}
        </button>
        <button
          onClick={resetTimer}
          style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
            transition: 'all 0.2s'
          }}
        >
          <RotateCcw size={24} />
        </button>
      </div>
      
      <div style={{ marginTop: 24, fontSize: 13, color: '#666' }}>
        Tip: Put your phone away and focus completely until the timer stops.
      </div>
    </div>
  );
}
