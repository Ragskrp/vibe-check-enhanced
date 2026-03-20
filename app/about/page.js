'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <h1 className="game-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '24px' }}>
          About <span style={{ color: '#ff2d78' }}>VIBEMENOW</span>
        </h1>
        
        <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '16px' }}>
          <p style={{ marginBottom: '20px' }}>
            Welcome to <strong>VIBEMENOW</strong>, your ultimate destination for fast, addictive, and bite-sized daily games. 
            Our mission is simple: to brighten your mood and challenge your brain with zero friction.
          </p>

          <h2 style={{ color: '#00d4ff', fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Our Mission & Vision</h2>
          <p style={{ marginBottom: '20px' }}>
            VIBEMENOW was born out of a simple observation: the modern internet is often too cluttered, demanding constant attention, accounts, and personal data. We set out to create a <strong>"Zen-Gaming"</strong> oasis—a place where the friction between a human and a high-quality game is reduced to zero.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Our vision for 2026 and beyond is to become the premier destination for "micro-challenges." Whether you're a student on a break, a professional seeking a mental reset, or a group of friends looking for a quick multiplayer showdown, VIBEMENOW provides a curated, high-performance environment designed for joy and cognitive stimulation.
          </p>

          <h2 style={{ color: '#ffe600', fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Scientific Game Design</h2>
          <p style={{ marginBottom: '20px' }}>
            We don't just build games; we design experiences. Each of our 13 active game modes—from <strong>WordVibe</strong> to <strong>Reaction Arena</strong>—is built on principles of cognitive psychology and social dynamics. 
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px', listStyleType: 'square' }}>
            <li style={{ marginBottom: '10px' }}><strong>Cognitive Benefits:</strong> Games like Memory Arena and WordVibe are designed to sharpen recall and linguistic agility.</li>
            <li style={{ marginBottom: '10px' }}><strong>Reaction Training:</strong> Our reaction-based games utilize low-latency browsers techs to help users improve their hand-eye coordination.</li>
            <li><strong>Social Connection:</strong> Through multiplayer rooms and shareable vibing quizzes, we bridge the gap between digital interaction and real-world friendship.</li>
          </ul>

          <h2 style={{ color: '#ff2d78', fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>The "No Login" Promise</h2>
          <p style={{ marginBottom: '20px' }}>
            Privacy is a core value at VIBEMENOW. We believe that your gaming history and "vibe profile" should belong to you. By removing the login requirement, we ensure that:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>🚀 <strong>Instant Access:</strong> No waiting for verification emails. Just click and play.</li>
            <li style={{ marginBottom: '10px' }}>🛡️ <strong>Privacy First:</strong> No tracking of your personal habits or selling of user data.</li>
            <li>🌍 <strong>Universal Reach:</strong> Anyone, anywhere, on any device can join the vibe.</li>
          </ul>

          <div style={{ 
            background: 'rgba(255, 45, 120, 0.05)', 
            border: '1px solid rgba(255, 45, 120, 0.2)', 
            padding: '24px', 
            borderRadius: '16px',
            marginTop: '40px'
          }}>
            <h3 style={{ color: '#ff2d78', marginTop: 0 }}>The Team Behind the Vibe</h3>
            <p>
              VIBEMENOW is maintained by a global collective of developers, psychologists, and artists dedicated to making the web a more playful and human-centric space. We are constantly evolving and welcome your feedback via our <Link href="/contact" style={{ color: '#ff2d78', textDecoration: 'underline' }}>Contact Form</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
