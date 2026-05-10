'use client';

import { useState, useEffect } from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { getSrsRecord, getMemoryStrength } from '../utils/spacedRepetitionEngine';
import Link from 'next/link';

function getStellarColor(strength, accentColor) {
  if (strength >= 80) return '#00d4ff'; // Hot Blue Star
  if (strength >= 50) return '#00ff94'; // Stable Green
  if (strength >= 20) return '#ffe600'; // Yellow Dwarf
  if (strength > 0) return '#ff2d78';   // Red Giant (decaying)
  return 'transparent'; // Unseen void
}

function getStellarGlow(strength, baseColor) {
  if (strength >= 80) return `0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff`;
  if (strength >= 50) return `0 0 15px #00ff94, 0 0 30px #00ff94`;
  if (strength >= 20) return `0 0 10px #ffe600`;
  if (strength > 0) return `0 0 5px #ff2d78`;
  return `inset 0 0 10px rgba(255,255,255,0.1)`; // Void
}

export default function MasteryMap({ topics, statsKey, subjectId, accentColor }) {
  const [srsData, setSrsData] = useState({});

  useEffect(() => {
    if (!topics?.length) return;
    const data = {};
    topics.forEach(t => {
      data[t.slug] = {
        strength: getMemoryStrength(subjectId || 'gcse', t.slug),
      };
    });
    setSrsData(data);
  }, [topics, statsKey, subjectId]);

  // Group topics by category (Constellations)
  const categories = {};
  topics.forEach(t => {
    if (!categories[t.category]) categories[t.category] = [];
    categories[t.category].push(t);
  });

  return (
    <div style={{ marginTop: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Sparkles size={24} color={accentColor} />
        <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Mastery Galaxy</h2>
      </div>
      <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6, maxWidth: 800 }}>
        Your knowledge is a living universe. Topics burn brightly as blue stars when mastered, but decay into red giants if left unreviewed. Unseen topics are dark voids. Ignite the galaxy.
      </p>

      <div style={{ 
        position: 'relative', padding: '60px 40px', background: '#050510', borderRadius: '32px', 
        border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
      }}>
        {/* Background Stars Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80, position: 'relative', zIndex: 10 }}>
          {Object.entries(categories).map(([cat, catTopics], i) => {
            return (
              <div key={cat} style={{ position: 'relative' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 32, textAlign: 'center' }}>
                  Constellation: {cat}
                </div>
                
                {/* Constellation Grid */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px 60px' }}>
                  {catTopics.map((t, idx) => {
                    const strength = srsData[t.slug]?.strength || 0;
                    const starColor = getStellarColor(strength, accentColor);
                    const starGlow = getStellarGlow(strength, accentColor);
                    // Slight organic offset
                    const translateY = (idx % 2 === 0) ? -20 : 20;

                    return (
                      <Link key={t.slug} href={`/gcse/${subjectId}/${t.slug}`} style={{ textDecoration: 'none' }}>
                        <div 
                          style={{ 
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, cursor: 'pointer',
                            transform: `translateY(${translateY}px)`, transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = `translateY(${translateY - 10}px) scale(1.1)`; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = `translateY(${translateY}px) scale(1)`; }}
                        >
                          {/* The Star */}
                          <div style={{ 
                            width: 32, height: 32, borderRadius: '50%', 
                            background: strength === 0 ? 'transparent' : '#fff',
                            border: `2px solid ${strength === 0 ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
                            boxShadow: starGlow,
                            position: 'relative'
                          }}>
                            {/* Inner core for strong stars */}
                            {strength >= 50 && (
                              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px #fff' }} />
                            )}
                          </div>
                          
                          {/* Star Label */}
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                              {t.title}
                            </div>
                            <div style={{ fontSize: 10, color: strength === 0 ? 'rgba(255,255,255,0.3)' : starColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                              {strength === 0 ? 'UNSEEN' : `${Math.round(strength)}%`}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
