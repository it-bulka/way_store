import { db } from '@/base/firebase'
import { doc, getDoc } from 'firebase/firestore'
import type { ICollection } from '@/models/collection'

export const getCollectionById = async (id: string): Promise<ICollection | null> => {
  const snap = await getDoc(doc(db, 'collections', id))
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as ICollection) : null
}
