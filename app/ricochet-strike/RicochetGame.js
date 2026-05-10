'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const CANVAS_W = 800;
const CANVAS_H = 600;
const PLAYER_SIZE = 40;
const BULLET_SPEED = 7;
const MAX_BOUNCES = 4;

const COLORS = {
  player: '#00d4ff',
  bullet: '#fff',
  enemy: '#ff2d78',
  wall: '#1a1a2e',
  glow: '#00d4ff'
};

export default function RicochetGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Game Objects
  const player = useRef({ x: CANVAS_W / 2, y: CANVAS_H / 2, angle: 0 });
  const bullets = useRef([]);
  const enemies = useRef([]);
  const particles = useRef([]);
  const keys = useRef({});

  const initGame = useCallback(() => {
    player.current = { x: CANVAS_W / 2, y: CANVAS_H / 2, angle: 0 };
    bullets.current = [];
    enemies.current = [];
    particles.current = [];
    setScore(0);
    setGameState('PLAYING');
    spawnEnemy();
  }, []);

  const spawnEnemy = () => {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    if (side === 0) { x = Math.random() * CANVAS_W; y = -50; }
    else if (side === 1) { x = CANVAS_W + 50; y = Math.random() * CANVAS_H; }
    else if (side === 2) { x = Math.random() * CANVAS_W; y = CANVAS_H + 50; }
    else { x = -50; y = Math.random() * CANVAS_H; }

    enemies.current.push({
      x, y,
      size: 30,
      hp: 1,
      speed: 1.5 + Math.random() * 1,
      type: Math.random() > 0.8 ? 'SHIELDED' : 'NORMAL',
      shieldAngle: Math.random() * Math.PI * 2
    });
  };

  const createParticles = (x, y, color) => {
    for (let i = 0; i < 8; i++) {
      particles.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 1,
        color
      });
    }
  };

  const update = useCallback(() => {
    if (gameState !== 'PLAYING') return;

    // Player Rotation & Movement
    if (keys.current['ArrowLeft'] || keys.current['KeyA']) player.current.angle -= 0.08;
    if (keys.current['ArrowRight'] || keys.current['KeyD']) player.current.angle += 0.08;
    
    const speed = 3.5;
    if (keys.current['ArrowUp'] || keys.current['KeyW']) {
        player.current.x += Math.cos(player.current.angle) * speed;
        player.current.y += Math.sin(player.current.angle) * speed;
    }
    if (keys.current['ArrowDown'] || keys.current['KeyS']) {
        player.current.x -= Math.cos(player.current.angle) * speed;
        player.current.y -= Math.sin(player.current.angle) * speed;
    }

    // Keep player in bounds
    player.current.x = Math.max(20, Math.min(CANVAS_W - 20, player.current.x));
    player.current.y = Math.max(20, Math.min(CANVAS_H - 20, player.current.y));

    // Bullets
    bullets.current.forEach((b, index) => {
      b.x += b.vx;
      b.y += b.vy;

      // Ricochet Logic
      if (b.x < 0 || b.x > CANVAS_W) {
        b.vx *= -1;
        b.bounces++;
        createParticles(b.x, b.y, COLORS.bullet);
      }
      if (b.y < 0 || b.y > CANVAS_H) {
        b.vy *= -1;
        b.bounces++;
        createParticles(b.x, b.y, COLORS.bullet);
      }

      if (b.bounces > MAX_BOUNCES) {
        bullets.current.splice(index, 1);
      }
    });

    // Enemies
    enemies.current.forEach((e, index) => {
      const dx = player.current.x - e.x;
      const dy = player.current.y - e.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      e.x += (dx / dist) * e.speed;
      e.y += (dy / dist) * e.speed;

      if (e.type === 'SHIELDED') {
        e.shieldAngle += 0.02;
      }

      // Collision with player
      if (dist < 30) {
        setGameState('GAMEOVER');
      }

      // Collision with bullets
      bullets.current.forEach((b, bIdx) => {
        const bdx = b.x - e.x;
        const bdy = b.y - e.y;
        const bDist = Math.sqrt(bdx * bdx + bdy * bdy);

        if (bDist < 25) {
          if (e.type === 'SHIELDED') {
            // Check if bullet hit the shield
            const angleToBullet = Math.atan2(bdy, bdx);
            const diff = Math.abs(angleToBullet - e.shieldAngle) % (Math.PI * 2);
            if (diff < 0.8 || diff > (Math.PI * 2 - 0.8)) {
              // Hit shield! Bounce bullet
              b.vx *= -1;
              b.vy *= -1;
              createParticles(b.x, b.y, '#fff');
              return;
            }
          }
          
          // Hit enemy!
          createParticles(e.x, e.y, COLORS.enemy);
          enemies.current.splice(index, 1);
          bullets.current.splice(bIdx, 1);
          setScore(s => s + (e.type === 'SHIELDED' ? 250 : 100));
        }
      });
    });

    // Particles
    particles.current.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      if (p.life <= 0) particles.current.splice(index, 1);
    });

    if (Math.random() < 0.02) spawnEnemy();

  }, [gameState]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Clear
    ctx.fillStyle = COLORS.wall;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Draw Grid
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_W; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke();
    }
    for (let y = 0; y < CANVAS_H; y += 50) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke();
    }

    // Particles
    particles.current.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 3, 3);
    });
    ctx.globalAlpha = 1;

    // Player
    ctx.save();
    ctx.translate(player.current.x, player.current.y);
    ctx.rotate(player.current.currentAngle || player.current.angle);
    
    // Ship Body
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLORS.player;
    ctx.fillStyle = COLORS.player;
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-15, -15);
    ctx.lineTo(-10, 0);
    ctx.lineTo(-15, 15);
    ctx.closePath();
    ctx.fill();
    
    // Thruster
    if (keys.current['ArrowUp'] || keys.current['KeyW']) {
        ctx.fillStyle = '#ff9100';
        ctx.beginPath();
        ctx.moveTo(-12, -5);
        ctx.lineTo(-25, 0);
        ctx.lineTo(-12, 5);
        ctx.fill();
    }
    ctx.restore();

    // Bullets
    bullets.current.forEach(b => {
      ctx.shadowBlur = 10;
      ctx.shadowColor = COLORS.bullet;
      ctx.fillStyle = COLORS.bullet;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Trail
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x - b.vx * 2, b.y - b.vy * 2);
      ctx.stroke();
    });

    // Enemies
    enemies.current.forEach(e => {
      ctx.save();
      ctx.translate(e.x, e.y);
      
      // Core
      ctx.shadowBlur = 15;
      ctx.shadowColor = COLORS.enemy;
      ctx.fillStyle = COLORS.enemy;
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(15, 0);
      ctx.lineTo(0, 15);
      ctx.lineTo(-15, 0);
      ctx.closePath();
      ctx.fill();

      if (e.type === 'SHIELDED') {
        ctx.rotate(e.shieldAngle);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, 25, -0.8, 0.8);
        ctx.stroke();
        
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(0, 0, 27, -0.8, 0.8);
        ctx.stroke();
      }
      ctx.restore();
    });

    // Score
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = '900 24px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(score.toLocaleString(), 30, 50);

  }, [gameState, score]);

  useEffect(() => {
    let frame;
    const loop = () => {
      update();
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [update, draw]);

  useEffect(() => {
    const handleKD = (e) => {
      keys.current[e.code] = true;
      if (e.code === 'Space' && gameState === 'PLAYING') {
        bullets.current.push({
          x: player.current.x + Math.cos(player.current.angle) * 20,
          y: player.current.y + Math.sin(player.current.angle) * 20,
          vx: Math.cos(player.current.angle) * BULLET_SPEED,
          vy: Math.sin(player.current.angle) * BULLET_SPEED,
          bounces: 0
        });
      }
    };
    const handleKU = (e) => keys.current[e.code] = false;
    window.addEventListener('keydown', handleKD);
    window.addEventListener('keyup', handleKU);
    return () => {
      window.removeEventListener('keydown', handleKD);
      window.removeEventListener('keyup', handleKU);
    };
  }, [gameState]);

  useEffect(() => {
    const saved = localStorage.getItem('ricochet-strike-high');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('ricochet-strike-high', score);
    }
  }, [score, highScore]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '24px',
          background: '#000',
          boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
          cursor: 'crosshair',
          border: '4px solid #1a1a2e'
        }}
      />

      {gameState === 'START' && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          borderRadius: '24px', backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{ fontSize: '64px', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>RICOCHET <span style={{ color: '#ff2d78' }}>STRIKE</span></h1>
          <p style={{ color: '#888', marginBottom: '40px', fontSize: '18px' }}>Reflect shots. Break shields. Survive the swarm.</p>
          <button className="btn-primary" onClick={initGame} style={{ fontSize: '24px', padding: '16px 48px' }}>INITIALIZE MISSION</button>
          
          <div style={{ marginTop: '40px', display: 'flex', gap: '40px', color: '#666' }}>
            <div><span style={{ color: '#fff' }}>WASD</span> MOVEMENT</div>
            <div><span style={{ color: '#fff' }}>SPACE</span> FIRE</div>
          </div>
        </div>
      )}

      {gameState === 'GAMEOVER' && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(255, 45, 120, 0.1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          borderRadius: '24px', backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{ fontSize: '48px', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>MISSION FAILED</h2>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#ff2d78', marginBottom: '40px' }}>SCORE: {score}</div>
          <button className="btn-primary" onClick={initGame} style={{ background: '#fff', color: '#000' }}>RETRY MISSION</button>
        </div>
      )}
    </div>
  );
}
