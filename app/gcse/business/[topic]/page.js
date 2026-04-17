'use client';

import { use } from 'react';
import { getTopicBySlug } from '../businessData';
import TopicGame from '../../components/TopicGame';
import { notFound } from 'next/navigation';

export default function BusinessTopicPage({ params }) {
  const { topic } = use(params);
  const config = getTopicBySlug(topic);
  if (!config) notFound();

  return <TopicGame config={config} />;
}
