import FaqSchema from './FaqSchema';

export default function GameSeoArticle({
  title,
  subtitle,
  historyText,
  psychologyText,
  strategyText,
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

      <h2 style={{ color: '#00d4ff', fontSize: '2.5em', marginBottom: '8px', fontWeight: 900 }}>
        The Comprehensive Guide to {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: '1.2em', color: '#888', marginBottom: '32px' }}>
          {subtitle}
        </p>
      )}

      {historyText && (
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>
            Origins and Evolution
          </h3>
          <p style={{ fontSize: '1.05em' }}>{historyText}</p>
        </section>
      )}

      {psychologyText && (
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
            The Psychology Behind the Mechanics
          </h3>
          <p style={{ fontSize: '1.05em', margin: 0 }}>{psychologyText}</p>
        </section>
      )}

      {strategyText && (
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>
            Mastery and Strategy
          </h3>
          <p style={{ fontSize: '1.05em' }}>{strategyText}</p>
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
