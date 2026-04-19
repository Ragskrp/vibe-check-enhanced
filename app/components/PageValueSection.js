'use client';

export default function PageValueSection({ title, summary, points = [], checklist = [] }) {
  return (
    <section
      style={{
        marginTop: 40,
        padding: '24px',
        borderRadius: 18,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <h2 style={{ color: '#f3f3f3', fontSize: 'clamp(20px, 4vw, 28px)', marginBottom: 10, fontWeight: 900 }}>
        {title}
      </h2>
      <p style={{ color: '#b9b9b9', fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>{summary}</p>

      {points.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: checklist.length ? 18 : 0 }}>
          {points.map((point) => (
            <div
              key={point.label}
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.015)',
              }}
            >
              <div style={{ color: '#f3f3f3', fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{point.label}</div>
              <p style={{ color: '#9d9d9d', fontSize: 12, lineHeight: 1.6, margin: 0 }}>{point.text}</p>
            </div>
          ))}
        </div>
      )}

      {checklist.length > 0 && (
        <>
          <div style={{ color: '#f3f3f3', fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Quick usage checklist</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#bdbdbd', fontSize: 13, lineHeight: 1.7 }}>
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
