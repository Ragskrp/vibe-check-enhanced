import { generateCourseSchema, generateFAQSchema, SUBJECT_FAQS } from '../../utils/structuredData';
import Link from 'next/link';

export const metadata = {
  title: 'OCR GCSE Computer Science Revision — Free Practice | VIBEMENOW',
  description: 'Free OCR GCSE Computer Science revision (J277). Logic gates, algorithms, binary, networking — interactive simulators, flashcards, and spaced repetition. No login.',
  keywords: 'OCR GCSE Computer Science revision, OCR J277 practice, free GCSE CS revision, logic gate simulator, binary conversion GCSE',
  alternates: { canonical: 'https://vibemenow.uk/gcse/computer-science/ocr' },
  openGraph: {
    title: 'OCR GCSE Computer Science — Free Revision | VIBEMENOW',
    description: 'Interactive revision for OCR J277 GCSE CS. Logic simulators, flashcards, algorithm tools. 100% free, no login.',
    url: 'https://vibemenow.uk/gcse/computer-science/ocr',
  },
};

const COMPONENTS = [
  { slug: 'systems-architecture', title: '1.1 Systems Architecture', desc: 'CPU, fetch-execute cycle, von Neumann, embedded systems.' },
  { slug: 'memory', title: '1.2 Memory & Storage', desc: 'RAM, ROM, cache, secondary storage, units of measurement.' },
  { slug: 'networking', title: '1.3 Computer Networks', desc: 'LAN/WAN, topologies, protocols, TCP/IP, the Internet.' },
  { slug: 'network-security', title: '1.4 Network Security', desc: 'Cyber threats, malware types, social engineering, prevention.' },
  { slug: 'data-representation', title: '1.5 Data Representation', desc: 'Binary, denary, hex conversion, ASCII, Unicode, images, sound.' },
  { slug: 'algorithms', title: '2.1 Algorithms', desc: 'Searching, sorting, Big O notation, flowcharts, pseudocode.' },
  { slug: 'programming', title: '2.2 Programming', desc: 'Variables, loops, selection, subroutines, data structures.' },
  { slug: 'logic', title: '2.3 Boolean Logic', desc: 'AND, OR, NOT, XOR gates, truth tables, logic circuits.' },
];

const courseSchema = generateCourseSchema({
  name: 'OCR GCSE Computer Science Revision',
  description: 'Interactive revision for OCR GCSE Computer Science (J277). Covers all 8 topic areas from systems architecture to Boolean logic. Free, no login.',
  url: 'https://vibemenow.uk/gcse/computer-science/ocr',
  subject: 'Computer Science',
});

const faqSchema = generateFAQSchema(SUBJECT_FAQS.computerScience);

export default function OCRCSPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

        {/* HERO */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(60px,8vw,120px) clamp(20px,5vw,60px) 60px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ff2d78', marginBottom: 16 }}>
            OCR J277 — GCSE Computer Science
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
            OCR GCSE CS{' '}
            <span style={{ fontWeight: 800, background: 'linear-gradient(135deg, #fff 40%, rgba(255,45,120,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Revision
            </span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 560, marginBottom: 40 }}>
            Free, interactive revision for OCR GCSE Computer Science (J277). Logic gate simulators,
            binary converters, algorithm tools — <strong style={{ color: '#fff' }}>no login required</strong>.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/gcse/computer-science">
              <button style={{ padding: '14px 32px', borderRadius: 8, background: '#ff2d78', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: 15 }}>
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

        {/* COMPONENT LIST */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 80px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 32 }}>
            J277 <span style={{ fontWeight: 800 }}>Topic Components</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {COMPONENTS.map(t => (
              <Link key={t.slug} href={`/gcse/computer-science/${t.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,45,120,0.15)', transition: 'border-color 0.2s' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{t.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
                  <div style={{ marginTop: 16, fontSize: 12, color: '#ff2d78', fontWeight: 700 }}>Practice now →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ABOUT OCR J277 */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 80px' }}>
          <div style={{ padding: '40px', borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20 }}>About the OCR J277 Specification</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 16 }}>
              OCR GCSE Computer Science (J277) is assessed via two papers. Component 01 (Computer Systems) covers hardware, networking, security, and data representation. Component 02 (Computational Thinking, Algorithms and Programming) covers algorithms, programming concepts, and Boolean logic.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 16 }}>
              Both components are worth 50% of the total grade. There is also an optional Programming Project (J277/03 or J277/04) which is non-exam assessment. VIBEMENOW focuses on the two written papers.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
              The interactive tools on VIBEMENOW — including the XOR gate simulator, binary converter, and sorting algorithm visualizer — are designed specifically for the practical, applied questions in Component 02.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,60px) 100px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 32 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SUBJECT_FAQS.computerScience.map(({ q, a }) => (
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
