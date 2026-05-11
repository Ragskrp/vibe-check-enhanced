'use client';

import dynamic from 'next/dynamic';

const MemoryArenaGame = dynamic(() => import('./MemoryArenaGame'), { ssr: false });

export default function MemoryArenaClient() {
  return <MemoryArenaGame />;
}
