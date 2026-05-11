export const metadata = {
  title: 'Privacy Policy | VIBEMENOW',
  description: 'How we handle your data, cookies, and third-party advertising disclosures.',
  alternates: {
    canonical: 'https://vibemenow.uk/privacy',
  },
};

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
            Last Updated: May 1, 2026
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>1. Who we are (Data Controller)</h2>
          <p>
            Publisher: VIBEMENOW, operated by Raghavendra Reddy<br />
            Address: London Bridge, London, United Kingdom<br />
            Contact: <a href="mailto:privacy@vibemenow.uk" style={{ color: '#00ff94', textDecoration: 'underline' }}>privacy@vibemenow.uk</a><br />
            <em>Note: As a UK-based publisher, VIBEMENOW processes data under UK GDPR.</em>
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>2. What personal data we collect and why</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Essential Technical Data:</strong> IP address (anonymised), browser type, device type. Legal basis: Legitimate Interests.</li>
            <li style={{ marginBottom: '8px' }}><strong>Game state:</strong> Local storage only, never transmitted to our servers. Legal basis: Contract/Service delivery.</li>
            <li style={{ marginBottom: '8px' }}><strong>Multiplayer sessions:</strong> Temporary room codes and display names via Firebase. Legal basis: Contract (deleted within 24 hours of session end).</li>
            <li style={{ marginBottom: '8px' }}><strong>Analytics:</strong> Page views, session duration via Google Analytics. Legal basis: Consent.</li>
            <li><strong>Advertising:</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites. Legal basis: Consent.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>3. Cookies and consent</h2>
          <p>We use three categories of cookies:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Essential:</strong> Required for the site to function.</li>
            <li style={{ marginBottom: '8px' }}><strong>Analytics:</strong> Help us understand how visitors use the site.</li>
            <li style={{ marginBottom: '8px' }}><strong>Advertising:</strong> Used by Google AdSense to serve personalized ads.</li>
          </ul>
          <p>
            Non-essential cookies (Analytics and Advertising) only fire after your explicit consent. You can withdraw or modify your consent at any time by clicking the "Cookie Settings" link in the footer of any page.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>4. Third-party processors</h2>
          <p>We use the following third-party processors:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Google LLC (AdSense, Analytics, Firebase):</strong> Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff94' }}>Ads Settings</a>. 
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Advertising partners:</strong> VIBEMENOW currently uses Google AdSense for advertising. If we add another advertising partner in the future, we will update this policy before enabling that partner on the site.
            </li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>5. Data retention periods</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Session data:</strong> Deleted at session end (within 24 hours).</li>
            <li style={{ marginBottom: '8px' }}><strong>Analytics data:</strong> Retained by Google per their standard retention settings (26 months by default).</li>
            <li style={{ marginBottom: '8px' }}><strong>Local game state:</strong> Stored in user's browser, user-controlled.</li>
            <li><strong>Log data:</strong> Purged within 30 days.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>6. Your rights under UK GDPR</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Right to access your data</li>
            <li>Right to rectification</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent at any time</li>
          </ul>
          <p>To exercise these rights, please email us at <a href="mailto:privacy@vibemenow.uk" style={{ color: '#00ff94', textDecoration: 'underline' }}>privacy@vibemenow.uk</a>.</p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>7. Supervisory authority</h2>
          <p>
            You have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff94' }}>ico.org.uk</a>.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>8. Changes to this policy</h2>
          <p>
            We will notify users of material changes by updating the 'Last Updated' date at the top of this page.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>9. Contact</h2>
          <p>
            For privacy-related inquiries, please contact <a href="mailto:privacy@vibemenow.uk" style={{ color: '#00ff94', textDecoration: 'underline' }}>privacy@vibemenow.uk</a>. For general support, contact <a href="mailto:support@vibemenow.uk" style={{ color: '#00ff94', textDecoration: 'underline' }}>support@vibemenow.uk</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
