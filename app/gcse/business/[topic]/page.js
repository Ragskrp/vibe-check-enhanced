import { getTopicBySlug, getAllTopicSlugs } from '../businessData';
import TopicClientWrapper from '../../components/TopicClientWrapper';

export async function generateMetadata({ params }) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  
  if (!topic) return { title: 'Topic Not Found | VIBEMENOW' };
  
  return {
    title: `${topic.title} — GCSE Business Revision | VIBEMENOW`,
    description: `Master ${topic.title} with interactive games and flashcards. Edexcel/AQA curriculum-aligned practice.`,
    alternates: {
      canonical: `https://vibemenow.uk/gcse/business/${topicSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  return slugs.map(slug => ({
    topic: slug,
  }));
}

export default async function BusinessTopicPage({ params }) {
  const { topic: topicSlug } = await params;
  
  return <TopicClientWrapper subject="business" topicSlug={topicSlug} />;
}
