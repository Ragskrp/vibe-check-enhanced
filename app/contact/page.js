'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, unavailable, error
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Your message has been sent.');
        setFormData({ name: '', email: '', query: '' });
      } else if (res.status === 503) {
        setStatus('unavailable');
        setMessage(data.message || 'Direct email is the fastest way to reach us right now.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again or email us directly.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again or email us directly.');
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
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#aaa',
              fontSize: '14px',
              lineHeight: '1.7',
            }}
          >
            <div><strong style={{ color: '#fff' }}>Publisher:</strong> VIBEMENOW</div>
            <div><strong style={{ color: '#fff' }}>Site:</strong> VIBEMENOW</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <Mail size={14} color="#00d4ff" />
              <a href="mailto:support@vibemenow.uk" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
                support@vibemenow.uk
              </a>
            </div>
          </div>
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
            <p style={{ color: '#888', marginTop: '8px' }}>{message}</p>
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
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '14px',
                background: 'rgba(0, 212, 255, 0.05)',
                border: '1px solid rgba(0, 212, 255, 0.18)',
                color: '#9adfff',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              For the fastest response, email{' '}
              <a href="mailto:support@vibemenow.uk" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
                support@vibemenow.uk
              </a>
              . The form below works only when server-side forwarding is enabled.
            </div>

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

            {status === 'unavailable' && (
              <p style={{ color: '#fbbf24', fontSize: '14px', fontWeight: 700 }}>
                {message}
              </p>
            )}

            {status === 'error' && (
              <p style={{ color: '#ff2d78', fontSize: '14px', fontWeight: 700 }}>
                {message}
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
