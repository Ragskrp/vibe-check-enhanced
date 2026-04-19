'use client';

import Link from 'next/link';
import { ArrowRight, Flame, Trophy, Calculator } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './topicData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';

// Branded featured games (existing custom pages)
const FEATURED = [
  { title: 'Equation Rush', emoji: '⚡', description: 'Speed algebra — solve equations against the clock.', href: '/gcse/maths/equation-rush', color: '#00e5a0', tag: 'POPULAR' },
  { title: 'Fraction Frenzy', emoji: '🥧', description: 'Fractions, decimals, percentages — conversions & calculations.', href: '/gcse/maths/fraction-frenzy', color: '#00d4ff', tag: 'POPULAR' },
  { title: 'Angle Snapper', emoji: '📐', description: 'Geometry angles — triangles, polygons, parallel lines.', href: '/gcse/maths/angle-snapper', color: '#b14aed', tag: 'POPULAR' },
];

const CATEGORY_ORDER = ['Number', 'Algebra', 'Geometry', 'Statistics'];
const CATEGORY_COLORS = { Number: '#00e5a0', Algebra: '#00d4ff', Geometry: '#b14aed', Statistics: '#ff6b35' };

export default function MathsHub() {
  const stats = useStoredStats('gcse-maths-stats');
  const topicsByCategory = getTopicsByCategory();

  return (
    <div className="game-container" style={{ maxWidth: 900 }}>
      <div className="animate-fade-in">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="game-badge">GCSE Revision</div>
          <h1 className="game-title" style={{ color: '#00e5a0' }}>
            <Calculator size={32} /> Maths
          </h1>
          <p className="game-subtitle">
            Interactive revision tools covering the full GCSE Maths specification — Foundation & Higher tiers.
          </p>

          {stats && (
            <div style={{
              display: 'inline-flex', gap: 20, padding: '12px 24px', borderRadius: 14,
              background: 'rgba(255,230,0,0.06)', border: '1px solid rgba(255,230,0,0.15)', marginTop: 12,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#ffe600' }}><Trophy size={14} /> {stats.totalPlays || 0} plays</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#ff6b35' }}><Flame size={14} /> {stats.bestStreak || 0} best streak</span>
            </div>
          )}
        </div>

        {/* Featured Games */}
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#888', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            ⭐ Featured Games
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {FEATURED.map((tool) => (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '20px', borderRadius: 16, background: 'var(--bg-card)',
                  border: `1.5px solid ${tool.color}30`, cursor: 'pointer',
                  transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                }} onMouseOver={(e) => e.currentTarget.style.borderColor = tool.color}
                   onMouseOut={(e) => e.currentTarget.style.borderColor = `${tool.color}30`}>
                  <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 10, fontWeight: 800, color: '#000', background: tool.color, padding: '2px 8px', borderRadius: 6 }}>{tool.tag}</div>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{tool.emoji}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#f0f0f0', marginBottom: 4 }}>{tool.title}</div>
                  <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5, marginBottom: 8 }}>{tool.description}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: tool.color }}>
                    Play <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad */}
        <AdBanner format="horizontal" />

        {/* All Topics by Category */}
        {CATEGORY_ORDER.map((cat) => {
          const topics = topicsByCategory[cat];
          if (!topics || topics.length === 0) return null;
          const catColor = CATEGORY_COLORS[cat] || '#888';
          return (
            <section key={cat} style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: catColor, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {cat}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {topics.map((topic) => (
                  <Link key={topic.slug} href={`/gcse/maths/${topic.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '16px', borderRadius: 14, background: 'var(--bg-card)',
                      border: '1.5px solid var(--border-light)', cursor: 'pointer',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12,
                    }} onMouseOver={(e) => e.currentTarget.style.borderColor = topic.color}
                       onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                      <span style={{ fontSize: 24 }}>{topic.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#f0f0f0' }}>{topic.title}</div>
                        <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{topic.description}</div>
                      </div>
                      <ArrowRight size={14} style={{ color: '#555' }} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom ad */}
        <div style={{ marginTop: 32 }}>
          <AdBanner format="horizontal" />
        </div>

        <PageValueSection
          title="Use This Maths Hub For High-Value Revision"
          summary="This hub is built for active recall, not passive reading. Use one focused category, complete short sessions, and track weak areas with repeat attempts."
          points={[
            { label: 'Exam-targeted practice', text: 'Each topic is mapped to GCSE maths areas including Number, Algebra, Geometry, and Statistics.' },
            { label: 'Fast feedback loop', text: 'Short rounds show mistakes quickly so you can correct methods before bad habits lock in.' },
            { label: 'Retention by repetition', text: 'Returning to the same topic after 24-48 hours improves long-term recall more than one long cram session.' },
          ]}
          checklist={[
            'Pick one category and complete 2-3 topics per session.',
            'Note any formula errors and repeat the same topic once.',
            'Move to timed tools only after accuracy is stable.',
          ]}
        />
      </div>
    </div>
  );
}
