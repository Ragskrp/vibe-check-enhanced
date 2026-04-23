'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── THEME WORLDS (unlock as you score) ───
const THEMES = [
  {
    name: 'Dreamy Sky',
    skyTop: '#87CEEB', skyBottom: '#dff6ff',
    ground: '#8BC34A', groundStripe: '#689F38',
    obstacle: ['#A5D6A7', '#66BB6A'], rim: '#43A047',
    glow: 'rgba(102,187,106,0.35)',
    bgLayers: [
      { items: ['☁️','☁️','☁️','🌤️'], speed: 0.3, y: [10,18,30,12], size: [40,32,36,28] },
      { items: ['🕊️','🦅'], speed: 0.6, y: [20,35], size: [22,20] },
    ],
    particles: ['✨','💫','⭐'],
    accent: '#4CAF50',
  },
  {
    name: 'Enchanted Forest',
    skyTop: '#1b5e20', skyBottom: '#a5d6a7',
    ground: '#5D4037', groundStripe: '#4E342E',
    obstacle: ['#8D6E63', '#5D4037'], rim: '#3E2723',
    glow: 'rgba(141,110,99,0.35)',
    bgLayers: [
      { items: ['🌲','🌳','🌲','🌳','🌲'], speed: 0.4, y: [55,50,60,52,58], size: [38,42,36,40,34] },
      { items: ['🦋','🌸','🍃','🌻'], speed: 0.7, y: [15,25,35,45], size: [18,16,14,20] },
    ],
    particles: ['🍃','🌸','🦋'],
    accent: '#81C784',
  },
  {
    name: 'Neon City',
    skyTop: '#0a0a1a', skyBottom: '#1a1a3e',
    ground: '#222', groundStripe: '#333',
    obstacle: ['#00d4ff', '#0060ff'], rim: '#00b0ff',
    glow: 'rgba(0,212,255,0.5)',
    bgLayers: [
      { items: ['🏢','🏙️','🏗️','🏢','🏙️'], speed: 0.35, y: [45,40,50,48,42], size: [42,48,36,40,44] },
      { items: ['💎','⚡','🔮','💜'], speed: 0.8, y: [10,20,30,15], size: [16,14,16,14] },
    ],
    particles: ['⚡','💎','💜'],
    accent: '#00d4ff',
  },
  {
    name: 'Cosmic Space',
    skyTop: '#05001a', skyBottom: '#1a0040',
    ground: '#2d0060', groundStripe: '#1a0040',
    obstacle: ['#e040fb', '#7c4dff'], rim: '#ea80fc',
    glow: 'rgba(224,64,251,0.5)',
    bgLayers: [
      { items: ['🪐','🌙','🛸','🤖'], speed: 0.25, y: [12,25,40,55], size: [36,28,30,32] },
      { items: ['⭐','✨','⭐','✨','⭐','✨'], speed: 0.5, y: [8,18,28,38,50,60], size: [10,8,12,9,11,8] },
    ],
    particles: ['🌟','💫','✨'],
    accent: '#e040fb',
  },
];

const CHARACTERS = [
  { emoji: '🐦', name: 'Birdy', trail: '✨' },
  { emoji: '🤖', name: 'Robo', trail: '⚡' },
  { emoji: '🚀', name: 'Rocket', trail: '🔥' },
  { emoji: '🦋', name: 'Flutter', trail: '🌸' },
  { emoji: '🐱', name: 'Kitty', trail: '💖' },
  { emoji: '🦄', name: 'Unicorn', trail: '🌈' },
];

// ─── PHYSICS (Refined for better "feel") ───
const GRAVITY    = 0.45;  // Increased for more weight
const JUMP       = -8.2;  // Snappier jump
const PIPE_WIDTH = 60;
const CHAR_SIZE  = 40;
const GROUND_H   = 70;
const GAP        = 185;   // Slightly tighter for precision
const PIPE_DIST  = 350;
const BASE_SPEED = 3.5;   // Smoother speed

// ─── STARS for space-like backgrounds ───
function generateStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 1,
    o: Math.random() * 0.6 + 0.4,
    d: Math.random() * 3 + 2,
  }));
}

export default function FlappyGame() {
  const [screen, setScreen] = useState('menu'); // menu | playing | gameover
  const [charIdx, setCharIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [birdY, setBirdY] = useState(250);
  const [vel, setVel] = useState(0);
  const [rot, setRot] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [groundX, setGroundX] = useState(0);
  const [bgOffset, setBgOffset] = useState(0);
  const [particles, setParticles] = useState([]);
  const [trail, setTrail] = useState([]);
  const [milestone, setMilestone] = useState(null);
  const [shakeTimer, setShakeTimer] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const areaRef = useRef(null);
  const scoreRef = useRef(0);
  const starsRef = useRef(generateStars(50));
  const frameRef = useRef(0);

  const dim = { w: 400, h: 650 };
  const themeIdx = Math.min(Math.floor(scoreRef.current / 10), THEMES.length - 1);
  const theme = THEMES[themeIdx];
  const char = CHARACTERS[charIdx];

  // ─── High score & Responsiveness ───
  useEffect(() => {
    try {
      const saved = localStorage.getItem('flappy-vibe-high');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}

    const handleResize = () => {
      if (!areaRef.current) return;
      const parent = areaRef.current.parentElement;
      const availableW = parent.clientWidth - 40;
      const availableH = window.innerHeight - 200;
      const scaleW = availableW / 400;
      const scaleH = availableH / 650;
      setScale(Math.min(scaleW, scaleH, 1.2)); // Cap scale at 1.2x
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── Start / Restart ───
  const startGame = useCallback(() => {
    setScreen('playing');
    setBirdY(dim.h / 2 - 60);
    setVel(0);
    setRot(0);
    setScore(0);
    scoreRef.current = 0;
    setPipes([{ x: dim.w + 200, topH: 180, passed: false }]);
    setParticles([]);
    setTrail([]);
    setMilestone(null);
    setShakeTimer(0);
    frameRef.current = 0;
  }, [dim.h, dim.w]);

  // ─── Flap ───
  const flap = useCallback(() => {
    if (screen === 'playing') {
      setVel(JUMP);
    } else if (screen === 'menu' || screen === 'gameover') {
      startGame();
      setVel(JUMP);
    }
  }, [screen, startGame]);

  // ─── Input handlers ───
  useEffect(() => {
    const kd = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); flap(); }
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [flap]);

  // ─── Spawn particles ───
  const spawnParticles = useCallback((x, y, count = 5) => {
    const newP = Array.from({ length: count }, () => ({
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3 - 1.5,
      life: 1,
      emoji: theme.particles[Math.floor(Math.random() * theme.particles.length)],
    }));
    setParticles(prev => [...prev.slice(-20), ...newP]);
  }, [theme.particles]);

  // ─── Game Loop ───
  useEffect(() => {
    if (screen !== 'playing') return;

    const loop = () => {
      frameRef.current++;

      // Background parallax
      setGroundX(prev => (prev - BASE_SPEED) % 48);
      setBgOffset(prev => prev + BASE_SPEED);

      // Bird physics
      setBirdY(prev => {
        const newVel = vel + GRAVITY;
        const newY = prev + newVel;
        setVel(newVel);

        // Rotation
        if (newVel < 0) setRot(-25);
        else setRot(r => Math.min(r + 3, 70));

        // Ground collision
        if (newY >= dim.h - GROUND_H - CHAR_SIZE) {
          gameOver();
          return dim.h - GROUND_H - CHAR_SIZE;
        }
        // Ceiling
        if (newY <= 0) { setVel(0); return 0; }
        return newY;
      });

      // Trail
      setTrail(prev => {
        const newTrail = prev.map(t => ({ ...t, life: t.life - 0.04 })).filter(t => t.life > 0);
        if (frameRef.current % 3 === 0) {
          newTrail.push({ id: Math.random(), x: 60, y: birdY + CHAR_SIZE / 2, life: 1 });
        }
        return newTrail.slice(-15);
      });

      // Pipes
      setPipes(prev => {
        let updated = prev.map(p => ({ ...p, x: p.x - BASE_SPEED }));

        // Spawn new pipe
        const last = updated[updated.length - 1];
        if (last && last.x < dim.w - PIPE_DIST) {
          const minH = 70;
          const maxH = dim.h - GROUND_H - GAP - minH;
          const topH = Math.floor(Math.random() * (maxH - minH) + minH);
          updated.push({ x: dim.w + 20, topH, passed: false });
        }

        // Remove offscreen
        updated = updated.filter(p => p.x + PIPE_WIDTH > -20);

        // Collision & scoring
        const pad = 7;
        const bBox = { x: 60 + pad, y: birdY + pad, w: CHAR_SIZE - pad * 2, h: CHAR_SIZE - pad * 2 };

        for (const p of updated) {
          const topBox = { x: p.x, y: 0, w: PIPE_WIDTH, h: p.topH };
          const botY = p.topH + GAP;
          const botBox = { x: p.x, y: botY, w: PIPE_WIDTH, h: dim.h - GROUND_H - botY };

          const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

          if (hit(bBox, topBox) || hit(bBox, botBox)) {
            gameOver();
            return prev;
          }

          if (p.x + PIPE_WIDTH < bBox.x && !p.passed) {
            p.passed = true;
            const newScore = scoreRef.current + 1;
            scoreRef.current = newScore;
            setScore(newScore);
            spawnParticles(60 + CHAR_SIZE, birdY, 8);

            // Milestone check
            if (newScore % 10 === 0 && newScore <= 40) {
              const nextTheme = THEMES[Math.min(Math.floor(newScore / 10), THEMES.length - 1)];
              setMilestone(nextTheme.name);
              setTimeout(() => setMilestone(null), 2500);
            }
          }
        }
        return updated;
      });

      // Particles decay
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 0.025,
      })).filter(p => p.life > 0));

      // Shake decay
      setShakeTimer(prev => Math.max(prev - 1, 0));
    };

    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  });

  const gameOver = useCallback(() => {
    setScreen('gameover');
    setShakeTimer(10);
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      try { localStorage.setItem('flappy-vibe-high', String(scoreRef.current)); } catch {}
    }
  }, [highScore]);

  // ─── Render: Background Layers ───
  const renderBgLayers = () => {
    return theme.bgLayers.map((layer, li) => (
      <div key={li} style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: '100%', zIndex: 2 + li }}>
        {layer.items.map((item, i) => {
          const totalW = dim.w * 2;
          const spacing = totalW / layer.items.length;
          const rawX = (spacing * i - bgOffset * layer.speed) % totalW;
          const x = rawX < -50 ? rawX + totalW : rawX;
          return (
            <span key={i} style={{
              position: 'absolute',
              left: x,
              top: `${layer.y[i % layer.y.length]}%`,
              fontSize: layer.size[i % layer.size.length],
              opacity: 0.7,
              filter: li === 0 ? 'blur(0.5px)' : 'none',
              transition: 'opacity 0.3s',
            }}>{item}</span>
          );
        })}
      </div>
    ));
  };

  // ─── Render: Stars (for dark themes) ───
  const renderStars = () => {
    if (themeIdx < 2) return null;
    return starsRef.current.map((s, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: s.s, height: s.s,
        borderRadius: '50%',
        background: '#fff',
        opacity: s.o * (0.5 + 0.5 * Math.sin(frameRef.current / (s.d * 10))),
        zIndex: 1,
      }} />
    ));
  };

  // ─── MENU SCREEN ───
  if (screen === 'menu') {
    return (
      <div style={{
        width: '100%', maxWidth: 400, margin: '0 auto',
        borderRadius: 24, overflow: 'hidden',
        background: `linear-gradient(180deg, ${THEMES[0].skyTop}, ${THEMES[0].skyBottom})`,
        border: '3px solid rgba(255,255,255,0.15)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{
          padding: '40px 24px', textAlign: 'center',
          minHeight: 500,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Floating bg emojis */}
          {['☁️','🌤️','🕊️','☁️'].map((e, i) => (
            <span key={i} style={{
              position: 'absolute',
              top: `${15 + i * 15}%`,
              left: `${10 + i * 22}%`,
              fontSize: 28 + i * 4,
              opacity: 0.3,
              animation: `float ${3 + i}s ease-in-out infinite alternate`,
            }}>{e}</span>
          ))}

          <div style={{ fontSize: 72, marginBottom: 8, animation: 'float 2s ease-in-out infinite alternate' }}>
            {CHARACTERS[charIdx].emoji}
          </div>
          <h2 style={{
            fontSize: 36, fontWeight: 900, color: '#fff',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            marginBottom: 4, letterSpacing: '-0.02em',
          }}>FLAPPY VIBE</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 28 }}>
            Tap to fly through 4 worlds!
          </p>

          {/* Character picker */}
          <div style={{
            display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28,
            flexWrap: 'wrap',
          }}>
            {CHARACTERS.map((c, i) => (
              <button key={i} onClick={() => setCharIdx(i)} style={{
                width: 48, height: 48, borderRadius: 14,
                background: i === charIdx
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(255,255,255,0.08)',
                border: i === charIdx
                  ? '2px solid rgba(255,255,255,0.7)'
                  : '2px solid rgba(255,255,255,0.1)',
                fontSize: 24, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
                transform: i === charIdx ? 'scale(1.15)' : 'scale(1)',
              }}>{c.emoji}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            Playing as <strong style={{ color: '#fff' }}>{CHARACTERS[charIdx].name}</strong>
          </div>

          <button onClick={startGame} style={{
            padding: '16px 48px', fontSize: 20, fontWeight: 800,
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(255,255,255,0.35)',
            borderRadius: 16, color: '#fff', cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            letterSpacing: '0.05em',
          }}
            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
          >▶ PLAY</button>

          {highScore > 0 && (
            <div style={{
              marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>🏆 Best: <strong style={{ color: '#ffe600' }}>{highScore}</strong></div>
          )}

          {/* World preview */}
          <div style={{
            marginTop: 24, display: 'flex', gap: 6, justifyContent: 'center',
          }}>
            {THEMES.map((t, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(180deg, ${t.skyTop}, ${t.skyBottom})`,
                border: '1.5px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, opacity: 0.8,
              }} title={t.name}>{t.emoji || '🌍'}</div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>
            Worlds unlock every 10 points
          </div>
        </div>

        <style>{`
          @keyframes float {
            from { transform: translateY(0px); }
            to { transform: translateY(-12px); }
          }
        `}</style>
      </div>
    );
  }

  // ─── GAME / GAMEOVER SCREEN ───
  const shakeX = shakeTimer > 0 ? (Math.random() - 0.5) * 8 : 0;
  const shakeY = shakeTimer > 0 ? (Math.random() - 0.5) * 8 : 0;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      userSelect: 'none',
      width: '100%',
      minHeight: '80vh',
      justifyContent: 'center',
      padding: '20px 0'
    }}>
      {/* Music Control */}
      <div style={{
        marginBottom: 20,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}>
        <button 
          onClick={() => setIsMusicOn(!isMusicOn)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 20,
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backdropFilter: 'blur(10px)',
          }}
        >
          {isMusicOn ? '🔊 Music On' : '🔇 Music Off'}
        </button>
        {isMusicOn && (
          <audio autoPlay loop src="https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3" />
        )}
      </div>

      <div style={{
        width: 400 * scale,
        height: 650 * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}>
        <div
          ref={areaRef}
          onClick={flap}
          style={{
            width: 400, height: 650,
            background: `linear-gradient(180deg, ${theme.skyTop}, ${theme.skyBottom})`,
            position: 'relative', overflow: 'hidden',
            borderRadius: 24,
            border: '3px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            boxShadow: `0 20px 60px rgba(0,0,0,0.4), inset 0 0 80px ${theme.glow}`,
            transform: `translate(${shakeX}px, ${shakeY}px)`,
            transition: 'background 1.5s ease',
          }}
        >
        {/* Stars */}
        {renderStars()}

        {/* Background layers */}
        {renderBgLayers()}

        {/* Score */}
        <div style={{
          position: 'absolute', top: 40, left: 0, right: 0,
          textAlign: 'center', zIndex: 30,
          fontSize: 64, fontWeight: 900,
          color: '#fff',
          textShadow: `0 4px 0 rgba(0,0,0,0.2), 0 0 30px ${theme.glow}`,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-0.03em',
        }}>
          {score}
        </div>

        {/* Current world indicator */}
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 30,
          padding: '4px 10px', borderRadius: 10,
          background: 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(8px)',
          fontSize: 11, color: 'rgba(255,255,255,0.7)',
          fontWeight: 700,
        }}>
          {theme.name}
        </div>

        {/* Milestone popup */}
        {milestone && (
          <div style={{
            position: 'absolute', top: '30%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
            textAlign: 'center',
            animation: 'milestoneIn 0.5s ease-out',
          }}>
            <div style={{
              padding: '16px 28px', borderRadius: 20,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255,255,255,0.2)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🌍</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>World Unlocked!</div>
              <div style={{ fontSize: 13, color: theme.accent, fontWeight: 700 }}>{milestone}</div>
            </div>
          </div>
        )}

        {/* Trail */}
        {trail.map(t => (
          <span key={t.id} style={{
            position: 'absolute',
            left: t.x - 6,
            top: t.y - 6,
            fontSize: 12,
            opacity: t.life * 0.6,
            zIndex: 9,
            pointerEvents: 'none',
            filter: `blur(${(1 - t.life) * 2}px)`,
          }}>{char.trail}</span>
        ))}

        {/* Particles */}
        {particles.map(p => (
          <span key={p.id} style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            fontSize: 16,
            opacity: p.life,
            zIndex: 35,
            pointerEvents: 'none',
            transform: `scale(${p.life})`,
          }}>{p.emoji}</span>
        ))}

        {/* Bird / Character */}
        <div style={{
          position: 'absolute',
          left: 60,
          top: birdY,
          width: CHAR_SIZE, height: CHAR_SIZE,
          fontSize: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `rotate(${rot}deg)`,
          zIndex: 20,
          filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
          transition: 'transform 0.08s ease-out',
        }}>
          {char.emoji}
        </div>

        {/* Pipes / Obstacles */}
        {pipes.map((p, i) => {
          const botY = p.topH + GAP;
          return (
            <div key={i} style={{ zIndex: 10 }}>
              {/* Top obstacle */}
              <div style={{
                position: 'absolute', left: p.x, top: 0,
                width: PIPE_WIDTH, height: p.topH,
                background: `linear-gradient(180deg, ${theme.obstacle[0]}, ${theme.obstacle[1]})`,
                borderRadius: '0 0 8px 8px',
                boxShadow: `inset -6px 0 12px rgba(0,0,0,0.15), 4px 0 16px ${theme.glow}`,
              }}>
                {/* Rim */}
                <div style={{
                  position: 'absolute', bottom: -2, left: -5,
                  width: PIPE_WIDTH + 10, height: 20,
                  background: `linear-gradient(180deg, ${theme.obstacle[0]}, ${theme.rim})`,
                  borderRadius: 6,
                  boxShadow: `0 4px 8px ${theme.glow}`,
                }} />
              </div>
              {/* Bottom obstacle */}
              <div style={{
                position: 'absolute', left: p.x, top: botY,
                width: PIPE_WIDTH, height: dim.h - GROUND_H - botY,
                background: `linear-gradient(180deg, ${theme.obstacle[1]}, ${theme.obstacle[0]})`,
                borderRadius: '8px 8px 0 0',
                boxShadow: `inset -6px 0 12px rgba(0,0,0,0.15), 4px 0 16px ${theme.glow}`,
              }}>
                <div style={{
                  position: 'absolute', top: -2, left: -5,
                  width: PIPE_WIDTH + 10, height: 20,
                  background: `linear-gradient(180deg, ${theme.rim}, ${theme.obstacle[1]})`,
                  borderRadius: 6,
                  boxShadow: `0 -4px 8px ${theme.glow}`,
                }} />
              </div>
            </div>
          );
        })}

        {/* Ground */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '100%', height: GROUND_H,
          background: theme.ground,
          borderTop: `3px solid ${theme.groundStripe}`,
          zIndex: 15,
        }}>
          <div style={{
            width: '200%', height: 12,
            backgroundImage: `repeating-linear-gradient(90deg, ${theme.groundStripe}, ${theme.groundStripe} 24px, ${theme.ground} 24px, ${theme.ground} 48px)`,
            position: 'absolute', top: 0,
            left: groundX,
          }} />
        </div>

        {/* GAMEOVER Overlay */}
        {screen === 'gameover' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 60,
            animation: 'fadeIn 0.3s ease-out',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              border: '2px solid rgba(255,255,255,0.15)',
              borderRadius: 24, padding: '32px 40px',
              textAlign: 'center',
              boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
              maxWidth: 300, width: '85%',
            }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>
                {score >= 40 ? '🏆' : score >= 20 ? '🌟' : score >= 10 ? '⭐' : '💫'}
              </div>
              <h2 style={{
                color: '#fff', fontSize: 28, fontWeight: 900,
                marginBottom: 16,
              }}>
                {score >= 40 ? 'LEGENDARY!' : score >= 20 ? 'AMAZING!' : score >= 10 ? 'GREAT!' : 'GAME OVER'}
              </h2>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 12, marginBottom: 24,
              }}>
                <div style={{
                  padding: '12px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>{score}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>SCORE</div>
                </div>
                <div style={{
                  padding: '12px', borderRadius: 14,
                  background: 'rgba(255,230,0,0.06)',
                  border: '1px solid rgba(255,230,0,0.15)',
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#ffe600' }}>{highScore}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>BEST</div>
                </div>
              </div>

              {/* World reached */}
              <div style={{
                padding: '8px 14px', borderRadius: 12,
                background: `linear-gradient(135deg, ${theme.skyTop}40, ${theme.skyBottom}40)`,
                border: `1px solid ${theme.accent}30`,
                marginBottom: 20,
                fontSize: 12, color: theme.accent, fontWeight: 700,
              }}>
                🌍 Reached: {theme.name}
              </div>

              <button onClick={() => { startGame(); setVel(JUMP); }} style={{
                width: '100%', padding: '14px',
                fontSize: 18, fontWeight: 800,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255,255,255,0.25)',
                borderRadius: 14, color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.05em',
              }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              >🔄 PLAY AGAIN</button>
            </div>
          </div>
        )}

        {/* Tap hint at start */}
        {screen === 'playing' && score === 0 && pipes.length > 0 && pipes[0].x > dim.w - 50 && (
          <div style={{
            position: 'absolute', top: '55%', left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center', zIndex: 40,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>👆</div>
            <div style={{
              fontSize: 14, fontWeight: 700,
              color: 'rgba(255,255,255,0.8)',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}>Tap to fly!</div>
          </div>
        )}
      </div>
    </div>
  </div>

  <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.9); }
        }
        @keyframes milestoneIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
