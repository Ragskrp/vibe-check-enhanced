'use client';

import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Target, Cloud, Zap, Flame, Trophy, Shield, Clock, Brain, Star, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';


export default function LoginPage() {
  const { user, loginWithGoogle, signUpWithEmail, loginWithEmail, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    if (user) {
      router.push('/gcse/dashboard');
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const features = [
    {
      id: 'sync',
      icon: <Cloud size={20} color="#00d4ff" />,
      title: 'Persistent Cloud Save',
      desc: 'Never lose your progress. Sync across phone, laptop, and school iPad seamlessly.',
      color: '#00d4ff',
      glowColor: 'rgba(0, 212, 255, 0.2)'
    },
    {
      id: 'grades',
      icon: <Zap size={20} color="#00ff94" />,
      title: 'AI-Grade Predictor (9-1)',
      desc: 'Real-time estimation of your target GCSE grades based on active recall strength.',
      color: '#00ff94',
      glowColor: 'rgba(0, 255, 148, 0.2)'
    },
    {
      id: 'timer',
      icon: <Clock size={20} color="#ffe600" />,
      title: 'Pomodoro Focus Space',
      desc: 'Log study hours, trigger study ambient soundscapes, and keep your daily streak alive.',
      color: '#ffe600',
      glowColor: 'rgba(255, 230, 0, 0.2)'
    },
    {
      id: 'arena',
      icon: <Trophy size={20} color="#ff2d78" />,
      title: 'Exam simulator',
      desc: 'Put your knowledge to the test in 45-min timed past papers pulling from 8 subjects.',
      color: '#ff2d78',
      glowColor: 'rgba(255, 45, 120, 0.2)'
    }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      
      {/* Dynamic Keyframes Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes radialPulse {
          0% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 212, 255, 0.05); }
          50% { box-shadow: 0 0 35px rgba(0, 212, 255, 0.25), inset 0 0 30px rgba(0, 212, 255, 0.1); }
          100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 212, 255, 0.05); }
        }
        @keyframes textGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(255, 255, 255, 0.05); }
          50% { border-color: rgba(0, 212, 255, 0.3); }
        }
        .glowing-title {
          background: linear-gradient(90deg, #00d4ff, #ff2d78, #b14aed, #00ff94, #00d4ff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textGradient 8s ease infinite;
        }
        .card-perspective {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-perspective:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 15px 45px rgba(0, 212, 255, 0.15);
        }
        .login-btn-gradient {
          background: #fff;
          color: #000;
          transition: all 0.3s ease;
        }
        .login-btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.7);
          background: #00d4ff;
          color: #000;
        }
        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .feature-card:hover {
          background: rgba(255, 255, 255, 0.03) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
        }
      `}} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        maxWidth: '1050px',
        width: '100%',
        alignItems: 'stretch',
      }}>
        
        {/* LEFT COLUMN: Gamification Unlocks & Teasers */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px',
          animation: 'floatEffect 6s ease-in-out infinite',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{
              background: 'rgba(0, 212, 255, 0.1)',
              color: '#00d4ff',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              System Status: Active
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff94' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff94', opacity: 0.6 }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff94', opacity: 0.3 }} />
            </div>
          </div>

          <h2 className="glowing-title" style={{ fontSize: 'clamp(32px, 4.5vw, 44px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Elevate Your Study Game.
          </h2>

          <p style={{ color: '#aaa', fontSize: '16px', lineHeight: 1.6, marginBottom: 32, maxWidth: '440px' }}>
            Unlock high-fidelity interactive modules designed to turn revision into a streak-building game. Track stats, predict grades, and secure your data.
          </p>

          {/* Holographic Feature List */}
          <div style={{ display: 'grid', gap: '16px' }}>
            {features.map((feat) => (
              <div
                key={feat.id}
                className="feature-card"
                onMouseEnter={() => setHoveredFeature(feat.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '20px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: `1px solid ${hoveredFeature === feat.id ? feat.color : 'rgba(255, 255, 255, 0.05)'}`,
                  boxShadow: hoveredFeature === feat.id ? `0 10px 30px ${feat.glowColor}` : 'none',
                  cursor: 'default'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  flexShrink: 0
                }}>
                  {feat.icon}
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {feat.title}
                    {hoveredFeature === feat.id && <Star size={12} color={feat.color} fill={feat.color} />}
                  </h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '13px', lineHeight: 1.5 }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Glassmorphic Login Card */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div 
            className="card-perspective"
            style={{
              width: '100%',
              maxWidth: '430px',
              padding: '48px 40px',
              borderRadius: '32px',
              background: 'rgba(19, 19, 31, 0.65)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animation: 'radialPulse 10s infinite alternate',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ambient Background Glow Layer */}
            <div style={{
              position: 'absolute',
              top: '-150px',
              right: '-150px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-150px',
              left: '-150px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 45, 120, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            {/* Glowing Logo Icon */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #00d4ff, #ff2d78)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              boxShadow: '0 8px 32px rgba(0, 212, 255, 0.35)',
              position: 'relative'
            }}>
              <Target size={36} color="#000" strokeWidth={2.5} />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '20px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                pointerEvents: 'none'
              }} />
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em', textAlign: 'center' }}>
              Connect Account
            </h3>
            
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: 36, fontSize: '14px', lineHeight: 1.6, textAlign: 'center' }}>
              Save your progress to the cloud so you can pick up revision where you left off on any device.
            </p>{loading ? (


  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: '16px 0',
    color: '#00d4ff',
    fontWeight: 700
  }}>
    <div style={{
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      border: '3px solid rgba(0, 212, 255, 0.1)',
      borderTopColor: '#00d4ff',
      animation: 'floatEffect 1s linear infinite'
    }} />
    <span>Synchronizing Session...</span>
  </div>
) : (
  <div>
    {/* Google Sign-In */}
    <button
      onClick={handleLogin}
      className="login-btn-gradient"
      style={{
        width: '100%',
        padding: '18px 24px',
        borderRadius: '16px',
        fontSize: '15px',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        border: 'none',
        cursor: 'pointer',
        marginBottom: '24px'
      }}
    >
      <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 18, height: 18 }} />
      Authenticate with Google
    </button>

    {/* Email/Password Auth */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.05)',
          color: '#fff'
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.05)',
          color: '#fff'
        }}
      />
      <button
        onClick={async () => {
          try {
            if (isSignUp) {
              await signUpWithEmail(email, password);
            } else {
              await loginWithEmail(email, password);
            }
          } catch (e) {
            console.error(e);
          }
        }}
        style={{
          width: '100%',
          padding: '14px 20px',
          borderRadius: '12px',
          background: isSignUp ? '#ff2d78' : '#00d4ff',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        {isSignUp ? 'Sign Up' : 'Log In'}
      </button>
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#aaa' }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            marginLeft: '8px',
            background: 'none',
            border: 'none',
            color: '#ff2d78',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </div>
    </div>
  </div>
)}

            {/* Split Mode Selector (Visual indicator of guest vs cloud) */}
            <div style={{
              marginTop: '40px',
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Shield size={16} color="#00ff94" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#00ff94', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Secure Session Spec
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderBottom: '1px solid rgba(255, 255, 255, 0.03)', paddingBottom: '6px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Authentication Method</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>Google OAuth 2.0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderBottom: '1px solid rgba(255, 255, 255, 0.03)', paddingBottom: '6px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Local Guest Mode</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>Supported (Offline)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Cloud Syncing</span>
                  <span style={{ color: '#00d4ff', fontWeight: 600 }}>Automatic (On Active)</span>
                </div>
              </div>
            </div>

            {/* Optional / Skip action */}
            <div style={{ marginTop: '28px', textAlign: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '12px' }}>
                Don't want to sign in?{' '}
              </span>
              <button
                onClick={() => router.push('/gcse/dashboard')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff2d78',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#ff2d78'}
              >
                Go to Dashboard <ArrowRight size={12} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

