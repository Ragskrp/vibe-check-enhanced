'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─── NEON VIBE COLORS ───
const VIBE_COLORS = {
  2: { bg: 'rgba(0, 212, 255, 0.1)', border: '#00d4ff', text: '#fff', glow: '#00d4ff' },
  4: { bg: 'rgba(0, 212, 255, 0.2)', border: '#00d4ff', text: '#fff', glow: '#00d4ff' },
  8: { bg: 'rgba(255, 45, 120, 0.1)', border: '#ff2d78', text: '#fff', glow: '#ff2d78' },
  16: { bg: 'rgba(255, 45, 120, 0.3)', border: '#ff2d78', text: '#fff', glow: '#ff2d78' },
  32: { bg: 'rgba(255, 230, 0, 0.1)', border: '#ffe600', text: '#fff', glow: '#ffe600' },
  64: { bg: 'rgba(255, 230, 0, 0.4)', border: '#ffe600', text: '#fff', glow: '#ffe600' },
  128: { bg: 'rgba(0, 255, 148, 0.1)', border: '#00ff94', text: '#fff', glow: '#00ff94' },
  256: { bg: 'rgba(0, 255, 148, 0.4)', border: '#00ff94', text: '#fff', glow: '#00ff94' },
  512: { bg: 'rgba(177, 74, 237, 0.1)', border: '#b14aed', text: '#fff', glow: '#b14aed' },
  1024: { bg: 'rgba(177, 74, 237, 0.4)', border: '#b14aed', text: '#fff', glow: '#b14aed' },
  2048: { bg: 'rgba(255, 255, 255, 0.1)', border: '#fff', text: '#fff', glow: '#fff' },
  4096: { bg: 'rgba(255, 0, 0, 0.2)', border: '#ff0000', text: '#fff', glow: '#ff0000' },
  8192: { bg: 'rgba(255, 0, 0, 0.4)', border: '#ff0000', text: '#fff', glow: '#ff0000' },
  16384: { bg: 'linear-gradient(45deg, #00d4ff, #ff2d78)', border: '#fff', text: '#fff', glow: '#fff' },
};

const getEmptyCell = (grid) => {
  let emptyCells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) emptyCells.push({ r, c });
    }
  }
  return emptyCells.length === 0 ? null : emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

export default function MergeGame() {
  const [grid, setGrid] = useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mergeTiles, setMergeTiles] = useState([]); // Track coordinates of merged tiles for animation

  const initGame = useCallback(() => {
    let newGrid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setMergeTiles([]);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('merge-vibe-high');
    if (saved) setHighScore(parseInt(saved, 10));
    initGame();
  }, [initGame]);

  const addRandomTile = (newGrid) => {
    let cell = getEmptyCell(newGrid);
    if (cell) newGrid[cell.r][cell.c] = Math.random() < 0.9 ? 2 : 4;
  };

  const moveGrid = (direction) => {
    if (gameOver) return;

    let newGrid = JSON.parse(JSON.stringify(grid));
    let moved = false;
    let points = 0;
    let merges = [];

    const moveLine = (line, rIdx, isCol) => {
      let arr = line.filter(val => val !== 0);
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] *= 2;
          points += arr[i];
          arr[i + 1] = 0;
          // Track merge for animation
          merges.push(isCol ? { r: i, c: rIdx } : { r: rIdx, c: i });
          i++;
        }
      }
      let final = arr.filter(val => val !== 0);
      while (final.length < 4) final.push(0);
      return final;
    };

    if (direction === 'LEFT') {
      for (let r = 0; r < 4; r++) {
        let res = moveLine(newGrid[r], r, false);
        if (newGrid[r].join(',') !== res.join(',')) moved = true;
        newGrid[r] = res;
      }
    } else if (direction === 'RIGHT') {
      for (let r = 0; r < 4; r++) {
        let res = moveLine([...newGrid[r]].reverse(), r, false).reverse();
        if (newGrid[r].join(',') !== res.join(',')) moved = true;
        newGrid[r] = res;
      }
    } else if (direction === 'UP') {
      for (let c = 0; c < 4; c++) {
        let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
        let res = moveLine(col, c, true);
        for (let r = 0; r < 4; r++) {
          if (newGrid[r][c] !== res[r]) moved = true;
          newGrid[r][c] = res[r];
        }
      }
    } else if (direction === 'DOWN') {
      for (let c = 0; c < 4; c++) {
        let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
        let res = moveLine(col.reverse(), c, true).reverse();
        for (let r = 0; r < 4; r++) {
          if (newGrid[r][c] !== res[r]) moved = true;
          newGrid[r][c] = res[r];
        }
      }
    }

    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(s => {
        const newScore = s + points;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('merge-vibe-high', newScore);
        }
        return newScore;
      });
      setMergeTiles(merges);
      setTimeout(() => setMergeTiles([]), 200);

      // Win/Loss
      if (newGrid.flat().includes(2048) && !gameWon) setGameWon(true);
      if (!getEmptyCell(newGrid)) {
        let canMove = false;
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            if (c < 3 && newGrid[r][c] === newGrid[r][c+1]) canMove = true;
            if (r < 3 && newGrid[r][c] === newGrid[r+1][c]) canMove = true;
          }
        }
        if (!canMove) setGameOver(true);
      }
    }
  };

  useEffect(() => {
    const handleKD = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        moveGrid(e.key.replace('Arrow', '').toUpperCase());
      }
    };
    window.addEventListener('keydown', handleKD);
    return () => window.removeEventListener('keydown', handleKD);
  }, [grid, gameOver]);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button onClick={initGame} style={{ 
          background: 'rgba(255,255,255,0.1)', border: '1px solid #333', color: '#fff',
          padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer'
        }}>RESTART</button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: '#111', padding: '10px 20px', borderRadius: '12px', border: '1px solid #333' }}>
            <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>Score</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#00d4ff' }}>{score}</div>
          </div>
          <div style={{ background: '#111', padding: '10px 20px', borderRadius: '12px', border: '1px solid #333' }}>
            <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>Best</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#ff2d78' }}>{highScore}</div>
          </div>
        </div>
      </div>

      <div style={{
        background: '#0a0a0f', width: '100%', aspectRatio: '1/1', borderRadius: '24px',
        padding: '16px', position: 'relative', border: '4px solid #1a1a2e',
        boxShadow: '0 20px 80px rgba(0,0,0,0.6)', overflow: 'hidden'
      }}>
        {/* Grid Background */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)',
          gap: '12px', height: '100%', position: 'absolute', inset: '16px', zIndex: 0
        }}>
          {Array(16).fill(0).map((_, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }} />
          ))}
        </div>

        {/* Active Tiles */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)',
          gap: '12px', height: '100%', position: 'relative', zIndex: 1
        }}>
          {grid.map((row, r) => row.map((val, c) => {
            if (val === 0) return <div key={`${r}-${c}`} />;
            const style = VIBE_COLORS[val] || VIBE_COLORS[16384];
            const isMerged = mergeTiles.some(m => m.r === r && m.c === c);
            
            return (
              <div key={`${r}-${c}`} style={{
                background: style.bg,
                border: `2px solid ${style.border}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: val > 100 ? '24px' : '32px',
                fontWeight: 900,
                color: style.text,
                boxShadow: `0 0 15px ${style.glow}40, inset 0 0 10px ${style.glow}20`,
                animation: isMerged ? 'mergePop 0.2s ease-out' : 'appear 0.2s ease-out',
                transition: 'all 0.15s ease-out'
              }}>
                {val}
              </div>
            );
          }))}
        </div>

        {gameOver && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', zIndex: 10
          }}>
            <h2 style={{ fontSize: '48px', color: '#ff2d78', marginBottom: '24px', fontWeight: 900 }}>CRASHED</h2>
            <button onClick={initGame} style={{
              padding: '16px 48px', fontSize: '20px', fontWeight: 900,
              background: '#fff', color: '#000', border: 'none', borderRadius: '12px', cursor: 'pointer'
            }}>RETRY MISSION</button>
          </div>
        )}

        {gameWon && !gameOver && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,212,255,0.2)',
            backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', zIndex: 10
          }}>
            <h2 style={{ fontSize: '48px', color: '#fff', marginBottom: '8px', fontWeight: 900 }}>VIBE REACHED</h2>
            <p style={{ color: '#fff', marginBottom: '32px', fontWeight: 600 }}>2048 achieved!</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => setGameWon(false)} style={{
                padding: '12px 24px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer'
              }}>CONTINUE</button>
              <button onClick={initGame} style={{
                padding: '12px 24px', background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '8px', fontWeight: 700, cursor: 'pointer'
              }}>RESET</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes appear {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes mergePop {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div style={{ marginTop: '32px', color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
        Slide tiles with <span style={{ color: '#888' }}>Arrow Keys</span> or <span style={{ color: '#888' }}>Swipe</span>.<br />
        Merge matching vibrations to reach the ultimate frequency.
      </div>
    </div>
  );
}
