import { getTopicData, getAllTopicSlugs } from '../computerScienceData';

export async function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ topic: slug }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const config = getTopicData(topic);
  if (!config) return {};
  return {
    title: `${config.title} — GCSE Computer Science Revision | VIBEMENOW`,
    description: `${config.description} Free interactive practice for GCSE Computer Science students — OCR specification.`,
  };
}

export default function ComputerScienceTopicLayout({ children }) {
  return children;
}
