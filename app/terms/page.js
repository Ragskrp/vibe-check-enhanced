'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <h1 className="game-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '24px' }}>
          Terms of <span style={{ color: '#00d4ff' }}>Service</span>
        </h1>
        
        <div style={{ color: '#ccc', lineHeight: '1.6', fontSize: '14px' }}>
          <p style={{ marginBottom: '20px' }}>
            Last Updated: March 20, 2026
          </p>

          <p style={{ marginBottom: '20px' }}>
            Welcome to VIBEMENOW ("we," "us," or "our"). By accessing or using our website at <strong>vibemenow.uk</strong> (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service. VIBEMENOW is a free, browser-based gaming platform that does not require registration.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
          <p>
            By using VIBEMENOW, you confirm that you are at least 13 years of age and that you have the legal capacity to enter into these Terms. If you are under 18, you confirm that you have the consent of a parent or guardian. Your continued use of the Service constitutes your acceptance of any updates or modifications to these Terms.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>2. Description of Service</h2>
          <p>
            VIBEMENOW provides a collection of free, browser-based casual games, quizzes, and interactive content. Our Service includes solo games (such as WordVibe, Emoji IQ, and Geography Guesser), multiplayer games (such as Quiz Arena, Reaction Arena, and Drawing Dash), and informational content (such as game guides and articles). The games are provided "as-is" for entertainment purposes and are available without user registration.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>3. User Conduct</h2>
          <p>
            When using our multiplayer features, you agree to:
          </p>
          <ul style={{ marginTop: '12px', paddingLeft: '20px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Use appropriate and non-offensive nicknames when joining game rooms.</li>
            <li style={{ marginBottom: '8px' }}>Refrain from attempting to manipulate game scores, exploit bugs, or disrupt the experience for other players.</li>
            <li style={{ marginBottom: '8px' }}>Not use automated tools, bots, or scripts to interact with the Service.</li>
            <li>Not attempt to reverse-engineer, decompile, or extract source code from the Service.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>4. Intellectual Property</h2>
          <p>
            All content on VIBEMENOW, including but not limited to game designs, text, graphics, logos, icons, images, audio clips, and software, is the property of VIBEMENOW or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this site without our express written permission.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>5. Advertisements</h2>
          <p>
            VIBEMENOW is a free service supported by advertising revenue through Google AdSense and potentially other advertising networks. By using the Service, you acknowledge that advertisements may be displayed on the site. You agree not to use ad-blocking software to circumvent these advertisements, as they are essential to the continued operation of the free Service. You also agree not to click on advertisements in a fraudulent or deceptive manner.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>6. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>7. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, VIBEMENOW AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>8. Third-Party Links and Content</h2>
          <p>
            Our Service may contain links to third-party websites or services that are not owned or controlled by VIBEMENOW. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. Your continued use of the Service after the effective date of the revised Terms constitutes your acceptance of the changes.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of the United Kingdom.
          </p>

          <h2 style={{ color: '#fff', fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us via our <Link href="/contact" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Contact Form</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
