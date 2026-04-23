'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Flame, Trophy } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './englishLanguageData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';

const COLOR = '#ffe600';
const CATEGORY_COLORS = {
  'Reading': '#00d4ff',
  'Writing': '#ffe600',
  'Speaking & Listening': '#00e5a0',
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

export default function EnglishLanguageHub() {
  const [mounted, setMounted] = useState(false);
  const stats = useStoredStats('gcse-english-lang-stats');
  const topicsByCategory = getTopicsByCategory ? getTopicsByCategory() : {};
  const grid = useScrollReveal(0.05);
  const categories = Object.keys(topicsByCategory);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <SubjectCanvas accentColor={COLOR} />
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(20px,5vw,100px)', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
            <div style={{ marginBottom: 24 }}><SubjectIcon subject="english-language" color={COLOR} size={80} /></div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif', marginBottom: 14 }}>GCSE · AQA English</div>
            <h1 style={{ fontSize: 'clamp(44px,8vw,88px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', marginBottom: 20 }}>
              English<br />
              <span style={{ fontWeight: 700, background: `linear-gradient(135deg,#fff 40%,${COLOR} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Language.</span>
            </h1>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 480, lineHeight: 1.75, marginBottom: 36 }}>
              Reading analysis (AO1–AO4), creative writing (AO5), and transactional writing — all AQA-aligned.
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

        {/* ── OVERVIEW CARDS (AO breakdown) ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,100px)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif', marginBottom: 24 }}>Assessment Objectives</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 1, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden', marginBottom: 48 }}>
            {[
              { ao: 'AO1', label: 'Identify & Interpret', color: '#00d4ff' },
              { ao: 'AO2', label: 'Language Analysis', color: '#00e5a0' },
              { ao: 'AO3', label: 'Structure Analysis', color: '#ff2d78' },
              { ao: 'AO4', label: 'Compare & Evaluate', color: '#b14aed' },
              { ao: 'AO5', label: 'Creative Writing', color: '#ffe600' },
              { ao: 'AO6', label: 'Technical Accuracy', color: '#ff6b35' },
            ].map(({ ao, label, color }) => (
              <AOCell key={ao} ao={ao} label={label} color={color} />
            ))}
          </div>

          {/* Topic grid */}
          <div ref={grid.ref}>
            {categories.length > 0 ? categories.map(cat => {
              const topics = topicsByCategory[cat];
              if (!topics?.length) return null;
              const catColor = CATEGORY_COLORS[cat] || COLOR;
              return (
                <div key={cat} style={{ marginBottom: 56 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: catColor }}>{cat}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: 'Inter,sans-serif', fontWeight: 700 }}>{topics.length} topics</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 1, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                    {topics.map((topic, idx) => (
                      <Link key={topic.slug} href={`/gcse/english-language/${topic.slug}`} style={{ textDecoration: 'none' }}>
                        <TopicCell topic={topic} accentColor={catColor} delay={idx * 40} visible={grid.visible} />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }) : (
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 14, fontFamily: 'Inter,sans-serif' }}>
                Topics loading or not yet available — check back soon.
              </div>
            )}
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 40px' }}>
          <AdBanner format="horizontal" />
          <PageValueSection
            title="Revising English Language Smartly"
            summary="Language is about pattern recognition and vocabulary precision. Short targeted rounds outperform long passive re-reading."
            points={[
              { label: 'AO-mapped practice', text: 'Each topic targets a specific Assessment Objective so you know what the examiner is marking.' },
              { label: 'Craft over content', text: 'The exam rewards technique (language, structure, form) not just what you say.' },
              { label: 'Write to a model', text: 'After any reading analysis, attempt a short paragraph before comparing to a model answer.' },
            ]}
            checklist={['Identify the AO before answering any question.', 'Quote — then explain effect — then zoom in on a word.', 'Time yourself: 12 minutes per question for Paper 1 Section A.']}
          />
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'); body{background:#000!important}
        @keyframes cellIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </>
  );
}

function AOCell({ ao, label, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '20px', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: hov ? 'rgba(255,255,255,0.03)' : 'transparent', transition: 'background 0.25s', cursor: 'default' }}>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color, marginBottom: 4 }}>{ao}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter,sans-serif' }}>{label}</div>
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
