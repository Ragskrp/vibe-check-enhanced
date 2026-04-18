'use client';

import { useState, useEffect, useRef } from 'react';

const GRAVITY = 0.45;
const JUMP = -7;
const PIPE_SPEED = 5;
const PIPE_WIDTH = 60;
const PIPE_GAP = 180;
const BIRD_SIZE = 40;

export default function FlappyGame() {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Difficulty scaling
  const [currentSpeed, setCurrentSpeed] = useState(3.5);
  const [currentGap, setCurrentGap] = useState(240);
  
  const [birdPos, setBirdPos] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  
  const gameAreaRef = useRef(null);
  const requestRef = useRef();
  
  // Game dimensions
  const [dim, setDim] = useState({ w: 400, h: 600 });

  useEffect(() => {
    if (gameAreaRef.current) {
      setDim({
        w: gameAreaRef.current.clientWidth,
        h: gameAreaRef.current.clientHeight
      });
    }
  }, []);

  const startGame = () => {
    setGameState('PLAYING');
    setBirdPos(dim.h / 2);
    setBirdVelocity(0);
    setScore(0);
    setCurrentSpeed(3.2); // Slower start
    setCurrentGap(240);
    setPipes([
      { x: dim.w + 200, topHeight: 200, passed: false } // First pipe further away
    ]);
  };

  const jump = () => {
    if (gameState === 'PLAYING') {
      setBirdVelocity(JUMP);
    } else if (gameState === 'START' || gameState === 'GAMEOVER') {
      startGame();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, birdPos]); // Added dependencies to ensure jump uses latest state

  const updateGame = () => {
    if (gameState !== 'PLAYING') return;

    // Update difficulty based on score
    // Every 5 points, speed up and tighten gap
    const level = Math.floor(score / 5);
    const targetSpeed = Math.min(3.2 + level * 0.3, 6.5);
    const targetGap = Math.max(240 - level * 8, 160);
    
    // Smoothly transition difficulty (optional but nice)
    if (currentSpeed < targetSpeed) setCurrentSpeed(s => s + 0.01);
    if (currentGap > targetGap) setCurrentGap(g => g - 0.1);

    // Update bird
    let newVelocity = birdVelocity + GRAVITY;
    let newPos = birdPos + newVelocity;

    // Floor collision
    if (newPos >= dim.h - BIRD_SIZE) {
      newPos = dim.h - BIRD_SIZE;
      setGameState('GAMEOVER');
      if (score > highScore) setHighScore(score);
    }
    // Ceiling collision
    if (newPos <= 0) {
      newPos = 0;
      newVelocity = 0;
    }

    // Update pipes
    let newPipes = pipes.map(p => ({ ...p, x: p.x - currentSpeed }));
    
    // Add new pipe
    const lastPipe = newPipes[newPipes.length - 1];
    // Distance between pipes also decreases as speed increases to maintain rhythm
    const pipeDistance = Math.max(300 - (score * 2), 240);
    
    if (lastPipe && lastPipe.x < dim.w - pipeDistance) {
      const minPipeHeight = 50;
      const maxPipeHeight = dim.h - currentGap - minPipeHeight;
      const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight);
      newPipes.push({ x: dim.w, topHeight, passed: false });
    }

    // Remove off-screen pipes
    newPipes = newPipes.filter(p => p.x + PIPE_WIDTH > 0);

    // Collision detection & Scoring
    const birdBox = { x: 50, y: newPos, w: BIRD_SIZE, h: BIRD_SIZE };
    
    for (let i = 0; i < newPipes.length; i++) {
        let p = newPipes[i];
        const topPipeBox = { x: p.x, y: 0, w: PIPE_WIDTH, h: p.topHeight };
        const bottomPipeBox = { x: p.x, y: p.topHeight + currentGap, w: PIPE_WIDTH, h: dim.h - (p.topHeight + currentGap) };

        // Check rect overlap
        const isCollision = (rect1, rect2) => {
            return rect1.x < rect2.x + rect2.w &&
                   rect1.x + rect1.w > rect2.x &&
                   rect1.y < rect2.y + rect2.h &&
                   rect1.y + rect1.h > rect2.y;
        };

        if (isCollision(birdBox, topPipeBox) || isCollision(birdBox, bottomPipeBox)) {
            setGameState('GAMEOVER');
            if (score > highScore) setHighScore(score);
            return;
        }

        // Score
        if (p.x + PIPE_WIDTH < birdBox.x && !p.passed) {
            setScore(s => s + 1);
            p.passed = true;
        }
    }

    setBirdPos(newPos);
    setBirdVelocity(newVelocity);
    setPipes(newPipes);
  };

  useEffect(() => {
    if (gameState === 'PLAYING') {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, birdPos, birdVelocity, pipes]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '32px', marginBottom: '20px' }}>
        <div style={{ color: '#00ff94', fontSize: '24px', fontWeight: 900 }}>SCORE: {score}</div>
        <div style={{ color: '#888', fontSize: '24px', fontWeight: 900 }}>BEST: {highScore}</div>
      </div>
      
      <div 
        ref={gameAreaRef}
        onClick={jump}
        style={{
          width: '100%',
          maxWidth: '450px',
          height: '600px',
          background: 'linear-gradient(to bottom, #1a1a2e, #0a0a1f)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          border: '2px solid #333',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        {/* Bird */}
        <div style={{
          position: 'absolute',
          left: '50px',
          top: `${birdPos}px`,
          width: `${BIRD_SIZE}px`,
          height: `${BIRD_SIZE}px`,
          background: '#ffe600',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transform: `rotate(${Math.min(Math.max(birdVelocity * 3, -45), 90)}deg)`,
          transition: 'transform 0.1s',
          boxShadow: '0 0 15px rgba(255,230,0,0.5)',
          zIndex: 10
        }}>
          😠
        </div>

        {/* Pipes */}
        {pipes.map((p, i) => (
          <div key={i}>
            <div style={{ // Top Pipe
              position: 'absolute',
              left: `${p.x}px`,
              top: 0,
              width: `${PIPE_WIDTH}px`,
              height: `${p.topHeight}px`,
              background: 'linear-gradient(to right, #00d4ff, #0088ff)',
              borderRadius: '0 0 10px 10px',
              border: '2px solid #0055ff',
              borderTop: 'none'
            }} />
            <div style={{ // Bottom Pipe
              position: 'absolute',
              left: `${p.x}px`,
              top: `${p.topHeight + currentGap}px`,
              width: `${PIPE_WIDTH}px`,
              height: `${dim.h - (p.topHeight + currentGap)}px`,
              background: 'linear-gradient(to right, #00d4ff, #0088ff)',
              borderRadius: '10px 10px 0 0',
              border: '2px solid #0055ff',
              borderBottom: 'none'
            }} />
          </div>
        ))}

        {/* UI Overlays */}
        {gameState === 'START' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20
          }}>
            <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '16px' }}>Ready to Fly?</h2>
            <button className="btn-primary" onClick={startGame}>Click to Start</button>
          </div>
        )}

        {gameState === 'GAMEOVER' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255,45,120,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20
          }}>
            <h2 style={{ color: '#fff', fontSize: '48px', fontWeight: 900, marginBottom: '16px', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>CRASHED!</h2>
            <div style={{ fontSize: '24px', color: '#fff', marginBottom: '24px' }}>Score: {score}</div>
            <button className="btn-primary" onClick={startGame} style={{ background: '#fff', color: '#ff2d78' }}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
