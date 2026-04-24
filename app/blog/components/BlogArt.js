'use client';

import { HelpCircle, Brain, Target, Layers, Zap, Network, Dice3, Sparkles, Users, Type, Image, Lock, Cpu, Lightbulb, Volume2 } from 'lucide-react';

export default function BlogArt({ type, src }) {
  const containerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  switch (type) {
    case 'spacing-effect-memory':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #0a2e1d, #030a06)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute' }}>
            <defs>
              <filter id="glowGreen"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {[...Array(12)].map((_, i) => (
              <circle key={i} cx={100 + i * 55} cy={200 + Math.sin(i) * 50} r={i % 3 === 0 ? 12 : 6} fill="#00ff94" filter="url(#glowGreen)" opacity={(i / 12) + 0.2}>
                <animate attributeName="r" values={(i % 3 === 0 ? "12" : "6") + ";" + (i % 3 === 0 ? "16" : "3") + ";" + (i % 3 === 0 ? "12" : "6")} dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <path d="M 100 200 Q 250 250 430 150 T 760 200" fill="none" stroke="rgba(0,255,148,0.3)" strokeWidth="4" strokeDasharray="10 15">
              <animate attributeName="stroke-dashoffset" values="100;0" dur="4s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      );

    case 'socratic-method-discovery':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #001f3f, #000408)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            <defs>
               <filter id="glowBlue"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <circle cx="400" cy="200" r="100" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="2" />
            <circle cx="400" cy="200" r="150" fill="none" stroke="rgba(0,212,255,0.05)" strokeWidth="1" strokeDasharray="5 10">
              <animateTransform attributeName="transform" type="rotate" from="0 400 200" to="360 400 200" dur="30s" repeatCount="indefinite" />
            </circle>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              return (
                <line key={i} x1="400" y1="200" x2={400 + Math.cos(angle) * 100} y2={200 + Math.sin(angle) * 100} stroke="#00d4ff" strokeWidth="2" opacity="0.3" />
              );
            })}
          </svg>
          <HelpCircle size={100} color="#00d4ff" style={{ position: 'absolute', filter: 'drop-shadow(0 0 20px #00d4ff)' }} />
        </div>
      );

    case 'probabilistic-decisions':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #09121a, #020406)' }}>
           <svg width="100%" height="100%" viewBox="0 0 800 400">
             <defs>
                <linearGradient id="diceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#00bfff" stopOpacity="0.8" />
                   <stop offset="100%" stopColor="#ff2d78" stopOpacity="0.3" />
                </linearGradient>
             </defs>
             {[...Array(6)].map((_, i) => (
               <rect key={i} x={150 + i * 100} y={150 + (i % 2 === 0 ? 30 : -30)} width="60" height="60" rx="10" fill="url(#diceGrad)" transform={`rotate(${15 * i} ${150 + i * 100} 150)`}>
                 <animateTransform attributeName="transform" type="translate" values={`0,0; 0,${i % 2 === 0 ? -15 : 15}; 0,0`} dur={`${2 + i}s`} repeatCount="indefinite" />
               </rect>
             ))}
           </svg>
           <Network size={60} color="#fff" strokeWidth={1} style={{ position: 'absolute', mixBlendMode: 'overlay', opacity: 0.5 }} />
        </div>
      );

    case 'philosophy-for-children':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #2b1703, #080401)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <circle cx="350" cy="200" r="80" fill="none" stroke="#ff8c00" strokeWidth="3" opacity="0.6">
                <animateTransform attributeName="transform" type="scale" values="1; 1.1; 1" dur="4s" repeatCount="indefinite" />
             </circle>
             <circle cx="450" cy="200" r="80" fill="none" stroke="#ff2d78" strokeWidth="3" opacity="0.6">
                <animateTransform attributeName="transform" type="scale" values="1.1; 1; 1.1" dur="4s" repeatCount="indefinite" />
             </circle>
             <path d="M400 130 L470 260 L330 260 Z" fill="rgba(255, 140, 0, 0.2)" stroke="#ffd700" strokeWidth="2" filter="drop-shadow(0 0 10px #ff8c00)">
                <animateTransform attributeName="transform" type="rotate" from="0 400 216" to="360 400 216" dur="20s" repeatCount="indefinite" />
             </path>
          </svg>
        </div>
      );

    case 'metacognition-thinking':
      return (
        <div style={{ ...containerStyle, background: 'linear-gradient(to top, #160824, #04010a)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(177, 74, 237, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)">
              <animate attributeName="y" values="0;40" dur="2s" repeatCount="indefinite" />
            </rect>
            <circle cx="400" cy="200" r="80" fill="none" stroke="#b14aed" strokeWidth="2" strokeDasharray="15 15">
              <animateTransform attributeName="transform" type="rotate" from="360 400 200" to="0 400 200" dur="15s" repeatCount="indefinite" />
            </circle>
          </svg>
          <Brain size={80} color="#b14aed" style={{ position: 'absolute', filter: 'drop-shadow(0 0 25px rgba(177,74,237,0.8))' }} />
        </div>
      );

    case 'logical-reasoning-logic':
      return (
        <div style={{ ...containerStyle, background: '#020d0f' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <defs>
               <polygon id="hex" points="30,0 60,15 60,45 30,60 0,45 0,15" fill="none" stroke="#00d4ff" strokeWidth="2" opacity="0.3"/>
             </defs>
             {[...Array(6)].map((_, r) => (
                [...Array(12)].map((_, c) => (
                  <use key={`${r}-${c}`} href="#hex" x={c * 60 + (r % 2 === 0 ? 0 : 30) - 20} y={r * 45 + 50} opacity={Math.random() * 0.8 + 0.1}>
                    <animate attributeName="opacity" values="0.1; 0.8; 0.1" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
                  </use>
                ))
             ))}
          </svg>
        </div>
      );

    case 'executive-function-control':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #1b0a11, #060204)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            {[...Array(5)].map((_, i) => (
              <circle key={i} cx="400" cy="200" r={40 + i * 30} fill="none" stroke="#ff2d78" strokeWidth={i === 2 ? 3 : 1} opacity={(5 - i) * 0.15}>
                 <animate attributeName="r" values={`${40 + i * 30}; ${45 + i * 30}; ${40 + i * 30}`} dur={`${1 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <line x1="400" y1="50" x2="400" y2="350" stroke="#ff2d78" opacity="0.4" />
            <line x1="250" y1="200" x2="550" y2="200" stroke="#ff2d78" opacity="0.4" />
          </svg>
          <Target size={60} color="#ff2d78" style={{ position: 'absolute', filter: 'drop-shadow(0 0 15px #ff2d78)' }} />
        </div>
      );

    case 'cognitive-load-mastery':
      return (
        <div style={{ ...containerStyle, background: 'linear-gradient(135deg, #1a0b1d, #000)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            {/* Chaotic left side */}
            {[...Array(8)].map((_, i) => (
              <rect key={`c-${i}`} x={100 + Math.random() * 150} y={100 + Math.random() * 200} width="30" height="30" fill="rgba(255, 45, 120, 0.2)" stroke="#ff2d78" transform={`rotate(${Math.random() * 90} ${150} ${200})`} />
            ))}
            {/* Organized right side */}
            {[...Array(3)].map((_, r) => (
              [...Array(3)].map((_, c) => (
                <rect key={`o-${r}-${c}`} x={500 + c * 40} y={120 + r * 40} width="30" height="30" fill="rgba(0, 212, 255, 0.4)" stroke="#00d4ff" rx="4" />
              ))
            ))}
            {/* Arrow connecting them */}
            <path d="M 350 200 L 450 200 M 430 180 L 450 200 L 430 220" fill="none" stroke="#fff" strokeWidth="4" opacity="0.5">
               <animate attributeName="d" values="M 350 200 L 430 200 M 410 180 L 430 200 L 410 220; M 350 200 L 470 200 M 450 180 L 470 200 L 450 220" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      );

    case 'aha-moment-science':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #1e2402, #040500)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <defs>
               <filter id="glowYellow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
             </defs>
             {[...Array(12)].map((_, i) => {
               const angle = (i / 12) * Math.PI * 2;
               return (
                 <line key={i} x1={400 + Math.cos(angle) * 40} y1={200 + Math.sin(angle) * 40} x2={400 + Math.cos(angle) * 150} y2={200 + Math.sin(angle) * 150} stroke="#ffe600" strokeWidth="3" filter="url(#glowYellow)" strokeDasharray="10 20">
                    <animate attributeName="stroke-dashoffset" values="30; 0" dur="1s" repeatCount="indefinite" />
                 </line>
               );
             })}
          </svg>
          <Sparkles size={80} color="#ffe600" fill="#ffe600" style={{ position: 'absolute', filter: 'drop-shadow(0 0 30px #ffe600)' }} />
        </div>
      );

    case 'history-of-word-games':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #1a140a, #050402)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            <defs>
              <filter id="stoneGlow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <g transform="translate(300, 50)" style={{ filter: 'url(#stoneGlow)' }}>
              {['SATOR', 'AREPO', 'TENET', 'OPERA', 'ROTAS'].map((word, r) => (
                word.split('').map((char, c) => (
                  <text key={`${r}-${c}`} x={c * 40} y={r * 60} fill="#ffd700" fontSize="32" fontWeight="bold" opacity="0.6" style={{ fontFamily: 'serif' }}>
                    {char}
                    <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur={`${3 + Math.random() * 2}s`} repeatCount="indefinite" />
                  </text>
                ))
              ))}
            </g>
            <path d="M 280 40 L 480 40 L 480 320 L 280 320 Z" fill="none" stroke="rgba(255, 215, 0, 0.1)" strokeWidth="1" />
          </svg>
        </div>
      );

    case 'chess-visual-logic':
      return (
        <div style={{ ...containerStyle, background: '#050b14' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none">
            <g transform="translate(400, 200) scale(1, 0.4) rotate(45) translate(-400, -200)">
              {[...Array(11)].map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 80} x2="800" y2={i * 80} stroke="rgba(0, 212, 255, 0.3)" strokeWidth="2" />
              ))}
              {[...Array(11)].map((_, i) => (
                <line key={`v-${i}`} x1={i * 80} y1="0" x2={i * 80} y2="800" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="2" />
              ))}
              {/* Highlight path */}
              <path d="M 320 320 L 480 320 L 480 160" fill="none" stroke="#00ff94" strokeWidth="8" filter="drop-shadow(0 0 10px #00ff94)">
                 <animate attributeName="stroke-dasharray" values="0 1000; 1000 0" dur="4s" repeatCount="indefinite" />
              </path>
            </g>
          </svg>
        </div>
      );

    case 'multiplayer-social':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            <defs>
              <filter id="nodeGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {[...Array(15)].map((_, i) => (
              <circle key={i} cx={100 + Math.random() * 600} cy={50 + Math.random() * 300} r="4" fill="#00ff94" filter="url(#nodeGlow)">
                <animate attributeName="opacity" values="0.2; 1; 0.2" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {[...Array(20)].map((_, i) => (
              <line key={i} x1={Math.random() * 800} y1={Math.random() * 400} x2={Math.random() * 800} y2={Math.random() * 400} stroke="#00ff94" strokeWidth="1" opacity="0.1" />
            ))}
          </svg>
          <Users size={60} color="#00ff94" style={{ position: 'absolute', filter: 'drop-shadow(0 0 15px #00ff94)' }} />
        </div>
      );

    case 'logical-reasoning-logic':
      return (
        <div style={{ ...containerStyle, background: '#0a0a0a' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            <path d="M 400 50 L 450 150 L 350 150 Z" fill="none" stroke="#00d4ff" strokeWidth="2" opacity="0.5" />
            <path d="M 400 350 L 450 250 L 350 250 Z" fill="none" stroke="#00ff94" strokeWidth="2" opacity="0.5" />
            <line x1="400" y1="150" x2="400" y2="250" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" />
            <circle cx="400" cy="200" r="30" fill="none" stroke="#ffd700" strokeWidth="2">
               <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );

    case 'metacognition-thinking':
      return (
        <div style={{ ...containerStyle, background: 'linear-gradient(to bottom, #050208, #000)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <circle cx="400" cy="200" r="80" fill="none" stroke="#b14aed" strokeWidth="1" opacity="0.3" />
             <circle cx="400" cy="200" r="120" fill="none" stroke="#b14aed" strokeWidth="0.5" opacity="0.1" />
             <path d="M 380 200 Q 400 150 420 200 Q 400 250 380 200 Z" fill="#b14aed" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
             </path>
          </svg>
        </div>
      );

    case 'philosophy-for-children':
      return (
        <div style={{ ...containerStyle, background: '#1a0f05' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(6)].map((_, i) => (
               <g key={i} transform={`rotate(${i * 60}, 400, 200)`}>
                 <path d="M 400 200 L 450 150 L 500 200 L 450 250 Z" fill="#ff8c00" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.4;0.1" dur={`${2 + i}s`} repeatCount="indefinite" />
                 </path>
               </g>
             ))}
          </svg>
        </div>
      );

    case 'probabilistic-decisions':
      return (
        <div style={{ ...containerStyle, background: '#050a14' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(30)].map((_, i) => (
               <rect key={i} x={100 + i * 20} y={350 - Math.random() * 200} width="15" height={Math.random() * 200} fill="#00d4ff" opacity="0.3">
                  <animate attributeName="height" values="50;200;50" dur={`${3 + Math.random() * 2}s`} repeatCount="indefinite" />
               </rect>
             ))}
          </svg>
        </div>
      );

    case 'science-of-brain-games':
      return (
        <div style={{ ...containerStyle, background: '#051414' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <path d="M 300 200 Q 400 100 500 200 T 700 200" fill="none" stroke="#00ff94" strokeWidth="2" opacity="0.5">
                <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="5s" repeatCount="indefinite" />
             </path>
             <circle cx="400" cy="200" r="100" fill="none" stroke="#00d4ff" strokeWidth="1" strokeDasharray="10,5" />
          </svg>
        </div>
      );

    case 'screen-time-vs-game-time':
      return (
        <div style={{ ...containerStyle, background: '#140505' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <rect x="250" y="100" width="300" height="200" rx="20" fill="none" stroke="#ff2d78" strokeWidth="2" />
             <path d="M 300 150 L 300 250 L 500 200 Z" fill="#ff2d78" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
             </path>
          </svg>
        </div>
      );

    case 'spacing-effect-memory':
      return (
        <div style={{ ...containerStyle, background: '#051405' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <path d="M 100 300 Q 200 100 300 300 Q 400 100 500 300 Q 600 100 700 300" fill="none" stroke="#00ff94" strokeWidth="2" />
             {[100, 300, 500, 700].map((x, i) => (
               <circle key={i} cx={x} cy="300" r="10" fill="#00ff94">
                  <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
               </circle>
             ))}
          </svg>
        </div>
      );

    case 'zeigarnik-effect':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #1a050d, #050103)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(5)].map((_, i) => (
               <path key={i} d={`M ${200 + i * 100} 200 A 40 40 0 1 1 ${280 + i * 100} 200`} fill="none" stroke="#ff2d78" strokeWidth="3" opacity={0.2 + i * 0.15}>
                  <animate attributeName="stroke-dasharray" values="0,300;300,0" dur={`${3 + i}s`} repeatCount="indefinite" />
               </path>
             ))}
             <circle cx="700" cy="200" r="10" fill="#ff2d78" filter="blur(2px)">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
             </circle>
          </svg>
        </div>
      );

    case 'retrieval-practice':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <circle cx="200" cy="200" r="10" fill="#00ff94" />
             <circle cx="600" cy="200" r="10" fill="#00ff94" />
             <path d="M 200 200 Q 400 100 600 200" fill="none" stroke="#00ff94" strokeWidth="2" opacity="0.1" />
             <path d="M 200 200 Q 400 100 600 200" fill="none" stroke="#00ff94" strokeWidth="3" strokeDasharray="10,10">
                <animate attributeName="stroke-dashoffset" values="0;-100" dur="2s" repeatCount="indefinite" />
             </path>
          </svg>
        </div>
      );

    case 'interleaving-strategy':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #141405, #050501)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(24)].map((_, i) => {
               const colors = ['#ffd700', '#00ff94', '#00d4ff', '#ff2d78'];
               const shapes = ['rect', 'circle', 'path'];
               const color = colors[i % colors.length];
               const shape = shapes[i % shapes.length];
               const x = 100 + (i % 6) * 100;
               const y = 50 + Math.floor(i / 6) * 80;
               
               if (shape === 'rect') return <rect key={i} x={x} y={y} width="30" height="30" fill={color} opacity="0.4"><animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2+i*0.1}s`} repeatCount="indefinite" /></rect>;
               if (shape === 'circle') return <circle key={i} cx={x+15} cy={y+15} r="15" fill={color} opacity="0.4"><animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2+i*0.1}s`} repeatCount="indefinite" /></circle>;
               return <path key={i} d={`M ${x} ${y+30} L ${x+15} ${y} L ${x+30} ${y+30} Z`} fill={color} opacity="0.4"><animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2+i*0.1}s`} repeatCount="indefinite" /></path>;
             })}
          </svg>
        </div>
      );

    case 'dual-coding-theory':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #050a14, #010205)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <line x1="400" y1="50" x2="400" y2="350" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
             <g transform="translate(150, 150)">
                <Type size={100} color="#00d4ff" opacity="0.4" />
                <text x="0" y="140" fill="#00d4ff" fontSize="20" fontWeight="bold">VERBAL</text>
             </g>
             <g transform="translate(550, 150)">
                <Image size={100} color="#00ff94" opacity="0.4" />
                <text x="0" y="140" fill="#00ff94" fontSize="20" fontWeight="bold">VISUAL</text>
             </g>
             <path d="M 300 200 Q 400 150 500 200" fill="none" stroke="#fff" strokeWidth="2" opacity="0.2">
                <animate attributeName="stroke-dasharray" values="0,300;300,0" dur="3s" repeatCount="indefinite" />
             </path>
          </svg>
        </div>
      );

    case 'dunning-kruger-effect':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #141405, #050501)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <path d="M 100 350 L 250 100 L 450 300 L 700 150" fill="none" stroke="#ffd700" strokeWidth="3" opacity="0.4" />
             <circle cx="250" cy="100" r="8" fill="#ffd700">
                <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
             </circle>
             <text x="260" y="90" fill="#ffd700" fontSize="12">MOUNT OVERCONFIDENCE</text>
             <text x="400" y="320" fill="#ff2d78" fontSize="12">VALLEY OF DESPAIR</text>
          </svg>
        </div>
      );

    case 'growth-mindset':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(6)].map((_, i) => (
               <circle key={i} cx="400" cy="200" r="20 + i * 40" fill="none" stroke="#00ff94" strokeWidth="1" opacity={0.5 - i * 0.08}>
                  <animate attributeName="r" values={`${20 + i * 40}; ${60 + i * 40}; ${20 + i * 40}`} dur="4s" repeatCount="indefinite" />
               </circle>
             ))}
             <Sparkles size={40} color="#00ff94" style={{ position: 'absolute', opacity: 0.6 }} />
          </svg>
        </div>
      );

    case 'history-of-the-abacus':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #140d05, #050301)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(5)].map((_, i) => (
               <g key={i}>
                 <line x1="100" y1={100 + i * 50} x2="700" y2={100 + i * 50} stroke="rgba(255,215,0,0.2)" strokeWidth="4" />
                 {[...Array(10)].map((_, j) => (
                   <circle key={j} cx={150 + j * 50} cy={100 + i * 50} r="12" fill="#ffd700" opacity="0.6">
                      <animate attributeName="cx" values={`${150 + j * 50}; ${170 + j * 50}; ${150 + j * 50}`} dur={`${2 + j * 0.2}s`} repeatCount="indefinite" />
                   </circle>
                 ))}
               </g>
             ))}
          </svg>
        </div>
      );

    case 'neuroplasticity':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #1a050d, #050103)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(15)].map((_, i) => {
               const x = 100 + Math.random() * 600;
               const y = 50 + Math.random() * 300;
               return <circle key={i} cx={x} cy={y} r="4" fill="#ff2d78" opacity="0.6">
                 <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
               </circle>;
             })}
             {[...Array(20)].map((_, i) => {
                const x1 = 100 + Math.random() * 600;
                const y1 = 50 + Math.random() * 300;
                const x2 = 100 + Math.random() * 600;
                const y2 = 50 + Math.random() * 300;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff2d78" strokeWidth="1" opacity="0.1">
                   <animate attributeName="opacity" values="0.05;0.2;0.05" dur={`${3 + Math.random() * 4}s`} repeatCount="indefinite" />
                </line>;
             })}
          </svg>
        </div>
      );

    case 'psychology-of-flow':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #050a14, #010205)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(3)].map((_, i) => (
               <path key={i} d={`M 0 ${150 + i * 50} Q 200 ${100 + i * 50}, 400 ${150 + i * 50} T 800 ${150 + i * 50}`} fill="none" stroke="#00d4ff" strokeWidth="2" opacity={0.3 + i * 0.2}>
                  <animate attributeName="d" values={`M 0 ${150 + i * 50} Q 200 ${100 + i * 50}, 400 ${150 + i * 50} T 800 ${150 + i * 50}; M 0 ${150 + i * 50} Q 200 ${200 + i * 50}, 400 ${150 + i * 50} T 800 ${150 + i * 50}; M 0 ${150 + i * 50} Q 200 ${100 + i * 50}, 400 ${150 + i * 50} T 800 ${150 + i * 50}`} dur={`${3 + i}s`} repeatCount="indefinite" />
               </path>
             ))}
          </svg>
        </div>
      );

    case 'decision-fatigue':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #1a050d, #050103)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <rect x="300" y="150" width="200" height="100" rx="10" fill="none" stroke="#ff2d78" strokeWidth="4" />
             <rect x="500" y="180" width="20" height="40" rx="5" fill="#ff2d78" />
             <rect x="310" y="160" width="180" height="80" rx="5" fill="#ff2d78" opacity="0.2">
                <animate attributeName="width" values="180;20;180" dur="4s" repeatCount="indefinite" />
             </rect>
          </svg>
        </div>
      );

    case 'art-of-mnemonics':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <path d="M 400 100 L 200 200 L 200 350 L 600 350 L 600 200 Z" fill="none" stroke="#00ff94" strokeWidth="2" opacity="0.3" />
             {[...Array(6)].map((_, i) => (
               <rect key={i} x={250 + (i % 3) * 120} y={220 + Math.floor(i / 3) * 60} width="60" height="40" fill="none" stroke="#00ff94" strokeWidth="2">
                  <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
               </rect>
             ))}
             <Sparkles size={30} color="#00ff94" x="385" y="120" style={{ position: 'absolute' }} />
          </svg>
        </div>
      );

    case 'sleep-and-memory':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #050a14, #010205)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <circle cx="400" cy="200" r="80" fill="none" stroke="#00d4ff" strokeWidth="2" opacity="0.3" />
             <path d="M 400 120 A 80 80 0 1 0 400 280 A 60 60 0 1 1 400 120" fill="#00d4ff" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
             </path>
             {[...Array(12)].map((_, i) => (
               <circle key={i} cx={Math.random() * 800} cy={Math.random() * 400} r="2" fill="#fff" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
               </circle>
             ))}
          </svg>
        </div>
      );

    case 'cognitive-biases':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #141405, #050501)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(10)].map((_, i) => (
               <line key={i} x1="100" y1={50 + i * 35} x2="700" y2={50 + i * 35} stroke="#ffd700" strokeWidth="1" opacity="0.2">
                  <animate attributeName="y2" values={`${50 + i * 35}; ${100 + i * 35}; ${50 + i * 35}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
               </line>
             ))}
             <circle cx="400" cy="200" r="100" fill="none" stroke="#ffd700" strokeWidth="2" opacity="0.4" />
          </svg>
        </div>
      );

    case 'evolution-of-puzzles':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(9)].map((_, i) => (
               <rect key={i} x={300 + (i % 3) * 70} y={100 + Math.floor(i / 3) * 70} width="60" height="60" rx="4" fill="none" stroke="#00ff94" strokeWidth="2" opacity="0.5">
                  <animate attributeName="x" values={`${300 + (i % 3) * 70}; ${305 + (i % 3) * 70}; ${300 + (i % 3) * 70}`} dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
               </rect>
             ))}
          </svg>
        </div>
      );

    case 'science-of-reading':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #1a050d, #050103)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(20)].map((_, i) => (
               <rect key={i} x={100 + (i % 5) * 120} y={80 + Math.floor(i / 5) * 60} width="80" height="10" rx="2" fill="#ff2d78" opacity="0.3">
                  <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${1 + i * 0.2}s`} repeatCount="indefinite" />
               </rect>
             ))}
             <BookOpen size={40} color="#ff2d78" x="380" y="320" style={{ position: 'absolute' }} />
          </svg>
        </div>
      );

    case 'mathematics-in-nature':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <path d="M 400 200 m -100 0 a 100 100 0 1 0 200 0 a 100 100 0 1 0 -200 0" fill="none" stroke="#00ff94" strokeWidth="1" opacity="0.2" />
             <path d="M 400 200 Q 400 100, 500 100 T 600 200 T 400 400 T 0 200" fill="none" stroke="#00ff94" strokeWidth="2">
                <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="5s" repeatCount="indefinite" />
             </path>
             {[...Array(20)].map((_, i) => (
               <circle key={i} cx="400" cy="200" r={i * 10} fill="none" stroke="#00ff94" strokeWidth="0.5" opacity={0.3 - i * 0.015} />
             ))}
          </svg>
        </div>
      );

    case 'turing-test':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #050a14, #010205)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <rect x="150" y="100" width="200" height="150" rx="10" fill="none" stroke="#00d4ff" strokeWidth="2" />
             <rect x="450" y="100" width="200" height="150" rx="10" fill="none" stroke="#ff2d78" strokeWidth="2" />
             <line x1="350" y1="175" x2="450" y2="175" stroke="#fff" strokeWidth="1" opacity="0.2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="50" dur="2s" repeatCount="indefinite" />
             </line>
             <circle cx="250" cy="175" r="30" fill="#00d4ff" opacity="0.2">
                <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" />
             </circle>
             <path d="M 520 175 L 580 175" stroke="#ff2d78" strokeWidth="4" opacity="0.6" />
          </svg>
        </div>
      );

    case 'cyberpsychology':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #1a050d, #050103)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <rect x="350" y="50" width="100" height="200" rx="15" fill="none" stroke="#ff2d78" strokeWidth="2" />
             {[...Array(5)].map((_, i) => (
               <path key={i} d={`M 350 ${100 + i * 30} L 450 ${100 + i * 30}`} stroke="#ff2d78" strokeWidth="1" opacity="0.2">
                  <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${1 + i * 0.2}s`} repeatCount="indefinite" />
               </path>
             ))}
             <circle cx="400" cy="300" r="40" fill="none" stroke="#ff2d78" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="40;100" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0" dur="3s" repeatCount="indefinite" />
             </circle>
          </svg>
        </div>
      );

    case 'the-mozart-effect':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #141405, #050501)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(8)].map((_, i) => (
               <path key={i} d={`M ${100 + i * 80} 300 Q ${140 + i * 80} ${100 + i * 20}, ${180 + i * 80} 300`} fill="none" stroke="#ffd700" strokeWidth="2" opacity="0.4">
                  <animate attributeName="d" values={`M ${100 + i * 80} 300 Q ${140 + i * 80} ${100 + i * 20}, ${180 + i * 80} 300; M ${100 + i * 80} 300 Q ${140 + i * 80} ${300 - i * 20}, ${180 + i * 80} 300; M ${100 + i * 80} 300 Q ${140 + i * 80} ${100 + i * 20}, ${180 + i * 80} 300`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
               </path>
             ))}
             <Volume2 size={40} color="#ffd700" x="380" y="320" style={{ position: 'absolute' }} />
          </svg>
        </div>
      );

    case 'gamification-of-life':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <rect x="250" y="150" width="300" height="100" rx="20" fill="none" stroke="#00ff94" strokeWidth="4" />
             <rect x="270" y="220" width="260" height="10" rx="5" fill="none" stroke="#00ff94" strokeWidth="1" />
             <rect x="270" y="220" width="0" height="10" rx="5" fill="#00ff94">
                <animate attributeName="width" values="0;260;260" dur="4s" repeatCount="indefinite" />
             </rect>
             <circle cx="300" cy="190" r="15" fill="#00ff94" opacity="0.4" />
             <path d="M 450 180 L 500 180 M 475 160 L 475 200" stroke="#00ff94" strokeWidth="4" />
          </svg>
        </div>
      );

    case 'psychology-of-color':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #111, #000)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(6)].map((_, i) => (
               <rect key={i} x={100 + i * 100} y="50" width="80" height="300" rx="10" fill={['#ff2d78', '#00d4ff', '#00ff94', '#ffd700', '#ff8c00', '#8a2be2'][i]} opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
               </rect>
             ))}
          </svg>
        </div>
      );

    case 'gamification-in-healthcare':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <path d="M 400 250 C 400 250, 350 200, 350 150 A 50 50 0 1 1 450 150 A 50 50 0 1 1 400 250" fill="none" stroke="#ff2d78" strokeWidth="4">
                <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
                <animate attributeName="transform" attributeType="XML" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite" additive="sum" />
             </path>
             <rect x="200" y="300" width="400" height="40" rx="10" fill="none" stroke="#00ff94" strokeWidth="2" />
             <path d="M 220 320 L 580 320" stroke="#00ff94" strokeWidth="2" strokeDasharray="10,5">
                <animate attributeName="stroke-dashoffset" from="0" to="100" dur="5s" repeatCount="indefinite" />
             </path>
          </svg>
        </div>
      );

    case 'history-of-cryptography':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #141405, #050501)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(3)].map((_, i) => (
               <g key={i} transform={`translate(${250 + i * 150}, 200)`}>
                  <circle r="60" fill="none" stroke="#ffd700" strokeWidth="2" opacity="0.4" />
                  <path d="M -60 0 L -50 0 M 60 0 L 50 0 M 0 -60 L 0 -50 M 0 60 L 0 50" stroke="#ffd700" strokeWidth="2" />
                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0" to="360" dur={`${5 + i * 2}s`} repeatCount="indefinite" additive="sum" />
               </g>
             ))}
             <Lock size={40} color="#ffd700" x="380" y="320" style={{ position: 'absolute' }} />
          </svg>
        </div>
      );

    case 'computational-thinking':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #050a14, #010205)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             {[...Array(4)].map((_, i) => (
               <rect key={i} x={100 + i * 150} y={150} width="100" height="100" rx="10" fill="none" stroke="#00d4ff" strokeWidth="2">
                  <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
               </rect>
             ))}
             <path d="M 200 200 L 250 200 M 350 200 L 400 200 M 500 200 L 550 200" stroke="#fff" strokeWidth="1" opacity="0.3" />
             <Cpu size={40} color="#00d4ff" x="380" y="320" style={{ position: 'absolute' }} />
          </svg>
        </div>
      );

    case 'the-feynman-technique':
      return (
        <div style={{ ...containerStyle, background: 'radial-gradient(circle at center, #05140b, #010502)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
             <circle cx="400" cy="150" r="80" fill="none" stroke="#00ff94" strokeWidth="2" opacity="0.4" />
             <path d="M 360 220 L 440 220" stroke="#00ff94" strokeWidth="4" />
             {[...Array(3)].map((_, i) => (
               <path key={i} d={`M ${300 + i * 100} 250 L ${300 + i * 100} 300`} stroke="#00ff94" strokeWidth="2" opacity="0.3">
                  <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${1 + i * 0.5}s`} repeatCount="indefinite" />
               </path>
             ))}
             <Lightbulb size={40} color="#00ff94" x="380" y="320" style={{ position: 'absolute' }} />
          </svg>
        </div>
      );

    case 'static-image':
      return (
        <div style={{ ...containerStyle, background: '#000' }}>
          {src ? (
            <img 
              src={src} 
              alt="Blog Visual" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
            />
          ) : (
            <div style={{ color: '#333' }}>No image source</div>
          )}
        </div>
      );

    default:
      return (
        <div style={{ ...containerStyle, background: '#111' }}>
          <Layers size={64} color="#555" />
        </div>
      );
  }
}
