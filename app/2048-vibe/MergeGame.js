'use client';

import { useState, useEffect, useCallback } from 'react';

const COLORS = {
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
};

// Returns random empty cell
const getEmptyCell = (grid) => {
  let emptyCells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) emptyCells.push({ r, c });
    }
  }
  if (emptyCells.length === 0) return null;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

export default function MergeGame() {
  const [grid, setGrid] = useState([
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initGame = useCallback(() => {
    let newGrid = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    // Add two random 2s
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const addRandomTile = (newGrid) => {
    let cell = getEmptyCell(newGrid);
    if (cell) {
      newGrid[cell.r][cell.c] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const moveGrid = (direction) => {
    if (gameOver) return;

    let newGrid = JSON.parse(JSON.stringify(grid));
    let moved = false;
    let pointsEarned = 0;

    const moveLeft = (row) => {
      // 1. Slide all non-zero tiles to the left
      let arr = row.filter(val => val !== 0);
      
      // 2. Combine adjacent identical tiles
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] = arr[i] * 2;
          pointsEarned += arr[i];
          arr[i + 1] = 0;
          // Every tile can only merge once, so we skip the next element
          i++; 
        }
      }
      
      // 3. Slide again to fill gaps created by merges
      let finalRow = arr.filter(val => val !== 0);
      while (finalRow.length < 4) finalRow.push(0);
      return finalRow;
    };

    if (direction === 'LEFT') {
      for (let r = 0; r < 4; r++) {
        let result = moveLeft(newGrid[r]);
        if (newGrid[r].join(',') !== result.join(',')) moved = true;
        newGrid[r] = result;
      }
    } else if (direction === 'RIGHT') {
      for (let r = 0; r < 4; r++) {
        let reversed = [...newGrid[r]].reverse();
        let result = moveLeft(reversed).reverse();
        if (newGrid[r].join(',') !== result.join(',')) moved = true;
        newGrid[r] = result;
      }
    } else if (direction === 'UP') {
      for (let c = 0; c < 4; c++) {
        let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
        let result = moveLeft(col);
        for (let r = 0; r < 4; r++) {
          if (newGrid[r][c] !== result[r]) moved = true;
          newGrid[r][c] = result[r];
        }
      }
    } else if (direction === 'DOWN') {
      for (let c = 0; c < 4; c++) {
        let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
        let reversed = col.reverse();
        let result = moveLeft(reversed).reverse();
        for (let r = 0; r < 4; r++) {
          if (newGrid[r][c] !== result[r]) moved = true;
          newGrid[r][c] = result[r];
        }
      }
    }

    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(s => s + pointsEarned);

      // Check for 2048 win
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (newGrid[r][c] === 2048 && !gameWon) {
            setGameWon(true);
          }
        }
      }

      // Check for game over
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
    const handleKeyDown = (e) => {
      // prevent default scroll for arrows
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp': moveGrid('UP'); break;
        case 'ArrowDown': moveGrid('DOWN'); break;
        case 'ArrowLeft': moveGrid('LEFT'); break;
        case 'ArrowRight': moveGrid('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [grid, gameOver]);

  // Touch Swipe parsing
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || e.changedTouches.length === 0) return;
    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const dx = touchEnd.x - touchStart.x;
    const dy = touchEnd.y - touchStart.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 30) {
      if (absDx > absDy) {
        if (dx > 0) moveGrid('RIGHT');
        else moveGrid('LEFT');
      } else {
        if (dy > 0) moveGrid('DOWN');
        else moveGrid('UP');
      }
    }
    setTouchStart(null);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button className="btn-outline" onClick={initGame}>New Game</button>
        <div style={{ background: '#1a1a2e', padding: '12px 24px', borderRadius: '12px', border: '1px solid #333' }}>
          <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>Score</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>{score}</div>
        </div>
      </div>

      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          background: '#bbada0',
          width: '100%',
          aspectRatio: '1/1',
          borderRadius: '16px',
          padding: '12px',
          position: 'relative'
        }}
      >
        {gameOver && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            borderRadius: '16px', zIndex: 10
          }}>
            <h2 style={{ fontSize: '48px', color: '#fff', marginBottom: '16px', fontWeight: 900 }}>Game Over!</h2>
            <button className="btn-primary" onClick={initGame}>Try Again</button>
          </div>
        )}
        
        {gameWon && !gameOver && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255, 45, 120, 0.8)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            borderRadius: '16px', zIndex: 5
          }}>
            <h2 style={{ fontSize: '48px', color: '#fff', marginBottom: '8px', fontWeight: 900, textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>YOU WON! 🏆</h2>
            <p style={{ color: '#fff', marginBottom: '20px', fontWeight: 600 }}>You reached the 2048 Vibe!</p>
            <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-primary" onClick={() => setGameWon(false)} style={{ background: '#fff', color: '#ff2d78' }}>Keep Playing</button>
                <button className="btn-outline" onClick={initGame} style={{ color: '#fff', borderColor: '#fff' }}>New Game</button>
            </div>
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gridTemplateRows: 'repeat(4, 1fr)',
          gap: '12px', 
          height: '100%' 
        }}>
          {grid.map((row, rowIndex) => 
            row.map((val, colIndex) => {
              const isEmpty = val === 0;
              const bg = isEmpty ? 'rgba(238, 228, 218, 0.35)' : (COLORS[val] || '#ff2d78');
              const color = val > 4 ? '#f9f6f2' : '#776e65';
              const fontSize = val > 1000 ? '28px' : val > 100 ? '36px' : '44px';
              
              return (
                <div key={`${rowIndex}-${colIndex}`} style={{
                  background: bg,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: fontSize,
                  fontWeight: 900,
                  color: color,
                  boxShadow: !isEmpty ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                  transition: 'background 0.15s, transform 0.1s',
                  transform: isEmpty ? 'scale(1)' : 'scale(1.02)'
                }}>
                  {isEmpty ? '' : val}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
}
