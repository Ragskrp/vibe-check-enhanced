'use client';

import { useState } from 'react';
import PreRollAd from '../components/PreRollAd';
import FlappyGame from './FlappyGame';

export default function FlappyClient() {
  const [gameReady, setGameReady] = useState(false);

  return (
    <>
      {!gameReady && (
        <PreRollAd
          adClient="ca-pub-7832965089021505"
          adSlot="7171012882"
          countdownSeconds={5}
          gameName="Flappy Vibe"
          onComplete={() => setGameReady(true)}
        />
      )}
      {gameReady && <FlappyGame />}
    </>
  );
}
