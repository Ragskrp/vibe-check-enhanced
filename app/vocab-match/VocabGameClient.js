'use client';

import dynamic from 'next/dynamic';

const VocabGame = dynamic(() => import('./VocabGame'), { ssr: false });

export default function VocabGameClient() {
  return <VocabGame />;
}
