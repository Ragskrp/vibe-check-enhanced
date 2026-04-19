'use client';

import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import { BookOpen, TrendingUp, Clock, Target, ArrowRight, GraduationCap, Zap } from 'lucide-react';

const SUBJECTS = [
  {
    emoji: '🔢',
    title: 'Maths',
    desc: 'Algebra, geometry, fractions, statistics & more. Timed challenges that make revision addictive.',
    path: '/gcse/maths',
    color: '#00e5a0',
    topics: 6,
    tools: 3,
    available: true,
  },
  {
    emoji: '🔬',
    title: 'Science',
    desc: 'Biology, Chemistry, Physics — interactive revision for Foundation & Higher.',
    path: '/gcse/science',
    color: '#00d4ff',
    topics: 15,
    tools: 15,
    available: true,
  },
  {
    emoji: '💻',
    title: 'Computer Science',
    desc: 'OCR Year 10 algorithms, logic gates, and computational thinking.',
    path: '/gcse/computer-science',
    color: '#ff2d78',
    topics: 12,
    tools: 12,
    available: true,
  },
  {
    emoji: '💼',
    title: 'Business',
    desc: 'Real-world enterprise, operations, and HR. Build your business acumen with AQA-aligned tests.',
    path: '/gcse/business',
    color: '#ff6b35',
    topics: 12,
    tools: 12,
    available: true,
  },
  {
    emoji: '🌍',
    title: 'Geography',
    desc: 'Map skills, case studies, and quick-fire knowledge checks.',
    path: '#',
    color: '#ff6b35',
    topics: 0,
    tools: 0,
    available: false,
  },
];

export default function GCSEHub() {
  return (
    <div className="page-container">
      {/* Hero */}
      <section className="animate-fade-in" style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 20,
          background: 'rgba(0, 229, 160, 0.1)',
          border: '1px solid rgba(0, 229, 160, 0.2)',
          fontSize: 12,
          fontWeight: 700,
          color: '#00e5a0',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          <GraduationCap size={14} /> GCSE Revision
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 52px)',
          fontWeight: 900,
          margin: '0 0 16px',
          lineHeight: 1.1,
        }}>
          Revision that doesn&apos;t{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00e5a0, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            feel like revision
          </span>
        </h1>

        <p style={{
          color: '#888',
          fontSize: 16,
          maxWidth: 560,
          margin: '0 auto 32px',
          lineHeight: 1.7,
        }}>
          Free, interactive GCSE tools designed to be quick, engaging, and actually useful.
          No login. No filler. Just practice that sticks.
        </p>

        <div style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: <Clock size={18} />, label: '2-min sessions', col: '#00e5a0' },
            { icon: <Target size={18} />, label: 'Exam-aligned', col: '#00d4ff' },
            { icon: <Zap size={18} />, label: 'Instant start', col: '#ffe600' },
            { icon: <TrendingUp size={18} />, label: 'Track progress', col: '#b14aed' },
          ].map((item) => (
            <div key={item.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: item.col,
              fontSize: 13,
              fontWeight: 700,
            }}>
              {item.icon} {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Subject Grid */}
      <section>
        <h2 style={{
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 24,
          color: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <BookOpen size={20} color="#00e5a0" /> Choose Your Subject
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {SUBJECTS.map((subject) => {
            const CardWrapper = subject.available ? Link : 'div';
            const cardProps = subject.available
              ? { href: subject.path, style: { textDecoration: 'none' } }
              : { style: { opacity: 0.5, cursor: 'default' } };

            return (
              <CardWrapper key={subject.title} {...cardProps}>
                <div className="card" style={{
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 200,
                }}>
                  {/* Glow accent */}
                  <div style={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${subject.color}15, transparent)`,
                    pointerEvents: 'none',
                  }} />

                  <div style={{ fontSize: 40, marginBottom: 12 }}>{subject.emoji}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{subject.title}</h3>
                  <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                    {subject.desc}
                  </p>

                  {subject.available ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <span style={{ fontSize: 12, color: subject.color, fontWeight: 700 }}>
                          {subject.tools} tools
                        </span>
                        <span style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>
                          {subject.topics} topics
                        </span>
                      </div>
                      <ArrowRight size={16} color={subject.color} />
                    </div>
                  ) : (
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#555',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      Coming Soon
                    </span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </section>

      {/* Ad Placement */}
      <AdBanner format="horizontal" style={{ marginTop: 40 }} />

      {/* Why Section */}
      <section style={{ marginTop: 64 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, color: '#f0f0f0', textAlign: 'center' }}>
          Why revise on <span style={{ color: '#00e5a0' }}>VIBEMENOW</span>?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {[
            {
              icon: '⚡',
              title: 'Micro-sessions',
              desc: 'Each tool is designed for 2-minute bursts. Perfect for revision breaks or quick warm-ups before study.',
            },
            {
              icon: '🎮',
              title: 'Game mechanics',
              desc: 'Streaks, timers, and instant feedback turn repetitive practice into something you actually want to repeat.',
            },
            {
              icon: '📊',
              title: 'Progress tracking',
              desc: 'Your scores, streaks, and accuracy are saved locally so you can see improvement over time.',
            },
            {
              icon: '🎯',
              title: 'Curriculum-aligned',
              desc: 'Every question is mapped to the GCSE specification. Foundation and Higher tiers supported.',
            },
          ].map((item) => (
            <div key={item.title} className="card" style={{ cursor: 'default' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        marginTop: 64,
        textAlign: 'center',
        padding: '48px 24px',
        borderRadius: 24,
        background: 'linear-gradient(135deg, rgba(0,229,160,0.08), rgba(0,212,255,0.08))',
        border: '2px solid rgba(0,229,160,0.15)',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          Ready to <span style={{ color: '#00e5a0' }}>start</span>?
        </h2>
        <p style={{ color: '#888', fontSize: 15, marginBottom: 24 }}>
          Jump straight into Maths — our most popular GCSE subject.
        </p>
        <Link href="/gcse/maths">
          <button className="btn-primary" style={{
            fontSize: 18,
            background: 'linear-gradient(135deg, #00e5a0, #00d4ff)',
            color: '#000',
          }}>
            Start Maths Revision
          </button>
        </Link>
      </section>
    </div>
  );
}
