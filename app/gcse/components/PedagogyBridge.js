'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Brain, Zap, Target, BookOpen } from 'lucide-react';
import { useState } from 'react';

const BRIDGES = {
  'spacing': {
    title: 'The Spacing Effect',
    tagline: 'Why forgetting is the secret to mastery.',
    desc: 'Stop cramming. Learn why your brain needs "gaps" to build permanent memory pathways.',
    slug: 'spacing-effect-memory',
    color: '#00ff94',
    icon: Zap
  },
  'metacognition': {
    title: 'Metacognition',
    tagline: 'The art of thinking about thinking.',
    desc: 'Master the high-tier strategy of monitoring your own problem-solving logic.',
    slug: 'metacognition-thinking',
    color: '#b14aed',
    icon: Brain
  },
  'cognitive-load': {
    title: 'Cognitive Load',
    tagline: 'Managing the mental bottleneck.',
    desc: 'Learn how to simplify complex information so your brain can actually process it.',
    slug: 'cognitive-load-mastery',
    color: '#ff2d78',
    icon: Target
  },
  'mnemonics': {
    title: 'Art of Mnemonics',
    tagline: 'Unbreakable memory hooks.',
    desc: 'Transform dry facts into vivid mental imagery that you can recall instantly in exams.',
    slug: 'art-of-mnemonics',
    color: '#ffe600',
    icon: BookOpen
  }
};

export default function PedagogyBridge({ type = 'spacing' }) {
  const bridge = BRIDGES[type] || BRIDGES['spacing'];
  const [hovered, setHovered] = useState(false);
  const Icon = bridge.icon;

  return (
    <Link href={`/blog/${bridge.slug}`} style={{ textDecoration: 'none' }}>
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '32px',
          borderRadius: 24,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hovered ? 'translateY(-8px)' : 'none',
          boxShadow: hovered ? `0 30px 60px rgba(0,0,0,0.5), 0 0 20px ${bridge.color}15` : 'none',
          marginTop: 64,
          marginBottom: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}
      >
        {/* Glow Background */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${bridge.color}10 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.4s'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
           <div style={{ 
             padding: 10, 
             borderRadius: 12, 
             background: `${bridge.color}15`, 
             color: bridge.color,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
              <Icon size={20} />
           </div>
           <span style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Learning Science</span>
        </div>

        <div>
           <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
             {bridge.title}
             <Sparkles size={18} color={bridge.color} style={{ opacity: hovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />
           </h3>
           <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
             <span style={{ color: bridge.color, fontWeight: 700 }}>{bridge.tagline}</span> {bridge.desc}
           </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: bridge.color, fontWeight: 800, fontSize: 14 }}>
           READ THE INSIGHT
           <ArrowRight size={16} style={{ transform: hovered ? 'translateX(6px)' : 'none', transition: 'transform 0.3s' }} />
        </div>
      </div>
    </Link>
  );
}
