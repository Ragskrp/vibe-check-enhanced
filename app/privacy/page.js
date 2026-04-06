'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <h1 className="game-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '24px' }}>
          Privacy <span style={{ color: '#00ff94' }}>Policy</span>
        </h1>
        
        <div style={{ color: '#ccc', lineHeight: '1.6', fontSize: '14px' }}>
          <p style={{ marginBottom: '20px' }}>
            Last Updated: March 20, 2026
          </p>

          <p style={{ marginBottom: '20px' }}>
            VIBEMENOW (&quot;we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website. By using VIBEMENOW, you agree to the terms of this policy.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>1. Personal Information Collection</h2>
          <p>
            VIBEMENOW is designed as a &quot;No-Registration" platform. We do not require you to provide a name, email address, or physical address to access our games. We do not maintain user accounts or profiles that link specifically to your real-world identity.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>2. Technical Data & Cookies</h2>
          <p>
            Like most websites, we collect non-identifying technical data to ensure our games run smoothly. This includes your IP address (anonymized where possible), browser type, device type, and operating system.
          </p>
          <p style={{ marginTop: '12px' }}>
            We use <strong>Cookies</strong> to enhance your experience. Cookies are small files stored on your device that help us remember your game progress and high scores locally.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>3. Google AdSense & Personalized Advertising</h2>
          <p>
            We use Google AdSense to serve advertisements on our site. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to VIBEMENOW and other websites on the internet.
          </p>
          <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites.</li>
            <li style={{ marginBottom: '8px' }}>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff94' }}>Google&apos;s Ads Settings</a>.</li>
            <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff94' }}>www.aboutads.info</a>.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>4. Data Handling (Firebase & Multiplayer)</h2>
          <p>
            In multiplayer modes, we use Google Firebase for real-time data synchronization. This data (e.g., room codes and game scores) is transient and does not contain personal information. We do not store this data longer than necessary for the completion of your game session.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>5. GDPR & CCPA Compliance</h2>
          <p>
            If you are a resident of the European Economic Area (EEA) or California, you have certain data protection rights. Because we do not store &quot;Personal Data" in the traditional sense (no names or emails), we fulfill our obligations by:
          </p>
          <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Minimizing data collection to the absolute necessary technical requirements.</li>
            <li style={{ marginBottom: '8px' }}>Providing clear information on third-party tracking (AdSense).</li>
            <li>Allowing you to clear your local game data at any time through your browser settings.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our <Link href="/contact" style={{ color: '#00ff94', textDecoration: 'underline' }}>Contact Form</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
