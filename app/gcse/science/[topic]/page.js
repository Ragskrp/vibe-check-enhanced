'use client';

import { use } from 'react';
import { getTopicBySlug } from '../scienceData';
import TopicGame from '../../components/TopicGame';
import { notFound } from 'next/navigation';

export default function ScienceTopicPage({ params }) {
  const { topic } = use(params);
  const config = getTopicBySlug(topic);
  if (!config) notFound();

  return <TopicGame config={config} />;
}
