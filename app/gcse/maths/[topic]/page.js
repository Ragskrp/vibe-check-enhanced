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

  return <TopicClientWrapper subject="maths" topicSlug={topicSlug} initialConfig={config} />;
}
