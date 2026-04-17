'use client';

import { use } from 'react';
import { getTopicData } from '../computerScienceData';
import TopicGame from '../../components/TopicGame';
import { notFound } from 'next/navigation';

export default function ComputerScienceTopicPage({ params }) {
  const { topic } = use(params);
  const config = getTopicData(topic);
  if (!config) notFound();

  return <TopicGame config={config} />;
}
