'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, success: null, error: '' });

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      setStatus({ loading: false, success: true, error: '' });
      setForm({ subject: '', message: '' });
    } else {
      setStatus({ loading: false, success: false, error: result.error || 'Submission failed.' });
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 40px' }}>
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
            Send us a message directly and we&apos;ll respond as soon as possible.
          </p>
          <p style={{ color: '#aaa', fontSize: '14px', maxWidth: '600px', margin: '20px auto 0', lineHeight: 1.7 }}>
            We only collect the message subject and content. No personal name or email address is required, so your privacy is protected and no additional GDPR contact data is stored.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <label style={{ color: '#ccc', fontSize: '14px' }}>
              Subject
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#fff',
                }}
              />
            </label>

            <label style={{ color: '#ccc', fontSize: '14px' }}>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#fff',
                }}
              />
            </label>
          </div>

          {status.success && (
            <div style={{ padding: '18px', borderRadius: '18px', background: 'rgba(0,255,148,0.12)', color: '#b6ffca', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} /> Thank you — your message has been sent.
            </div>
          )}

          {status.success === false && (
            <div style={{ padding: '18px', borderRadius: '18px', background: 'rgba(255,85,85,0.12)', color: '#ffb6b6', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} /> {status.error}
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="btn-primary"
            style={{
              padding: '18px 24px',
              width: '100%',
              borderRadius: '18px',
              fontWeight: 700,
            }}
          >
            {status.loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
            Average response time: 24-48 hours. <br />
            Published by <strong style={{ color: '#777' }}>VIBEMENOW</strong><br />
            London Bridge, London, United Kingdom
          </p>
          <Link href="/" style={{ color: '#00d4ff', fontSize: '14px', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
            ← Back to Games
          </Link>
        </div>
      </div>
    </div>
  );
}
