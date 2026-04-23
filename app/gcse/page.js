'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AdBanner from '../components/AdBanner';
import { BookOpen, TrendingUp, Clock, Target, ArrowRight, GraduationCap, Zap } from 'lucide-react';
import PageValueSection from '../components/PageValueSection';

const SUBJECTS = [
  {
    emoji: '🔢',
    title: 'Maths',
    desc: 'Algebra, geometry, fractions, and statistics. Master the full AQA & Edexcel curriculum.',
    path: '/gcse/maths',
    color: '#00e5a0',
    glowColor: 'rgba(0, 229, 160, 0.2)',
    topics: 42,
    tools: 3,
    available: true,
  },
  {
    emoji: '🔬',
    title: 'Science',
    desc: 'Biology, Chemistry, and Physics. Interactive content for Triple & Combined awards.',
    path: '/gcse/science',
    color: '#00d4ff',
    glowColor: 'rgba(0, 212, 255, 0.2)',
    topics: 48,
    tools: 3,
    available: true,
  },
  {
    emoji: '💻',
    title: 'Computer Science',
    desc: 'OCR J277 algorithms, logic gates, networking, and programming fundamentals.',
    path: '/gcse/computer-science',
    color: '#ff2d78',
    glowColor: 'rgba(255, 45, 120, 0.2)',
    topics: 22,
    tools: 1,
    available: true,
  },
  {
    emoji: '💼',
    title: 'Business',
    desc: 'Finance, Marketing, and Operations. AQA-aligned models for business success.',
    path: '/gcse/business',
    color: '#ffe600',
    glowColor: 'rgba(255, 230, 0, 0.2)',
    topics: 18,
    tools: 1,
    available: true,
  },
  {
    emoji: '✍️',
    title: 'English Language',
    desc: 'Reading analysis (AO1-AO4), creative writing (AO5), and transactional skills.',
    path: '/gcse/english-language',
    color: '#ffe600',
    glowColor: 'rgba(255, 230, 0, 0.2)',
    topics: 7,
    tools: 1,
    available: true,
  },
  {
    emoji: '📚',
    title: 'English Literature',
    desc: 'Shakespeare, 19th Century Novels, Modern Drama, and Poetry Deep-Dives.',
    path: '/gcse/english-literature',
    color: '#b14aed',
    glowColor: 'rgba(177, 74, 237, 0.2)',
    topics: 15,
    tools: 1,
    available: true,
  },
];

const STATS = [
  { icon: <Clock size={16} />, label: '2-min sessions', color: '#00e5a0' },
  { icon: <Target size={16} />, label: 'Exam-aligned', color: '#00d4ff' },
  { icon: <Zap size={16} />, label: 'Instant start', color: '#ffe600' },
  { icon: <TrendingUp size={16} />, label: 'Track progress', color: '#b14aed' },
];

export default function GCSEHub() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* ── Ambient background orbs ── */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 700, height: 700,
          top: '-15%', left: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%)',
          animation: 'orbFloat1 22s ease-in-out infinite',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', width: 600, height: 600,
          bottom: '-10%', right: '-5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,120,0.07) 0%, transparent 70%)',
          animation: 'orbFloat2 28s ease-in-out infinite',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', width: 500, height: 500,
          top: '40%', left: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
          animation: 'orbFloat3 35s ease-in-out infinite',
          filter: 'blur(50px)',
        }} />
      </div>

      <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ──────────── HERO ──────────── */}
        <section style={{ textAlign: 'center', marginBottom: 72, paddingTop: 24 }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 9999,
            background: 'rgba(0, 229, 160, 0.1)',
            border: '1px solid rgba(0, 229, 160, 0.25)',
            fontSize: 11, fontWeight: 700, color: '#00e5a0',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: 24,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.5s ease-out',
          }}>
            <GraduationCap size={13} /> GCSE Revision Hub
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
            marginBottom: 20,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.1s',
          }}>
            Revision that doesn&apos;t{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00e5a0 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              filter: 'drop-shadow(0 0 20px rgba(0,229,160,0.3))',
            }}>
              feel like revision
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            color: '#9898b8',
            fontSize: 17,
            maxWidth: 520,
            margin: '0 auto 36px',
            lineHeight: 1.7,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.2s',
          }}>
            Free, interactive GCSE tools that are quick, engaging, and actually useful.
            No login. No filler. Just practice that sticks.
          </p>

          {/* Stat pills */}
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.3s',
          }}>
            {STATS.map((item) => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 9999,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                color: item.color, fontSize: 13, fontWeight: 700,
              }}>
                {item.icon} {item.label}
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── SUBJECT GRID ──────────── */}
        <section>
          <h2 style={{
            fontSize: 13, fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#9898b8',
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 28,
          }}>
            <BookOpen size={14} color="#00e5a0" />
            Choose your subject
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {SUBJECTS.map((subject, idx) => {
              const CardWrapper = subject.available ? Link : 'div';
              const cardProps = subject.available
                ? { href: subject.path, style: { textDecoration: 'none' } }
                : { style: { opacity: 0.4, cursor: 'default' } };

              return (
                <CardWrapper key={subject.title} {...cardProps}>
                  <SubjectCard subject={subject} delay={idx * 60} mounted={mounted} />
                </CardWrapper>
              );
            })}
          </div>
        </section>

        {/* ──────────── AD ──────────── */}
        <AdBanner format="horizontal" style={{ marginTop: 56 }} />

        {/* ──────────── WHY SECTION ──────────── */}
        <section style={{ marginTop: 80, marginBottom: 16 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}>
              Why revise on{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00e5a0, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                VIBEMENOW
              </span>
              ?
            </h2>
            <p style={{ color: '#9898b8', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
              Built for students who want results, not boredom.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {[
              { icon: '⚡', title: 'Micro-sessions', desc: '2-minute practice bursts — perfect for quick revision or warm-ups.', color: '#00e5a0' },
              { icon: '🎮', title: 'Game mechanics', desc: 'Streaks, timers, and instant feedback turn revision into something you\u2019ll actually repeat.', color: '#ff2d78' },
              { icon: '📊', title: 'Track progress', desc: 'Scores, streaks, and accuracy are saved locally so you can see improvement.', color: '#00d4ff' },
              { icon: '🎯', title: 'Curriculum-aligned', desc: 'Every question maps to the GCSE spec. Foundation & Higher tiers supported.', color: '#ffe600' },
            ].map((item) => (
              <div key={item.title} style={{
                background: 'rgba(13, 14, 26, 0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: 24,
                cursor: 'default',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.boxShadow = `0 12px 40px ${item.color}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: 28, marginBottom: 14,
                  width: 48, height: 48,
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{item.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, color: '#eeeeff' }}>{item.title}</h3>
                <p style={{ color: '#9898b8', fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── CTA ──────────── */}
        <section style={{
          marginTop: 80,
          textAlign: 'center',
          padding: '56px 24px',
          borderRadius: 28,
          background: 'rgba(13,14,26,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,229,160,0.12)',
          boxShadow: '0 0 60px rgba(0,229,160,0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* CTA inner glow */}
          <div style={{
            position: 'absolute', top: '-40%', left: '50%',
            transform: 'translateX(-50%)',
            width: 400, height: 200,
            background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
          <h2 style={{
            fontSize: 28, fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 10,
          }}>
            Ready to{' '}
            <span style={{ color: '#00e5a0', textShadow: '0 0 20px rgba(0,229,160,0.4)' }}>start</span>?
          </h2>
          <p style={{ color: '#9898b8', fontSize: 15, marginBottom: 28, fontFamily: 'Inter, sans-serif' }}>
            Jump straight into Maths — our most popular GCSE subject.
          </p>
          <Link href="/gcse/maths">
            <button style={{
              padding: '14px 36px', fontSize: 16, fontWeight: 800,
              background: 'linear-gradient(135deg, #00e5a0, #00d4ff)',
              color: '#002618', borderRadius: 12, border: 'none',
              cursor: 'pointer', letterSpacing: '-0.01em',
              transition: 'all 0.2s',
              boxShadow: '0 0 0 0 rgba(0,229,160,0)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,229,160,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0,229,160,0)';
              }}
            >
              Start Maths Revision →
            </button>
          </Link>
        </section>

        <PageValueSection
          title="What Makes This GCSE Area High-Value"
          summary="This GCSE area is structured around active practice, spaced repetition, and short sessions that are easy to repeat."
          points={[
            { label: 'Clear subject navigation', text: 'Each subject hub groups topics by exam-relevant categories so students can revise with intent.' },
            { label: 'Low-friction practice', text: 'No login barriers and fast loading tools make it easier to run short daily revision loops.' },
            { label: 'Progress orientation', text: 'Streak and session tracking supports consistency across multiple study days.' },
          ]}
          checklist={[
            'Pick one subject and complete a short focused session.',
            'Track one weak area and revisit it the next day.',
            'Use timed modes only after accuracy improves.',
          ]}
        />
      </div>

      {/* ── Global animation keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, 60px) scale(1.05); }
          66%       { transform: translate(-30px, 30px) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-50px, -40px) scale(1.08); }
          66%       { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50%       { transform: translate(-50%, -60px) scale(1.1); }
        }
        @keyframes shimmerBorder {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

// ── Subject Card (separate component for hover state) ──
function SubjectCard({ subject, delay, mounted }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(13, 14, 26, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? subject.color + '40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 22,
        padding: '28px 24px',
        minHeight: 200,
        overflow: 'hidden',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 16px 48px ${subject.glowColor}, 0 0 0 1px ${subject.color}20`
          : '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease',
        opacity: mounted ? 1 : 0,
        animation: mounted ? `cardEntrance 0.5s ease-out ${delay}ms both` : 'none',
      }}
    >
      {/* Accent glow orb inside card */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 140, height: 140, borderRadius: '50%',
        background: `radial-gradient(circle, ${subject.glowColor} 0%, transparent 70%)`,
        transition: 'opacity 0.3s',
        opacity: hovered ? 1 : 0.5,
        pointerEvents: 'none',
      }} />

      {/* Emoji */}
      <div style={{
        fontSize: 40, marginBottom: 14,
        filter: hovered ? `drop-shadow(0 0 12px ${subject.color}80)` : 'none',
        transition: 'filter 0.3s ease',
        display: 'inline-block',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        {subject.emoji}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 19, fontWeight: 800,
        letterSpacing: '-0.02em',
        marginBottom: 8,
        color: hovered ? subject.color : '#eeeeff',
        transition: 'color 0.25s ease',
      }}>
        {subject.title}
      </h3>

      {/* Desc */}
      <p style={{
        color: '#9898b8', fontSize: 13,
        lineHeight: 1.65,
        marginBottom: 20,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
      }}>
        {subject.desc}
      </p>

      {/* Footer row */}
      {subject.available ? (
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: subject.color,
              letterSpacing: '0.05em',
            }}>
              {subject.topics} topics
            </span>
            <span style={{ fontSize: 12, color: '#555', fontWeight: 600 }}>
              {subject.tools} {subject.tools === 1 ? 'tool' : 'tools'}
            </span>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: 9999,
            background: `${subject.color}15`,
            border: `1px solid ${subject.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hovered ? 'translateX(2px)' : 'translateX(0)',
            transition: 'transform 0.25s ease',
          }}>
            <ArrowRight size={14} color={subject.color} />
          </div>
        </div>
      ) : (
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#555',
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          Coming Soon
        </span>
      )}
    </div>
  );
}
