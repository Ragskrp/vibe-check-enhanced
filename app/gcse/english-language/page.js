'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Flame, Trophy, PenTool, Book, Type, MessageSquare, ArrowRight, Sparkles, Languages, Activity } from 'lucide-react';
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
              <SubjectIcon subject="english-language" color={COLOR} size={100} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif', marginBottom: 16 }}>
              AQA · GCSE English Language
            </div>
            <h1 style={{ fontSize: 'clamp(48px,9vw,110px)', fontWeight: 200, lineHeight: 1.0, letterSpacing: '-0.04em', color: '#fff', marginBottom: 24 }}>
              Linguistic<br />
              <span style={{ fontWeight: 800, background: `linear-gradient(135deg,#fff 30%,${COLOR} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dexterity.</span>
            </h1>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 540, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
              Command the language. From surgical reading analysis to evocative creative writing—precision practice for the ultimate communicator.
            </p>
            
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
               {stats && (
                <div style={{ display: 'inline-flex', gap: 32, padding: '16px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scripts</span>
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
                   PRACTICE LINGUISTICS →
                </div>
              </Link>
            </div>
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* ── AO GRID ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px clamp(20px,5vw,100px)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Languages size={18} color="rgba(255,255,255,0.3)" />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif' }}>Assessment Objectives</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 1, border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
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
        </section>

        {/* ── TOPIC GRID ── */}
        <section id="topics" ref={grid.ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 100px' }}>
          {categories.length > 0 ? categories.map((cat, catIdx) => {
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
                    <Link key={topic.slug} href={`/gcse/english-language/${topic.slug}`} style={{ textDecoration: 'none' }}>
                      <TopicCell topic={topic} accentColor={catColor} delay={idx * 30} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          }) : (
             <div style={{ padding: '80px 0', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 14, fontFamily: 'Inter,sans-serif', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 20 }}>
              <Book size={32} style={{ marginBottom: 16, opacity: 0.5 }} />
              <p>Curriculum strands are currently being indexed.</p>
            </div>
          )}
        </section>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 100px' }}>
          <AdBanner format="horizontal" />
          <div style={{ marginTop: 80 }}>
            <PageValueSection
              title="Linguistic Precision & Performance"
              summary="English Language is a performance. It requires the ability to deconstruct complex texts and reconstruct evocative prose under strict temporal constraints."
              points={[
                { label: 'Analytical Speed', text: 'Practicing AO1–AO4 retrieval tasks builds the mental speed needed to find evidence in unseen texts within the first 15 minutes of the exam.' },
                { label: 'Technical Accuracy (AO6)', text: 'Our writing modules emphasize varied punctuation and sophisticated vocabulary, ensuring you secure the 16 marks available for SPaG.' },
                { label: 'Structural Synthesis', text: 'We teach you to see the "architecture" of a text—how a writer shifts focus and builds tension through deliberate structural choices.' },
              ]}
              checklist={['Practice one "Word-Level Zoom" analysis every day to sharpen your AO2 skills.', 'Recall the list of 10 sophisticated punctuation marks and use them in a creative writing burst.', 'Identify the specific "command word" in every practice question before responding.']}
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

function AOCell({ ao, label, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '24px 20px', background: hov ? 'rgba(255,255,255,0.04)' : 'transparent', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default' }}>
      <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.04em', color, marginBottom: 4, transition: 'transform 0.2s', transform: hov ? 'scale(1.1)' : 'scale(1)' }}>{ao}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: hov ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'color 0.2s', fontFamily: 'Inter,sans-serif' }}>{label}</div>
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
