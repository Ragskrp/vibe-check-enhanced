'use client';

import { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 9; // 3x3
const GAME_DURATION = 30; // seconds

export default function WhackGame() {
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [holes, setHoles] = useState(Array(GRID_SIZE).fill(null)); // null, 'bad', 'good'
  
  const timerRef = useRef();
  const spawnRef = useRef();

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHoles(Array(GRID_SIZE).fill(null));
  };

  useEffect(() => {
    if (playing && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);

      const spawnSpeed = Math.max(400, 1000 - (score * 10)); // Gets faster!
      spawnRef.current = setInterval(() => {
        setHoles(current => {
          const next = [...current];
          // Clear older ones randomly
          for (let i = 0; i < 9; i++) {
             if (next[i] && Math.random() > 0.5) next[i] = null;
          }
          // Spawn new
          const emptyIndices = next.map((v, i) => v === null ? i : -1).filter(i => i !== -1);
          if (emptyIndices.length > 0) {
            const numToSpawn = Math.floor(Math.random() * 2) + 1; // 1 or 2
            for (let k = 0; k < numToSpawn; k++) {
                if (emptyIndices.length > 0) {
                    const randIndex = Math.floor(Math.random() * emptyIndices.length);
                    const holeIdx = emptyIndices.splice(randIndex, 1)[0];
                    next[holeIdx] = Math.random() > 0.2 ? 'bad' : 'good';
                }
            }
          }
          return next;
        });
      }, spawnSpeed);
    } else if (timeLeft === 0) {
      setPlaying(false);
      setHoles(Array(GRID_SIZE).fill(null));
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(spawnRef.current);
    };
  }, [playing, timeLeft, score]);

  const whack = (index) => {
    if (!playing || !holes[index]) return;
    
    if (holes[index] === 'bad') {
      setScore(s => s + 10);
      
      const el = document.getElementById(`hole-${index}`);
      if(el) {
          el.style.transform = 'scale(1.2)';
          el.style.boxShadow = 'inset 0 0 50px rgba(0,255,148,0.5)';
          setTimeout(()=> {
              if(el) { el.style.transform = ''; el.style.boxShadow = ''; }
          }, 150);
      }
    } else {
      setScore(s => Math.max(0, s - 20)); // Penalty
      
      const el = document.getElementById(`hole-${index}`);
      if(el) {
          el.style.transform = 'scale(0.8)';
          el.style.background = '#ff0000';
          setTimeout(()=> {
              if(el) { el.style.transform = ''; el.style.background = ''; }
          }, 150);
      }
    }

    // Hide the mole immediately
    setHoles(current => {
      const next = [...current];
      next[index] = null;
      return next;
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', background: '#1a1a2e', padding: '16px 32px', borderRadius: '16px' }}>
        <div>
           <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>Time</div>
           <div style={{ fontSize: '32px', fontWeight: 900, color: timeLeft <= 5 ? '#ff2d78' : '#00ff94' }}>{Math.floor(timeLeft)}s</div>
        </div>
        <div>
           <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>Score</div>
           <div style={{ fontSize: '32px', fontWeight: 900, color: '#f59e0b' }}>{score}</div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        padding: '24px',
        background: '#222',
        borderRadius: '24px',
        boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.5)'
      }}>
        {holes.map((state, i) => (
          <div 
            key={i} 
            id={`hole-${i}`}
            style={{ 
              aspectRatio: '1/1', 
              background: '#111', 
              borderRadius: '50%',
              border: '8px solid #333',
              boxShadow: 'inset 0 20px 20px rgba(0,0,0,0.8)',
              overflow: 'hidden',
              position: 'relative',
              cursor: playing ? "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><text y=\"32\" font-size=\"32\">🔨</text></svg>') 16 16, pointer" : 'default',
              transition: 'all 0.1s'
            }}
            onMouseDown={(e) => { e.preventDefault(); whack(i); }}
          >
            {/* The Mole */}
            <div style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              bottom: state ? '0%' : '-100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              transition: 'bottom 0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
              userSelect: 'none',
              filter: state === 'bad' ? 'drop-shadow(0 0 10px #ff2d78)' : 'drop-shadow(0 0 10px #00ff94)'
            }}>
              {state === 'bad' ? '👺' : (state === 'good' ? '😇' : '')}
            </div>
          </div>
        ))}
      </div>

      {!playing && (
        <div style={{ marginTop: '32px' }}>
          <button className="btn-primary" style={{ fontSize: '24px', padding: '16px 48px' }} onClick={startGame}>
            {timeLeft === 0 ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        </div>
      )}
    </div>
  );
}
