'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Flame, Trophy } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './scienceData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';

const COLOR = '#00d4ff';
const CATEGORY_ORDER = ['Biology', 'Chemistry', 'Physics'];
const CATEGORY_COLORS = { Biology: '#00ff94', Chemistry: '#00d4ff', Physics: '#b14aed' };
const CATEGORY_DESCS = {
  Biology: 'Cells, genetics, ecology, and body systems.',
  Chemistry: 'Atomic structure, bonding, reactions, and analysis.',
  Physics: 'Forces, energy, electricity, waves, and space.',
};

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

export default function ScienceHub() {
  const [mounted, setMounted] = useState(false);
  const stats = useStoredStats('gcse-science-stats');
  const topicsByCategory = getTopicsByCategory();
  const hero = useScrollReveal(0.05);
  const grid = useScrollReveal(0.05);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <SubjectCanvas accentColor={COLOR} />
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section ref={hero.ref} style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(20px,5vw,100px)', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
            <div style={{ marginBottom: 24 }}><SubjectIcon subject="science" color={COLOR} size={80} /></div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif', marginBottom: 14 }}>GCSE Revision</div>
            <h1 style={{ fontSize: 'clamp(44px,8vw,88px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', marginBottom: 20 }}>
              Science.<br />
              <span style={{ fontWeight: 700, background: `linear-gradient(135deg,#fff 40%,${COLOR} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>All three.</span>
            </h1>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 480, lineHeight: 1.75, marginBottom: 36 }}>
              Biology, Chemistry, and Physics — interactive revision for both Foundation and Higher tiers.
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

        {/* ── TOPIC GRID by category ── */}
        <section ref={grid.ref} style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,100px)' }}>
          {CATEGORY_ORDER.map(cat => {
            const topics = topicsByCategory[cat];
            if (!topics?.length) return null;
            const catColor = CATEGORY_COLORS[cat] || '#888';
            return (
              <div key={cat} style={{ marginBottom: 56 }}>
                <div style={{ marginBottom: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: catColor, marginBottom: 4 }}>{cat}</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif' }}>{CATEGORY_DESCS[cat]}</p>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: 'Inter,sans-serif', fontWeight: 700 }}>{topics.length} topics</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 1, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  {topics.map((topic, idx) => (
                    <Link key={topic.slug} href={`/gcse/science/${topic.slug}`} style={{ textDecoration: 'none' }}>
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
            title="How To Revise Science Efficiently Here"
            summary="Alternate topic retrieval and concept review. Use short rounds to find weak concepts, then revisit lesson points before testing again."
            points={[
              { label: 'Specification-aligned topics', text: 'Biology, Chemistry, and Physics follow GCSE exam style and common misconceptions.' },
              { label: 'Foundation and higher support', text: 'Tier options let you practice at the right difficulty.' },
              { label: 'Practical memory gains', text: 'Frequent short recall rounds improve confidence in definitions, equations, and required practicals.' },
            ]}
            checklist={['Start with one subject strand and do 10-15 minutes.', 'Write down two mistakes and one corrected rule.', 'Re-test the same topic tomorrow before moving on.']}
          />
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'); body{background:#000!important}
        @keyframes cellIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </>
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
