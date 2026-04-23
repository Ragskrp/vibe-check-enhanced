'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Flame, Trophy } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './topicData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';

const COLOR = '#00e5a0';
const FEATURED = [
  { title: 'Equation Rush', desc: 'Speed algebra — solve equations against the clock.', href: '/gcse/maths/equation-rush', color: '#00e5a0', tag: 'POPULAR' },
  { title: 'Fraction Frenzy', desc: 'Fractions, decimals, percentages — conversions & calculations.', href: '/gcse/maths/fraction-frenzy', color: '#00d4ff', tag: 'POPULAR' },
  { title: 'Angle Snapper', desc: 'Geometry angles — triangles, polygons, parallel lines.', href: '/gcse/maths/angle-snapper', color: '#b14aed', tag: 'POPULAR' },
];
const CATEGORY_ORDER = ['Number', 'Algebra', 'Geometry', 'Statistics'];
const CATEGORY_COLORS = { Number: '#00e5a0', Algebra: '#00d4ff', Geometry: '#b14aed', Statistics: '#ff6b35' };

function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function MathsHub() {
  const [mounted, setMounted] = useState(false);
  const stats = useStoredStats('gcse-maths-stats');
  const topicsByCategory = getTopicsByCategory();
  const hero = useScrollReveal(0.05);
  const grid = useScrollReveal(0.05);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <SubjectCanvas accentColor={COLOR} />
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section ref={hero.ref} style={{
          minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 clamp(20px,5vw,100px)', maxWidth: 1100, margin: '0 auto',
        }}>
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
            <div style={{ marginBottom: 24 }}>
              <SubjectIcon subject="maths" color={COLOR} size={80} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif', marginBottom: 14 }}>GCSE Revision</div>
            <h1 style={{ fontSize: 'clamp(44px,8vw,88px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', marginBottom: 20 }}>
              Mathematics<br />
              <span style={{ fontWeight: 700, background: `linear-gradient(135deg,#fff 40%,${COLOR} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Mastery.</span>
            </h1>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 460, lineHeight: 1.75, marginBottom: 36 }}>
              Foundation & Higher tiers. Number, Algebra, Geometry and Statistics — all spec-aligned, all interactive.
            </p>
            {stats && (
              <div style={{ display: 'inline-flex', gap: 24, padding: '10px 20px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ffe600', display: 'flex', alignItems: 'center', gap: 6 }}><Trophy size={13} /> {stats.totalPlays || 0} plays</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ff6b35', display: 'flex', alignItems: 'center', gap: 6 }}><Flame size={13} /> {stats.bestStreak || 0} streak</span>
              </div>
            )}
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        {/* ── FEATURED GAMES ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,100px)' }}>
          <SectionLabel label="Featured Tools" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 1, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden', marginTop: 24 }}>
            {FEATURED.map((tool) => (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                <ToolCell tool={tool} />
              </Link>
            ))}
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        {/* ── TOPIC GRID ── */}
        <section ref={grid.ref} style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,100px)' }}>
          <SectionLabel label="All Topics" />
          {CATEGORY_ORDER.map(cat => {
            const topics = topicsByCategory[cat];
            if (!topics?.length) return null;
            const catColor = CATEGORY_COLORS[cat] || '#888';
            return (
              <div key={cat} style={{ marginTop: 40 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: catColor, marginBottom: 12 }}>{cat}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 1, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  {topics.map((topic, idx) => (
                    <Link key={topic.slug} href={`/gcse/maths/${topic.slug}`} style={{ textDecoration: 'none' }}>
                      <TopicCell topic={topic} accentColor={catColor} delay={idx * 40} visible={grid.visible} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 40px' }}>
          <AdBanner format="horizontal" />
          <PageValueSection
            title="Use This Maths Hub For High-Value Revision"
            summary="Built for active recall, not passive reading. Use one focused category, complete short sessions, and track weak areas."
            points={[
              { label: 'Exam-targeted practice', text: 'Each topic maps to GCSE Maths areas: Number, Algebra, Geometry, Statistics.' },
              { label: 'Fast feedback loop', text: 'Short rounds show mistakes quickly so you correct methods before bad habits lock in.' },
              { label: 'Retention by repetition', text: 'Returning after 24-48 hours improves long-term recall more than one long cram session.' },
            ]}
            checklist={['Pick one category and complete 2-3 topics per session.', 'Note any formula errors and repeat the same topic once.', 'Move to timed tools only after accuracy is stable.']}
          />
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'); body{background:#000!important}
        @keyframes cellIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </>
  );
}

function SectionLabel({ label }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif' }}>{label}</div>;
}

function ToolCell({ tool }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '28px 24px', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: hov ? 'rgba(255,255,255,0.03)' : 'transparent', transition: 'background 0.3s', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
      {hov && <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle,${tool.color}20 0%,transparent 70%)`, pointerEvents: 'none' }} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', background: tool.color, color: '#000', padding: '2px 8px', borderRadius: 2 }}>{tool.tag}</span>
        <span style={{ color: hov ? tool.color : 'rgba(255,255,255,0.15)', fontSize: 18, transition: 'color 0.25s' }}>↗</span>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: hov ? '#fff' : 'rgba(255,255,255,0.8)', marginBottom: 8, transition: 'color 0.25s' }}>{tool.title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, fontFamily: 'Inter,sans-serif' }}>{tool.desc}</p>
    </div>
  );
}

function TopicCell({ topic, accentColor, delay, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '18px 20px', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: hov ? 'rgba(255,255,255,0.03)' : 'transparent', transition: 'background 0.25s', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, opacity: visible ? 1 : 0, animation: visible ? `cellIn 0.5s ease-out ${delay}ms both` : 'none' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: hov ? '#fff' : 'rgba(255,255,255,0.75)', marginBottom: 3, transition: 'color 0.2s' }}>{topic.title}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif' }}>{topic.description}</div>
      </div>
      <span style={{ color: hov ? accentColor : 'rgba(255,255,255,0.12)', fontSize: 16, transition: 'color 0.25s', flexShrink: 0 }}>→</span>
    </div>
  );
}
