'use client';

import { Mail, Globe, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
        <h1 className="game-title" style={{ fontSize: '36px', marginBottom: '12px' }}>
          Contact <span style={{ color: '#00d4ff' }}>Us</span>
        </h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>
          Have a question, feedback, or a game suggestion? Reach out!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid #1a1a2e',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'left'
          }}>
            <div style={{ background: 'rgba(0, 212, 255, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <Mail color="#00d4ff" size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#fff' }}>Email Us</div>
              <div style={{ color: '#00d4ff', fontSize: '14px' }}>support@vibecheck-play.com</div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid #1a1a2e',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'left'
          }}>
            <div style={{ background: 'rgba(255, 45, 120, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <MessageSquare color="#ff2d78" size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#fff' }}>Social Media</div>
              <div style={{ color: '#ff2d78', fontSize: '14px' }}>@VibeCheckPlay on X / Twitter</div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid #1a1a2e',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'left'
          }}>
            <div style={{ background: 'rgba(177, 74, 237, 0.1)', padding: '12px', borderRadius: '12px' }}>
              <Globe color="#b14aed" size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#fff' }}>Business Inquiries</div>
              <div style={{ color: '#b14aed', fontSize: '14px' }}>partners@vibecheck-play.com</div>
            </div>
          </div>
        </div>

        <p style={{ marginTop: '40px', color: '#555', fontSize: '13px' }}>
          We typically respond to all inquiries within 24-48 business hours. ⚡
        </p>
      </div>
    </div>
  );
}
