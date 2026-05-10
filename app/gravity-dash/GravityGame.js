'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── GAME CONSTANTS ───
const CANVAS_W = 800;
const CANVAS_H = 600;
const PLAYER_SIZE = 40;
const BULLET_SPEED = 8;
const ENEMY_SPAWN_RATE = 1500; // ms
const POWERUP_SPAWN_RATE = 10000; // ms

const WEAPONS = {
  NORMAL: { type: 'normal', color: '#00d4ff', cooldown: 250 },
  TRIPLE: { type: 'triple', color: '#ff2d78', cooldown: 300, duration: 8000 },
  RAPID: { type: 'rapid', color: '#ffe600', cooldown: 100, duration: 6000 },
  SHIELD: { type: 'shield', color: '#00ff94', duration: 10000 },
};

export default function NeonStrikeGame() {
  const [screen, setScreen] = useState('menu'); // menu | playing | gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeWeapon, setActiveWeapon] = useState(WEAPONS.NORMAL);
  const [shieldActive, setShieldActive] = useState(false);
  const [scale, setScale] = useState(1);

  const canvasRef = useRef(null);
  const gameState = useRef({
    player: { x: CANVAS_W / 2, y: CANVAS_H - 100, vx: 0, vy: 0, r: 20 },
    bullets: [],
    enemies: [],
    powerups: [],
    particles: [],
    keys: {},
    lastShot: 0,
    lastSpawn: 0,
    lastPowerup: 0,
    score: 0,
    shake: 0,
    frames: 0,
    weaponTimeout: null,
    shieldTimeout: null
  });

  // ─── INIT & RESIZE ───
  useEffect(() => {
    try {
      const saved = localStorage.getItem('neon-strike-high');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}

    const handleResize = () => {
      const parent = canvasRef.current?.parentElement;
      if (!parent) return;
      const w = parent.clientWidth - 40;
      setScale(Math.min(w / CANVAS_W, 1));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── GAME LOGIC ───
  const startGame = () => {
    setScreen('playing');
    setScore(0);
    setActiveWeapon(WEAPONS.NORMAL);
    setShieldActive(false);
    gameState.current = {
      player: { x: CANVAS_W / 2, y: CANVAS_H - 100, vx: 0, vy: 0, r: 20 },
      bullets: [],
      enemies: [],
      powerups: [],
      particles: [],
      keys: gameState.current.keys,
      lastShot: 0,
      lastSpawn: Date.now(),
      lastPowerup: Date.now(),
      score: 0,
      shake: 0,
      frames: 0
    };
  };

  const spawnExplosion = (x, y, color, count = 15) => {
    for (let i = 0; i < count; i++) {
      gameState.current.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        color,
        size: Math.random() * 4 + 2
      });
    }
  };

  const update = useCallback((t) => {
    if (screen !== 'playing') return;
    const gs = gameState.current;
    gs.frames++;

    // Player Movement
    const speed = 6;
    if (gs.keys['ArrowLeft'] || gs.keys['KeyA']) gs.player.x -= speed;
    if (gs.keys['ArrowRight'] || gs.keys['KeyD']) gs.player.x += speed;
    if (gs.keys['ArrowUp'] || gs.keys['KeyW']) gs.player.y -= speed;
    if (gs.keys['ArrowDown'] || gs.keys['KeyS']) gs.player.y += speed;

    // Bounds
    gs.player.x = Math.max(gs.player.r, Math.min(CANVAS_W - gs.player.r, gs.player.x));
    gs.player.y = Math.max(gs.player.r, Math.min(CANVAS_H - gs.player.r, gs.player.y));

    // Shooting
    const now = Date.now();
    if ((gs.keys['Space'] || gs.keys['KeyZ']) && now - gs.lastShot > activeWeapon.cooldown) {
      if (activeWeapon.type === 'triple') {
        gs.bullets.push({ x: gs.player.x, y: gs.player.y - 20, vx: 0, vy: -BULLET_SPEED, color: activeWeapon.color });
        gs.bullets.push({ x: gs.player.x, y: gs.player.y - 20, vx: -2, vy: -BULLET_SPEED, color: activeWeapon.color });
        gs.bullets.push({ x: gs.player.x, y: gs.player.y - 20, vx: 2, vy: -BULLET_SPEED, color: activeWeapon.color });
      } else {
        gs.bullets.push({ x: gs.player.x, y: gs.player.y - 20, vx: 0, vy: -BULLET_SPEED, color: activeWeapon.color });
      }
      gs.lastShot = now;
    }

    // Bullets
    gs.bullets = gs.bullets.filter(b => {
      b.x += b.vx;
      b.y += b.vy;
      return b.y > -20 && b.x > -20 && b.x < CANVAS_W + 20;
    });

    // Enemies
    if (now - gs.lastSpawn > Math.max(400, ENEMY_SPAWN_RATE - gs.score * 10)) {
      gs.enemies.push({
        x: Math.random() * (CANVAS_W - 40) + 20,
        y: -40,
        speed: Math.random() * 2 + 2 + (gs.score / 500),
        r: 15 + Math.random() * 10,
        hp: 1 + Math.floor(gs.score / 1000),
        type: Math.random() > 0.8 ? 'fast' : 'normal'
      });
      gs.lastSpawn = now;
    }

    gs.enemies = gs.enemies.filter(e => {
      e.y += e.type === 'fast' ? e.speed * 1.5 : e.speed;
      
      // Collision with player
      const dist = Math.hypot(e.x - gs.player.x, e.y - gs.player.y);
      if (dist < e.r + gs.player.r) {
        if (shieldActive) {
          spawnExplosion(e.x, e.y, '#fff');
          gs.score += 50;
          setScore(gs.score);
          return false;
        } else {
          setScreen('gameover');
          if (gs.score > highScore) {
            setHighScore(gs.score);
            localStorage.setItem('neon-strike-high', gs.score);
          }
        }
      }
      return e.y < CANVAS_H + 40;
    });

    // Powerups
    if (now - gs.lastPowerup > POWERUP_SPAWN_RATE) {
      const types = ['TRIPLE', 'RAPID', 'SHIELD'];
      const type = types[Math.floor(Math.random() * types.length)];
      gs.powerups.push({
        x: Math.random() * (CANVAS_W - 40) + 20,
        y: -40,
        type: WEAPONS[type],
        r: 15
      });
      gs.lastPowerup = now;
    }

    gs.powerups = gs.powerups.filter(p => {
      p.y += 2;
      const dist = Math.hypot(p.x - gs.player.x, p.y - gs.player.y);
      if (dist < p.r + gs.player.r) {
        if (p.type.type === 'shield') {
          setShieldActive(true);
          clearTimeout(gs.shieldTimeout);
          gs.shieldTimeout = setTimeout(() => setShieldActive(false), p.type.duration);
        } else {
          setActiveWeapon(p.type);
          clearTimeout(gs.weaponTimeout);
          gs.weaponTimeout = setTimeout(() => setActiveWeapon(WEAPONS.NORMAL), p.type.duration);
        }
        return false;
      }
      return p.y < CANVAS_H + 40;
    });

    // Bullet-Enemy Collision
    gs.bullets.forEach((b, bi) => {
      gs.enemies.forEach((e, ei) => {
        const dist = Math.hypot(b.x - e.x, b.y - e.y);
        if (dist < e.r + 5) {
          e.hp--;
          gs.bullets.splice(bi, 1);
          if (e.hp <= 0) {
            spawnExplosion(e.x, e.y, activeWeapon.color);
            gs.enemies.splice(ei, 1);
            gs.score += 100;
            setScore(gs.score);
            gs.shake = 10;
          }
        }
      });
    });

    // Particles
    gs.particles = gs.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      return p.life > 0;
    });

    if (gs.shake > 0) gs.shake -= 1;
  }, [screen, activeWeapon, shieldActive, highScore]);

  // ─── DRAW ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame;

    const render = (t) => {
      update(t);
      const gs = gameState.current;

      // Clear
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Starfield
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(i * 1234.5) * 0.5 + 0.5) * CANVAS_W;
        const y = ((gs.frames * 0.5 + i * 50) % CANVAS_H);
        ctx.globalAlpha = 0.3;
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.globalAlpha = 1;

      if (screen === 'playing') {
        if (gs.shake > 0) {
          ctx.save();
          ctx.translate((Math.random() - 0.5) * gs.shake, (Math.random() - 0.5) * gs.shake);
        }

        // Particles
        gs.particles.forEach(p => {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Bullets
        gs.bullets.forEach(b => {
          ctx.shadowBlur = 10;
          ctx.shadowColor = b.color;
          ctx.fillStyle = b.color;
          ctx.fillRect(b.x - 2, b.y - 10, 4, 15);
        });

        // Powerups
        gs.powerups.forEach(p => {
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.type.color;
          ctx.fillStyle = p.type.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(p.type.type.charAt(0).toUpperCase(), p.x, p.y + 4);
        });

        // Enemies
        gs.enemies.forEach(e => {
          ctx.shadowBlur = 10;
          ctx.shadowColor = e.type === 'fast' ? '#ff0055' : '#b14aed';
          ctx.fillStyle = e.type === 'fast' ? '#ff0055' : '#b14aed';
          ctx.beginPath();
          ctx.moveTo(e.x, e.y + e.r);
          ctx.lineTo(e.x - e.r, e.y - e.r);
          ctx.lineTo(e.x + e.r, e.y - e.r);
          ctx.closePath();
          ctx.fill();
        });

        // Player
        ctx.shadowBlur = 20;
        ctx.shadowColor = activeWeapon.color;
        if (shieldActive) {
          ctx.strokeStyle = '#00ff94';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(gs.player.x, gs.player.y, gs.player.r + 10, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(gs.player.x, gs.player.y - 25);
        ctx.lineTo(gs.player.x - 20, gs.player.y + 15);
        ctx.lineTo(gs.player.x, gs.player.y + 5);
        ctx.lineTo(gs.player.x + 20, gs.player.y + 15);
        ctx.closePath();
        ctx.fill();

        if (gs.shake > 0) ctx.restore();
      }

      ctx.shadowBlur = 0;
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [screen, update, activeWeapon, shieldActive]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      gameState.current.keys[e.code] = true;
      if (e.code === 'Space' && screen !== 'playing') startGame();
    };
    const handleKeyUp = (e) => {
      gameState.current.keys[e.code] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [screen]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '20px', background: '#050510', borderRadius: '32px',
      border: '4px solid #1a1a3a', boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none'
    }}>
      <div style={{
        width: '100%', display: 'flex', justifyContent: 'space-between',
        marginBottom: '20px', color: '#fff', fontSize: '24px', fontWeight: 900
      }}>
        <div style={{ color: activeWeapon.color }}>
          SCORE: {score}
        </div>
        <div style={{ color: '#555' }}>
          BEST: {highScore}
        </div>
      </div>

      <div style={{
        position: 'relative', width: CANVAS_W * scale, height: CANVAS_H * scale,
        overflow: 'hidden', borderRadius: '16px', cursor: 'crosshair'
      }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {screen === 'menu' && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.85)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#fff', backdropFilter: 'blur(8px)'
          }}>
            <h1 style={{ fontSize: '72px', fontWeight: 900, marginBottom: '8px', color: '#00d4ff', textShadow: '0 0 40px #00d4ff' }}>
              NEON STRIKE
            </h1>
            <p style={{ fontSize: '18px', color: '#888', marginBottom: '48px' }}>
              Deep Space Combat Engine
            </p>
            <button
              onClick={startGame}
              style={{
                padding: '20px 64px', fontSize: '24px', fontWeight: 900,
                background: '#fff', color: '#000', border: 'none', borderRadius: '12px',
                cursor: 'pointer', transition: 'transform 0.2s'
              }}
            >
              START MISSION
            </button>
            <div style={{ marginTop: '48px', color: '#555', fontSize: '14px', textAlign: 'center' }}>
              WASD / ARROWS to Move<br />SPACE to Fire Weapons
            </div>
          </div>
        )}

        {screen === 'gameover' && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(255,0,85,0.15)',
            backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', color: '#fff'
          }}>
            <h2 style={{ fontSize: '64px', fontWeight: 900, marginBottom: '8px' }}>MISSION FAILED</h2>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#fff', marginBottom: '48px' }}>
              {score}
            </div>
            <button
              onClick={startGame}
              style={{
                padding: '20px 64px', fontSize: '24px', fontWeight: 900,
                background: '#fff', color: '#000', border: 'none', borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              REDEPLOY
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '24px' }}>
        <div style={{ color: '#00ff94', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 12, height: 12, background: '#00ff94', borderRadius: '50%' }} /> SHIELD ACTIVE
        </div>
        <div style={{ color: '#ff2d78', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 12, height: 12, background: '#ff2d78', borderRadius: '50%' }} /> TRIPLE SHOT
        </div>
        <div style={{ color: '#ffe600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 12, height: 12, background: '#ffe600', borderRadius: '50%' }} /> RAPID FIRE
        </div>
      </div>
    </div>
  );
}
