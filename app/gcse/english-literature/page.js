'use client';

import Link from 'next/link';
import { ArrowRight, Flame, Trophy, Library } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './englishLiteratureData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';

const FEATURED = [
  { title: 'The Macbeth Hub', emoji: '👑', description: 'Ambition, guilt, and witches. Master the key quotes and themes.', href: '/gcse/english-literature/macbeth', color: '#ff2d78', tag: 'MODERN' },
  { title: 'Inspector\'s Warning', emoji: '🕵️', description: 'Wealth, class, and social responsibility in Priestley\'s masterpiece.', href: '/gcse/english-literature/an-inspector-calls', color: '#00d4ff', tag: 'DRAMA' },
  { title: 'Poetry Comparison', emoji: '💣', description: 'Power and Conflict. Learn why comparing poems is the secret to high marks.', href: '/gcse/english-literature/power-and-conflict', color: '#ff6b35', tag: 'ANTHOLOGY' },
];

const CATEGORY_ORDER = ['Shakespeare', '19th Century Novel', 'Modern Drama', 'Poetry'];
const CATEGORY_COLORS = { 'Shakespeare': '#ff2d78', '19th Century Novel': '#b14aed', 'Modern Drama': '#00d4ff', 'Poetry': '#ff6b35' };

export default function EnglishLiteratureHub() {
  const stats = useStoredStats('gcse-english-lit-stats');
  const topicsByCategory = getTopicsByCategory();

  return (
    <div className="game-container" style={{ maxWidth: 900 }}>
      <div className="animate-fade-in">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="game-badge">GCSE Revision</div>
          <h1 className="game-title" style={{ color: '#ff2d78' }}>
            <Library size={32} /> English Literature
          </h1>
          <p className="game-subtitle">
            Dive into the classics and modern masterpieces. Plot, character theme analysis, and context for AQA 8702.
          </p>

          {stats && (
            <div style={{
              display: 'inline-flex', gap: 20, padding: '12px 24px', borderRadius: 14,
              background: 'rgba(255,45,120,0.06)', border: '1px solid rgba(255,45,120,0.15)', marginTop: 12,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#ff2d78' }}><Trophy size={14} /> {stats.totalPlays || 0} plays</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#ff6b35' }}><Flame size={14} /> {stats.bestStreak || 0} best streak</span>
            </div>
          )}
        </div>

        {/* Featured Tools */}
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#888', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            ⭐ Set Texts
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
                    Study <ArrowRight size={14} />
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
                  <Link key={topic.slug} href={`/gcse/english-literature/${topic.slug}`} style={{ textDecoration: 'none' }}>
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
          title="Master English Literature Analysis"
          summary="Literature is about connecting the dots between plot, character, and the writer's intent. Use these tools to internalize key quotes and understand their deeper social context."
          points={[
            { label: 'Thematic Mapping', text: 'Learn how single quotes like "Out, damned spot!" connect to wider themes of guilt and femininity.' },
            { label: 'Contextual Links', text: 'Each lesson includes the social and historical context (AO3) that examiners look for to award top grades.' },
            { label: 'Comparative Skills', text: 'Practice the skill of linking poems by theme, structure, and language in the Power & Conflict module.' },
          ]}
          checklist={[
            'Memorize at least 3 high-value quotes for each main character.',
            'Understand the social context of each text (e.g., socialism in AIC).',
            'Practice analysis using the PEAL (Point, Evidence, Analysis, Link) structure.',
          ]}
        />
      </div>
    </div>
  );
}
