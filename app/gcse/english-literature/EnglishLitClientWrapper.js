'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Trophy, Flame, ArrowRight, GraduationCap } from 'lucide-react';
import PedagogyBridge from '../components/PedagogyBridge';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './englishLiteratureData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';
import MasteryMap from '../components/MasteryMap';

const COLOR = '#b14aed';
const CATEGORY_COLORS = {
  'Shakespeare': '#b14aed',
  '19th Century Novel': '#ff2d78',
  'Modern Drama': '#00d4ff',
  'Poetry': '#ffe600',
  'Unseen Poetry': '#00e5a0',
};

export default function EnglishLitClientWrapper() {
  const [mounted, setMounted] = useState(false);
  const stats = useStoredStats('gcse-english-lit-stats');
  const topicsByCategory = getTopicsByCategory ? getTopicsByCategory() : {};
  const categories = Object.keys(topicsByCategory);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <SubjectCanvas accentColor={COLOR} />
      <div className="hub-wrapper" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', background: 'transparent' }}>
        <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(24px, 8vw, 120px)', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(40px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
               <div style={{ padding: 12, borderRadius: 16, background: 'rgba(177, 74, 237, 0.1)', border: '1px solid rgba(177, 74, 237, 0.2)', boxShadow: '0 0 30px rgba(177, 74, 237, 0.15)' }}>
                  <SubjectIcon subject="english-literature" color={COLOR} size={48} />
               </div>
               <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, rgba(177, 74, 237, 0.5), transparent)' }} />
               <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>AQA · GCSE English Literature Games</span>
            </div>
            <h1 style={{ fontSize: 'clamp(56px, 11vw, 130px)', fontWeight: 200, lineHeight: 0.9, letterSpacing: '-0.05em', color: '#fff', marginBottom: 32 }}>
              The Literary<br />
              <span style={{ fontWeight: 900, background: `linear-gradient(to bottom, #fff 20%, ${COLOR} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.02em' }}>
                CANON GAMES.
              </span>
            </h1>
            <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'rgba(255,255,255,0.5)', maxWidth: 600, lineHeight: 1.7, marginBottom: 56, fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>
              Master the art of analysis through play. From Shakespearean tragedy games to modern novel practice—interactive GCSE English Literature revision.
            </p>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
               <Link href="#topics" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '20px 48px', borderRadius: 14, background: COLOR, color: '#000', fontWeight: 900, fontSize: 15, letterSpacing: '0.05em', boxShadow: `0 15px 40px ${COLOR}50`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }}>
                    PLAY LITERATURE GAMES
                  </div>
               </Link>
               {stats && (
                 <div style={{ display: 'flex', gap: 32, padding: '16px 32px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                       <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sessions</span>
                       <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Trophy size={18} color="#ffe600" /> {stats.totalPlays || 0}
                       </span>
                    </div>
                    <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                       <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Elo Rating</span>
                       <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Flame size={18} color="#ff6b35" /> {stats.bestStreak || 0}
                       </span>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px, 8vw, 120px) 80px' }}>
          <MasteryMap 
            topics={Object.values(topicsByCategory).flat()} 
            statsKey="gcse-english-lit-stats" 
            accentColor={COLOR}
            subjectId="english-literature"
          />
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        <section style={{ maxWidth: 1400, margin: '0 auto', padding: '100px clamp(24px, 8vw, 120px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
             <GraduationCap size={20} color={COLOR} />
             <h2 style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Assessment Objectives</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
             <AOCell id="AO1" title="Recall & Selection Games" desc="Maintaining a precise, high-value quote bank for rapid evidence retrieval under timed game conditions." color="#00d4ff" />
             <AOCell id="AO2" title="Language & Form Games" desc="Analyzing the writer's craft through interactive structural shifts and poetic meter modules." color="#ff2d78" />
             <AOCell id="AO3" title="Contextual Weaving Games" desc="Synthesizing historical and social context into the analysis of characters and themes via interactive timelines." color="#00ff94" />
          </div>
        </section>

        <section id="topics" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px, 8vw, 120px) 120px' }}>
           {categories.map((cat, catIdx) => {
              const topics = topicsByCategory[cat];
              if (!topics?.length) return null;
              const catColor = CATEGORY_COLORS[cat] || COLOR;
              return (
                <div key={cat} style={{ marginBottom: 100 }}>
                   <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                         <div style={{ width: 12, height: 12, borderRadius: 4, background: catColor, boxShadow: `0 0 15px ${catColor}60` }} />
                         <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{cat} Games</h3>
                      </div>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>{topics.length} GAMES</span>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                      {topics.map((topic, tIdx) => (
                         <TopicCell key={topic.slug} topic={topic} accentColor={catColor} delay={tIdx * 40} />
                      ))}
                   </div>
                </div>
              )
           })}
        </section>

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px, 8vw, 120px) 120px' }}>
           <AdBanner format="horizontal" />
           <div style={{ marginTop: 120 }}>
              <PedagogyBridge type="mnemonics" />
              <PageValueSection 
                title="The Architecture of GCSE Literature Games"
                summary="GCSE English Literature is a test of retrieval. Our platform is engineered to bridge the gap between simple recall and high-tier critique through play."
                points={[
                  { label: 'Retrieval Strength Games', text: 'Practicing quote retrieval in short, timed game bursts builds the neural speed required for exam evidence.' },
                  { label: 'Contextual Synthesis', text: 'Our interactive modules help you weave historical context (AO3) into the analysis of form and language.' },
                  { label: 'Comparative Logic Modules', text: 'Identify surprising connections between conceptually distinct poems through our interactive poetry anthology games.' }
                ]}
                checklist={[
                  'Play the Quote Retrieval game and master 3-5 quotes per character.',
                  'Complete one "blind" paragraph analysis module per week.',
                  'Compare two poems in our interactive poetry anthology games.'
                ]}
              />
           </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;800;900&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function AOCell({ id, title, desc, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: 32, borderRadius: 24, background: hov ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`, display: 'flex', flexDirection: 'column', gap: 16, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'default', transform: hov ? 'translateY(-4px)' : 'none' }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: '#000', background: color, padding: '2px 8px', borderRadius: 4 }}>{id}</span>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{title}</h4>
       </div>
       <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  )
}

function TopicCell({ topic, accentColor, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/gcse/english-literature/${topic.slug}`} style={{ textDecoration: 'none' }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ padding: '32px', borderRadius: 24, background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', flexDirection: 'column', gap: 16, height: '100%', position: 'relative', overflow: 'hidden', animation: `fadeInUp 0.6s ease-out ${delay}ms both`, transform: hovered ? 'translateY(-6px)' : 'none', boxShadow: hovered ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${accentColor}10` : 'none' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at top left, ${accentColor}05 0%, transparent 60%)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.03)', fontSize: 24 }}>{topic.emoji || '📖'}</div>
          <ArrowRight size={20} color={hovered ? accentColor : 'rgba(255,255,255,0.1)'} style={{ transform: hovered ? 'translateX(0)' : 'translateX(-10px)', opacity: hovered ? 1 : 0, transition: 'all 0.3s' }} />
        </div>
        <div>
          <h4 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{topic.title} Game</h4>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginBottom: 0 }}>{topic.description}</p>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
           <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)', padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Level 9 Game</span>
           <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)', padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interactive</span>
        </div>
      </div>
    </Link>
  );
}
