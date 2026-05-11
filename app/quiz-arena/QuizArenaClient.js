'use client';

import dynamic from 'next/dynamic';

const QuizArenaGame = dynamic(() => import('./QuizArenaGame'), { ssr: false });

export default function QuizArenaClient() {
  return <QuizArenaGame />;
}
