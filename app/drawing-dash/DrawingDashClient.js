'use client';

import dynamic from 'next/dynamic';

const DrawingDashGame = dynamic(() => import('./DrawingDashGame'), { ssr: false });

export default function DrawingDashClient() {
  return <DrawingDashGame />;
}
