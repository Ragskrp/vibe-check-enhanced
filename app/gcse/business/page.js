'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Flame, Trophy, Briefcase, BarChart3, Users, DollarSign, ArrowRight, TrendingUp, Landmark, Activity } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './businessData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';

const COLOR = '#ffe600';
const CATEGORY_COLORS = { 'Real World': '#ff6b35', 'Operations': '#00d4ff', 'Human Resources': '#00ff94', 'Finance': '#ffe600' };

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

export default function BusinessHub() {
  const [mounted, setMounted] = useState(false);
  const stats = useStoredStats('gcse-business-stats');
  const topicsByCategory = getTopicsByCategory();
  const hero = useScrollReveal(0.05);
  const grid = useScrollReveal(0.05);
  const categories = Object.keys(topicsByCategory);

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
              <SubjectIcon subject="business" color={COLOR} size={100} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif', marginBottom: 16 }}>
              AQA · GCSE Business Studies
            </div>
            <h1 style={{ fontSize: 'clamp(48px,9vw,110px)', fontWeight: 200, lineHeight: 1.0, letterSpacing: '-0.04em', color: '#fff', marginBottom: 24 }}>
              Strategic<br />
              <span style={{ fontWeight: 800, background: `linear-gradient(135deg,#fff 30%,${COLOR} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Enterprise.</span>
            </h1>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 540, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
              Master the mechanics of the market. From venture capital to corporate operations—comprehensive, exam-aligned practice for future leaders.
            </p>
            
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
               {stats && (
                <div style={{ display: 'inline-flex', gap: 32, padding: '16px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Decisions</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><Trophy size={16} color="#ffe600" /> {stats.totalPlays || 0}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Best Streak</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><Flame size={16} color="#ff6b35" /> {stats.bestStreak || 0}</span>
                  </div>
                </div>
              )}
              <Link href="#topics" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '16px 32px', borderRadius: 8, background: COLOR, color: '#000', fontWeight: 800, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s', boxShadow: `0 10px 30px ${COLOR}40` }}>
                   PRACTICE ENTERPRISE →
                </div>
              </Link>
            </div>
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* ── TOPIC GRID ── */}
        <section id="topics" ref={grid.ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '80px clamp(20px,5vw,100px) 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <Landmark size={18} color="rgba(255,255,255,0.3)" />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif' }}>Business Domains</div>
          </div>
          {categories.map((cat, catIdx) => {
            const topics = topicsByCategory[cat];
            if (!topics?.length) return null;
            const catColor = CATEGORY_COLORS[cat] || COLOR;
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
                    <Link key={topic.slug} href={`/gcse/business/${topic.slug}`} style={{ textDecoration: 'none' }}>
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
              title="Commercial Awareness & Analysis"
              summary="Business success is built on understanding relationships—between costs and profit, between employees and productivity, and between marketing and sales."
              points={[
                { label: 'Calculated Reasoning', text: 'Mastering the formulas for Break-even, Margin of Safety, and Gross Profit is essential for high-mark quantitative questions.' },
                { label: 'Contextual Application', text: 'High-tier responses don’t just define terms; they explain how a specific business decision impacts a specific stakeholder.' },
                { label: 'Market Logic', text: 'Our tools emphasize the "why" behind business moves, helping you build the commercial intuition needed for paper 2 case studies.' },
              ]}
              checklist={['Recall the 4 Ps of Marketing and how they adapt to different product life-cycles.', 'Memorize the formula for Net Profit Margin and how to improve it.', 'Explain the difference between Internal and External growth from memory.']}
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
