'use client';

import Link from 'next/link';
import { ArrowRight, Flame, Trophy, Cpu } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { useState, useEffect } from 'react';
import { getTopicsByCategory } from './computerScienceData';

const CATEGORY_ORDER = ['Algorithms & Thinking', 'Programming Concepts', 'Logic & Data'];
const CATEGORY_COLORS = { 
  'Algorithms & Thinking': '#00d4ff', 
  'Programming Concepts': '#00ff94', 
  'Logic & Data': '#ff2d78' 
};

export default function ComputerScienceHub() {
  const [stats, setStats] = useState(null);
  const topicsByCategory = getTopicsByCategory();

  useEffect(() => {
    try {
      setStats(JSON.parse(localStorage.getItem('gcse-compsci-stats') || 'null'));
    } catch {}
  }, []);

  return (
    <div className="game-container" style={{ maxWidth: 900 }}>
      <div className="animate-fade-in">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="game-badge">GCSE Revision</div>
          <h1 className="game-title" style={{ color: '#00d4ff' }}>
            <Cpu size={32} /> Computer Science
          </h1>
          <p className="game-subtitle">
            Interactive revision tools for OCR Computer Science (Year 10 topics).
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

        {/* Ad */}
        <AdBanner format="horizontal" />

        {/* All Topics by Category */}
        {CATEGORY_ORDER.map((cat) => {
          const topics = topicsByCategory[cat];
          if (!topics || topics.length === 0) return null;
          const catColor = CATEGORY_COLORS[cat] || '#888';
          return (
            <section key={cat} style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: catColor, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {cat}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {topics.map((topic) => (
                  <Link key={topic.slug} href={`/gcse/computer-science/${topic.slug}`} style={{ textDecoration: 'none' }}>
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
        <div style={{ marginTop: 40 }}>
          <AdBanner format="horizontal" />
        </div>
      </div>
    </div>
  );
}
