'use client';

import dynamic from 'next/dynamic';

const ReactionArenaGame = dynamic(() => import('./ReactionArenaGame'), { ssr: false });

export default function ReactionArenaClient() {
  return <ReactionArenaGame />;
}
