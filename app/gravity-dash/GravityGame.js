'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── THEMES ───
const THEMES = [
  {
    name: 'Synthwave',
    bgTop: '#1a0b2e', bgBottom: '#3d0a45',
    ground: '#111', grid: '#ff007f',
    obstacle: ['#00f3ff', '#0077ff'], rim: '#fff',
    glow: 'rgba(0, 243, 255, 0.6)',
    accent: '#ff007f',
    particles: ['✨', '⚡', '🟣'],
  },
  {
    name: 'Cyber City',
    bgTop: '#0a0f24', bgBottom: '#102a43',
    ground: '#000', grid: '#00ff94',
    obstacle: ['#ff0055', '#aa00ff'], rim: '#fff',
    glow: 'rgba(255, 0, 85, 0.6)',
    accent: '#00ff94',
    particles: ['💥', '🔥', '🔴'],
  },
  {
    name: 'Neon Grid',
    bgTop: '#000', bgBottom: '#0d0d0d',
    ground: '#050505', grid: '#ffff00',
    obstacle: ['#00ff00', '#00aa00'], rim: '#fff',
    glow: 'rgba(0, 255, 0, 0.6)',
    accent: '#ffff00',
    particles: ['🟢', '💫', '🌟'],
  }
];

const CHARACTERS = [
  { emoji: '🚀', name: 'Rocket', trail: '🔥' },
  { emoji: '🛸', name: 'UFO', trail: '✨' },
  { emoji: '🤖', name: 'Droid', trail: '⚡' },
];

const GRAVITY_FORCE = 0.04;
const TERMINAL_VELOCITY = 12;
const OBSTACLE_WIDTH = 50;
const CHAR_SIZE = 40;
const GROUND_H = 40;
const CEILING_H = 40;
const BASE_SPEED = 4;
const BASE_SPAWN_RATE = 100;

export default function GravityGame() {
  const [screen, setScreen] = useState('menu'); // menu | countdown | playing | paused | gameover
  const [charIdx, setCharIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [countdown, setCountdown] = useState(3);
  
  const [y, setY] = useState(300);
  const [vel, setVel] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const [rot, setRot] = useState(0);
  
  const [obstacles, setObstacles] = useState([]);
  const [particles, setParticles] = useState([]);
  const [trail, setTrail] = useState([]);
  
  const [bgOffset, setBgOffset] = useState(0);
  const [shakeTimer, setShakeTimer] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const areaRef = useRef(null);
  const stateRef = useRef({
    y: 300, vel: 0, isReversed: false, rot: 0, score: 0,
    obstacles: [], frames: 0, lastTime: 0, speed: BASE_SPEED
  });

  const dim = { w: 480, h: 720 };
  const themeIdx = Math.min(Math.floor(score / 15), THEMES.length - 1);
  const theme = THEMES[themeIdx];
  const char = CHARACTERS[charIdx];

  // ─── INIT ───
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gravity-dash-high');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}

    const handleResize = () => {
      if (!areaRef.current) return;
      const parent = areaRef.current.parentElement;
      const availableW = parent.clientWidth - 40;
      const availableH = window.innerHeight - 150;
      const scaleW = availableW / dim.w;
      const scaleH = availableH / dim.h;
      setScale(Math.min(scaleW, scaleH, 1.2)); 
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── START ───
  const startCountdown = useCallback(() => {
    setScreen('countdown');
    setCountdown(3);
    setY(dim.h / 2);
    setVel(0);
    setIsReversed(false);
    setRot(0);
    setScore(0);
    setObstacles([]);
    setParticles([]);
    setTrail([]);
    setShakeTimer(0);
    
    stateRef.current = {
      y: dim.h / 2, vel: 0, isReversed: false, rot: 0, score: 0,
      obstacles: [{ x: dim.w + 200, type: 'bottom', height: 200, passed: false }],
      frames: 0, lastTime: performance.now(), speed: BASE_SPEED
    };

    let c = 3;
    const interval = setInterval(() => {
      c--;
      if (c > 0) {
        setCountdown(c);
      } else {
        clearInterval(interval);
        setScreen('playing');
        stateRef.current.lastTime = performance.now();
      }
    }, 800);
  }, [dim.h, dim.w]);

  // ─── INPUT ───
  const flipGravity = useCallback(() => {
    if (screen === 'playing') {
      setIsReversed(prev => {
        stateRef.current.isReversed = !prev;
        return !prev;
      });
      // Add a small kick when flipping to feel responsive
      stateRef.current.vel *= 0.5;
      spawnParticles(80, stateRef.current.y, 5);
    } else if (screen === 'menu' || screen === 'gameover') {
      startCountdown();
    }
  }, [screen, startCountdown]);

  useEffect(() => {
    const kd = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') { 
        e.preventDefault(); 
        flipGravity(); 
      }
      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (screen === 'playing') setScreen('paused');
        else if (screen === 'paused') {
          setScreen('playing');
          stateRef.current.lastTime = performance.now();
        }
      }
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [flipGravity, screen]);

  // ─── PARTICLES ───
  const spawnParticles = (x, y, count = 5) => {
    const newP = Array.from({ length: count }, () => ({
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      vx: (Math.random() - 0.5) * 4 - 2,
      vy: (Math.random() - 0.5) * 4,
      life: 1,
      emoji: theme.particles[Math.floor(Math.random() * theme.particles.length)],
    }));
    setParticles(prev => [...prev.slice(-30), ...newP]);
  };

  const gameOver = useCallback(() => {
    setScreen('gameover');
    setShakeTimer(15);
    if (stateRef.current.score > highScore) {
      setHighScore(stateRef.current.score);
      try { localStorage.setItem('gravity-dash-high', String(stateRef.current.score)); } catch {}
    }
  }, [highScore]);

  // ─── GAME LOOP ───
  useEffect(() => {
    if (screen !== 'playing') return;

    let animId;
    const loop = (time) => {
      animId = requestAnimationFrame(loop);
      
      const s = stateRef.current;
      const dt = Math.min((time - s.lastTime) || 16, 32); // cap dt
      s.lastTime = time;
      s.frames++;

      // Physics
      const dir = s.isReversed ? -1 : 1;
      s.vel += dir * GRAVITY_FORCE * dt;
      
      if (s.vel > TERMINAL_VELOCITY) s.vel = TERMINAL_VELOCITY;
      if (s.vel < -TERMINAL_VELOCITY) s.vel = -TERMINAL_VELOCITY;

      s.y += s.vel * (dt / 16);

      // Floor/Ceiling collision
      const maxY = dim.h - GROUND_H - CHAR_SIZE;
      const minY = CEILING_H;

      if (s.y >= maxY) {
        s.y = maxY;
        s.vel = 0;
      }
      if (s.y <= minY) {
        s.y = minY;
        s.vel = 0;
      }

      // Rotation
      const targetRot = s.isReversed ? 180 : 0;
      // Smooth interpolation
      s.rot += (targetRot - s.rot) * 0.2;
      if (Math.abs(s.rot - targetRot) < 1) s.rot = targetRot;

      // Speed increases slightly over time
      s.speed = BASE_SPEED + (s.score * 0.05);

      // Move obstacles
      let passedOne = false;
      let newObs = s.obstacles.map(o => ({ ...o, x: o.x - s.speed * (dt / 16) }));
      
      // Remove offscreen
      newObs = newObs.filter(o => o.x + OBSTACLE_WIDTH > -50);

      // Spawn logic
      const lastObs = newObs[newObs.length - 1];
      const spawnRate = Math.max(50, BASE_SPAWN_RATE - s.score * 2);
      
      if (!lastObs || lastObs.x < dim.w - (spawnRate * s.speed)) {
        const type = Math.random() > 0.5 ? 'top' : 'bottom';
        // Random height between 150 and 450
        const height = Math.floor(Math.random() * 300) + 150;
        newObs.push({ x: dim.w + 50, type, height, passed: false });
      }

      // Collisions
      const pad = 8;
      const bBox = { x: 80 + pad, y: s.y + pad, w: CHAR_SIZE - pad * 2, h: CHAR_SIZE - pad * 2 };

      for (const o of newObs) {
        let oBox;
        if (o.type === 'top') {
          oBox = { x: o.x, y: CEILING_H, w: OBSTACLE_WIDTH, h: o.height };
        } else {
          oBox = { x: o.x, y: dim.h - GROUND_H - o.height, w: OBSTACLE_WIDTH, h: o.height };
        }

        const hit = bBox.x < oBox.x + oBox.w && bBox.x + bBox.w > oBox.x && 
                    bBox.y < oBox.y + oBox.h && bBox.y + bBox.h > oBox.y;

        if (hit) {
          gameOver();
          return;
        }

        if (o.x + OBSTACLE_WIDTH < bBox.x && !o.passed) {
          o.passed = true;
          s.score += 1;
          passedOne = true;
          spawnParticles(80, s.y, 10);
        }
      }

      s.obstacles = newObs;

      // Update state for rendering
      setY(s.y);
      setRot(s.rot);
      setObstacles(newObs);
      if (passedOne) setScore(s.score);
      setBgOffset(prev => prev + s.speed);

      // Trail
      setTrail(prev => {
        const newTrail = prev.map(t => ({ ...t, life: t.life - 0.05, x: t.x - s.speed })).filter(t => t.life > 0);
        if (s.frames % 4 === 0) {
          newTrail.push({ id: Math.random(), x: 80, y: s.y + CHAR_SIZE / 2, life: 1, rot: s.rot });
        }
        return newTrail;
      });

      // Particles
      setParticles(prev => prev.map(p => ({
        ...p, x: p.x + p.vx - s.speed*0.5, y: p.y + p.vy, life: p.life - 0.03
      })).filter(p => p.life > 0));

      setShakeTimer(prev => Math.max(prev - 1, 0));
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [screen, dim.h, dim.w, gameOver]);

  // ─── RENDER ───
  const shakeX = shakeTimer > 0 ? (Math.random() - 0.5) * 12 : 0;
  const shakeY = shakeTimer > 0 ? (Math.random() - 0.5) * 12 : 0;

  if (screen === 'menu') {
    return (
      <div style={{
        width: '100%', maxWidth: 480, margin: '0 auto',
        borderRadius: 24, overflow: 'hidden',
        background: `linear-gradient(180deg, ${THEMES[0].bgTop}, ${THEMES[0].bgBottom})`,
        border: `3px solid ${THEMES[0].accent}`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.6), inset 0 0 100px rgba(255,0,127,0.3)`,
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          padding: '50px 24px', textAlign: 'center', minHeight: 600,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Cyber grid background effect */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(transparent, rgba(255,0,127,0.2))',
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, ${THEMES[0].accent}20 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, ${THEMES[0].accent}20 20px)`,
            transform: 'perspective(200px) rotateX(60deg)',
            transformOrigin: 'bottom',
            zIndex: 0
          }} />

          <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 80, marginBottom: 16, animation: 'pulse 2s infinite' }}>{CHARACTERS[charIdx].emoji}</div>
            
            <h2 style={{
              fontSize: 48, fontWeight: 900, color: '#fff',
              textShadow: `0 0 20px ${THEMES[0].accent}, 0 0 40px ${THEMES[0].accent}`,
              marginBottom: 8, letterSpacing: '2px', fontStyle: 'italic'
            }}>GRAVITY DASH</h2>
            
            <p style={{ color: '#ccc', fontSize: 16, marginBottom: 40, background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: 20 }}>
              Tap or Space to flip gravity!
            </p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
              {CHARACTERS.map((c, i) => (
                <button key={i} onClick={() => setCharIdx(i)} style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: i === charIdx ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.4)',
                  border: `2px solid ${i === charIdx ? THEMES[0].accent : 'rgba(255,255,255,0.1)'}`,
                  fontSize: 28, cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: i === charIdx ? `0 0 20px ${THEMES[0].accent}` : 'none',
                  transform: i === charIdx ? 'scale(1.1)' : 'scale(1)',
                }}>{c.emoji}</button>
              ))}
            </div>

            <button onClick={startCountdown} style={{
              padding: '18px 64px', fontSize: 24, fontWeight: 900, fontStyle: 'italic',
              background: `linear-gradient(45deg, ${THEMES[0].accent}, #ff0055)`,
              border: 'none', borderRadius: 12, color: '#fff', cursor: 'pointer',
              boxShadow: `0 10px 30px ${THEMES[0].accent}80`, transition: 'transform 0.1s',
            }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >START</button>

            {highScore > 0 && (
              <div style={{ marginTop: 24, fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
                HIGH SCORE: <span style={{ color: THEMES[0].accent }}>{highScore}</span>
              </div>
            )}
          </div>
        </div>
        <style>{`@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      userSelect: 'none', width: '100%', minHeight: '80vh', justifyContent: 'center', padding: '20px 0',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* HUD */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <button onClick={() => setIsMusicOn(!isMusicOn)} style={{
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
          padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 14, fontWeight: 700
        }}>
          {isMusicOn ? '🔊 Music On' : '🔇 Music Off'}
        </button>
        {(screen === 'playing' || screen === 'paused') && (
          <button onClick={() => {
            if (screen === 'playing') setScreen('paused');
            else if (screen === 'paused') {
              setScreen('playing');
              stateRef.current.lastTime = performance.now();
            }
          }} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
            padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 14, fontWeight: 700
          }}>
            {screen === 'paused' ? '▶ Resume' : '⏸ Pause'}
          </button>
        )}
        {isMusicOn && <audio loop autoPlay src="https://cdn.pixabay.com/audio/2022/03/15/audio_249ed1ebda.mp3" />}
      </div>

      <div style={{
        width: dim.w * scale, height: dim.h * scale,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        <div style={{
          transform: `scale(${scale})`, transformOrigin: 'center center', position: 'absolute',
        }}>
          <div
            ref={areaRef}
            onMouseDown={flipGravity}
            onTouchStart={e => { e.preventDefault(); flipGravity(); }}
            style={{
              width: dim.w, height: dim.h,
              background: `linear-gradient(180deg, ${theme.bgTop}, ${theme.bgBottom})`,
              position: 'relative', overflow: 'hidden', borderRadius: 16,
              border: `2px solid ${theme.accent}`, cursor: 'pointer',
              boxShadow: `0 20px 60px rgba(0,0,0,0.6), inset 0 0 80px ${theme.glow}`,
              transform: `translate(${shakeX}px, ${shakeY}px)`,
              transition: 'background 1s ease',
            }}
          >
            {/* Grid Background */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, width: '200%',
              backgroundImage: `linear-gradient(90deg, ${theme.grid}10 1px, transparent 1px), linear-gradient(0deg, ${theme.grid}10 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              transform: `translateX(-${bgOffset % 40}px)`,
              zIndex: 0
            }} />

            {/* Score Overlay */}
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0,
              transform: 'translateY(-50%)', textAlign: 'center', zIndex: 1,
              fontSize: 160, fontWeight: 900, color: 'rgba(255,255,255,0.05)',
              pointerEvents: 'none'
            }}>{score}</div>

            <div style={{
              position: 'absolute', top: 60, left: 0, right: 0,
              textAlign: 'center', zIndex: 30, fontSize: 64, fontWeight: 900, color: '#fff',
              textShadow: `0 0 20px ${theme.glow}`, letterSpacing: '2px',
            }}>{score}</div>

            {/* Trail */}
            {trail.map(t => (
              <span key={t.id} style={{
                position: 'absolute', left: t.x - 8, top: t.y - 8, fontSize: 16,
                opacity: t.life * 0.5, zIndex: 9, pointerEvents: 'none',
                filter: `blur(${(1 - t.life) * 4}px)`,
                transform: `rotate(${t.rot}deg)`
              }}>{char.trail}</span>
            ))}

            {/* Particles */}
            {particles.map(p => (
              <span key={p.id} style={{
                position: 'absolute', left: p.x, top: p.y, fontSize: 20,
                opacity: p.life, zIndex: 35, pointerEvents: 'none',
                transform: `scale(${p.life})`,
              }}>{p.emoji}</span>
            ))}

            {/* Player */}
            <div style={{
              position: 'absolute', left: 80, top: y,
              width: CHAR_SIZE, height: CHAR_SIZE, fontSize: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `rotate(${rot}deg)`, zIndex: 20,
              filter: `drop-shadow(0 0 10px ${theme.accent})`,
            }}>
              {char.emoji}
            </div>

            {/* Obstacles */}
            {obstacles.map((o, i) => (
              <div key={i} style={{
                position: 'absolute', left: o.x,
                top: o.type === 'top' ? CEILING_H : dim.h - GROUND_H - o.height,
                width: OBSTACLE_WIDTH, height: o.height,
                background: `linear-gradient(${o.type === 'top' ? '180deg' : '0deg'}, ${theme.obstacle[0]}, ${theme.obstacle[1]})`,
                border: `2px solid ${theme.rim}`,
                borderTop: o.type === 'top' ? 'none' : undefined,
                borderBottom: o.type === 'bottom' ? 'none' : undefined,
                borderRadius: o.type === 'top' ? '0 0 8px 8px' : '8px 8px 0 0',
                boxShadow: `0 0 20px ${theme.glow}`, zIndex: 10
              }}>
                <div style={{
                  position: 'absolute', [o.type === 'top' ? 'bottom' : 'top']: -4, left: -4,
                  width: OBSTACLE_WIDTH + 4, height: 12, background: '#fff', borderRadius: 4,
                  boxShadow: `0 0 10px #fff`
                }} />
              </div>
            ))}

            {/* Ceiling */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: CEILING_H,
              background: theme.ground, borderBottom: `4px solid ${theme.grid}`, zIndex: 15,
              boxShadow: `0 0 30px ${theme.glow}`
            }}>
              <div style={{
                width: '200%', height: '100%',
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 30px, ${theme.grid}40 30px, ${theme.grid}40 60px)`,
                transform: `translateX(-${bgOffset % 60}px)`
              }} />
            </div>

            {/* Ground */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: '100%', height: GROUND_H,
              background: theme.ground, borderTop: `4px solid ${theme.grid}`, zIndex: 15,
              boxShadow: `0 0 30px ${theme.glow}`
            }}>
              <div style={{
                width: '200%', height: '100%',
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 30px, ${theme.grid}40 30px, ${theme.grid}40 60px)`,
                transform: `translateX(-${bgOffset % 60}px)`
              }} />
            </div>

            {/* Overlays */}
            {screen === 'countdown' && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.5)', zIndex: 50
              }}>
                <div style={{ fontSize: 120, fontWeight: 900, color: '#fff', textShadow: `0 0 40px ${theme.accent}`, animation: 'pulse 0.8s infinite' }}>
                  {countdown}
                </div>
              </div>
            )}

            {screen === 'paused' && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 50
              }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', letterSpacing: '4px' }}>PAUSED</div>
              </div>
            )}

            {screen === 'gameover' && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 60
              }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>💥</div>
                <h2 style={{ fontSize: 48, fontWeight: 900, color: '#fff', textShadow: '0 0 20px #ff0055', marginBottom: 24 }}>CRASHED</h2>
                
                <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
                  <div style={{ textAlign: 'center', padding: '16px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: '#fff' }}>{score}</div>
                    <div style={{ fontSize: 14, color: '#aaa', fontWeight: 700 }}>SCORE</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 16, border: `1px solid ${theme.accent}` }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: theme.accent }}>{highScore}</div>
                    <div style={{ fontSize: 14, color: '#aaa', fontWeight: 700 }}>BEST</div>
                  </div>
                </div>

                <button onClick={startCountdown} style={{
                  padding: '16px 48px', fontSize: 20, fontWeight: 900, fontStyle: 'italic',
                  background: '#fff', border: 'none', borderRadius: 12, color: '#000', cursor: 'pointer',
                  boxShadow: `0 0 30px rgba(255,255,255,0.5)`,
                }}>PLAY AGAIN</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
