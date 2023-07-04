import { getCollectionRef } from '@/services/getCollRef.ts'
import { getDoc, doc, query, startAfter, limit } from 'firebase/firestore'
import { getDocsInfo } from '@/services/getDocsInfo.ts'

export type PrevNextType = 'next' | 'prev'
interface INextPrevDoc {
  collection: string
  currentDocId: string
}

export const getNextDoc = async ({ collection, currentDocId }: INextPrevDoc) => {
  const colRef = await getCollectionRef(collection)
  const docSnap = await getDoc(doc(colRef, currentDocId))
  const q = await query(colRef, startAfter(docSnap), limit(1))
  const allDocs = await getDocsInfo(q)

  return allDocs[0]
}
