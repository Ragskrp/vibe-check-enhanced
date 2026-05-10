import { getTopicBySlug, getAllTopicSlugs } from '../computerScienceData';
import TopicClientWrapper from '../../components/TopicClientWrapper';

export async function generateMetadata({ params }) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  
  if (!topic) return { title: 'Topic Not Found | VIBEMENOW' };
  
  return {
    title: `${topic.title} — GCSE Computer Science Revision | VIBEMENOW`,
    description: `Master ${topic.title} with interactive games and flashcards. OCR J277 curriculum-aligned practice.`,
    alternates: {
      canonical: `https://vibemenow.uk/gcse/computer-science/${topicSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  return slugs.map(slug => ({
    topic: slug,
  }));
}

export default async function ComputerScienceTopicPage({ params }) {
  const { topic: topicSlug } = await params;
  
  return <TopicClientWrapper subject="computer-science" topicSlug={topicSlug} />;
}
