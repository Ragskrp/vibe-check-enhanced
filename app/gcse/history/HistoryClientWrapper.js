'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Trophy, Flame, Scroll, GitCommit } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './historyData';
import { useAggregatedStats } from '../components/DashboardStats';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';
import MasteryMap from '../components/MasteryMap';
import InteractiveActivity from '../components/InteractiveActivity';

const COLOR = '#ff6b35';
const CATEGORY_ORDER = ['Medicine in Britain', 'Weimar and Nazi Germany', 'Cold War Relations'];
const CATEGORY_COLORS = {
  'Medicine in Britain': '#ff6b35',
  'Weimar and Nazi Germany': '#ff2d78',
  'Cold War Relations': '#00d4ff'
};

function TopicCell({ topic, accentColor, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        position: 'relative', 
        padding: 20, 
        borderRadius: 16, 
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.05)', 
        borderColor: hovered ? `${accentColor}40` : 'rgba(255,255,255,0.05)',
        animation: `cellReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`, 
        overflow: 'hidden', 
        cursor: 'pointer', 
        transition: 'all 0.3s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)'
      }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, bottom: 0, background: accentColor }} />
      <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{topic.title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5 }}>{topic.description}</p>
    </div>
  );
}

export default function HistoryClientWrapper() {
  const stats = useAggregatedStats();
  const topicsByCategory = getTopicsByCategory();

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <SubjectCanvas accentColor={COLOR} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* ── HERO ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) clamp(20px,5vw,100px) 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <SubjectIcon icon={Scroll} color={COLOR} />
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLOR }}>
              Edexcel / AQA · GCSE History Games
            </div>
          </div>
          
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', margin: '0 0 24px 0' }}>
            GCSE <br />
            <span style={{ color: 'transparent', WebkitTextStroke: `1px ${COLOR}` }}>History Games</span>
          </h1>
          
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.6)', maxWidth: 600, lineHeight: 1.6, marginBottom: 40 }}>
            Master chronology, evaluate sources, and build perfect narrative accounts through interactive play. Spaced repetition for historical mastery.
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
            <Link href="/gcse/history/mixed-mode" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 32px', borderRadius: 8, background: `rgba(255,107,53,0.1)`, border: `2px solid ${COLOR}`, color: COLOR, fontWeight: 800, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s' }}>
                 PLAY MIXED GAMES
              </div>
            </Link>
            <Link href="/gcse/history/mock-exam" style={{ textDecoration: 'none' }}>
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
            statsKey="gcse-history-stats" 
            accentColor={COLOR}
            subjectId="history"
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
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{cat} Games</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
                  {topics.map((topic, idx) => (
                    <Link key={topic.slug} href={`/gcse/history/${topic.slug}`} style={{ textDecoration: 'none' }}>
                      <TopicCell topic={topic} accentColor={catColor} delay={idx * 30} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── HISTORY LAB ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <GitCommit size={18} color={COLOR} />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLOR, fontFamily: 'Inter,sans-serif' }}>History Discovery Lab</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            <InteractiveActivity 
              type="timeline-sort"
              accentColor="#ff2d78"
              data={{
                title: 'Chronology: Rise of the Nazis',
                instruction: 'Sort these events into the correct chronological order (earliest at the top).',
                items: [
                  { id: 't1', label: 'Spartacist Uprising', desc: 'Communist revolt in Berlin' },
                  { id: 't2', label: 'Munich Putsch', desc: 'Hitler attempts to seize power' },
                  { id: 't3', label: 'Wall Street Crash', desc: 'Triggers the Great Depression' },
                  { id: 't4', label: 'Hitler becomes Chancellor', desc: 'Hindenburg appoints Hitler' }
                ],
                correctOrder: ['t1', 't2', 't3', 't4']
              }}
            />

            <InteractiveActivity 
              type="match"
              accentColor="#ff6b35"
              data={{
                title: 'Medicine: Key Individuals',
                instruction: 'Match the historical figure to their major contribution.',
                left: [
                  { id: '1', label: 'Hippocrates' },
                  { id: '2', label: 'Vesalius' },
                  { id: '3', label: 'Harvey' },
                  { id: '4', label: 'Sydenham' }
                ],
                right: [
                  { id: 'a', label: 'Circulation of blood' },
                  { id: 'b', label: 'Theory of Four Humours' },
                  { id: 'c', label: 'English Hippocrates' },
                  { id: 'd', label: 'Fabric of the Human Body' }
                ],
                pairs: { '1': 'b', '2': 'd', '3': 'a', '4': 'c' }
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
