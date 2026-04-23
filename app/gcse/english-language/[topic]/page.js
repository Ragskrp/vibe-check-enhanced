'use client';

import { use } from 'react';
import { TOPICS } from '../englishLanguageData';
import TopicGame from '../../components/TopicGame';
import { notFound } from 'next/navigation';

export default function EnglishLanguageTopicPage({ params }) {
  const { topic } = use(params);
  const config = TOPICS[topic];
  if (!config) notFound();

  return <TopicGame config={config} />;
}
