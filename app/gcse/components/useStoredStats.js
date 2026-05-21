'use client';

import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('storage', callback);
  // Custom event for local updates
  window.addEventListener('gcse_stats_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('gcse_stats_updated', callback);
  };
}

export default function useStoredStats(storageKey) {
  const stats = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(storageKey);
    },
    () => null
  );

  return stats;
}

// Helper to update stats and notify listeners
export function updateStoredStats(key, data) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('gcse_stats_updated'));
  import('../../lib/cloudSync').then(m => m.syncToCloud());
}
