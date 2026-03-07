'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle, Home } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', query: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 className="game-title" style={{ fontSize: '36px', marginBottom: '12px' }}>
            Contact <span style={{ color: '#00d4ff' }}>Us</span>
          </h1>
          <p style={{ color: '#888' }}>
            Have a question or feedback? Send us a message securely.
          </p>
        </div>

        {status === 'success' ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px', 
            background: 'rgba(0, 255, 148, 0.05)', 
            borderRadius: '16px', 
            border: '1px solid #00ff94' 
          }}>
            <CheckCircle size={48} color="#00ff94" style={{ marginBottom: '16px' }} />
            <h2 style={{ color: '#fff' }}>Message Sent!</h2>
            <p style={{ color: '#888', marginTop: '8px' }}>We&apos;ve received your vibe. We&apos;ll get back to you soon at your email address.</p>
            <button 
              className="btn-outline" 
              style={{ marginTop: '24px' }}
              onClick={() => setStatus('idle')}
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#555', fontSize: '13px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>
                Full Name
              </label>
              <input 
                type="text"
                required
                placeholder="How should we call you?"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ 
                  width: '100%', padding: '12px', borderRadius: '12px', background: '#0a0a0f', 
                  border: '2px solid #1a1a2e', color: '#fff', fontSize: '15px' 
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#555', fontSize: '13px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>
                Email Address
              </label>
              <input 
                type="email"
                required
                placeholder="Where should we reply?"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{ 
                  width: '100%', padding: '12px', borderRadius: '12px', background: '#0a0a0f', 
                  border: '2px solid #1a1a2e', color: '#fff', fontSize: '15px' 
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#555', fontSize: '13px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>
                Your Query
              </label>
              <textarea 
                required
                rows={5}
                placeholder="What's on your mind?..."
                value={formData.query}
                onChange={(e) => setFormData({...formData, query: e.target.value})}
                style={{ 
                  width: '100%', padding: '12px', borderRadius: '12px', background: '#0a0a0f', 
                  border: '2px solid #1a1a2e', color: '#fff', fontSize: '15px', resize: 'none' 
                }}
              />
            </div>

            {status === 'error' && (
              <p style={{ color: '#ff2d78', fontSize: '14px', fontWeight: 700 }}>
                Oops! Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={status === 'loading'}
              style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              {status === 'loading' ? 'Transmitting...' : (
                <>
                  Submit Query <Send size={18} />
                </>
              )}
            </button>
          </form>
        )}


      </div>
    </div>
  );
}
