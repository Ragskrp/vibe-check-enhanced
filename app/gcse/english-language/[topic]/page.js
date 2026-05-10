import { getAllTopicSlugs, TOPICS } from '../englishLanguageData';
import TopicClientWrapper from '../../components/TopicClientWrapper';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { topic: topicSlug } = await params;
  const topic = TOPICS[topicSlug];
  
  if (!topic) return { title: 'Topic Not Found | VIBEMENOW' };
  
  return {
    title: `${topic.title} — GCSE English Language Revision | VIBEMENOW`,
    description: `Master ${topic.title} with interactive games and flashcards. AQA/Edexcel curriculum-aligned practice.`,
    alternates: {
      canonical: `https://vibemenow.uk/gcse/english-language/${topicSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  return slugs.map(slug => ({
    topic: slug,
  }));
}

export default async function EnglishLanguageTopicPage({ params }) {
  const { topic: topicSlug } = await params;
  const config = TOPICS[topicSlug];
  
  if (!config) notFound();

  return <TopicClientWrapper subject="english-language" topicSlug={topicSlug} />;
}
