'use client';

import dynamic from 'next/dynamic';

const OddOneOutGame = dynamic(() => import('./OddOneOutGame'), { ssr: false });

export default function OddOneOutClient() {
  return <OddOneOutGame />;
}
