import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function seedTestData() {
  const ws = 'ws_001';

  // 3 test mülkü
  const mulkler = [
    { ad:'Kadıköy Dairesi', tur:'Daire', konum:'Kadıköy, İstanbul',
      alan:120, currentPrice:5000000, buyPrice:3500000,
      workspaceId:ws, isDeleted:false, createdAt:serverTimestamp() },
    { ad:'Beşiktaş Ofis', tur:'İşyeri', konum:'Beşiktaş, İstanbul',
      alan:80, currentPrice:8000000, buyPrice:5500000,
      workspaceId:ws, isDeleted:false, createdAt:serverTimestamp() },
    { ad:'Çeşme Arsası', tur:'Arsa', konum:'Çeşme, İzmir',
      alan:500, currentPrice:3200000, buyPrice:1800000,
      workspaceId:ws, isDeleted:false, createdAt:serverTimestamp() },
  ];

  // 2 test kirası
  const kiralar = [
    { kiraci:'Ahmet Yılmaz', monthlyRent:25000, status:'active',
      workspaceId:ws, isDeleted:false, createdAt:serverTimestamp() },
    { kiraci:'Zeynep Kaya', monthlyRent:18000, status:'active',
      workspaceId:ws, isDeleted:false, createdAt:serverTimestamp() },
  ];

  for (const m of mulkler) await addDoc(collection(db, 'mulkler'), m);
  for (const k of kiralar) await addDoc(collection(db, 'kiralar'), k);
  console.log('Seed tamamlandı!');
}
