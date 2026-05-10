import { getTopicBySlug, getAllTopicSlugs } from '../scienceData';
import TopicGame from '../../components/TopicGame';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  
  if (!topic) return { title: 'Topic Not Found | VIBEMENOW' };
  
  return {
    title: `${topic.title} — GCSE Science Revision | VIBEMENOW`,
    description: `Master ${topic.title} with interactive games and flashcards. GCSE Biology, Chemistry, or Physics curriculum-aligned practice.`,
    alternates: {
      canonical: `https://vibemenow.uk/gcse/science/${topicSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  return slugs.map(slug => ({
    topic: slug,
  }));
}

export default async function ScienceTopicPage({ params }) {
  const { topic: topicSlug } = await params;
  const config = getTopicBySlug(topicSlug);
  
  if (!config) notFound();

  return <TopicGame config={config} />;
}
