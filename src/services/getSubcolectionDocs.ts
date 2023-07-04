import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/base/firebase'

export const getSubcollectionDocs = async <T extends { id: string }>(
  ...arg: string[]
): Promise<T[]> => {
  const docs: T[] = []

  try {
    const querySnapshot = await getDocs(collection(db, arg[0], ...arg.splice(1)))

    querySnapshot.forEach(doc => {
      docs.push({ id: doc.id, ...doc.data() } as T)
    })
  } catch (err) {
    console.log({ err })
  }

  return docs
}
