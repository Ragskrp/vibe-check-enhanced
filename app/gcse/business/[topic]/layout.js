import { getAllTopicSlugs, getTopicBySlug } from '../businessData';

export async function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ topic: slug }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const config = getTopicBySlug(topic);
  if (!config) return {};

  return {
    title: `${config.title} - GCSE Business Revision | VIBEMENOW`,
    description: `${config.description} Free interactive practice for GCSE Business students following the AQA specification.`,
  };
}

export default function BusinessTopicLayout({ children }) {
  return children;
}
