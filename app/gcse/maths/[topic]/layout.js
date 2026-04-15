import { getTopicBySlug, getAllTopicSlugs } from '../topicData';

export async function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ topic: slug }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const config = getTopicBySlug(topic);
  if (!config) return {};
  return {
    title: `${config.title} — GCSE Maths Revision | VIBEMENOW`,
    description: `${config.description} Free interactive practice for GCSE Maths students — Foundation & Higher tiers.`,
  };
}

export default function TopicLayout({ children }) {
  return children;
}
