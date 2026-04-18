'use client';

import { useState, useEffect, useRef } from 'react';

// Constants for that classic snappy feel
const GRAVITY = 0.5;
const JUMP = -8;
const PIPE_WIDTH = 65;
const BIRD_SIZE = 38;
const GROUND_HEIGHT = 100;

export default function FlappyGame() {
  const [gameState, setGameState] = useState('START'); // START, READY, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Difficulty & Movement state
  const [currentSpeed, setCurrentSpeed] = useState(3.5);
  const [currentGap, setCurrentGap] = useState(170);
  const [birdPos, setBirdPos] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [groundX, setGroundX] = useState(0);
  const [bgX, setBgX] = useState(0);
  
  const gameAreaRef = useRef(null);
  const requestRef = useRef();
  
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
    setGameState('READY');
    setBirdPos(dim.h / 2 - 50);
    setBirdVelocity(0);
    setBirdRotation(0);
    setScore(0);
    setCurrentSpeed(3.2);
    setCurrentGap(175);
    setPipes([]);
  };

  const startPlaying = () => {
    setGameState('PLAYING');
    setPipes([
      { x: dim.w + 400, topHeight: 200, passed: false }
    ]);
  };

  const jump = () => {
    if (gameState === 'PLAYING') {
      setBirdVelocity(JUMP);
    } else if (gameState === 'READY') {
      startPlaying();
      setBirdVelocity(JUMP);
    } else if (gameState === 'START' || gameState === 'GAMEOVER') {
      startGame();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, birdPos]);

  const updateGame = () => {
    if (gameState === 'START') return;

    // Movement that happens even in READY state (ground/bg scrolling)
    if (gameState !== 'GAMEOVER') {
        setGroundX(prev => (prev - currentSpeed) % 24);
        setBgX(prev => (prev - currentSpeed * 0.3) % 400);
    }

    if (gameState === 'READY') {
        // Hover effect in ready state
        setBirdPos(dim.h / 2 - 50 + Math.sin(Date.now() / 200) * 10);
    }

    if (gameState !== 'PLAYING') return;

    // Physics
    let newVelocity = birdVelocity + GRAVITY;
    let newPos = birdPos + newVelocity;
    
    // Rotation logic: Tilt up on jump, slowly face dive as it falls
    let newRotation = birdRotation;
    if (newVelocity < 0) {
        newRotation = -25; // Snap up
    } else {
        newRotation = Math.min(newRotation + 4, 90); // Gradually dive down
    }

    // Floor collision (Ground)
    if (newPos >= dim.h - GROUND_HEIGHT - BIRD_SIZE) {
      newPos = dim.h - GROUND_HEIGHT - BIRD_SIZE;
      setGameState('GAMEOVER');
      if (score > highScore) setHighScore(score);
    }
    // Ceiling
    if (newPos <= 0) {
      newPos = 0;
      newVelocity = 0;
    }

    // Update pipes
    let newPipes = pipes.map(p => ({ ...p, x: p.x - currentSpeed }));
    const lastPipe = newPipes[newPipes.length - 1];
    const pipeDistance = 280; // Fixed distance for classic rhythm
    
    if (lastPipe && lastPipe.x < dim.w - pipeDistance) {
      const minPipeHeight = 80;
      const maxPipeHeight = dim.h - GROUND_HEIGHT - currentGap - minPipeHeight;
      const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight);
      newPipes.push({ x: dim.w, topHeight, passed: false });
    }
    newPipes = newPipes.filter(p => p.x + PIPE_WIDTH > -50);

    // Collision Detection (Player friendly hitbox)
    const padding = 6;
    const birdBox = { 
      x: 60 + padding, 
      y: newPos + padding, 
      w: BIRD_SIZE - padding * 2, 
      h: BIRD_SIZE - padding * 2 
    };
    
    for (let i = 0; i < newPipes.length; i++) {
        let p = newPipes[i];
        const topPipeBox = { x: p.x, y: 0, w: PIPE_WIDTH, h: p.topHeight };
        const bottomY = p.topHeight + currentGap;
        const bottomPipeBox = { x: p.x, y: bottomY, w: PIPE_WIDTH, h: dim.h - GROUND_HEIGHT - bottomY };

        const isCollision = (r1, r2) => (
            r1.x < r2.x + r2.w && r1.x + r1.w > r2.x &&
            r1.y < r2.y + r2.h && r1.y + r1.w > r2.y
        );

        if (isCollision(birdBox, topPipeBox) || isCollision(birdBox, bottomPipeBox)) {
            setGameState('GAMEOVER');
            if (score > highScore) setHighScore(score);
            return;
        }

        if (p.x + PIPE_WIDTH < birdBox.x && !p.passed) {
            setScore(s => s + 1);
            p.passed = true;
        }
    }

    setBirdPos(newPos);
    setBirdVelocity(newVelocity);
    setBirdRotation(newRotation);
    setPipes(newPipes);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(requestRef.current);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      <div 
        ref={gameAreaRef}
        onClick={jump}
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '600px',
          background: '#4ec0ca',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          border: '8px solid #333',
          cursor: 'pointer',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        }}
      >
        {/* Sky Background (Parallax) */}
        <div style={{
            position: 'absolute', bottom: GROUND_HEIGHT, left: `${bgX}px`, width: '800px', height: '150px',
            background: 'linear-gradient(to top, #71c5cf, #4ec0ca)',
            opacity: 0.5, zIndex: 1
        }} />
        
        {/* Large Score Counter */}
        <div style={{
            position: 'absolute', top: '50px', left: 0, right: 0, textAlign: 'center',
            fontSize: '80px', fontWeight: 900, color: '#fff', zIndex: 30,
            textShadow: '4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 4px 4px 10px rgba(0,0,0,0.5)',
            fontFamily: 'monospace'
        }}>
            {gameState !== 'START' && score}
        </div>

        {/* Bird */}
        <div style={{
          position: 'absolute',
          left: '60px',
          top: `${birdPos}px`,
          width: `${BIRD_SIZE}px`,
          height: `${BIRD_SIZE}px`,
          fontSize: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `rotate(${birdRotation}deg)`,
          zIndex: 25,
          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          {birdVelocity < 0 ? '🐦' : '🐤'}
        </div>

        {/* Pipes */}
        {pipes.map((p, i) => (
          <div key={i} style={{ zIndex: 10 }}>
            {/* Top Pipe */}
            <div style={{
              position: 'absolute', left: `${p.x}px`, top: 0,
              width: `${PIPE_WIDTH}px`, height: `${p.topHeight}px`,
              background: '#73bf2e', border: '3px solid #543847', borderRadius: '0 0 4px 4px',
              boxShadow: 'inset -8px 0 0 rgba(0,0,0,0.1)'
            }}>
              <div style={{ // Top Pipe Rim
                position: 'absolute', bottom: 0, left: '-4px', width: `${PIPE_WIDTH + 8}px`, height: '26px',
                background: '#73bf2e', border: '3px solid #543847', borderRadius: '4px'
              }} />
            </div>
            {/* Bottom Pipe */}
            <div style={{
              position: 'absolute', left: `${p.x}px`, top: `${p.topHeight + currentGap}px`,
              width: `${PIPE_WIDTH}px`, height: `${dim.h - GROUND_HEIGHT - (p.topHeight + currentGap)}px`,
              background: '#73bf2e', border: '3px solid #543847', borderRadius: '4px 4px 0 0',
              boxShadow: 'inset -8px 0 0 rgba(0,0,0,0.1)'
            }}>
              <div style={{ // Bottom Pipe Rim
                position: 'absolute', top: 0, left: '-4px', width: `${PIPE_WIDTH + 8}px`, height: '26px',
                background: '#73bf2e', border: '3px solid #543847', borderRadius: '4px'
              }} />
            </div>
          </div>
        ))}

        {/* Ground */}
        <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${GROUND_HEIGHT}px`,
            background: '#ded895', borderTop: '4px solid #543847', zIndex: 20
        }}>
            <div style={{
                width: '200%', height: '16px', background: '#9ce659',
                backgroundImage: 'repeating-linear-gradient(45deg, #73bf2e, #73bf2e 12px, #9ce659 12px, #9ce659 24px)',
                position: 'absolute', top: 0, left: `${groundX}px`
            }} />
        </div>

        {/* START UI */}
        {gameState === 'START' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 50
          }}>
            <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 900, marginBottom: '30px', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>FLAPPY VIBE</h1>
            <div style={{ fontSize: '100px', marginBottom: '40px', animate: 'bounce 2s infinite' }}>🐦</div>
            <button className="btn-primary" onClick={startGame} style={{ fontSize: '24px', padding: '16px 40px' }}>PLAY</button>
          </div>
        )}

        {/* READY UI */}
        {gameState === 'READY' && (
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                textAlign: 'center', zIndex: 40
            }}>
                <div style={{ color: '#fff', fontSize: '24px', fontWeight: 900, textShadow: '2px 2px 0 #000' }}>GET READY</div>
                <div style={{ fontSize: '80px', marginTop: '20px' }}>🖱️</div>
            </div>
        )}

        {/* GAMEOVER UI */}
        {gameState === 'GAMEOVER' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 60
          }}>
            <div style={{
                background: '#f5f1da', padding: '30px', borderRadius: '16px', border: '4px solid #543847',
                textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,0.2)'
            }}>
                <h2 style={{ color: '#e86101', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>GAME OVER</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', marginBottom: '24px' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: '#888' }}>SCORE</div>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#333' }}>{score}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: '#888' }}>BEST</div>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#333' }}>{highScore}</div>
                    </div>
                </div>
                <button className="btn-primary" onClick={startGame} style={{ width: '100%', background: '#ff8a00' }}>RESTART</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
