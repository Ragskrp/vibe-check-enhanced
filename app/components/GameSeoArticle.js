import FaqSchema from './FaqSchema';
import Link from 'next/link';

export default function GameSeoArticle({
  title,
  howToPlay,
  strategy,
  cognitiveSkill,
  gameFacts,
  relatedGames,
  faqs,
}) {
  return (
    <article
      className="seo-guide"
      style={{
        maxWidth: '800px',
        margin: '64px auto',
        padding: '0 20px',
        color: '#ccc',
        lineHeight: '1.8',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <FaqSchema faqs={faqs} />

      <h2 style={{ color: '#00d4ff', fontSize: '2.5em', marginBottom: '32px', fontWeight: 900 }}>
        The Comprehensive Guide to {title}
      </h2>

      {howToPlay && (
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>
            How to Play
          </h3>
          <p style={{ fontSize: '1.05em', whiteSpace: 'pre-wrap' }}>{howToPlay}</p>
        </section>
      )}

      {strategy && (
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>
            Strategy & Tips
          </h3>
          <p style={{ fontSize: '1.05em' }}>{strategy}</p>
        </section>
      )}

      {cognitiveSkill && (
        <section
          style={{
            padding: '32px',
            marginBottom: '40px',
            background: 'rgba(0, 212, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 212, 255, 0.1)',
          }}
        >
          <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>
            The Cognitive Skill This Game Trains
          </h3>
          <p style={{ fontSize: '1.05em', margin: 0 }}>{cognitiveSkill}</p>
        </section>
      )}

      {gameFacts && (
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>
            Game Facts & Variants
          </h3>
          <p style={{ fontSize: '1.05em' }}>{gameFacts}</p>
        </section>
      )}

      {relatedGames && relatedGames.length > 0 && (
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>
            Related Games on VIBEMENOW
          </h3>
          <ul style={{ display: 'flex', gap: '16px', listStyle: 'none', padding: 0 }}>
            {relatedGames.map((game, i) => {
              const slug = '/' + game.toLowerCase().replace(/ /g, '-').replace(/'/g, '');
              return (
                <li key={i}>
                  <Link href={slug} style={{ color: '#00ff94', textDecoration: 'underline', fontSize: '1.1em' }}>
                    {game}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '24px' }}>
            Frequently Asked Questions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                <h4 style={{ color: '#00d4ff', fontSize: '1.2em', marginBottom: '8px', fontWeight: 600 }}>
                  {faq.question}
                </h4>
                <p style={{ margin: 0, fontSize: '1.05em', color: '#bdbdbd' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
