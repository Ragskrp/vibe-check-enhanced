'use client';

import Link from 'next/link';
import { ArrowRight, Flame, Trophy, PenTool } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './englishLanguageData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';

const FEATURED = [
  { title: 'Persuasion Master', emoji: '📢', description: 'Master AFOREST and rhetorical devices to win every argument.', href: '/gcse/english-language/persuasive-devices', color: '#ff2d78', tag: 'BEST FOR P2' },
  { title: 'Structure Lab', emoji: '🧱', description: 'Analyze shifts in focus and structural patterns like an examiner.', href: '/gcse/english-language/structure-analysis', color: '#00e5a0', tag: 'ESSENTIAL' },
  { title: 'Show Don\'t Tell', emoji: '🖋️', description: 'Transform boring sentences into vivid narrative masterpieces.', href: '/gcse/english-language/narrative-descriptive', color: '#00d4ff', tag: 'CREATIVE' },
];

const CATEGORY_ORDER = ['Paper 1 Reading', 'Paper 1 Writing', 'Paper 2 Reading', 'Paper 2 Writing'];
const CATEGORY_COLORS = { 'Paper 1 Reading': '#00e5a0', 'Paper 1 Writing': '#00d4ff', 'Paper 2 Reading': '#ff6b35', 'Paper 2 Writing': '#ff2d78' };

export default function EnglishLanguageHub() {
  const stats = useStoredStats('gcse-english-lang-stats');
  const topicsByCategory = getTopicsByCategory();

  return (
    <div className="game-container" style={{ maxWidth: 900 }}>
      <div className="animate-fade-in">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="game-badge">GCSE Revision</div>
          <h1 className="game-title" style={{ color: '#00d4ff' }}>
            <PenTool size={32} /> English Language
          </h1>
          <p className="game-subtitle">
            Master the skills for AQA English Language Paper 1 and 2. Analyzing texts, creative writing, and persuasive techniques.
          </p>

          {stats && (
            <div style={{
              display: 'inline-flex', gap: 20, padding: '12px 24px', borderRadius: 14,
              background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', marginTop: 12,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#00d4ff' }}><Trophy size={14} /> {stats.totalPlays || 0} plays</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#ff6b35' }}><Flame size={14} /> {stats.bestStreak || 0} best streak</span>
            </div>
          )}
        </div>

        {/* Featured Tools */}
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#888', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            ⭐ Featured Skills
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
                    Practice <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <AdBanner format="horizontal" />

        {/* All Topics */}
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
                  <Link key={topic.slug} href={`/gcse/english-language/${topic.slug}`} style={{ textDecoration: 'none' }}>
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

        <div style={{ marginTop: 32 }}>
          <AdBanner format="horizontal" />
        </div>

        <PageValueSection
          title="Master English Language Analysis"
          summary="English is about skill, not just memory. Practice identifying devices and explaining their effects repeatedly to build 'analyzer muscle memory'."
          points={[
            { label: 'AO-Focused Practice', text: 'Every topic is mapped directly to the Assessment Objectives (AOs) used by AQA examiners.' },
            { label: 'Technique Recognition', text: 'Timed quizzes help you spot similes, metaphors, and structural shifts in seconds.' },
            { label: 'Creative Vocabulary', text: 'Lessons include word banks and high-level vocabulary to boost your SPAG and writing marks.' },
          ]}
          checklist={[
            'Learn the AFOREST mnemonic for persuasive writing.',
            'Practice the difference between Language and Structure analysis.',
            'Revisit writing tips to improve your AO6 (SPAG) accuracy.',
          ]}
        />
      </div>
    </div>
  );
}
