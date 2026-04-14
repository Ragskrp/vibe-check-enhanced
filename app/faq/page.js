import Link from 'next/link';
import { HelpCircle, Gamepad2, Shield, CreditCard, Users, Sparkles, Mail } from 'lucide-react';

const FAQ_SECTIONS = [
  {
    icon: <Gamepad2 size={20} />,
    title: 'Games & Gameplay',
    color: '#00d4ff',
    faqs: [
      {
        q: 'Do I need to create an account to play?',
        a: 'No. Every game on VIBEMENOW is designed to work without registration, login, or app installation. You can open any page and start playing immediately.'
      },
      {
        q: 'How many games are available?',
        a: 'VIBEMENOW currently offers 18+ original browser games across categories including daily puzzles, reaction tests, multiplayer rooms, arcade classics, and educational quizzes.'
      },
      {
        q: 'Are the games free to play?',
        a: 'Yes. All games on VIBEMENOW are completely free. The site is supported by non-intrusive advertising.'
      },
      {
        q: 'Do games save my progress?',
        a: 'Most games save progress locally in your browser using localStorage. This means your scores and streaks persist on the same device and browser, but are not synced across devices.'
      },
      {
        q: 'What is a "daily" game?',
        a: 'Daily games (like WordVibe) reset every 24 hours with a new challenge. All players around the world get the same puzzle each day, making it easy to compare results with friends.'
      },
    ]
  },
  {
    icon: <Users size={20} />,
    title: 'Multiplayer & Rooms',
    color: '#00ff94',
    faqs: [
      {
        q: 'How do multiplayer rooms work?',
        a: 'One player creates a room and receives a unique code. Other players enter that code to join the same session. All game state is synchronized in real-time using Google Firebase.'
      },
      {
        q: 'Is there a limit to how many people can join a room?',
        a: 'Most room-based games support 2–8 players. The exact limit depends on the specific game mode.'
      },
      {
        q: 'Are player names in multiplayer moderated?',
        a: 'Yes. Multiplayer rooms where users can input names or messages are subject to content filtering. Offensive or inappropriate content may be blocked automatically.'
      },
    ]
  },
  {
    icon: <Shield size={20} />,
    title: 'Privacy & Data',
    color: '#b14aed',
    faqs: [
      {
        q: 'What data do you collect?',
        a: 'We collect minimal technical data (browser type, device type) for site functionality. We do not collect names, emails, or personal identifiers during normal gameplay. See our Privacy Policy for full details.'
      },
      {
        q: 'Do you use cookies?',
        a: 'Yes. We use cookies for game progress (localStorage), analytics, and advertising (Google AdSense). You can manage cookie preferences through our cookie consent banner or your browser settings.'
      },
      {
        q: 'Is my data sold to third parties?',
        a: 'No. We do not sell personal data. Third-party advertising (Google AdSense) may use standard cookies for ad personalization, which you can opt out of via Google\'s Ads Settings.'
      },
    ]
  },
  {
    icon: <CreditCard size={20} />,
    title: 'Ads & Monetization',
    color: '#ffe600',
    faqs: [
      {
        q: 'Why do I see ads on the site?',
        a: 'Ads are the sole way VIBEMENOW funds its free games. We use Google AdSense to display non-intrusive advertisements. Ads are intentionally withheld from legal/policy pages.'
      },
      {
        q: 'Can I use an ad blocker?',
        a: 'While the site will function with an ad blocker, we appreciate it if you whitelist VIBEMENOW. Ad revenue directly supports the development of new games and content.'
      },
      {
        q: 'Are there any in-app purchases or paywalls?',
        a: 'No. There are no microtransactions, premium tiers, or paywalled content. Every feature is free for all users.'
      },
    ]
  },
  {
    icon: <Sparkles size={20} />,
    title: 'Content & Education',
    color: '#ff2d78',
    faqs: [
      {
        q: 'Are the blog articles based on real research?',
        a: 'Yes. Our educational articles cite peer-reviewed studies, reputable institutions (NIH, Education Endowment Foundation, BrainFacts.org), and established frameworks in cognitive science and pedagogy.'
      },
      {
        q: 'Are quiz results or personality labels scientific?',
        a: 'No. Any quiz-style outcomes (like the Vibe Quiz) are for entertainment purposes only and should not be treated as professional, medical, or clinical advice.'
      },
      {
        q: 'Who writes the content?',
        a: 'All content is created and reviewed by the VIBEMENOW team. Educational articles are researched and written with reference to published academic literature.'
      },
    ]
  },
  {
    icon: <Mail size={20} />,
    title: 'Support & Contact',
    color: '#ff8c00',
    faqs: [
      {
        q: 'How do I report a bug or issue?',
        a: 'Use the Contact page or email ragskrpreddy@gmail.com with a description of the issue, the game affected, and your device/browser info.'
      },
      {
        q: 'Can I suggest a new game?',
        a: 'Absolutely! We welcome game ideas, feature requests, and general feedback through the Contact page.'
      },
      {
        q: 'How quickly do you respond to messages?',
        a: 'We aim to respond to all inquiries within 48 hours. Bug reports related to broken gameplay are prioritized.'
      },
    ]
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_SECTIONS.flatMap(section =>
      section.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        }
      }))
    )
  };

  return (
    <div className="page-container animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: 13,
              fontWeight: 600,
              color: '#888',
              marginBottom: 16,
            }}
          >
            <HelpCircle size={16} /> Help Center
          </div>
          <h1 className="hero-title" style={{ fontSize: 48 }}>
            Frequently Asked <span>Questions</span>
          </h1>
          <p className="hero-desc" style={{ maxWidth: 640, margin: '0 auto' }}>
            Everything you need to know about VIBEMENOW — from gameplay mechanics to privacy and advertising.
          </p>
        </div>

        {FAQ_SECTIONS.map((section, si) => (
          <section key={si} style={{ marginBottom: 48 }}>
            <h2
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 22,
                fontWeight: 800,
                color: section.color,
                marginBottom: 20,
              }}
            >
              {section.icon} {section.title}
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {section.faqs.map((faq, fi) => (
                <div
                  key={fi}
                  className="card"
                  style={{
                    padding: '24px 28px',
                    borderLeft: `3px solid ${section.color}`,
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0f0', marginBottom: 8 }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: 14, color: '#999', lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div
          style={{
            textAlign: 'center',
            padding: 40,
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(255,45,120,0.05), rgba(0,212,255,0.05))',
            border: '1px solid rgba(255,255,255,0.08)',
            marginTop: 32,
          }}
        >
          <h3 style={{ marginBottom: 12, color: '#fff' }}>Still have questions?</h3>
          <p style={{ color: '#888', marginBottom: 24 }}>
            We are happy to help. Reach out and we will get back to you within 48 hours.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '12px 32px' }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
