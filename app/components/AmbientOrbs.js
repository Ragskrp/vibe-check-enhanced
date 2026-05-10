'use client';

import React from 'react';

export default function AmbientOrbs() {
  return (
    <div
      className="ambient-orbs"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div className="orb orb-primary"></div>
      <div className="orb orb-secondary"></div>
      <div className="orb orb-tertiary"></div>

      <style jsx>{`
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.08;
          pointer-events: none;
        }

        .orb-primary {
          width: 60vw;
          height: 60vw;
          background: #ff2d78;
          top: -20vh;
          left: -10vw;
          animation: float-slow 25s infinite alternate ease-in-out;
        }

        .orb-secondary {
          width: 50vw;
          height: 50vw;
          background: #00d4ff;
          bottom: -10vh;
          right: -5vw;
          animation: float-slow 30s infinite alternate-reverse ease-in-out;
        }

        .orb-tertiary {
          width: 40vw;
          height: 40vw;
          background: #b14aed;
          top: 30vh;
          right: 20vw;
          animation: float-slow 22s infinite alternate ease-in-out;
        }

        @keyframes float-slow {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(5vw, 5vh) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
