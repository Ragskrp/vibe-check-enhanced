'use client';

import Link from 'next/link';
import { Home, Sparkles, Zap, Heart, Shield, Terminal } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '56px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '12px', 
            borderRadius: '20px', 
            background: 'rgba(255, 45, 120, 0.1)', 
            marginBottom: '16px' 
          }}>
            <Zap size={32} color="#ff2d78" />
          </div>
          <h1 className="game-title" style={{ fontSize: '48px', marginBottom: '8px' }}>
            The Story of <span style={{ color: '#ff2d78' }}>VIBEMENOW</span>
          </h1>
          <p style={{ color: '#555', fontSize: '18px', fontWeight: 600 }}>Building the internet&apos;s favorite &quot;five-minute escape."</p>
        </div>

        <div style={{ color: '#bbb', lineHeight: '1.9', fontSize: '17px' }}>
          <p style={{ marginBottom: '28px' }}>
            Welcome to <strong>VIBEMENOW</strong>. If you&apos;ve ever found yourself with five minutes to spare—waiting for a train, cooling off after a meeting, or just needing a mental palate cleanser—you’re exactly why we built this. We aren't just another gaming website; we’re a movement back toward the &quot;instant web," where the distance between your curiosity and a great experience is exactly <strong>zero.</strong>
          </p>

          <h2 style={{ color: '#00d4ff', fontSize: '28px', marginTop: '48px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={24} /> Why Another Gaming Site?
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Let’s be honest: the modern internet can be exhausting. To play a simple word game or test your reflexes today, you usually have to fight through a barrage of intrusive pop-ups, verify your email, create a &quot;unique" username you&apos;ll forget tomorrow, and agree to have your data tracked across every corner of the digital world.
          </p>
          <p style={{ marginBottom: '28px' }}>
            VIBEMENOW was born out of a collective frustration with that friction. We asked ourselves a simple question: <em>&quot;What if a website respected your time as much as it entertained you?"</em> We set out to create a <strong>&quot;Zen-Gaming"</strong> oasis—a high-performance, distraction-free environment where you can jump into a multiplayer arena or a solo puzzle in literally two clicks. No logins, no hurdles, just pure vibes.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px',
            margin: '48px 0',
            padding: '32px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div>
              <h3 style={{ color: '#ffe600', fontSize: '20px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={18} /> High-Octane Tech
              </h3>
              <p style={{ fontSize: '15px', color: '#888' }}>
                We use cutting-edge edge computing and low-latency browser technologies to ensure our multiplayer rooms feel like native apps. Whether you&apos;re in London or Tokyo, the vibe stays sync'd.
              </p>
            </div>
            <div>
              <h3 style={{ color: '#00ff94', fontSize: '20px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} /> Privacy by Design
              </h3>
              <p style={{ fontSize: '15px', color: '#888' }}>
                Because you don&apos;t log in, we don't know who you are. Your game history stays on your device, and your data stays in your pocket. We believe that's how the web should work.
              </p>
            </div>
          </div>

          <h2 style={{ color: '#ff2d78', fontSize: '28px', marginTop: '48px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Heart size={24} /> The Science of the &quot;Micro-Break"
          </h2>
          <p style={{ marginBottom: '24px' }}>
            We don&apos;t just &quot;build" games; we curate them with purpose. Our library of 13 game modes—ranging from the linguistic gymnastics of <strong>WordVibe</strong> to the rapid-fire chaos of <strong>Reaction Arena</strong>—is designed based on principles of cognitive flow and positive psychology. 
          </p>
          <p style={{ marginBottom: '24px' }}>
            Research shows that short, varied mental resets can actually increase productivity and reduce cortisol levels. That &quot;quick game of Emoji IQ" isn&apos;t a distraction; it's a recalibration. We work closely with UI designers and psychologists to ensure our color palettes, soundscapes (coming soon!), and interaction patterns promote a "flow state" rather than digital addiction.
          </p>

          <h2 style={{ color: '#ffe600', fontSize: '28px', marginTop: '48px', marginBottom: '20px' }}>Our Vision for 2026</h2>
          <p style={{ marginBottom: '24px' }}>
            The web is changing. As the boundaries between mobile, desktop, and &quot;spatial computing" blur, VIBEMENOW is evolving to be the ubiquitous layer of fun on top of the internet. Our goal is to expand our roster to 50+ unique daily modes while maintaining our lightweight, zero-login promise. 
          </p>
          <p style={{ marginBottom: '28px' }}>
            We&apos;re also building deeper community features, including &quot;Vibe Rooms" where families and coworkers can host private tournaments, and "Global Vibe Stats" that celebrate the collective human intelligence across the planet. 
          </p>

          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255, 45, 120, 0.1), rgba(0, 212, 255, 0.1))', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            padding: '32px', 
            borderRadius: '24px',
            marginTop: '60px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#fff', fontSize: '22px', marginTop: 0, marginBottom: '16px' }}>Join the Global Community</h3>
            <p style={{ marginBottom: '24px', color: '#aaa' }}>
              VIBEMENOW is maintained by a small, passionate group of developers, data scientists, and artists. We love hearing from our players. Whether you have a game idea, found a bug, or just want to tell us your latest high score, we&apos;re all ears.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link href="/contact">
                <button className="btn-primary" style={{ padding: '12px 32px' }}>Contact the Team</button>
              </Link>
              <Link href="/#games-listing">
                <button className="btn-outline" style={{ padding: '12px 32px' }}>Back to Games</button>
              </Link>
            </div>
          </div>
          
          <div style={{ marginTop: '48px', textAlign: 'center', fontSize: '14px', color: '#555' }}>
            <p>© 2026 VIBEMENOW.UK • Proudly independent • No trackers • Just vibes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
