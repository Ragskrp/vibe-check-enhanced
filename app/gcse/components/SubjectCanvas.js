'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated canvas background — 8bit.ai inspired.
 * Renders diagonal light streaks + stars with a subject-specific accent tint.
 * 
 * Props:
 *   accentColor  — hex color for streak tint (default '#00e5a0')
 *   streakCount  — number of streaks (default 60)
 *   starCount    — number of static stars (default 120)
 */
export default function SubjectCanvas({ accentColor = '#00e5a0', streakCount = 60, starCount = 120 }) {
  const canvasRef = useRef(null);

  // Parse hex to r,g,b for rgba usage
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const rgb = hexToRgb(accentColor);

    // Streaks
    const streaks = Array.from({ length: streakCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      len: Math.random() * 130 + 40,
      speed: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.35 + 0.05,
      angle: -55 + Math.random() * 20,
      width: Math.random() * 1.2 + 0.3,
      tinted: Math.random() > 0.7, // 30% get an accent tint
    }));

    // Stars
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.2,
      opacity: Math.random() * 0.45 + 0.08,
      pulse: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        const osc = Math.sin(s.pulse + frame * 0.012) * 0.15 + 0.85;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * osc})`;
        ctx.fill();
      });

      // Streaks
      streaks.forEach(s => {
        const rad = (s.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * s.len;
        const dy = Math.sin(rad) * s.len;

        const grad = ctx.createLinearGradient(s.x, s.y, s.x + dx, s.y + dy);
        if (s.tinted) {
          grad.addColorStop(0, `rgba(${rgb},0)`);
          grad.addColorStop(0.5, `rgba(${rgb},${s.opacity})`);
          grad.addColorStop(1, `rgba(${rgb},0)`);
        } else {
          grad.addColorStop(0, `rgba(200,220,255,0)`);
          grad.addColorStop(0.5, `rgba(200,220,255,${s.opacity})`);
          grad.addColorStop(1, `rgba(200,220,255,0)`);
        }

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + dx, s.y + dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.stroke();

        // Advance position
        s.x += Math.cos(rad) * s.speed * 0.5;
        s.y += Math.sin(rad) * s.speed * 0.5 + s.speed * 0.28;

        // Wrap
        if (s.y > H + 60 || s.x > W + 80) {
          s.x = Math.random() * W * 1.4 - W * 0.2;
          s.y = -120;
          s.opacity = Math.random() * 0.35 + 0.05;
          s.len = Math.random() * 130 + 40;
        }
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [accentColor]); // re-init if color changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
