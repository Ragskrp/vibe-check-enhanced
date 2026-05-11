'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Target, ChevronRight, Activity, Zap, Brain, Lightbulb, Calculator, Terminal } from 'lucide-react';
import AdBanner from '../components/AdBanner';
import PageValueSection from '../components/PageValueSection';
import SubjectCanvas from './components/SubjectCanvas';
import SubjectIcon from './components/SubjectIcon';

const SUBJECTS = [
  {
    subjectId: 'maths', title: 'Maths',
    desc: 'Algebra, geometry, fractions, statistics. Full AQA & Edexcel curriculum.',
    path: '/gcse/maths', color: '#00e5a0', topics: 42,
  },
  {
    subjectId: 'science', title: 'Science',
    desc: 'Biology, Chemistry, and Physics. Triple & Combined award coverage.',
    path: '/gcse/science', color: '#00d4ff', topics: 48,
  },
  {
    subjectId: 'computer-science', title: 'Computer Science',
    desc: 'OCR J277: algorithms, logic, networking, and programming fundamentals.',
    path: '/gcse/computer-science', color: '#ff2d78', topics: 22,
  },
  {
    subjectId: 'history', title: 'History',
    desc: 'Edexcel/AQA narrative recall: Medicine, Weimar Germany, Early Elizabeth, Cold War.',
    path: '/gcse/history', color: '#ff6b35', topics: 24,
  },
  {
    subjectId: 'geography', title: 'Geography',
    desc: 'Physical processes, human environments, and critical case studies mapped to AQA.',
    path: '/gcse/geography', color: '#ffe600', topics: 20,
  },
  {
    subjectId: 'business', title: 'Business',
    desc: 'Finance, marketing, and operations aligned to AQA specification.',
    path: '/gcse/business', color: '#ffe600', topics: 18,
  },
  {
    subjectId: 'english-language', title: 'English Language',
    desc: 'AQA reading analysis (AO1–AO4), creative and transactional writing.',
    path: '/gcse/english-language', color: '#ffe600', topics: 7,
  },
  {
    subjectId: 'english-literature', title: 'English Literature',
    desc: 'Shakespeare, 19th Century Novels, Modern Drama and Poetry deep-dives.',
    path: '/gcse/english-literature', color: '#b14aed', topics: 15,
  },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function GCSEClientWrapper() {
  const [mounted, setMounted] = useState(false);
  const heroReveal = useScrollReveal(0.05);
  const gridReveal = useScrollReveal(0.05);
  const whyReveal = useScrollReveal(0.1);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <SubjectCanvas accentColor="#00e5a0" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section ref={heroReveal.ref} style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(20px, 5vw, 100px)', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', marginBottom: 16, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            VIBEMENOW — GCSE Revision Games
          </div>
          <h1 style={{ fontSize: 'clamp(56px, 10vw, 120px)', fontWeight: 200, lineHeight: 0.95, letterSpacing: '-0.05em', color: '#ffffff', marginBottom: 32, maxWidth: 14 + 'ch', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s' }}>
            GCSE Games &<br />
            <span style={{ fontWeight: 800, background: 'linear-gradient(135deg, #ffffff 40%, rgba(0,229,160,0.8) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Revision.
            </span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(17px, 2.2vw, 20px)', fontWeight: 300, color: 'rgba(255,255,255,0.4)', maxWidth: 520, lineHeight: 1.8, marginBottom: 56, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}>
            Free, curriculum-aligned GCSE games for all core subjects. Rigorous interactive revision engineered for high-fidelity retrieval and better grades.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s' }}>
            <Link href="/gcse/maths">
              <GlowButton label="Play Maths Games →" color="#00e5a0" />
            </Link>
            <Link href="/gcse/science">
              <GhostButton label="Science Games" />
            </Link>
          </div>
          <div style={{ marginTop: 64, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif', opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}>
            6 subjects · 150+ interactive games · 0 logins required
          </div>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 100px) 40px' }}>
          <Link href="/gcse/dashboard" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #00d4ff, #ff2d78)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
                  <Target size={32} color="#000" />
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>GCSE Mastery Dashboard</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Track your game streaks, masteries, and achievements across all GCSE revision games.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00d4ff', fontWeight: 800, fontSize: 14 }}>
                VIEW PROGRESS <ChevronRight size={18} />
              </div>
            </div>
          </Link>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 100px) 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Activity size={18} color="#00e5a0" />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#00e5a0', fontFamily: 'Inter, sans-serif' }}>New: Active Discovery Labs</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            <Link href="/gcse/computer-science#lab" style={{ textDecoration: 'none' }}>
              <div style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s' }}>
                <Terminal size={32} color="#ff2d78" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Logic Simulators</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Interactive XOR/AND gate games and Big O complexity sorters for Paper 2.</p>
              </div>
            </Link>
            <Link href="/gcse/maths#lab" style={{ textDecoration: 'none' }}>
              <div style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s' }}>
                <Calculator size={32} color="#00e5a0" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Visual Geometry</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Angle mastery games and fraction/decimal matching challenges.</p>
              </div>
            </Link>
            <Link href="/gcse/science#lab" style={{ textDecoration: 'none' }}>
              <div style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s' }}>
                <Lightbulb size={32} color="#ffe600" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Physics Circuitry</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Live circuit builder games and biology cell structure identification.</p>
              </div>
            </Link>
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', width: '100%' }} />

        <section ref={gridReveal.ref} style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 100px)' }}>
          <div style={{ marginBottom: 48, opacity: gridReveal.visible ? 1 : 0, transform: gridReveal.visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif', marginBottom: 12 }}>Subjects</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.15 }}>Choose your <span style={{ fontWeight: 700 }}>GCSE Games.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 1, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            {SUBJECTS.map((subject, idx) => (
              <Link key={subject.title} href={subject.path} style={{ textDecoration: 'none' }}>
                <SubjectCell subject={subject} delay={idx * 80} visible={gridReveal.visible} />
              </Link>
            ))}
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        <section ref={whyReveal.ref} style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 100px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
            {[
              { stat: '2 min', label: 'Per Game', desc: 'Quick-fire GCSE revision for busy students.', color: '#00e5a0' },
              { stat: '150+', label: 'Games', desc: 'Mapped to UK GCSE exam specifications.', color: '#00d4ff' },
              { stat: '0', label: 'Logins', desc: 'No accounts, no stress, just play and learn.', color: '#ff2d78' },
              { stat: '100%', label: 'Free', desc: 'Completely free GCSE games for parents and pupils.', color: '#ffe600' },
            ].map((item, idx) => (
              <div key={item.label} style={{ opacity: whyReveal.visible ? 1 : 0, transform: whyReveal.visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.7s ease ${idx * 100}ms, transform 0.7s ease ${idx * 100}ms` }}>
                <div style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.04em', color: item.color, lineHeight: 1, marginBottom: 6 }}>{item.stat}</div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 100px) 60px' }}>
          <AdBanner format="horizontal" />
        </div>

        <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', padding: 'clamp(80px, 12vw, 140px) 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(0,229,160,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif', marginBottom: 20 }}>Play now</div>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: 40, lineHeight: 1.1 }}>Pick a subject. <span style={{ fontWeight: 700 }}>Play GCSE Games in seconds.</span></h2>
          <Link href="/gcse/maths">
            <GlowButton label="Play GCSE Maths Games →" color="#00e5a0" large />
          </Link>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px clamp(20px, 5vw, 100px)' }}>
          <PageValueSection
            title="The Value of GCSE Revision Games"
            summary="Our platform is built on active practice, spaced repetition, and interactive GCSE games that make revision addictive."
            points={[
              { label: 'Interactive GCSE navigation', text: 'Browse games by subject and topic to revise with intent and clarity.' },
              { label: 'Playable revision modules', text: 'No login barriers. Our high-performance GCSE games load instantly on any device.' },
              { label: 'Gamified progress tracking', text: 'Streak and session tracking motivates consistent daily play and better retrieval.' },
            ]}
            checklist={[
              'Select a GCSE game and complete a short focused session.',
              'Master one weak topic through interactive play each day.',
              'Challenge yourself with timed game modes once you feel confident.',
            ]}
          />
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        body { background: #000 !important; }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,160,0.3); }
          50%       { box-shadow: 0 0 32px 4px rgba(0,229,160,0.15); }
        }
        @keyframes cellReveal {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function SubjectCell({ subject, delay, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0)', padding: '36px 32px', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'background 0.3s ease', position: 'relative', overflow: 'hidden', opacity: visible ? 1 : 0, animation: visible ? `cellReveal 0.6s ease-out ${delay}ms both` : 'none' }}>
      {hovered && <div style={{ position: 'absolute', top: -60, right: -60, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${subject.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div style={{ transition: 'transform 0.3s ease', transform: hovered ? 'scale(1.1)' : 'scale(1)', filter: `drop-shadow(0 0 16px ${subject.color}${hovered ? '80' : '00'})` }}>
          <SubjectIcon subject={subject.subjectId} color={subject.color} size={48} />
        </div>
        <span style={{ fontSize: 18, color: hovered ? subject.color : 'rgba(255,255,255,0.12)', transition: 'color 0.3s ease, transform 0.3s ease', transform: hovered ? 'translate(2px, -2px)' : 'translate(0,0)' }}>↗</span>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: hovered ? '#ffffff' : 'rgba(255,255,255,0.8)', marginBottom: 8, transition: 'color 0.25s ease' }}>{subject.title} Games</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.65, fontFamily: 'Inter, sans-serif', fontWeight: 400, marginBottom: 24 }}>{subject.desc}</p>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', color: hovered ? subject.color : 'rgba(255,255,255,0.2)', transition: 'color 0.25s ease', borderTop: `1px solid ${hovered ? subject.color + '30' : 'rgba(255,255,255,0.06)'}`, paddingTop: 16, width: '100%', transition: 'color 0.25s ease, border-color 0.25s ease' }}>
        {subject.topics} interactive modules
      </div>
    </div>
  );
}

function GlowButton({ label, color = '#00e5a0', large = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ padding: large ? '18px 48px' : '14px 32px', fontSize: large ? 16 : 14, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em', color: '#000', background: hov ? `linear-gradient(135deg, ${color}, ${color}cc)` : color, border: 'none', borderRadius: 4, cursor: 'pointer', boxShadow: hov ? `0 0 36px ${color}50` : 'none', transform: hov ? 'translateY(-1px)' : 'translateY(0)', transition: 'all 0.2s ease' }}>{label}</button>
  );
}

function GhostButton({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ padding: '14px 32px', fontSize: 14, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em', color: hov ? '#ffffff' : 'rgba(255,255,255,0.5)', background: 'transparent', border: `1px solid ${hov ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 4, cursor: 'pointer', transition: 'all 0.2s ease' }}>{label}</button>
  );
}
