import { db } from '@/base/firebase'
import { getDocs } from 'firebase/firestore'
import { getCollectionRef } from '@/services/getCollRef.ts'
import type { Query } from '@firebase/firestore'

export const getDocsInfo = async (ref: Query) => {
  const docsSnapshot = await getDocs(ref)
  const allDocs = docsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

  return allDocs
}

export const getDocsInfoWithCol = async (colName: string, where = db) => {
  const colRef = await getCollectionRef(colName, where)

  return getDocsInfo(colRef)
}
