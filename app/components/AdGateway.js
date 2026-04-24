'use client';

import { useState } from 'react';
import PreRollAd from './PreRollAd';

export default function AdGateway({ gameName, children }) {
  const prerollEnabled = false; // Temporarily disabled for AdSense review
  const [gameReady, setGameReady] = useState(false);

  if (!prerollEnabled) {
    return children;
  }

  return (
    <>
      {!gameReady && (
        <PreRollAd
          adClient="ca-pub-7832965089021505"
          adSlot="7171012882"
          countdownSeconds={3}
          gameName={gameName}
          onComplete={() => setGameReady(true)}
        />
      )}
      {gameReady && children}
    </>
  );
}
