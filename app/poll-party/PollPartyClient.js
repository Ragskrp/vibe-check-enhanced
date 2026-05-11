'use client';

import dynamic from 'next/dynamic';

const PollPartyGame = dynamic(() => import('./PollPartyGame'), { ssr: false });

export default function PollPartyClient() {
  return <PollPartyGame />;
}
