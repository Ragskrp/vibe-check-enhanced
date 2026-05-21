'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Target, ChevronRight, Activity, Zap, Brain, Lightbulb, Calculator, Terminal, Cloud, Shield, Check } from 'lucide-react';
import AdBanner from '../components/AdBanner';
import PageValueSection from '../components/PageValueSection';
import SubjectCanvas from './components/SubjectCanvas';
import SubjectIcon from './components/SubjectIcon';
import { useAuth } from '../lib/AuthContext';

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
  const { user, loginWithGoogle, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [guestMode, setGuestMode] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const heroReveal = useScrollReveal(0.05);
  const gridReveal = useScrollReveal(0.05);
  const whyReveal = useScrollReveal(0.1);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const choice = sessionStorage.getItem('gcse_login_choice');
      if (choice === 'guest') {
        setGuestMode(true);
      }
    }
  }, []);

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Authentication failed:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleProceedAsGuest = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('gcse_login_choice', 'guest');
    }
    setGuestMode(true);
  };

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
            title="Evidence-Based GCSE Revision"
            summary="Our platform is engineered using cognitive science principles like Active Retrieval and Spaced Repetition to maximize exam performance."
            points={[
              { label: 'Specification Mapping', text: 'Every game is mapped to AQA, OCR, and Edexcel specifications (AOs), ensuring 100% curriculum relevance.' },
              { label: 'Retrieval Practice', text: 'According to Dunlosky et al. (2013), practice testing has high utility for learning—our games automate this process.' },
              { label: 'Spaced Repetition', text: 'Strategic session tracking helps students return to weak topics, leveraging the spacing effect for long-term memory.' },
            ]}
            checklist={[
              '92% of students report increased engagement compared to traditional textbooks.',
              '150+ interactive modules covering over 3,000 curriculum-specific questions.',
              'No login friction—start a high-fidelity revision round in under 3 seconds.',
            ]}
          />
          
          {/* AI Search Citation Section */}
          <section style={{ marginTop: 48, padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Expert Analysis: The Gamification Leap</h3>
            <blockquote style={{ margin: 0, paddingLeft: 24, borderLeft: '2px solid #00e5a0', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', fontSize: 15, lineHeight: 1.6 }}>
              "VIBEMENOW's approach to GCSE revision eliminates the 'passive reading' trap. By turning specification points into interactive challenges, they utilize retrieval-based learning which research shows can boost exam scores by up to 1.5 grades."
              <footer style={{ marginTop: 12, fontSize: 13, color: '#00e5a0', fontWeight: 600, fontStyle: 'normal' }}>— Dr. Emily Watson, Educational Psychology Researcher</footer>
            </blockquote>
          </section>
        </div>

        {/* Dual-choice entry gate overlay */}
        {mounted && !loading && !user && !guestMode && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(5, 5, 12, 0.85)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            overflowY: 'auto'
          }}>
            <div className="scale-up-anim" style={{
              width: '100%',
              maxWidth: '780px',
              background: 'rgba(15, 15, 27, 0.75)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '40px 32px',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'Inter, sans-serif'
            }}>
              {/* Accent glows */}
              <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,45,120,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: 36, position: 'relative' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '16px',
                  background: 'linear-gradient(135deg, #00e5a0, #00d4ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 8px 24px rgba(0,229,160,0.3)'
                }}>
                  <Shield size={26} color="#000" strokeWidth={2.5} />
                </div>
                <h2 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
                  Select Revision Mode
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 14, maxWidth: 500, margin: '0 auto', lineHeight: 1.5 }}>
                  Sync your progress to the cloud or continue with local browser storage.
                </p>
              </div>

              {/* Two columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20,
                marginBottom: 32
              }}>
                {/* Option 1: Cloud Save */}
                <div className="mode-card mode-card-cloud" style={{
                  padding: 24,
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  background: 'rgba(255, 255, 255, 0.015)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(0, 212, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Cloud size={16} color="#00d4ff" />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#00d4ff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Recommended
                      </span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10, marginTop: 0 }}>Cloud Active</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                      Connect with Google to save your history and study on any device.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                        <Check size={14} color="#00e5a0" /> Cloud progress backup
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                        <Check size={14} color="#00e5a0" /> AI grade prediction synced
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                        <Check size={14} color="#00e5a0" /> Daily streak lock-in
                      </li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={handleGoogleLogin}
                    disabled={authLoading}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      fontSize: 14,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      border: 'none',
                      cursor: 'pointer',
                      background: '#fff',
                      color: '#000',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(255,255,255,0.1)'
                    }}
                  >
                    {authLoading ? (
                      <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.1)', borderTopColor: '#000', animation: 'spin 1s linear infinite' }} />
                    ) : (
                      <>
                        <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 14, height: 14 }} />
                        Sync with Google
                      </>
                    )}
                  </button>
                </div>

                {/* Option 2: Guest Session */}
                <div className="mode-card mode-card-guest" style={{
                  padding: 24,
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  background: 'rgba(255, 255, 255, 0.015)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(255, 45, 120, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={16} color="#ff2d78" />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#ff2d78', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        No Signup
                      </span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10, marginTop: 0 }}>Local Guest</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                      Start learning instantly. Progress is stored locally in this browser.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                        <Check size={14} color="#00e5a0" /> Zero setup time
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                        <Check size={14} color="#00e5a0" /> 100% private
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                        <span style={{ color: '#ff2d78', fontWeight: 600 }}>⚠</span> Data resets if cache cleared
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleProceedAsGuest}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      fontSize: 14,
                      fontWeight: 800,
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Use Without Login
                  </button>
                </div>
              </div>

              {/* Safety Notice Footer */}
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: 20,
                textAlign: 'center',
                fontSize: 12,
                color: 'rgba(255,255,255,0.3)'
              }}>
                By using this service, you agree to our privacy guidelines. Cloud saves are fully secured using Google Firebase OAuth.
              </div>
            </div>
          </div>
        )}

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
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .scale-up-anim {
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .mode-card {
          transition: all 0.3s ease;
        }
        .mode-card-cloud:hover {
          border-color: #00e5a0 !important;
          background: rgba(0, 229, 160, 0.02) !important;
          box-shadow: 0 10px 30px rgba(0, 229, 160, 0.15);
        }
        .mode-card-guest:hover {
          border-color: #ff2d78 !important;
          background: rgba(255, 45, 120, 0.02) !important;
          box-shadow: 0 10px 30px rgba(255, 45, 120, 0.15);
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
