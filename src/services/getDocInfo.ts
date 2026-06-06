import { db } from '@/base/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const getDocInfo = async <T>(path: string, docId: string): Promise<T | never> => {
  const docRef = doc(db, path, docId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docId } as T
  } else {
    throw new Error('Нет такого документа')
  }
}
