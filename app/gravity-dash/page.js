import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import GravityClient from './GravityClient';
import AdGateway from '../components/AdGateway';

export const metadata = {
  title: 'Neon Strike - Space Combat Arcade Game | VIBEMENOW',
  description: 'Play Neon Strike, a high-octane deep space combat game. No download or login required. Pilot your ship through the neon void and survive the swarm.',
  keywords: ['Neon Strike game', 'space combat browser game', 'free arcade game no login', 'neon space shooter', 'instant play web game'],
  alternates: {
    canonical: 'https://vibemenow.uk/gravity-dash',
  },
  openGraph: {
    title: 'Neon Strike - Space Combat Arcade Game | VIBEMENOW',
    description: 'Pilot your ship through the neon void and survive the swarm in this high-octane space combat game.',
    url: 'https://vibemenow.uk/gravity-dash',
    type: 'website',
    images: [{
      url: 'https://vibemenow.uk/og/neon-strike.png',
      width: 1200,
      height: 630,
      alt: 'Neon Strike space combat game'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neon Strike Arcade Game | VIBEMENOW',
    description: 'High-octane deep space combat. Play instantly without login.',
    images: ['https://vibemenow.uk/og/neon-strike.png'],
  },
};

const gameSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Neon Strike",
  "operatingSystem": "Web Browser",
  "applicationCategory": "GameApplication",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250"
  },
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "VIBEMENOW"
  }
};


export default function GravityDashPage() {
  return (
    <div className="page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
      />
      <div style={{ textAlign: 'center', marginBottom: 24 }}>

        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#00d4ff', marginBottom: 8, marginTop: 32, textShadow: '0 0 20px #00d4ff' }}>
          NEON STRIKE
        </h1>
        <p style={{ color: '#888', fontSize: 18 }}>Pilot your ship through the neon void. Survive the swarm.</p>
      </div>

      <AdGateway gameName="Neon Strike">
        <GravityClient />
      </AdGateway>

      <article
        className="seo-guide"
        style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}
      >
        <h2 style={{ color: '#00d4ff', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>
          Mastering Neon Strike
        </h2>

        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(0, 212, 255, 0.03)', borderColor: 'rgba(0, 212, 255, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>Flight Manual</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>🚀 Movement:</strong> Use <strong>WASD</strong> or <strong>Arrow Keys</strong> to pilot your ship in any direction.</li>
            <li style={{ marginBottom: '12px' }}><strong>🔥 Weapons:</strong> Press <strong>Space</strong> or <strong>Z</strong> to fire your primary laser.</li>
            <li style={{ marginBottom: '12px' }}><strong>💎 Upgrades:</strong> Collect neon orbs to activate <strong>Triple Shot</strong>, <strong>Rapid Fire</strong>, or <strong>Energy Shields</strong>.</li>
            <li style={{ marginBottom: '12px' }}><strong>👾 Survival:</strong> Drones get faster and tougher as your score increases. Stay mobile!</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>The Cognitive Demands of Endless Space Combat</h3>
        <p style={{ marginBottom: '24px' }}>
          Neon Strike is built on a high-performance physics engine designed to push your <strong>spatial awareness</strong> and <strong>dynamic visual acuity</strong> to their limits. Unlike static arcade shooters where enemies follow predictable, hardcoded paths, the procedural generation in Neon Strike means no two flights are ever the same. 
        </p>
        <p style={{ marginBottom: '24px' }}>
          To survive the swarm, players must constantly calculate trajectory vectors. When an enemy drone appears on the edge of your screen, your brain has milliseconds to calculate its speed, its angle, and the necessary counter-movement required to dodge it while simultaneously aiming your primary laser. This rapid calculation engages the parietal lobe, the area of the brain responsible for processing spatial relationships.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Strategic Upgrades and Resource Management</h3>
        <p style={{ marginBottom: '24px' }}>
          Success in the deep void requires more than just fast reflexes; it demands split-second resource management. You must prioritize the right power-ups under extreme duress. 
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '24px' }}>
          <li style={{ marginBottom: '12px' }}>The <strong>Energy Shield</strong> provides temporary invulnerability, allowing for aggressive ramming tactics.</li>
          <li style={{ marginBottom: '12px' }}>The <strong>Triple Shot</strong> allows you to clear wide paths through the swarm, but requires you to position yourself centrally to maximize the spread.</li>
          <li style={{ marginBottom: '12px' }}>The <strong>Rapid Fire</strong> upgrade demands tracking precision, as missing your target leaves you vulnerable during the brief cooldowns.</li>
        </ul>
        <p style={{ marginBottom: '24px' }}>
          Choosing to dive into a dense cluster of enemies to secure an Energy Shield is a high-risk, high-reward decision. Cognitive psychologists refer to this as <em>decision-making under time pressure</em>, a skill that translates heavily into real-world crisis management.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px', marginTop: '40px' }}>Related Editorial Content</h3>
        <p style={{ marginBottom: '24px' }}>
          Interested in the psychology behind why fast-paced games are so addictive? Dive into our related articles:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <a href="/blog/cognitive-science-reaction-times" style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
            <strong style={{ display: 'block', color: '#00d4ff', marginBottom: '4px' }}>The Cognitive Science of Reaction Times in Gaming</strong>
            <span style={{ fontSize: '0.9em', color: '#aaa' }}>How visual stimuli are processed, and the difference between pure reaction and anticipation.</span>
          </a>
          <a href="/blog/psychology-of-flow" style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
            <strong style={{ display: 'block', color: '#00d4ff', marginBottom: '4px' }}>In the Stream: Understanding Flow States</strong>
            <span style={{ fontSize: '0.9em', color: '#aaa' }}>How games like Neon Strike lock your brain into the optimal zone of focus and challenge.</span>
          </a>
        </div>
      </article>

    </div>
  );
}
