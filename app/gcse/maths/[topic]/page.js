import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import path from 'path';
import TopicShell from './TopicShell';

// Build-time: generate static params for known topics
export async function generateStaticParams() {
  return ['bidmas', 'fractions'].map((slug) => ({ topic: slug }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  return {
    title: `${topic.replace(/-/g, ' ')} — Maths | Fleurir GCSE`,
  };
}

function loadTopicData(slug) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'gcse', 'maths', 'data', `${slug}.json`);
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default async function TopicPage({ params }) {
  const { topic } = await params;
  const data = loadTopicData(topic);

  if (!data) notFound();

  return <TopicShell levelData={data} />;
}
