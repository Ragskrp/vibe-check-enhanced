import { getTopicsByCategory } from '../historyData';
import TopicGame from '../../components/TopicGame';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const topicsByCategory = getTopicsByCategory();
  const allTopics = Object.values(topicsByCategory).flat();
  const topic = allTopics.find(t => t.slug === params.topicSlug);
  
  if (!topic) return { title: 'Topic Not Found | VIBEMENOW' };
  
  return {
    title: `${topic.title} — GCSE History Revision | VIBEMENOW`,
    description: `Free interactive revision for ${topic.title}. Flashcards, quizzes, and spaced repetition.`,
  };
}

export async function generateStaticParams() {
  const topicsByCategory = getTopicsByCategory();
  const allTopics = Object.values(topicsByCategory).flat();
  return allTopics.map(t => ({
    topicSlug: t.slug,
  }));
}

export default function HistoryTopicPage({ params }) {
  const topicsByCategory = getTopicsByCategory();
  const allTopics = Object.values(topicsByCategory).flat();
  const topic = allTopics.find(t => t.slug === params.topicSlug);

  if (!topic) {
    notFound();
  }

  // Find category for styling context
  const category = Object.keys(topicsByCategory).find(cat => 
    topicsByCategory[cat].some(t => t.slug === params.topicSlug)
  );

  return (
    <TopicGame 
      topic={topic} 
      subjectName="History" 
      subjectSlug="history" 
      accentColor={topic.color || '#ff6b35'}
      categoryName={category}
    />
  );
}
