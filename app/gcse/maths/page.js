'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Flame, Trophy, FunctionSquare, Binary, Calculator, Target, Sparkles, TrendingUp } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './topicData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';

const COLOR = '#00e5a0';
const FEATURED = [
  { title: 'Equation Rush', desc: 'Speed algebra — solve linear and quadratic equations against the clock.', href: '/gcse/maths/equation-rush', color: '#00e5a0', tag: 'POPULAR' },
  { title: 'Fraction Frenzy', desc: 'Fractions, decimals, percentages — conversions & complex calculations.', href: '/gcse/maths/fraction-frenzy', color: '#00d4ff', tag: 'CORE' },
  { title: 'Angle Snapper', desc: 'Geometry & trigonometry — triangles, polygons, and parallel lines.', href: '/gcse/maths/angle-snapper', color: '#b14aed', tag: 'GEOMETRY' },
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
          minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 clamp(20px,5vw,100px)', maxWidth: 1200, margin: '0 auto',
        }}>
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ marginBottom: 32, filter: `drop-shadow(0 0 20px ${COLOR}40)` }}>
              <SubjectIcon subject="maths" color={COLOR} size={100} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif', marginBottom: 16 }}>
              Foundation & Higher · GCSE Mathematics
            </div>
            <h1 style={{ fontSize: 'clamp(48px,9vw,110px)', fontWeight: 200, lineHeight: 1.0, letterSpacing: '-0.04em', color: '#fff', marginBottom: 24 }}>
              Computational<br />
              <span style={{ fontWeight: 800, background: `linear-gradient(135deg,#fff 30%,${COLOR} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Mastery.</span>
            </h1>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 540, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
              Master the logic of numbers. From advanced algebra to statistical analysis—interactive, curriculum-aligned practice built for absolute fluency.
            </p>
            
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
               {stats && (
                <div style={{ display: 'inline-flex', gap: 32, padding: '16px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sessions</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><Trophy size={16} color="#ffe600" /> {stats.totalPlays || 0}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Best Streak</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><Flame size={16} color="#ff6b35" /> {stats.bestStreak || 0}</span>
                  </div>
                </div>
              )}
              <Link href="#featured" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '16px 32px', borderRadius: 8, background: COLOR, color: '#000', fontWeight: 800, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s', boxShadow: `0 10px 30px ${COLOR}40` }}>
                   PRACTICE NOW →
                </div>
              </Link>
            </div>
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* ── FEATURED GAMES ── */}
        <section id="featured" style={{ maxWidth: 1200, margin: '0 auto', padding: '80px clamp(20px,5vw,100px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Sparkles size={18} color="rgba(255,255,255,0.3)" />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif' }}>Featured Training</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
            {FEATURED.map((tool, idx) => (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                <ToolCell tool={tool} delay={idx * 50} />
              </Link>
            ))}
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* ── TOPIC GRID ── */}
        <section ref={grid.ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '80px clamp(20px,5vw,100px) 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <Binary size={18} color="rgba(255,255,255,0.3)" />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif' }}>Full Curriculum</div>
          </div>
          {CATEGORY_ORDER.map((cat, catIdx) => {
            const topics = topicsByCategory[cat];
            if (!topics?.length) return null;
            const catColor = CATEGORY_COLORS[cat] || '#888';
            return (
              <div key={cat} style={{ marginBottom: 80, opacity: grid.visible ? 1 : 0, transform: grid.visible ? 'none' : 'translateY(20px)', transition: `all 0.8s ease ${catIdx * 0.1}s` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: catColor, boxShadow: `0 0 10px ${catColor}` }} />
                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{cat}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter,sans-serif', fontWeight: 600 }}>{topics.length} Modules</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
                  {topics.map((topic, idx) => (
                    <Link key={topic.slug} href={`/gcse/maths/${topic.slug}`} style={{ textDecoration: 'none' }}>
                      <TopicCell topic={topic} accentColor={catColor} delay={idx * 30} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 100px' }}>
          <AdBanner format="horizontal" />
          <div style={{ marginTop: 80 }}>
            <PageValueSection
              title="Mathematical Fluency & Precision"
              summary="Maths is a language. Mastery comes from high-frequency practice of the core patterns until they become second nature."
              points={[
                { label: 'Pattern Recognition', text: 'Our algebra tools force you to recognize equation types instantly, reducing cognitive load during complex multi-step problems.' },
                { label: 'Precision Under Pressure', text: 'Speed modes like Equation Rush build the mental accuracy needed to avoid "silly mistakes" when time is running out.' },
                { label: 'Curriculum-Aligned Depth', text: 'Every topic is mapped directly to the AQA and Edexcel specifications, ensuring you practice only what actually matters.' },
              ]}
              checklist={['Complete at least 3 topics per session to use the "Interleaving" strategy.', 'Track your "best streak" to maintain focus on accuracy over speed.', 'Return to failed topics within 48 hours for optimal retention.']}
            />
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
        body { background: #000 !important; }
        @keyframes cellReveal {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function ToolCell({ tool, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ 
        padding: '32px 28px', 
        borderRadius: 20,
        background: hov ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)', 
        border: `1px solid ${hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
        cursor: 'pointer', 
        display: 'flex', 
        flexDirection: 'column',
        gap: 16,
        animation: `cellReveal 0.6s ease-out ${delay}ms both`,
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov ? `0 25px 50px rgba(0,0,0,0.5), 0 0 20px ${tool.color}15` : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>
      {hov && <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle,${tool.color}25 0%,transparent 70%)`, pointerEvents: 'none' }} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', background: tool.color, color: '#000', padding: '4px 10px', borderRadius: 4 }}>{tool.tag}</span>
        <ArrowRight size={18} color={hov ? tool.color : 'rgba(255,255,255,0.1)'} style={{ transition: 'all 0.3s', transform: hov ? 'translateX(4px)' : 'none' }} />
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: hov ? '#fff' : 'rgba(255,255,255,0.9)', transition: 'color 0.2s' }}>{tool.title}</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, fontFamily: 'Inter,sans-serif', fontWeight: 400 }}>{tool.desc}</p>
    </div>
  );
}

function TopicCell({ topic, accentColor, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ 
        padding: '24px', 
        borderRadius: 16,
        background: hov ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', 
        border: `1px solid ${hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
        cursor: 'pointer', 
        display: 'flex', 
        flexDirection: 'column',
        gap: 12,
        animation: `cellReveal 0.6s ease-out ${delay}ms both`,
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${accentColor}10` : 'none'
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: hov ? '#fff' : 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}>{topic.title}</div>
        <ArrowRight size={16} color={hov ? accentColor : 'rgba(255,255,255,0.1)'} style={{ transition: 'all 0.3s', transform: hov ? 'translateX(4px)' : 'none' }} />
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif', lineHeight: 1.5, fontWeight: 400 }}>{topic.description}</div>
    </div>
  );
}
