'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Map, Trophy, Flame, Globe, Mountain, Droplets, MapPin, Wind } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './geographyData';
import { useAggregatedStats } from '../components/DashboardStats';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';
import MasteryMap from '../components/MasteryMap';
import InteractiveActivity from '../components/InteractiveActivity';

const COLOR = '#ffe600';
const CATEGORY_ORDER = ['Physical Geography', 'Human Geography'];
const CATEGORY_COLORS = {
  'Physical Geography': '#00e5a0',
  'Human Geography': '#ffe600'
};

function TopicCell({ topic, accentColor, delay }) {
  return (
    <div style={{ position: 'relative', padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', animation: `cellReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s', ':hover': { transform: 'translateY(-2px)', background: 'rgba(255,255,255,0.04)', borderColor: `${accentColor}40` } }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, bottom: 0, background: accentColor }} />
      <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{topic.title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5 }}>{topic.description}</p>
    </div>
  );
}

export default function GeographyHub() {
  const stats = useAggregatedStats();
  const topicsByCategory = getTopicsByCategory();

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <SubjectCanvas color={COLOR} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* ── HERO ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) clamp(20px,5vw,100px) 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <SubjectIcon icon={Globe} color={COLOR} />
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLOR }}>
              AQA / Edexcel
            </div>
          </div>
          
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', margin: '0 0 24px 0' }}>
            GCSE <br />
            <span style={{ color: 'transparent', WebkitTextStroke: `1px ${COLOR}` }}>Geography</span>
          </h1>
          
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.6)', maxWidth: 600, lineHeight: 1.6, marginBottom: 40 }}>
            Physical processes, human environments, and critical case studies. Master the specification through active recall.
          </p>
        </section>

        {/* ── STATS DASHBOARD ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#888', marginBottom: 12, fontSize: 13, fontWeight: 700 }}>
                <Trophy size={16} /> Topics Mastered
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#fff' }}>{stats.totalMastered}</div>
            </div>
            <div style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#888', marginBottom: 12, fontSize: 13, fontWeight: 700 }}>
                <Flame size={16} color="#ff6b35" /> Global Streak
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#fff' }}>{stats.globalStreak}<span style={{ fontSize: 16, color: '#888', marginLeft: 8 }}>days</span></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', marginTop: 32 }}>
            <Link href="/gcse/geography/mixed-mode" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 32px', borderRadius: 8, background: `rgba(255,230,0,0.1)`, border: `2px solid ${COLOR}`, color: COLOR, fontWeight: 800, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s' }}>
                 MIXED PRACTICE
              </div>
            </Link>
            <Link href="/gcse/geography/mock-exam" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 32px', borderRadius: 8, background: 'transparent', border: `2px solid rgba(255,255,255,0.2)`, color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s' }}>
                 FULL MOCK EXAM
              </div>
            </Link>
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* ── MASTERY CONSTELLATION ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 80px' }}>
          <MasteryMap 
            topics={Object.values(topicsByCategory).flat()} 
            statsKey="gcse-geography-stats" 
            accentColor={COLOR}
            subjectId="geography"
          />
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* ── TOPIC GRID ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 80px' }}>
          {CATEGORY_ORDER.map((cat, catIdx) => {
            const topics = topicsByCategory[cat];
            if (!topics?.length) return null;
            const catColor = CATEGORY_COLORS[cat] || COLOR;
            return (
              <div key={cat} style={{ marginBottom: 80 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: catColor, boxShadow: `0 0 10px ${catColor}` }} />
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{cat}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
                  {topics.map((topic, idx) => (
                    <Link key={topic.slug} href={`/gcse/geography/${topic.slug}`} style={{ textDecoration: 'none' }}>
                      <TopicCell topic={topic} accentColor={catColor} delay={idx * 30} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── GEOGRAPHY LAB ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <MapPin size={18} color={COLOR} />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLOR, fontFamily: 'Inter,sans-serif' }}>Geography Discovery Lab</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            <InteractiveActivity 
              type="category-sort"
              accentColor="#00e5a0"
              data={{
                title: 'Tectonic Hazards: Effects',
                instruction: 'Sort these effects into Primary (immediate) and Secondary (subsequent) impacts.',
                categories: [
                  { id: 'primary', label: 'Primary Effect', color: '#ff2d78' },
                  { id: 'secondary', label: 'Secondary Effect', color: '#00d4ff' }
                ],
                items: [
                  { id: '1', label: 'Buildings collapse', category: 'primary' },
                  { id: '2', label: 'Tsunami strikes coast', category: 'secondary' },
                  { id: '3', label: 'Roads crack open', category: 'primary' },
                  { id: '4', label: 'Disease spreads in camps', category: 'secondary' },
                  { id: '5', label: 'Bridges fall down', category: 'primary' },
                  { id: '6', label: 'Fires from broken gas pipes', category: 'secondary' }
                ]
              }}
            />

            <InteractiveActivity 
              type="true-false"
              accentColor="#ffe600"
              data={{
                title: 'Weather Hazards: True or False?',
                instruction: 'Test your knowledge on tropical storms.',
                statements: [
                  { id: '1', statement: 'Tropical storms need sea temperatures above 27°C to form.', correct: true, explanation: 'The warm water provides the energy needed for the storm to develop.' },
                  { id: '2', statement: 'The Coriolis effect is strongest at the equator.', correct: false, explanation: 'The Coriolis effect is zero at the equator, which is why storms do not form exactly on it.' },
                  { id: '3', statement: 'Tropical storms lose energy when they hit land.', correct: true, explanation: 'They lose their source of energy (warm water) and friction with land slows them down.' },
                  { id: '4', statement: 'The eye of the storm has the strongest winds.', correct: false, explanation: 'The eye wall has the strongest winds. The eye itself is calm and clear.' }
                ]
              }}
            />
          </div>
        </section>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 100px' }}>
          <AdBanner format="horizontal" />
        </div>
      </div>
      <style>{`
        @keyframes cellReveal {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
