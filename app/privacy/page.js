'use client';

export default function PrivacyPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <h1 className="game-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '24px' }}>
          Privacy <span style={{ color: '#00ff94' }}>Policy</span>
        </h1>
        
        <div style={{ color: '#ccc', lineHeight: '1.6', fontSize: '14px' }}>
          <p style={{ marginBottom: '20px' }}>
            Last Updated: March 7, 2026
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>1. Information We Collect</h2>
          <p>
            VIBECHECK is designed to be played without registration. We do not require you to provide a name, email address, or any personal identification to access our games. 
            However, we may collect non-personal data such as your IP address, browser type, and device information to improve our services.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>2. Google AdSense & Cookies</h2>
          <p>
            VIBECHECK uses Google AdSense to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site. 
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
          </p>
          <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.</li>
            <li style={{ marginBottom: '8px' }}>Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff94' }}>Ads Settings</a>.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>3. Data Storage (Firebase)</h2>
          <p>
            For multiplayer game modes (like Quiz Arena), we use Google Firebase to store game room data temporarily. 
            This data includes room codes, player nicknames, and scores. This data is non-personally identifiable and is used solely for the functionality of the live game match.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>4. Third-Party Links</h2>
          <p>
            Directly or through our advertisements, our site may contain links to third-party websites. 
            We do not control these websites and are not responsible for their privacy policies.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>5. Policy Updates</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. 
            You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <div style={{ marginTop: '40px', borderTop: '1px solid #1a1a2e', paddingTop: '20px', color: '#555' }}>
            For any questions regarding this policy, please contact us at support@vibecheck-play.com.
          </div>
        </div>
      </div>
    </div>
  );
}
