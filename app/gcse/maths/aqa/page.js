import { generateCourseSchema, generateFAQSchema, SUBJECT_FAQS } from '../../utils/structuredData';
import Link from 'next/link';

export const metadata = {
  title: 'AQA GCSE Maths Revision — Free Practice | VIBEMENOW',
  description: 'Free AQA GCSE Maths revision (8300). Algebra, geometry, number, statistics — no login required. Spaced repetition, flashcards, and interactive tools for Year 10 & 11.',
  keywords: 'AQA GCSE Maths revision, AQA 8300 practice, free GCSE maths no login, AQA maths flashcards, GCSE algebra revision',
  alternates: { canonical: 'https://vibemenow.uk/gcse/maths/aqa' },
  openGraph: {
    title: 'AQA GCSE Maths Revision — Free | VIBEMENOW',
    description: 'Interactive GCSE Maths revision aligned to AQA 8300. Flashcards, spaced repetition, and visual tools. 100% free.',
    url: 'https://vibemenow.uk/gcse/maths/aqa',
  },
};

const TOPICS = [
  { slug: 'algebra', title: 'Algebra', desc: 'Expressions, equations, and quadratics. AQA Paper 1 & 2 core.' },
  { slug: 'number', title: 'Number', desc: 'Primes, HCF/LCM, standard form, surds, and indices.' },
  { slug: 'geometry', title: 'Geometry & Measures', desc: 'Angles, Pythagoras, trigonometry, circles, and transformations.' },
  { slug: 'statistics', title: 'Statistics & Probability', desc: 'Averages, histograms, cumulative frequency, tree diagrams.' },
  { slug: 'ratio', title: 'Ratio & Proportion', desc: 'Direct and inverse proportion, percentage change, interest.' },
];

const courseSchema = generateCourseSchema({
  name: 'AQA GCSE Maths Revision',
  description: 'Interactive revision for AQA GCSE Mathematics (8300). Covers all topic areas across Foundation and Higher tiers. Free, no login.',
  url: 'https://vibemenow.uk/gcse/maths/aqa',
  subject: 'Maths',
});

const faqSchema = generateFAQSchema(SUBJECT_FAQS.maths);

export default function AQAMathsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

        {/* HERO */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(60px,8vw,120px) clamp(20px,5vw,60px) 60px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#00e5a0', marginBottom: 16 }}>
            AQA 8300 — GCSE Mathematics
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
            AQA GCSE Maths{' '}
            <span style={{ fontWeight: 800, background: 'linear-gradient(135deg, #fff 40%, rgba(0,229,160,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Revision
            </span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 560, marginBottom: 40 }}>
            Free, curriculum-aligned revision for AQA GCSE Maths (specification 8300).
            Flashcards, spaced repetition, interactive tools — <strong style={{ color: '#fff' }}>no login required</strong>.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/gcse/maths">
              <button style={{ padding: '14px 32px', borderRadius: 8, background: '#00e5a0', color: '#000', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: 15 }}>
                Start Revision →
              </button>
            </Link>
            <Link href="/gcse/dashboard">
              <button style={{ padding: '14px 32px', borderRadius: 8, background: 'transparent', color: 'rgba(255,255,255,0.6)', fontWeight: 700, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontSize: 15 }}>
                Track Progress
              </button>
            </Link>
          </div>
        </section>

        {/* TOPIC LIST */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 80px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 32 }}>
            AQA Maths <span style={{ fontWeight: 800 }}>Topic Areas</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {TOPICS.map(t => (
              <Link key={t.slug} href={`/gcse/maths/${t.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,229,160,0.15)', transition: 'border-color 0.2s' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{t.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
                  <div style={{ marginTop: 16, fontSize: 12, color: '#00e5a0', fontWeight: 700 }}>Start practice →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ABOUT AQA SPEC */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 80px' }}>
          <div style={{ padding: '40px', borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20 }}>About the AQA GCSE Maths Specification</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 16 }}>
              AQA GCSE Mathematics (specification code 8300) is assessed across three papers: one non-calculator (Paper 1) and two calculator papers (Papers 2 and 3), each worth 80 marks. The full qualification is 240 marks total.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 16 }}>
              Both Foundation Tier (Grades 1–5) and Higher Tier (Grades 4–9) are available. VIBEMENOW revision tools cover both tiers and are tagged accordingly so you practice at the right level.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
              Key themes assessed by AQA include: fluency in number and algebra, reasoning and problem-solving in geometry, and data handling and probability. Our spaced repetition system ensures you cover all areas before your exam.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 100px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 32 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SUBJECT_FAQS.maths.map(({ q, a }) => (
              <div key={q} style={{ padding: '20px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{q}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
