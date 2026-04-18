'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Copy, Check, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = 'support@vibemenow.uk';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '16px',
              borderRadius: '24px',
              background: 'rgba(0, 212, 255, 0.1)',
              marginBottom: '20px',
            }}
          >
            <Mail size={40} color="#00d4ff" />
          </div>
          <h1 className="game-title" style={{ fontSize: '42px', marginBottom: '12px' }}>
            Get in <span style={{ color: '#00d4ff' }}>Touch</span>
          </h1>
          <p style={{ color: '#888', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
            We prefer direct communication. Send us an email and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '32px',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <div style={{ color: '#555', fontSize: '13px', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Official Support Email
          </div>
          <div 
            style={{ 
              fontSize: '28px', 
              fontWeight: 800, 
              color: '#fff', 
              marginBottom: '24px',
              wordBreak: 'break-all'
            }}
          >
            {email}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href={`mailto:${email}`}
              className="btn-primary"
              style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            >
              Open Mail Client <ExternalLink size={18} />
            </a>
            <button 
              onClick={copyToClipboard}
              className="btn-outline"
              style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '160px', justifyContent: 'center' }}
            >
              {copied ? (
                <>
                  Copied! <Check size={18} color="#00ff94" />
                </>
              ) : (
                <>
                  Copy Email <Copy size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#eee', fontSize: '16px', marginBottom: '8px' }}>Bug Reports</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
              Found a glitch in a game? Please include your device and browser type so we can fix it faster.
            </p>
          </div>
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#eee', fontSize: '16px', marginBottom: '8px' }}>Business & Ads</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
              For partnership inquiries or questions about our advertising and editorial policies.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p style={{ color: '#555', fontSize: '14px' }}>
            Average response time: 24-48 hours. <br />
            Published by <strong style={{ color: '#777' }}>VIBEMENOW</strong>
          </p>
          <Link href="/" style={{ color: '#00d4ff', fontSize: '14px', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
            ← Back to Games
          </Link>
        </div>
      </div>
    </div>
  );
}
