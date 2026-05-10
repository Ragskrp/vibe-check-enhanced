import { generateCourseSchema, generateFAQSchema, SUBJECT_FAQS } from '../../utils/structuredData';
import Link from 'next/link';

export const metadata = {
  title: 'AQA GCSE Science Revision — Free Practice | VIBEMENOW',
  description: 'Free AQA GCSE Science revision (Combined 8464 & Triple 8461/8462/8463). Biology, Chemistry, Physics — interactive tools, flashcards, spaced repetition. No login needed.',
  keywords: 'AQA GCSE Science revision, AQA Combined Science free, AQA Biology Chemistry Physics, GCSE science flashcards, free GCSE science no login',
  alternates: { canonical: 'https://vibemenow.uk/gcse/science/aqa' },
  openGraph: {
    title: 'AQA GCSE Science Revision — Free | VIBEMENOW',
    description: 'Interactive GCSE Science revision aligned to AQA Combined & Triple specs. 100% free, no login.',
    url: 'https://vibemenow.uk/gcse/science/aqa',
  },
};

const TOPICS = [
  { slug: 'cells', title: 'Biology: Cell Biology', desc: 'Cell structure, microscopy, cell division, transport in cells.', color: '#00e5a0' },
  { slug: 'organisation', title: 'Biology: Organisation', desc: 'Digestive system, heart, blood vessels, lungs, plants.', color: '#00e5a0' },
  { slug: 'infection', title: 'Biology: Infection & Response', desc: 'Pathogens, immune system, vaccination, drugs.', color: '#00e5a0' },
  { slug: 'atomic-structure', title: 'Chemistry: Atomic Structure', desc: 'Atoms, elements, compounds, isotopes, electron configuration.', color: '#00d4ff' },
  { slug: 'bonding', title: 'Chemistry: Bonding', desc: 'Ionic, covalent, metallic bonding and structure.', color: '#00d4ff' },
  { slug: 'forces', title: 'Physics: Forces', desc: 'Newton\'s laws, resultant forces, momentum, work and energy.', color: '#ffe600' },
  { slug: 'waves', title: 'Physics: Waves', desc: 'Transverse and longitudinal, EM spectrum, reflection, refraction.', color: '#ffe600' },
  { slug: 'electricity', title: 'Physics: Electricity', desc: 'Circuit symbols, resistance, V=IR, series and parallel circuits.', color: '#ffe600' },
];

const courseSchema = generateCourseSchema({
  name: 'AQA GCSE Science Revision',
  description: 'Interactive revision for AQA GCSE Combined Science (8464) and Triple Science (8461/8462/8463). Covers Biology, Chemistry, and Physics. Free, no login.',
  url: 'https://vibemenow.uk/gcse/science/aqa',
  subject: 'Science',
});

const faqSchema = generateFAQSchema(SUBJECT_FAQS.science);

export default function AQASciencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

        {/* HERO */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(60px,8vw,120px) clamp(20px,5vw,60px) 60px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#00e5a0', marginBottom: 16 }}>
            AQA 8464 / 8461–8463 — GCSE Science
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
            AQA GCSE Science{' '}
            <span style={{ fontWeight: 800, background: 'linear-gradient(135deg, #fff 40%, rgba(0,229,160,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Revision
            </span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 580, marginBottom: 40 }}>
            Free, curriculum-aligned revision for AQA GCSE Combined Science and Triple Award.
            Circuit builders, biology organelle matching, chemistry true/false —{' '}
            <strong style={{ color: '#fff' }}>no login required</strong>.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/gcse/science">
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

        {/* SUBJECT TABS */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 80px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 32 }}>
            AQA Science <span style={{ fontWeight: 800 }}>Topic Areas</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {TOPICS.map(t => (
              <Link key={t.slug} href={`/gcse/science/${t.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.color}20`, transition: 'border-color 0.2s' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{t.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
                  <div style={{ marginTop: 16, fontSize: 12, color: t.color, fontWeight: 700 }}>Practice now →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SPEC OVERVIEW */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 80px' }}>
          <div style={{ padding: '40px', borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20 }}>About the AQA Science Specifications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
              {[
                { label: 'AQA Combined Science: Trilogy (8464)', color: '#00e5a0', desc: 'Two GCSEs in one — Biology, Chemistry, and Physics topics assessed over six papers (two per science). Foundation or Higher tier.' },
                { label: 'AQA Biology (8461)', color: '#00e5a0', desc: 'Eight topic areas from Cell Biology through to Ecology. Assessed via two 1h45m papers.' },
                { label: 'AQA Chemistry (8462)', color: '#00d4ff', desc: 'Eight topic areas from Atomic Structure to Organic Chemistry. Two 1h45m papers, both calculator.' },
                { label: 'AQA Physics (8463)', color: '#ffe600', desc: 'Eight topic areas from Forces to Space Physics. Two 1h45m papers. Equations must be memorised.' },
              ].map(({ label, color, desc }) => (
                <div key={label} style={{ borderLeft: `2px solid ${color}`, paddingLeft: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color, marginBottom: 8 }}>{label}</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 100px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 32 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SUBJECT_FAQS.science.map(({ q, a }) => (
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
