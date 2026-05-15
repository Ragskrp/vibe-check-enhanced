'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Cpu, Clock, ArrowRight, TrendingUp, Zap, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { ARTICLES, CATEGORIES } from './techNewsData';
import AdBanner from '../components/AdBanner';
import PageValueSection from '../components/PageValueSection';

const ITEMS_PER_PAGE = 10;

export default function TechNewsClient() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredSlug, setHoveredSlug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const featured = useMemo(() => ARTICLES.find(a => a.featured) || ARTICLES[0], []);
  const categoryNames = ['All', ...Object.keys(CATEGORIES)];

  const filtered = useMemo(() => {
    return activeFilter === 'All'
      ? ARTICLES
      : ARTICLES.filter(a => a.category === activeFilter);
  }, [activeFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="page-container animate-fade-in">
      {/* ── HERO ── */}
      <section style={{ textAlign: 'center', marginBottom: 56 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            background: 'rgba(0, 212, 255, 0.06)',
            border: '1px solid rgba(0, 212, 255, 0.15)',
            fontSize: 13,
            fontWeight: 600,
            color: '#00d4ff',
            marginBottom: 16,
          }}
        >
          <Cpu size={16} /> Tech Pulse
        </div>
        <h1 className="hero-title" style={{ fontSize: 48 }}>
          Tech <span>News</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: 640, margin: '0 auto' }}>
          Breaking stories, analysis, and commentary on AI, cybersecurity,
          gadgets, and digital culture — curated by the VIBEMENOW team.
        </p>
      </section>

      {/* ── FEATURED (Only on Page 1 of "All") ── */}
      {currentPage === 1 && activeFilter === 'All' && (
        <section style={{ maxWidth: 900, margin: '0 auto 48px auto' }}>
          <Link href={`/tech-news/${featured.slug}`} style={{ textDecoration: 'none' }}>
            <div
              onMouseEnter={() => setHoveredSlug(featured.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{
                padding: '48px 40px',
                borderRadius: 24,
                cursor: 'pointer',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.04), rgba(255, 45, 120, 0.04))',
                border: `1px solid ${hoveredSlug === featured.slug ? 'rgba(0, 212, 255, 0.25)' : 'rgba(255,255,255,0.06)'}`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: hoveredSlug === featured.slug ? 'translateY(-2px)' : 'none',
                boxShadow: hoveredSlug === featured.slug ? '0 20px 60px rgba(0, 212, 255, 0.08)' : 'none',
              }}
            >
              {/* Accent glow */}
              <div style={{
                position: 'absolute', top: -80, right: -80,
                width: 200, height: 200, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 12px',
                  borderRadius: 999,
                  background: `${CATEGORIES[featured.category]?.color || '#00d4ff'}15`,
                  color: CATEGORIES[featured.category]?.color || '#00d4ff',
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 16,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                <TrendingUp size={12} /> Breaking
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                <div style={{
                  fontSize: 56, lineHeight: 1, flexShrink: 0,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 20, padding: '16px 18px',
                }}>
                  {CATEGORIES[featured.category]?.emoji || '📰'}
                </div>
                <div>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f0f0f0', marginBottom: 12, lineHeight: 1.3 }}>
                    {featured.title}
                  </h2>
                  <p style={{ color: '#999', fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                    {featured.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#555' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Clock size={14} /> {featured.readTime}
                    </span>
                    <span>{featured.date}</span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        color: '#00d4ff',
                        fontWeight: 700,
                      }}
                    >
                      Read Analysis <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── FILTER TABS ── */}
      <section style={{ maxWidth: 900, margin: '0 auto 32px auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          marginBottom: 8,
        }}>
          <Filter size={14} color="#555" style={{ marginRight: 4 }} />
          {categoryNames.map(cat => {
            const isActive = activeFilter === cat;
            const catColor = cat === 'All' ? '#00d4ff' : CATEGORIES[cat]?.color || '#888';
            return (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  border: `1px solid ${isActive ? catColor + '40' : 'rgba(255,255,255,0.08)'}`,
                  background: isActive ? catColor + '15' : 'rgba(255,255,255,0.02)',
                  color: isActive ? catColor : '#888',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {cat === 'All' ? '⚡ All' : `${CATEGORIES[cat]?.emoji || ''} ${cat}`}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── ARTICLE LIST ── */}
      <section style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f0f0', marginBottom: 24 }}>
          {activeFilter === 'All' ? 'Latest Stories' : activeFilter}
          {totalPages > 1 && <span style={{ fontSize: 14, color: '#555', marginLeft: 12, fontWeight: 500 }}>Page {currentPage} of {totalPages}</span>}
        </h2>
        <div style={{ display: 'grid', gap: 20 }}>
          {paginatedArticles.length === 0 && (
            <div style={{
              padding: 48, textAlign: 'center', color: '#555', fontSize: 14,
              border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 20,
            }}>
              No articles in this category yet. Check back soon.
            </div>
          )}
          {paginatedArticles.map((article) => {
            const catMeta = CATEGORIES[article.category] || { color: '#888', emoji: '📰' };
            const isHovered = hoveredSlug === article.slug;
            return (
              <Link href={`/tech-news/${article.slug}`} key={article.slug} style={{ textDecoration: 'none' }}>
                <div
                  onMouseEnter={() => setHoveredSlug(article.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 20,
                    padding: '28px 32px',
                    borderRadius: 20,
                    cursor: 'pointer',
                    border: `1px solid ${isHovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
                    background: isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateY(-2px)' : 'none',
                    boxShadow: isHovered ? `0 12px 40px rgba(0,0,0,0.3)` : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: 36,
                      lineHeight: 1,
                      background: `${catMeta.color}10`,
                      borderRadius: 16,
                      padding: '12px 14px',
                      flexShrink: 0,
                    }}
                  >
                    {catMeta.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 700,
                          background: `${catMeta.color}15`,
                          color: catMeta.color,
                          textTransform: 'uppercase',
                        }}
                      >
                        {article.category}
                      </span>
                      <span style={{ fontSize: 12, color: '#555' }}>{article.date}</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#f0f0f0', marginBottom: 6 }}>
                      {article.title}
                    </h3>
                    <p style={{ color: '#888', fontSize: 14, lineHeight: 1.5, marginBottom: 10 }}>
                      {article.excerpt}
                    </p>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: catMeta.color,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Read Analysis <Zap size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── PAGINATION CONTROLS ── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 40 }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                color: currentPage === 1 ? '#444' : '#fff',
                cursor: currentPage === 1 ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            
            <div style={{ display: 'flex', gap: 8 }}>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    border: `1px solid ${currentPage === i + 1 ? '#00d4ff' : 'rgba(255,255,255,0.06)'}`,
                    background: currentPage === i + 1 ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                    color: currentPage === i + 1 ? '#00d4ff' : '#888',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 700,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                color: currentPage === totalPages ? '#444' : '#fff',
                cursor: currentPage === totalPages ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}
      </section>

      {/* ── AD ── */}
      <div style={{ maxWidth: 900, margin: '48px auto 0' }}>
        <AdBanner format="horizontal" />
      </div>

      {/* ── VALUE SECTION ── */}
      <div style={{ maxWidth: 900, margin: '48px auto 0' }}>
        <PageValueSection
          title="Why Tech Pulse Exists"
          summary="Concise, original analysis of the stories that matter — no clickbait, no filler."
          points={[
            { label: 'Original commentary', text: 'Every piece is written by the VIBEMENOW team with a focus on clarity and context.' },
            { label: 'UK perspective', text: 'We cover global tech through a UK lens, including regulation, market impact, and local startups.' },
            { label: 'No paywalls', text: 'All content is free. We believe informed readers make better digital citizens.' },
          ]}
          checklist={[
            'Bookmark this page for your weekly tech briefing.',
            'Follow a topic category that interests you most.',
            'Share articles that spark good discussion.',
          ]}
        />
      </div>
    </div>
  );
}
