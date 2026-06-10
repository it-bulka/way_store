import { collection, doc, getDocs, writeBatch } from 'firebase/firestore'
import { db } from '@/base/firebase'
import type { IProduct } from '@/models/goodsType'

export const getChosenFromFirestore = async (uid: string): Promise<IProduct[]> => {
  const snap = await getDocs(collection(db, 'users', uid, 'chosen'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as IProduct))
}

export const addChosenToFirestore = async (uid: string, items: IProduct[]): Promise<void> => {
  if (!items.length) return
  const colRef = collection(db, 'users', uid, 'chosen')
  const batch = writeBatch(db)
  items.forEach(item => batch.set(doc(colRef, item.id), item))
  await batch.commit()
}
