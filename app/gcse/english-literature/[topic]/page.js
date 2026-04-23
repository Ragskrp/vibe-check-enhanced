'use client';

import { use } from 'react';
import { TOPICS } from '../englishLiteratureData';
import TopicGame from '../../components/TopicGame';
import { notFound } from 'next/navigation';

export default function EnglishLiteratureTopicPage({ params }) {
  const { topic } = use(params);
  const config = TOPICS[topic];
  if (!config) notFound();

  return <TopicGame config={config} />;
}
