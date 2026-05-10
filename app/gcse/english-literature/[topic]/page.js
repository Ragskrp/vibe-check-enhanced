import { getAllTopicSlugs, TOPICS } from '../englishLiteratureData';
import TopicGame from '../../components/TopicGame';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { topic: topicSlug } = await params;
  const topic = TOPICS[topicSlug];
  
  if (!topic) return { title: 'Topic Not Found | VIBEMENOW' };
  
  return {
    title: `${topic.title} — GCSE English Literature Revision | VIBEMENOW`,
    description: `Master ${topic.title} with interactive games and flashcards. AQA/Edexcel curriculum-aligned practice.`,
    alternates: {
      canonical: `https://vibemenow.uk/gcse/english-literature/${topicSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  return slugs.map(slug => ({
    topic: slug,
  }));
}

export default async function EnglishLiteratureTopicPage({ params }) {
  const { topic: topicSlug } = await params;
  const config = TOPICS[topicSlug];
  
  if (!config) notFound();

  return <TopicGame config={config} />;
}
