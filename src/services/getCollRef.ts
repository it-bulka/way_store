import { db } from '@/base/firebase.ts'
import { collection } from 'firebase/firestore'

export const getCollectionRef = (colName: string, where = db) => {
  return collection(where, colName)
}
