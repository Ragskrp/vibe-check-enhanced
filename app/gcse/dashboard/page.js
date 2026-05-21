'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Trophy, Zap, ArrowRight, Home, Brain, Target, Star, ChevronRight, RotateCcw, Clock, LogIn, LogOut, Cloud } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import SubjectCanvas from '../components/SubjectCanvas';
import { useAggregatedStats } from '../components/DashboardStats';
import AchievementBadge from '../components/AchievementBadge';
import ExamCountdown from '../components/ExamCountdown';
import SuggestedTopicCard from '../components/SuggestedTopicCard';
import FocusTimer from '../components/FocusTimer';
import GradePredictor from '../components/GradePredictor';
import { getDueTopics, strengthToColor } from '../utils/spacedRepetitionEngine';
import { getTopicsByCategory as getMaths } from '../maths/topicData';
import { getTopicsByCategory as getScience } from '../science/scienceData';
import { getTopicsByCategory as getCS } from '../computer-science/computerScienceData';
import { getTopicsByCategory as getHistory } from '../history/historyData';
import { getTopicsByCategory as getGeography } from '../geography/geographyData';
import { getTopicsByCategory as getEngLang } from '../english-language/englishLanguageData';
import { getTopicsByCategory as getEngLit } from '../english-literature/englishLiteratureData';
import { getTopicsByCategory as getBusiness } from '../business/businessData';

const COLOR = '#00d4ff';

// All reviewable topics across subjects
const ALL_REVIEWABLE = [
  ...Object.values(getMaths()).flat().map(t => ({ ...t, subjectId: 'maths' })),
  ...Object.values(getScience()).flat().map(t => ({ ...t, subjectId: 'science' })),
  ...Object.values(getCS()).flat().map(t => ({ ...t, subjectId: 'computer-science' })),
  ...Object.values(getHistory()).flat().map(t => ({ ...t, subjectId: 'history' })),
  ...Object.values(getGeography()).flat().map(t => ({ ...t, subjectId: 'geography' })),
  ...Object.values(getEngLang()).flat().map(t => ({ ...t, subjectId: 'english-language' })),
  ...Object.values(getEngLit()).flat().map(t => ({ ...t, subjectId: 'english-literature' })),
  ...Object.values(getBusiness()).flat().map(t => ({ ...t, subjectId: 'business' })),
];

export default function MissionControl() {
  const [mounted, setMounted] = useState(false);
  const stats = useAggregatedStats();
  const { user, logout } = useAuth();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <>
      <SubjectCanvas accentColor={COLOR} />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        
        {/* HEADER */}
        <header style={{ 
          padding: '24px clamp(20px, 5vw, 100px)', 
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #00d4ff, #ff2d78)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={20} color="#000" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.05em' }}>MISSION CONTROL</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>Student Operations v1.0</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 8, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}>
                  <Cloud size={14} color="#00d4ff" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#00d4ff' }}>Synced</span>
                </div>
                {user.photoURL && <img src={user.photoURL} alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(0,212,255,0.3)' }} />}
                <button onClick={logout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Sign out">
                  <LogOut size={14} color="rgba(255,255,255,0.5)" />
                </button>
              </div>
            ) : (
              <Link href="/gcse/login" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(255,45,120,0.15))', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <Cloud size={14} /> Sync Progress
                </div>
              </Link>
            )}
            <Link href="/gcse" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Home size={14} /> Subject Hubs
              </div>
            </Link>
          </div>
        </header>

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px clamp(20px, 5vw, 100px) 100px' }}>

          {/* EXAM COUNTDOWN */}
          <section style={{ marginBottom: 32 }}>
            <ExamCountdown accentColor={COLOR} />
          </section>

          {/* DUE FOR REVIEW QUEUE */}
          <DueReviewQueue />

          {/* SUGGESTED TOPIC CARD */}
          <SuggestedTopicCard />

          {/* HERO STATS */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 60 }}>
            
            {/* STREAK CARD */}
            <div style={{ 
              padding: '40px', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                <Flame size={200} color="#ff6b35" />
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 16 }}>Current Daily Streak</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ fontSize: 80, fontWeight: 900, color: stats.activeToday ? '#ff6b35' : 'rgba(255,255,255,0.1)' }}>{stats.globalStreak}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Days Active</div>
                  <div style={{ fontSize: 14, color: stats.activeToday ? '#00ff94' : '#ff2d78', fontWeight: 700, marginTop: 4 }}>
                    {stats.activeToday ? '✓ MISSION COMPLETE TODAY' : '! MISSION PENDING TODAY'}
                  </div>
                </div>
              </div>
            </div>

            {/* GLOBAL MASTERY CARD */}
            <div style={{ 
              padding: '40px', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', gap: 40 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Total Plays</div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: '#00d4ff' }}>{stats.totalPlays}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Topics Mastered</div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: '#00ff94' }}>{stats.totalMastered}</div>
                </div>
              </div>
              <div style={{ marginTop: 24, padding: '16px', borderRadius: 16, background: 'rgba(0,255,148,0.05)', border: '1px solid rgba(0,255,148,0.1)' }}>
                <div style={{ fontSize: 12, color: '#00ff94', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Zap size={14} /> Rank: {getRank(stats.totalMastered)}
                </div>
              </div>
            </div>

            {/* GRADE PREDICTOR */}
            <GradePredictor stats={stats} totalTopics={ALL_REVIEWABLE.length} />

            {/* FOCUS TIMER */}
            <FocusTimer />

          </section>

          {/* GLOBAL MIXED PRACTICE BANNER */}
          <section style={{ marginBottom: 80 }}>
            <Link href="/gcse/dashboard/mixed-mode" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '40px', borderRadius: 32, background: 'linear-gradient(135deg, #00d4ff10, #ff2d7810)',
                border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.3s', cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#00d4ff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'; }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #00d4ff, #ff2d78)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={20} color="#000" />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: 0 }}>Global Interleaving Mode</h2>
                  </div>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
                    Science proves interleaved practice builds stronger neural pathways. Launch a 3-minute gauntlet pulling questions from all active subjects.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 800, color: '#00d4ff' }}>
                  START GAUNTLET <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </section>

          {/* EXAM SIMULATOR BANNER */}
          <section style={{ marginBottom: 80 }}>
            <Link href="/gcse/exam-simulator" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '40px', borderRadius: 32, background: 'linear-gradient(135deg, rgba(177,74,237,0.1), rgba(0,212,255,0.1))',
                border: '1px solid rgba(177,74,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.3s', cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#b14aed'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(177,74,237,0.2)'; }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #b14aed, #00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock size={20} color="#000" />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: 0 }}>45-Minute Mock Exam Simulator</h2>
                  </div>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
                    Test your endurance. A strict 45-minute timed paper featuring 20 questions drawn from across your entire curriculum. No instant feedback, just you and the clock.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 800, color: '#b14aed' }}>
                  START EXAM <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </section>

          {/* SUBJECT PROGRESS */}
          <section style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <Brain size={20} color="#00d4ff" />
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Subject Mastery</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
              {Object.entries(stats.subjectBreakdown).map(([name, data]) => {
                const linkName = name === 'English' ? 'english-literature' : name.toLowerCase().replace(' ', '-');
                return (
                  <Link key={name} href={`/gcse/${linkName}`} style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    padding: '24px', borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s'
                  }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{data.plays} Sessions • {data.mastered} Mastered</div>
                    </div>
                    <div style={{ 
                      width: 50, height: 50, borderRadius: '50%', border: `4px solid ${data.mastered > 0 ? data.color : 'rgba(255,255,255,0.05)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: data.color,
                      boxShadow: data.mastered > 0 ? `0 0 20px ${data.color}20` : 'none'
                    }}>
                      {data.mastered}
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <AchievementBadge stats={stats} />

          {/* SEO / PEDAGOGICAL CONTENT */}
          <section style={{ marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 60 }}>
            <div style={{ maxWidth: 800 }}>
              <h2 style={{ fontSize: 28, fontWeight: 300, color: '#fff', marginBottom: 24 }}>The Science of Revision: <span style={{ fontWeight: 800, color: COLOR }}>Mission Strategy</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 24 }}>
                Success in GCSE Computer Science and Mathematics isn't just about hard work—it's about <strong>Active Retrieval</strong> and <strong>Spaced Repetition</strong>. 
                Your Mission Control dashboard is designed to facilitate these high-impact learning strategies by tracking your engagement over time.
              </p>
              
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 12 }}>1. Active Retrieval Practice</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 24 }}>
                Every time you take a quiz or a Mock Exam, you are forcing your brain to retrieve information from long-term memory. This process, known as the "Testing Effect," 
                actually strengthens the neural pathways associated with that knowledge. By aiming for "Mastery" status on each topic, you are ensuring that your recall is 
                not just accurate, but fast—a critical factor when facing the time pressure of real OCR or AQA examinations.
              </p>

              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 12 }}>2. The Power of the Streak</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 24 }}>
                The "Ebbinghaus Forgetting Curve" shows that we forget up to 70% of new information within 24 hours if it isn't reviewed. The Daily Streak system 
                is your primary weapon against this curve. By engaging with the platform daily, even for just a 5-minute session, you reset the forgetting curve 
                and move knowledge deeper into your permanent memory.
              </p>

              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 12 }}>3. Interleaving vs. Blocking</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 24 }}>
                While "Blocking" (studying one topic for hours) feels productive, "Interleaving" (switching between subjects) leads to significantly higher exam scores. 
                Use this dashboard to monitor your balance between Maths, Science, and Computer Science. If you see one subject lagging behind, prioritize a "Mission" 
                in that area tomorrow to ensure your global mastery is well-rounded.
              </p>

              <div style={{ marginTop: 40, padding: '24px', borderRadius: 20, background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: COLOR, marginBottom: 8, letterSpacing: '0.1em' }}>ACADEMIC ADVISORY</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                  This dashboard is a private tool for your own growth. Use it to compete against your former self. A Grade 9 is not just a target—it's a reflection of consistent, 
                  disciplined engagement with the curriculum.
                </p>
              </div>
              
              <div style={{ marginTop: 32, fontSize: 11, color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>
                Author: VIBEMENOW Academic Team • Last Updated: {new Date().toLocaleDateString('en-GB')} • Subject: GCSE Revision Strategy
              </div>
            </div>
          </section>

        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body { background: #000 !important; }
        strong { color: #fff; font-weight: 700; }
      `}</style>
    </>
  );
}

function getRank(mastered) {
  if (mastered >= 50) return '🏆 GCSE Champion';
  if (mastered >= 30) return '💎 Diamond Scholar';
  if (mastered >= 20) return '⭐ Academic Overseer';
  if (mastered >= 10) return '🔥 Scholar-Elite';
  if (mastered >= 5) return '⚡ Advanced Agent';
  if (mastered >= 2) return '🧠 Initiate';
  if (mastered >= 1) return '📘 Trainee';
  return '🌱 New Recruit';
}

function DueReviewQueue() {
  const [dueTopics, setDueTopics] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const due = getDueTopics(ALL_REVIEWABLE);
    setDueTopics(due.slice(0, 5)); // Show up to 5
  }, []);

  if (!mounted || dueTopics.length === 0) return null;

  return (
    <section style={{ marginBottom: 40, padding: '24px 28px', borderRadius: 24, background: 'rgba(255,230,0,0.04)', border: '1px solid rgba(255,230,0,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Clock size={18} color="#ffe600" />
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#ffe600' }}>Today's Review Queue</div>
          <div style={{ fontSize: 12, color: '#888' }}>These topics are due for spaced repetition review</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {dueTopics.map(t => {
          const color = strengthToColor(t.strength);
          return (
            <Link key={`${t.subjectId}_${t.slug}`} href={t.href || `/gcse/${t.subjectId}/${t.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '10px 16px', borderRadius: 12, background: `${color}10`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.title}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase' }}>{t.strength}% strength</div>
                </div>
                <ChevronRight size={14} color={color} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
