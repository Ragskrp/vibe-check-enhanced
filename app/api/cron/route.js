import { db } from '../../lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const roomsRef = collection(db, "rooms");
    const snapshot = await getDocs(roomsRef);
    
    let deletedCount = 0;
    const batchPromises = [];
    const now = Date.now();
    
    snapshot.forEach((roomDoc) => {
      const data = roomDoc.data();
      let shouldDelete = false;

      // Calculate time since creation
      let ageHours = 0;
      if (data.createdAt && data.createdAt.toMillis) {
        ageHours = (now - data.createdAt.toMillis()) / (1000 * 60 * 60);
      } else {
        // If no timestamp, assume old and clean up
        shouldDelete = true;
      }

      // Check for finished games (status === 'results') or stale/abandoned games (> 12 hours)
      if (data.status === 'results' || ageHours > 12) {
        shouldDelete = true;
      }

      if (shouldDelete) {
        batchPromises.push(deleteDoc(doc(db, "rooms", roomDoc.id)));
        deletedCount++;
      }
    });

    await Promise.all(batchPromises);

    return NextResponse.json({ 
      success: true, 
      message: `Database cleaned: ${deletedCount} rooms removed.`,
      roomsScanned: snapshot.size
    });
  } catch (error) {
    console.error("Failed to clean database:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
