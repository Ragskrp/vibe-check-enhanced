import { getTopicBySlug, getAllTopicSlugs } from '../topicData';
import TopicClientWrapper from '../../components/TopicClientWrapper';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  
  if (!topic) return { title: 'Topic Not Found | VIBEMENOW' };
  
  return {
    title: `${topic.title} — GCSE Maths Revision | VIBEMENOW`,
    description: `Master ${topic.title} with interactive games and flashcards. GCSE Maths curriculum-aligned practice.`,
    alternates: {
      canonical: `https://vibemenow.uk/gcse/maths/${topicSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  return slugs.map(slug => ({
    topic: slug,
  }));
}

export default async function MathsTopicPage({ params }) {
  const { topic: topicSlug } = await params;
  const config = getTopicBySlug(topicSlug);
  
  if (!config) notFound();

  const foundationLessons = config.lessons?.foundation || [];
  const higherLessons = config.lessons?.higher || [];

  return (
    <>
      <TopicClientWrapper subject="maths" topicSlug={topicSlug} />
      <article
        aria-labelledby="maths-topic-overview"
        style={{
          maxWidth: 920,
          margin: '56px auto',
          padding: '0 20px 40px',
          color: '#e8eef5',
          lineHeight: 1.7,
        }}
      >
        <p style={{ color: config.color || '#00d4ff', fontWeight: 800, textTransform: 'uppercase', fontSize: 13 }}>
          GCSE Maths Revision Guide
        </p>
        <h2 id="maths-topic-overview" style={{ color: '#fff', fontSize: 32, lineHeight: 1.2, marginBottom: 16 }}>
          {config.title}
        </h2>
        <p style={{ color: '#b8c2cc', fontSize: 18, marginBottom: 28 }}>
          {config.description} This free GCSE Maths module combines short explanations, worked examples,
          flashcard-style recall, and timed practice so students can revise the topic without creating an account.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <section>
            <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 14 }}>Foundation Skills</h3>
            {foundationLessons.map((lesson) => (
              <div key={`foundation-${lesson.title}`} style={{ marginBottom: 18 }}>
                <h4 style={{ color: '#fff', fontSize: 17, marginBottom: 6 }}>{lesson.title}</h4>
                <p style={{ color: '#b8c2cc', margin: 0 }}>{lesson.content}</p>
                {lesson.formula && <p style={{ color: '#d9f7ff', margin: '6px 0 0' }}>Formula: {lesson.formula}</p>}
                {lesson.example && <p style={{ color: '#9daab6', margin: '6px 0 0' }}>Example: {lesson.example}</p>}
              </div>
            ))}
          </section>

          <section>
            <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 14 }}>Higher Skills</h3>
            {higherLessons.map((lesson) => (
              <div key={`higher-${lesson.title}`} style={{ marginBottom: 18 }}>
                <h4 style={{ color: '#fff', fontSize: 17, marginBottom: 6 }}>{lesson.title}</h4>
                <p style={{ color: '#b8c2cc', margin: 0 }}>{lesson.content}</p>
                {lesson.formula && <p style={{ color: '#d9f7ff', margin: '6px 0 0' }}>Formula: {lesson.formula}</p>}
                {lesson.example && <p style={{ color: '#9daab6', margin: '6px 0 0' }}>Example: {lesson.example}</p>}
              </div>
            ))}
          </section>
        </div>

        {config.hacks?.length > 0 && (
          <section style={{ marginTop: 22 }}>
            <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 14 }}>Exam Tips</h3>
            {config.hacks.map((hack) => (
              <p key={hack.title} style={{ color: '#b8c2cc', marginBottom: 10 }}>
                <strong style={{ color: '#fff' }}>{hack.title}:</strong> {hack.content}
              </p>
            ))}
          </section>
        )}
      </article>
    </>
  );
}
