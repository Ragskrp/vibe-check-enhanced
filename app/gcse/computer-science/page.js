'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Flame, Trophy, Cpu, Code, Network, Database, ArrowRight, Binary, Terminal, Activity, Zap } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getTopicsByCategory } from './computerScienceData';
import useStoredStats from '../components/useStoredStats';
import PageValueSection from '../../components/PageValueSection';
import SubjectCanvas from '../components/SubjectCanvas';
import SubjectIcon from '../components/SubjectIcon';
import GameSeoArticle from '../../components/GameSeoArticle';
import { gcseSeoData } from '../../data/gcseSeoData';
import { getStreakData } from '../utils/streakLogic';
import MasteryMap from '../components/MasteryMap';
import InteractiveActivity from '../components/InteractiveActivity';
import InteractiveVisualizer from '../components/InteractiveVisualizer';

const COLOR = '#ff2d78';
const CATEGORY_ORDER = ['Computer Systems', 'Algorithms & Thinking', 'Programming Concepts', 'Logic & Data'];
const CATEGORY_COLORS = { 'Computer Systems': '#7d47ff', 'Algorithms & Thinking': '#ff2d78', 'Programming Concepts': '#00d4ff', 'Logic & Data': '#b14aed' };

function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function CompSciHub() {
  const [mounted, setMounted] = useState(false);
  const stats = useStoredStats('gcse-compsci-stats');
  const topicsByCategory = getTopicsByCategory();
  const streakData = getStreakData();
  const hero = useScrollReveal(0.05);
  const grid = useScrollReveal(0.05);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <SubjectCanvas accentColor={COLOR} />
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section ref={hero.ref} style={{
          minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 clamp(20px,5vw,100px)', maxWidth: 1200, margin: '0 auto',
        }}>
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ marginBottom: 32, filter: `drop-shadow(0 0 20px ${COLOR}40)` }}>
              <SubjectIcon subject="computer-science" color={COLOR} size={100} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif', marginBottom: 16 }}>
              OCR J277 · GCSE Computer Science
            </div>
            <h1 style={{ fontSize: 'clamp(48px,9vw,110px)', fontWeight: 200, lineHeight: 1.0, letterSpacing: '-0.04em', color: '#fff', marginBottom: 24 }}>
              Computational<br />
              <span style={{ fontWeight: 800, background: `linear-gradient(135deg,#fff 30%,${COLOR} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Logic.</span>
            </h1>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 540, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
              Master the machine. From low-level architectures to high-level algorithms—rigorous practice for the next generation of engineers.
            </p>
            
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
               {stats && (
                <div style={{ display: 'inline-flex', gap: 32, padding: '16px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Compiles</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><Trophy size={16} color="#ffe600" /> {stats.totalPlays || 0}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Daily Streak</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#ff6b35', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Flame size={16} color={streakData.activeToday ? '#ff6b35' : 'rgba(255,255,255,0.2)'} /> 
                      {streakData.currentStreak || 0}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>High Score</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Zap size={16} color="#00d4ff" /> 
                      {stats.bestStreak || 0}
                    </span>
                  </div>
                </div>
              )}
              <Link href="/gcse/computer-science/mixed-mode" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '16px 32px', borderRadius: 8, background: 'rgba(255,45,120,0.1)', border: `2px solid ${COLOR}`, color: COLOR, fontWeight: 800, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s' }}>
                   MIXED PRACTICE
                </div>
              </Link>
              <Link href="/gcse/computer-science/mock-exam" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '16px 32px', borderRadius: 8, background: 'transparent', border: `2px solid rgba(255,255,255,0.2)`, color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s' }}>
                   FULL MOCK EXAM
                </div>
              </Link>
              <Link href="#topics" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '16px 32px', borderRadius: 8, background: COLOR, color: '#000', fontWeight: 800, fontSize: 14, letterSpacing: '0.05em', transition: 'all 0.2s', boxShadow: `0 10px 30px ${COLOR}40` }}>
                   BOOT REVISION →
                </div>
              </Link>
            </div>
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* ── MASTERY MAP ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px clamp(20px,5vw,100px) 0' }}>
          <MasteryMap 
            topics={Object.values(topicsByCategory).flat()} 
            statsKey="gcse-compsci-stats" 
            accentColor={COLOR} 
          />
        </section>

        {/* ── TOPIC GRID ── */}
        <section id="topics" ref={grid.ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '80px clamp(20px,5vw,100px) 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <Terminal size={18} color="rgba(255,255,255,0.3)" />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif' }}>Spec Domains</div>
          </div>
          {CATEGORY_ORDER.map((cat, catIdx) => {
            const topics = topicsByCategory[cat];
            if (!topics?.length) return null;
            const catColor = CATEGORY_COLORS[cat] || '#888';
            return (
              <div key={cat} style={{ marginBottom: 80, opacity: grid.visible ? 1 : 0, transform: grid.visible ? 'none' : 'translateY(20px)', transition: `all 0.8s ease ${catIdx * 0.1}s` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: catColor, boxShadow: `0 0 10px ${catColor}` }} />
                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>{cat}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter,sans-serif', fontWeight: 600 }}>{topics.length} Modules</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
                  {topics.map((topic, idx) => (
                    <Link key={topic.slug} href={`/gcse/computer-science/${topic.slug}`} style={{ textDecoration: 'none' }}>
                      <TopicCell topic={topic} accentColor={catColor} delay={idx * 30} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── ACTIVE LAB ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Activity size={18} color={COLOR} />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: COLOR, fontFamily: 'Inter,sans-serif' }}>Active Revision Lab</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {/* Tool 1: Big O Sort */}
            <InteractiveActivity
              type="sort"
              accentColor={COLOR}
              data={{
                title: 'Algorithm Complexity Sort',
                instruction: 'Drag and drop to sort Big O notations from FASTEST to SLOWEST.',
                items: [
                  { id: '1', label: 'O(1) — Constant' },
                  { id: '2', label: 'O(log n) — Logarithmic' },
                  { id: '3', label: 'O(n) — Linear' },
                  { id: '4', label: 'O(n²) — Quadratic' }
                ],
                correctOrder: ['1', '2', '3', '4']
              }}
            />

            {/* Tool 2: XOR Gate Simulator */}
            <InteractiveVisualizer
              type="logic"
              accentColor="#00d4ff"
              data={{
                gate: 'XOR',
                explanation: 'XOR output is 1 only when inputs differ. Used in half-adder circuits and encryption (XOR cipher). Two identical inputs always output 0.'
              }}
            />

            {/* Tool 3: Networking Category Sort */}
            <InteractiveActivity
              type="category-sort"
              accentColor={COLOR}
              data={{
                title: 'Networking: Classify Components',
                instruction: 'Sort each component into the correct category.',
                categories: [
                  { id: 'hardware', label: 'Hardware', color: '#ff2d78' },
                  { id: 'protocol', label: 'Protocol', color: '#00d4ff' },
                  { id: 'threat', label: 'Security Threat', color: '#ffe600' },
                ],
                items: [
                  { id: 'r1', label: 'Router', category: 'hardware' },
                  { id: 'r2', label: 'HTTP', category: 'protocol' },
                  { id: 'r3', label: 'Phishing', category: 'threat' },
                  { id: 'r4', label: 'Switch', category: 'hardware' },
                  { id: 'r5', label: 'TCP/IP', category: 'protocol' },
                  { id: 'r6', label: 'Malware', category: 'threat' },
                ]
              }}
            />
          </div>
        </section>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,100px) 100px' }}>
          <AdBanner format="horizontal" />
          <div style={{ marginTop: 80 }}>
            <PageValueSection
              title="Algorithmic Thinking & Precision"
              summary="Computer Science is the study of problem-solving. Success on the OCR J277 spec requires both theoretical depth and applied logical rigor."
              points={[
                { label: 'Computational Logic', text: 'Mastering Boolean algebra and logic gates through frequent practice reduces error rates in paper 2 programming scenarios.' },
                { label: 'Trace Table Mastery', text: 'Being able to "be the machine" and trace variable states through a loop is a high-yield skill for multi-mark exam questions.' },
                { label: 'Networking Architecture', text: 'Our tools emphasize the layer-based approach of TCP/IP and the specific functions of hardware components.' },
              ]}
              checklist={['Practice conversion between Binary, Denary, and Hex until it is instantaneous.', 'Recall the 8 specific common cyber-security threats and their preventions.', 'Explain the difference between a Compiler and an Interpreter from memory.']}
            />
            <div style={{ marginTop: 64 }}>
              <GameSeoArticle {...gcseSeoData.computerScience} />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
        body { background: #000 !important; }
        @keyframes cellReveal {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function TopicCell({ topic, accentColor, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ 
        padding: '24px', 
        borderRadius: 16,
        background: hov ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', 
        border: `1px solid ${hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
        cursor: 'pointer', 
        display: 'flex', 
        flexDirection: 'column',
        gap: 12,
        animation: `cellReveal 0.6s ease-out ${delay}ms both`,
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${accentColor}10` : 'none'
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: hov ? '#fff' : 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}>{topic.title}</div>
        <ArrowRight size={16} color={hov ? accentColor : 'rgba(255,255,255,0.1)'} style={{ transition: 'all 0.3s', transform: hov ? 'translateX(4px)' : 'none' }} />
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter,sans-serif', lineHeight: 1.5, fontWeight: 400 }}>{topic.description}</div>
    </div>
  );
}
