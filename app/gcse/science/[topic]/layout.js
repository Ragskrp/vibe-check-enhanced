import { getTopicBySlug, getAllTopicSlugs } from '../scienceData';

export async function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ topic: slug }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const config = getTopicBySlug(topic);
  if (!config) return {};
  return {
    title: `${config.title} — GCSE Science Revision | VIBEMENOW`,
    description: `${config.description} Free interactive practice for GCSE Science students — Foundation & Higher tiers.`,
  };
}

export default function ScienceTopicLayout({ children }) {
  return children;
}
