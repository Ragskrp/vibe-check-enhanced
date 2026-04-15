'use client';

import { HelpCircle, Brain, Target, Layers, Zap, Network, Dice3, Sparkles } from 'lucide-react';

export default function BlogArt({ type }) {
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

    default:
      return (
        <div style={{ ...containerStyle, background: '#111' }}>
          <Layers size={64} color="#555" />
        </div>
      );
  }
}
