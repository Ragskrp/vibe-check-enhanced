'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import AdBanner from '../components/AdBanner';
import PageValueSection from '../components/PageValueSection';

// ── Streak particle system (8bit.ai inspired) ──────────────────────────────
function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    // Streaks — diagonal light lines like 8bit.ai
    const streaks = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      len: Math.random() * 120 + 40,
      speed: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.4 + 0.05,
      angle: -55 + Math.random() * 20, // diagonal angle in degrees
      width: Math.random() * 1 + 0.3,
    }));

    // Stars — static points
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
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

      // Draw stars
      stars.forEach(s => {
        const osc = Math.sin(s.pulse + frame * 0.012) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * osc})`;
        ctx.fill();
      });

      // Draw streaks
      streaks.forEach(s => {
        const rad = (s.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * s.len;
        const dy = Math.sin(rad) * s.len;

        const grad = ctx.createLinearGradient(s.x, s.y, s.x + dx, s.y + dy);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.5, `rgba(200,230,255,${s.opacity})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + dx, s.y + dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.stroke();

        // Move streak diagonally
        s.x += s.speed * Math.cos(rad) * 0.5;
        s.y += s.speed * Math.sin(rad) * 0.5 + s.speed * 0.3;

        // Reset when off screen
        if (s.y > H + 50 || s.x > W + 50) {
          s.x = Math.random() * W * 1.5 - W * 0.25;
          s.y = -100;
          s.opacity = Math.random() * 0.4 + 0.05;
          s.len = Math.random() * 120 + 40;
        }
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  );
}

// ── Scroll-reveal hook ──────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ── Data ────────────────────────────────────────────────────────────────────
const SUBJECTS = [
  {
    emoji: '🔢', title: 'Maths',
    desc: 'Algebra, geometry, fractions, statistics. Full AQA & Edexcel curriculum.',
    path: '/gcse/maths', color: '#00e5a0', topics: 42,
  },
  {
    emoji: '🔬', title: 'Science',
    desc: 'Biology, Chemistry, and Physics. Triple & Combined award coverage.',
    path: '/gcse/science', color: '#00d4ff', topics: 48,
  },
  {
    emoji: '💻', title: 'Computer Science',
    desc: 'OCR J277: algorithms, logic, networking, and programming fundamentals.',
    path: '/gcse/computer-science', color: '#ff2d78', topics: 22,
  },
  {
    emoji: '💼', title: 'Business',
    desc: 'Finance, marketing, and operations aligned to AQA specification.',
    path: '/gcse/business', color: '#ffe600', topics: 18,
  },
  {
    emoji: '✍️', title: 'English Language',
    desc: 'AQA reading analysis (AO1–AO4), creative and transactional writing.',
    path: '/gcse/english-language', color: '#ffe600', topics: 7,
  },
  {
    emoji: '📚', title: 'English Literature',
    desc: 'Shakespeare, 19th Century Novels, Modern Drama and Poetry deep-dives.',
    path: '/gcse/english-literature', color: '#b14aed', topics: 15,
  },
];

// ── Main Component ──────────────────────────────────────────────────────────
export default function GCSEHub() {
  const [mounted, setMounted] = useState(false);
  const heroReveal = useScrollReveal(0.05);
  const gridReveal = useScrollReveal(0.05);
  const whyReveal = useScrollReveal(0.1);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <StarCanvas />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          ref={heroReveal.ref}
          style={{
            minHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 clamp(20px, 5vw, 100px)',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {/* Small label — 8bit.ai style muted prefix */}
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.04em',
            marginBottom: 16,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            VIBEMENOW — GCSE Revision
          </div>

          {/* Massive headline — 8bit.ai style */}
          <h1 style={{
            fontSize: 'clamp(44px, 8vw, 96px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: 28,
            maxWidth: 16 + 'ch',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          }}>
            Revision that{' '}
            <span style={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffffff 40%, rgba(0,229,160,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              actually works.
            </span>
          </h1>

          {/* Body text */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(15px, 2vw, 18px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 480,
            lineHeight: 1.75,
            marginBottom: 48,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}>
            Free, curriculum-aligned practice for all 6 core GCSE subjects.
            No signup. No fluff. Just focused revision that sticks.
          </p>

          {/* CTA row */}
          <div style={{
            display: 'flex', gap: 16, flexWrap: 'wrap',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}>
            <Link href="/gcse/maths">
              <GlowButton label="Start Maths →" color="#00e5a0" />
            </Link>
            <Link href="/gcse/science">
              <GhostButton label="Try Science" />
            </Link>
          </div>

          {/* Subject count pill — subtle metric */}
          <div style={{
            marginTop: 64,
            fontSize: 12,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: 'Inter, sans-serif',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1s ease 0.5s',
          }}>
            6 subjects · 150+ topics · 0 logins required
          </div>
        </section>

        {/* ── Divider line ─────────────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          width: '100%',
        }} />

        {/* ── SUBJECT GRID ─────────────────────────────────────────── */}
        <section
          ref={gridReveal.ref}
          style={{
            maxWidth: 1100, margin: '0 auto',
            padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 100px)',
          }}
        >
          <div style={{
            marginBottom: 48,
            opacity: gridReveal.visible ? 1 : 0,
            transform: gridReveal.visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'Inter, sans-serif',
              marginBottom: 12,
            }}>
              Subjects
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: 1.15,
            }}>
              Choose your{' '}
              <span style={{ fontWeight: 700 }}>subject.</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 1,
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            {SUBJECTS.map((subject, idx) => (
              <Link key={subject.title} href={subject.path} style={{ textDecoration: 'none' }}>
                <SubjectCell
                  subject={subject}
                  delay={idx * 80}
                  visible={gridReveal.visible}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        {/* ── WHY SECTION ─────────────────────────────────────────── */}
        <section
          ref={whyReveal.ref}
          style={{
            maxWidth: 1100, margin: '0 auto',
            padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 100px)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
          }}>
            {[
              { stat: '2 min', label: 'Per session', desc: 'Short bursts. Easy to repeat daily.', color: '#00e5a0' },
              { stat: '150+', label: 'Topics', desc: 'Every spec point covered across 6 subjects.', color: '#00d4ff' },
              { stat: '0', label: 'Logins', desc: 'No accounts. No friction. Just start.', color: '#ff2d78' },
              { stat: '100%', label: 'Free', desc: 'Everything you see here costs nothing.', color: '#ffe600' },
            ].map((item, idx) => (
              <div
                key={item.label}
                style={{
                  opacity: whyReveal.visible ? 1 : 0,
                  transform: whyReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.7s ease ${idx * 100}ms, transform 0.7s ease ${idx * 100}ms`,
                }}
              >
                <div style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: item.color,
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {item.stat}
                </div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: 10,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.6,
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── AD ─────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 100px) 60px' }}>
          <AdBanner format="horizontal" />
        </div>

        {/* ── FULL-WIDTH CTA ───────────────────────────────────────── */}
        <section style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
          padding: 'clamp(80px, 12vw, 140px) 20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle radial glow behind CTA */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, height: 300,
            background: 'radial-gradient(ellipse, rgba(0,229,160,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            fontFamily: 'Inter, sans-serif',
            marginBottom: 20,
          }}>
            Start now
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: 40,
            lineHeight: 1.1,
          }}>
            Pick a subject.{' '}
            <span style={{ fontWeight: 700 }}>Start in seconds.</span>
          </h2>
          <Link href="/gcse/maths">
            <GlowButton label="Begin Maths Revision →" color="#00e5a0" large />
          </Link>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px clamp(20px, 5vw, 100px)' }}>
          <PageValueSection
            title="What Makes This GCSE Area High-Value"
            summary="Structured around active practice, spaced repetition, and short sessions that are easy to repeat."
            points={[
              { label: 'Clear subject navigation', text: 'Groups topics by exam-relevant categories so students can revise with intent.' },
              { label: 'Low-friction practice', text: 'No login barriers. Fast loading tools make daily revision loops effortless.' },
              { label: 'Progress orientation', text: 'Streak and session tracking supports consistency across multiple study days.' },
            ]}
            checklist={[
              'Pick one subject and complete a short focused session.',
              'Track one weak area and revisit it the next day.',
              'Use timed modes only after accuracy improves.',
            ]}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        body { background: #000 !important; }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,160,0.3); }
          50%       { box-shadow: 0 0 32px 4px rgba(0,229,160,0.15); }
        }
        @keyframes cellReveal {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

// ── Subject Cell (grid tile — 8bit.ai aesthetic) ────────────────────────────
function SubjectCell({ subject, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0)',
        padding: '36px 32px',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        animation: visible ? `cellReveal 0.6s ease-out ${delay}ms both` : 'none',
      }}
    >
      {/* Accent glow corner (only on hover) */}
      {hovered && (
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 160, height: 160, borderRadius: '50%',
          background: `radial-gradient(circle, ${subject.color}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Top row: emoji + arrow */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 28,
      }}>
        <span style={{
          fontSize: 28,
          transition: 'transform 0.3s ease',
          display: 'block',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}>
          {subject.emoji}
        </span>
        <span style={{
          fontSize: 18,
          color: hovered ? subject.color : 'rgba(255,255,255,0.12)',
          transition: 'color 0.3s ease, transform 0.3s ease',
          transform: hovered ? 'translate(2px, -2px)' : 'translate(0,0)',
        }}>
          ↗
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: hovered ? '#ffffff' : 'rgba(255,255,255,0.8)',
        marginBottom: 8,
        transition: 'color 0.25s ease',
      }}>
        {subject.title}
      </h3>

      {/* Desc */}
      <p style={{
        fontSize: 13,
        color: 'rgba(255,255,255,0.3)',
        lineHeight: 1.65,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        marginBottom: 24,
      }}>
        {subject.desc}
      </p>

      {/* Topics chip */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontFamily: 'Inter, sans-serif',
        color: hovered ? subject.color : 'rgba(255,255,255,0.2)',
        transition: 'color 0.25s ease',
        borderTop: `1px solid ${hovered ? subject.color + '30' : 'rgba(255,255,255,0.06)'}`,
        paddingTop: 16,
        width: '100%',
        transition: 'color 0.25s ease, border-color 0.25s ease',
      }}>
        {subject.topics} topics
      </div>
    </div>
  );
}

// ── Buttons ─────────────────────────────────────────────────────────────────
function GlowButton({ label, color = '#00e5a0', large = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: large ? '18px 48px' : '14px 32px',
        fontSize: large ? 16 : 14,
        fontWeight: 700,
        fontFamily: 'Space Grotesk, sans-serif',
        letterSpacing: '-0.01em',
        color: '#000',
        background: hov
          ? `linear-gradient(135deg, ${color}, ${color}cc)`
          : color,
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        boxShadow: hov ? `0 0 36px ${color}50` : 'none',
        transform: hov ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  );
}

function GhostButton({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '14px 32px',
        fontSize: 14,
        fontWeight: 700,
        fontFamily: 'Space Grotesk, sans-serif',
        letterSpacing: '-0.01em',
        color: hov ? '#ffffff' : 'rgba(255,255,255,0.5)',
        background: 'transparent',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  );
}
