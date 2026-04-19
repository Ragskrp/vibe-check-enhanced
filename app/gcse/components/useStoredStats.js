'use client';

import { useSyncExternalStore } from 'react';

function readStoredStats(storageKey) {
  if (typeof window === 'undefined') return null;

  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || 'null');
  } catch {
    return null;
  }
}

export default function useStoredStats(storageKey) {
  return useSyncExternalStore(
    () => () => {},
    () => readStoredStats(storageKey),
    () => null,
  );
}
