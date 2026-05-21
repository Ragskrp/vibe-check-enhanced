import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

// Call this whenever local storage is updated to push changes to Firebase
export async function syncToCloud() {
  if (!auth?.currentUser || !db) return;
  const uid = auth.currentUser.uid;
  
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // Only sync GCSE related stats
    if (key && (key.startsWith('vibe_srs_') || key === 'vibe_global_stats')) {
      data[key] = localStorage.getItem(key);
    }
  }
  
  if (Object.keys(data).length > 0) {
    try {
      await setDoc(doc(db, 'user_progress', uid), { progress: data, lastSynced: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.error("Cloud sync failed", e);
    }
  }
}

// Call this on login to pull latest changes from Firebase into localStorage
export async function syncFromCloud() {
  if (!auth?.currentUser || !db) return;
  const uid = auth.currentUser.uid;
  
  try {
    const docSnap = await getDoc(doc(db, 'user_progress', uid));
    if (docSnap.exists()) {
      const { progress } = docSnap.data();
      if (progress) {
        let updated = false;
        Object.keys(progress).forEach(key => {
          // simple merge: cloud overwrites local (since cloud is the ultimate source of truth if logging in on a new device)
          // to be safer, we could parse and merge, but overwriting is fine for 'simple sync' when restoring a session.
          localStorage.setItem(key, progress[key]);
          updated = true;
        });
        if (updated) {
          window.dispatchEvent(new CustomEvent('gcse_stats_updated'));
        }
      }
    }
  } catch (e) {
    console.error("Cloud restore failed", e);
  }
}
