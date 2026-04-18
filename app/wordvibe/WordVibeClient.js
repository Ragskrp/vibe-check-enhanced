'use client';

import { useState } from 'react';
import PreRollAd from '../components/PreRollAd';
import WordVibeGame from './WordVibeGame';

export default function WordVibeClient() {
  const [gameReady, setGameReady] = useState(false);

  return (
    <>
      {!gameReady && (
        <PreRollAd
          adClient="ca-pub-7832965089021505"
          adSlot="7171012882"
          countdownSeconds={3}
          gameName="WordVibe"
          onComplete={() => setGameReady(true)}
        />
      )}
      {gameReady && <WordVibeGame />}
    </>
  );
}
